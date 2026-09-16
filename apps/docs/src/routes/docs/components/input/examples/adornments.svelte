<script lang="ts">
    import GitBranch from '@hugeicons/core-free-icons/GitBranchIcon';
    import { Input } from '@mielui/svelte/components/input';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="w-full max-w-xs">
    <Input label="Repository" placeholder="mielui">
        {#snippet leading()}
            <HugeiconsIcon icon={GitBranch} />
        {/snippet}
        {#snippet trailing()}
            <span>.git</span>
        {/snippet}
    </Input>
</div>
