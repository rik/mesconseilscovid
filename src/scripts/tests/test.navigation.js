var chai = require('chai')

var Router = require('../router.js')
var redirectToUnansweredQuestions = Router.redirectToUnansweredQuestions

describe('Navigation générale', function () {
    it('page inconnue renvoie au début', function () {
        chai.expect(redirectToUnansweredQuestions('foo', {})).to.equal('introduction')
    })
    it('ok d’aller à la page d’accueil', function () {
        chai.expect(redirectToUnansweredQuestions('introduction', {})).to.be.undefined
    })
    it('ok d’aller à la page de pédiatrie', function () {
        chai.expect(redirectToUnansweredQuestions('pediatrie', {})).to.be.undefined
    })
    it('ok d’aller au conditions d’utilisation', function () {
        chai.expect(redirectToUnansweredQuestions('conditionsutilisation', {})).to.be
            .undefined
    })
    it('ok d’aller à la page nouvelle version disponible', function () {
        chai.expect(redirectToUnansweredQuestions('nouvelleversiondisponible', {})).to
            .be.undefined
    })
})

describe('Navigation lieu de résidence', function () {
    it('ok d’aller à la question 1', function () {
        chai.expect(redirectToUnansweredQuestions('residence', {})).to.be.undefined
    })
    it('ok d’aller à la question 1 même si déjà répondu', function () {
        chai.expect(
            redirectToUnansweredQuestions('residence', {
                departement: '80',
            })
        ).to.be.undefined
    })
})

describe('Navigation mon activité', function () {
    it('redirige vers l’accueil si réponse 1 manquante', function () {
        chai.expect(redirectToUnansweredQuestions('activitepro', {})).to.equal(
            'introduction'
        )
    })
    it('ok d’aller à la question 2 si réponse à la 1', function () {
        chai.expect(redirectToUnansweredQuestions('activitepro', { departement: '80' }))
            .to.be.undefined
    })
    it('ok d’aller à la question 2 même si déjà répondu', function () {
        chai.expect(
            redirectToUnansweredQuestions('activitepro', {
                departement: '80',
                activite_pro: false,
            })
        ).to.be.undefined
    })
})

describe('Navigation mon foyer', function () {
    it('redirige vers question 2 si réponse manquante', function () {
        chai.expect(
            redirectToUnansweredQuestions('foyer', { departement: '80' })
        ).to.equal('activitepro')
    })
    it('ok d’aller à la question 3 si réponse à la 2', function () {
        chai.expect(
            redirectToUnansweredQuestions('foyer', {
                departement: '80',
                activite_pro: false,
            })
        ).to.be.undefined
    })
    it('ok d’aller à la question 3 même si déjà répondu', function () {
        chai.expect(
            redirectToUnansweredQuestions('foyer', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
            })
        ).to.be.undefined
    })
})

describe('Navigation mes caractéristiques', function () {
    it('redirige vers question 3 si réponse manquante', function () {
        chai.expect(
            redirectToUnansweredQuestions('caracteristiques', {
                departement: '80',
                activite_pro: false,
            })
        ).to.equal('foyer')
    })
    it('ok d’aller à la question 4 si réponse à la 3', function () {
        chai.expect(
            redirectToUnansweredQuestions('caracteristiques', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
            })
        ).to.be.undefined
    })
    it('ok d’aller à la question 4 même si déjà répondu', function () {
        chai.expect(
            redirectToUnansweredQuestions('caracteristiques', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
            })
        ).to.be.undefined
    })
})

describe('Navigation mes antécédents', function () {
    it('redirige vers question 4 si réponse manquante', function () {
        chai.expect(
            redirectToUnansweredQuestions('antecedents', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
            })
        ).to.equal('caracteristiques')
    })
    it('redirige vers question 4 si âge inférieur à 15', function () {
        chai.expect(
            redirectToUnansweredQuestions('antecedents', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 12,
            })
        ).to.equal('caracteristiques')
    })
    it('ok d’aller à la question 5 si réponse à la 4', function () {
        chai.expect(
            redirectToUnansweredQuestions('antecedents', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
            })
        ).to.be.undefined
    })
    it('ok d’aller à la question 5 même si déjà répondu', function () {
        chai.expect(
            redirectToUnansweredQuestions('antecedents', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
            })
        ).to.be.undefined
    })
})

describe('Navigation mes symptômes actuels', function () {
    it('redirige vers question 5 si réponse manquante', function () {
        chai.expect(
            redirectToUnansweredQuestions('symptomesactuels', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
            })
        ).to.equal('antecedents')
    })
    it('ok d’aller à la question 6 si réponse à la 5', function () {
        chai.expect(
            redirectToUnansweredQuestions('symptomesactuels', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
            })
        ).to.be.undefined
    })
    it('ok d’aller à la question 6 même si déjà répondu', function () {
        chai.expect(
            redirectToUnansweredQuestions('symptomesactuels', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
            })
        ).to.be.undefined
    })
})

describe('Navigation mes symptômes passés', function () {
    it('redirige vers question 6 si réponse manquante', function () {
        chai.expect(
            redirectToUnansweredQuestions('symptomespasses', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
            })
        ).to.equal('symptomesactuels')
    })
    it('ok d’aller à la question 7 si réponse négative à la 6', function () {
        chai.expect(
            redirectToUnansweredQuestions('symptomespasses', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
            })
        ).to.be.undefined
    })
    it('ok d’aller à la question 7 si réponse positive à la 6 mais que autre', function () {
        chai.expect(
            redirectToUnansweredQuestions('symptomespasses', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: true,
                symptomes_actuels_autre: true,
            })
        ).to.be.undefined
    })
    it('ok d’aller à la question 7 même si déjà répondu', function () {
        chai.expect(
            redirectToUnansweredQuestions('symptomespasses', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: true,
            })
        ).to.be.undefined
    })
    it('redirige vers conseils si réponse positive à la 6', function () {
        chai.expect(
            redirectToUnansweredQuestions('symptomespasses', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: true,
            })
        ).to.equal('conseils')
    })
})

describe('Navigation mes contacts à risque', function () {
    it('redirige vers question 7 si réponse manquante', function () {
        chai.expect(
            redirectToUnansweredQuestions('contactarisque', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
            })
        ).to.equal('symptomespasses')
    })
    it('ok d’aller à la question 8 si réponse négative aux 6 et 7', function () {
        chai.expect(
            redirectToUnansweredQuestions('contactarisque', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: false,
            })
        ).to.be.undefined
    })
    it('ok d’aller à la question 8 si réponse négative à la 7 et positive mais autre à la 6', function () {
        chai.expect(
            redirectToUnansweredQuestions('contactarisque', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: true,
                symptomes_actuels_autre: true,
                symptomes_passes: false,
            })
        ).to.be.undefined
    })
    it('ok d’aller à la question 8 même si déjà répondu', function () {
        chai.expect(
            redirectToUnansweredQuestions('contactarisque', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: false,
                contact_a_risque: false,
            })
        ).to.be.undefined
    })
    it('redirige vers conseils si réponse positive à la 6', function () {
        chai.expect(
            redirectToUnansweredQuestions('contactarisque', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: true,
            })
        ).to.equal('conseils')
    })
    it('redirige vers conseils si réponse positive à la 7', function () {
        chai.expect(
            redirectToUnansweredQuestions('contactarisque', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: true,
            })
        ).to.equal('conseils')
    })
})

describe('Navigation Sortie 1', function () {
    it('ok d’aller à sortie 1 si symptômes actuels', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseilssymptomesactuels', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: true,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 1 si symptômes actuels et target inconnu', function () {
        chai.expect(
            redirectToUnansweredQuestions('inconnu', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: true,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 2 -> 1 si symptômes actuels', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseilssymptomespasses', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: true,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 3 -> 1 si symptômes actuels', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseilscontactarisque', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: true,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 4 -> 1 si symptômes actuels', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseils', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: true,
            })
        ).to.be.undefined
    })
})

describe('Navigation Sortie 2', function () {
    it('ok d’aller à sortie 2 si symptômes passés', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseilssymptomespasses', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: true,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 2 si symptômes passés et target inconnu', function () {
        chai.expect(
            redirectToUnansweredQuestions('inconnu', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: true,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 1 -> 2 si symptômes passés', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseilssymptomesactuels', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: true,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 3 -> 2 si symptômes passés', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseilscontactarisque', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: true,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 4 -> 2 si symptômes passés', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseils', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: true,
            })
        ).to.be.undefined
    })
})

describe('Navigation Sortie 3', function () {
    it('ok d’aller à sortie 3 si symptômes passés', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseilscontactarisque', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: false,
                contact_a_risque: true,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 3 si symptômes passés et target inconnu', function () {
        chai.expect(
            redirectToUnansweredQuestions('inconnu', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: false,
                contact_a_risque: true,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 1 -> 3 si contact à risque', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseilssymptomesactuels', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: false,
                contact_a_risque: true,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 2 -> 3 si contact à risque', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseilssymptomespasses', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: false,
                contact_a_risque: true,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 4 -> 3 si contact à risque', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseils', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: false,
                contact_a_risque: true,
            })
        ).to.be.undefined
    })
})

describe('Navigation Sortie 4', function () {
    it('ok d’aller à sortie 4 si ni symptôme ni contact', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseils', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: false,
                contact_a_risque: false,
            })
        ).to.be.undefined
    })
    it('redirige sortie 4 si ni symptôme ni contact et target inconnu', function () {
        chai.expect(
            redirectToUnansweredQuestions('inconnu', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: false,
                contact_a_risque: false,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 4 si âge inférieur à 15 ans', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseils', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 12,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: false,
                contact_a_risque: false,
            })
        ).to.equal('caracteristiques')
    })
    it('redirige sortie 1 -> 4 si ni symptôme ni contact', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseilssymptomesactuels', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: false,
                contact_a_risque: false,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 2 -> 4 si ni symptôme ni contact', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseilssymptomespasses', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: false,
                contact_a_risque: false,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 3 -> 4 si ni symptôme ni contact', function () {
        chai.expect(
            redirectToUnansweredQuestions('conseilscontactarisque', {
                departement: '80',
                activite_pro: false,
                foyer_enfants: false,
                age: 42,
                antecedent_cardio: false,
                symptomes_actuels: false,
                symptomes_passes: false,
                contact_a_risque: false,
            })
        ).to.equal('conseils')
    })
})
