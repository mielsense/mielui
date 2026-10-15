<script lang="ts">
    import { ArrowRight01Icon as ChevronRight } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import { DropdownMenu as MenuPrimitive, mergeProps } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { buttonAttributes } from '../_internal/button-attributes';
    import { getDropdownMenuContext } from './context.svelte';

    type SubTriggerProps = {
        /** Additional classes for the element. */
        class?: string;
        /** Content rendered inside. */
        children?: Snippet;
        /** Bindable reference to the DOM element. */
        element?: HTMLButtonElement | HTMLAnchorElement | undefined;
        /** Called when it is clicked or activated. */
        onclick?: (event: MouseEvent) => void;
        /** Called immediately before this trigger opens its submenu. */
        onopen?: () => void;
        /** Inline styles for the element. */
        style?: string;
    } & Pick<HTMLButtonAttributes, 'disabled' | 'id' | 'aria-label'> &
        Partial<Record<`data-${string}`, string | boolean | null>>;

    let {
        class: className,
        children,
        element = $bindable(),
        onopen,
        onclick,
        ...rest
    }: SubTriggerProps = $props();

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

<MenuPrimitive.SubTrigger id={rest.id ?? undefined} disabled={rest.disabled ?? undefined} {onclick}>
    {#snippet child({ props })}
        <Button
            {...buttonAttributes(mergeProps(rest, { ...(props as HTMLButtonAttributes) }))}
            bind:element
            role="menuitem"
            aria-haspopup="menu"
            data-collection-item
            class={cn(className, 'mielui-menu-item')}
            unstyled
        >
            <span class="min-w-0 flex-1 text-start">{@render children?.()}</span>
            <HugeiconsIcon
                icon={ChevronRight}
                class="ms-2 shrink-0 text-foreground-muted rtl:rotate-180"
                size={16}
            />
        </Button>
    {/snippet}
</MenuPrimitive.SubTrigger>
