<script lang="ts">
    import { CopyButton } from '@mielui/svelte/components/copy-button';
</script>

<div
    class="flex w-full max-w-sm items-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-input)] bg-[var(--color-field)] py-1 ps-4 pe-1"
>
    <code class="min-w-0 flex-1 truncate font-mono text-sm text-foreground">
        pnpm dlx @mielui/svelte add copy-button
    </code>
    <CopyButton text="pnpm dlx @mielui/svelte add copy-button" />
</div>
