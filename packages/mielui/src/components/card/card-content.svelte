<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { CardContentProps } from '.';

    let { children, class: classProp, ...rest }: CardContentProps = $props();
</script>

<div {...rest} class={cn(classProp, `flex flex-col`)}>
    {@render children?.()}
</div>
