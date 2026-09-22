<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { Switch } from '@mielui/svelte/components/switch';
    import { toast } from '@mielui/svelte/components/toast';

    let fail = $state(false);
    let pending = $state(false);

    function save() {
        const shouldFail = fail;
        pending = true;
        const request = new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                pending = false;
                if (shouldFail) {
                    reject(new Error('The server could not save your changes.'));
                } else {
                    resolve('Profile');
                }
            }, 1600);
        });
        toast.promise(request, {
            loading: 'Saving profile…',
            success: (name) => `${name} saved`,
            error: 'Could not save profile',
            errorDescription: 'Your changes are still here. Try again.'
        });
    }
</script>

<div class="flex flex-wrap items-center gap-4">
    <Button onclick={save} disabled={pending}>Save profile</Button>
    <Switch bind:checked={fail} label="Simulate failure" />
</div>
