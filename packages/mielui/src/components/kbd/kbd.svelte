<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { onMount } from 'svelte';
    import type { KbdProps } from '.';
    import { registerShortcut } from './keyboard';
    import { parseShortcut } from './shortcut';

    let { children, class: className, shortcut = '', ontrigger, ...rest }: KbdProps = $props();
    let element: HTMLElement;

    const parsed = $derived(parseShortcut(shortcut));
    const caps = $derived(parsed?.caps ?? []);

    onMount(() =>
        registerShortcut(element, {
            get shortcut() {
                return parsed;
            },
            get ontrigger() {
                return ontrigger;
            }
        })
    );
</script>

<kbd
    bind:this={element}
    aria-label={children ? undefined : parsed?.label}
    {...rest}
    class={cn(
        className,
        'hidden min-h-4 min-w-4 shrink-0 select-none items-center justify-center rounded-[var(--radius-sm)] border-[length:var(--border-size)] border-border bg-card shadow-[var(--elevation-control-edge)] px-1 py-1 align-middle font-sans text-[length:var(--font-size-meta)] font-medium leading-none text-foreground-muted sm:inline-flex',
        '[[data-variant=primary]_&]:border-transparent [[data-variant=primary]_&]:bg-[color-mix(in_oklab,var(--color-on-primary)_18%,transparent)] [[data-variant=primary]_&]:text-[var(--color-on-primary)]',
        '[[data-variant=destructive]_&]:border-transparent [[data-variant=destructive]_&]:bg-[color-mix(in_oklab,currentColor_16%,transparent)] [[data-variant=destructive]_&]:text-current'
    )}
>
    {#if children}
        {@render children()}
    {:else}
        {caps.join('')}
    {/if}
</kbd>
