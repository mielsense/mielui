import type { FileUploadEntry } from '@mielui/svelte/components/file-upload';
import { render } from '@testing-library/svelte';
import { afterEach, expect, it, vi } from 'vitest';
import UploadPreviewFixture from '../../fixtures/UploadPreviewFixture.svelte';

afterEach(() => {
    vi.unstubAllGlobals();
});

it('keeps one preview URL across progress updates and releases it on unmount', async () => {
    const createObjectURL = vi.fn(() => 'blob:upload-preview');
    const revokeObjectURL = vi.fn();
    vi.stubGlobal('URL', { createObjectURL, revokeObjectURL });
    const file = new File(['image'], 'preview.png', { type: 'image/png' });
    const item: FileUploadEntry = {
        id: 'preview',
        file,
        status: 'uploading',
        progress: 0,
        retryable: true
    };
    const view = render(UploadPreviewFixture, { item });
    expect(createObjectURL).toHaveBeenCalledTimes(1);
    await view.rerender({ item: { ...item, progress: 50 } });
    await view.rerender({ item: { ...item, status: 'complete', progress: 100 } });
    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).not.toHaveBeenCalled();
    view.unmount();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:upload-preview');
});
