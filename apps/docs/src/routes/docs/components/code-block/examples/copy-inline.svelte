<script lang="ts">
    import * as CodeBlock from '@mielui/svelte/components/code-block';
</script>

<!-- copyPlacement="inline": a single-line body with the copy centered on the far right. -->
<CodeBlock.Root value="sh">
    <CodeBlock.Content
        value="sh"
        code="bunx @mielui/svelte add code-block"
        lang="bash"
        copyPlacement="inline"
    />
</CodeBlock.Root>
