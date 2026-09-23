<script lang="ts">
    import { motion } from '@humanspeak/svelte-motion';
    import { cn } from '@mielui/svelte/utils';
    import type { FileUploadPartProps } from '.';
    import { getItem, getRoot } from './context.svelte';

    let { children, class: className, ...rest }: FileUploadPartProps = $props();
    const item = getItem();
    const root = getRoot();
</script>
{#if item().status === 'uploading'}
    <div
        {...rest}
        data-ui="file-upload-progress"
        role="progressbar"
        aria-label={`Uploading ${item().file.name}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={item().progress}
        class={cn(className, 'h-1 overflow-hidden rounded-full bg-secondary')}
    >
        {#if children}
            {@render children()}
        {:else}
            <motion.div
                class="h-full origin-left rounded-full bg-primary"
                initial={false}
                animate={{ scaleX: (item().progress ?? 0) / 100 }}
                transition={{ duration: root.duration }}
            />
        {/if}
    </div>
{/if}
