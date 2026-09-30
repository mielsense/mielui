import { render } from 'svelte/server';
import { expect, it } from 'vitest';
import SidebarFixture from '../fixtures/SidebarFixture.svelte';

it('server renders native navigation and isolated panel ids without browser globals', () => {
    const first = render(SidebarFixture);
    const second = render(SidebarFixture);
    expect(first.body).toContain('aria-current="page"');
    expect(first.body).toContain('href="/docs"');
    expect(first.body).toContain('true/true/240/false/false');
    expect(first.body).toContain('data-pinned="true"');
    expect(second.body).toContain('true/true/240/false/false');
});

it('server renders the inset page frame beside flat navigation', () => {
    const inset = render(SidebarFixture, { props: { panelVariant: 'inset' } });
    const plain = render(SidebarFixture);

    expect(inset.body).toContain('data-ui="sidebar-main" data-variant="inset"');
    expect(inset.body).toContain('mielui-inset-surface');
    expect(plain.body).toContain('data-ui="sidebar-main" data-variant="default"');
});
