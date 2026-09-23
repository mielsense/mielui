import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';
import AccordionFixture from '../../fixtures/AccordionFixture.svelte';

describe('Accordion relationships during SSR', () => {
    it('only references IDs that exist in the rendered output', () => {
        const { body } = render(AccordionFixture, {
            props: {
                value: 'a'
            }
        });
        expect(body).toContain('role="region"');
        expect(body).toContain('aria-labelledby=');
        for (const reference of body.matchAll(/aria-(?:controls|labelledby)="([^"]+)"/g)) {
            expect(body).toContain(`id="${reference[1]}"`);
        }
    });
});
