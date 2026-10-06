<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import * as Accordion from '@mielui/svelte/components/accordion';
    import * as Avatar from '@mielui/svelte/components/avatar';
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import * as Calendar from '@mielui/svelte/components/calendar';
    import * as Card from '@mielui/svelte/components/card';
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import * as Menu from '@mielui/svelte/components/dropdown-menu';
    import * as EmptyState from '@mielui/svelte/components/empty-state';
    import * as Group from '@mielui/svelte/components/group';
    import * as HoverCard from '@mielui/svelte/components/hover-card';
    import { Input } from '@mielui/svelte/components/input';
    import * as Popover from '@mielui/svelte/components/popover';
    import { Progress } from '@mielui/svelte/components/progress';
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import * as Select from '@mielui/svelte/components/select';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import * as TagInput from '@mielui/svelte/components/tag-input';
    import { Textarea } from '@mielui/svelte/components/textarea';
    import { toast } from '@mielui/svelte/components/toast';
    import { demoCardClass } from './demo-card';

    const uid = $props.id();
    let access = $state('team');
    let digest = $state(true);
    let slug = $state('');
    let name = $state('Alex Morgan');
    let role = $state('editor');
    let notifications = $state(true);
    let volume = $state(60);
    function save() {
        toast.success('Changes saved');
    }
    let reviewed = $state(true);
    let tested = $state(false);
    let notes = $state('Review the release notes before publishing.');
    let tags = $state(['Design', 'Release']);
    let publicLink = $state(false);

    const cardClass = `mb-4 break-inside-avoid ${demoCardClass}`;

    async function copyAddress() {
        try {
            await navigator.clipboard.writeText(`https://mielui.dev/${slug || 'your-workspace'}`);
            toast.success('Address copied');
        } catch {
            toast.error('Could not copy the address');
        }
    }
</script>

<ScrollArea class="h-full min-h-0" showCues={false}>
    <div class="@container w-full">
        <h2 class="sr-only">Components</h2>
        <div class="columns-1 gap-4 p-4 @2xl:columns-2 @5xl:columns-3 @[88rem]:columns-4 sm:p-5">
            <Card.Root variant="inset" class={cardClass}>
                <Card.Header>
                    <Card.Title>Workspace profile</Card.Title>
                    <Card.Description>How your workspace appears to teammates.</Card.Description>
                </Card.Header>
                <Card.Content class="flex flex-col gap-4">
                    <Input label="Display name" bind:value={name} />
                    <div class="flex flex-col gap-1.5">
                        <span id={`${uid}-role`} class="text-sm font-medium">Default role</span>
                        <Select.Root bind:value={role}>
                            <Select.Trigger aria-labelledby={`${uid}-role`} class="w-full">
                                {role === 'editor' ? 'Editor' : 'Viewer'}
                            </Select.Trigger>
                            <Select.Content>
                                <Select.Item value="editor">Editor</Select.Item>
                                <Select.Item value="viewer">Viewer</Select.Item>
                            </Select.Content>
                        </Select.Root>
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <span class="text-sm font-medium">Workspace address</span>
                        <Group.Root aria-label="Workspace address" class="w-full">
                            <Group.Text>mielui.dev/</Group.Text>
                            <Input
                                aria-label="Workspace slug"
                                bind:value={slug}
                                placeholder="your-workspace"
                                class="min-w-0 flex-1"
                            />
                            <Group.Separator />
                            <Button variant="outline" onclick={copyAddress}>Copy</Button>
                        </Group.Root>
                    </div>
                </Card.Content>
                <Card.Footer>
                    <Button variant="ghost" onclick={() => toast.info('Changes discarded')}>
                        Discard
                    </Button>
                    <Button onclick={save}>Save changes</Button>
                </Card.Footer>
            </Card.Root>
            <Card.Root variant="inset" class={cardClass}>
                <Card.Header>
                    <Card.Title>Release checklist</Card.Title>
                    <Card.Description>
                        {Number(reviewed) + Number(tested)}
                        of 2 checks complete
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
            <Card.Root variant="inset" class={cardClass}>
                <Card.Header>
                    <Card.Title>Project labels</Card.Title>
                    <Card.Description>Keep related work together.</Card.Description>
                </Card.Header>
                <Card.Content>
                    <TagInput.Root
                        bind:tags
                        label="Labels"
                        max={5}
                        description="Add up to 5 labels."
                    >
                        <TagInput.List />
                        <TagInput.Input placeholder="Add a label…" />
                    </TagInput.Root>
                </Card.Content>
            </Card.Root>
            <Card.Root variant="inset" class={cardClass}>
                <Card.Header>
                    <Card.Title>Buttons and states</Card.Title>
                    <Card.Description>Variants, feedback, and validation.</Card.Description>
                </Card.Header>
                <Card.Content class="flex flex-col gap-4">
                    <div class="flex flex-wrap items-center gap-2">
                        <Button onclick={save}>Primary</Button>
                        <Button variant="secondary" onclick={() => toast.info('Secondary action')}>
                            Secondary
                        </Button>
                        <Button variant="outline" onclick={() => toast.info('Preview opened')}>
                            Outline
                        </Button>
                        <Button variant="ghost" onclick={() => toast.info('Ghost action')}
                            >Ghost</Button
                        >
                    </div>
                    <div class="flex flex-wrap items-center gap-2">
                        <Button disabled>Unavailable</Button>
                        <Button loading loadingLabel="Saving">Save</Button>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <Badge variant="success">Active</Badge>
                        <Badge variant="outline">Draft</Badge>
                        <Badge variant="error">Failed</Badge>
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <Input
                            label="Email address"
                            value="alex@"
                            aria-invalid="true"
                            aria-describedby={`${uid}-email-error`}
                        />
                        <p id={`${uid}-email-error`} class="m-0 text-sm text-error">
                            Enter a complete email address.
                        </p>
                    </div>
                </Card.Content>
            </Card.Root>
            <Card.Root variant="inset" class={cardClass}>
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
            <Card.Root variant="inset" class={cardClass}>
                <Card.Header>
                    <Card.Title>Choose a date</Card.Title>
                    <Card.Description>Plan your next team check-in.</Card.Description>
                </Card.Header>
                <Card.Content class="flex min-w-0 justify-center">
                    <Calendar.Root calendarLabel="Team check-in" class="mx-auto w-fit p-0" />
                </Card.Content>
            </Card.Root>
            <Card.Root variant="inset" class={cardClass}>
                <Card.Header>
                    <Card.Title>Preferences</Card.Title>
                    <Card.Description>
                        {digest ? 'Weekly digest is on' : 'Weekly digest is off'}
                    </Card.Description>
                </Card.Header>
                <Card.Content class="flex flex-col gap-5">
                    <Switch label="Email notifications" bind:checked={notifications} />
                    <div class="flex flex-col gap-2">
                        <div class="flex items-baseline justify-between gap-2 text-sm">
                            <span id={`${uid}-volume`}>Volume</span>
                            <span
                                class="tabular-nums text-foreground-muted"
                                use:numberShuffle={{
                                value: volume,
                                format: (value) => `${value}%`
                            }}
                            >
                                {`${volume}%`}
                            </span>
                        </div>
                        <Slider aria-labelledby={`${uid}-volume`} bind:value={volume} />
                    </div>
                </Card.Content>
                <Card.Footer>
                    <Popover.Root placement="bottom-start">
                        <Popover.Trigger variant="outline" class="w-full"
                            >Edit digest</Popover.Trigger
                        >
                        <Popover.Content class="w-72" surfaceClass="space-y-4 p-4">
                            <Popover.Title>Stay up to date</Popover.Title>
                            <p class="text-sm text-foreground-muted">
                                Receive a summary of activity in your workspace.
                            </p>
                            <Switch bind:checked={digest} label="Weekly digest" />
                        </Popover.Content>
                    </Popover.Root>
                </Card.Footer>
            </Card.Root>
            <Card.Root variant="inset" class={cardClass}>
                <Card.Header>
                    <Card.Title>Release workspace</Card.Title>
                    <Card.Description>Design system · 12 members</Card.Description>
                </Card.Header>
                <Card.Content>
                    <HoverCard.Root>
                        <HoverCard.Trigger
                            class="flex items-center gap-3 self-start rounded-[var(--radius-md)] text-left text-sm focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                        >
                            <Avatar.Root>
                                <Avatar.Fallback>AM</Avatar.Fallback>
                            </Avatar.Root>
                            <span class="flex flex-col">
                                <span>Alex Morgan</span>
                                <span class="text-xs text-foreground-muted">
                                    Product designer
                                </span>
                            </span>
                        </HoverCard.Trigger>
                        <HoverCard.Content side="bottom" align="start" class="w-64">
                            <HoverCard.Title>Alex Morgan</HoverCard.Title>
                            <HoverCard.Description>
                                Product designer · Workspace owner
                            </HoverCard.Description>
                            <p class="mt-3 text-sm text-foreground-muted">
                                Working on the next release.
                            </p>
                        </HoverCard.Content>
                    </HoverCard.Root>
                </Card.Content>
                <Card.Footer>
                    <Menu.Root>
                        <Menu.Trigger variant="outline" class="w-full">Manage project</Menu.Trigger>
                        <Menu.Content>
                            <Menu.Label>Release workspace</Menu.Label>
                            <Menu.Item onclick={() => toast.info('Project opened')}>
                                Open project
                            </Menu.Item>
                            <Menu.Item onclick={() => toast.success('Project duplicated')}>
                                Duplicate
                            </Menu.Item>
                            <Menu.Separator />
                            <Menu.Label>Access</Menu.Label>
                            <Menu.RadioGroup bind:value={access}>
                                <Menu.RadioItem value="team">Team only</Menu.RadioItem>
                                <Menu.RadioItem value="everyone"
                                    >Anyone with the link</Menu.RadioItem
                                >
                            </Menu.RadioGroup>
                        </Menu.Content>
                    </Menu.Root>
                </Card.Footer>
            </Card.Root>
            <Card.Root variant="inset" class={cardClass}>
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
                                    <EmptyState.Title level={3}
                                        >Nothing archived yet</EmptyState.Title
                                    >
                                    <EmptyState.Description>
                                        Notifications you archive will appear here.
                                    </EmptyState.Description>
                                </EmptyState.Header>
                            </EmptyState.Root>
                        </Tabs.Content>
                    </Tabs.Root>
                </Card.Content>
            </Card.Root>
            <Card.Root variant="inset" class={cardClass}>
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
            <Card.Root variant="inset" class={cardClass}>
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
            <Card.Root variant="inset" class={cardClass}>
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
</ScrollArea>
