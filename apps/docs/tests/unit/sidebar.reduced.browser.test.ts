import { expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import SidebarFixture from '../fixtures/SidebarFixture.svelte';

it('changes the footprint immediately and survives rapid reversal with reduced motion', async () => {
    render(SidebarFixture);
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    const slot = document.querySelector<HTMLElement>('[data-ui="sidebar-slot"]');
    if (!slot) {
        throw new Error('Missing navigation slot');
    }
    expect(Math.round(slot.getBoundingClientRect().width)).toBe(56);
    const trigger = page.getByRole('button', { name: 'Toggle navigation' }).element();
    if (!(trigger instanceof HTMLElement)) {
        throw new Error('Expected a native trigger');
    }
    trigger.click();
    trigger.click();
    trigger.click();
    await expect
        .element(page.getByLabelText('Context state'))
        .toHaveTextContent('true/true/240/false/false');
    await expect.poll(() => Math.round(slot.getBoundingClientRect().width)).toBe(240);
});
