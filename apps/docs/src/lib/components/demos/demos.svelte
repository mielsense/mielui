<script lang="ts">
    import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { mesh } from '#lib/components/shell/look.js';
    import { resolve } from '$app/paths';
    import Chat from './chat.svelte';
    import CodingAgent from './coding-agent.svelte';
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
    Homepage demos built from library components, one at a time behind tabs, on a mesh
    stage. The page around it supplies the section heading.
-->

<Tabs.Root bind:value={current} variant="ghost" class="flex min-w-0 flex-col gap-3">
    <div class="flex items-center justify-between gap-3">
        <div class="flex min-w-0 items-center gap-2.5">
            <Tabs.List aria-label="Demos" class="shrink-0">
                {#each demos as demo (demo.value)}
                    <Tabs.Trigger value={demo.value}>{demo.label}</Tabs.Trigger>
                {/each}
            </Tabs.List>
            <p class="m-0 hidden min-w-0 truncate text-sm text-foreground-muted sm:block">
                {active.description}
            </p>
        </div>
        <a
            href={active.href}
            aria-label={active.linkLabel}
            class="grid size-7 shrink-0 place-items-center rounded-full text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:bg-[var(--color-wash)] hover:text-foreground focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none motion-reduce:transition-none"
        >
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} />
        </a>
    </div>
    <div class="grain rounded-[24px] p-2 sm:p-6 lg:p-10" style:background={mesh.mauve}>
        <div
            class="@container h-[44rem] w-full min-w-0 overflow-hidden rounded-[12px] bg-card text-foreground [--docs-soft:var(--color-wash)] shadow-[0_0_0_1px_rgb(0_0_0/0.12),0_30px_70px_-20px_rgb(40_10_40/0.55)] [&_:is([data-ui=scroll-area-viewport],[data-ui=conversation-content])]:overscroll-auto"
        >
            {#each demos as demo (demo.value)}
                <Tabs.Content value={demo.value} class="h-full">
                    <demo.component />
                </Tabs.Content>
            {/each}
        </div>
    </div>
</Tabs.Root>
