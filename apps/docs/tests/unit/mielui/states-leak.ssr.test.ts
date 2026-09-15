import type { ToastState } from '@mielui/svelte/components/toast/lib.svelte.ts';
import {
    __getActiveToastStateForTests,
    __setActiveToastStateForTests,
    toast
} from '@mielui/svelte/components/toast/lib.svelte.ts';
import type { Component } from 'svelte';
import { render } from 'svelte/server';
import { beforeEach, describe, expect, it } from 'vitest';
import CommandFixture from '../../fixtures/CommandFixture.svelte';
import DialogFixture from '../../fixtures/DialogFixture.svelte';
import SheetFixture from '../../fixtures/SheetFixture.svelte';

type Fixture = Component<Record<string, unknown>>;

beforeEach(() => {
    __setActiveToastStateForTests(undefined);
});

function renderAsync(component: unknown, props: Record<string, unknown>) {
    return Promise.resolve().then(() => render(component as Fixture, { props }));
}

describe('Scoped component state -- concurrent SSR', () => {
    it('keeps open and closed instances independent across concurrent renders', async () => {
        const [closedModal, openModal, closedSheet, openSheet] = await Promise.all([
            renderAsync(DialogFixture, { open: false }),
            renderAsync(DialogFixture, { open: true }),
            renderAsync(SheetFixture, { open: false }),
            renderAsync(SheetFixture, { open: true })
        ]);

        expect(closedModal.body).not.toContain('Dialog Title');
        expect(openModal.body).toContain('Dialog Title');
        expect(closedSheet.body).not.toContain('Sheet Title');
        expect(openSheet.body).toContain('Sheet Title');
    });

    it('does not cross-contaminate a batch of interleaved overlay renders', async () => {
        const renders = Array.from({ length: 60 }, (_, index) => {
            const open = index % 2 === 0;
            const fixture =
                index % 3 === 0 ? CommandFixture : index % 3 === 1 ? DialogFixture : SheetFixture;
            return renderAsync(fixture, { open }).then((result) => ({
                index,
                open,
                body: result.body
            }));
        });

        const results = await Promise.all(renders);
        for (const { index, open, body } of results) {
            const marker =
                index % 3 === 0
                    ? 'data-testid="cmd-profile"'
                    : index % 3 === 1
                      ? 'Dialog Title'
                      : 'Sheet Title';
            expect(body.includes(marker)).toBe(open);
        }
    });
});

describe('Toast external store isolation', () => {
    it('is a safe no-op during SSR when no Toaster is mounted', () => {
        expect(__getActiveToastStateForTests()).toBeUndefined();
        expect(toast.success('SSR no-op').title).toBe('SSR no-op');
        expect(() => toast.dismiss()).not.toThrow();
        expect(__getActiveToastStateForTests()).toBeUndefined();
    });

    it('keeps successive Toaster-owned stores independent', () => {
        const stateA: ToastState = { data: { toasts: [] } };
        __setActiveToastStateForTests(stateA);
        toast({ title: 'request A', persistent: true });

        const stateB: ToastState = { data: { toasts: [] } };
        __setActiveToastStateForTests(stateB);
        toast({ title: 'request B', persistent: true });

        expect(stateA.data.toasts.map((item) => item.title)).toEqual(['request A']);
        expect(stateB.data.toasts.map((item) => item.title)).toEqual(['request B']);
    });
});
