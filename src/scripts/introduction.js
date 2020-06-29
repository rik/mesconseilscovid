import { Profil } from './profil.js'
import affichage from './affichage.js'
import pagination from './pagination.js'

function page(element, app) {
    const container = element.querySelector('#profils-cards')
    container.innerHTML = '<div class="break"></div>'
    app.stockage.getProfils().then((noms) => {
        if (!noms.includes('mes_infos')) {
            const card = container.appendChild(
                affichage.createElementFromHTML(`
                    <div class="profil-card card">
                        <h3>Pour moi</h3>
                        <div class="form-controls">
                            <a class="button button-full-width" data-profil="mes_infos" href="#residence">Démarrer</a>
                        </div>
                    </div>
                `)
            )
            bindChangeProfil(card.querySelector('[data-profil]'), app)
        }
        container.appendChild(
            affichage.createElementFromHTML(`
                <div class="profil-card card">
                    <h3>Pour un proche</h3>
                    <div class="form-controls">
                        <a class="button button-full-width js-profil-new" href="#residence">Démarrer</a>
                    </div>
                </div>
            `)
        )
        renderProfilCards(container, noms, app)
        bindNewProfil(element.querySelector('.js-profil-new'), app)
    })
}

function renderProfilCards(container, noms, app) {
    const lastCard = container.firstChild
    noms.forEach((nom) => {
        const profil = new Profil(nom)
        app.stockage.charger(profil).then((profil) => {
            const card = container.insertBefore(profil.renderCard(), lastCard)

            const conseilsLink = card.querySelector('.conseils-link')
            if (conseilsLink) {
                const target = pagination.redirectToUnansweredQuestions(
                    'findCorrectExit',
                    profil
                )
                conseilsLink.setAttribute('href', '#' + target)
            }

            const profilLinks = card.querySelectorAll('[data-profil]')
            Array.from(profilLinks).forEach((profilLink) => {
                bindChangeProfil(profilLink, app)
            })
        })
    })
}

function bindChangeProfil(element, app) {
    element.addEventListener('click', function (event) {
        event.preventDefault()
        app.basculerVersProfil(element.dataset.profil).then(() => {
            var url = new URL(event.target.href)
            app.router.navigate(url.hash)
        })
    })
}

function bindNewProfil(element, app) {
    element.addEventListener('click', function (event) {
        event.preventDefault()
        var nom = prompt('Pour qui remplissez-vous ce questionnaire ?')
        if (!nom || !nom.trim()) {
            app.router.navigate('introduction')
            return
        }
        app.basculerVersProfil(nom).then(() => {
            var url = new URL(event.target.href)
            app.router.navigate(url.hash)
        })
    })
}

module.exports = { page }
