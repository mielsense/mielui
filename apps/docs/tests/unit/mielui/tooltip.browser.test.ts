import { resetSharedTooltipForTests } from '@mielui/svelte/components/tooltip/shared-tooltip';
import { tick } from 'svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import TooltipFixture from '../../fixtures/TooltipFixture.svelte';

/*
 * Tooltip uses a shared body-level bubble. Tests assert its public surface:
 *   - role="tooltip" on the rendered content
 *   - hover-to-open with the wrapper's configured delay (500ms by default)
 *   - keyboard focus opens at once; a click that focuses waits for the delay
 *   - hover-end-to-close with the wrapper's closeDelay
 *   - delay/closeDelay overrides propagate
 *
 * Popover's general behaviors (positioning, escape, click-outside)
 * are covered in popover.browser.test.ts -- not re-tested here.
 */

async function flush() {
    await tick();
    await tick();
    await new Promise((r) => setTimeout(r, 20));
}

// The visible tooltip is the shared, body-level bubble; Tooltip.Content only
// reports the authored label off-screen (it's always in the DOM).
function bubble() {
    return document.querySelector('[data-mielui-tooltip]') as HTMLElement | null;
}
function tooltipShown() {
    const el = bubble();
    return !!el && el.style.opacity === '1';
}

beforeEach(() => {
    resetSharedTooltipForTests();
});

describe('Tooltip -- closed initially, no bubble shown', () => {
    it('the shared bubble is not shown before hover', async () => {
        render(TooltipFixture, { delay: 10, closeDelay: 10 });
        await flush();
        expect(tooltipShown()).toBe(false);
    });
});

describe('Tooltip -- hover opens after the configured delay', () => {
    it('the bubble becomes visible after the pointer enters the trigger', async () => {
        render(TooltipFixture, { delay: 10, closeDelay: 10 });
        await flush();

        await page.getByTestId('tooltip-trigger').hover();
        // Wait past the open delay + a frame to settle.
        await new Promise((r) => setTimeout(r, 80));
        await flush();

        expect(tooltipShown()).toBe(true);
    });

    it('role="tooltip" is set on the rendered content', async () => {
        render(TooltipFixture, { delay: 10, closeDelay: 10 });
        await flush();
        await page.getByTestId('tooltip-trigger').hover();
        await new Promise((r) => setTimeout(r, 80));
        await flush();

        const tooltipEl = document.querySelector('[role="tooltip"]');
        expect(tooltipEl).toBeInTheDocument();
        // Assert the authored label through the off-screen reporter.
        const body = document.querySelector('[data-testid="tooltip-body"]');
        expect(body?.textContent).toContain('Tooltip content');
    });

    it('uses the default pointer delay of 500ms when not overridden', async () => {
        render(TooltipFixture, {});
        await flush();
        const trigger = document.querySelector('[data-testid="tooltip-trigger"]')?.parentElement;
        trigger?.dispatchEvent(new MouseEvent('mouseenter'));
        await new Promise((r) => setTimeout(r, 250));
        await flush();

        expect(tooltipShown()).toBe(false);

        await new Promise((r) => setTimeout(r, 400));
        await flush();

        expect(tooltipShown()).toBe(true);
    });
});

describe('Tooltip -- focus', () => {
    it('a click that focuses the trigger still waits for the pointer delay', async () => {
        render(TooltipFixture, {});
        await flush();

        await page.getByTestId('tooltip-trigger').click();
        await new Promise((r) => setTimeout(r, 150));
        await flush();

        expect(document.activeElement).toBe(page.getByTestId('tooltip-trigger').element());
        expect(tooltipShown()).toBe(false);
    });

    it('keyboard focus opens at once, whatever the pointer delay', async () => {
        render(TooltipFixture, { delay: 5000 });
        await flush();

        await userEvent.tab();
        await flush();

        expect(document.activeElement).toBe(page.getByTestId('tooltip-trigger').element());
        expect(tooltipShown()).toBe(true);
    });
});

describe('Tooltip -- leave closes after closeDelay', () => {
    it('content goes away after pointer leaves the trigger', async () => {
        render(TooltipFixture, { delay: 10, closeDelay: 10 });
        await flush();

        await page.getByTestId('tooltip-trigger').hover();
        await new Promise((r) => setTimeout(r, 80));
        await flush();
        expect(tooltipShown()).toBe(true);

        // Move pointer away from trigger via synthetic leave events (vitest's
        // BrowserPage has no positional hover; element-level dispatch covers it).
        const trigger = document.querySelector('[data-testid="tooltip-trigger"]')?.parentElement;
        trigger?.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        trigger?.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
        await new Promise((r) => setTimeout(r, 80));
        await flush();

        expect(tooltipShown()).toBe(false);
    });
});

describe('Tooltip -- content is not interactive (aria-modal not applied for role="none" wrapper)', () => {
    it('no aria-modal attribute on the role="tooltip" content', async () => {
        render(TooltipFixture, { delay: 10, closeDelay: 10 });
        await flush();
        await page.getByTestId('tooltip-trigger').hover();
        await new Promise((r) => setTimeout(r, 80));
        await flush();

        const tooltipEl = document.querySelector('[role="tooltip"]');
        expect(tooltipEl).toBeInTheDocument();
        // role="tooltip" must NOT carry aria-modal -- only dialog/alertdialog do.
        expect(tooltipEl?.hasAttribute('aria-modal')).toBe(false);
    });
});
