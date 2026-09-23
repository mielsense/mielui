- Group components into Components, Blocks, AI components, and Chart components. Existing imports and docs URLs stay available.

- Toast notifications use an inset content area with a title and action buttons in the footer.

- Slider adds pill-shaped handles, a two-handle range mode, and right-to-left support.

- Group connects related controls with separators and optional text, in horizontal or vertical layouts.

- Add Heatmap with composable calendar, labels, summary, detail, legend, and keyboard navigation.
- Add Morph for SVG geometry transitions and text changes, including the theme switch.
- Add optional glass surfaces to overlays, menus, tooltips, selection popups, and toasts.
- Add a centered component preview and wide or narrow canvases to Theme Studio.
- Animate Heatmap cells and Gauge arcs on entry, with reduced-motion support.

- Add Table with default and inset variants, plus Native Select with grouped and multiple options.
- Add the Shimmer action and a shimmer variant for Skeleton.
- Add site-wide documentation search with Command-K and Control-K.

- Add a glass Composer surface and a Thinking text example for Shimmer.

- Add composable Task Steps rows and summaries, Reorder List handles and content, and Message metadata parts.
- Add separate Tool trigger/content parts, Color Picker surfaces, and Show More preview/trigger slots.
- Add Command search/result slots, optional Alert icons, and an optional Sheet header close control.
- Add controlled Context Menu state and manual tab activation.
- Add scoped Tooltip providers and noninteractive rich descriptions.

- Add composable Field, Fieldset, and Form components with accessible errors and SvelteKit remote-form examples.
- Add Calendar, Range Calendar, Date Picker, and Date Range Picker with keyboard navigation and date constraints.
- Add Number Field and OTP Field with native form submission and reset support.
- Add Separator and a public composable Toolbar with keyboard navigation.
- Add a swipe-dismissable Drawer with modal focus management.

- Add a composable Data Table powered by TanStack Table v9, with explicit sort menus, editable filter chips, selection, and pagination.

- Data Table filters accept a search control as children and align filter and sort buttons with inputs.
- Form error summaries accept validation paths directly and focus after unsuccessful submissions.

- Add File Upload with validation, progress, cancellation, retries, and animated completion.
- Initialize Mielui from a Studio JSON preset with `init --preset`, or apply it with `add theme`.
- Set glass surfaces globally from Studio or the `--mielui-surface` CSS variable.

- Studio’s AI workspace demonstrates streamed Markdown, reasoning, tool activity, file attachments, and an overlaid composer with stop and replay controls.

- Studio’s component preview centers interactive mini cards for controls, checklists, team members, and disclosures.

- Checkbox supports small, medium, and large sizes, with a larger 18px default.

- Add composable bar, line, area, mixed, pie, and donut charts powered by LayerChart, with tooltips, legends, and animated data updates.
- Charts offer entry reveals and ongoing live highlights that respect reduced motion and pause offscreen.
- Add a composable Empty State for first-use screens, empty search results, and completed work.
- Add Notch for custom activities at any screen edge, with solid and glass surfaces and animated expansion.
- Toast notifications can use a shared Notch surface through the Toaster variant.

- Notch offers a persistent peek rail, timed notifications, and swipe dismissal, with timers paused during interaction.

- Heatmap includes a shared tooltip for hovered and keyboard-focused days, with an optional Tooltip part for custom layouts.

- Adjust edge highlight strength in Studio or theme presets. Controls, keycaps, and raised surfaces now use half strength by default.

- Notch supports detached side actions that unfold on hover or focus. Notch notifications show one item at a time with previous and next controls.

- Place counters or custom content outside a Notch with Accessory; notification counts now use this separate part.

- Add built-in live motion to Gauge and Heatmap through their animation props.

- Add built-in loading and empty-data states to Gauge and Heatmap.

- Select and Combobox support multiple selection with array values and menus that stay open while choosing options.

- Add the Number shuffle action and animate Gauge values with rolling digits.
