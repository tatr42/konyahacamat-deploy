/**
 * Deterministik seçim yardımcıları — pSEO "anti-doorway" motorunun çekirdeği.
 *
 * Amaç: her il/ilçe sayfası, aynı anahtarla HER ZAMAN aynı sonucu üretsin
 * (build çıktısı kararlı olsun) ama komşu lokasyonlar birbirinden FARKLI
 * görsel/SSS/metin varyantı alsın. Böylece sayfalar "sadece şehir adı değişen
 * kopya" olmaktan çıkar.
 *
 * Bu modül tek bir yerde tutulur ki hem images.ts hem content.ts aynı hash'i
 * kullansın (dairesel bağımlılık ve kod tekrarı olmadan).
 */

/** djb2 — basit, hızlı, deterministik string hash (>>> 0 ile işaretsiz). */
export function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = (h * 33) ^ s.charCodeAt(i);
  }
  return h >>> 0;
}

/** Havuzdan anahtara göre tek, deterministik seçim. */
export function pickOne<T>(pool: T[], seed: string): T {
  return pool[hashStr(seed) % pool.length];
}

/**
 * Havuzdan k adet FARKLI (tekrarsız) öğeyi deterministik seçer.
 *
 * Her slot için farklı tuz (salt) ile hash alınır; çakışma olursa doğrusal
 * sonda (linear probe) ile bir sonraki boş indekse geçilir. Sonuç: aynı seed
 * her zaman aynı k'lı kümeyi ve aynı SIRAYI verir. k > havuz ise havuz kadar
 * öğe döner.
 */
export function pickDistinct<T>(pool: T[], k: number, seed: string): T[] {
  const n = pool.length;
  const count = Math.min(k, n);
  const used = new Set<number>();
  const out: T[] = [];
  for (let slot = 0; out.length < count; slot++) {
    let j = hashStr(`${seed}#${slot}`) % n;
    while (used.has(j)) j = (j + 1) % n;
    used.add(j);
    out.push(pool[j]);
  }
  return out;
}
