<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { untrack } from 'svelte';
    import type { CardFooterProps } from '.';
    import { type CardFooterSlot, findCardContext } from './context.svelte';

    let { children, class: className, ...rest }: CardFooterProps = $props();

    const card = findCardContext();
    const inInsetChrome = $derived(card?.variant === 'inset');

    const footerSlot = $state<CardFooterSlot>({
        get children() {
            return children;
        },
        get className() {
            return className;
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
        class={cn(
            className,
            'mt-6 flex w-full flex-row flex-wrap items-center justify-end gap-2 [[data-ui=card-header]+&]:mt-0'
        )}
    >
        {@render children?.()}
    </div>
{/if}
