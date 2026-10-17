<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import type { ButtonVariant } from '@mielui/svelte/components/button';
    import { Button } from '@mielui/svelte/components/button';
    import type * as Popover from '@mielui/svelte/components/popover';
    import { cn } from '@mielui/svelte/utils';
    import { DropdownMenu as MenuPrimitive, mergeProps } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { buttonAttributes } from '../_internal/button-attributes';
    import { getDropdownMenuContext } from './context';

    type Props = {
        children: Snippet;
        class?: string;
        variant?: ButtonVariant;
    } & Omit<Popover.PopoverTriggerProps, 'children' | 'class' | 'variant'>;

    let {
        children,
        class: className,
        variant,
        icon = false,
        element = $bindable(),
        onopen,
        onclick,
        ...rest
    }: Props = $props();

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
        <Button
            {...buttonAttributes(mergeProps(rest, { ...(props as HTMLButtonAttributes) }))}
            bind:element
            class={className}
            {variant}
        >
            {@render children?.()}
            {#if icon}
                <HugeiconsIcon
                    icon={ChevronDown}
                    aria-hidden="true"
                    class={cn(
                        'shrink-0 text-foreground-muted transition-transform [transition-duration:var(--motion-duration-flick)] ease-[var(--ease-spring-flick)] motion-reduce:transition-none',
                        props['data-state'] === 'open' && 'rotate-180'
                    )}
                />
            {/if}
        </Button>
    {/snippet}
</MenuPrimitive.Trigger>
