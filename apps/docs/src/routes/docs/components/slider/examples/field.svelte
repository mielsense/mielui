<script lang="ts">
    import { Slider } from '@mielui/svelte/components/slider';

    let quality = $state(2);
    let strength = $state(100);
    let opacity = $state(72);
    let committed = $state(72);
</script>

<div class="flex w-full max-w-xs flex-col gap-3">
    <div class="flex flex-col gap-1.5">
        <Slider
            bind:value={quality}
            variant="field"
            label="Quality"
            min={1}
            max={8}
            format={(value) => `${value}k`}
        />
        <Slider
            bind:value={strength}
            variant="field"
            label="Strength"
            format={(value) => `${value}%`}
        />
        <Slider
            bind:value={opacity}
            variant="field"
            label="Opacity"
            editable
            format={(value) => `${value}%`}
            onValueCommit={(value) => {
                committed = value;
            }}
        />
    </div>
    <p class="text-sm text-foreground-muted">
        Click the opacity value to type one. Last committed: {committed}%
    </p>
</div>
