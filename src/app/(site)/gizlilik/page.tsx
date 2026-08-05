import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Ebusadullah Hacamat & Akademi",
  description:
    "Ebusadullah Hacamat & Akademi gizlilik politikası. Kişisel verilerinizin KVKK kapsamında nasıl işlendiği, saklandığı ve haklarınız hakkında bilgi.",
  alternates: { canonical: "/gizlilik" },
  robots: { index: true, follow: true },
};

const bolumler = [
  {
    baslik: "1. Veri Sorumlusu",
    icerik:
      "Bu gizlilik politikası, Ebusadullah Hacamat & Akademi (Sahibiata Mh. Taşcami Uzunharmanlar Cd. No: 16-4, 42040 Meram/Konya) tarafından işletilen www.konyahacamat.net web sitesi için geçerlidir. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu sıfatıyla hareket etmekteyiz.",
  },
  {
    baslik: "2. Toplanan Veriler",
    // DÜZELTME: Burada "Google Analytics çerezleri kullanılmaktadır" yazıyordu;
    // sitede Google Analytics YOK. Ölçüm Vercel Web Analytics ile yapılıyor ve
    // kimliklendirme çerezi kullanmıyor. Yasal metinde yanlış beyan bırakılamaz.
    icerik:
      "Web sitemiz üzerinden doğrudan kişisel veri toplayan bir üyelik veya form sistemi bulunmamaktadır. Sitedeki hızlı bilgi formu girdiğiniz bilgileri sunucumuza göndermez; yalnızca tarayıcınızda bir WhatsApp mesajı hazırlar. Bize WhatsApp, telefon veya e-posta ile ulaştığınızda paylaştığınız ad, telefon numarası ve talebinize ilişkin bilgiler yalnızca randevu oluşturma ve iletişim amacıyla kullanılır. Ziyaret istatistikleri için kimliklendirme çerezi kullanmayan bir analiz aracından yararlanılır; bu veriler toplu ve anonim olup kimliğinizi doğrudan tanımlamaz.",
  },
  {
    baslik: "3. Verilerin Kullanım Amacı",
    icerik:
      "Paylaştığınız bilgiler; randevu planlaması, hizmetlerimiz hakkında bilgilendirme ve tarafınızla iletişim kurulması amaçlarıyla sınırlı olarak işlenir. Verileriniz üçüncü kişilerle paylaşılmaz, satılmaz ve pazarlama amacıyla kullanılmaz.",
  },
  {
    baslik: "4. Çerezler",
    icerik:
      "Sitemizde ziyaretçi deneyimini iyileştirmek ve site trafiğini analiz etmek amacıyla çerezler kullanılır. Tarayıcınızın ayarlarından çerezleri dilediğiniz zaman engelleyebilir veya silebilirsiniz; bu durumda sitenin bazı bölümleri beklendiği gibi çalışmayabilir.",
  },
  {
    baslik: "5. Verilerin Saklanması ve Güvenliği",
    icerik:
      "Kişisel verileriniz, ilgili mevzuatta öngörülen süreler boyunca ve yalnızca işleme amacının gerektirdiği ölçüde saklanır. Verilerinizin yetkisiz erişime karşı korunması için gerekli teknik ve idari tedbirler alınmaktadır.",
  },
  {
    baslik: "6. KVKK Kapsamındaki Haklarınız",
    icerik:
      "KVKK'nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işleme amacını öğrenme, eksik veya yanlış işlenmişse düzeltilmesini isteme, silinmesini veya yok edilmesini talep etme haklarına sahipsiniz. Haklarınızın tam listesi, işleme amaçları, aktarım alıcıları ve başvuru usulü için KVKK Aydınlatma Metni sayfamıza bakabilirsiniz.",
  },
  {
    baslik: "7. İletişim",
    icerik:
      "Gizlilik politikamız veya kişisel verilerinizle ilgili her türlü soru ve talebiniz için: Telefon: +90 554 406 23 83 · E-posta: info@konyahacamat.net · Adres: Sahibiata Mh. Taşcami Uzunharmanlar Cd. No: 16-4, 42040 Meram/Konya",
  },
];

export default function GizlilikPage() {
  return (
    <div className="min-h-screen bg-anthracite-dark pt-20 pb-24">
      <div className="container-site max-w-3xl">
        <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Yasal</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
          Gizlilik <span className="text-teal italic">Politikası</span>
        </h1>
        <p className="text-white/70 text-base mb-12">
          Kişisel verilerinizin gizliliği bizim için önemlidir. Bu sayfa, verilerinizin
          nasıl işlendiğini ve haklarınızı açıklar.
        </p>

        <div className="space-y-8">
          {bolumler.map(b => (
            <section key={b.baslik} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-white font-bold text-lg mb-3">{b.baslik}</h2>
              <p className="text-white/70 text-sm leading-relaxed">{b.icerik}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/iletisim"
            title="İletişim sayfası"
            className="inline-flex items-center gap-2 bg-teal text-anthracite-dark px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
          >
            Sorunuz mu var? Bize Ulaşın
          </Link>
        </div>
      </div>
    </div>
  );
}
