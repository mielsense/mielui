<script lang="ts">
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';

    const groups = [
        {
            date: 'Today',
            chats: [
                'Svelte 5 runes migration',
                'Designing the studio preset',
                'Tailwind v4 token setup',
                'Pagination active state'
            ]
        },
        {
            date: 'Yesterday',
            chats: [
                'Figma plugin ideas',
                'Vercel deploy hook',
                'Refactor command palette',
                'Hover card a11y'
            ]
        },
        {
            date: 'Previous 7 days',
            chats: [
                'Toast queue logic',
                'Color picker math',
                'Button loading states',
                'Dialog scroll behavior',
                'Badge variant system',
                'Breadcrumb navigation',
                'Dropdown menu icons',
                'Alert dialog focus trap'
            ]
        }
    ];

    let active = $state('Svelte 5 runes migration');
</script>

<div class="flex w-full min-w-0 items-center justify-center p-2 sm:p-6">
    <ScrollArea
        aria-label="Recent chats"
        class="h-72 w-full max-w-72 rounded-[var(--radius-xl)] border border-border bg-card shadow-[var(--elevation-1)]"
    >
        <div class="flex flex-col p-2">
            {#each groups as group (group.date)}
                <div class="px-2 py-2 pt-3 text-xs font-medium text-foreground-muted">
                    {group.date}
                </div>
                {#each group.chats as chat (chat)}
                    <button
                        type="button"
                        aria-pressed={active === chat}
                        onclick={() => {
                            active = chat;
                        }}
                        class={[
                            'w-full truncate rounded-[var(--radius-md)] px-3 py-2 text-start text-sm transition-colors [transition-duration:var(--motion-duration-hover)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none',
                            active === chat
                                ? 'bg-[var(--color-wash)] font-medium text-foreground'
                                : 'text-foreground-muted hover:bg-[var(--color-wash)] hover:text-foreground'
                        ]}
                    >
                        {chat}
                    </button>
                {/each}
            {/each}
        </div>
    </ScrollArea>
</div>
