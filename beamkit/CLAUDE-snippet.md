## UI: use beamKit

This tool uses **beamKit**, my shared design framework (IBM Carbon look). Spec: https://github.com/jalibakthermk/jalibakthermk.github.io/tree/main/beamkit · gallery: https://jalibakthermk.github.io/beamkit/demo.html · reference page: https://jalibakthermk.github.io/beamkit/template.html

When building or changing UI in this repo:
- Link `https://jalibakthermk.github.io/beamkit/beamkit.css` and `beamkit.js` (defer), plus the one-line theme script from `template.html` in `<head>`. Do not copy the kit's CSS into this repo.
- Page structure: `.shell` bar (Projects, Code, theme toggle) → `header.titleband` → `.wrap.layout` with `<aside>` of `details.panel` input groups and `section.main` of results → `footer.bk`.
- Use kit components and tokens only: `.field`, `.drop`, `.btn(.primary)`, `.tile`, `.chip.ok/.bad`, `.notice`, `.card`, `.toolbar`, `table.data`. Never hard-code colours, fonts, radii or shadows; take every colour from the `--cds-*` tokens or `beamKit.colors()`.
- Charts: use the `--series-n` colours in order, show limits as a red dashed line (`--cds-bad`), use 11 px IBM Plex for axis text, always draw a legend, and redraw in `beamKit.theme.onChange()`.
- Files are read locally (`beamKit.dropZone` + `readText`). Show errors in `.notice.bad`, never with `alert()`.
- Square corners, sentence case, units in brackets, "Pass"/"Fail", ° L/R/U/D.
- Check light and dark, a 390 px width and keyboard focus before committing. Keep the calculation code separate from UI code.
