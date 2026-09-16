<script lang="ts">
    import { Download01Icon as Download } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as CodeBlock from '@mielui/svelte/components/code-block';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    const sh = `npm install @mielui/svelte
npx mielui add code-block`;

    const yaml = `name: ci
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test`;
</script>

<CodeBlock.Root value="shell">
    <CodeBlock.Header>
        <CodeBlock.List>
            <CodeBlock.Trigger value="shell">Terminal</CodeBlock.Trigger>
            <CodeBlock.Trigger value="yaml">ci.yml</CodeBlock.Trigger>
        </CodeBlock.List>
        <CodeBlock.Actions>
            <Button variant="ghost" size="icon" aria-label="Download">
                <HugeiconsIcon icon={Download} size={15} />
            </Button>
        </CodeBlock.Actions>
    </CodeBlock.Header>
    <CodeBlock.Content value="shell" code={sh} lang="bash" />
    <CodeBlock.Content value="yaml" code={yaml} lang="yaml" />
</CodeBlock.Root>
