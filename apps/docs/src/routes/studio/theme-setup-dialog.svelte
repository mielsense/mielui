<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Dialog from '@mielui/svelte/components/dialog';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import PackageCommand from '$lib/components/docs/package-command.svelte';

    let { open = $bindable(false), generatedJson }: { open?: boolean; generatedJson: string } =
        $props();
    let setupMode = $state('new');
    const setupCommand = $derived(
        setupMode === 'new'
            ? 'pnpm dlx @mielui/svelte init --preset ./mielui-theme.json'
            : 'pnpm dlx @mielui/svelte add theme ./mielui-theme.json'
    );
    function downloadTheme() {
        const url = URL.createObjectURL(new Blob([generatedJson], { type: 'application/json' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mielui-theme.json';
        link.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
</script>
<Dialog.Root bind:open>
    <Dialog.Content class="w-full max-w-xl">
        <Dialog.Header>
            <Dialog.Title>Use your theme</Dialog.Title>
            <Dialog.Description>
                Bring the colors, typography, spacing, and motion you chose into your Svelte
                project.
            </Dialog.Description>
        </Dialog.Header>
        <div class="flex min-w-0 flex-col gap-5">
            <Tabs.Root bind:value={setupMode} variant="ghost">
                <Tabs.List>
                    <Tabs.Trigger value="new">Initialize Mielui</Tabs.Trigger>
                    <Tabs.Trigger value="existing">Existing setup</Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>
            <div class="flex flex-col gap-2">
                <p class="text-sm font-medium">1. Save the preset in your project root</p>
                <Button variant="outline" class="w-fit" onclick={downloadTheme}>
                    Download mielui-theme.json
                </Button>
                <p class="text-sm text-foreground-muted">
                    This file includes your current light and dark settings. You can keep it in
                    version control.
                </p>
            </div>
            <div class="flex min-w-0 flex-col gap-2">
                <p class="text-sm font-medium">2. Run from your Svelte project</p>
                <PackageCommand command={setupCommand} />
                {#if setupMode === 'existing'}
                    <p class="text-sm text-foreground-muted">
                        Replaces the generated theme.css. Save any manual changes first.
                    </p>
                {/if}
            </div>
            <div class="flex flex-col gap-2">
                <p class="text-sm font-medium">3. Load the stylesheet in your root layout</p>
                <CodeBlock
                    lang="ts"
                    copy="overlay"
                    code={setupMode === 'new' ? "import '$lib/mielui/styles.css';" : "import '$lib/mielui/ui.css';\nimport '$lib/mielui/theme.css';"}
                />
                <p class="text-sm text-foreground-muted">
                    Paths above use the default directory. The CLI prints your configured path. Load
                    your chosen fonts in the app as well.
                </p>
            </div>
        </div>
    </Dialog.Content>
</Dialog.Root>
