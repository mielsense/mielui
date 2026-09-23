import { afterEach, beforeEach, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import {
    __getActiveToastStateForTests,
    __setActiveToastStateForTests,
    toast
} from '../../../../../packages/mielui/src/blocks/toast/lib.svelte';
import NotchToastFixture from '../../fixtures/NotchToastFixture.svelte';

beforeEach(() => {
    __setActiveToastStateForTests(undefined);
});

afterEach(() => {
    __setActiveToastStateForTests(undefined);
});

it('opens on demand, updates a promise in place, and closes when dismissed', async () => {
    render(NotchToastFixture);
    await expect.element(page.getByText('Exporting workspace')).not.toBeInTheDocument();
    await page.getByRole('button', { name: 'Begin export' }).click();
    await expect.element(page.getByText('Exporting workspace')).toBeVisible();
    await page.getByRole('button', { name: 'Finish export' }).click();
    await expect.element(page.getByText('Export ready', { exact: true })).toBeVisible();
    await expect.element(page.getByText('Your workspace is ready to download.')).toBeVisible();
    await page.getByRole('region', { name: 'Notifications' }).element().focus();
    await userEvent.keyboard('{Escape}');
    await expect.element(page.getByText('Export ready', { exact: true })).not.toBeVisible();
});

it('keeps another activity visible when one notification is dismissed', async () => {
    render(NotchToastFixture, { side: 'right' });
    await page.getByRole('button', { name: 'Begin export' }).click();
    await page.getByRole('button', { name: 'Add activity' }).click();
    await expect.element(page.getByText('Another activity')).toBeVisible();
    await page.getByRole('button', { name: 'Done', exact: true }).click();
    await expect.element(page.getByText('Exporting workspace')).toBeVisible();
    await expect.element(page.getByText('Another activity')).not.toBeInTheDocument();
});

it('dismisses the store on Escape and opens again for a new notification', async () => {
    render(NotchToastFixture);
    await page.getByRole('button', { name: 'Add activity' }).click();
    const close = page.getByRole('region', { name: 'Notifications' });
    await expect.element(close).toBeVisible();
    await close.element().focus();
    await userEvent.keyboard('{Escape}');
    await expect.element(page.getByText('Another activity')).not.toBeVisible();
    await page.getByRole('button', { name: 'Add activity' }).click();
    await expect.element(page.getByText('Another activity')).toBeVisible();
});

it('shows one notification, selects new arrivals, and navigates without duplicating live regions', async () => {
    render(NotchToastFixture);
    await page.getByRole('button', { name: 'Begin export' }).click();
    await page.getByRole('button', { name: 'Add activity' }).click();
    await expect.element(page.getByText('Another activity')).toBeVisible();
    await expect.element(page.getByText('Exporting workspace')).not.toBeInTheDocument();
    await page.getByRole('region', { name: 'Notifications' }).hover();
    await page.getByRole('button', { name: 'Previous notification' }).click();
    await expect.element(page.getByText('Exporting workspace')).toBeVisible();
    expect(document.querySelectorAll('[data-ui="toast"]')).toHaveLength(1);
    await expect
        .poll(
            () =>
                __getActiveToastStateForTests()?.data.toasts.find(
                    (item) => item.title === 'Exporting workspace'
                )?.paused
        )
        .toBe(true);
    expect(
        __getActiveToastStateForTests()?.data.toasts.find(
            (item) => item.title === 'Another activity'
        )?.paused
    ).toBe(false);
    expect(__getActiveToastStateForTests()?.data.toasts).toHaveLength(2);
    await page.getByRole('button', { name: 'Next notification' }).click();
    await expect.element(page.getByText('Another activity')).toBeVisible();
    await page.getByRole('region', { name: 'Notifications' }).element().focus();
    await userEvent.keyboard('{Escape}');
    await expect.element(page.getByText('Exporting workspace')).toBeVisible();
    expect(__getActiveToastStateForTests()?.data.toasts).toHaveLength(1);
});

it('keeps hidden notification lifetimes running without expiring persistent loading activity', async () => {
    render(NotchToastFixture);
    const timed = toast.info('Short update', { duration: 200 });
    toast.loading('Long activity');
    await expect.element(page.getByText('Long activity')).toBeVisible();
    await expect
        .poll(() =>
            __getActiveToastStateForTests()?.data.toasts.some((item) => item.id === timed.id)
        )
        .toBe(false);
    await expect.element(page.getByText('Long activity')).toBeVisible();
    expect(__getActiveToastStateForTests()?.data.toasts).toHaveLength(1);
});

it('morphs wrapped notification text while keeping one toast and usable side controls', async () => {
    render(NotchToastFixture);
    toast.info('First update', {
        description:
            'A longer workspace update wraps across several lines inside the compact notification panel.',
        persistent: true
    });
    toast.success('Second update', {
        description:
            'The export is ready. Download it whenever you finish reviewing the current workspace changes.',
        persistent: true
    });
    const region = page.getByRole('region', { name: 'Notifications' });
    await expect.element(region).toBeVisible();
    await region.hover();
    const previous = page.getByRole('button', { name: 'Previous notification' });
    const next = page.getByRole('button', { name: 'Next notification' });
    await previous.click();
    await next.click();
    await previous.click();
    await expect
        .poll(() => {
            const title = document.querySelector('[data-ui="toast-title"] [data-morph-visual]');
            return title?.textContent;
        })
        .toBe('First update');
    expect(document.querySelectorAll('[data-ui="toast"]')).toHaveLength(1);
    const description = document.querySelector<HTMLElement>('[data-ui="toast"] > p');
    if (!description) {
        throw new Error('Missing notification description');
    }
    expect(description.scrollWidth).toBeLessThanOrEqual(description.clientWidth + 1);
    expect(description.querySelector('[data-morph-visual]')).not.toBeNull();
});
