/**
 * Belge / sertifika tek doğruluk kaynağı.
 *
 * YMYL notu: Buradaki belgeler uygulayıcının aldığı EĞİTİMİ gösterir; Türkiye'de
 * resmî sağlık mesleği icra yetkisi ya da devlet akreditasyonu ifade etmez. Bu
 * ayrım `CREDENTIALS_DISCLAIMER` ile her görüntülemede birlikte gösterilir.
 * (Bkz. src/constants/diseases.ts başındaki dil kuralı ve /hakkimizda "Şeffaf
 * Belgelendirme" değeri.)
 */

export type Credential = {
  id: string;
  /** public/ altındaki görsel yolu */
  image: string;
  /** Belgenin türü/başlığı */
  title: string;
  /** Belgeyi düzenleyen kurum */
  issuer: string;
  /** Belge sahibi — gerçek ad (persona ile birlikte) */
  holder: string;
  /** Düzenlenme yılı */
  year: string;
  /** Belge / index numarası (varsa) */
  refNo?: string;
  /** Erişilebilirlik ve SEO için açıklayıcı alt metin */
  alt: string;
};

export const credentials: Credential[] = [
  {
    id: "malezya-hijama-2012",
    image: "/belgeler/malezya-hijama-sertifikasi-2012.webp",
    title: "Hacamat / Al-Hijamah (Cupping) Sertifikası",
    issuer: "Faculty of Homeopathy Malaysia (Rtg) — Department of Malay Medicine",
    holder: "Abdullah Keskinoğlu (Ebusadullah Hoca)",
    year: "2012",
    refNo: "6634",
    alt:
      "Ebusadullah Hoca (Abdullah Keskinoğlu) adına Faculty of Homeopathy Malaysia tarafından 2012'de düzenlenen Al-Hijamah (hacamat/cupping) eğitim sertifikası",
  },
];

/** Belgelerin altında gösterilen dürüstlük / kapsam notu (YMYL). */
export const CREDENTIALS_DISCLAIMER =
  "Yukarıdaki belge, uygulayıcının yurt dışında aldığı hacamat (Al-Hijamah) eğitimine ait uluslararası bir eğitim/katılım belgesidir. Türkiye'de resmî bir sağlık mesleği icra yetkisi veya devlet akreditasyonu ifade etmez.";
