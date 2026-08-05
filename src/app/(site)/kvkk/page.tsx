import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, addressLine } from "@/lib/business";

/**
 * KVKK AYDINLATMA METNİ — 6698 sayılı Kanun m.10 ve "Aydınlatma Yükümlülüğünün
 * Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ" (RG 10.03.2018
 * / 30356) m.4 uyarınca zorunlu unsurları içerir:
 *
 *   a) Veri sorumlusunun ve varsa temsilcisinin kimliği   → Bölüm 1
 *   b) Kişisel verilerin hangi amaçla işleneceği          → Bölüm 3
 *   c) Kimlere ve hangi amaçla aktarılabileceği           → Bölüm 5
 *   ç) Toplama yöntemi ve hukuki sebebi                   → Bölüm 4
 *   d) İlgili kişinin Kanun m.11'deki hakları             → Bölüm 7
 *
 * İÇERİK GERÇEĞE DAYALIDIR — uydurulmamıştır. Kod incelemesiyle doğrulandı:
 *   - Sitede üyelik, veritabanı veya veri saklayan API ucu YOKTUR
 *     (tek route `/og`, yalnızca görsel üretir ve kişisel veri almaz).
 *   - `LocalContactCta` formu sunucuya POST YAPMAZ; girdiyi tarayıcıda bir
 *     WhatsApp mesajına dönüştürür. Metinde bu ayrım açıkça belirtiliyor.
 *   - Üçüncü taraflar: Vercel (barındırma + Analytics), Google Haritalar
 *     (yalnızca /iletisim sayfasındaki gömülü harita), WhatsApp/Meta.
 *
 * BEKLEYEN VERİ: `BUSINESS.legalName` (veri sorumlusunun yasal ünvanı) henüz
 * girilmedi; girilene kadar ticari ad + adres ile kimlik belirtiliyor. Ünvan
 * `src/lib/business.ts` içine yazıldığında bu sayfa otomatik günceller.
 */

const SON_GUNCELLEME = "5 Ağustos 2026";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Ebusadullah Hacamat & Akademi",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni: işlenen veriler, işleme amaçları, aktarım, saklama süresi ve KVKK m.11 haklarınız.",
  alternates: { canonical: "/kvkk" },
  robots: { index: true, follow: true },
};

interface Bolum {
  baslik: string;
  paragraflar?: string[];
  maddeler?: string[];
  /** Madde listesinden sonra basılacak kapanış paragrafı. */
  kapanis?: string;
}

const veriSorumlusu = BUSINESS.legalName ?? BUSINESS.name;

const bolumler: Bolum[] = [
  {
    baslik: "1. Veri Sorumlusunun Kimliği",
    paragraflar: [
      `Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca veri sorumlusu sıfatıyla ${veriSorumlusu} tarafından hazırlanmıştır.`,
    ],
    maddeler: [
      `Adres: ${addressLine()}`,
      `Telefon: ${BUSINESS.phone.tr.display}`,
      `E-posta: ${BUSINESS.email}`,
      `İnternet sitesi: www.konyahacamat.net`,
    ],
  },
  {
    baslik: "2. İşlenen Kişisel Veriler",
    paragraflar: [
      "İnternet sitemizde üyelik sistemi, veritabanı veya girdiğiniz bilgileri sunucumuzda saklayan bir form bulunmamaktadır. Sitedeki “Hızlı Bilgi Formu”, yazdıklarınızı sunucuya göndermez; yalnızca tarayıcınızda bir WhatsApp mesajı hazırlar ve göndermeye siz karar verirsiniz.",
      "Buna bağlı olarak işlenen kişisel veriler, ağırlıklı olarak siz bizimle iletişime geçtiğinizde ortaya çıkar:",
    ],
    maddeler: [
      "Kimlik ve iletişim verisi: ad-soyad, telefon numarası, e-posta adresi.",
      "Randevu ve talep verisi: talep ettiğiniz hizmet, tercih ettiğiniz tarih, yazışma içeriği.",
      "Sipariş ve teslimat verisi: ürün siparişlerinde teslimat adresi ve alıcı iletişim bilgisi.",
      "Özel nitelikli kişisel veri (sağlık): randevu öncesi uygulamanın sizin için uygun olup olmadığını değerlendirebilmek amacıyla ilettiğiniz şikâyet, kronik rahatsızlık ve kullandığınız ilaç bilgisi.",
      "İşlem güvenliği ve istatistik verisi: siteyi ziyaretinizde barındırma altyapısı tarafından tutulan IP adresi, tarayıcı/cihaz bilgisi ve sayfa görüntüleme istatistikleri.",
    ],
  },
  {
    baslik: "3. Kişisel Verilerin İşlenme Amaçları",
    paragraflar: [
      "Kişisel verileriniz aşağıdaki amaçlarla, bu amaçlarla sınırlı ve ölçülü olarak işlenir:",
    ],
    maddeler: [
      "Randevu taleplerinizin alınması, planlanması ve tarafınıza teyit edilmesi.",
      "Uygulamanın sizin için uygun olup olmadığının değerlendirilmesi ve güvenli biçimde yürütülmesi.",
      "Hizmet, eğitim ve ürünlerimiz hakkındaki sorularınızın yanıtlanması.",
      "Ürün siparişlerinin hazırlanması, kargolanması ve teslimat sürecinin takibi.",
      "Eğitim programlarına kayıt işlemlerinin yürütülmesi ve katılım belgesi düzenlenmesi.",
      "İnternet sitesinin güvenliğinin sağlanması ve ziyaret istatistiklerinin çıkarılması.",
      "Mevzuattan doğan yükümlülüklerimizin yerine getirilmesi.",
    ],
    kapanis:
      "Kişisel verileriniz pazarlama amacıyla üçüncü kişilere satılmaz, kiralanmaz veya devredilmez.",
  },
  {
    baslik: "4. Toplama Yöntemi ve Hukuki Sebebi",
    paragraflar: [
      "Kişisel verileriniz; telefon görüşmesi, WhatsApp yazışması, e-posta, yüz yüze görüşme ve internet sitesinin otomatik olarak tuttuğu kayıtlar aracılığıyla, kısmen otomatik ve otomatik olmayan yollarla toplanır.",
      "İşlemenin hukuki sebepleri KVKK m.5 kapsamında şunlardır:",
    ],
    maddeler: [
      "Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması (randevu, eğitim kaydı, ürün siparişi).",
      "Veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi.",
      "İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaati (site güvenliği, iletişim kayıtları).",
      "Bunların dışında kalan hâllerde açık rızanız.",
    ],
    kapanis:
      "Sağlık bilgisi gibi özel nitelikli kişisel veriler, KVKK m.6 uyarınca yalnızca AÇIK RIZANIZLA işlenir. Bu bilgileri bizimle paylaşmak zorunda değilsiniz; paylaşmamanız hâlinde uygulamanın sizin için uygunluğu değerlendirilemeyeceğinden hizmet sunulamayabilir. Açık rızanızı dilediğiniz zaman geri alabilirsiniz.",
  },
  {
    baslik: "5. Kişisel Verilerin Aktarılması",
    paragraflar: [
      "Kişisel verileriniz, yalnızca yukarıdaki amaçların gerektirdiği ölçüde ve aşağıdaki alıcı gruplarına aktarılabilir:",
    ],
    maddeler: [
      "Kargo ve lojistik firmaları: yalnızca ürün siparişlerinde, teslimatın yapılabilmesi için ad, adres ve telefon bilgisi.",
      "Bilişim ve barındırma hizmeti sağlayıcıları: internet sitesinin yayında tutulması ve güvenliği amacıyla (sunucu kayıtları ve ziyaret istatistikleri).",
      "Anlık mesajlaşma hizmeti sağlayıcısı: WhatsApp üzerinden iletişim kurmayı tercih etmeniz hâlinde, yazışma ilgili platformun altyapısı üzerinden gerçekleşir.",
      "Harita hizmeti sağlayıcısı: İletişim sayfamızdaki gömülü harita görüntülendiğinde, ilgili sağlayıcı tarafından IP adresiniz gibi teknik veriler işlenebilir.",
      "Yetkili kamu kurum ve kuruluşları: mevzuattan doğan bir talep bulunması hâlinde ve talep edilen kapsamla sınırlı olarak.",
    ],
    kapanis:
      "Barındırma, mesajlaşma ve harita hizmeti sağlayıcılarının sunucuları yurt dışında bulunabilmektedir. Bu nedenle söz konusu teknik veriler bakımından KVKK m.9 kapsamında yurt dışına aktarım söz konusu olabilir; aktarım, Kanun'un öngördüğü şartlara uygun olarak gerçekleştirilir.",
  },
  {
    baslik: "6. Saklama Süresi",
    paragraflar: [
      "Kişisel verileriniz, işlendikleri amaç için gerekli olan süre boyunca ve ilgili mevzuatta öngörülen zamanaşımı süreleri dikkate alınarak saklanır. Amaç ortadan kalktığında veya talebiniz üzerine, verileriniz silinir, yok edilir ya da anonim hâle getirilir.",
      "Yazışma ve randevu kayıtları, hizmet ilişkisinin sona ermesinden sonra makul bir süre boyunca; ticari ve mali kayıtlar ise mevzuatın öngördüğü süreler boyunca muhafaza edilir.",
    ],
  },
  {
    baslik: "7. KVKK m.11 Kapsamındaki Haklarınız",
    paragraflar: [
      "Veri sorumlusuna başvurarak kendinizle ilgili olarak aşağıdaki haklara sahipsiniz:",
    ],
    maddeler: [
      "Kişisel verilerinizin işlenip işlenmediğini öğrenme.",
      "Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme.",
      "Kişisel verilerinizin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme.",
      "Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme.",
      "Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme.",
      "KVKK m.7'de öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme.",
      "Düzeltme, silme ve yok etme işlemlerinin, kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme.",
      "İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme.",
      "Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.",
    ],
  },
  {
    baslik: "8. Başvuru Yöntemi",
    paragraflar: [
      "Yukarıdaki haklarınıza ilişkin taleplerinizi, kimliğinizi tevsik edici bilgilerle birlikte aşağıdaki yollarla iletebilirsiniz:",
    ],
    maddeler: [
      `Yazılı olarak, ıslak imzalı dilekçeyle: ${addressLine()}`,
      `E-posta ile: ${BUSINESS.email}`,
    ],
    kapanis:
      "Talebiniz, niteliğine göre en kısa sürede ve her hâlükârda en geç otuz (30) gün içinde ücretsiz olarak sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi hâlinde, Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret alınabilir. Başvurunuzun reddedilmesi veya cevabın yetersiz bulunması hâlinde Kişisel Verileri Koruma Kurulu'na şikâyette bulunma hakkınız saklıdır.",
  },
  {
    baslik: "9. Metindeki Değişiklikler",
    paragraflar: [
      `Bu aydınlatma metni, mevzuattaki değişiklikler ve hizmet süreçlerimizdeki güncellemeler doğrultusunda revize edilebilir. Güncel sürüm her zaman bu sayfada yayımlanır. Son güncelleme: ${SON_GUNCELLEME}.`,
    ],
  },
];

export default function KvkkPage() {
  return (
    <div className="min-h-screen bg-anthracite-dark pt-20 pb-24">
      <div className="container-site max-w-3xl">
        <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Yasal</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
          KVKK <span className="text-teal italic">Aydınlatma Metni</span>
        </h1>
        <p className="text-white/70 text-base mb-3">
          6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, kişisel
          verilerinizin hangi amaçla işlendiği, kimlere aktarılabileceği ve bu
          konudaki haklarınız aşağıda açıklanmıştır.
        </p>
        <p className="text-white/40 text-xs mb-12">Son güncelleme: {SON_GUNCELLEME}</p>

        <div className="space-y-8">
          {bolumler.map((b) => (
            <section key={b.baslik} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-white font-bold text-lg mb-3">{b.baslik}</h2>

              {b.paragraflar?.map((p) => (
                <p key={p} className="text-white/70 text-sm leading-relaxed mb-3 last:mb-0">
                  {p}
                </p>
              ))}

              {b.maddeler && (
                <ul className="mt-3 space-y-2">
                  {b.maddeler.map((m) => (
                    <li key={m} className="flex gap-2.5 text-white/70 text-sm leading-relaxed">
                      <span className="text-teal shrink-0 mt-[2px]">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              )}

              {b.kapanis && (
                <p className="text-white/70 text-sm leading-relaxed mt-4">{b.kapanis}</p>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link
            href="/iletisim"
            title="İletişim sayfası"
            className="inline-flex items-center gap-2 bg-teal text-anthracite-dark px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
          >
            Bize Ulaşın
          </Link>
          <Link
            href="/gizlilik"
            title="Gizlilik Politikası"
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            Gizlilik Politikası
          </Link>
        </div>
      </div>
    </div>
  );
}
