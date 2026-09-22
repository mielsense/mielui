<script lang="ts">
    import * as Accordion from '@mielui/svelte/components/accordion';
    import * as Avatar from '@mielui/svelte/components/avatar';
    import * as Calendar from '@mielui/svelte/components/calendar';
    import * as Card from '@mielui/svelte/components/card';
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import { Progress } from '@mielui/svelte/components/progress';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { Textarea } from '@mielui/svelte/components/textarea';

    let reviewed = $state(true);
    let tested = $state(false);
    let notes = $state('A quieter workspace for the next release.');

    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import * as Group from '@mielui/svelte/components/group';
    import { Input } from '@mielui/svelte/components/input';
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import * as Select from '@mielui/svelte/components/select';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import { toast } from '@mielui/svelte/components/toast';

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
    <div class="@container w-full p-5 @min-[640px]:p-8">
        <header class="mb-6">
            <h2 class="text-xl font-semibold">Component gallery</h2>
            <p class="mt-1 text-sm text-foreground-muted">
                Try your theme on the details people use every day.
            </p>
        </header>
        <div
            class="columns-1 gap-4 @2xl:columns-2 @5xl:columns-3 @7xl:columns-4 [&>[data-ui=card]]:mb-4 [&>[data-ui=card]]:break-inside-avoid"
        >
            <Card.Root class="min-w-0">
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
            </Card.Root>
            <Card.Root class="min-w-0">
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
            </Card.Root>
            <Card.Root class="min-w-0">
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
                            onclick={async () => { await navigator.clipboard.writeText(`https://mielui.dev/${slug || 'your-workspace'}`); toast.success('Address copied'); }}
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
            </Card.Root>
            <Card.Root class="min-w-0">
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
            </Card.Root>
            <Card.Root class="min-w-0">
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
            <Card.Root class="min-w-0">
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
            <Card.Root class="min-w-0 @2xl:col-span-2 @5xl:col-span-1">
                <Card.Header>
                    <Card.Title>A little more clarity</Card.Title>
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
            <Card.Root class="min-w-0">
                <Card.Header>
                    <Card.Title>Choose a date</Card.Title>
                    <Card.Description>Plan your next team check-in.</Card.Description>
                </Card.Header>
                <Card.Content class="overflow-x-auto">
                    <Calendar.Root calendarLabel="Team check-in" />
                </Card.Content>
            </Card.Root>
            <Card.Root class="min-w-0">
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
            <Card.Root class="min-w-0">
                <Card.Header><Card.Title>Notifications</Card.Title></Card.Header>
                <Card.Content>
                    <Tabs.Root value="inbox" variant="segmented">
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
                            <p class="py-4 text-sm text-foreground-muted">
                                No archived notifications.
                            </p>
                        </Tabs.Content>
                    </Tabs.Root>
                </Card.Content>
            </Card.Root>
        </div>
    </div>
</ScrollArea>
