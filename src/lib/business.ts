/**
 * İŞLETME SABİTLERİ — telefon, adres, sosyal hesap ve künye bilgisinin
 * TEK DOĞRULUK KAYNAĞI.
 *
 * NEDEN VAR:
 *   Bu değerler daha önce 11+ dosyada elle tekrarlanıyordu ve çoktan ayrışmıştı:
 *     - Instagram/Facebook adresi JSON-LD şemasında bir, footer'da BAŞKA idi
 *       (`sameAs` doğrulaması bu yüzden kırılıyordu),
 *     - deneyim yılı üç ayrı yerde üç farklı biçimde hesaplanıyordu
 *       (`getYearsExpStr()`, elle "32+", `new Date().getFullYear() - 1994`).
 *   Tek kaynağa bağlanınca bu tür kayma yapısal olarak imkânsız hale gelir.
 *
 * KURAL: Buraya YALNIZCA doğrulanmış gerçek veri yazılır. Bilinmeyen bir alan
 * uydurulmaz — `undefined` bırakılır ve onu tüketen kod alanı hiç basmaz.
 * (Yanlış adres/koordinat, eksik olandan daha çok zarar verir.)
 *
 * Not: `next.config.ts` Node tarafında yüklenir ve `@/` takma adını çözemez.
 * Bu modül next.config'ten İTHAL EDİLMEZ; oradan lazım olursa `pseo-scope.ts`
 * gibi göreli import kullanan ayrı bir modül gerekir.
 */

/** Kanonik site kökü — sondaki eğik çizgi YOK (şema/sitemap birleştirmesi için). */
export const BASE_URL = "https://www.konyahacamat.net";

/** Mutlak URL üretir. JSON-LD göreli yol kabul etmez; `metadataBase` oraya uygulanmaz. */
export function abs(path: string): string {
  return new URL(path, BASE_URL).toString();
}

interface PhoneLine {
  /** Ekranda görünen biçim — ör. "+90 554 406 23 83" */
  display: string;
  /** `tel:` ve `wa.me` için sadece rakam — ör. "905544062383" */
  raw: string;
}

const phoneTr: PhoneLine = {
  display: "+90 554 406 23 83",
  raw: "905544062383",
};

const phoneDe: PhoneLine = {
  display: "+49 163 449 28 70",
  raw: "491634492870",
};

export const BUSINESS = {
  /** Ticari/marka adı — şemadaki `name`. */
  name: "Ebusadullah Hacamat & Akademi",
  /** Halkın aradığı ikincil ad — şemadaki `alternateName`. */
  alternateName: "Konya Hacamat Ebusadullah",

  /**
   * KVKK aydınlatma metninde geçmesi gereken VERİ SORUMLUSU unvanı.
   */
  legalName: "Ebusadullah Hacamat & Akademi",

  email: "info@konyahacamat.net",

  phone: {
    tr: phoneTr,
    de: phoneDe,
  },

  /** WhatsApp hatları — `raw` ile aynı numaralar, niyet ayrımı için ayrı isim. */
  whatsapp: {
    tr: phoneTr.raw,
    de: phoneDe.raw,
  },

  address: {
    street: "Sahibiata Mh. Taşcami Uzunharmanlar Cd. No: 16-4",
    district: "Meram",
    city: "Konya",
    postalCode: "42040",
    country: "TR",
    /**
     * Google İşletme Profili pin'inden alınan KESİN koordinatlar.
     * Kaynak: "KONYA HACAMAT EBUSADULLAH" kaydı (bkz. GOOGLE_PLACE) —
     * ilçe/şehir merkezi koordinatı DEĞİL, işletme pin'inin kendisi.
     */
    geo: { latitude: 37.866483, longitude: 32.493991 } as
      | { latitude: number; longitude: number }
      | undefined,
  },

  /** Pzt–Cmt 09:00–18:00, Pazar kapalı. */
  openingHours: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ] as const,
    opens: "09:00",
    closes: "18:00",
  },

  /** Doğrulanmış kanonik sosyal medya bağlantıları. */
  social: {
    instagram: "https://www.instagram.com/konya_hacamat",
    facebook: "https://www.facebook.com/konyahacamat.com.tr/",
  },

  foundedYear: 1994,
  graduates: 1200,
} as const;

/**
 * GOOGLE İŞLETME PROFİLİ — haritada gömülen kaydın kimliği.
 *
 * NEDEN CID/PLACE ID İLE:
 *   Önceki gömme adresi metin olarak sorguluyordu
 *   (`?q=Sahibiata Mh. ...&output=embed`). Bu, Google'ın adresi her
 *   istekte yeniden geokodlamasına bırakır: pin işletme kaydına değil,
 *   sokağın tahmini bir noktasına düşer ve kartta işletme adı/puanı
 *   görünmez. CID ile gömüldüğünde harita DOĞRUDAN işletme kaydını
 *   açar — ad, puan, "Yol tarifi" ve profil bağlantısı Google'dan gelir.
 *
 * CID = Place ID'nin ondalık karşılığı (0x689fef5a7d617be8).
 * Anahtar (API key) gerekmez; `output=embed` uç noktası ücretsizdir.
 *
 * Adres ve NAP doğrulanmış olup kanonik adres: Sahibiata Mh. Taşcami Uzunharmanlar Cd. No: 16-4, 42040 Meram/Konya.
 */
export const GOOGLE_PLACE = {
  /** Google Haritalar'daki kayıt adı (gömülü kartta görünen ad). */
  name: "KONYA HACAMAT EBUSADULLAH",
  placeId: "ChIJS2aWjgOF0BQR6HthfVrvn2g",
  /** Place ID'nin ondalık CID karşılığı — embed ve `?cid=` bağlantıları için. */
  cid: "7539007473171135464",
  /** Google Haritalar'daki artı kod (Plus Code). */
  plusCode: "VF8V+HH Meram, Konya",
} as const;

/**
 * Gömülü harita `src`'si — işletme kaydını doğrudan açar.
 * @param zoom Yakınlaştırma düzeyi (varsayılan 17 — bina ölçeği).
 */
export function mapEmbedSrc(zoom = 17): string {
  return `https://maps.google.com/maps?cid=${GOOGLE_PLACE.cid}&hl=tr&z=${zoom}&output=embed`;
}

/** Google Haritalar işletme profili — yeni sekmede açılacak kanonik bağlantı. */
export function mapPlaceHref(): string {
  return `https://www.google.com/maps?cid=${GOOGLE_PLACE.cid}`;
}

/** "Yol tarifi al" — hedef, adres metni değil işletme kaydının kendisi. */
export function mapDirectionsHref(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    GOOGLE_PLACE.name,
  )}&destination_place_id=${GOOGLE_PLACE.placeId}`;
}

// ─── Türetilmiş değerler ─────────────────────────────────────────────────

/** 1994'ten bu yana geçen yıl — her yıl otomatik artar. */
export function yearsOfExperience(): number {
  return new Date().getFullYear() - BUSINESS.foundedYear;
}

/** Pazarlama metinlerinde kullanılan "32+" biçimi. */
export function yearsOfExperienceLabel(): string {
  return `${yearsOfExperience()}+`;
}

/** `tel:` bağlantısı — ör. "tel:+905544062383" */
export function telHref(line: PhoneLine = BUSINESS.phone.tr): string {
  return `tel:+${line.raw}`;
}

/** Ön dolgulu WhatsApp derin bağlantısı. */
export function waHref(message: string, number: string = BUSINESS.whatsapp.tr): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Tek satırlık adres — ör. "Sahibiata Mh. ... No: 16-4, 42040 Meram/Konya" */
export function addressLine(): string {
  const a = BUSINESS.address;
  return `${a.street}, ${a.postalCode} ${a.district}/${a.city}`;
}

// ─── JSON-LD parçaları ───────────────────────────────────────────────────

/** schema.org `PostalAddress`. */
export function postalAddressSchema() {
  const a = BUSINESS.address;
  return {
    "@type": "PostalAddress",
    streetAddress: a.street,
    addressLocality: a.district,
    addressRegion: a.city,
    postalCode: a.postalCode,
    addressCountry: a.country,
  };
}

/**
 * schema.org `GeoCoordinates` — koordinat doğrulanmadıysa `undefined` döner.
 * `JSON.stringify` undefined alanları atar, bu yüzden şemaya hiç yazılmaz.
 */
export function geoSchema() {
  const geo = BUSINESS.address.geo;
  if (!geo) return undefined;
  return {
    "@type": "GeoCoordinates",
    latitude: geo.latitude,
    longitude: geo.longitude,
  };
}

/** schema.org `OpeningHoursSpecification`. */
export function openingHoursSchema() {
  const h = BUSINESS.openingHours;
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    },
  ];
}

/** İşletme varlığının kanonik `@id`'si — tüm şemalar buna referans verir. */
export const BUSINESS_ID = `${BASE_URL}/#localbusiness`;
