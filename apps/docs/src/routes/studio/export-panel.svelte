<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import * as Sheet from '@mielui/svelte/components/sheet';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import PackageCommand from '$lib/components/docs/package-command.svelte';
    import FadeScrollArea from '$lib/components/shell/fade-scroll-area.svelte';

    let {
        open = $bindable(false),
        name,
        css,
        json,
        changes
    }: {
        open?: boolean;
        name: string;
        css: string;
        json: string;
        /** How many settings differ from the preset. */
        changes: number;
    } = $props();

    let view = $state('css');
    let setup = $state('new');
    const command = $derived(
        setup === 'new'
            ? 'pnpm dlx @mielui/svelte init --preset ./mielui-theme.json'
            : 'pnpm dlx @mielui/svelte add theme ./mielui-theme.json'
    );

    function download() {
        const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mielui-theme.json';
        link.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
</script>

<!--
    @component
    The Studio's export sheet: the theme as CSS, as JSON, and the CLI steps to install it.
-->

<Sheet.Root bind:open>
    <Sheet.Content side="right" class="w-[min(44rem,calc(100vw-1rem))] max-w-none">
        <Sheet.Header>
            <Sheet.Title>{`Export ${name}`}</Sheet.Title>
            <Sheet.Description>
                {changes === 0
                    ? 'This matches the preset. Copy it into your project, or keep the JSON to load it again later.'
                    : `${changes} ${changes === 1 ? 'setting differs' : 'settings differ'} from the preset. Copy the theme into your project, or keep the JSON to load it again later.`}
            </Sheet.Description>
        </Sheet.Header>
        <Tabs.Root bind:value={view} variant="ghost" class="flex min-h-0 flex-1 flex-col gap-3">
            <Tabs.List>
                <Tabs.Trigger value="css">CSS</Tabs.Trigger>
                <Tabs.Trigger value="json">JSON</Tabs.Trigger>
                <Tabs.Trigger value="cli">CLI</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="css" class="min-h-0 flex-1">
                <CodeBlock
                    code={css}
                    lang="css"
                    copy="overlay"
                    class="h-full [--code-block-max-height:100%]"
                />
            </Tabs.Content>
            <Tabs.Content value="json" class="min-h-0 flex-1">
                <CodeBlock
                    code={json}
                    lang="json"
                    copy="overlay"
                    class="h-full [--code-block-max-height:100%]"
                />
            </Tabs.Content>
            <Tabs.Content value="cli" class="min-h-0 flex-1">
                <FadeScrollArea class="h-full">
                    <div class="flex min-w-0 flex-col gap-5 pb-2">
                        <Tabs.Root bind:value={setup} variant="ghost">
                            <Tabs.List>
                                <Tabs.Trigger value="new">New project</Tabs.Trigger>
                                <Tabs.Trigger value="existing">Existing setup</Tabs.Trigger>
                            </Tabs.List>
                        </Tabs.Root>
                        <div class="flex flex-col gap-2">
                            <p class="m-0 text-sm font-medium">
                                1. Save the theme in your project root
                            </p>
                            <Button variant="outline" class="w-fit" onclick={download}>
                                Download mielui-theme.json
                            </Button>
                            <p class="m-0 text-sm text-foreground-muted">
                                The file holds your light and dark settings. Keep it in version
                                control.
                            </p>
                        </div>
                        <div class="flex min-w-0 flex-col gap-2">
                            <p class="m-0 text-sm font-medium">2. Run from your Svelte project</p>
                            <PackageCommand {command} />
                            {#if setup === 'existing'}
                                <p class="m-0 text-sm text-foreground-muted">
                                    This replaces the generated theme.css. Save any manual changes
                                    first.
                                </p>
                            {/if}
                        </div>
                        <div class="flex flex-col gap-2">
                            <p class="m-0 text-sm font-medium">
                                3. Load the stylesheet in your root layout
                            </p>
                            <CodeBlock
                                lang="ts"
                                copy="overlay"
                                code={setup === 'new'
                                    ? "import '$lib/mielui/styles.css';"
                                    : "import '$lib/mielui/ui.css';\nimport '$lib/mielui/theme.css';"}
                            />
                            <p class="m-0 text-sm text-foreground-muted">
                                These paths use the default directory. The CLI prints yours. Load
                                the fonts you chose in your app as well.
                            </p>
                        </div>
                    </div>
                </FadeScrollArea>
            </Tabs.Content>
        </Tabs.Root>
        <Sheet.Footer>
            <CopyButton text={json} label="Copy JSON" variant="outline" size="md">
                Copy JSON
            </CopyButton>
            <CopyButton text={css} label="Copy CSS" variant="primary" size="md"
                >Copy CSS</CopyButton
            >
        </Sheet.Footer>
    </Sheet.Content>
</Sheet.Root>
