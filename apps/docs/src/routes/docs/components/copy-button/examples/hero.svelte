<script lang="ts">
    import { CopyButton } from '@mielui/svelte/components/copy-button';

    let copied = $state(false);
</script>

<div class="flex flex-col gap-3">
    <div class="flex items-center gap-3">
        <code class="text-sm">pnpm add @mielui/svelte</code>
        <CopyButton
            text="pnpm add @mielui/svelte"
            label="Copy install command"
            oncopy={() => { copied = true; }}
        />
    </div>
    <p role="status" class="text-sm text-foreground-muted">
        {copied ? 'Install command copied.' : 'Copy the command to your clipboard.'}
    </p>
</div>
