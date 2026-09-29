import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import ErrorPage from '../../src/routes/+error.svelte';

const state = vi.hoisted(() => ({ page: { status: 500 } }));

vi.mock('$app/state', () => state);
vi.mock('$app/paths', () => ({
    resolve(path: string) {
        return path;
    }
}));

describe('Page recovery', () => {
    it('provides recovery actions without empty page regions', () => {
        state.page.status = 500;
        const { container } = render(ErrorPage);
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
            'This page could not load'
        );
        expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Documentation' })).toHaveAttribute(
            'href',
            '/docs/introduction'
        );
        expect(container.querySelector('header, aside')).toBeNull();
        expect(screen.getAllByRole('heading')).toHaveLength(1);
    });

    it('offers navigation for an unknown address', () => {
        state.page.status = 404;
        render(ErrorPage);
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page not found');
        expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    });
});
