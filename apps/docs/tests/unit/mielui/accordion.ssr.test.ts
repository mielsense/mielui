import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';
import AccordionFixture from '../../fixtures/AccordionFixture.svelte';

describe('Accordion custom IDs during SSR', () => {
    it('names the open region with the actual custom trigger ID', () => {
        const { body } = render(AccordionFixture, {
            props: {
                value: 'a',
                triggerId: 'server-trigger',
                contentId: 'server-content'
            }
        });
        expect(body).toContain('id="server-trigger"');
        expect(body).toContain('id="server-content"');
        expect(body).toContain('aria-labelledby="server-trigger"');
        for (const reference of body.matchAll(/aria-controls="([^"]+)"/g)) {
            expect(body).toContain(`id="${reference[1]}"`);
        }
    });
});
