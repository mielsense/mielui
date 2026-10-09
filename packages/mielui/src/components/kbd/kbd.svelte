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
        'hidden min-h-5 min-w-5 shrink-0 select-none items-center justify-center rounded-[calc(var(--radius-sm)*0.625)] border-[length:var(--border-size)] border-border bg-card shadow-[var(--elevation-control-edge)] px-1 align-middle font-mono text-[length:var(--font-size-meta)] font-medium leading-none text-foreground-muted sm:inline-flex',
        '[[data-variant=primary]_&]:border-transparent [[data-variant=primary]_&]:bg-[color-mix(in_oklab,var(--color-on-primary)_14%,transparent)] [[data-variant=primary]_&]:text-[var(--color-on-primary)] [[data-variant=primary]_&]:shadow-none',
        '[[data-variant=destructive]_&]:border-transparent [[data-variant=destructive]_&]:bg-[color-mix(in_oklab,currentColor_14%,transparent)] [[data-variant=destructive]_&]:text-current [[data-variant=destructive]_&]:shadow-none',
        '[.mielui-tooltip_&]:border-transparent [.mielui-tooltip_&]:bg-[color-mix(in_oklab,var(--color-tooltip-foreground)_16%,transparent)] [.mielui-tooltip_&]:text-[var(--color-tooltip-foreground)] [.mielui-tooltip_&]:shadow-none'
    )}
>
    {#if children}
        {@render children()}
    {:else}
        {caps.join('')}
    {/if}
</kbd>
