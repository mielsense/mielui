<script lang="ts">
    import * as CodeBlock from '@mielui/svelte/components/code-block';

    const code = `model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model.encode(documents)
index.upsert(vectors=zip(ids, embeddings))`;
</script>

<CodeBlock.Root value="py">
    <CodeBlock.Content value="py" {code} lang="python" copyPlacement="overlay" />
</CodeBlock.Root>
