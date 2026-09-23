import Slider from '@mielui/svelte/components/slider/slider.svelte';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { flushSync } from 'svelte';
import { describe, expect, it, vi } from 'vitest';
import { queryRequired } from '../../test-utils';

describe('Slider', () => {
    it('renders an accessible slider thumb', () => {
        render(Slider, { value: 50, label: 'Volume' });
        expect(screen.getByRole('slider', { name: 'Volume' })).toHaveAttribute(
            'aria-valuenow',
            '50'
        );
    });

    it('exposes the supplied value', () => {
        render(Slider, { value: 42 });
        expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '42');
    });

    it('exposes minimum and maximum to assistive technology', () => {
        render(Slider, { value: 0, min: -10, max: 200 });
        expect(screen.getByRole('slider')).toHaveAttribute('aria-valuemin', '-10');
        expect(screen.getByRole('slider')).toHaveAttribute('aria-valuemax', '200');
    });

    it('lets an explicit accessible name override label', () => {
        render(Slider, { label: 'Volume', 'aria-label': 'Playback volume' });
        expect(screen.getByRole('slider')).toHaveAccessibleName('Playback volume');
    });

    it('stops keyboard changes at both bounds', async () => {
        render(Slider, { value: 5, min: 0, max: 10 });
        const thumb = screen.getByRole('slider');
        thumb.focus();
        await userEvent.keyboard('{End}{ArrowRight}');
        expect(thumb).toHaveAttribute('aria-valuenow', '10');
        await userEvent.keyboard('{Home}{ArrowLeft}');
        expect(thumb).toHaveAttribute('aria-valuenow', '0');
    });

    it('applies the configured keyboard step', async () => {
        render(Slider, { value: 0, step: 5 });
        const thumb = screen.getByRole('slider');
        thumb.focus();
        await userEvent.keyboard('{ArrowRight}');
        expect(thumb).toHaveAttribute('aria-valuenow', '5');
    });

    it('reports numeric values from keyboard changes', async () => {
        const onValueChange = vi.fn();
        render(Slider, { value: 36, onValueChange });
        screen.getByRole('slider').focus();
        await userEvent.keyboard('{ArrowRight}');
        expect(onValueChange).toHaveBeenCalledWith(37);
    });

    it('keeps pointer dragging active until release', () => {
        const { container } = render(Slider, { value: 0 });
        const thumb = screen.getByRole('slider');
        const root = queryRequired(container, '[data-ui="slider"]');
        Object.assign(root, {
            setPointerCapture: vi.fn(),
            hasPointerCapture: () => true,
            releasePointerCapture: vi.fn()
        });
        flushSync(() =>
            thumb.dispatchEvent(
                new PointerEvent('pointerdown', { bubbles: true, button: 0, pointerId: 1 })
            )
        );
        expect(thumb).toHaveAttribute('data-dragging');
        flushSync(() =>
            root.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 1 }))
        );
        expect(thumb).not.toHaveAttribute('data-dragging');
    });

    it('ignores pointer dragging when disabled', () => {
        render(Slider, { value: 0, disabled: true });
        const thumb = screen.getByRole('slider');
        flushSync(() =>
            thumb.dispatchEvent(
                new PointerEvent('pointerdown', { bubbles: true, button: 0, pointerId: 1 })
            )
        );
        expect(thumb).not.toHaveAttribute('data-dragging');
    });

    it('removes disabled thumbs from keyboard navigation and disables form values', () => {
        const { container } = render(Slider, { value: 50, disabled: true, name: 'volume' });
        expect(screen.getByRole('slider')).toHaveAttribute('tabindex', '-1');
        expect(queryRequired(container, 'input[name="volume"]')).toBeDisabled();
    });

    it('stops the lower endpoint at the upper endpoint', async () => {
        const onValueChange = vi.fn();
        render(Slider, { range: true, value: [20, 70], onValueChange });
        const lower = screen.getAllByRole('slider')[0];
        lower.focus();
        await userEvent.keyboard('{End}');
        expect(lower).toHaveAttribute('aria-valuenow', '70');
        expect(onValueChange).toHaveBeenLastCalledWith([70, 70]);
    });

    it('normalizes initial endpoints without reporting an edit', () => {
        const onValueChange = vi.fn();
        render(Slider, { range: true, value: [130, -20], onValueChange });
        const [lower, upper] = screen.getAllByRole('slider');
        expect(lower).toHaveAttribute('aria-valuenow', '0');
        expect(upper).toHaveAttribute('aria-valuenow', '100');
        expect(onValueChange).not.toHaveBeenCalled();
    });

    it('preserves endpoint labels and ordering in RTL', () => {
        const { container } = render(Slider, {
            range: true,
            value: [20, 70],
            dir: 'rtl',
            thumbLabels: ['Minimum price', 'Maximum price']
        });
        expect(queryRequired(container, '[data-ui="slider"]')).toHaveAttribute('dir', 'rtl');
        expect(screen.getByRole('slider', { name: 'Minimum price' })).toHaveAttribute(
            'aria-valuemax',
            '70'
        );
        expect(screen.getByRole('slider', { name: 'Maximum price' })).toHaveAttribute(
            'aria-valuemin',
            '20'
        );
    });
});
