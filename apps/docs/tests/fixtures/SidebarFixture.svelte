<script lang="ts">
    import * as Sidebar from '@mielui/svelte/components/sidebar';
    import SidebarStateProbe from './SidebarStateProbe.svelte';

    let {
        containerWidth = 900,
        rtl = false,
        customRail = false,
        fixed = false,
        panelVariant = 'default'
    }: {
        containerWidth?: number;
        rtl?: boolean;
        customRail?: boolean;
        fixed?: boolean;
        panelVariant?: 'default' | 'inset' | 'floating';
    } = $props();
    let open = $state(true);
    let width = $state(240);
    let pinned = $state(true);
    let mobileOpen = $state(false);
    let draft = $state('Keep me');
    let changes = $state(0);
</script>

{#snippet custom()}
    <Sidebar.Header><Sidebar.Trigger /></Sidebar.Header>
    <Sidebar.Content>
        <Sidebar.Button
            label="Custom rail"
            onclick={() => {
                open = true;
            }}
        />
    </Sidebar.Content>
{/snippet}

<Sidebar.Root
    dir={rtl ? 'rtl' : 'ltr'}
    class="h-96 bg-background"
    style={`width:${containerWidth}px;`}
>
    <Sidebar.Panel
        id="navigation"
        label="Navigation"
        variant={panelVariant}
        bind:open
        bind:width
        bind:pinned
        bind:mobileOpen
        minWidth={180}
        maxWidth={360}
        collapsible={fixed ? 'none' : 'rail'}
        onWidthChange={() => {
            changes += 1;
        }}
        rail={customRail ? custom : undefined}
    >
        <Sidebar.Header>
            <Sidebar.Label>Workspace</Sidebar.Label>
            <Sidebar.Trigger />
            <Sidebar.Pin />
            <Sidebar.Close />
        </Sidebar.Header>
        <Sidebar.Content>
            <Sidebar.Group>
                <Sidebar.GroupLabel>Pages</Sidebar.GroupLabel>
                <Sidebar.Menu>
                    <Sidebar.MenuItem>
                        <Sidebar.Link label="Overview" href="/docs" aria-current="page">
                            {#snippet leading()}
                                <span>O</span>
                            {/snippet}
                        </Sidebar.Link>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                        <Sidebar.Button label="Reports">
                            {#snippet leading()}
                                <span>R</span>
                            {/snippet}
                        </Sidebar.Button>
                    </Sidebar.MenuItem>
                </Sidebar.Menu>
            </Sidebar.Group>
            <label class="flex flex-col">
                Draft<input aria-label="Navigation draft" bind:value={draft} />
            </label>
            <div class="h-96 shrink-0">Long navigation</div>
        </Sidebar.Content>
        <Sidebar.Footer>Account</Sidebar.Footer>
        <Sidebar.ResizeHandle />
    </Sidebar.Panel>
    <Sidebar.Main class="p-4">
        <Sidebar.Trigger panel="navigation" aria-label="Toggle navigation" />
        <Sidebar.Pin panel="navigation" />
        <Sidebar.Trigger panel="details" aria-label="Toggle details" />
        <button type="button">Main action</button>
        <SidebarStateProbe />
        <output aria-label="Binding state">
            {[open, pinned, width, mobileOpen, changes].join('/')}
        </output>
    </Sidebar.Main>
    <Sidebar.Panel
        id="details"
        label="Details"
        side="end"
        width={200}
        collapsible="offcanvas"
        open={false}
    >
        <Sidebar.Header>
            <span>Details</span>
            <Sidebar.Close />
        </Sidebar.Header>
        <Sidebar.Content><button type="button">Inspect item</button></Sidebar.Content>
        <Sidebar.ResizeHandle />
    </Sidebar.Panel>
</Sidebar.Root>
