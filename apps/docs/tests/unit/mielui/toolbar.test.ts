import Toolbar from '@mielui/svelte/components/toolbar/toolbar.svelte';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

describe('Toolbar', () => {
    it('renders a semantic toolbar', () => {
        const { container } = render(Toolbar);
        expect(container.querySelector('[role="toolbar"]')).toBeInTheDocument();
    });

    it('forwards HTML attributes', () => {
        const { container } = render(Toolbar, {
            props: { 'aria-label': 'Message actions', class: 'composer-actions' } as never
        });
        const toolbar = container.querySelector('[role="toolbar"]');
        expect(toolbar).toHaveAttribute('aria-label', 'Message actions');
        expect(toolbar?.className).toContain('composer-actions');
    });
});
