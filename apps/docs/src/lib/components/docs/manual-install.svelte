<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import PackageCommand from './package-command.svelte';

    type Source = {
        dependencies: string[];
        files: { path: string; source: string; lang: string }[];
    };
    let { name }: { name: string } = $props();
    let source = $state<Source | null>(null);
    let failure = $state(false);
    let attempt = $state(0);
    let selected = $state('');
    let expanded = $state(false);
    const id = $props.id();
    const activeFile = $derived(
        source?.files.find((file) => file.path === selected) ?? source?.files[0]
    );

    $effect(() => {
        const component = name;
        attempt;
        const controller = new AbortController();
        source = null;
        failure = false;
        selected = '';
        expanded = false;
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
        <Button variant="outline" size="sm" onclick={() => { attempt += 1; }}>Retry</Button>
    </div>
{:else if !source}
    <p role="status" class="text-sm text-foreground-muted">Loading installation files…</p>
{:else}
    <ol class="flex min-w-0 list-decimal flex-col gap-6 pl-5 text-sm marker:text-foreground-muted">
        <li class="min-w-0 space-y-3 pl-1">
            <p>Install the dependencies in your Svelte 5 project.</p>
            <PackageCommand command={`pnpm add ${source.dependencies.join(' ')}`} />
        </li>
        <li class="min-w-0 space-y-3 pl-1">
            <p>Copy these component files and shared helpers into your project.</p>
            <Tabs.Root
                value={selected || source.files[0]?.path}
                onValueChange={(value) => { selected = value; expanded = false; }}
                variant="ghost"
                class="min-w-0"
            >
                <Tabs.List
                    aria-label="Installation files"
                    class="max-w-full justify-start overflow-x-auto"
                >
                    {#each source.files as file (file.path)}
                        <Tabs.Trigger value={file.path} class="shrink-0 font-mono text-xs">
                            {file.path.replace('src/lib/mielui/', '')}
                        </Tabs.Trigger>
                    {/each}
                </Tabs.List>
            </Tabs.Root>
            {#if activeFile}
                <div
                    class={`relative min-w-0 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card ${expanded ? "" : "border-b-transparent"}`}
                >
                    <div
                        class="flex min-h-10 items-center justify-between gap-3 border-b border-border px-3"
                    >
                        <span
                            class="min-w-0 truncate font-mono text-xs text-foreground-muted"
                            title={activeFile.path}
                        >
                            {activeFile.path}
                        </span>
                        <div class="flex shrink-0 items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                aria-expanded={expanded}
                                aria-controls={id}
                                onclick={() => { expanded = !expanded; }}
                            >
                                {expanded ? 'Collapse' : 'Expand'}
                            </Button>
                            <span aria-hidden="true" class="h-4 w-px bg-border"></span>
                            <CopyButton text={activeFile.source} />
                        </div>
                    </div>
                    <div
                        {id}
                        class={expanded ? 'min-w-0' : 'max-h-80 min-w-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_45%,transparent_95%)]'}
                    >
                        <CodeBlock
                            code={activeFile.source}
                            lang={activeFile.lang}
                            class="rounded-none border-0 shadow-none [&_[data-ui=code-block-header]]:hidden"
                        />
                    </div>
                    {#if !expanded}
                        <div
                            class="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-28 items-end justify-center bg-linear-to-b from-transparent via-background/80 to-background pb-4"
                        >
                            <Button
                                variant="ghost"
                                class="pointer-events-auto h-8 px-4 text-foreground-muted hover:text-foreground"
                                aria-expanded="false"
                                aria-controls={id}
                                onclick={() => { expanded = true; }}
                            >
                                Expand
                            </Button>
                        </div>
                    {/if}
                </div>
            {/if}
        </li>
        <li class="space-y-3 pl-1">
            <p>
                Import the shared stylesheet once in your root layout. If it is already installed,
                keep your existing theme customizations.
            </p>
            <CodeBlock code={"import '$lib/mielui/ui.css';"} lang="typescript" />
            <p class="text-foreground-muted">
                Paths use $lib/mielui. Adjust them if your project uses another alias. Tailwind CSS
                4 must be configured in your project.
            </p>
        </li>
    </ol>
{/if}
