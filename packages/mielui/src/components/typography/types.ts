import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type TypographyHeadingProps = HTMLAttributes<HTMLHeadingElement> & {
    /** Content rendered inside. */
    children: Snippet;
};

export type TypographyTextVariant = 'lead' | 'body' | 'supporting';

export type TypographyTextProps = HTMLAttributes<HTMLParagraphElement> & {
    /** Content rendered inside. */
    children: Snippet;
    /** Text role, which sets size and color. */
    variant?: TypographyTextVariant;
};

export type TypographyInlineCodeProps = HTMLAttributes<HTMLElement> & {
    /** Content rendered inside. */
    children: Snippet;
};
