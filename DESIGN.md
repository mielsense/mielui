# Mielui Design Guidelines

Use these principles when creating or substantially changing Mielui interfaces,
documentation, examples, and brand surfaces. The goal is clear, intentional
design that feels calm without becoming generic or sterile.

Preserve the product requirements, host framework, existing component APIs,
semantic tokens, and established Mielui patterns. Use Mielui components where
they fit and Tailwind CSS for styling. Do not introduce a parallel visual
system to solve a local design problem.

## Start With the User's Job

Before designing, establish:

- Who is using the interface and what are they trying to do?
- What must they understand, compare, enter, or decide?
- What content or state is most important to that task?
- What constraint, caveat, or error could change the outcome?

Order the experience by user need rather than source order. Give each section
one purpose, combine repeated ideas, and omit unsupported or decorative
content. The primary path should be understandable from the title, headings,
key values, controls, and captions alone.

## Choose the Composition

Choose geometry before components. For substantial work, consider at least two
materially different layouts and select the one that makes the user's task
clearest with the least mediation.

- Reject the obvious category template unless the content earns it. A settings
  page does not automatically need a sidebar, and a landing page does not
  automatically need a centered hero followed by cards.
- Make the first viewport communicate the purpose and the dominant action,
  relationship, or evidence. It should not be only atmosphere or setup.
- Establish one dominant object in each major section. Supporting content
  should be quieter and visibly connected to it.
- Compose the page as a field, not a stack of interchangeable components.
  Vary density and scale while preserving a shared grid and alignment logic.
- Map information to suitable geometry: magnitude to length or position,
  change to sequence, composition to proportion, process to connection, and
  alternatives to aligned rows or columns.
- Use prose for one conclusion, tables for exact lookup, and charts only when a
  relationship becomes faster to understand visually.
- Give true peers equal structure. Do not force unequal content into equal
  cards or give equivalent values different visual weight.
- Use open space to amplify the focal object. Reflow underfilled splits,
  orphaned items, and accidental empty rectangles.

If the layout still feels safe or vague, strengthen one relationship through
proportion, hierarchy, density, alignment, or placement before adding effects.

## Typography and Rhythm

Use the project's configured sans typeface for interface text and headings.
Reserve the mono typeface for code, commands, paths, timestamps, and short
technical identifiers. Use existing type and weight tokens rather than
inventing isolated values. Weight stops at 500.

- Create hierarchy with type before adding surfaces, borders, or color.
- Use one page title, clear section headings, readable body text, compact
  labels, and subdued metadata. Equivalent elements share the same role,
  size, weight, line height, and numeric treatment.
- Write direct, sentence-case headings that describe the content or action.
  Avoid generic praise, ceremonial labels, and decorative section numbers.
- Keep long-form text near 60 to 68 characters per line. Rewrite or reflow
  before shrinking text.
- Align related text to shared edges and baselines. Adjacent columns need
  unmistakable gutters so wrapped lines cannot be read across columns.
- Use tabular numerals for values that readers compare vertically.

Build spacing from relationships rather than applying one universal gap:

- Keep a heading close to its first paragraph.
- Keep a label, value, and supporting detail together.
- Use a body rhythm between related paragraphs, controls, or list items.
- Use a clearly larger interval between distinct sections or tasks.
- Keep captions, validation, and sources close to what they qualify.

Every visible gap should have one owner. Prefer a parent stack or grid over
competing child margins. Fix awkward grouping or layout before adding a
one-off spacing value.

## Practice Restraint

Use existing semantic color tokens and preserve their meaning in every theme.
Color should communicate state, action, or data, not compensate for weak
hierarchy. Pair color-coded states with text, shape, or another non-color cue.

The interface is plates on a stage. Add a plate, border, or shadow only when it
communicates grouping, interaction, selection, or state more clearly than
spacing can. Default to stillness; add motion only to explain a state change,
preserve continuity, or confirm an action.

## Reject Generated-Design Reflexes

Do not ship:

- All-caps or widely tracked eyebrows, kickers, and overlines.
- Decorative gradients, blobs, textures, or ornamental shadows. The lit pill is
  a control material, not decoration: do not put it on a surface or a label.
- A generic centered hero followed by a grid of cards.
- A card, border, or rounded container around every section or metric.
- Pills for ordinary metadata, labels, or status that does not need a badge.
- Decorative icon tiles, oversized icons, or mixed icon styles.
- Tiny muted copy, arbitrary type sizes, inconsistent peer values, or weak
  contrast used to force content into a layout.
- Decorative charts, redundant visualizations, misleading scales, or color
  without meaning.
- Repeated section silhouettes when each section answers a different question.
- Stock imagery, fake screenshots, or abstract decoration added to fill space.
- Scroll reveals, parallax, pulsing indicators, bounce, or other motion that
  delays or distracts from the task.

Avoiding these defaults is not permission to produce a blank template.
Distinctiveness should come from a committed composition, precise typography,
strong alignment, and a relationship specific to the content.

## Responsive and Accessible by Default

Use semantic HTML, logical heading order, native controls, visible focus,
accessible names, sufficient contrast, and reading order that matches source
order. Never rely on color alone.

Design responsive behavior as recomposition, not uniform shrinking. Reflow
grids, stack comparisons, preserve readable type and control sizes, and allow
dense tables to scroll locally only when simplification or reordering cannot
preserve lookup. Do not hide page overflow to conceal layout defects.

## Review the Result

Inspect the rendered interface at desktop and narrow widths, in every supported
theme. Revise in this order:

1. Is the user's task and the dominant object clear in the first viewport?
2. Does each section advance the task without repeating another section?
3. Does typography communicate hierarchy before decoration does?
4. Are peers aligned and are spacing relationships deliberate?
5. Can any surface, border, icon, label, color, or motion be removed without
   losing meaning or affordance?
6. Does the interface reflow without overflow, broken reading order, or
   character-level wrapping?
7. Are semantics, focus, labels, contrast, and interaction states sound?

Fix the highest-impact structural problem first, then inspect again.

## Component reuse and interaction feedback

Use Mielui's own components whenever they cover the interaction. Documentation,
Studio, and examples should demonstrate the same components consumers install.
Use Collapsible for disclosures, Command for search, Table for tabular data,
and the existing Button, Badge, and input components instead of custom lookalikes.
Compose or restyle existing parts before introducing another implementation.

Add micro-interactions throughout the interface where users change state:
expand and collapse disclosures, move selection indicators, acknowledge copying,
and transition between icons. Keep controls a stable size and preserve focus.
Motion should respond immediately, reverse or continue cleanly when interrupted,
and clean up when a component unmounts.

Reuse the component's built-in animation or Mielui's motion actions first.
For interactions that need coordinated layout, springs, or presence transitions,
prefer the Humanspeak Svelte Motion port. Check its current documentation before
using an API. Simple hover and focus changes can remain Tailwind transitions.
Respect reduced motion and the theme's motion settings. Do not delay input,
navigation, or content visibility to finish an animation.


## The look in one sentence

White plates with continuous-curvature corners rest on a quiet grey stage, drawn
in a single ink. Everything pressable is a pill, filled actions are lit, and one
spring family moves it all.

## The ten rules

1. **One ink, everything derived.** Neutrals are never picked by eye. Borders
   are the foreground mixed into transparency at 12% (14% in dark), inputs at
   14% (16%), and the hover wash at 5% (6%). When a new neutral is needed, mix
   the foreground. Do not add a grey hex.
2. **Two layers, and the gap is the page.** A surface is a white frame holding a
   recessed inset in the stage color. Sections are plates, and the space between
   them is the only divider. Do not draw horizontal rules between sections.
3. **Squircles for surfaces, pills for controls.** Plates take continuous
   corners. Everything pressable that is not a plate takes `--radius-control`.
   A rounded rectangle button is the sign of a foreign component.
4. **Lit pills for filled actions.** Primary, secondary, destructive, and glow
   buttons, moving thumbs, and selected segments share one material,
   `.mielui-glow`. Fields, outline, ghost, and quiet controls stay flat.
5. **One spring family.** Panel 550/38, layout 550/40, pop 400/26, flick 900/50.
   Do not invent another curve.
6. **Weight stops at 500.** Inter Tight at 400 and 500, Geist Mono for code.
   Hierarchy comes from size, color, and spacing, never from heaviness.
7. **One accent, spent in one place.** The primary color belongs to the primary
   action and the primary data series. Status colors are text tints and small
   dots, not panel fills.
8. **Elevation is binary.** A thing is resting (`--elevation-1`) or floating
   (`--elevation-float`). There is no ramp and no glow halo.
9. **Exits are faster than entrances.** Things arrive with presence and leave
   without ceremony.
10. **Quality floor, always.** Focus rings, `role="status"`, `aria-hidden`
    decoration, reduced motion, and no horizontal page scroll.

## Required shared appearance and interaction contracts

These rules apply to every component and every docs or Studio example. Reuse the
existing implementation before adding local styling. A new component must follow
the same contracts; a visual exception must have a specific functional reason.

### Color

- `--color-background` is the grey stage. `--color-card` is the white plate.
  `--color-panel` is the floating panel. In dark mode the plate is lighter than
  the stage, so an inset in the stage color still reads as recessed.
- `--color-border`, `--color-border-strong`, `--color-input`, and `--color-wash`
  are the foreground mixed into transparency. Use `--color-wash` for every hover
  and selected row fill. Do not write a `foreground/[0.06]` tint by hand.
- `--color-secondary` is the flat grey for tracks, chips, and the secondary
  button fill.
- Status text uses `--mielui-success-text`, `--mielui-warning-text`,
  `--mielui-error-text`, and `--mielui-info-text`. They mix the status color with
  the foreground to reach 4.5:1 on soft tints and cards. Keep the raw status
  colors for small dots, icons, and chart tones. A status never fills a panel.
- The primary button uses `--color-on-primary`, which is dark on the default
  brand in both themes. No control is exempt from the contrast rule.
- Read colors from semantic `--color-*` tokens. Light, dark, and scoped Studio
  themes must share the same geometry.

### Type

- Inter Tight is the interface face and Geist Mono the code face. Both ship with
  the package. `font-semibold` and `font-bold` resolve to 500, so do not use
  them to create hierarchy. Use size, `text-foreground` against
  `text-foreground-muted`, and spacing.
- Headings are `font-medium` with `--tracking-header`. Body text is 14px, and
  secondary lines are 12 or 13px.
- Use `tabular-nums` for any number that sits in a column or changes in place.
- Sentence case everywhere: titles, buttons, labels, and tabs.

### Shape

- `--radius-control` is the pill. Buttons, toggles, tab triggers, badges, chips,
  single-line fields, select triggers, pagination items, calendar days, and
  breadcrumb items use it. Sharp themes set it to a small radius, so never
  write `rounded-full` on a control.
- Multi-line fields (Textarea, TagInput, Composer input) use `--radius-xl`. It
  equals half a medium control, so a one-line field still reads as a pill.
- Rows inside panels (menu items, list rows, calendar cells in a range) use
  `--radius-md`. Small marks (checkbox, kbd, inline code) use `--radius-sm`.
- Floating panels use `--radius-xl`. Plates use `--radius-2xl`, scaled by
  `--mielui-squircle` where the browser supports `corner-shape: squircle`.
- Indicators that are round by nature keep `rounded-full`: avatars, dots, radio
  marks, switch tracks and thumbs, slider thumbs, and progress tracks.

### Surfaces

- `.mielui-plate` is the resting surface: card fill, one hairline, plate radius,
  and `--elevation-1`. The default Card is a plate.
- `.mielui-inset-frame` or `.mielui-modal-frame` with `.mielui-inset-surface`
  is the two-layer surface: a white frame with a one-unit gutter around a
  recessed inset in the stage color. Header and footer strips sit on the frame.
  Content sits in the inset. Fields inside an inset are white, so they read as
  raised. Keep inner corners concentric: the contract computes them from
  `--mielui-plate-radius`.
- `.mielui-float-frame` is the floating panel: one layer, panel fill, hairline,
  `--radius-xl`, and `--elevation-float`. Menus, selects, comboboxes, popovers,
  hover cards, date-picker panels, and chart tooltips use it. They never show a
  double edge.
- Dialogs, sheets, drawers, and Command use `.mielui-modal-frame` with
  `--elevation-modal`.
- A frame attached to a viewport edge stays flush on that edge. Drawer floats a
  two-unit gap from its edge with all corners rounded.
- Card takes `surface="glass"` and is solid by default. Glass frosts the frame
  and leaves content on a solid inset. Explicit solid surfaces stay opaque,
  including chart tooltips.
- Do not add a hardcoded white border, an inner ring, or a second shadow to a
  surface. The contracts already draw every edge.

### The lit pill

`.mielui-glow` is a gradient of the control's own color under faint white light
layers, with every edge drawn by box-shadow and no drop shadow. It brightens on
hover and darkens on press.

- Set `--mielui-glow-color` for the fill. Set `--mielui-glow-light` from 0 to 1
  for how much light it catches. Lower it on dark fills. Set
  `--mielui-glow-ring` when the outer edge should be a hairline instead of a
  darker tint of the fill.
- Always pair it with `shadow-[var(--mielui-glow-shadow)]` and
  `focus-visible:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]`, so the
  focus ring adds to the edge instead of replacing it.
- The theme's edge highlight (`chrome.edgeHighlight`, 0 to 1, default 0.5)
  scales the light on every lit pill at once.
- Lit: primary, secondary, destructive, and glow buttons; switch and slider
  thumbs; the selected segment in Tabs, ToggleGroup, and segmented controls;
  the checked checkbox and radio fill.
- Flat: text fields, select and combobox triggers, outline, ghost, and quiet
  buttons, tracks, progress fills, badges, and metadata.

### Control geometry

Controls use three heights: `--size-control-sm`, `--size-control-md`, and
`--size-control-lg`, each minus `--size-hairline` for buttons. Icon buttons use
`--size-icon-md`, which equals a medium button and reads as a circle. Do not
size controls with raw `h-7`, `h-8`, `size-9`, or `h-10`. Keyboard focus uses
`--focus-ring`, a 3px ring at half the primary color, composed with any existing
edge.

- Checked checkboxes use the centered dash indicator. Preserve the native checked
  state and boolean API.
- Unchecked checkboxes and radios use `--mielui-control-border`, so their edge
  stays visible in both themes.
- Joined controls have one seam and flat adjoining corners. Use Group and its
  Separator. The outer ends keep the control radius, so a joined field and
  button read as one pill.
- Composite fields with focusable parts inside them, such as TagInput tags and
  NumberField steppers, show the field ring only while the text input has focus
  (`has-[input:focus-visible]`). A focused part shows its own ring; never both.
- Dialog panels carry `data-dialog-panel`; shared overlay styles and stacking key
  on that attribute. Viewport-level hosts that must stay usable above a modal,
  such as the Toaster, carry `data-overlay-root`.

### Motion

| Spring | Token | Used for |
| --- | --- | --- |
| Panel 550/38 | `--ease-spring-panel`, `panelIn` | menus, selects, popovers, anything that opens in place |
| Layout 550/40 | `--ease-spring-layout` | traveling highlights, sliding pills, measured width and height |
| Pop 400/26 | `--ease-spring-pop`, `dialogIn` | dialog and toast entrance |
| Flick 900/50 | `--ease-spring-flick` | icon micro-moves: a chevron turning, a glyph swap |

Springs run for `--motion-duration-spring` (350ms), `--motion-duration-pop`
(500ms), or `--motion-duration-flick` (270ms). Plain fades run for
`--motion-duration-hover` (150ms). Nothing in control chrome tweens longer than
200ms; if it feels slow, use a spring.

- Panels spring open from a 4px offset and 0.98 scale, and leave on a 100ms
  fade. Dialogs pop from 0.96 scale and 8px, and leave in 150ms. They never
  slide from an edge. Sheets and drawers are the exception and keep the drawer
  curve.
- Selection in a collection is one shared highlight that travels on the layout
  spring. Never flip a background per item.
- Hover changes color only. Cards do not lift, scale, or glow. The press effect
  on a control is the only geometry change a pointer causes.
- Use the shared helpers in `transition.ts` and the `--ease-spring-*` tokens.
  Do not add another animation or dismissal controller around an existing
  primitive, and do not write a local `cubic-bezier`.
- Size changes and interruptible entry or exit use the established Humanspeak
  motion implementation. Continue from the current rendered state when reversed.
- Honor reduced motion and zero-duration theme settings, including preference
  changes after mount. Cancel animation frames, observers, and timers on
  teardown. Continuous chart effects pause offscreen and in hidden documents.
- Keep interaction feedback local. A documentation example must not cover the
  surrounding page with a viewport-bound activity or notification. Use the shared
  isolated preview for Notch and other global overlays.

### States and copy

- A standing condition is a strip or pill that lives exactly as long as the
  state does. A one-off outcome is a toast that retires alone. Alert is the
  notice strip: a card plate with one medium claim, one muted sentence, and at
  most one secondary action.
- Buttons say what happens: "Save changes", then "Saved". Errors name the cause
  and the way out, without apology or blame. Empty states invite one action.
- A loading button keeps its label and gains a spinner beside it, so its width
  never jumps.

### Review requirements

Before calling a component visually complete, inspect its ordinary, hovered,
focused, pressed, disabled, invalid, and open states where applicable. Check
light and dark themes, shadows disabled, reduced motion, narrow layouts, and
joined-control seams. Use the repository's verification policy for automated
checks. Record new shared contracts here and explain consumer-facing changes in
the changelog; do not leave the next agent to infer them from one example.

## Borders

`chrome.borders` accepts `double` or `single` and defaults to `double`. Double
gives every two-layer surface its gutter: dialogs, sheets, drawers, toasts,
Notch, code blocks, diffs, inset tables, inset and panel cards, alerts, and
composers. Single removes the gutter, so the inset meets the frame's border.
Floating panels are always one layer.

Shared frames scale their gutter and inner ring with
`--mielui-border-inset-scale`. Single uses zero; double uses one. Keep the outer
border and concentric inner radius in both styles. Never set
`--mielui-modal-inset` to a fixed length on a frame. Multiply by
`--mielui-border-inset-scale` when a component needs a narrower gutter.

## Edge highlight strength

The theme setting `chrome.edgeHighlight` accepts 0 to 1 and defaults to 0.5.
Studio presents it as a percentage under Edges. It scales the light on lit pills
and the light inset edge on thumbs and keycaps. Structural borders, focus rings,
and cast shadows stay intact. Do not add fixed white inset shadows to individual
components. Shadow switches still disable their corresponding elevation tokens.

## Documentation composition

Every prop a component accepts is explained in prose on its page, not only in the
API reference. After the examples, a page adds one section per feature: what
the props in that group do, their defaults, and when to reach for them, with a
live example whenever the behavior can be seen or clicked. Group props by what
they do together, such as dismissal or opening on hover. Test each example in
the browser before describing it, and describe what it did. Props a part
inherits from Button get one sentence and a link to the Button page. A new or
changed prop ships with its sentence and, when it changes what people see, its
example.

Docs and Studio share one app shell. It fills the window edge to edge, with no
outer frame, inset panel or rounded corners. Full-height columns sit side by
side and hairlines in the border color divide them: an icon rail, the sidebar,
then the content column. Structural lines use the full border color, not the
softer `--docs-rule` used inside pages.

The rail is 16 spacing units wide, on the sidebar's surface, with a hairline on
its trailing edge. Its first row is as tall as the top bar and holds the brand
mark on a primary rounded tile. The mark is always white, in both themes and
whatever the theme's on-primary color is. Then come the Documentation,
Components, Theme Studio, Themes, Changelog and Agent skill links, a short rule
and search. GitHub sits at the bottom, inset from the edge as far as the brand
tile is from the top. Rail items
are muted icon buttons with tooltips that open to the right. Hover and the
current section use the pill fill (`--docs-pill`) with foreground color. Do not
add glows, blurs or brand tints to rail items. The rail follows the theme and is
never fixed dark. Use Hugeicons throughout the shell.

Hairlines split the panel, not gaps. The sidebar has a title row with the
workspace switcher and a hide button. The switcher shows the title and chevrons
and opens a menu of Documentation, Theme Studio, and Themes. The content column
has a top bar of the same height. The sidebar is hidden from its title row and shown again from the icon rail, or
with Cmd/Ctrl+B either way, and the choice persists. The show control is a rail
item after search and appears only while the sidebar is hidden; it never sits
in the tab bar. In light mode the rail and sidebar use the page
background and the content column the card color; in dark mode they share one
surface. Only docs pages with navigation show the
sidebar. Themes, Changelog and Agent skill use the full panel.

The Changelog page lists each version with its sections in a fixed order:
Breaking changes, Features, Fixes, then Docs last. Every section is a
collapsible row with its bullet count, divided by a hairline rule. Docs starts
collapsed; the others start open. The Markdown changelogs keep the same order.

Docs navigation is a plain text list: the guides first, then one group per
component type, with 2rem between groups. No row carries an icon, and search
lives in the rail and behind Cmd/Ctrl+K, not in the list. The navigation sheet
is the exception because it has no rail: it keeps a search row and icons on its
guide and site links. Every group label links to that group's own catalog page
at `/docs/components/<id>`, including Blocks, AI components and Chart
components. Do not link a group to an anchor on the Components index. Rows are
8 spacing units tall in muted regular text; the current page uses the pill fill
(`--docs-pill`) with medium foreground text. Group labels are medium foreground
text, stay pinned to the top of the sidebar while their group scrolls, and turn
semibold while pinned. A pinned label has an opaque background, so no row shows
behind it, and a short blurred fade directly beneath it. A small dot marks pages
that are open in another tab. A bare row pinned at the bottom shows the current
page's position in the docs: a segmented meter with the page count beside it. It
has no top border, card, label, or icon.

In docs and the other pages that share its shell, the bar with the tab strip
sits at the bottom of the content column, level with the sidebar's page meter,
so the page starts at the top edge. Studio keeps its bar at the top. The rest of
this section still calls it the top bar.

The docs top bar is a tab strip. The add button opens the component catalog in a
new tab; following a link changes the current tab, or switches to the tab that
already shows that page. Tabs are pills as wide as their label, up to 56 spacing units, where the
label truncates. Each has an icon for its kind of page: one per component group,
shared by that group's catalog page and its components, and one per guide. Do
not give every component the same icon. A tab has a page icon, a label,
and a close button on hover. The current tab uses the pill fill and the others a
fainter one. Cmd or Ctrl-click on a sidebar link opens it as a tab in the background. Drag a
tab onto another to reorder, or press Alt with the left or right arrow on a
focused tab. Error pages are never saved as tabs; they persist in local storage and scroll sideways
when they overflow. Copy page and the theme toggle sit at the end of the bar, in docs and in Studio. Pages without tabs
show one static pill with their name.

The shell has no status line. Do not add a
bar under the content column for the version, counts, the install command, or
page position. The install command is on the page, the version is in the
changelog, and previous and next links close the article.

Below large widths the rail disappears, the tab strip collapses to the current page name, and the sidebar
opens as a Sheet.

The shell is fixed to the viewport. Only the sidebar and the content column
scroll, never the document. Links and link buttons inside previews never
navigate; the shared preview cancels them.

Each page opens with a breadcrumb of its parents when it has more than one
level, then a visible title and its summary as muted lead text. `PageIntro` owns
this header. Copy page sits in the top bar. Do not hide the title or summary
behind a hover card.

The article is centered in the content column and at most 60rem wide. Previews,
code, and API rows use that full width, and prose stops at 44rem so lines stay
readable. Catalog pages are the exception and fill the column. The page outline
is a minimap at the far right at extra-large widths: a centered rail of hairline
dashes, one per heading, longer for sections than for subsections, with no
title and no text at rest. The current heading's dash is longer and uses the
foreground color. Dashes swell toward the pointer, and the nearest one shows its
heading in a small label beside the rail; a focused dash shows the same label.
Do not bring back a persistent list of outline links. Section titles are plain semibold headings on a full-width row.
They scroll with the page and are never pinned, because a pinned title costs a
row of vertical space on every screen. The top bar names the current section
instead: a quiet trail before Copy page shows the section, and the subsection
when there is one, with a short divider after it. Each name jumps back to the
start of its section. The trail appears once the first heading reaches the top
and is hidden below the medium breakpoint. Do not use inverted or pill-shaped
section titles. Put an optional section explanation
behind a labelled info control beside the title.
When a downward scroll stops with the next section just below the top, the page
settles that section into place. The settle never runs during a drag, under
reduced motion, or with zero-duration motion. Sections are separated by
4rem and their content by 1rem; the shared layout owns these distances. Previous
and next links close the article as labelled ghost Buttons above a hairline rule.
Do not float shell chrome as pills; the Studio preview switch is the one
exception.

Use rows for short facts and link lists. A row group is an inset frame of rows
separated by hairlines, with a muted label in a fixed column at the start and the
value directly beside it. Do not push values to the far edge. Rows that link somewhere put a medium label first, a muted
summary beside it, and a chevron at the end. Use the docs `Rows` component for
requirements, notes, next steps, and category lists instead of bulleted lists or
bordered tables. The API reference uses the same rows, with the prop name at the
start, then its type, description, and default. Parts without props of their own share
one group. Catalog tiles are an inset preview above the name and summary, with no
footer bar or hover card.

Previews, code blocks, row groups, API lists, and catalog tiles use the shared
inset frame, a chrome-colored frame around a card-colored surface. Frames follow
the theme's border mode, exactly like cards. With single borders the surface is
flush with the frame on every side except the one carrying a tab or toolbar
strip, which stays on the frame. With double borders a gutter surrounds the
surface. Do not force the gutter on docs previews or code blocks. The leading
preview keeps its ghost Preview and Code tabs in the frame chrome with the source
inside the same frame. While the source is shown, its copy button sits at the end
of that chrome row, not over the code, and example state is preserved when switching to code.
Keep both preview forms in the shared preview implementation and use
`data-preview-canvas` for canvas-specific spacing. Use the soft fill
(`--docs-soft`) only for hover states and Studio setting rows.

Isolated Notch previews invert the panel against the canvas so it stays visible
in both themes.

Every prop in the API reference has a description. Write it as JSDoc on the
prop type. For props passed through from a primitive, whose types cannot carry a
comment, add an entry to `apps/docs/scripts/api-descriptions.json`. The
generator warns about any prop left without one. A description says what the
prop does and names the effect of each value. Do not repeat the default, which
has its own line.

The API reference shows each prop's type without a trailing `| undefined`;
optional is the default and required props are labelled. Descriptions render
inline code.

Search opens as a compact palette about 34rem wide and at most 25rem tall. The
search row is the tallest row at about 48px, the key hint bar is about 42px, and
result rows are compact at 14px text, so the frame reads heavier than its list. It has page icons,
a muted hint at the end of a row only when it adds information, and faded top
and bottom edges. It lists open tabs, guides, places, and quick actions before a
query, and every component once one is typed.

The Themes page shows each preset as a specimen in its own colors, type, and
corner radius, using the preset's light or dark palette to match the page, with
the name, description, and three facts underneath.

Navigation between pages is immediate. Do not add page transitions to the docs
shell.

A scroller never ends in a hard cut against another region. Use the shared
`scrollFade` helper with the `fadeY` or `fadeX` mask. The fade grows with the
distance from each end and disappears when the scroller reaches it, so content at
rest is never dimmed. Vertical scrollers that meet a pinned region also get a
`ScrollEdge`, a short masked blur over that edge. This applies to the docs
sidebar above the page meter, the Studio inspector under its title and above the
export actions, the content column and Studio previews under the top bar and at
their bottom edge, the navigation sheet, the tab strip, and overflowing
preview controls. The top bar has no bottom border. Content fades and blurs as
it passes under the bar, so the bar and the page read as one surface at rest.
In docs the top edge is a short fill to the content color instead of a mask, so
the sticky catalog search row is not dimmed. That row gets its own short blurred
fade beneath it while it is pinned, so cards ease out under it. Skip the top fade only in the docs
sidebar, where pinned group labels mark the edge. Wrap a ScrollArea in `FadeScrollArea` instead of enabling
its chevron cues.

Examples demonstrate a useful state change. Label icon controls, keep result
messages in an explicit layout with a gap, and clean up timers and requests on
unmount. Loading examples finish or offer a state control; failure examples have
a working retry when retry is supported. Keep simulated results local and state
what actually happened. Chart-type guides share the parent component's API;
keep their HTML, Markdown, navigation, and search metadata aligned.

### Shared shell geometry

The docs sidebar starts 18.5rem wide and the Studio sidebar 21rem. Drag the sidebar's edge to resize it between 240 and 520 pixels. Each of the two remembers its own width in the browser. The edge shows a primary line on hover, focus and while dragging. It is a focusable separator: arrow keys move it 16 pixels, Home and End jump to the limits, and a double click restores the starting width. The sidebar title
row and the top bar are both 50px tall. Top bar controls use the small control
height with the Button's own radius and type; outline is reserved for the Copy
page group. Separate control groups with a gap, not a divider.

Studio preview modes are a floating segmented control at the bottom center of
the preview: a fully rounded track with a hairline border on the background
color and the floating elevation, holding text-only ToggleGroup items with a
quiet fill on the selected one. One mode is always selected. The Studio top bar
holds only icon buttons at its end: token picking, Undo, Redo, preview options,
and the theme toggle. Preview width and the
glass backdrop switch live in the preview options popover, not in the bar. Do not
add another toolbar row or more always-visible controls. Below the medium breakpoint the
floating switch is hidden and the modes become a select in the top bar that
shrinks before anything overlaps, the sheet trigger
reads Edit, and token picking and preview options are hidden. Every icon button
in the bar has a tooltip. In Studio the top bar,
the preview page and the sidebar share one background (`--docs-side`) in both
themes, so the bar reads as part of the page with only the scroll-edge blur under
it.

Section headings use semibold or medium weight with the configured
header font. Keep body labels and tabs lighter so section titles remain distinct.

Live chart motion must preserve values and proportions. Animate the area fill,
use a staggered sweep within bar bounds, and brighten pie segments in sequence
without moving their boundaries or center labels. Use low-contrast highlights with a quiet interval between passes, and suppress
live effects during chart inspection.
Observe the stationary chart viewport for visibility, never a moving highlight
that can leave its clip and strand its own animation. Honor reduced motion,
zero-duration themes, hidden documents, and offscreen charts.

Cartesian and pie chart overlay messages use the shared inset Card surface.
Compact Gauge loading and empty states retain the meter footprint without an
additional card wrapper. Keep
the placeholder visualization behind the message and preserve live status
announcements. Cartesian, pie, and heatmap tooltips render through one private
chart tooltip surface: the single-border frame around an inset surface with
`text-xs`, a medium header, and dot, label, and value rows. Do not build another
tooltip frame, add a fixed padding override or an extra inner border, or use a
native browser title tooltip. Inherit the shared glass helper; never force the
inner surface transparent or opaque, and keep explicit solid surfaces opaque.
Place tooltips beside the pointer or cell so the inspected mark stays visible;
pie tooltips sit outside the ring along the pointer's angle. Chart axes and
heatmap labels use the 12px badge size. Heatmap cells rely on grid gaps, not
per-cell rings; only hover and focus draw an outline.

The Studio sidebar holds the settings search, the preset picker, and five tabs:
Color, Type, Shape, Surface, and Motion. The preset picker stays above the tabs
because it applies to all of them. Each tab lists every setting it owns inline.
Do not move settings into a dialog or behind an Advanced button. Use toggle
buttons for a choice between two values.

Each group is a small medium-weight title above a column of rows. A row is one
soft rounded bar, 36px tall, with a muted label at the start and its control at
the end. Controls inside a bar carry no border of their own: selects and color
triggers are ghost buttons, a color shows its name or hex before the swatch, and
a two-value choice is a pair of text toggles. A numeric setting is a Slider with
`variant="field"`, so the bar itself is the control and its value sits at the
end in the mono font. Keep the Studio calm: the Color tab opens with Brand,
Backgrounds and Text only. Chart colors and the full list of color tokens each
sit behind a disclosure at the end of the Color tab. A search field above the
groups filters settings by name. A query that matches a row shows that row in its
group. A query that matches only a group's title or keywords shows the whole
group. A search reaches across all tabs and shows no tab as selected. Choosing a
tab clears the search. Disclosures open while searching, and an empty result
offers a Clear search button. A setting that differs from the selected preset shows a small reset button
beside its label, which puts that one setting back. For a token, that removes
the override. Undo and Redo sit at the start of the top bar actions and answer
Cmd or Ctrl+Z and Shift+Cmd or Ctrl+Z. They cover every edit, preset switch and
reset. One drag is one step.

The pointer button beside Undo turns on token picking. While it is on, the
preview does not react to clicks. Hovering outlines the component under the
pointer, and clicking one opens a panel anchored to it with the tokens that
component uses, read from the page's stylesheets. The panel groups them under
Color, Shape and Motion, uses the same setting rows as the sidebar, shows how
many copies of the component are on screen, and has Select parent, Close and a
Reset for its overrides. Escape closes the panel, and Escape again leaves
picking.

Export theme opens a sheet from the right with the theme as CSS, as JSON, and
the CLI steps, with Copy JSON and Copy CSS in its footer. A draft takes the name
of the preset it started from. Each preset in the picker shows a swatch of its brand color. Copy share link
puts the whole theme in the link's hash, so nothing is stored on a server.
Opening such a link asks before it replaces the current draft. A theme applied on the
Themes page is handed to the Studio, which opens on it instead of its old draft. The export actions stay pinned
under the scrolling groups, with Copy share link above Export theme so the
primary action sits at the bottom edge. The preview fills the content column under the top bar.

Studio demos are composed cards, not loose controls or section headings. The
Components demo is a masonry of inset cards, each a small realistic task; chart
demos sit in the same cards. The masonry is centered, at most three columns
wide, with a 6-unit gap between cards. Footer actions keep their natural width
at the end of the footer; do not stretch a button across a card. Center a fixed-size component, such as a calendar,
inside its card. Demo cards pass the theme's glass setting to Card's `surface`
prop, so they show what the component itself does.

Setting toggles are one flat segmented track: a hairline input border on the
card fill at the medium control height, with ToggleGroup's own selected fill and
traveling highlight inside. Do not give each option its own border or control
edge. Selects, color triggers, and icon buttons keep their default heights. The App preview has a single app header
holding the workspace menu, its tabs, and its actions.

Drawer floats beside the edge it opens from. Top and bottom drawers are centered
at 36rem and never wider than the viewport minus the gap; left and right drawers
are 24rem wide and fill the height. The class on Content sizes the visible panel.
The handle is a 36 by 4px bar in a quarter-strength foreground tint that follows
the direction: first in a bottom drawer, last in a top drawer, and a vertical bar
on the inner edge of a side drawer. Opening a drawer focuses the panel, not its
first control. Regions do not set their own max width.

Modal overlays (Dialog, AlertDialog, Sheet, Drawer, Command, and Notch) share one
frame inset, `--mielui-modal-inset`. Anchored floating panels keep the half inset.
Never hardcode the inset in pixels; measure the shared token when geometry needs a
number. Overlay titles use the shared header title classes, and descriptions use the
shared description classes. The dismiss X is the shared internal overlay close: a
ghost icon Button at the small control height with a 14px Cancel icon, aligned with
the title's first line. Overlay footers sit on the outer frame below the inner
surface, in one row: the ghost Close or Cancel at the start and the confirming
action at the end. Command separators follow the menu separator rule below.

Menu separators span the full inner panel width, including submenus. Cancel the
shared item padding at the separator rather than removing padding from menu items.
Keep separators square at the panel edges.

Toolbar.Root is flat by default. Opt into depth with `variant="depth"`; its
Button, Link, and Item inherit the choice. Toolbar depth uses the shared floating elevation for its shell and theme-owned
`--mielui-toolbar-raised` relief for its keys. Selected tools use
`--mielui-toolbar-pressed` and the background fill;
compose focus rings with that relief. The composer toolbar stays flat: it joins
the input on one surface by default. The input starts compact and grows with
its content. `variant="inset"` puts the input on its own inset surface and the
toolbar in the frame under it, matching an inset Card and its footer. Toolbar
controls are ghost buttons and triggers. Outline ones in either placement render
as flat pills with a hairline border, no control edge, and the small control
height. The toolbar scopes that size to everything inside it, including the send
button, so the strip under the input stays about as tall as one small control.
`Composer.Footer` is a strip on the frame under the writing surface, for hints
and message-wide settings such as connected apps. It uses muted label text and
the same small control height, and the joined input and toolbar stay above it.
Do not build that strip outside `Composer.Root` or tint a wrapper to fake the
frame.

Tooltips keep their dedicated tooltip background and foreground pair in every
surface mode, so their polarity never flips when glass is enabled. Glass makes
that fill slightly translucent with the shared blur; it never uses the overlay
glass fill, which disappears against dark pages. Every tooltip keeps a hairline
foreground edge under its floating elevation.

File and context chips are flat pills at the small control height: a hairline
border on the card fill, a 20px leading icon or image thumbnail, a truncated
label, and a compact circular remove button. They carry no shadow. Put attachment
chips in a compact scrolling row above Composer.Root, inside the same Attachment.Root.
Leave a small gap above the frame; keep files outside the writing surface and action
strip. Composer.Header remains available for optional context inside the form. Toolbar
keys use the outline within their elevation token without adding a second border.
Keep the original compact control size. Raised keys have a directional top edge
and a short contact shadow; pressed keys trade that shadow for an inward top shade.
Both toolbar relief tokens flatten when control shadows are disabled.

Changing numeric readouts use the shared `numberShuffle` action: counts, totals,
percentages, zoom levels, and durations. Apply it to a text-only HTML span with
the same initial text and a formatter that uses its numeric argument. Keep units
inside that formatter when they belong to the value. Editable input values, SVG
axis labels, dates, and static numeric identifiers remain native. Custom snippets
follow this rule too. Do not attach the action to a container containing controls
or to hidden content that an overlay clones.

The opt-in toolbar depth uses a shallow key face, a thin dark sidewall, and a
short contact shadow. Its theme-owned face gradient follows the edge highlight
and disappears with control shadows. Preserve compact key sizes and avoid thick
bevels or stacked outlines. The default toolbar remains flat.

## Chart palette and inset placement

Chart series use `--chart-1` through `--chart-5` in order, cycling only after the
fifth series. The default palette is pastel purple, blue, red, green, and yellow.
Use these tokens in examples, legends, and tooltips; retain explicit series colors
and semantic status tones. Studio edits the active color mode and exports those
values as theme tokens.

The default radius scale is 8/10/14/20px. Table cell corners subtract the frame
border and inset from its outer radius; never substitute a smaller fixed radius.
Preview frames clip their toolbar backgrounds to preserve the perimeter.

`--mielui-inset-position: top | bottom` moves exposed inset chrome in DOM order.
Omitting the token preserves authored composition. Use the shared internal inset
layout action, and override the token on a particular frame when its content
requires a fixed order. Install command tabs and File Diff headers stay on top.
DataTable inset mode frames only the table and its footer. The toolbar floats
above the frame as plain controls with a gap, never inside it. Root lifts the
Toolbar out of the frame the way an inset Card lifts its Footer. With the inset
position at the bottom, the footer sits in the frame under the table. With it at
the top, the footer joins the table's surface under a hairline and the table's
bottom corners are square where they meet it.

Every frame follows the border setting. Single borders remove the gutter from
cards, dialogs, sheets, data tables, composers, toasts, code blocks and docs
previews alike, so the inner surface meets the frame's border. Double borders
give each of them the gutter. Never set `--mielui-modal-inset` to a fixed
length on a frame. Multiply by `--mielui-border-inset-scale` when a component
needs a narrower gutter. Menus, selects, popovers and tooltips are the one
exception: they are always single.
Isolated viewport previews are flush with their frame border so edge-attached
panels meet the preview edge. Notch outlines trace only the exposed perimeter;
the attached edge stays open without a closing border line.

Glass retains a contrasting translucent inner panel over the outer chrome. Avoid
fully transparent inner surfaces on composers and other inset layouts: they erase
the structural distinction. Keep the shared blur and reduced-transparency fallback.
The composer's default toolbar shares the input's glass fill so the two read as one
surface, and its outline pills stay transparent until hovered or open.
On solid surfaces the default toolbar overlaps the input by one pixel, so no frame
color shows between them under a fractional transform. Glass keeps the two edges
flush, because overlapping translucent fills would draw a line.
The Studio glass backdrop is preview-only and never exported with a theme.

## Landing page showcase

The landing page pairs concise left-aligned copy with a compact interactive
component showcase in a muted hero derived from the active primary color. Keep equal outer side gutters, use
the active theme palette, and avoid recreating another site's gradient treatment. This
marketing surface is an intentional exception to the neutral documentation
canvas. Keep the header simple, use actual Mielui components in the featured
preview, and make faded background samples inert and hidden from assistive
technology. Avoid invented endorsements or usage counts. On narrow screens,
stack the content and allow normal page scrolling rather than clipping the hero
to a fixed viewport.

Below the hero, the page continues on the page background with a few sections
in one 84rem column, so every section shares the same edges. The first is the
live demos: a heading and two sentences of copy, then one inset frame with ghost
tabs for Coding agent, Chat, and Issue. Show one demo at a time at a fixed
height. Do not stack the demos or add a preset switcher there. Each demo is
built from library components, works when clicked, and lives in
`$lib/components/demos` so the Studio's AI tab renders the same files. In the
Studio, the AI and App previews are the same titled cards, stretched to the full
height of the preview pane. Place cards side by side, never stacked. The AI tab
shows the coding agent beside the chat and scrolls sideways when the pane is too
narrow for both. The App preview is one card holding a sidebar app: workspace
switcher, view links and account menu in the sidebar, search and notifications
in the top bar. Below 48rem the sidebar gives way to tabs in the top bar. A demo
transcript opens at its first message and follows new messages only after the
visitor sends one.

The remaining sections each have a heading and one-line summary at the start and
an install command, code block, or row group beside it. Cap the hero height on
tall screens so the first section is visible. Do not add card grids,
testimonials, or decoration there.

Preserve the original restrained hero gradient and lighter featured showcase. The featured preview uses the shared `mielui-inset-frame` with
its ghost tabs in the frame chrome and the demo on `mielui-inset-surface`. The featured preview follows the page theme: a light palette on white frost in light mode, and a dark palette on black frost in dark mode. Composer
actions join the input on one surface unless a demo explicitly opts into the
inset toolbar. Each featured tab is one small real task with plain labels: a composer with
example prompts, a few notification settings, and a weekly chart with its total.
The panel keeps one height across tabs. Do not use slogans as control labels.

Component catalog previews render real components in a decorative, inert and
`aria-hidden` region marked `data-component-preview`, which keeps their headings
out of the page outline. Popups that cannot render inline, such as menus,
dialogs, and tooltips, are drawn with the shared frame, menu-item, and elevation
classes instead of invented shapes. Each card has one stretched link on its name.
Do not nest the preview inside that link, because the preview contains buttons
and links.

Size each scrolling region in docs and Studio from the remaining workspace height,
not directly from viewport height.

Documentation error pages use a single centered recovery message in the reading
column. Keep navigation available, show the status beside the message, and omit
pagination until content loads successfully.

Menu rows and their traveling highlight share a corner radius capped at `--radius-md` and bounded by the panel radius minus its border and row inset. Short rows must not become pill-shaped inside the larger menu frame.

The default appearance uses single borders, bottom inset strips, solid surfaces,
half-strength edge highlights, and a primary button border. Cards and menus have
no surface shadows; control and dialog shadows remain enabled. Explicit theme
settings and per-component surface choices override these defaults. The default
chart palette places pink in Chart 2 and blue in Chart 3.
