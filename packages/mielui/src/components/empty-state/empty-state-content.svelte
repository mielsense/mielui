<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { EmptyStateContentProps } from '.';

    let { children, class: classProp, ...rest }: EmptyStateContentProps = $props();
</script>

<div
    {...rest}
    data-slot="empty-state-content"
    class={cn(classProp, 'flex w-full min-w-0 max-w-sm flex-col gap-4 text-[length:var(--font-size-body)]')}
>
    {@render children?.()}
</div>
