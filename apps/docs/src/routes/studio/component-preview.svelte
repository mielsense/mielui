<script lang="ts">
    import * as Avatar from '@mielui/svelte/components/avatar';
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import { Gauge } from '@mielui/svelte/components/gauge';
    import { Input } from '@mielui/svelte/components/input';
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import { toast } from '@mielui/svelte/components/toast';
    import * as Typography from '@mielui/svelte/components/typography';

    let previewName = $state('');
    let previewEnabled = $state(true);
    let previewVolume = $state(60);

    function showToast() {
        toast.success('Theme preview', {
            description: 'Your current colors and spacing are applied here.'
        });
    }
</script>

<ScrollArea class="h-full min-h-0" showCues={false}>
    <div class="grid min-h-full place-items-center p-5 sm:p-10">
        <div class="grid w-full max-w-3xl gap-6 @container">
            <div class="flex flex-col gap-1">
                <Typography.H2>Make it yours</Typography.H2>
                <Typography.Text variant="supporting">
                    Your theme, applied to everyday controls.
                </Typography.Text>
            </div>
            <div class="grid gap-5 @xl:grid-cols-2">
                <div class="mielui-inset-frame flex flex-col">
                    <div
                        class="mielui-inset-surface flex min-h-56 flex-col items-center justify-center gap-5 p-6"
                    >
                        <div class="flex flex-wrap items-center justify-center gap-2">
                            <Button>Primary</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                        </div>
                        <div class="flex flex-wrap items-center justify-center gap-2">
                            <Badge>Default</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="success">Success</Badge>
                        </div>
                        <div class="flex items-center gap-3">
                            <Avatar.Root><Avatar.Fallback>MI</Avatar.Fallback></Avatar.Root>
                            <Typography.Text variant="supporting">Mielui workspace</Typography.Text>
                        </div>
                    </div>
                    <p class="px-3 py-2 text-xs text-foreground-muted">Actions and status</p>
                </div>
                <div class="mielui-inset-frame flex flex-col">
                    <div
                        class="mielui-inset-surface flex min-h-56 flex-col justify-center gap-5 p-6"
                    >
                        <Input
                            label="Display name"
                            placeholder="Your name"
                            bind:value={previewName}
                        />
                        <Slider label="Volume" bind:value={previewVolume} />
                        <Switch label="Email notifications" bind:checked={previewEnabled} />
                    </div>
                    <p class="px-3 py-2 text-xs text-foreground-muted">Inputs and selection</p>
                </div>
            </div>
            <div class="mielui-inset-frame flex flex-col">
                <div
                    class="mielui-inset-surface flex flex-wrap items-center justify-center gap-6 p-8"
                >
                    <Gauge value={72} label="Monthly usage" />
                    <div class="flex flex-col gap-1">
                        <Typography.H3>Ready for the next release</Typography.H3>
                        <Typography.Text variant="supporting">
                            Review the app preview, then copy your CSS or JSON.
                        </Typography.Text>
                    </div>
                    <Button variant="outline" onclick={showToast}>Show toast</Button>
                </div>
                <p class="px-3 py-2 text-xs text-foreground-muted">Content and feedback</p>
            </div>
        </div>
    </div>
</ScrollArea>
