<script lang="ts">
    import PageTabs from './page-tabs.svelte';
</script>

<!--
    @component
    The floating dock at the bottom of the content plate. It holds the open docs pages as tabs.
-->

<div
    class="pointer-events-none absolute inset-x-0 bottom-4 z-30 hidden justify-center px-4 sm:flex"
>
    <div
        class="pointer-events-auto flex h-10 max-w-[min(100%,46rem)] min-w-0 items-center gap-0.5 rounded-[calc(var(--radius-control)+var(--spacing))] border-[length:var(--border-size)] border-border bg-secondary p-1 shadow-[var(--elevation-float)]"
    >
        <PageTabs />
    </div>
</div>
