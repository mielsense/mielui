<script lang="ts">
    import {
        File01Icon as FileText,
        LayoutDashboardIcon as LayoutDashboard,
        Settings01Icon as Settings,
        UnfoldMoreIcon as Unfold
    } from '@hugeicons/core-free-icons';
    import * as Avatar from '@mielui/svelte/components/avatar';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { AppPreviewModel } from './model.svelte';
    import ProfileMenuContent from './profile-menu-content.svelte';
    import WorkspaceMenuContent from './workspace-menu-content.svelte';

    let { model }: { model: AppPreviewModel } = $props();

    const views = [
        { value: 'overview', label: 'Overview', icon: LayoutDashboard },
        { value: 'invoices', label: 'Invoices', icon: FileText },
        { value: 'settings', label: 'Settings', icon: Settings }
    ];
    const openInvoices = $derived(
        model.invoices.filter((invoice) => invoice.status !== 'Paid').length
    );
</script>

<!--
    @component
    The ledger's sidebar: workspace switcher, view links, and the account menu.
-->

<aside
    aria-label="Ledger"
    class="hidden w-56 shrink-0 flex-col border-e-[length:var(--border-size)] border-border @3xl:flex"
>
    <div class="flex h-12 shrink-0 items-center px-2">
        <DropdownMenu.Root>
            <DropdownMenu.Trigger variant="quiet" class="w-full min-w-0 justify-between gap-2 px-2">
                <span class="flex min-w-0 items-center gap-2.5">
                    <Avatar.Root size="sm" shape="square">
                        <Avatar.Fallback>NL</Avatar.Fallback>
                    </Avatar.Root>
                    <span class="truncate text-sm font-medium">{model.companyName}</span>
                </span>
                <HugeiconsIcon
                    icon={Unfold}
                    size={14}
                    aria-hidden="true"
                    class="shrink-0 text-foreground-muted"
                />
            </DropdownMenu.Trigger>
            <WorkspaceMenuContent {model} />
        </DropdownMenu.Root>
    </div>
    <nav aria-label="Ledger views" class="flex min-h-0 flex-1 flex-col gap-0.5 p-2">
        {#each views as view (view.value)}
            <button
                type="button"
                aria-current={model.studioView === view.value ? 'page' : undefined}
                class="flex h-9 w-full items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 text-start text-sm text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:bg-foreground/[0.04] hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] aria-[current=page]:bg-secondary aria-[current=page]:text-foreground motion-reduce:transition-none"
                onclick={() => {
                    model.studioView = view.value;
                }}
            >
                <HugeiconsIcon icon={view.icon} size={16} aria-hidden="true" />
                <span class="min-w-0 flex-1 truncate">{view.label}</span>
                {#if view.value === 'invoices' && openInvoices > 0}
                    <span class="font-mono text-xs tabular-nums text-foreground-muted">
                        {openInvoices}
                    </span>
                {/if}
            </button>
        {/each}
    </nav>
    <div class="shrink-0 border-t-[length:var(--border-size)] border-border p-2">
        <DropdownMenu.Root>
            <DropdownMenu.Trigger
                variant="quiet"
                class="w-full min-w-0 justify-start gap-2.5 px-2"
                aria-label="Open profile menu"
            >
                <Avatar.Root size="sm">
                    <Avatar.Fallback>AN</Avatar.Fallback>
                </Avatar.Root>
                <span class="truncate text-sm">Avery Nolan</span>
            </DropdownMenu.Trigger>
            <ProfileMenuContent {model} />
        </DropdownMenu.Root>
    </div>
</aside>
