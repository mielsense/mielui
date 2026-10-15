import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ReasoningFixture from '../../fixtures/ReasoningFixture.svelte';

describe('Reasoning', () => {
    it('shows the English status line and default summary', () => {
        render(ReasoningFixture, {
            props: {
                duration: '2.4s'
            }
        });
        const trigger = screen.getByRole('button');

        expect(trigger).toHaveTextContent('Thought');
        expect(trigger).toHaveTextContent('for 2.4s');
        expect(trigger).toHaveTextContent('Draft');
    });

    it('reads the status line and summary from labels', () => {
        render(ReasoningFixture, {
            props: {
                duration: '2.4s',
                labels: {
                    thoughtFor: (duration: string) => `Réflexion de ${duration}`,
                    title: 'Brouillon'
                }
            }
        });
        const trigger = screen.getByRole('button');

        expect(trigger).toHaveTextContent('Réflexion de 2.4s');
        expect(trigger).toHaveTextContent('Brouillon');
        expect(trigger).not.toHaveTextContent('Thought');
    });

    it('reads the finished status without a duration from labels', () => {
        render(ReasoningFixture, {
            props: {
                labels: {
                    thought: 'Réflexion terminée'
                }
            }
        });

        expect(screen.getByRole('button')).toHaveTextContent('Réflexion terminée');
    });
});
