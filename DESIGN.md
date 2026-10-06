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
- Checked checkboxes use the centered dash indicator. Preserve the native checked
  state and boolean API; the dash is the selected appearance.
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
  edge; its inset appears only along exposed edges. Drawer is not attached. It
  floats a two-spacing-unit gap from its edge with all corners rounded.
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

Composite fields with focusable parts inside them, such as TagInput tags and
NumberField steppers, show the field ring only while the text input has focus
(`has-[input:focus-visible]`). A focused part shows its own ring; never both.
Dialog panels carry `data-dialog-panel`; shared overlay styles and stacking key
on that attribute, because wrappers may replace `data-ui`. Viewport-level hosts
that must stay usable above a modal, such as the Toaster, carry
`data-overlay-root`.

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

`chrome.borders` accepts `double` or `single` and defaults to `single`. It applies
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
Studio presents it as a percentage under Edges. Scale only the light inset edge;
keep structural borders, focus rings, dark inset shading, and cast shadows intact.
Do not add fixed white inset shadows to individual components. Shadow switches
still disable their corresponding elevation effects.

## Documentation composition

Docs and Studio share one app shell. At large widths a warm near-black frame
(`--docs-shell`, pure black in dark mode) holds an icon rail, one rounded panel,
and a slim status line under it.

The rail is 16 spacing units wide. It starts with the brand mark in white on a
primary rounded tile, then the Documentation, Components, Theme Studio, Themes,
and Changelog links, a short rule, and search, GitHub, and the theme toggle. Rail
items are icon buttons with tooltips that open to the right; the current section
has a flat translucent white fill. Do not add glows or blurs to rail items. Rail
colors are fixed light-on-dark in both themes. Use Hugeicons throughout the shell.

Hairlines split the panel, not gaps. The sidebar has a title row with the
workspace switcher and a hide button. The switcher shows the title and chevrons
and opens a menu of Documentation, Theme Studio, and Themes. The content column
has a top bar of the same height. The sidebar can be hidden and shown again from the top bar or
with Cmd/Ctrl+B, and the choice persists. In light mode the sidebar uses the page
background and the content column the card color; in dark mode both share one
surface that contrasts with the frame. Only docs pages with navigation show the
sidebar. Themes and Changelog use the full panel.

Docs navigation starts with icon rows for search and the guides, then one group
per component type. Rows are 8 spacing units tall with medium text; the current
page uses the pill fill (`--docs-pill`). Group labels are muted, stay pinned to
the top of the sidebar while their group scrolls, and turn semibold foreground
while pinned. A pinned label has an opaque background, so no row shows behind
it, and a short blurred fade directly beneath it. A small dot marks pages that
are open in another tab. A card pinned at the bottom shows the current page's
position in the docs with a segmented meter; it has no icon.

The docs top bar is a tab strip. The add button opens the component catalog in a
new tab; following a link changes the current tab, or switches to the tab that
already shows that page. Tabs are fixed-width pills with a page icon, a label,
and a close button on hover; they persist in local storage and scroll sideways
when they overflow. Copy page sits at the end of the bar. Pages without tabs
show one static pill with their name. Studio uses the same pills for its preview
modes.

The status line is flat text on the frame, 9 spacing units tall, with no pills
or fills: the package version linking to the changelog, the component count, the
install command for the current component, and previous and next links at the
end. Clicking the command copies it. Put only real, current information there.

Below large widths the frame, rail, and status line disappear, the panel fills
the screen, the tab strip collapses to the current page name, and the sidebar
opens as a Sheet.

The shell is fixed to the viewport. Only the sidebar and the content column
scroll, never the document. Links and link buttons inside previews never
navigate; the shared preview cancels them.

Each page opens with a breadcrumb of its parents when it has more than one
level, then a visible title and its summary as muted lead text. `PageIntro` owns
this header. Copy page sits in the top bar. Do not hide the title or summary
behind a hover card.

The content column fills the panel. Previews, code, catalog grids, and API rows
use the full width. Prose and short row groups stop near 76 characters. The page outline sits at the far
right at extra-large widths as plain text links; the current heading uses medium
foreground text. Section headings are ordinary headings that scroll with the
page. Do not make them sticky, inverted, or pill shaped. Sections are separated by
3rem and their content by 1rem; the shared layout owns these distances. Previous
and next links close the article as labelled ghost Buttons above a hairline rule.

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
the theme's border mode. With single borders they show one hairline and no
gutter, and only frames that carry a tab or toolbar strip keep their chrome. The leading
preview keeps its ghost Preview and Code tabs in the frame chrome with the source
inside the same frame, and example state is preserved when switching to code.
Keep both preview forms in the shared preview implementation and use
`data-preview-canvas` for canvas-specific spacing. Use the soft fill
(`--docs-soft`) only for hover states and Studio inspector groups.

Isolated Notch previews invert the panel against the canvas so it stays visible
in both themes.

The API reference shows each prop's type without a trailing `| undefined`;
optional is the default and required props are labelled. Descriptions render
inline code.

Search opens as a compact palette about 34rem wide with 15px rows, page icons,
a muted hint at the end of a row only when it adds information, and faded top
and bottom edges. It lists open tabs, guides, places, and quick actions before a
query, and every component once one is typed.

The Themes page shows each preset as a specimen in its own colors, type, and
corner radius, using the preset's light or dark palette to match the page, with
the name, description, and three facts underneath.

Navigation between pages is immediate. Do not add page transitions or scroll
snapping to the docs shell.

A scroller never ends in a hard cut against another region. Use the shared
`scrollFade` helper with the `fadeY` or `fadeX` mask. The fade grows with the
distance from each end and disappears when the scroller reaches it, so content at
rest is never dimmed. Vertical scrollers that meet a pinned region also get a
`ScrollEdge`, a short masked blur over that edge. This applies to the docs
sidebar above the page meter, the Studio inspector under its title and above the
export actions, the content column and Studio previews at the bottom of the
panel, the navigation sheet, the page outline, the tab strip, and overflowing
preview controls. Skip the top fade where a hairline bar or pinned group labels
already mark the edge. Wrap a ScrollArea in `FadeScrollArea` instead of enabling
its chevron cues.

Examples demonstrate a useful state change. Label icon controls, keep result
messages in an explicit layout with a gap, and clean up timers and requests on
unmount. Loading examples finish or offer a state control; failure examples have
a working retry when retry is supported. Keep simulated results local and state
what actually happened. Chart-type guides share the parent component's API;
keep their HTML, Markdown, navigation, and search metadata aligned.

### Shared shell geometry

The docs sidebar is 18.5rem wide and the Studio sidebar 21rem. The sidebar title
row and the top bar are both 50px tall. Top bar controls use the small control
height with the Button's own radius and type; outline is reserved for the Copy
page group. Separate control groups with a gap, not a divider.

Studio preview modes sit at the start of the top bar as the same pills the docs
tabs use. The glass backdrop switch and preview width sit at its end. Do not add
another toolbar row. Use the shared ghost tabs for preview width and in setup
dialogs.

Section and outline headings use semibold or medium weight with the configured
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

Studio groups settings as Theme, Color, Surfaces, Edges, Shadows, Shape and
spacing, Interaction, Typography, and Font weights. Use toggle buttons for setting
values; reserve tabs for switching preview content. Keep movement and cursor
behavior under Interaction.

Each group is a medium-weight title above one soft rounded group of rows. A row
has a muted label at the start and its control at the end. Selects, color triggers, and
segmented tracks share one fixed control width so their edges align; switches and
readouts sit at the end of the row. A slider sits on its own line under the row
that names it. Groups are always open; only long optional sets, such as text and
chart colors, use a disclosure inside their group. The export actions stay pinned
under the scrolling groups. The preview fills the content column under the top bar.

Studio demos are composed cards, not loose controls or section headings. The
Components demo is a masonry of inset cards, each a small realistic task; chart
demos sit in the same cards. Center a fixed-size component, such as a calendar,
inside its card. With glass surfaces on, demo cards become a frosted frame with
a visible gutter around a solid inner surface, in either border mode. The
backdrop shows through the frame, never through the content.

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
DataTable inset mode
keeps its toolbar above the table and summary/pagination below, independently of
the global preference. Single borders still remove decorative frame spacing on cards and ordinary overlays.
Inset data tables, composers, toasts, code blocks, and docs preview panels keep a narrow
structural gutter around their inner content in both border modes.
Isolated viewport previews are flush with their frame border so edge-attached
panels meet the preview edge. Notch outlines trace only the exposed perimeter;
the attached edge stays open without a closing border line.

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

Below the hero, the page continues on the page background with a few sections.
Each has a heading and one-line summary at the start and an install command, code
block, or row group beside it. Cap the hero height on tall screens so the first
section is visible. Do not add card grids, testimonials, or decoration there.

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

Size each scrolling region in docs and Studio from the remaining workspace height,
not directly from viewport height.

Documentation error pages use a single centered recovery message in the reading
column. Keep navigation available, show the status beside the message, and omit
pagination until content loads successfully.

Menu rows and their traveling highlight share a corner radius capped at `--radius-md` and bounded by the panel radius minus its border and row inset. Short rows must not become pill-shaped inside the larger menu frame.

The default appearance uses single borders, bottom inset strips, glass surfaces,
half-strength edge highlights, and a primary button border. Cards and menus have
no surface shadows; control and dialog shadows remain enabled. Explicit theme
settings and per-component surface choices override these defaults. The default
chart palette places pink in Chart 2 and blue in Chart 3.
