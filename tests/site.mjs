import assert from 'node:assert/strict';
import { test } from 'node:test';

const base = process.env.GARDENER_TEST_URL || 'http://127.0.0.1:4491';

test('Gardener product pages and nested tutorials remain reachable', async () => {
  for (const path of ['/', '/about', '/tutorial', '/tutorial/setup', '/tutorial/setup/sphere-node', '/tutorial/analysis', '/tutorial/pipelines', '/research', '/approach', '/roadmap']) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), /Gardener/, path);
  }
});

test('product pages contain no Community navigation or registry workflows', async () => {
  for (const path of ['/', '/tutorial', '/tutorial/pipelines', '/about']) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200);
    const html = (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
    assert.doesNotMatch(html, /community|cross-omics\.com|pipeline-registry|risk-ranking|version-tree/i, path);
  }
});

test('Gardener exposes neither Community APIs nor personal account pages', async () => {
  for (const path of ['/api/community/v1/session', '/api/community/auth/login', '/community/mine', '/community/registry/submit']) {
    const response = await fetch(base + path, {redirect:'manual'});
    assert.equal(response.status, 404, path);
    assert.equal(response.headers.get('set-cookie'), null, path);
  }
});

test('tutorial images are served by the Gardener deployment', async () => {
  for (const path of ['/setup/01-releases.webp', '/tutorial-v3/pipeline-canvas.png']) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get('content-type'), /^image\//);
    assert.ok((await response.arrayBuffer()).byteLength > 1000);
  }
});


test('pipeline guide keeps the execution topics and valid section anchors', async () => {
  const html = (await (await fetch(base + '/tutorial/pipelines')).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  for (const id of ['canvas', 'runs', 'agent', 'packages', 'more']) {
    assert.ok(html.includes('href="#' + id + '"'), id);
    assert.ok(html.includes('id="' + id + '"'), id);
  }
});

test('retired community screenshots are not served', async () => {
  for (const name of ['community-search', 'version-tree', 'risk-ranking']) {
    const response = await fetch(base + '/tutorial-v3/' + name + '.png');
    assert.equal(response.status, 404, name);
  }
});
