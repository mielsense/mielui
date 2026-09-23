<script lang="ts">
    import {
        LinkSquare02Icon as ExternalLink,
        RefreshIcon as RefreshCw
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as CodeBlock from '@mielui/svelte/components/code-block';
    import { Textarea } from '@mielui/svelte/components/textarea';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let ran = $state(false);
    let editing = $state(false);
    let code = $state(`SELECT id, email, created_at
FROM users
WHERE created_at > now() - interval '7 days'
ORDER BY created_at DESC
LIMIT 50;`);
</script>

<div class="w-full space-y-3">
    <CodeBlock.Root value="sql">
        <CodeBlock.Header>
            <CodeBlock.Actions>
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Run query"
                            onclick={() => { ran = true; }}
                        >
                            <HugeiconsIcon icon={RefreshCw} size={15} />
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Run query</Tooltip.Content>
                </Tooltip.Root>
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Edit query"
                            onclick={() => { editing = !editing; }}
                        >
                            <HugeiconsIcon icon={ExternalLink} size={15} />
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Edit query</Tooltip.Content>
                </Tooltip.Root>
            </CodeBlock.Actions>
        </CodeBlock.Header>
        <CodeBlock.Content value="sql" {code} lang="sql" />
    </CodeBlock.Root>
    {#if editing}
        <Textarea label="Query editor" bind:value={code} rows={6} class="font-mono text-sm" />
    {/if}
    <p role="status" class="text-sm text-foreground-muted">
        {ran ? 'Demo complete: 12 matching users. No database request was sent.' : 'Edit the query or run the local demonstration.'}
    </p>
</div>
