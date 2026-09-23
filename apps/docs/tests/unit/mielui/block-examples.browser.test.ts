import { expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import CodeActions from '../../../src/routes/docs/components/code-block/examples/custom-actions.svelte';
import Commands from '../../../src/routes/docs/components/command/examples/with-groups.svelte';
import Streaming from '../../../src/routes/docs/components/markdown/examples/streaming.svelte';
import Retry from '../../../src/routes/docs/components/task-steps/examples/retry.svelte';

it('streams Markdown through a table and supports replay', async () => {
    render(Streaming);
    await page.getByRole('button', { name: 'Start response' }).click();
    await expect.element(page.getByRole('button', { name: 'Stop stream' })).toBeVisible();
    await expect.element(page.getByText('Worker concurrency', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Stop stream' }).click();
    await page.getByRole('button', { name: 'Replay response' }).click();
    await expect.element(page.getByRole('button', { name: 'Stop stream' })).toBeVisible();
});

it('recovers a failed task and completes the remaining steps', async () => {
    render(Retry);
    await page.getByRole('button', { name: 'Retry validation' }).click();
    await expect.element(page.getByText('Validation can continue.', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Complete step' }).click();
    await page.getByRole('button', { name: 'Complete step' }).click();
    await expect.element(page.getByText('Report published.', { exact: true })).toBeVisible();
});

it('edits a code snippet and reports its local query demonstration', async () => {
    render(CodeActions);
    await page.getByRole('button', { name: 'Edit query' }).click();
    await page.getByRole('textbox', { name: 'Query editor' }).fill('SELECT 1;');
    await expect
        .element(page.getByRole('textbox', { name: 'Query editor' }))
        .toHaveValue('SELECT 1;');
    await page.getByRole('button', { name: 'Run query' }).click();
    await expect
        .element(page.getByRole('status'))
        .toHaveTextContent('Demo complete: 12 matching users.');
});

it('reports the selected palette command after closing', async () => {
    render(Commands);
    await page.getByRole('button', { name: 'Open palette' }).click();
    await page.getByRole('option', { name: 'New project' }).click();
    await expect.element(page.getByRole('status')).toHaveTextContent('New project selected');
});
