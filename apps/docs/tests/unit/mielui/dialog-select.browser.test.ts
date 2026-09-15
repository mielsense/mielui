import { tick } from 'svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import DialogSelectFixture from '../../fixtures/DialogSelectFixture.svelte';

async function flush() {
    await tick();
    await tick();
    await new Promise((r) => setTimeout(r, 20));
}

afterEach(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
});

describe('Select inside Dialog', () => {
    it('keeps the dialog open when a Select option is chosen', async () => {
        render(DialogSelectFixture, { open: true });
        await flush();

        await page.getByTestId('select-trigger').click();
        await flush();
        await page.getByTestId('opt-ada').click();
        await flush();

        await expect
            .element(page.getByText('Choose an owner for this project.'))
            .toBeInTheDocument();
        await expect.element(page.getByText('Ada')).toBeInTheDocument();
    });

    it('keeps the dialog open when clicking outside the Select', async () => {
        render(DialogSelectFixture, { open: true });
        await flush();

        await page.getByTestId('select-trigger').click();
        await flush();
        await expect.element(page.getByTestId('opt-ada')).toBeInTheDocument();

        const dismiss = document.querySelector('[data-ui="popover-dismiss"]') as HTMLElement;
        expect(dismiss).toBeTruthy();
        await userEvent.click(dismiss);
        await flush();

        await expect.element(page.getByTestId('opt-ada')).not.toBeInTheDocument();
        await expect
            .element(page.getByText('Choose an owner for this project.'))
            .toBeInTheDocument();
    });
});
