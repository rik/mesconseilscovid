export default class AlgorithmeVaccination {
    constructor(profil, algoOrientation) {
        this.profil = profil
        this.algoOrientation = algoOrientation
    }

    isSup50() {
        return this.profil.age >= 50
    }

    isSup18() {
        return this.profil.age >= 18
    }

    isProfessionnelDeSante() {
        return this.profil.activite_pro_sante
    }

    isARisque() {
        return (
            this.profil.antecedent_cardio ||
            this.profil.antecedent_diabete ||
            this.profil.antecedent_respi ||
            this.profil.antecedent_dialyse ||
            this.profil.antecedent_greffe ||
            this.profil.antecedent_cancer ||
            this.profil.antecedent_immunodep ||
            this.profil.antecedent_cirrhose ||
            this.profil.antecedent_drepano ||
            this.profil.antecedent_trisomie ||
            this.algoOrientation.imc >= 30
        )
    }

    isTresHautRisque() {
        return (
            this.profil.antecedent_dialyse ||
            this.profil.antecedent_greffe ||
            this.profil.antecedent_cancer ||
            this.profil.antecedent_trisomie
        )
    }

    isCompletementVaccine() {
        return this.profil.vaccins === 'completement'
    }

    isVaccinable() {
        return (
            this.isSup50() ||
            this.isProfessionnelDeSante() ||
            this.isTresHautRisque() ||
            (this.isSup18() && this.isARisque())
        )
    }
}
