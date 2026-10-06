<script lang="ts">
    import {
        Tick02Icon as Check,
        SidebarLeft01Icon as SidebarIcon,
        UnfoldMoreIcon as Unfold
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Menu from '@mielui/svelte/components/dropdown-menu';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { Snippet } from 'svelte';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { getShell } from './shell.svelte';

    const {
        label,
        title,
        wide = false,
        footer,
        children
    }: {
        label: string;
        title: string;
        wide?: boolean;
        footer?: Snippet;
        children: Snippet;
    } = $props();

    const shell = getShell();
    const workspaces = [
        { label: 'Documentation', href: resolve('/docs/introduction') },
        { label: 'Theme Studio', href: resolve('/studio') },
        { label: 'Themes', href: resolve('/themes') }
    ];
    const width = $derived(wide ? 'w-[21rem]' : 'w-[18.5rem]');
</script>

<svelte:window
    onkeydown={(event) => {
        const target = event.target;
        const typing =
            target instanceof HTMLElement &&
            (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
        if (!typing && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'b') {
            event.preventDefault();
            shell.toggle();
        }
    }}
/>

<aside
    aria-label={label}
    inert={shell.collapsed}
    class={`hidden h-full shrink-0 overflow-clip transition-[width] [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] motion-reduce:transition-none lg:block ${shell.collapsed ? 'w-0' : width}`}
>
    <div
        class={`flex h-full flex-col border-e-[length:var(--border-size)] border-[var(--docs-rule)] bg-[var(--docs-side)] ${width}`}
    >
        <div class="flex h-[50px] shrink-0 items-center justify-between gap-1 ps-[19px] pe-3">
            <Menu.Root>
                <Menu.Trigger
                    variant="ghost"
                    class="h-8 min-w-0 gap-2.5 rounded-[var(--radius-sm)] px-1.5 text-[15px] font-medium"
                >
                    <span class="truncate">{title}</span>
                    <HugeiconsIcon
                        icon={Unfold}
                        size={14}
                        aria-hidden="true"
                        class="shrink-0 text-foreground-muted"
                    />
                </Menu.Trigger>
                <Menu.Content class="w-52">
                    {#each workspaces as workspace (workspace.href)}
                        <Menu.Item
                            callback={() => {
                                void goto(workspace.href);
                            }}
                        >
                            <span class="flex-1">{workspace.label}</span>
                            {#if workspace.label === title}
                                <HugeiconsIcon icon={Check} size={14} aria-hidden="true" />
                            {/if}
                        </Menu.Item>
                    {/each}
                </Menu.Content>
            </Menu.Root>
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Hide sidebar"
                        class="size-8 shrink-0 rounded-[var(--radius-sm)] text-foreground-muted hover:text-foreground"
                        onclick={shell.toggle}
                    >
                        <HugeiconsIcon icon={SidebarIcon} size={16} />
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>Hide sidebar</Tooltip.Content>
            </Tooltip.Root>
        </div>
        <div
            class="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain [mask-image:linear-gradient(to_bottom,black_calc(100%-var(--spacing)*6),transparent)]"
        >
            {@render children()}
        </div>
        {@render footer?.()}
    </div>
</aside>
