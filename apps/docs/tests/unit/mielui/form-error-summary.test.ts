import ErrorSummary from '@mielui/svelte/components/form/form-error-summary.svelte';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

const issues = [
    {
        message: 'Enter an email address.'
    }
];

describe('Form.ErrorSummary -- labels', () => {
    it('names the summary with the English heading by default', () => {
        render(ErrorSummary, {
            props: {
                issues
            }
        });
        expect(screen.getByText('Review your details')).toBeInTheDocument();
    });

    it('uses the heading label when one is passed', () => {
        render(ErrorSummary, {
            props: {
                issues,
                labels: {
                    heading: 'Vérifiez vos informations'
                }
            }
        });
        expect(screen.getByText('Vérifiez vos informations')).toBeInTheDocument();
        expect(screen.queryByText('Review your details')).not.toBeInTheDocument();
    });
});
