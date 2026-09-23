import { markdownResponse } from '$lib/markdown-response';

export const prerender = true;
export function GET() {
    return markdownResponse(
        '# Actions\n\n- [Morph](/docs/actions/morph.md): animate SVG geometry and text changes.\n- [Number shuffle](/docs/actions/number-shuffle.md): roll digits when a value changes.\n- [Shimmer](/docs/actions/shimmer.md): animate a loading highlight.\n'
    );
}
