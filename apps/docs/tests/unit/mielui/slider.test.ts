import Slider from '@mielui/svelte/components/slider/slider.svelte';
import { render } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import { queryRequired } from '../../test-utils';

describe('Slider -- rendering', () => {
    it('renders a range input', () => {
        const { container } = render(Slider, { props: { value: 50 } });
        const range = container.querySelector('input[type="range"]');
        expect(range).toBeInTheDocument();
    });

    it('exposes the value via aria-valuenow', () => {
        const { container } = render(Slider, { props: { value: 42 } });
        expect(container.querySelector('input[type="range"]')?.getAttribute('aria-valuenow')).toBe(
            '42'
        );
    });

    it('exposes min and max via aria attributes', () => {
        const { container } = render(Slider, {
            props: { value: 0, min: -10, max: 200 }
        });
        const range = queryRequired(container, 'input[type="range"]');
        expect(range.getAttribute('aria-valuemin')).toBe('-10');
        expect(range.getAttribute('aria-valuemax')).toBe('200');
    });

    it('uses the label prop as aria-label', () => {
        const { container } = render(Slider, {
            props: { value: 0, label: 'Volume' }
        });
        expect(container.querySelector('input[type="range"]')?.getAttribute('aria-label')).toBe(
            'Volume'
        );
    });
});

describe('Slider -- bounds and step', () => {
    it('reflects min and max on the underlying input', () => {
        const { container } = render(Slider, {
            props: { value: 5, min: 0, max: 10 }
        });
        const range = queryRequired<HTMLInputElement>(container, 'input[type="range"]');
        expect(range.min).toBe('0');
        expect(range.max).toBe('10');
    });

    it('reflects step on the underlying input', () => {
        const { container } = render(Slider, {
            props: { value: 0, step: 5 }
        });
        expect(container.querySelector<HTMLInputElement>('input[type="range"]')?.step).toBe('5');
    });
});

describe('Slider -- onValueChange callback', () => {
    it('fires onValueChange with the numeric new value on input', () => {
        const onValueChange = vi.fn();
        const { container } = render(Slider, {
            props: { value: 0, min: 0, max: 100, onValueChange }
        });
        const range = queryRequired<HTMLInputElement>(container, 'input[type="range"]');

        range.value = '37';
        range.dispatchEvent(new Event('input', { bubbles: true }));

        expect(onValueChange).toHaveBeenCalledWith(37);
    });
});

describe('Slider -- interaction feedback', () => {
    it('keeps the dragging state until the pointer is released', () => {
        const { container } = render(Slider, { props: { value: 0 } });
        const range = queryRequired<HTMLInputElement>(container, 'input[type="range"]');

        range.dispatchEvent(new Event('pointerdown', { bubbles: true }));
        expect(range).toHaveAttribute('data-dragging');

        range.dispatchEvent(new Event('pointerup', { bubbles: true }));
        expect(range).not.toHaveAttribute('data-dragging');
    });

    it('does not enter the dragging state when disabled', () => {
        const { container } = render(Slider, { props: { value: 0, disabled: true } });
        const range = queryRequired<HTMLInputElement>(container, 'input[type="range"]');

        range.dispatchEvent(new Event('pointerdown', { bubbles: true }));

        expect(range).not.toHaveAttribute('data-dragging');
    });
});

describe('Slider -- disabled state', () => {
    it('disables the underlying range input', () => {
        const { container } = render(Slider, {
            props: { value: 50, disabled: true }
        });
        expect(container.querySelector('input[type="range"]')).toBeDisabled();
    });
});

describe('Slider -- range mode', () => {
    it('stops the lower handle at the upper value and emits an ordered pair', () => {
        const onValueChange = vi.fn();
        const { container } = render(Slider, {
            props: { range: true, value: [20, 70], onValueChange }
        });
        const lower = queryRequired<HTMLInputElement>(container, '[data-thumb="0"]');
        lower.value = '90';
        lower.dispatchEvent(new Event('input', { bubbles: true }));
        expect(onValueChange).toHaveBeenCalledExactlyOnceWith([70, 70]);
        expect(lower.value).toBe('70');
    });

    it('normalizes rendered values and ARIA without reporting a user change', () => {
        const onValueChange = vi.fn();
        const { container } = render(Slider, {
            props: { range: true, value: [130, -20], min: 0, max: 100, onValueChange }
        });
        const lower = queryRequired<HTMLInputElement>(container, '[data-thumb="0"]');
        const upper = queryRequired<HTMLInputElement>(container, '[data-thumb="1"]');
        expect(lower.value).toBe('0');
        expect(upper.value).toBe('100');
        expect(lower).toHaveAttribute('aria-valuenow', '0');
        expect(upper).toHaveAttribute('aria-valuenow', '100');
        expect(onValueChange).not.toHaveBeenCalled();
    });

    it('preserves endpoint identity and accessible labels in RTL', () => {
        const { container } = render(Slider, {
            props: {
                range: true,
                value: [20, 70],
                dir: 'rtl',
                thumbLabels: ['Minimum price', 'Maximum price']
            }
        });
        expect(container.querySelector('[data-ui="slider"]')).toHaveAttribute('dir', 'rtl');
        const lower = queryRequired<HTMLInputElement>(container, '[data-thumb="0"]');
        const upper = queryRequired<HTMLInputElement>(container, '[data-thumb="1"]');
        expect(lower).toHaveAttribute('aria-label', 'Minimum price');
        expect(upper).toHaveAttribute('aria-label', 'Maximum price');
        expect(lower).toHaveAttribute('aria-valuemax', '70');
        expect(upper).toHaveAttribute('aria-valuemin', '20');
    });
});
