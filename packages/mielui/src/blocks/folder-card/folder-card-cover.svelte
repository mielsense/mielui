<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FolderCardCoverProps } from '.';
    import { getFolderCard } from './context';

    let { src, alt = '', class: className, children, ...rest }: FolderCardCoverProps = $props();

    const folderCard = getFolderCard();

    const toneClasses = {
        1: '[--folder-card-tone:var(--chart-1)]',
        2: '[--folder-card-tone:var(--chart-2)]',
        3: '[--folder-card-tone:var(--chart-3)]',
        4: '[--folder-card-tone:var(--chart-4)]',
        5: '[--folder-card-tone:var(--chart-5)]'
    } as const;

    const shapeClasses = [
        'relative col-start-1 row-span-2 row-start-1 mb-[calc(var(--folder-card-radius)*-1)] overflow-hidden',
        '[mask-image:linear-gradient(black,black),radial-gradient(circle_farthest-side_at_0_100%,transparent_96%,black)]',
        '[mask-size:100%_calc(100%-var(--folder-card-radius)),var(--folder-card-radius)_var(--folder-card-radius)]',
        '[mask-position:top,bottom_right] [mask-repeat:no-repeat]'
    ];

    const motionClasses =
        'transition-[filter] duration-[var(--motion-duration-hover)] ease-[var(--ease-out)] group-hover/folder-card:brightness-105 motion-reduce:transition-none';
</script>

<div
    data-ui="folder-card-cover"
    {...rest}
    class={cn(
        className,
        shapeClasses,
        toneClasses[folderCard.tone],
        motionClasses,
        'bg-[color-mix(in_oklab,var(--folder-card-tone)_55%,var(--color-card))]'
    )}
>
    {#if src}
        <img {src} {alt} class="absolute inset-0 size-full object-cover" />
    {:else}
        <span
            aria-hidden="true"
            class="absolute inset-0 bg-[radial-gradient(ellipse_at_82%_18%,var(--folder-card-tone),transparent_70%),radial-gradient(ellipse_at_8%_92%,color-mix(in_oklab,var(--folder-card-tone)_35%,var(--color-card)),transparent_60%)]"
        ></span>
    {/if}
    {@render children?.()}
</div>
