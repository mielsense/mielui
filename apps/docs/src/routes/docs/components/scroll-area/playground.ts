import {
    expression,
    type PlaygroundValues,
    select,
    tag,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    orientation: select('Orientation', ['vertical', 'horizontal', 'both'], 'vertical'),
    showCues: toggle('Edge cues', 'Appearance', true),
    blur: toggle('Blur', 'Appearance', true)
};

const SURFACE = 'rounded-[var(--radius-xl)] border border-border bg-card';

export function code(values: PlaygroundValues<typeof controls>): string {
    const shared = {
        orientation: values.orientation !== 'vertical' && values.orientation,
        showCues: !values.showCues && expression('false'),
        blur: !values.blur && expression('false'),
        tabindex: 0,
        role: 'region'
    };

    if (values.orientation === 'horizontal') {
        const props = {
            ...shared,
            'aria-label': 'Project sections',
            class: `w-72 p-1.5 ${SURFACE}`
        };

        return `<script lang="ts">
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';

    const sections = [
        'Overview',
        'Activity',
        'Members',
        'Billing',
        'Integrations',
        'Webhooks',
        'Security',
        'Audit log'
    ];
</script>

${tag('ScrollArea', props, '>')}
    <div class="flex gap-2">
        {#each sections as section (section)}
            <span
                class="rounded-[var(--radius-control)] bg-secondary px-3 py-1 text-sm whitespace-nowrap"
            >
                {section}
            </span>
        {/each}
    </div>
</ScrollArea>`;
    }

    if (values.orientation === 'both') {
        const props = {
            ...shared,
            'aria-label': 'Deploy log',
            class: `h-56 w-72 ${SURFACE}`
        };

        return `<script lang="ts">
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';

    const lines = [
        '09:00:02 Cloning github.com/acme/storefront at commit 4d11ba0',
        '09:00:04 Restored build cache from the previous deployment',
        '09:00:09 Installing dependencies with pnpm install --frozen-lockfile',
        '09:00:21 Running pnpm run build in apps/storefront',
        '09:00:38 Compiled 214 modules for the client bundle',
        '09:00:44 Compiled 96 modules for the server bundle',
        '09:00:47 Prerendered 38 static routes',
        '09:00:52 Uploading build output to the edge network',
        '09:00:58 Assigned the production domain storefront.acme.com',
        '09:01:01 Deployment completed in 59 seconds',
        '09:01:03 Health check passed in 3 regions',
        '09:01:04 Notified the #deploys channel'
    ];
</script>

${tag('ScrollArea', props, '>')}
    <div
        class="flex w-max flex-col gap-1.5 p-3 font-mono text-xs whitespace-nowrap text-foreground-muted"
    >
        {#each lines as line (line)}
            <span>{line}</span>
        {/each}
    </div>
</ScrollArea>`;
    }

    const props = {
        ...shared,
        'aria-label': 'Recent chats',
        class: `h-56 w-64 ${SURFACE}`
    };

    return `<script lang="ts">
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';

    const chats = [
        'Svelte 5 runes migration',
        'Designing the studio preset',
        'Tailwind v4 token setup',
        'Pagination active state',
        'Figma plugin ideas',
        'Vercel deploy hook',
        'Refactor command palette',
        'Hover card focus order',
        'Toast queue logic',
        'Color picker math',
        'Button loading states',
        'Dialog scroll behavior'
    ];
</script>

${tag('ScrollArea', props, '>')}
    <ul class="m-0 flex list-none flex-col p-2">
        {#each chats as chat (chat)}
            <li class="truncate px-3 py-2 text-sm text-foreground-muted">{chat}</li>
        {/each}
    </ul>
</ScrollArea>`;
}
