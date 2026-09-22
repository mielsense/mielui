import { expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import PieChartFixture from '../../fixtures/PieChartFixture.svelte';

it('renders LayerChart arcs and exposes exact values without a pointer', async () => {
    render(PieChartFixture);
    await expect
        .poll(() => document.querySelectorAll('[data-ui="pie-chart-plot"] path').length)
        .toBe(2);
    expect(document.querySelector('table')?.textContent).toContain('Direct60');
    await userEvent.tab();
    await expect.element(page.getByRole('status')).toHaveTextContent('Direct 60');
});

it('replaces zero totals with an explicit empty state', async () => {
    render(PieChartFixture, { data: [{ key: 'direct', value: 0 }] });
    await expect.element(page.getByRole('status')).toHaveTextContent('No data available');
    expect(document.querySelector('[data-ui="skeleton"]')).not.toBeNull();
});

it('keeps the plot mounted while loading and hides stale slices', async () => {
    render(PieChartFixture, { loading: true });
    await expect.element(page.getByRole('status')).toHaveTextContent('Loading chart');
    expect(document.querySelector('[data-ui="skeleton"]')).not.toBeNull();
    expect(document.querySelectorAll('[data-ui="pie-chart-plot"] path')).toHaveLength(0);
});

it('settles all motion when the theme disables animation', async () => {
    document.documentElement.style.setProperty('--motion-duration-panel', '0ms');
    try {
        render(PieChartFixture, { animation: 'live' });
        await expect
            .poll(() => document.querySelectorAll('[data-ui="pie-chart-plot"] path').length)
            .toBe(2);
        expect(
            document
                .getAnimations()
                .filter((animation) => animation.effect?.getTiming().iterations === Infinity)
        ).toHaveLength(0);
    } finally {
        document.documentElement.style.removeProperty('--motion-duration-panel');
    }
});

it('runs live emphasis and stops when theme motion is disabled', async () => {
    render(PieChartFixture, { animation: 'live' });
    await expect
        .poll(
            () =>
                document
                    .getAnimations()
                    .filter((animation) => animation.effect?.getTiming().iterations === Infinity)
                    .length
        )
        .toBe(2);
    document.documentElement.style.setProperty('--motion-duration-panel', '0ms');
    try {
        await expect
            .poll(
                () =>
                    document
                        .getAnimations()
                        .filter(
                            (animation) => animation.effect?.getTiming().iterations === Infinity
                        ).length
            )
            .toBe(0);
    } finally {
        document.documentElement.style.removeProperty('--motion-duration-panel');
    }
});

it('resolves configured colors from Mielui color tokens', async () => {
    render(PieChartFixture);
    await expect
        .poll(() => {
            const arc = document.querySelector('[data-ui="pie-chart-plot"] path');
            return arc ? getComputedStyle(arc).fill : undefined;
        })
        .toBe('rgb(186, 124, 165)');
});

it('anchors keyboard inspection to its legend item and stays inside the viewport', async () => {
    render(PieChartFixture);
    await userEvent.tab();
    await expect.element(page.getByRole('status')).toBeVisible();
    const tooltip = document.querySelector('[data-ui="pie-chart-tooltip"]');
    const legend = document.activeElement;
    if (!tooltip || !legend) {
        throw new Error('Expected a focused legend item and its tooltip.');
    }
    const box = tooltip.getBoundingClientRect();
    const anchor = legend.getBoundingClientRect();
    expect(box.left).toBeGreaterThanOrEqual(7);
    expect(box.right).toBeLessThanOrEqual(window.innerWidth - 7);
    expect(Math.abs(anchor.top - box.bottom)).toBeLessThan(20);
});
