<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { Input } from '@mielui/svelte/components/input';
    import * as Popover from '@mielui/svelte/components/popover';

    let { surface }: { surface?: 'solid' | 'glass' } = $props();

    let email = $state('');
    let members = $state(['alex@example.com']);
    let message = $state('');

    function invite(event: SubmitEvent) {
        event.preventDefault();
        const address = email.trim().toLowerCase();
        if (members.includes(address)) {
            message = 'This person already has access.';
            return;
        }
        members = [...members, address];
        email = '';
        message = `Added ${address} to this preview. No invitation was sent.`;
    }

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(
                `${window.location.origin}/docs/components/popover`
            );
            message = 'Documentation link copied.';
        } catch {
            message = 'Clipboard access is unavailable. Copy the address from your browser.';
        }
    }
</script>

<Popover.Root placement="bottom">
    <Popover.Trigger variant="outline">Share project</Popover.Trigger>
    <Popover.Content {surface} class="w-80 max-w-[calc(100vw-var(--spacing)*8)]">
        <div class="flex flex-col gap-3">
            <div class="space-y-1">
                <Popover.Title class="text-sm font-medium">Share project</Popover.Title>
                <p class="text-xs text-foreground-muted">Try inviting a teammate in this demo.</p>
            </div>
            <form onsubmit={invite} class="flex min-w-0 items-center gap-2">
                <Input
                    aria-label="Email address"
                    type="email"
                    required
                    bind:value={email}
                    placeholder="Email address"
                    class="min-w-0 flex-1"
                />
                <Button type="submit" class="shrink-0">Invite</Button>
            </form>
            <ul
                class="flex max-h-40 flex-col gap-2 overflow-y-auto"
                aria-label="People with access"
            >
                {#each members as member (member)}
                    <li class="flex min-w-0 items-center gap-2">
                        <span
                            class="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium"
                            aria-hidden="true"
                        >
                            {member.slice(0, 1).toUpperCase()}
                        </span>
                        <span class="min-w-0 flex-1 truncate text-xs">{member}</span>
                        <span class="shrink-0 text-xs text-foreground-muted">
                            {member === members[0] ? 'Owner' : 'Member'}
                        </span>
                    </li>
                {/each}
            </ul>
            <div class="flex items-center justify-between gap-2 border-t border-border pt-2">
                <span class="text-xs text-foreground-muted">Documentation</span>
                <Button variant="ghost" size="sm" onclick={copyLink}>Copy link</Button>
            </div>
            <p role="status" class="text-xs text-foreground-muted empty:hidden">{message}</p>
        </div>
    </Popover.Content>
</Popover.Root>
