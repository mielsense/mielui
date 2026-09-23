import { expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import ReasoningTriggerFixture from '../../fixtures/ReasoningTriggerFixture.svelte';

it('runs the supplied click handler and lets it cancel toggling', async () => {
    render(ReasoningTriggerFixture);
    const trigger = page.getByRole('button', { name: 'Thought for 4.8s' });
    await trigger.click();
    await expect.element(page.getByText('1 clicks')).toBeVisible();
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
    await page.getByRole('button', { name: 'Allow toggling' }).click();
    await trigger.click();
    await expect.element(page.getByText('2 clicks')).toBeVisible();
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
});
