import { tick } from 'svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import ComposerFixture from '../../fixtures/ComposerFixture.svelte';

function composerParts() {
    const input = document.querySelector<HTMLTextAreaElement>('[data-ui="composer-input"]');
    const toolbar = document.querySelector<HTMLElement>('[data-ui="composer-toolbar"]');

    if (!input || !toolbar) {
        throw new Error('Composer input and toolbar must be rendered');
    }

    return { input, toolbar };
}

afterEach(() => {
    document.documentElement.style.removeProperty('--mielui-border-inset-scale');
});

describe('Composer layout', () => {
    for (const theme of ['light', 'dark']) {
        for (const borders of ['single', 'double']) {
            it(`keeps compact input and separate actions in ${theme} with ${borders} borders`, async () => {
                document.documentElement.classList.toggle('dark', theme === 'dark');
                document.documentElement.style.setProperty(
                    '--mielui-border-inset-scale',
                    borders === 'single' ? '0' : '1'
                );
                render(ComposerFixture);
                await tick();

                const { input, toolbar } = composerParts();
                const initialHeight = input.getBoundingClientRect().height;
                expect(initialHeight).toBeLessThan(100);
                expect(parseFloat(getComputedStyle(input).borderBottomLeftRadius)).toBeGreaterThan(
                    0
                );
                expect(toolbar.getBoundingClientRect().top).toBeGreaterThanOrEqual(
                    input.getBoundingClientRect().bottom
                );

                await page
                    .getByRole('textbox', { name: 'Prompt' })
                    .fill('Release notes\n'.repeat(20));
                await tick();
                expect(input.getBoundingClientRect().height).toBeGreaterThan(initialHeight);
                expect(input.getBoundingClientRect().height).toBeLessThanOrEqual(
                    parseFloat(getComputedStyle(input).maxHeight) + 1
                );
                expect(getComputedStyle(input).overflowY).toBe('auto');

                await page.getByRole('textbox', { name: 'Prompt' }).fill('');
                await tick();
                expect(input.getBoundingClientRect().height).toBeCloseTo(initialHeight, 0);
            });
        }
    }

    it('joins the action row only when inset placement is requested', async () => {
        render(ComposerFixture, { toolbarVariant: 'inset' });
        await tick();

        const { input, toolbar } = composerParts();
        expect(parseFloat(getComputedStyle(input).borderBottomLeftRadius)).toBe(0);
        expect(parseFloat(getComputedStyle(toolbar).borderTopLeftRadius)).toBe(0);
        expect(toolbar.getBoundingClientRect().top).toBeLessThanOrEqual(
            input.getBoundingClientRect().bottom
        );
    });
});
