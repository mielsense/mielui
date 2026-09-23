<script lang="ts">
    let {
        title,
        count,
        separator = false
    }: {
        title: string;
        count?: number;
        separator?: boolean;
    } = $props();
</script>

<div
    data-rail-heading
    class="sticky top-0 z-30 flex shrink-0 items-center justify-between gap-3 border-b-[length:var(--border-size)] border-[var(--docs-rule,var(--color-border))] bg-[var(--docs-chrome,var(--color-background))] h-[var(--docs-row-height)] px-5 py-0 text-sm leading-5 font-semibold"
>
    {#if separator}
        <span
            aria-hidden="true"
            class="pointer-events-none absolute inset-x-0 top-0 border-t-[length:var(--border-size)] border-[var(--docs-rule,var(--color-border))]"
        ></span>
    {/if}
    <h2
        class="m-0 font-[family-name:var(--font-header)] text-sm leading-5 font-semibold tracking-[var(--tracking-header)]"
    >
        {title}
    </h2>
    {#if count !== undefined}
        <span class="text-xs font-normal tabular-nums text-foreground-muted">{count}</span>
    {/if}
</div>
