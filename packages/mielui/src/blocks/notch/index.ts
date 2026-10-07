import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
import type { ButtonProps } from '../../components/button';
import type { HeadingLevel } from '../../components/typography';
import Root from './notch.svelte';
import Accessory from './notch-accessory.svelte';
import Actions from './notch-actions.svelte';
import Close from './notch-close.svelte';
import Content from './notch-content.svelte';
import Description from './notch-description.svelte';
import Header from './notch-header.svelte';
import Peek from './notch-peek.svelte';
import SideAction from './notch-side-action.svelte';
import Title from './notch-title.svelte';

export type NotchProps = {
    /** Whether it is open. Bind it to control the state from outside. */
    open?: boolean;
    /** `triggered` opens fully. `peek` rests as a small handle that expands. */
    mode?: 'triggered' | 'peek';
    /** Milliseconds it stays open before closing on its own. */
    duration?: number;
    /** Viewport edge it attaches to. */
    side?: 'top' | 'bottom' | 'left' | 'right';
    /** Surface treatment. Omit it to inherit `--mielui-surface` from the theme. */
    surface?: 'solid' | 'glass';
    /** Content rendered inside. */
    children?: Snippet;
};
export type NotchSideActionProps = ButtonProps & { side?: 'start' | 'end' };
export type NotchPeekProps = {
    /** Content rendered inside. */
    children?: Snippet;
};
export type NotchContentProps = Omit<HTMLAttributes<HTMLDivElement>, 'popover'>;
export type NotchHeaderProps = HTMLAttributes<HTMLDivElement>;
export type NotchTitleProps = HTMLAttributes<HTMLHeadingElement> & {
    /** Heading level in the surrounding document. */
    level?: HeadingLevel;
};
export type NotchDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type NotchAccessoryProps = HTMLAttributes<HTMLDivElement>;
export type NotchActionsProps = HTMLAttributes<HTMLDivElement>;
export type NotchCloseProps = HTMLButtonAttributes;
export { Accessory, Actions, Close, Content, Description, Header, Peek, Root, SideAction, Title };
