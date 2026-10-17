import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
import ShowMore from './show-more.svelte';

export type ShowMoreLabels = {
    /** Text of the button while collapsed. */
    more?: string;
    /** Text of the button while expanded. */
    less?: string;
    /** Accessible name of the content region when it scrolls or has a preview. */
    region?: string;
};

export type ShowMoreProps = {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: ShowMoreLabels;
    /** Number of visible text lines while collapsed. */
    lines?: number;
    /** Maximum expanded height before the content becomes scrollable. */
    maxHeight?: number;
    /** Initial expanded state when `expanded` is not bound. */
    defaultExpanded?: boolean;
    /** Bindable disclosure state. */
    expanded?: boolean;
    /** Called with the new state when it expands or collapses. */
    onExpandedChange?: (expanded: boolean) => void;
    /** Full content. With preview, this subtree is hidden and inert while collapsed. */
    children?: Snippet;
    /** Separate collapsed content for disclosures containing interactive controls. */
    preview?: Snippet;
    /** Custom control. Forward props to its native button to preserve disclosure semantics. */
    trigger?: Snippet<
        [
            {
                expanded: boolean;
                props: Pick<
                    HTMLButtonAttributes,
                    'type' | 'id' | 'aria-expanded' | 'aria-controls' | 'onclick'
                >;
            }
        ]
    >;
} & DefaultProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

export { ShowMore };
export default ShowMore;
