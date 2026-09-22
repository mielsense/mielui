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
