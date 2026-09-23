import { describe, expect, it } from 'vitest';
import { components } from '$lib/components';
import {
    componentDocPages,
    componentGuide,
    componentGuidePages,
    componentOwner
} from '$lib/docs-pages';
import { chartGuideMarkdown, componentMarkdown, llmsTxt } from '$lib/llms';
import { htmlDocPaths, llmDocPaths } from '$lib/sitemap';

describe('chart documentation routes', () => {
    it('keeps guide pages separate from installable components', () => {
        expect(componentGuidePages.map((guide) => `${guide.component}/${guide.slug}`)).toEqual([
            'chart/bar',
            'chart/line',
            'chart/area',
            'chart/mixed',
            'pie-chart/pie',
            'pie-chart/donut'
        ]);
        for (const guide of componentGuidePages) {
            expect(components).toContain(guide.component);
            expect(components).not.toContain(`${guide.component}/${guide.slug}`);
            expect(componentOwner(guide.href)).toBe(guide.component);
            expect(componentGuide(`${guide.href}/`)).toEqual(guide);
            expect(componentDocPages).toContainEqual({ href: guide.href, label: guide.title });
        }
        expect(componentOwner('/docs/components')).toBeUndefined();
        expect(componentOwner('/docs/components/not-real/bar')).toBeUndefined();
        expect(componentGuide('/docs/components/chart/not-real')).toBeUndefined();
    });

    it('publishes each guide in HTML, Markdown, search metadata and the LLM catalog', () => {
        const index = llmsTxt('https://preview.example');
        for (const guide of componentGuidePages) {
            expect(htmlDocPaths).toContain(guide.href);
            expect(llmDocPaths).toContain(`${guide.href}.md`);
            expect(index).toContain(`https://preview.example${guide.href}.md`);
            expect(componentMarkdown(guide.component)).toContain(`${guide.href}.md`);
        }
    });

    it('renders ordered guide examples and shared API links from the same content metadata', () => {
        for (const guide of componentGuidePages) {
            const markdown = chartGuideMarkdown(guide.component, guide.slug);
            expect(markdown?.startsWith(`# ${guide.title}\n\n${guide.description}\n`)).toBe(true);
            for (const paragraph of guide.usage) {
                expect(markdown).toContain(paragraph);
            }
            expect(markdown).toContain(`add ${guide.component}`);
            expect(markdown).toContain(`/docs/components/${guide.component}.md`);
            let previous = -1;
            for (const example of guide.examples) {
                const position = markdown?.indexOf(`### ${example.title}`) ?? -1;
                expect(position).toBeGreaterThan(previous);
                previous = position;
            }
            expect(markdown).toContain('~~~~svelte');
        }
        expect(chartGuideMarkdown('chart', 'not-real')).toBeUndefined();
        expect(chartGuideMarkdown('button', 'bar')).toBeUndefined();
    });
});
