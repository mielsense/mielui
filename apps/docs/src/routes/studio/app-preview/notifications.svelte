<script lang="ts">
    import { Notification03Icon as Bell } from '@hugeicons/core-free-icons';
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import * as Popover from '@mielui/svelte/components/popover';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { AppPreviewModel } from './model.svelte';

    let { model }: { model: AppPreviewModel } = $props();
</script>

<Popover.Root placement="bottom-end" inert={false}>
    <Tooltip.Root>
        <Tooltip.Trigger>
            <Popover.Trigger
                variant="ghost"
                size="icon"
                class="relative"
                aria-label={model.unreadNotificationCount > 0 ? `Notifications, ${model.unreadNotificationCount} unread` : 'Notifications'}
            >
                <HugeiconsIcon icon={Bell} size={16} />
                {#if model.unreadNotificationCount > 0}
                    <Badge
                        variant="primary"
                        aria-hidden="true"
                        class="pointer-events-none absolute top-0 right-0 h-4 min-h-4 min-w-4 px-1 py-0 text-[length:var(--font-size-meta)] leading-none tabular-nums"
                    >
                        {model.unreadNotificationCount}
                    </Badge>
                {/if}
            </Popover.Trigger>
        </Tooltip.Trigger>
        <Tooltip.Content>Notifications</Tooltip.Content>
    </Tooltip.Root>
    <Popover.Content class="w-80" surfaceClass="p-2" lockScroll={false}>
        <div class="flex items-center justify-between px-2 pt-1 pb-1.5">
            <Popover.Title class="text-[length:var(--font-size-body)] leading-snug">
                Notifications
            </Popover.Title>
            {#if model.unreadNotificationCount > 0}
                <Typography.Metadata class="tabular-nums">
                    {model.unreadNotificationCount}
                    new
                </Typography.Metadata>
            {/if}
        </div>
        <div class="flex flex-col gap-0.5">
            {#each model.notifications as notification (notification.id)}
                <Button
                    variant="ghost"
                    class="h-auto w-full items-start justify-start gap-3 whitespace-normal rounded-[var(--radius-md)] px-2 py-2 text-left leading-normal"
                    onclick={() => {
            model.markNotificationRead(notification.id);
        }}
                >
                    <span class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                        <span
                            class="w-full text-left text-[length:var(--font-size-body)] leading-snug text-pretty text-foreground {notification.read
                                    ? 'font-normal'
                                    : 'font-medium'}"
                        >
                            {notification.title}
                        </span>
                        <Typography.Metadata class="tabular-nums">
                            {notification.detail}
                        </Typography.Metadata>
                    </span>
                    {#if !notification.read}
                        <Badge variant="secondary" class="mt-0.5 shrink-0 self-start">New</Badge>
                    {/if}
                </Button>
            {/each}
        </div>
    </Popover.Content>
</Popover.Root>
