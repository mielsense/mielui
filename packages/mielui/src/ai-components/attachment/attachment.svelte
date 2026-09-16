<script lang="ts">
    import { Attachment01Icon as Paperclip } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { AttachmentProps } from '.';
    import { setAttachmentContext } from './context.svelte';
    import { validateFiles } from './validation';

    let {
        files = $bindable([]),
        accept,
        multiple = true,
        maxFiles,
        maxSize,
        disabled = false,
        onReject,
        children,
        class: className,
        ondragenter,
        ondragover,
        ondragleave,
        ondrop,
        ...rest
    }: AttachmentProps = $props();

    let input: HTMLInputElement | undefined;
    let dragDepth = 0;
    let dragging = $state(false);

    $effect(() => {
        if (disabled) {
            dragDepth = 0;
            dragging = false;
        }
    });

    function addFiles(incoming: Iterable<File>) {
        if (disabled) {
            return;
        }

        const { accepted, rejections } = validateFiles(incoming, files, {
            accept,
            multiple,
            maxFiles,
            maxSize
        });

        if (accepted.length) {
            files = [...files, ...accepted];
        }
        if (rejections.length) {
            onReject?.(rejections);
        }
    }

    function hasDraggedFiles(event: DragEvent) {
        return Array.from(event.dataTransfer?.types ?? []).includes('Files');
    }

    setAttachmentContext({
        get files() {
            return files;
        },
        set files(next: File[]) {
            files = next;
        },
        get disabled() {
            return disabled;
        },
        open() {
            if (!disabled) {
                input?.click();
            }
        },
        remove(file: File) {
            if (!disabled) {
                files = files.filter((candidate) => candidate !== file);
            }
        }
    });
</script>

<div
    {...rest}
    data-ui="attachment"
    data-state={dragging ? 'dragging' : 'idle'}
    data-disabled={disabled || undefined}
    ondragenter={(event) => {
        ondragenter?.(event);
        if (event.defaultPrevented || !hasDraggedFiles(event)) {
            return;
        }
        event.preventDefault();
        if (!disabled) {
            dragDepth += 1;
            dragging = true;
        }
    }}
    ondragover={(event) => {
        ondragover?.(event);
        if (event.defaultPrevented || !hasDraggedFiles(event)) {
            return;
        }
        event.preventDefault();
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = disabled ? 'none' : 'copy';
        }
    }}
    ondragleave={(event) => {
        ondragleave?.(event);
        if (disabled || !dragging) {
            return;
        }
        dragDepth = Math.max(0, dragDepth - 1);
        if (dragDepth === 0) {
            dragging = false;
        }
    }}
    ondrop={(event) => {
        ondrop?.(event);
        const hasFiles = hasDraggedFiles(event);
        const handled = event.defaultPrevented;
        event.preventDefault();
        dragDepth = 0;
        dragging = false;
        if (!handled && hasFiles && !disabled && event.dataTransfer) {
            addFiles(event.dataTransfer.files);
        }
    }}
    class={cn(className, 'relative min-w-0')}
>
    <input
        bind:this={input}
        class="hidden"
        type="file"
        tabindex={-1}
        {accept}
        {multiple}
        {disabled}
        onchange={(event) => {
            if (event.currentTarget.files) {
                addFiles(event.currentTarget.files);
            }
            event.currentTarget.value = '';
        }}
    />

    {@render children?.()}

    {#if dragging}
        <div
            data-ui="attachment-drop-overlay"
            data-state="dragging"
            aria-hidden="true"
            class="pointer-events-none absolute inset-1 z-10 grid place-items-center rounded-[var(--radius-lg)] border-2 border-dashed border-primary/60 bg-[color-mix(in_srgb,var(--color-primary)_10%,var(--color-card))] text-primary shadow-[var(--elevation-1)]"
        >
            <span
                class="flex items-center gap-2 rounded-full bg-card/90 px-3 py-1.5 text-sm font-label shadow-[var(--elevation-control)]"
            >
                <HugeiconsIcon icon={Paperclip} size={16} strokeWidth={2} />
                Drop files to attach
            </span>
        </div>
    {/if}
</div>
