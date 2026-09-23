<script lang="ts">
    import { useReducedMotion } from '@humanspeak/svelte-motion';
    import { getCssDuration } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import type { FileUploadProps } from '.';
    import { setRoot } from './context.svelte';
    import { createFileUploadController } from './controller.svelte';
    import Dropzone from './file-upload-dropzone.svelte';
    import List from './file-upload-list.svelte';

    let {
        accept,
        maxSize,
        maxFiles,
        disabled = false,
        onUpload,
        children,
        class: className,
        ondragenter,
        ondragover,
        ondragleave,
        ondrop,
        ...rest
    }: FileUploadProps = $props();
    let dragging = $state(false);
    let depth = 0;
    let input: HTMLInputElement;
    let element: HTMLDivElement;
    let duration = $state(0.24);
    const reduced = useReducedMotion();
    const controller = createFileUploadController({
        disabled: () => disabled,
        onUpload: () => onUpload,
        constraints: () => ({ accept, maxSize, maxFiles })
    });
    const summary = $derived(controller.summary);

    function add(incoming: FileList) {
        duration = getCssDuration(element, '--motion-duration-panel', 240) / 1000;
        controller.add(incoming);
    }

    setRoot({
        get summary() {
            return summary;
        },
        get disabled() {
            return disabled;
        },
        get dragging() {
            return dragging;
        },
        get duration() {
            return reduced.current ? 0 : duration;
        },
        open() {
            if (!disabled) {
                input?.click();
            }
        },
        remove: controller.remove,
        retry: controller.retry
    });
    $effect(() => {
        if (disabled) {
            dragging = false;
            depth = 0;
        }
    });
    function hasFiles(event: DragEvent) {
        return Array.from(event.dataTransfer?.types ?? []).includes('Files');
    }
</script>
<div
    {...rest}
    bind:this={element}
    data-ui="file-upload"
    data-disabled={disabled || undefined}
    class={cn(className, 'flex min-w-0 flex-col gap-3')}
    ondragenter={(event) => {
        ondragenter?.(event);
        if (event.defaultPrevented || !hasFiles(event)) {
            return;
        }
        event.preventDefault();
        if (!disabled) {
            depth += 1;
            dragging = true;
        }
    }}
    ondragover={(event) => {
        ondragover?.(event);
        if (event.defaultPrevented || !hasFiles(event)) {
            return;
        }
        event.preventDefault();
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = disabled ? 'none' : 'copy';
        }
    }}
    ondragleave={(event) => {
        ondragleave?.(event);
        depth = Math.max(0, depth - 1);
        if (depth === 0) {
            dragging = false;
        }
    }}
    ondrop={(event) => {
        ondrop?.(event);
        const handled = event.defaultPrevented;
        if (!hasFiles(event)) {
            return;
        }
        event.preventDefault();
        dragging = false;
        depth = 0;
        if (!handled && event.dataTransfer) {
            add(event.dataTransfer.files);
        }
    }}
>
    <input
        bind:this={input}
        type="file"
        class="hidden"
        {accept}
        multiple={maxFiles !== 1}
        {disabled}
        onchange={(event) => {
            if (event.currentTarget.files) {
                add(event.currentTarget.files);
            }
            event.currentTarget.value = '';
        }}
    />
    {#if children}
        {@render children(summary)}
    {:else}
        <Dropzone />
        <List />
    {/if}
</div>
