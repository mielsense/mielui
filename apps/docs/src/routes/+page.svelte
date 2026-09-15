<script lang="ts">
    import ArrowRight from '@lucide/svelte/icons/arrow-right';
    import Menu from '@lucide/svelte/icons/menu';
    import Moon from '@lucide/svelte/icons/moon';
    import Sun from '@lucide/svelte/icons/sun';
    import X from '@lucide/svelte/icons/x';
    import { Button } from '@mielui/svelte/components/button';
    import * as Sheet from '@mielui/svelte/components/sheet';
    import * as Typography from '@mielui/svelte/components/typography';
    import { mode, toggleMode } from 'mode-watcher';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import GitHubBlack from '$lib/assets/GitHub_Invertocat_Black.svg';
    import GitHubWhite from '$lib/assets/GitHub_Invertocat_White.svg';
    import { components } from '$lib/components';
    import Logo from '$lib/components/logo.svelte';
    import SleepingCat from '$lib/components/sleeping-cat.svelte';

    import type { PageData } from './$types';

    const { data }: { data: PageData } = $props();

    function formatStarCount(n: number | null): string {
        if (n === null || Number.isNaN(n)) {
            return 'Star';
        }

        if (n >= 1000) {
            const k = n / 1000;

            return `${k >= 10 ? Math.round(k) : k.toFixed(1)}k`;
        }

        return String(n);
    }

    function pascalCase(slug: string): string {
        return slug
            .split('-')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
    }

    function chunkNames(names: string[], size: number): string[][] {
        const rows: string[][] = [];

        for (let i = 0; i < names.length; i += size) {
            rows.push(names.slice(i, i + size));
        }

        return rows;
    }

    const cloudRows = chunkNames(components.map(pascalCase), 5);
    const rowDurations = [72, 54, 78, 48, 84, 60, 66, 50, 76, 56, 68];

    let mobileMenuOpen = $state(false);

    $effect(() => {
        page.url.pathname;
        mobileMenuOpen = false;
    });
</script>

<svelte:head>
    <title>mielui · Themed Svelte components</title>
    <meta
        name="description"
        content="56 Svelte 5 components. Restyle all of them from a handful of design tokens."
    />
</svelte:head>

<section
    class="relative flex h-full flex-col overflow-hidden bg-background"
    aria-label="mielui introduction"
>
    <Sheet.Root bind:open={mobileMenuOpen}>
        <header
            class="relative z-10 flex w-full items-center justify-between px-4 py-3 sm:px-8 sm:py-4 motion-safe:[animation:docs-block-in_280ms_var(--ease-out)_both]"
        >
            <div class="flex min-w-0 flex-1 items-center gap-2">
                <Sheet.Trigger
                    class="sm:hidden"
                    aria-label="Open navigation menu"
                    variant="quiet"
                    size="icon"
                    ><Menu size={18} /></Sheet.Trigger
                >
                <Logo />
            </div>
            <div class="ml-6 flex shrink-0 items-center gap-2">
                <nav aria-label="Primary" class="hidden items-center gap-2 sm:flex">
                    <Button
                        variant="outline"
                        size="md"
                        href={resolve('/docs/introduction')}
                        style="border-radius: var(--radius-md);"
                    >
                        <span class="text-label">Docs</span>
                    </Button>

                    <Button
                        variant="outline"
                        size="md"
                        href={resolve('/studio')}
                        style="border-radius: var(--radius-md);"
                    >
                        <span class="text-label">Studio</span>
                    </Button>
                </nav>
                <div class="flex shrink-0 items-center gap-2">
                    <Button
                        variant="outline"
                        size="md"
                        style="border-radius: var(--radius-md);"
                        href="https://github.com/mielsense/mielui"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Star mielui on GitHub"
                    >
                        <img
                            src={mode.current === 'dark' ? GitHubWhite : GitHubBlack}
                            alt="GitHub"
                            class="size-4"
                        />
                        <span class="text-label tabular-nums"
                            >{formatStarCount(data.starCount ?? null)}</span
                        >
                    </Button>
                    <Button
                        variant="outline"
                        size="md"
                        class="w-[calc(var(--size-control-md)-var(--size-hairline))] px-0"
                        style="border-radius: var(--radius-md);"
                        onclick={() => {
                        toggleMode();
                    }}
                        aria-label={mode.current === 'dark'
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'}
                    >
                        <span class="relative size-4" aria-hidden="true">
                            <Sun
                                size="16"
                                class={`absolute inset-0 transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none ${
                            mode.current === 'dark'
                                ? 'scale-[0.25] opacity-0 blur-[4px]'
                                : 'scale-100 opacity-100 blur-0'
                        }`}
                            />
                            <Moon
                                size="16"
                                class={`absolute inset-0 transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none ${
                            mode.current === 'dark'
                                ? 'scale-100 opacity-100 blur-0'
                                : 'scale-[0.25] opacity-0 blur-[4px]'
                        }`}
                            />
                        </span>
                    </Button>
                </div>
            </div>
        </header>
        <Sheet.Content side="left" class="p-0 sm:hidden">
            <Sheet.Title class="sr-only">Browse mielui</Sheet.Title>
            <Sheet.Description class="sr-only"
                >Documentation and component categories.</Sheet.Description
            >
            <header class="flex shrink-0 items-center justify-between px-3 py-3">
                <a
                    href={resolve('/')}
                    class="font-semibold tracking-tight text-foreground no-underline"
                >
                    mielui
                </a>
                <Sheet.Close aria-label="Close navigation menu" variant="quiet" size="icon"
                    ><X size={18} /></Sheet.Close
                >
            </header>
            <div class="min-h-0 flex-1 overflow-y-auto px-3 py-4">
                <section class="flex flex-col gap-2 ">
                    <h2 class="mb-2 text-sm text-foreground-muted">Navigate</h2>
                    <Button
                        variant="quiet"
                        class="w-full justify-start"
                        onclick={() => { mobileMenuOpen = false; }}
                        href={resolve('/docs/introduction')}
                    >
                        Docs
                    </Button>
                    <Button
                        variant="quiet"
                        class="w-full justify-start"
                        onclick={() => { mobileMenuOpen = false; }}
                        href={resolve('/docs/components')}
                    >
                        Components
                    </Button>
                    <Button
                        variant="quiet"
                        class="w-full justify-start"
                        onclick={() => { mobileMenuOpen = false; }}
                        href={resolve('/studio')}
                        >Studio</Button
                    >
                </section>
            </div>
        </Sheet.Content>
    </Sheet.Root>
    <div
        class="relative flex w-full flex-1 flex-col items-start justify-end px-4 pt-8 pb-8 text-left sm:px-8 sm:pt-16 sm:pb-16"
    >
        <SleepingCat />
        <Typography.H1
            class="motion-safe:[animation:docs-block-in_280ms_var(--ease-out)_both]"
            style="font-size: 18px; font-weight: var(--font-weight-label);"
        >
            Themed Svelte components
        </Typography.H1>
        <Typography.Description
            class="mt-1 max-w-[38rem] motion-safe:[animation:docs-block-in_280ms_var(--ease-out)_both] motion-safe:[animation-delay:80ms]"
            style="font-size: 18px; font-weight: var(--font-weight-label);"
        >
            Restyle 56 components from a handful of tokens.
        </Typography.Description>
        <div
            class="mt-3 flex w-full flex-col justify-start gap-3 sm:w-auto sm:flex-row sm:flex-wrap motion-safe:[animation:docs-block-in_280ms_var(--ease-out)_both] motion-safe:[animation-delay:115ms]"
        >
            <Button
                href={resolve('/docs/components')}
                size="lg"
                class="w-full justify-center sm:w-auto"
            >
                Browse all 56 components
                <ArrowRight size={16} />
            </Button>
            <Button
                href="https://github.com/mielsense/mielui"
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="lg"
                class="w-full justify-center sm:w-auto"
            >
                View on GitHub
            </Button>
        </div>
    </div>
    <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 right-0 hidden w-[55rem] flex-col justify-between gap-6 overflow-hidden py-4 text-5xl text-foreground-muted opacity-20 blur-[1px] select-none md:flex [mask-image:linear-gradient(to_right,transparent,black_25%)]"
    >
        {#each cloudRows as row, i (i)}
            <div
                class="flex w-max motion-safe:[animation:hero-cloud-drift_linear_infinite]"
                style={`animation-duration: ${rowDurations[i % rowDurations.length]}s; animation-direction: ${i % 2 === 0 ? 'normal' : 'reverse'};`}
            >
                {#each [0, 1] as half (half)}
                    <span class="flex">
                        {#each row as name (name)}
                            <span class="mr-10 whitespace-nowrap">{name}</span>
                        {/each}
                    </span>
                {/each}
            </div>
        {/each}
    </div>
</section>
