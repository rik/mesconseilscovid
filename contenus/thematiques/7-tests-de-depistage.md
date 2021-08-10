# Les tests de dépistage ?

<div class="illustration">
    <img src="illustrations/sante.svg" alt="">
</div>

<div id="conseils-personnels" class="conseils" itemscope itemtype="https://schema.org/FAQPage">

Depuis le 7 juillet, les tests de dépistage réalisés par un professionnel de santé sont **gratuits**, sans condition de prescription médicale, pour :

* les **résidents en France** ;
* les français qui résident habituellement à l’étranger ;
* les européens qui disposent d’une carte européenne d’assurance maladie.  
    
Les touristes non européens peuvent bénéficier de la gratuité sur présentation d’une prescription médicale ou s’ils ont été identifiés cas contact par l’Assurance maladie, sur présentation d’un justificatif (SMS, courriel). En dehors de ces cas de figure, les prix des tests sont fixés à **49,89 euros** (RT-PCR) et **25 euros** (test antigénique rapide).

<div class="conseil">

[Cliquez ici pour trouver un lieu de dépistage](https://www.sante.fr/cf/centres-depistage-covid.html) au plus proche de vous.

</div>

## Quel test dois-je faire ?

<form id="tests-de-depistage-symptomes-form">
    <fieldset>
        <legend><h3 id="tests-de-depistage-symptomes-label">J’ai des symptômes qui peuvent évoquer la Covid :</h3></legend>
        <div role="radiogroup" aria-labelledby="tests-de-depistage-symptomes-label">
            <input id="tests_de_depistage_symptomes_radio_oui" type="radio" required name="tests_de_depistage_symptomes_radio" value="oui">
            <label for="tests_de_depistage_symptomes_radio_oui">Oui</label>
            <input id="tests_de_depistage_symptomes_radio_non" type="radio" required name="tests_de_depistage_symptomes_radio" value="non">
            <label for="tests_de_depistage_symptomes_radio_non">Non</label>
        </div>
    </fieldset>
    <div class="form-controls">
        <div class="button-with-progress">
            <p id="aria-description-progress-tests-de-depistage" class="progress">Il vous reste moins de 3 étapes</p>
            <input type="submit" class="button button-arrow" value="Continuer" aria-describedby="aria-description-progress-tests-de-depistage">
        </div>
    </div>
</form>

<form id="tests-de-depistage-depuis-quand-form" hidden>
    <a href="#" data-precedent="symptomes" class="back-button">Retour</a>
    <fieldset id="tests-de-depistage-depuis-quand">
        <legend><h3 id="tests-de-depistage-depuis-quand-label">Vous avez des symptômes depuis :</h3></legend>
        <div role="radiogroup" aria-labelledby="tests-de-depistage-depuis-quand-label">
            <input id="tests_de_depistage_depuis_quand_radio_moins_4_jours" type="radio" required name="tests_de_depistage_depuis_quand_radio" value="moins-4-jours">
            <label for="tests_de_depistage_depuis_quand_radio_moins_4_jours">Moins de 4 jours</label>
            <input id="tests_de_depistage_depuis_quand_radio_plus_4_jours" type="radio" required name="tests_de_depistage_depuis_quand_radio" value="plus-4-jours">
            <label for="tests_de_depistage_depuis_quand_radio_plus_4_jours">Plus de 4 jours</label>
        </div>
    </fieldset>
    <div class="form-controls">
        <div class="button-with-progress">
            <p id="aria-description-progress-tests-de-depistage" class="progress">Plus qu’une étape !</p>
            <input type="submit" class="button" value="Terminer" aria-describedby="aria-description-progress-tests-de-depistage">
        </div>
    </div>
</form>

<form id="tests-de-depistage-cas-contact-form" hidden>
    <a href="#" data-precedent="symptomes" class="back-button">Retour</a>
    <fieldset id="tests-de-depistage-cas-contact">
        <legend><h3 id="tests-de-depistage-cas-contact-label">Je n’ai pas de symptômes mais je suis cas contact :</h3></legend>
        <div role="radiogroup" aria-labelledby="tests-de-depistage-cas-contact-label">
            <input id="tests_de_depistage_cas_contact_radio_oui" type="radio" required name="tests_de_depistage_cas_contact_radio" value="oui">
            <label for="tests_de_depistage_cas_contact_radio_oui">Oui</label>
            <input id="tests_de_depistage_cas_contact_radio_non" type="radio" required name="tests_de_depistage_cas_contact_radio" value="non">
            <label for="tests_de_depistage_cas_contact_radio_non">Non</label>
        </div>
    </fieldset>
    <div class="form-controls">
        <div class="button-with-progress">
            <p id="aria-description-progress-tests-de-depistage" class="progress">Il vous reste moins de 2 étapes</p>
            <input type="submit" class="button" value="Continuer" aria-describedby="aria-description-progress-tests-de-depistage">
        </div>
    </div>
</form>

<form id="tests-de-depistage-auto-test-form" hidden>
    <a href="#" data-precedent="cas-contact" class="back-button">Retour</a>
    <fieldset id="tests-de-depistage-auto-test">
        <legend><h3 id="tests-de-depistage-auto-test-label">Je n’ai pas de symptômes, je ne suis pas cas contact mais j’ai fait un auto-test et il est :</h3></legend>
        <div role="radiogroup" aria-labelledby="tests-de-depistage-auto-test-label">
            <input id="tests_de_depistage_auto_test_radio_oui" type="radio" required name="tests_de_depistage_auto_test_radio" value="oui">
            <label for="tests_de_depistage_auto_test_radio_oui">Positif</label>
            <input id="tests_de_depistage_auto_test_radio_non" type="radio" required name="tests_de_depistage_auto_test_radio" value="non">
            <label for="tests_de_depistage_auto_test_radio_non">Négatif</label>
        </div>
    </fieldset>
    <div class="form-controls">
        <div class="button-with-progress">
            <p id="aria-description-progress-tests-de-depistage" class="progress">Plus qu’une étape !</p>
            <input type="submit" class="button" value="Terminer" aria-describedby="aria-description-progress-tests-de-depistage">
        </div>
    </div>
</form>

<div id="tests-de-depistage-symptomes-moins-4-jours-reponse" class="statut statut-bleu" hidden>

Vous avez des symptômes qui peuvent évoquer la Covid depuis moins de 4 jours, nous vous recommandons de faire un test **antigénique** ou **RT-PCR nasopharyngé**.

</div>

<div id="tests-de-depistage-symptomes-plus-4-jours-reponse" class="statut statut-bleu" hidden>

Vous avez des symptômes qui peuvent évoquer la Covid depuis plus de 4 jours, nous vous recommandons de faire un **test RT-PCR nasopharyngé**.

</div>

<div id="tests-de-depistage-pas-symptomes-cas-contact-oui-reponse" class="statut statut-bleu" hidden>

Vous n’avez pas de symptômes qui peuvent évoquer la Covid mais vous êtes cas contact, nous vous recommandons de faire un **test antigénique** si vous venez de l’apprendre.

Pour un test de contrôle (7 jours après votre contact à risque ), les tests **antigénique** ou **RT-PCR nasopharyngé** sont indiqués.

</div>

<div id="tests-de-depistage-pas-symptomes-pas-cas-contact-auto-test-oui-reponse" class="statut statut-bleu" hidden>

Vous n’avez pas de symptômes qui peuvent évoquer la Covid, vous n’êtes pas cas contact mais votre auto-test est positif. Vous devez confirmer ce résultat avec un test **RT-PCR nasopharyngé** et rester en isolement le temps d’obtenir cette confirmation.

</div>

<div id="tests-de-depistage-pas-symptomes-pas-cas-contact-auto-test-non-reponse" class="statut statut-bleu" hidden>

Vous n’avez pas de symptômes qui peuvent évoquer la Covid, vous n’êtes pas cas contact et votre auto-test est négatif :

* Si vous souhaitez obtenir un [Pass sanitaire](/pass-sanitaire-qr-code-voyages.html), un test négatif **RT-PCR nasopharyngé** ou **antigénique** réalisé il y a moins de 48 h pour l’usage en France et 72 h pour le contrôle aux frontières est nécessaire.
* Si vous rendez visite à des personnes vulnérables, un test **antigénique** ou **RT-PCR nasopharyngé** est indiqué.
* Si vous travaillez régulièrement avec des personnes fragiles, il est recommandé de vous tester régulièrement avec les **autotests** vendus en pharmacie (les professionnels exerçant à domicile auprès de personnes vulnérables peuvent obtenir la prise en charge de 10 auto-tests par mois en présentant leur carte professionnelle au pharmacien).

</div>

<p id="tests-de-depistage-refaire" hidden>
<a href="#" role="button" class="button button-outline button-half-width">Recommencer le questionnaire</a>
</p>

## Quels sont les différents tests de dépistage de la Covid-19 ?

<div class="conseils">
<details>

.. summary:: Test RT-PCR nasopharyngé

.. question:: Le test RT-PCR nasopharyngé (prélèvement nasal)
    :level: 4

    Le test RT-PCR nasopharyngé est le test de dépistage de la Covid-19 de référence.
    Un écouvillon (long coton-tige) est inséré dans les deux narines pour réaliser un prélèvement.
    Le résultat est habituellement disponible en 24 h.

.. question:: Où faire un test RT-PCR nasopharyngé ?
    :level: 4

    Ce test est réalisé exclusivement par un professionnel de santé en laboratoire ou dans un centre de dépistage.

    [Cliquez ici pour trouver un lieu de dépistage](https://www.sante.fr/cf/centres-depistage-covid.html) près de chez vous.

</details>
</div>

<div class="conseils">
<details>

.. summary:: Test antigénique nasopharyngé

.. question:: Le test antigénique nasopharyngé (prélèvement nasal)
    :level: 4

    Le test antigénique permet d’avoir le résultat plus rapidement, mais il est moins fiable que les tests réalisés en laboratoire. C’est pourquoi, il n’est pas recommandé pour le dépistage des personnes qui ne présentent pas de symptômes (sauf en cas de contact à risque).

.. question:: Où faire un test antigénique nasopharyngé (prélèvement nasal) ?
    :level: 4

    Ce type de test est réalisé par un professionnel de santé, notamment en pharmacie.

    [Cliquez ici pour trouver un lieu de dépistage](https://www.sante.fr/cf/centres-depistage-covid.html) près de chez vous.

</details>
</div>

<div class="conseils">
<details>

.. summary:: Test RT-PCR salivaire

.. question:: Le test RT-PCR salivaire (prélèvement buccal)
    :level: 3

    Ce test est réalisé grâce au prélèvement de la salive, avec un écouvillon (long coton-tige) ou sans (par crachat). Moins contraignant que les tests nasopharyngés, il est recommandé **lorsque le prélèvement nasal est compliqué ou impossible** (très jeunes enfants, déviation de la cloison nasale, troubles psychiatriques…).

.. question:: Où faire un test PCR salivaire ?
    :level: 4

    Ce type de test est réalisé par des professionnels de santé en laboratoire, à domicile ou lors de campagnes de dépistage (écoles…).

    [Cliquez ici pour trouver un lieu de dépistage](https://www.sante.fr/cf/centres-depistage-covid.html) près de chez vous.

</details>
</div>

<div class="conseils">
<details>

.. summary:: Autotests

.. question:: Les autotests
    :level: 3

    Des autotests sont disponibles en pharmacie. Ce test est un prélèvement nasal à réaliser chez soi. Ils ne sont pas pris en charge par l’Assurance maladie sauf dans le cas des professionnels exerçant auprès de personnes vulnérables (âgées, handicapées…) et dans la limite de 10 par mois.

    Il ne faut pas y avoir recours lorsque :

    - on a des symptômes
    - on a eu un contact à risque récent (cas contact).

    Ce type de test est utile à condition de le pratiquer régulièrement (plusieurs fois par semaine).

</details>
</div>

.. question:: Je souhaite me faire dépister mais les prélèvements nasopharyngés sont impossibles dans mon cas
    :level: 3

    Le test **RT-PCR salivaire** est indiqué dans ces cas : enfant en bas âge, personnes présentant des troubles psychiatriques, déviation de la cloison nasale…

</div>