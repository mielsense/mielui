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
inventing isolated values.

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

The interface should normally feel like one continuous canvas. Add a surface,
border, radius, or shadow only when it communicates grouping, interaction,
selection, or state more clearly than spacing can. Default to stillness; add
motion only to explain a state change, preserve continuity, or confirm an
action.

## Reject Generated-Design Reflexes

Do not ship:

- All-caps or widely tracked eyebrows, kickers, and overlines.
- Decorative gradients, glows, blobs, textures, glass effects, or ornamental
  shadows.
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


## Required shared appearance and interaction contracts

These rules apply to every component and every docs or Studio example. Reuse the
existing implementation before adding local styling. A new component must follow
the same contracts; a visual exception must have a specific functional reason.

### Edges and surfaces

- Filled buttons use `--elevation-control-edge` for the subtle top highlight and
  lower inset shading: primary, secondary, outline, and destructive. Moving thumbs
  keep it too. Text fields, selection triggers, checkboxes, and radios are flat:
  one hairline border and no inset shading. Keep ghost, quiet, and plain text
  controls flat until their existing hover or selected state calls for a fill.
- Unchecked checkboxes and radios use `--mielui-control-border` so their edge
  stays visible in both themes. Do not use `--color-border` for control edges.
- Status text uses `--mielui-success-text`, `--mielui-warning-text`,
  `--mielui-error-text`, and `--mielui-info-text`. They mix the status color with
  the foreground to reach 4.5:1 on soft tints and cards. Keep the raw status
  colors for fills, icons inside fills, and chart tones.
- Preserve the primary button's optional `--color-primary-stroke`. The light edge
  does not enable a perimeter border when Studio's primary stroke is disabled.
- Floating panels use `--elevation-float`; dialogs use `--elevation-modal`; raised
  cards use `--elevation-1`. These tokens include the shared surface highlight.
  Do not add a separate hardcoded white border or shadow to reproduce it.
- Use the shared `mielui-modal-frame` or `mielui-inset-frame` and
  `mielui-inset-surface` composition for double edges. Keep inner corners concentric
  with the outer frame. A frame attached to a viewport edge stays flush on that
  edge; its inset appears only along exposed edges.
- Glass uses the shared surface helper and inherited theme setting. Keep the
  inner panel translucent enough to reveal the backdrop. Explicit solid surfaces
  remain opaque, including chart tooltips.
- Compose focus rings with the existing edge or elevation instead of replacing
  it. Disabling shadows must remove decorative relief while preserving borders,
  validation states, and visible keyboard focus.
- Joined controls have one seam and flat adjoining corners. Use Group and its
  Separator; do not layer separate rounded borders through the shared seam.
- Read colors from semantic `--color-*` tokens. Use `--border-size` for frame
  thickness. Light, dark, and scoped Studio themes must share the same geometry.

Moving controls put the raised control edge on the thumb, not the track or fill.
Passive tracks, progress fills, metadata, and grouping wrappers stay flat. Composite
text fields use one edge around their editable boundary. Focus rings add to that
edge rather than replacing it.

### Control geometry

Controls use three heights: `--size-control-sm`, `--size-control-md`, and
`--size-control-lg`, each minus `--size-hairline` for buttons. Icon buttons use
`--size-icon-md`, which equals a medium button. Do not size controls with raw
`h-7`, `h-8`, `size-9`, or `h-10`. Keyboard focus uses `--focus-ring`, a 2px ring
at 80% of the primary color, composed with any existing edge.

### Micro-interactions

- Buttons and clickable controls reuse the shared pressable behavior and variant
  styles. Disabled and pending controls retain their existing interaction rules;
  decorative feedback must not re-enable them or change layout dimensions.
- Hover, press, selection, panel, and sheet motion use the corresponding theme
  duration and easing tokens. Do not copy one fixed duration across every action.
- Collection selection uses the existing traveling highlight. Overlay wrappers
  retain the shared transition and focus-management helpers. Do not add another
  animation or dismissal controller around an existing primitive.
- Size changes and interruptible entry or exit use the established Humanspeak
  motion implementation. Continue from the current rendered state when reversed.
  Avoid restarting a reveal from zero when data changes during an animation.
- Honor reduced motion and zero-duration theme settings, including preference
  changes after mount. Cancel animation frames, observers, and timers on teardown.
  Continuous chart effects pause offscreen and in hidden documents; they never
  alter values or make a static dataset appear to change.
- Keep interaction feedback local. A documentation example must not cover the
  surrounding page with a viewport-bound activity or notification. Use the shared
  isolated preview for Notch and other global overlays.

### Review requirements

Before calling a component visually complete, inspect its ordinary, hovered,
focused, pressed, disabled, invalid, and open states where applicable. Check
light and dark themes, shadows disabled, reduced motion, narrow layouts, and
joined-control seams. Use the repository's verification policy for automated
checks. Record new shared contracts here and explain consumer-facing changes in
the changelog; do not leave the next agent to infer them from one example.

## Borders

`chrome.borders` accepts `double` or `single` and defaults to `double`. It applies
to inset layouts: dialogs, sheets, drawers, toasts, Notch, code blocks, diffs,
inset tables, inset and panel cards, alerts, and composers. Menus, selects,
comboboxes, popovers, hover cards, date-picker panels, and chart tooltips are
always single: set `[--mielui-border-inset-scale:0]` on their frame so a small
floating panel never shows stacked borders.

Shared frames scale their decorative inset with `--mielui-border-inset-scale`.
Panel cards also scale their inner ring. Notch retains its outer SVG outline,
hides the inner outline, and fills the outer clip when the scale is zero.
Single uses zero; double uses one. Keep the outer border and concentric inner
radius in both styles. Preserve content padding, footer composition, inset
variants, and viewport-attached geometry. Existing single-border surfaces do
not gain an extra border. Glass, elevation, focus, and edge highlights remain
independent. New double-frame treatments must honor this shared setting.

## Edge highlight strength

Use the shared elevation tokens for light-catching inset edges, including keycaps.
The theme setting `chrome.edgeHighlight` accepts 0 to 1 and defaults to 0.5.
Studio presents it as a percentage under Appearance. Scale only the light inset edge;
keep structural borders, focus rings, dark inset shading, and cast shadows intact.
Do not add fixed white inset shadows to individual components. Shadow switches
still disable their corresponding elevation effects.

## Documentation composition

Docs and Studio use a pure black outer background around the
workspace. In docs, page controls belong inside the rounded page frame: breadcrumb
and actions above the content, pagination and copy controls below it. Keep the
outer top and bottom gutters compact. Navigation and Studio inspectors open as
nonmodal frosted panels on left-edge hover or from the toolbar. Sidebars start pinned unless a saved preference unpins them. Pinning keeps
the panel visible and reserves its width plus a narrow gutter on desktop.
Docked panels use the page surface color; floating panels use glass.
Use the shared Popover glass, focus, and motion behavior without a scrim or
scroll lock. Keep the navigation layout open and free of an inner inset.
The page outline stays in the right column. The section rail uses a solid hook.

Page names remain in the breadcrumb and an accessible heading. Put the page
summary behind the footer's information HoverCard. Copy page and previous/next
navigation belong in the same fixed footer; their menus open upward and align
inward with a viewport gutter.

Section title rows stick below the header. Use compact opposite-tone pill labels with a small sticky offset instead of full-width
section bars. Keep the page header and footer on the reading surface without
extra header dividers. Use a short, pointer-transparent fade into the page surface at the scrolling edges beneath the header and above the footer. The footer is flush with the frame without a top rule; do not wrap it in another floating card. Content starts and ends 1.5rem from its section
boundaries; paragraph gaps stay at 1rem. The shared layout owns these distances. Keep body sections on one background rather than
alternating arbitrary fills. Use modest responsive side gutters. Docs paragraphs use the section width; split
long explanations into short paragraphs by topic rather than narrow text columns.

The page-outline heading aligns with the leading preview toolbar. Sidebar groups
use whitespace and ordinary labels rather than sticky row chrome. Sidebar rows are ghost Buttons at the small control height with muted text that aligns with the group label and panel title. Selected navigation links use a rounded primary-tinted fill and semibold foreground text so selection is visible beyond text color. Studio inspector sections use spaced rounded disclosure rows with a quiet fill, without separators. The leading preview toolbar shares that row height and
sticks until the next section; inset example toolbars stay compact without an
extra divider. Documentation section title badges use the shared raised-key
edge and contact shadow (`--mielui-toolbar-raised`), honoring control-shadow and
edge-highlight settings. Put optional section explanations behind a labelled info control.

The leading page preview uses the shared inset frame with its ghost-tab toolbar
and card-backed canvas. Its source remains inside the same frame, on the same
card surface as the canvas, so switching tabs never drops the inset. Examples
inside a section use the shared inset preview card, with the toolbar and preview
surface contained together. Do not stretch nested card headers across the page.
Keep both forms in the shared preview implementation and preserve example state
when switching to code. Give the leading preview room; size supporting examples
to their content. Use `data-preview-canvas` for canvas-specific spacing.

The header, footer, reading surface, and docked inspectors share `--docs-content`.
Local preview and code toolbars use `--docs-chrome`, with `bg-card` for their inner
canvas and selected tabs. In dark mode the card sits below the toolbar, so selected
toolbar tabs use `bg-secondary` to stay lighter than their track. Every tab, icon
button, and example control in these toolbars uses `--size-control-sm`; controls that
do not fit scroll within the toolbar instead of wrapping onto the canvas. Install
command tabs, package-manager tabs, and the manual-install file picker use the same
small height. Section pills use foreground/background tokens for
contrast. In dark mode the reading surface is charcoal, not pure black. Preview
controls stay in a local stacking context below sticky section headings.

Examples demonstrate a useful state change. Label icon controls, keep result
messages in an explicit layout with a gap, and clean up timers and requests on
unmount. Loading examples finish or offer a state control; failure examples have
a working retry when retry is supported. Keep simulated results local and state
what actually happened. Chart-type guides share the parent component's API;
keep their HTML, Markdown, navigation, and search metadata aligned.

### Shared shell geometry

The header, footer, On this page heading, and leading preview toolbar share
`--docs-row-height`. Center labels and controls vertically. Header children use
the token minus the frame border. Section pills and nested preview toolbars
remain compact; sidebar group labels use normal content spacing.

Align header and footer controls with the inset panels and their shared gutters.
Keep sidebar and content edges aligned after density changes.
Every header, footer, and inspector title-row control uses the medium control
height: ghost Buttons for icon and text actions, outline only for the search
trigger and the Copy page group. Use 16px icons and the Button's own radius and
type; do not override heights, borders, or font sizes. Separate control groups
with a gap, not a divider. Docs footer columns match the reading and outline
columns, so Copy page ends on the content edge and the page information aligns
with the On this page heading. The inspector title row matches the header row.
Studio uses the same 80-spacing-unit inspector width as the documentation sidebar.

Studio preview tabs belong in the main header. Preview width controls sit at the
left of the footer's center column. Do not add another toolbar row for either.
Use the shared ghost tabs throughout Studio, including preview and setup dialogs.

Section and rail headings use semibold weight with the configured header font.
Keep body labels and tabs lighter so section titles remain distinct.

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

Documentation content, its toolbar and footer share a horizontal inset halfway
between five theme spacing units and 2rem (`--docs-gutter`). Rail headings retain
five spacing units. Keep preview tabs and article headings aligned to the content
gutter. Edge ghost icon buttons use `--docs-icon-inset` so their glyph, not
their hover fill, lines up with that gutter.

Studio separates Appearance, Shape & spacing, Interaction, and Typography. Use
toggle buttons for setting values; reserve tabs for switching preview content.
Group surface framing, edge highlights, and shadows within Appearance. Keep
movement and cursor behavior under Interaction.

Setting toggles are one flat segmented track: a hairline input border on the
card fill at the medium control height, with ToggleGroup's own selected fill and
traveling highlight inside. Do not give each option its own border or control
edge. Inspector field labels use Typography.Metadata; subgroups inside a section
use a Metadata heading and spacing, not rules. Selects, color triggers, and icon
buttons keep their default heights. Inside the preview, Components, Charts, and
AI components use the docs section pills rather than full-width chrome bars; the
App preview has a single app header holding the workspace menu, its tabs, and
its actions.

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
compose focus rings with that relief. The composer toolbar stays flat: it sits
on the frame below the input by default. The input starts compact and grows with
its content. Opt into a joined input and toolbar with `variant="inset"`. Outline
buttons and triggers in either placement render
as flat pills with a hairline border, no control edge, and the medium control
height. Use `variant="outline"` for its controls rather than borderless ghosts.

Tooltips keep their dedicated tooltip background and foreground pair in every
surface mode, so their polarity never flips when glass is enabled. Glass makes
that fill slightly translucent with the shared blur; it never uses the overlay
glass fill, which disappears against dark pages. Every tooltip keeps a hairline
foreground edge under its floating elevation.

File and context chips are flat pills at the small control height: a hairline
border on the card fill, a 20px leading icon or image thumbnail, a truncated
label, and a compact circular remove button. They carry no shadow. Put chips in
Composer.Header, inside the frame chrome above the input, instead of adding a
separate row outside the composer. Toolbar
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
requires a fixed order. Install command tabs stay on top. DataTable inset mode
keeps its toolbar above the table and summary/pagination below, independently of
the global preference. Single borders still remove decorative frame spacing on cards and ordinary overlays.
Inset data tables, composers, code blocks, and docs preview panels keep a narrow
structural gutter around their inner content in both border modes.

Glass retains a contrasting translucent inner panel over the outer chrome. Avoid
fully transparent inner surfaces on composers and other inset layouts: they erase
the structural distinction. Keep the shared blur and reduced-transparency fallback.
The composer's inset toolbar shares the input's glass fill so the two read as one
surface, and its outline pills stay transparent until hovered or open.
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

Preserve the original restrained hero gradient and lighter featured showcase. The featured preview uses the shared `mielui-inset-frame` with
its ghost tabs in the frame chrome and the demo on `mielui-inset-surface`. Keep the featured preview’s scoped light palette in both page themes. Composer
actions sit on the frame below the input unless a demo explicitly opts into the
joined inset toolbar.

Component catalog previews render real components in a decorative, inert and
`aria-hidden` region marked `data-component-preview`, which keeps their headings
out of the page outline. Popups that cannot render inline, such as menus,
dialogs, and tooltips, are drawn with the shared frame, menu-item, and elevation
classes instead of invented shapes. Each card has one stretched link on its name.
Do not nest the preview inside that link, because the preview contains buttons
and links.

The documentation shell uses a pure black outer canvas with compact side
gutters. Navigation and Studio inspectors belong to the outer
surface. Docs page header and footer belong inside the page frame. Size each
scrolling region from the remaining workspace height, not directly from viewport
height.

Page navigation uses a brief 240ms pixel reveal using large, scattered square tiles between browser view snapshots. Keep the old page visible beneath the incoming tiles so navigation never flashes a blank surface. Skip the effect for reduced motion, same-page anchors, and preview routes; new navigation interrupts an active transition.

Documentation error pages use a single centered recovery message inside the shared page frame. Keep navigation available, show the status beside the message, and omit page copying, pagination, table of contents, and empty column rules until content loads successfully.

Menu rows and their traveling highlight share a corner radius capped at `--radius-md` and bounded by the panel radius minus its border and row inset. Short rows must not become pill-shaped inside the larger menu frame.
