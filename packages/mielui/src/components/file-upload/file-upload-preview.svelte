<script lang="ts">
    import { File01Icon } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { FileUploadPartProps } from '.';
    import { getItem } from './context.svelte';

    let { children, class: className, ...rest }: FileUploadPartProps = $props();
    const item = getItem();
    function preview(node: HTMLImageElement) {
        const url = URL.createObjectURL(item().file);
        node.src = url;
        return () => URL.revokeObjectURL(url);
    }
</script>
<div
    {...rest}
    data-ui="file-upload-preview"
    class={cn(className, 'grid size-12 shrink-0 place-items-center overflow-hidden rounded-[var(--radius-md)] bg-secondary text-foreground-muted')}
>
    {#if children}
        {@render children()}
    {:else if item().retryable && item().file.type.startsWith('image/')}
        <img {@attach preview} alt="" class="size-full object-cover" />
    {:else}
        <HugeiconsIcon icon={File01Icon} size={22} />
    {/if}
</div>
