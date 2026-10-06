<script lang="ts">
    import { CopyButton } from '@mielui/svelte/components/copy-button';
</script>

<div class="flex items-center gap-3">
    <CopyButton
        text="sk_live_example"
        label="Copy API key"
        copiedLabel="Key copied"
        duration={4000}
        size="md"
        variant="outline"
    >
        Copy key
    </CopyButton>
    <span class="text-sm text-foreground-muted">Stays copied for four seconds</span>
</div>
