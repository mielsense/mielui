
- Use pnpm and Node.js for repository setup, development, and release tooling.

- Added a component audit covering behavior, accessibility, composition, and motion.

- Moved Show More into Blocks.

- Toolbar now appears under Blocks. Its import path stays the same.

- Add manual installation instructions with dependency commands, file tabs, copying, and expandable source.
- Add a right-aligned On this page sidebar with smooth section navigation and reduced-motion support.
- Move Gauge into Chart components.
- Use Hugeicons throughout components and examples, with an SSR-safe HugeiconsIcon renderer.
- Use dashed guides in the left documentation navigation.
- Add replay controls to inset chart previews.

- Align the documentation breadcrumb with the article heading.

- Add Copy page actions with Markdown and AI links.
- Replace anatomy summaries with prop tables for every exported component part, including native attributes and events.
- Add the Agent skill guide and a complete llms-full.txt reference.
- Update example identities and project links to mielsense.

- Improve code-example formatting and separate API reference links in the page outline.

- Document every Table and Native Select part and use Table for API references.
- Shorten repetitive documentation copy and update component counts.
- Soften the scrolling edge beneath the documentation toolbar.

- Animate native-attribute disclosures with Collapsible.
- Align Star and theme controls with the page outline and use a home icon in breadcrumbs.
- Document component reuse and accessible interaction motion in the design guidelines.

- Group Reorder List, Command, Color Picker, and Toast under Blocks while preserving their imports and documentation links.

- Include motion actions in the component catalog and keep its counts and search in sync with navigation.

- Show headless component props in the main API tables and document props from every discriminated mode.

- Join the publish-date input and calendar trigger with Group in the Date Picker example.

- Keep the Number Field seat-count example compact instead of stretching the control to its container.

- Show Data Table search and filtering as one joined control.

- Replace the Toolbar demo with selectable design tools and keyboard hints.
- Rebuild Studio previews with aligned control states, Charts and AI sections, and an invoice table.
- Separate basic remote form validation from multiple actions and reset.
- Allow unrestricted cross-month selection in the two-month Range Calendar example and show its selected dates.
- Join Date Range Picker inputs and calendar trigger with Group.

- Add a promise-toast demo and use promise notifications in Form examples.

- Organize Studio theme controls into collapsible sections with a tooltip-labelled advanced settings button.

- Give both levels of the nested Drawer example handles and normal dismissal.

- Add Bun install commands with syntax highlighting.
- Add composed examples for File Upload, Reorder List, Toolbar, Separator, and Response Stream.
- Add tooltips to Studio and documentation icon actions.

- Simplify the top navigation to Docs and Studio.

- Replace machine-specific paths in the design-system implementation plans.

- Derive homepage component counts from the catalog and check each catalog entry's category, examples, and API reference.
- Document controlled overlays, upload cancellation and retry, and theme storage limitations.
- Add a live File Diff example and refresh generated component prop tables.
- Use shared border, radius, and elevation tokens in legacy API tables.

- Document shared edge, inset, focus, and motion rules for component contributions.
- Keep Notch and notch notification examples inside their preview frames.
- Make chart state and period-switching examples easier to adapt with named event handlers.

- Chart guides have dedicated type pages, searchable navigation, and matching Markdown references. Tablet documentation navigation remains accessible.
- Split chart examples into focused bar, line, area, mixed, pie, and donut guides with continuous motion, data updates, missing measurements, and loading states.
- Add interactive Gauge capacity and Heatmap reporting-range examples.

- Use flat leading previews and source sections, inset example cards, compact API table headers, and persistent footer page actions.

- Block examples now include contained toast previews, continuous Markdown streaming, recoverable task steps, and visible command and code-action results.

- Component examples now include working local actions, accessible icon controls, upload completion and recovery, and shorter variant comparisons.
- Make AI examples finish, stop, and retry their simulated work; preserve partial responses and clean up pending delivery when previews close.
- Document AI state ownership and add composed tool retries, response cancellation, and interactive Morph and Shimmer examples.

- Rebuild Docs and Studio around fixed headers and footers, thin section dividers, and quieter navigation. Widen the documentation section rail.

- Clarify inherited glass surfaces and keep example action results spaced below their controls.

- Center the homepage cat within a bordered layout with subtle dithering and muted scrolling component names.

- Keep preview toolbars aligned across nested examples and prevent their controls from overlapping pinned section headings.

- Clarify core component setup and form behavior, and make the Group and indeterminate Progress examples interactive.

- Balance section content spacing, keep sticky headings opaque, and center grid intersections across the documentation rails.

- Keep navigation headings and the leading preview toolbar sticky, use text-only hover and selection states, and show API guidance from an info control.

- Align footer actions with the header columns and disable elastic overscroll across the site.

- Match error pages to the documentation grid and provide a retry action when a page fails to load.

- Add visual component catalog cards with descriptions and search across component names and descriptions.

- Present each changelog version as a sticky section and keep catalog descriptions in footer info cards.

- Simplify Studio into aligned control and content previews, unify its tabs, and match footer and header heights.

- Move Studio preview tabs into the header and preview width controls into the footer.

- Keep headers, footers, section headings, and navigation headings at one shared height, with aligned intersection marks.

- Align Studio chart, conversation, and application previews with the shared section layout and keep the composer clear of messages.

- Strengthen section headings and move Button behavior notes into its Usage section.

- Keep component behavior notes inside their relevant sections instead of below standalone previews.

- Remove the trailing divider below Studio’s Typography controls.

- Widen Studio’s conversation preview and place its simulation note below the composer.

- Let the Studio conversation span the preview and scroll behind a narrower floating composer.
- Add matching grid junction markers at the Studio header and footer.

- Clarify block and AI component usage, state ownership, and Markdown link and image handling.

- Review every component’s usage, examples, and API coverage; add chart loading, empty-data, and animation examples to each chart-type guide.
- Keep documentation scrolling available over Toast previews and show section descriptions in information hover cards.

- Remove excess space below the final documentation sidebar item.

- Use warm pastel red and yellow series colors in chart examples.


- Add loading, empty, and live-motion controls to Gauge and Heatmap examples.

- Show a larger invoice dataset in Studio using the shared Data Table, with sorting, selection, and pagination.
- Arrange Studio component cards in compact responsive stacks, with a smaller calendar and label and sharing examples.

- Remove the repository’s OpenCode setup and skill lockfile.

- Show the Markdown preview directly on the canvas without a card or nested scroll area.

- Group components by type in the sidebar, with a preview catalog for each group.
- Make documentation search more compact, with quick destinations and a scrollable results list.

- Add space between catalog cards and use consistent parent-label styling and spacing for all nested sidebar groups, including charts, while keeping standalone links compact.

- Keep the expanded Notch export example clear of its trigger and show its file count in a compact badge.

- Nest catalog categories under Components in the page outline.

- Increase the space between component catalog sections.

- Clarify the homepage description of component theming.

- Match the Code tab background and rounded corners to its example preview.
- Add a single-file upload example that replaces the dropzone with the selected file.

- Gently snap sidebar groups and page sections to the top while preserving free scrolling within long sections and reduced-motion preferences.

- Snap sidebar group headings to the top without snapping to the bottom edges of long groups.

- Give consecutive documentation examples more separation while keeping their headings and previews together.

- Prevent sidebar settling from targeting offscreen groups; only visible headings approaching the top can catch.

- Align page-outline link gutters and nested indentation with the navigation sidebar.

- Use the same bounded top-only magnetic settling in the content column and sidebar.
- Give the page-outline hook a full outer gutter and more space before its labels.

- Align the footer info icon with the navigation button inset and distinguish outline hover previews with a dashed gray hook.

- Move the page-outline hook directly to a clicked section without pausing on headings passed during smooth scrolling.

- Keep catalog search pinned in a header-height row, with section headings and outline jumps positioned below it.

- Slow the page-outline hook’s glide while retaining direct section targeting and reduced-motion behavior.

- Remove the doubled divider between catalog search and the first section.

- Match article, toolbar, and footer side gutters to the page-outline header.

- Align the leading Preview / Code tabs with the shared content gutter.

- Give documentation content a moderate side gutter while keeping tabs, headings, toolbar, and footer aligned.

- Scale magnetic catch distances to neighboring section heights and settle only once per downward scroll gesture, preventing short sections from oscillating.

- Match the Copy page control height to the adjacent-page arrows in the docs footer.
- Keep Form and keyboard-shortcut demo feedback inside their previews and dispose unfinished toast demos on navigation.
- Separate page-outline state and Studio token parsing from presentation while reducing unnecessary outline work during preview updates.
- Update the agent skill and package guides for Mielui's current APIs, independent release history, and retained Sivir UI and COSS attribution.
