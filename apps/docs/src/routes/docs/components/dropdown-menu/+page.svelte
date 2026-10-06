<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import BasicMenu from './examples/basic-menu.svelte';
    import BasicMenuSrc from './examples/basic-menu.svelte?raw';
    import CheckboxRadioExample from './examples/checkbox-radio.svelte';
    import CheckboxRadioExampleSrc from './examples/checkbox-radio.svelte?raw';
    import Configuration from './examples/configuration.svelte';
    import ConfigurationSrc from './examples/configuration.svelte?raw';
    import ControlledExample from './examples/controlled.svelte';
    import ControlledExampleSrc from './examples/controlled.svelte?raw';
    import DynamicWidth from './examples/dynamic-width.svelte';
    import DynamicWidthSrc from './examples/dynamic-width.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import OverlayBorders from './examples/overlay-borders.svelte';
    import OverlayBordersSrc from './examples/overlay-borders.svelte?raw';
    import RowActions from './examples/row-actions.svelte';
    import RowActionsSrc from './examples/row-actions.svelte?raw';
    import ShareMenu from './examples/share-menu.svelte';
    import ShareMenuSrc from './examples/share-menu.svelte?raw';
    import SortMenu from './examples/sort-menu.svelte';
    import SortMenuSrc from './examples/sort-menu.svelte?raw';
    import UserMenu from './examples/user-menu.svelte';
    import UserMenuSrc from './examples/user-menu.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add dropdown-menu';
</script>

<svelte:head>
    <title>Mielui · Dropdown Menu</title>
    <meta
        name="description"
        content="A list of actions anchored to a button. Use it for user menus, row-level actions, and anywhere a `…` button needs to do more than one thing."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Dropdown Menu">A menu of actions anchored to a button.</PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}>
            <Hero />
        </ComponentPreview>
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
            Separators span the inner panel width, including submenus. Menu items retain their
            padding.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Use Arrow keys, Home, End, or type a label to move between enabled items. Submenus
            support directional keyboard navigation. Items close the menu after selection; an
            onclick handler can call event.preventDefault() to cancel selection and dismissal. Bind
            checked or value to retain selections outside the mounted menu.
        </Typography.Text>

        <CodeBlock
            code={`import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';\nimport Kbd from '@mielui/svelte/components/kbd';\n\n<DropdownMenu.Root>\n  <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>\n  <DropdownMenu.Content>\n    <DropdownMenu.Item callback={handleClick}>\n      Action\n      <Kbd shortcut="cmd+K" />\n    </DropdownMenu.Item>\n  </DropdownMenu.Content>\n</DropdownMenu.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <!-- Basic menu -->
        <div id="basic-menu" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Basic menu</Typography.H3>
            <ComponentPreview code={BasicMenuSrc}>
                <BasicMenu />
            </ComponentPreview>
        </div>

        <!-- Grouped (user) menu -->
        <div id="user-menu" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Grouped items</Typography.H3>
            <ComponentPreview code={UserMenuSrc}>
                <UserMenu />
            </ComponentPreview>
        </div>

        <!-- Row actions -->
        <div id="row-actions" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Row actions</Typography.H3>
            <ComponentPreview code={RowActionsSrc}>
                <RowActions />
            </ComponentPreview>
        </div>

        <!-- Share menu -->
        <div id="share-menu" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Share menu</Typography.H3>
            <ComponentPreview code={ShareMenuSrc}>
                <ShareMenu />
            </ComponentPreview>
        </div>

        <!-- Sort menu -->
        <div id="sort-menu" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Sort menu</Typography.H3>
            <ComponentPreview code={SortMenuSrc}>
                <SortMenu />
            </ComponentPreview>
        </div>

        <div id="configuration-menu" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Configuration submenu</Typography.H3>
            <Typography.Text variant="supporting">
                Nested choices for configuring a model, effort level, and response speed.
            </Typography.Text>
            <ComponentPreview code={ConfigurationSrc}>
                <Configuration />
            </ComponentPreview>
        </div>

        <div id="dynamic-width" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Dynamic width</Typography.H3>
            <Typography.Text variant="supporting">
                Menus and submenus size to their longest item plus a buffer instead of hugging the
                trigger.
            </Typography.Text>
            <ComponentPreview code={DynamicWidthSrc}>
                <DynamicWidth />
            </ComponentPreview>
        </div>
    </section>
    <section id="overlay-borders" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Borders</Typography.H2>
        <Typography.Text variant="supporting">
            Set chrome.borders to "single" or "double" in your theme. Single is the default. This
            example overrides the generated inset token locally so you can compare both styles.
        </Typography.Text>
        <ComponentPreview code={OverlayBordersSrc}><OverlayBorders /></ComponentPreview>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on DropdownMenu.Content for a translucent background with blur.
            Without a surface prop, the component follows --mielui-surface. An unset variable keeps
            it solid; surface="solid" overrides a global glass theme. The glass surface keeps an
            opaque fallback when backdrop filtering is unavailable and respects reduced-transparency
            preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
    <section id="checkbox-and-radio-items" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Checkbox and radio items</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"CheckboxItem toggles an option and closes the menu, like any other item. Bind `checked`, or listen with `onCheckedChange`, which receives the new state."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"RadioGroup holds one choice among its RadioItem children. Bind `value` on the group, or use `onValueChange` to react to the new value. Each RadioItem needs its own `value`."}
            />
        </Typography.Text>
        <ComponentPreview code={CheckboxRadioExampleSrc}>
            <CheckboxRadioExample />
        </ComponentPreview>
    </section>
    <section id="controlling-the-menu" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Controlling the menu</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `open` on Root to open or close the menu from your own code. `onOpenChange` runs when the person opens or closes it, and stays quiet for changes you make through `open` yourself. Trigger and SubTrigger also take `onopen`, which runs just before that trigger opens its panel. Use it to load items when someone looks."}
            />
        </Typography.Text>
        <ComponentPreview code={ControlledExampleSrc}>
            <ControlledExample />
        </ComponentPreview>
    </section>
    <section id="panel-behavior" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Panel behavior</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Content shares its panel with Popover, with menu defaults. A press outside closes the menu unless you set `allowClickOutside={false}`. `dismissLayer={false}` removes the invisible layer that catches the first outside press, so the page stays clickable while the menu is open."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`focusTrap` and `lockScroll` are both off for menus, so Tab leaves the menu and the page still scrolls. Turn either on for a menu that should hold attention. `portal={false}` renders the panel in place instead of at the end of the document. `refElement` anchors the panel to another element, and `tabindex` sets the panel's tab index."}
            />
        </Typography.Text>
    </section>
    <section id="items" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Items and other parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Item runs `callback` when chosen and then closes the menu. It is built on [Button](/docs/components/button), so `disabled` skips it, and `loading` with `loadingLabel`, `successLabel` and `errorLabel` shows progress on a row that starts slow work. Item, CheckboxItem, RadioItem, Trigger and SubTrigger accept `element` to bind the DOM node. `unstyled` removes the Button classes on Item, Trigger and SubTrigger, and `onkeydown` on Item runs before the menu handles the key."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Content, Label, Separator, Sub, SubContent and RadioGroup render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>
</div>
