<script lang="ts">
    import { Textarea } from '@mielui/svelte/components/textarea';
    import { Toolbar } from '@mielui/svelte/components/toolbar';
</script>

<Textarea autoresize aria-label="Message">
    <Toolbar aria-label="Message actions" />
</Textarea>
