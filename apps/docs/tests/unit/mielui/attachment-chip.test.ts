import { Item } from '@mielui/svelte/components/attachment';
import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';

const image = new File(['image'], 'design.png', { type: 'image/png' });

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('Attachment chips', () => {
    it('creates image previews after upload and releases them on unmount', async () => {
        const createObjectURL = vi.fn(() => 'blob:design-preview');
        const revokeObjectURL = vi.fn();
        class PreviewURL extends URL {
            static createObjectURL = createObjectURL;
            static revokeObjectURL = revokeObjectURL;
        }
        vi.stubGlobal('URL', PreviewURL);
        const view = render(Item, {
            props: {
                file: image,
                variant: 'chip',
                status: 'uploading',
                progress: 150
            }
        });
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
        expect(createObjectURL).not.toHaveBeenCalled();
        await view.rerender({ file: image, variant: 'chip', status: 'complete' });
        await waitFor(() => {
            expect(view.container.querySelector('img')).toHaveAttribute(
                'src',
                'blob:design-preview'
            );
        });
        expect(createObjectURL).toHaveBeenCalledWith(image);
        view.unmount();
        expect(revokeObjectURL).toHaveBeenCalledWith('blob:design-preview');
    });

    it('announces errors and removes the exact file', async () => {
        const onRemove = vi.fn();
        render(Item, {
            props: {
                file: image,
                variant: 'chip',
                status: 'error',
                error: 'Upload rejected',
                onRemove
            }
        });
        expect(screen.getByRole('alert')).toHaveTextContent('Upload rejected');
        await fireEvent.click(screen.getByRole('button', { name: 'Remove design.png' }));
        expect(onRemove).toHaveBeenCalledWith(image);
    });
});
