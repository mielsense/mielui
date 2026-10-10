<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as ContextMenu from '@mielui/svelte/components/context-menu';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import CheckboxItemsExample from './examples/checkbox-items.svelte';
    import CheckboxItemsExampleSrc from './examples/checkbox-items.svelte?raw';
    import FileRow from './examples/file-row.svelte';
    import FileRowSrc from './examples/file-row.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Image from './examples/image.svelte';
    import ImageSrc from './examples/image.svelte?raw';
    import TaskCard from './examples/task-card.svelte';
    import TaskCardSrc from './examples/task-card.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const installCommand = 'pnpm dlx @mielui/svelte add context-menu';

    let grid = $state(true);
</script>

<svelte:head>
    <title>Mielui · Context Menu</title>
    <meta
        name="description"
        content="A right-click menu for actions that apply to whatever the user clicked on. It uses the same item grammar as DropdownMenu and opens on right-click."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Context Menu">
        A right-click menu of actions, sharing the dropdown menu's item set.
    </PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <ContextMenu.Root>
                    <ContextMenu.Trigger
                        class="grid h-32 w-72 place-items-center rounded-[var(--radius-xl)] border border-dashed border-border text-sm text-foreground-muted"
                    >
                        Right-click or press and hold
                    </ContextMenu.Trigger>
                    <ContextMenu.Content surface={values.glass ? 'glass' : undefined}>
                        {#if values.checkbox}
                            <ContextMenu.CheckboxItem value="grid" bind:checked={grid}>
                                Show grid
                            </ContextMenu.CheckboxItem>
                            <ContextMenu.Separator />
                        {/if}
                        <ContextMenu.Item inset={values.inset}>Copy</ContextMenu.Item>
                        <ContextMenu.Item inset={values.inset} disabled={values.disabledItem}>
                            Paste
                        </ContextMenu.Item>
                        {#if values.submenu}
                            <ContextMenu.Sub>
                                <ContextMenu.SubTrigger inset={values.inset}>
                                    Arrange
                                </ContextMenu.SubTrigger>
                                <ContextMenu.SubContent
                                    surface={values.glass ? 'glass' : undefined}
                                >
                                    <ContextMenu.Item>Bring to front</ContextMenu.Item>
                                    <ContextMenu.Item>Send to back</ContextMenu.Item>
                                </ContextMenu.SubContent>
                            </ContextMenu.Sub>
                        {/if}
                        <ContextMenu.Separator />
                        <ContextMenu.Item
                            inset={values.inset}
                            variant={values.destructive ? 'destructive' : undefined}
                        >
                            Delete
                        </ContextMenu.Item>
                    </ContextMenu.Content>
                </ContextMenu.Root>
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
        <Typography.Text variant="supporting">
            The panel is one floating layer with a single hairline edge. The theme setting
            chrome.borders does not change it.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Separators span the inner panel width, including submenus. Menu items keep their
            padding.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Bind open to observe or close the root menu, and use onOpenChange for interaction
            callbacks. Pointer and keyboard opening keep the same state.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Open the menu with a right-click, a touch long-press, or the Context Menu key or
            Shift+F10 on its focused trigger. Arrow keys, Home, End, and typing navigate items;
            submenus support directional keys. An item onclick handler can call
            event.preventDefault() to cancel selection and dismissal.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Import and compose with Root, Trigger, Content, and Item:
        </Typography.Text>
        <CodeBlock
            code={`import * as ContextMenu from '@mielui/svelte/components/context-menu';\n\n<ContextMenu.Root>\n  <ContextMenu.Trigger>\n    <div>Right-click me</div>\n  </ContextMenu.Trigger>\n  <ContextMenu.Content>\n    <ContextMenu.Item callback={handleAction}>Action</ContextMenu.Item>\n  </ContextMenu.Content>\n</ContextMenu.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Right-click a target to open its menu.
            {/snippet}
        </SectionHeading>

        <div id="live-actions" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Live actions</Typography.H3>
            <Typography.Text variant="supporting">
                Each action changes the file in place, and a submenu holds the less common ones.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="file-row" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">File actions</Typography.H3>
            <ComponentPreview code={FileRowSrc}>
                <FileRow />
            </ComponentPreview>
        </div>

        <div id="image" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Image actions</Typography.H3>
            <ComponentPreview code={ImageSrc}>
                <Image />
            </ComponentPreview>
        </div>

        <div id="task-card" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Task actions</Typography.H3>
            <ComponentPreview code={TaskCardSrc}>
                <TaskCard />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on ContextMenu.Content for a translucent background with blur. Omit
            surface to inherit --mielui-surface from your theme, or set surface="solid" to override
            it. The glass surface keeps an opaque fallback when backdrop filtering is unavailable
            and respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
    <section id="checkbox-items" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Checkbox items</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"CheckboxItem toggles an option in place. Give each one a `value` that is unique within the menu, bind `checked` to read or set the state, and use `callback` to react when the person toggles it. `inset` adds the leading space that lines a plain Item up with the checkbox rows."}
            />
        </Typography.Text>
        <ComponentPreview code={CheckboxItemsExampleSrc}>
            <CheckboxItemsExample />
        </ComponentPreview>
    </section>
    <section id="items" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Items and other parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Item and CheckboxItem are built on [Button](/docs/components/button). `size` changes the row height and `loading` with `loadingLabel`, `successLabel` and `errorLabel` shows progress. `variant=\"destructive\"` on Item colors the row for an action that removes something and tints the highlight while it is active. `element` binds the DOM node, `unstyled` removes the Button classes, and `onkeydown` runs before the menu handles the key. A row is always a button and does not take `href`. Navigate from `callback`."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Trigger, Content, Separator, Sub, SubTrigger and SubContent render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>
</div>
