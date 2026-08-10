/**
 * PROMO / DUYURU VERİ KAYNAĞI — sitedeki tüm "reklam alanı" görsellerinin
 * tek doğruluk kaynağı.
 *
 * NEDEN TEK DOSYA:
 *   Duyurular (kurs başlangıcı, kayıt dönemi, Almanya seansı) sık değişir ve
 *   aynı anda ana sayfada, blog kenar rayında, yazı aralarında ve hizmet
 *   sayfalarının altında görünür. Metin/görsel/tarih JSX içine dağılırsa
 *   "kayıtlar kapandı" güncellemesi 6 ayrı dosyada aranır. Buradaki listeyi
 *   düzenlemek her yerde aynı anda geçerli olur.
 *
 * GÖRSEL KURALI:
 *   `image` yerel `/public` dosyası ya da `IMAGE_POOL` (Unsplash) URL'i
 *   olabilir. Yerel fotoğraf her zaman tercih edilir — gerçek kurum
 *   fotoğrafı, stok görselden daha güçlü bir güven sinyalidir. Yeni
 *   fotoğraflar `/public`'e düştükçe buradaki `image` alanlarını
 *   değiştirmek yeterlidir, bileşenlere dokunmaya gerek yoktur.
 *
 * YMYL DİL KURALI:
 *   Promo metinleri TEDAVİ SONUCU VAAT ETMEZ ("ağrınız geçer", "şifa
 *   garantili" vb. YASAK). Yalnızca hizmetin kendisini, eğitim programını
 *   ve randevu/kayıt çağrısını duyurur. Bkz. src/constants/diseases.ts.
 */

import { academyHref, academyHubHref } from "@/data/ecosystem";
import { getYearsExpStr } from "@/lib/experience";

/** Promo'nun sahiplendiği vurgu rengi — globals.css'teki @theme tokenları. */
export type PromoAccent =
  | "teal"
  | "gold"
  | "coral"
  | "amber"
  | "indigo"
  | "rose"
  | "sky"
  | "lime";

export interface Promo {
  /** Kararlı anahtar — React key ve deterministik seçim için. */
  id: string;
  /** Sol üstteki küçük etiket: "YENİ DÖNEM", "KAYIT AÇIK" ... */
  badge: string;
  /** Kartın ana başlığı. Kısa tutun; 2 satırı geçmesin. */
  title: string;
  /** Tek cümlelik açıklama. */
  desc: string;
  /** Buton metni. */
  cta: string;
  href: string;
  /** Kart arka plan fotoğrafı. */
  image: string;
  /** Görsel alt metni — dekoratif değil, içerik taşıyor. */
  alt: string;
  accent: PromoAccent;
  /**
   * Sağ üstte dönen küçük "canlı" bilgisi (ör. "Kontenjan sınırlı").
   * Boş bırakılabilir.
   */
  note?: string;
}

/**
 * Tailwind v4, sınıf adlarını kaynak dosyalarda DÜZ METİN olarak arar.
 * `text-${accent}` gibi çalışma anında birleştirilen bir ad asla üretilmez —
 * ve varyantlı hali (`hover:${glow}`) de öyle. Bu yüzden hover/group-hover
 * dahil her sınıf aşağıda TAM haliyle yazılıdır; bileşenlerde bu değerler
 * yalnızca olduğu gibi yerleştirilir, parça birleştirilmez.
 */
export const ACCENT_CLASSES: Record<
  PromoAccent,
  {
    text: string;
    /** `group-hover:text-*` — kart üzerine gelince başlığın rengi. */
    textGroupHover: string;
    bg: string;
    bgSoft: string;
    border: string;
    /** `hover:shadow-*` — kartın renkli gölge parlaması. */
    glowHover: string;
    /** Vurgu renginin ÜZERİNDEKİ metin rengi (rozet, buton). */
    onAccent: string;
  }
> = {
  teal:   { text: "text-teal",   textGroupHover: "group-hover:text-teal",   bg: "bg-teal",   bgSoft: "bg-teal/10",   border: "border-teal/30",   glowHover: "hover:shadow-teal/25",   onAccent: "text-anthracite-dark" },
  gold:   { text: "text-gold",   textGroupHover: "group-hover:text-gold",   bg: "bg-gold",   bgSoft: "bg-gold/10",   border: "border-gold/30",   glowHover: "hover:shadow-gold/25",   onAccent: "text-anthracite-dark" },
  coral:  { text: "text-coral",  textGroupHover: "group-hover:text-coral",  bg: "bg-coral",  bgSoft: "bg-coral/10",  border: "border-coral/30",  glowHover: "hover:shadow-coral/25",  onAccent: "text-anthracite-dark" },
  amber:  { text: "text-amber",  textGroupHover: "group-hover:text-amber",  bg: "bg-amber",  bgSoft: "bg-amber/10",  border: "border-amber/30",  glowHover: "hover:shadow-amber/25",  onAccent: "text-anthracite-dark" },
  indigo: { text: "text-indigo", textGroupHover: "group-hover:text-indigo", bg: "bg-indigo", bgSoft: "bg-indigo/10", border: "border-indigo/30", glowHover: "hover:shadow-indigo/25", onAccent: "text-anthracite-dark" },
  rose:   { text: "text-rose",   textGroupHover: "group-hover:text-rose",   bg: "bg-rose",   bgSoft: "bg-rose/10",   border: "border-rose/30",   glowHover: "hover:shadow-rose/25",   onAccent: "text-anthracite-dark" },
  sky:    { text: "text-sky",    textGroupHover: "group-hover:text-sky",    bg: "bg-sky",    bgSoft: "bg-sky/10",    border: "border-sky/30",    glowHover: "hover:shadow-sky/25",    onAccent: "text-anthracite-dark" },
  lime:   { text: "text-lime",   textGroupHover: "group-hover:text-lime",   bg: "bg-lime",   bgSoft: "bg-lime/10",   border: "border-lime/30",   glowHover: "hover:shadow-lime/25",   onAccent: "text-anthracite-dark" },
};

export const PROMOS: Promo[] = [
  {
    id: "kurs-kayit",
    badge: "Kayıtlar Açık",
    title: "Yeni Dönem Kursları Başlıyor",
    desc: "Hacamat, sülük terapisi, akupunktur ve manuel sınıkçı programlarına kayıtlar devam ediyor.",
    cta: "Kayıt & Bilgi Al",
    href: academyHref(),
    image: "/4.webp",
    alt: "Ebusadullah Akademi hacamat kursu — eğitmen gözetiminde uygulamalı ders",
    accent: "gold",
    note: "Kontenjan sınırlı",
  },
  {
    id: "randevu",
    badge: "Randevu",
    title: "Seans Takvimi Açıldı",
    desc: "Konya Meram'daki uygulama randevunuzu takvimden seçin, faziletli günleri kaçırmayın.",
    cta: "Takvime Git",
    href: "/takvim",
    image: "/1.webp",
    alt: "Konya Meram'da steril hacamat uygulaması — randevulu seans",
    accent: "teal",
  },
  {
    id: "almanya",
    badge: "Yurt Dışı",
    title: "Almanya Seansları",
    desc: "Frankfurt, Köln ve Stuttgart çevresinde yılda 2–3 dönem uygulama ve eğitim programı.",
    cta: "Tarihleri Gör",
    href: "/almanya-hacamat",
    image: "/8.webp",
    alt: "Almanya'da düzenlenen hacamat uygulama ve eğitim programı",
    accent: "indigo",
    note: "Yılda 2–3 dönem",
  },
  {
    id: "suluk-satis",
    badge: "81 İl Kargo",
    title: "Canlı Tıbbi Sülük Satışı",
    desc: "Hirudo medicinalis, tek kullanımlık ve sertifikalı. Türkiye geneli soğuk zincir kargo.",
    cta: "Sipariş & Fiyat",
    href: "/suluk-satisi",
    image: "/6.webp",
    alt: "Tıbbi sülük (Hirudo medicinalis) — hirudoterapi uygulaması için steril hazırlık",
    accent: "lime",
  },
  {
    id: "malzeme",
    badge: "Toptan Mevcut",
    title: "Hacamat Kupaları & Setler",
    desc: "CE sertifikalı vakum kupaları, steril lanseler ve profesyonel uygulama setleri.",
    cta: "Ürünleri İncele",
    href: "/malzemeler",
    image: "/3.webp",
    alt: "Profesyonel hacamat kupaları ve steril vakum seti malzemeleri",
    accent: "sky",
  },
  {
    id: "suluk-terapi",
    badge: "Uzmanlık Alanı",
    title: "Sülük Terapisi (Hirudoterapi)",
    desc: `${getYearsExpStr()} yıllık deneyimle tek kullanımlık steril tıbbi sülük uygulaması.`,
    cta: "Detaylı Bilgi",
    href: "/hizmetler/suluk",
    image: "/7.webp",
    alt: "Sülük terapisi (hirudoterapi) seansı — Konya Ebusadullah Hacamat & Akademi",
    accent: "coral",
  },
  {
    id: "hacamat-kursu-iller",
    badge: "Türkiye Geneli",
    title: "İlinizde Hacamat Kursu",
    desc: "81 ilde geçerli sertifikalı program; şehrinize özel takvim ve içerik.",
    cta: "İlini Seç",
    href: academyHubHref(),
    image: "/5.webp",
    alt: "81 ilde hacamat kursu — uygulamalı sertifika programı",
    accent: "amber",
  },
  {
    id: "blog",
    badge: "Bilgi Merkezi",
    title: "Hacamat & Sülük Rehberi",
    desc: "Uygulama öncesi hazırlık, sonrası bakım ve sık sorulan sorular tek yerde.",
    cta: "Yazıları Oku",
    href: "/blog",
    image: "/11.webp",
    alt: "Hacamat ve sülük terapisi bilgi rehberi yazıları",
    accent: "rose",
  },
];

/** Kimliğe göre promo getirir. */
export function getPromo(id: string): Promo | undefined {
  return PROMOS.find((p) => p.id === id);
}

/**
 * Verilen kimlikleri sırayla döndürür; bulunamayan kimlik sessizce atlanır.
 * Sayfalar "şu 3 promoyu göster" derken bunu kullanır.
 */
export function pickPromos(...ids: string[]): Promo[] {
  return ids.map(getPromo).filter((p): p is Promo => Boolean(p));
}

/**
 * Bir sayfanın KENDİ promosunu göstermemesi için filtre.
 * (Sülük sayfasının kenarında "Sülük Terapisi" reklamı anlamsız.)
 */
export function promosExcept(excludeIds: string[], limit?: number): Promo[] {
  const list = PROMOS.filter((p) => !excludeIds.includes(p.id));
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/**
 * Kayan duyuru bandının metinleri. Promo başlıklarından türetilmez —
 * bant çok daha kısa ve tempolu bir dil ister.
 */
export const TICKER_ITEMS: { text: string; accent: PromoAccent; href: string }[] = [
  { text: "Yeni dönem kursları başladı", accent: "gold", href: academyHref() },
  { text: "Kayıtlar devam ediyor · Kontenjan sınırlı", accent: "coral", href: academyHref() },
  { text: "Randevu takvimi açık", accent: "teal", href: "/takvim" },
  { text: "81 ile canlı tıbbi sülük kargosu", accent: "lime", href: "/suluk-satisi" },
  { text: "Almanya seans tarihleri güncellendi", accent: "indigo", href: "/almanya-hacamat" },
  { text: "Kupa & malzeme setlerinde toptan seçenek", accent: "sky", href: "/malzemeler" },
  { text: "1200+ mezun · Kurum sertifikalı program", accent: "amber", href: academyHref() },
];
