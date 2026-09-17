import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { Drawer as Primitive } from 'vaul-svelte';

export { default as Body } from './drawer-body.svelte';
export { default as Close } from './drawer-close.svelte';
export { default as Content } from './drawer-content.svelte';
export { default as Description } from './drawer-description.svelte';
export { default as Footer } from './drawer-footer.svelte';
export { default as Handle } from './drawer-handle.svelte';
export { default as Header } from './drawer-header.svelte';
export { default as Overlay } from './drawer-overlay.svelte';
export { default as Portal } from './drawer-portal.svelte';
export { default as Root } from './drawer-root.svelte';
export { default as Title } from './drawer-title.svelte';
export { default as Trigger } from './drawer-trigger.svelte';
export type DrawerRootProps = Pick<
    Primitive.RootProps,
    | 'children'
    | 'open'
    | 'onOpenChange'
    | 'direction'
    | 'dismissible'
    | 'handleOnly'
    | 'closeThreshold'
    | 'repositionInputs'
> & { nested?: boolean };
export type DrawerTriggerProps = Omit<Primitive.TriggerProps, 'child' | 'ref'> & {
    element?: HTMLButtonElement | null;
};
export type DrawerCloseProps = Omit<Primitive.CloseProps, 'child' | 'ref'> & {
    element?: HTMLButtonElement | null;
};
export type DrawerTitleProps = Omit<Primitive.TitleProps, 'child' | 'ref'> & {
    element?: HTMLHeadingElement | null;
};
export type DrawerDescriptionProps = Omit<Primitive.DescriptionProps, 'child' | 'ref'> & {
    element?: HTMLParagraphElement | null;
};
export type DrawerContentProps = Omit<
    Primitive.ContentProps,
    'child' | 'ref' | 'onFocusOutside'
> & {
    element?: HTMLDivElement | null;
};
export type DrawerOverlayProps = Omit<Primitive.OverlayProps, 'child' | 'ref'> & {
    element?: HTMLDivElement | null;
};
export type DrawerHandleProps = Omit<Primitive.HandleProps, 'child' | 'ref' | 'preventCycle'> & {
    element?: HTMLDivElement | null;
};
export type DrawerPortalProps = Primitive.PortalProps;
export type DrawerRegionProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: Snippet;
    element?: HTMLDivElement | null;
};
