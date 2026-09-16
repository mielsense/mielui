<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { AvatarImageProps } from '.';
    import { getAvatarContext } from './context.svelte';

    let { class: className, src, alt = '', onload, onerror, ...rest }: AvatarImageProps = $props();
    const ctx = getAvatarContext();
    const id = $props.id();
    const source = $derived(JSON.stringify([src, rest.srcset, rest.sizes]));
    let failedSource = $state<string>();
    let element = $state<HTMLImageElement>();

    $effect(() => {
        void source;
        failedSource = undefined;
    });

    $effect(() => {
        void source;
        ctx.loadedImages[id] = Boolean(element?.complete && element.naturalWidth > 0);
        return () => {
            delete ctx.loadedImages[id];
        };
    });
</script>

{#key source}
    {#if src && failedSource !== source}
        <img
            {...rest}
            bind:this={element}
            {src}
            {alt}
            onload={(event) => {
                if (event.currentTarget === element) {
                    ctx.loadedImages[id] = true;
                }
                onload?.(event);
            }}
            onerror={(event) => {
                if (event.currentTarget === element) {
                    failedSource = source;
                    ctx.loadedImages[id] = false;
                }
                onerror?.(event);
            }}
            class={cn(
                className,
                'absolute inset-0 h-full w-full object-cover outline outline-1 -outline-offset-1 outline-[color-mix(in_srgb,var(--color-foreground)_10%,transparent)]'
            )}
        />
    {/if}
{/key}
