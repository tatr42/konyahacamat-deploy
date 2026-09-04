import { test } from "node:test";
import assert from "node:assert/strict";
import { enrichContent } from "./enrich";

test("h2/h3 başlıklarına Türkçe-duyarlı id enjekte eder ve TOC çıkarır", () => {
  const html =
    "<h2>Hacamat Nedir?</h2><p>metin</p>" +
    "<h3>Sünnetteki Yeri</h3><p>metin</p>" +
    "<h2>Kimlere Uygulanır?</h2>";
  const { html: out, toc } = enrichContent(html);

  assert.equal(toc.length, 3);
  assert.deepEqual(toc[0], { id: "hacamat-nedir", text: "Hacamat Nedir?", level: 2 });
  assert.deepEqual(toc[1], { id: "sunnetteki-yeri", text: "Sünnetteki Yeri", level: 3 });
  assert.ok(out.includes('<h2 id="hacamat-nedir">'));
  assert.ok(out.includes('<h3 id="sunnetteki-yeri">'));
});

test("mevcut id korunur, çakışan başlıklar benzersizleştirilir", () => {
  const html =
    '<h2 id="ozel-id">Başlık</h2>' +
    "<h2>Fayda</h2><h2>Fayda</h2>";
  const { html: out, toc } = enrichContent(html);

  assert.equal(toc[0].id, "ozel-id"); // korunmuş
  assert.equal(toc[1].id, "fayda");
  assert.equal(toc[2].id, "fayda-2"); // benzersizleştirilmiş
  assert.ok(out.includes('<h2 id="ozel-id">'));
});

test("iç içe etiketli başlık metni temizlenir, boş başlık atlanır", () => {
  const html = "<h2><strong>Kalın</strong> Başlık</h2><h2>   </h2>";
  const { toc } = enrichContent(html);

  assert.equal(toc.length, 1);
  assert.equal(toc[0].text, "Kalın Başlık");
  assert.equal(toc[0].id, "kalin-baslik");
});

test("başlıksız içerik olduğu gibi döner", () => {
  const html = "<p>Sadece paragraf.</p>";
  const { html: out, toc } = enrichContent(html);

  assert.equal(out, html);
  assert.equal(toc.length, 0);
});
