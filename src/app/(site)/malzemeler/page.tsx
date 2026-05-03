import type { Metadata } from "next";
import { ShieldCheck, Package, MessageCircle, Phone, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Hacamat Malzemeleri | Steril Set, Vantuz, Bistüri | Konya Kargo",
  description: "CE sertifikalı profesyonel hacamat malzemeleri: steril vantuz seti, tek kullanımlık bistüri, elektrikli pompa, sülük bakım seti. Konya'dan Türkiye geneline kargo. WhatsApp sipariş.",

  alternates: { canonical: '/malzemeler' },
  openGraph: {
    title: "Hacamat Malzemeleri | CE Sertifikalı Steril Set | Konya",
    description: "Profesyonel hacamat malzemeleri ve sülük bakım seti. CE sertifikalı, steril ambalaj. Türkiye geneli kargo. WhatsApp: 0554 406 23 83",
    url: '/malzemeler',
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Hacamat Malzemeleri Konya" }],
  },
};

const urunler = [
  {
    isim: "Profesyonel Hacamat Seti",
    aciklama: "12'li steril vantuz, pompa ve tam aksesuar dahil. Klinik kullanıma uygun.",
    icindekiler: ["12 adet steril vantuz", "Manuel pompa", "Bağlantı hortumu", "Taşıma çantası"],
    etiket: "En Çok Satan",
    renk: "teal",
  },
  {
    isim: "Başlangıç Hacamat Seti",
    aciklama: "Yeni başlayanlar için 6'lı set. Evde kullanım ve ilk kurslara uygundur.",
    icindekiler: ["6 adet steril vantuz", "Manuel pompa", "Kullanım kılavuzu"],
    etiket: "Başlangıç",
    renk: "white",
  },
  {
    isim: "Tek Kullanımlık Bistüri (50'li)",
    aciklama: "CE sertifikalı, steril ambalajlı tek kullanımlık bistüri. Her seans için ayrı.",
    icindekiler: ["50 adet bistüri", "Steril blister ambalaj", "CE sertifikası"],
    etiket: "Steril",
    renk: "white",
  },
  {
    isim: "Elektrikli Hacamat Pompası",
    aciklama: "Ayarlanabilir basınçlı elektrikli pompa. Profesyonel merkezler için idealdir.",
    icindekiler: ["Elektrikli pompa ünitesi", "Güç adaptörü", "Basınç ayar kontrolü", "Uyumlu başlık seti"],
    etiket: "Profesyonel",
    renk: "white",
  },
  {
    isim: "Sülük Bakım Seti",
    aciklama: "Tıbbi sülüklerin taşınması ve bakımı için özel tasarım kap ve solüsyon.",
    icindekiler: ["Sülük taşıma kabı", "Bakım solüsyonu", "Beslenme rehberi"],
    etiket: "Hirudoterapi",
    renk: "white",
  },
  {
    isim: "Hacamat Antiseptik Paketi",
    aciklama: "Seans öncesi ve sonrası cilt temizliği için onaylı antiseptik malzeme seti.",
    icindekiler: ["Antiseptik solüsyon", "Steril gazlı bez", "Eldiven (20 çift)"],
    etiket: "Hijyen",
    renk: "white",
  },
];

export default function MalzemelePage() {
  return (
    <main className="min-h-screen bg-anthracite-dark">

      {/* HERO */}
      <section className="pt-20 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-teal/5 rounded-full blur-[100px]" />
        <div className="container-site relative z-10">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Ekipman & Malzeme</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
            Hacamat<br /><span className="text-teal italic">Malzemeleri</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            Kliniğimizde kullandığımız kalitede, CE sertifikalı steril malzemeleri Türkiye geneline kargo ile gönderiyoruz.
            Fiyat bilgisi için WhatsApp'tan yazın.
          </p>
        </div>
      </section>

      {/* ÖZELLİKLER */}
      <section className="py-12 bg-white/3">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: ShieldCheck, label: "CE Sertifikalı", alt: "Avrupa standartlarında sertifikalı" },
              { icon: Package, label: "Hızlı Kargo", alt: "Türkiye geneli 1–3 iş günü" },
              { icon: CheckCircle, label: "Steril Ambalaj", alt: "Fabrikasyon steril paketleme" },
              { icon: MessageCircle, label: "Whatsapp Sipariş", alt: "7/24 sipariş ve destek" },
            ].map(f => (
              <div key={f.label} className="flex flex-col items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <f.icon size={24} className="text-teal" />
                <div className="text-white font-bold text-sm">{f.label}</div>
                <div className="text-white/40 text-[10px]">{f.alt}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÜRÜNLER */}
      <section className="py-20">
        <div className="container-site">
          <h2 className="font-display text-3xl font-bold text-white mb-10">
            <span className="w-4 h-[3px] bg-teal inline-block mr-3 mb-1" />
            Ürünler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {urunler.map(u => (
              <div key={u.isim} className={`bg-white/5 rounded-3xl p-7 flex flex-col gap-4 border hover:scale-[1.02] transition-all duration-300 ${u.renk === "teal" ? "border-teal/40 shadow-lg shadow-teal/10" : "border-white/10 hover:border-teal/20"}`}>
                <div className="flex justify-between items-start">
                  <h3 className="text-white font-bold text-lg leading-snug">{u.isim}</h3>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full whitespace-nowrap ${u.renk === "teal" ? "bg-teal text-anthracite-dark" : "bg-white/10 text-white/60"}`}>
                    {u.etiket}
                  </span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{u.aciklama}</p>
                <ul className="space-y-1.5 flex-1">
                  {u.icindekiler.map(ic => (
                    <li key={ic} className="flex items-center gap-2 text-xs text-white/60">
                      <CheckCircle size={12} className="text-teal shrink-0" /> {ic}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/905544062383?text=${encodeURIComponent(`Merhaba, "${u.isim}" ürünü hakkında fiyat bilgisi almak istiyorum.`)}`}
                  target="_blank" rel="noopener noreferrer nofollow"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                  <MessageCircle size={14} fill="currentColor" /> Fiyat Al
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEDEN ORİJİNAL */}
      <section className="py-20 bg-white/3 border-y border-white/5">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Kalite Güvencesi</span>
              <h2 className="font-display text-3xl font-bold text-white mt-3 mb-6">Neden Orijinal Malzeme Önemli?</h2>
              <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                <p>Hacamat tedavisinde kullanılan malzemelerin kalitesi, hem uygulayıcının hem de hastanın güvenliğini doğrudan etkiler. Düşük kaliteli malzemeler enfeksiyon riskini artırır, uygulamanın etkinliğini düşürür.</p>
                <p>Kliniğimizde kullandığımız ve sattığımız tüm malzemeler <strong className="text-white">Avrupa CE standartlarını</strong> karşılar, steril fabrikasyon ambalajda gelir ve tek kullanımlıktır.</p>
                <p>Kurslara katılan öğrencilerimize özel malzeme paketleri de temin edilmektedir. Eğitimlerimizde yalnızca klinik kaliteli ekipman kullanılır.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { rakam: "CE", etiket: "Avrupa Sertifikası", ikon: "🛡️" },
                { rakam: "1–3", etiket: "İş Günü Kargo", ikon: "🚚" },
                { rakam: "0", etiket: "Enfeksiyon Riski", ikon: "✅" },
                { rakam: "7/24", etiket: "WhatsApp Destek", ikon: "💬" },
              ].map(s => (
                <div key={s.etiket} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-teal/20 transition-colors">
                  <div className="text-3xl mb-2">{s.ikon}</div>
                  <div className="font-display text-2xl font-bold text-teal mb-1">{s.rakam}</div>
                  <div className="text-white/50 text-xs">{s.etiket}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* İLGİLİ SAYFALAR */}
      <section className="py-16">
        <div className="container-site">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Daha Fazlası</span>
          <h2 className="font-display text-2xl font-bold text-white mt-3 mb-8">İlgili Sayfalar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: "/hizmetler/hacamat", baslik: "Hacamat Tedavisi", aciklama: "Profesyonel hacamat seansı randevusu alın", emoji: "🩸" },
              { href: "/egitimler", baslik: "Eğitim Kursları", aciklama: "Malzeme kullanımını kursta öğrenin", emoji: "🎓" },
              { href: "/hizmetler/suluk", baslik: "Sülük Terapisi", aciklama: "Sülük bakım setleri hakkında bilgi alın", emoji: "🐛" },
            ].map(l => (
              <a key={l.href} href={l.href} title={(l as any).baslik || (l as any).title || (l as any).isim || "Bağlantı Detayı"}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-teal/30 hover:bg-white/8 transition-all group">
                <div className="text-3xl mb-3">{l.emoji}</div>
                <div className="text-white font-bold text-sm mb-1 group-hover:text-teal transition-colors">{l.baslik}</div>
                <div className="text-white/50 text-xs leading-relaxed">{l.aciklama}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SİPARİŞ */}
      <section className="py-20 bg-teal/5 border-t border-teal/10">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="bg-white rounded-2xl p-4 shrink-0 shadow-lg">
              <img src="/logo.webp" alt="Konya Hacamat Ebusadullah" className="h-14 w-auto" />
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-2">Sipariş &amp; Bilgi</h2>
              <p className="text-white/50 max-w-md">Ürün soruları, toplu sipariş ve kargo için WhatsApp veya telefon ile ulaşın.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href="https://wa.me/905544062383" title="Türkiye Hacamat İletişim" target="_blank" rel="noopener noreferrer nofollow"
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
              <MessageCircle size={18} fill="currentColor" /> WhatsApp
            </a>
            <a href="tel:05544062383" title="Türkiye Hacamat İletişim"
              className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all">
              🇹🇷 <Phone size={18} /> 0554 406 23 83
            </a>
            <a href="tel:+491634492870" title="Almanya Hacamat İletişim"
              className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all">
              🇩🇪 <Phone size={18} /> +49 163 449 28 70
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
