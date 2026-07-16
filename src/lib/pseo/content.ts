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
import { pickOne, pickDistinct } from "@/lib/pseo/deterministic";

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
// Görsel havuzu ve deterministik seçim lib/pseo/images.ts içindedir.

/**
 * Lokasyona özel görsel alt metni.
 * Kullanıcı isteği gereği hizmet + "ve Malzemeleri" kalıbı, ör:
 * "Kadıköy Hacamat Kursu ve Malzemeleri — Ebusadullah Hacamat & Akademi".
 * Etiket zaten "Malzemeleri" içeriyorsa tekrar eklenmez.
 */
export function imageAlt(service: ServiceType, ctx: LocationCtx): string {
  const label = SERVICE_LABEL[service];
  const suffix = label.includes("Malzemeleri") ? "" : " ve Malzemeleri";
  return `${ctx.full} ${label}${suffix} — Ebusadullah Hacamat & Akademi`;
}

// ─── 3'lü görsel galerisi alt metinleri ──────────────────────────────────
// Galerideki her görsel farklı, betimleyici ve lokasyona özel bir alt alır
// (hem erişilebilirlik hem SEO için). Örn: "Kadıköy hacamat kursu — ...".

const TRIO_ALT: Record<ServiceType, ((c: LocationCtx) => string)[]> = {
  "hacamat-kursu": [
    (c) => `${c.place} hacamat kursu — uygulamalı eğitim seansı`,
    (c) => `${c.place} için steril kupa (vantuz) uygulaması`,
    (c) => `${c.place} hacamat eğitim seti ve malzemeleri`,
  ],
  "suluk-satisi": [
    (c) => `${c.place} için tıbbi sülük — bakımlı ve uygulamaya hazır`,
    (c) => `${c.place} sülük siparişi — doğal hirudoterapi`,
    (c) => `${c.place} adresine canlı sülük kargo paketi`,
  ],
  "kupa-malzemeleri": [
    (c) => `${c.place} için CE sertifikalı steril kupa/vantuz seti`,
    (c) => `${c.place} hacamat malzemeleri — pompa ve ekipman`,
    (c) => `${c.place} adresine steril ambalajlı malzeme kargosu`,
  ],
  "hacamat-nedir": [
    (c) => `${c.place} — hacamat (kupa terapisi) uygulaması`,
    (c) => `${c.place} için hacamat noktaları ve steril uygulama`,
    (c) => `${c.place} hacamat malzemeleri ve ekipmanları`,
  ],
  "suluk-nedir": [
    (c) => `${c.place} — sülük tedavisi (hirudoterapi) tanıtımı`,
    (c) => `${c.place} için doğal sülük uygulaması`,
    (c) => `${c.place} adresine tıbbi sülük temini`,
  ],
};

/** 3'lü galeri için lokasyona + hizmete özel alt metin dizisi. */
export function imageTrioAlts(service: ServiceType, ctx: LocationCtx): string[] {
  return TRIO_ALT[service].map((f) => f(ctx));
}

// ─── Derin içerik blokları (600+ kelime motoru) ──────────────────────────
// Her blok lokasyona göre GERÇEK ve değişken bilgi üretir; deterministik
// varyantlarla komşu ilçeler bile birbirinin kopyası gibi görünmez.

export interface ContentBlock {
  title: string;
  paragraphs: string[];
}

/** Deterministik varyant anahtarı — aynı lokasyon hep aynı varyantı alır. */
function variantKey(service: ServiceType, ctx: LocationCtx, salt: string): string {
  return `${service}|${salt}|${ctx.province.plate}|${ctx.district?.slug ?? ""}`;
}

/**
 * Dinamik kargo / sipariş güvencesi — coğrafi bölgeye göre kutulama ve
 * (sülükte) canlı kalma garantisi metni.
 */
export function shippingAssuranceBlock(
  service: ServiceType,
  c: LocationCtx,
): ContentBlock {
  const days = c.isKonya ? "aynı gün veya ertesi iş günü" : CARGO_DAYS[c.province.region];
  const far =
    c.province.region === "Doğu Anadolu" || c.province.region === "Güneydoğu Anadolu";
  const isLeech = service === "suluk-satisi" || service === "suluk-nedir";
  const isMaterial = service === "kupa-malzemeleri";
  const isCourse = service === "hacamat-kursu";

  const geoIntro = pickOne(
    [
      `${c.full} (${c.province.region}) bölgesine gönderilerimiz Konya merkezimizden ${days} içinde ulaşır.`,
      `${c.place} için siparişler Konya'daki merkezimizden hazırlanıp ${days} içinde ${c.province.region} bölgesine teslim edilir.`,
      `Konya merkezimizden çıkan ${c.place} gönderileri ${c.province.region} hattında ortalama ${days} içinde elinize geçer.`,
    ],
    variantKey(service, c, "ship"),
  );

  const packaging = isLeech
    ? `Canlı sülükler; oksijen tutan klorsuz su, sızdırmaz iç kap ve yalıtımlı strafor kutu ile paketlenir. ${
        far
          ? "Uzak bölgelere gönderimde mevsime göre ilave termal yalıtım (jel-buz veya ısı koruması) uygulayarak canlı kalmayı güvence altına alıyoruz."
          : "Mevsim koşullarına göre ısı dengeleyici ekleyerek sülüklerin yolculuk boyunca canlı ve dinç kalmasını sağlıyoruz."
      }`
    : isMaterial
      ? `Steril ürünler ambalajı bozulmadan, cam kupalar ise darbeye dayanıklı köpük ve çift katmanlı kutulama ile korunur. ${
          far
            ? "Uzak mesafeli gönderilerde kırılma riskine karşı ekstra dolgu kullanıyoruz."
            : "Kısa mesafede bile hasarsız teslim için standart olarak koruyucu kutulama yapıyoruz."
        }`
      : isCourse
        ? `Kursla birlikte gönderdiğimiz uygulama seti; steril malzemeler ve kesici uçlar zarar görmeyecek şekilde ayrı ayrı ambalajlanır. Böylece eğitime ilk günden uygulamalı başlayabilirsiniz.`
        : `Ürün gönderimlerimizde steril ambalaj bütünlüğü korunur; cam ve kesici parçalar ayrı koruma ile paketlenir.`;

  const guarantee = pickOne(
    [
      `${
        far ? "Uzak bölge olmasına rağmen " : ""
      }kapıda ödeme ve anlaşmalı kargo seçenekleriyle ${c.place} için güvenli teslimat sunuyoruz. Teslim anında paketi kontrol etmeniz yeterlidir.`,
      `${c.place} için kapıda ödeme, havale/EFT ve anlaşmalı kargo seçenekleri mevcuttur; olası bir sorunda hızlıca çözüm sağlıyoruz.`,
    ],
    variantKey(service, c, "guar"),
  );

  const title = isLeech
    ? `${c.place} Sülük Kargosu & Canlı Kalma Güvencesi`
    : isCourse
      ? `${c.place} Eğitim Seti Kargosu`
      : `${c.place} Kargo & Kutulama Güvencesi`;

  const tracking = `Gönderi hazırlandığında kargo takip numarasını sizinle paylaşıyoruz; ${c.place} için tahmini teslim gününü önceden bildiriyor, gerektiğinde kurye ile koordinasyonu biz sağlıyoruz. Böylece paketinizin nerede olduğunu adım adım takip edebilirsiniz.`;

  return { title, paragraphs: [`${geoIntro} ${packaging}`, tracking, guarantee] };
}

/**
 * Hacamat / sülük uygulama noktaları ön bilgisi — lokasyona göre çerçevelenmiş,
 * tıbbi tavsiye içermeyen eğitici bir önizleme.
 */
export function pointsAtlasBlock(service: ServiceType, c: LocationCtx): ContentBlock {
  const isLeech = service === "suluk-satisi" || service === "suluk-nedir";
  if (isLeech) {
    const intro = pickOne(
      [
        `Sülük tedavisi (hirudoterapi), tıbbi sülüğün şikâyete göre belirlenen bölgesel noktalara uygulanmasıyla yapılır.`,
        `Hirudoterapide sülük, uygulama planına göre seçilen bölgesel noktalara yerleştirilir.`,
      ],
      variantKey(service, c, "pts"),
    );
    return {
      title: `${c.place} İçin Sülük Uygulama Bölgeleri — Ön Bilgi`,
      paragraphs: [
        `${intro} Uygulama bölgeleri; hedeflenen etki, kişinin durumu ve uzman değerlendirmesine göre değişir. ${c.full} bölgesinden gelen sorularda genel çerçeveyi paylaşıyor, kişiye özel planı ise değerlendirmeyle belirliyoruz.`,
        `Uygulamada her sülük tek kullanımlıktır ve steril koşullarda çalışılır. İşlem sonrası bölgede küçük bir emme izi ve hafif kaşıntı olması normaldir; bunlar genellikle kısa sürede geçer. İlk kez deneyecek olanlara süreci adım adım anlatıyor, öncesi ve sonrasında dikkat edilmesi gerekenleri paylaşıyoruz.`,
        `Bu bilgi yalnızca ön bilgilendirme amaçlıdır; tıbbi tanı veya tedavi yerine geçmez. Uygulama, steril koşullarda ve eğitimli kişilerce yapılmalıdır.`,
      ],
    };
  }
  const intro = pickOne(
    [
      `Hacamat uygulamasında noktalar rastgele değil; sünnette bildirilen kâhil (ense-omuz) bölgesi başta olmak üzere bir "harita" mantığıyla belirlenir.`,
      `Hacamat noktaları; kâhil (ense-omuz) bölgesi, sırt ve bele ek olarak şikâyete göre seçilen bölgesel noktalardan oluşan bir atlas mantığıyla çalışır.`,
    ],
    variantKey(service, c, "pts"),
  );
  return {
    title: `${c.place} İçin Hacamat Noktaları — Ön Bilgi`,
    paragraphs: [
      `${intro} Doğru nokta seçimi, hijyen ve vakum-çizik tekniği uygulamanın en kritik parçalarıdır. ${c.full} için danışmada, ilgilendiğiniz konuya göre uygun noktalar ve dikkat edilecekler hakkında genel bilgi veriyoruz.`,
      `Uygulama öncesinde bölge steril edilir, işlem sonrasında ise basit bir bakım yapılır. İlk kez hacamat yaptıracaklar için süreci baştan sona anlatıyor, hangi noktaların neden seçildiğini ve sonrasında nelere dikkat edilmesi gerektiğini ${c.place} özelinde önceden yanıtlıyoruz.`,
      `Bu içerik ön bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez. Hacamat, endikasyon-kontrendikasyon değerlendirmesiyle ve eğitimli kişilerce steril koşullarda yapılmalıdır.`,
    ],
  };
}

/**
 * Konya merkez vurgusu — yüz yüze eğitim/uygulama için şehir dışından
 * gelecek kursiyerlere ulaşım ve konaklama rehberi.
 */
export function konyaTravelBlock(service: ServiceType, c: LocationCtx): ContentBlock {
  if (c.isKonya) {
    return {
      title: `${c.place} — Merkezimiz Şehrinizde`,
      paragraphs: [
        `Yüz yüze uygulama ve eğitim merkezimiz Konya'da olduğu için ${c.place} bölgesindeki misafirlerimiz randevuyla kolayca merkezimize ulaşabilir. Aynı gün randevu ve elden teslim seçeneklerini telefonla konuşabiliriz.`,
        `${c.place} içinden gelen danışanlarımıza esnek randevu saatleri sunuyor; ürün ve malzeme taleplerinde elden teslim ya da aynı gün kargo seçeneklerini değerlendiriyoruz. Şehir merkezine yakın konumumuz sayesinde ulaşım da kolaydır.`,
        `Merkezimizden ${c.place} için hacamat ve sülük uygulaması, malzeme temini ve eğitim taleplerinizi tek noktadan karşılayabiliyoruz. Hangi hizmete ihtiyaç duyduğunuzu belirtmeniz yeterli; size en uygun günü ve seçeneği birlikte planlıyoruz.`,
      ],
    };
  }
  const intro = pickOne(
    [
      `Yüz yüze uygulama ve uygulamalı eğitim için merkezimiz Konya'dadır.`,
      `Uygulamalı eğitim ve yüz yüze seanslar Konya'daki merkezimizde yapılır.`,
    ],
    variantKey(service, c, "konya"),
  );
  return {
    title: `${c.place}'den Konya'ya Ulaşım & Konaklama`,
    paragraphs: [
      `${intro} ${c.full} bölgesinden gelecek kursiyerler için Konya; YHT (yüksek hızlı tren) ile Ankara ve İstanbul bağlantısı, Konya Havalimanı ve şehirlerarası otobüs hatlarıyla kolay ulaşılabilir bir şehirdir.`,
      `Şehir dışından gelen misafirlerimize merkezimize yakın konaklama ve randevu planlaması konusunda yol gösteriyoruz. Böylece ${c.place} bölgesinden tek günlük veya kısa konaklamalı bir ziyaretle uygulamalı eğitimi tamamlayabilirsiniz.`,
      `${c.full} bölgesinden gelen yoğun ilgi nedeniyle randevu ve gönderi planlamasını önceden yapmanızı öneriyoruz. Böylece hem size uygun tarihi ayırabiliyor hem de ${c.place} için en hızlı teslimat ve erişim seçeneğini önceden netleştirebiliyoruz. Yol tarifi, ulaşım ve program konusunda tüm sorularınızı arayarak sorabilirsiniz.`,
    ],
  };
}

/**
 * Güven / tecrübe (E-E-A-T) bloğu — lokasyona göre çerçevelenmiş, neden bizi
 * tercih etmeli sorusuna gerçek yanıt (tecrübe, sertifika, erişim kanalları).
 */
export function experienceBlock(service: ServiceType, c: LocationCtx): ContentBlock {
  const label = SERVICE_LABEL[service].toLocaleLowerCase("tr-TR");
  const intro = pickOne(
    [
      `Ebusadullah Hacamat & Akademi, 1994'ten bu yana hacamat ve sülük alanında uygulama ve eğitim veriyor.`,
      `1994'ten beri süregelen tecrübemizle hacamat ve sülük alanında ${c.place} dâhil pek çok bölgeye hizmet veriyoruz.`,
    ],
    variantKey(service, c, "exp"),
  );
  return {
    title: `${c.place} İçin Neden Ebusadullah Hacamat & Akademi?`,
    paragraphs: [
      `${intro} ${c.full} bölgesindeki danışanlarımıza; CE sertifikalı ve steril malzeme, tek kullanımlık ekipman ve hijyen standartlarına tam uyum ile güvenli bir ${label} deneyimi sunuyoruz. Kalite ve güven, ilk günden bu yana en önemli önceliğimiz olmaya devam ediyor.`,
      `Tecrübemizi hem yüz yüze (Konya merkez ve Almanya seansları) hem de online eğitim ve Türkiye geneli kargo ile erişilebilir kılıyoruz. Aklınıza takılan her soruda ${c.place} için WhatsApp veya telefonla aynı gün dönüş yapıyor, kararınızı bilgiyle vermenize yardımcı oluyoruz.`,
      `${c.place} bölgesinden bize ulaşan herkese ürün, fiyat, uygulama ve eğitim süreçleriyle ilgili net ve anlaşılır bilgi vermeyi ilke ediniyoruz. Aceleye getirmeden, ihtiyacınıza en uygun seçeneği birlikte belirliyoruz; ister tek bir ürün ister kapsamlı bir eğitim söz konusu olsun, ilk günkü aynı özenle ilgileniyor ve sonrasında da yanınızda oluyoruz.`,
    ],
  };
}

/** Şablona sırayla basılacak derin içerik blokları. */
export function deepContentBlocks(
  service: ServiceType,
  ctx: LocationCtx,
): ContentBlock[] {
  return [
    pointsAtlasBlock(service, ctx),
    shippingAssuranceBlock(service, ctx),
    konyaTravelBlock(service, ctx),
    experienceBlock(service, ctx),
  ];
}

// ─── Dinamik SSS havuzu (15 soru → deterministik 4) ──────────────────────

export interface FaqItem {
  q: string;
  a: string;
}

/** Tüm hizmetlerde geçerli, lokasyona duyarlı ortak sorular (8 adet). */
function commonFaqs(service: ServiceType, c: LocationCtx): FaqItem[] {
  const label = SERVICE_LABEL[service].toLocaleLowerCase("tr-TR");
  const isInfo = service === "hacamat-nedir" || service === "suluk-nedir";
  const orderWord = service === "hacamat-kursu" ? "kayıt" : "sipariş";
  return [
    {
      q: `${c.place} için ${label} nasıl ${orderWord} yapılır?`,
      a: `WhatsApp veya telefonla ${PHONE_DISPLAY} numarasından ulaşabilirsiniz. ${c.full} için uygun seçenekleri, güncel fiyatı ve teslim/erişim süresini aynı gün paylaşıyoruz.`,
    },
    {
      q: `${c.place} bölgesine teslimat/erişim ne kadar sürer?`,
      a: cargoLine(c),
    },
    {
      q: `${locative(c.place)} yüz yüze hizmet var mı?`,
      a: serviceReachLine(c),
    },
    {
      q: "Kapıda ödeme yapabilir miyim?",
      a: `Evet, ${c.province.name} için kapıda ödeme ve anlaşmalı kargo seçenekleri mevcuttur. Havale/EFT ile de ödeyebilirsiniz.`,
    },
    {
      q: "Fiyat bilgisini nasıl öğrenebilirim?",
      a: `Güncel fiyatları WhatsApp'tan ${PHONE_DISPLAY} numarasına yazarak öğrenebilirsiniz; ${c.place} için kargo dâhil net tutarı iletiyoruz.`,
    },
    {
      q: "Yurt dışından hizmet alabilir miyim?",
      a: "Yüz yüze uygulama için Konya merkezimizin yanı sıra Almanya seanslarımız da mevcuttur. Ürün gönderimi ve online eğitim için yurt dışı talepleri WhatsApp'tan değerlendirilir.",
    },
    {
      q: "Toplu veya kurumsal sipariş veriyor musunuz?",
      a: `Uygulayıcı, klinik ve kurumlar için toplu ${
        isInfo ? "temin" : orderWord
      } seçeneklerimiz var. ${c.place} için özel fiyat ve tedarik planı oluşturabiliriz.`,
    },
    {
      q: "Malzemeleriniz steril ve sertifikalı mı?",
      a: "Evet. Sunduğumuz hacamat/kupa malzemeleri CE sertifikalı, steril ve tek kullanımlıktır. 1994'ten beri süregelen tecrübeyle güvenli ürün ve uygulama sağlıyoruz.",
    },
  ];
}

/** Hizmete özel sorular (her biri ~7 adet) — ortak havuzla toplam 15. */
const SERVICE_FAQS: Record<ServiceType, (c: LocationCtx) => FaqItem[]> = {
  "hacamat-kursu": (c) => [
    {
      q: `${locative(c.place)} yüz yüze hacamat kursu var mı?`,
      a: c.isKonya
        ? "Konya'da yüz yüze eğitim ve uygulama merkezimizde randevu ile mümkündür."
        : `${c.place} için eğitim online yürütülür; uygulamalı bölüm için Konya'daki merkezimize gelebilir veya video destekli uzaktan takibi tercih edebilirsiniz.`,
    },
    {
      q: "Kurs sonunda sertifika veriliyor mu?",
      a: "Evet, eğitimi tamamlayan katılımcılara katılım/başarı belgesi verilir.",
    },
    {
      q: `${dative(c.place)} eğitim seti kargolanıyor mu?`,
      a: `Evet. Uygulamalı çalışabilmeniz için steril başlangıç setini gönderiyoruz. ${cargoLine(c)}`,
    },
    {
      q: "Kursa kimler katılabilir, ön şart var mı?",
      a: "Sağlık alanına ilgi duyan herkes katılabilir; ön şart aranmaz. Sağlık meslek mensupları için ileri düzey içerik de sunulur.",
    },
    {
      q: "Eğitim ne kadar sürüyor ve içeriği nedir?",
      a: "Hacamatın tarihçesi, hijyen/sterilizasyon, hacamat noktaları, endikasyon-kontrendikasyon ve uygulamalı teknik modüllerinden oluşur. Süre, seçilen pakete göre değişir.",
    },
    {
      q: "Online eğitime nasıl erişiyorum?",
      a: `${c.place} dâhil her yerden internet üzerinden erişebilirsiniz. Ders kayıtları ve materyaller hesabınıza tanımlanır; dilediğinizde tekrar izleyebilirsiniz.`,
    },
    {
      q: "Eğitim sonrası destek/danışma oluyor mu?",
      a: "Evet, mezuniyet sonrası uygulama sorularınız için danışma desteği sağlıyoruz.",
    },
  ],
  "suluk-satisi": (c) => [
    {
      q: `${dative(c.place)} sülük nasıl gönderiliyor?`,
      a: `Sülükler, canlı taşımaya uygun oksijenli su ve yalıtımlı özel ambalajla gönderilir. ${cargoLine(c)}`,
    },
    {
      q: "Sülükler bakımlı ve aç mı?",
      a: "Evet, gönderilen tıbbi sülükler bakımlı, uygulamaya hazır ve aç durumdadır.",
    },
    {
      q: "Sülükler yolda zarar görürse ne oluyor?",
      a: `Canlı kalma güvencesiyle paketliyoruz; olası bir sorunda ${c.place} için durumu değerlendirip çözüm sağlıyoruz. Teslimde ambalajı kontrol etmeniz yeterli.`,
    },
    {
      q: "Kaç adet sipariş verebilirim?",
      a: `Bireysel ve toplu (uygulayıcı/kurum) siparişler mümkündür. ${c.place} için adet ve fiyat detayını WhatsApp'tan ${PHONE_DISPLAY} paylaşıyoruz.`,
    },
    {
      q: "Sülükleri nasıl saklamalıyım?",
      a: "Temiz, klorsuz su içinde; serin ve ışık almayan bir ortamda saklanmalıdır. Siparişle birlikte kısa bir bakım notu iletiyoruz.",
    },
    {
      q: "Tıbbi sülük ile doğadan toplanan sülük farkı nedir?",
      a: "Uygulamada kontrollü koşullarda bakılan Hirudo türü tıbbi sülük kullanılır. Doğadan toplanan sülükler hijyen ve tür güvenliği açısından önerilmez.",
    },
    {
      q: `${c.place} için hangi kargoyla gönderiyorsunuz?`,
      a: "Bölgeye en hızlı ulaşan anlaşmalı kargoyu seçiyoruz; canlı gönderi tecrübemiz olan hatları tercih ediyoruz.",
    },
  ],
  "kupa-malzemeleri": (c) => [
    {
      q: `${dative(c.place)} hangi malzemeler kargolanıyor?`,
      a: "Steril vantuz/kupa setleri, tek kullanımlık bistüri, manuel ve elektrikli pompa ile sülük bakım seti dâhil tüm ürünler gönderilir.",
    },
    {
      q: "Malzemeler CE sertifikalı mı?",
      a: "Evet, sunduğumuz hacamat malzemeleri CE sertifikalı ve steril ambalajlıdır.",
    },
    {
      q: `${dative(c.place)} teslimat ne kadar sürer?`,
      a: cargoLine(c),
    },
    {
      q: "Cam kupalar kırılmadan geliyor mu?",
      a: `Cam ürünler darbeye dayanıklı köpük ve çift kutulama ile ayrı korunur. ${c.place} adresine hasarsız teslim için ekstra paketleme yapıyoruz.`,
    },
    {
      q: "Başlangıç seti mi yoksa parça parça mı alabilirim?",
      a: "Her ikisi de mümkün. Yeni başlayanlar için hazır başlangıç seti, deneyimli uygulayıcılar için parça bazında tedarik sunuyoruz.",
    },
    {
      q: "Elektrikli pompa mı, manuel pompa mı?",
      a: "İhtiyaca göre her ikisini de sağlıyoruz. Kullanım amacınızı belirtirseniz uygun olanı öneriyoruz.",
    },
    {
      q: "Ürünler tek kullanımlık mı?",
      a: "Bistüri gibi kesici uçlar tek kullanımlıktır; kupalar hijyen kurallarına uygun temizlik gerektirir. Set içeriğinde kullanım notu bulunur.",
    },
  ],
  "hacamat-nedir": (c) => [
    {
      q: "Hacamat ne işe yarar?",
      a: "Geleneksel uygulamada dolaşımı desteklemek ve bölgesel durgun kanı boşaltmak amacıyla kullanılır. Tıbbi tanı/tedavi yerine geçmez.",
    },
    {
      q: "Hacamat nasıl yapılır?",
      a: "Cilt temizlenir, uygun noktalara vakumlu kupa yerleştirilir, ardından steril bistüri ile yüzeysel çizikler açılarak kontrollü kan alınır. Eğitimli kişilerce yapılmalıdır.",
    },
    {
      q: "Hacamat noktaları nelerdir?",
      a: `Sünnette bildirilen kâhil (ense-omuz) bölgesi başta olmak üzere sırt, bel ve şikâyete göre belirlenen bölgesel noktalar kullanılır. ${c.place} için danışmada ayrıntı veriyoruz.`,
    },
    {
      q: "Hacamat kimlere yapılmaz?",
      a: "Gebeler, kan sulandırıcı kullananlar, ileri anemi ve bazı kronik durumlarda dikkat gerekir. Uygulama öncesi mutlaka değerlendirme yapılmalıdır.",
    },
    {
      q: "Hacamat ne sıklıkla yapılır?",
      a: "Kişiye ve amaca göre değişir; genellikle mevsimsel/periyodik uygulanır. Uygun aralık bireysel değerlendirmeyle belirlenir.",
    },
    {
      q: "Hacamat sünnet midir?",
      a: "Hacamat, hadis-i şeriflerde teşvik edilen bir uygulamadır ve geleneksel tıp içinde önemli bir yer tutar.",
    },
    {
      q: `${locative(c.place)} hacamat hizmeti alabilir miyim?`,
      a: serviceReachLine(c),
    },
  ],
  "suluk-nedir": (c) => [
    {
      q: "Sülük tedavisi nedir?",
      a: "Tıbbi sülüğün (Hirudo) uygun bölgeye tutundurulup kontrollü emmesi esasına dayanan geleneksel bir uygulamadır (hirudoterapi).",
    },
    {
      q: "Sülük tedavisi nasıl uygulanır?",
      a: "Tıbbi sülük uygun noktaya yerleştirilir ve kontrollü şekilde emmesi sağlanır. Uygulama eğitimli kişilerce ve steril koşullarda yapılmalıdır.",
    },
    {
      q: "Sülük hangi bölgelere uygulanır?",
      a: `Şikâyete göre belirlenen bölgesel noktalara uygulanır. ${c.place} için uygulama ayrıntılarını danışmada paylaşıyoruz.`,
    },
    {
      q: "Sülük tedavisi kimlere uygulanmaz?",
      a: "Gebelik, kansızlık, kan pıhtılaşma bozuklukları ve kan sulandırıcı kullanımı gibi durumlarda uygulanmaz veya dikkat gerektirir. Öncesinde değerlendirme şarttır.",
    },
    {
      q: "Sülük tekrar kullanılır mı?",
      a: "Hayır. Tıbbi sülük tek kişiliktir; hijyen açısından farklı kişilerde kullanılması sakıncalıdır.",
    },
    {
      q: "Sülük uygulaması iz bırakır mı?",
      a: "Küçük bir emme izi ve hafif kaşıntı olabilir; genellikle kısa sürede geçer. Uygulama sonrası bakım önerileri verilir.",
    },
    {
      q: `${dative(c.place)} sülük temini mümkün mü?`,
      a: cargoLine(c),
    },
  ],
};

/** Bir hizmet+lokasyon için 15 soruluk tam SSS havuzu. */
export function faqPool(service: ServiceType, ctx: LocationCtx): FaqItem[] {
  return [...commonFaqs(service, ctx), ...SERVICE_FAQS[service](ctx)];
}

/**
 * Sayfa için deterministik SSS seçimi: 15'lik havuzdan lokasyona özel `count`
 * adet FARKLI soru. Aynı lokasyon hep aynı soruları alır; komşu ilçeler farklı
 * kombinasyon gösterir (anti-doorway).
 */
export function selectFaqs(
  service: ServiceType,
  ctx: LocationCtx,
  count = 4,
): FaqItem[] {
  const pool = faqPool(service, ctx);
  const key = `faq|${service}|${ctx.province.plate}|${ctx.district?.slug ?? ""}`;
  return pickDistinct(pool, count, key);
}
