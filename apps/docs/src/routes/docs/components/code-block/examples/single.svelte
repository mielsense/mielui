<script lang="ts">
    import * as CodeBlock from '@mielui/svelte/components/code-block';

    const code = `const greet = (name: string) => {
  return \`Hello, \${name}!\`;
};

console.log(greet('world'));`;
</script>

<CodeBlock.Root value="ts">
    <CodeBlock.Content value="ts" {code} lang="typescript" />
</CodeBlock.Root>
