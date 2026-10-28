import { render } from '@testing-library/svelte';
import { flushSync } from 'svelte';
import { describe, expect, it, vi } from 'vitest';
import DocsPager from '../../src/lib/components/docs/docs-pager.svelte';
import { lookFor } from '../../src/lib/components/shell/look';
import { allDocPages } from '../../src/lib/docs-pages';
import { page } from '../fixtures/page-state.svelte';

vi.mock('$app/state', async () => {
    return await import('../fixtures/page-state.svelte');
});

function background(mesh: string) {
    const probe = document.createElement('span');
    probe.style.background = mesh;

    return probe.style.background;
}

function navigate(href: string) {
    page.url = new URL(href, 'http://localhost');
    flushSync();
}

describe('DocsPager', () => {
    it('updates the previous tile sticker after client navigation', () => {
        const index = allDocPages.findIndex((entry, position) => {
            const before = allDocPages[position - 1];

            return position > 0 && lookFor(before.href).mesh !== lookFor(entry.href).mesh;
        });
        const current = allDocPages[index];
        const before = allDocPages[index - 1];

        navigate(allDocPages[index + 1].href);
        const { getByRole } = render(DocsPager);
        const previous = () => {
            return getByRole('link', {
                name: /Previous/
            });
        };
        expect(
            previous().querySelector<HTMLElement>('[aria-hidden="true"]')?.style.background
        ).toBe(background(lookFor(current.href).mesh));

        navigate(current.href);

        expect(previous()).toHaveTextContent(before.label);
        expect(
            previous().querySelector<HTMLElement>('[aria-hidden="true"]')?.style.background
        ).toBe(background(lookFor(before.href).mesh));
    });
});
