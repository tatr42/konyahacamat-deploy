/**
 * Blog içerik zenginleştirme — RichEditor'dan gelen ham HTML'i işler.
 *
 * Yazı gövdesi Firestore'da serbest HTML olarak durur; başlıklarda id yoktur,
 * dolayısıyla sayfa içi gezinme (İçindekiler) mümkün değildir. Bu modül:
 *   1. h2/h3 başlıklarını tarar,
 *   2. Türkçe-duyarlı slug ile benzersiz `id` enjekte eder (mevcut id korunur),
 *   3. İçindekiler tablosu için başlık listesini döndürür.
 *
 * Regex tabanlı bilinçli olarak: içerik güvenilir kaynaktan (kendi admin
 * panelimiz) gelir ve DOM parser bağımlılığı eklemeye değmez.
 */

import { slugify } from "../../data/tr-locations.ts";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface EnrichedContent {
  html: string;
  toc: TocItem[];
}

/** HTML etiketlerini söküp düz metin döndürür (TOC etiketi için). */
function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

export function enrichContent(rawHtml: string): EnrichedContent {
  const toc: TocItem[] = [];
  const used = new Set<string>();

  const html = rawHtml.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, levelStr: string, attrs: string, inner: string) => {
      const text = stripTags(inner);
      if (!text) return match;

      // Mevcut id varsa koru, yoksa üret ve benzersizleştir.
      const existing = attrs.match(/\bid\s*=\s*["']([^"']+)["']/i);
      let id = existing ? existing[1] : slugify(text);
      if (!existing) {
        let candidate = id || "baslik";
        let n = 2;
        while (used.has(candidate)) candidate = `${id}-${n++}`;
        id = candidate;
      }
      used.add(id);

      toc.push({ id, text, level: Number(levelStr) as 2 | 3 });

      const newAttrs = existing ? attrs : `${attrs} id="${id}"`;
      return `<h${levelStr}${newAttrs}>${inner}</h${levelStr}>`;
    },
  );

  return { html, toc };
}
