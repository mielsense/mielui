export type ChartGuide = {
    component: 'chart' | 'pie-chart';
    slug: string;
    title: string;
    description: string;
    usage: string[];
    examples: { name: string; title: string; description: string }[];
};

export const chartGuides: ChartGuide[] = [
    {
        component: 'chart',
        slug: 'bar',
        title: 'Bar chart',
        description: 'Compare categories with grouped or stacked bars.',
        usage: [
            'Use one Bar for each numeric series and match its key to a config entry. Bars share a zero baseline.',
            'Set stacked on Root to add bar series together. Positive and negative values stack on opposite sides of zero. Set orientation="horizontal" when category labels need more room.'
        ],
        examples: [
            {
                name: 'grouped',
                title: 'Grouped series',
                description: 'Compare two measurements side by side for each category.'
            },
            {
                name: 'horizontal',
                title: 'Horizontal stacks',
                description: 'Stack related counts and keep long category names beside the bars.'
            },
            {
                name: 'bar-negative',
                title: 'Positive and negative values',
                description:
                    'Net changes extend on either side of zero. Negative values remain negative in the tooltip.'
            },
            {
                name: 'updates',
                title: 'Revise a forecast',
                description:
                    'Switch between forecasts for the same months. Values and the numeric scale transition together, including when you switch again before motion finishes.'
            },
            {
                name: 'live-bars',
                title: 'Continuous motion',
                description:
                    'A light sweep follows the existing bars. It leaves the values unchanged and pauses offscreen.'
            }
        ]
    },
    {
        component: 'chart',
        slug: 'line',
        title: 'Line chart',
        description: 'Follow changes over time without a filled area.',
        usage: [
            'Use a Line for each numeric series. Sort dates before passing data; lines connect points in the supplied order.',
            'String categories have equal spacing. Date and numeric categories preserve their distance. A null or missing measurement breaks the line instead of turning into zero.'
        ],
        examples: [
            {
                name: 'line',
                title: 'Compare trends',
                description: 'Two lines share one numeric scale and a labelled legend.'
            },
            {
                name: 'line-gaps',
                title: 'Missing measurements',
                description:
                    'Wednesday has no reading. The gap stays visible so the chart does not imply a measurement.'
            },
            {
                name: 'line-dates',
                title: 'Irregular dates',
                description:
                    'April 3 and April 10 are seven days apart. Their spacing is wider than samples taken two days apart.'
            },
            {
                name: 'live',
                title: 'Continuous motion',
                description:
                    'A traveling highlight follows each line without changing its path or values.'
            }
        ]
    },
    {
        component: 'chart',
        slug: 'area',
        title: 'Area chart',
        description: 'Show the amount over time with a filled series.',
        usage: [
            'Place Area inside Plot. The fill extends to zero and fades toward the baseline.',
            'Multiple areas overlap on the same scale. They are not stacked; use grouped bars when overlap would obscure the comparison.'
        ],
        examples: [
            {
                name: 'area',
                title: 'One series',
                description: 'Monthly revenue uses one filled series with an outlined edge.'
            },
            {
                name: 'area-comparison',
                title: 'Overlapping series',
                description:
                    'Desktop and mobile sessions share a scale. Their legend and tooltip keep the two measurements identifiable.'
            },
            {
                name: 'area-updates',
                title: 'Changing values',
                description:
                    'Switch forecasts while the chart is moving. The next transition starts from the current display.'
            },
            {
                name: 'area-live',
                title: 'Continuous motion',
                description:
                    'A light sweep travels through the filled area without changing its values.'
            }
        ]
    },
    {
        component: 'chart',
        slug: 'mixed',
        title: 'Mixed chart',
        description: 'Compare totals and benchmarks in one plot.',
        usage: [
            'Compose Bar, Line, and Area in the same Plot. All marks use the same numeric axis, so their values must use compatible units.',
            'Lines do not reserve bar slots or contribute to stacked bar totals. Keep target series in config so legends and tooltips can name them.'
        ],
        examples: [
            {
                name: 'mixed',
                title: 'Totals and target',
                description:
                    'Bars show measured totals and a line shows the target for the same period.'
            },
            {
                name: 'live-mixed',
                title: 'Continuous motion',
                description:
                    'Bar sweeps and the line highlight continue after entry without changing the dataset.'
            },
            {
                name: 'composition',
                title: 'Custom legend and tooltip',
                description:
                    'Move the legend above the plot, omit the grid and Y-axis, and render tooltip values through its snippet.'
            }
        ]
    },
    {
        component: 'pie-chart',
        slug: 'pie',
        title: 'Pie chart',
        description: 'Show a few categories as shares of a total.',
        usage: [
            'Set Arc innerRadius to 0 for a solid pie and omit Label. Each datum has a stable key and a nonnegative value.',
            'Use a bar chart when small differences matter or when many categories would produce thin slices. The legend provides exact values without relying on color.'
        ],
        examples: [
            {
                name: 'pie',
                title: 'Category shares',
                description: 'A solid pie with exact values in its legend and tooltip.'
            },
            {
                name: 'live-pie',
                title: 'Continuous motion',
                description:
                    'Each segment brightens in sequence. Its position and proportion stay fixed.'
            },
            {
                name: 'pie-selection',
                title: 'Filter a category',
                description:
                    'Exclude internal traffic and watch the remaining shares recalculate. Stable keys preserve category identity.'
            }
        ]
    },
    {
        component: 'pie-chart',
        slug: 'donut',
        title: 'Donut chart',
        description: 'Place a total or active value inside a category breakdown.',
        usage: [
            'Arc defaults to a donut. Change innerRadius to control the opening and compose Label inside Plot for center content.',
            'Place Legend and Tooltip directly inside Root. Their snippets receive the formatted value and the percentage of the current total.'
        ],
        examples: [
            {
                name: 'hero',
                title: 'Total in the center',
                description:
                    'The default center label shows the total and responds to the active category.'
            },
            {
                name: 'live',
                title: 'Switch periods',
                description:
                    'Switch monthly and annual subscriptions. Slice angles update while the continuous highlight remains decorative.'
            },
            {
                name: 'composition',
                title: 'Custom center and legend',
                description:
                    'Replace the center content and legend labels while retaining the shared values and keyboard interaction.'
            }
        ]
    }
];

export function getChartGuide(component: ChartGuide['component'], slug: string): ChartGuide {
    const guide = chartGuides.find((item) => item.component === component && item.slug === slug);
    if (!guide) {
        throw new Error(`Unknown chart guide: ${component}/${slug}`);
    }
    return guide;
}
