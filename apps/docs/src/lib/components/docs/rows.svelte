<script lang="ts" module>
    export type RowItem = {
        label: string;
        value?: string;
        href?: string;
    };
</script>

<script lang="ts">
    import { ArrowRight01Icon as ChevronRight } from '@hugeicons/core-free-icons';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import InlineText from './inline-text.svelte';

    let { items, label }: { items: RowItem[]; label?: string } = $props();
</script>

<!--
    @component
    A soft group of label and value rows. Rows with an `href` become one link each.
-->

<div class="mielui-inset-frame @container">
    <ul
        aria-label={label}
        class="mielui-inset-surface m-0 flex list-none flex-col divide-y-[length:var(--border-size)] divide-[var(--docs-rule,var(--color-border))] overflow-hidden p-0"
    >
        {#each items as item (item.label)}
            <li>
                {#if item.href}
                    <a
                        href={item.href}
                        class="group flex items-center gap-4 px-4 py-3 transition-colors [transition-duration:var(--motion-duration-hover)] hover:bg-[var(--docs-soft)] focus-visible:outline-none focus-visible:shadow-[inset_var(--focus-ring)] motion-reduce:transition-none"
                    >
                        <span
                            class="flex min-w-0 flex-1 flex-col gap-x-6 gap-y-0.5 @lg:flex-row @lg:items-baseline"
                        >
                            <span class="shrink-0 text-sm font-medium text-foreground @lg:w-40">
                                {item.label}
                            </span>
                            {#if item.value}
                                <span class="min-w-0 text-sm leading-6 text-foreground-muted">
                                    {item.value}
                                </span>
                            {/if}
                        </span>
                        <HugeiconsIcon
                            icon={ChevronRight}
                            size={14}
                            aria-hidden="true"
                            class="shrink-0 text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] group-hover:text-foreground motion-reduce:transition-none"
                        />
                    </a>
                {:else}
                    <div
                        class="flex flex-col gap-x-6 gap-y-0.5 px-4 py-3 @lg:flex-row @lg:items-baseline"
                    >
                        <span class="shrink-0 text-sm text-foreground-muted @lg:w-40">
                            {item.label}
                        </span>
                        {#if item.value}
                            <span class="min-w-0 text-sm leading-6 text-foreground">
                                <InlineText text={item.value} />
                            </span>
                        {/if}
                    </div>
                {/if}
            </li>
        {/each}
    </ul>
</div>
