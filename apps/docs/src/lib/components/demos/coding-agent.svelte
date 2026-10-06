<script lang="ts">
    import {
        PencilEdit02Icon as NewThread,
        Add01Icon as Plus,
        Settings01Icon as Settings
    } from '@hugeicons/core-free-icons';
    import * as Avatar from '@mielui/svelte/components/avatar';
    import { Button } from '@mielui/svelte/components/button';
    import * as Composer from '@mielui/svelte/components/composer';
    import * as Conversation from '@mielui/svelte/components/conversation';
    import * as FileDiff from '@mielui/svelte/components/file-diff';
    import { Markdown } from '@mielui/svelte/components/markdown';
    import * as Message from '@mielui/svelte/components/message';
    import * as Select from '@mielui/svelte/components/select';
    import { Switch } from '@mielui/svelte/components/switch';
    import { TaskSteps } from '@mielui/svelte/components/task-steps';
    import * as Tool from '@mielui/svelte/components/tool';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { threads } from './coding-agent-data';

    type FollowUp = {
        prompt: string;
        reply: string;
    };

    const days = ['Today', 'Yesterday'] as const;
    const models = ['Mielui 3.1', 'Mielui Mini'];
    const branches = ['main', 'staging', 'release'];
    const iconButton =
        'grid size-7 shrink-0 place-items-center rounded-[var(--radius-sm)] text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:bg-foreground/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none';

    let selected = $state(threads[0].id);
    let prompt = $state('');
    let model = $state(models[0]);
    let target = $state(branches[0]);
    let autoMerge = $state(true);
    let checksDone = $state(0);
    let opened = $state<string[]>([]);
    let followUps = $state<Record<string, FollowUp[]>>({});
    let follow = $state(false);
    let pinned = $state(false);

    const thread = $derived(threads.find((item) => item.id === selected) ?? threads[0]);
    const added = $derived(thread.changes.reduce((total, change) => total + change.added, 0));
    const removed = $derived(thread.changes.reduce((total, change) => total + change.removed, 0));
    const checksPassed = $derived(checksDone >= thread.checks.length);
    const pullRequestOpen = $derived(opened.includes(thread.id));

    function send(value: string) {
        const reply = checksPassed
            ? 'On it. I will push the change to this branch and rerun the checks.'
            : 'Queued. I will pick this up as soon as the current checks finish.';
        followUps[thread.id] = [...(followUps[thread.id] ?? []), { prompt: value, reply }];
        prompt = '';
        pinned = true;
        follow = true;
    }

    $effect(() => {
        if (!pinned && follow) {
            follow = false;
        }
    });

    $effect(() => {
        const total = thread.checks.length;
        checksDone = 0;
        const timer = setInterval(() => {
            checksDone += 1;
            if (checksDone >= total) {
                clearInterval(timer);
            }
        }, 1400);

        return () => clearInterval(timer);
    });
</script>

<!--
    @component
    A coding agent workspace built from Mielui parts: threads, a transcript with a diff, checks, and a composer.
-->

<div class="flex h-full min-h-0 min-w-0 text-foreground">
    <aside
        aria-label="Threads"
        class="hidden w-56 shrink-0 flex-col border-e-[length:var(--border-size)] border-border @4xl:flex"
    >
        <div class="flex h-12 shrink-0 items-center justify-between gap-2 ps-4 pe-2.5">
            <span class="flex min-w-0 items-center gap-2.5">
                <span
                    aria-hidden="true"
                    class="grid size-6 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-secondary text-xs font-medium text-foreground-muted"
                >
                    N
                </span>
                <span class="truncate text-sm font-medium">Northwind</span>
            </span>
            <button type="button" aria-label="New thread" class={iconButton}>
                <HugeiconsIcon icon={NewThread} size={15} />
            </button>
        </div>
        <nav
            aria-label="Recent threads"
            class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-2"
        >
            {#each days as day (day)}
                <div class="flex flex-col gap-0.5">
                    <p class="m-0 px-2 py-1 text-xs text-foreground-muted">{day}</p>
                    {#each threads.filter((item) => item.day === day) as item (item.id)}
                        <button
                            type="button"
                            aria-current={item.id === selected ? 'true' : undefined}
                            class="flex w-full min-w-0 flex-col gap-0.5 rounded-[var(--radius-md)] px-2 py-1.5 text-start transition-colors [transition-duration:var(--motion-duration-hover)] hover:bg-foreground/[0.04] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] aria-[current=true]:bg-secondary motion-reduce:transition-none"
                            onclick={() => {
                                selected = item.id;
                                pinned = false;
                                follow = false;
                            }}
                        >
                            <span class="truncate text-sm">{item.title}</span>
                            <span class="truncate text-xs text-foreground-muted">
                                {item.repo}
                                · {item.age}
                            </span>
                        </button>
                    {/each}
                </div>
            {/each}
        </nav>
        <div
            class="flex h-12 shrink-0 items-center justify-between gap-2 border-t-[length:var(--border-size)] border-border ps-4 pe-2.5"
        >
            <span class="flex min-w-0 items-center gap-2.5">
                <Avatar.Root size="sm">
                    <Avatar.Fallback>MR</Avatar.Fallback>
                </Avatar.Root>
                <span class="truncate text-sm">Maya Reyes</span>
            </span>
            <button type="button" aria-label="Settings" class={iconButton}>
                <HugeiconsIcon icon={Settings} size={15} />
            </button>
        </div>
    </aside>

    <div class="flex min-w-0 flex-1 flex-col">
        <header
            class="flex h-12 shrink-0 items-center justify-between gap-3 border-b-[length:var(--border-size)] border-border px-4"
        >
            <div class="flex min-w-0 items-baseline gap-2.5">
                <h4 class="m-0 truncate text-sm font-medium">{thread.title}</h4>
                <span class="hidden shrink-0 font-mono text-xs text-foreground-muted @lg:inline">
                    {thread.branch}
                </span>
            </div>
            <Button variant="outline" size="sm">Share</Button>
        </header>
        {#key thread.id}
            <Conversation.Root bind:follow class="min-h-0 flex-1">
                <Conversation.Content
                    aria-label={`${thread.title} transcript`}
                    transcriptClass="gap-5 px-4 py-5"
                >
                    <Message.Root from="user">
                        <Message.Content>
                            <p>{thread.prompt}</p>
                        </Message.Content>
                    </Message.Root>
                    <Message.Root from="assistant">
                        <Message.Content class="max-w-none space-y-4">
                            <Tool.Root
                                name={thread.research.summary}
                                state="complete"
                                open={false}
                                variant="quiet"
                                duration={thread.research.duration}
                            >
                                <Tool.Item name="Search" detail={thread.repo} kind="search" />
                                <Tool.Item name="Read" detail={thread.diff.file} kind="read" />
                            </Tool.Root>
                            <Markdown content={thread.approach} />
                            <FileDiff.Root
                                file={thread.diff.file}
                                lang="ts"
                                diff={thread.diff.lines}
                            />
                            <Tool.Root
                                name={thread.work.summary}
                                state="complete"
                                open={false}
                                variant="quiet"
                                duration={thread.work.duration}
                            >
                                <Tool.Item name="Edit" detail={thread.diff.file} kind="read" />
                                <Tool.Item name="Run" detail="pnpm test" kind="command" />
                            </Tool.Root>
                            <Markdown content={thread.result} />
                        </Message.Content>
                    </Message.Root>
                    {#each followUps[thread.id] ?? [] as followUp, index (index)}
                        <Message.Root from="user">
                            <Message.Content>
                                <p>{followUp.prompt}</p>
                            </Message.Content>
                        </Message.Root>
                        <Message.Root from="assistant">
                            <Message.Content class="max-w-none">
                                <p>{followUp.reply}</p>
                            </Message.Content>
                        </Message.Root>
                    {/each}
                </Conversation.Content>
            </Conversation.Root>
        {/key}
        <div class="shrink-0 px-4 pb-4">
            <Composer.Root bind:value={prompt} onSubmit={send}>
                <Composer.Input aria-label="Follow-up" placeholder="Ask for a follow-up" />
                <Composer.Toolbar>
                    <Composer.Actions>
                        <Button variant="outline" size="icon" aria-label="Add context">
                            <HugeiconsIcon icon={Plus} size={14} />
                        </Button>
                    </Composer.Actions>
                    <div class="ms-auto flex shrink-0 items-center gap-1">
                        <Select.Root bind:value={model}>
                            <Select.Trigger variant="outline" class="w-auto" aria-label="Model">
                                {model}
                            </Select.Trigger>
                            <Select.Content>
                                {#each models as option (option)}
                                    <Select.Item value={option}>{option}</Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                        <Composer.Submit />
                    </div>
                </Composer.Toolbar>
            </Composer.Root>
        </div>
    </div>

    <aside
        aria-label="Changes"
        class="hidden w-72 shrink-0 flex-col border-s-[length:var(--border-size)] border-border @2xl:flex"
    >
        <div
            class="flex h-12 shrink-0 items-center justify-between gap-3 border-b-[length:var(--border-size)] border-border px-4"
        >
            <h4 class="m-0 text-sm font-medium">Changes</h4>
            <span class="flex items-center gap-2 font-mono text-xs tabular-nums">
                <span class="text-success">+{added}</span>
                <span class="text-error">-{removed}</span>
            </span>
        </div>
        <div class="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-4">
            <ul class="m-0 flex list-none flex-col gap-2.5 p-0">
                {#each thread.changes as change (change.file)}
                    <li class="flex items-center justify-between gap-3 font-mono text-xs">
                        <span class="min-w-0 truncate">{change.file}</span>
                        <span class="flex shrink-0 items-center gap-1.5 tabular-nums">
                            <span class="text-success">+{change.added}</span>
                            {#if change.removed > 0}
                                <span class="text-error">-{change.removed}</span>
                            {/if}
                        </span>
                    </li>
                {/each}
            </ul>
            <div class="flex flex-col gap-3">
                <h5 class="m-0 text-sm font-medium">Checks</h5>
                <TaskSteps steps={thread.checks} current={checksDone} label="Checks" />
            </div>
            <div class="flex flex-col gap-2">
                <span id="merge-target-label" class="text-sm font-medium">Merge into</span>
                <Select.Root bind:value={target}>
                    <Select.Trigger
                        class="w-full font-mono text-xs"
                        aria-labelledby="merge-target-label"
                    >
                        {target}
                    </Select.Trigger>
                    <Select.Content>
                        {#each branches as branch (branch)}
                            <Select.Item value={branch}>{branch}</Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>
            </div>
            <Switch
                bind:checked={autoMerge}
                label="Merge when checks pass"
                description="Squash into one commit."
            />
        </div>
        <div class="shrink-0 border-t-[length:var(--border-size)] border-border p-4">
            <Button
                class="w-full"
                disabled={pullRequestOpen}
                onclick={() => {
                    opened = [...opened, thread.id];
                }}
            >
                {pullRequestOpen ? 'Pull request opened' : 'Create pull request'}
            </Button>
        </div>
    </aside>
</div>
