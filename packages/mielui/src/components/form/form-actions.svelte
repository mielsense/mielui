<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FormActionsProps } from '.';

    let { children, class: className, ...rest }: FormActionsProps = $props();
</script>

<div {...rest} data-ui="form-actions" class={cn(className, 'flex flex-wrap items-center gap-2')}>
    {@render children?.()}
</div>
