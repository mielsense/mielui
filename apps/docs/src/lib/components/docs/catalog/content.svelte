<script lang="ts">
    import {
        ArrowRight01Icon as ChevronRight,
        Sun03Icon as Sun,
        ThumbsUpIcon as ThumbsUp,
        WorkflowSquare01Icon as Workflow
    } from '@hugeicons/core-free-icons';
    import { shimmer } from '@mielui/svelte/actions/shimmer';
    import * as Attachment from '@mielui/svelte/components/attachment';
    import * as Avatar from '@mielui/svelte/components/avatar';
    import { Badge } from '@mielui/svelte/components/badge';
    import * as Breadcrumb from '@mielui/svelte/components/breadcrumb';
    import { Button } from '@mielui/svelte/components/button';
    import * as CodeBlock from '@mielui/svelte/components/code-block';
    import * as Composer from '@mielui/svelte/components/composer';
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import type { FileDiffLine } from '@mielui/svelte/components/file-diff';
    import * as FileDiff from '@mielui/svelte/components/file-diff';
    import * as FolderCard from '@mielui/svelte/components/folder-card';
    import Kbd from '@mielui/svelte/components/kbd';
    import { Markdown } from '@mielui/svelte/components/markdown';
    import * as Message from '@mielui/svelte/components/message';
    import { Pagination } from '@mielui/svelte/components/pagination';
    import * as Question from '@mielui/svelte/components/question';
    import * as Reasoning from '@mielui/svelte/components/reasoning';
    import { ReorderList } from '@mielui/svelte/components/reorder-list';
    import { ResponseStream } from '@mielui/svelte/components/response-stream';
    import * as Select from '@mielui/svelte/components/select';
    import Separator from '@mielui/svelte/components/separator';
    import { ShowMore } from '@mielui/svelte/components/show-more';
    import { Skeleton } from '@mielui/svelte/components/skeleton';
    import { Spinner } from '@mielui/svelte/components/spinner';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { type TaskStep, TaskSteps } from '@mielui/svelte/components/task-steps';
    import * as Tool from '@mielui/svelte/components/tool';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let { slug }: { slug: string } = $props();

    let prompt = $state('Review these and call out risks.');
    let format = $state('pdf');

    function submitPrompt() {
        prompt = '';
    }

    function chooseFormat(answer: string) {
        format = answer;
    }

    const files = [
        new File(['Notes'], 'notes.md', {
            type: 'text/markdown'
        }),
        new File(['Plan'], 'plan.pdf', {
            type: 'application/pdf'
        })
    ];
    const diff: FileDiffLine[] = [
        {
            type: 'context',
            oldLineNumber: 12,
            newLineNumber: 12,
            content: 'function getToken() {'
        },
        {
            type: 'remove',
            oldLineNumber: 13,
            content: '  return store.token;'
        },
        {
            type: 'add',
            newLineNumber: 13,
            content: '  return session();'
        }
    ];
    const code = `const theme = 'daydream';

<Button>Save</Button>`;
    const agenda = [
        {
            id: 'opening',
            name: 'Opening remarks'
        },
        {
            id: 'roadmap',
            name: 'Roadmap review'
        },
        {
            id: 'critique',
            name: 'Design critique'
        }
    ];
    const steps: TaskStep[] = [
        {
            id: 'build',
            label: 'Building',
            meta: '8.1s'
        },
        {
            id: 'checks',
            label: 'Running checks',
            meta: '3.4s'
        },
        {
            id: 'deploy',
            label: 'Deploying'
        }
    ];
    const markdown = [
        '### Edge cache rollout',
        '',
        'Origin traffic fell by **38%** with `cache_hit_age` in range.'
    ].join('\n');
</script>

{#if slug === 'avatar'}
    <div class="flex -space-x-1.5">
        {#each ['AM', 'SR', 'JL'] as initials (initials)}
            <Avatar.Root class="ring-2 ring-card">
                <Avatar.Fallback>{initials}</Avatar.Fallback>
            </Avatar.Root>
        {/each}
    </div>
{:else if slug === 'badge'}
    <div class="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="primary">New</Badge>
        <Badge>Draft</Badge>
        <Badge variant="outline">Label</Badge>
        <Badge variant="success">Published</Badge>
    </div>
{:else if slug === 'breadcrumb'}
    <Breadcrumb.Root>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Separator>
            <HugeiconsIcon icon={ChevronRight} size={14} />
        </Breadcrumb.Separator>
        <Breadcrumb.Item href="/docs">Docs</Breadcrumb.Item>
        <Breadcrumb.Separator>
            <HugeiconsIcon icon={ChevronRight} size={14} />
        </Breadcrumb.Separator>
        <Breadcrumb.Item current>Button</Breadcrumb.Item>
    </Breadcrumb.Root>
{:else if slug === 'kbd'}
    <div class="flex items-center gap-3">
        <Button variant="ghost">
            Cancel
            <Kbd shortcut="esc" />
        </Button>
        <Button>
            Save
            <Kbd shortcut="enter" />
        </Button>
    </div>
{:else if slug === 'pagination'}
    <Pagination page={2} total={9} />
{:else if slug === 'separator'}
    <div class="flex w-56 flex-col gap-3 text-sm">
        <p>Workspace</p>
        <Separator />
        <div class="flex h-5 items-center gap-4 text-foreground-muted">
            <span>Projects</span>
            <Separator orientation="vertical" decorative />
            <span>Members</span>
        </div>
    </div>
{:else if slug === 'skeleton'}
    <div class="flex w-60 items-center gap-3">
        <Skeleton w={40} h={40} class="shrink-0 rounded-full" />
        <div class="flex flex-1 flex-col gap-2">
            <Skeleton h={12} class="w-full" />
            <Skeleton h={12} class="w-2/3" />
        </div>
    </div>
{:else if slug === 'spinner'}
    <div class="flex items-center gap-3 text-sm text-foreground-muted">
        <Spinner aria-hidden="true" />
        <span>Checking for updates</span>
    </div>
{:else if slug === 'tabs'}
    <Tabs.Root value="overview" class="w-64">
        <Tabs.List class="grid w-full grid-cols-2">
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview" class="pt-3">
            <p class="text-sm text-foreground-muted">Everything is up to date.</p>
        </Tabs.Content>
    </Tabs.Root>
{:else if slug === 'typography'}
    <div class="flex w-64 flex-col gap-1.5">
        <Typography.Metadata>Project notes</Typography.Metadata>
        <Typography.Title level={3}>Preparing the release</Typography.Title>
        <Typography.Description>Review the updated components first.</Typography.Description>
    </div>
{:else if slug === 'markdown'}
    <Markdown content={markdown} class="w-64" />
{:else if slug === 'code-block'}
    <CodeBlock.Root value="svelte" class="w-full max-w-72">
        <CodeBlock.Content value="svelte" {code} lang="svelte" />
    </CodeBlock.Root>
{:else if slug === 'file-diff'}
    <FileDiff.Root file="src/auth.ts" lang="ts" {diff} class="w-full max-w-72" />
{:else if slug === 'folder-card'}
    <FolderCard.Root tone={1} class="w-56">
        <FolderCard.Cover />
        <FolderCard.Tab>
            <FolderCard.Title>Client projects</FolderCard.Title>
        </FolderCard.Tab>
        <FolderCard.Footer>
            <FolderCard.Index>001</FolderCard.Index>
            <FolderCard.Count value={3957} />
        </FolderCard.Footer>
    </FolderCard.Root>
{:else if slug === 'reorder-list'}
    <div class="w-60">
        <ReorderList
            items={agenda}
            getId={(item) => item.id}
            getLabel={(item) => item.name}
            label="Meeting agenda"
        >
            {#snippet children(item)}
                <span class="truncate text-sm font-medium">{item.name}</span>
            {/snippet}
        </ReorderList>
    </div>
{:else if slug === 'task-steps'}
    <TaskSteps {steps} current={1} label="Deploy progress" class="w-56" />
{:else if slug === 'show-more'}
    <div class="w-64 text-sm">
        <ShowMore lines={2} label="Migration details">
            <p>
                The workspace migration starts Tuesday at 09:00 UTC. Projects, comments, and files
                move together while read-only access stays available.
            </p>
        </ShowMore>
    </div>
{:else if slug === 'attachment'}
    <div class="flex w-72 flex-wrap justify-center gap-2">
        <Attachment.Item file={files[0]} status="complete" variant="chip" removable={false} />
        <Attachment.Item
            file={files[1]}
            status="uploading"
            progress={64}
            variant="chip"
            removable={false}
        />
    </div>
{:else if slug === 'composer'}
    <Attachment.Root files={[...files]} class="flex w-full max-w-72 flex-col gap-2">
        <Attachment.List variant="chip" class="overflow-x-auto" />
        <Composer.Root bind:value={prompt} onSubmit={submitPrompt}>
            <Composer.Input aria-label="Prompt" placeholder="Ask the agent…" class="min-h-10" />
            <Composer.Toolbar>
                <Composer.Actions>
                    <Attachment.Trigger variant="outline" />
                    <Select.Root value="Plan">
                        <Select.Trigger variant="outline" class="w-auto">
                            <HugeiconsIcon icon={Workflow} size={14} aria-hidden="true" />
                            Plan
                        </Select.Trigger>
                    </Select.Root>
                </Composer.Actions>
                <Composer.Submit class="ml-auto" />
            </Composer.Toolbar>
        </Composer.Root>
    </Attachment.Root>
{:else if slug === 'conversation'}
    <div class="flex w-full max-w-72 flex-col gap-3 text-sm">
        <Message.Root from="user">
            <Message.Content>Summarize this report.</Message.Content>
        </Message.Root>
        <Message.Root from="assistant">
            <Message.Content>Revenue grew 12% this quarter.</Message.Content>
        </Message.Root>
        <Message.Root from="user">
            <Message.Content>What drove it?</Message.Content>
        </Message.Root>
    </div>
{:else if slug === 'message'}
    <div class="w-full max-w-72 text-sm">
        <Message.Root from="assistant" name="Assistant" timestamp="09:41">
            <Message.Content>Three changes need review before Friday’s release.</Message.Content>
            <Message.Actions aria-label="Response actions">
                <CopyButton text="Three changes need review." label="Copy response" />
                <Button variant="ghost" size="icon" aria-label="Mark as helpful">
                    <HugeiconsIcon icon={ThumbsUp} size={15} aria-hidden="true" />
                </Button>
            </Message.Actions>
        </Message.Root>
    </div>
{:else if slug === 'question'}
    <Question.Root type="single" bind:value={format} onSubmit={chooseFormat} class="w-72">
        <Question.Content>
            <Question.Title>Which format?</Question.Title>
            <Question.Options>
                <Question.Option value="pdf" label="PDF" />
                <Question.Option value="markdown" label="Markdown" />
            </Question.Options>
        </Question.Content>
    </Question.Root>
{:else if slug === 'reasoning'}
    <Reasoning.Root open class="w-72">
        <Reasoning.Trigger title="Investigated checkout failures" duration="4.8s" />
        <Reasoning.Content>
            <p>Compared the incident timeline with the last five deployments.</p>
        </Reasoning.Content>
    </Reasoning.Root>
{:else if slug === 'response-stream'}
    <div class="w-64 text-sm leading-relaxed">
        <ResponseStream
            textStream="The release contains twelve changes. Two affect keyboard navigation, and four update the documentation."
        />
    </div>
{:else if slug === 'tool'}
    <Tool.Root name="2 tools" state="complete" duration="6s" class="w-72">
        <Tool.Item name="Grep" detail="Composer" kind="search" />
        <Tool.Item name="Bash" detail="pnpm lint" />
    </Tool.Root>
{:else if slug === 'morph'}
    <Button variant="outline">
        <HugeiconsIcon icon={Sun} size={20} aria-hidden="true" />
        Day
    </Button>
{:else if slug === 'number-shuffle'}
    <span class="text-4xl tabular-nums">1,284</span>
{:else if slug === 'shimmer'}
    <div class="flex w-56 flex-col gap-3">
        <div use:shimmer class="size-10 rounded-full bg-secondary"></div>
        <div use:shimmer class="h-3 rounded-[var(--radius-md)] bg-secondary"></div>
        <div use:shimmer class="h-3 w-2/3 rounded-[var(--radius-md)] bg-secondary"></div>
    </div>
{/if}
