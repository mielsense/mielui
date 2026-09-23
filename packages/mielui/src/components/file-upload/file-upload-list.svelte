<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { flip } from 'svelte/animate';
    import { cubicOut } from 'svelte/easing';
    import type { FileUploadListProps } from '.';
    import { getRoot } from './context.svelte';
    import Item from './file-upload-item.svelte';

    let { children, class: className, ...rest }: FileUploadListProps = $props();
    const root = getRoot();
</script>
{#if root.summary.total}
    <ul
        {...rest}
        aria-label="Uploads"
        data-ui="file-upload-list"
        class={cn(className, 'flex min-w-0 flex-col gap-2')}
    >
        {#each root.summary.items as item (item.id)}
            <li class="min-w-0" animate:flip={{ duration: root.duration * 1000, easing: cubicOut }}>
                {#if children}
                    {@render children(item)}
                {:else}
                    <Item {item} />
                {/if}
            </li>
        {/each}
    </ul>
{/if}
