<script lang="ts">
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';

    const lines = [
        '09:00:02 Cloning github.com/acme/storefront at commit 4d11ba0',
        '09:00:04 Restored build cache from the previous deployment',
        '09:00:09 Installing dependencies with pnpm install --frozen-lockfile',
        '09:00:21 Running pnpm run build in apps/storefront',
        '09:00:38 Compiled 214 modules for the client bundle',
        '09:00:44 Compiled 96 modules for the server bundle',
        '09:00:47 Prerendered 38 static routes',
        '09:00:52 Uploading build output to the edge network',
        '09:00:58 Assigned the production domain storefront.acme.com',
        '09:01:01 Deployment completed in 59 seconds',
        '09:01:03 Health check passed in 3 regions',
        '09:01:04 Notified the #deploys channel'
    ];
</script>

<ScrollArea
    orientation="both"
    tabindex={0}
    role="region"
    aria-label="Deploy log"
    class="h-56 w-72 rounded-[var(--radius-xl)] border border-border bg-card"
>
    <div
        class="flex w-max flex-col gap-1.5 p-3 font-mono text-xs whitespace-nowrap text-foreground-muted"
    >
        {#each lines as line (line)}
            <span>{line}</span>
        {/each}
    </div>
</ScrollArea>
