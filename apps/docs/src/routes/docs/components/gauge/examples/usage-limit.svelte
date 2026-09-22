<script lang="ts">
    import { Gauge } from '@mielui/svelte/components/gauge';
</script>

<div class="flex flex-wrap justify-center gap-10">
    <div class="flex flex-col items-center gap-4">
        <Gauge value={48} max={64} label="Storage used in gigabytes" tone="primary">
            <span class="flex flex-col items-center gap-1">
                <span>48</span>
                <span class="text-xs font-normal text-foreground-muted">of 64 GB</span>
            </span>
        </Gauge>
        <p class="text-sm text-foreground-muted">Storage</p>
    </div>
    <div class="flex flex-col items-center gap-4">
        <Gauge value={18} max={20} label="Team seats used" tone="warning">18</Gauge>
        <p class="text-sm text-foreground-muted">18 of 20 seats</p>
    </div>
    <div class="flex flex-col items-center gap-4">
        <Gauge value={100} label="Backup completion" tone="success">
            100<span class="text-sm">%</span>
        </Gauge>
        <p class="text-sm text-foreground-muted">Backup complete</p>
    </div>
</div>
