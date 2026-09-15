<script lang="ts">
    import { Toast } from '@mielui/svelte/components/toast';
</script>

<div class="w-full max-w-sm">
    <Toast.Root toast={{ title: 'Draft saved', type: 'success' }}>
        <Toast.Content>
            Your theme is saved locally. You can keep editing before publishing.
        </Toast.Content>
        <Toast.Footer>
            <Toast.Icon />
            <Toast.Title />
        </Toast.Footer>
    </Toast.Root>
</div>
