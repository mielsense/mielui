<script lang="ts">
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { resolve } from '$app/paths';
    import Chat from './chat.svelte';
    import CodingAgent from './coding-agent.svelte';
    import DemoFrame from './demo-frame.svelte';
    import Issue from './issue.svelte';

    const demos = [
        {
            value: 'agent',
            label: 'Coding agent',
            description: 'Threads, diffs, checks, and a composer',
            href: resolve('/docs/components/tool'),
            linkLabel: 'Tool documentation',
            component: CodingAgent
        },
        {
            value: 'chat',
            label: 'Chat',
            description: 'Reasoning and a streamed reply',
            href: resolve('/docs/components/conversation'),
            linkLabel: 'Conversation documentation',
            component: Chat
        },
        {
            value: 'issue',
            label: 'Issue',
            description: 'Select, combobox, tags, and a switch',
            href: resolve('/docs/components/tag-input'),
            linkLabel: 'Tag Input documentation',
            component: Issue
        }
    ];

    let current = $state(demos[0].value);
    const active = $derived(demos.find((demo) => demo.value === current) ?? demos[0]);
</script>

<!--
    @component
    Homepage demos built from library components, one at a time behind tabs.
-->

<section aria-labelledby="home-demos" class="flex min-w-0 flex-col gap-8">
    <div class="flex flex-col gap-2 px-1">
        <h2
            id="home-demos"
            class="m-0 text-2xl leading-8 font-medium tracking-[-0.025em] text-foreground"
        >
            Try it before you install it
        </h2>
        <p class="m-0 max-w-[62ch] text-[15px] leading-7 text-foreground-muted">
            These three screens are live, and each one is put together from components in the docs.
            Pick another thread, send a follow-up, or change the issue's labels.
        </p>
    </div>
    <Tabs.Root bind:value={current} variant="ghost">
        <DemoFrame
            title="Demos"
            description={active.description}
            href={active.href}
            linkLabel={active.linkLabel}
            class="h-[44rem]"
        >
            {#snippet lead()}
                <Tabs.List class="shrink-0">
                    {#each demos as demo (demo.value)}
                        <Tabs.Trigger value={demo.value}>{demo.label}</Tabs.Trigger>
                    {/each}
                </Tabs.List>
            {/snippet}
            {#each demos as demo (demo.value)}
                <Tabs.Content value={demo.value} class="h-full">
                    <demo.component />
                </Tabs.Content>
            {/each}
        </DemoFrame>
    </Tabs.Root>
</section>
