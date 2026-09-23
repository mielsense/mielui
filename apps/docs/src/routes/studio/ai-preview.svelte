<script lang="ts">
    import * as Attachment from '@mielui/svelte/components/attachment';
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import * as Composer from '@mielui/svelte/components/composer';
    import * as Conversation from '@mielui/svelte/components/conversation';
    import { Markdown } from '@mielui/svelte/components/markdown';
    import * as Message from '@mielui/svelte/components/message';
    import * as Reasoning from '@mielui/svelte/components/reasoning';
    import * as Select from '@mielui/svelte/components/select';
    import * as Tool from '@mielui/svelte/components/tool';
    import { onDestroy, onMount } from 'svelte';

    const releasePlan = [
        '### Ready for review',
        '',
        'The release is close. Finish these **three checks** before choosing a deployment window:',
        '',
        '- Review the migration notes with the support team.',
        '- Verify keyboard navigation and reduced-motion behavior.',
        '- Confirm the rollback owner and the monitoring window.',
        '',
        '```sh',
        'pnpm run format:check',
        'pnpm run lint',
        '```',
        '',
        '> Keep the rollout small. Expand it after the first health check.',
        '',
        '**Next step:** share the checklist with the release owner.',
        '',
        '### Ownership and timing',
        '',
        '| Workstream | Owner | Ready when |',
        '| --- | --- | --- |',
        '| Migration notes | Alex | Examples match the final API |',
        '| Interaction review | Sam | Keyboard and touch checks pass |',
        '| Rollout | Jordan | Monitoring and rollback are prepared |',
        '',
        'Start with the migration notes. They give reviewers a shared list of changes and help support answer questions without reading the implementation.',
        '',
        '### Before the release',
        '',
        '- [x] Gather the release notes',
        '- [x] Identify the affected screens',
        '- [ ] Review empty, loading, and error states',
        '- [ ] Confirm focus returns after dialogs close',
        '- [ ] Record the rollback decision and owner',
        '',
        '#### Interaction review',
        '',
        '1. Navigate the primary workflow using only the keyboard.',
        '2. Repeat it at a narrow viewport with long labels.',
        '3. Enable reduced motion and confirm that state changes remain clear.',
        '4. Interrupt an upload, retry it, and check that the original file remains available.',
        '',
        'Pay particular attention to **focus**, **error recovery**, and **content that changes height**. These are the places where a polished static screen can still become difficult to use.',
        '',
        '### A small rollout configuration',
        '',
        '```json',
        '{',
        '  "release": "workspace-refresh",',
        '  "audience": "internal",',
        '  "monitoringWindowMinutes": 30,',
        '  "rollbackOwner": "Jordan"',
        '}',
        '```',
        '',
        'This is sample configuration for the demo. Keep the real release controls in your deployment system.',
        '',
        '### What to watch',
        '',
        '| Signal | Healthy behavior | Investigate when |',
        '| --- | --- | --- |',
        '| Submission errors | Recoverable and clearly explained | Users cannot retry |',
        '| Upload completion | Every accepted file reaches a final state | Progress stalls indefinitely |',
        '| Navigation | Focus stays visible | Focus disappears behind an overlay |',
        '',
        '> A successful rollout is more than a green deployment. Watch whether people can finish the task they came to do.',
        '',
        '### Share with the team',
        '',
        'Send a short note with the scope, the owner, and the rollback plan. Link to the [component documentation](/docs/components) for examples and the [theme guide](/docs/theming) for appearance changes.',
        '',
        '```md',
        'Release: Workspace refresh',
        'Owner: Jordan',
        'Scope: Forms, uploads, and theme controls',
        'First audience: Internal team',
        'Review window: 30 minutes',
        '```',
        '',
        '**Recommendation:** finish the interaction review first, then schedule the rollout with the people who will monitor it.'
    ].join('\n');

    let composerHeight = $state(0);
    let model = $state('Mielui 3.1');
    let prompt = $state('');
    let question = $state('Review the release notes and help me plan the next release.');
    let content = $state('');
    let generating = $state(false);
    let stopped = $state(false);
    let files = $state<File[]>([]);
    let reference = $state<File>();
    let rejected = $state<Attachment.AttachmentRejection[]>([]);
    let timer: ReturnType<typeof setInterval> | undefined;

    function stop() {
        clearInterval(timer);
        timer = undefined;
        generating = false;
        stopped = true;
    }

    function stream(text: string) {
        clearInterval(timer);
        content = '';
        stopped = false;
        generating = true;
        let cursor = 0;
        timer = setInterval(() => {
            cursor = Math.min(cursor + 12, text.length);
            content = text.slice(0, cursor);
            if (cursor === text.length) {
                clearInterval(timer);
                timer = undefined;
                generating = false;
            }
        }, 50);
    }

    function send(value: string) {
        question = value;
        prompt = '';
        stream(
            value.toLowerCase().includes('checklist')
                ? '### Release checklist\n\n- [ ] Review migration notes\n- [ ] Run format and lint checks\n- [ ] Verify keyboard and reduced-motion behavior\n- [ ] Assign a rollback owner\n\n**Once these are complete**, choose a deployment window and notify the team.'
                : releasePlan
        );
    }

    onMount(() => {
        reference = new File(
            ['Release notes for the upcoming Mielui release.'],
            'release-notes.md',
            {
                type: 'text/markdown'
            }
        );
        stream(releasePlan);
    });

    onDestroy(() => {
        clearInterval(timer);
    });
</script>

<div class="@container relative flex h-full min-h-0 w-full flex-col">
    <header
        class="flex h-[var(--docs-row-height)] shrink-0 items-center justify-between gap-3 border-b-[length:var(--border-size)] border-[var(--docs-rule)] bg-[var(--docs-chrome)] px-6"
    >
        <h2 class="text-sm font-semibold">Release workspace</h2>
        <Button variant="ghost" onclick={() => stream(releasePlan)} disabled={generating}>
            Replay response
        </Button>
    </header>
    <Conversation.Root class="min-h-0 flex-1">
        <Conversation.Content
            aria-label="Release planning conversation"
            transcriptClass="max-w-none gap-8 px-6 pt-8 pb-[calc(var(--composer-height)+2rem)] sm:px-6"
            style={`--composer-height: ${composerHeight}px`}
        >
            <Message.Root from="user">
                <Message.Content class="space-y-3">
                    {#if reference}
                        <Attachment.Item file={reference} removable={false} />
                    {/if}
                    <p>{question}</p>
                </Message.Content>
            </Message.Root>
            <Message.Root from="assistant">
                <Message.Content class="space-y-5">
                    <Reasoning.Root>
                        <Reasoning.Trigger title="Reviewed the release scope" duration="2s" />
                        <Reasoning.Content>
                            <p>
                                Grouped the remaining work into documentation, interaction checks,
                                and rollout planning. The checklist below uses the sample release
                                notes.
                            </p>
                        </Reasoning.Content>
                    </Reasoning.Root>
                    <Tool.Root
                        name="Read release notes and checked the release checklist"
                        state="complete"
                        variant="quiet"
                        duration="1s"
                    >
                        <Tool.Item name="Read" detail="release-notes.md" kind="read" />
                        <Tool.Item
                            name="Search"
                            detail="Migration and accessibility checks"
                            kind="search"
                        />
                    </Tool.Root>
                    <Markdown {content} streaming={generating} />
                    <div class="flex flex-wrap items-center gap-2">
                        <Badge variant={generating ? 'outline' : 'success'}>
                            {generating ? 'Writing response' : stopped ? 'Stopped' : 'Response complete'}
                        </Badge>
                        {#if !generating}
                            <Button
                                variant="ghost"
                                onclick={() => send('Turn this into a checklist.')}
                            >
                                Turn into a checklist
                            </Button>
                        {/if}
                    </div>
                </Message.Content>
            </Message.Root>
        </Conversation.Content>
        <Conversation.ScrollButton
            class="-translate-y-[var(--composer-height)]"
            style={`--composer-height: ${composerHeight}px`}
        />
    </Conversation.Root>
    <div
        bind:clientHeight={composerHeight}
        class="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-6 pt-3"
    >
        <Attachment.Root
            bind:files
            maxFiles={3}
            maxSize={5 * 1024 * 1024}
            onReject={(items) => {
            rejected = items;
        }}
            class="pointer-events-auto mx-auto w-full max-w-2xl space-y-2"
        >
            <Attachment.List />
            {#each rejected as item}
                <Attachment.Item
                    file={item.file}
                    status="error"
                    error={item.reason}
                    onRemove={() => {
                    rejected = rejected.filter((entry) => entry !== item);
                }}
                />
            {/each}
            <Composer.Root bind:value={prompt} {generating} onSubmit={send} onStop={stop}>
                <Composer.Input aria-label="Preview message" placeholder="Ask about the release…" />
                <Composer.Toolbar>
                    <Composer.Actions>
                        <Attachment.Trigger variant="ghost" size="sm">
                            Attach files
                        </Attachment.Trigger>
                    </Composer.Actions>
                    <div class="ml-auto flex min-w-0 items-center gap-1">
                        <Select.Root bind:value={model}>
                            <Select.Trigger variant="ghost" class="w-auto" aria-label="Demo model">
                                {model}
                            </Select.Trigger>
                            <Select.Content>
                                <Select.Item value="Mielui 3.1">Mielui 3.1</Select.Item>
                                <Select.Item value="Mielui Mini">Mielui Mini</Select.Item>
                            </Select.Content>
                        </Select.Root>
                        <Composer.Submit />
                    </div>
                </Composer.Toolbar>
            </Composer.Root>
        </Attachment.Root>
    </div>
</div>
