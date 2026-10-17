<script lang="ts">
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';

    const tabs = [
        'Overview',
        'Activity',
        'Settings',
        'Members',
        'Billing',
        'Integrations',
        'Webhooks',
        'Security',
        'Audit log',
        'Danger zone'
    ];
</script>

<div class="flex items-center justify-center p-10">
    <ScrollArea
        orientation="horizontal"
        tabindex={0}
        role="region"
        aria-label="Project sections"
        class="w-72 rounded-[var(--radius-control)] border border-border bg-card p-1.5 shadow-[var(--elevation-1)]"
    >
        <div class="flex gap-2">
            {#each tabs as tab (tab)}
                <span
                    class="whitespace-nowrap rounded-[var(--radius-control)] bg-secondary px-3 py-1 text-sm text-foreground"
                >
                    {tab}
                </span>
            {/each}
        </div>
    </ScrollArea>
</div>
