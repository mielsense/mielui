<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as CodeBlock from '@mielui/svelte/components/code-block';
    import * as Combobox from '@mielui/svelte/components/combobox';
    import PackageCommand from './package-command.svelte';

    type SourceFile = {
        path: string;
        source: string;
        lang: string;
    };

    type Source = {
        dependencies: string[];
        files: SourceFile[];
    };

    let { name }: { name: string } = $props();

    let source = $state<Source | null>(null);
    let failure = $state(false);
    let attempt = $state(0);
    let selected = $state('');

    const activeFile = $derived(
        source?.files.find((file) => file.path === selected) ?? source?.files[0]
    );
    const fileCount = $derived(source?.files.length ?? 0);

    function shortPath(path: string) {
        return path.replace('src/lib/mielui/', '');
    }

    function selectFile(path: string) {
        if (path) {
            selected = path;
        }
    }

    function retry() {
        attempt += 1;
    }

    $effect(() => {
        const component = name;
        attempt;

        const controller = new AbortController();

        source = null;
        failure = false;
        selected = '';

        fetch(`/api/component-source/${encodeURIComponent(component)}`, {
            signal: controller.signal
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('Source unavailable');
                }

                const result: Source = await response.json();

                if (!controller.signal.aborted) {
                    source = result;
                    selected = result.files[0]?.path ?? '';
                }
            })
            .catch(() => {
                if (!controller.signal.aborted) {
                    failure = true;
                }
            });

        return () => {
            controller.abort();
        };
    });
</script>

{#if failure}
    <div role="alert" class="flex items-center gap-3 text-sm">
        <span>Could not load the source files.</span>
        <Button variant="outline" size="sm" onclick={retry}>Retry</Button>
    </div>
{:else if !source}
    <p role="status" class="text-sm text-foreground-muted">Loading installation files…</p>
{:else}
    <ol class="flex min-w-0 list-decimal flex-col gap-6 ps-5 text-sm marker:text-foreground-muted">
        <li class="min-w-0 ps-1 [&>*+*]:mt-3">
            <p>Install the dependencies in your Svelte 5 project.</p>
            <PackageCommand command={`pnpm add ${source.dependencies.join(' ')}`} />
        </li>
        <li class="min-w-0 ps-1 [&>*+*]:mt-3">
            <p>
                {`Copy these ${fileCount} component files and shared helpers into your project. Choose a file to view its source.`}
            </p>
            {#if activeFile}
                <CodeBlock.Root
                    value={activeFile.path}
                    class="[--mielui-inset-position:top] [&_[data-ui=code-block-header]]:gap-2 [&_[data-ui=code-block-header]]:[--size-icon-md:var(--size-control-sm)]"
                >
                    <CodeBlock.Header>
                        <Combobox.Root
                            type="single"
                            value={activeFile.path}
                            onValueChange={selectFile}
                        >
                            <Combobox.Trigger
                                size="sm"
                                variant="outline"
                                aria-label="Source file"
                                placeholder="Find a file"
                                class="w-96 max-w-full min-w-0 [&_input]:pe-6 [&_input]:font-mono [&_input]:text-ellipsis [&_input]:text-[length:var(--font-size-label)]"
                            />
                            <Combobox.Content>
                                <Combobox.Results>
                                    {#each source.files as file (file.path)}
                                        <Combobox.Item
                                            value={file.path}
                                            label={shortPath(file.path)}
                                        />
                                    {/each}
                                </Combobox.Results>
                            </Combobox.Content>
                        </Combobox.Root>
                        <CodeBlock.Actions />
                    </CodeBlock.Header>
                    {#key activeFile.path}
                        <CodeBlock.Content
                            value={activeFile.path}
                            code={activeFile.source}
                            lang={activeFile.lang}
                        />
                    {/key}
                </CodeBlock.Root>
            {/if}
        </li>
        <li class="min-w-0 ps-1 [&>*+*]:mt-3">
            <p>
                Import the shared stylesheet once in your root layout. If it is already installed,
                keep your existing theme customizations.
            </p>
            <CodeBlock.Root
                code={"import '$lib/mielui/ui.css';"}
                lang="typescript"
                copy="overlay"
            />
            <p class="text-foreground-muted">
                Paths use $lib/mielui. Adjust them if your project uses another alias. Tailwind CSS
                4 must be configured in your project.
            </p>
        </li>
    </ol>
{/if}
