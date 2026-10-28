<script lang="ts">
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { Look } from '#lib/components/shell/look.js';
    import Sticker from '#lib/components/shell/sticker.svelte';
    import TravelingPill from '#lib/components/shell/traveling-pill.svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import { guideGroup, measurePill, scrollParent, sections, siteLinks } from './navigation-items';

    let {
        close,
        background = 'var(--color-background)'
    }: {
        close?: () => void;
        background?: string;
    } = $props();

    const rowClass =
        'group/row flex h-8 w-full min-w-0 items-center gap-[11px] rounded-[var(--radius-control)] px-2.5 text-start text-[13px] press-soft text-foreground-muted hover:not-aria-[current=page]:bg-[color-mix(in_oklab,var(--color-foreground)_5%,transparent)] hover:text-foreground aria-[current=page]:transition-[color,transform] aria-[current=page]:[transition-duration:var(--motion-duration-item),120ms] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] aria-[current=page]:font-medium aria-[current=page]:text-foreground motion-reduce:transition-none';
    const labelClass =
        'flex h-8 items-center gap-2.5 rounded-[var(--radius-control)] px-2 text-[13px] font-medium text-foreground';

    type NavLink = (typeof siteLinks)[number];

    let nav = $state<HTMLElement>();

    let pressedHref: string | undefined;

    function press(event: PointerEvent, href: string) {
        pressedHref = undefined;
        if (
            event.pointerType !== 'mouse' ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            href === page.url.pathname
        ) {
            return;
        }
        pressedHref = href;
        close?.();
        void goto(href);
    }

    function follow(event: MouseEvent, href: string) {
        if (pressedHref === href) {
            event.preventDefault();
            pressedHref = undefined;

            return;
        }
        close?.();
    }

    $effect(() => {
        void page.url.pathname;
        const current = nav?.querySelector<HTMLElement>('[aria-current="page"]');
        const scroller = current ? scrollParent(current) : undefined;
        if (!current || !scroller) {
            return;
        }
        const item = current.getBoundingClientRect();
        const view = scroller.getBoundingClientRect();
        if (item.top >= view.top && item.bottom <= view.bottom) {
            return;
        }
        scroller.scrollTop += item.top - view.top - (view.height - item.height) / 2;
    });
</script>

<nav
    bind:this={nav}
    aria-label="Documentation"
    style:--nav-background={background}
    class="relative isolate flex flex-col gap-5 px-3 pt-1 pb-10 lg:pt-0"
>
    <TravelingPill container={nav} measure={measurePill} track={page.url.pathname} axis="both" />
    <div class="flex flex-col gap-px">
        {#each siteLinks as item (item.href)}
            {@render iconRow(item)}
        {/each}
    </div>
    <section class="group/section flex flex-col gap-px">
        {@render label(guideGroup.look)}
        {#each guideGroup.items as item (item.href)}
            {@render iconRow(item)}
        {/each}
    </section>

    {#each sections as section (section.id)}
        <section class="group/section flex flex-col gap-px">
            <h2
                class="sticky top-0 z-10 -mx-3 m-0 bg-[var(--nav-background)] px-3 [container-type:scroll-state]"
            >
                <span
                    aria-hidden="true"
                    class="pointer-events-none absolute inset-x-0 top-full h-5 bg-linear-to-b from-[var(--nav-background)] to-transparent opacity-0 [mask-image:linear-gradient(to_bottom,black,transparent)] [@container_scroll-state(stuck:top)]:opacity-100"
                ></span>
                <a
                    href={section.href}
                    class={`${labelClass} press-soft hover:bg-[color-mix(in_oklab,var(--color-foreground)_5%,transparent)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]`}
                    aria-current={page.url.pathname === section.href ? 'page' : undefined}
                    onpointerdown={(event) => press(event, section.href)}
                    onclick={(event) => follow(event, section.href)}
                >
                    <Sticker icon={section.look.icon} mesh={section.look.mesh} size={18} />
                    {section.label}
                </a>
            </h2>
            {#each section.items as item (item.href)}
                <a
                    href={item.href}
                    data-nav-row
                    class={`${rowClass} ${item.nested ? 'ps-12' : 'ps-9'}`}
                    aria-current={page.url.pathname === item.href ? 'page' : undefined}
                    onpointerdown={(event) => press(event, item.href)}
                    onclick={(event) => follow(event, item.href)}
                >
                    <span data-nav-label class="min-w-0 truncate">{item.label}</span>
                </a>
            {/each}
        </section>
    {/each}
</nav>

{#snippet iconRow(item: NavLink)}
    <a
        href={item.href}
        data-nav-row
        class={rowClass}
        aria-current={page.url.pathname === item.href ? 'page' : undefined}
        onpointerdown={(event) => press(event, item.href)}
        onclick={(event) => follow(event, item.href)}
    >
        <HugeiconsIcon icon={item.icon} size={15} class="shrink-0 opacity-70" aria-hidden="true" />
        <span data-nav-label class="min-w-0 truncate">{item.label}</span>
    </a>
{/snippet}

{#snippet label(look: Look)}
    <h2 class="m-0">
        <span class={labelClass}>
            <Sticker icon={look.icon} mesh={look.mesh} size={18} />
            {look.title}
        </span>
    </h2>
{/snippet}
