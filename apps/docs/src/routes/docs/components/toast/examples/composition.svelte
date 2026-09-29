<script lang="ts">
    import { Toast } from '@mielui/svelte/components/toast';
</script>

<div class="w-full max-w-sm">
    <Toast.Root toast={{ title: 'Draft saved', type: 'success' }}>
        <Toast.Content class="gap-1">
            <div class="flex items-center gap-2">
                <Toast.Icon />
                <Toast.Title />
            </div>
            <span>Your theme is saved locally. You can keep editing before publishing.</span>
        </Toast.Content>
    </Toast.Root>
</div>
