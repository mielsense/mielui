import { expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import HeatmapTooltipFixture from '../../fixtures/HeatmapTooltipFixture.svelte';

it('shares one positioned tooltip across focused cells and dismisses on Escape', async () => {
    render(HeatmapTooltipFixture);
    await userEvent.tab();
    await expect
        .poll(() => document.querySelector('.mielui-tooltip')?.textContent)
        .toContain('12 contributions');
    expect(document.querySelector('[data-date="2026-09-15"]')?.hasAttribute('title')).toBe(false);
    await userEvent.keyboard('{ArrowUp}');
    await expect
        .poll(() => document.querySelector('.mielui-tooltip')?.textContent)
        .toContain('September 14');
    expect(document.querySelectorAll('.mielui-tooltip')).toHaveLength(1);
    await userEvent.keyboard('{Escape}');
    await expect
        .poll(
            () => (document.querySelector('.mielui-tooltip') as HTMLElement | null)?.style.opacity
        )
        .toBe('0');
});

it('retains native titles when the optional tooltip part is omitted', async () => {
    render(HeatmapTooltipFixture, { tooltip: false });
    expect(document.querySelector('[data-date="2026-09-15"]')?.getAttribute('title')).toContain(
        '12 contributions'
    );
});
