import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import ScrollArea from './scroll-area.svelte';

export type ScrollAreaProps = {
    /** Scroll direction. */
    orientation?: 'vertical' | 'horizontal' | 'both';
    /** Shows a fade and chevron at an edge that has more content. */
    showCues?: boolean;
    /** Blurs content under the edge cues. */
    blur?: boolean;
    /** Content rendered inside. */
    children?: Snippet;
    /** Bindable reference to the DOM element. */
    element?: HTMLDivElement;
} & DefaultProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

export { ScrollArea };
export default ScrollArea;
