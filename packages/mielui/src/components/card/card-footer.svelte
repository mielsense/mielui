<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { untrack } from 'svelte';
    import type { CardFooterProps } from '.';
    import { type CardFooterSlot, getCardContext } from './context.svelte';

    let { children, class: classProp, ...rest }: CardFooterProps = $props();

    function readCardContext() {
        try {
            return getCardContext();
        } catch {
            return undefined;
        }
    }
    const card = readCardContext();
    const inInsetChrome = $derived(card?.variant === 'inset');

    const footerSlot = $state<CardFooterSlot>({
        get children() {
            return children;
        },
        get className() {
            return classProp;
        },
        get rest() {
            return rest;
        }
    });

    function registerFooter() {
        if (!card) {
            return;
        }
        if (card.footerSlot && card.footerSlot !== footerSlot) {
            throw new Error(
                'An inset Card supports one Card.Footer. Combine footer content inside that part.'
            );
        }
        card.footerSlot = footerSlot;
    }

    if (untrack(() => card?.variant === 'inset')) {
        untrack(registerFooter);
    }

    $effect(() => {
        if (!card || !inInsetChrome) {
            return;
        }
        untrack(registerFooter);
        return () => {
            untrack(() => {
                if (card.footerSlot === footerSlot) {
                    card.footerSlot = undefined;
                }
            });
        };
    });
</script>

{#if !inInsetChrome}
    <div
        {...rest}
        data-ui="card-footer"
        class={cn(classProp, `w-full flex items-center flex-row mt-6 justify-end gap-2`)}
    >
        {@render children?.()}
    </div>
{/if}
