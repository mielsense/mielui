<script lang="ts">
    import * as Accordion from '@mielui/svelte/components/accordion';
    import * as Avatar from '@mielui/svelte/components/avatar';
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import * as Calendar from '@mielui/svelte/components/calendar';
    import * as Card from '@mielui/svelte/components/card';
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import * as EmptyState from '@mielui/svelte/components/empty-state';
    import * as Group from '@mielui/svelte/components/group';
    import { Input } from '@mielui/svelte/components/input';
    import { Progress } from '@mielui/svelte/components/progress';
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import * as Select from '@mielui/svelte/components/select';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { Textarea } from '@mielui/svelte/components/textarea';
    import { toast } from '@mielui/svelte/components/toast';

    let reviewed = $state(true);
    let tested = $state(false);
    let notes = $state('Review the release notes before publishing.');

    const uid = $props.id();
    let slug = $state('');
    let name = $state('Alex Morgan');
    let role = $state('editor');
    let notifications = $state(true);
    let volume = $state(60);

    function save() {
        toast.success('Changes saved');
    }
</script>

<ScrollArea class="h-full min-h-0" showCues={false}>
    <div class="@container w-full">
        <section aria-labelledby="studio-controls">
            <h2
                id="studio-controls"
                class="sticky top-0 z-10 border-b-[length:var(--border-size)] border-[var(--docs-rule)] bg-[var(--docs-chrome)] flex h-[var(--docs-row-height)] items-center px-6 text-sm font-semibold"
            >
                Controls
            </h2>
            <div
                class="grid grid-cols-1 gap-x-10 gap-y-8 px-6 py-8 @3xl:grid-cols-2 @6xl:grid-cols-4"
            >
                <section class="min-w-0">
                    <Card.Content class="flex flex-col gap-4">
                        <h3 class="text-sm font-medium">Actions</h3>
                        <div class="flex flex-wrap items-center gap-2">
                            <Button onclick={save}>Save changes</Button>
                            <Button variant="outline" onclick={() => toast.info('Preview opened')}>
                                Preview
                            </Button>
                            <Button variant="ghost" onclick={() => toast.info('Changes discarded')}>
                                Discard
                            </Button>
                        </div>
                        <div class="flex flex-wrap items-center gap-2">
                            <Button disabled>Unavailable</Button>
                            <Button loading loadingLabel="Saving">Save</Button>
                        </div>
                        <p class="text-sm text-foreground-muted">
                            Default, secondary, disabled, and loading states.
                        </p>
                    </Card.Content>
                </section>
                <section class="min-w-0">
                    <Card.Content class="flex flex-col gap-4">
                        <h3 class="text-sm font-medium">Text and selection</h3>
                        <Input label="Display name" bind:value={name} />
                        <Select.Root bind:value={role}>
                            <Select.Trigger aria-label="Member role" class="w-full">
                                {role === 'editor' ? 'Editor' : 'Viewer'}
                            </Select.Trigger>
                            <Select.Content>
                                <Select.Item value="editor">Editor</Select.Item>
                                <Select.Item value="viewer">Viewer</Select.Item>
                            </Select.Content>
                        </Select.Root>
                    </Card.Content>
                </section>
                <section class="min-w-0">
                    <Card.Content class="flex flex-col gap-4">
                        <h3 class="text-sm font-medium">Joined controls</h3>
                        <Group.Root aria-label="Workspace address" class="w-full">
                            <Group.Text>mielui.dev/</Group.Text>
                            <Input
                                aria-label="Workspace slug"
                                bind:value={slug}
                                placeholder="your-workspace"
                                class="min-w-0 flex-1"
                            />
                            <Group.Separator />
                            <Button
                                variant="outline"
                                onclick={async () => {
                                await navigator.clipboard.writeText(`https://mielui.dev/${slug || 'your-workspace'}`);
                                toast.success('Address copied');
                            }}
                            >
                                Copy
                            </Button>
                        </Group.Root>
                        <Input
                            label="Email address"
                            value="alex@"
                            aria-invalid="true"
                            aria-describedby={`${uid}-email-error`}
                        />
                        <p id={`${uid}-email-error`} class="text-sm text-error">
                            Enter a complete email address.
                        </p>
                    </Card.Content>
                </section>
                <section class="min-w-0">
                    <Card.Content class="flex flex-col gap-4">
                        <h3 class="text-sm font-medium">Preferences and status</h3>
                        <Switch label="Email notifications" bind:checked={notifications} />
                        <Slider label="Volume" bind:value={volume} />
                        <div class="flex flex-wrap gap-2">
                            <Badge variant="success">Active</Badge>
                            <Badge variant="outline">Draft</Badge>
                            <Badge variant="error">Failed</Badge>
                        </div>
                    </Card.Content>
                </section>
            </div>
        </section>
        <section aria-labelledby="studio-content">
            <h2
                id="studio-content"
                class="sticky top-0 z-10 border-y-[length:var(--border-size)] border-[var(--docs-rule)] bg-[var(--docs-chrome)] flex h-[var(--docs-row-height)] items-center px-6 text-sm font-semibold"
            >
                Content and layout
            </h2>
            <div
                class="grid grid-cols-1 items-start gap-6 px-6 py-8 @3xl:grid-cols-2 @6xl:grid-cols-3"
            >
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
                                    Colors, typography, control sizes, corners, and motion settings
                                    travel with your preset.
                                </Accordion.Content>
                            </Accordion.Item>
                            <Accordion.Item value="export">
                                <Accordion.Trigger>Can I use it in my project?</Accordion.Trigger>
                                <Accordion.Content>
                                    Choose Use theme in the sidebar to download the preset and
                                    initialize Mielui with your settings.
                                </Accordion.Content>
                            </Accordion.Item>
                        </Accordion.Root>
                    </Card.Content>
                </Card.Root>
                <Card.Root variant="inset" class="min-w-0">
                    <Card.Header>
                        <Card.Title>Choose a date</Card.Title>
                        <Card.Description>Plan your next team check-in.</Card.Description>
                    </Card.Header>
                    <Card.Content class="overflow-x-auto">
                        <Calendar.Root calendarLabel="Team check-in" />
                    </Card.Content>
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
                                        <EmptyState.Title level={3}>
                                            Nothing archived yet
                                        </EmptyState.Title>
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
        </section>
    </div>
</ScrollArea>
