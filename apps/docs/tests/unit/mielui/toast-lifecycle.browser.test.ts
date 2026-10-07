import {
    __getActiveToastStateForTests,
    __setActiveToastStateForTests,
    toast
} from '@mielui/svelte/components/toast/lib.svelte';
import { tick } from 'svelte';
import { afterEach, beforeEach, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import ToasterFixture from '../../fixtures/ToasterFixture.svelte';

beforeEach(() => {
    __setActiveToastStateForTests(undefined);
});

afterEach(() => {
    __setActiveToastStateForTests(undefined);
});

it('removes dismissed notifications from active state while the host finishes its outro', async () => {
    render(ToasterFixture);
    const notification = toast.success('Saved changes', { persistent: true });
    await expect.element(page.getByText('Saved changes')).toBeVisible();
    toast.dismiss(notification.id);
    expect(__getActiveToastStateForTests()?.data.toasts).toHaveLength(0);
    await tick();
    await expect.element(page.getByText('Saved changes')).not.toBeInTheDocument();
    toast.success('Saved again', { persistent: true });
    await expect.element(page.getByText('Saved again')).toBeVisible();
    expect(document.querySelectorAll('[aria-label="Notifications"]')).toHaveLength(1);
});

it.each([0, 1])('follows the border setting at border scale %s', async (scale) => {
    const root = document.documentElement;
    const previous = root.style.getPropertyValue('--mielui-border-inset-scale');
    root.style.setProperty('--mielui-border-inset-scale', String(scale));
    try {
        render(ToasterFixture);
        toast.success('Payment recorded', {
            description: 'INV-2261 is marked paid.',
            persistent: true
        });
        await expect.element(page.getByText('INV-2261 is marked paid.')).toBeVisible();
        const host = document.querySelector<HTMLElement>('[data-ui="toast"]');
        const content = host?.querySelector<HTMLElement>('[data-ui="toast-content"]');
        expect(host).not.toBeNull();
        expect(content).not.toBeNull();
        if (!host || !content) {
            return;
        }
        for (const dark of [false, true]) {
            root.classList.toggle('dark', dark);
            const frame = host.getBoundingClientRect();
            const surface = content.getBoundingClientRect();
            const border = Number.parseFloat(getComputedStyle(host).borderWidth);
            const gutters = [
                surface.left - frame.left - border,
                frame.right - surface.right - border,
                surface.top - frame.top - border,
                frame.bottom - surface.bottom - border
            ];
            for (const gutter of gutters) {
                if (scale === 0) {
                    expect(Math.abs(gutter)).toBeLessThan(0.5);
                } else {
                    expect(gutter).toBeGreaterThan(1);
                }
            }
        }
    } finally {
        root.classList.remove('dark');
        if (previous) {
            root.style.setProperty('--mielui-border-inset-scale', previous);
        } else {
            root.style.removeProperty('--mielui-border-inset-scale');
        }
    }
});
