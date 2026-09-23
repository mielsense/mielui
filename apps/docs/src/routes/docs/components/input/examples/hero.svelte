<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { Input } from '@mielui/svelte/components/input';

    let projectName = $state('mielui');
    let rootDirectory = $state('./');
    let message = $state('');
    function save() {
        message =
            projectName.trim() && rootDirectory.trim()
                ? `Saved ${projectName.trim()} in ${rootDirectory.trim()}.`
                : 'Enter a project name and root directory.';
    }
    function reset() {
        projectName = 'mielui';
        rootDirectory = './';
        message = 'Changes discarded.';
    }
</script>

<div class="w-full max-w-sm space-y-6">
    <h2 class="text-sm [font-weight:var(--font-weight-label,600)] text-foreground">
        Project settings
    </h2>

    <div class="space-y-4">
        <Input
            label="Project name"
            bind:value={projectName}
            description="The name shown in your workspace."
        />

        <Input
            label="Root directory"
            placeholder="./"
            bind:value={rootDirectory}
            description="The directory where your source code lives."
        />
    </div>

    <div class="flex items-center justify-end gap-3">
        <Button variant="ghost" size="md" onclick={reset}>Reset</Button>
        <Button size="md" onclick={save}>Save settings</Button>
    </div>
    <p role="status" class="text-sm text-foreground-muted">{message}</p>
</div>
