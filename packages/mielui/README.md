# @mielui/svelte

Mielui provides composable Svelte components, motion actions, and a shared theme system. Import the package or copy component source into your project with the `mielui` CLI.

Mielui is independently maintained. It originated from Sivir UI and has since developed its own component APIs, interactions, themes, documentation, and release cycle. See [UPSTREAM.md](./UPSTREAM.md) for provenance and credits.

## Requirements

- Svelte 5.56 or newer.
- Tailwind CSS v4.
- SvelteKit is optional.

## Install the package

```sh
pnpm add @mielui/svelte
```

Import the stylesheet once from your application's root CSS:

```css
@import '@mielui/svelte/ui.css';
```

This entry point includes Tailwind, Mielui tokens, and component source scanning. Do not add another `@import 'tailwindcss'` alongside it. Import your application CSS from the root layout or application entry point.

Use named imports for atomic components and namespace imports for compound components:

```svelte
<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Tabs from '@mielui/svelte/components/tabs';
</script>

<Button>Get started</Button>

<Tabs.Root value="overview">
    <Tabs.List aria-label="Project views">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="overview">Project overview</Tabs.Content>
    <Tabs.Content value="activity">Recent activity</Tabs.Content>
</Tabs.Root>
```

The package root also exports components. Per-component imports make each dependency explicit. Read the [component documentation](https://ui.miel.my/docs/components) for the current composition and props.

## Copy component source

```sh
pnpm dlx @mielui/svelte init
pnpm dlx @mielui/svelte add button
```

The CLI installs source and required helpers from the package's bundled registry. Edit the copied files in your own project. See the [installation guide](https://ui.miel.my/docs/installation) for configuration and theming.

## Fonts and themes

The default theme uses Inter and JetBrains Mono. The stylesheet imports their self-hosted font files from the package's runtime dependencies. Override `--font-sans`, `--font-mono`, or `--font-header` and supply the corresponding font files to use another family.

Use [Theme Studio](https://ui.miel.my/studio) to configure colors, typography, density, edges, and motion. Components honor reduced motion and the shared theme settings.

## Agent guidance

```sh
npx skills add mielsense/mielui --skill mielui
```

The skill points coding agents to Mielui's current component docs, examples, and upgrade notes. Sivir examples are not an API reference for this package.

## License and attribution

Mielui is MIT licensed. The package includes [LICENSE](./LICENSE), the retained [COSS notice](./LICENSE-COSS), and [UPSTREAM.md](./UPSTREAM.md). Preserve the applicable copyright and permission notices when copying or redistributing source.

Maintained by [mielsense](https://github.com/mielsense).
