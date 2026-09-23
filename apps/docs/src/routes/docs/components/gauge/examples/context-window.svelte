<script lang="ts">
    import { Gauge } from '@mielui/svelte/components/gauge';
</script>

<div class="flex flex-wrap items-center justify-center gap-10">
    <div class="flex items-center gap-3">
        <Gauge value={85} label="Context remaining" size={32} tone="muted">85</Gauge>
        <div class="text-sm">
            <p class="font-medium text-foreground">Context remaining</p>
            <p class="text-foreground-muted">85% available</p>
        </div>
    </div>
    <Gauge value={85} label="Context remaining" size={160}>
        <span class="flex flex-col items-center gap-2">
            <span>85<span class="text-xl text-foreground-muted">%</span></span>
            <span class="text-xs font-normal tracking-normal text-foreground-muted">remaining</span>
        </span>
    </Gauge>
</div>
