import { fireEvent, render, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import InspectorStateFixture from '../fixtures/InspectorStateFixture.svelte';

afterEach(() => {
    localStorage.removeItem('mielui:test-inspector');
    vi.restoreAllMocks();
});

describe('Inspector preferences', () => {
    it('starts pinned without a saved preference', () => {
        render(InspectorStateFixture);
        expect(screen.getByTestId('inspector-state')).toHaveTextContent('true:true');
    });

    it('preserves a saved unpinned choice', () => {
        localStorage.setItem('mielui:test-inspector', 'false');
        render(InspectorStateFixture);
        expect(screen.getByTestId('inspector-state')).toHaveTextContent('false:false');
    });

    it('persists closing and repinning', async () => {
        render(InspectorStateFixture);
        await fireEvent.click(screen.getByRole('button', { name: 'Close' }));
        expect(localStorage.getItem('mielui:test-inspector')).toBe('false');
        expect(screen.getByTestId('inspector-state')).toHaveTextContent('false:false');
        await fireEvent.click(screen.getByRole('button', { name: 'Toggle pin' }));
        expect(localStorage.getItem('mielui:test-inspector')).toBe('true');
        expect(screen.getByTestId('inspector-state')).toHaveTextContent('true:true');
    });

    it('starts pinned when storage is unavailable', () => {
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
            throw new Error('Storage unavailable');
        });
        render(InspectorStateFixture);
        expect(screen.getByTestId('inspector-state')).toHaveTextContent('true:true');
    });
});
