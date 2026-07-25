/**
 * STATİK SSS HAVUZU — lokasyondan bağımsız sorular.
 *
 * `lib/pseo/content.ts` içindeki SSS motoru iki kaynaktan beslenir:
 *   1. Bu dosya — her yerde aynı olan, konuya özel bilgi soruları
 *   2. content.ts — lokasyona duyarlı sorular (kargo süresi, yüz yüze hizmet…)
 *
 * Havuz büyüdükçe sayfa başına gösterilen kombinasyon sayısı artar; bu,
 * komşu ilçe sayfalarının aynı SSS setini almasını engelleyen kaldıraçtır.
 *
 * ─── YMYL / E-E-A-T DİL KURALI ────────────────────────────────────────────
 * Bu içerik sağlık konusundadır. "İyileştirir", "tedavi eder", "kesin
 * çözümdür" gibi iddialar KULLANILMAZ. Bunun yerine geleneksel bağlam,
 * hijyen standardı, kontrendikasyon ve lojistik bilgi öne çıkarılır.
 * Yeni madde eklerken bu kurala uyun.
 */

/**
 * Sorunun hangi hizmet sayfalarında görüneceğini belirler.
 *   genel   → tüm hizmetler
 *   suluk   → sülük satışı / sülük bilgi sayfaları
 *   hacamat → hacamat kursu / hacamat bilgi sayfaları
 *   malzeme → kupa & hacamat malzemeleri
 */
export type FaqScope = "genel" | "suluk" | "hacamat" | "malzeme";

export interface StaticFaq {
  q: string;
  a: string;
  scope: FaqScope;
}

export const STATIC_FAQS: StaticFaq[] = [
  // ── Tüm hizmetlerde geçerli ──────────────────────────────────────────
  {
    scope: "genel",
    q: "Hacamat veya sülük uygulamasından hemen sonra duş alınabilir mi?",
    a: "Uygulama bölgesinin enfeksiyon kapmaması ve kabuklanma sürecinin sağlıklı başlaması için işlemden sonraki 12-24 saat içinde duş alınması önerilmez. Duş alındığında ise keselenmekten kaçınılmalıdır.",
  },
  {
    scope: "genel",
    q: "Uygulama öncesinde dikkat edilmesi gereken beslenme kuralları nelerdir?",
    a: "Geleneksel uygulamalarda işlemden en az 2-3 saat önce yeme içmenin kesilmesi (hafif açlık durumu) tavsiye edilir. Ayrıca işlemden bir gün önce ve sonra ağır hayvansal proteinlerin tüketimi genellikle önerilmez.",
  },
  {
    scope: "genel",
    q: "Kimler sülük veya hacamat uygulaması yaptıramaz?",
    a: "Hemofili (kan pıhtılaşması sorunu) hastaları, aktif kanaması olanlar, ileri derece anemi (kansızlık) hastaları, hamileler ve kan sulandırıcı ilaç kullanan kişilere bu işlemler uygulanmaz. İşlem öncesi mutlaka uzman görüşü alınmalıdır.",
  },

  // ── Sülük / hirudoterapi ─────────────────────────────────────────────
  {
    scope: "suluk",
    q: "Tıbbi sülükler bir hastadan sonra başka birinde kullanılabilir mi?",
    a: "Hayır, kesinlikle kullanılamaz. Tıbbi sülükler (Hirudo medicinalis), kan yoluyla bulaşabilen enfeksiyon risklerini tamamen ortadan kaldırmak amacıyla tek kullanımlıktır. İşlem sonrası tıbbi atık prosedürlerine uygun olarak imha edilirler.",
  },
  {
    scope: "suluk",
    q: "Sülük uygulaması sırasında veya sonrasında ağrı hissedilir mi?",
    a: "Sülüklerin tutunma anında sinek ısırığına benzer hafif bir his oluşabilir. Ancak sülüğün salgıladığı biyoaktif enzimler (hirudin ve doğal anestezikler) sayesinde işlem sırasında genellikle ağrı hissedilmez.",
  },
  {
    scope: "suluk",
    q: "Sülük işlemi sonrası kanama ne kadar sürer ve bu durum normal midir?",
    a: "Sülüğün salgıladığı kan sulandırıcı enzimler nedeniyle, işlem bölgesinden 12 ila 24 saat arasında hafif bir sızıntı şeklinde kanama olması beklenen ve normal bir durumdur. Bölge steril bezlerle kapatılmalıdır.",
  },
  {
    scope: "suluk",
    q: "Sipariş verilen tıbbi sülükler evde nasıl muhafaza edilmelidir?",
    a: "Sülükler klorlu çeşme suyu yerine, klorsuz içme suyu konulmuş cam kavanozlarda saklanmalıdır. Kavanozun ağzı hava alan ince bir tülbentle kapatılmalı ve doğrudan güneş görmeyen serin bir yerde tutulmalıdır.",
  },
  {
    scope: "suluk",
    q: "Doğadan toplanan sülük ile sülük çiftliklerinde üretilen sülük arasında ne fark vardır?",
    // NOT: Bu yanıtta önceden "Sağlık Bakanlığı yönergelerine uygun" ifadesi
    // vardı. Doğrulanmamış bir MEVZUAT UYGUNLUK iddiası olduğu ve içerik YMYL
    // kategorisinde bulunduğu için kaldırıldı. Resmî belge teyidi yapılmadan
    // kurum/mevzuat adı geçen iddia eklemeyin.
    a: "Doğadan toplanan sülükler ağır metaller, parazitler veya farklı hastalıklar taşıma riski barındırır. Kontrollü çiftlik ortamında yetiştirilen tıbbi sülükler ise takip edilebilir koşullarda üretilir ve uygulamaya hazır olarak temin edilir.",
  },

  // ── Hacamat ──────────────────────────────────────────────────────────
  {
    scope: "hacamat",
    q: "Hacamat günleri (Sünnet olan günler) dışındaki günlerde işlem yapılır mı?",
    a: "Hacamat geleneksel olarak Hicri takvimin 17, 19 ve 21. günlerinde (sünnet günleri) tavsiye edilse de, akut bir şikayet söz konusu olduğunda haftanın herhangi bir günü de uzman kontrolünde yapılabilir.",
  },
];

/** Bir kapsam listesine göre statik soruları süzer. */
export function staticFaqsFor(scopes: FaqScope[]): StaticFaq[] {
  const wanted = new Set(scopes);
  return STATIC_FAQS.filter((f) => wanted.has(f.scope));
}
