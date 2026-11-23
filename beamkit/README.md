# beamKit

Design framework for my automotive-lighting web tools, built on IBM Carbon. It is the look of the [portfolio](https://jalibakthermk.github.io/) and of [GLEn](https://jalibakthermk.github.io/Glen/), packaged so every tool can use it.

- **`beamkit.css`**: tokens (light and dark) and every component
- **`beamkit.js`**: icon sprite, theme toggle, drop zones, chart colours, canvas, CSV and copy helpers. No dependencies.
- **`template.html`**: a working starter tool page. Copy it and fill in the `TODO`s.
- **`demo.html`**: a gallery of every component in both themes
- **`tools/make-favicon.js`**: builds a matching favicon from any kit icon
- **`CLAUDE-snippet.md`**: paste into a repo's `CLAUDE.md` so Claude Code follows the kit

## 1. Where it lives

Host the kit once, in the portfolio repo, under `/beamkit/`:

```
jalibakthermk.github.io/
└── beamkit/
    ├── beamkit.css   beamkit.js   demo.html   template.html   README.md
    └── tools/make-favicon.js
```

Every tool then links to it:

```html
<link rel="stylesheet" href="https://jalibakthermk.github.io/beamkit/beamkit.css">
<script src="https://jalibakthermk.github.io/beamkit/beamkit.js" defer></script>
```

All tools share the same origin (`jalibakthermk.github.io`), so a fix to the kit reaches every tool at once, and the light/dark choice carries across all of them.

If a tool must work offline or as a single file, copy `beamkit.css` and `beamkit.js` into that repo (or paste them into `<style>` and `<script>`). Note the kit version in a comment.

**Versioning.** For a breaking change, publish a new folder (`/beamkit/v2/`) so the old tools keep working. Non-breaking fixes go into the current files.

## 2. New tool in five minutes

1. Copy `template.html` to the new repo as `index.html`.
2. Search for `TODO` and fill in the tool name, repo, eyebrow, title, subtitle and version.
3. Make the favicon: `node tools/make-favicon.js <icon> ../NewRepo` (`--list` shows the icon names).
4. Replace the demo data and `lineChart` with your model and charts. Keep the IDs and the structure.
5. Add a card to the portfolio, using the same icon.

## 3. Moving an existing tool to beamKit

Work through this list for each repo. GLEn is the reference for a finished migration.

- [ ] Add the `<link>`, the theme script and the `<script defer>` to `<head>` (copy them from `template.html`, including the one-line theme script that runs before first paint).
- [ ] Delete the tool's own colour variables, font stacks, button and input styles. Keep only layout that is specific to the tool.
- [ ] Replace the header with **shell bar + title band** (section 5).
- [ ] Put inputs in `<aside>` → `<details class="panel">` groups; put results in `<section class="main">`, inside `<div class="wrap layout">`.
- [ ] Give every input a `<label for>` and use `.field` rows; put units in brackets.
- [ ] Use `.drop` zones for file inputs and wire them with `beamKit.dropZone()`.
- [ ] Use `.tile` for headline results, `.chip ok/bad` for pass/fail and `.notice` for warnings and errors (no `alert()`).
- [ ] Charts: take every colour from `beamKit.colors()`, use the IBM Plex font, and redraw in `beamKit.theme.onChange()`.
- [ ] Buttons: one `.btn.primary` per view, the rest `.btn` or `.btn.ghost`, each with an icon.
- [ ] Add the footer, the favicon set and the `<meta>` description and theme colour.
- [ ] Check in light, dark and at 390 px wide; check the keyboard (Tab and focus rings) and run the tests.

**Mapping older code.** Where chart code reads the old names (`--surface-1`, `--grid`, `--series-1`, `--critical`, `--good` …), either change it to `beamKit.colors()` or add aliases in the tool's `<style>`:

```css
:root { --surface-1: var(--cds-layer-01); --grid: var(--cds-grid); --critical: var(--cds-bad); --good: var(--cds-ok); --text-muted: var(--cds-text-helper); }
```

## 4. Design rules

**Look.** Grey page, white layers, 1 px borders, **square corners** (only `.chip` is rounded). No shadows except tooltips. Navy shell bar on every page.

**Type.** IBM Plex Sans for UI text, Plex Sans Condensed for headings, Plex Mono for numbers, file names and eyebrows.

| Role | Style |
|---|---|
| Page title | 30–42 px Light, with the tool name in Condensed 600 |
| Section head `.sec-head h2` | Condensed 20 / 600 |
| Card title `.card h3` | Condensed 16 / 600 |
| Panel head `.panel h2` | Condensed 13, uppercase, secondary colour |
| Body | 14 / 1.43 |
| Helper and caption | 12, helper colour |
| Numbers | Mono, tabular figures |

**Colour.** Use tokens only, never hex values in tool CSS.

| Token | Use |
|---|---|
| `--cds-background` / `--cds-layer-01` / `--cds-layer-02` | page / cards / inputs and hover areas |
| `--cds-text-primary` / `-secondary` / `-helper` | text levels |
| `--cds-button-primary` | primary action and selected state |
| `--cds-ok` / `--cds-bad` / `--cds-warn` (+ `-bg`, `-text`) | pass / fail / warning |
| `--cds-cut` | the cut-off accent in motifs and highlights |
| `--series-1 … 6` | data lines, in this order |
| `--ramp-1 … 7` | heat maps and isocandela (`beamKit.ramp(t)`) |

**Charts.** Series follow the `--series-n` order. **Limits are always a red dashed line** (`--cds-bad`), so red is never used for a series. Grid lines use `--cds-grid`, axis text uses `--cds-text-helper` at 11 px Plex. Put units in the caption. Hover shows a crosshair and a mono tooltip. Always draw a legend.

**Writing.** Use sentence case. Keep labels short with units in brackets: "Mounting height (m)". Write ° L/R/U/D for angles. Use "Pass" and "Fail". Every tool states that it processes files locally, and its footer carries the "engineering estimates" disclaimer.

**Layout.** Sidebar 340 px with sticky panels; results first on phones. Rarely used inputs go in panels that start collapsed. Breakpoints are 672, 900, 1056 and 1200 px.

## 5. Components

| Component | Markup |
|---|---|
| Shell bar | `.shell > .wrap > a.shell-name + .shell-actions` (theme button: `button[data-bk-theme]` with `.sun` and `.moon` icons) |
| Title band | `header.titleband > svg.motif + .wrap > p.eyebrow + h1 (b + span.ver) + p.sub + span.privacy` |
| Layout | `.wrap.layout > aside + section.main` (`.layout.no-sidebar` for single-column pages) |
| Panel | `details.panel[open] > summary (h2 + svg.i.chev) + .pbody` |
| Field | `.field > label[for] + input/select` · `.field.stack` · `.helper` · `.check` · `.seg` |
| Drop zone | `label.drop > input[type=file] + .dt + .fname + .dh` (`.drop.big` for the landing state) |
| Buttons | `.btn` + `.primary / .tertiary / .ghost / .danger`, sizes `.sm / .lg`, group `.btn-row` |
| Section head | `.sec-head > h2 + p` |
| Result tile | `.tiles > .tile[style="--tile-c:…"] > .t-head + .row (.k + .v)` · KPI: `.tile.kpi > .label + .value + .delta` |
| Status | `.chip.ok/.bad/.warn/.info > .dot` · metadata `.tag` · notice `.notice.warn/.bad/.ok/.info` |
| Card and chart | `.card > h3 + .cap + canvas + .legend + .tooltip` · grids `.charts`, `.grid-2`, `.grid-3` |
| Toolbar | `.toolbar > .btn… + .note` |
| Table | `.card.flush > .tablewrap > table.data` |
| Tabs | `.tabs[role=tablist] > button[role=tab][aria-selected]` |
| Prose | `details.method > summary + .prose` |
| Footer | `.wrap.foot > footer.bk` (`.disc` for the disclaimer line) |
| Icons | `<svg class="i"><use href="#icon-NAME"/></svg>`, `.i.lg` = 32 px; see `demo.html` for the full set |

## 6. JavaScript API (`window.beamKit`)

```js
beamKit.theme.get() / .set('dark') / .toggle() / .onChange(fn)   // fn also runs once the fonts load
beamKit.colors()      // {text, text2, helper, grid, layer, border, ok, bad, warn, accent, cut, series[6], font, mono}
beamKit.series(i)     // i-th series colour
beamKit.ramp(t)       // 0…1 → 'rgb()' on the sequential ramp; ramp(t, true) → [r,g,b]
beamKit.cssVar('--cds-grid')
beamKit.setupCanvas(canvas)   // → {ctx, W, H}, sharp on HiDPI screens
beamKit.niceTicks(min, max, n)
beamKit.dropZone('#drop1', file => …)   // click to browse + drag and drop
beamKit.readText(file)                  // → Promise<string>
beamKit.download('x.csv', text, 'text/csv')
beamKit.copy(text, button)              // shows "Copied" on the button's <span>
beamKit.chip(ok)                        // Pass/Fail tag HTML
beamKit.fmt(x)                          // 3 significant figures, engineering style
beamKit.debounce(fn, ms)
```

## 7. Favicons

```
node tools/make-favicon.js --list
node tools/make-favicon.js cutoff ../beamCutoff            # yellow→blue glyph on navy
node tools/make-favicon.js thermo ../LeTeC --accent=#ff8389 --glow
```

This writes `favicon.svg`, plus `favicon-32.png` and `apple-touch-icon.png` when `rsvg-convert` is installed. Use the same icon on the tool's portfolio card. GLEn has a hand-drawn favicon; the generator gives every other tool a matching one.

MIT © 2026 Jalib Akther
