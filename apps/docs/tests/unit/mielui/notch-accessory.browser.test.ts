import { expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import Fixture from '../../fixtures/NotchAccessoryFixture.svelte';

it.each(['top', 'bottom', 'left', 'right'] as const)(
    'positions accessory outside the %s body',
    async (side) => {
        render(Fixture, { side });
        await page.getByRole('button', { name: 'Toggle accessory' }).click();
        await expect.element(page.getByRole('button', { name: '3 of 5' })).toBeVisible();
        const body = document.querySelector<HTMLElement>('[data-ui="notch-content"]');
        const accessory = document.querySelector<HTMLElement>('[data-ui="notch-accessory"]');
        if (!body || !accessory) {
            throw new Error('Missing notch parts');
        }
        await expect
            .poll(() => {
                const bounds = body.getBoundingClientRect();
                const outside = accessory.getBoundingClientRect();
                if (side === 'top') {
                    return outside.top - bounds.bottom;
                }
                if (side === 'bottom') {
                    return bounds.top - outside.bottom;
                }
                if (side === 'left') {
                    return outside.left - bounds.right;
                }
                return bounds.left - outside.right;
            })
            .toBeGreaterThan(0);
        const bounds = body.getBoundingClientRect();
        const outside = accessory.getBoundingClientRect();
        expect(
            side === 'top' || side === 'bottom'
                ? outside.left + outside.width / 2 - (bounds.left + bounds.width / 2)
                : outside.top + outside.height / 2 - (bounds.top + bounds.height / 2)
        ).toBeCloseTo(0, 0);
        (page.getByRole('button', { name: '3 of 5' }).element() as HTMLButtonElement).focus();
        await userEvent.keyboard('{Escape}');
        await expect.element(page.getByText('3 of 5')).not.toBeVisible();
        await expect.element(page.getByRole('button', { name: 'Toggle accessory' })).toHaveFocus();
    }
);

it('pauses automatic dismissal while an accessory control has focus', async () => {
    const view = render(Fixture, { duration: 0 });
    await page.getByRole('button', { name: 'Toggle accessory' }).click();
    const counter = page.getByRole('button', { name: '3 of 5' });
    await expect.element(counter).toBeVisible();
    (counter.element() as HTMLButtonElement).focus();
    await expect.element(counter).toHaveFocus();
    await view.rerender({ duration: 300 });
    await new Promise((resolve) => setTimeout(resolve, 400));
    await expect.element(counter).toBeVisible();
    (page.getByRole('button', { name: 'Toggle accessory' }).element() as HTMLButtonElement).focus();
    await expect.element(page.getByText('3 of 5')).not.toBeVisible();
});
