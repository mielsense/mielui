<script lang="ts">
    import { BookOpen01Icon } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Collapsible from '@mielui/svelte/components/collapsible';
    import * as Sidebar from '@mielui/svelte/components/sidebar';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let open = $state(true);
    let rtl = $state(false);
</script>

<Sidebar.Root
    breakpoint={480}
    dir={rtl ? 'rtl' : 'ltr'}
    class="h-[22rem] gap-2 rounded-[var(--radius-lg)] bg-background p-2"
>
    <Sidebar.Panel id="reading" label="Reading navigation" bind:open width={224} variant="floating">
        {#snippet rail()}
            <Sidebar.Header><Sidebar.Trigger /></Sidebar.Header>
            <Sidebar.Content>
                <Sidebar.Button
                    label="Reading list"
                    onclick={() => {
                        open = true;
                    }}
                >
                    {#snippet leading()}
                        <HugeiconsIcon icon={BookOpen01Icon} size={18} />
                    {/snippet}
                </Sidebar.Button>
            </Sidebar.Content>
        {/snippet}
        <Sidebar.Header>
            <Sidebar.Label class="font-semibold">Reading list</Sidebar.Label>
            <Sidebar.Trigger />
        </Sidebar.Header>
        <Sidebar.Content>
            <Sidebar.Group>
                <Sidebar.Menu>
                    <Sidebar.MenuItem>
                        <Sidebar.Link label="Introduction" href="/docs" aria-current="page" />
                    </Sidebar.MenuItem>
                </Sidebar.Menu>
            </Sidebar.Group>
            <Collapsible.Root open>
                <Collapsible.Trigger class="w-full justify-between">Guides</Collapsible.Trigger>
                <Collapsible.Content>
                    <Sidebar.Menu
                        class="mt-2 border-s-[length:var(--border-size)] border-border ps-2"
                    >
                        <Sidebar.MenuItem>
                            <Sidebar.Link label="Installation" href="/docs/installation" />
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <Sidebar.Link label="Theming" href="/docs/theming" />
                        </Sidebar.MenuItem>
                    </Sidebar.Menu>
                </Collapsible.Content>
            </Collapsible.Root>
        </Sidebar.Content>
    </Sidebar.Panel>
    <Sidebar.Main class="p-4">
        <div class="flex items-center justify-between">
            <Sidebar.Trigger panel="reading" />
            <Button
                variant="ghost"
                class="text-sm text-foreground-muted underline underline-offset-4"
                onclick={() => {
                    rtl = !rtl;
                }}
            >
                {rtl ? 'Use left-to-right' : 'Try right-to-left'}
            </Button>
        </div>
        <h3 class="mt-4 font-semibold">Documentation</h3>
        <p class="mt-2 max-w-sm text-sm leading-relaxed text-foreground-muted">
            Nested navigation in a floating panel, with a custom icon rail and no footer. Switch
            direction to see the panel follow its logical start edge. Source order stays under your
            control.
        </p>
    </Sidebar.Main>
</Sidebar.Root>
