<script lang="ts">
    import {
        ArrowRight01Icon,
        ArrowUp02Icon,
        Cancel01Icon,
        Copy01Icon,
        Tick02Icon
    } from '@hugeicons/core-free-icons';
    import BrandMark from '@mielui/svelte/brand-mark';
    import * as Accordion from '@mielui/svelte/components/accordion';
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
    import {
        catalogPages,
        components,
        componentTypeHref,
        entryHref,
        navigationGroups,
        sanitizeComponent
    } from '#lib/components.js';
    import { GITHUB_URL } from '#lib/github.js';
    import { resolve } from '$app/paths';

    const title = 'Mielui · Svelte components you own';
    const description = `${components.length} Svelte 5 components. Restyle all of them from a handful of design tokens.`;
    const installCommand = 'pnpm add @mielui/svelte';

    const nav = [
        {
            href: resolve('/docs/components'),
            label: 'Components'
        },
        {
            href: componentTypeHref('ai-components'),
            label: 'AI'
        },
        {
            href: resolve('/studio'),
            label: 'Studio'
        },
        {
            href: resolve('/themes'),
            label: 'Themes'
        },
        {
            href: resolve('/docs/changelog'),
            label: 'Changelog'
        }
    ];

    const shortHeadings: Record<string, string> = {
        'native-controls': 'Native',
        'status-and-content': 'Status',
        'ai-components': 'AI',
        'chart-components': 'Charts'
    };

    const actions = navigationGroups.find((group) => {
        return group.id === 'actions';
    });

    const indexGroups = [...catalogPages, ...(actions ? [actions] : [])].map((group) => {
        return {
            id: group.id,
            heading: shortHeadings[group.id] ?? group.heading,
            href: group.id === 'actions' ? resolve('/docs/actions') : componentTypeHref(group.id),
            items: group.items.map((slug) => {
                return {
                    href: entryHref(group.id, slug),
                    label: sanitizeComponent(slug)
                };
            })
        };
    });

    const indexRows = [indexGroups.slice(0, 6), indexGroups.slice(6)];

    const stats = [
        {
            value: components.length,
            unit: 'parts',
            detail: `Components across ${indexGroups.length} groups`
        },
        {
            value: builtInThemePresets.length,
            unit: 'themes',
            detail: 'Ready to drop in, or make your own'
        },
        {
            value: 1,
            unit: 'stylesheet',
            detail: 'Restyles every one of them'
        }
    ];

    const steps = [
        {
            value: 'compose',
            title: 'Compose the parts',
            lang: 'svelte',
            detail: 'Card is Root, Header, Content, and Footer. Leave the footer out and the card closes on its content. What you write is what renders.',
            code: '<Card.Root>\n  <Card.Header>…</Card.Header>\n  <Card.Content>…</Card.Content>\n  <Card.Footer>…</Card.Footer>\n</Card.Root>'
        },
        {
            value: 'copy',
            title: 'Copy the source',
            lang: 'sh',
            detail: 'One command puts the component file in your project. It is plain Svelte and Tailwind, so there is nothing to eject from.',
            code: 'pnpm dlx @mielui/svelte add card'
        },
        {
            value: 'theme',
            title: 'Theme it once',
            lang: 'css',
            detail: 'Color, corners, type, and motion are tokens. Change them in one stylesheet and every component follows.',
            code: ':root {\n  --color-primary: #ba7ca5;\n  --radius-control: 12px;\n}'
        },
        {
            value: 'agent',
            title: 'Hand it to your agent',
            lang: 'sh',
            detail: 'The Mielui skill gives coding agents the current component APIs, so what they write compiles.',
            code: 'npx skills add mielsense/mielui --skill mielui'
        }
    ];

    const checklist = [
        {
            label: 'Review the notes',
            done: true
        },
        {
            label: 'Test the keyboard',
            done: true
        },
        {
            label: 'Tag the release',
            done: false
        }
    ];

    const footerLinks = [
        {
            href: resolve('/docs/introduction'),
            label: 'Docs',
            external: false
        },
        {
            href: resolve('/docs/changelog'),
            label: 'Changelog',
            external: false
        },
        {
            href: GITHUB_URL,
            label: 'GitHub',
            external: true
        }
    ];

    let step = $state('compose');
    let copyStatus = $state<'idle' | 'copied' | 'failed'>('idle');
    let copyTimer: ReturnType<typeof setTimeout> | undefined;

    const copyLabels = {
        idle: `Copy ${installCommand}`,
        copied: 'Copied the install command',
        failed: 'Could not copy. Select the command to copy it.'
    };

    const copyIcons = {
        idle: Copy01Icon,
        copied: Tick02Icon,
        failed: Cancel01Icon
    };

    async function copyInstall() {
        try {
            await navigator.clipboard.writeText(installCommand);
            copyStatus = 'copied';
        } catch {
            copyStatus = 'failed';
        }
        clearTimeout(copyTimer);
        copyTimer = setTimeout(() => {
            copyStatus = 'idle';
        }, 1600);
    }

    const accent = 'accent text-[var(--home-accent)]';
    const hairline =
        'shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-foreground)_10%,transparent)]';
    const plate = `rounded-[14px] bg-[color-mix(in_oklab,var(--color-foreground)_4%,var(--color-card))] ${hairline}`;
    const mono = 'font-mono text-xs leading-4';
    const navLink =
        'rounded-[9px] px-2 py-1 text-sm text-foreground/70 hover:text-foreground focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none';
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
</svelte:head>

<div
    class="dark flex min-h-dvh flex-col bg-background text-foreground [--home-accent:color-mix(in_oklab,var(--color-primary)_30%,white)]"
>
    <a
        href="#home-content"
        class="sr-only z-50 rounded-md bg-card px-4 py-2 text-foreground focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
    >
        Skip to content
    </a>

    <header class="wrap relative z-10 flex h-[76px] items-center gap-7">
        <a
            href={resolve('/')}
            aria-label="mielui Home"
            class="brand flex shrink-0 items-center gap-2 rounded-[var(--radius-control)] text-foreground focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none"
        >
            <BrandMark size={22} />
            <span class="text-[17px] font-semibold tracking-[-0.02em]">mielui</span>
        </a>
        <nav aria-label="Site" class="flex flex-1 items-center gap-3 md:ps-4">
            {#each nav as link (link.href)}
                <a href={link.href} class={['max-md:hidden', navLink]}>{link.label}</a>
            {/each}
            <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                class={['ms-auto max-sm:hidden', navLink]}
            >
                GitHub
            </a>
            <Button
                href={resolve('/docs/installation')}
                variant="secondary"
                class="ms-auto gap-1.5 text-background [--mielui-glow-color:var(--color-foreground)] sm:ms-1"
            >
                Get started
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={1.8} />
            </Button>
        </nav>
    </header>

    <main id="home-content">
        <div
            class="relative isolate -mt-[76px] overflow-clip bg-linear-to-b from-primary to-background to-72% pt-[76px]"
        >
            <section
                aria-labelledby="home-title"
                class="wrap flex flex-col items-center gap-[22px] pt-20 pb-16 text-center sm:pt-28"
            >
                <h1
                    id="home-title"
                    class="display m-0 max-w-[66rem] text-5xl text-foreground sm:text-6xl lg:text-[80px] lg:leading-[80px] lg:tracking-[-0.045em]"
                >
                    Svelte components, <span class={accent}>yours</span> to keep and
                    <span class={accent}>restyle</span>
                </h1>
                <p class="m-0 max-w-[35rem] text-[17px] leading-[26px] text-foreground/70">
                    {components.length}
                    components for Svelte 5 and Tailwind v4, from a button to a full coding-agent
                    screen. One set of tokens themes all of them.
                </p>
                <div class="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                    <Button
                        href={resolve('/docs/components')}
                        variant="secondary"
                        size="lg"
                        class="text-background [--mielui-glow-color:var(--color-foreground)]"
                    >
                        Browse components
                    </Button>
                    <button
                        type="button"
                        onclick={copyInstall}
                        aria-label={copyLabels[copyStatus]}
                        class="press flex h-[var(--size-control-lg)] items-center gap-2.5 rounded-[var(--radius-control)] bg-foreground/8 px-[18px] font-mono text-[13px] text-foreground {hairline} hover:bg-foreground/12 focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none"
                    >
                        <span class="text-foreground/55" aria-hidden="true">$</span>
                        {installCommand}
                        <HugeiconsIcon
                            icon={copyIcons[copyStatus]}
                            size={14}
                            class="text-foreground/55"
                        />
                    </button>
                    <span role="status" class="sr-only">
                        {copyStatus === 'idle' ? '' : copyLabels[copyStatus]}
                    </span>
                </div>
            </section>

            <div class="wrap relative flex justify-center pb-16">
                <div
                    aria-hidden="true"
                    class="flex w-full max-w-[55rem] flex-col gap-3 rounded-3xl bg-card/70 p-3 text-start shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-foreground)_10%,transparent),inset_0_1px_0_color-mix(in_oklab,var(--color-foreground)_12%,transparent),0_40px_80px_-20px_rgb(0_0_0/0.6)]"
                >
                    <div class="flex flex-col gap-[18px] px-4 pt-4 pb-3 {plate} rounded-2xl">
                        <p class="m-0 text-[15px] leading-[18px]">
                            Rate-limit the public API. 100 requests a minute per key, 429 when a
                            client goes over.
                        </p>
                        <div class="flex items-center gap-2">
                            <span
                                class="flex h-[26px] items-center rounded-lg bg-foreground/6 px-2.5 font-mono text-[11px] text-foreground/70 {hairline}"
                            >
                                src/app.ts
                            </span>
                            <span class="ms-auto text-xs text-foreground/55">Mielui 3.1</span>
                            <span
                                class="grid size-7 place-items-center rounded-full bg-[var(--home-accent)] text-background"
                            >
                                <HugeiconsIcon icon={ArrowUp02Icon} size={14} strokeWidth={1.8} />
                            </span>
                        </div>
                    </div>
                    <div class="flex items-center gap-1.5 px-1.5 py-1 text-xs">
                        <span class="text-foreground/70">✓ Read</span>
                        <span class="text-foreground/30">—</span>
                        <span class="text-foreground/70">✓ Plan</span>
                        <span class="text-foreground/30">—</span>
                        <span
                            class="rounded-full bg-[color-mix(in_oklab,var(--home-accent)_12%,transparent)] px-2 py-[3px] text-[var(--home-accent)]"
                        >
                            ● Edit
                        </span>
                        <span class="text-foreground/30">— Test — Ship</span>
                        <span class="ms-auto font-mono text-[11px] text-foreground/45">02:48</span>
                    </div>
                    <div class="flex flex-col gap-3 sm:flex-row">
                        <div class="flex min-w-0 flex-[1.4] flex-col overflow-clip pb-5 {plate}">
                            <div class="flex h-9 items-center gap-1.5 px-3.5 {mono}">
                                <span class="me-auto">src/app.ts</span>
                                <span class="text-success">+3</span>
                                <span class="text-error">−1</span>
                            </div>
                            <div class="flex h-[26px] items-center gap-3.5 px-3.5 {mono}">
                                <span class="w-4 shrink-0 text-foreground/35">9</span>
                                <span class="truncate text-foreground/75"> .use(authenticate)</span>
                            </div>
                            <div
                                class="flex h-[26px] items-center gap-3.5 bg-success/10 px-3.5 {mono}"
                            >
                                <span class="w-4 shrink-0 text-success">10</span>
                                <span class="truncate"
                                    >+ .use(rateLimit({'{'}
                                    limit: 100, window: "1m" {'}'}))</span
                                >
                            </div>
                            <div
                                class="flex h-[26px] items-center gap-3.5 bg-error/10 px-3.5 {mono}"
                            >
                                <span class="w-4 shrink-0 text-error">10</span>
                                <span class="truncate text-foreground/75"
                                    >− .route("/v1", routes);</span
                                >
                            </div>
                            <div
                                class="flex h-[26px] items-center gap-3.5 bg-success/10 px-3.5 {mono}"
                            >
                                <span class="w-4 shrink-0 text-success">11</span>
                                <span class="truncate">+ .route("/v1", routes)</span>
                            </div>
                        </div>
                        <div class="flex flex-1 flex-col gap-3 px-3.5 py-3 text-[13px] {plate}">
                            <div class="flex">
                                <span class="me-auto">Checks</span>
                                <span class="text-xs text-foreground/45">2 of 3</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="size-2.5 shrink-0 rounded-full bg-success"></span>
                                <span class="me-auto text-foreground/85">Typecheck</span>
                                <span class="font-mono text-[11px] text-foreground/45">6.2s</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="size-2.5 shrink-0 rounded-full bg-success"></span>
                                <span class="me-auto text-foreground/85">Unit tests</span>
                                <span class="font-mono text-[11px] text-foreground/45"
                                    >18 passed</span
                                >
                            </div>
                            <div class="flex items-center gap-2">
                                <span
                                    class="size-2.5 shrink-0 rounded-full shadow-[inset_0_0_0_1.5px_var(--home-accent)]"
                                ></span>
                                <span class="me-auto text-foreground/85">Preview deploy</span>
                                <span class="font-mono text-[11px] text-[var(--home-accent)]"
                                    >running…</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background to-90%"
                ></div>
            </div>
        </div>

        <section
            aria-label="Why Mielui"
            class="wrap flex flex-col gap-14 pt-16 pb-24 lg:flex-row lg:gap-20 lg:px-[120px] lg:pt-[100px] lg:pb-[120px]"
        >
            <div class="flex flex-1 flex-col gap-7 text-[22px] leading-[31px] tracking-[-0.01em]">
                <p class="m-0">
                    Most kits hand you a package you can't open. Mielui hands you the files: plain
                    Svelte and Tailwind you read, change, and commit.
                </p>
                <p class="m-0">
                    Every component reads one set of tokens, so a theme is a stylesheet, not a fork.
                    <span class="text-foreground/40">
                        Larger pieces are named parts you can omit, reorder, or restyle, and the
                        agent skill keeps coding agents on the current API.
                    </span>
                </p>
                <Button
                    href={resolve('/docs/introduction')}
                    variant="secondary"
                    class="self-start text-background [--mielui-glow-color:var(--color-foreground)]"
                >
                    Read the introduction
                </Button>
            </div>
            <div class="w-px shrink-0 bg-foreground/8 max-lg:hidden"></div>
            <dl class="m-0 flex shrink-0 flex-col gap-11 lg:w-[300px]">
                {#each stats as stat (stat.unit)}
                    <div class="flex flex-col-reverse gap-1.5">
                        <dt class="text-[15px] text-foreground/60">{stat.detail}</dt>
                        <dd class="m-0 text-[56px] leading-[56px] tracking-[-0.04em] tabular-nums">
                            {stat.value}<span class="text-foreground/30">{` ${stat.unit}`}</span>
                        </dd>
                    </div>
                {/each}
            </dl>
        </section>

        <section aria-labelledby="home-how" class="wrap flex flex-col gap-12 pb-24 lg:pb-[140px]">
            <div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <h2
                    id="home-how"
                    class="display m-0 max-w-[620px] text-4xl text-foreground sm:text-[52px] sm:leading-[54px] sm:tracking-[-0.04em]"
                >
                    From one command to a screen you <span class={accent}>ship</span>
                </h2>
                <p class="m-0 max-w-[340px] text-[15px] leading-[23px] text-foreground/55">
                    Each step changes the same component on the left. Pick one to see the code and
                    the result side by side.
                </p>
            </div>
            <div class="flex flex-col gap-10 lg:flex-row">
                <div
                    aria-hidden="true"
                    class="flex h-[420px] shrink-0 items-center justify-center rounded-3xl bg-linear-to-b from-primary to-background lg:h-[520px] lg:w-[640px] {hairline}"
                >
                    <div
                        class="flex w-[340px] max-w-[85%] flex-col gap-3.5 rounded-[18px] bg-white p-[18px] text-[#292929] shadow-[0_30px_60px_-20px_rgb(20_10_20/0.55)]"
                    >
                        <div class="flex flex-col gap-0.5">
                            <span class="text-[15px] font-medium">Release checklist</span>
                            <span class="text-[13px] text-[#6d6d6d]">2 of 3 done</span>
                        </div>
                        {#each checklist as item (item.label)}
                            <div class="flex items-center gap-2.5 text-sm">
                                {#if item.done}
                                    <span
                                        class="grid size-[18px] place-items-center rounded-md bg-primary text-white"
                                    >
                                        <HugeiconsIcon
                                            icon={Tick02Icon}
                                            size={11}
                                            strokeWidth={2.6}
                                        />
                                    </span>
                                {:else}
                                    <span
                                        class="size-[18px] rounded-md shadow-[inset_0_0_0_1px_rgb(41_41_41/0.22)]"
                                    ></span>
                                {/if}
                                {item.label}
                            </div>
                        {/each}
                        <span
                            class="flex h-[34px] items-center self-end rounded-xl bg-[#292929] px-3.5 text-sm font-medium text-white"
                        >
                            Publish
                        </span>
                    </div>
                </div>
                <Accordion.Root
                    bind:value={step}
                    collapsible={false}
                    class="min-w-0 flex-1 divide-y-0"
                >
                    {#each steps as item, index (item.value)}
                        <Accordion.Item
                            value={item.value}
                            class="rounded-none border-t border-foreground/10 py-0 last:border-b"
                        >
                            <Accordion.Trigger
                                class="min-h-[76px] gap-4 px-0 text-xl enabled:hover:bg-transparent font-normal tracking-[-0.015em] text-foreground/45 hover:text-foreground/70 group-data-[state=open]:text-foreground"
                            >
                                <span class="{mono} w-6 shrink-0 text-xs text-foreground/35">
                                    0{index + 1}
                                </span>
                                <span class="flex-1">{item.title}</span>
                            </Accordion.Trigger>
                            <Accordion.Content class="-me-2 -mt-2 ps-8">
                                <div class="flex flex-col gap-4 pb-6">
                                    <p class="m-0 text-[15px] leading-[23px] text-foreground/60">
                                        {item.detail}
                                    </p>
                                    <CodeBlock code={item.code} lang={item.lang} copy="overlay" />
                                </div>
                            </Accordion.Content>
                        </Accordion.Item>
                    {/each}
                </Accordion.Root>
            </div>
        </section>

        <section aria-labelledby="home-index" class="wrap flex flex-col pb-24 lg:pb-[120px]">
            <div class="flex flex-wrap items-baseline justify-between gap-3 pb-8">
                <h2
                    id="home-index"
                    class="display m-0 text-4xl text-foreground sm:text-[44px] sm:leading-[48px] sm:tracking-[-0.04em]"
                >
                    {components.length}
                    components
                </h2>
                <p class="m-0 text-sm text-foreground/55">Every name opens its page.</p>
            </div>
            {#each indexRows as row, rowIndex (rowIndex)}
                <div
                    class="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-foreground/10 pt-6 pb-10 sm:grid-cols-3 lg:grid-cols-6"
                >
                    {#each row as group (group.id)}
                        <div class="flex flex-col gap-1.5">
                            <h3 class="m-0 pb-2 text-[13px] font-normal text-foreground/45">
                                <a href={group.href} class="hover:text-foreground">
                                    {group.heading}
                                </a>
                            </h3>
                            <ul class="m-0 flex list-none flex-col gap-1.5 p-0">
                                {#each group.items as item (item.href)}
                                    <li>
                                        <a
                                            href={item.href}
                                            class="text-[15px] leading-[21px] text-foreground/85 hover:text-foreground hover:underline hover:underline-offset-4"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                {/each}
                            </ul>
                        </div>
                    {/each}
                </div>
            {/each}
        </section>
    </main>

    <footer class="border-t border-foreground/8">
        <div
            class="wrap flex h-[72px] items-center justify-between gap-6 text-[13px] text-foreground/50"
        >
            <span>
                MIT licensed. Made by
                <a
                    class="hover:text-foreground"
                    href="https://miel.my"
                    target="_blank"
                    rel="noreferrer"
                >
                    mielsense
                </a>.
            </span>
            <nav aria-label="Elsewhere" class="flex items-center gap-5">
                {#each footerLinks as link (link.href)}
                    <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noreferrer' : undefined}
                        class="hover:text-foreground"
                    >
                        {link.label}
                    </a>
                {/each}
            </nav>
        </div>
    </footer>
</div>
