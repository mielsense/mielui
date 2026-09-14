<script lang="ts">
    import GitBranch from '@lucide/svelte/icons/git-branch';
    import { Input } from '@mielui/svelte/components/input';
</script>

<div class="w-full max-w-xs">
    <Input label="Repository" placeholder="mielui">
        {#snippet leading()}
            <GitBranch />
        {/snippet}
        {#snippet trailing()}
            <span>.git</span>
        {/snippet}
    </Input>
</div>
