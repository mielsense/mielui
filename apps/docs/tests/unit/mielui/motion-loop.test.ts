import { motionLoop } from '@mielui/svelte/components/_internal/motion-loop';
import { waitFor } from '@testing-library/svelte';
import { expect, it, vi } from 'vitest';

it('pauses running indicators when theme motion is disabled and resumes after it is restored', async () => {
    const visibility = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    const node = document.createElement('div');
    node.style.setProperty('--motion-duration-panel', '180ms');
    document.body.appendChild(node);
    const cleanup = motionLoop(node);

    try {
        expect(node.style.getPropertyValue('--mielui-loop-play-state')).toBe('running');
        node.style.setProperty('--motion-duration-panel', '0ms');
        await waitFor(() => {
            expect(node.style.getPropertyValue('--mielui-loop-play-state')).toBe('paused');
        });
        node.style.setProperty('--motion-duration-panel', '180ms');
        await waitFor(() => {
            expect(node.style.getPropertyValue('--mielui-loop-play-state')).toBe('running');
        });
    } finally {
        cleanup();
        node.remove();
        visibility.mockRestore();
    }
    expect(node.style.getPropertyValue('--mielui-loop-play-state')).toBe('');
});

it('responds to reduced motion changes and removes the media listener on teardown', () => {
    const media = new EventTarget();
    let reduced = false;
    const preference = Object.assign(media, {
        media: '(prefers-reduced-motion: reduce)'
    });
    Object.defineProperty(preference, 'matches', {
        get() {
            return reduced;
        }
    });
    const matchMedia = vi.spyOn(window, 'matchMedia').mockReturnValue(preference as MediaQueryList);
    const visibility = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    const node = document.createElement('div');
    node.style.setProperty('--motion-duration-panel', '180ms');
    document.body.appendChild(node);
    const cleanup = motionLoop(node);

    try {
        reduced = true;
        media.dispatchEvent(new Event('change'));
        expect(node.style.getPropertyValue('--mielui-loop-play-state')).toBe('paused');
        reduced = false;
        media.dispatchEvent(new Event('change'));
        expect(node.style.getPropertyValue('--mielui-loop-play-state')).toBe('running');
        cleanup();
        reduced = true;
        media.dispatchEvent(new Event('change'));
        expect(node.style.getPropertyValue('--mielui-loop-play-state')).toBe('');
    } finally {
        cleanup();
        node.remove();
        visibility.mockRestore();
        matchMedia.mockRestore();
    }
});
