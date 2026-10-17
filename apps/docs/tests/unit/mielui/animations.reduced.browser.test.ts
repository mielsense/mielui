import { toast } from '@mielui/svelte/components/toast';
import { tick } from 'svelte';
import { expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import MotionFixture from '../../fixtures/MotionFixture.svelte';
import { required } from '../../test-utils';

async function settle() {
    await tick();
    await tick();
    await new Promise((resolve) => setTimeout(resolve, 30));
}

it('stops looping keyframes under reduced motion and keeps the progress pulse', async () => {
    render(MotionFixture);
    await settle();
    toast({ title: 'Reduced motion', duration: 10_000 });
    await settle();

    expect(window.matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(true);

    const skeleton = document.querySelector<HTMLElement>('[data-testid="motion-skeleton"] > div');
    const progress = document.querySelector<HTMLElement>('[data-testid="motion-progress"] > div');
    expect(document.querySelector('[data-ui="toast"]')).toBeInTheDocument();
    expect(document.querySelector('[data-ui="toast"] [style*="animation-duration"]')).toBeNull();

    expect(getComputedStyle(required(skeleton)).animationName).toBe('none');
    expect(getComputedStyle(required(progress)).animationName).toBe('pulse');
});
