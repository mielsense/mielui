<script lang="ts">
    import {
        ArrowDown01Icon as ChevronDown,
        CreditCardIcon as CreditCard,
        Logout01Icon as LogOut,
        PaintBoardIcon as Palette,
        Settings01Icon as Settings,
        UserIcon as User
    } from '@hugeicons/core-free-icons';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
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
    import RowActions from './examples/row-actions.svelte';
    import RowActionsSrc from './examples/row-actions.svelte?raw';
    import ShareMenu from './examples/share-menu.svelte';
    import ShareMenuSrc from './examples/share-menu.svelte?raw';
    import SortMenu from './examples/sort-menu.svelte';
    import SortMenuSrc from './examples/sort-menu.svelte?raw';
    import UserMenu from './examples/user-menu.svelte';
    import UserMenuSrc from './examples/user-menu.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    let notifications = $state(true);
    let theme = $state('system');

    const usageCode = `<script lang="ts">
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import Kbd from '@mielui/svelte/components/kbd';

    function newFile() {
        console.log('New file');
    }
</${'script'}>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>File</DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Item callback={newFile}>
            New file
            <Kbd shortcut="cmd+N" />
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>`;
</script>

<svelte:head>
    <title>Mielui · Dropdown Menu</title>
    <meta
        name="description"
        content="A menu of actions anchored to a button, for user menus, row actions, and overflow buttons."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Dropdown Menu">A menu of actions anchored to a button.</PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger variant={values.variant}>
                        My account
                        <HugeiconsIcon icon={ChevronDown} size={16} class="text-foreground-muted" />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content surface={values.glass ? 'glass' : undefined}>
                        {#if values.label}
                            <DropdownMenu.Label>alex@example.com</DropdownMenu.Label>
                        {/if}
                        <DropdownMenu.Item>
                            {#if values.icons}
                                <span class="flex items-center gap-2">
                                    <HugeiconsIcon icon={User} size={13} />
                                    Profile
                                </span>
                            {:else}
                                Profile
                            {/if}
                        </DropdownMenu.Item>
                        <DropdownMenu.Item disabled={values.disabledItem}>
                            {#if values.icons}
                                <span class="flex items-center gap-2">
                                    <HugeiconsIcon icon={CreditCard} size={13} />
                                    Billing
                                </span>
                            {:else}
                                Billing
                            {/if}
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                            {#if values.icons}
                                <span class="flex items-center gap-2">
                                    <HugeiconsIcon icon={Settings} size={13} />
                                    Settings
                                </span>
                            {:else}
                                Settings
                            {/if}
                        </DropdownMenu.Item>
                        {#if values.checkbox}
                            <DropdownMenu.CheckboxItem bind:checked={notifications}>
                                Email notifications
                            </DropdownMenu.CheckboxItem>
                        {/if}
                        {#if values.submenu}
                            <DropdownMenu.Sub>
                                <DropdownMenu.SubTrigger>
                                    {#if values.icons}
                                        <span class="flex items-center gap-2">
                                            <HugeiconsIcon icon={Palette} size={13} />
                                            Theme
                                        </span>
                                    {:else}
                                        Theme
                                    {/if}
                                </DropdownMenu.SubTrigger>
                                <DropdownMenu.SubContent
                                    surface={values.glass ? 'glass' : undefined}
                                >
                                    <DropdownMenu.RadioGroup bind:value={theme}>
                                        <DropdownMenu.RadioItem value="light">
                                            Light
                                        </DropdownMenu.RadioItem>
                                        <DropdownMenu.RadioItem value="dark">
                                            Dark
                                        </DropdownMenu.RadioItem>
                                        <DropdownMenu.RadioItem value="system">
                                            System
                                        </DropdownMenu.RadioItem>
                                    </DropdownMenu.RadioGroup>
                                </DropdownMenu.SubContent>
                            </DropdownMenu.Sub>
                        {/if}
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item variant={values.destructive ? 'destructive' : undefined}>
                            {#if values.icons}
                                <span class="flex items-center gap-2">
                                    <HugeiconsIcon icon={LogOut} size={13} />
                                    Sign out
                                </span>
                            {:else}
                                Sign out
                            {/if}
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add dropdown-menu" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Item runs `callback` when chosen, then closes the menu. Arrow keys, Home, End, and typing a label move between enabled items, and submenus open with the arrow key that points at them. An `onclick` handler on an item can call `event.preventDefault()` to keep the menu open."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The panel is one floating layer with a single hairline edge; the theme's `chrome.borders` setting does not change it."}
            />
        </Typography.Text>

        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="item-callbacks" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Item callbacks</Typography.H3>
            <Typography.Text variant="supporting">
                Each item runs a callback, and the line under the menu reports the last choice.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="basic-menu" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Basic menu</Typography.H3>
            <ComponentPreview code={BasicMenuSrc}>
                <BasicMenu />
            </ComponentPreview>
        </div>

        <div id="grouped-items" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Grouped items</Typography.H3>
            <ComponentPreview code={UserMenuSrc}>
                <UserMenu />
            </ComponentPreview>
        </div>

        <div id="row-actions" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Row actions</Typography.H3>
            <ComponentPreview code={RowActionsSrc}>
                <RowActions />
            </ComponentPreview>
        </div>

        <div id="share-menu" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Share menu</Typography.H3>
            <ComponentPreview code={ShareMenuSrc}>
                <ShareMenu />
            </ComponentPreview>
        </div>

        <div id="sort-menu" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Sort menu</Typography.H3>
            <ComponentPreview code={SortMenuSrc}>
                <SortMenu />
            </ComponentPreview>
        </div>

        <div id="configuration-submenu" class="scroll-mt-20 flex flex-col gap-3">
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

    <section id="glass" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on DropdownMenu.Content for a translucent background with blur.
            Without a surface prop, the component follows --mielui-surface. An unset variable keeps
            it solid; surface="solid" overrides a global glass theme. The glass surface keeps an
            opaque fallback when backdrop filtering is unavailable and respects reduced-transparency
            preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}>
            <Glass />
        </ComponentPreview>
    </section>

    <section id="checkbox-and-radio-items" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Checkbox and radio items</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"CheckboxItem toggles an option and closes the menu, like any other item. Bind `checked`, or listen with `onCheckedChange`, which receives the new state."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"RadioGroup holds one choice among its RadioItem children. Bind `value` on the group, or use `onValueChange` to react to the new value. Each RadioItem needs its own `value`. A checked CheckboxItem shows a check and the selected RadioItem shows a dot."}
            />
        </Typography.Text>
        <ComponentPreview code={CheckboxRadioExampleSrc}>
            <CheckboxRadioExample />
        </ComponentPreview>
    </section>

    <section id="controlling-the-menu" class="scroll-mt-20 flex flex-col gap-4">
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

    <section id="panel-behavior" class="scroll-mt-20 flex flex-col gap-4">
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

    <section id="items" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Items and other parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Item runs `callback` when chosen and then closes the menu. It is built on [Button](/docs/components/button), so `disabled` skips it, and `loading` with `labels` shows progress on a row that starts slow work. `variant=\"destructive\"` colors the row for an action that removes something and tints the highlight while it is active. Item, CheckboxItem, RadioItem, Trigger and SubTrigger accept `element` to bind the DOM node, and `onkeydown` on Item runs before the menu handles the key. Rows always use the menu row style, so Button's other variants, `size` and `unstyled` do not apply to them. A row is always a button and does not take `href`. Navigate from `callback`."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Content, Label, Separator, Sub, SubContent and RadioGroup render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>
</div>
