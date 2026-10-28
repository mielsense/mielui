<script lang="ts">
    import { themedSlide } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { tick } from 'svelte';
    import type { FormErrorSummaryProps, FormIssue } from '.';
    import { findFormContext } from './context';

    let {
        issues = [],
        focusOnError = true,
        heading,
        labels,
        children,
        element = $bindable(),
        class: className,
        ...rest
    }: FormErrorSummaryProps = $props();
    const uid = $props.id();
    const form = findFormContext();
    const messages = $derived(issues.filter((issue) => issue.message.trim().length > 0));
    const linkClasses =
        'rounded-[var(--radius-sm)] text-foreground underline decoration-[var(--color-border-strong)] underline-offset-4 outline-none hover:decoration-current focus-visible:shadow-[var(--focus-ring)]';

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
</script>

{#if messages.length > 0}
    <div
        transition:themedSlide={{ durationVar: '--motion-duration-press', fallback: 160 }}
        tabindex="-1"
        aria-labelledby={`${uid}-heading`}
        {...rest}
        bind:this={element}
        data-ui="form-error-summary"
        class={cn(
            className,
            'mielui-plate rounded-[calc(var(--radius-xl)*var(--mielui-squircle,1))] px-4 py-3 text-sm text-foreground-muted outline-none focus-visible:shadow-[var(--focus-ring),var(--elevation-1)]'
        )}
    >
        <div id={`${uid}-heading`} class="font-medium text-[var(--mielui-error-text)]">
            {#if heading}
                {@render heading()}
            {:else}
                {labels?.heading ?? 'Review your details'}
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
                                    class={linkClasses}
                                >
                                    {issue.message}
                                </a>
                            {:else if issue.path?.length}
                                <button
                                    type="button"
                                    class={cn(linkClasses, 'text-start')}
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
