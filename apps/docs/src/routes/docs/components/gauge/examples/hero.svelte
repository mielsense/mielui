<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Button } from '@mielui/svelte/components/button';
    import { Gauge } from '@mielui/svelte/components/gauge';
    import { fromAction } from 'svelte/attachments';

    let usage = $state(72);
    function updateUsage() {
        usage = usage === 72 ? 91 : 72;
    }
</script>

<div class="flex flex-col items-center gap-6">
    <Gauge value={usage} label="Monthly API usage" tone={usage > 85 ? 'warning' : 'primary'}>
        <span>
            <span {@attach fromAction(numberShuffle, () => ({ value: usage }))}>{usage}</span>
            <span class="text-base text-foreground-muted">%</span>
        </span>
    </Gauge>
    <div class="text-center">
        <p class="font-medium text-foreground">Monthly API usage</p>
        <p class="mt-1 text-sm text-foreground-muted">{usage},000 of 100,000 requests</p>
    </div>
    <Button variant="secondary" onclick={updateUsage}>Update usage</Button>
</div>
