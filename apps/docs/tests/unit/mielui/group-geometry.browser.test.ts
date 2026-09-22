import { expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import GroupGeometryFixture from '../../fixtures/GroupGeometryFixture.svelte';

function element(selector: string) {
    const result = document.querySelector<HTMLElement>(selector);
    if (!result) {
        throw new Error(`Missing fixture element: ${selector}`);
    }
    return result;
}

it('joins controls at matching border-box heights across all button sizes', async () => {
    render(GroupGeometryFixture);
    await new Promise((resolve) => requestAnimationFrame(resolve));
    for (const group of document.querySelectorAll<HTMLElement>('[data-ui=group][data-testid]')) {
        const controls = [...group.children].filter(
            (child) => child.getAttribute('data-ui') !== 'group-separator'
        );
        expect(controls, group.dataset.testid).toHaveLength(2);
        const [first, last] = controls.map((element) => element.getBoundingClientRect());
        expect(first.height, group.dataset.testid).toBeCloseTo(last.height, 1);
        expect(first.top, group.dataset.testid).toBeCloseTo(last.top, 1);
        expect(getComputedStyle(controls[0]).borderRightWidth).toBe('0px');
        expect(getComputedStyle(controls[1]).borderLeftWidth).toBe('0px');
    }
    const height = (size: string) =>
        element(`[data-testid="input-${size}"]`).getBoundingClientRect().height;
    expect(height('sm')).toBeLessThan(height('md'));
    expect(height('md')).toBeLessThanOrEqual(height('lg'));
});

it('keeps table badges intrinsic rather than filling their cell', () => {
    render(GroupGeometryFixture);
    const badge = element('[data-ui="badge"]');
    expect(badge.getBoundingClientRect().width).toBeLessThan(
        element('td').getBoundingClientRect().width / 2
    );
});
