<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { Snippet } from 'svelte';
    import { descriptionClasses } from '../typography/variants';

    let {
        children,
        class: classProp,
        ...rest
    }: {
        children: Snippet;
        class?: string;
    } = $props();
</script>

<p {...rest} class={cn(classProp, descriptionClasses)}>
    {@render children?.()}
</p>
