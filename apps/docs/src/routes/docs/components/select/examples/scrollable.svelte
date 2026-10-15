<script lang="ts">
    import * as Select from '@mielui/svelte/components/select';

    const timezones = [
        'Hawaii (HST)',
        'Alaska (AKST)',
        'Pacific Time (PT)',
        'Mountain Time (MT)',
        'Central Time (CT)',
        'Eastern Time (ET)',
        'Atlantic Time (AT)',
        'São Paulo (BRT)',
        'Azores (AZOT)',
        'London (GMT)',
        'Paris (CET)',
        'Berlin (CET)',
        'Athens (EET)',
        'Istanbul (TRT)',
        'Cairo (EET)',
        'Johannesburg (SAST)',
        'Moscow (MSK)',
        'Dubai (GST)',
        'Karachi (PKT)',
        'Kolkata (IST)',
        'Bangkok (ICT)',
        'Shanghai (CST)',
        'Tokyo (JST)',
        'Seoul (KST)',
        'Sydney (AEST)',
        'Auckland (NZST)'
    ];

    let timezone = $state('Eastern Time (ET)');
</script>

<div class="flex flex-col gap-2">
    <span id="timezone-label" class="text-sm font-medium">Time zone</span>
    <Select.Root bind:value={timezone}>
        <Select.Trigger aria-labelledby="timezone-label" class="min-w-60" />
        <Select.Content class="max-h-56">
            {#each timezones as option (option)}
                <Select.Item value={option}>{option}</Select.Item>
            {/each}
        </Select.Content>
    </Select.Root>
</div>
