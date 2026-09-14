<script lang="ts">
    import * as Tool from '@mielui/svelte/components/tool';

    let {
        state = 'running',
        variant = 'default'
    }: {
        state?: Tool.ToolState;
        variant?: Tool.ToolVariant;
    } = $props();
</script>

<Tool.Root name="Checking deployment" {state} {variant} duration="6s">
    <Tool.Item name="Bash" detail="vercel inspect" />
</Tool.Root>
