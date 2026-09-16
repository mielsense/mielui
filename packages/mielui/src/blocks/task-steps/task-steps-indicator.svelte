<script lang="ts">
    import { Spinner } from '@mielui/svelte/components/spinner';
    import { cn } from '@mielui/svelte/utils';
    import type { TaskStepsIndicatorProps } from '.';
    import { getTaskStep } from './context.svelte';

    let { status: statusProp, class: className, ...rest }: TaskStepsIndicatorProps = $props();
    const item = getTaskStep();
    const status = $derived(statusProp ?? item.status);
</script>
<span
    {...rest}
    data-ui="task-steps-indicator"
    class={cn(className, 'relative grid size-4 shrink-0 place-items-center')}
    aria-hidden="true"
>
    {#key status}
        {#if status === 'done'}
            <span
                class="mielui-task-mark grid size-4 place-items-center rounded-[var(--radius-sm)] bg-[color-mix(in_srgb,var(--color-success)_14%,transparent)] text-[var(--color-success)]"
            >
                <svg viewBox="0 0 12 12" class="size-3" fill="none">
                    <path
                        d="M2.4 6.2 4.8 8.5 9.6 3.5"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </span>
        {:else if status === 'error'}
            <span
                class="mielui-task-mark grid size-4 place-items-center rounded-[var(--radius-sm)] bg-[color-mix(in_srgb,var(--color-error)_13%,transparent)] text-[var(--color-error)]"
            >
                <svg viewBox="0 0 12 12" class="size-3" fill="none">
                    <path
                        d="M3 3l6 6M9 3 3 9"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linecap="round"
                    />
                </svg>
            </span>
        {:else if status === 'active'}
            <Spinner size={12} aria-hidden="true" class="text-foreground-muted" />
        {:else}
            <span class="size-1 rounded-[var(--radius-xs)] bg-border-strong"></span>
        {/if}
    {/key}
</span>
<style>
    .mielui-task-mark {
        animation: mielui-task-mark-in var(--motion-duration-panel) var(--ease-out) both;
    }

    @keyframes mielui-task-mark-in {
        from {
            opacity: 0;
            scale: 0.95;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .mielui-task-mark {
            animation: none;
        }
    }
</style>
