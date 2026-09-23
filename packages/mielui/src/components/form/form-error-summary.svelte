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
        class={cn(className, 'rounded-lg border border-error/30 bg-error/5 p-4 text-sm text-error outline-none focus-visible:ring-2 focus-visible:ring-ring')}
    >
        <div id={`${uid}-heading`} class="font-medium">
            {#if heading}
                {@render heading()}
            {:else}
                Review your details
            {/if}
        </div>
        <div class="mt-2">
            {#if children}
                {@render children(messages)}
            {:else}
                <ul class="list-disc space-y-1 pl-4">
                    {#each messages as issue}
                        <li>
                            {#if issue.controlId}
                                <a
                                    href={`#${encodeURIComponent(issue.controlId)}`}
                                    onclick={() => focusField(issue)}
                                    class="underline underline-offset-4"
                                >
                                    {issue.message}
                                </a>
                            {:else if issue.path?.length}
                                <button
                                    type="button"
                                    class="text-left underline underline-offset-4"
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
