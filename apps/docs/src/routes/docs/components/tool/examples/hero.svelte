<script lang="ts">
    import * as Tool from '@mielui/svelte/components/tool';
</script>

<Tool.Root name="1 file, 1 search, and 1 command" state="complete" duration="6s">
    <Tool.Item name="Bash" detail="pnpm lint" />
    <Tool.Item name="Grep" detail="Composer" kind="search" />
    <Tool.Item name="Read" detail="src/components/composer.svelte" kind="read" />
</Tool.Root>
