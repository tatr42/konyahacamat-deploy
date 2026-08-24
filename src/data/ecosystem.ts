/**
 * EKOSİSTEM DEVİR AYARI — eğitim/akademi silosunun konyahacamat.com.tr'ye
 * devri tek bayraktan yönetilir.
 *
 * NEDEN BAYRAK:
 *   `.net` CANLI bir sitedir ve `hacamat-kursu` silosu (hub + 81 il + 49 ilçe)
 *   bugün indekstedir. Devir hedefi olan konyahacamat.com.tr ise henüz Vercel'e
 *   alınmamıştır; o domainde şu an ESKİ WordPress sitesi duruyor. Bu durumda
 *   301 vermek, trafiği yanlış içeriğe gönderir ve devri geri alınması zor
 *   biçimde bozar.
 *
 *   Bu yüzden devrin tamamı yazıldı ama TEK BİR BAYRAKLA kapalı tutuluyor.
 *
 * AÇMA PROSEDÜRÜ (sırayı bozmayın):
 *   1. konyahacamat.com.tr yeni Akademi sitesi Vercel'de yayına alınır ve
 *      `https://www.konyahacamat.com.tr/hacamat-kursu/konya` gibi bir URL
 *      tarayıcıda 200 döndüğü doğrulanır.
 *   2. Buradaki `COMTR_LIVE` değeri `true` yapılır.
 *   3. `.net` yeniden deploy edilir.
 *
 *   Sonuç: `/egitimler` ve `/hacamat-kursu/**` 301 ile com.tr'ye devredilir,
 *   sitemap'ten düşer, iç linkler otomatik olarak com.tr'yi gösterir.
 *
 * GERİ ALMA: bayrağı `false` yapıp yeniden deploy etmek yeterlidir.
 */

export const COMTR_LIVE = true;

export const COMTR_BASE = "https://www.konyahacamat.com.tr";

/**
 * Eğitim niyetinin gideceği adres.
 * Bayrak kapalıyken site içindeki `/egitimler` sayfası kullanılır.
 */
export function academyHref(): string {
  return COMTR_LIVE ? `${COMTR_BASE}/hacamat-egitimi` : "/egitimler";
}

/** İl bazlı kurs niyeti — bayrak açıkken com.tr'deki eşleşen il sayfası. */
export function academyCityHref(provinceSlug: string): string {
  return COMTR_LIVE
    ? `${COMTR_BASE}/hacamat-kursu/${provinceSlug}`
    : `/hacamat-kursu/${provinceSlug}`;
}

/** Kurs hub'ı. */
export function academyHubHref(): string {
  return COMTR_LIVE ? `${COMTR_BASE}/hacamat-kursu` : "/hacamat-kursu";
}

/** Bağlantı dış domaine mi gidiyor? (rel/target kararı için) */
export function academyIsExternal(): boolean {
  return COMTR_LIVE;
}
