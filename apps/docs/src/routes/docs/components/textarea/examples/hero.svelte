<script lang="ts">
    import { Textarea } from '@mielui/svelte/components/textarea';

    let value = $state(
        "Mielui's textarea uses the same field tokens as Input. Labels, descriptions, and focus rings stay consistent."
    );
</script>

<div class="w-full max-w-sm">
    <Textarea bind:value label="Message" />
</div>
