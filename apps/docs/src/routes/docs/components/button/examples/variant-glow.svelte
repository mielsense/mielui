<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
</script>

<div class="flex flex-wrap items-center justify-center gap-3">
    <Button variant="glow">Get started</Button>
    <Button
        variant="glow"
        class="text-background [--mielui-glow-color:var(--color-foreground)] [--mielui-glow-light:0.3] dark:[--mielui-glow-light:1]"
    >
        Foreground
    </Button>
    <Button variant="glow" class="text-[#1c2002] [--mielui-glow-color:#e4f222]"> Lime </Button>
</div>
