<script lang="ts">
    import { CopyButton } from '@mielui/svelte/components/copy-button';
</script>

<div
    class="flex w-full max-w-sm items-center gap-2 rounded-[var(--radius-md)] border border-border bg-card px-3 py-2"
>
    <code class="min-w-0 flex-1 truncate font-mono text-sm text-foreground">
        bunx @mielui/svelte add copy-button
    </code>
    <CopyButton text="bunx @mielui/svelte add copy-button" />
</div>
