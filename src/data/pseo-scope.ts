/**
 * pSEO KAPSAM TANIMI — Faz 0 "yapısal budama"nın tek doğruluk kaynağı.
 *
 * Neden ayrı bir dosya:
 *   `next.config.ts` build sırasında Node tarafında yüklenir ve `@/` yol
 *   takma adını (path alias) ÇÖZEMEZ. Bu yüzden bu modül yalnızca GÖRELİ
 *   import kullanır (`./tr-locations`) ve React/Next'e hiç dokunmaz.
 *   Böylece hem `next.config.ts` hem uygulama kodu aynı listeyi okur —
 *   yönlendirme listesi ile üretilen sayfalar asla birbirinden kaymaz.
 *
 * Karar (2026-07-26):
 *   - 5 silodan 2'si ("...nedir" bilgi siloları) kapatıldı → pillar blog 301.
 *     Gerekçe: aynı il için `hacamat-kursu` ile %58, `suluk-satisi` ile %53
 *     örtüşüyordu (5-gram Jaccard). Bilgi sorgusunda şehir niyeti yok.
 *   - 335 ilçeden yalnızca 49 metropol ilçesi tutuluyor → kalanı il sayfasına 301.
 *
 * Sonuç: 2.085 üretilen sayfa → 393 (81×3 il + 49×3 ilçe + 3 hub).
 */

import { PROVINCES } from "./tr-locations";

/** Yayında kalan pSEO siloları. */
export const KEPT_SERVICES = [
  "hacamat-kursu",
  "suluk-satisi",
  "kupa-malzemeleri",
] as const;

/**
 * Kapatılan siloların 301 hedefleri.
 * Hedef slug'lar `src/data/blog-posts.ts` içinde MEVCUT olmalıdır;
 * aksi halde 308 → 404 zinciri oluşur (bkz. eski HACAMATIN-FAYDALARI hatası).
 */
export const RETIRED_SERVICES: Record<string, string> = {
  "hacamat-nedir": "/blog/hacamat-nedir-tarihi-bilimsel-temelleri-ve-nasil-uygulanir",
  "suluk-nedir": "/blog/suluk-tedavisi-hirudoterapi-nedir",
};

/**
 * Yayında kalan ilçeler — `"<il-slug>/<ilce-slug>"` biçiminde.
 *
 * İl ön ekiyle yazılır çünkü ilçe slug'ları tek başına BENZERSİZ DEĞİLDİR:
 * `eregli` hem Konya'da hem Zonguldak'ta, `edremit` hem Balıkesir'de hem
 * Van'da, `yenisehir` hem Mersin'de hem Diyarbakır'da var.
 *
 * Seçim ölçütü: gerçek arama hacmi olan metropol ilçeleri + Konya'nın tamamı
 * (fiziksel hizmet bölgemiz olduğu için içeriği gerçekten farklılaştırılabilir).
 */
export const KEPT_DISTRICTS: readonly string[] = [
  // Konya — yüz yüze hizmet verdiğimiz gerçek saha (8)
  "konya/selcuklu",
  "konya/meram",
  "konya/karatay",
  "konya/eregli",
  "konya/aksehir",
  "konya/beysehir",
  "konya/cumra",
  "konya/seydisehir",

  // İstanbul (12)
  "istanbul/kadikoy",
  "istanbul/uskudar",
  "istanbul/besiktas",
  "istanbul/sisli",
  "istanbul/bakirkoy",
  "istanbul/fatih",
  "istanbul/beyoglu",
  "istanbul/umraniye",
  "istanbul/maltepe",
  "istanbul/pendik",
  "istanbul/bagcilar",
  "istanbul/esenyurt",

  // Ankara (6)
  "ankara/cankaya",
  "ankara/kecioren",
  "ankara/yenimahalle",
  "ankara/mamak",
  "ankara/etimesgut",
  "ankara/sincan",

  // İzmir (6)
  "izmir/konak",
  "izmir/karsiyaka",
  "izmir/bornova",
  "izmir/buca",
  "izmir/bayrakli",
  "izmir/karabaglar",

  // Bursa (4)
  "bursa/osmangazi",
  "bursa/yildirim",
  "bursa/nilufer",
  "bursa/inegol",

  // Antalya (3)
  "antalya/muratpasa",
  "antalya/kepez",
  "antalya/alanya",

  // Diğer büyükşehirler (10)
  "adana/seyhan",
  "adana/cukurova",
  "gaziantep/sahinbey",
  "gaziantep/sehitkamil",
  "kocaeli/izmit",
  "kocaeli/gebze",
  "mersin/yenisehir",
  "mersin/tarsus",
  "kayseri/melikgazi",
  "kayseri/kocasinan",
];

const KEPT_DISTRICT_SET = new Set(KEPT_DISTRICTS);

/** `il/ilce` anahtarı — tek yerde üretilir ki biçim kaymasın. */
export function districtKey(provinceSlug: string, districtSlug: string): string {
  return `${provinceSlug}/${districtSlug}`;
}

/** Bu ilçe yayında kalıyor mu? */
export function isKeptDistrict(provinceSlug: string, districtSlug: string): boolean {
  return KEPT_DISTRICT_SET.has(districtKey(provinceSlug, districtSlug));
}

/** Yayında kalan tüm (il, ilçe) çiftleri — `generateStaticParams` için. */
export function keptDistrictPairs(): { il: string; ilce: string }[] {
  return PROVINCES.flatMap((p) =>
    p.districts
      .filter((dd) => isKeptDistrict(p.slug, dd.slug))
      .map((dd) => ({ il: p.slug, ilce: dd.slug })),
  );
}

/** Budanan tüm (il, ilçe) çiftleri — yönlendirme üretimi için. */
export function prunedDistrictPairs(): { il: string; ilce: string }[] {
  return PROVINCES.flatMap((p) =>
    p.districts
      .filter((dd) => !isKeptDistrict(p.slug, dd.slug))
      .map((dd) => ({ il: p.slug, ilce: dd.slug })),
  );
}

export interface RedirectRule {
  source: string;
  destination: string;
  permanent: true;
}

/**
 * Kapatılan "...nedir" silolarının yönlendirmeleri.
 * Hub (`/hacamat-nedir`) ve altındaki HER şey (`/hacamat-nedir/konya/meram`)
 * tek pillar yazıya gider. `:path*` sıfır segmenti de eşlediği için hub ayrıca
 * yazılmasa da yakalanır; yine de açıklık için ikisi de listelenir.
 */
export function retiredServiceRedirects(): RedirectRule[] {
  return Object.entries(RETIRED_SERVICES).flatMap(([service, destination]) => [
    { source: `/${service}`, destination, permanent: true as const },
    { source: `/${service}/:path*`, destination, permanent: true as const },
  ]);
}

/**
 * Budanan ilçelerin yönlendirmeleri: `/<silo>/<il>/<ilce>` → `/<silo>/<il>`.
 *
 * Wildcard kullanılmaz — çünkü TUTULAN ilçeler de aynı kalıba uyar ve
 * `/suluk-satisi/istanbul/:ilce` gibi bir kural onları da yutardı. Bu yüzden
 * budanan her ilçe için AÇIK kural üretilir. Liste veriden türetildiği için
 * elle bakım gerektirmez.
 *
 * Üretilen kural sayısı: 3 silo × 286 budanan ilçe = 858.
 */
export function prunedDistrictRedirects(): RedirectRule[] {
  const pruned = prunedDistrictPairs();
  return KEPT_SERVICES.flatMap((service) =>
    pruned.map(({ il, ilce }) => ({
      source: `/${service}/${il}/${ilce}`,
      destination: `/${service}/${il}`,
      permanent: true as const,
    })),
  );
}

/**
 * Build-time doğrulama: `KEPT_DISTRICTS` içindeki her giriş gerçekten
 * `tr-locations` içinde var mı? Bir yazım hatası, o ilçeyi sessizce
 * "budanmış" sayar ve sayfa 301'e düşerdi — bu yüzden gürültülü patlıyoruz.
 */
export function assertKeptDistrictsValid(): void {
  const valid = new Set(
    PROVINCES.flatMap((p) => p.districts.map((dd) => districtKey(p.slug, dd.slug))),
  );
  const unknown = KEPT_DISTRICTS.filter((k) => !valid.has(k));
  if (unknown.length > 0) {
    throw new Error(
      `pseo-scope: KEPT_DISTRICTS içinde tr-locations'ta bulunmayan girişler var: ${unknown.join(", ")}`,
    );
  }
}
