<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { EmptyStateActionsProps } from '.';

    let { children, class: className, ...rest }: EmptyStateActionsProps = $props();
</script>

<div
    {...rest}
    data-slot="empty-state-actions"
    class={cn(className, 'flex max-w-full flex-wrap items-center justify-center gap-2')}
>
    {@render children?.()}
</div>
