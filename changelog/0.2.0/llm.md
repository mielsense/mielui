## Borders

Themes accept `chrome.borders: 'single' | 'double'`. Omitted values retain the
existing double frame. Theme parsing preserves the setting and rejects unsupported
values. Studio saves and exports it under Effects as Borders.

All double-frame surfaces honor `--mielui-border-inset-scale`, which defaults to
one without generated theme CSS. Single sets the scale to zero; double sets it
to one. This includes cards, menus, dialogs, sheets, toasts, Notch, code blocks,
diffs, inset tables, composers, and chart tooltips. Shared modal and inset frames
scale only their decorative inset. Panel cards also scale the inner border ring.
Notch keeps its outer SVG outline, hides the inner outline, and expands the fill
to the outer clip in single mode.

Keep inset variants, their content padding, footers, and subpart composition.
The setting changes the double-frame treatment, not the component variant.
Existing single-border surfaces stay single. Glass, shadows, focus rings, and
edge highlights remain independent. New double-frame implementations must follow
this token rather than introduce fixed inset padding or a fixed inner ring.
