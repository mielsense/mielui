import {
    defaultOn,
    type PlaygroundValues,
    quote,
    select,
    tag
} from '$lib/components/docs/playground';

export const controls = {
    cue: select('Edge cue', ['blur', 'fade', 'none'], 'blur')
};

export const SURFACE = 'h-56 w-64 rounded-[var(--radius-xl)] border border-border bg-card';

export const chats = [
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

export function code(values: PlaygroundValues<typeof controls>): string {
    const list = chats.map((chat) => `        ${quote(chat)}`).join(',\n');
    const props = tag(
        'ScrollArea',
        {
            showCues: defaultOn(values.cue !== 'none'),
            blur: defaultOn(values.cue !== 'fade'),
            tabindex: 0,
            role: 'region',
            'aria-label': 'Recent chats',
            class: SURFACE
        },
        '>'
    );

    return `<script lang="ts">
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';

    const chats = [
${list}
    ];
</script>

${props}
    <ul class="m-0 flex list-none flex-col p-2">
        {#each chats as chat (chat)}
            <li class="truncate px-3 py-2 text-sm text-foreground-muted">{chat}</li>
        {/each}
    </ul>
</ScrollArea>`;
}
