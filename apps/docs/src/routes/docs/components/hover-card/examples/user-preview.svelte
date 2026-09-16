<script lang="ts">
    import Building from '@hugeicons/core-free-icons/Building03Icon';
    import MapPin from '@hugeicons/core-free-icons/Location01Icon';
    import Users from '@hugeicons/core-free-icons/UserGroupIcon';
    import * as Avatar from '@mielui/svelte/components/avatar';
    import { Button } from '@mielui/svelte/components/button';
    import * as HoverCard from '@mielui/svelte/components/hover-card';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="flex items-center justify-center">
    <div class="text-[0.92rem] text-foreground-muted">
        Reviewed by
        <HoverCard.Root>
            <HoverCard.Trigger href="https://github.com/mielsense">@mielsense</HoverCard.Trigger>
            <HoverCard.Content class="w-60">
                <div class="flex flex-col gap-3">
                    <!-- Header: Avatar + Name -->
                    <div class="flex items-center gap-3">
                        <Avatar.Root size="md">
                            <Avatar.Fallback>AN</Avatar.Fallback>
                        </Avatar.Root>
                        <div class="flex flex-col">
                            <HoverCard.Title class="text-base">mielsense</HoverCard.Title>
                            <p class="text-sm text-foreground-muted">@mielsense</p>
                        </div>
                    </div>

                    <!-- Bio -->
                    <HoverCard.Description class="text-sm leading-relaxed text-pretty">
                        Building Mielui, a themeable Svelte component library. Type-driven design &
                        animation polish.
                    </HoverCard.Description>

                    <!-- Meta: Location & Company -->
                    <div class="flex flex-col gap-1 text-xs text-foreground-muted">
                        <div class="flex items-center gap-1.5">
                            <HugeiconsIcon icon={MapPin} size={14} />
                            <span>Seattle, WA</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <HugeiconsIcon icon={Building} size={14} />
                            <span>Mielui Labs</span>
                        </div>
                    </div>

                    <!-- Stats -->
                    <div class="flex items-center gap-1 text-xs text-foreground-muted py-1">
                        <HugeiconsIcon icon={Users} size={14} />
                        <span>1.2k followers · 89 following</span>
                    </div>

                    <!-- Follow Button -->
                    <Button variant="secondary" size="md" class="w-full">Follow</Button>
                </div>
            </HoverCard.Content>
        </HoverCard.Root>
        3 days ago.
    </div>
</div>
