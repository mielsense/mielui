<script lang="ts">
    import {
        AlertCircleIcon as CircleAlert,
        CheckmarkCircle02Icon as CircleCheck,
        File01Icon as FileText,
        Cancel01Icon as X
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { Spinner } from '@mielui/svelte/components/spinner';
    import { cn } from '@mielui/svelte/utils';
    import { getContext } from 'svelte';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { AttachmentItemProps, AttachmentLabels } from '.';
    import { fileExtension, fileIcon } from './file-icon';
    import { formatBytes } from './validation';

    let {
        file,
        variant = 'card',
        status = 'ready',
        progress,
        error,
        onRemove,
        removable = true,
        class: className,
        ...rest
    }: AttachmentItemProps = $props();
    const labels = getContext<(() => AttachmentLabels | undefined) | undefined>(
        'attachment-labels'
    );

    const safeProgress = $derived(
        typeof progress === 'number' && Number.isFinite(progress)
            ? Math.min(100, Math.max(0, progress))
            : undefined
    );
    const preview = $derived.by(() => {
        const previewFile = file;
        return (node: HTMLImageElement) => {
            const url = URL.createObjectURL(previewFile);
            node.src = url;
            return () => URL.revokeObjectURL(url);
        };
    });
    const extension = $derived(fileExtension(file).toUpperCase().slice(0, 4) || 'FILE');
    const isImage = $derived(file.type.startsWith('image/'));
    const icon = $derived(fileIcon(file));
    const statusText = $derived(
        status === 'complete'
            ? (labels?.()?.complete ?? 'Complete')
            : status === 'error'
              ? error || (labels?.()?.failed ?? 'Attachment failed')
              : (labels?.()?.ready ?? 'Ready')
    );
    const progressLabel = $derived(
        labels?.()?.uploadProgress?.(file.name) ?? `Upload progress for ${file.name}`
    );
    const removeLabel = $derived(labels?.()?.remove?.(file.name) ?? `Remove ${file.name}`);
</script>

{#if variant === 'chip'}
    <div
        {...rest}
        data-ui="attachment-item"
        data-variant="chip"
        data-state={status}
        title={status === 'error' ? statusText : file.name}
        class={cn(
            className,
            'inline-flex h-[var(--size-control-sm)] max-w-60 min-w-0 shrink-0 items-center gap-1.5 rounded-[var(--radius-control)] border-[length:var(--border-size)] border-border bg-card ps-1 [font-size:var(--font-size-label)] font-label leading-label text-foreground transition-[border-color] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none data-[state=error]:border-[color-mix(in_srgb,var(--color-error)_60%,transparent)]',
            removable && onRemove ? 'pe-0.5' : 'pe-3'
        )}
    >
        <span
            aria-hidden="true"
            class="grid size-5.5 shrink-0 place-items-center overflow-hidden rounded-[calc(var(--radius-control)-var(--spacing))] text-foreground-muted"
        >
            {#if status === 'uploading'}
                <Spinner size={14} aria-hidden="true" />
            {:else if status === 'error'}
                <HugeiconsIcon
                    icon={CircleAlert}
                    size={15}
                    strokeWidth={1.75}
                    class="text-[var(--mielui-error-text)]"
                />
            {:else if isImage}
                <img
                    {@attach preview}
                    alt=""
                    draggable="false"
                    class="size-full rounded-[inherit] object-cover"
                />
            {:else}
                <HugeiconsIcon {icon} size={15} strokeWidth={1.75} />
            {/if}
        </span>

        <span class="min-w-0 truncate">{file.name}</span>

        {#if status === 'uploading'}
            <span
                data-ui="attachment-progress"
                role="progressbar"
                aria-label={progressLabel}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={safeProgress}
                class="sr-only"
            ></span>
        {:else}
            <span role={status === 'error' ? 'alert' : 'status'} class="sr-only">
                {statusText}
            </span>
        {/if}

        {#if removable && onRemove}
            <Button
                type="button"
                variant="ghost"
                size="icon"
                data-ui="attachment-remove"
                aria-label={removeLabel}
                onclick={() => onRemove(file)}
                class="size-6 min-w-6 shrink-0 text-foreground-muted hover:text-foreground"
            >
                <HugeiconsIcon icon={X} size={13} strokeWidth={2} aria-hidden="true" />
            </Button>
        {/if}
    </div>
{:else}
    <div
        {...rest}
        data-ui="attachment-item"
        data-state={status}
        class={cn(
            className,
            'flex min-w-0 items-center gap-3 rounded-[var(--radius-lg)] border-[length:var(--border-size)] border-border bg-card p-1.5 pe-2 text-foreground shadow-[var(--elevation-1)] transition-[border-color] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none data-[state=error]:border-[color-mix(in_srgb,var(--color-error)_60%,transparent)]'
        )}
    >
        <div
            class="relative grid size-[var(--size-touch)] shrink-0 place-items-center overflow-hidden rounded-[var(--radius-sm)] bg-background text-foreground-muted ring-1 ring-inset ring-border"
        >
            {#if isImage && status !== 'error'}
                <img {@attach preview} alt="" draggable="false" class="size-full object-cover" />
            {:else}
                <HugeiconsIcon
                    icon={FileText}
                    size={18}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    class="-translate-y-1.5"
                />
                <span
                    class="absolute inset-x-0 bottom-0 truncate px-1 pb-1 text-center font-mono [font-size:var(--font-size-meta)] [font-weight:var(--font-weight-label)] leading-none text-foreground-muted"
                >
                    {extension}
                </span>
            {/if}
        </div>

        <div class={cn('flex min-w-0 flex-1 flex-col', status === 'uploading' ? 'gap-2' : 'gap-1')}>
            <div class="flex min-w-0 items-baseline gap-2">
                <span
                    class="min-w-0 flex-1 truncate [font-size:var(--font-size-label)] font-label"
                    title={file.name}
                >
                    {file.name}
                </span>
                <span
                    class="flex shrink-0 items-center gap-1 text-xs tabular-nums text-foreground-muted"
                >
                    {formatBytes(file.size)}
                    {#if status === 'uploading'}
                        <Spinner size={14} aria-hidden="true" />
                    {/if}
                </span>
            </div>

            {#if status !== 'uploading'}
                <div
                    role={status === 'error' ? 'alert' : 'status'}
                    class={cn(
                        'flex min-w-0 items-center gap-1 text-xs',
                        status === 'error'
                            ? 'text-[var(--mielui-error-text)]'
                            : status === 'complete'
                              ? 'text-[var(--mielui-success-text)]'
                              : 'text-foreground-muted'
                    )}
                >
                    {#if status === 'complete'}
                        <HugeiconsIcon
                            icon={CircleCheck}
                            size={12}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    {:else if status === 'error'}
                        <HugeiconsIcon
                            icon={CircleAlert}
                            size={12}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    {/if}
                    <span class="min-w-0 break-words">{statusText}</span>
                </div>
            {/if}

            {#if status === 'uploading'}
                <div
                    data-ui="attachment-progress"
                    role="progressbar"
                    aria-label={progressLabel}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={safeProgress}
                    class="h-1 w-full overflow-hidden rounded-full bg-secondary"
                >
                    <div
                        class="h-full rounded-full bg-primary"
                        style:width={safeProgress === undefined ? '33.333%' : `${safeProgress}%`}
                    ></div>
                </div>
            {/if}
        </div>

        {#if removable && onRemove}
            <Button
                type="button"
                variant="ghost"
                size="icon"
                data-ui="attachment-remove"
                aria-label={removeLabel}
                onclick={() => onRemove(file)}
                class="shrink-0 text-foreground-muted hover:text-foreground"
            >
                <HugeiconsIcon icon={X} size={15} strokeWidth={2} aria-hidden="true" />
            </Button>
        {/if}
    </div>
{/if}
