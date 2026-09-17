<script lang="ts">
    import * as Drawer from '@mielui/svelte/components/drawer';
</script>
<Drawer.Root dismissible={false}>
    <Drawer.Trigger>Required action</Drawer.Trigger>
    <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content>
            <Drawer.Header class="mx-auto w-full max-w-xl">
                <Drawer.Title>Review changes</Drawer.Title>
                <Drawer.Description>
                    Three updates are ready to apply to your reading list.
                </Drawer.Description>
            </Drawer.Header>
            <Drawer.Body class="mx-auto w-full max-w-xl">
                <dl class="mb-5 divide-y divide-border text-sm">
                    <div class="flex justify-between gap-4 py-3">
                        <dt class="text-foreground-muted">Collection</dt>
                        <dd>Weekend reading</dd>
                    </div>
                    <div class="flex justify-between gap-4 py-3">
                        <dt class="text-foreground-muted">Articles added</dt>
                        <dd class="tabular-nums">2</dd>
                    </div>
                    <div class="flex justify-between gap-4 py-3">
                        <dt class="text-foreground-muted">Articles archived</dt>
                        <dd class="tabular-nums">1</dd>
                    </div>
                </dl>
                <Drawer.Root nested>
                    <Drawer.Trigger>Review details</Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay />
                        <Drawer.Content>
                            <Drawer.Header class="mx-auto w-full max-w-xl">
                                <Drawer.Title>Change details</Drawer.Title>
                                <Drawer.Description>
                                    Review the articles included in this update.
                                </Drawer.Description>
                            </Drawer.Header>
                            <Drawer.Body class="mx-auto w-full max-w-xl">
                                <ul class="divide-y divide-border text-sm">
                                    <li class="flex justify-between gap-4 py-4">
                                        <span>The art of paying attention</span>
                                        <span class="text-foreground-muted">Added</span>
                                    </li>
                                    <li class="flex justify-between gap-4 py-4">
                                        <span>A slower kind of weekend</span>
                                        <span class="text-foreground-muted">Added</span>
                                    </li>
                                    <li class="flex justify-between gap-4 py-4">
                                        <span>Notes from the city</span>
                                        <span class="text-foreground-muted">Archived</span>
                                    </li>
                                </ul>
                            </Drawer.Body>
                            <Drawer.Footer class="mx-auto w-full max-w-xl">
                                <Drawer.Close>Back to review</Drawer.Close>
                            </Drawer.Footer>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            </Drawer.Body>
            <Drawer.Footer class="mx-auto w-full max-w-xl">
                <Drawer.Close>Finish review</Drawer.Close>
            </Drawer.Footer>
        </Drawer.Content>
    </Drawer.Portal>
</Drawer.Root>
