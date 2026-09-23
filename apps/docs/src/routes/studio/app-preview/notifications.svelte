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
                aria-label="Notifications"
            >
                <HugeiconsIcon icon={Bell} size={16} />
                {#if model.unreadNotificationCount > 0}
                    <Badge
                        variant="error"
                        class="pointer-events-none absolute top-0.5 right-0.5 size-3.5 min-w-3.5 bg-[var(--color-error)] p-0 text-[length:var(--font-size-meta)] text-[var(--color-on-primary)] leading-none"
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
                    unstyled
                    class="flex w-full items-start justify-start gap-3 rounded-[var(--radius-md)] px-2 py-2 text-left select-none transition-[background-color,border-color,color] [transition-duration:var(--motion-duration-hover)] hover:cursor-[var(--ui-cursor-interactive)] hover:bg-foreground/[0.08] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
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
