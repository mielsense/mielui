<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { Snippet } from 'svelte';

    type Props = {
        children: Snippet;
        class?: string;
    };

    let { children, class: className, ...rest }: Props = $props();
</script>

<p
    {...rest}
    data-ui="menu-label"
    class={cn(
        className,
        'mielui-menu-label'
    )}
>
    {@render children?.()}
</p>
