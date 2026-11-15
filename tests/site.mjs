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

test('homepage and navigation open Community on its own origin', async () => {
  const response = await fetch(base);
  const html = await response.text();
  assert.match(html, /href="https:\/\/www\.cross-omics\.com\/"/);
  assert.doesNotMatch(html, /href="\/community(?:[\/?#"])/);
});

test('Gardener exposes neither Community APIs nor personal account pages', async () => {
  for (const path of ['/api/community/v1/session', '/api/community/auth/login', '/community/mine', '/community/registry/submit']) {
    const response = await fetch(base + path, {redirect:'manual'});
    assert.equal(response.status, 404, path);
    assert.equal(response.headers.get('set-cookie'), null, path);
  }
});

test('tutorial images are served by the Gardener deployment', async () => {
  for (const path of ['/setup/01-releases.webp', '/tutorial-v3/community-search.png']) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get('content-type'), /^image\//);
    assert.ok((await response.arrayBuffer()).byteLength > 1000);
  }
});
