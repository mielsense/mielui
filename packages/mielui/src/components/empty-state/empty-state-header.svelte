<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { EmptyStateHeaderProps } from '.';

    let { children, class: classProp, ...rest }: EmptyStateHeaderProps = $props();
</script>

<div
    {...rest}
    data-slot="empty-state-header"
    class={cn(classProp, 'flex w-full max-w-sm flex-col items-center gap-2')}
>
    {@render children?.()}
</div>
