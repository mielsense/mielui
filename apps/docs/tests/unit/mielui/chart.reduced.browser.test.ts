import { tick } from 'svelte';
import { expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ChartFixture from '../../fixtures/ChartFixture.svelte';

it('renders live charts without continuous or reveal motion under reduced motion', async () => {
    render(ChartFixture, { animation: 'live' });
    await tick();
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    expect(matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(true);
    expect(document.querySelectorAll('[data-ui="chart-bar"] rect')).toHaveLength(2);
    const chart = document.querySelector('[data-ui="chart"]');
    expect(chart?.getAnimations({ subtree: true })).toHaveLength(0);
});
