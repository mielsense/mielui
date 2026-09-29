import { expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import AppPreviewFixture from '../fixtures/AppPreviewFixture.svelte';

it('puts the invoice action below the notification and opens the affected invoice', async () => {
    render(AppPreviewFixture);
    await page.getByRole('button', { name: 'Actions for INV-2279' }).click();
    await page.getByRole('menuitem', { name: 'Record payment' }).click();
    await expect.element(page.getByText('Payment recorded')).toBeVisible();
    const action = page.getByRole('button', { name: 'View invoice' });
    await expect.element(action).toBeVisible();
    const content = document.querySelector<HTMLElement>('[data-ui="toast-content"]');
    expect(content).not.toBeNull();
    if (!content) {
        return;
    }
    expect(action.element().getBoundingClientRect().top).toBeGreaterThanOrEqual(
        content.getBoundingClientRect().bottom
    );
    await action.click();
    await expect
        .element(page.getByRole('textbox', { name: 'Search invoices' }))
        .toHaveValue('INV-2279');
    await expect.element(page.getByRole('cell', { name: 'Paid', exact: true })).toBeVisible();
    await expect.element(page.getByText('Payment recorded')).not.toBeInTheDocument();
});
