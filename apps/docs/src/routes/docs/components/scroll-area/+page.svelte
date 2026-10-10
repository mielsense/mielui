<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Blur from './examples/blur.svelte';
    import BlurSrc from './examples/blur.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Horizontal from './examples/horizontal.svelte';
    import HorizontalSrc from './examples/horizontal.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const TITLE = 'Scroll Area';

    const installCommand = 'pnpm dlx @mielui/svelte add scroll-area';

    const playgroundSurface = 'rounded-[var(--radius-xl)] border border-border bg-card';
    const playgroundChats = [
        'Svelte 5 runes migration',
        'Designing the studio preset',
        'Tailwind v4 token setup',
        'Pagination active state',
        'Figma plugin ideas',
        'Vercel deploy hook',
        'Refactor command palette',
        'Hover card focus order',
        'Toast queue logic',
        'Color picker math',
        'Button loading states',
        'Dialog scroll behavior'
    ];
    const playgroundSections = [
        'Overview',
        'Activity',
        'Members',
        'Billing',
        'Integrations',
        'Webhooks',
        'Security',
        'Audit log'
    ];
    const playgroundLines = [
        '09:00:02 Cloning github.com/acme/storefront at commit 4d11ba0',
        '09:00:04 Restored build cache from the previous deployment',
        '09:00:09 Installing dependencies with pnpm install --frozen-lockfile',
        '09:00:21 Running pnpm run build in apps/storefront',
        '09:00:38 Compiled 214 modules for the client bundle',
        '09:00:44 Compiled 96 modules for the server bundle',
        '09:00:47 Prerendered 38 static routes',
        '09:00:52 Uploading build output to the edge network',
        '09:00:58 Assigned the production domain storefront.acme.com',
        '09:01:01 Deployment completed in 59 seconds',
        '09:01:03 Health check passed in 3 regions',
        '09:01:04 Notified the #deploys channel'
    ];
</script>

<svelte:head>
    <title>Mielui · Scroll Area</title>
    <meta
        name="description"
        content="A scroll container with themed scrollbars and optional overflow cues."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title={TITLE}>
        A scroll container with a theme-styled scrollbar. Supports vertical and horizontal
        orientation.
    </PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#if values.orientation === 'horizontal'}
                    <ScrollArea
                        orientation="horizontal"
                        showCues={values.showCues}
                        blur={values.blur}
                        tabindex={0}
                        role="region"
                        aria-label="Project sections"
                        class="w-72 p-1.5 {playgroundSurface}"
                    >
                        <div class="flex gap-2">
                            {#each playgroundSections as section (section)}
                                <span
                                    class="rounded-[var(--radius-control)] bg-secondary px-3 py-1 text-sm whitespace-nowrap"
                                >
                                    {section}
                                </span>
                            {/each}
                        </div>
                    </ScrollArea>
                {:else if values.orientation === 'both'}
                    <ScrollArea
                        orientation="both"
                        showCues={values.showCues}
                        blur={values.blur}
                        tabindex={0}
                        role="region"
                        aria-label="Deploy log"
                        class="h-56 w-72 {playgroundSurface}"
                    >
                        <div
                            class="flex w-max flex-col gap-1.5 p-3 font-mono text-xs whitespace-nowrap text-foreground-muted"
                        >
                            {#each playgroundLines as line (line)}
                                <span>{line}</span>
                            {/each}
                        </div>
                    </ScrollArea>
                {:else}
                    <ScrollArea
                        showCues={values.showCues}
                        blur={values.blur}
                        tabindex={0}
                        role="region"
                        aria-label="Recent chats"
                        class="h-56 w-64 {playgroundSurface}"
                    >
                        <ul class="m-0 flex list-none flex-col p-2">
                            {#each playgroundChats as chat (chat)}
                                <li class="truncate px-3 py-2 text-sm text-foreground-muted">
                                    {chat}
                                </li>
                            {/each}
                        </ul>
                    </ScrollArea>
                {/if}
            {/snippet}
        </Playground>
    </section>

    <!-- ─── Installation ──────────────────────────────────────────── -->
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Edge cues update when content is inserted, removed, or resized. Their fade follows the
            shared hover duration and reduced-motion preference. The class prop styles the shell;
            native attributes and element target the scroll viewport.
        </Typography.Text>
        <Typography.Text>
            The viewport is not a tab stop by itself. When its content has no focusable controls,
            add tabindex, role="region", and aria-label so keyboard users can scroll it.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Import the Scroll Area and use it to wrap content:
        </Typography.Text>
        <CodeBlock
            code={`import { ScrollArea } from '@mielui/svelte/components/scroll-area';\n\n<ScrollArea class="h-48 w-64">\n  <div>Your content here</div>\n</ScrollArea>`}
            lang="svelte"
            copy="overlay"
        />

        <Typography.Text variant="supporting">
            A vertical Scroll Area fades its overflowing edges into whatever surface it sits on and
            blurs the content passing under them. The scrollbar thumb stays hidden until the area is
            hovered, focused, or scrolled. Pass{' '}
            <Typography.InlineCode>{'showCues={false}'}</Typography.InlineCode>
            to drop the cues entirely, or{' '}
            <Typography.InlineCode>{'blur={false}'}</Typography.InlineCode>
            to keep the fade without a backdrop filter.
        </Typography.Text>
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Explore the Scroll Area in each orientation, and with the edge cue blur turned off.
            {/snippet}
        </SectionHeading>

        <div id="grouped-list" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Grouped list</Typography.H3>
            <Typography.Text variant="supporting">
                A chat history with date labels and a selected row scrolls inside a fixed height.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="horizontal" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Horizontal</Typography.H3>
            <ComponentPreview code={HorizontalSrc}>
                <Horizontal />
            </ComponentPreview>
        </div>

        <div id="edge-cue-blur" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Edge cue blur</Typography.H3>
            <Typography.Text variant="supporting">
                The cue blurs the content passing under it. Pass{' '}
                <Typography.InlineCode>{'blur={false}'}</Typography.InlineCode>
                to keep the fade without a backdrop filter, which is worth doing over long or
                animated content.
            </Typography.Text>
            <ComponentPreview code={BlurSrc}>
                <Blur />
            </ComponentPreview>
        </div>
    </section>
    <section id="content" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Content</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The scrolling content goes in `children`. Give the scroll area a height or a maximum height with `class`, or it grows to fit and never scrolls."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"While its content overflows, a scroll area keeps the wheel to itself, so reaching the end does not scroll the page behind it. When everything fits, scrolling passes straight through to the page."}
            />
        </Typography.Text>
    </section>
</div>
