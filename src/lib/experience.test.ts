import { test } from 'node:test';
import assert from 'node:assert';
import { getYearsExp, getYearsExpStr } from './experience.ts';

test('experience calculator', async (t) => {
  await t.test('returns correct years of experience for 2024', (t) => {
    t.mock.method(Date.prototype, 'getFullYear', () => 2024);
    assert.strictEqual(getYearsExp(), 30);
    assert.strictEqual(getYearsExpStr(), '30+');
  });

  await t.test('returns correct years of experience for 1994 (start year)', (t) => {
    t.mock.method(Date.prototype, 'getFullYear', () => 1994);
    assert.strictEqual(getYearsExp(), 0);
    assert.strictEqual(getYearsExpStr(), '0+');
  });

  await t.test('returns correct years of experience for 2030', (t) => {
    t.mock.method(Date.prototype, 'getFullYear', () => 2030);
    assert.strictEqual(getYearsExp(), 36);
    assert.strictEqual(getYearsExpStr(), '36+');
  });
});
