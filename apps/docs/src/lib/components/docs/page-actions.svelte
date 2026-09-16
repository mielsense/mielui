<script lang="ts" module>
    export type PageActionsSection = 'breadcrumbs' | 'actions';
</script>

<script lang="ts">
    import Accessibility from '@hugeicons/core-free-icons/AccessibilityIcon';
    import ChevronRight from '@hugeicons/core-free-icons/ArrowRight01Icon';
    import FileCode from '@hugeicons/core-free-icons/FileScriptIcon';
    import MessageSquareWarning from '@hugeicons/core-free-icons/MessageCircleWarningIcon';
    import { Badge } from '@mielui/svelte/components/badge';
    import * as Breadcrumb from '@mielui/svelte/components/breadcrumb';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { resolve } from '$app/paths';

    let {
        title,
        source,
        ariaUrl,
        section
    }: {
        title: string;
        source?: string;
        ariaUrl?: string;
        section: PageActionsSection;
    } = $props();

    const issueUrl = $derived(
        `https://github.com/mielsense/mielui/issues/new?title=${encodeURIComponent(`[${title}] `)}`
    );
</script>

{#if section === 'breadcrumbs'}
    <div class="flex flex-col gap-1 pb-6">
        <Breadcrumb.Root>
            <Breadcrumb.Item href={resolve('/docs/introduction')}>Docs</Breadcrumb.Item>
            <HugeiconsIcon
                icon={ChevronRight}
                size={14}
                class="text-foreground-muted"
                aria-hidden="true"
            />
            <Breadcrumb.Item href={resolve('/docs/components')}>Components</Breadcrumb.Item>
            <HugeiconsIcon
                icon={ChevronRight}
                size={14}
                class="text-foreground-muted"
                aria-hidden="true"
            />
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb.Root>
    </div>
{:else}
    <div class="flex flex-row flex-wrap items-center gap-2 pt-1 pb-6">
        {#if source}
            <Badge variant="outline" href={source} class="gap-1.5 text-xs">
                <HugeiconsIcon icon={FileCode} size={14} />
                Source
            </Badge>
        {/if}
        {#if ariaUrl}
            <Badge variant="outline" href={ariaUrl} class="gap-1.5 text-xs">
                <HugeiconsIcon icon={Accessibility} size={14} />
                WAI-ARIA
            </Badge>
        {/if}
        <Badge variant="outline" href={issueUrl} class="gap-1.5 text-xs">
            <HugeiconsIcon icon={MessageSquareWarning} size={14} />
            Report issue
        </Badge>
    </div>
{/if}
