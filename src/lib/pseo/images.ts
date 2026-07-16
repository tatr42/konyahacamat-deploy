/**
 * Dinamik görsel havuzu — pSEO ve blog sayfaları için.
 *
 * Kaynak: Unsplash (telifsiz, hotlink'e izinli kendi CDN'i) + 1 yerel fotoğraf.
 * Tüm URL'ler 2026-07-16'da tek tek HTTP 200 doğrulaması yapılarak eklendi;
 * `plus.unsplash.com` (ücretli Unsplash+) görselleri bilinçli olarak dışlandı.
 * Pixabay kullanılmadı: ToS'u hotlink'i yasaklıyor ve CDN URL'leri kalıcı değil.
 *
 * Seçim DETERMİNİSTİKTİR: aynı lokasyon+hizmet her zaman aynı görseli alır
 * (il için plaka, ilçe için plaka+slug hash'lenir). Böylece sayfa her
 * yüklenişinde görsel değişmez ve build çıktısı kararlıdır.
 *
 * NOT (dürüst kısıt): Unsplash'ta gerçek sülük (leech) fotoğrafı yok —
 * "leech" araması alakasız sonuç veriyor. Sülük sayfaları bu yüzden
 * "natural" (bitkisel/doğal şifa) temasından beslenir.
 */

import type { Province } from "@/data/tr-locations";
import type { ServiceType } from "@/lib/pseo/content";

export type ImageTheme = "cupping" | "materials" | "natural";

export interface PoolImage {
  src: string;
  width: number;
  height: number;
  theme: ImageTheme;
  /** Bakım için kısa açıklama — kullanıcıya gösterilmez */
  desc: string;
}

/** Unsplash CDN parametreleri: sabit 1200×800 kırpma, otomatik format. */
const u = (id: string, theme: ImageTheme, desc: string): PoolImage => ({
  src: `https://images.unsplash.com/photo-${id}?q=80&w=1200&h=800&auto=format&fit=crop`,
  width: 1200,
  height: 800,
  theme,
  desc,
});

export const IMAGE_POOL: PoolImage[] = [
  // Yerel profesyonel fotoğraf — dış bağımlılıksız çapa görsel
  { src: "/5.webp", width: 700, height: 500, theme: "cupping", desc: "Steril kupa uygulaması (yerel)" },

  // ── Kupa / hacamat uygulama ──
  u("1745327883389-17150e99dcf7", "cupping", "Sırtta kupa terapisi uygulaması"),
  u("1762392050946-685f2dec9da7", "cupping", "Kupa izleri — sporcu"),
  u("1761819922058-d15028ed9817", "cupping", "Cihazla bölgesel uygulama"),
  u("1741522509438-a120c0bb5e88", "cupping", "Sırt masajı — terapi masası"),
  u("1745327883508-b6cd32e5dde5", "cupping", "Terapist sırt masajı"),
  u("1639162906614-0603b0ae95fd", "cupping", "Spa sırt terapisi"),
  u("1696841212541-449ca29397cc", "cupping", "Sıcak taş terapisi — sırt"),
  u("1519824145371-296894a0daa9", "cupping", "Sırt masajı yakın plan"),
  u("1700522924565-9fad1c05469e", "cupping", "Spa ortamında sırt masajı"),
  u("1544161515-4ab6ce6db874", "cupping", "Terapi masasında dinlenme"),

  // ── Malzeme / steril ekipman ──
  u("1598555748505-ccca0d9b9f7b", "materials", "Cam kupa — ahşap zemin"),
  u("1621287571777-c725d8e34d39", "materials", "Kırmızı kapaklı vakum kupası"),
  u("1621287424405-a34be1c3ff7c", "materials", "Kupa seti — siyah zemin"),
  u("1598300195998-364bf445842c", "materials", "Vakum pompası cihazı"),
  u("1584820927498-cfe5211fd8bf", "materials", "Mavi tıbbi eldiven giyme"),
  u("1748064716276-6fb0fc9da94a", "materials", "Cerrahi eldivenler — koyu zemin"),

  // ── Doğal / bitkisel şifa (sülük sayfaları da buradan) ──
  u("1492552296703-4ec0a2fb3715", "natural", "Havan — doğal ilaç hazırlığı"),
  u("1514733670139-4d87a1941d55", "natural", "Bitki çayı"),
  u("1783755861600-a96cd03764b7", "natural", "Kurutulmuş yapraklar — koyu zemin"),
  u("1783248143998-49fc65e5657b", "natural", "Cam kavanozlarda kurutulmuş bitkiler"),
  u("1758525732480-8df43412b54c", "natural", "Bitkisel ilaç şişesi"),
];

/** Hizmet → tema eşlemesi. */
const SERVICE_THEME: Record<ServiceType, ImageTheme> = {
  "hacamat-kursu": "cupping",
  "hacamat-nedir": "cupping",
  "kupa-malzemeleri": "materials",
  "suluk-satisi": "natural",
  "suluk-nedir": "natural",
};

/** djb2 — basit, hızlı, deterministik string hash. */
function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = (h * 33) ^ s.charCodeAt(i);
  }
  return h >>> 0;
}

/** Blog kategorisi → tema (kategori adından çıkarım). */
export function themeForCategory(category: string): ImageTheme {
  const c = category.toLocaleLowerCase("tr-TR");
  if (c.includes("sülük") || c.includes("doğal") || c.includes("islam") || c.includes("i̇slam")) {
    return "natural";
  }
  return "cupping";
}

/** Anahtar tabanlı deterministik seçim — blog vb. genel kullanım. */
export function pickImageByKey(key: string, theme?: ImageTheme): PoolImage {
  const themed = theme ? IMAGE_POOL.filter((i) => i.theme === theme) : IMAGE_POOL;
  const pool = themed.length > 0 ? themed : IMAGE_POOL;
  return pool[hashStr(key) % pool.length];
}

/**
 * Lokasyon+hizmet için deterministik kapak görseli.
 * Aynı il (plaka) + ilçe + hizmet her derlemede/yüklemede aynı görseli alır.
 */
export function pickImage(
  service: ServiceType,
  province: Province,
  districtSlug?: string,
): PoolImage {
  const key = `${service}|${province.plate}|${districtSlug ?? ""}`;
  return pickImageByKey(key, SERVICE_THEME[service]);
}
