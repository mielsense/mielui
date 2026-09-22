<script lang="ts">
    import { Upload04Icon } from '@hugeicons/core-free-icons';
    import { motion } from '@humanspeak/svelte-motion';
    import { cn } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { FileUploadPartProps } from '.';
    import { getRoot } from './context.svelte';
    import Trigger from './file-upload-trigger.svelte';

    let { children, class: className, ...rest }: FileUploadPartProps = $props();
    const root = getRoot();
</script>
<motion.div
    {...rest}
    style={rest.style ?? undefined}
    layout
    transition={{ duration: root.duration }}
    data-ui="file-upload-dropzone"
    data-dragging={root.dragging || undefined}
    class={cn(className, 'flex flex-col items-center justify-center gap-3 rounded-[var(--radius-xl)] border border-dashed border-border bg-card px-6 text-center data-[dragging]:border-primary data-[dragging]:bg-primary/5')}
    animate={{ paddingTop: root.summary.total ? 16 : 32, paddingBottom: root.summary.total ? 16 : 32 }}
>
    {#if children}
        {@render children()}
    {:else}
        {#if root.summary.total === 0}
            <HugeiconsIcon icon={Upload04Icon} size={24} class="text-foreground-muted" />
            <div class="flex flex-col gap-1">
                <p class="text-sm font-medium">Drop your files here</p>
                <p class="text-sm text-foreground-muted">Or choose them from your device.</p>
            </div>
        {/if}
        <Trigger>{root.summary.total ? 'Add more files' : 'Choose files'}</Trigger>
    {/if}
</motion.div>
