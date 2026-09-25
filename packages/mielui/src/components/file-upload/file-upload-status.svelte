<script lang="ts">
    import { AlertCircleIcon, CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
    import { motion } from '@humanspeak/svelte-motion';
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Spinner } from '@mielui/svelte/components/spinner';
    import { cn } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { FileUploadPartProps } from '.';
    import { getItem, getRoot } from './context.svelte';

    let { children, class: className, ...rest }: FileUploadPartProps = $props();
    const item = getItem();
    const root = getRoot();
</script>
<div
    {...rest}
    role="status"
    aria-live="polite"
    data-ui="file-upload-status"
    class={cn(className, 'text-xs', item().status === 'error' ? 'text-error' : item().status === 'complete' ? 'text-success' : 'text-foreground-muted')}
>
    {#if children}
        {@render children()}
    {:else}
        {#key item().status}
            <motion.div
                class="flex items-center gap-1.5"
                initial={{ opacity: 0, y: root.duration ? 3 : 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: root.duration }}
            >
                {#if item().status === 'complete'}
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} />
                    <span>Uploaded</span>
                {:else if item().status === 'error'}
                    <HugeiconsIcon icon={AlertCircleIcon} size={14} class="shrink-0" />
                    <span class="break-words">{item().error}</span>
                {:else}
                    <Spinner size={14} />
                    <span>
                        Uploading
                        {#if item().progress === undefined}
                            …
                        {:else}
                            <span use:numberShuffle={{ value: Math.round(item().progress ?? 0) }}>
                                {Math.round(item().progress ?? 0)}
                            </span>
                            %
                        {/if}
                    </span>
                {/if}
            </motion.div>
        {/key}
    {/if}
</div>
