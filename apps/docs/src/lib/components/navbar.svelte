<script lang="ts">
    import {
        Menu01Icon as Menu,
        Moon02Icon as Moon,
        Sun03Icon as Sun,
        Cancel01Icon as X
    } from '@hugeicons/core-free-icons';
    import { morph } from '@mielui/svelte/actions/morph';
    import Button from '@mielui/svelte/components/button';
    import * as Select from '@mielui/svelte/components/select';
    import * as Sheet from '@mielui/svelte/components/sheet';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { mode, toggleMode } from 'mode-watcher';
    import { onMount } from 'svelte';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import GitHubBlack from '$lib/assets/GitHub_Invertocat_Black.svg';
    import GitHubWhite from '$lib/assets/GitHub_Invertocat_White.svg';
    import { navigationGroups, sanitizeComponent } from '$lib/components';
    import SearchButton from '$lib/components/search/trigger.svelte';
    import { formatStarCount } from '$lib/github';
    import { getStudioContext } from '$lib/studio-context';
    import Logo from './logo.svelte';
    import Navbutton from './navbutton.svelte';

    const { starCount = null }: { starCount?: number | null } = $props();

    const studio = getStudioContext();
    const previewTabs = [
        { value: 'components', label: 'Components' },
        { value: 'charts', label: 'Charts' },
        { value: 'ai', label: 'AI components' },
        { value: 'app', label: 'App preview' }
    ];

    let scrolled = $state(false);
    let mobileMenuOpen = $state(false);
    const isStudio = $derived(page.url.pathname.startsWith('/studio'));
    const isDocs = $derived(
        page.url.pathname.startsWith('/docs') || page.url.pathname.startsWith('/fonts')
    );

    const navItems = [
        { href: '/docs/introduction', label: 'Docs' },
        { href: '/studio', label: 'Studio' }
    ];
    const docsPages = [
        { title: 'Introduction', href: resolve('/docs/introduction') },
        { title: 'Installation', href: resolve('/docs/installation') },
        { title: 'Theming', href: resolve('/docs/theming') },
        { title: 'Agent skill', href: resolve('/docs/agent-skill') },
        { title: 'Changelog', href: resolve('/docs/changelog') },
        { title: 'Components', href: resolve('/docs/components') }
    ];

    onMount(() => {
        const updateScroll = () => {
            scrolled = window.scrollY > 10;
        };

        updateScroll();
        window.addEventListener('scroll', updateScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', updateScroll);
        };
    });
</script>

<Sheet.Root bind:open={mobileMenuOpen}>
    <nav
        class={`sticky inset-x-0 top-0 z-20 transition-[background-color,backdrop-filter] duration-200 ${
            isStudio
                ? 'bg-[var(--docs-chrome)]'
                : isDocs
                ? 'bg-background/72 backdrop-blur-[14px]'
                : scrolled
                  ? 'bg-background/58 backdrop-blur-[14px]'
                  : 'bg-transparent'
        }`}
    >
        <div
            class={`relative mx-auto flex h-[calc(var(--docs-row-height)-var(--border-size))] w-full items-center justify-between ${
                isStudio ? 'px-4 min-[68.75rem]:px-0' : isDocs ? 'max-w-[1400px] px-4 md:px-6' : 'px-4 md:px-6'
            }`}
        >
            <div
                class={`flex min-w-0 flex-row items-center gap-2 md:gap-5 ${isStudio ? 'min-[68.75rem]:gap-0' : ''}`}
            >
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Sheet.Trigger
                            class={`size-9 rounded-lg ${isStudio ? 'hidden' : 'md:hidden'}`}
                            aria-label="Open navigation menu"
                            variant="quiet"
                            size="icon"
                        >
                            <HugeiconsIcon icon={Menu} size={18} />
                        </Sheet.Trigger>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Open navigation menu</Tooltip.Content>
                </Tooltip.Root>
                <div class="md:hidden">
                    <Logo />
                </div>
                <div
                    class={`hidden md:block ${isStudio ? 'min-[68.75rem]:flex min-[68.75rem]:h-[calc(var(--docs-row-height)-var(--border-size))] min-[68.75rem]:w-[18rem] min-[68.75rem]:items-center min-[68.75rem]:border-r-[length:var(--border-size)] min-[68.75rem]:border-[var(--docs-rule)] min-[68.75rem]:px-5' : ''}`}
                >
                    <Logo />
                </div>
                {#if !isStudio}
                    <div
                        class={`hidden items-center gap-1 md:flex ${isStudio ? 'min-[68.75rem]:px-5' : ''}`}
                    >
                        {#each navItems as item (item.href)}
                            <Navbutton href={item.href}>{item.label}</Navbutton>
                        {/each}
                    </div>
                {/if}
            </div>

            {#if isStudio}
                <div class="min-w-0 flex-1 px-3">
                    <Tabs.Root bind:value={studio.mode} variant="ghost" class="hidden lg:block">
                        <Tabs.List aria-label="Preview content">
                            {#each previewTabs as tab (tab.value)}
                                <Tabs.Trigger value={tab.value}>{tab.label}</Tabs.Trigger>
                            {/each}
                        </Tabs.List>
                    </Tabs.Root>
                    <div class="lg:hidden">
                        <Select.Root bind:value={studio.mode}>
                            <Select.Trigger aria-label="Preview content" class="w-full max-w-40">
                                <span class="truncate">
                                    {previewTabs.find((tab) => tab.value === studio.mode)?.label}
                                </span>
                            </Select.Trigger>
                            <Select.Content>
                                {#each previewTabs as tab (tab.value)}
                                    <Select.Item value={tab.value}>{tab.label}</Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                    </div>
                </div>
            {/if}

            <div
                class={`flex flex-row items-center gap-1.5 ${isStudio ? 'min-[68.75rem]:pr-5' : ''}`}
            >
                <div class={isStudio ? 'hidden sm:block' : ''}><SearchButton /></div>
                {#if isStudio}
                    <Button variant="outline" href={resolve('/docs/introduction')}>Docs</Button>
                {/if}
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Button
                            class="size-9 rounded-[var(--radius-md)]"
                            variant="outline"
                            onclick={() => {
                                toggleMode();
                            }}
                            size="icon"
                            aria-label={mode.current === 'dark'
                        ? 'Switch to light mode'
                        : 'Switch to dark mode'}
                        >
                            <span
                                class="inline-flex size-4"
                                aria-hidden="true"
                                use:morph={{ key: mode.current }}
                            >
                                <HugeiconsIcon
                                    icon={mode.current === 'dark' ? Moon : Sun}
                                    size={16}
                                />
                            </span>
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        {mode.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    </Tooltip.Content>
                </Tooltip.Root>
                {#if !isStudio}
                    <Button
                        class={`h-9 gap-1.5 rounded-[var(--radius-md)] px-2.5 text-[0.8125rem] tabular-nums ${isStudio ? 'hidden sm:inline-flex' : ''}`}
                        variant="outline"
                        href="https://github.com/mielsense/mielui"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Star mielui on GitHub"
                    >
                        <img src={GitHubBlack} alt="" class="size-4 dark:hidden" />
                        <img src={GitHubWhite} alt="" class="hidden size-4 dark:block" />
                        <span>{formatStarCount(starCount)}</span>
                    </Button>
                {/if}
            </div>
        </div>
    </nav>

    <Sheet.Content side="left" class="p-0 md:hidden">
        <Sheet.Title class="sr-only">Browse mielui</Sheet.Title>
        <Sheet.Description class="sr-only">
            Documentation and component categories.
        </Sheet.Description>
        <header class="flex shrink-0 items-center justify-between px-3 py-3">
            <a
                href={resolve('/')}
                class="font-semibold tracking-tight text-foreground no-underline"
            >
                mielui
            </a>
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Sheet.Close aria-label="Close navigation menu" variant="quiet" size="icon">
                        <HugeiconsIcon icon={X} size={18} />
                    </Sheet.Close>
                </Tooltip.Trigger>
                <Tooltip.Content>Close navigation menu</Tooltip.Content>
            </Tooltip.Root>
        </header>

        <div class="min-h-0 flex-1 overflow-y-auto px-3 py-4">
            <section class="flex flex-col gap-2 ">
                <h2 class="mb-2 text-sm text-foreground-muted">Navigate</h2>
                {#each navItems as item (item.href)}
                    <Button
                        variant="quiet"
                        class="w-full justify-start"
                        onclick={() => {
                            mobileMenuOpen = false;
                        }}
                        href={item.href}
                    >
                        {item.label}
                    </Button>
                {/each}
            </section>

            <section class="flex flex-col gap-2 mt-10">
                <h2 class="mb-2 text-sm text-foreground-muted">Getting Started</h2>
                {#each docsPages as item (item.href)}
                    <Button
                        variant="quiet"
                        class="w-full justify-start"
                        onclick={() => {
                            mobileMenuOpen = false;
                        }}
                        href={item.href}
                    >
                        {item.title}
                    </Button>
                {/each}
            </section>

            {#each navigationGroups as group (group.id)}
                <section class="mt-10 flex flex-col gap-2">
                    <h2 class="mb-2 text-sm text-foreground-muted">{group.heading}</h2>
                    {#each group.items as component (component)}
                        <Button
                            variant="quiet"
                            class="w-full justify-start"
                            onclick={() => {
                                mobileMenuOpen = false;
                            }}
                            href={`/docs/${group.id === 'actions' ? 'actions' : 'components'}/${component}`}
                        >
                            {sanitizeComponent(component)}
                        </Button>
                    {/each}
                    {#if group.items.length === 0}
                        <p class="text-sm text-foreground-muted">No chart components yet.</p>
                    {/if}
                </section>
            {/each}
        </div>
    </Sheet.Content>
</Sheet.Root>
