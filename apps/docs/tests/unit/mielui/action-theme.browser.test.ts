import { expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ActionThemeFixture from '../../fixtures/ActionThemeFixture.svelte';

it('stops and restores shimmer when inherited theme motion changes', async () => {
    const view = render(ActionThemeFixture);
    const root = document.querySelector<HTMLElement>('[data-testid="action-theme"]');
    if (!root) {
        throw new Error('Missing action theme fixture');
    }
    await expect.poll(() => root.querySelector('[data-shimmer-visual]')).not.toBeNull();
    root.style.setProperty('--motion-duration-panel', '0ms');
    await expect.poll(() => root.querySelector('[data-shimmer-visual]')).toBeNull();
    root.style.setProperty('--motion-duration-panel', '180ms');
    await expect.poll(() => root.querySelector('[data-shimmer-visual]')).not.toBeNull();
    const animation = root.getAnimations({ subtree: true })[0];
    expect(animation?.playState).toBe('running');
    await view.unmount();
    expect(animation?.playState).toBe('idle');
});
