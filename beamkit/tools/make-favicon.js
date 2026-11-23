#!/usr/bin/env node
/* beamKit favicon generator.
   Usage:  node make-favicon.js <icon-name> [out-dir] [--accent=#ffe14d] [--glow]
   e.g.    node make-favicon.js cutoff ../../beamCutoff
   Makes favicon.svg (navy rounded square + the beamKit icon glyph), and, if rsvg-convert
   is installed, favicon-32.png and apple-touch-icon.png. List icons: node make-favicon.js --list */
const fs = require('fs'), path = require('path'), vm = require('vm'), { execFileSync } = require('child_process');

// Read the icon set straight from beamkit.js so there is one source of truth.
const src = fs.readFileSync(path.join(__dirname, '..', 'beamkit.js'), 'utf8');
const ICONS = vm.runInNewContext('(' + src.match(/var ICONS = (\{[\s\S]*?\n  \});/)[1] + ')');

const args = process.argv.slice(2);
if (!args.length || args[0] === '--list') { console.log(Object.keys(ICONS).join('  ')); process.exit(0); }
const name = args[0], out = args[1] && !args[1].startsWith('--') ? args[1] : '.';
const accent = (args.find(a => a.startsWith('--accent=')) || '--accent=#ffe14d').split('=')[1];
const glow = args.includes('--glow');
if (!ICONS[name]) { console.error(`Unknown icon "${name}". Try: ${Object.keys(ICONS).join(', ')}`); process.exit(1); }

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><linearGradient id="s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${accent}"/><stop offset="1" stop-color="#78a9ff"/></linearGradient>${glow ? '<radialGradient id="g"><stop offset="0" stop-color="' + accent + '" stop-opacity=".55"/><stop offset="1" stop-color="' + accent + '" stop-opacity="0"/></radialGradient>' : ''}<clipPath id="c"><rect width="32" height="32" rx="7"/></clipPath></defs><g clip-path="url(#c)"><rect width="32" height="32" fill="#0a0f2c"/>${glow ? '<circle cx="16" cy="16" r="13" fill="url(#g)"/>' : ''}<g transform="translate(4 4)" fill="none" stroke="url(#s)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</g><path d="M3 29h26" stroke="#ff7eb6" stroke-width="1.4" stroke-linecap="round" opacity=".9"/></g></svg>\n`;

fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'favicon.svg'), svg);
console.log('wrote', path.join(out, 'favicon.svg'));
try {
  execFileSync('rsvg-convert', ['-w', '32', '-h', '32', path.join(out, 'favicon.svg'), '-o', path.join(out, 'favicon-32.png')]);
  execFileSync('rsvg-convert', ['-w', '180', '-h', '180', '-b', '#0a0f2c', path.join(out, 'favicon.svg'), '-o', path.join(out, 'apple-touch-icon.png')]);
  console.log('wrote favicon-32.png and apple-touch-icon.png');
} catch (e) {
  console.log('rsvg-convert not found — SVG only. (Install librsvg, or export the PNGs from any browser.)');
}
