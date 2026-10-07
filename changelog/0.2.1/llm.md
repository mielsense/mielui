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

## Slider has a field variant for settings panels

`<Slider variant="field" label="Opacity" format={(value) => `${value}%`} />`
renders one bar with the label at the start and the formatted value at the end.
The whole bar is the drag target, a thin tick marks the value, and the fill
behind it shows the amount. Reach for it when a panel stacks many numeric
settings, and stack the fields with a small gap so they read as one column.

In the field variant `label` is visible as well as naming the handle, so do not
add a separate label element beside it. `format` supplies both the readout and
`aria-valuetext`; it also sets `aria-valuetext` on the default variant. The
field variant holds a single value. Combining it with `range` is a type error,
so keep the default variant for two-handle ranges. Do not rebuild this control
from a native range input or a custom pointer handler.

## Menu rows and options do not take `href`

`DropdownMenu.Item`, `ContextMenu.Item`, `ContextMenu.CheckboxItem`,
`Select.Item` and `Combobox.Item` always render a `<button>`. Their prop types
used to include `href` because they extended the Button props, but the value was
dropped before rendering, so a row with `href` type-checked and then did
nothing when chosen. The types now leave `href` out, and passing it is a type
error.

To navigate from a menu, call your router in `callback`, for example
`callback={() => goto('/settings')}` in SvelteKit. Do not wrap a row in an
anchor, which breaks the menu's keyboard handling. Triggers and the action
buttons of Dialog, Alert Dialog and Sheet are unaffected and still accept
`href`.

## The default font is Manrope

`DEFAULT_THEME.fontSans` and the `--font-sans` token in `ui.css` are now
`'Manrope', sans-serif`. The stylesheet imports the Latin 400, 500, 600 and 700
files from `@fontsource/manrope`, which is a runtime dependency of the package,
and `mielui init` installs it in place of `@fontsource/inter`. JetBrains Mono is
unchanged.

Nothing is needed to get the new default. A project that wants Inter back
installs `@fontsource/inter` itself, imports the weights it uses, and sets
`--font-sans: 'Inter', sans-serif` after importing `ui.css`. The built-in
presets that name Inter, such as Magic and Functional, still expect the project
to load it. Do not add a `<link>` to a font CDN for the default font.

## Folder Card can be a button

`FolderCard.Root` has three forms. With `href` it is a link. With `onclick` and
no `href` it is an article with a full-size button over it, so the whole card
answers a click, Enter and Space while the title stays a real heading. With
neither it is a static article.

Use the button form for a card that opens a dialog or selects something. Do not
put `onclick` on a wrapper `div` around a static card, which keyboard users
cannot reach. The button takes its name from `FolderCard.Title`, so keep a
Title in the card. `disabled` only applies to the button form. To animate
content while the card is focused, use
`group-has-[:focus-visible]/folder-card:` in the button form, because the
focused element is the inner button and not the card.

## Composer toolbar variants are swapped

`Composer.Toolbar` now takes `variant?: 'default' | 'inset'`. The old `chrome` value is gone, and `inset` now draws what `chrome` used to draw. An old `variant="inset"` call site still type-checks and renders the wrong look.

The default joins the toolbar to the input. Both sit on one inset surface with square corners where they meet, so the composer reads as a single box with actions along its bottom edge. Use this for chat and agent composers unless you have a reason not to.

`variant="inset"` matches the inset form of Card. The input keeps its own rounded inset surface and the toolbar sits in the frame under it, the same place a Card footer sits. Because it is a frame strip, it follows `--mielui-inset-position`: with `top` the toolbar moves above the input. The default toolbar never moves.

Migrate by flipping every call site. A toolbar with no `variant`, or with `variant="chrome"`, that should keep its old separate strip needs `variant="inset"`. A toolbar that had `variant="inset"` for the joined look should drop the prop. Only `chrome` fails to compile. The other two cases build and look different.

Both forms follow the border setting. The gap between the input surface and the frame is `--mielui-modal-inset`, which the composer scales by `--mielui-border-inset-scale`. In single mode that gap is zero, so do not add padding or margins to the form or the toolbar to fake a gutter, and do not set `--mielui-modal-inset` to a fixed length on a composer.

## Data Table column headers sort on click

`DataTable.ColumnHeader` no longer renders a dropdown menu with Ascending, Descending and Clear sorting. It is a single button that calls TanStack's `column.toggleSorting()`, so each click moves to the column's next sort state. With TanStack defaults that is ascending, descending, then unsorted. Options such as `sortDescFirst` and `enableSortingRemoval` on the table or column change that cycle, and the header follows them. Shift-click passes the multi-sort flag.

The header shows an arrow for the current direction and a faint up-down arrow on hover while unsorted. Its `title` names what the next click does. `DataTable.Header` still sets `aria-sort` on the cell.

Stop looking for menu items in tests or automation. Click the header button, found by `data-ui="data-table-column-header"` or by the column name, and read `aria-sort` on its `th` or `data-sorted` on the button.

The tooltips read from the Root's `labels`: `sortAscending`, `sortDescending` and `clearSorting`. `clearSorting` is also the last item of `DataTable.Sort`. Use `DataTable.Sort` when you want an explicit field-and-direction menu.

## Data Table's inset toolbar sits outside the frame

With `variant="inset"`, `DataTable.Root` now renders two children: the toolbar, then a `data-ui="data-table-frame"` element that holds the table and footer. `DataTable.Toolbar` still goes anywhere inside Root in your markup. Root lifts it above the frame, the same way an inset Card lifts its Footer, so it renders nothing in the place you wrote it.

Do not style the toolbar as frame chrome, and do not rely on it being a sibling of the table. Classes and attributes you pass to `DataTable.Toolbar` land on the lifted element. Toolbar controls keep their normal medium height now that they are outside the frame.

The frame's classes target its direct children, so keep `DataTable.View` and the `data-ui="data-table-footer"` element as direct children of Root's snippet. The default variant is unchanged.
