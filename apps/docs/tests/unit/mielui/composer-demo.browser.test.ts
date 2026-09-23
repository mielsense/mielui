import { expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import Submitting from '../../../src/routes/docs/components/composer/examples/submitting.svelte';

it('stops controlled work and preserves the prompt for another attempt', async () => {
    render(Submitting);
    await page.getByRole('button', { name: 'Send', exact: true }).click();
    await page.getByRole('button', { name: 'Stop response', exact: true }).click();
    await expect
        .element(page.getByRole('status'))
        .toHaveTextContent('Stopped. Your prompt is still here.');
    await expect
        .element(page.getByRole('textbox', { name: 'Deployment prompt' }))
        .toHaveValue('Check the deployment plan.');
    await expect.element(page.getByRole('button', { name: 'Send', exact: true })).toBeEnabled();
});
