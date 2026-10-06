<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';

    const deployments = [
        { name: 'Production', detail: 'main · 2 minutes ago', label: 'Live', variant: 'success' },
        { name: 'Preview', detail: 'feat/billing · building', label: 'Building', variant: 'info' },
        { name: 'Staging', detail: 'release/0.3 · 1 hour ago', label: 'Failed', variant: 'error' },
        { name: 'Archive', detail: 'v0.1 · last month', label: 'Paused', variant: 'outline' }
    ] as const;
</script>

<ul class="m-0 flex w-full max-w-sm list-none flex-col gap-3 p-0">
    {#each deployments as deployment (deployment.name)}
        <li class="flex items-center justify-between gap-4">
            <span class="flex min-w-0 flex-col">
                <span class="truncate text-sm font-medium text-foreground">{deployment.name}</span>
                <span class="truncate text-sm text-foreground-muted">{deployment.detail}</span>
            </span>
            <Badge variant={deployment.variant}>{deployment.label}</Badge>
        </li>
    {/each}
</ul>
