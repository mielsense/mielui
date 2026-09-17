<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FieldsetProps } from '.';

    let { children, class: className, element = $bindable(), ...rest }: FieldsetProps = $props();
</script>

<fieldset
    {...rest}
    bind:this={element}
    data-ui="fieldset"
    class={cn(className, 'm-0 flex min-w-0 flex-col gap-5 border-0 p-0')}
>
    {@render children?.()}
</fieldset>
