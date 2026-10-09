import { springEase, themedSlide } from '@mielui/svelte/transition';
import type { TransitionConfig } from 'svelte/transition';

const layoutSpring = springEase(550, 40);

/** Measured-height reveal for disclosure content, timed on the layout spring. */
export function disclosureSlide(node: Element): TransitionConfig {
    const slide = themedSlide(node, {
        durationVar: '--motion-duration-spring',
        fallback: 350
    });

    return {
        ...slide,
        easing: layoutSpring
    };
}
