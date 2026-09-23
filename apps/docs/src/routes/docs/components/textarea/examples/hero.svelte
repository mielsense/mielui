<script lang="ts">
    import { Textarea } from '@mielui/svelte/components/textarea';

    let value = $state('Please include the launch checklist in the project notes before Friday.');
</script>

<div class="w-full max-w-sm">
    <Textarea bind:value label="Message" />
</div>
