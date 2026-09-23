import Gauge from '@mielui/svelte/components/gauge/gauge.svelte';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

describe('Gauge', () => {
    it('exposes a labeled meter with a clamped value', () => {
        const { getByRole } = render(Gauge, {
            props: { value: 120, max: 100, label: 'Monthly API usage' }
        });

        const gauge = getByRole('meter', { name: 'Monthly API usage' });
        expect(gauge).toHaveAttribute('aria-valuemin', '0');
        expect(gauge).toHaveAttribute('aria-valuemax', '100');
        expect(gauge).toHaveAttribute('aria-valuenow', '100');
        expect(gauge).toHaveTextContent('100');
    });

    it('renders its value and the requested tone', () => {
        const { container } = render(Gauge, { props: { value: 72, tone: 'warning' } });

        expect(container.querySelector('[data-ui="gauge"]')).toHaveTextContent('72');
        expect(container.querySelector('.text-warning')).toBeInTheDocument();
    });
    it('normalizes invalid inputs without invalid SVG geometry', () => {
        const { getByRole, container } = render(Gauge, {
            props: { value: Number.NaN, max: -10, size: Number.NaN, strokeWidth: Number.NaN }
        });
        const meter = getByRole('meter');
        expect(meter).toHaveAttribute('aria-valuenow', '0');
        expect(meter).toHaveAttribute('aria-valuemax', '100');
        expect(meter).toHaveStyle({ width: '120px', height: '120px' });
        expect(Number(container.querySelector('circle')?.getAttribute('stroke-width'))).toBeCloseTo(
            11.7
        );
        expect(container.querySelector('[data-ui="gauge-arc"]')).toHaveAttribute('d', '');
        expect(container.innerHTML).not.toMatch(/NaN|Infinity/);
    });

    it('scales compact gauges and clamps oversized strokes', () => {
        const { getByRole, container } = render(Gauge, {
            props: { value: 24, max: 32, size: 32, strokeWidth: 100 }
        });
        expect(getByRole('meter')).toHaveStyle({ width: '32px' });
        expect(container.querySelector('circle')).toHaveAttribute('stroke-width', '16');
    });
});
