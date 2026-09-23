<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FileUploadPartProps } from '.';
    import { getItem } from './context.svelte';

    let { children, class: className, ...rest }: FileUploadPartProps = $props();
    const item = getItem();
    const size = $derived(
        item().file.size < 1024 * 1024
            ? `${Math.ceil(item().file.size / 1024)} KB`
            : `${(item().file.size / 1024 / 1024).toFixed(1)} MB`
    );
</script>
<div
    {...rest}
    data-ui="file-upload-details"
    class={cn(className, 'flex min-w-0 items-baseline gap-3 text-sm')}
>
    {#if children}
        {@render children()}
    {:else}
        <span class="min-w-0 flex-1 truncate font-medium" title={item().file.name}>
            {item().file.name}
        </span>
        <span class="shrink-0 text-xs tabular-nums text-foreground-muted">{size}</span>
    {/if}
</div>
