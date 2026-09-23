import type { DefaultProps } from '@mielui/svelte/utils';
import Gauge from './gauge.svelte';

export type GaugeTone = 'primary' | 'muted' | 'success' | 'warning' | 'error';

export type GaugeProps = {
    /** The bounded quantity shown by the filled arc. Pass null when no measurement is available. */
    value: number | null;
    /** Show a loading ring while the measurement is being fetched. */
    loading?: boolean;
    max?: number;
    /** Describes the quantity, such as "Context remaining" or "Monthly API usage". */
    label?: string;
    /** Diameter in pixels. Defaults to 120; use an explicit size for inline meters. */
    size?: number;
    /** Track and arc thickness in pixels. Defaults to 9.75% of the diameter, with a 3px minimum. */
    strokeWidth?: number;
    /** Reveal the arc, highlight it continuously, or disable animation. */
    animation?: 'reveal' | 'live' | 'none';
    tone?: GaugeTone;
} & DefaultProps;

export { Gauge };
export default Gauge;
