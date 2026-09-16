---
name: mielui
description: Builds and refines Svelte 5 interfaces with mielui using its live llms.txt catalog, version-aware component APIs, installation workflow, AI primitives, and design language. Use when asked to "use Mielui", "build with Mielui", "add a Mielui component", "make this look like Mielui", create an AI chat or coding-agent interface with Mielui, or review existing @mielui/svelte code.
---

# Mielui

Build production Svelte interfaces from Mielui's current APIs and design system instead of guessing from generic component-library patterns.

## Step 1: Establish the Project State

Inspect the project before changing code:

1. Confirm Svelte 5 and Tailwind CSS v4 are present.
2. Read the package manifest, lockfile, global CSS entry, and nearby Svelte components.
3. Detect the integration mode:
   - Package mode: `@mielui/svelte` is a dependency and components import from it.
   - Source-copy mode: `mielui.json` and a local Mielui directory exist.
   - Not installed: neither mode is present.
4. Identify the installed Mielui package version or the component versions recorded in `mielui.json`.
5. Preserve the project's package manager, import style, aliases, theme, and local component conventions.

Do not silently switch an existing project between package and source-copy modes.

## Step 2: Load the Current Mielui Sources

Fetch `https://ui.miel.my/llms.txt` at the start of each Mielui task. Treat it as the index for the current catalog, installation guide, theming guide, changelog, and generated component references.

Load documentation progressively:

| Task | Read from the `llms.txt` index |
| --- | --- |
| First Mielui integration | Introduction, Installation, and Theming |
| Choosing components | Components index, then candidate component pages |
| Implementing a component | That component's Markdown page and every Mielui dependency needed for custom composition |
| AI or coding-agent UI | Candidate AI component pages plus `references/component-selection.md` from this skill |
| Upgrading or resolving an API mismatch | Installed version, the compiled changelog, the LLM changelog page when linked, and component pages |
| Visual design or review | `references/design-language.md` from this skill |

Each generated component page contains its current version, dependencies, install command, prop tables for exported parts, public `index.ts` API, and runnable examples. `/llms-full.txt` combines the full reference; prefer individual pages for focused tasks. Read the exact page before using a component that is new to the project. Never invent a part, prop, event, variant, slot/snippet contract, or import path.

Use this authority order when sources disagree:

1. Local source-copied components define source-copy behavior.
2. The installed package and its declarations define package behavior at the locked version.
3. The live Mielui Markdown defines the latest released API and examples.
4. The rendered documentation is visual context, not a substitute for the typed API.

If the project is behind the live release, adapt to the installed API or ask before upgrading. Do not paste latest-only syntax into an older installation.

If web access is unavailable, inspect local Mielui source or installed declarations. State that the live reference could not be checked rather than guessing.

## Step 3: Model the Interface

State the user's job, the dominant content or action, and the important empty, loading, success, and error states. For substantial pages, compare at least two materially different compositions and choose the one that makes the task clearest.

Read `references/design-language.md` relative to this skill before creating or substantially reshaping an interface. Follow the host application's established visual system when it is more specific than Mielui's defaults.

Choose geometry before components. Mielui is a set of purposeful primitives, not a requirement to wrap every region in a component.

## Step 4: Select and Verify Components

Read `references/component-selection.md` relative to this skill when selecting new primitives or composing an AI interface.

Prefer the highest-level Mielui component that matches the interaction semantics. Use native Svelte and semantic HTML for layout and content where Mielui adds no behavior. Avoid recreating focus management, keyboard navigation, overlays, live regions, loading behavior, or controlled state already supplied by a component.

Before implementation:

1. List the selected component slugs.
2. Fetch each selected component page from the links in `llms.txt`.
3. Confirm exports, required props, bindable state, event signatures, dependencies, and examples.
4. Reject removed components listed in the current components index and follow its migration guidance.
5. Keep compound components in their documented namespace shape, such as `Dialog.Root` and `Dialog.Content`.

Examples are API evidence, not page templates. Adapt their state model and composition to the user's real content.

## Step 5: Install Consistently

When Mielui is absent, choose with the user unless the requested mode is already clear:

| Mode | Choose when |
| --- | --- |
| Package | The project wants dependency-managed updates and imports from `@mielui/svelte`. |
| Source copy | The project wants to own and modify component source. |

Use the project's package manager. Translate the documentation's pnpm examples when needed.

For package mode:

```sh
pnpm add @mielui/svelte
```

Import the token sheet once in the application's global CSS:

```css
@import '@mielui/svelte/ui.css';
```

Ignore the `mielui add` command in a component page when using package mode. That command is only for source-copy projects; package components are already available through the installed dependency.

For source-copy mode:

```sh
pnpm dlx @mielui/svelte init -y
pnpm dlx @mielui/svelte add <component-slug>
```

Import the generated token sheet once and use the aliases recorded in `mielui.json`; do not assume the default path if configuration already exists. Let the CLI resolve transitive Mielui dependencies. Add only components required by the design.

Treat `mielui add` as an operation for missing source, not a safe update command. It skips existing files unless `--overwrite` is passed but can still advance recorded versions in `mielui.json`. Before updating copied components, inspect local modifications and the upstream change, then ask before using `--overwrite` because it replaces owned source.

## Step 6: Implement in Mielui's Language

Use Svelte 5 state and binding patterns that match the project's code. Preserve native semantics and use the component's typed callbacks and bindable props as documented.

Use Mielui semantic tokens and Tailwind utilities before custom values. Let typography, alignment, spacing, and content hierarchy do most of the visual work. Add surfaces, borders, radii, color, and motion only when they communicate grouping, interaction, state, or continuity.

For AI interfaces, compose transcript behavior, message roles, response content, reasoning, tools, questions, progress, attachments, and the composer as separate stateful concerns. Do not make every assistant event look like a chat bubble, and do not animate already-live network chunks merely for decoration.

Implement real states, not only the ideal screenshot:

- Empty content gives a useful next action.
- Loading preserves layout and communicates what is pending.
- Errors explain what failed and how to recover.
- Success confirms the user's action without unnecessary ceremony.
- Long content wraps or scrolls in the correct local region.

## Step 7: Verify the Result

Run the project's normal lightweight formatting and lint checks. Run broader checks only when requested or required by the host repository.

Inspect the rendered interface at desktop and narrow widths, in every supported theme. Exercise keyboard focus, overlays, escape and outside-click behavior, form submission, disabled and pending states, transcript following, and long content where applicable. Check the browser console for runtime and accessibility errors.

Before finishing, confirm:

- Every Mielui API used matches the installed version.
- The stylesheet or local token sheet is imported exactly once.
- The first viewport makes the task and dominant action or content clear.
- Responsive behavior recomposes rather than merely shrinking.
- No decorative container, label, icon, color, or motion can be removed without losing meaning.
- The implementation uses real product content and covers relevant non-happy states.

Report the Mielui components added, integration mode, verification performed, and any version or documentation limitation.

## Current composition contracts

The catalog separates Components, Blocks, AI components, Chart components, and Actions. Public component imports remain under `@mielui/svelte/components/<slug>` even when source folders use another category. Gauge and Heatmap are charts; Morph is imported from `@mielui/svelte/actions/morph`.

Use Dialog instead of Modal, Kbd instead of Shortcut, and HugeiconsIcon with Hugeicons glyph data. Group connects real Button, Input, and trigger components; include Group.Separator between controls. Tag Input uses outline badges.

Toast is composable through Root, Content, Footer, Title, Icon, Actions, Action, and Close. The description occupies the upper inset and the compact title/actions row sits below. The toast helpers render these same parts. Overlay surfaces accept `surface="solid" | "glass"` on the documented owning part; do not apply glass independently to nested surfaces.

Heatmap.Root accepts `animation="rows" | "columns" | "none"`, defaulting to rows. Reduced motion disables entrances. Slider range mode binds a pair of numbers, accepts thumbLabels, and supports dir="rtl". Read each page before using these APIs, particularly when the locked package predates the unreleased changelog.

## Tables, native selects, and loading placeholders

Compose Table.Root with Header, Body, Row, Head, and Cell. Caption, Footer, and ScrollArea are optional. Use variant="inset" for a recessed table. Sorting and selection remain application state; use native aria-sort and existing Button or Checkbox controls.

NativeSelect.Root renders a native select. Bind a string for single selection or a string array with multiple. Its size prop is the native number of visible options. Compose Option and OptGroup inside it.

Apply use:shimmer from @mielui/svelte/actions/shimmer to a loading container, or set variant="shimmer" on Skeleton. Shimmer takes no options and disables itself for reduced motion. Label the loading region; the visual highlight is hidden from assistive technology.
