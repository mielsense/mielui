<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { Input } from '@mielui/svelte/components/input';
    import * as Popover from '@mielui/svelte/components/popover';

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
    <Popover.Trigger variant="secondary">Share project</Popover.Trigger>
    <Popover.Content class="w-80 max-w-[calc(100vw-var(--spacing)*8)]">
        <div class="flex flex-col gap-4 p-2">
            <div>
                <Popover.Title class="text-sm font-medium">Project access</Popover.Title>
                <p class="mt-1 text-xs text-foreground-muted">
                    Invite someone to the local preview.
                </p>
            </div>
            <form onsubmit={invite} class="flex flex-col gap-3">
                <Input
                    label="Email address"
                    type="email"
                    required
                    bind:value={email}
                    placeholder="sam@example.com"
                />
                <Button type="submit">Invite</Button>
            </form>
            <ul class="divide-y divide-border text-sm">
                {#each members as member (member)}
                    <li class="truncate py-2">{member}</li>
                {/each}
            </ul>
            <Button variant="secondary" onclick={copyLink}>Copy documentation link</Button>
            <p role="status" class="text-xs text-foreground-muted">{message}</p>
        </div>
    </Popover.Content>
</Popover.Root>
