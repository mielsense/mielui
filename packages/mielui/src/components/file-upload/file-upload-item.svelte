<script lang="ts">
    import { motion } from '@humanspeak/svelte-motion';
    import { cn } from '@mielui/svelte/utils';
    import type { FileUploadItemProps } from '.';
    import { getRoot, setItem } from './context.svelte';
    import Details from './file-upload-details.svelte';
    import Preview from './file-upload-preview.svelte';
    import Progress from './file-upload-progress.svelte';
    import Remove from './file-upload-remove.svelte';
    import Retry from './file-upload-retry.svelte';
    import Status from './file-upload-status.svelte';

    let { item, children, class: className, ...rest }: FileUploadItemProps = $props();
    const root = getRoot();
    setItem(() => item);
</script>
<motion.div
    {...rest}
    layout
    initial={{ opacity: 0, y: root.duration ? 8 : 0 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: root.duration }}
    data-ui="file-upload-item"
    data-state={item.status}
    class={cn(className, 'flex min-w-0 items-center gap-3 rounded-[var(--radius-xl)] border border-border bg-card p-3 data-[state=error]:border-error/50 data-[state=complete]:border-success/40')}
>
    {#if children}
        {@render children()}
    {:else}
        <Preview />
        <div class="flex min-w-0 flex-1 flex-col gap-2">
            <Details />
            <Progress />
            <Status />
        </div>
        <Retry />
        <Remove />
    {/if}
</motion.div>
