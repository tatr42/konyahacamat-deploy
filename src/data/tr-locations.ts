/**
 * Türkiye il/ilçe veri seti — programatik SEO (pSEO) sayfaları için.
 *
 * Kapsam kararı (Faz 1 "kaliteli, sınırlı ölçek"): 81 ilin TAMAMI + büyük
 * metropollerin öne çıkan ilçeleri. Tüm ~973 ilçe DEĞİL — çünkü ince/kopya
 * içerik (doorway) riskini düşürmek istiyoruz. İlçe listesi ihtiyaca göre
 * kademeli genişletilebilir; her ekleme yeni statik sayfa üretir.
 *
 * `region` ve `plate` alanları yalnızca gösterim için değil — içerik
 * motorunun (lib/pseo/content.ts) her sayfayı lokasyona göre gerçek bilgiyle
 * FARKLILAŞTIRMASI için kullanılır (kargo bölgesi, en yakın merkez, mesafe).
 */

export type Region =
  | "Marmara"
  | "Ege"
  | "Akdeniz"
  | "İç Anadolu"
  | "Karadeniz"
  | "Doğu Anadolu"
  | "Güneydoğu Anadolu";

export interface District {
  /** URL slug — ör. "selcuklu" */
  slug: string;
  /** Görünen ad — ör. "Selçuklu" */
  name: string;
}

export interface Province {
  /** URL slug — ör. "konya" */
  slug: string;
  /** Görünen ad — ör. "Konya" */
  name: string;
  /** Plaka kodu — ör. 42 */
  plate: number;
  /** Coğrafi bölge — içerik farklılaştırması için */
  region: Region;
  /** Büyükşehir mi? — kargo/hizmet ifadelerini etkiler */
  metro?: boolean;
  /** Kapsanan öne çıkan ilçeler (tümü değil) */
  districts: District[];
}

const d = (name: string): District => ({ slug: slugify(name), name });

/** Türkçe karakter duyarlı slug üretimi. */
export function slugify(input: string): string {
  const map: Record<string, string> = {
    ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i", ö: "o", Ö: "o",
    ş: "s", Ş: "s", ü: "u", Ü: "u", â: "a", î: "i", û: "u",
  };
  return input
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const PROVINCES: Province[] = [
  { slug: "adana", name: "Adana", plate: 1, region: "Akdeniz", metro: true, districts: ["Seyhan", "Yüreğir", "Çukurova", "Sarıçam", "Ceyhan"].map(d) },
  { slug: "adiyaman", name: "Adıyaman", plate: 2, region: "Güneydoğu Anadolu", districts: ["Merkez", "Kâhta", "Besni"].map(d) },
  { slug: "afyonkarahisar", name: "Afyonkarahisar", plate: 3, region: "Ege", districts: ["Merkez", "Sandıklı", "Dinar", "Bolvadin"].map(d) },
  { slug: "agri", name: "Ağrı", plate: 4, region: "Doğu Anadolu", districts: ["Merkez", "Patnos", "Doğubayazıt"].map(d) },
  { slug: "amasya", name: "Amasya", plate: 5, region: "Karadeniz", districts: ["Merkez", "Merzifon", "Suluova"].map(d) },
  { slug: "ankara", name: "Ankara", plate: 6, region: "İç Anadolu", metro: true, districts: ["Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Etimesgut", "Sincan", "Altındağ", "Pursaklar"].map(d) },
  { slug: "antalya", name: "Antalya", plate: 7, region: "Akdeniz", metro: true, districts: ["Muratpaşa", "Kepez", "Konyaaltı", "Alanya", "Manavgat", "Serik"].map(d) },
  { slug: "artvin", name: "Artvin", plate: 8, region: "Karadeniz", districts: ["Merkez", "Hopa", "Borçka"].map(d) },
  { slug: "aydin", name: "Aydın", plate: 9, region: "Ege", metro: true, districts: ["Efeler", "Nazilli", "Söke", "Kuşadası", "Didim"].map(d) },
  { slug: "balikesir", name: "Balıkesir", plate: 10, region: "Marmara", metro: true, districts: ["Altıeylül", "Karesi", "Edremit", "Bandırma", "Gönen"].map(d) },
  { slug: "bilecik", name: "Bilecik", plate: 11, region: "Marmara", districts: ["Merkez", "Bozüyük", "Osmaneli"].map(d) },
  { slug: "bingol", name: "Bingöl", plate: 12, region: "Doğu Anadolu", districts: ["Merkez", "Genç", "Solhan"].map(d) },
  { slug: "bitlis", name: "Bitlis", plate: 13, region: "Doğu Anadolu", districts: ["Merkez", "Tatvan", "Ahlat"].map(d) },
  { slug: "bolu", name: "Bolu", plate: 14, region: "Karadeniz", districts: ["Merkez", "Gerede", "Mudurnu"].map(d) },
  { slug: "burdur", name: "Burdur", plate: 15, region: "Akdeniz", districts: ["Merkez", "Bucak", "Gölhisar"].map(d) },
  { slug: "bursa", name: "Bursa", plate: 16, region: "Marmara", metro: true, districts: ["Osmangazi", "Yıldırım", "Nilüfer", "İnegöl", "Gemlik", "Mudanya", "Gürsu"].map(d) },
  { slug: "canakkale", name: "Çanakkale", plate: 17, region: "Marmara", districts: ["Merkez", "Biga", "Çan", "Gelibolu"].map(d) },
  { slug: "cankiri", name: "Çankırı", plate: 18, region: "İç Anadolu", districts: ["Merkez", "Çerkeş", "Ilgaz"].map(d) },
  { slug: "corum", name: "Çorum", plate: 19, region: "Karadeniz", districts: ["Merkez", "Sungurlu", "Osmancık"].map(d) },
  { slug: "denizli", name: "Denizli", plate: 20, region: "Ege", metro: true, districts: ["Pamukkale", "Merkezefendi", "Çivril", "Acıpayam"].map(d) },
  { slug: "diyarbakir", name: "Diyarbakır", plate: 21, region: "Güneydoğu Anadolu", metro: true, districts: ["Bağlar", "Kayapınar", "Yenişehir", "Sur", "Ergani"].map(d) },
  { slug: "edirne", name: "Edirne", plate: 22, region: "Marmara", districts: ["Merkez", "Keşan", "Uzunköprü"].map(d) },
  { slug: "elazig", name: "Elazığ", plate: 23, region: "Doğu Anadolu", districts: ["Merkez", "Kovancılar", "Karakoçan"].map(d) },
  { slug: "erzincan", name: "Erzincan", plate: 24, region: "Doğu Anadolu", districts: ["Merkez", "Tercan", "Üzümlü"].map(d) },
  { slug: "erzurum", name: "Erzurum", plate: 25, region: "Doğu Anadolu", metro: true, districts: ["Yakutiye", "Palandöken", "Aziziye", "Oltu"].map(d) },
  { slug: "eskisehir", name: "Eskişehir", plate: 26, region: "İç Anadolu", metro: true, districts: ["Odunpazarı", "Tepebaşı", "Sivrihisar"].map(d) },
  { slug: "gaziantep", name: "Gaziantep", plate: 27, region: "Güneydoğu Anadolu", metro: true, districts: ["Şahinbey", "Şehitkamil", "Nizip", "İslahiye"].map(d) },
  { slug: "giresun", name: "Giresun", plate: 28, region: "Karadeniz", districts: ["Merkez", "Bulancak", "Espiye"].map(d) },
  { slug: "gumushane", name: "Gümüşhane", plate: 29, region: "Karadeniz", districts: ["Merkez", "Kelkit", "Şiran"].map(d) },
  { slug: "hakkari", name: "Hakkâri", plate: 30, region: "Doğu Anadolu", districts: ["Merkez", "Yüksekova", "Şemdinli"].map(d) },
  { slug: "hatay", name: "Hatay", plate: 31, region: "Akdeniz", metro: true, districts: ["Antakya", "İskenderun", "Defne", "Dörtyol", "Samandağ"].map(d) },
  { slug: "isparta", name: "Isparta", plate: 32, region: "Akdeniz", districts: ["Merkez", "Yalvaç", "Eğirdir"].map(d) },
  { slug: "mersin", name: "Mersin", plate: 33, region: "Akdeniz", metro: true, districts: ["Yenişehir", "Toroslar", "Akdeniz", "Mezitli", "Tarsus", "Erdemli"].map(d) },
  { slug: "istanbul", name: "İstanbul", plate: 34, region: "Marmara", metro: true, districts: ["Kadıköy", "Üsküdar", "Beşiktaş", "Şişli", "Bakırköy", "Fatih", "Beyoğlu", "Ümraniye", "Maltepe", "Pendik", "Kartal", "Ataşehir", "Bağcılar", "Esenyurt", "Küçükçekmece", "Başakşehir", "Sultanbeyli", "Sancaktepe", "Çekmeköy", "Beylikdüzü"].map(d) },
  { slug: "izmir", name: "İzmir", plate: 35, region: "Ege", metro: true, districts: ["Konak", "Karşıyaka", "Bornova", "Buca", "Bayraklı", "Çiğli", "Gaziemir", "Karabağlar", "Menemen", "Torbalı", "Ödemiş"].map(d) },
  { slug: "kars", name: "Kars", plate: 36, region: "Doğu Anadolu", districts: ["Merkez", "Sarıkamış", "Kağızman"].map(d) },
  { slug: "kastamonu", name: "Kastamonu", plate: 37, region: "Karadeniz", districts: ["Merkez", "Tosya", "Taşköprü"].map(d) },
  { slug: "kayseri", name: "Kayseri", plate: 38, region: "İç Anadolu", metro: true, districts: ["Melikgazi", "Kocasinan", "Talas", "Develi", "Yahyalı"].map(d) },
  { slug: "kirklareli", name: "Kırklareli", plate: 39, region: "Marmara", districts: ["Merkez", "Lüleburgaz", "Babaeski"].map(d) },
  { slug: "kirsehir", name: "Kırşehir", plate: 40, region: "İç Anadolu", districts: ["Merkez", "Kaman", "Mucur"].map(d) },
  { slug: "kocaeli", name: "Kocaeli", plate: 41, region: "Marmara", metro: true, districts: ["İzmit", "Gebze", "Darıca", "Körfez", "Gölcük", "Derince"].map(d) },
  { slug: "konya", name: "Konya", plate: 42, region: "İç Anadolu", metro: true, districts: ["Selçuklu", "Meram", "Karatay", "Ereğli", "Akşehir", "Beyşehir", "Çumra", "Seydişehir"].map(d) },
  { slug: "kutahya", name: "Kütahya", plate: 43, region: "Ege", districts: ["Merkez", "Tavşanlı", "Simav", "Gediz"].map(d) },
  { slug: "malatya", name: "Malatya", plate: 44, region: "Doğu Anadolu", metro: true, districts: ["Battalgazi", "Yeşilyurt", "Doğanşehir"].map(d) },
  { slug: "manisa", name: "Manisa", plate: 45, region: "Ege", metro: true, districts: ["Yunusemre", "Şehzadeler", "Akhisar", "Turgutlu", "Salihli", "Soma"].map(d) },
  { slug: "kahramanmaras", name: "Kahramanmaraş", plate: 46, region: "Akdeniz", metro: true, districts: ["Onikişubat", "Dulkadiroğlu", "Elbistan", "Afşin"].map(d) },
  { slug: "mardin", name: "Mardin", plate: 47, region: "Güneydoğu Anadolu", metro: true, districts: ["Artuklu", "Kızıltepe", "Midyat", "Nusaybin"].map(d) },
  { slug: "mugla", name: "Muğla", plate: 48, region: "Ege", metro: true, districts: ["Menteşe", "Bodrum", "Fethiye", "Marmaris", "Milas", "Ortaca"].map(d) },
  { slug: "mus", name: "Muş", plate: 49, region: "Doğu Anadolu", districts: ["Merkez", "Bulanık", "Malazgirt"].map(d) },
  { slug: "nevsehir", name: "Nevşehir", plate: 50, region: "İç Anadolu", districts: ["Merkez", "Ürgüp", "Avanos"].map(d) },
  { slug: "nigde", name: "Niğde", plate: 51, region: "İç Anadolu", districts: ["Merkez", "Bor", "Çamardı"].map(d) },
  { slug: "ordu", name: "Ordu", plate: 52, region: "Karadeniz", metro: true, districts: ["Altınordu", "Ünye", "Fatsa"].map(d) },
  { slug: "rize", name: "Rize", plate: 53, region: "Karadeniz", districts: ["Merkez", "Çayeli", "Ardeşen", "Pazar"].map(d) },
  { slug: "sakarya", name: "Sakarya", plate: 54, region: "Marmara", metro: true, districts: ["Adapazarı", "Serdivan", "Erenler", "Akyazı", "Hendek"].map(d) },
  { slug: "samsun", name: "Samsun", plate: 55, region: "Karadeniz", metro: true, districts: ["İlkadım", "Atakum", "Canik", "Bafra", "Çarşamba"].map(d) },
  { slug: "siirt", name: "Siirt", plate: 56, region: "Güneydoğu Anadolu", districts: ["Merkez", "Kurtalan", "Pervari"].map(d) },
  { slug: "sinop", name: "Sinop", plate: 57, region: "Karadeniz", districts: ["Merkez", "Boyabat", "Gerze"].map(d) },
  { slug: "sivas", name: "Sivas", plate: 58, region: "İç Anadolu", districts: ["Merkez", "Şarkışla", "Yıldızeli", "Suşehri"].map(d) },
  { slug: "tekirdag", name: "Tekirdağ", plate: 59, region: "Marmara", metro: true, districts: ["Süleymanpaşa", "Çorlu", "Çerkezköy", "Kapaklı", "Malkara"].map(d) },
  { slug: "tokat", name: "Tokat", plate: 60, region: "Karadeniz", districts: ["Merkez", "Erbaa", "Turhal", "Niksar"].map(d) },
  { slug: "trabzon", name: "Trabzon", plate: 61, region: "Karadeniz", metro: true, districts: ["Ortahisar", "Akçaabat", "Of", "Araklı", "Vakfıkebir"].map(d) },
  { slug: "tunceli", name: "Tunceli", plate: 62, region: "Doğu Anadolu", districts: ["Merkez", "Pertek", "Mazgirt"].map(d) },
  { slug: "sanliurfa", name: "Şanlıurfa", plate: 63, region: "Güneydoğu Anadolu", metro: true, districts: ["Eyyübiye", "Haliliye", "Karaköprü", "Siverek", "Viranşehir", "Birecik"].map(d) },
  { slug: "usak", name: "Uşak", plate: 64, region: "Ege", districts: ["Merkez", "Banaz", "Eşme"].map(d) },
  { slug: "van", name: "Van", plate: 65, region: "Doğu Anadolu", metro: true, districts: ["İpekyolu", "Tuşba", "Edremit", "Erciş", "Özalp"].map(d) },
  { slug: "yozgat", name: "Yozgat", plate: 66, region: "İç Anadolu", districts: ["Merkez", "Sorgun", "Yerköy"].map(d) },
  { slug: "zonguldak", name: "Zonguldak", plate: 67, region: "Karadeniz", districts: ["Merkez", "Ereğli", "Çaycuma", "Devrek"].map(d) },
  { slug: "aksaray", name: "Aksaray", plate: 68, region: "İç Anadolu", districts: ["Merkez", "Ortaköy", "Eskil"].map(d) },
  { slug: "bayburt", name: "Bayburt", plate: 69, region: "Karadeniz", districts: ["Merkez", "Demirözü", "Aydıntepe"].map(d) },
  { slug: "karaman", name: "Karaman", plate: 70, region: "İç Anadolu", districts: ["Merkez", "Ermenek", "Sarıveliler"].map(d) },
  { slug: "kirikkale", name: "Kırıkkale", plate: 71, region: "İç Anadolu", districts: ["Merkez", "Yahşihan", "Keskin"].map(d) },
  { slug: "batman", name: "Batman", plate: 72, region: "Güneydoğu Anadolu", districts: ["Merkez", "Kozluk", "Sason"].map(d) },
  { slug: "sirnak", name: "Şırnak", plate: 73, region: "Güneydoğu Anadolu", districts: ["Merkez", "Cizre", "Silopi", "İdil"].map(d) },
  { slug: "bartin", name: "Bartın", plate: 74, region: "Karadeniz", districts: ["Merkez", "Amasra", "Ulus"].map(d) },
  { slug: "ardahan", name: "Ardahan", plate: 75, region: "Doğu Anadolu", districts: ["Merkez", "Göle", "Çıldır"].map(d) },
  { slug: "igdir", name: "Iğdır", plate: 76, region: "Doğu Anadolu", districts: ["Merkez", "Tuzluca", "Aralık"].map(d) },
  { slug: "yalova", name: "Yalova", plate: 77, region: "Marmara", districts: ["Merkez", "Çınarcık", "Altınova"].map(d) },
  { slug: "karabuk", name: "Karabük", plate: 78, region: "Karadeniz", districts: ["Merkez", "Safranbolu", "Yenice"].map(d) },
  { slug: "kilis", name: "Kilis", plate: 79, region: "Güneydoğu Anadolu", districts: ["Merkez", "Musabeyli", "Elbeyli"].map(d) },
  { slug: "osmaniye", name: "Osmaniye", plate: 80, region: "Akdeniz", districts: ["Merkez", "Kadirli", "Düziçi"].map(d) },
  { slug: "duzce", name: "Düzce", plate: 81, region: "Karadeniz", districts: ["Merkez", "Akçakoca", "Gölyaka"].map(d) },
];

/** slug → Province hızlı erişim. */
export const PROVINCE_BY_SLUG: Record<string, Province> = Object.fromEntries(
  PROVINCES.map((p) => [p.slug, p]),
);

export function getProvince(slug: string): Province | undefined {
  return PROVINCE_BY_SLUG[slug];
}

export function getDistrict(
  provinceSlug: string,
  districtSlug: string,
): { province: Province; district: District } | undefined {
  const province = PROVINCE_BY_SLUG[provinceSlug];
  if (!province) return undefined;
  const district = province.districts.find((x) => x.slug === districtSlug);
  if (!district) return undefined;
  return { province, district };
}

/** Konya'ya (merkez) coğrafi yakınlık — içerik ifadeleri için kaba sınıflama. */
export const KONYA_REGION: Region = "İç Anadolu";

/** Bölgelerin gösterim sırası — dizin/hub sayfalarında kullanılır. */
export const REGION_ORDER: Region[] = [
  "İç Anadolu",
  "Marmara",
  "Ege",
  "Akdeniz",
  "Karadeniz",
  "Doğu Anadolu",
  "Güneydoğu Anadolu",
];

/** İlleri bölgeye göre gruplar (bölge sırası REGION_ORDER, il sırası plaka). */
export function provincesByRegion(): { region: Region; provinces: Province[] }[] {
  return REGION_ORDER.map((region) => ({
    region,
    provinces: PROVINCES.filter((p) => p.region === region).sort(
      (a, b) => a.plate - b.plate,
    ),
  })).filter((g) => g.provinces.length > 0);
}
