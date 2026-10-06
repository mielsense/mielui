## Drawer is a floating panel

Drawer no longer spans the viewport or sits flush against its edge. `Drawer.Content`
now renders two elements: the positioned dialog element, which owns dragging,
focus, and `bind:element`, and a visible panel inside it marked
`data-ui="drawer-panel"`. The `class` and `surface` props apply to the panel.

Top and bottom drawers are centered, 36rem wide, and never wider than the viewport
minus the gap. Left and right drawers are 24rem wide and fill the height. Change
the size with a width class on `Drawer.Content`, for example `class="w-3xl"`, or
`class="w-screen"` for the widest panel the viewport allows. Do not use
`max-w-none` to widen it; the panel has a fixed width, not a fluid one.

Stop constraining regions yourself. Older call sites put
`class="mx-auto w-full max-w-xl"` on `Drawer.Header`, `Drawer.Body`, and
`Drawer.Footer` to keep content readable inside a full-width sheet. Those classes
still type-check but are now redundant, and `mx-auto max-w-xl` without `w-full` on
the footer misaligned its actions. Remove them.

Opening a drawer focuses the dialog element rather than the first tabbable
control. Pass `onOpenAutoFocus` to `Drawer.Content`, call `event.preventDefault()`,
and focus your own element when a field should receive focus on open.

`Drawer.Handle` positions itself from the drawer direction. Keep it as the first
child of `Drawer.Content` in every direction; do not reorder or rotate it by hand.

Exported names and prop types are unchanged.
