<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { EmptyStateActionsProps } from '.';

    let { children, class: classProp, ...rest }: EmptyStateActionsProps = $props();
</script>

<div
    {...rest}
    data-slot="empty-state-actions"
    class={cn(classProp, 'flex max-w-full flex-wrap items-center justify-center gap-2')}
>
    {@render children?.()}
</div>
