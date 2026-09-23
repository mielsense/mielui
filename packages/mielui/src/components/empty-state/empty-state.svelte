<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { EmptyStateProps } from '.';

    let { children, class: classProp, ...rest }: EmptyStateProps = $props();
</script>

<div
    {...rest}
    data-slot="empty-state"
    class={cn(classProp, 'flex min-w-0 flex-col items-center justify-center gap-6 px-6 py-12 text-center text-foreground')}
>
    {@render children?.()}
</div>
