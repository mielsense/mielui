<script lang="ts">
    import * as Tabs from '@mielui/svelte/components/tabs';
    import ManualInstall from './manual-install.svelte';
    import PackageCommand from './package-command.svelte';

    let { command }: { command: string } = $props();
    let method = $state('cli');

    const component = $derived(
        command.match(/@mielui\/svelte(?:@[^\s]+)?\s+add\s+([a-z-]+)\s*$/)?.[1]
    );
</script>

{#if component}
    <Tabs.Root bind:value={method} variant="ghost" class="flex min-w-0 flex-col gap-4">
        <div
            role="group"
            aria-label="Installation method"
            class="[&_[data-ui=tabs-trigger]]:inline-flex [&_[data-ui=tabs-trigger]]:min-h-[var(--size-control-sm)] [&_[data-ui=tabs-trigger]]:items-center [&_[data-ui=tabs-trigger]]:py-0"
        >
            <Tabs.List class="w-fit">
                <Tabs.Trigger value="cli">CLI</Tabs.Trigger>
                <Tabs.Trigger value="manual">Manual</Tabs.Trigger>
            </Tabs.List>
        </div>
        <Tabs.Content value="cli">
            <PackageCommand {command} />
        </Tabs.Content>
        <Tabs.Content value="manual">
            <ManualInstall name={component} />
        </Tabs.Content>
    </Tabs.Root>
{:else}
    <PackageCommand {command} />
{/if}
