<script lang="ts">
    import { FileDiffIcon } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { FileDiffFilenameProps } from '.';
    import { findFileDiffContext } from './context';

    let { class: className, file, ...rest }: FileDiffFilenameProps = $props();

    const context = findFileDiffContext();
    const resolvedFile = $derived(file ?? context?.file ?? '');
</script>

<span
    data-ui="file-diff-filename"
    class={cn(className, 'flex min-w-0 flex-1 items-center gap-2')}
    {...rest}
>
    <HugeiconsIcon
        icon={FileDiffIcon}
        size={14}
        class="shrink-0 text-foreground-muted"
        aria-hidden="true"
    />
    <span
        class="min-w-0 flex-1 truncate font-mono text-[length:var(--font-size-label)] font-medium text-foreground"
    >
        {resolvedFile}
    </span>
</span>
