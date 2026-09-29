<script lang="ts">
    import {
        ArrowDown01Icon as ChevronDown,
        Copy01Icon as Copy,
        Link01Icon as Link,
        PenTool01Icon as Pen
    } from '@hugeicons/core-free-icons';
    import * as Accordion from '@mielui/svelte/components/accordion';
    import * as Alert from '@mielui/svelte/components/alert';
    import * as Avatar from '@mielui/svelte/components/avatar';
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
    import * as Collapsible from '@mielui/svelte/components/collapsible';
    import * as EmptyState from '@mielui/svelte/components/empty-state';
    import { Gauge } from '@mielui/svelte/components/gauge';
    import Kbd from '@mielui/svelte/components/kbd';
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Toast } from '@mielui/svelte/components/toast';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { floatingFrame, modalFrame } from './shapes.svelte';

    let { slug }: { slug: string } = $props();

    const chats = [
        'Svelte 5 runes migration',
        'Designing the studio preset',
        'Tailwind v4 token setup',
        'Pagination active state',
        'Figma plugin ideas',
        'Refactor command palette'
    ];
    const tooltipBubble =
        'rounded-[var(--radius-lg)] bg-[var(--color-tooltip)] px-2 py-1 text-[length:var(--font-size-label)] font-[var(--font-weight-label)] text-[var(--color-tooltip-foreground)] shadow-[0_0_0_var(--border-size)_color-mix(in_srgb,var(--color-foreground)_12%,transparent),var(--elevation-float)]';
    const viewport =
        'relative h-36 w-64 overflow-hidden rounded-[var(--radius-lg)] border-[length:var(--border-size)] border-border bg-background';
</script>

{#if slug === 'accordion'}
    <Accordion.Root type="single" value="access" class="w-64">
        <Accordion.Item value="access">
            <Accordion.Trigger>Who can access this?</Accordion.Trigger>
            <Accordion.Content>Only invited members can open projects.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="plan">
            <Accordion.Trigger>Can I change my plan?</Accordion.Trigger>
            <Accordion.Content>Change your plan from Billing.</Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
{:else if slug === 'collapsible'}
    <div class="w-64">
        <Collapsible.Root open>
            <Collapsible.Trigger class="w-full justify-between">
                <span class="text-foreground [font-weight:var(--font-weight-label)]">
                    Weekly sync, June 18
                </span>
                <HugeiconsIcon
                    icon={ChevronDown}
                    size={14}
                    class="rotate-180 text-foreground-muted"
                    aria-hidden="true"
                />
            </Collapsible.Trigger>
            <Collapsible.Content class="px-2">
                <p class="text-sm leading-relaxed text-foreground-muted">
                    The export flow is ready for testing. Sam reviews keyboard navigation Friday.
                </p>
            </Collapsible.Content>
        </Collapsible.Root>
    </div>
{:else if slug === 'alert'}
    <div class="w-72">
        <Alert.Root variant="info">
            <Alert.Title>Heads up</Alert.Title>
            <Alert.Description>Add components from the command line.</Alert.Description>
        </Alert.Root>
    </div>
{:else if slug === 'toast'}
    <div class="w-72">
        <Toast.Root
            toast={{
                title: 'Deployment ready',
                type: 'success'
            }}
        >
            <Toast.Content class="gap-1">
                <div class="flex items-center gap-2">
                    <Toast.Icon />
                    <Toast.Title />
                </div>
                <span>The preview build completed.</span>
            </Toast.Content>
        </Toast.Root>
    </div>
{:else if slug === 'alert-dialog' || slug === 'dialog'}
    <div class={`${modalFrame} w-64`}>
        <div class="mielui-inset-surface flex flex-col gap-1.5 p-4">
            <Typography.Title level={3}>
                {slug === 'alert-dialog' ? 'Delete this workspace?' : 'Add a domain'}
            </Typography.Title>
            <Typography.Description>
                {slug === 'alert-dialog' ? 'This cannot be undone.' : 'No DNS settings change.'}
            </Typography.Description>
        </div>
        <div class="flex items-center gap-2 px-1 py-1.5">
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button
                variant={slug === 'alert-dialog' ? 'destructive' : 'primary'}
                size="sm"
                class="ms-auto"
            >
                {slug === 'alert-dialog' ? 'Delete' : 'Add'}
            </Button>
        </div>
    </div>
{:else if slug === 'card'}
    <Card.Root class="w-72">
        <Card.Header>
            <div class="flex items-center justify-between gap-3">
                <Card.Title>Team handbook</Card.Title>
                <Badge variant="success">Published</Badge>
            </div>
            <Card.Description>The guides your team uses every day.</Card.Description>
        </Card.Header>
    </Card.Root>
{:else if slug === 'empty-state'}
    <EmptyState.Root class="max-w-64">
        <EmptyState.Header>
            <EmptyState.Title>No components yet</EmptyState.Title>
            <EmptyState.Description>Add one to start building.</EmptyState.Description>
        </EmptyState.Header>
        <EmptyState.Actions>
            <Button size="sm">Add a component</Button>
        </EmptyState.Actions>
    </EmptyState.Root>
{:else if slug === 'hover-card' || slug === 'popover'}
    <div class="flex w-60 flex-col items-center gap-2">
        {#if slug === 'popover'}
            <Button variant="secondary">Share project</Button>
        {:else}
            <span class="text-sm font-medium text-foreground underline underline-offset-4">
                @alexmorgan
            </span>
        {/if}
        <div class={`${floatingFrame} w-full`}>
            <div class="mielui-inset-surface flex flex-col gap-3 p-3">
                {#if slug === 'popover'}
                    <div>
                        <p class="text-sm font-medium">Project access</p>
                        <p class="mt-1 text-sm text-foreground-muted">
                            Anyone with the link can view.
                        </p>
                    </div>
                    <Button variant="outline" size="sm">
                        <HugeiconsIcon icon={Link} size={14} aria-hidden="true" />
                        Copy link
                    </Button>
                {:else}
                    <div class="flex items-center gap-3">
                        <Avatar.Root size="sm">
                            <Avatar.Fallback>AM</Avatar.Fallback>
                        </Avatar.Root>
                        <div class="min-w-0">
                            <p class="text-sm font-medium">Alex Morgan</p>
                            <p class="text-sm text-foreground-muted">Design engineer</p>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{:else if slug === 'tooltip'}
    <div class="flex flex-col items-center gap-2">
        <span class={`${tooltipBubble} flex items-center gap-2`}>
            Pen
            <Kbd shortcut="P" />
        </span>
        <div
            class="flex gap-1 rounded-[var(--radius-lg)] border-[length:var(--border-size)] border-border bg-card p-1"
        >
            <Button variant="ghost" size="icon" aria-label="Copy">
                <HugeiconsIcon icon={Copy} size={16} aria-hidden="true" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Pen" class="bg-foreground/[0.08]">
                <HugeiconsIcon icon={Pen} size={16} aria-hidden="true" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Link">
                <HugeiconsIcon icon={Link} size={16} aria-hidden="true" />
            </Button>
        </div>
    </div>
{:else if slug === 'scroll-area'}
    <ScrollArea
        aria-label="Recent chats"
        class="h-36 w-56 rounded-[var(--radius-lg)] border-[length:var(--border-size)] border-border bg-card"
    >
        <div class="flex flex-col p-1.5">
            {#each chats as chat, index (chat)}
                <span
                    class={`truncate rounded-[var(--radius-md)] px-2.5 py-2 text-sm ${index === 0 ? 'bg-secondary text-foreground' : 'text-foreground-muted'}`}
                >
                    {chat}
                </span>
            {/each}
        </div>
    </ScrollArea>
{:else if slug === 'sheet'}
    <div class={viewport}>
        <div class="mielui-overlay-scrim absolute inset-0"></div>
        <div class={`${modalFrame} absolute inset-y-1.5 right-1.5 w-40`}>
            <div class="mielui-inset-surface flex flex-1 flex-col gap-1 p-3">
                <p class="text-sm font-medium">Filters</p>
                <p class="text-sm text-foreground-muted">Narrow the list.</p>
            </div>
            <div class="flex items-center gap-2 px-1 py-1">
                <Button variant="ghost" size="sm">Close</Button>
                <Button size="sm" class="ms-auto">Apply</Button>
            </div>
        </div>
    </div>
{:else if slug === 'drawer'}
    <div class={viewport}>
        <div class="mielui-overlay-scrim absolute inset-0"></div>
        <div
            class={`${modalFrame} absolute inset-x-1.5 bottom-0 h-24 rounded-b-none border-b-0 pb-0`}
        >
            <div class="mielui-inset-surface flex flex-1 flex-col gap-3 rounded-b-none px-4 pt-2">
                <span class="mx-auto h-1 w-10 rounded-full bg-foreground-muted/50"></span>
                <p class="text-sm font-medium">Text size</p>
                <Slider value={60} label="Text size" />
            </div>
        </div>
    </div>
{:else if slug === 'notch'}
    <div class={viewport}>
        <div
            class="mx-auto flex w-52 items-center gap-3 rounded-b-[var(--radius-xl)] border-[length:var(--border-size)] border-t-0 border-border bg-[color-mix(in_oklab,var(--color-secondary)_97%,white)] px-4 py-3 dark:bg-[color-mix(in_oklab,var(--color-background)_97%,white)]"
        >
            <Gauge value={100} size={28} tone="success" label="Sync complete" />
            <div class="min-w-0">
                <p class="text-sm font-medium">All synced</p>
                <p class="text-xs text-foreground-muted">Just now</p>
            </div>
        </div>
    </div>
{/if}
