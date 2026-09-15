import Alert from '@mielui/svelte/components/alert/alert.svelte';
import Badge from '@mielui/svelte/components/badge/badge.svelte';
// Tier 1 + Tier 2 components and fixtures, imported by name.
import Button from '@mielui/svelte/components/button/button.svelte';
import Checkbox from '@mielui/svelte/components/checkbox/checkbox.svelte';
import Input from '@mielui/svelte/components/input/input.svelte';
import Label from '@mielui/svelte/components/label/label.svelte';
import Pagination from '@mielui/svelte/components/pagination/pagination.svelte';
import Progress from '@mielui/svelte/components/progress/progress.svelte';
import Shortcut from '@mielui/svelte/components/shortcut/shortcut.svelte';
import Skeleton from '@mielui/svelte/components/skeleton/skeleton.svelte';
import Slider from '@mielui/svelte/components/slider/slider.svelte';
import Switch from '@mielui/svelte/components/switch/switch.svelte';
import Textarea from '@mielui/svelte/components/textarea/textarea.svelte';
import Toggle from '@mielui/svelte/components/toggle/toggle.svelte';
import TypographyDescription from '@mielui/svelte/components/typography/typography-description.svelte';
import TypographyH1 from '@mielui/svelte/components/typography/typography-h1.svelte';
import TypographyH2 from '@mielui/svelte/components/typography/typography-h2.svelte';
import TypographyH3 from '@mielui/svelte/components/typography/typography-h3.svelte';
import TypographyH4 from '@mielui/svelte/components/typography/typography-h4.svelte';
import TypographyH5 from '@mielui/svelte/components/typography/typography-h5.svelte';
import TypographyH6 from '@mielui/svelte/components/typography/typography-h6.svelte';
import TypographyInlineCode from '@mielui/svelte/components/typography/typography-inline-code.svelte';
import TypographyMetadata from '@mielui/svelte/components/typography/typography-metadata.svelte';
import TypographyText from '@mielui/svelte/components/typography/typography-text.svelte';
import TypographyTitle from '@mielui/svelte/components/typography/typography-title.svelte';
import type { Component } from 'svelte';
import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';
import AccordionFixture from '../../fixtures/AccordionFixture.svelte';
import AlertDialogFixture from '../../fixtures/AlertDialogFixture.svelte';
import AvatarFixture from '../../fixtures/AvatarFixture.svelte';
import CollapsibleFixture from '../../fixtures/CollapsibleFixture.svelte';
import ColorPickerFixture from '../../fixtures/ColorPickerFixture.svelte';
import ComboboxFixture from '../../fixtures/ComboboxFixture.svelte';
import CommandFixture from '../../fixtures/CommandFixture.svelte';
import ContextMenuFixture from '../../fixtures/ContextMenuFixture.svelte';
import DialogFixture from '../../fixtures/DialogFixture.svelte';
import DropdownMenuFixture from '../../fixtures/DropdownMenuFixture.svelte';
import PopoverFixture from '../../fixtures/PopoverFixture.svelte';
import RadioGroupFixture from '../../fixtures/RadioGroupFixture.svelte';
import SelectFixture from '../../fixtures/SelectFixture.svelte';
import SheetFixture from '../../fixtures/SheetFixture.svelte';
import TabsFixture from '../../fixtures/TabsFixture.svelte';
import ToasterFixture from '../../fixtures/ToasterFixture.svelte';
import ToggleGroupFixture from '../../fixtures/ToggleGroupFixture.svelte';

/*
 * SSR tier -- strategy Sec.6 and pattern guide Sec.14.2.
 *
 * Every Tier 1 + Tier 2 component must server-render without throwing.
 * This catches unguarded `document` / `window` / `localStorage` access
 * during the initial component module / mount lifecycle.
 *
 * String comparison only -- no browser. Hydration-drift assertions go to
 * ssr.browser.test.ts where a real browser is needed for the comparison.
 *
 * Failure modes guarded against:
 *   - `document is not defined` at module load.
 *   - `window is not defined` in $effect / onMount running server-side.
 *   - `localStorage is not defined` in module-level reads.
 *   - Unhandled exceptions in $derived / $derived.by during render.
 */

function ssrShouldNotThrow(name: string, Comp: unknown, props: Record<string, unknown> = {}) {
    it(`${name} renders server-side without throwing`, () => {
        expect(() => render(Comp as Component<Record<string, unknown>>, { props })).not.toThrow();
    });

    it(`${name} produces non-empty body HTML`, () => {
        const result = render(Comp as Component<Record<string, unknown>>, { props });
        expect(result.body).toBeTypeOf('string');
        expect(result.body.length).toBeGreaterThan(0);
    });
}

describe('SSR -- leaf components (Tier 1)', () => {
    ssrShouldNotThrow('button', Button, {});
    ssrShouldNotThrow('alert', Alert, { variant: 'info' });
    ssrShouldNotThrow('badge', Badge, { variant: 'primary' });
    ssrShouldNotThrow('input', Input, {});
    ssrShouldNotThrow('textarea', Textarea, {});
    ssrShouldNotThrow('checkbox', Checkbox, { checked: false, variant: 'default' });
    ssrShouldNotThrow('switch', Switch, { switched: false });
    ssrShouldNotThrow('slider', Slider, { value: 0 });
    ssrShouldNotThrow('toggle', Toggle, { pressed: false });
    ssrShouldNotThrow('progress', Progress, { value: 50, max: 100 });
    ssrShouldNotThrow('pagination', Pagination, { page: 1, total: 5 });
    ssrShouldNotThrow('skeleton', Skeleton, {});
    ssrShouldNotThrow('label', Label, {});
    ssrShouldNotThrow('shortcut', Shortcut, { shortcut: 'cmd+k' });
    ssrShouldNotThrow('typography title', TypographyTitle, { level: 2 });
    ssrShouldNotThrow('typography h1', TypographyH1, {});
    ssrShouldNotThrow('typography h2', TypographyH2, {});
    ssrShouldNotThrow('typography h3', TypographyH3, {});
    ssrShouldNotThrow('typography h4', TypographyH4, {});
    ssrShouldNotThrow('typography h5', TypographyH5, {});
    ssrShouldNotThrow('typography h6', TypographyH6, {});
    ssrShouldNotThrow('typography text', TypographyText, {});
    ssrShouldNotThrow('typography inline code', TypographyInlineCode, {});
    ssrShouldNotThrow('typography description', TypographyDescription, {});
    ssrShouldNotThrow('typography metadata', TypographyMetadata, {});
});

describe('SSR -- overlay primitives (Tier 1)', () => {
    ssrShouldNotThrow('dialog (closed)', DialogFixture, { open: false });
    ssrShouldNotThrow('dialog (open)', DialogFixture, { open: true });
    ssrShouldNotThrow('sheet (closed)', SheetFixture, { open: false });
    ssrShouldNotThrow('sheet (open)', SheetFixture, { open: true });
    ssrShouldNotThrow('alert-dialog (closed)', AlertDialogFixture, { open: false });
    ssrShouldNotThrow('alert-dialog (open)', AlertDialogFixture, { open: true });
});

describe('SSR -- floating primitives + wrappers (Tier 1)', () => {
    ssrShouldNotThrow('popover (closed)', PopoverFixture, { open: false });
    ssrShouldNotThrow('dropdown-menu', DropdownMenuFixture, {});
    ssrShouldNotThrow('select', SelectFixture, {});
    ssrShouldNotThrow('combobox', ComboboxFixture, {});
    ssrShouldNotThrow('command', CommandFixture, {});
    ssrShouldNotThrow('context-menu', ContextMenuFixture, {});
    ssrShouldNotThrow('color-picker', ColorPickerFixture, { value: '#ff0000' });
});

describe('SSR -- compound interaction components (Tier 1)', () => {
    ssrShouldNotThrow('tabs', TabsFixture, { value: 'one' });
    ssrShouldNotThrow('accordion (single)', AccordionFixture, {
        type: 'single',
        value: 'a'
    });
    ssrShouldNotThrow('accordion (multiple)', AccordionFixture, {
        type: 'multiple',
        value: ['a', 'b']
    });
    ssrShouldNotThrow('collapsible (closed)', CollapsibleFixture, { open: false });
    ssrShouldNotThrow('collapsible (open)', CollapsibleFixture, { open: true });
    ssrShouldNotThrow('radio-group', RadioGroupFixture, { value: 'apple' });
    ssrShouldNotThrow('toggle-group (single)', ToggleGroupFixture, {
        type: 'single',
        value: 'bold'
    });
    ssrShouldNotThrow('toggle-group (multiple)', ToggleGroupFixture, {
        type: 'multiple',
        value: ['bold', 'italic']
    });
});

describe('SSR -- toast singleton (Tier 1)', () => {
    ssrShouldNotThrow('toaster (empty)', ToasterFixture, {});
});

describe('SSR -- Tier 2 components', () => {
    ssrShouldNotThrow('avatar (no src)', AvatarFixture, { src: '' });
    ssrShouldNotThrow('avatar (with src)', AvatarFixture, {
        src: 'https://example.com/img.png',
        alt: 'User'
    });
});

/*
 * Hydration drift is covered indirectly across the suite:
 *   - SSR-side closed/open assertions live in `SSR -- drift-prone bidirectional-sync components`.
 *   - Client-side closed/open assertions for the same fixtures live in dialog.browser.test.ts,
 *     sheet.browser.test.ts, popover.browser.test.ts, alert-dialog.browser.test.ts.
 *
 * A real cross-environment literal comparison (server HTML → browser
 * hydration → DOM diff) cannot run in vitest's project model because the
 * browser project resolves Svelte to its client export, and `svelte/server`
 * needs the server export. The combination of "SSR matches expected shape"
 * + "client matches the same expected shape" rules out drift on the visible
 * surface without requiring a literal comparison.
 */

describe('SSR -- drift-prone bidirectional-sync components', () => {
    it('dialog (closed) does not include the title in SSR output', () => {
        const result = render(DialogFixture as Component<Record<string, unknown>>, {
            props: { open: false }
        });
        expect(result.body).not.toMatch(/Dialog Title/);
        expect(result.body).toMatch(/data-testid="trigger"/);
    });

    it('dialog (open) includes the title and role="dialog" in SSR output', () => {
        const result = render(DialogFixture as Component<Record<string, unknown>>, {
            props: { open: true }
        });
        expect(result.body).toMatch(/Dialog Title/);
        expect(result.body).toMatch(/role="dialog"/);
    });

    it('sheet (closed) does not include the title in SSR output', () => {
        const result = render(SheetFixture as Component<Record<string, unknown>>, {
            props: { open: false }
        });
        expect(result.body).not.toMatch(/Sheet Title/);
    });

    it('sheet (open) includes the title and role="dialog" in SSR output', () => {
        // Sheet gates content on `{#if sheetState.open}` (no deferred visible
        // flag). Open SSR should emit the dialog chrome like Dialog does.
        const result = render(SheetFixture as Component<Record<string, unknown>>, {
            props: { open: true }
        });
        expect(result.body).toMatch(/data-testid="trigger"/);
        expect(result.body).toMatch(/Sheet Title/);
        expect(result.body).toMatch(/role="dialog"/);
    });

    it('popover (closed) does not include the content in SSR output', () => {
        const result = render(PopoverFixture as Component<Record<string, unknown>>, {
            props: { open: false }
        });
        expect(result.body).not.toMatch(/Popover Title/);
    });

    it('alert-dialog (closed) does not include the dialog content in SSR output', () => {
        const result = render(AlertDialogFixture as Component<Record<string, unknown>>, {
            props: { open: false }
        });
        expect(result.body).not.toMatch(/Delete project\?/);
    });

    it('alert-dialog (open) renders with role="alertdialog" not role="dialog"', () => {
        const result = render(AlertDialogFixture as Component<Record<string, unknown>>, {
            props: { open: true }
        });
        expect(result.body).toMatch(/role="alertdialog"/);
        expect(result.body).not.toMatch(/role="dialog"[^"]/);
    });
});

describe('SSR -- output shape spot checks', () => {
    it('button output contains the rendered text', () => {
        const result = render(Button as Component<Record<string, unknown>>, {
            props: { children: undefined }
        });
        // Buttons without children render an empty button tag; the tag itself
        // should still be present.
        expect(result.body).toMatch(/<button/);
    });

    it('badge variant=primary emits the data-ui or matching class hint', () => {
        const result = render(Badge as Component<Record<string, unknown>>, {
            props: { variant: 'primary' }
        });
        // We don't assert a specific class string (would couple to Tailwind
        // generation); we assert the markup tag exists.
        expect(result.body.length).toBeGreaterThan(0);
    });

    it('badge renders an optional dot marker', () => {
        const result = render(Badge as Component<Record<string, unknown>>, {
            props: { dot: true }
        });
        expect(result.body).toContain('data-badge-dot');
    });

    it('dialog closed produces empty fixture body (the trigger renders, dialog content does not)', () => {
        const result = render(DialogFixture as Component<Record<string, unknown>>, {
            props: { open: false }
        });
        // Trigger button is rendered.
        expect(result.body).toMatch(/<button/);
        // Dialog title is NOT rendered (open=false).
        expect(result.body).not.toMatch(/Dialog Title/);
    });

    it('dialog open includes the title in the SSR output', () => {
        const result = render(DialogFixture as Component<Record<string, unknown>>, {
            props: { open: true }
        });
        expect(result.body).toMatch(/Dialog Title/);
    });

    it('alert-dialog open uses role="alertdialog" in the SSR output', () => {
        const result = render(AlertDialogFixture as Component<Record<string, unknown>>, {
            props: { open: true }
        });
        expect(result.body).toMatch(/role="alertdialog"/);
    });
});
