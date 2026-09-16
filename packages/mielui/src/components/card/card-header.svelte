<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { CardHeaderProps } from '.';

    let { children, class: classProp, ...rest }: CardHeaderProps = $props();
</script>

<div {...rest} class={cn(classProp, `flex flex-col mb-6`)}>
    {@render children?.()}
</div>
