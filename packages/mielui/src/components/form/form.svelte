<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FormProps } from '.';
    import { setFormContext } from './context.svelte';

    let {
        children,
        class: className,
        element = $bindable(),
        pending = false,
        'aria-busy': ariaBusy,
        ...rest
    }: FormProps = $props();
    setFormContext({
        get pending() {
            return Boolean(pending);
        }
    });
</script>

<form
    {...rest}
    bind:this={element}
    data-ui="form"
    aria-busy={ariaBusy ?? (Boolean(pending) || undefined)}
    data-pending={Boolean(pending) || undefined}
    class={cn(className, 'flex min-w-0 flex-col gap-6')}
>
    {@render children?.()}
</form>
