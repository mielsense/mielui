import { tick } from 'svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import NestedDialogFixture from '../../fixtures/NestedDialogFixture.svelte';

async function flush() {
    await tick();
    await tick();
    await new Promise((r) => setTimeout(r, 20));
}

afterEach(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
});

describe('Nested Dialog stacking', () => {
    it('keeps the parent open when nested Cancel is clicked', async () => {
        render(NestedDialogFixture, { outerOpen: true, innerOpen: true });
        await flush();

        await expect
            .element(page.getByText('The new owner gets full control.'))
            .toBeInTheDocument();
        await expect
            .element(page.getByText('Change the name, or transfer this project.'))
            .toBeInTheDocument();

        await page.getByTestId('inner-cancel').click();
        await flush();

        await expect
            .element(page.getByText('The new owner gets full control.'))
            .not.toBeInTheDocument();
        await expect
            .element(page.getByText('Change the name, or transfer this project.'))
            .toBeInTheDocument();
        expect(document.querySelectorAll('[data-ui="dialog-panel"]').length).toBe(1);
    });

    it('does not reopen the nested dialog when the parent is opened again', async () => {
        render(NestedDialogFixture);
        await flush();

        await page.getByTestId('open-outer').click();
        await flush();
        await page.getByTestId('open-inner').click();
        await flush();
        await page.getByTestId('inner-cancel').click();
        await flush();
        await page.getByTestId('outer-cancel').click();
        await expect
            .element(page.getByText('Change the name, or transfer this project.'))
            .not.toBeInTheDocument();
        expect(document.querySelectorAll('[data-ui="dialog-panel"]').length).toBe(0);

        await page.getByTestId('open-outer').click();
        await flush();

        await expect
            .element(page.getByText('Change the name, or transfer this project.'))
            .toBeInTheDocument();
        await expect
            .element(page.getByText('The new owner gets full control.'))
            .not.toBeInTheDocument();
    });

    it('closes only the nested dialog on click-outside', async () => {
        render(NestedDialogFixture, { outerOpen: true, innerOpen: true });
        await flush();

        const nestedScrim = document.querySelector('[data-ui="dialog-overlay"][data-nested]');
        expect(nestedScrim).toBeTruthy();
        (nestedScrim as HTMLElement).click();
        await flush();

        await expect
            .element(page.getByText('The new owner gets full control.'))
            .not.toBeInTheDocument();
        await expect
            .element(page.getByText('Change the name, or transfer this project.'))
            .toBeInTheDocument();
    });

    it('recedes the parent panel and lightens the nested scrim', async () => {
        render(NestedDialogFixture, { outerOpen: true, innerOpen: true });
        await flush();

        const behind = document.querySelector('[data-ui="dialog-panel"][data-stacked="behind"]');
        const nestedScrim = document.querySelector('[data-ui="dialog-overlay"][data-nested]');
        expect(behind).toBeTruthy();
        expect(behind?.textContent).toContain('Change the name, or transfer this project.');
        expect(nestedScrim).toBeTruthy();
    });

    it('closes only the nested dialog on Escape', async () => {
        render(NestedDialogFixture, { outerOpen: true, innerOpen: true });
        await flush();

        await userEvent.keyboard('{Escape}');
        await flush();

        await expect
            .element(page.getByText('The new owner gets full control.'))
            .not.toBeInTheDocument();
        await expect
            .element(page.getByText('Change the name, or transfer this project.'))
            .toBeInTheDocument();
    });
});
