import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';
import Root from './folder-card.svelte';
import Count from './folder-card-count.svelte';
import Cover from './folder-card-cover.svelte';
import Description from './folder-card-description.svelte';
import Footer from './folder-card-footer.svelte';
import Index from './folder-card-index.svelte';
import Tab from './folder-card-tab.svelte';
import Title from './folder-card-title.svelte';

type FolderCardTone = 1 | 2 | 3 | 4 | 5;

type FolderCardSharedProps = {
    /** Chart palette color, `--chart-1` to `--chart-5`, used by the default cover wash. */
    tone?: FolderCardTone;
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children: Snippet;
};

type FolderCardLinkProps = FolderCardSharedProps & {
    /** Renders the card as a link. */
    href: string;
    disabled?: undefined;
} & Omit<HTMLAnchorAttributes, keyof FolderCardSharedProps | 'href'>;

type FolderCardStaticAttributes = Omit<
    HTMLAttributes<HTMLElement>,
    keyof FolderCardSharedProps | 'onclick'
> & {
    [Attribute in Exclude<keyof HTMLAnchorAttributes, keyof HTMLAttributes<HTMLElement>>]?: never;
};

type FolderCardButtonProps = FolderCardSharedProps & {
    href?: undefined;
    /**
     * Makes the whole card a button and runs when it is clicked or activated from the keyboard.
     * The title names the button.
     */
    onclick: (event: MouseEvent) => void;
    /** Blocks the click action and dims the card. */
    disabled?: boolean;
} & FolderCardStaticAttributes;

type FolderCardStaticProps = FolderCardSharedProps & {
    href?: undefined;
    onclick?: undefined;
    disabled?: undefined;
} & Omit<HTMLAttributes<HTMLElement>, keyof FolderCardSharedProps | 'onclick'> & {
        [Attribute in Exclude<
            keyof HTMLAnchorAttributes,
            keyof HTMLAttributes<HTMLElement>
        >]?: never;
    };

export type FolderCardProps = FolderCardLinkProps | FolderCardButtonProps | FolderCardStaticProps;

type FolderCardCoverSource =
    | {
          /** Image rendered in place of the tone wash. */
          src: string;
          /** Image description. Defaults to empty because the title already names the folder. */
          alt?: string;
      }
    | {
          src?: undefined;
          alt?: never;
      };

export type FolderCardCoverProps = FolderCardCoverSource & {
    /** Classes added to the element. */
    class?: string;
    /** Custom cover content, layered above the image or tone wash. */
    children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

export type FolderCardTabProps = {
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

export type FolderCardTitleProps = {
    /** Heading level in the surrounding document. */
    level?: 2 | 3 | 4;
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children: Snippet;
} & Omit<HTMLAttributes<HTMLHeadingElement>, 'children' | 'class'>;

export type FolderCardDescriptionProps = {
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children: Snippet;
} & Omit<HTMLAttributes<HTMLParagraphElement>, 'children' | 'class'>;

export type FolderCardFooterProps = {
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children: Snippet;
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'class'>;

export type FolderCardIndexProps = {
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children: Snippet;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'class'>;

export type FolderCardCountProps = {
    /** Number to format and show. */
    value: number;
    /** Text after the formatted value. Pass the singular form when the value is one. */
    unit?: string;
    /** Classes added to the element. */
    class?: string;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'class'>;

export { Count, Cover, Description, Footer, Index, Root, Tab, Title };
