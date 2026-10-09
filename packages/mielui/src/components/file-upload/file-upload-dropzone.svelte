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
    transition={{ duration: root.duration }}
    data-ui="file-upload-dropzone"
    data-dragging={root.dragging || undefined}
    class={cn(
        className,
        'flex flex-col items-center justify-center gap-3 rounded-[var(--radius-xl)] border-[length:var(--border-size)] border-dashed border-[var(--color-border-strong)] bg-background px-6 text-center transition-[border-color] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none data-[dragging]:border-primary data-[dragging]:bg-[image:linear-gradient(var(--color-wash),var(--color-wash))]'
    )}
    animate={{ paddingTop: root.summary.total ? 16 : 32, paddingBottom: root.summary.total ? 16 : 32 }}
>
    {#if children}
        {@render children()}
    {:else}
        {#if root.summary.total === 0}
            <HugeiconsIcon icon={Upload04Icon} size={20} class="text-foreground-muted" />
            <div class="flex flex-wrap items-baseline justify-center gap-x-1.5 gap-y-0.5">
                <p class="text-sm font-medium text-foreground">
                    {root.labels?.dropzoneTitle ?? 'Drop your files here'}
                </p>
                <p class="text-sm text-foreground-muted">
                    {root.labels?.dropzoneDescription ?? 'Or choose them from your device.'}
                </p>
            </div>
        {/if}
        <Trigger variant="outline" size="sm">
            {root.summary.total
                ? (root.labels?.addMore ?? 'Add more files')
                : (root.labels?.choose ?? 'Choose files')}
        </Trigger>
    {/if}
</motion.div>
