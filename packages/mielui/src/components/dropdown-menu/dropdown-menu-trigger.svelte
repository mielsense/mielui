<script lang="ts">
    import type { ButtonVariant } from '@mielui/svelte/components/button';
    import { Button } from '@mielui/svelte/components/button';
    import type * as Popover from '@mielui/svelte/components/popover';
    import { DropdownMenu as MenuPrimitive, mergeProps } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import { getDropdownMenuContext } from './context.svelte';

    type Props = {
        children: Snippet;
        class?: string;
        variant?: ButtonVariant;
    } & Omit<Popover.PopoverTriggerProps, 'children' | 'class' | 'variant'>;

    let { children, class: className, variant, onopen, onclick, ...rest }: Props = $props();
    const menu = getDropdownMenuContext();
    $effect(() => {
        const beforeOpen = onopen;
        menu.beforeOpen = beforeOpen;
        return () => {
            if (menu.beforeOpen === beforeOpen) {
                menu.beforeOpen = undefined;
            }
        };
    });
</script>

<MenuPrimitive.Trigger id={rest.id ?? undefined} disabled={rest.disabled} {onclick}>
    {#snippet child({ props })}
        <Button {...mergeProps(rest, props)} class={className} {variant}>
            {@render children?.()}
        </Button>
    {/snippet}
</MenuPrimitive.Trigger>
