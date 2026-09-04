import { test } from "node:test";
import assert from "node:assert/strict";
import { COMTR_LIVE, COMTR_BASE, academyHref, academyHubHref, academyCityHref } from "./ecosystem.ts";
import { transferredServiceRedirects } from "./pseo-scope.ts";

test("COMTR_LIVE is true and links target com.tr", () => {
  assert.equal(COMTR_LIVE, true);
  assert.equal(COMTR_BASE, "https://www.konyahacamat.com.tr");

  assert.equal(academyHref(), `${COMTR_BASE}/hacamat-egitimi`);
  assert.equal(academyHubHref(), `${COMTR_BASE}/hacamat-kursu`);
  assert.equal(academyCityHref("konya"), `${COMTR_BASE}/hacamat-kursu/konya`);
});

test("transferredServiceRedirects generates 301 rules pointing to com.tr when COMTR_LIVE is active", () => {
  const rules = transferredServiceRedirects();
  assert.ok(rules.length > 0);

  // Hub rule
  const hubRule = rules.find((r) => r.source === "/hacamat-kursu");
  assert.ok(hubRule);
  assert.equal(hubRule.destination, "https://www.konyahacamat.com.tr/hacamat-kursu");
  assert.equal(hubRule.statusCode, 301);

  // City rule
  const cityRule = rules.find((r) => r.source === "/hacamat-kursu/konya");
  assert.ok(cityRule);
  assert.equal(cityRule.destination, "https://www.konyahacamat.com.tr/hacamat-kursu/konya");
  assert.equal(cityRule.statusCode, 301);

  // District rule -> maps to city on com.tr
  const districtRule = rules.find((r) => r.source === "/hacamat-kursu/konya/selcuklu");
  assert.ok(districtRule);
  assert.equal(districtRule.destination, "https://www.konyahacamat.com.tr/hacamat-kursu/konya");
  assert.equal(districtRule.statusCode, 301);

  // Static education route
  const egitimlerRule = rules.find((r) => r.source === "/egitimler");
  assert.ok(egitimlerRule);
  assert.equal(egitimlerRule.destination, "https://www.konyahacamat.com.tr/hacamat-egitimi");
  assert.equal(egitimlerRule.statusCode, 301);
});
