<script lang="ts">
    import { themedSlide } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { tick } from 'svelte';
    import type { FormErrorSummaryProps, FormIssue } from '.';
    import { getOptionalFormContext } from './context.svelte';

    let {
        issues = [],
        focusOnError = true,
        heading,
        children,
        element = $bindable(),
        class: className,
        ...rest
    }: FormErrorSummaryProps = $props();
    const uid = $props.id();
    const form = getOptionalFormContext();
    let focusedSubmission = 0;

    function focusField(issue: FormIssue) {
        const owner = element?.closest('form');
        if (!owner) {
            return;
        }
        const name = issue.path?.reduce<string>((name, part) => {
            if (typeof part === 'number') {
                return `${name}[${part}]`;
            }
            return name ? `${name}.${part}` : part;
        }, '');
        const target = Array.from(owner.elements).find((control) => {
            if (!(control instanceof HTMLElement)) {
                return false;
            }
            return issue.controlId
                ? control.id === issue.controlId
                : control.getAttribute('name') === name;
        });
        if (target instanceof HTMLElement) {
            target.focus();
        }
    }

    $effect(() => {
        const submission = form?.submissions ?? 0;
        if (
            !focusOnError ||
            !submission ||
            form?.pending ||
            messages.length === 0 ||
            submission === focusedSubmission
        ) {
            return;
        }
        let cancelled = false;
        void tick().then(() => {
            if (!cancelled && element && !form?.pending) {
                focusedSubmission = submission;
                element.focus();
            }
        });
        return () => {
            cancelled = true;
        };
    });
    const messages = $derived(issues.filter((issue) => issue.message.trim().length > 0));
</script>

{#if messages.length > 0}
    <div
        transition:themedSlide={{ durationVar: '--motion-duration-press', fallback: 160 }}
        aria-hidden={messages.length === 0 ? true : undefined}
        tabindex="-1"
        aria-labelledby={`${uid}-heading`}
        {...rest}
        bind:this={element}
        data-ui="form-error-summary"
        class={cn(
            className,
            'rounded-[calc(var(--radius-xl)*var(--mielui-squircle,1))] [corner-shape:squircle] border-[length:var(--border-size)] border-border bg-card px-4 py-3 text-sm text-foreground-muted shadow-[var(--elevation-1)] outline-none focus-visible:shadow-[var(--focus-ring),var(--elevation-1)]'
        )}
    >
        <div id={`${uid}-heading`} class="font-medium text-[var(--mielui-error-text)]">
            {#if heading}
                {@render heading()}
            {:else}
                Review your details
            {/if}
        </div>
        <div class="mt-1.5 leading-body">
            {#if children}
                {@render children(messages)}
            {:else}
                <ul class="list-disc space-y-1 ps-4">
                    {#each messages as issue}
                        <li>
                            {#if issue.controlId}
                                <a
                                    href={`#${encodeURIComponent(issue.controlId)}`}
                                    onclick={() => focusField(issue)}
                                    class="rounded-[var(--radius-sm)] text-foreground underline decoration-[var(--color-border-strong)] underline-offset-4 outline-none transition-[text-decoration-color] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] hover:decoration-current focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none"
                                >
                                    {issue.message}
                                </a>
                            {:else if issue.path?.length}
                                <button
                                    type="button"
                                    class="text-start rounded-[var(--radius-sm)] text-foreground underline decoration-[var(--color-border-strong)] underline-offset-4 outline-none transition-[text-decoration-color] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] hover:decoration-current focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none"
                                    onclick={() => focusField(issue)}
                                >
                                    {issue.message}
                                </button>
                            {:else}
                                {issue.message}
                            {/if}
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
    </div>
{/if}
