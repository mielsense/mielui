import type { DefaultProps } from '@mielui/svelte/utils';
import Gauge from './gauge.svelte';

export type GaugeTone = 'primary' | 'muted' | 'success' | 'warning' | 'error';

export type GaugeLabels = {
    /** Accessible name while loading. `name` is the gauge's `label`, when it has one. */
    loading?: (name: string | undefined) => string;
    /** Accessible name when there is no measurement. */
    empty?: (name: string | undefined) => string;
    /** Accessible name of a gauge with no `label`. */
    value?: (value: number, max: number) => string;
};

export type GaugeProps = {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: GaugeLabels;
    /** The bounded quantity shown by the filled arc. Pass null when no measurement is available. */
    value: number | null;
    /** Show a loading ring while the measurement is being fetched. */
    loading?: boolean;
    /** Value that fills the gauge. */
    max?: number;
    /** Describes the quantity, such as "Context remaining" or "Monthly API usage". */
    label?: string;
    /** Diameter in pixels. Defaults to 120; use an explicit size for inline meters. */
    size?: number;
    /** Track and arc thickness in pixels. Defaults to 9.75% of the diameter, with a 3px minimum. */
    strokeWidth?: number;
    /** Reveal the arc, highlight it continuously, or disable animation. */
    animation?: 'reveal' | 'live' | 'none';
    /** Color of the fill. */
    tone?: GaugeTone;
} & DefaultProps;

export { Gauge };
export default Gauge;
