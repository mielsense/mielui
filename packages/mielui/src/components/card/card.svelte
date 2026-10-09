<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { insetLayout } from '../_internal/inset-layout';
    import type { CardProps } from '.';
    import { type CardFooterSlot, setCardContext } from './context.svelte';

    let {
        children,
        class: classProp,
        variant = 'default',
        surface = 'solid',
        ...rest
    }: CardProps = $props();

    const blur =
        'backdrop-blur-[calc(var(--spacing)*7)] backdrop-saturate-150 [@media(prefers-reduced-transparency:reduce)]:backdrop-filter-none';
    const frameGlass = `${blur} supports-[backdrop-filter:blur(0)]:bg-card/60 [@media(prefers-reduced-transparency:reduce)]:bg-card`;
    const insetGlass =
        'supports-[backdrop-filter:blur(0)]:bg-background/70 [@media(prefers-reduced-transparency:reduce)]:bg-background';
    const surfaceGlass = `${blur} supports-[backdrop-filter:blur(0)]:bg-card/70 [@media(prefers-reduced-transparency:reduce)]:bg-card`;
    const glass = $derived(surface === 'glass');
    const card = $state({
        get variant() {
            return variant;
        },
        footerSlot: undefined as CardFooterSlot | undefined
    });
    setCardContext(card);
</script>

{#if variant === 'inset'}
    <div
        use:insetLayout
        data-ui="card"
        data-variant="inset"
        data-surface={surface}
        {...rest}
        class={cn(
            classProp,
            'mielui-modal-frame flex flex-col overflow-hidden shadow-[var(--elevation-1)]',
            glass && frameGlass
        )}
    >
        <div
            data-ui="card-surface"
            class={cn('mielui-inset-surface flex min-h-0 flex-1 flex-col p-6', glass && insetGlass)}
        >
            {@render children?.()}
        </div>
        {#if card.footerSlot}
            <div
                {...card.footerSlot?.rest}
                data-ui="card-footer"
                class={cn(
                    card.footerSlot?.className,
                    'flex w-full flex-row flex-wrap items-center justify-end gap-2 px-1.5 py-1.5'
                )}
            >
                {@render card.footerSlot?.children?.()}
            </div>
        {/if}
    </div>
{:else if variant === 'panel'}
    <div
        data-ui="card"
        data-variant="panel"
        data-surface={surface}
        {...rest}
        class={cn(classProp, 'mielui-card-frame flex flex-col', glass && frameGlass)}
    >
        <div
            data-ui="card-surface"
            class={cn('mielui-card-surface flex min-h-0 flex-1 flex-col p-6', glass && insetGlass)}
        >
            {@render children?.()}
        </div>
    </div>
{:else}
    <div
        data-ui="card"
        data-variant="default"
        data-surface={surface}
        {...rest}
        class={cn(
            classProp,
            'mielui-plate flex flex-col p-6',
            glass && surfaceGlass
        )}
    >
        {@render children?.()}
    </div>
{/if}
