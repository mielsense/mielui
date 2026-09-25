<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import * as Drawer from '@mielui/svelte/components/drawer';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';

    let textSize = $state(18);
    let comfortableSpacing = $state(true);
</script>

<Drawer.Root handleOnly>
    <Drawer.Trigger>Reading preferences</Drawer.Trigger>
    <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content>
            <Drawer.Handle />
            <Drawer.Header class="mx-auto w-full max-w-xl">
                <Drawer.Title>Make yourself comfortable</Drawer.Title>
                <Drawer.Description>Adjust the text to suit the way you read.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body class="mx-auto flex w-full max-w-xl flex-col gap-6 py-6">
                <div class="flex flex-col gap-3" data-vaul-no-drag>
                    <div class="flex items-center justify-between text-sm">
                        <span>Text size</span>
                        <span class="tabular-nums text-foreground-muted">
                            <span use:numberShuffle={{ value: textSize }}>{textSize}</span> px
                        </span>
                    </div>
                    <Slider bind:value={textSize} min={14} max={24} step={1} label="Text size" />
                </div>
                <Switch bind:switched={comfortableSpacing} label="Comfortable spacing" />
                <p
                    class="rounded-[var(--radius-lg)] bg-secondary p-4 text-foreground-muted"
                    style:font-size={`${textSize}px`}
                    style:line-height={comfortableSpacing ? 1.8 : 1.4}
                >
                    A quiet place to pause, find a new idea, and enjoy the next page.
                </p>
            </Drawer.Body>
            <Drawer.Footer class="mx-auto w-full max-w-xl">
                <Drawer.Close>Done</Drawer.Close>
            </Drawer.Footer>
        </Drawer.Content>
    </Drawer.Portal>
</Drawer.Root>
