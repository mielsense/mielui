<script lang="ts">
    import * as Accordion from '@mielui/svelte/components/accordion';
    import * as Avatar from '@mielui/svelte/components/avatar';
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import * as Calendar from '@mielui/svelte/components/calendar';
    import * as Card from '@mielui/svelte/components/card';
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import * as EmptyState from '@mielui/svelte/components/empty-state';
    import { Progress } from '@mielui/svelte/components/progress';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import * as TagInput from '@mielui/svelte/components/tag-input';
    import { Textarea } from '@mielui/svelte/components/textarea';
    import { toast } from '@mielui/svelte/components/toast';

    let reviewed = $state(true);
    let tested = $state(false);
    let notes = $state('Review the release notes before publishing.');
    let tags = $state(['Design', 'Release']);
    let publicLink = $state(false);

    function save() {
        toast.success('Changes saved');
    }
</script>

<div
    class="grid grid-cols-1 items-start gap-5 px-6 py-6 @3xl:grid-cols-2 @6xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_21rem]"
>
    <div class="flex min-w-0 flex-col gap-5">
        <Card.Root variant="inset" class="min-w-0">
            <Card.Header>
                <Card.Title>Release checklist</Card.Title>
                <Card.Description>
                    {Number(reviewed) + Number(tested)} of 2 checks complete
                </Card.Description>
            </Card.Header>
            <Card.Content class="space-y-4">
                <Checkbox bind:checked={reviewed} label="Review migration notes" />
                <Checkbox bind:checked={tested} label="Check keyboard navigation" />
                <Textarea aria-label="Release notes" bind:value={notes} />
            </Card.Content>
            <Card.Footer>
                <Button class="w-full" onclick={save}>Save checklist</Button>
            </Card.Footer>
        </Card.Root>
        <Card.Root variant="inset" class="min-w-0">
            <Card.Header>
                <Card.Title>Workspace storage</Card.Title>
                <Card.Description>6.4 GB of 10 GB used</Card.Description>
            </Card.Header>
            <Card.Content class="space-y-4">
                <Progress value={64} aria-label="Storage used" />
                <p class="text-sm text-foreground-muted">
                    Your files and attachments are included in this workspace.
                </p>
            </Card.Content>
            <Card.Footer>
                <Button
                    variant="outline"
                    class="w-full"
                    onclick={() => toast.info('Storage is up to date')}
                >
                    Manage storage
                </Button>
            </Card.Footer>
        </Card.Root>
        <Card.Root variant="inset" class="min-w-0">
            <Card.Header>
                <Card.Title>Project labels</Card.Title>
                <Card.Description>Keep related work together.</Card.Description>
            </Card.Header>
            <Card.Content>
                <TagInput.Root bind:tags label="Labels" max={5} description="Add up to 5 labels.">
                    <TagInput.List />
                    <TagInput.Input placeholder="Add a label…" />
                </TagInput.Root>
            </Card.Content>
        </Card.Root>
    </div>
    <div class="flex min-w-0 flex-col gap-5">
        <Card.Root variant="inset" class="min-w-0">
            <Card.Header>
                <Card.Title>Your team</Card.Title>
                <Card.Description>People with access to this workspace.</Card.Description>
            </Card.Header>
            <Card.Content class="space-y-4">
                {#each [{ name: 'Alex Morgan', initials: 'AM', role: 'Owner' }, { name: 'Sam Rivera', initials: 'SR', role: 'Editor' }] as member}
                    <div class="flex items-center gap-3">
                        <Avatar.Root>
                            <Avatar.Fallback>{member.initials}</Avatar.Fallback>
                        </Avatar.Root>
                        <span class="min-w-0 flex-1 text-sm">{member.name}</span>
                        <Badge variant="outline">{member.role}</Badge>
                    </div>
                {/each}
            </Card.Content>
            <Card.Footer>
                <Button
                    variant="outline"
                    class="w-full"
                    onclick={() => toast.info('Invitation preview', { description: 'Your team invitation would appear here.' })}
                >
                    Invite a teammate
                </Button>
            </Card.Footer>
        </Card.Root>
        <Card.Root variant="inset" class="min-w-0">
            <Card.Header>
                <Card.Title>Questions</Card.Title>
                <Card.Description>
                    Headings, body text, and disclosures in one place.
                </Card.Description>
            </Card.Header>
            <Card.Content>
                <Accordion.Root type="single" value="theme">
                    <Accordion.Item value="theme">
                        <Accordion.Trigger>What does my theme include?</Accordion.Trigger>
                        <Accordion.Content>
                            Colors, typography, control sizes, corners, and motion settings travel
                            with your preset.
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="export">
                        <Accordion.Trigger>Can I use it in my project?</Accordion.Trigger>
                        <Accordion.Content>
                            Choose Use theme in the sidebar to download the preset and initialize
                            Mielui with your settings.
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            </Card.Content>
        </Card.Root>
        <Card.Root variant="inset" class="min-w-0">
            <Card.Header><Card.Title>Notifications</Card.Title></Card.Header>
            <Card.Content>
                <Tabs.Root value="inbox" variant="ghost">
                    <Tabs.List>
                        <Tabs.Trigger value="inbox">Inbox</Tabs.Trigger>
                        <Tabs.Trigger value="archived">Archived</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="inbox">
                        <div class="space-y-3 py-4">
                            <p class="text-sm font-medium">Your export is ready</p>
                            <p class="text-sm text-foreground-muted">
                                The latest workspace snapshot is ready to download.
                            </p>
                            <Badge variant="success">New</Badge>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="archived">
                        <EmptyState.Root class="px-0 py-6">
                            <EmptyState.Header>
                                <EmptyState.Title level={3}>Nothing archived yet</EmptyState.Title>
                                <EmptyState.Description>
                                    Notifications you archive will appear here.
                                </EmptyState.Description>
                            </EmptyState.Header>
                        </EmptyState.Root>
                    </Tabs.Content>
                </Tabs.Root>
            </Card.Content>
        </Card.Root>
    </div>
    <div
        class="grid min-w-0 items-start gap-5 @3xl:col-span-2 @3xl:grid-cols-2 @6xl:col-span-1 @6xl:grid-cols-1"
    >
        <Card.Root variant="inset" class="w-fit max-w-full min-w-0">
            <Card.Header>
                <Card.Title>Choose a date</Card.Title>
                <Card.Description>Plan your next team check-in.</Card.Description>
            </Card.Header>
            <Card.Content class="min-w-0">
                <Calendar.Root calendarLabel="Team check-in" class="p-0" />
            </Card.Content>
        </Card.Root>
        <Card.Root variant="inset" class="min-w-0">
            <Card.Header>
                <Card.Title>Share this workspace</Card.Title>
                <Card.Description>
                    {publicLink ? 'Anyone with the link can view.' : 'Only your team has access.'}
                </Card.Description>
            </Card.Header>
            <Card.Content>
                <Switch bind:checked={publicLink} label="Public link" />
            </Card.Content>
            <Card.Footer>
                <Button
                    variant="outline"
                    class="w-full"
                    disabled={!publicLink}
                    onclick={async () => {
            try {
                await navigator.clipboard.writeText('https://mielui.dev/workspace/demo');
                toast.success('Demo link copied');
            } catch {
                toast.error('Could not copy the demo link');
            }
        }}
                >
                    Copy demo link
                </Button>
            </Card.Footer>
        </Card.Root>
    </div>
</div>
