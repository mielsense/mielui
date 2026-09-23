<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Destructive from './examples/destructive.svelte';
    import DestructiveSrc from './examples/destructive.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import SignOut from './examples/sign-out.svelte';
    import SignOutSrc from './examples/sign-out.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add alert-dialog';
</script>

<svelte:head>
    <title>Mielui · Alert Dialog</title>
    <meta
        name="description"
        content="A dialog that interrupts the user to confirm a consequential action."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Alert Dialog">
        Confirm destructive or irreversible actions before proceeding.
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
        <Typography.Text>
            Confirm and Exit call onclick before closing. Prevent default to keep the alert dialog
            open, or set closeOnClick to false for asynchronous work. Both forward bind:element.
            Exit supplies the initial cancel-focus target; mounting another Exit later does not
            steal focus. Content accepts ariaBusy while confirmation is pending.
        </Typography.Text>

        <CodeBlock
            code={`import * as AlertDialog from '$lib/mielui/components/alert-dialog';\nimport Kbd from '$lib/mielui/components/kbd';\n\n<AlertDialog.Root orientation="vertical">\n  <AlertDialog.Trigger>Delete</AlertDialog.Trigger>\n  <AlertDialog.Content size="lg">\n    <AlertDialog.Header>\n      <AlertDialog.Title>Delete?</AlertDialog.Title>\n      <AlertDialog.Description>This cannot be undone.</AlertDialog.Description>\n    </AlertDialog.Header>\n    <AlertDialog.Footer>\n      <AlertDialog.Exit>Cancel <Kbd shortcut="esc" /></AlertDialog.Exit>\n      <AlertDialog.Confirm>Delete <Kbd shortcut="enter" /></AlertDialog.Confirm>\n    </AlertDialog.Footer>\n  </AlertDialog.Content>\n</AlertDialog.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Common patterns for destructive actions and sign-out flows.
            {/snippet}
        </SectionHeading>

        <!-- Destructive confirmation -->
        <div id="destructive" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Destructive confirmation</Typography.H3>
            <ComponentPreview code={DestructiveSrc}>
                <Destructive />
            </ComponentPreview>
        </div>

        <!-- Sign out -->
        <div id="sign-out" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Sign out confirmation</Typography.H3>
            <ComponentPreview code={SignOutSrc}>
                <SignOut />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on AlertDialog.Content for a translucent background with blur. Omit
            surface to inherit --mielui-surface from your theme, or set surface="solid" to override
            it. The glass surface keeps an opaque fallback when backdrop filtering is unavailable
            and respects reduced-transparency preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
</div>
