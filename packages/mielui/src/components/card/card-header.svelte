<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { CardHeaderProps } from '.';

    let { children, class: classProp, ...rest }: CardHeaderProps = $props();
</script>

<div {...rest} data-ui="card-header" class={cn(classProp, 'mb-6 flex flex-col last:mb-0')}>
    {@render children?.()}
</div>
