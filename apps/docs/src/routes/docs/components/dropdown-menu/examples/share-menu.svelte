<script lang="ts">
    import {
        ArrowDown01Icon as ChevronDown,
        Files01Icon as Copy2,
        ViewOffIcon as EyeOff,
        SentIcon as Send,
        UserIcon as User
    } from '@hugeicons/core-free-icons';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let privateProject = $state(false);
    let message = $state('');
    function invite() {
        message = 'Share the copied link with a collaborator.';
    }
    async function copyLink() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            message = 'Documentation link copied.';
        } catch {
            message = 'Clipboard access is unavailable.';
        }
    }
    function toggleVisibility() {
        privateProject = !privateProject;
        message = privateProject ? 'Preview project is private.' : 'Preview project is public.';
    }
</script>

<div class="flex flex-col items-center gap-3">
    <DropdownMenu.Root>
        <DropdownMenu.Trigger variant="outline" size="md">
            <HugeiconsIcon icon={Send} size={13} />
            Share
            <HugeiconsIcon icon={ChevronDown} size={11} class="text-foreground-muted" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="min-w-[14rem]">
            <DropdownMenu.Label>Workspace</DropdownMenu.Label>
            <DropdownMenu.Item callback={invite}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={User} size={13} />
                    Invite collaborator
                </span>
            </DropdownMenu.Item>
            <DropdownMenu.Item callback={copyLink}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={Copy2} size={13} />
                    Copy link
                </span>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Label>Public</DropdownMenu.Label>
            <DropdownMenu.Item callback={toggleVisibility}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={EyeOff} size={13} />
                    {privateProject ? 'Make public' : 'Make private'}
                </span>
            </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>

    <p role="status" class="text-sm text-foreground-muted">{message}</p>
</div>
