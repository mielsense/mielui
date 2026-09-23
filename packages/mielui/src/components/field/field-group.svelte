<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FieldGroupProps } from '.';

    let { children, class: className, ...rest }: FieldGroupProps = $props();
</script>

<div {...rest} data-ui="field-group" class={cn(className, 'flex min-w-0 flex-col gap-5')}>
    {@render children?.()}
</div>
