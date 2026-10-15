<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { toast } from '@mielui/svelte/components/toast';
    import * as Typography from '@mielui/svelte/components/typography';
    import { onDestroy } from 'svelte';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import type { PlaygroundValues } from '$lib/components/docs/playground';
    import ViewportPreview from '$lib/components/docs/viewport-preview.svelte';
    import ActionsSrc from './examples/actions.svelte?raw';
    import AllTypesSrc from './examples/all-types.svelte?raw';
    import CompositionSrc from './examples/composition.svelte?raw';
    import GlassSrc from './examples/glass.svelte?raw';
    import HeroSrc from './examples/hero.svelte?raw';
    import NotchSrc from './examples/notch.svelte?raw';
    import PromiseSrc from './examples/promise.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    onDestroy(() => {
        toast.dismiss();
    });

    function viewDetails() {
        toast.info('Opening details');
    }

    function notify(values: PlaygroundValues<typeof playgroundControls>) {
        toast({
            title: values.title,
            type: values.type,
            description: values.description ? 'Preview build for the main branch.' : undefined,
            surface: values.glass ? 'glass' : undefined,
            actions:
                values.action === 'none'
                    ? undefined
                    : [
                          {
                              label: 'View details',
                              variant: values.action,
                              callback: viewDetails
                          }
                      ],
            exitable: values.exitable,
            persistent: values.persistent
        });
    }

    const toasterCode = `<script lang="ts">
    import { Toaster } from '@mielui/svelte/components/toast';

    let { children } = $props();
</${'script'}>

{@render children()}
<Toaster />`;

    const callCode = `<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { toast } from '@mielui/svelte/components/toast';

    function save() {
        toast.success('Profile updated', {
            description: 'Your changes have been saved.'
        });
    }
</${'script'}>

<Button onclick={save}>Save</Button>`;
</script>

<svelte:head>
    <title>Mielui · Toast</title>
    <meta name="description" content="Transient notifications fired from anywhere in your app." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Toast">
        A notification that stacks, auto-dismisses, and can carry an action.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <Button
                    onclick={() => {
                        notify(values);
                    }}
                >
                    Show toast
                </Button>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add toast" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={'Mount one `Toaster` in your root layout. The first mounted Toaster shows every notification, so do not add a second one.'}
            />
        </Typography.Text>
        <CodeBlock code={toasterCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            <InlineText
                text={'Then call `toast` from anywhere. `toast.success`, `toast.error`, `toast.warning`, `toast.info`, and `toast.loading` set the type for you. Each call returns a handle, and `toast.dismiss(id)` closes one notification, or all of them without an id.'}
            />
        </Typography.Text>
        <CodeBlock code={callCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            <InlineText
                text={'Notifications close after `duration` milliseconds, 5600 by default, and pause while hovered or focused. Set `persistent: true` for a notification that should wait for the user, and `exitable: false` to hide its close button.'}
            />
        </Typography.Text>
    </section>

    <section id="composition" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Composition</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={'`Toast.Root` renders one toast object. Without children it renders `Content`, `Footer`, `Icon`, `Title`, `Actions`, and `Close`. Compose those parts to leave out, reorder, or restyle a region. `Title` and `Content` show the toast title and description unless you pass children, and `Actions` renders the configured actions or your own `Toast.Action` parts. `Toast.Root` on its own starts no timer; Toaster does that for notifications created with `toast`.'}
            />
        </Typography.Text>
        <ComponentPreview code={CompositionSrc} class="[&_[data-preview-canvas]]:p-0">
            <ViewportPreview example="toast/composition" title="Toast composition preview" />
        </ComponentPreview>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="follow-up" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Follow-up toast</Typography.H3>
            <Typography.Text variant="supporting">
                The action on the first toast opens a second one with the details.
            </Typography.Text>
            <ComponentPreview code={HeroSrc} class="[&_[data-preview-canvas]]:p-0">
                <ViewportPreview example="toast/hero" title="Follow-up toast preview" />
            </ComponentPreview>
        </div>

        <div id="actions" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Actions</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"Each action takes a `label`, a `callback`, and an optional button `variant`, `outline` by default. Clicking one runs the callback and closes the toast."}
                />
            </Typography.Text>
            <ComponentPreview code={ActionsSrc} class="[&_[data-preview-canvas]]:p-0">
                <ViewportPreview example="toast/actions" title="Toast actions preview" />
            </ComponentPreview>
        </div>

        <div id="promise" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Promise</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'`toast.promise` shows one notification that updates as the promise settles. The `success` and `error` messages can be functions of the result or the error. It returns the toast handle, so await the original promise when later work depends on it.'}
                />
            </Typography.Text>
            <ComponentPreview code={PromiseSrc} class="[&_[data-preview-canvas]]:p-0">
                <ViewportPreview example="toast/promise" title="Toast promise preview" />
            </ComponentPreview>
        </div>

        <div id="types" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Types</Typography.H3>
            <ComponentPreview code={AllTypesSrc} class="[&_[data-preview-canvas]]:p-0">
                <ViewportPreview example="toast/all-types" title="Toast types preview" />
            </ComponentPreview>
        </div>

        <div id="glass" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Glass surface</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"Pass `surface: 'glass'` to `toast`, or set `surface` on `Toast.Root`. The glass surface falls back to an opaque one when backdrop filters are unavailable or reduced transparency is on."}
                />
            </Typography.Text>
            <ComponentPreview code={GlassSrc} class="[&_[data-preview-canvas]]:p-0">
                <ViewportPreview example="toast/glass" title="Toast glass preview" />
            </ComponentPreview>
        </div>

        <div id="notch" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Notch</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'`variant="notch"` on Toaster delivers notifications from the middle of a screen edge, chosen with `side`. `toast` and `toast.promise` work the same way. The newest notification shows first. With several active, previous and next buttons unfold beside the notch on hover or focus. Escape or a swipe toward the edge dismisses the selected one. Use this Toaster in place of your existing one. For custom live activity, compose the [Notch component](/docs/components/notch) directly.'}
                />
            </Typography.Text>
            <ComponentPreview code={NotchSrc} class="[&_[data-preview-canvas]]:p-0">
                <ViewportPreview example="toast/notch" title="Notch notification preview" />
            </ComponentPreview>
        </div>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={'Built-in text is English. Pass a `labels` object to Toaster to translate the name of the notifications region, the dismiss button, and the notch previous, next, and position controls. `count` is the visible notch counter, such as 2 of 5; it is a function so a translation can place both numbers. `ToastLabels` types it. Every key is optional, and omitted keys keep their English default.'}
            />
        </Typography.Text>
        <CodeBlock
            code={`<Toaster
    labels={{
        region: 'Notifications',
        dismiss: 'Fermer',
        previous: 'Précédente',
        next: 'Suivante',
        position: (position, total) => \`Notification \${position} sur \${total}\`,
        count: (index, total) => \`\${index} sur \${total}\`
    }}
/>`}
            lang="svelte"
            copy="overlay"
        />
    </section>
</div>
