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

The docs site defaults to the system SF stack through the System entry in its
font list; the font picker and a live Studio theme override it. A display
headline on the landing page may set one word in the Instrument Serif italic
accent (`.accent`). Nowhere else uses the serif.

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
spacing can. Do not wrap text, lists, or navigation in a card to make them look
designed, and never put a card inside a card. Default to stillness; add motion
only to explain a state change, preserve continuity, or confirm an action.

## Reject Generated-Design Reflexes

These rules govern product UI, components, and examples. The landing page and
the docs chrome carry a deliberate identity derived from the mielwm site: soft
color meshes with film grain, tilted gradient stickers that name a group, a
one-time stagger reveal in the landing hero, and a grid of feature tiles. Use
them only in the site chrome, through the shared classes in `app.css` and the
palette in `look.ts`. Never copy them into a component or an example.

Do not ship:

- All-caps or widely tracked eyebrows, kickers, and overlines.
- Decorative gradients, blobs, textures, or ornamental shadows. The fill
  material (`.mielui-glow`) belongs to controls, not decoration: do not put it
  on a surface or a label.
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
in a single ink. Everything pressable shares one control radius, filled actions
are flat and uniform, and one spring family moves it all.

## The ten rules

1. **One ink, everything derived.** Neutrals are never picked by eye. Borders
   are the foreground mixed into transparency at 12% (14% in dark), inputs at
   14% (16%), and the hover wash at 5% (6%). When a new neutral is needed, mix
   the foreground. Do not add a grey hex.
2. **Two layers, and the gap is the page.** A grouped surface is a white frame
   holding a recessed inset in the stage color. Sections are plates, and the
   space between them is the only divider. Do not draw horizontal rules between
   sections.
3. **Squircles for surfaces, one radius for controls.** Plates take continuous
   corners. Everything pressable that is not a plate takes `--radius-control`:
   a 12px rounded rectangle by default, 4px in the sharp scale, and a pill in
   the rounded scale. Never hand-pick a radius for a control.
4. **Filled actions are flat.** Primary, secondary, and destructive buttons,
   moving thumbs, and selected segments share one material, `.mielui-glow`: a
   solid fill held by a hairline ring, with no gradient, inner light, or drop
   shadow. The `glow` button is the one lit action. A theme's edge highlight
   lights every fill at once. Fields, outline, ghost, and quiet controls carry
   no fill.
5. **One spring family.** Panel 550/38, layout 550/40, pop 400/26, flick 900/50.
   Do not invent another curve.
6. **Weight stops at 500.** The default theme sets Inter Tight at 400 and 500
   and Geist Mono for code; the docs site defaults to the system SF stack.
   Hierarchy comes from size, color, and spacing, never from heaviness. The
   only serif is one accent word in a landing display headline.
7. **One accent, spent in one place.** The primary color belongs to the primary
   action and the primary data series. Status colors are text tints and small
   dots, not panel fills.
8. **Elevation is binary.** A thing is resting (`--elevation-1`) or floating
   (`--elevation-float`). There is no ramp and no glow halo. The default theme
   turns both off, so cards and menus are held by their hairline alone, and
   turns control shadows off, so fields and buttons are held by their hairline
   too. Only dialogs and sheets cast a shadow.
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
  `--color-panel` is the floating panel. In dark mode the plate is the darkest
  surface, and the stage and insets sit one step lighter around it. Keep
  neutral tints faint: a strong hue at low lightness reads as brown.
- The docs site re-inks the default theme to its own palette in `app.css`: a
  `#f5f5f5` page with white cards in light mode, and a `#0e0e0e` page with
  lighter `#161616` cards in dark mode, so tiles and previews lift off the page
  in both themes. It only overrides the neutral steps, and only while no live
  Studio theme is applied. The library's own default theme is unchanged.
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

- `--radius-control` is the shape of every control. It is 12px by default, 4px
  in the sharp scale, and a pill in the rounded scale, so the three scales look
  different. Buttons, toggles, tab triggers, badges, chips, single-line fields,
  select triggers, pagination items, calendar days, and breadcrumb items use
  it. A selected range in a calendar keeps the control radius at its two ends
  and squares the days between. Never write `rounded-full` or a fixed radius on
  a control.
- Multi-line fields (Textarea, TagInput) use `--radius-xl`. The Composer input
  is an inset surface and takes its radius from the frame.
- Menu rows and their traveling highlight use the control radius, bounded by
  the panel radius minus its border and row inset. List rows use
  `--radius-md`. Small marks (checkbox, kbd, inline code) use `--radius-sm`.
- Plates use `--radius-2xl`, scaled by `--mielui-squircle` where the browser
  supports `corner-shape: squircle`.
- Nested corners share a centre: inner radius = outer radius - border - gap.
  When a surface holds controls close to its corners, the surface takes its
  radius from them instead of the plate scale:
  - Two-layer frames (Dialog, Sheet, Drawer, inset Card, Table, Composer) use
    control radius + two spacing units + border, capped at `--radius-2xl`.
    Their header and footer strips pad by two spacing units (`p-2`), which puts
    a control-radius button on the frame's centre. The Command palette is the
    exception: it keeps a larger radius of 1.5 × `--radius-2xl`.
  - Floating panels use control radius + one spacing unit + border, capped at
    `--radius-xl`. Their rows sit one spacing unit inside.
  - CodeBlock is a tight frame: it uses the floating-panel radius, and its
    header pads by one spacing unit.
  - A track that pads its items by one spacing unit (Toolbar)
    uses control radius + one spacing unit. ToggleGroup and segmented Tabs keep
    the control radius on the track and subtract the unit from the selected
    item.

  Do not put a control-radius element within about 10px of a larger corner
  without applying this rule; change the outer radius or the gap, never
  hand-pick an inner one.
- Indicators that are round by nature keep `rounded-full`: avatars, dots, radio
  marks, switch tracks and thumbs, slider thumbs, and progress tracks.

### Surfaces

- `.mielui-plate` is the resting surface: card fill, one hairline, plate radius,
  and `--elevation-1`. The default Card is a plate.
- `.mielui-inset-frame` or `.mielui-modal-frame` with `.mielui-inset-surface`
  is the two-layer surface: a white frame around a recessed inset in the stage
  color. Header and footer strips sit on the frame. Content sits in the inset.
  The gutter between them follows the border setting (see Borders). Fields
  inside an inset are white, so they read as raised. Keep inner corners
  concentric: the contract computes them from `--mielui-plate-radius`.
- Header and footer strips move to the theme's `--mielui-inset-position` edge.
  `insetLayout()` reorders the DOM once scripts run, and a `ui.css` style query
  orders the strips the same way before that, so server-rendered frames never
  jump. A new strip goes in both lists.
- `.mielui-card-frame` with `.mielui-card-surface` is the panel Card: the same
  two layers with a half-unit gutter at `--radius-xl`.
- `.mielui-float-frame` is the floating panel: one layer, panel fill, hairline,
  the nested panel radius above, and `--elevation-float`. Menus, selects,
  comboboxes, popovers, hover cards, date-picker panels, and chart tooltips use
  it. They never show a double edge.
- Dialogs, sheets, drawers, and Command use `.mielui-modal-frame` with
  `--elevation-modal`.
- A frame attached to a viewport edge stays flush on that edge. Sheet is not
  attached: it floats a small margin from the viewport with every corner
  rounded. Drawer floats a two-unit gap from its edge with all corners rounded.
- Card takes `surface="glass"` and is solid by default. Glass frosts the frame
  and keeps content on a contrasting translucent inset. Explicit solid surfaces
  stay opaque, including chart tooltips.
- Do not add a hardcoded white border, an inner ring, or a second shadow to a
  surface. The contracts already draw every edge.

### The fill material

`.mielui-glow` is the one material for filled controls. By default it is flat: a
solid fill of the control's own color held by a hairline ring, with no gradient,
inner light, or drop shadow. It takes the control radius. Hover shifts the whole
fill a few percent toward the ink at once, with no fade, and press shifts it
further while the press scale runs. `.mielui-glow-neutral` is the white selected
fill on a grey track, and a lifted grey in dark mode.

The theme's edge highlight lights it. Above 0, the fill becomes the lit look: a
gradient of the control's own color under faint white light layers, every edge
drawn by box-shadow, a hover light that fades in, and a top-shaded press.
`.mielui-glow-lit` keeps a control lit when the theme is flat, at the strength
of the default lit look or the theme's own, whichever is higher. Only the `glow`
button uses it.

- Set `--mielui-glow-color` for the fill. Set `--mielui-glow-light` from 0 to 1
  for how much light it catches when lit. Lower it on dark fills. Set
  `--mielui-glow-ring` when the outer edge should be a hairline instead of a
  darker tint of the fill.
- Always pair it with `shadow-[var(--mielui-glow-shadow)]` and
  `focus-visible:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]`, so the
  focus ring adds to the ring instead of replacing it.
- The fill sits on `background-image`, so a control that hides its unselected
  fill uses `bg-none` and `before:hidden`, as Calendar days do.
- Filled: primary, secondary, destructive, and glow buttons; switch and slider
  thumbs; the selected item in Tabs, ToggleGroup, Toggle, and Pagination; the
  selected Calendar day; the checked checkbox, radio, and Question mark; the
  Composer send button.
- No fill: text fields, select and combobox triggers, outline, ghost, and quiet
  buttons, tracks, progress fills, badges, and metadata.
- A selected segment on a track also carries selection in its text: foreground
  color and medium weight against muted regular text. A white fill on a grey
  track cannot reach 3:1 on its own.

### Control geometry

Controls use three heights: `--size-control-sm`, `--size-control-md`, and
`--size-control-lg`, each minus `--size-hairline` for buttons. Icon buttons use
`--size-icon-md`, which equals a medium button. Do not size controls with raw
`h-7`, `h-8`, `size-9`, or `h-10`. Keyboard focus uses `--focus-ring`, a 3px
ring at half the primary color, composed with any existing edge. Pressable
controls take the shared `.mielui-press` class, which shrinks them by
`--motion-press-px` on press whatever their size.

- Checked checkboxes use the centered dash indicator. Preserve the native checked
  state and boolean API.
- Unchecked checkboxes and radios use `--mielui-control-border`, so their edge
  stays visible in both themes.
- Joined controls have one seam and flat adjoining corners. Use Group and its
  Separator. The outer ends keep the control radius, so a joined field and
  button read as one control.
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
| Layout 550/40 | `--ease-spring-layout` | switch thumbs, chart tooltips, measured width and height |
| Pop 400/26 | `--ease-spring-pop`, `dialogIn` | dialog entrance |
| Flick 900/50 | `--ease-spring-flick` | icon micro-moves: a chevron turning, a glyph swap |

Springs run for `--motion-duration-spring` (280ms), `--motion-duration-pop`
(400ms), or `--motion-duration-flick` (240ms). Panels open in
`--motion-duration-panel-in` (220ms). Row and tab highlights glide in
`--motion-duration-item` (110ms) on `--ease-out`: a quick follow, not a spring.
Enter and exit fades (tooltips, panels, scroll edges) run for
`--motion-duration-hover` (150ms). The press scale runs for
`--motion-duration-press` (120ms) and animates only `transform` and `scale`, so
it never delays a hover color. Interface motion stays
under 300ms, dialogs and sheets aside. The theme's motion feel scales every one
of these together.

Frequency decides whether something moves at all:

- Keyboard-driven changes never animate. The traveling highlight glides for a
  pointer and snaps for arrow keys, selection changes, and resizes. The command
  palette opens and closes without motion, and its result count is plain text.
- A tooltip waits 500ms for a resting pointer, so passing over a toolbar does
  not flash labels, and opens at once for keyboard focus (`:focus-visible`). A
  click that focuses the trigger still waits. It fades in from its trigger's
  side once. Moving to the next trigger repositions it instantly.
- The sidebar toggle snaps. Do not animate a width that re-lays-out the page.

- Panels spring open from 0.98 scale and a 4px offset on their trigger's side,
  so they emerge from what opened them, and leave on a 100ms fade. Dialogs pop
  from 0.96 scale and 8px, and leave in 150ms. They never slide from an edge.
  Sheets and drawers are the exception and keep the drawer curve.
- Selection in a collection is one shared highlight. Hover washes, tab and
  toggle-group indicators, and the header and sidebar highlights all
  use the short item glide for a pointer and snap for the keyboard. A full
  spring on these is too much and an instant jump is too little. Never flip a
  background per item. Move indicators with `translate`, not `left` or `top`.
- A measured indicator needs a CSS fallback for server-rendered HTML. Tabs
  styles the selected trigger itself until its list carries
  `data-indicator-ready`. Text drawn on top of an indicator keeps its resting
  color until the indicator exists, so it is never invisible before
  hydration.
- Nothing enters from below 0.9 scale, and nothing loops for attention.
- Hover changes color only, and instantly: never transition a hover background,
  text color, border, or underline. Cards do not lift, scale, or glow. The press
  effect on a control is the only geometry change a pointer causes. The lit
  material's hover light and the gliding highlights are the exceptions.
- Use the shared helpers in `transition.ts` and the `--ease-spring-*` tokens.
  Do not add another animation or dismissal controller around an existing
  primitive, and do not write a local `cubic-bezier`.
- Size changes and interruptible entry or exit use the established Humanspeak
  motion implementation. Continue from the current rendered state when reversed.
  An overlay a person toggles uses one reversible Svelte `transition:` (pick the
  enter or exit helper from the open state), never separate `in:` and `out:`
  that restart from their first frame. Never drop input while something moves.
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

`chrome.borders` accepts `double` or `single` and defaults to `single`. Single
has no gutter: the inset meets the frame's border, and the frame shows only
where a header, toolbar, or footer strip sits on it. Double gives every
two-layer surface a gutter: dialogs, sheets, drawers, toasts, Notch, code
blocks, diffs, inset tables, data tables, inset and panel cards, composers, and
docs previews. Alert is a single plate and has no gutter. Menus, selects,
popovers, and tooltips are always one layer.

Shared frames scale their gutter and inner ring with
`--mielui-border-inset-scale`. Single uses zero; double uses one. Keep the outer
border and concentric inner radius in both styles. Never set
`--mielui-modal-inset` to a fixed length on a frame. Multiply by
`--mielui-border-inset-scale` when a component needs a narrower gutter.

## Edge highlight strength

The theme setting `chrome.edgeHighlight` accepts 0 to 1 and defaults to 0, the
flat look. Studio presents it as a switch under Edges with a strength in
percent; turning it on restores 33%, the strength of the original lit look. Any
value above 0 lights every `.mielui-glow` fill and scales the light inset edge
on keycaps and toolbar keys. Structural borders, focus rings, and cast shadows
stay intact. Do not add fixed white inset shadows to individual components.
Shadow switches still disable their corresponding elevation tokens.

## Documentation composition

Every component page opens with a playground: variants in its toolbar, the
other props in a Props menu, and code under the preview that follows the
controls. Every prop a component accepts is explained in prose on its page, not
only in the API reference. After the examples, a page adds one section per
feature: what the props in that group do, their defaults, and when to reach for them, with a
live example whenever the behavior can be seen or clicked. Group props by what
they do together, such as dismissal or opening on hover. Test each example in
the browser before describing it, and describe what it did. Props a part
inherits from Button get one sentence and a link to the Button page. A new or
changed prop ships with its sentence and, when it changes what people see, its
example.

The site has no frame, rail, or plate. The page color is the background, and
one borderless sidebar at the start holds the site chrome. Docs pages, Themes,
Fonts, and Studio all use the docs sidebar. Studio adds its settings panel at
the end of the window, on the other side of the preview, never in place of the
docs sidebar. Nothing draws a rule between a sidebar and the page.

The top of the sidebar stands in for a header: the brand, then GitHub with its
star count in a tooltip and the theme toggle, then a search field that opens
the palette and shows Cmd/Ctrl+K. The brand is the only `.brand` element
visible at any width, because it carries the `brand` view-transition name.
Below the large breakpoint the sidebar is hidden and a slim header on the page
color takes its place: the menu button, the brand, search, GitHub, and the
theme toggle. The menu opens the same navigation in a Sheet. The sidebar does
not collapse and has no keyboard shortcut to hide it.

The Changelog page lists each version with its sections in a fixed order:
Breaking changes, Features, Fixes, then Docs last. Every section is a
collapsible row with its bullet count, divided by a hairline rule. Do not frame
a version or its sections in a card. Docs starts collapsed; the others start
open. The Markdown changelogs keep the same order.

Docs navigation starts with the site pages (Components, Theme Studio, Themes,
Changelog) as plain rows with a page icon and no group heading, then the Get
started group, whose rows also carry an icon. One group per component type
follows, with plain text rows and no icons. Every group is headed by a sticker: a small tilted gradient
tile with a white glyph from `look.ts`, which springs upright while its group is
hovered. Each group label links to that group's own catalog page at
`/docs/components/<id>`, including Blocks, AI components and Chart components.
Do not link a group to an anchor on the Components index. Rows are 8 spacing
units tall in muted regular text with a faint ink wash on hover. The current
page is medium foreground text on a soft wash (`--color-wash`) sized to its
label, not the full row. The wash glides to the next page. Group labels stay pinned to the top of the sidebar
while their group scrolls. A pinned label has an opaque page-color background
and full text color, so no row shows behind it, and a short fade to the page
color directly beneath it, with no blur. The sidebar has no top scroll fade, so
the pinned label is never dimmed. A bare row pinned at the bottom shows the current page's position
in the docs: a segmented meter with the page count beside it. It has no top
border, card, label, or icon.

The docs have no tab dock and no open-page tabs. Do not add a floating bar to
the bottom of the page.

The shell has no status line. Do not add a bar under the page for the version,
counts, the install command, or page position. The install command is on the
page, the version is in the changelog, and previous and next links close the
article.

The shell is fixed to the viewport. Only the sidebar and the page scroll, never
the document. Links and link buttons inside previews never navigate; the shared
preview cancels them.

Each page opens with `PageIntro`: its group's sticker label, which links to the
group page, then a visible title and its summary as muted lead text, over a
`.mesh-glow` tint of the group color that fades to nothing. There is no
breadcrumb. Copy page floats at the top end of the page, with the current
section's trail before it. Do not hide the title or summary behind a hover
card.

The article is centered on the page and at most 60rem wide. Previews, code, and
API rows, and prose all use that full width, so text and previews share one edge.
Catalog pages, Themes and Fonts use the same 60rem column. The page outline is a
minimap at the far right at extra-large widths: a centered rail of hairline
dashes, one per heading, longer for sections than for subsections, with no title
and no text at rest. The current heading's dash is longer and uses the
foreground color. Dashes swell toward the pointer, and the nearest one shows its
heading in a small label beside the rail; a focused dash shows the same label.
Do not bring back a persistent list of outline links. Section titles are plain
medium headings on a full-width row. They scroll with the page and are never
pinned, because a pinned title costs a row of vertical space on every screen.
The trail beside Copy page names the current section instead, and the
subsection when there is one. Each name jumps back to the start of its section.
The trail appears once the first heading reaches the top and is hidden below
the large breakpoint. Do not use inverted or pill-shaped section titles. Put an
optional section explanation behind a labelled info control beside the title.
When a downward scroll stops with the next section just below the top, the page
settles that section into place. The settle never runs during a drag, under
reduced motion, or with zero-duration motion. Sections are separated by 16
spacing units and their content by 4; the shared layout owns these distances. Previous and next
links close the article as two tiles, each with the target group's sticker, a
small Previous or Next label, and the page title.

Floating shell chrome is limited to three things: the Copy page cluster, the
Studio preview switch, and the Studio preview tools. Do not add
another.

Use rows for short facts and link lists. A row group is an inset frame of rows
separated by hairlines, with a muted label in a fixed column at the start and the
value directly beside it. Do not push values to the far edge. Rows that link
somewhere put a medium label first, a muted summary beside it, and a chevron at
the end. Use the docs `Rows` component for
requirements, notes, next steps, and category lists instead of bulleted lists or
bordered tables. The API reference uses the same rows, with the prop name at the
start, then its type, description, and default. Parts without props of their
own share one group. Catalog tiles are an inset preview above the name and summary, with no
footer bar or hover card.

Previews, code blocks, row groups, API lists, and catalog tiles use the shared
inset frame: a white frame around a recessed inset in the stage color. Frames
follow the theme's border mode, exactly like cards. With double borders a gutter
surrounds the inset. With single borders the inset is flush with the frame on
every side except the one carrying a tab or toolbar strip, which stays on the
frame. Do not force the gutter on docs previews or code blocks. An example
frame has one toolbar strip on the frame: the playground or example controls at
the start, then Replay when the example can restart, Full screen, and Code. Code
opens the source under the preview inside the same inset, so the preview stays
in view and keeps its state. Long sources start collapsed. Keep previews in the
shared preview implementation and use `data-preview-canvas` for canvas-specific
spacing. Use the soft fill
(`--docs-soft`) only for hover states and Studio slider rows.

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
result rows are compact at 14px text, so the frame reads heavier than its list.
It has page icons, a muted hint at the end of a row only when it adds information, and faded top
and bottom edges. It lists guides, places, and quick actions before a
query, and every component once one is typed.

The Themes page shows each preset as a `.tile` with an 8px inset holding a
specimen in the preset's own colors, type, and corner radius, using its light or
dark palette to match the page. The specimen is rounded 16px (the tile's 24px
minus the inset) with a 10% inner edge in its own ink. The name, brand hex,
description, and three facts sit below it inside the tile, then Apply as a white
lit button and Details as a muted ghost button. The tile itself is not a target,
so it has no press. The search field matches the sidebar's search, and the theme
count uses tabular figures.

Navigation between pages is immediate. The one page transition is between the
landing page and any other page: the old page fades back, the new one rises, and
the brand glides between the landing header and the sidebar. It is off under
reduced motion. Docs-to-docs navigation stays instant; do not add another
transition. Docs sidebar links navigate on mouse press, like a native sidebar; touch,
keyboard, and modified clicks keep their usual behavior. A docs page renders
complete, examples and API reference included, in the same update that shows it,
and starts at the top. Do not defer parts of a page, including catalog previews,
until after it appears or until they near the screen; a reader who scrolls
quickly reaches empty sections and the page shifts as they mount. Reset the
reading pane's scroll in that same update, never after it.

A scroller never ends in a hard cut against another region. Use the shared
`scrollFade` helper with the `fadeY` or `fadeX` mask. The fade grows with the
distance from each end and disappears when the scroller reaches it, so content at
rest is never dimmed. Vertical scrollers that meet a pinned region also get a
`ScrollEdge`, a short masked blur over that edge. This applies to the docs
sidebar above the page meter, the Studio inspector above the export actions, the
page and Studio previews at their top and bottom edges, the navigation sheet,
and overflowing preview controls.
In the shell, the top and bottom edges of the page and the bottom edge of the
sidebar are a short 18px fill to the page color with a light blur instead of a
tall mask, so the fade never reaches far into the text and the sticky catalog
search row is not dimmed. That row gets its own short blurred fade beneath it
while it is pinned, so cards ease out under it. Build these blurs from
`edgeBlurLayers`: stacked backdrop blurs that get shorter and stronger toward the
edge. Do not shape a backdrop blur with a mask inside a rounded clip; Chrome ignores the
mask under a rounded overflow clip and draws a hard line. Never put these blurs on
repeated sticky elements such as sidebar group labels: dozens of sticky backdrop
blurs exhaust Chrome's compositor and parts of the page stop painting. Skip the top fade only in
the docs sidebar, where pinned group labels mark the edge. In docs and Studio, wrap
a ScrollArea in `FadeScrollArea` so its edges fade the same way.

Examples demonstrate a useful state change. Label icon controls, keep result
messages in an explicit layout with a gap, and clean up timers and requests on
unmount. Loading examples finish or offer a state control; failure examples have
a working retry when retry is supported. Keep simulated results local and state
what actually happened. Chart-type guides share the parent component's API;
keep their HTML, Markdown, navigation, and search metadata aligned.

### Shared shell geometry

The docs sidebar is a fixed 16.5rem and the Studio settings panel a fixed
21rem. Neither resizes. The docs article is centered on the window, not on the
space beside the sidebar: a spacer as wide as the sidebar sits on the far side of
the article and gives up its width first when the window is narrow. Sidebar-top and strip controls use the small control height with the
Button's own radius and type.
Separate control groups with a gap, not a divider.

In Studio the preview sits directly on the page color, like the inspector
sidebar, with no header row. Its tools float at the top end of the
preview in one borderless menu, styled like the Copy page cluster (the card
color at 80% with blur, a hairline shadow, and small icon buttons): token picking, Undo,
Redo, and preview options, all icon buttons with tooltips. Preview width and the
glass backdrop switch live in the preview options popover. Below the large
breakpoint the Edit button and the preview picker float at the top start. Each
preview pads its top by 16 spacing units so content clears the floating menu. Do
not add a toolbar row or more always-visible controls.

Studio preview modes are a floating segmented control at the bottom center of
the preview: a ToggleGroup track on the same translucent card color and hairline
shadow as the preview tools, holding text-only items with the selected one
marked. One mode is always selected. Below the medium breakpoint the floating
switch is hidden and the modes become a select in the strip that shrinks before
anything overlaps, the sheet trigger reads Edit, and token picking and preview
options are hidden.

Live chart motion must preserve values and proportions. Animate the area fill,
use a staggered sweep within bar bounds, and brighten pie segments in sequence
without moving their boundaries or center labels. Use low-contrast highlights
with a quiet interval between passes, and suppress live effects during chart
inspection. Observe the stationary chart viewport for visibility, never a moving highlight
that can leave its clip and strand its own animation. Honor reduced motion,
zero-duration themes, hidden documents, and offscreen charts.

Cartesian and pie chart overlay messages use the shared inset Card surface.
Compact Gauge loading and empty states retain the meter footprint without an
additional card wrapper. Keep the placeholder visualization behind the message and preserve live status
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

The Studio settings panel sits on the right of the preview and reads like the
docs sidebar: one calm column on the page color, with no tabs and no boxes
inside boxes. The settings search, styled like the sidebar's search field, and
the preset picker are pinned at the top. The preset picker is a borderless row:
a sticker in the preset's brand mesh, a muted Preset label over the preset
name, and a ghost reset button. Below it come the essentials, one row each:
Brand, Font, Heading font, Corners, Density, Glass surfaces, and Motion. These
are enough to make a convincing theme in under a minute. Keep the list short; do
not add a setting to it without removing one.
Every other setting sits behind one quiet All settings disclosure under the
essentials. Opened, it shows a quiet ghost tab strip (Color, Type, Shape,
Surface, Motion) and one group at a time, so the long list stays navigable. An
essential is not repeated there. A search ignores the tabs and lists matches from
every group. Do not move settings into a dialog, put tabs above the essentials,
or add a second Advanced level. Use toggle buttons for
a choice between two values.

Each group is a small medium-weight title, set like the sidebar's group labels
and aligned with the row labels, above a column of rows. A row is 36px tall and
unfilled, like a sidebar row, with its label in the foreground color at the start
and its control at the end. Values are strong: selects and color triggers are
ghost buttons with a medium-weight value, and a color shows its name or hex before
its swatch. A two-value choice is a pair of text toggles. A numeric setting is a
Slider with `variant="field"`, the one row that keeps a soft bar, because the bar
itself is the control; its value sits at the end in the mono font. Chart colors
and the full list of color tokens each sit behind a further disclosure at the end
of the Color groups. The search reaches every setting. A query that matches a row
shows that row in its group. A query that matches only a group's title or keywords
shows the whole group. While searching, the essentials step aside and the full
list shows the matches, with All settings and every inner disclosure open, and an
empty result offers a Clear search button. A setting that differs from the selected preset
shows a small reset button beside its label, which puts that one setting back. For a token, that removes
the override. Undo and Redo sit in the floating preview tools and answer
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
of the preset it started from. Each preset in the picker shows a swatch of its
brand color. Copy link puts the whole theme in the link's hash, so nothing
is stored on a server. Opening such a link asks before it replaces the current
draft. A theme applied on the Themes page is handed to the Studio, which opens
on it instead of its old draft. The export actions are a quiet strip pinned
under the scrolling groups, like the sidebar's page meter: the number of settings
that differ from the preset in tabular figures, then Copy link and Export theme.

Studio demos are composed cards, not loose controls or section headings. The
Components demo is a masonry of inset cards, each a small realistic task; chart
demos sit in the same cards. The masonry is centered, at most three columns
wide, with a 6-unit gap between cards. Footer actions keep their natural width
at the end of the footer; do not stretch a button across a card. Center a
fixed-size component, such as a calendar, inside its card. Demo cards pass the theme's glass setting to Card's `surface`
prop, so they show what the component itself does.

Setting toggles are one flat segmented track: a hairline input border on the
card fill at the medium control height, with ToggleGroup's own selected fill and
traveling highlight inside. Do not give each option its own border or control
edge. Selects, color triggers, and icon buttons keep their default heights. The
App preview has a single app header holding the workspace menu, its tabs, and
its actions.

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

Toolbar.Root is flat by default: a track in the secondary color with ghost
keys, one traveling hover wash, and the neutral fill on selected keys. Opt
into depth with `variant="depth"`; its Button, Link, and Item inherit the
choice. Depth uses the shared floating elevation for its shell and the
theme-owned `--mielui-toolbar-raised` relief for its keys: a shallow key face, a
directional top edge, a thin dark sidewall, and a short contact shadow. Selected
keys use `--mielui-toolbar-pressed`, which trades the contact shadow for an
inward top shade, and the background fill. Compose focus rings with that
relief. The face gradient follows the edge highlight, and both relief tokens
flatten when control shadows are off, as they are by default. Keep the compact key size and avoid
thick bevels or stacked outlines.

Composer is the one two-layer surface
with its layers the other way round: a recessed frame in the stage color holding
a white writing surface, because a field is always white. Its primary border and
focus ring show only while the textarea has focus. The composer toolbar stays
flat: it joins the input on one surface by default. The input starts compact
and grows with its content. `variant="inset"` puts the input on its own inset
surface and the toolbar on the recessed frame under it. Toolbar controls are
ghost buttons and triggers. Outline ones in either placement render
as flat controls with a hairline border, no control edge, and the small control
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

File and context chips are flat chips at the control radius and the small
control height: a hairline border on the card fill, a 20px leading icon or image
thumbnail, a truncated label, and a compact circular remove button. They carry
no shadow. Put attachment chips in a compact scrolling row above Composer.Root,
inside the same Attachment.Root. Leave a small gap above the frame; keep files
outside the writing surface and action strip. Composer.Header remains available
for optional context inside the form.

Changing numeric readouts use the shared `numberShuffle` action: counts, totals,
percentages, zoom levels, and durations. Apply it to a text-only HTML span with
the same initial text and a formatter that uses its numeric argument. Keep units
inside that formatter when they belong to the value. Editable input values, SVG
axis labels, dates, and static numeric identifiers remain native. Custom snippets
follow this rule too. Do not attach the action to a container containing controls
or to hidden content that an overlay clones.

## Chart palette and inset placement

Chart series use `--chart-1` through `--chart-5` in order, cycling only after the
fifth series. The default palette is pastel purple, pink, blue, green, and
yellow.
Use these tokens in examples, legends, and tooltips; retain explicit series colors
and semantic status tones. Studio edits the active color mode and exports those
values as theme tokens.

The default radius scale is 8/10/14/18px, with 26px plates and 12px controls.
Table cell corners subtract the frame border and inset from its outer radius;
never substitute a smaller fixed radius.
Preview frames clip their toolbar backgrounds to preserve the perimeter.

`--mielui-inset-position: top | bottom` moves exposed inset chrome in DOM order.
The default theme sets it to `bottom`, so footer and toolbar strips sit under
the inset. Components that opt in use the shared internal inset layout action, and override the token on a particular frame when its content
requires a fixed order. Install command tabs and File Diff headers stay on top.
DataTable inset mode frames only the table and its footer. The toolbar floats
above the frame as plain controls with a gap, never inside it. Root lifts the
Toolbar out of the frame the way an inset Card lifts its Footer. The header row
and the footer sit on the frame, and the body rows are the recessed inset.

Isolated viewport previews are flush with their frame border so edge-attached
panels meet the preview edge. Notch outlines trace only the exposed perimeter;
the attached edge stays open without a closing border line.

Glass retains a contrasting translucent inner panel over the outer chrome. Avoid
fully transparent inner surfaces on composers and other inset layouts: they erase
the structural distinction. Keep the shared blur and reduced-transparency fallback.
The composer's default toolbar shares the input's glass fill so the two read as one
surface, and its outline controls stay transparent until hovered or open.
On solid surfaces the default toolbar overlaps the input by one pixel, so no frame
color shows between them under a fractional transform. Glass keeps the two edges
flush, because overlapping translucent fills would draw a line.
The Studio glass backdrop is preview-only and never exported with a theme.

## Landing page showcase

The landing page is the library showing itself: real Mielui components first,
then where to find them, how they compose, and how to start. It reads Mielui's
own theme tokens, so a live Studio theme still restyles it. Every section sits
in one `.wrap` column, 88rem at most. Render the whole page with the first
response; do not lazy-mount or defer any part. Do not bring back the mielwm
site's layout: no left hero over one banner, no alternating 7/5 feature tiles,
no numbers tile or `.sunrise` closing card.

- **Header.** A bare 16-unit row: the brand at the start, then quiet text links
  (Docs, Components, Studio, Themes) with a hover wash, GitHub with its star
  count, the theme toggle, and a small primary Get started. Below the medium
  breakpoint only the brand, Docs, and the toggle remain.
- **Hero.** One centered `.stagger` column: a version pill linking to the
  changelog, a display headline with one `.accent` word, a muted lead that
  states the real component count, then the install command with a Copy
  button beside a primary and a `.glow-plain` button. The component wall is the
  last child and rises in. The reveal runs once per visit.
- **Component wall.** A row of built-in theme dots, the hovered or picked
  theme's name and description, then a `.grain.wall` canvas holding real cards
  (settings, invite, calendar, composer, chart, buttons, progress) in CSS
  columns. Picking a theme scopes that theme's CSS to the wall only, so its
  colors, fonts, corners, and density change there and nowhere else. The
  canvas mesh is mixed from the theme's brand through the registered
  `--wall-tint` color and glides to the new brand. Below the canvas, one link
  opens the picked theme in Theme Studio. Narrow screens hide some cards and
  let the dots scroll sideways.
- **Component index.** A heading with the live count and a catalog link, then
  every catalog group plus Actions as plain hairline rows: sticker, name,
  count, and the first component names. Each row links to its catalog page. Two
  columns on phones (names hidden), four on wide screens. No cards.
- **Composition.** A short copy block beside ghost tabs. Each tab pairs a
  snippet with the same markup rendered live on a mesh stage, so the code and
  the result never disagree.
- **Live demos.** A label, heading, and copy, then ghost tabs for Coding agent,
  Chat, and Issue above one demo surface on a mesh stage. Show one demo at a
  time at a fixed height. Do not stack the demos or add a preset switcher.
- **Close.** A hairline, a centered display line, three numbered install steps
  in columns, and four plain link rows (copy the source, agent skill, Theme
  Studio, GitHub).
- **Footer.** The license, the maker, and Docs, Changelog, and GitHub links.

Use plain labels on every control and say when data is sample data. Never
invent a number, endorsement, or usage count.

Each demo is built from library components, works when clicked, and lives in
`$lib/components/demos` so the Studio's AI tab renders the same files. In the
Studio, the AI and App previews are the same titled cards, stretched to the full
height of the preview pane. Place cards side by side, never stacked. The AI tab
shows the coding agent beside the chat and scrolls sideways when the pane is too
narrow for both. The App preview is one card holding a sidebar app: workspace
switcher, view links and account menu in the sidebar, search and notifications
in the top bar. Below 48rem the sidebar gives way to tabs in the top bar. A demo
transcript opens at its first message and follows new messages only after the
visitor sends one.

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

The default appearance uses single borders, bottom inset strips, solid surfaces,
and no edge highlight, so filled controls are flat. Cards, menus, and controls
have no shadow and are held by their hairline; dialog shadows, which also cover
sheets, remain enabled. Studio has no primary button border setting, because
filled buttons draw their own ring. Explicit theme settings and per-component surface choices override these
defaults.
