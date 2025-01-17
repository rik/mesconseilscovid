import Profil from './profil'
import StockageLocal from './stockage'
import { hideElement, showElement } from './affichage'
import { Questionnaire } from './questionnaire'
import { joursAvant } from './utils'

import { Router } from './router'
import Updater from './updater'

import introduction from './page/introduction'

import nouvelleversion from './page/nouvelleversion'

import nom from './page/questionnaire/nom'

import vaccins from './page/questionnaire/vaccins'
import historique from './page/questionnaire/historique'
import symptomes from './page/questionnaire/symptomes'
import depistage from './page/questionnaire/depistage'
import contactarisque from './page/questionnaire/contactarisque'
import situation from './page/questionnaire/situation'
import sante from './page/questionnaire/sante'
import conseils from './page/conseils'

import suiviintroduction from './page/suiviintroduction'
import suivisymptomes from './page/suivisymptomes'
import suivihistorique from './page/suivihistorique'

import {
    beforeConseils,
    beforeSuiviIntroduction,
    beforeSuiviSymptomes,
    beforeSuiviHistorique,
} from './questionnaire'

import { registerPlausible } from './plausible'
import { registerATInternet } from './atinternet'

export default class App {
    constructor(suiviImages) {
        this.profil = new Profil()
        this.stockage = new StockageLocal()
        this.questionnaire = new Questionnaire()
        this.suiviImages = suiviImages
    }
    initStats() {
        return this.initSource().then((source) => {
            this.source = source
            this._plausibleTrackingEvents = []
            this._plausible = registerPlausible(window)
            this.atinternet = registerATInternet()
        })
    }
    initSource() {
        const searchParams = new URLSearchParams(window.location.search)
        const sourceFromUrl =
            searchParams.get('source') || searchParams.get('utm_source')
        if (sourceFromUrl) {
            // On mémorise la source présente dans l’URL.
            return this.stockage.setSource(sourceFromUrl)
        } else {
            // On se rappelle de la source précédemment stockée.
            return this.stockage.getSource()
        }
    }
    init() {
        this.router = new Router(this)
        this.updater = new Updater(this.router)
        return this.chargerProfilActuel()
    }
    setupRoutes() {
        this.router.addAppRoute('introduction', introduction, {
            pageTitle: '',
        })

        this.router.addAppRoute('nom', nom)

        this.router.addQuestionnaireRoute('vaccins', vaccins)
        this.router.addQuestionnaireRoute('historique', historique)
        this.router.addQuestionnaireRoute('symptomes', symptomes)
        this.router.addQuestionnaireRoute('contactarisque', contactarisque)
        this.router.addQuestionnaireRoute('depistage', depistage)
        this.router.addQuestionnaireRoute('situation', situation)
        this.router.addQuestionnaireRoute('sante', sante)

        this.router.addAppRoute('conseils', conseils, { beforeFunc: beforeConseils })
        this.router.addAppRoute('suiviintroduction', suiviintroduction, {
            beforeFunc: beforeSuiviIntroduction,
        })
        this.router.addAppRoute('suivisymptomes', suivisymptomes, {
            beforeFunc: beforeSuiviSymptomes,
        })
        this.router.addAppRoute('suivihistorique', suivihistorique, {
            beforeFunc: beforeSuiviHistorique,
        })
        this.router.addRoute('conditionsutilisation', (element) => {
            if (this.profil.isComplete()) {
                showElement(element.querySelector('.js-profil-full'))
                hideElement(element.querySelector('.js-profil-empty'))
            }
        })

        this.router.addRoute('nouvelleversiondisponible', (element) => {
            const route = this.router.lastRouteResolved()
            const urlParams = new URLSearchParams(route.query)
            const origine = urlParams.get('origine')

            nouvelleversion(element, this, origine)
        })
    }
    setupRedirects() {
        // Compatibilité avec les anciens noms de pages.
        this.router.navigo.on(
            new RegExp('^(symptomesactuels|symptomespasses|debutsymptomes)$'),
            () => {},
            {
                before: (done) => {
                    this.redirectTo('symptomes')
                    done(false)
                },
            }
        )
        this.router.navigo.on(new RegExp('^(residence|foyer|activitepro)$'), () => {}, {
            before: (done) => {
                this.redirectTo('situation')
                done(false)
            },
        })
        this.router.navigo.on(
            new RegExp('^(caracteristiques|antecedents)$'),
            () => {},
            {
                before: (done) => {
                    this.redirectTo('sante')
                    done(false)
                },
            }
        )
        this.router.navigo.on('pediatrie', () => {}, {
            before: function (done) {
                window.location.replace('conseils-pour-les-enfants.html')
                done(false)
            },
        })
    }
    chargerProfilActuel() {
        return this.stockage.getProfilActuel().then((nom) => {
            if (nom !== null) {
                return this.chargerProfil(nom)
            }
        })
    }
    enregistrerProfilActuel() {
        return this.stockage.enregistrer(this.profil)
    }
    creerProfil(nom) {
        this.profil.resetData(nom)
        return this.stockage.setProfilActuel(nom).then(() => {
            return this.enregistrerProfilActuel()
        })
    }
    creerProfilsTypes() {
        const listeDepistage = ['Positif', 'Négatif', 'En attente', 'Pas testé']
        const listeSymptomes = [
            'Symptômes actuels graves',
            'Symptômes actuels',
            'Symptômes actuels non évocateurs',
            'Symptômes passés',
            'Contact à risque',
            'Contact pas vraiment à risque',
            'Rien de tout ça',
        ]
        let promises = []
        for (let d = 0; d < listeDepistage.length; d++) {
            for (let s = 0; s < listeSymptomes.length; s++) {
                const depistage = listeDepistage[d]
                const symptomes = listeSymptomes[s]
                if (
                    (depistage === 'Négatif' &&
                        (symptomes === 'Symptômes passés' ||
                            symptomes === 'Contact pas vraiment à risque' ||
                            symptomes === 'Rien de tout ça')) ||
                    (depistage === 'Pas testé' &&
                        (symptomes === 'Contact pas vraiment à risque' ||
                            symptomes === 'Rien de tout ça'))
                ) {
                    promises.push(
                        this.creerProfilType(depistage, symptomes, true, false)
                    )
                    promises.push(
                        this.creerProfilType(depistage, symptomes, false, true)
                    )
                }
                promises.push(this.creerProfilType(depistage, symptomes, false, false))
            }
        }
        return Promise.all(promises)
    }
    creerProfilType(depistage, symptomes, personneFragile) {
        let nom = `${depistage} + ${symptomes}`
        if (personneFragile) {
            nom = `${nom} + personne fragile`
        }
        return this.stockage.getProfil(nom).then((profil) => {
            if (profil === null) {
                profil = new Profil(nom)
                profil.fillTestData(depistage, symptomes, personneFragile)
                return this.stockage.enregistrer(profil)
            } else {
                console.error(`Le profil "${nom}" existe déjà`)
            }
        })
    }
    basculerVersProfil(nom) {
        return this.stockage.setProfilActuel(nom).then(() => {
            return this.stockage.getProfil(nom).then((profil) => {
                if (profil) {
                    return this.chargerProfil(nom)
                } else {
                    return this.creerProfil(nom)
                }
            })
        })
    }
    chargerProfil(nom) {
        this.profil.nom = nom
        return this.stockage.charger(this.profil)
    }
    supprimerProfil(nom) {
        return this.stockage.supprimer(nom).then(() => {
            if (this.profil.nom === nom) {
                this.profil.nom = undefined
                this.stockage.setProfilActuel(undefined)
            }
        })
    }
    supprimerSuivi(nom) {
        return this.basculerVersProfil(nom).then((profil) => {
            profil.resetSuivi()
            return this.stockage.enregistrer(profil)
        })
    }
    supprimerTout() {
        return this.stockage.supprimerTout().then(() => {
            this.profil.resetData()
        })
    }
    goToNextPage(currentPage) {
        const nextPage = this.questionnaire.nextPage(currentPage, this.profil)
        this.router.navigate(nextPage)
    }
    loadFakeSuiviData() {
        // Useful to be able to test the deconfinement page.
        this.profil.symptomes_start_date = joursAvant(11)
        this.profil.suivi_start_date = joursAvant(11)
        this.profil.suivi = [
            {
                date: joursAvant(1).toJSON(),
                symptomes: true,
                essoufflement: 'mieux',
                etatGeneral: 'mieux',
                etatPsychologique: 'mieux',
                alimentationHydratation: 'non',
                fievre: 'non',
                diarrheeVomissements: 'non',
                mauxDeTete: 'non',
                toux: 'non',
            },
        ]
        this.enregistrerProfilActuel()
    }
    trackPageView(pageName) {
        this.plausible('pageview', {
            lang: this._preferedLanguages(),
        })
        this.atinternet(pageName)
    }
    _preferedLanguages() {
        // cf. https://stackoverflow.com/a/25603630
        // eslint-disable-next-line compat/compat
        return navigator.languages || [navigator.language || navigator.userLanguage]
    }
    plausible(eventName, props = {}) {
        // Ajoute la source de la visite.
        if (this.source) {
            props['source'] = this.source
        }
        // Ajoute l’info sur le profil (pour moi ou pour un proche).
        if (typeof this.profil.nom !== 'undefined') {
            props['profil'] = this.profil.estMonProfil() ? 'moi' : 'proche'
        }
        return this._envoieEvenementPlausible(eventName, props)
    }
    _envoieEvenementPlausible(eventName, props) {
        const options = {}
        if (Object.keys(props).length > 0) {
            options['props'] = props
        }
        try {
            return this._plausible(eventName, options)
        } catch (e) {
            new Image().src =
                document.body.dataset.statsUrl +
                '/api/error?message=' +
                encodeURIComponent(e.message)
        }
    }
    premierDemarrageFormulaire() {
        if (typeof this.profil.questionnaire_start_date === 'undefined') {
            this.profil.questionnaire_start_date = new Date()
            this.enregistrerProfilActuel()
            this.plausible('Questionnaire commencé')
            if (this.profil.estMonProfil()) {
                this.plausible('Questionnaire commencé pour moi')
            } else {
                this.plausible('Questionnaire commencé pour un proche')
            }
        }
    }
}
