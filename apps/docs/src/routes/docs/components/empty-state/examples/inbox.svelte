<script lang="ts">
    import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
    import * as EmptyState from '@mielui/svelte/components/empty-state';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<EmptyState.Root class="max-w-sm">
    <EmptyState.Media aria-hidden="true" class="text-success">
        <HugeiconsIcon icon={CheckmarkCircle02Icon} class="size-7" />
    </EmptyState.Media>
    <EmptyState.Header>
        <EmptyState.Title>You're all caught up</EmptyState.Title>
        <EmptyState.Description>
            No new messages. We'll let you know when someone replies.
        </EmptyState.Description>
    </EmptyState.Header>
</EmptyState.Root>
