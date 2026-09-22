import { expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import TabsGeometryFixture from '../../fixtures/TabsGeometryFixture.svelte';

function geometry() {
    const list = document.querySelector<HTMLElement>('[data-ui="tabs-list"]');
    const active = list?.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
    const indicator = list?.querySelector<HTMLElement>(':scope > [aria-hidden="true"]');
    if (!list || !active || !indicator) {
        throw new Error('Missing tabs geometry');
    }
    return { list, active, indicator };
}

for (const orientation of ['horizontal', 'vertical'] as const) {
    it(`keeps fractional ${orientation} rail padding balanced through keyboard selection and press scale`, async () => {
        render(TabsGeometryFixture, { orientation });
        await expect.poll(() => geometry().indicator.style.height).not.toBe('');
        const first = geometry();
        const listBounds = first.list.getBoundingClientRect();
        const indicatorBounds = first.indicator.getBoundingClientRect();
        const leading =
            orientation === 'horizontal'
                ? indicatorBounds.top - listBounds.top
                : indicatorBounds.left - listBounds.left;
        const trailing =
            orientation === 'horizontal'
                ? listBounds.bottom - indicatorBounds.bottom
                : listBounds.right - indicatorBounds.right;
        expect(Math.abs(leading - trailing)).toBeLessThan(0.025);
        expect(first.indicator.style.height).not.toBe(
            `${Math.round(parseFloat(first.indicator.style.height))}px`
        );
        await page.getByRole('tab', { name: 'First tab' }).element().focus();
        await userEvent.keyboard(orientation === 'horizontal' ? '{ArrowRight}' : '{ArrowDown}');
        await expect.poll(() => geometry().active.textContent).toContain('Second tab');
        const second = geometry();
        const scroller = document.querySelector<HTMLElement>('[data-testid=scaled-scroll]');
        if (scroller) {
            scroller.scrollLeft = 16;
        }
        second.active.style.scale = '0.94';
        window.dispatchEvent(new Event('resize'));
        await new Promise((resolve) => setTimeout(resolve, 250));
        expect(parseFloat(second.indicator.style.width)).toBeCloseTo(
            parseFloat(getComputedStyle(second.active).width),
            2
        );
        const activeBounds = second.active.getBoundingClientRect();
        const pressedIndicator = second.indicator.getBoundingClientRect();
        expect(pressedIndicator.x + pressedIndicator.width / 2).toBeCloseTo(
            activeBounds.x + activeBounds.width / 2,
            1
        );
        second.active.style.scale = '';
    });
}
