- Replace the logo and favicons with the approved compact cat silhouette.

- Tag Input values have visible badge borders and backgrounds.
- Toast timers pause during keyboard interaction, and close buttons remain visible.

- Toast descriptions have more room above a compact title and action row.

- Tag Input badges use stronger borders and a contrasting fill.

- Homepage navigation uses equal button heights and spacing, with the redundant Components button removed.

- Tag Input uses the standard transparent outline Badge styling.

- Restore Changelog and Studio pages after TypeScript preprocessing and component path errors.
- Preserve Group outer borders with single-pixel separators and composed Input, menu, and popup examples.
- Match Alert to the inset Toast layout, with the description above the status row.
- Render Tag Input tags as transparent outline badges.

- Keep the darker inset panel inside frosted glass overlays.
- Match Alert text size, vertical centering, and status-row spacing to Toast.
- Use a minus indicator for checked checkboxes.
- Keep morph visuals in place while updating SVG geometry without a delayed icon swap.

- Keep the theme icon color synchronized with the active theme during morph transitions.

- Align Switch labels with the pill-shaped control.
- Keep Accordion borders between items only.

- Restore original SVG visibility when Morph is removed or its child icon changes.
- Respect the theme’s disabled-motion setting in chart entrances and motion actions.
- Preserve checkbox state while disabled and forward accessible names to the native input.

- Size Composer submission controls to their visible content and respect custom action labels.

- Preserve fractional Gauge ranges and normalize invalid numeric values.

- Fix preview deployment type checks for icon imports, native controls, table captions, and documentation examples.

- Use Bits UI for dialogs, sheets, popovers, menus, selection controls, tabs, disclosures, switches, and toggles while retaining Mielui styling and motion.
- Add menu keyboard navigation, typeahead, nested dismissal, and touch long-press behavior.
- Preserve canceled events, optional overlay labels, and conditional dialog actions.
- Keep option labels and disabled selections synchronized as collections change.
- Prevent obsolete streams, clipboard requests, and canceled reorder gestures from overwriting newer state.
- Reconcile toast persistence, durations, paused timers, and visible notification limits.
- Connect field and tooltip descriptions to their controls, and ignore inactive or composing shortcuts.
- Update scroll cues after content changes and support fractional progress ranges.
- Preserve preview state when switching to source code and reduce redundant status animation.
- Reset Avatar loading state on source changes and preserve native image callbacks.
- Keep skeleton placeholders inert, normalize pagination bounds, and prevent silent inset Card footer replacement.
- Add keyboard navigation to Toolbar and improve Color Picker labels, pointer ownership, and reduced motion.

- Preserve Slider handle identity while adopting Bits UI keyboard behavior and adding named form values and reset support.
- Use Bits UI for Combobox navigation and selection while preserving fuzzy search and Mielui styling.
- Show submission errors without losing Composer drafts or Question answers, and ignore obsolete completions.
- Keep disabled Button links from navigating and preserve native Input checkbox, radio, and file semantics.
- Repair active tabs after removal or disabling, and keep Command results synchronized during collection changes.
- Keep IME confirmation and canceled click handlers from activating commands or opening selection popups.
- Give toasts one visual exit and stop long response streams from animating every character.
- Preserve Group variant styling with a single joined divider.
- Forward overlay action refs and keep cancel actions from stealing focus after opening.
- Defer offscreen documentation previews while preserving mounted preview state.

- Remove the resting shadow from outline buttons while retaining their border and keyboard focus indicator.

- Show invalid input borders and reveal field errors with interruptible, reduced-motion-aware transitions.

- Restore pointer hover and selection in menus and floating panels by keeping their content above dismissal layers.
- Keep top and bottom drawers full width in the examples and give nested drawers separate backdrops and focus boundaries, with cancelled swipes returning to rest.
- Prevent date segments from overlapping on narrow screens and keep calendar popups above surrounding navigation.

- Keep advanced Studio spacing and motion overrides until their corresponding preset changes.
- Match date-picker trigger heights to their inputs and keep hover feedback distinct.
- Position Toast dismiss buttons at the top-right without covering the message.

- Use round send and stop icons in Composer without changing its toolbar variants.

- Show rejected attachments in compact error cards without decoding oversized image previews.
- Animate promise toast resizing in 50 ms and place title-only messages inside a fitted inset panel.
- Preserve Studio color, typography, spacing, and motion choices in CLI-compatible theme exports.

- Keep tab highlights aligned while their dialog or other parent animates in.

- Studio places advanced colors below the color controls and groups shape and motion presets with labeled advanced-settings buttons.

- Studio previews share one surface, with dedicated Charts and AI tabs and flush joins on advanced-setting controls.

- Studio uses full-width previews, a denser component gallery, and joined preset and copy controls.

- Studio shows a year of heatmap activity and pairs a full-width conversation with the narrower Composer layout used in its documentation.

- Fix TypeScript errors in composed controls, upload and toast motion, and documentation examples while preserving native event handlers and refs.

- Update the docs and installer workspace to Svelte 5.57.1 and SvelteKit 2.70.3, with svelte-check 4.7.6.

- Honor a consumer project's declared package manager and recognize Bun lockfiles in the CLI.
- Keep theme editing usable when browser storage is blocked or full, and report failed theme saves.
- Keep upload image previews stable as progress changes.
- Keep Dialog, Sheet, Popover, and File Diff state synchronized with their bound values and current props.
- Restore nested dialog stacking, single-layer dismissal, focus return, and shared background scroll locks.
- Cache the GitHub star count and retain the last valid count during temporary API failures.
- Preserve invoice-preview state when switching Studio tabs.

- Buttons, fields, selects, and floating surfaces share subtle light-catching edges that follow the theme’s shadow settings.

- Gauge defaults to a larger 120px display with proportional arcs and labels, and smoothly animates value changes.

- Pie chart tooltips use opaque inset surfaces.

- Menus, overlays, tooltips, conversation scrolling, and response text respect reduced motion and the theme’s disabled-motion setting.

- Accordion triggers retain their content relationships, and focus traversal includes editable text regions.

- Joined inputs, selects, and buttons share one control height across sizes. Table badges fit their labels instead of filling the cell.

- Segmented tabs keep even rail padding at fractional spacing and inside scaled containers.

- Keep inset Cards stable when their footer is removed during a state change.

- Studio groups edge highlight strength under its switch and restores the previous strength when re-enabled.

- Data Table uses the shared inset Table surface with a compact header.

- Alert dialogs announce their title and description. Select triggers and option lists now expose linked combobox semantics and accessible names.

- Combobox results collapse smoothly when filtered and stop locking page scroll as soon as the menu closes.

- Give Notch content more padding and keep its detached actions close to the panel.

- Dialogs restore focus when removed while open without interrupting a newly opened dialog.

- Escape closes only the deepest open dropdown or context submenu, keeping its parent menu available.

- Notch side actions unfold with synchronized shape and button motion, including interrupted hover changes.
- Morph and Shimmer stop active effects when inherited theme motion is disabled and clean up their theme observers on removal.
- Stopping a controlled Composer response no longer submits the preserved prompt again when the control returns to Send.

- Let Show More content fade into its surrounding surface without a mismatched background strip.

- Rework live chart motion with stationary pie highlights, area-fill sweeps, and staggered bar highlights; keep offscreen effects paused without trapping visible sweeps.

- Keep Reasoning duration labels spaced, respect reduced motion in copy feedback, and keep notch notification text wrapped during morphs.

- Guard font preference storage and isolate font state between server renders.

- Keep Accordion accessibility relationships valid when content is omitted and honor disabled Tag Input controls.
- Keep disabled Popover triggers closed and dismiss empty tooltips.
- Preserve invoice draft validation and reset stale filters when creating or locating an invoice in Studio.

- Scale Heatmap entrance timing with the theme motion setting.

- Keep page-outline jumps aligned after lazy previews load and track section headings by their document position.
- Remove content and icon morphing from Toast notifications, including stacked Notch notifications.

- Prevent hidden chart data tables from creating extra scroll space inside previews.

- Give chart loading and empty messages the shared inset card appearance.

- Match Heatmap tooltips to the shared chart surface and inset the Gauge arc inside a thicker track.

- Give Gauge arc ends a subtle corner radius.

- Keep Gauge loading and empty states compact without a nested card.

- Preserve the Heatmap calendar layout while loading or showing no activity.

- Match the Gauge background track to its colored arc thickness.

- Restore the Color Picker hue slider’s rainbow track.

- Match catalog preview button text colors to the active theme.

- Place Switch edge highlights on the thumb, keep passive surfaces flat, and preserve control edges when fields and buttons receive focus.
- Restrict the native file picker to one file when maxFiles is one.

- Keep File Upload removal animations inside the file list instead of jumping toward the viewport corner.

- Preserve the Gauge loading ring while using theme colors for its mask.
