<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { EmptyStateMediaProps } from '.';

    let { children, class: classProp, ...rest }: EmptyStateMediaProps = $props();
</script>

<div
    {...rest}
    data-slot="empty-state-media"
    class={cn(classProp, 'flex shrink-0 items-center justify-center text-foreground-muted')}
>
    {@render children?.()}
</div>
