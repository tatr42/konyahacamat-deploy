import { test } from "node:test";
import assert from "node:assert/strict";
import { COMTR_LIVE, COMTR_BASE, academyHref, academyCityHref, academyHubHref, academyIsExternal } from "../data/ecosystem.ts";

test("Ecosystem & Devir Configuration: COMTR_LIVE and Base URL", () => {
  assert.equal(COMTR_LIVE, true, "COMTR_LIVE should be enabled for active ecosystem devir");
  assert.equal(COMTR_BASE, "https://www.konyahacamat.com.tr");
  assert.equal(academyIsExternal(), true, "Academy links must be external when COMTR_LIVE is true");
});

test("Ecosystem Link Helpers Audit", () => {
  assert.equal(academyHref(), "https://www.konyahacamat.com.tr/hacamat-egitimi");
  assert.equal(academyHubHref(), "https://www.konyahacamat.com.tr/hacamat-kursu");
  assert.equal(academyCityHref("konya"), "https://www.konyahacamat.com.tr/hacamat-kursu/konya");
  assert.equal(academyCityHref("istanbul"), "https://www.konyahacamat.com.tr/hacamat-kursu/istanbul");
});
