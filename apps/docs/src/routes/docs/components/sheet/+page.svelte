<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Left from './examples/left.svelte';
    import LeftSrc from './examples/left.svelte?raw';
    import Right from './examples/right.svelte';
    import RightSrc from './examples/right.svelte?raw';
    import StayOpenExample from './examples/stay-open.svelte';
    import StayOpenExampleSrc from './examples/stay-open.svelte?raw';

    const TITLE = 'Sheet';

    const installCommand = 'pnpm dlx @mielui/svelte add sheet';
</script>

<svelte:head>
    <title>Mielui · Sheet</title>
    <meta
        name="description"
        content="A modal side panel for navigation, filters, and forms. It slides in from the left or right edge."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title={TITLE}>
        A modal panel that slides in from the left or right edge of the screen. Use Drawer when the
        panel needs swipe gestures.
    </PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}>
            <Hero />
        </ComponentPreview>
    </section>

    <!-- ─── Installation ──────────────────────────────────────────── -->
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            The theme setting chrome.borders chooses "single" or "double" framing. Single is the
            default. Single removes the extra frame while preserving content padding, composition,
            and inset variants.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Set close=&#123;false&#125; on Header to omit its default close button; place
            Sheet.Close wherever the layout needs it. Close forwards bind:element and supports click
            cancellation.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Footer renders on the outer frame below the inner surface, like Dialog.Footer, wherever
            you place it inside Content. Its actions sit in one row. Close is a ghost button that
            moves to the start of the footer, so the other actions line up at the end.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Bind open on Root when another control needs to open or close the panel. Use
            onOpenChange to respond to changes initiated inside the component. Updating your bound
            value directly does not call that callback again. Each Root keeps its own state, so
            opening one instance does not change another.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Sheets open from the left or right. Focus stays within the open sheet and returns to its
            trigger when it closes. Include Title and optionally Description; click handlers on
            Trigger and Close can cancel the state change with event.preventDefault().
        </Typography.Text>

        <CodeBlock
            code={`import * as Sheet from '@mielui/svelte/components/sheet';\nimport Kbd from '@mielui/svelte/components/kbd';\nimport { Button } from '@mielui/svelte/components/button';\n\n<Sheet.Root bind:open>\n  <Sheet.Trigger>Open</Sheet.Trigger>\n  <Sheet.Content side="right">\n    <Sheet.Header>\n      <Sheet.Title>Title</Sheet.Title>\n      <Sheet.Description>Describe what lives here.</Sheet.Description>\n    </Sheet.Header>\n    <!-- Panel content -->\n    <Sheet.Footer>\n      <Sheet.Close>Cancel <Kbd shortcut="esc" /></Sheet.Close>\n      <Button>Save <Kbd shortcut="enter" /></Button>\n    </Sheet.Footer>\n  </Sheet.Content>\n</Sheet.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <!-- Left side -->
        <div id="left" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Left side</Typography.H3>
            <ComponentPreview code={LeftSrc}>
                <Left />
            </ComponentPreview>
        </div>

        <!-- Right side -->
        <div id="right" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Right side</Typography.H3>
            <ComponentPreview code={RightSrc}>
                <Right />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on Sheet.Content for a translucent background with blur. Omit
            surface to inherit --mielui-surface from your theme, or set surface="solid" to override
            it. The glass surface keeps an opaque fallback when backdrop filtering is unavailable
            and respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
    <section id="dismissal" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Dismissal</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"A sheet closes from its corner button, Escape, a Close button, or a press on the page behind it. Set `allowClickOutside={false}` on Content to ignore that last one, which suits a form the person could lose by a stray click."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Header shows the corner button by default. Pass `close={false}` to Header when your own Close button in the footer is enough."}
            />
        </Typography.Text>
        <ComponentPreview code={StayOpenExampleSrc}>
            <StayOpenExample />
        </ComponentPreview>
    </section>
    <section id="parts" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Buttons and text parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Trigger and Close are built on [Button](/docs/components/button), so they accept its props. `variant` and `size` change the look, `disabled` blocks activation, and `href` renders a link. `loading` shows a spinner and ignores clicks, and `loadingLabel`, `successLabel` and `errorLabel` set the text for each state. `unstyled` removes the Button classes so `class` alone styles the part. `onclick` and `onkeydown` run before the part does its own work. Close runs `onclick` first and stays open if you call `event.preventDefault()` there."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root, Content, Header, Title, Description and Footer render their `children` and accept `class` and `style` like any element."}
            />
        </Typography.Text>
    </section>
</div>
