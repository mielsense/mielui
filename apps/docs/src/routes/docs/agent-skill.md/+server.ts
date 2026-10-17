import { markdownResponse } from '$lib/markdown-response';
import { skillMarkdown } from '$lib/skill';
import type { RequestHandler } from './$types';

export const prerender = true;
export const GET: RequestHandler = ({ url }) => {
    return markdownResponse(
        `# Agent skill\n\nInstall with:\n\n\`\`\`sh\nnpx skills add mielsense/mielui --skill mielui\n\`\`\`\n\nFor whole pages, apps, and websites, also install the design skill. Its instructions are at /docs/design-skill.md.\n\n\`\`\`sh\nnpx skills add mielsense/mielui --skill mielui-design\n\`\`\`\n\nUse /llms.txt for the index and /llms-full.txt for the complete reference.\n\n${skillMarkdown(url.origin)}`
    );
};
