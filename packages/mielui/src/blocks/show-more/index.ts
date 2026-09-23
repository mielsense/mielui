import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
import ShowMore from './show-more.svelte';

export type ShowMoreProps = {
    /** Number of visible text lines while collapsed. */
    lines?: number;
    /** Maximum expanded height before the content becomes scrollable. */
    maxHeight?: number;
    /** Initial expanded state when `expanded` is not bound. */
    defaultExpanded?: boolean;
    /** Bindable disclosure state. */
    expanded?: boolean;
    moreLabel?: string;
    lessLabel?: string;
    /** Accessible name for the expanded scroll region when the content is capped. */
    label?: string;
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
