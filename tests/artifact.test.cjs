const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { JSDOM } = require('jsdom');
const bundle = fs.readFileSync('build/static/js/main.js', 'utf8');
async function run(html) {
  const dom = new JSDOM(html, { url: 'https://www.kroger.com/p/example/123', runScripts: 'outside-only' });
  let requests = 0;
  dom.window.fetch = () => { requests++; throw new Error('Unexpected request'); };
  dom.window.XMLHttpRequest = class { constructor() { requests++; throw new Error('Unexpected request'); } };
  const originalTimer = dom.window.setTimeout.bind(dom.window);
  dom.window.setTimeout = (fn, ms, ...args) => originalTimer(fn, ms === 2000 ? 0 : ms, ...args);
  dom.window.eval(bundle);
  dom.window.eval(bundle);
  await new Promise(resolve => setTimeout(resolve, 50));
  return { dom, requests };
}
test('packaged MV3 script renders disabled UI without requests or duplicate roots', async () => {
  const manifest = JSON.parse(fs.readFileSync('build/manifest.json'));
  assert.equal(manifest.manifest_version, 3);
  assert.deepEqual(manifest.content_scripts[0].matches, ['https://www.kroger.com/p/*']);
  for (const file of [...manifest.content_scripts[0].js, ...manifest.content_scripts[0].css]) assert.ok(fs.statSync('build/' + file).size);
  assert.equal(manifest.permissions, undefined);
  const { dom, requests } = await run('<div class="ProductDetails"></div>');
  assert.match(dom.window.document.body.textContent, /Nutrition search is disabled/);
  assert.equal(dom.window.document.querySelectorAll('#custom-app-wrapper').length, 1);
  assert.equal(requests, 0);
  assert.doesNotMatch(bundle, /api\.nutritionix|x-app-key|x-app-id/);
  dom.window.close();
});
test('missing container and existing tabs are preserved without requests', async () => {
  for (const html of ['', '<div class="ProductDetails"><div class="TabableContent-container">Existing tabs</div></div>']) {
    const { dom, requests } = await run(html);
    assert.equal(dom.window.document.querySelector('#custom-app-wrapper'), null);
    assert.equal(requests, 0);
    dom.window.close();
  }
});
