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

import { PROVINCES } from "./tr-locations.ts";
import { COMTR_LIVE, COMTR_BASE } from "./ecosystem.ts";

/**
 * Bu depoda TANIMLI pSEO siloları (tip kaynağı).
 * "Tanımlı" ile "yayında" aynı şey değildir — bkz. `PUBLISHED_SERVICES`.
 */
export const KEPT_SERVICES = [
  "hacamat-kursu",
  "suluk-satisi",
  "kupa-malzemeleri",
] as const;

/**
 * KARDEŞ DOMAINE DEVREDİLEN SİLOLAR (2026-08-03 kararı).
 *
 * Eğitim/akademi niyeti konyahacamat.com.tr'ye toplandı. `hacamat-kursu`
 * silosunun tamamı (hub + 81 il + 49 ilçe) oradaki eşleşen sayfalara
 * 301'lenir. İlçe sayfalarının com.tr'de karşılığı YOKTUR — bu bilinçlidir;
 * ilçe kırılımı için gerçek veri bulunmadığı için o sayfalar il sayfasına
 * toplanır (zaten burada da `noindex` idiler).
 *
 * Devir, `ecosystem.ts` içindeki `COMTR_LIVE` bayrağı açılana kadar
 * ETKİSİZDİR: liste boş döner, hiçbir yönlendirme üretilmez.
 */
export const TRANSFERRED_SERVICES = ["hacamat-kursu"] as const;

const TRANSFERRED_SET = new Set<string>(COMTR_LIVE ? TRANSFERRED_SERVICES : []);

/**
 * Bu depoda GERÇEKTEN yayınlanan silolar.
 * Sitemap ve iç link üretimi bunu kullanmalıdır; `KEPT_SERVICES` kullanmak,
 * devir açıldığında 301'lenen URL'leri sitemap'e koyar.
 */
export const PUBLISHED_SERVICES = KEPT_SERVICES.filter((s) => !TRANSFERRED_SET.has(s));

/** Devredilen bir silo mu? */
export function isTransferredService(service: string): boolean {
  return TRANSFERRED_SET.has(service);
}

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
 * ÇAPRAZ DOMAIN yönlendirme kuralı — `permanent` yerine AÇIK `statusCode`.
 *
 * Next.js'te `permanent: true` 308 üretir. Google 308'i 301 ile eşdeğer sayar,
 * ancak site taşımasında kullanılan üçüncü parti tarayıcılar ve bazı eski
 * istemciler 301'i daha güvenilir işler. Domain içi kurallar (308) bugün canlı
 * ve sorunsuz çalıştığı için DEĞİŞTİRİLMEDİ; yalnızca yeni eklenen çapraz
 * domain devri açıkça 301 verir. Kardeş depo (com.tr) da aynı gerekçeyle 301
 * kullanıyor — iki tarafta aynı davranış olsun diye.
 */
export interface CrossDomainRedirectRule {
  source: string;
  destination: string;
  statusCode: 301;
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
  // Devredilen silo için kural üretilmez: o silonun TAMAMI zaten kardeş
  // domaine gidiyor. Üretilseydi `/hacamat-kursu/x/y` → `/hacamat-kursu/x`
  // → com.tr biçiminde iki adımlı bir 301 zinciri oluşurdu.
  return PUBLISHED_SERVICES.flatMap((service) =>
    pruned.map(({ il, ilce }) => ({
      source: `/${service}/${il}/${ilce}`,
      destination: `/${service}/${il}`,
      permanent: true as const,
    })),
  );
}

/**
 * DEVREDİLEN SİLONUN YÖNLENDİRMELERİ → konyahacamat.com.tr
 *
 * `COMTR_LIVE` kapalıyken BOŞ dizi döner; yani bu fonksiyon yayına alınsa
 * bile bayrak açılmadan hiçbir şey değişmez.
 *
 * Eşleme, her seviyede en yakın karşılığa yapılır:
 *   /hacamat-kursu                → com.tr/hacamat-kursu        (hub → hub)
 *   /hacamat-kursu/{il}           → com.tr/hacamat-kursu/{il}   (birebir)
 *   /hacamat-kursu/{il}/{ilce}    → com.tr/hacamat-kursu/{il}   (ilçe → il)
 *   /egitimler                    → com.tr/hacamat-egitimi      (program)
 *
 * İl kuralları AÇIK yazılır (wildcard değil): `:il` yakalayan tek bir kural
 * ilçe yollarını da yutar ve ilçeleri yanlış hedefe gönderirdi. Açık kural
 * sayısı 81 il + 335 ilçe + 2 = 418'dir; derleme anında veriden türer.
 */
export function transferredServiceRedirects(): CrossDomainRedirectRule[] {
  if (!COMTR_LIVE) return [];

  const rules: CrossDomainRedirectRule[] = [];

  for (const service of TRANSFERRED_SERVICES) {
    // Hub
    rules.push({
      source: `/${service}`,
      destination: `${COMTR_BASE}/${service}`,
      statusCode: 301,
    });

    for (const p of PROVINCES) {
      // İlçeler önce gelmeli — Next.js ilk eşleşen kuralı uygular ve il
      // kuralı `/{il}` biçiminde olduğu için ilçeyi zaten yakalamaz, ancak
      // sıralamayı açık tutmak ileride wildcard eklenirse kazayı önler.
      for (const d of p.districts) {
        rules.push({
          source: `/${service}/${p.slug}/${d.slug}`,
          destination: `${COMTR_BASE}/${service}/${p.slug}`,
          statusCode: 301,
        });
      }
      rules.push({
        source: `/${service}/${p.slug}`,
        destination: `${COMTR_BASE}/${service}/${p.slug}`,
        statusCode: 301,
      });
    }
  }

  // Statik eğitim sayfası → Akademi'nin program sayfası
  rules.push({
    source: "/egitimler",
    destination: `${COMTR_BASE}/hacamat-egitimi`,
    statusCode: 301,
  });

  return rules;
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
