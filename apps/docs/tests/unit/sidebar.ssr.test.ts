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
