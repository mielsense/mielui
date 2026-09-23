<script lang="ts">
    import { Tick02Icon as Check, Copy01Icon as Copy } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import { cn } from '@mielui/svelte/utils';
    import { onDestroy } from 'svelte';
    import { buttonAttributes } from '../../components/_internal/button-attributes';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { CopyButtonProps } from '.';

    let {
        text,
        label = 'Copy',
        copiedLabel = 'Copied',
        duration = 2000,
        variant = 'ghost',
        size = 'icon',
        class: className,
        children,
        oncopy,
        onclick,
        ...rest
    }: CopyButtonProps = $props();

    let copied = $state(false);
    let timer: ReturnType<typeof setTimeout> | undefined;

    let disposed = false;
    let requestId = 0;

    function fallbackCopy(value: string) {
        if (typeof document === 'undefined' || typeof document.execCommand !== 'function') {
            return false;
        }

        const focused = document.activeElement;
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        try {
            textarea.select();
            return document.execCommand('copy');
        } catch {
            return false;
        } finally {
            textarea.remove();
            if (focused instanceof HTMLElement && focused.isConnected) {
                focused.focus({ preventScroll: true });
            }
        }
    }

    async function copy(event: MouseEvent) {
        onclick?.(event as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
        if (event.defaultPrevented) {
            return;
        }
        const requestedText = text;
        const id = ++requestId;
        let didCopy = false;
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(requestedText);
                didCopy = true;
            } catch {
                if (disposed || id !== requestId) {
                    return;
                }
                didCopy = fallbackCopy(requestedText);
            }
        } else {
            didCopy = fallbackCopy(requestedText);
        }
        if (!didCopy || disposed || id !== requestId) {
            return;
        }

        copied = true;
        clearTimeout(timer);
        timer = setTimeout(() => {
            copied = false;
        }, duration);
        oncopy?.(requestedText);
    }

    onDestroy(() => {
        disposed = true;
        requestId += 1;
        clearTimeout(timer);
    });
</script>

<Tooltip.Root placement="top" delay={125} closeDelay={80}>
    <Tooltip.Trigger showOnClick class={cn(className, '[&_button]:w-full')}>
        <Button
            {...buttonAttributes(rest)}
            type="button"
            {variant}
            {size}
            aria-label={copied ? copiedLabel : label}
            onclick={copy}
        >
            <span class="relative grid size-4 place-items-center">
                <HugeiconsIcon
                    icon={Copy}
                    size={15}
                    class={`col-start-1 row-start-1 transition-[transform,translate,scale,rotate,opacity] [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] motion-reduce:transition-none ${
                        copied ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
                    }`}
                />
                <HugeiconsIcon
                    icon={Check}
                    size={15}
                    class={`col-start-1 row-start-1 text-[var(--color-success)] transition-[transform,translate,scale,rotate,opacity] [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] motion-reduce:transition-none ${
                        copied ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                    }`}
                />
            </span>
            {#if children}
                {@render children()}
            {/if}
        </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>{copied ? copiedLabel : label}</Tooltip.Content>
</Tooltip.Root>
