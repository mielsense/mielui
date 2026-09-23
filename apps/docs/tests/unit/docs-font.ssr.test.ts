import { render } from 'svelte/server';
import { expect, it } from 'vitest';
import DocsFontFixture from '../fixtures/DocsFontFixture.svelte';

it('keeps each server render font independent', () => {
    const selected = render(DocsFontFixture, { props: { initial: 'Inter' } });
    const defaultFont = render(DocsFontFixture);
    expect(selected.body).toContain('>Inter</output>');
    expect(defaultFont.body).toContain('>DM Sans</output>');
});
