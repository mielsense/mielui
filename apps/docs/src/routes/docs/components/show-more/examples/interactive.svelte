<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { ShowMore } from '@mielui/svelte/components/show-more';
</script>

<ShowMore label="Project details" class="w-full max-w-lg">
    {#snippet preview()}
        <p>Project details include the setup guide and support contact.</p>
    {/snippet}
    {#snippet trigger({ expanded, props })}
        <Button
            {...props}
            onclick={(event) => {
                if (event.currentTarget instanceof HTMLButtonElement) {
                    props.onclick?.(event as MouseEvent & { currentTarget: HTMLButtonElement });
                }
            }}
            variant="outline"
            class="mt-3"
        >
            {expanded ? 'Hide project details' : 'View project details'}
        </Button>
    {/snippet}
    <div class="flex flex-col gap-3">
        <p>
            Use the setup guide to configure your workspace, then contact support if you need help.
        </p>
        <div class="flex flex-wrap gap-2">
            <Button href="/docs/installation" variant="outline">Setup guide</Button>
            <Button href="mailto:support@example.com" variant="ghost">Contact support</Button>
        </div>
    </div>
</ShowMore>
