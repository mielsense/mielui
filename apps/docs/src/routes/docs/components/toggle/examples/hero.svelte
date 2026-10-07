<script lang="ts">
    import {
        TextBoldIcon as Bold,
        TextItalicIcon as Italic,
        TextUnderlineIcon as Underline
    } from '@hugeicons/core-free-icons';
    import { Toggle } from '@mielui/svelte/components/toggle';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let bold = $state(true);
    let italic = $state(false);
    let underline = $state(false);
</script>

<div class="flex flex-col items-center gap-5">
    <div class="flex items-center gap-1" role="group" aria-label="Text formatting">
        <Toggle bind:pressed={bold} aria-label="Bold">
            <HugeiconsIcon icon={Bold} size={14} />
        </Toggle>
        <Toggle bind:pressed={italic} aria-label="Italic">
            <HugeiconsIcon icon={Italic} size={14} />
        </Toggle>
        <Toggle bind:pressed={underline} aria-label="Underline">
            <HugeiconsIcon icon={Underline} size={14} />
        </Toggle>
    </div>
    <p
        class={`m-0 text-sm text-foreground ${bold ? 'font-semibold' : ''} ${italic ? 'italic' : ''} ${underline ? 'underline underline-offset-4' : ''}`}
    >
        The quick brown fox jumps over the lazy dog.
    </p>
</div>
