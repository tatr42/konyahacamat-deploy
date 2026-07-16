/**
 * pSEO içerik motoru — "doorway" (kapı sayfası) riskine karşı savunma katmanı.
 *
 * Amaç: her il/ilçe sayfasının SADECE şehir adı değişen bir kopya olmaması.
 * Bu modül, her lokasyon için GERÇEK ve değişken bilgi üretir:
 *   - Konya merkeze göre kargo bölgesi + tahmini süre
 *   - En yakın yüz yüze hizmet mantığı (merkez = Konya)
 *   - Bölgeye özel ifadeler
 *   - Hizmet tipine özel, lokasyonla harmanlanmış açıklama & SSS
 *
 * Kaynak gerçekler (kullanıcı teyidi):
 *   - Ürünler (sülük, kupa/hacamat malzemeleri) tüm Türkiye'ye kargo
 *   - Hacamat kursu online/uzaktan → her şehirden erişilebilir
 *   - Yüz yüze uygulama merkezi: Konya
 *   - Yurtdışı (Almanya) seansları da mevcut
 */

import type { Province, District, Region } from "@/data/tr-locations";
import { dative, locative } from "@/lib/pseo/turkish";

export type ServiceType =
  | "hacamat-kursu"
  | "suluk-satisi"
  | "kupa-malzemeleri"
  | "hacamat-nedir"
  | "suluk-nedir";

/** Tüm hizmet tipleri — route üretimi ve iç linkleme için sabit sıra. */
export const ALL_SERVICES: ServiceType[] = [
  "hacamat-kursu",
  "suluk-satisi",
  "kupa-malzemeleri",
  "hacamat-nedir",
  "suluk-nedir",
];

/** Hizmet tipinin insan-okur etiketi (breadcrumb, link metni). */
export const SERVICE_LABEL: Record<ServiceType, string> = {
  "hacamat-kursu": "Hacamat Kursu",
  "suluk-satisi": "Sülük Satışı",
  "kupa-malzemeleri": "Hacamat Malzemeleri",
  "hacamat-nedir": "Hacamat Nedir",
  "suluk-nedir": "Sülük Nedir",
};

/** Dizin (hub) sayfasının kahraman/SEO metinleri. */
export interface HubCopy {
  badge: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
}

export const HUB_COPY: Record<ServiceType, HubCopy> = {
  "hacamat-kursu": {
    badge: "81 İl · Online Sertifikalı Eğitim",
    h1: "Hacamat Kursu — Tüm Türkiye",
    seoTitle: "Hacamat Kursu | 81 İlde Sertifikalı Online Eğitim — Ebusadullah Akademi",
    seoDescription:
      "Türkiye'nin 81 ilinde ve ilçelerinde hacamat (kupa terapisi) kursu. Sertifikalı, online/uzaktan eğitim, 32+ yıl tecrübe. Bulunduğunuz ili seçin.",
    intro:
      "Ebusadullah Hacamat & Akademi'nin sertifikalı hacamat kursu, Türkiye'nin tamamına online/uzaktan sunulur. Aşağıdan ilinizi ve ilçenizi seçerek bölgenize özel bilgi, kargo süresi ve kayıt seçeneklerine ulaşabilirsiniz.",
  },
  "suluk-satisi": {
    badge: "81 İl · Hızlı & Güvenli Kargo",
    h1: "Sülük Satışı — Tüm Türkiye",
    seoTitle: "Sülük Satışı | 81 İle Tıbbi Sülük Kargo — Ebusadullah",
    seoDescription:
      "Türkiye'nin 81 iline ve ilçelerine sağlıklı, bakımlı tıbbi sülük (Hirudo) satışı. Konya'dan güvenli canlı kargo. İlinizi seçin, teslim süresini görün.",
    intro:
      "Bakımlı ve uygulamaya hazır tıbbi sülükleri Konya merkezimizden Türkiye'nin her iline ve ilçesine güvenle gönderiyoruz. İlinizi seçerek bölgenize özel kargo süresini ve sipariş bilgisini görüntüleyin.",
  },
  "kupa-malzemeleri": {
    badge: "81 İl · CE Sertifikalı Steril Set",
    h1: "Hacamat & Kupa Malzemeleri — Tüm Türkiye",
    seoTitle: "Hacamat Malzemeleri | 81 İle Steril Kupa & Vantuz Kargo",
    seoDescription:
      "Türkiye'nin 81 iline ve ilçelerine CE sertifikalı hacamat ve kupa malzemeleri: steril vantuz seti, tek kullanımlık bistüri, pompa. İlinizi seçin.",
    intro:
      "CE sertifikalı, steril hacamat ve kupa (vantuz) malzemelerimizi Konya'dan Türkiye geneline kargoluyoruz. İlinizi ve ilçenizi seçerek bölgenize özel teslimat ve sipariş bilgisine ulaşın.",
  },
  "hacamat-nedir": {
    badge: "İl İl Bilgi Rehberi",
    h1: "Hacamat Nedir? — İl İl Rehber",
    seoTitle: "Hacamat Nedir, Nasıl Yapılır? | 81 İl Rehberi — Ebusadullah Akademi",
    seoDescription:
      "Hacamat (kupa terapisi / hijama) nedir, nasıl yapılır, kimlere uygulanır? 81 il için hizmet ve eğitim bilgileriyle kapsamlı rehber.",
    intro:
      "Hacamat, belirli noktalardan kontrollü kan alma esasına dayanan geleneksel bir yöntemdir. Aşağıdan ilinizi seçerek hacamatın ne olduğunu ve bölgenizde sunduğumuz hizmet/eğitim seçeneklerini inceleyebilirsiniz.",
  },
  "suluk-nedir": {
    badge: "İl İl Bilgi Rehberi",
    h1: "Sülük Tedavisi Nedir? — İl İl Rehber",
    seoTitle: "Sülük Tedavisi Nedir, Ne İşe Yarar? | 81 İl Rehberi — Ebusadullah",
    seoDescription:
      "Sülük (hirudoterapi) tedavisi nedir, nasıl uygulanır, faydaları nelerdir? 81 il için sülük tedariki ve bilgi rehberi.",
    intro:
      "Sülük tedavisi (hirudoterapi), tıbbi sülüğün salgıladığı doğal maddelerden yararlanan geleneksel bir yöntemdir. İlinizi seçerek konuyu ve bölgenize sülük teminini inceleyebilirsiniz.",
  },
};

export const WHATSAPP = "905544062383";
export const PHONE_DISPLAY = "0554 406 23 83";

/** Konya merkezden bölgelere kaba kargo süresi (iş günü). */
const CARGO_DAYS: Record<Region, string> = {
  "İç Anadolu": "1 iş günü",
  Ege: "1-2 iş günü",
  Akdeniz: "1-2 iş günü",
  Marmara: "1-2 iş günü",
  Karadeniz: "2 iş günü",
  "Doğu Anadolu": "2-3 iş günü",
  "Güneydoğu Anadolu": "2-3 iş günü",
};

/** Konya'nın kendi bölgesi — "aynı bölge" ifadeleri için. */
const HOME_REGION: Region = "İç Anadolu";

export interface LocationCtx {
  province: Province;
  district?: District;
  /** Görünen tam ad — "Konya" veya "Konya / Selçuklu" */
  full: string;
  /** Sadece en spesifik ad — "Selçuklu" veya "Konya" */
  place: string;
  isKonya: boolean;
  isDistrict: boolean;
}

export function buildLocationCtx(
  province: Province,
  district?: District,
): LocationCtx {
  return {
    province,
    district,
    full: district ? `${province.name} / ${district.name}` : province.name,
    place: district ? district.name : province.name,
    isKonya: province.slug === "konya",
    isDistrict: Boolean(district),
  };
}

/** Kargo süresi cümlesi — lokasyona göre değişken. */
export function cargoLine(ctx: LocationCtx): string {
  if (ctx.isKonya) {
    return "Konya içi teslimat aynı gün / bir sonraki iş günü mümkündür; merkezimizden elden teslim de yapılabilir.";
  }
  const days = CARGO_DAYS[ctx.province.region];
  const sameRegion = ctx.province.region === HOME_REGION;
  const regionNote = sameRegion
    ? `${ctx.province.name}, merkezimizle aynı bölgede (${ctx.province.region}) olduğundan gönderiler hızlı ulaşır.`
    : `${ctx.province.name} (${ctx.province.region}) için kargo, Konya merkezimizden yola çıkar.`;
  return `${regionNote} Ortalama teslim süresi ${days}. Kapıda ödeme ve anlaşmalı kargo seçenekleri mevcuttur.`;
}

/** Yüz yüze / uzaktan hizmet mantığı — lokasyona göre değişken. */
export function serviceReachLine(ctx: LocationCtx): string {
  if (ctx.isKonya) {
    return "Konya, yüz yüze uygulama merkezimizin bulunduğu ildir; seanslar randevu ile merkezimizde yapılır.";
  }
  const days = CARGO_DAYS[ctx.province.region];
  return `${ctx.place} için hacamat kursumuz online/uzaktan yürütülür; sertifika ve uygulama setleri ${days} içinde adresinize kargolanır. Yüz yüze uygulama için en yakın merkezimiz Konya'dadır. Ayrıca Almanya seanslarımız da mevcuttur.`;
}

interface ServiceCopy {
  /** Sayfa H1 üreticisi */
  h1: (ctx: LocationCtx) => string;
  /** SEO başlık (<title>) */
  seoTitle: (ctx: LocationCtx) => string;
  /** SEO açıklama */
  seoDescription: (ctx: LocationCtx) => string;
  /** Giriş paragrafı */
  intro: (ctx: LocationCtx) => string;
  /** Hizmete özel SSS (lokasyonla harmanlanır) */
  faq: (ctx: LocationCtx) => { q: string; a: string }[];
  /** Ana CTA metni */
  cta: (ctx: LocationCtx) => string;
}

const SERVICE_COPY: Record<ServiceType, ServiceCopy> = {
  "hacamat-kursu": {
    h1: (c) => `${c.place} Hacamat Kursu`,
    seoTitle: (c) =>
      `${c.full} Hacamat Kursu | Sertifikalı Online Eğitim — Ebusadullah Akademi`,
    seoDescription: (c) =>
      `${c.place} hacamat kursu: sertifikalı, online/uzaktan hacamat (kupa terapisi) eğitimi. 32+ yıl tecrübe, uygulamalı içerik, malzeme desteği. Kayıt: ${PHONE_DISPLAY}`,
    intro: (c) =>
      `${c.full} bölgesinden hacamat (kupa terapisi) eğitimi almak isteyenler için Ebusadullah Hacamat & Akademi'nin sertifikalı kursu online olarak sunulur. ${serviceReachLine(c)}`,
    faq: (c) => [
      {
        q: `${locative(c.place)} yüz yüze hacamat kursu var mı?`,
        a: c.isKonya
          ? "Konya'da yüz yüze eğitim ve uygulama merkezimizde randevu ile mümkündür."
          : `${c.place} için eğitim online yürütülür; uygulamalı bölüm için Konya'daki merkezimize gelinebilir veya video destekli uzaktan takip sağlanır.`,
      },
      {
        q: "Kurs sonunda sertifika veriliyor mu?",
        a: "Evet, eğitimi tamamlayan katılımcılara katılım/başarı belgesi verilir.",
      },
      {
        q: `${dative(c.place)} eğitim seti kargolanıyor mu?`,
        a: cargoLine(c),
      },
    ],
    cta: (c) => `${c.place} Hacamat Kursu Kayıt`,
  },
  "suluk-satisi": {
    h1: (c) => `${c.place} Sülük Satışı`,
    seoTitle: (c) =>
      `${c.full} Sülük Satışı | Tıbbi Sülük — Hızlı Kargo | Ebusadullah`,
    seoDescription: (c) =>
      `${c.place} sülük satışı: sağlıklı, bakımlı tıbbi sülük (Hirudo). Konya'dan ${c.place} adresine güvenli kargo. Sipariş ve bilgi: ${PHONE_DISPLAY}`,
    intro: (c) =>
      `${c.full} için tıbbi sülük (Hirudo medicinalis) tedariki Ebusadullah güvencesiyle yapılır. ${cargoLine(c)}`,
    faq: (c) => [
      {
        q: `${dative(c.place)} sülük nasıl gönderiliyor?`,
        a: `Sülükler, canlı taşımaya uygun özel ambalajla kargolanır. ${cargoLine(c)}`,
      },
      {
        q: "Sülükler bakımlı ve aç mı?",
        a: "Evet, gönderilen tıbbi sülükler bakımlı, uygulamaya hazır ve aç durumdadır.",
      },
      {
        q: "Kaç adet sipariş verebilirim?",
        a: `Bireysel ve toplu (uygulayıcı/kurum) siparişler için WhatsApp'tan ${PHONE_DISPLAY} bize yazabilirsiniz.`,
      },
    ],
    cta: (c) => `${c.place} Sülük Sipariş`,
  },
  "kupa-malzemeleri": {
    h1: (c) => `${c.place} Hacamat & Kupa Malzemeleri`,
    seoTitle: (c) =>
      `${c.full} Hacamat Malzemeleri | Steril Kupa & Vantuz Set — Kargo`,
    seoDescription: (c) =>
      `${c.place} hacamat ve kupa malzemeleri: CE sertifikalı steril vantuz seti, tek kullanımlık bistüri, pompa. Konya'dan ${c.place}'e kargo. Sipariş: ${PHONE_DISPLAY}`,
    intro: (c) =>
      `${c.full} bölgesine profesyonel hacamat ve kupa (vantuz) malzemeleri gönderiyoruz: CE sertifikalı steril setler, tek kullanımlık bistüri ve pompa dâhil. ${cargoLine(c)}`,
    faq: (c) => [
      {
        q: `${dative(c.place)} hangi malzemeler kargolanıyor?`,
        a: "Steril vantuz/kupa setleri, tek kullanımlık bistüri, manuel ve elektrikli pompa, sülük bakım seti dâhil tüm ürünler gönderilir.",
      },
      {
        q: "Malzemeler CE sertifikalı mı?",
        a: "Evet, sunduğumuz hacamat malzemeleri CE sertifikalı ve steril ambalajlıdır.",
      },
      {
        q: `${dative(c.place)} teslimat ne kadar sürer?`,
        a: cargoLine(c),
      },
    ],
    cta: (c) => `${c.place} Malzeme Sipariş`,
  },
  "hacamat-nedir": {
    h1: (c) => `Hacamat Nedir? — ${c.place} Rehberi`,
    seoTitle: (c) =>
      `Hacamat Nedir, Nasıl Yapılır? ${c.place} | Ebusadullah Akademi`,
    seoDescription: (c) =>
      `Hacamat (kupa terapisi) nedir, nasıl yapılır, kimlere uygulanır? ${c.place} için hizmet ve eğitim bilgileriyle kapsamlı rehber. Danışma: ${PHONE_DISPLAY}`,
    intro: (c) =>
      `Hacamat (kupa terapisi / hijama), belirli noktalardan kontrollü kan alma yöntemidir. Bu rehber, ${c.full} bölgesindeki okuyucular için hacamatın ne olduğunu ve bölgede sunduğumuz hizmet/eğitim seçeneklerini açıklar. ${serviceReachLine(c)}`,
    faq: (c) => [
      {
        q: "Hacamat ne işe yarar?",
        a: "Geleneksel uygulamada dolaşımı desteklemek ve vücuttaki durgun kanı boşaltmak amacıyla kullanılır. Tıbbi tanı/tedavi yerine geçmez.",
      },
      {
        q: `${locative(c.place)} hacamat hizmeti alabilir miyim?`,
        a: serviceReachLine(c),
      },
    ],
    cta: (c) => `${c.place} İçin Danışma / Randevu`,
  },
  "suluk-nedir": {
    h1: (c) => `Sülük Tedavisi Nedir? — ${c.place} Rehberi`,
    seoTitle: (c) =>
      `Sülük Tedavisi Nedir, Ne İşe Yarar? ${c.place} | Ebusadullah`,
    seoDescription: (c) =>
      `Sülük (hirudoterapi) tedavisi nedir, nasıl uygulanır, faydaları nelerdir? ${c.place} için sülük tedariki ve bilgi. Danışma: ${PHONE_DISPLAY}`,
    intro: (c) =>
      `Sülük tedavisi (hirudoterapi), tıbbi sülüğün salgıladığı doğal maddelerden yararlanan geleneksel bir yöntemdir. Bu rehber ${c.full} okuyucuları için hazırlanmıştır. ${cargoLine(c)}`,
    faq: (c) => [
      {
        q: "Sülük tedavisi nasıl uygulanır?",
        a: "Tıbbi sülük, uygun noktaya yerleştirilir ve kontrollü şekilde emmesi sağlanır. Uygulama eğitimli kişilerce yapılmalıdır.",
      },
      {
        q: `${dative(c.place)} sülük temini mümkün mü?`,
        a: cargoLine(c),
      },
    ],
    cta: (c) => `${c.place} İçin Sülük Danışma`,
  },
};

export function getServiceCopy(service: ServiceType): ServiceCopy {
  return SERVICE_COPY[service];
}

const WA_LABELS: Record<ServiceType, string> = {
  "hacamat-kursu": "hacamat kursu",
  "suluk-satisi": "sülük siparişi",
  "kupa-malzemeleri": "hacamat/kupa malzemeleri",
  "hacamat-nedir": "hacamat hizmeti",
  "suluk-nedir": "sülük tedavisi",
};

/** WhatsApp ön dolgulu mesaj metni — link ve form aynı metinden beslenir. */
export function waMessage(service: ServiceType, ctx: LocationCtx): string {
  return `Merhaba, ${ctx.full} için ${WA_LABELS[service]} hakkında bilgi almak istiyorum.`;
}

/** WhatsApp derin bağlantısı — ön dolgulu mesajla. */
export function whatsappLink(service: ServiceType, ctx: LocationCtx): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waMessage(service, ctx))}`;
}

// ─── Yerel dönüşüm bandı (LocalContactCta) metinleri ─────────────────────

const CTA_LINE: Record<ServiceType, string> = {
  "hacamat-kursu": "Hacamat Kursu Hattı",
  "suluk-satisi": "Sülük Sipariş Hattı",
  "kupa-malzemeleri": "Malzeme Sipariş Hattı",
  "hacamat-nedir": "Hacamat Danışma Hattı",
  "suluk-nedir": "Sülük Danışma Hattı",
};

export interface LocalCtaCopy {
  title: string;
  subtitle: string;
  waPrefix: string;
}

/** Sayfa sonu dönüşüm bandının lokasyona özel metinleri. */
export function localCtaCopy(service: ServiceType, ctx: LocationCtx): LocalCtaCopy {
  const subtitle = ctx.isKonya
    ? `${ctx.full} bölgesindesiniz — merkezimiz ayağınızın dibinde. Arayın, aynı gün randevu ve elden teslim seçeneklerini konuşalım.`
    : `${ctx.full} bölgesinden arayanlara aynı gün dönüş yapıyoruz. Telefonla ulaşın veya WhatsApp'tan yazın; kargo, fiyat ve uygun tarih sorularınızı dakikalar içinde yanıtlayalım.`;
  return {
    title: `${ctx.place} ${CTA_LINE[service]}`,
    subtitle,
    waPrefix: waMessage(service, ctx),
  };
}

// ─── Kapak görseli ────────────────────────────────────────────────────────

export interface ServiceImage {
  src: string;
  width: number;
  height: number;
}

/**
 * Hizmet → kapak görseli eşlemesi. Şimdilik hepsi tek profesyonel fotoğraf
 * (public/5.webp — steril kupa uygulaması); hizmete özel yüksek çözünürlüklü
 * görsel eklendiğinde SADECE burası değişir. (public/9.webp'deki sülük
 * fotoğrafı 355×142 — kapak için düşük çözünürlüklü, bilinçli kullanılmadı.)
 */
export const SERVICE_IMAGE: Record<ServiceType, ServiceImage> = {
  "hacamat-kursu": { src: "/5.webp", width: 700, height: 500 },
  "suluk-satisi": { src: "/5.webp", width: 700, height: 500 },
  "kupa-malzemeleri": { src: "/5.webp", width: 700, height: 500 },
  "hacamat-nedir": { src: "/5.webp", width: 700, height: 500 },
  "suluk-nedir": { src: "/5.webp", width: 700, height: 500 },
};

/** Lokasyona özel görsel alt metni — ör. "Kadıköy Hacamat Kursu — Ebusadullah Akademi". */
export function imageAlt(service: ServiceType, ctx: LocationCtx): string {
  return `${ctx.full} ${SERVICE_LABEL[service]} — Ebusadullah Hacamat & Akademi`;
}
