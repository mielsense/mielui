<script lang="ts">
    import {
        ArrowRight01Icon,
        Calendar03Icon,
        Folder01Icon,
        Home01Icon,
        Settings01Icon
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { Input } from '@mielui/svelte/components/input';
    import * as Sidebar from '@mielui/svelte/components/sidebar';
    import * as Table from '@mielui/svelte/components/table';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let selected = $state('Projects');
    let filter = $state('');
    let mobileOpen = $state(false);
    const pages = [
        { label: 'Overview', icon: Home01Icon },
        { label: 'Projects', icon: Folder01Icon },
        { label: 'Schedule', icon: Calendar03Icon }
    ];
    const projects = [
        {
            name: 'Website refresh',
            detail: 'Design and development',
            status: 'In progress',
            due: 'Oct 8'
        },
        {
            name: 'Component library',
            detail: 'Product foundations',
            status: 'In review',
            due: 'Oct 12'
        },
        {
            name: 'Mobile onboarding',
            detail: 'Activation experience',
            status: 'Planning',
            due: 'Oct 20'
        },
        {
            name: 'Customer portal',
            detail: 'Workspace improvements',
            status: 'In progress',
            due: 'Oct 24'
        }
    ];
    const visible = $derived(
        projects.filter((project) => project.name.toLowerCase().includes(filter.toLowerCase()))
    );
</script>

<Sidebar.Root
    class="h-[30rem] overflow-hidden rounded-[var(--radius-lg)] border-[length:var(--border-size)] border-border bg-background"
    breakpoint={560}
>
    <Sidebar.Panel
        id="workspace"
        label="Workspace navigation"
        variant="inset"
        width={224}
        minWidth={192}
        maxWidth={288}
        bind:mobileOpen
    >
        <Sidebar.Header>
            <span
                aria-hidden="true"
                class="flex size-6 shrink-0 items-center justify-center text-sm font-semibold"
            >
                N
            </span>
            <Sidebar.Label class="font-semibold">Northstar</Sidebar.Label>
        </Sidebar.Header>
        <Sidebar.Content class="gap-6 px-3">
            <Sidebar.Group>
                <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
                <Sidebar.Menu>
                    {#each pages as item (item.label)}
                        <Sidebar.MenuItem>
                            <Sidebar.Button
                                label={item.label}
                                aria-pressed={selected === item.label}
                                onclick={() => {
                                    selected = item.label;
                                    mobileOpen = false;
                                }}
                            >
                                {#snippet leading()}
                                    <HugeiconsIcon icon={item.icon} size={18} />
                                {/snippet}
                            </Sidebar.Button>
                        </Sidebar.MenuItem>
                    {/each}
                </Sidebar.Menu>
            </Sidebar.Group>
            <Sidebar.Group>
                <Sidebar.GroupLabel>Favorites</Sidebar.GroupLabel>
                <Sidebar.Menu>
                    {#each projects.slice(0, 2) as project (project.name)}
                        <Sidebar.MenuItem>
                            <Sidebar.Button
                                label={project.name}
                                onclick={() => {
                                    filter = project.name;
                                    selected = 'Projects';
                                    mobileOpen = false;
                                }}
                            >
                                {#snippet leading()}
                                    <span class="size-2 rounded-full bg-primary"></span>
                                {/snippet}
                            </Sidebar.Button>
                        </Sidebar.MenuItem>
                    {/each}
                </Sidebar.Menu>
            </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
            <Sidebar.Button
                label="Settings"
                onclick={() => {
                    selected = 'Settings';
                    mobileOpen = false;
                }}
            >
                {#snippet leading()}
                    <HugeiconsIcon icon={Settings01Icon} size={18} />
                {/snippet}
            </Sidebar.Button>
            <Sidebar.Separator />
            <Sidebar.Button label="Alex Morgan">
                {#snippet leading()}
                    <span class="text-xs font-medium">AM</span>
                {/snippet}
                {#snippet trailing()}
                    <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                {/snippet}
            </Sidebar.Button>
        </Sidebar.Footer>
        <Sidebar.ResizeHandle />
    </Sidebar.Panel>
    <Sidebar.Main class="@container/sidebar-page">
        <header
            class="flex shrink-0 items-center gap-2 border-b-[length:var(--border-size)] border-border px-4 py-3"
        >
            <Sidebar.Trigger panel="workspace" />
            <span class="text-sm text-foreground-muted">Workspace</span>
            <span aria-hidden="true" class="text-foreground-muted">/</span>
            <span class="text-sm font-medium">{selected}</span>
        </header>
        <div
            class="flex min-h-0 flex-1 flex-col gap-5 overflow-auto p-4 @min-[32rem]/sidebar-page:p-6"
        >
            <div
                class="flex flex-col items-start justify-between gap-4 @min-[32rem]/sidebar-page:flex-row"
            >
                <div>
                    <h3 class="text-lg font-semibold">{selected}</h3>
                    <p class="mt-1 text-sm text-foreground-muted">
                        The work your team is moving forward.
                    </p>
                </div>
                <Button
                    variant="outline"
                    class="shrink-0"
                    onclick={() => {
                        filter = '';
                        selected = 'Projects';
                    }}
                >
                    All projects
                </Button>
            </div>
            <Input
                bind:value={filter}
                aria-label="Search projects"
                placeholder="Search projects…"
                class="max-w-xs"
            />
            <div class="min-w-0 overflow-x-auto">
                <Table.Root
                    class="min-w-0 rounded-none border-0 @min-[32rem]/sidebar-page:min-w-80"
                >
                    <Table.Header class="[&_th]:bg-transparent">
                        <Table.Row
                            class="border-b-[length:var(--border-size)] border-border text-foreground-muted"
                        >
                            <Table.Head class="px-0 pb-3 pt-0 text-start font-normal">
                                Project
                            </Table.Head>
                            <Table.Head
                                class="hidden px-0 pb-3 pt-0 text-start font-normal @min-[32rem]/sidebar-page:table-cell"
                            >
                                Status
                            </Table.Head>
                            <Table.Head
                                class="hidden px-0 pb-3 pt-0 text-end font-normal @min-[32rem]/sidebar-page:table-cell"
                            >
                                Due
                            </Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {#each visible as project (project.name)}
                            <Table.Row
                                class="border-b-[length:var(--border-size)] border-border last:border-0"
                            >
                                <Table.Cell class="px-0 py-4 pe-4">
                                    <span class="font-medium">{project.name}</span>
                                    <p class="mt-1 text-xs text-foreground-muted">
                                        {project.detail}
                                    </p>
                                    <p
                                        class="mt-2 text-xs text-foreground-muted @min-[32rem]/sidebar-page:hidden"
                                    >
                                        {project.status} ·{project.due}
                                    </p>
                                </Table.Cell>
                                <Table.Cell
                                    class="hidden px-0 py-4 pe-4 text-foreground-muted @min-[32rem]/sidebar-page:table-cell"
                                >
                                    {project.status}
                                </Table.Cell>
                                <Table.Cell
                                    class="hidden px-0 py-4 text-end text-foreground-muted @min-[32rem]/sidebar-page:table-cell"
                                >
                                    {project.due}
                                </Table.Cell>
                            </Table.Row>
                        {/each}
                    </Table.Body>
                </Table.Root>
                {#if !visible.length}
                    <p class="py-6 text-sm text-foreground-muted">No projects match that search.</p>
                {/if}
            </div>
        </div>
    </Sidebar.Main>
</Sidebar.Root>
