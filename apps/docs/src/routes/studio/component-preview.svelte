<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
    import * as Group from '@mielui/svelte/components/group';
    import { Input } from '@mielui/svelte/components/input';
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import * as Select from '@mielui/svelte/components/select';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import { toast } from '@mielui/svelte/components/toast';

    import ComponentGallery from './component-gallery.svelte';

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
