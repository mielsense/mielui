<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { NotchActionsProps } from '.';

    let { children, class: className, ...rest }: NotchActionsProps = $props();
</script>
<div {...rest} data-ui="notch-actions" class={cn(className, 'flex flex-wrap items-center gap-2')}>
    {@render children?.()}
</div>
