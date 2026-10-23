const { build } = require('esbuild');
const { rmSync, mkdirSync, copyFileSync } = require('node:fs');
rmSync('build', { recursive: true, force: true });
mkdirSync('build', { recursive: true });
copyFileSync('public/manifest.json', 'build/manifest.json');
build({ entryPoints: ['src/index.js'], bundle: true, minify: true,
  outfile: 'build/static/js/main.js', format: 'iife', platform: 'browser',
  target: 'chrome120', loader: { '.js': 'jsx' },
  define: { 'process.env.NODE_ENV': '"production"' }, metafile: true
}).then(result => {
  require('node:fs').writeFileSync('build/meta.json', JSON.stringify(result.metafile, null, 2));
}).catch(() => { process.exitCode = 1; });
