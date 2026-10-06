<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import * as Avatar from '@mielui/svelte/components/avatar';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { AppPreviewModel } from './model.svelte';
    import Navigation from './navigation.svelte';
    import Notifications from './notifications.svelte';
    import ProfileMenuContent from './profile-menu-content.svelte';
    import WorkspaceMenuContent from './workspace-menu-content.svelte';

    let { model }: { model: AppPreviewModel } = $props();
</script>

<header
    class="flex min-h-12 shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-b-[length:var(--border-size)] border-border px-4 py-1.5"
>
    <div class="@3xl:hidden">
        <DropdownMenu.Root>
            <DropdownMenu.Trigger variant="quiet" class="min-w-0 justify-start px-0">
                <Avatar.Root size="sm" shape="square">
                    <Avatar.Fallback>NL</Avatar.Fallback>
                </Avatar.Root>
                <span class="truncate text-sm">{model.companyName}</span>
                <HugeiconsIcon icon={ChevronDown} size={14} class="text-foreground-muted" />
            </DropdownMenu.Trigger>
            <WorkspaceMenuContent {model} />
        </DropdownMenu.Root>
    </div>
    <Navigation {model} />
    <div class="flex items-center gap-1">
        <Notifications {model} />
        <div class="@3xl:hidden">
            <DropdownMenu.Root>
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <DropdownMenu.Trigger
                            variant="quiet"
                            size="icon"
                            aria-label="Open profile menu"
                        >
                            <Avatar.Root size="sm">
                                <Avatar.Fallback>AN</Avatar.Fallback>
                            </Avatar.Root>
                        </DropdownMenu.Trigger>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Profile menu</Tooltip.Content>
                </Tooltip.Root>
                <ProfileMenuContent {model} />
            </DropdownMenu.Root>
        </div>
    </div>
</header>
