import { tick } from 'svelte';
import { describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import SelectFixture from '../../fixtures/SelectFixture.svelte';
import SelectScrollableFixture from '../../fixtures/SelectScrollableFixture.svelte';

async function flush() {
    await tick();
    await tick();
    await new Promise((r) => setTimeout(r, 20));
}

async function openSelect() {
    await page.getByTestId('select-trigger').click();
    await flush();
}

describe('Select -- open and close', () => {
    it('hides options initially', async () => {
        render(SelectFixture, {});
        await flush();
        await expect.element(page.getByTestId('opt-apple')).not.toBeVisible();
    });

    it('shows options after opening', async () => {
        render(SelectFixture, {});
        await flush();
        await openSelect();
        await expect.element(page.getByTestId('opt-apple')).toBeInTheDocument();
        await expect.element(page.getByTestId('opt-banana')).toBeInTheDocument();
        await expect.element(page.getByTestId('opt-cherry')).toBeInTheDocument();
        await expect.element(page.getByText('Fruits')).toBeInTheDocument();
        expect(document.querySelectorAll('[role="listbox"] .mielui-item-highlight')).toHaveLength(
            1
        );
    });

    it('closes on Escape', async () => {
        render(SelectFixture, {});
        await flush();
        await openSelect();

        await userEvent.keyboard('{Escape}');
        await flush();
        await expect.element(page.getByTestId('opt-apple')).not.toBeVisible();
    });

    it('closes on click outside', async () => {
        render(SelectFixture, {});
        await flush();
        await openSelect();
        await expect.element(page.getByTestId('opt-apple')).toBeInTheDocument();

        const outside = document.createElement('button');
        outside.textContent = 'outside';
        outside.style.position = 'fixed';
        outside.style.right = '8px';
        outside.style.bottom = '8px';
        document.body.append(outside);
        await new Promise((r) => setTimeout(r, 20));
        try {
            await userEvent.click(outside);
            await flush();
            await expect.element(page.getByTestId('opt-apple')).not.toBeVisible();
        } finally {
            outside.remove();
        }
    });
});

describe('Select -- selection behavior', () => {
    it('moves through options and selects with the keyboard', async () => {
        render(SelectFixture, {});
        await flush();
        await openSelect();
        await userEvent.keyboard('{ArrowDown}{Enter}');
        await flush();
        await expect.element(page.getByRole('combobox')).toHaveTextContent('Banana');
    });

    it('closes after an item is selected', async () => {
        render(SelectFixture, {});
        await flush();
        await openSelect();

        await page.getByTestId('opt-banana').click();
        await flush();
        await expect.element(page.getByTestId('opt-apple')).not.toBeVisible();
    });

    it('marks only the chosen option selected when reopened', async () => {
        render(SelectFixture, {});
        await flush();
        await openSelect();

        expect(document.querySelectorAll('[role="option"][aria-selected="true"]')).toHaveLength(0);
        await page.getByTestId('opt-banana').click();
        await flush();
        await openSelect();
        const selected = document.querySelectorAll('[role="option"][aria-selected="true"]');
        expect(selected).toHaveLength(1);
        expect(selected[0].textContent).toContain('Banana');
    });

    it('updates the underlying state.value to the clicked option', async () => {
        render(SelectFixture, {});
        await flush();
        await openSelect();

        await page.getByTestId('opt-banana').click();
        await flush();

        await expect.element(page.getByRole('combobox')).toHaveTextContent('Banana');
    });
});

describe('Select -- ARIA', () => {
    it('options use role="option"', async () => {
        render(SelectFixture, {});
        await flush();
        await openSelect();

        const options = document.querySelectorAll('[role="option"]');
        expect(options.length).toBe(3);
    });
});

describe('Select -- max-h-56 scrolling without explicit height', () => {
    it('caps the menu at max-h and scrolls the overflow', async () => {
        render(SelectScrollableFixture, {});
        await flush();
        await page.getByTestId('select-scrollable-trigger').click();
        await flush();

        const root = document.querySelector<HTMLElement>('[data-ui="select-content"]');
        const viewport = root?.querySelector<HTMLElement>('.mielui-inset-surface');
        expect(root).not.toBeNull();
        expect(viewport).not.toBeNull();
        if (!root || !viewport) {
            return;
        }

        // max-h-56 caps the menu instead of growing with all 30 options.
        expect(root.clientHeight).toBeLessThanOrEqual(240);
        // The viewport overflows, so the list scrolls inside the menu.
        expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight);

        viewport.scrollTop = 100;
        await flush();
        expect(viewport.scrollTop).toBeGreaterThan(0);
    });
});

it('connects the select-only combobox to its labelled listbox with a custom trigger ID', async () => {
    render(SelectFixture, { triggerId: 'choose-fruit' });
    await flush();
    await page.getByTestId('select-trigger').click();
    await flush();
    const trigger = document.getElementById('choose-fruit');
    expect(trigger?.getAttribute('role')).toBe('combobox');
    const listbox = document.querySelector('[role="listbox"]');
    expect(listbox?.getAttribute('aria-labelledby')).toBe('choose-fruit');
    expect(trigger?.getAttribute('aria-controls')).toBe(listbox?.id);
});
