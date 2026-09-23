import { onDestroy } from 'svelte';
import type { FileUploadEntry, FileUploadProps } from '.';

type Options = {
    disabled: () => boolean;
    onUpload: () => FileUploadProps['onUpload'];
    constraints: () => Pick<FileUploadProps, 'accept' | 'maxSize' | 'maxFiles'>;
};

export function createFileUploadController(options: Options) {
    let items = $state<FileUploadEntry[]>([]);
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
        if (!item || options.disabled() || requests.has(id)) {
            return;
        }
        const controller = new AbortController();
        requests.set(id, controller);
        update(id, { status: 'uploading', progress: undefined, error: undefined });
        try {
            await options.onUpload()(item.file, {
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
        if (options.disabled()) {
            return;
        }
        const { accept, maxSize, maxFiles } = options.constraints();
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
    function remove(id: string) {
        if (options.disabled()) {
            return;
        }
        requests.get(id)?.abort();
        requests.delete(id);
        items = items.filter((item) => item.id !== id);
    }

    function retry(id: string) {
        if (items.find((item) => item.id === id)?.retryable) {
            void upload(id);
        }
    }

    onDestroy(() => {
        for (const controller of requests.values()) {
            controller.abort();
        }
        requests.clear();
    });

    return {
        get summary() {
            return summary;
        },
        add,
        remove,
        retry
    };
}
