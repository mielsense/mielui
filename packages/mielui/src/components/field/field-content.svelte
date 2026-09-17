<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FieldContentProps } from '.';

    let { children, class: className, ...rest }: FieldContentProps = $props();
</script>

<div
    {...rest}
    data-ui="field-content"
    class={cn(className, 'flex min-w-0 flex-1 flex-col gap-1.5')}
>
    {@render children?.()}
</div>
