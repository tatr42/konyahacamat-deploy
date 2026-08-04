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
import {
  getProvinceProfile,
  type ProvinceProfile,
} from "@/data/province-profiles";
import { staticFaqsFor, type FaqScope } from "@/data/faq-pool";
import { dative, locative, ablative } from "@/lib/pseo/turkish";
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

/**
 * Hub sayfasının OPSİYONEL zengin gövdesi (dizinin dışındaki dönüşüm içeriği).
 *
 * Neden config: `ServiceHubPage` 3 siloyu birden besliyor. Zengin içerik bu
 * config'ten okunur; yalnızca doldurulan servis için render edilir. Böylece
 * `suluk-satisi` zenginleşirken `hacamat-kursu` / `kupa-malzemeleri` hublarına
 * dokunulmaz. Sonra istenirse onlar da doldurulabilir.
 *
 * Kanibalizasyon notu: burası SATIŞ/ÜRÜN niyetlidir. "Sülük tedavisi nedir"
 * derinliği bilinçli olarak yok — o blog pillar'ın işi (value.blogHref ile
 * linklenir). Tedavi niyetli ziyaretçi `crossLink` ile /hizmetler/suluk'a
 * yönlendirilir.
 */
export interface HubBody {
  /** "Tıbbi Sülük Nedir, Neden Bizden?" — ürün değeri (kısa, tedavi değil). */
  value: {
    heading: string;
    intro: string;
    blogHref: string;
    blogLabel: string;
    cards: { title: string; desc: string }[];
  };
  /** "Canlı Sülük Kargosu" — canlı hayvan satışında #1 dönüşüm engeli. */
  shipping: {
    heading: string;
    intro: string;
    steps: { title: string; desc: string }[];
  };
  /** "Fiyat & Sipariş" — ticari blok. Fiyat WhatsApp'tan (uydurma yok). */
  order: { heading: string; paragraphs: string[]; bullets: string[] };
  /** Dizin başlığı (dizinin üstüne yazılır). */
  directoryHeading: string;
  /** Hub-seviyesi SSS — ULUSAL/ürün odaklı; il sayfası SSS'iyle birebir değil. */
  faq: { q: string; a: string }[];
  /** Tedavi niyetini yönlendiren çapraz band (anti-kanibalizasyon). */
  crossLink: { title: string; desc: string; href: string; label: string };
  /** Product şeması için — FİYATSIZ (availability + url yalnızca). */
  product: { name: string; description: string };
}

export const HUB_BODY: Partial<Record<ServiceType, HubBody>> = {
  "suluk-satisi": {
    value: {
      heading: "Tıbbi Sülük Nedir, Neden Bizden Almalısınız?",
      intro:
        "Sattığımız sülükler, hirudoterapide kullanılan tıbbi sülük (Hirudo medicinalis) türüdür. Kontrollü ortamda bakılır, uygulamaya hazır ve aç olarak gönderilir. 1994'ten bu yana süregelen tecrübeyle, doğadan gelişigüzel toplanan sülüklerin taşıdığı hastalık ve güvenlik riskini ortadan kaldırırız.",
      blogHref: "/blog/suluk-tedavisi-hirudoterapi-nedir",
      blogLabel: "Sülük Tedavisi (Hirudoterapi) Nedir?",
      cards: [
        { title: "Tıbbi Sülük (Hirudo medicinalis)", desc: "Hirudoterapi için uygun, doğru türden sülük. Gölet/doğa sülüğü değil, kontrollü koşullarda bakılan tıbbi tür." },
        { title: "Bakımlı & Uygulamaya Hazır", desc: "Aç, dinç ve tutunmaya hazır sülükler. Sağlıklı bir uygulama için en kritik koşul canlının durumudur." },
        { title: "Doğadan Toplanandan Farkı", desc: "Doğal sülük, tür ve hijyen belirsizliği taşır. Tıbbi sülük ise tür güvencesi ve tek kullanımlık uygulama esasıyla gelir." },
      ],
    },
    shipping: {
      heading: "Canlı Sülük Kargosu — Nasıl Gönderiyoruz?",
      intro:
        "Canlı sülük göndermenin püf noktası, yol boyunca sülüğün dinç kalmasıdır. Konya merkezimizden Türkiye'nin her iline, canlı taşımaya uygun özel paketlemeyle gönderiyoruz.",
      steps: [
        { title: "Oksijenli Su", desc: "Klorsuz, oksijeni korunan su ve sızdırmaz iç kap ile sülükler yol boyunca nefes alır." },
        { title: "Yalıtımlı Kutu", desc: "Strafor kutu ve mevsime göre jel-buz ile sıcaklık dengelenir; yaz sıcağı ve kış donmasına karşı korunur." },
        { title: "Canlı Kalma Güvencesi", desc: "Gönderiyi canlı kalma güvencesiyle hazırlarız; teslimde ambalajı kontrol etmeniz yeterlidir." },
        { title: "1–3 İş Günü Teslim", desc: "Bölgeye göre 1–3 iş günü. Anlaşmalı hızlı kargo ve kapıda ödeme seçeneği mevcuttur." },
      ],
    },
    order: {
      heading: "Fiyat & Sipariş",
      paragraphs: [
        "Sülük fiyatları adede ve sipariş büyüklüğüne göre değişir. Güncel fiyatı ve kargo dâhil net tutarı WhatsApp veya telefonla dakikalar içinde paylaşıyoruz.",
      ],
      bullets: [
        "Bireysel sipariş — ihtiyacınız kadar adet",
        "Toplu / kurumsal — uygulayıcı ve klinikler için özel fiyat",
        "Kapıda ödeme, havale/EFT ve anlaşmalı kargo",
      ],
    },
    directoryHeading: "Bulunduğunuz İlden Sülük Sipariş Edin",
    faq: [
      { q: "Sipariş ettiğim sülükler canlı mı geliyor?", a: "Evet. Sülükleri, oksijeni korunan klorsuz su ve yalıtımlı kutuyla canlı taşımaya uygun şekilde gönderiyoruz. Gönderi canlı kalma güvencesiyle hazırlanır; teslimde ambalajı kontrol etmeniz yeterlidir." },
      { q: "Tıbbi sülük ile doğadan toplanan sülüğün farkı nedir?", a: "Tıbbi sülük (Hirudo medicinalis), hirudoterapi için uygun, doğru türden ve kontrollü koşullarda bakılan sülüktür. Doğadan/gölden toplanan sülükler ise tür ve hijyen belirsizliği taşır, uygulamada güvenli değildir." },
      { q: "Gelen sülükleri nasıl saklamalıyım?", a: "Klorsuz (dinlendirilmiş) su içinde, ağzı hava alan bir kapta, serin ve doğrudan güneş görmeyen bir yerde saklayın. Suyu düzenli tazeleyin. Ayrıntılı bakım notunu siparişle birlikte paylaşıyoruz." },
      { q: "Toplu veya kurumsal sipariş verebilir miyim?", a: "Evet. Uygulayıcılar, klinikler ve kurumlar için toplu tedarik ve özel fiyat sunuyoruz. İhtiyacınızı WhatsApp'tan iletin, size uygun bir tedarik planı oluşturalım." },
      { q: "Sülüğü kendim mi uygulayacağım?", a: "Sülük satışı, uygulamayı kendisi yapacak veya uygulatacak kişilere yöneliktir. Uygulamayı bize yaptırmak isterseniz Konya'daki kliniğimizde sülük terapisi hizmetimiz mevcuttur." },
      { q: "Fiyat bilgisini nasıl öğrenirim?", a: "Güncel fiyatları WhatsApp veya telefonla paylaşıyoruz. Adet ve teslimat ilinizi belirtin; kargo dâhil net tutarı dakikalar içinde iletelim." },
    ],
    crossLink: {
      title: "Sülük Uygulaması / Terapisi mi Arıyorsunuz?",
      desc: "Sülüğü kendiniz uygulamayacaksanız, Konya kliniğimizde uzman sülük terapisi (hirudoterapi) hizmeti veriyoruz.",
      href: "/hizmetler/suluk",
      label: "Sülük Terapisi Hizmeti",
    },
    product: {
      name: "Tıbbi Sülük (Hirudo medicinalis)",
      description:
        "Hirudoterapiye uygun, bakımlı ve uygulamaya hazır tıbbi sülük. Konya'dan tüm Türkiye'ye canlı kalma güvenceli kargo.",
    },
  },
};

export const WHATSAPP = "905544062383";
export const PHONE_DISPLAY = "+90 554 406 23 83";

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

// ─── Derin içerik blokları ───────────────────────────────────────────────
//
// FAZ 1 TASARIMI — "tekrar eden bilgiyi metinden çıkar":
//   Önceki motorda ~580 kelimelik gövdenin ~300'ü 81 ilde HARFİ HARFİNE
//   aynıydı (sterilizasyon anlatımı, kargo takip süreci, güven cümleleri).
//   Bu bilgi yanlış değildi, sadece METİN olarak tekrarlanıyordu.
//
//   Çözüm: aynı olan bilgi `BlockWidget` olarak YAPISAL biçimde sunulur
//   (adım kartı, tablo, rozet listesi). Metin olarak yalnızca lokasyona
//   göre GERÇEKTEN değişen prose kalır ve bu prose `province-profiles`
//   verisinden beslenir. Kullanıcı bilgiyi kaybetmez; Google kopya metin
//   görmez.
//
// Bu modül JSX İÇERMEZ — widget'lar veri olarak tarif edilir, render
// `components/pseo/BlockWidgets.tsx` içinde yapılır. Böylece content.ts
// saf TypeScript kalır ve test edilebilir olur.

/** Yapısal olarak sunulacak, lokasyondan bağımsız bilgi bloğu. */
export type BlockWidget =
  /** Uygulama adımları — numaralı kart dizisi */
  | { kind: "application-steps"; variant: "hacamat" | "suluk" }
  /** Kargo süreci adımları */
  | { kind: "shipping-steps" }
  /** Güven/sertifika rozetleri (E-E-A-T) */
  | { kind: "trust-badges" }
  /** Konya'ya ulaşım seçenekleri tablosu */
  | { kind: "konya-access"; distanceKm: number; cargoHat: string }
  /** Tıbbi sorumluluk notu */
  | { kind: "safety-notice" };

export interface ContentBlock {
  title: string;
  paragraphs: string[];
  /** Paragrafların ardından basılacak yapısal içerik. */
  widgets?: BlockWidget[];
}

/** Deterministik varyant anahtarı — aynı lokasyon hep aynı varyantı alır. */
function variantKey(service: ServiceType, ctx: LocationCtx, salt: string): string {
  return `${service}|${salt}|${ctx.province.plate}|${ctx.district?.slug ?? ""}`;
}

/**
 * Lokasyonun il profili. `assertProvinceProfilesComplete()` build sırasında
 * eksik profili yakalar; buraya düşülüyorsa route listesiyle veri ayrışmıştır.
 */
function profileOf(ctx: LocationCtx): ProvinceProfile {
  const profile = getProvinceProfile(ctx.province.slug);
  if (!profile) {
    throw new Error(
      `province-profiles: "${ctx.province.slug}" için profil bulunamadı`,
    );
  }
  return profile;
}

/** ["A","B","C"] → "A, B ve C" */
function formatList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} ve ${items[items.length - 1]}`;
}

/**
 * Konya'ya mesafeye göre bant — metin ve seyahat tavsiyesi buna göre değişir.
 * Eşikler sabit olduğu için aynı il her zaman aynı bandı alır.
 */
type DistanceBand = "cok-yakin" | "yakin" | "orta" | "uzak";

function distanceBand(km: number): DistanceBand {
  if (km <= 160) return "cok-yakin";
  if (km <= 350) return "yakin";
  if (km <= 700) return "orta";
  return "uzak";
}

// ─── 1) Coğrafya bloğu — asıl benzersizlik motoru ───────────────────────
//
// Bu blok tamamen `province-profiles` verisinden üretilir: mesafe, bölge,
// kargo koridoru, komşu iller ve ile özgü not. Hiçbir il diğeriyle aynı
// metni almaz — çünkü altındaki VERİ farklıdır, sadece kelimeler değil.

export function geographyBlock(service: ServiceType, c: LocationCtx): ContentBlock {
  const p = profileOf(c);

  if (c.isKonya) {
    return {
      title: `${c.place} — Merkezimiz Sizin Şehrinizde`,
      paragraphs: [
        `${c.full}, yüz yüze uygulama ve eğitim merkezimizin bulunduğu ildir. ${p.yerelNot} Bu nedenle randevu, elden teslim ve aynı gün ürün temini seçeneklerinin tamamı açıktır.`,
        `Konya; ${formatList(p.neighbors)} illeriyle komşudur. Merkezimize günübirlik ulaşmak isteyen çevre il danışanlarımız için de en pratik buluşma noktası burasıdır.`,
        c.isDistrict
          ? `${c.district!.name}, Konya sınırları içindedir; merkezimize ulaşım için size en uygun saati telefonla birlikte belirleyebiliriz.`
          : `Şehir içi ulaşım kolay olduğundan, uygulamayı ve malzeme teminini tek ziyarette tamamlayabilirsiniz.`,
      ],
    };
  }

  const band = distanceBand(p.distanceKm);

  const opening = pickOne(
    [
      `${c.full}, Konya'daki merkezimize karayoluyla yaklaşık ${p.distanceKm} km uzaklıkta ve ${c.province.region} bölgesinde yer alır.`,
      `Konya merkezimiz ile ${c.full} arasındaki karayolu mesafesi yaklaşık ${p.distanceKm} km'dir; il ${c.province.region} bölgesindedir.`,
      `${c.province.region} bölgesinde bulunan ${c.full}, merkezimize yaklaşık ${p.distanceKm} km mesafededir.`,
      `${c.full} için mesafe tablomuz nettir: Konya merkezimize karayoluyla yaklaşık ${p.distanceKm} km, bölge olarak ${c.province.region}.`,
      `Merkezimizin bulunduğu Konya ile ${c.full} arası yaklaşık ${p.distanceKm} km'dir ve il ${c.province.region} bölgesinde konumlanır.`,
      `${c.full} bölgesi ${c.province.region}'da yer alır ve Konya merkezimize yaklaşık ${p.distanceKm} km uzaklıktadır.`,
    ],
    variantKey(service, c, "geo-open"),
  );

  const bandLine: Record<DistanceBand, string> = {
    "cok-yakin": `Bu yakınlık sayesinde ${dative(c.place)} gönderiler çoğunlukla ertesi iş günü teslim edilir; uygun durumlarda elden teslim de konuşulabilir.`,
    yakin: `Kısa mesafeli bir hat olduğu için ${c.place} gönderilerinde teslim gününü önceden netleştirebiliyoruz.`,
    orta: `Orta mesafeli bir hat olduğundan ${c.place} gönderilerinde çıkış saatini teslim gününe göre planlıyoruz.`,
    uzak: `Uzun mesafeli bir hat olduğu için ${c.place} gönderilerinde çıkış günü ve paketleme ayrıca planlanır.`,
  };

  const neighborLine = pickOne(
    [
      `${c.province.name}; ${formatList(p.neighbors)} illeriyle komşudur. Bu komşu illerden gelen talepleri de aynı kargo hattı üzerinden karşılıyoruz.`,
      `İl sınırdaşları ${formatList(p.neighbors)} olduğu için bölge genelinde tek ve tanıdık bir hat kullanıyoruz.`,
      `${formatList(p.neighbors)} illeriyle komşu olan ${c.province.name} için gönderi planlaması bölge bütününde yapılır.`,
      `Komşu iller ${formatList(p.neighbors)}; bu hattı düzenli kullandığımız için teslim sürelerini gerçekçi biçimde söyleyebiliyoruz.`,
    ],
    variantKey(service, c, "geo-neighbor"),
  );

  // İLÇE FARKLILAŞTIRMASI: aynı ilin ilçeleri aynı il profilini paylaştığı
  // için (mesafe, iklim, kargo hattı hepsinde aynı) metinleri birbirine
  // yaklaşıyordu. Kardeş ilçe listesi her ilçede FARKLI olduğundan burayı
  // ilçeye özgü hâle getiriyor — ve söylenen şey doğru: aynı hat üzerinden
  // çevre ilçelere de gönderi yapılıyor.
  const districtLine = (() => {
    if (!c.isDistrict) {
      return `İl genelindeki tüm ilçelere gönderi yapıyoruz; adres detayını sipariş sırasında paylaşmanız yeterlidir.`;
    }
    const siblings = c.province.districts.filter((d) => d.slug !== c.district!.slug);
    const shown = pickDistinct(
      siblings.map((d) => d.name),
      Math.min(3, siblings.length),
      variantKey(service, c, "sibling"),
    );
    const base = `${c.district!.name}, ${c.province.name} sınırları içindedir; teslim adresi ve saat tercihinizi sipariş sırasında belirtmeniz yeterlidir.`;
    return shown.length > 0
      ? `${base} ${formatList(shown)} gibi çevre ilçelere de aynı hat üzerinden gönderi yapıyoruz.`
      : base;
  })();

  return {
    title: `${c.place} ile Konya Arası: Mesafe, Hat ve Teslimat`,
    paragraphs: [
      `${opening} Gönderiler ${p.cargoHat} üzerinden yola çıkar. ${bandLine[band]}`,
      `${p.yerelNot} ${neighborLine}`,
      districtLine,
    ],
  };
}

/**
 * Kargo / sipariş güvencesi.
 *
 * FARKLILAŞMA KAYNAĞI: `province-profiles.sevkiyatRiski`. Bu YAPISAL alan
 * üç tamamen farklı önlem anlatımı üretir (yaz sıcağı / kış donması /
 * standart) ve ilin kendi `iklimNotu` cümlesiyle birleşir. Yani metin
 * farkı kelime oyunundan değil, ilin gerçek sevkiyat koşulundan gelir.
 *
 * Kargo takip süreci gibi HER İLDE AYNI olan anlatım metinden çıkarıldı;
 * `shipping-steps` widget'ı olarak yapısal biçimde sunuluyor.
 */
export function shippingAssuranceBlock(
  service: ServiceType,
  c: LocationCtx,
): ContentBlock {
  const p = profileOf(c);
  const days = c.isKonya ? "aynı gün veya ertesi iş günü" : CARGO_DAYS[c.province.region];
  const isLeech = service === "suluk-satisi" || service === "suluk-nedir";
  const isMaterial = service === "kupa-malzemeleri";
  const isCourse = service === "hacamat-kursu";

  const geoIntro = pickOne(
    [
      `${c.full} (${c.province.region}) bölgesine gönderilerimiz Konya merkezimizden ${days} içinde ulaşır.`,
      `${c.place} için siparişler Konya'daki merkezimizden hazırlanıp ${days} içinde ${c.province.region} bölgesine teslim edilir.`,
      `Konya merkezimizden çıkan ${c.place} gönderileri ${c.province.region} hattında ortalama ${days} içinde elinize geçer.`,
      `${ablative(c.place)} gelen siparişleri Konya'da hazırlıyor, ${p.cargoHat} üzerinden ortalama ${days} içinde teslim ediyoruz.`,
      `${dative(c.place)} teslimat süremiz ortalama ${days}; gönderi ${p.cargoHat} boyunca tek aktarmayla ilerler.`,
      `Konya merkezimizden ${dative(c.place)} yapılan sevkiyat ${p.cargoHat} üzerinden ilerler ve ortalama ${days} sürer.`,
    ],
    variantKey(service, c, "ship"),
  );

  // İlin gerçek mevsimsel kısıtı → farklı önlem anlatımı.
  const climateMeasure: Record<ProvinceProfile["sevkiyatRiski"], string> = {
    "yaz-sicak": isLeech
      ? `Yaz aylarında sevkiyatı günün serin saatlerine alıyor, kutuya jel-buz ve ilave termal yalıtım ekleyerek sülüklerin yol boyunca canlı ve dinç kalmasını sağlıyoruz.`
      : `Yaz aylarında paketleri doğrudan güneş görmeyecek şekilde sevk ediyor, steril ambalajın sıcaktan etkilenmemesi için yalıtımlı kutu kullanıyoruz.`,
    "kis-donma": isLeech
      ? `Kış aylarında donma riskine karşı ısı koruması uyguluyor, gönderi gününü hava durumuna göre sizinle birlikte belirliyoruz; gerekirse sevkiyatı birkaç gün öteliyoruz.`
      : `Kış aylarında yol koşulları teslimi uzatabildiği için gönderi gününü önceden planlıyor, sıvı içerikli ürünlerde donmaya karşı koruma uyguluyoruz.`,
    standart: isLeech
      ? `Bu hatta mevsimsel aşırılık görülmediği için standart ısı dengeleyici paketleme yeterli oluyor; yine de her gönderide mevsim koşulunu ayrıca kontrol ediyoruz.`
      : `Bu hatta mevsimsel aşırılık görülmediği için yıl boyu standart koruyucu paketleme yeterli oluyor.`,
  };

  const packaging = isLeech
    ? `Canlı sülükler; oksijen tutan klorsuz su, sızdırmaz iç kap ve yalıtımlı strafor kutu ile paketlenir.`
    : isMaterial
      ? `Steril ürünler ambalajı bozulmadan, cam kupalar ise darbeye dayanıklı köpük ve çift katmanlı kutulama ile korunur.`
      : isCourse
        ? `Kursla birlikte gönderdiğimiz uygulama seti; steril malzemeler ve kesici uçlar zarar görmeyecek şekilde ayrı ayrı ambalajlanır.`
        : `Gönderilerimizde steril ambalaj bütünlüğü korunur; cam ve kesici parçalar ayrı koruma ile paketlenir.`;

  const title = isLeech
    ? `${c.place} Sülük Kargosu & Canlı Kalma Güvencesi`
    : isCourse
      ? `${c.place} Eğitim Seti Kargosu`
      : `${c.place} Kargo & Kutulama Güvencesi`;

  return {
    title,
    paragraphs: [
      `${geoIntro} ${packaging}`,
      `${p.iklimNotu} ${climateMeasure[p.sevkiyatRiski]}`,
    ],
    widgets: [{ kind: "shipping-steps" }],
  };
}

/**
 * Hacamat / sülük uygulama noktaları ön bilgisi — lokasyona göre çerçevelenmiş,
 * tıbbi tavsiye içermeyen eğitici bir önizleme.
 */
export function pointsAtlasBlock(service: ServiceType, c: LocationCtx): ContentBlock {
  const isLeech = service === "suluk-satisi" || service === "suluk-nedir";

  // Uygulama adımları ve tıbbi uyarı HER İLDE AYNI bilgidir — metin olarak
  // 81 kez tekrarlamak yerine yapısal widget olarak sunuluyor.
  const widgets: BlockWidget[] = [
    { kind: "application-steps", variant: isLeech ? "suluk" : "hacamat" },
    { kind: "safety-notice" },
  ];

  if (isLeech) {
    const intro = pickOne(
      [
        `Sülük tedavisi (hirudoterapi), tıbbi sülüğün şikâyete göre belirlenen bölgesel noktalara uygulanmasıyla yapılır.`,
        `Hirudoterapide sülük, uygulama planına göre seçilen bölgesel noktalara yerleştirilir.`,
        `Sülük uygulamasında bölge seçimi; şikâyet, kişinin genel durumu ve uzman değerlendirmesiyle belirlenir.`,
        `Hirudoterapi, tıbbi sülüğün uygun bölgeye tutundurulup kontrollü emmesi esasına dayanır.`,
        `Sülük uygulaması, önceden yapılan bir değerlendirmenin ardından seçilen bölgesel noktalara uygulanır.`,
        `Tıbbi sülük, uygulama planına göre belirlenen bölgeye yerleştirilir ve kendiliğinden tutunması beklenir.`,
      ],
      variantKey(service, c, "pts"),
    );
    return {
      title: `${c.place} İçin Sülük Uygulama Bölgeleri — Ön Bilgi`,
      paragraphs: [
        `${intro} Uygulama bölgeleri kişiye göre değişir. ${c.full} bölgesinden gelen sorularda genel çerçeveyi paylaşıyor, kişiye özel planı ise değerlendirmeyle belirliyoruz.`,
      ],
      widgets,
    };
  }

  const intro = pickOne(
    [
      `Hacamat uygulamasında noktalar rastgele değil; sünnette bildirilen kâhil (ense-omuz) bölgesi başta olmak üzere bir "harita" mantığıyla belirlenir.`,
      `Hacamat noktaları; kâhil (ense-omuz) bölgesi, sırt ve bele ek olarak şikâyete göre seçilen bölgesel noktalardan oluşan bir atlas mantığıyla çalışır.`,
      `Uygulamada nokta seçimi klasik hacamat atlasına dayanır; merkezinde sünnette bildirilen kâhil bölgesi bulunur.`,
      `Hacamatta hangi noktanın seçileceği; şikâyet, kişinin durumu ve uygulayıcının değerlendirmesiyle belirlenir.`,
      `Kâhil bölgesi başta olmak üzere sırt ve bel noktaları, hacamat uygulamasının klasik çerçevesini oluşturur.`,
      `Nokta seçimi bir harita mantığıyla çalışır: klasik bölgeler sabit, şikâyete göre eklenen noktalar kişiye özeldir.`,
    ],
    variantKey(service, c, "pts"),
  );
  return {
    title: `${c.place} İçin Hacamat Noktaları — Ön Bilgi`,
    paragraphs: [
      `${intro} Doğru nokta seçimi, hijyen ve vakum-çizik tekniği uygulamanın en kritik parçalarıdır. ${c.full} için danışmada, ilgilendiğiniz konuya göre uygun noktalar ve dikkat edilecekler hakkında genel bilgi veriyoruz.`,
    ],
    widgets,
  };
}

/**
 * Konya merkez vurgusu — yüz yüze eğitim/uygulama için şehir dışından
 * gelecek kursiyerlere ulaşım ve konaklama rehberi.
 */
export function konyaTravelBlock(service: ServiceType, c: LocationCtx): ContentBlock {
  const p = profileOf(c);

  if (c.isKonya) {
    return {
      title: `Konya İçinden Merkezimize Ulaşım`,
      paragraphs: [
        `Yüz yüze uygulama ve eğitim merkezimiz Konya'da olduğu için ${c.place} bölgesindeki misafirlerimiz randevuyla kolayca ulaşabilir. Uygulama, malzeme temini ve eğitim taleplerini tek ziyarette karşılayabiliyoruz.`,
      ],
      widgets: [
        { kind: "konya-access", distanceKm: 0, cargoHat: p.cargoHat },
      ],
    };
  }

  const band = distanceBand(p.distanceKm);

  const intro = pickOne(
    [
      `Yüz yüze uygulama ve uygulamalı eğitim için merkezimiz Konya'dadır.`,
      `Uygulamalı eğitim ve yüz yüze seanslar Konya'daki merkezimizde yapılır.`,
      `Uygulamalı bölüm ve birebir seanslar için tek adresimiz Konya merkezdir.`,
      `Yüz yüze görüşme, uygulama ve uygulamalı eğitim Konya'daki merkezimizde yürütülür.`,
    ],
    variantKey(service, c, "konya"),
  );

  // Seyahat tavsiyesi mesafe bandına göre GERÇEKTEN değişir.
  const planLine: Record<DistanceBand, string> = {
    "cok-yakin": `${c.place} merkezimize yakın olduğu için günübirlik gidiş-dönüş rahatlıkla planlanabilir; konaklamaya çoğunlukla gerek kalmaz.`,
    yakin: `Yaklaşık ${p.distanceKm} km'lik mesafe, ${ablative(c.place)} sabah çıkıp aynı gün dönmenize imkân verir.`,
    orta: `Yaklaşık ${p.distanceKm} km'lik mesafede erken çıkışla tek günde tamamlamak mümkündür; programı rahat tutmak isteyenler için bir gecelik konaklama öneriyoruz.`,
    uzak: `Yaklaşık ${p.distanceKm} km'lik mesafe nedeniyle ${ablative(c.place)} gelecek misafirlerimize en az bir gece konaklamalı bir program öneriyoruz; böylece uygulamalı bölüm aceleye gelmez.`,
  };

  return {
    title: `${ablative(c.place)} Konya'ya Ulaşım & Konaklama`,
    paragraphs: [
      `${intro} ${planLine[band]}`,
      `Şehir dışından gelen misafirlerimize merkezimize yakın konaklama ve randevu planlaması konusunda yol gösteriyoruz. Uygun tarihi ayırabilmemiz için ${c.place} bölgesinden gelecekseniz önceden haber vermenizi rica ediyoruz.`,
    ],
    widgets: [
      { kind: "konya-access", distanceKm: p.distanceKm, cargoHat: p.cargoHat },
    ],
  };
}

/**
 * Güven / tecrübe (E-E-A-T) bloğu — lokasyona göre çerçevelenmiş, neden bizi
 * tercih etmeli sorusuna gerçek yanıt (tecrübe, sertifika, erişim kanalları).
 */
export function experienceBlock(service: ServiceType, c: LocationCtx): ContentBlock {
  const label = SERVICE_LABEL[service].toLocaleLowerCase("tr-TR");
  const p = profileOf(c);

  const intro = pickOne(
    [
      `Ebusadullah Hacamat & Akademi, 1994'ten bu yana hacamat ve sülük alanında uygulama ve eğitim veriyor.`,
      `1994'ten beri süregelen tecrübemizle hacamat ve sülük alanında ${c.place} dâhil pek çok bölgeye hizmet veriyoruz.`,
      `Kurucumuz Ebusadullah Hoca'nın 1994'te başlayan uygulama ve eğitim birikimi bugün de aynı çizgide sürüyor.`,
      `Hacamat ve sülük alanındaki tecrübemiz 1994'e uzanır; bu birikimi hem uygulamaya hem eğitime taşıyoruz.`,
    ],
    variantKey(service, c, "exp"),
  );

  // Erişim cümlesi, ilin merkeze mesafesine göre gerçekten değişir.
  const reach = c.isKonya
    ? `${c.place} merkezimizin bulunduğu il olduğu için uygulama, eğitim ve malzeme temini tek noktadan yürür.`
    : distanceBand(p.distanceKm) === "uzak"
      ? `${c.place} merkezimize uzak bir hatta bulunduğu için online eğitim ve kargo kanallarını özellikle güçlü tutuyoruz; uygulamalı bölüm için Konya ziyareti önceden planlanır.`
      : `${c.place} için online eğitim ve kargo kanallarının yanı sıra Konya merkezimize günübirlik ziyaret de gerçekçi bir seçenektir.`;

  return {
    title: `${c.place} İçin Neden Ebusadullah Hacamat & Akademi?`,
    paragraphs: [
      `${intro} ${c.full} bölgesindeki danışanlarımıza CE sertifikalı, steril ve tek kullanımlık malzemeyle güvenli bir ${label} deneyimi sunuyoruz.`,
      `${reach} Aklınıza takılan her soruda WhatsApp veya telefonla aynı gün dönüş yapıyoruz.`,
    ],
    widgets: [{ kind: "trust-badges" }],
  };
}

/**
 * İLÇE ODAK BLOĞU — yalnızca ilçe sayfalarında kullanılır.
 *
 * NEDEN: `geographyBlock` ve `konyaTravelBlock` tamamen İL seviyesi veriden
 * beslenir (mesafe, iklim, kargo koridoru, komşu iller). Bir ilin ilçelerinde
 * bu veri AYNI olduğu için ilçe sayfaları hem birbirine hem de kendi il
 * sayfasına yaklaşıyordu (ölçüm: ilçe-ilçe %34, il-ilçe %35, tepe %50).
 *
 * Çözüm ilçeye ayrı bir AÇI vermek: il sayfası coğrafya/lojistik derinliğini
 * taşır, ilçe sayfası yerel pratiğe odaklanır. Kardeş ilçe listesi her ilçede
 * farklı olduğu için metin de doğal olarak farklılaşır.
 */
export function districtFocusBlock(
  service: ServiceType,
  c: LocationCtx,
): ContentBlock {
  const p = profileOf(c);
  const d = c.district!;
  const siblings = c.province.districts.filter((x) => x.slug !== d.slug);
  const near = pickDistinct(
    siblings.map((x) => x.name),
    Math.min(4, siblings.length),
    variantKey(service, c, "dist-near"),
  );

  const opening = pickOne(
    [
      `${d.name} için siparişleriniz Konya merkezimizden hazırlanıp doğrudan adresinize gönderilir; ayrıca bir aktarma noktasına uğramanız gerekmez.`,
      `${d.name} adresine teslimat, ${c.province.name} geneliyle aynı hat üzerinden yapılır ve kapınıza kadar gelir.`,
      `${dative(d.name)} gönderilerde teslim adresi ve tercih ettiğiniz saat aralığını sipariş sırasında belirtebilirsiniz.`,
      `${d.name} bölgesindeki siparişler için teslim saatini kurye ile önceden koordine edebiliyoruz.`,
      `${d.name} için ürün teslimi ve bilgi desteği tek hat üzerinden yürür; sipariş sonrası süreci WhatsApp'tan takip edebilirsiniz.`,
      `${dative(d.name)} yapılan gönderilerde adres detayı ve iletişim numarası dışında ek bir işlem gerekmez.`,
    ],
    variantKey(service, c, "dist-open"),
  );

  const coverage =
    near.length > 0
      ? `${formatList(near)} gibi çevre ilçelere de aynı gün içinde hazırlanan gönderilerle hizmet veriyoruz. ${d.name} çevresindeki uygulayıcı ve kurumlar için toplu tedarik seçeneği de mevcuttur.`
      : `${c.province.name} genelindeki tüm ilçelere aynı hat üzerinden hizmet veriyoruz.`;

  const provincePointer = `${c.province.name} geneli için mesafe, kargo koridoru ve mevsimsel sevkiyat koşullarını ${c.province.name} sayfamızda ayrıntılı olarak anlattık; ${d.name} teslimatları da aynı ${p.cargoHat} üzerinden ilerler.`;

  return {
    title: `${d.name} İçin Teslimat ve Hizmet Pratiği`,
    paragraphs: [`${opening} ${coverage}`, provincePointer],
    widgets: [
      { kind: "konya-access", distanceKm: p.distanceKm, cargoHat: p.cargoHat },
    ],
  };
}

/**
 * Şablona basılacak derin içerik blokları.
 *
 * KOMPOZİSYON İL ve İLÇE İÇİN FARKLIDIR (kanibalizasyon önlemi):
 *   - İl sayfası:   coğrafya derinliği + Konya ulaşım → "bölge" sayfası
 *   - İlçe sayfası: yerel teslimat pratiği           → "adres" sayfası
 *   Ortak olan yalnızca uygulama/kargo/güven blokları; onların tekrar eden
 *   kısmı da zaten metin değil widget.
 *
 * SIRA: en benzersiz blok başta, güven bloğu sonda (dönüşüme yakın).
 * Aradaki bloklar DETERMİNİSTİK permüte edilir — aynı lokasyon hep aynı
 * sırayı alır, komşular farklı sıra gösterir; blok sınırlarındaki n-gram
 * eşleşmeleri de böylece kırılır.
 */
export function deepContentBlocks(
  service: ServiceType,
  ctx: LocationCtx,
): ContentBlock[] {
  const lead = ctx.isDistrict
    ? districtFocusBlock(service, ctx)
    : geographyBlock(service, ctx);

  const middle = ctx.isDistrict
    ? [pointsAtlasBlock(service, ctx), shippingAssuranceBlock(service, ctx)]
    : [
        pointsAtlasBlock(service, ctx),
        shippingAssuranceBlock(service, ctx),
        konyaTravelBlock(service, ctx),
      ];

  // pickDistinct havuzun tamamını istediğimizde deterministik bir permütasyon verir.
  const order = pickDistinct(
    middle.map((_, i) => i),
    middle.length,
    variantKey(service, ctx, "block-order"),
  );

  return [lead, ...order.map((i) => middle[i]), experienceBlock(service, ctx)];
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
      // YMYL: belge KURUM belgesidir. "Resmî/akredite/uluslararası geçerli"
      // ifadeleri bu sitede hiçbir yerde kullanılmaz — kardeş domaindeki
      // akademi sitesiyle aynı dil korunur.
      a: "Evet, eğitimi tamamlayan katılımcılara Akademi'nin kendi kurum belgesi (katılım/başarı sertifikası) verilir. Bu belge resmî bir yetki, akreditasyon ya da sağlık mesleği icra hakkı ifade etmez.",
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
    // NOT: "Sülükleri nasıl saklamalıyım?" ve "Tıbbi sülük ile doğadan
    // toplanan sülük farkı" soruları data/faq-pool.ts içindeki daha ayrıntılı
    // sürümleriyle değiştirildi — ikisi aynı sayfada görünmesin diye buradan
    // kaldırıldı.
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
    // NOT: "Hacamat kimlere yapılmaz?" sorusu data/faq-pool.ts içindeki
    // "genel" kapsamlı, daha ayrıntılı kontrendikasyon sorusuyla değiştirildi.
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
    // NOT: "Sülük tedavisi kimlere uygulanmaz?" ve "Sülük tekrar kullanılır
    // mı?" soruları data/faq-pool.ts içindeki ayrıntılı sürümlerine taşındı
    // (kontrendikasyon sorusu artık "genel" kapsamda, tüm hizmetlerde geçerli).
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

/** Hizmetin hangi statik SSS kapsamlarını çektiği. */
const FAQ_SCOPES: Record<ServiceType, FaqScope[]> = {
  "hacamat-kursu": ["genel", "hacamat"],
  "hacamat-nedir": ["genel", "hacamat"],
  // Malzemeler hacamat uygulaması için kullanıldığından hacamat kapsamı da alınır.
  "kupa-malzemeleri": ["genel", "malzeme", "hacamat"],
  "suluk-satisi": ["genel", "suluk"],
  "suluk-nedir": ["genel", "suluk"],
};

/**
 * Bir hizmet+lokasyon için tam SSS havuzu.
 *
 * Üç kaynak birleşir:
 *   1. `commonFaqs`      — lokasyona duyarlı, tüm hizmetlerde ortak
 *   2. `SERVICE_FAQS`    — lokasyona duyarlı, hizmete özel
 *   3. `data/faq-pool`   — statik, konuya özel (kapsam süzgeciyle)
 *
 * Havuz ne kadar büyükse sayfa başına düşen kombinasyon o kadar çeşitlenir;
 * komşu ilçelerin aynı SSS setini almasını engelleyen kaldıraç budur.
 */
export function faqPool(service: ServiceType, ctx: LocationCtx): FaqItem[] {
  const staticItems = staticFaqsFor(FAQ_SCOPES[service]).map(({ q, a }) => ({ q, a }));
  return [...commonFaqs(service, ctx), ...SERVICE_FAQS[service](ctx), ...staticItems];
}

/**
 * Sayfa için deterministik SSS seçimi: havuzdan lokasyona özel `count` adet
 * FARKLI soru. Aynı lokasyon hep aynı soruları alır; komşu ilçeler farklı
 * kombinasyon gösterir (anti-doorway).
 */
export function selectFaqs(
  service: ServiceType,
  ctx: LocationCtx,
  count = 6,
): FaqItem[] {
  const pool = faqPool(service, ctx);
  const key = `faq|${service}|${ctx.province.plate}|${ctx.district?.slug ?? ""}`;
  return pickDistinct(pool, count, key);
}
