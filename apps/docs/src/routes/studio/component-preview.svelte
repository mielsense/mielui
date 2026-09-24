<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
    import * as Menu from '@mielui/svelte/components/dropdown-menu';
    import * as Group from '@mielui/svelte/components/group';
    import * as HoverCard from '@mielui/svelte/components/hover-card';
    import { Input } from '@mielui/svelte/components/input';
    import * as Popover from '@mielui/svelte/components/popover';
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import * as Select from '@mielui/svelte/components/select';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import { toast } from '@mielui/svelte/components/toast';

    import ComponentGallery from './component-gallery.svelte';

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
                                try {
                                    await navigator.clipboard.writeText(`https://mielui.dev/${slug || 'your-workspace'}`);
                                    toast.success('Address copied');
                                } catch {
                                    toast.error('Could not copy the address');
                                }
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
        <section aria-labelledby="studio-overlays">
            <h2
                id="studio-overlays"
                class="sticky top-0 z-10 flex h-[var(--docs-row-height)] items-center border-y-[length:var(--border-size)] border-[var(--docs-rule)] bg-[var(--docs-chrome)] px-6 text-sm font-semibold"
            >
                Menus and popovers
            </h2>
            <div class="grid grid-cols-1 items-start gap-5 px-6 py-6 @3xl:grid-cols-3">
                <Card.Root variant="panel" class="min-w-0">
                    <Card.Header>
                        <Card.Title>Project actions</Card.Title>
                        <Card.Description>
                            Open a menu to compare its surface with the card.
                        </Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <Menu.Root>
                            <Menu.Trigger variant="outline">Project menu</Menu.Trigger>
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
                                    <Menu.RadioItem value="everyone">
                                        Anyone with the link
                                    </Menu.RadioItem>
                                </Menu.RadioGroup>
                            </Menu.Content>
                        </Menu.Root>
                    </Card.Content>
                </Card.Root>
                <Card.Root variant="panel" class="min-w-0">
                    <Card.Header>
                        <Card.Title>Notification preferences</Card.Title>
                        <Card.Description>
                            Adjust a setting inside a floating panel.
                        </Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <Popover.Root placement="bottom-start">
                            <Popover.Trigger variant="outline">Preferences</Popover.Trigger>
                            <Popover.Content class="w-72" surfaceClass="space-y-4 p-4">
                                <Popover.Title>Stay up to date</Popover.Title>
                                <p class="text-sm text-foreground-muted">
                                    Receive a summary of activity in your workspace.
                                </p>
                                <Switch bind:checked={digest} label="Weekly digest" />
                            </Popover.Content>
                        </Popover.Root>
                    </Card.Content>
                </Card.Root>
                <Card.Root variant="panel" class="min-w-0">
                    <Card.Header>
                        <Card.Title>People</Card.Title>
                        <Card.Description>
                            Hover or focus a teammate to see their details.
                        </Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <HoverCard.Root>
                            <HoverCard.Trigger
                                class="rounded-[var(--radius-md)] text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-primary"
                            >
                                Alex Morgan
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
                </Card.Root>
            </div>
        </section>
        <section aria-labelledby="studio-content">
            <h2
                id="studio-content"
                class="sticky top-0 z-10 border-y-[length:var(--border-size)] border-[var(--docs-rule)] bg-[var(--docs-chrome)] flex h-[var(--docs-row-height)] items-center px-6 text-sm font-semibold"
            >
                Content and layout
            </h2>
            <ComponentGallery />
        </section>
    </div>
</ScrollArea>
