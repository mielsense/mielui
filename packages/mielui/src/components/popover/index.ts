import type { VirtualElement } from '@floating-ui/dom';
import type { ButtonVariant } from '@mielui/svelte/components/button';
import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
import Root from './popover.svelte';
import Content from './popover-content.svelte';
import Title from './popover-title.svelte';
import Trigger from './popover-trigger.svelte';

export type PopoverContentProps = {
    /** Surface treatment. Omit it to inherit `--mielui-surface` from the theme. */
    surface?: 'solid' | 'glass';
    /** Content rendered inside. */
    children: Snippet;
    /** Classes added to the element. */
    class?: string;
    /** Classes for the inset surface (where children live) — padding, layout,
     * background overrides. The `class` prop styles the outer Panel frame. */
    surfaceClass?: string;
    /**
     * Closes when the pointer is pressed outside it. Set false to keep it open until it is
     * dismissed another way.
     */
    allowClickOutside?: boolean;
    /**
     * Render the full-viewport dismiss layer under the panel while open.
     * Defaults to `true`. Set to `false` for triggers that must stay
     * clickable while open (e.g. an input-style combobox trigger);
     * outside pointer dismissal still applies via `allowClickOutside`.
     */
    dismissLayer?: boolean;
    /**
     * Moves the panel to the end of the document so ancestors cannot clip it. Set false to render
     * it in place.
     */
    portal?: boolean;
    /** Positions the panel against this element or virtual element instead of the trigger. */
    refElement?: VirtualElement;
    /** ARIA role of the panel. */
    role?: 'dialog' | 'alertdialog' | 'menu' | 'listbox' | 'none';
    /** Tab index of the panel. */
    tabindex?: number;
    /** Trap Tab focus inside the panel while open. Defaults to `true`. */
    focusTrap?: boolean;
    /** Lock document scrolling while the panel is open. Defaults to `true`. */
    lockScroll?: boolean;
} & DefaultProps &
    Partial<HTMLAttributes<HTMLElement>>;

export type PopoverProps = {
    /** Content rendered inside. */
    children?: Snippet;
    /** Whether it is open. Bind it to control the state from outside. */
    open?: boolean;
    /** Called with the new state whenever it opens or closes. */
    onOpenChange?: (open: boolean) => void;
    /**
     * Preferred side and alignment relative to the trigger, such as `bottom-start`. It flips when
     * there is no room.
     */
    placement?: Placement;
    /** Stable identifier used to connect trigger and content ARIA attributes. */
    state_key?: string;
    /** Key that identifies this instance's state. A key is generated when you omit it. */
    stateKey?: string;
    /** Opens on hover as well as on click. */
    hoverable?: boolean;
    /** Milliseconds the pointer rests on the trigger before it opens. */
    delay?: number;
    /** Milliseconds after the pointer leaves before it closes. */
    closeDelay?: number;
    /** Make document content outside an open non-hover popover inert. Defaults to `true`. */
    inert?: boolean;
};

export type PopoverTriggerProps = {
    /** Shows the chevron after the label. */
    icon?: boolean;
    /** Button style of the trigger. */
    variant?: ButtonVariant;
    /** Control height of the trigger. */
    size?: 'sm' | 'md' | 'lg' | 'icon';
    /** Content rendered inside. */
    children?: Snippet;
    /** Classes added to the element. */
    class?: string;
    /** Bindable reference to the DOM element. */
    element?: HTMLButtonElement | HTMLAnchorElement | undefined;
    /** Forwarded to Button: render with `class` alone, skipping variant/size. */
    unstyled?: boolean;
    /** Called when it is clicked or activated. */
    onclick?: (event: MouseEvent) => void;
    /** Called immediately before this trigger opens its popover. */
    onopen?: () => void;
    /** Inline styles for the element. */
    style?: string;
} & Pick<
    HTMLButtonAttributes,
    | 'disabled'
    | 'type'
    | 'name'
    | 'value'
    | 'id'
    | 'role'
    | 'tabindex'
    | 'aria-label'
    | 'aria-controls'
    | 'aria-expanded'
    | 'aria-haspopup'
> &
    Partial<Record<`data-${string}`, string | boolean | null>>;
export type PopoverTitleProps = DefaultProps;

/** Mirrors floating-ui's placements: a side, optionally aligned to a corner. */
export type Placement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';

export type PopoverState = {
    open: boolean;
    focusedInside?: boolean;
    trigger: HTMLElement | null;
    focusedElement: HTMLElement | null;
    buttonRef: HTMLElement | null;
    popoverRef: HTMLElement | undefined;
    placement: Placement;
    onclick: (() => void) | undefined;
    closeTimeout: ReturnType<typeof setTimeout> | undefined;
    hoverTimeout?: ReturnType<typeof setTimeout> | undefined;
    hoverable: boolean;
    hovering?: boolean;
    delay: number | undefined;
    closeDelay: number | undefined;
    inert: boolean;
};

export { Content, Root, Title, Trigger };
