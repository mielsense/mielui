<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { CardContentProps } from '.';

    let { children, class: className, ...rest }: CardContentProps = $props();
</script>

<div {...rest} class={cn(className, `flex flex-col`)}>
    {@render children?.()}
</div>
