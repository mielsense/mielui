<script lang="ts">
    import {
        Folder01Icon,
        Home01Icon,
        Settings01Icon,
        UserGroupIcon
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { Input } from '@mielui/svelte/components/input';
    import * as Sidebar from '@mielui/svelte/components/sidebar';
    import { Switch } from '@mielui/svelte/components/switch';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let page = $state('Members');
    let sectionOpen = $state(true);
    let inspectorOpen = $state(false);
    let inspectorMobileOpen = $state(false);
    let railMobileOpen = $state(false);
    let sectionMobileOpen = $state(false);
    let digest = $state(true);
    let filter = $state('');
    let selected = $state('Alex Morgan');
    const members = [
        { name: 'Alex Morgan', email: 'alex@northstar.design', role: 'Owner', initials: 'AM' },
        { name: 'Jamie Chen', email: 'jamie@northstar.design', role: 'Admin', initials: 'JC' },
        { name: 'Sam Kim', email: 'sam@northstar.design', role: 'Member', initials: 'SK' },
        { name: 'Robin Patel', email: 'robin@northstar.design', role: 'Member', initials: 'RP' }
    ];
    const visible = $derived(
        members.filter((member) => member.name.toLowerCase().includes(filter.toLowerCase()))
    );
</script>

<Sidebar.Root
    breakpoint={560}
    class="group/demo h-[32rem] overflow-hidden rounded-[var(--radius-lg)] border-[length:var(--border-size)] border-border bg-background"
>
    <Sidebar.Panel
        id="rail"
        label="Primary navigation"
        width={224}
        minWidth={224}
        maxWidth={224}
        open={false}
        bind:mobileOpen={railMobileOpen}
        class="border-e-[length:var(--border-size)] border-border"
    >
        <Sidebar.Header class="justify-center px-2">
            <span aria-label="Northstar" class="text-sm font-semibold">N</span>
            <Sidebar.Label class="font-semibold">Northstar</Sidebar.Label>
            <Sidebar.Close class="hidden group-data-[mobile=true]/demo:inline-flex" />
        </Sidebar.Header>
        <Sidebar.Content>
            <Sidebar.Menu>
                <Sidebar.MenuItem>
                    <Sidebar.Button
                        label="Home"
                        class="justify-center px-0"
                        onclick={() => {
                            sectionOpen = false;
                            page = 'Overview';
                            railMobileOpen = false;
                        }}
                    >
                        {#snippet leading()}
                            <HugeiconsIcon icon={Home01Icon} size={18} />
                        {/snippet}
                    </Sidebar.Button>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                    <Sidebar.Button
                        label="Settings"
                        aria-pressed={sectionOpen}
                        class="justify-center px-0"
                        onclick={() => {
                            sectionOpen = true;
                            page = 'Members';
                            sectionMobileOpen = railMobileOpen;
                            railMobileOpen = false;
                        }}
                    >
                        {#snippet leading()}
                            <HugeiconsIcon icon={Settings01Icon} size={18} />
                        {/snippet}
                    </Sidebar.Button>
                </Sidebar.MenuItem>
            </Sidebar.Menu>
        </Sidebar.Content>
        <Sidebar.Footer class="items-center">
            <span class="text-xs text-foreground-muted">AM</span>
        </Sidebar.Footer>
    </Sidebar.Panel>
    <Sidebar.Panel
        id="section"
        label="Workspace settings"
        variant="inset"
        bind:open={sectionOpen}
        bind:mobileOpen={sectionMobileOpen}
        width={208}
        minWidth={176}
        maxWidth={280}
        collapsible="offcanvas"
    >
        <Sidebar.Header>
            <span class="flex-1 text-sm font-semibold">Settings</span>
            <Sidebar.Close />
        </Sidebar.Header>
        <Sidebar.Content class="gap-6 px-3">
            <Sidebar.Group>
                <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
                <Sidebar.Menu>
                    {#each ['Members', 'Teams', 'Projects'] as label (label)}
                        <Sidebar.MenuItem>
                            <Sidebar.Button
                                {label}
                                aria-pressed={page === label}
                                onclick={() => {
                                    page = label;
                                    sectionMobileOpen = false;
                                }}
                            >
                                {#snippet leading()}
                                    <HugeiconsIcon
                                        icon={label === 'Projects' ? Folder01Icon : UserGroupIcon}
                                        size={18}
                                    />
                                {/snippet}
                                {#snippet trailing()}
                                    <span class="text-xs tabular-nums">
                                        {label === 'Members' ? 12 : label === 'Teams' ? 3 : 8}
                                    </span>
                                {/snippet}
                            </Sidebar.Button>
                        </Sidebar.MenuItem>
                    {/each}
                </Sidebar.Menu>
            </Sidebar.Group>
            <Sidebar.Group>
                <Sidebar.GroupLabel>Personal</Sidebar.GroupLabel>
                <Sidebar.Menu>
                    <Sidebar.MenuItem>
                        <Sidebar.Button
                            label="Preferences"
                            onclick={() => {
                                page = 'Preferences';
                                sectionMobileOpen = false;
                            }}
                        >
                            {#snippet leading()}
                                <HugeiconsIcon icon={Settings01Icon} size={18} />
                            {/snippet}
                        </Sidebar.Button>
                    </Sidebar.MenuItem>
                </Sidebar.Menu>
            </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.ResizeHandle />
    </Sidebar.Panel>
    <Sidebar.Main>
        <header
            class="flex shrink-0 items-center gap-2 border-b-[length:var(--border-size)] border-border px-4 py-3"
        >
            <Sidebar.Trigger
                panel="rail"
                class="hidden group-data-[mobile=true]/demo:inline-flex"
            />
            <Sidebar.Trigger panel="section" />
            <span class="text-sm text-foreground-muted group-data-[mobile=true]/demo:hidden">
                Workspace
            </span>
            <span
                aria-hidden="true"
                class="text-foreground-muted group-data-[mobile=true]/demo:hidden"
            >
                /
            </span>
            <span class="text-sm font-medium">{page}</span>
            <Sidebar.Trigger panel="inspector" class="ms-auto" aria-label="Toggle member details" />
        </header>
        <div class="flex min-h-0 flex-1 flex-col gap-5 overflow-auto p-6">
            <div>
                <h3 class="text-lg font-semibold">{page}</h3>
                <p class="mt-1 text-sm text-foreground-muted">
                    Manage who can access your workspace.
                </p>
            </div>
            <Input
                bind:value={filter}
                aria-label="Search members"
                placeholder="Search members…"
                class="max-w-xs"
            />
            <div class="flex flex-col">
                {#each visible as member (member.name)}
                    <button
                        type="button"
                        class="flex w-full items-center gap-3 border-b-[length:var(--border-size)] border-border py-4 text-start outline-none hover:bg-secondary/40 focus-visible:shadow-[var(--focus-ring)] last:border-0"
                        onclick={() => {
                            selected = member.name;
                            inspectorOpen = true;
                            inspectorMobileOpen = true;
                        }}
                    >
                        <span
                            aria-hidden="true"
                            class="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs text-foreground-muted"
                        >
                            {member.initials}
                        </span>
                        <span class="flex min-w-0 flex-1 flex-col gap-1">
                            <span class="truncate text-sm font-medium">{member.name}</span>
                            <span class="truncate text-xs text-foreground-muted">
                                {member.email}
                            </span>
                        </span>
                        <span class="text-xs text-foreground-muted">{member.role}</span>
                    </button>
                {/each}
                {#if !visible.length}
                    <p class="py-6 text-sm text-foreground-muted">No members match that search.</p>
                {/if}
            </div>
        </div>
    </Sidebar.Main>
    <Sidebar.Panel
        id="inspector"
        label="Member details"
        side="end"
        bind:open={inspectorOpen}
        bind:mobileOpen={inspectorMobileOpen}
        pinned={false}
        width={256}
        minWidth={224}
        maxWidth={320}
        collapsible="offcanvas"
        variant="floating"
        class="inset-y-2 end-2"
    >
        <Sidebar.Header>
            <Sidebar.Label class="text-sm font-semibold">Member details</Sidebar.Label>
            <Sidebar.Close />
        </Sidebar.Header>
        <Sidebar.Content class="gap-5 p-4">
            <div>
                <p class="text-sm font-semibold">{selected}</p>
                <p class="mt-1 text-xs text-foreground-muted">Workspace member</p>
            </div>
            <p class="text-sm text-foreground-muted">
                Receives workspace updates and release notifications.
            </p>
            <div class="flex items-center justify-between gap-3">
                <label for="sidebar-member-digest" class="text-sm">Weekly digest</label>
                <Switch
                    id="sidebar-member-digest"
                    bind:checked={digest}
                    aria-label="Weekly digest"
                />
            </div>
        </Sidebar.Content>
        <Sidebar.Footer>
            <Button
                variant="outline"
                onclick={() => {
                    inspectorOpen = false;
                    inspectorMobileOpen = false;
                }}
            >
                Done
            </Button>
        </Sidebar.Footer>
        <Sidebar.ResizeHandle />
    </Sidebar.Panel>
</Sidebar.Root>
