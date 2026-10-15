<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Input } from '@mielui/svelte/components/input';
    import * as Sheet from '@mielui/svelte/components/sheet';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import IssueForm from './examples/issue-form.svelte';
    import IssueFormSrc from './examples/issue-form.svelte?raw';
    import Left from './examples/left.svelte';
    import LeftSrc from './examples/left.svelte?raw';
    import Right from './examples/right.svelte';
    import RightSrc from './examples/right.svelte?raw';
    import StayOpenExample from './examples/stay-open.svelte';
    import StayOpenExampleSrc from './examples/stay-open.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    let playgroundOpen = $state(false);

    function savePlayground() {
        playgroundOpen = false;
    }

    const usageCode = `<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Sheet from '@mielui/svelte/components/sheet';

    let open = $state(false);
</${'script'}>

<Sheet.Root bind:open>
    <Sheet.Trigger>Open</Sheet.Trigger>
    <Sheet.Content side="right">
        <Sheet.Header>
            <Sheet.Title>Title</Sheet.Title>
            <Sheet.Description>Describe what lives here.</Sheet.Description>
        </Sheet.Header>
        <!-- Panel content -->
        <Sheet.Footer>
            <Sheet.Close>Cancel</Sheet.Close>
            <Button
                onclick={() => {
                    open = false;
                }}
            >
                Save
            </Button>
        </Sheet.Footer>
    </Sheet.Content>
</Sheet.Root>`;

    const labelsCode = `<script lang="ts">
    import * as Sheet from '@mielui/svelte/components/sheet';
    import type { SheetLabels } from '@mielui/svelte/components/sheet';

    const labels: SheetLabels = {
        close: 'Fermer'
    };
</${'script'}>

<Sheet.Root {labels}>
    …
</Sheet.Root>`;
</script>

<svelte:head>
    <title>Mielui · Sheet</title>
    <meta
        name="description"
        content="A modal side panel for navigation, filters, and forms. It slides in from the left or right edge."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Sheet">
        A modal panel that slides in from the left or right edge of the screen. Use Drawer when the
        panel needs swipe gestures.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <Sheet.Root bind:open={playgroundOpen}>
                    <Sheet.Trigger>Edit profile</Sheet.Trigger>
                    <Sheet.Content
                        side={values.side}
                        surface={values.surface === 'inherit' ? undefined : values.surface}
                        allowClickOutside={values.allowClickOutside}
                    >
                        <Sheet.Header close={values.close}>
                            <Sheet.Title>Edit profile</Sheet.Title>
                            {#if values.description}
                                <Sheet.Description>
                                    Changes apply to your account right away.
                                </Sheet.Description>
                            {/if}
                        </Sheet.Header>
                        <div class="flex flex-col gap-4">
                            <Input label="Name" placeholder="Ada Lovelace" />
                            <Input label="Email" type="email" placeholder="ada@example.com" />
                        </div>
                        {#if values.footer}
                            <Sheet.Footer>
                                <Sheet.Close>Cancel</Sheet.Close>
                                <Button onclick={savePlayground}>Save changes</Button>
                            </Sheet.Footer>
                        {/if}
                    </Sheet.Content>
                </Sheet.Root>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add sheet" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Compose Root, Trigger, and Content with a Header that holds the Title and an optional Description. `side` on Content picks the left or right edge, right by default. Focus stays within the open sheet and returns to its trigger when it closes."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            <InlineText
                text={"Bind `open` on Root when another control needs to open or close the panel. `onOpenChange` reports changes made inside the component; updating your bound value does not call it again. Each Root keeps its own state."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Footer renders on the outer frame below the inner surface, like `Dialog.Footer`, wherever you place it inside Content. Its actions sit in one row; a Close in the footer moves to the start so the other actions line up at the end. The theme setting `chrome.borders` chooses single or double framing, single by default."}
            />
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="issue-form" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Issue form</Typography.H3>
            <Typography.Text variant="supporting">
                A full form with selects in the body and the submit action in the footer.
            </Typography.Text>
            <ComponentPreview code={IssueFormSrc}>
                <IssueForm />
            </ComponentPreview>
        </div>

        <div id="left" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Left side</Typography.H3>
            <ComponentPreview code={LeftSrc}>
                <Left />
            </ComponentPreview>
        </div>

        <div id="right" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Right side</Typography.H3>
            <ComponentPreview code={RightSrc}>
                <Right />
            </ComponentPreview>
        </div>

        <div id="glass" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Glass surface</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`surface=\"glass\"` on Content gives the panel a translucent, blurred background. Omit `surface` to inherit `--mielui-surface` from your theme, or set `surface=\"solid\"` to override it. Glass keeps an opaque fallback when backdrop filtering is unavailable and respects reduced-transparency preferences."}
                />
            </Typography.Text>
            <ComponentPreview code={GlassSrc}>
                <Glass />
            </ComponentPreview>
        </div>

        <div id="stay-open" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading"
                >Stay open on outside press</Typography.H3
            >
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`allowClickOutside={false}` on Content keeps the sheet open when the page behind it is pressed, and `close={false}` on Header leaves the footer buttons as the only way out besides Escape."}
                />
            </Typography.Text>
            <ComponentPreview code={StayOpenExampleSrc}>
                <StayOpenExample />
            </ComponentPreview>
        </div>
    </section>

    <section id="dismissal" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Dismissal</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"A sheet closes from its corner button, Escape, a Close button, or a press on the page behind it. Set `allowClickOutside={false}` on Content to ignore that last one, which suits a form the person could lose by a stray click. Header shows the corner button by default; pass `close={false}` when your own Close button is enough."}
            />
        </Typography.Text>
    </section>

    <section id="parts" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Buttons and text parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Trigger and Close are built on [Button](/docs/components/button), so they accept its props: `variant`, `size`, `disabled`, `href`, `loading` with its labels, `unstyled`, and `bind:element`. `onclick` runs before the part does its own work; call `event.preventDefault()` there to keep the sheet as it is."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Content, Header, Title, Description and Footer render their `children` and accept `class`."}
            />
        </Typography.Text>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Built-in text is English by default. Pass a `labels` object of type `SheetLabels` to `Sheet.Root` to translate the accessible name of the close button in the header. Every key is optional; omitted keys keep their default."}
            />
        </Typography.Text>
        <CodeBlock code={labelsCode} lang="svelte" copy="overlay" />
    </section>
</div>
