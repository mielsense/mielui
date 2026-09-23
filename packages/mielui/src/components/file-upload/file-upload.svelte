<script lang="ts">
    import { useReducedMotion } from '@humanspeak/svelte-motion';
    import { getCssDuration } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { onDestroy } from 'svelte';
    import type { FileUploadEntry, FileUploadProps } from '.';
    import { setRoot } from './context.svelte';
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
    let items = $state<FileUploadEntry[]>([]);
    let dragging = $state(false);
    let depth = 0;
    let input: HTMLInputElement;
    let element: HTMLDivElement;
    let duration = $state(0.24);
    const reduced = useReducedMotion();
    const requests = new Map<string, AbortController>();
    const summary = $derived({
        items,
        total: items.length,
        uploading: items.filter((item) => item.status === 'uploading').length,
        complete: items.filter((item) => item.status === 'complete').length
    });
    function update(id: string, patch: Partial<FileUploadEntry>) {
        items = items.map((item) => (item.id === id ? { ...item, ...patch } : item));
    }
    async function upload(id: string) {
        const item = items.find((item) => item.id === id);
        if (!item || disabled || requests.has(id)) {
            return;
        }
        const controller = new AbortController();
        requests.set(id, controller);
        update(id, { status: 'uploading', progress: undefined, error: undefined });
        try {
            await onUpload(item.file, {
                signal: controller.signal,
                onProgress(percent) {
                    if (
                        !controller.signal.aborted &&
                        requests.get(id) === controller &&
                        Number.isFinite(percent)
                    ) {
                        update(id, { progress: Math.max(0, Math.min(100, percent)) });
                    }
                }
            });
            if (!controller.signal.aborted) {
                update(id, { status: 'complete', progress: 100 });
            }
        } catch (error) {
            if (!controller.signal.aborted) {
                update(id, {
                    status: 'error',
                    error: error instanceof Error ? error.message : 'Upload failed. Try again.'
                });
            }
        } finally {
            if (requests.get(id) === controller) {
                requests.delete(id);
            }
        }
    }
    function add(incoming: FileList) {
        if (disabled) {
            return;
        }
        duration = getCssDuration(element, '--motion-duration-panel', 240) / 1000;
        const rules =
            accept
                ?.toLowerCase()
                .split(',')
                .map((rule) => rule.trim())
                .filter(Boolean) ?? [];
        for (const file of incoming) {
            let error: string | undefined;
            const matches =
                rules.length === 0 ||
                rules.some((rule) =>
                    rule.startsWith('.')
                        ? file.name.toLowerCase().endsWith(rule)
                        : rule.endsWith('/*')
                          ? file.type.toLowerCase().startsWith(rule.slice(0, -1))
                          : file.type.toLowerCase() === rule
                );
            if (!matches) {
                error = 'This file type is not accepted.';
            } else if (maxSize !== undefined && file.size > maxSize) {
                error = `File exceeds the ${(maxSize / 1024 / 1024).toLocaleString()} MB limit.`;
            } else if (
                items.some(
                    (item) =>
                        item.retryable &&
                        item.file.name === file.name &&
                        item.file.size === file.size &&
                        item.file.lastModified === file.lastModified
                )
            ) {
                error = 'This file has already been selected.';
            } else if (
                maxFiles !== undefined &&
                items.filter((item) => item.retryable).length >= maxFiles
            ) {
                error = `Choose up to ${maxFiles} files.`;
            }
            const id = crypto.randomUUID();
            items = [
                ...items,
                { id, file, status: error ? 'error' : 'uploading', error, retryable: !error }
            ];
            if (!error) {
                void upload(id);
            }
        }
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
        remove(id) {
            if (disabled) {
                return;
            }
            requests.get(id)?.abort();
            requests.delete(id);
            items = items.filter((item) => item.id !== id);
        },
        retry(id) {
            if (items.find((item) => item.id === id)?.retryable) {
                void upload(id);
            }
        }
    });
    $effect(() => {
        if (disabled) {
            dragging = false;
            depth = 0;
        }
    });
    onDestroy(() => {
        for (const controller of requests.values()) {
            controller.abort();
        }
        requests.clear();
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
