import { tick } from 'svelte';
import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import HoverCardFixture from '../../fixtures/HoverCardFixture.svelte';

async function flush() {
    await tick();
    await tick();
    await new Promise((r) => setTimeout(r, 20));
}

describe('HoverCard -- closed initially', () => {
    it('content is not in the DOM before hover', async () => {
        render(HoverCardFixture, { openDelay: 10, closeDelay: 10 });
        await flush();
        await expect.element(page.getByTestId('hovercard-title')).not.toBeInTheDocument();
    });
});

describe('HoverCard -- hover opens after openDelay', () => {
    it('content appears after pointer enters the trigger', async () => {
        render(HoverCardFixture, { openDelay: 10, closeDelay: 10 });
        await flush();

        await page.getByTestId('hovercard-trigger').hover();
        await new Promise((r) => setTimeout(r, 80));
        await flush();

        await expect.element(page.getByTestId('hovercard-title')).toBeInTheDocument();
        await expect.element(page.getByTestId('hovercard-description')).toBeInTheDocument();
    });

    it('role="dialog" with aria-modal="false" is set on the rendered content', async () => {
        render(HoverCardFixture, { openDelay: 10, closeDelay: 10 });
        await flush();
        await page.getByTestId('hovercard-trigger').hover();
        await new Promise((r) => setTimeout(r, 80));
        await flush();

        const dialog = document.querySelector('[data-ui="hover-card-content"]');
        expect(dialog).toBeInTheDocument();
        expect(dialog?.getAttribute('role')).toBe('dialog');
        expect(dialog?.getAttribute('aria-modal')).toBe('false');
    });

    it('uses default openDelay of 200ms when not overridden (does NOT open at <100ms)', async () => {
        render(HoverCardFixture, {});
        await flush();
        const trigger = document.querySelector('[data-testid="hovercard-trigger"]')?.parentElement;
        trigger?.dispatchEvent(new MouseEvent('mouseenter'));
        await new Promise((r) => setTimeout(r, 40));
        await flush();

        expect(document.querySelector('[data-testid="hovercard-title"]')).not.toBeInTheDocument();
    });
});

describe('HoverCard -- leave closes after closeDelay', () => {
    it('content goes away after pointer leaves the trigger', async () => {
        render(HoverCardFixture, { openDelay: 10, closeDelay: 10 });
        await flush();

        await page.getByTestId('hovercard-trigger').hover();
        await new Promise((r) => setTimeout(r, 80));
        await flush();
        await expect.element(page.getByTestId('hovercard-title')).toBeInTheDocument();

        const trigger = document.querySelector('[data-testid="hovercard-trigger"]')?.parentElement;
        trigger?.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        trigger?.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
        await new Promise((r) => setTimeout(r, 100));
        await flush();

        await expect.element(page.getByTestId('hovercard-title')).not.toBeInTheDocument();
    });
});

describe('HoverCard -- trigger element shape', () => {
    it('renders a keyboard-focusable button when no href', async () => {
        render(HoverCardFixture, { openDelay: 10, closeDelay: 10 });
        await flush();
        const wrapper = document.querySelector('[data-testid="hovercard-trigger"]')?.parentElement;
        expect(wrapper?.tagName.toLowerCase()).toBe('button');
        expect((wrapper as HTMLButtonElement).tabIndex).toBe(0);
    });

    it('renders trigger as <a> when href is provided', async () => {
        render(HoverCardFixture, {
            openDelay: 10,
            closeDelay: 10,
            triggerHref: '/user/123'
        });
        await flush();
        const wrapper = document.querySelector('[data-testid="hovercard-trigger"]')?.parentElement;
        expect(wrapper?.tagName.toLowerCase()).toBe('a');
        expect((wrapper as HTMLAnchorElement | null)?.getAttribute('href')).toBe('/user/123');
    });
});
