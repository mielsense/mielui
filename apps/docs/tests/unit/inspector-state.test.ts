import { fireEvent, render, screen } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import InspectorStateFixture from '../fixtures/InspectorStateFixture.svelte';

function mockViewport(dockable: boolean) {
    vi.spyOn(window, 'matchMedia').mockImplementation((media: string) => {
        const target = new EventTarget();
        return Object.assign(target, {
            matches: dockable,
            media,
            onchange: null,
            addListener() {},
            removeListener() {}
        }) as MediaQueryList;
    });
}

beforeEach(() => {
    mockViewport(true);
});

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

    it('starts closed below the docking width, keeping the saved preference', () => {
        mockViewport(false);
        render(InspectorStateFixture);
        expect(screen.getByTestId('inspector-state')).toHaveTextContent('false:false');
        expect(localStorage.getItem('mielui:test-inspector')).toBeNull();
    });
});
