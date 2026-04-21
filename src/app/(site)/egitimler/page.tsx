import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, CheckCircle, Clock, Users, Award, MessageCircle, Phone, Globe, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Hacamat Kursu Konya | Sertifikalı Hacamat Eğitimi | Ebusadullah Akademi",
  description: "Konya Ebusadullah Akademi'de sertifikalı hacamat ve sülük terapisi uzmanlık kursları. Küçük gruplar, birebir uygulama, uluslararası geçerli sertifika. Almanya'da da eğitim verilmektedir.",

  alternates: { canonical: "/egitimler" },
  openGraph: {
    title: "Hacamat Kursu Konya | Sertifikalı Eğitim | Ebusadullah Akademi",
    description: "Sertifikalı hacamat ve sülük terapisi uzmanlık kursları. Küçük gruplar, birebir uygulama. 1200+ mezun. Konya ve Almanya'da eğitim.",
    url: "https://konyahacamat.net/egitimler",
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Hacamat Kursu Ebusadullah Akademi Konya" }],
  },
};

const kurslar = [
  {
    rozet: "En Popüler",
    baslik: "Temel Hacamat Uzmanlık Kursu",
    seviye: "Başlangıç → Orta",
    sure: "3 Gün · 24 Saat",
    kisi: "Maks. 8 Kişi",
    aciklama:
      "Kuru ve yaş hacamat tekniklerini doğru noktalarda uygulamayı, hijyen protokollerini ve birey odaklı tedavi planlamasını öğrenirsiniz.",
    konular: [
      "Hacamatın tarihçesi ve İslami temeli",
      "Anatomi ve güvenli uygulama noktaları",
      "Kuru hacamat tekniği ve malzeme kullanımı",
      "Yaş hacamat: kesim, negatif basınç, antisepsi",
      "Kontrendikasyonlar ve risk değerlendirmesi",
      "Pratik uygulama ve süpervizyon",
      "Sertifika sınavı ve belgelendirme",
    ],
    ozellik: true,
  },
  {
    rozet: "İleri Seviye",
    baslik: "Sülük Terapisi Uzmanlık Kursu",
    seviye: "Orta → İleri",
    sure: "2 Gün · 16 Saat",
    kisi: "Maks. 6 Kişi",
    aciklama:
      "Tıbbi sülüğün biyolojisi, taşıma ve saklama protokolleri, uygulama noktaları ve seans yönetimi konularında derinlemesine eğitim.",
    konular: [
      "Hirudo medicinalis biyolojisi ve türleri",
      "Güvenli taşıma, saklama ve hazırlık",
      "Uygulama bölgeleri ve endikasyonlar",
      "Reaksiyon takibi ve seansın sonlandırılması",
      "Yasal çerçeve ve hasta bilgilendirme",
      "Pratik uygulama ve belgelendirme",
    ],
    ozellik: false,
  },
  {
    rozet: "Paket",
    baslik: "Kombine Uzmanlık Paketi",
    seviye: "Başlangıç → İleri",
    sure: "5 Gün · 40 Saat",
    kisi: "Maks. 6 Kişi",
    aciklama:
      "Hacamat ve hirudoterapi kurslarını bir arada alarak iki alanda da sertifikalı uzman olun. İndirimli paket fiyatı için iletişime geçin.",
    konular: [
      "Temel Hacamat Uzmanlık Kursu içeriğinin tamamı",
      "Sülük Terapisi Uzmanlık Kursu içeriğinin tamamı",
      "Kombine seans planlaması",
      "Danışmanlık desteği (1 ay)",
      "İki ayrı sertifika",
    ],
    ozellik: false,
  },
];

const avantajlar = [
  { icon: Award, baslik: "Uluslararası Sertifika", aciklama: "Türkiye ve Avrupa'da geçerli, akredite sertifika programı." },
  { icon: Users, baslik: "Küçük Gruplar", aciklama: "Maks. 6–8 kişilik gruplarla birebir pratik fırsatı." },
  { icon: BookOpen, baslik: "Materyal Dahil", aciklama: "Eğitim el kitabı, uygulama seti ve dijital kaynaklar dahildir." },
  { icon: Globe, baslik: "TR & Almanya", aciklama: "Konya'da ve yılın belirli dönemlerinde Almanya'da eğitim." },
];

export default function EgitimlerPage() {
  return (
    <main className="min-h-screen bg-anthracite-dark">

      {/* HERO */}
      <section className="pt-20 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px]" />
        <div className="container-site relative z-10">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Ebusadullah Akademi</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
            Hacamat &amp; Sülük<br /><span className="text-teal italic">Uzmanlık Eğitimleri</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-10">
            1200'den fazla mezunuyla Türkiye'nin köklü hacamat akademisi. Sertifikalı eğitimlerimizle
            hem kendi sağlığınıza hem de çevrenize katkı sağlayın.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://wa.me/905544062383?text=Merhaba%2C%20e%C4%9Fitim%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank" rel="noopener noreferrer nofollow"
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
              <MessageCircle size={18} fill="currentColor" /> 🇹🇷 WhatsApp TR
            </a>
            <a href="https://wa.me/491634492870?text=Merhaba%2C%20e%C4%9Fitim%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank" rel="noopener noreferrer nofollow"
              className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all">
              <MessageCircle size={18} /> 🇩🇪 WhatsApp Almanya
            </a>
          </div>
        </div>
      </section>

      {/* AVANTAJLAR */}
      <section className="py-14 bg-white/3 border-y border-white/5">
        <div className="container-site grid grid-cols-2 md:grid-cols-4 gap-5">
          {avantajlar.map(a => (
            <div key={a.baslik} className="flex flex-col items-center text-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-teal/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center">
                <a.icon size={20} className="text-teal" />
              </div>
              <div className="text-white font-bold text-sm">{a.baslik}</div>
              <div className="text-white/50 text-xs leading-relaxed">{a.aciklama}</div>
            </div>
          ))}
        </div>
      </section>

      {/* KURSLAR */}
      <section className="py-24">
        <div className="container-site">
          <div className="mb-12">
            <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Kurslarımız</span>
            <h2 className="font-display text-4xl font-bold text-white mt-3">Eğitim Programları</h2>
            <p className="text-white/50 mt-3 max-w-xl">Tüm eğitimler küçük gruplarla, birebir süpervizyon altında gerçekleştirilir.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {kurslar.map(k => (
              <div key={k.baslik}
                className={`rounded-3xl flex flex-col border transition-all duration-300 hover:scale-[1.01] ${
                  k.ozellik
                    ? "bg-white/8 border-teal/40 shadow-2xl shadow-teal/10"
                    : "bg-white/5 border-white/10 hover:border-teal/20"
                }`}>

                <div className="px-6 pt-6 pb-0">
                  <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                    k.ozellik ? "bg-teal text-anthracite-dark" : "bg-white/10 text-white/60"
                  }`}>
                    {k.rozet}
                  </span>
                </div>

                <div className="p-6 flex flex-col gap-5 flex-1">
                  <h3 className="text-white font-bold text-xl leading-snug">{k.baslik}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{k.aciklama}</p>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { icon: Clock, text: k.sure },
                      { icon: Users, text: k.kisi },
                    ].map(m => (
                      <span key={m.text}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                        <m.icon size={11} /> {m.text}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-2 flex-1">
                    {k.konular.map(konu => (
                      <li key={konu} className="flex items-start gap-2 text-xs text-white/60">
                        <CheckCircle size={12} className="text-teal shrink-0 mt-0.5" /> {konu}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-white/10">
                    <a
                      href={`https://wa.me/905544062383?text=${encodeURIComponent(`Merhaba, "${k.baslik}" eğitimi hakkında bilgi almak istiyorum.`)}`}
                      target="_blank" rel="noopener noreferrer nofollow"
                      className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 ${
                        k.ozellik
                          ? "bg-teal text-anthracite-dark hover:opacity-90"
                          : "bg-[#25D366] hover:bg-[#1da851] text-white"
                      }`}>
                      <MessageCircle size={13} fill="currentColor" /> Kayıt &amp; Bilgi Al
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YORUM */}
      <section className="py-20 bg-white/3 border-y border-white/5">
        <div className="container-site max-w-3xl text-center flex flex-col items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center text-teal font-black text-lg">A</div>
          <p className="font-display text-2xl md:text-3xl text-white font-bold leading-relaxed italic">
            &ldquo;Bu eğitim benim için bir kapı araladı. Artık kendi danışanlarıma profesyonel hacamat uygulayabiliyorum.&rdquo;
          </p>
          <div>
            <p className="text-white font-bold text-sm">Ahmed K.</p>
            <p className="text-white/40 text-xs">Mezun Öğrenci · 2024</p>
          </div>
        </div>
      </section>

      {/* ALMANYA */}
      <section className="py-20">
        <div className="container-site">
          <div className="bg-teal/5 border border-teal/20 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-8">
            <span className="text-6xl">🇩🇪</span>
            <div className="flex-1">
              <h2 className="font-display text-3xl font-bold text-white mb-3">Almanya Eğitimleri</h2>
              <p className="text-white/60 leading-relaxed max-w-xl">
                Yılın belirli dönemlerinde Almanya'da da eğitim programları düzenliyoruz.
                Avrupa'daki katılımcılar için özel tarihler hakkında WhatsApp'tan bilgi alabilirsiniz.
              </p>
            </div>
            <a href="https://wa.me/491634492870?text=Merhaba%2C%20Almanya%20e%C4%9Fitim%20tarihleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank" rel="noopener noreferrer nofollow"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all whitespace-nowrap shrink-0">
              <MessageCircle size={16} /> 🇩🇪 Almanya Hattı
            </a>
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="py-20 bg-white/3 border-y border-white/5">
        <div className="container-site max-w-3xl">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Merak Edilenler</span>
          <h2 className="font-display text-3xl font-bold text-white mt-3 mb-10">Eğitim Hakkında SSS</h2>
          <div className="space-y-4">
            {[
              { s: "Eğitime katılmak için ön koşul var mı?", c: "Hayır. Temel kursumuz herhangi bir tıp veya sağlık bilgisi gerektirmez. Meraklı ve öğrenmeye istekli olan herkes katılabilir." },
              { s: "Sertifika hangi ülkelerde geçerli?", c: "Ebusadullah Akademi sertifikası Türkiye ve Avrupa başta olmak üzere uluslararası düzeyde tanınmaktadır. Mezunlarımız 10'dan fazla ülkede aktif olarak çalışmaktadır." },
              { s: "Kurs sonrası destek var mı?", c: "Evet. Kombine pakette 1 aylık danışmanlık desteği dahildir. Tüm mezunlarımız WhatsApp destek grubuna üye olur ve soru sorabilir." },
              { s: "Online eğitim seçeneği mevcut mu?", c: "Teorik modüller online olarak da sunulabilmektedir. Ancak pratik uygulama bölümü zorunlu olarak yüz yüze gerçekleştirilir." },
              { s: "Almanya'da da kurs verilmekte midir?", c: "Evet. Yılda 1–2 kez Almanya'da da eğitim programı düzenlenmektedir. Tarihler için WhatsApp üzerinden bilgi alabilirsiniz." },
              { s: "Kurs ücretleri nedir?", c: "Fiyatlar kurs dönemine ve kontenjan durumuna göre değişmektedir. Güncel fiyat bilgisi için WhatsApp veya telefon üzerinden bize ulaşın." },
            ].map((q, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-teal/20 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-teal font-black text-lg shrink-0 mt-0.5">S.</span>
                  <div>
                    <p className="text-white font-bold mb-2">{q.s}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{q.c}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İLGİLİ SAYFALAR */}
      <section className="py-16">
        <div className="container-site">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Daha Fazlası</span>
          <h2 className="font-display text-2xl font-bold text-white mt-3 mb-8">İlgili Sayfalar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/hizmetler/hacamat", baslik: "Hacamat Tedavisi", aciklama: "Tedavi hakkında detaylı bilgi alın", emoji: "🩸" },
              { href: "/hizmetler/suluk", baslik: "Sülük Terapisi", aciklama: "Hirudoterapi tedavisi ve süreci", emoji: "🐛" },
              { href: "/malzemeler", baslik: "Malzemeler", aciklama: "Sertifikalı hacamat ekipmanları", emoji: "🛒" },
              { href: "/hakkimizda", baslik: "Hakkımızda", aciklama: "Akademi ve kurucu hakkında", emoji: "🏛️" },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-teal/30 hover:bg-white/8 transition-all group">
                <div className="text-3xl mb-3">{l.emoji}</div>
                <div className="text-white font-bold text-sm mb-1 group-hover:text-teal transition-colors">{l.baslik}</div>
                <div className="text-white/50 text-xs leading-relaxed">{l.aciklama}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ALT CTA */}
      <section className="py-16 bg-teal/5 border-t border-teal/10">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="bg-white rounded-2xl p-4 shrink-0 shadow-lg">
              <img src="/logo.webp" alt="Konya Hacamat Ebusadullah" className="h-14 w-auto" />
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-2">Kayıt &amp; Bilgi</h2>
              <p className="text-white/50">Kurs tarihleri ve ücretler için bize yazın.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/905544062383?text=Merhaba%2C%20e%C4%9Fitim%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank" rel="noopener noreferrer nofollow"
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
              <MessageCircle size={18} fill="currentColor" /> 🇹🇷 WhatsApp
            </a>
            <a href="https://wa.me/491634492870?text=Merhaba%2C%20e%C4%9Fitim%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank" rel="noopener noreferrer nofollow"
              className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all">
              <MessageCircle size={18} /> 🇩🇪 Almanya
            </a>
            <a href="tel:05544062383"
              className="flex items-center gap-2 bg-white/5 text-white/60 border border-white/10 px-6 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              <Phone size={16} /> 0554 406 23 83
            </a>
            <Link href="/iletisim"
              className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all">
              İletişim <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
