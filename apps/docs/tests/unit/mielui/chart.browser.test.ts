import { tick } from 'svelte';
import { expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import ChartFixture from '../../fixtures/ChartFixture.svelte';

async function settle() {
    await tick();
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

it('renders mixed marks without reserving a bar slot for the line', async () => {
    render(ChartFixture);
    await settle();
    await expect.poll(() => document.querySelectorAll('[data-ui="chart-bar"] rect').length).toBe(2);
    const bars = [...document.querySelectorAll<SVGRectElement>('[data-ui="chart-bar"] rect')];
    const centers = bars.map(
        (bar) => Number(bar.getAttribute('x')) + Number(bar.getAttribute('width')) / 2
    );
    const distance = centers[1] - centers[0];
    expect(Number(bars[0].getAttribute('width')) / distance).toBeGreaterThan(0.65);
    expect(document.querySelector('[data-ui="chart-line"] path')?.getAttribute('d')).toContain('L');
});

it('exposes exact data and keyboard tooltips', async () => {
    render(ChartFixture);
    await settle();
    expect(document.querySelector('table')?.textContent).toContain('Target');
    const control = page.getByRole('button', { name: 'Inspect A' });
    await control.element().focus();
    await expect.element(page.getByRole('status')).toHaveTextContent('80');
    await userEvent.keyboard('{Escape}');
    await expect.element(page.getByRole('status')).not.toBeInTheDocument();
});

it('does not turn missing values into bars and replaces geometry while loading', async () => {
    const view = render(ChartFixture, { data: [{ category: 'A', total: null, target: 30 }] });
    await settle();
    await expect.poll(() => document.querySelectorAll('[data-ui="chart-bar"] rect').length).toBe(0);
    expect(document.querySelector('[data-ui="chart-line"] circle')).not.toBeNull();
    await view.rerender({ loading: true });
    await expect.element(page.getByText('Loading chart…')).toBeInTheDocument();
    expect(document.querySelector('[data-ui="chart-bar"]')).toBeNull();
    await view.rerender({ loading: false, data: [] });
    await expect.element(page.getByText('No data to display')).toBeInTheDocument();
});

it('accepts appended and reordered categories during animation', async () => {
    const view = render(ChartFixture, { animation: 'reveal' });
    await settle();
    await view.rerender({
        data: [
            { category: 'B', total: 25, target: 80 },
            { category: 'C', total: 35, target: 90 },
            { category: 'A', total: 40, target: 70 }
        ]
    });
    await expect.poll(() => document.querySelectorAll('[data-ui="chart-bar"] rect').length).toBe(3);
    await new Promise((resolve) => setTimeout(resolve, 350));
    for (const rect of document.querySelectorAll('[data-ui="chart-bar"] rect')) {
        expect(Number.isFinite(Number(rect.getAttribute('height')))).toBe(true);
    }
});

it('positions its tooltip beside the pointer and keeps it inside the chart', async () => {
    render(ChartFixture);
    await settle();
    const root = document.querySelector<HTMLElement>('[data-ui="chart"]');
    const region = document.querySelector<SVGRectElement>(
        '[data-ui="chart-plot"] rect[fill="transparent"]'
    );
    if (!root || !region) {
        throw new Error('Chart geometry was not rendered.');
    }
    const bounds = root.getBoundingClientRect();
    const mouse = { clientX: bounds.left + bounds.width * 0.55, clientY: bounds.top + 160 };
    region.dispatchEvent(new PointerEvent('pointerenter', mouse));
    await tick();
    await new Promise((resolve) => setTimeout(resolve, 50));
    const tooltipElement = document.querySelector<HTMLElement>('[data-ui="chart-tooltip"]');
    if (!tooltipElement) {
        throw new Error('Chart tooltip was not rendered.');
    }
    const tooltip = tooltipElement.getBoundingClientRect();
    expect(Math.abs(tooltip.left - mouse.clientX)).toBeLessThan(30);
    expect(tooltip.top).toBeGreaterThanOrEqual(bounds.top);
    expect(tooltip.right).toBeLessThanOrEqual(bounds.right);
});
