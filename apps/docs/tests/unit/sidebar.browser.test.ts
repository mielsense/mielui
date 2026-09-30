import { expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import SidebarFixture from '../fixtures/SidebarFixture.svelte';
import SidebarLazyFixture from '../fixtures/SidebarLazyFixture.svelte';

function requiredElement(selector: string) {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) {
        throw new Error(`Missing ${selector}`);
    }
    return element;
}

it('keeps bindings, context, widths, draft, and scroll position through collapse and pinning', async () => {
    render(SidebarFixture);
    await expect
        .element(page.getByLabelText('Context state'))
        .toHaveTextContent('true/true/240/false/false');
    const draft = page.getByRole('textbox', { name: 'Navigation draft' });
    await draft.fill('Release draft');
    const content = requiredElement('[data-ui="sidebar-content"]');
    content.scrollTop = 50;
    const original = draft.element();
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    await expect
        .element(page.getByLabelText('Context state'))
        .toHaveTextContent('false/true/240/false/false');
    await expect.element(page.getByRole('link', { name: 'Overview' })).toBeVisible();
    const slot = requiredElement('[data-ui="sidebar-slot"]');
    await expect.poll(() => Math.round(slot.getBoundingClientRect().width)).toBe(56);
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    expect(draft.element()).toBe(original);
    await expect.element(draft).toHaveValue('Release draft');
    expect(content.scrollTop).toBe(50);
    await page.getByRole('button', { name: 'Unpin Navigation' }).last().click();
    await expect
        .element(page.getByLabelText('Context state'))
        .toHaveTextContent('true/false/240/false/false');
    await expect.poll(() => Math.round(slot.getBoundingClientRect().width)).toBe(56);
    await page.getByRole('button', { name: 'Pin Navigation' }).first().click();
    await expect.poll(() => Math.round(slot.getBoundingClientRect().width)).toBe(240);
});

it('clamps keyboard resizing and handles end panels and RTL independently', async () => {
    render(SidebarFixture, { rtl: true });
    const handle = page.getByRole('separator', { name: 'Resize Navigation' });
    await handle.click();
    await userEvent.keyboard('{ArrowLeft}');
    await expect.element(handle).toHaveAttribute('aria-valuenow', '248');
    await userEvent.keyboard('{Home}');
    await expect.element(handle).toHaveAttribute('aria-valuenow', '180');
    await userEvent.keyboard('{End}');
    await expect.element(handle).toHaveAttribute('aria-valuenow', '360');
    await page.getByRole('button', { name: 'Set oversized width' }).click();
    await expect
        .element(page.getByLabelText('Binding state'))
        .toHaveTextContent('true/true/360/false/3');
    await page.getByRole('button', { name: 'Toggle details' }).click();
    const endHandle = page.getByRole('separator', { name: 'Resize Details' });
    await endHandle.click();
    await expect.element(endHandle).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect.element(endHandle).toHaveAttribute('aria-valuenow', '208');
    await expect.element(handle).toHaveAttribute('aria-valuenow', '360');
});

it('keeps custom rail content inert and preserves the full panel DOM', async () => {
    render(SidebarFixture, { customRail: true });
    const draft = page.getByRole('textbox', { name: 'Navigation draft' });
    await draft.fill('Keep this draft');
    const node = draft.element();
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    await expect.element(page.getByRole('button', { name: 'Custom rail' })).toBeVisible();
    expect(node.isConnected).toBe(true);
    expect(node.closest('[inert]')).not.toBeNull();
    await expect.element(node).not.toBeVisible();
    expect(node.getBoundingClientRect().height).toBe(0);
    await page.getByRole('button', { name: 'Custom rail' }).click();
    await expect.element(draft).toHaveValue('Keep this draft');
    expect(draft.element()).toBe(node);
});

it('opens a modal at the container breakpoint and returns focus on Escape', async () => {
    render(SidebarFixture, { containerWidth: 390 });
    await expect
        .element(page.getByRole('textbox', { name: 'Navigation draft' }))
        .not.toBeInTheDocument();
    const trigger = page.getByRole('button', { name: 'Toggle navigation' });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'Navigation' });
    await expect.element(dialog).toBeVisible();
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(document.querySelector('[data-ui="sidebar-main"]')?.closest('[inert]')).not.toBeNull();
    await userEvent.keyboard('{Escape}');
    await expect.element(dialog).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
    await expect
        .element(page.getByLabelText('Context state'))
        .toHaveTextContent('true/true/240/true/false');
});

it('does not collapse fixed panels on desktop', async () => {
    render(SidebarFixture, { fixed: true });
    await expect
        .element(page.getByRole('button', { name: 'Toggle navigation' }))
        .not.toBeInTheDocument();
    await page.getByRole('button', { name: 'Close through context' }).click();
    await expect
        .element(page.getByLabelText('Context state'))
        .toHaveTextContent('true/true/240/false/false');
});

it('isolates two Roots that reuse the same panel ids', async () => {
    const first = render(SidebarFixture);
    const second = render(SidebarFixture);
    const roots = [...document.querySelectorAll<HTMLElement>('[data-ui="sidebar-root"]')];
    expect(roots).toHaveLength(2);
    const trigger = roots[0].querySelector<HTMLButtonElement>('[aria-label="Toggle navigation"]');
    if (!trigger) {
        throw new Error('Missing first navigation trigger');
    }
    trigger.click();
    await expect
        .poll(() => roots[0].querySelector('output[aria-label="Context state"]')?.textContent)
        .toBe('false/true/240/false/false');
    expect(roots[1].querySelector('output[aria-label="Context state"]')?.textContent).toBe(
        'true/true/240/false/false'
    );
    await first.unmount();
    await second.unmount();
});

it('hands mobile focus to another panel and preserves desktop state after resizing', async () => {
    const screen = render(SidebarFixture, { containerWidth: 390 });
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    await expect.element(page.getByRole('dialog', { name: 'Navigation' })).toBeVisible();
    await userEvent.keyboard('{Tab}{Tab}{Tab}{Tab}{Tab}{Tab}');
    expect(document.querySelector('[role="dialog"]')?.contains(document.activeElement)).toBe(true);
    await userEvent.keyboard('{Escape}');
    await page.getByRole('button', { name: 'Toggle details' }).click();
    await expect.element(page.getByRole('dialog', { name: 'Details' })).toBeVisible();
    await expect.poll(() => document.querySelectorAll('[role="dialog"]').length).toBe(1);
    await screen.rerender({ containerWidth: 900 });
    await expect.element(page.getByRole('dialog', { name: 'Details' })).not.toBeInTheDocument();
    await expect
        .element(page.getByLabelText('Context state'))
        .toHaveTextContent('true/true/240/false/false');
    expect(document.body.style.overflow).not.toBe('hidden');
});

it('drags the resize edge with pointer capture and commits a bounded width', async () => {
    render(SidebarFixture);
    const handle = page.getByRole('separator', { name: 'Resize Navigation' });
    await userEvent.dragAndDrop(handle, page.getByRole('button', { name: 'Main action' }));
    await expect
        .poll(() => Number(handle.element().getAttribute('aria-valuenow')))
        .toBeGreaterThan(240);
    const width = Number(handle.element().getAttribute('aria-valuenow'));
    expect(width).toBeLessThanOrEqual(360);
    const state = page.getByLabelText('Context state').element().textContent?.split('/') ?? [];
    expect(Math.round(Number(state[2]))).toBe(width);
    expect(state.slice(3)).toEqual(['false', 'false']);
});

it('mounts lazily and unregisters panels without restarting the parent render', async () => {
    render(SidebarLazyFixture);
    await page.getByRole('button', { name: 'Toggle fixture' }).click();
    await expect.element(page.getByRole('link', { name: 'Overview' })).toBeVisible();
    await page.getByRole('button', { name: 'Toggle fixture' }).click();
    await expect.element(page.getByRole('link', { name: 'Overview' })).not.toBeInTheDocument();
    await page.getByRole('button', { name: 'Toggle fixture' }).click();
    await expect
        .element(page.getByLabelText('Context state'))
        .toHaveTextContent('true/true/240/false/false');
});

it('hides offcanvas chrome after interrupted open and close transitions', async () => {
    render(SidebarFixture);
    const trigger = page.getByRole('button', { name: 'Toggle details' });
    await trigger.click();
    await trigger.click();
    await trigger.click();
    await expect.element(page.getByRole('button', { name: 'Inspect item' })).toBeVisible();
    await page.getByRole('button', { name: 'Close Details' }).click();
    await expect.element(trigger).toHaveFocus();
    const panel = document.querySelector<HTMLElement>(
        '[data-ui="sidebar-panel"][aria-label="Details"]'
    );
    if (!panel) {
        throw new Error('Missing Details panel');
    }
    expect(panel.inert).toBe(true);
    await expect.poll(() => getComputedStyle(panel).visibility).toBe('hidden');
});

it('carries local theme and direction into a mobile drawer portal', async () => {
    render(SidebarFixture, { containerWidth: 390, rtl: true });
    const root = requiredElement('[data-ui="sidebar-root"]');
    root.style.setProperty('--color-background', 'rgb(12, 34, 56)');
    root.style.setProperty('--motion-duration-panel', '0ms');
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    const dialog = page.getByRole('dialog', { name: 'Navigation' });
    await expect.element(dialog).toHaveAttribute('dir', 'rtl');
    await expect
        .poll(() =>
            getComputedStyle(dialog.element()).getPropertyValue('--color-background').trim()
        )
        .toBe('rgb(12, 34, 56)');
    await expect
        .poll(() =>
            getComputedStyle(dialog.element()).getPropertyValue('--motion-duration-panel').trim()
        )
        .toBe('0ms');
});

it('honors a zero-duration theme after mount', async () => {
    render(SidebarFixture);
    const root = requiredElement('[data-ui="sidebar-root"]');
    root.style.setProperty('--motion-duration-panel', '0ms');
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    const slot = requiredElement('[data-ui="sidebar-slot"]');
    expect(Math.round(slot.getBoundingClientRect().width)).toBe(56);
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    expect(Math.round(slot.getBoundingClientRect().width)).toBe(240);
});

it('dismisses an unpinned desktop panel and returns focus on Escape', async () => {
    render(SidebarFixture);
    await page.getByRole('button', { name: 'Unpin Navigation' }).last().click();
    const slot = requiredElement('[data-ui="sidebar-slot"]');
    await expect.poll(() => Math.round(slot.getBoundingClientRect().width)).toBe(56);
    await page.getByRole('textbox', { name: 'Navigation draft' }).click();
    await userEvent.keyboard('{Escape}');
    await expect
        .element(page.getByLabelText('Context state'))
        .toHaveTextContent('false/false/240/false/false');
    await expect.element(page.getByRole('button', { name: 'Toggle navigation' })).toHaveFocus();
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    await page.getByRole('button', { name: 'Main action' }).click();
    await expect
        .element(page.getByLabelText('Context state'))
        .toHaveTextContent('false/false/240/false/false');
});

it('insets Main while keeping navigation flat and preserves content when variants change', async () => {
    const screen = render(SidebarFixture, { panelVariant: 'inset' });
    const main = requiredElement('[data-ui="sidebar-main"]');
    const panel = requiredElement('[data-ui="sidebar-panel"][aria-label="Navigation"]');
    await expect.poll(() => main.dataset.variant).toBe('inset');
    expect(main.classList.contains('mielui-inset-frame')).toBe(true);
    expect(panel.classList.contains('mielui-inset-frame')).toBe(false);
    const surface = requiredElement('[data-ui="sidebar-main-surface"]');
    expect(surface.classList.contains('mielui-inset-surface')).toBe(true);
    const action = page.getByRole('button', { name: 'Main action' }).element();
    await screen.rerender({ panelVariant: 'default' });
    await expect.poll(() => main.dataset.variant).toBe('default');
    expect(page.getByRole('button', { name: 'Main action' }).element()).toBe(action);
    expect(surface.classList.contains('mielui-inset-surface')).toBe(false);
    await screen.rerender({ panelVariant: 'floating' });
    await expect.poll(() => panel.classList.contains('mielui-inset-frame')).toBe(true);
    expect(main.classList.contains('mielui-inset-frame')).toBe(false);
});
