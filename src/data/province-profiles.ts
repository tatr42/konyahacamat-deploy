/**
 * İL PROFİLLERİ — Faz 1 "gerçek bilgi" katmanı.
 *
 * NEDEN VAR:
 *   Faz 0 öncesi ölçümde silo içi il-il benzerlik %46-58'di (5-gram Jaccard).
 *   Sebep: ~580 kelimelik gövdenin ~300'ü 81 ilde harfi harfine aynıydı;
 *   sadece `${il}` değişiyordu. Bu dosya, her il için GERÇEKTEN FARKLI ve
 *   DOĞRULANABİLİR bilgi sağlar — kelime oyunu değil, farklı içerik.
 *
 * DÜRÜSTLÜK KURALI (kullanıcı kararı, 2026-07-26):
 *   Şehir bazlı iş verimiz YOK. Bu yüzden burada "Ankara'da 240 mezunumuz var"
 *   türü UYDURMA İSTATİSTİK BULUNMAZ ve eklenmemelidir. Yalnızca coğrafya,
 *   iklim ve lojistik gibi kamuya açık, doğrulanabilir olgular yer alır.
 *
 * ALAN GÜVENİLİRLİĞİ:
 *   - `neighbors`   : Kara sınırı komşusu iller. Kesin veri.
 *   - `distanceKm`  : Konya'ya YAKLAŞIK karayolu mesafesi, 10 km'ye yuvarlı.
 *                     İçerik çerçevesi içindir; navigasyon amaçlı DEĞİLDİR.
 *                     Metinde "yaklaşık" ifadesiyle sunulmalıdır.
 *   - `cargoHat`    : Konya'dan çıkan gönderinin izlediği ana karayolu koridoru.
 *   - `sevkiyatRiski`: YAPISAL alan — içerik motoru buna göre FARKLI blok seçer.
 *                     Canlı sülük gönderiminde sıcaklık gerçek bir kısıt olduğu
 *                     için bu alan dolgu değil, işin fiili şartı.
 *   - `iklimNotu`   : Sevkiyatı etkileyen iklim özeti (1 cümle).
 *   - `yerelNot`    : İle özgü, doğrulanabilir kısa not (1 cümle).
 *
 * BAKIM: `yerelNot` ve `iklimNotu` alanları elle zenginleştirilmeye açıktır;
 * yerel bilgisi olan biri düzelttikçe içerik kalitesi doğrudan artar.
 */

import { PROVINCES } from "./tr-locations";

/**
 * Canlı gönderi (sülük) için mevsimsel risk sınıfı.
 * İçerik motoru bu alana göre farklı paketleme/zamanlama bloğu basar.
 */
export type SevkiyatRiski =
  /** Yaz aylarında yüksek sıcaklık — termal yalıtım ve erken saat sevkiyatı */
  | "yaz-sicak"
  /** Kış aylarında donma riski / yol kapanması — ısı koruması ve tarih planı */
  | "kis-donma"
  /** Belirgin ek önlem gerektirmeyen ılıman hat */
  | "standart";

export interface ProvinceProfile {
  /** Kara sınırı komşusu iller (görünen ad). */
  neighbors: string[];
  /** Konya'ya yaklaşık karayolu mesafesi (km, 10'a yuvarlı). */
  distanceKm: number;
  /** Konya'dan çıkan gönderinin izlediği ana koridor. */
  cargoHat: string;
  /** Yapısal alan — koşullu blok seçimini sürer. */
  sevkiyatRiski: SevkiyatRiski;
  /** Sevkiyatı etkileyen iklim özeti. */
  iklimNotu: string;
  /** İle özgü, doğrulanabilir kısa not. */
  yerelNot: string;
}

export const PROVINCE_PROFILES: Record<string, ProvinceProfile> = {
  adana: {
    neighbors: ["Mersin", "Niğde", "Kayseri", "Kahramanmaraş", "Osmaniye", "Hatay"],
    distanceKm: 350,
    cargoHat: "Konya–Ereğli–Pozantı (Tarsus otoyolu) hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Çukurova'da yaz sıcaklıkları uzun süre 35–40 °C bandında seyreder; canlı gönderide termal yalıtım belirleyicidir.",
    yerelNot: "Çukurova ovasının merkezi ve bölgenin ticaret-lojistik düğümü olduğu için kargo bağlantıları güçlüdür.",
  },
  adiyaman: {
    neighbors: ["Malatya", "Elazığ", "Diyarbakır", "Şanlıurfa", "Gaziantep", "Kahramanmaraş"],
    distanceKm: 750,
    cargoHat: "Konya–Kayseri–Kahramanmaraş–Adıyaman hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Yazları sıcak ve kurak geçer; temmuz–ağustos gönderilerinde ilave ısı koruması uygulanır.",
    yerelNot: "Nemrut Dağı çevresindeki turizm hareketliliği nedeniyle şehirlerarası ulaşım bağlantısı düzenlidir.",
  },
  afyonkarahisar: {
    neighbors: ["Uşak", "Denizli", "Burdur", "Isparta", "Konya", "Eskişehir", "Kütahya"],
    distanceKm: 225,
    cargoHat: "Konya–Akşehir–Afyon karayolu (komşu il hattı)",
    sevkiyatRiski: "standart",
    iklimNotu: "Karasal iklim hâkimdir; kış aylarında gece donları görülse de gönderiler kısa sürede ulaşır.",
    yerelNot: "Konya'nın kuzeybatı komşusudur ve Ege'ye açılan ana kavşak konumundadır; gönderiler genellikle aynı gün yola çıkar.",
  },
  agri: {
    neighbors: ["Kars", "Erzurum", "Muş", "Bitlis", "Van", "Iğdır"],
    distanceKm: 1180,
    cargoHat: "Konya–Kayseri–Sivas–Erzurum–Ağrı hattı",
    sevkiyatRiski: "kis-donma",
    iklimNotu: "Türkiye'nin en sert kış koşullarına sahip illerindendir; kış gönderilerinde donmaya karşı ısı koruması zorunludur.",
    yerelNot: "Yüksek rakımlı bir plato ilidir; kış aylarında yol koşulları teslim süresini uzatabilir.",
  },
  amasya: {
    neighbors: ["Samsun", "Tokat", "Yozgat", "Çorum"],
    distanceKm: 620,
    cargoHat: "Konya–Kırıkkale–Çorum–Amasya hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Karadeniz ve karasal iklim arasında geçiş özelliği taşır; sevkiyat açısından ılımlı bir hattır.",
    yerelNot: "Yeşilırmak vadisinde kurulu tarihî bir şehirdir; iç bölgelerle bağlantısı düzenlidir.",
  },
  ankara: {
    neighbors: ["Çankırı", "Bolu", "Eskişehir", "Konya", "Aksaray", "Kırşehir", "Kırıkkale"],
    distanceKm: 260,
    cargoHat: "Konya–Ankara otoyolu (doğrudan komşu il hattı)",
    sevkiyatRiski: "standart",
    iklimNotu: "Karasal iklim; yaz sıcakları Çukurova düzeyine çıkmadığı için canlı gönderide standart paketleme yeterlidir.",
    yerelNot: "Konya'nın kuzey komşusu ve YHT ile 1 saat 45 dakika mesafededir; merkezimize gelmek isteyenler için en kolay bağlantılardan biridir.",
  },
  antalya: {
    neighbors: ["Muğla", "Burdur", "Isparta", "Konya", "Karaman", "Mersin"],
    distanceKm: 315,
    cargoHat: "Konya–Seydişehir–Akseki–Antalya (Toros geçişi)",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Akdeniz iklimi; yaz aylarında yüksek sıcaklık ve nem birlikte görülür, canlı gönderide serinletme uygulanır.",
    yerelNot: "Konya'nın güney komşusudur ve Toros geçişiyle doğrudan bağlanır; yol Konya üzerinden tek hat üzerindedir.",
  },
  artvin: {
    neighbors: ["Rize", "Erzurum", "Ardahan"],
    distanceKm: 1170,
    cargoHat: "Konya–Ankara–Samsun–Trabzon–Hopa sahil hattı",
    sevkiyatRiski: "kis-donma",
    iklimNotu: "Yüksek yağışlı ve engebeli bir coğrafyadır; kış aylarında dağ geçitleri teslimi geciktirebilir.",
    yerelNot: "Ülkenin kuzeydoğu ucundadır; gönderiler sahil yolu üzerinden aktarmayla ulaşır.",
  },
  aydin: {
    neighbors: ["İzmir", "Manisa", "Denizli", "Muğla"],
    distanceKm: 480,
    cargoHat: "Konya–Afyon–Denizli–Aydın hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Büyük Menderes vadisinde yaz sıcaklıkları yüksektir; sıcak dönemde ilave yalıtım uygulanır.",
    yerelNot: "Ege'nin tarım merkezlerindendir; İzmir aktarmasıyla kargo bağlantısı düzenlidir.",
  },
  balikesir: {
    neighbors: ["Çanakkale", "Bursa", "Kütahya", "Manisa", "İzmir"],
    distanceKm: 570,
    cargoHat: "Konya–Afyon–Kütahya–Balıkesir hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Kıyı kesiminde ılıman, iç kesimde karasal iklim görülür; sevkiyat açısından dengeli bir hattır.",
    yerelNot: "Marmara ile Ege arasında geçiş ilidir; hem İstanbul hem İzmir hatlarına bağlanır.",
  },
  bilecik: {
    neighbors: ["Bursa", "Kocaeli", "Sakarya", "Bolu", "Eskişehir", "Kütahya"],
    distanceKm: 400,
    cargoHat: "Konya–Eskişehir–Bilecik hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Marmara ve İç Anadolu arası geçiş iklimi; yıl boyu sevkiyat için elverişlidir.",
    yerelNot: "Eskişehir üzerinden İç Anadolu'ya bağlanan küçük ama kavşak konumunda bir ildir.",
  },
  bingol: {
    neighbors: ["Erzurum", "Erzincan", "Tunceli", "Elazığ", "Diyarbakır", "Muş"],
    distanceKm: 1000,
    cargoHat: "Konya–Kayseri–Malatya–Elazığ–Bingöl hattı",
    sevkiyatRiski: "kis-donma",
    iklimNotu: "Dağlık ve sert karasal iklim; kış gönderilerinde donmaya karşı koruma uygulanır.",
    yerelNot: "Doğu Anadolu'nun dağlık kesiminde yer alır; teslimat Elazığ aktarmasıyla yapılır.",
  },
  bitlis: {
    neighbors: ["Muş", "Ağrı", "Van", "Siirt", "Batman"],
    distanceKm: 1100,
    cargoHat: "Konya–Malatya–Diyarbakır–Bitlis hattı",
    sevkiyatRiski: "kis-donma",
    iklimNotu: "Van Gölü çevresinde yüksek rakım nedeniyle kışlar uzun ve sert geçer.",
    yerelNot: "Van Gölü'nün batı kıyısında yer alır; Tatvan üzerinden bölgesel bağlantı sağlar.",
  },
  bolu: {
    neighbors: ["Zonguldak", "Karabük", "Çankırı", "Ankara", "Eskişehir", "Bilecik", "Sakarya", "Düzce"],
    distanceKm: 450,
    cargoHat: "Konya–Ankara–Bolu (D100/TEM) hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Ormanlık ve serin bir ildir; yaz sıcağı canlı gönderi için avantajlıdır.",
    yerelNot: "İstanbul–Ankara ana koridoru üzerindedir; kargo geçiş trafiği yoğundur.",
  },
  burdur: {
    neighbors: ["Denizli", "Afyonkarahisar", "Isparta", "Antalya", "Muğla"],
    distanceKm: 240,
    cargoHat: "Konya–Isparta–Burdur hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Göller yöresinin karasal-Akdeniz geçiş iklimi hâkimdir; sevkiyat koşulları elverişlidir.",
    yerelNot: "Konya'ya yakın Göller Yöresi illerindendir; gönderiler kısa sürede ulaşır.",
  },
  bursa: {
    neighbors: ["Balıkesir", "Kütahya", "Bilecik", "Kocaeli", "Yalova", "Sakarya"],
    distanceKm: 490,
    cargoHat: "Konya–Afyon–Kütahya–Bursa hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Marmara'nın ılıman iklimi; canlı gönderide yıl boyu standart paketleme yeterlidir.",
    yerelNot: "Nüfus ve sanayi yoğunluğu nedeniyle kargo hatları sık çalışır; teslim süresi öngörülebilirdir.",
  },
  canakkale: {
    neighbors: ["Balıkesir", "Edirne", "Tekirdağ"],
    distanceKm: 720,
    cargoHat: "Konya–Afyon–Balıkesir–Çanakkale hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Deniz etkisiyle ılıman; aşırı sıcak ve don olayları sınırlıdır.",
    yerelNot: "Boğazın iki yakasına yayılır; Trakya yakası için ek aktarma gerekebilir.",
  },
  cankiri: {
    neighbors: ["Karabük", "Kastamonu", "Çorum", "Kırıkkale", "Ankara", "Bolu"],
    distanceKm: 400,
    cargoHat: "Konya–Ankara–Çankırı hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Karasal iklim; kış gece sıcaklıkları düşse de gönderi süresi kısadır.",
    yerelNot: "Ankara'nın kuzey komşusudur; İç Anadolu ile Batı Karadeniz arasında geçiş noktasıdır.",
  },
  corum: {
    neighbors: ["Sinop", "Samsun", "Amasya", "Tokat", "Yozgat", "Kırıkkale", "Çankırı", "Kastamonu"],
    distanceKm: 500,
    cargoHat: "Konya–Kırıkkale–Çorum hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Karasal iklim hâkimdir; sevkiyat açısından belirgin bir kısıt oluşturmaz.",
    yerelNot: "İç Anadolu'yu Karadeniz'e bağlayan güzergâh üzerindedir; sanayi ve ticaret hareketi düzenlidir.",
  },
  denizli: {
    neighbors: ["Aydın", "Manisa", "Uşak", "Afyonkarahisar", "Burdur", "Muğla"],
    distanceKm: 380,
    cargoHat: "Konya–Afyon–Denizli hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Yaz aylarında iç Ege sıcakları belirgindir; sıcak dönemde ilave yalıtım uygulanır.",
    yerelNot: "Ege'nin sanayi merkezlerindendir; Antalya ve İzmir hatlarına ortak bağlantı sağlar.",
  },
  diyarbakir: {
    neighbors: ["Elazığ", "Bingöl", "Muş", "Batman", "Mardin", "Şanlıurfa", "Adıyaman", "Malatya"],
    distanceKm: 900,
    cargoHat: "Konya–Kayseri–Malatya–Diyarbakır hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Yaz sıcaklıkları düzenli olarak 40 °C üzerine çıkar; canlı gönderide en yüksek özen gereken hatlardandır.",
    yerelNot: "Güneydoğu'nun en büyük şehirlerindendir ve bölgesel kargo aktarma merkezidir.",
  },
  edirne: {
    neighbors: ["Kırklareli", "Tekirdağ", "Çanakkale"],
    distanceKm: 850,
    cargoHat: "Konya–Ankara–İstanbul–Edirne hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Trakya'nın geçiş iklimi; yaz sıcakları ölçülüdür.",
    yerelNot: "Ülkenin kuzeybatı ucundadır; gönderiler İstanbul aktarmasıyla ulaşır.",
  },
  elazig: {
    neighbors: ["Tunceli", "Bingöl", "Diyarbakır", "Malatya", "Erzincan", "Adıyaman"],
    distanceKm: 870,
    cargoHat: "Konya–Kayseri–Malatya–Elazığ hattı",
    sevkiyatRiski: "kis-donma",
    iklimNotu: "Karasal iklim; kış aylarında düşük sıcaklıklara karşı ısı koruması uygulanır.",
    yerelNot: "Doğu Anadolu'nun ulaşım kavşaklarındandır; çevre illere aktarma buradan yapılır.",
  },
  erzincan: {
    neighbors: ["Gümüşhane", "Bayburt", "Erzurum", "Bingöl", "Tunceli", "Elazığ", "Sivas", "Giresun", "Malatya"],
    distanceKm: 900,
    cargoHat: "Konya–Kayseri–Sivas–Erzincan hattı",
    sevkiyatRiski: "kis-donma",
    iklimNotu: "Vadi tabanında ılıman, çevresinde sert karasal iklim görülür; kış planlaması önemlidir.",
    yerelNot: "Doğu Anadolu'ya açılan ana karayolu koridoru üzerindedir.",
  },
  erzurum: {
    neighbors: ["Rize", "Artvin", "Ardahan", "Kars", "Ağrı", "Muş", "Bingöl", "Erzincan", "Bayburt"],
    distanceKm: 1080,
    cargoHat: "Konya–Kayseri–Sivas–Erzincan–Erzurum hattı",
    sevkiyatRiski: "kis-donma",
    iklimNotu: "Yüksek rakım nedeniyle kışlar çok sert ve uzundur; canlı gönderide donma koruması zorunludur.",
    yerelNot: "Doğu Anadolu'nun en büyük şehirlerindendir; bölge dağıtımı buradan yapılır.",
  },
  eskisehir: {
    neighbors: ["Bilecik", "Bolu", "Ankara", "Konya", "Afyonkarahisar", "Kütahya"],
    distanceKm: 300,
    cargoHat: "Konya–Sivrihisar–Eskişehir hattı (komşu il)",
    sevkiyatRiski: "standart",
    iklimNotu: "Karasal iklim; sevkiyat açısından yıl boyu elverişlidir.",
    yerelNot: "Konya'nın kuzeybatı komşusudur ve YHT bağlantısı bulunur; merkezimize ulaşım kolaydır.",
  },
  gaziantep: {
    neighbors: ["Kilis", "Hatay", "Osmaniye", "Kahramanmaraş", "Adıyaman", "Şanlıurfa"],
    distanceKm: 610,
    cargoHat: "Konya–Adana–Osmaniye–Gaziantep otoyol hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Yazları uzun ve sıcak geçer; temmuz–ağustos gönderilerinde termal yalıtım belirleyicidir.",
    yerelNot: "Güneydoğu'nun sanayi ve lojistik merkezidir; kargo hatları sık ve düzenli çalışır.",
  },
  giresun: {
    neighbors: ["Ordu", "Trabzon", "Gümüşhane", "Erzincan", "Sivas"],
    distanceKm: 830,
    cargoHat: "Konya–Ankara–Samsun–Ordu–Giresun sahil hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Karadeniz iklimi; yıl boyu nemli ve ılımandır, aşırı sıcak görülmez.",
    yerelNot: "Sahil yolu üzerinde yer alır; Samsun aktarmasıyla teslimat yapılır.",
  },
  gumushane: {
    neighbors: ["Trabzon", "Bayburt", "Erzincan", "Giresun"],
    distanceKm: 940,
    cargoHat: "Konya–Sivas–Erzincan–Gümüşhane hattı",
    sevkiyatRiski: "kis-donma",
    iklimNotu: "Dağlık iç kesimde sert kış koşulları görülür; kış gönderilerinde koruma uygulanır.",
    yerelNot: "Karadeniz ile Doğu Anadolu arasında geçiş konumundadır; Trabzon üzerinden de bağlanır.",
  },
  hakkari: {
    neighbors: ["Van", "Şırnak"],
    distanceKm: 1350,
    cargoHat: "Konya–Diyarbakır–Van–Hakkâri hattı",
    sevkiyatRiski: "kis-donma",
    iklimNotu: "Yüksek dağlık coğrafya; kış aylarında yol koşulları teslim süresini belirgin şekilde uzatabilir.",
    yerelNot: "Konya merkezimize karayoluyla en uzak ildir; sipariş ve randevu planlamasının önceden yapılması önerilir.",
  },
  hatay: {
    neighbors: ["Adana", "Osmaniye", "Gaziantep"],
    distanceKm: 550,
    cargoHat: "Konya–Adana–İskenderun hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Akdeniz iklimi; yaz aylarında sıcaklık ve nem birlikte yükselir, canlı gönderide serinletme uygulanır.",
    yerelNot: "Liman ve sanayi hareketi nedeniyle kargo bağlantıları düzenlidir.",
  },
  isparta: {
    neighbors: ["Afyonkarahisar", "Konya", "Antalya", "Burdur"],
    distanceKm: 190,
    cargoHat: "Konya–Beyşehir–Isparta hattı (komşu il)",
    sevkiyatRiski: "standart",
    iklimNotu: "Göller yöresi geçiş iklimi; sevkiyat için en elverişli hatlardandır.",
    yerelNot: "Konya'nın batı komşusudur ve merkezimize en yakın illerdendir; gönderiler hızlı ulaşır.",
  },
  mersin: {
    neighbors: ["Antalya", "Karaman", "Konya", "Niğde", "Adana"],
    distanceKm: 350,
    cargoHat: "Konya–Ereğli–Pozantı–Mersin hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Akdeniz kıyı iklimi; yaz aylarında yüksek sıcaklık ve nem nedeniyle ilave yalıtım uygulanır.",
    yerelNot: "Konya'nın güney komşusudur; Türkiye'nin en büyük limanlarından birine ev sahipliği yapar.",
  },
  istanbul: {
    neighbors: ["Kocaeli", "Tekirdağ"],
    distanceKm: 660,
    cargoHat: "Konya–Ankara–İstanbul (TEM) hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Deniz etkisiyle ılıman geçer; aşırı sıcak ve don olayları sınırlı olduğu için canlı gönderi yıl boyu güvenlidir.",
    yerelNot: "Kargo hatlarının en sık çalıştığı ildir; ilçe bazında teslim saatleri değişkenlik gösterebilir.",
  },
  izmir: {
    neighbors: ["Balıkesir", "Manisa", "Aydın"],
    distanceKm: 550,
    cargoHat: "Konya–Afyon–Uşak–İzmir hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Akdeniz iklimi; yaz sıcakları belirgindir, sıcak dönemde serinletme uygulanır.",
    yerelNot: "Ege'nin dağıtım merkezidir; çevre illere aktarma buradan yapılır.",
  },
  kars: {
    neighbors: ["Ardahan", "Erzurum", "Ağrı", "Iğdır"],
    distanceKm: 1230,
    cargoHat: "Konya–Sivas–Erzurum–Kars hattı",
    sevkiyatRiski: "kis-donma",
    iklimNotu: "Ülkenin en soğuk illerindendir; kış gönderilerinde donmaya karşı koruma zorunludur.",
    yerelNot: "Yüksek plato üzerindedir; kış aylarında teslimat planı önceden yapılmalıdır.",
  },
  kastamonu: {
    neighbors: ["Sinop", "Çorum", "Çankırı", "Karabük", "Bartın"],
    distanceKm: 540,
    cargoHat: "Konya–Ankara–Çankırı–Kastamonu hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "İç kesimde karasal, kıyıda Karadeniz iklimi görülür; sevkiyat açısından dengelidir.",
    yerelNot: "Batı Karadeniz'in iç kesimindedir; ormanlık coğrafyası nedeniyle serin bir hattır.",
  },
  kayseri: {
    neighbors: ["Sivas", "Yozgat", "Kırşehir", "Nevşehir", "Niğde", "Adana", "Kahramanmaraş"],
    distanceKm: 300,
    cargoHat: "Konya–Aksaray–Nevşehir–Kayseri hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Yüksek rakımlı karasal iklim; yaz sıcakları ölçülü olduğundan canlı gönderi için elverişlidir.",
    yerelNot: "İç Anadolu'nun sanayi ve lojistik merkezlerindendir; doğu illerine aktarma buradan yapılır.",
  },
  kirklareli: {
    neighbors: ["Edirne", "Tekirdağ"],
    distanceKm: 900,
    cargoHat: "Konya–Ankara–İstanbul–Kırklareli hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Trakya geçiş iklimi; sevkiyat açısından belirgin kısıt oluşturmaz.",
    yerelNot: "Trakya'nın kuzeyindedir; teslimat İstanbul aktarmasıyla yapılır.",
  },
  kirsehir: {
    neighbors: ["Kırıkkale", "Yozgat", "Nevşehir", "Aksaray", "Ankara", "Kayseri"],
    distanceKm: 270,
    cargoHat: "Konya–Aksaray–Kırşehir hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Karasal iklim; kısa mesafe nedeniyle gönderiler hızlı ulaşır.",
    yerelNot: "İç Anadolu'nun merkezindedir; Konya ile aynı bölgede yer aldığı için teslim süresi kısadır.",
  },
  kocaeli: {
    neighbors: ["İstanbul", "Sakarya", "Bilecik", "Bursa", "Yalova"],
    distanceKm: 570,
    cargoHat: "Konya–Ankara–İzmit (TEM) hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Marmara'nın ılıman iklimi; yıl boyu sevkiyat için elverişlidir.",
    yerelNot: "Sanayi yoğunluğu nedeniyle kargo hatları sık çalışır; teslim süresi öngörülebilirdir.",
  },
  konya: {
    neighbors: ["Ankara", "Aksaray", "Niğde", "Mersin", "Karaman", "Antalya", "Isparta", "Afyonkarahisar", "Eskişehir"],
    distanceKm: 0,
    cargoHat: "Merkezimizin bulunduğu il — elden teslim mümkündür",
    sevkiyatRiski: "standart",
    iklimNotu: "Karasal iklim; merkezimizde bulunduğumuz için sevkiyat koşulları doğrudan kontrolümüzdedir.",
    yerelNot: "Yüz yüze uygulama ve eğitim merkezimizin bulunduğu ildir; randevu ve elden teslim seçenekleri açıktır.",
  },
  kutahya: {
    neighbors: ["Bursa", "Balıkesir", "Manisa", "Uşak", "Afyonkarahisar", "Eskişehir", "Bilecik"],
    distanceKm: 320,
    cargoHat: "Konya–Afyon–Kütahya hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Karasal ve Ege geçiş iklimi; sevkiyat açısından elverişlidir.",
    yerelNot: "İç Batı Anadolu'nun kavşak illerindendir; Marmara ve Ege hatlarına bağlanır.",
  },
  malatya: {
    neighbors: ["Erzincan", "Elazığ", "Diyarbakır", "Adıyaman", "Kahramanmaraş", "Sivas"],
    distanceKm: 720,
    cargoHat: "Konya–Kayseri–Malatya hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Karasal iklim; yaz sıcakları belirgin olsa da Güneydoğu düzeyine çıkmaz.",
    yerelNot: "Doğu Anadolu'ya açılan ana kavşaktır; çevre illere aktarma buradan yapılır.",
  },
  manisa: {
    neighbors: ["İzmir", "Balıkesir", "Kütahya", "Uşak", "Denizli", "Aydın"],
    distanceKm: 520,
    cargoHat: "Konya–Afyon–Uşak–Manisa hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Gediz ovasında yaz sıcaklıkları yüksektir; sıcak dönemde ilave yalıtım uygulanır.",
    yerelNot: "İzmir'e komşudur ve aynı dağıtım hattını paylaşır; teslim süresi İzmir ile yakındır.",
  },
  kahramanmaras: {
    neighbors: ["Sivas", "Kayseri", "Adana", "Osmaniye", "Gaziantep", "Adıyaman", "Malatya"],
    distanceKm: 540,
    cargoHat: "Konya–Kayseri–Kahramanmaraş hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Ova kesiminde yazlar sıcak, dağlık kesimde serin geçer; gönderide mevsim planlaması yapılır.",
    yerelNot: "Akdeniz ile Doğu Anadolu arasında geçiş ilidir; iki hatta da bağlanır.",
  },
  mardin: {
    neighbors: ["Diyarbakır", "Batman", "Siirt", "Şırnak", "Şanlıurfa"],
    distanceKm: 990,
    cargoHat: "Konya–Malatya–Diyarbakır–Mardin hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Yaz sıcaklıkları uzun süre 40 °C üzerinde seyreder; canlı gönderide en yüksek özen gösterilen hatlardandır.",
    yerelNot: "Mezopotamya ovasına bakan platoda kuruludur; bölgesel dağıtım Diyarbakır üzerinden yapılır.",
  },
  mugla: {
    neighbors: ["Aydın", "Denizli", "Burdur", "Antalya"],
    distanceKm: 500,
    cargoHat: "Konya–Denizli–Muğla hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Akdeniz iklimi; yaz aylarında sıcaklık yüksektir, kıyı ilçelerinde nem eklenir.",
    yerelNot: "Kıyı ilçeleri birbirine uzaktır; teslim süresi ilçeye göre değişebilir.",
  },
  mus: {
    neighbors: ["Erzurum", "Ağrı", "Bitlis", "Batman", "Diyarbakır", "Bingöl"],
    distanceKm: 1080,
    cargoHat: "Konya–Malatya–Elazığ–Muş hattı",
    sevkiyatRiski: "kis-donma",
    iklimNotu: "Yüksek ova ikliminde kışlar uzun ve sert geçer; donma koruması uygulanır.",
    yerelNot: "Doğu Anadolu'nun tarım ovalarındandır; teslimat Elazığ aktarmasıyla yapılır.",
  },
  nevsehir: {
    neighbors: ["Kırşehir", "Yozgat", "Kayseri", "Niğde", "Aksaray"],
    distanceKm: 230,
    cargoHat: "Konya–Aksaray–Nevşehir hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Yüksek rakımlı karasal iklim; yaz sıcakları ölçülü olduğu için gönderide ek önlem gerekmez.",
    yerelNot: "Kapadokya bölgesinin merkezidir; turizm nedeniyle ulaşım bağlantıları düzenlidir.",
  },
  nigde: {
    neighbors: ["Aksaray", "Nevşehir", "Kayseri", "Adana", "Mersin", "Konya"],
    distanceKm: 220,
    cargoHat: "Konya–Ereğli–Niğde hattı (komşu il)",
    sevkiyatRiski: "standart",
    iklimNotu: "Yüksek rakımlı karasal iklim; yaz sıcakları ölçülüdür.",
    yerelNot: "Konya'nın doğu komşusudur; Adana otoyolu güzergâhında yer aldığı için teslim süresi kısadır.",
  },
  ordu: {
    neighbors: ["Samsun", "Tokat", "Sivas", "Giresun"],
    distanceKm: 780,
    cargoHat: "Konya–Ankara–Samsun–Ordu sahil hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Karadeniz iklimiyle yazlar serin geçer; canlı gönderide sıcaklık kaynaklı risk düşüktür.",
    yerelNot: "Sahil şeridi boyunca uzanır; teslimat Samsun aktarmasıyla yapılır.",
  },
  rize: {
    neighbors: ["Trabzon", "Bayburt", "Erzurum", "Artvin"],
    distanceKm: 1080,
    cargoHat: "Konya–Ankara–Samsun–Trabzon–Rize sahil hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Türkiye'nin en yağışlı ilidir; nem yüksek, sıcaklık ılımandır.",
    yerelNot: "Doğu Karadeniz sahilindedir; gönderiler Trabzon üzerinden ulaşır.",
  },
  sakarya: {
    neighbors: ["Kocaeli", "Bilecik", "Bolu", "Düzce", "Bursa"],
    distanceKm: 530,
    cargoHat: "Konya–Ankara–Adapazarı (TEM) hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Marmara'nın ılıman ve nemli iklimi; sevkiyat için elverişlidir.",
    yerelNot: "İstanbul–Ankara koridoru üzerindedir; kargo bağlantıları sıktır.",
  },
  samsun: {
    neighbors: ["Sinop", "Çorum", "Amasya", "Tokat", "Ordu"],
    distanceKm: 690,
    cargoHat: "Konya–Kırıkkale–Çorum–Samsun hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Karadeniz iklimi; ılıman sıcaklıklar canlı gönderi için avantajlıdır.",
    yerelNot: "Karadeniz'in en büyük limanı ve dağıtım merkezidir; bölge aktarması buradan yapılır.",
  },
  siirt: {
    neighbors: ["Bitlis", "Batman", "Mardin", "Şırnak", "Van"],
    distanceKm: 1080,
    cargoHat: "Konya–Malatya–Diyarbakır–Batman–Siirt hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Yazları çok sıcak ve kurak geçer; canlı gönderide termal yalıtım belirleyicidir.",
    yerelNot: "Güneydoğu'nun dağlık kesiminde yer alır; teslimat Batman aktarmasıyla yapılır.",
  },
  sinop: {
    neighbors: ["Kastamonu", "Çorum", "Samsun"],
    distanceKm: 660,
    cargoHat: "Konya–Ankara–Çorum–Sinop hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Karadeniz iklimi; serin ve nemli koşullar canlı gönderi için elverişlidir.",
    yerelNot: "Türkiye'nin en kuzey noktasıdır; ana yollardan uzaklığı teslim süresini bir miktar uzatabilir.",
  },
  sivas: {
    neighbors: ["Tokat", "Ordu", "Giresun", "Erzincan", "Malatya", "Kahramanmaraş", "Kayseri", "Yozgat"],
    distanceKm: 500,
    cargoHat: "Konya–Kayseri–Sivas hattı",
    sevkiyatRiski: "kis-donma",
    iklimNotu: "Yüksek rakımlı sert karasal iklim; kış aylarında ısı koruması uygulanır.",
    yerelNot: "Yüz ölçümü en büyük illerdendir; ilçeler arası mesafeler teslim süresini etkileyebilir.",
  },
  tekirdag: {
    neighbors: ["Edirne", "Kırklareli", "İstanbul", "Çanakkale"],
    distanceKm: 780,
    cargoHat: "Konya–Ankara–İstanbul–Tekirdağ hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Marmara ve Trakya geçiş iklimi; sevkiyat açısından dengelidir.",
    yerelNot: "Marmara'nın kuzey kıyısındadır; teslimat İstanbul aktarmasıyla yapılır.",
  },
  tokat: {
    neighbors: ["Amasya", "Samsun", "Ordu", "Sivas", "Yozgat", "Çorum"],
    distanceKm: 570,
    cargoHat: "Konya–Kırıkkale–Yozgat–Tokat hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Karasal ve Karadeniz arası geçiş iklimi; sevkiyat için elverişlidir.",
    yerelNot: "Yeşilırmak havzasında yer alır; İç Anadolu ile Karadeniz arasında bağlantı sağlar.",
  },
  trabzon: {
    neighbors: ["Rize", "Bayburt", "Gümüşhane", "Giresun"],
    distanceKm: 990,
    cargoHat: "Konya–Ankara–Samsun–Trabzon sahil hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Karadeniz iklimi; nem yüksek, sıcaklık ılımandır.",
    yerelNot: "Doğu Karadeniz'in liman ve dağıtım merkezidir; bölge aktarması buradan yapılır.",
  },
  tunceli: {
    neighbors: ["Erzincan", "Bingöl", "Elazığ"],
    distanceKm: 950,
    cargoHat: "Konya–Kayseri–Malatya–Elazığ–Tunceli hattı",
    sevkiyatRiski: "kis-donma",
    iklimNotu: "Dağlık coğrafyada kışlar sert geçer; kış gönderilerinde koruma uygulanır.",
    yerelNot: "Nüfusu az ve dağlık bir ildir; teslimat Elazığ aktarmasıyla yapılır.",
  },
  sanliurfa: {
    neighbors: ["Gaziantep", "Adıyaman", "Diyarbakır", "Mardin"],
    distanceKm: 780,
    cargoHat: "Konya–Adana–Gaziantep–Şanlıurfa hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Türkiye'nin en sıcak illerindendir; yaz gönderilerinde termal yalıtım zorunludur.",
    yerelNot: "Güneydoğu'nun en kalabalık illerindendir; kargo hatları düzenli çalışır.",
  },
  usak: {
    neighbors: ["Manisa", "Kütahya", "Afyonkarahisar", "Denizli"],
    distanceKm: 350,
    cargoHat: "Konya–Afyon–Uşak hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "İç Ege geçiş iklimi; sevkiyat açısından elverişlidir.",
    yerelNot: "Ege'ye açılan güzergâh üzerindedir; İzmir hattına bağlanır.",
  },
  van: {
    neighbors: ["Ağrı", "Bitlis", "Siirt", "Şırnak", "Hakkâri"],
    distanceKm: 1230,
    cargoHat: "Konya–Malatya–Diyarbakır–Van hattı",
    sevkiyatRiski: "kis-donma",
    iklimNotu: "Yüksek rakım nedeniyle kışlar uzun ve sert geçer; donma koruması zorunludur.",
    yerelNot: "Doğu Anadolu'nun en büyük şehirlerindendir; bölgesel dağıtım merkezidir.",
  },
  yozgat: {
    neighbors: ["Çorum", "Amasya", "Tokat", "Sivas", "Kayseri", "Nevşehir", "Kırşehir", "Kırıkkale"],
    distanceKm: 380,
    cargoHat: "Konya–Kırşehir–Yozgat hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Karasal iklim; kış geceleri soğuk olsa da gönderi süresi kısadır.",
    yerelNot: "İç Anadolu'nun kuzeyindedir; Karadeniz illerine geçiş güzergâhı üzerindedir.",
  },
  zonguldak: {
    neighbors: ["Bartın", "Karabük", "Bolu", "Düzce"],
    distanceKm: 550,
    cargoHat: "Konya–Ankara–Bolu–Zonguldak hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Yağışlı ve serin Karadeniz iklimi hâkimdir; yaz gönderilerinde sıcaklık sorunu yaşanmaz.",
    yerelNot: "Batı Karadeniz'in sanayi ve maden merkezidir; kargo bağlantıları düzenlidir.",
  },
  aksaray: {
    neighbors: ["Ankara", "Kırşehir", "Nevşehir", "Niğde", "Konya"],
    distanceKm: 150,
    cargoHat: "Konya–Aksaray karayolu (komşu il)",
    sevkiyatRiski: "standart",
    iklimNotu: "Karasal iklim; merkezimize yakınlığı nedeniyle teslim süresi en kısa illerdendir.",
    yerelNot: "Konya'nın kuzeydoğu komşusudur; gönderiler çoğunlukla ertesi iş günü ulaşır.",
  },
  bayburt: {
    neighbors: ["Trabzon", "Rize", "Erzurum", "Erzincan", "Gümüşhane"],
    distanceKm: 1000,
    cargoHat: "Konya–Sivas–Erzincan–Bayburt hattı",
    sevkiyatRiski: "kis-donma",
    iklimNotu: "Yüksek rakımlı sert karasal iklim; kış gönderilerinde koruma uygulanır.",
    yerelNot: "Türkiye'nin en az nüfuslu ilidir; teslimat Erzurum veya Trabzon aktarmasıyla yapılır.",
  },
  karaman: {
    neighbors: ["Konya", "Mersin", "Antalya"],
    distanceKm: 110,
    cargoHat: "Konya–Karaman karayolu (komşu il)",
    sevkiyatRiski: "standart",
    iklimNotu: "Karasal iklim; merkezimize en yakın illerden biri olduğu için sevkiyat en hızlı hattır.",
    yerelNot: "Konya'nın güney komşusudur; gönderiler çoğunlukla ertesi iş günü ulaşır, elden teslim de görüşülebilir.",
  },
  kirikkale: {
    neighbors: ["Ankara", "Çankırı", "Çorum", "Yozgat", "Kırşehir"],
    distanceKm: 320,
    cargoHat: "Konya–Ankara–Kırıkkale hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Kızılırmak vadisinde karasal iklim görülür; kısa mesafe teslimatı kolaylaştırır.",
    yerelNot: "Ankara'nın doğu komşusudur; İç Anadolu'nun doğuya açılan kavşağındadır.",
  },
  batman: {
    neighbors: ["Diyarbakır", "Muş", "Bitlis", "Siirt", "Mardin"],
    distanceKm: 1030,
    cargoHat: "Konya–Malatya–Diyarbakır–Batman hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Yaz aylarında sıcaklık 40 °C'yi aşar; gönderiler günün serin saatlerinde yola çıkarılır.",
    yerelNot: "Güneydoğu'nun sanayi merkezlerindendir; çevre illere aktarma buradan yapılır.",
  },
  sirnak: {
    neighbors: ["Siirt", "Hakkâri", "Mardin", "Van"],
    distanceKm: 1180,
    cargoHat: "Konya–Diyarbakır–Mardin–Şırnak hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Yaz sıcaklıkları çok yüksektir; sıcak dönemde gönderi zamanlaması özenle planlanır.",
    yerelNot: "Ülkenin güneydoğu ucundadır; teslimat Mardin aktarmasıyla yapılır.",
  },
  bartin: {
    neighbors: ["Zonguldak", "Karabük", "Kastamonu"],
    distanceKm: 590,
    cargoHat: "Konya–Ankara–Karabük–Bartın hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Nemli ve ılıman kıyı iklimi; mevsimler arası sıcaklık farkı dardır.",
    yerelNot: "Batı Karadeniz kıyısındadır; Karabük üzerinden bağlanır.",
  },
  ardahan: {
    neighbors: ["Artvin", "Erzurum", "Kars"],
    distanceKm: 1290,
    cargoHat: "Konya–Sivas–Erzurum–Kars–Ardahan hattı",
    sevkiyatRiski: "kis-donma",
    iklimNotu: "Ülkenin en soğuk illerindendir; kış aylarında donma riski nedeniyle özel koruma uygulanır.",
    yerelNot: "Kuzeydoğu sınır bölgesinde, yüksek plato üzerindedir; kış aylarında gönderi tarihi hava durumuna göre planlanır.",
  },
  igdir: {
    neighbors: ["Kars", "Ağrı"],
    distanceKm: 1300,
    cargoHat: "Konya–Sivas–Erzurum–Ağrı–Iğdır hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Çevresindeki illerin aksine ova tabanında sıcak ve kurak yazlar görülür; mikroklima nedeniyle yaz gönderilerinde yalıtım uygulanır.",
    yerelNot: "Aras ovasında, ülkenin doğu ucundadır; teslimat Ağrı aktarmasıyla yapılır.",
  },
  yalova: {
    neighbors: ["Kocaeli", "Bursa"],
    distanceKm: 590,
    cargoHat: "Konya–Ankara–İzmit–Yalova hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Marmara'nın ılıman iklimi; sevkiyat için yıl boyu elverişlidir.",
    yerelNot: "Türkiye'nin yüz ölçümü en küçük ilidir; il içi teslimat kısa sürede tamamlanır.",
  },
  karabuk: {
    neighbors: ["Zonguldak", "Bartın", "Kastamonu", "Çankırı", "Bolu"],
    distanceKm: 500,
    cargoHat: "Konya–Ankara–Çankırı–Karabük hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "İç kesimde karasal, kuzeyde Karadeniz etkisi görülür; sevkiyat açısından dengelidir.",
    yerelNot: "Batı Karadeniz'in sanayi merkezlerindendir; Safranbolu ile turizm hareketi bulunur.",
  },
  kilis: {
    neighbors: ["Gaziantep"],
    distanceKm: 660,
    cargoHat: "Konya–Adana–Gaziantep–Kilis hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Yazları uzun ve sıcak geçer; gönderide termal yalıtım uygulanır.",
    yerelNot: "Ülkenin en küçük illerindendir; teslimat Gaziantep aktarmasıyla yapılır.",
  },
  osmaniye: {
    neighbors: ["Adana", "Hatay", "Gaziantep", "Kahramanmaraş"],
    distanceKm: 450,
    cargoHat: "Konya–Adana–Osmaniye otoyol hattı",
    sevkiyatRiski: "yaz-sicak",
    iklimNotu: "Akdeniz iklimi; yaz sıcaklıkları yüksektir, canlı gönderide serinletme uygulanır.",
    yerelNot: "Adana–Gaziantep otoyolu üzerindedir; kargo geçiş trafiği yoğundur.",
  },
  duzce: {
    neighbors: ["Zonguldak", "Bolu", "Sakarya"],
    distanceKm: 490,
    cargoHat: "Konya–Ankara–Bolu–Düzce (TEM) hattı",
    sevkiyatRiski: "standart",
    iklimNotu: "Karadeniz ve Marmara arası geçiş iklimi; sevkiyat için elverişlidir.",
    yerelNot: "1999'da il olan küçük ve yoğun bir yerleşimdir; TEM bağlantısı sayesinde teslimat kısa sürede tamamlanır.",
  },
};

/** Profili getirir; tanımsızsa `undefined` (çağıran taraf güvenli davranmalı). */
export function getProvinceProfile(slug: string): ProvinceProfile | undefined {
  return PROVINCE_PROFILES[slug];
}

/**
 * Build-time bütünlük kontrolü: 81 ilin TAMAMININ profili var mı ve fazladan
 * (tr-locations'ta karşılığı olmayan) anahtar var mı?
 *
 * Eksik profil, o ilin sayfasını sessizce eski jenerik metne düşürürdü — yani
 * tam da çözmeye çalıştığımız kopya içerik sorununu geri getirirdi. Bu yüzden
 * sessiz kalmak yerine build'i patlatıyoruz.
 */
export function assertProvinceProfilesComplete(): void {
  const known = new Set(PROVINCES.map((p) => p.slug));
  const missing = PROVINCES.filter((p) => !PROVINCE_PROFILES[p.slug]).map((p) => p.slug);
  const extra = Object.keys(PROVINCE_PROFILES).filter((k) => !known.has(k));

  const problems: string[] = [];
  if (missing.length > 0) problems.push(`profili eksik iller: ${missing.join(", ")}`);
  if (extra.length > 0) problems.push(`tr-locations'ta olmayan anahtarlar: ${extra.join(", ")}`);
  if (problems.length > 0) {
    throw new Error(`province-profiles: ${problems.join(" | ")}`);
  }
}
