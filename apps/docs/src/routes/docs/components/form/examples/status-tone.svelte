<script lang="ts">
    import * as Form from '@mielui/svelte/components/form';
</script>

<div class="flex w-full max-w-sm flex-col gap-2">
    <Form.Status tone="neutral">Changes are saved when you press Save.</Form.Status>
    <Form.Status tone="success">Profile saved.</Form.Status>
    <Form.Status tone="error">We could not reach the server. Try again.</Form.Status>
</div>
