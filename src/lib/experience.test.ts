import assert from 'node:assert';
import { test, mock } from 'node:test';
import { getYearsExp, getYearsExpStr } from './experience.ts';

test('experience calculation', async (t) => {
  // Her alt testten sonra mock'ları sıfırla
  t.afterEach(() => {
    mock.reset();
  });

  await t.test('getYearsExp returns correct years for 2025', () => {
    mock.method(Date.prototype, 'getFullYear', () => 2025);
    assert.strictEqual(getYearsExp(), 31); // 2025 - 1994 = 31
  });

  await t.test('getYearsExpStr returns correct string for 2025', () => {
    mock.method(Date.prototype, 'getFullYear', () => 2025);
    assert.strictEqual(getYearsExpStr(), '31+');
  });

  await t.test('getYearsExp returns correct years for 1994 (start year)', () => {
    mock.method(Date.prototype, 'getFullYear', () => 1994);
    assert.strictEqual(getYearsExp(), 0);
  });

  await t.test('getYearsExp returns correct years for 2030 (future)', () => {
    mock.method(Date.prototype, 'getFullYear', () => 2030);
    assert.strictEqual(getYearsExp(), 36); // 2030 - 1994 = 36
  });
});