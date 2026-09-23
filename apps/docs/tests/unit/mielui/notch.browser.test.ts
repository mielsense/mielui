import { expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import NotchFixture from '../../fixtures/NotchFixture.svelte';

it('opens without moving focus and returns focus when its focused close control disappears', async () => {
    render(NotchFixture);
    const trigger = page.getByRole('button', { name: 'Toggle notch' });
    await expect.element(page.getByText('Export ready')).not.toBeVisible();
    await trigger.click();
    await expect.element(page.getByText('Export ready')).toBeVisible();
    await expect.element(trigger).toHaveFocus();
    await page.getByRole('button', { name: 'Close notification' }).click();
    await expect.element(page.getByText('Export ready')).not.toBeVisible();
    await expect.element(trigger).toHaveFocus();
});

it('closes on Escape inside and reverses interrupted exits', async () => {
    render(NotchFixture);
    const trigger = page.getByRole('button', { name: 'Toggle notch' });
    await trigger.click();
    const close = page.getByRole('button', { name: 'Close notification' });
    (close.element() as HTMLButtonElement).focus();
    close.element().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await expect.element(trigger).toHaveFocus();
    await trigger.click();
    await expect.element(page.getByText('Export ready')).toBeVisible();
    await expect
        .poll(() => document.querySelector('[data-ui="notch-content"]')?.matches(':popover-open'))
        .toBe(true);
});

it('resizes with content and constrains tall content to a scrollable viewport', async () => {
    render(NotchFixture, { noMotion: true, tall: true });
    await page.getByRole('button', { name: 'Toggle notch' }).click();
    await expect.element(page.getByText('Export ready')).toBeVisible();
    const content = document.querySelector('[data-ui="notch-content"]') as HTMLElement;
    const body = content.querySelector('[data-ui=notch-body]') as HTMLElement;
    await expect.poll(() => body.scrollHeight > body.clientHeight).toBe(true);
    expect(content.getBoundingClientRect().height).toBeLessThanOrEqual(window.innerHeight);
    body.scrollTop = body.scrollHeight;
    await page.getByRole('button', { name: 'Toggle details' }).click();
    await expect
        .element(page.getByText('Revenue, subscribers, and summary reports are ready to download.'))
        .toBeVisible();
});

it.each(['top', 'bottom', 'left', 'right'] as const)(
    'anchors to the %s viewport edge with motion disabled',
    async (side) => {
        render(NotchFixture, { side, noMotion: true });
        await page.getByRole('button', { name: 'Toggle notch' }).click();
        await expect.element(page.getByText('Export ready')).toBeVisible();
        const node = document.querySelector('[data-ui="notch-content"]') as HTMLElement;
        await expect
            .poll(() => {
                const box = node.getBoundingClientRect();
                if (side === 'top') {
                    return Math.abs(box.top);
                }
                if (side === 'bottom') {
                    return Math.abs(window.innerHeight - box.bottom);
                }
                if (side === 'left') {
                    return Math.abs(box.left);
                }
                return Math.abs(window.innerWidth - box.right);
            })
            .toBeLessThan(1);
    }
);

it('follows expanded content without clipping it and shrinks again', async () => {
    render(NotchFixture, { noMotion: true });
    await page.getByRole('button', { name: 'Toggle notch' }).click();
    await expect.element(page.getByText('Export ready')).toBeVisible();
    const node = document.querySelector('[data-ui="notch-content"]') as HTMLElement;
    await expect.poll(() => node.getBoundingClientRect().height).toBeGreaterThan(100);
    const height = node.getBoundingClientRect().height;
    await page.getByRole('button', { name: 'Toggle details' }).click();
    await expect.poll(() => node.getBoundingClientRect().height).toBeGreaterThan(height + 10);
    await page.getByRole('button', { name: 'Toggle details' }).click();
    await expect.poll(() => Math.abs(node.getBoundingClientRect().height - height)).toBeLessThan(1);
});

it('pauses triggered dismissal while hovered or focused and resumes remaining time', async () => {
    render(NotchFixture, { noMotion: true, duration: 300 });
    await page.getByRole('button', { name: 'Toggle notch' }).click();
    const host = document.querySelector('[data-ui="notch-content"]') as HTMLElement;
    host.dispatchEvent(new PointerEvent('pointerenter'));
    await new Promise((resolve) => setTimeout(resolve, 400));
    await expect.element(page.getByText('Export ready')).toBeVisible();
    const details = page
        .getByRole('button', { name: 'Toggle details' })
        .element() as HTMLButtonElement;
    details.focus();
    host.dispatchEvent(new PointerEvent('pointerleave'));
    await new Promise((resolve) => setTimeout(resolve, 400));
    await expect.element(page.getByText('Export ready')).toBeVisible();
    (page.getByRole('button', { name: 'Outside action' }).element() as HTMLButtonElement).focus();
    await expect.element(page.getByText('Export ready')).not.toBeVisible();
});

it('keeps a peek rail visible, expands on hover and keyboard focus, and collapses on leave', async () => {
    render(NotchFixture, { noMotion: true, mode: 'peek', customPeek: true });
    const handle = page.getByRole('button', { name: 'Expand notification' });
    await expect.element(handle).toBeVisible();
    await expect.element(page.getByText('3 reports')).toBeVisible();
    const host = document.querySelector('[data-ui="notch-content"]') as HTMLElement;
    host.dispatchEvent(new PointerEvent('pointerenter'));
    await expect.element(page.getByText('Export ready')).toBeVisible();
    host.dispatchEvent(new PointerEvent('pointerleave'));
    await expect.element(handle).toBeVisible();
    (handle.element() as HTMLButtonElement).focus();
    await expect.element(page.getByText('Export ready')).toBeVisible();
    await expect.poll(() => host.contains(document.activeElement)).toBe(true);
    host.dispatchEvent(new PointerEvent('pointerleave'));
    await expect.element(page.getByText('Export ready')).toBeVisible();
    (page.getByRole('button', { name: 'Outside action' }).element() as HTMLButtonElement).focus();
    await expect.element(handle).toBeVisible();
});

it('dismisses a triggered notch only when swiped toward its attached edge', async () => {
    render(NotchFixture, { noMotion: true });
    await page.getByRole('button', { name: 'Toggle notch' }).click();
    const host = document.querySelector('[data-ui="notch-content"]') as HTMLElement;
    const gesture = (endY: number) => {
        host.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
                bubbles: true,
                clientX: 200,
                clientY: 100,
                button: 0
            })
        );
        host.dispatchEvent(
            new PointerEvent('pointermove', {
                pointerId: 1,
                bubbles: true,
                clientX: 200,
                clientY: endY
            })
        );
        host.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 1,
                bubbles: true,
                clientX: 200,
                clientY: endY
            })
        );
    };
    gesture(160);
    await expect.element(page.getByText('Export ready')).toBeVisible();
    gesture(30);
    await expect.element(page.getByText('Export ready')).not.toBeVisible();
});

it('returns focus outside when peek content closes from a focused action', async () => {
    render(NotchFixture, { mode: 'peek', noMotion: true });
    const outside = page.getByRole('button', { name: 'Toggle notch' });
    (outside.element() as HTMLButtonElement).focus();
    await outside.click();
    const close = page.getByRole('button', { name: 'Close notification' });
    await expect.element(close).toBeVisible();
    (close.element() as HTMLButtonElement).focus();
    close.element().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await expect.element(outside).toHaveFocus();
    await expect.element(page.getByRole('button', { name: 'Expand notification' })).toBeVisible();
});

it.each(['top', 'bottom', 'left', 'right'] as const)(
    'places detached actions outside the %s panel',
    async (side) => {
        render(NotchFixture, { side, noMotion: true, sideActions: true });
        await page.getByRole('button', { name: 'Toggle notch' }).click();
        await page.getByRole('region', { name: 'Task activity' }).hover();
        const start = page.getByRole('button', { name: 'Previous task' });
        const end = page.getByRole('button', { name: 'Next task' });
        await expect.element(start).toBeVisible();
        await expect.element(end).toBeVisible();
        await expect
            .poll(() => {
                const panel = document
                    .querySelector('[data-ui="notch-content"]')
                    ?.getBoundingClientRect();
                if (!panel) {
                    return false;
                }
                const before = start.element().getBoundingClientRect();
                const after = end.element().getBoundingClientRect();
                return side === 'top' || side === 'bottom'
                    ? before.right < panel.left + 12 && after.left > panel.right - 12
                    : before.bottom < panel.top + 12 && after.top > panel.bottom - 12;
            })
            .toBe(true);
    }
);

it('shows curved action arcs at rest and reveals their buttons on keyboard focus', async () => {
    render(NotchFixture, { noMotion: true, sideActions: true });
    await page.getByRole('button', { name: 'Toggle notch' }).click();
    const action = page.getByRole('button', { name: 'Next task' });
    await expect.element(action).toBeInTheDocument();
    await expect
        .poll(() => getComputedStyle(action.element().parentElement as HTMLElement).opacity)
        .toBe('0');
    const host = action.element().closest('[data-ui=notch-side-action]') as HTMLElement;
    expect(host.querySelector('circle')).toHaveAttribute('stroke-dasharray', '25 75');
    const bounds = host.getBoundingClientRect();
    expect(bounds.top).toBeGreaterThanOrEqual(0);
    expect(bounds.top).toBeLessThan(16);
    (action.element() as HTMLButtonElement).focus();
    await expect
        .poll(() => getComputedStyle(action.element().parentElement as HTMLElement).opacity)
        .toBe('1');
    await expect.element(action).toHaveFocus();
});

it('keeps the notch open when an outward swipe reverses before release', async () => {
    render(NotchFixture, { noMotion: true });
    await page.getByRole('button', { name: 'Toggle notch' }).click();
    const host = document.querySelector('[data-ui="notch-content"]') as HTMLElement;
    for (const [type, clientY] of [
        ['pointerdown', 100],
        ['pointermove', 30],
        ['pointermove', 110],
        ['pointerup', 110]
    ] as const) {
        host.dispatchEvent(
            new PointerEvent(type, {
                pointerId: 1,
                bubbles: true,
                clientX: 200,
                clientY,
                button: 0
            })
        );
    }
    await expect.element(page.getByText('Export ready')).toBeVisible();
});
