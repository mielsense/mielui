<script lang="ts">
    import {
        LinkSquare02Icon as ExternalLink,
        RefreshIcon as RefreshCw
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as CodeBlock from '@mielui/svelte/components/code-block';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    const code = `SELECT id, email, created_at
FROM users
WHERE created_at > now() - interval '7 days'
ORDER BY created_at DESC
LIMIT 50;`;
</script>

<CodeBlock.Root value="sql">
    <CodeBlock.Header>
        <CodeBlock.Actions>
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Button variant="ghost" size="icon" aria-label="Run query">
                        <HugeiconsIcon icon={RefreshCw} size={15} />
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>Run query</Tooltip.Content>
            </Tooltip.Root>
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Button variant="ghost" size="icon" aria-label="Open in editor">
                        <HugeiconsIcon icon={ExternalLink} size={15} />
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>Open in editor</Tooltip.Content>
            </Tooltip.Root>
        </CodeBlock.Actions>
    </CodeBlock.Header>
    <CodeBlock.Content value="sql" {code} lang="sql" />
</CodeBlock.Root>
