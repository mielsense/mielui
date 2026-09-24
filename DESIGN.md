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

- Filled controls use `--elevation-control-edge` for the subtle top highlight and
  lower inset shading. This includes primary, secondary, outline, and destructive
  buttons, text fields, and selection triggers. Keep ghost, quiet, and plain text
  controls flat until their existing hover or selected state calls for a fill.
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
to every shared double frame: cards, menus, popovers, dialogs, sheets, toasts,
Notch, code blocks, diffs, inset tables, composers, and chart tooltips.

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

Docs and Studio use a quiet background with a subtle primary tint around the
workspace. In docs, page controls belong inside the rounded page frame: breadcrumb
and actions above the content, pagination and copy controls below it. Keep the
outer top and bottom gutters compact. The navigation rail remains outside. Keep
both documentation side rails equal in width, with three spacing units between
them and the recessed content. Do not box the rails into separate cards or extend
content dividers through the surrounding shell. The section rail uses a solid hook.

Page names remain in the breadcrumb and an accessible heading. Put the page
summary behind the footer's information HoverCard. Copy page and previous/next
navigation belong in the same fixed footer; their menus open upward and align
inward with a viewport gutter.

Section title rows stick below the header. Every row uses the same label size,
weight, padding, and opaque, subtly contrasting background. A title-row divider
must span the reading column. Content starts and ends 1.5rem from its section
boundaries; paragraph gaps stay at 1rem. The shared layout owns these distances. Keep body sections on one background rather than
alternating arbitrary fills. Use modest responsive side gutters. Docs paragraphs use the section width; split
long explanations into short paragraphs by topic rather than narrow text columns.

Sidebar group headings and the page-outline heading use the same sticky row height
as section titles. Sidebar groups have full-width boundary rules and a subtle
primary-colored selected text. The leading preview toolbar shares that row height and
sticks until the next section; inset example toolbars stay compact without an
extra divider. Put optional section explanations behind a labelled info control.

The leading page preview uses a full-width ghost-tab toolbar and an open canvas.
Its source occupies the same square section, without a rounded frame. Examples
inside a section use the shared inset preview card, with the toolbar and preview
surface contained together. Do not stretch nested card headers across the page.
Keep both forms in the shared preview implementation and preserve example state
when switching to code. Give the leading preview room; size supporting examples
to their content. Use `data-preview-canvas` for canvas-specific spacing.

The shell has two opaque tones: `--docs-chrome` for the header, footer, side rails,
and section headings; `--docs-content` for the reading and preview canvas. In dark
mode the content is a slightly darker charcoal, not pure black. Preview controls
stay in a local stacking context below sticky section headings.

Examples demonstrate a useful state change. Label icon controls, keep result
messages in an explicit layout with a gap, and clean up timers and requests on
unmount. Loading examples finish or offer a state control; failure examples have
a working retry when retry is supported. Keep simulated results local and state
what actually happened. Chart-type guides share the parent component's API;
keep their HTML, Markdown, navigation, and search metadata aligned.

### Shared shell geometry

The header, footer, article section headings, sidebar group headings, On this
page heading, and leading preview toolbar share `--docs-row-height`. This token
includes the row border. Center labels and controls vertically; do not recreate
row heights with independent padding or local pixel values. Header children use
the token minus their parent border. Nested preview cards keep compact toolbars.

Align header and footer controls with the inset panels and their shared gutters.
Keep sidebar and content edges aligned after density changes.
Studio uses the same 18rem inspector column as the documentation sidebar.

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
announcements. Chart tooltips share the same theme-controlled inset surface in every chart
family. Honor single borders by retaining the frame's scaled padding, without a
fixed padding override or an extra inner border. Inherit the shared glass helper;
do not force an opaque inner surface or use a native browser title tooltip.

Documentation content, its toolbar and footer share a horizontal inset halfway
between five theme spacing units and 2rem. Rail headings retain five spacing
units. Keep preview tabs and article headings aligned to the content gutter.

Studio separates Appearance, Shape & spacing, Interaction, and Typography. Use
toggle buttons for setting values; reserve tabs for switching preview content.
Group surface framing, edge highlights, and shadows within Appearance. Keep
movement and cursor behavior under Interaction.

Menu separators span the full inner panel width, including submenus. Cancel the
shared item padding at the separator rather than removing padding from menu items.
Keep separators square at the panel edges.

Toolbar.Root is flat by default. Opt into depth with `variant="depth"`; its
Button, Link, and Item inherit the choice. Toolbar depth uses the shared floating elevation for its shell and theme-owned
`--mielui-toolbar-raised` relief for its keys. Selected tools use
`--mielui-toolbar-pressed` and the background fill;
compose focus rings with that relief. Keep the callable composer toolbar flat.

Glass tooltips pair the shared glass surface with the theme foreground; solid
tooltips retain their dedicated tooltip background and foreground pair. Toolbar
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

The documentation shell uses a subtly primary-tinted outer canvas with compact side
gutters. Navigation and Studio inspectors belong to the outer
surface. Docs page header and footer belong inside the page frame. Size each
scrolling region from the remaining workspace height, not directly from viewport
height.
