import { assert } from 'chai'
import { recordConsoleMessages, waitForPlausibleTrackingEvent } from './helpers'

describe('Thématiques', function () {
    it('titre de la page', async function () {
        const page = this.test.page

        await page.goto('http://localhost:8080/conseils-pour-les-enfants.html')

        assert.equal(
            await page.title(),
            'Conseils pour les mineurs — Mes Conseils Covid — Isolement, tests, vaccins, attestations, contact à risque…'
        )
    })

    it('on va vers une autre page thématique', async function () {
        const page = this.test.page

        let messages = recordConsoleMessages(page)
        await page.goto('http://localhost:8080/conseils-pour-les-enfants.html')
        await page.click(
            '.thematiques a >> text="Voyage et Pass sanitaire, que faut-il savoir ?"'
        )
        await waitForPlausibleTrackingEvent(
            page,
            'pageview:pass-sanitaire-qr-code-voyages.html'
        )

        assert.lengthOf(messages, 3)
        assert.include(messages[0], {
            n: 'pageview',
            u: 'http://localhost/conseils-pour-les-enfants.html',
        })
        assert.include(messages[1], {
            n: 'Navigue vers une thématique depuis une autre thématique',
            p: '{"chemin":"/conseils-pour-les-enfants.html → /pass-sanitaire-qr-code-voyages.html"}',
            u: 'http://localhost/conseils-pour-les-enfants.html',
        })
        assert.include(messages[2], {
            n: 'pageview',
            u: 'http://localhost/pass-sanitaire-qr-code-voyages.html',
        })
    })

    it('je veux des conseils personnalisés', async function () {
        const page = this.test.page

        let messages = recordConsoleMessages(page)
        await page.goto('http://localhost:8080/conseils-pour-les-enfants.html')
        await page.click('.cta a >> text="Je veux des conseils personnalisés"')

        assert.lengthOf(messages, 2)
        assert.include(messages[0], {
            n: 'pageview',
            u: 'http://localhost/conseils-pour-les-enfants.html',
        })
        assert.include(messages[1], {
            n: 'Je veux des conseils personnalisés',
            u: 'http://localhost/conseils-pour-les-enfants.html',
        })
    })
})