import { tick } from 'svelte';
import { describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import ContextMenuFixture from '../../fixtures/ContextMenuFixture.svelte';

async function flush() {
    await tick();
    await tick();
    await new Promise((r) => setTimeout(r, 20));
}

async function openContextMenu() {
    const trigger = document.querySelector('[data-testid="ctx-trigger"]') as HTMLElement;
    const event = new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 100,
        clientY: 100
    });
    trigger.dispatchEvent(event);
    await flush();
}

describe('ContextMenu -- open via right-click', () => {
    it('does not show items initially', async () => {
        render(ContextMenuFixture, {});
        await flush();
        await expect.element(page.getByTestId('ctx-copy')).not.toBeInTheDocument();
    });

    it('opens on right-click of the trigger', async () => {
        render(ContextMenuFixture, {});
        await flush();
        await openContextMenu();

        await expect.element(page.getByTestId('ctx-copy')).toBeInTheDocument();
        await expect.element(page.getByTestId('ctx-paste')).toBeInTheDocument();
        await expect.element(page.getByTestId('ctx-delete')).toBeInTheDocument();
        expect(document.querySelectorAll('[role="menu"] .mielui-item-highlight')).toHaveLength(1);
    });

    it('opens after a touch long press', async () => {
        render(ContextMenuFixture, {});
        await flush();

        const trigger = document.querySelector('[data-testid="ctx-trigger"]') as HTMLElement;
        trigger.dispatchEvent(
            new PointerEvent('pointerdown', {
                bubbles: true,
                button: 0,
                pointerType: 'touch',
                clientX: 100,
                clientY: 100
            })
        );
        await flush();

        await expect.element(page.getByTestId('ctx-copy')).toBeInTheDocument();
    });

    it('closes on Escape', async () => {
        render(ContextMenuFixture, {});
        await flush();
        await openContextMenu();

        await userEvent.keyboard('{Escape}');
        await flush();
        await expect.element(page.getByTestId('ctx-copy')).not.toBeInTheDocument();
    });

    it('closes on click outside', async () => {
        render(ContextMenuFixture, {});
        await flush();
        await openContextMenu();
        await expect.element(page.getByTestId('ctx-copy')).toBeInTheDocument();

        const outside = document.createElement('button');
        outside.textContent = 'outside';
        outside.style.position = 'fixed';
        outside.style.pointerEvents = 'auto';
        outside.style.left = '8px';
        outside.style.top = '8px';
        document.body.append(outside);
        try {
            await userEvent.click(outside);
            await expect.element(page.getByTestId('ctx-copy')).not.toBeInTheDocument();
        } finally {
            outside.remove();
        }
    });
});

describe('ContextMenu -- item activation', () => {
    it('fires the item callback on click', async () => {
        const onPaste = vi.fn();
        render(ContextMenuFixture, { onPaste });
        await flush();
        await openContextMenu();

        await page.getByTestId('ctx-paste').click();
        await flush();
        expect(onPaste).toHaveBeenCalledTimes(1);
    });
});

describe('ContextMenu -- positioning', () => {
    it('positions content based on pointer location (style.left/top set)', async () => {
        render(ContextMenuFixture, {});
        await flush();
        await openContextMenu();

        const content = document.querySelector('[data-ui="context-menu-content"]') as HTMLElement;
        expect(content).toBeInTheDocument();
        await expect.poll(() => content.getBoundingClientRect().left).toBeGreaterThanOrEqual(95);
        expect(content.getBoundingClientRect().top).toBeGreaterThanOrEqual(95);
    });
});
