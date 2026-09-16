<script lang="ts">
    import Link from '@hugeicons/core-free-icons/Link01Icon';
    import Share2 from '@hugeicons/core-free-icons/Share08Icon';
    import * as Avatar from '@mielui/svelte/components/avatar';
    import { Button } from '@mielui/svelte/components/button';
    import { Input } from '@mielui/svelte/components/input';
    import * as Popover from '@mielui/svelte/components/popover';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<Popover.Root placement="bottom">
    <Popover.Trigger variant="outline">
        <HugeiconsIcon icon={Share2} size={14} />
        Share
    </Popover.Trigger>
    <Popover.Content class="w-[26rem] max-w-[calc(100vw-2rem)]">
        <div class="flex flex-col gap-3 p-1">
            <!-- Invite -->
            <div class="flex w-full items-stretch gap-2">
                <div class="min-w-0 flex-1">
                    <Input placeholder="Add people, emails or groups…" class="h-9 text-sm" />
                </div>
                <Button size="md" class="flex-shrink-0">Invite</Button>
            </div>

            <div class="h-px bg-border"></div>

            <!-- People with access -->
            <div class="flex flex-col gap-1">
                <div
                    class="flex items-center justify-between gap-3 rounded-[var(--radius-md)] px-2 py-1.5"
                >
                    <div class="flex min-w-0 items-center gap-2">
                        <Avatar.Root size="sm"><Avatar.Fallback>AN</Avatar.Fallback></Avatar.Root>
                        <div class="flex min-w-0 flex-col">
                            <p
                                class="m-0 truncate text-sm [font-weight:var(--font-weight-label,500)]"
                            >
                                mielsense
                            </p>
                            <p class="m-0 truncate text-xs text-foreground-muted">
                                mielsense@ui.miel.my
                            </p>
                        </div>
                    </div>
                    <p class="m-0 whitespace-nowrap text-xs text-foreground-muted">Owner</p>
                </div>

                <div
                    class="flex items-center justify-between gap-3 rounded-[var(--radius-md)] px-2 py-1.5"
                >
                    <div class="flex min-w-0 items-center gap-2">
                        <Avatar.Root size="sm"><Avatar.Fallback>MC</Avatar.Fallback></Avatar.Root>
                        <div class="flex min-w-0 flex-col">
                            <p
                                class="m-0 truncate text-sm [font-weight:var(--font-weight-label,500)]"
                            >
                                Maya Chen
                            </p>
                            <p class="m-0 truncate text-xs text-foreground-muted">
                                maya@ui.miel.my
                            </p>
                        </div>
                    </div>
                    <p class="m-0 whitespace-nowrap text-xs text-foreground-muted">Can edit</p>
                </div>
            </div>

            <div class="h-px bg-border"></div>

            <!-- Link sharing -->
            <div class="flex items-center justify-between gap-3 px-2 py-1">
                <div class="flex min-w-0 flex-col">
                    <p class="m-0 text-sm [font-weight:var(--font-weight-label,500)]">
                        Anyone with the link
                    </p>
                    <p class="m-0 text-xs text-foreground-muted">Can view</p>
                </div>
                <Button size="md" variant="ghost" class="flex-shrink-0">
                    <HugeiconsIcon icon={Link} size={14} />
                    Copy link
                </Button>
            </div>
        </div>
    </Popover.Content>
</Popover.Root>
