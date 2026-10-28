<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Gauge } from '@mielui/svelte/components/gauge';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import ContextWindow from './examples/context-window.svelte';
    import ContextWindowSrc from './examples/context-window.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Interactive from './examples/interactive.svelte';
    import InteractiveSource from './examples/interactive.svelte?raw';
    import States from './examples/states.svelte';
    import StatesSource from './examples/states.svelte?raw';
    import UsageLimit from './examples/usage-limit.svelte';
    import UsageLimitSrc from './examples/usage-limit.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usageCode = `<script lang="ts">
    import { Gauge } from '@mielui/svelte/components/gauge';
</${'script'}>

<Gauge value={85} label="Context remaining" />
<Gauge value={72} label="Monthly API usage" tone="warning">72%</Gauge>`;
</script>

<svelte:head>
    <title>Mielui · Gauge</title>
    <meta
        name="description"
        content="A circular meter for context, usage limits, storage, seats, and other bounded quantities."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Gauge">
        A circular meter for bounded quantities such as context remaining, API usage, storage, and
        seats.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode} refreshable>
            {#snippet children(values)}
                {const gauge = $derived({
                    value: values.empty ? null : values.value,
                    max: values.max,
                    label: 'Monthly API usage',
                    size: values.size,
                    tone: values.tone,
                    animation: values.animation,
                    loading: values.loading
                })}
                {#if values.unit}
                    <Gauge {...gauge}>
                        <span>
                            {values.value}<span class="text-base text-foreground-muted">%</span>
                        </span>
                    </Gauge>
                {:else}
                    <Gauge {...gauge} />
                {/if}
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add gauge" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`value` and `max` set the filled portion; values are clamped between zero and `max`, which defaults to 100. Give every gauge a `label`: it is the accessible name, since the center only shows a number. Children replace that number. The default number rolls when the value changes; for custom center content, use the [numberShuffle action](/docs/actions/number-shuffle) on the numeric text."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The default diameter is 120px. Set `size` for compact toolbar meters; the arc and center text scale with it. `strokeWidth` sets the track thickness, which defaults to 9.75% of the diameter. `animation` reveals the arc on entry by default, `live` adds a continuous highlight, and `none` turns motion off. Reduced motion and themes without motion also turn it off."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
    </section>

    <section id="changing-values" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Changing values</Typography.H2>
        <Typography.Text variant="supporting">
            Add files to approach the storage limit, then clear them. The meter transitions from its
            current value and changes tone near capacity. The label keeps the units explicit for
            screen readers.
        </Typography.Text>
        <ComponentPreview code={InteractiveSource}>
            <Interactive />
        </ComponentPreview>
    </section>

    <section id="loading" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Loading and missing measurements</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Set `loading` while a measurement is being fetched. Pass `value={null}` when no measurement is available; zero is still a valid value. Gauge keeps its size, draws the matching ring and center text, and announces the state."}
            />
        </Typography.Text>
        <CodeBlock
            lang="svelte"
            copy="overlay"
            code={`<Gauge value={usage} loading={pending} label="Storage used in GB" />
<Gauge value={null} label="Storage used in GB" />`}
        />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="usage-update" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Usage update</Typography.H3>
            <Typography.Text variant="supporting">
                The arc, the number, and the tone follow the value when it changes.
            </Typography.Text>
            <ComponentPreview refreshable code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="context-window" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Compact and detailed</Typography.H3>
            <ComponentPreview refreshable code={ContextWindowSrc}>
                <ContextWindow />
            </ComponentPreview>
        </div>

        <div id="usage-limit" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Usage limit</Typography.H3>
            <ComponentPreview refreshable code={UsageLimitSrc}>
                <UsageLimit />
            </ComponentPreview>
        </div>
    </section>

    <section id="data-states" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Data and animation states</Typography.H2>
        <Typography.Text variant="supporting">
            Compare ready, loading, unavailable, zero, and full measurements. Reveal plays the entry
            animation; Live highlights the arc continuously without changing its value; None turns
            motion off. The live highlight pauses offscreen, in hidden tabs, and with reduced
            motion. Loading and unavailable states keep the same footprint.
        </Typography.Text>
        <ComponentPreview code={StatesSource}>
            <States />
        </ComponentPreview>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Built-in text is English. Pass a `labels` object to translate the accessible name Gauge builds while loading (`loading`), when there is no data (`empty`), and when there is no `label` (`value`). `GaugeLabels` types it; every key is optional and each one is a function."}
            />
        </Typography.Text>
        <CodeBlock
            code={`<Gauge
    value={72}
    labels={{
        loading: (name) => \`Chargement de \${name ?? 'la mesure'}\`,
        value: (value, max) => \`\${value} sur \${max}\`
    }}
/>`}
            lang="svelte"
            copy="overlay"
        />
    </section>
</div>
