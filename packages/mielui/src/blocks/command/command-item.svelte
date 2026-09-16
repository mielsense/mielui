<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import { onMount } from 'svelte';
    import { getDialogContext } from '../../components/dialog/context.svelte';
    import type { CommandItem, CommandItemProps } from '.';
    import { getCommandContext } from './context.svelte';

    const controller = getCommandContext();
    const { state: command } = controller;
    const dialog = getDialogContext();
    const localId = $props.id();
    const itemId = `${command.id}-option-${localId}`;

    let {
        children,
        name,
        value,
        class: className,
        callback,
        disabled = false,
        href,
        onclick,
        ...rest
    }: CommandItemProps = $props();

    const resolvedName = $derived(value ?? name ?? '');
    let el = $state<HTMLButtonElement | HTMLAnchorElement | undefined>();
    const item = {
        id: itemId,
        get name() {
            return resolvedName;
        },
        get callback() {
            return callback;
        },
        get ref() {
            return el;
        },
        get disabled() {
            return disabled;
        }
    } satisfies CommandItem;

    onMount(() => {
        return controller.register(item);
    });

    function activate() {
        if (disabled) {
            return;
        }
        dialog.state.open = false;
        callback?.();
        onclick?.();
    }

    const filteredOut = $derived(
        command.searchContent !== '' && !command.results.some((result) => result.id === item.id)
    );
</script>

<Button
    {...rest}
    id={itemId}
    role="option"
    aria-selected={command.activeId === itemId}
    data-collection-item
    data-collection-active={command.activeId === itemId}
    tabindex={-1}
    bind:element={el}
    {disabled}
    {...(href === undefined ? { href: undefined } : { href })}
    hidden={filteredOut}
    onmouseenter={() => {
        if (!disabled && !filteredOut) {
            command.activeId = itemId;
        }
    }}
    onclick={activate}
    class={cn(className, 'mielui-menu-item justify-start gap-2')}
    unstyled
>
    <div class="flex w-full items-center gap-2 text-left">
        {@render children?.()}
    </div>
</Button>
