import type { Snippet } from 'svelte';
import type {
    HTMLAnchorAttributes,
    HTMLAttributes,
    HTMLButtonAttributes,
    HTMLLiAttributes
} from 'svelte/elements';
import type { ButtonProps } from '../../components/button';

type DivProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: Snippet;
    element?: HTMLDivElement;
};

export type SidebarRootProps = DivProps & {
    /** Container width below which panels become modal drawers, in CSS pixels. */
    breakpoint?: number;
};

export type SidebarPanelProps = Omit<
    HTMLAttributes<HTMLElement>,
    'id' | 'children' | 'onchange'
> & {
    /** Stable panel key, unique within its Root. */
    id: string;
    label: string;
    side?: 'start' | 'end';
    variant?: 'default' | 'inset' | 'floating';
    collapsible?: 'rail' | 'offcanvas' | 'none';
    open?: boolean;
    mobileOpen?: boolean;
    pinned?: boolean;
    width?: number;
    railWidth?: number;
    minWidth?: number;
    maxWidth?: number;
    children?: Snippet;
    /** Optional replacement for the collapsed desktop rail. */
    rail?: Snippet;
    element?: HTMLElement;
    onOpenChange?: (open: boolean) => void;
    onMobileOpenChange?: (open: boolean) => void;
    onPinnedChange?: (pinned: boolean) => void;
    onWidthChange?: (width: number) => void;
};

export type SidebarMainProps = DivProps;
export type SidebarHeaderProps = DivProps;
export type SidebarContentProps = DivProps;
export type SidebarFooterProps = DivProps;
export type SidebarGroupProps = DivProps;
export type SidebarGroupLabelProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: Snippet;
};
export type SidebarSeparatorProps = Omit<HTMLAttributes<HTMLHRElement>, 'children'>;
export type SidebarMenuProps = Omit<HTMLAttributes<HTMLUListElement>, 'children'> & {
    children?: Snippet;
};
export type SidebarMenuItemProps = Omit<HTMLLiAttributes, 'children'> & { children?: Snippet };
export type SidebarLabelProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
    children?: Snippet;
};

type NavigationProps = {
    /** Accessible name and tooltip text when the panel is collapsed to its rail. */
    label: string;
    children?: Snippet;
    leading?: Snippet;
    trailing?: Snippet;
};

export type SidebarLinkProps = Omit<HTMLAnchorAttributes, keyof NavigationProps> &
    NavigationProps & {
        href: string;
        element?: HTMLAnchorElement;
    };
export type SidebarButtonProps = Omit<HTMLButtonAttributes, keyof NavigationProps> &
    NavigationProps & {
        element?: HTMLButtonElement;
    };

type ControlProps = ButtonProps & {
    /** Target panel key; omit inside that Panel. */
    panel?: string;
};
export type SidebarTriggerProps = ControlProps;
export type SidebarCloseProps = ControlProps;
export type SidebarPinProps = ControlProps;
export type SidebarResizeHandleProps = Omit<HTMLButtonAttributes, 'children' | 'type'> & {
    panel?: string;
    element?: HTMLButtonElement;
};

export type SidebarState = {
    readonly id: string;
    readonly label: string;
    readonly side: 'start' | 'end';
    readonly open: boolean;
    readonly mobileOpen: boolean;
    readonly pinned: boolean;
    readonly width: number;
    readonly minWidth: number;
    readonly maxWidth: number;
    readonly mobile: boolean;
    readonly collapsed: boolean;
    readonly collapsible: 'rail' | 'offcanvas' | 'none';
    readonly resizing: boolean;
    setOpen: (open: boolean) => void;
    setMobileOpen: (open: boolean) => void;
    setPinned: (pinned: boolean) => void;
    setWidth: (width: number) => void;
    toggle: () => void;
    close: () => void;
};
