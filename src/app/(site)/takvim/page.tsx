import type { Metadata } from "next";
import { Moon, Shield, Clock, MessageCircle, Phone } from "lucide-react";
import HacamatCalendar from "@/components/HacamatCalendar";
import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Hacamat Takvimi ${currentYear} | Hicri Faziletli Günler & Online Randevu | Konya`,
  description: "Hicri takvime göre faziletli hacamat günleri (13, 14, 15, 17, 19, 21). Konya ve Almanya için WhatsApp randevu. Ebusadullah Hacamat & Akademi — Anında teyit.",

  alternates: { canonical: '/takvim' },
  openGraph: {
    title: `Hacamat Takvimi ${currentYear} | Hicri Faziletli Günler | Konya Randevu`,
    description: "Hicri takvime göre işaretli faziletli hacamat günleri. Gün seçin, WhatsApp ile anında randevu alın. Konya ve Almanya.",
    url: '/takvim',
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Hacamat Takvimi Konya" }],
  },
};

const adimlar = [
  { no: "01", baslik: "Tarih Seçin", aciklama: "Takvimden size uygun bir gün seçin. Yeşil sünnet günlerini tercih edin." },
  { no: "02", baslik: "WhatsApp'a Yönlenin", aciklama: "Seçtiğiniz tarih otomatik mesaja eklenir. Türkiye veya Almanya hattını seçin." },
  { no: "03", baslik: "Onay Alın", aciklama: "En geç 1 saat içinde randevunuz teyit edilir." },
];

export default function TakvimPage() {
  return (
    <main className="min-h-screen bg-anthracite-dark">

      {/* HERO */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px]" />
        <div className="container-site relative z-10">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Online Randevu</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mt-4 mb-4 leading-tight">
            Hacamat <span className="text-teal italic">Takvimi</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Hicri takvime göre sünnet günler işaretli. Tarih seçip anında WhatsApp randevusu alın.
          </p>
        </div>
      </section>

      {/* ANA İÇERİK */}
      <section className="pb-24">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

            {/* TAKVİM */}
            <div className="lg:col-span-3">
              <HacamatCalendar />
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-2 space-y-5">

              {/* Sünnet Günler Açıklama */}
              <div className="bg-teal/5 border border-teal/20 rounded-2xl p-5 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
                  <Moon size={18} className="text-teal" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm mb-1">Sünnet Günler</div>
                  <p className="text-white/70 text-xs leading-relaxed">
                    Hz. Peygamber'in tavsiyesiyle hicri ayın <strong className="text-white">17, 19 ve 21.</strong> günleri hacamat için en faziletli günlerdir.
                  </p>
                </div>
              </div>

              {/* Adımlar */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-3 h-[2px] bg-teal" /> Randevu Nasıl Alınır?
                </h3>
                <div className="space-y-4">
                  {adimlar.map(a => (
                    <div key={a.no} className="flex gap-3">
                      <div className="w-7 h-7 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center text-teal font-black text-[11px] shrink-0">{a.no}</div>
                      <div>
                        <div className="text-white font-bold text-sm">{a.baslik}</div>
                        <div className="text-white/40 text-xs leading-relaxed">{a.aciklama}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hızlı İletişim */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <h3 className="text-white font-black text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-3 h-[2px] bg-teal" /> Hızlı Randevu
                </h3>
                <a href="https://wa.me/905544062383?text=Merhaba%2C%20hacamat%20randevusu%20almak%20istiyorum." title="Türkiye Hacamat İletişim" target="_blank" rel="noopener noreferrer nofollow"
                  className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white w-full px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                  <MessageCircle size={16} fill="currentColor" /> 🇹🇷 WhatsApp TR
                </a>
                <a href="https://wa.me/491634492870?text=Merhaba%2C%20hacamat%20randevusu%20almak%20istiyorum." title="Almanya Hacamat İletişim" target="_blank" rel="noopener noreferrer nofollow"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/15 text-white border border-white/10 w-full px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                  <MessageCircle size={16} /> 🇩🇪 WhatsApp Almanya
                </a>
                <a href="tel:05544062383" title="Türkiye Hacamat İletişim"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white/60 border border-white/5 w-full px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                  <Phone size={14} /> 🇹🇷 0554 406 23 83
                </a>
                <a href="tel:+491634492870" title="Almanya Hacamat İletişim"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white/60 border border-white/5 w-full px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                  <Phone size={14} /> 🇩🇪 +49 163 449 28 70
                </a>
              </div>

              {/* Hazırlık Notu */}
              <div className="bg-amber-400/5 border border-amber-400/20 rounded-2xl p-5 flex gap-3">
                <Shield size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-bold text-sm mb-1">Seans Öncesi</div>
                  <ul className="text-white/70 text-xs space-y-1">
                    <li>• Aç karnına veya hafif yemekle gelin</li>
                    <li>• Son 2 saatte ağır yemek yemeyin</li>
                    <li>• Bol su için</li>
                    <li>• Rahat kıyafet tercih edin</li>
                  </ul>
                </div>
              </div>

              {/* Süre */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-teal" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Seans Süresi</div>
                  <div className="text-white/70 text-xs">Kuru hacamat 30–45 dk · Yaş hacamat 45–60 dk</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* BİLGİLENDİRME */}
      <section className="pb-16">
        <div className="container-site">
          <div className="bg-white/3 border border-white/10 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
                <span className="text-lg">☪️</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white">Hicri Takvim &amp; Hacamat Hakkında</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/60 text-sm leading-relaxed">
              <div className="space-y-4">
                <p>
                  İslam'da Hicri takvime göre bazı günlerin faziletli olduğu kabul edilir ve bu günlerde yapılan
                  ibadetlerin daha fazla sevap getireceği düşünülür. Genel olarak <strong className="text-white">13., 14. ve 15. günler</strong> (ayın
                  ortasına denk gelen günler) faziletli kabul edilmektedir.
                </p>
                <p>
                  Hicri ayların özellikle <strong className="text-white">Muharrem, Recep, Şaban ve Zilhicce</strong> aylarının içindeki belirli günlerde
                  (örneğin Aşure Günü gibi) hacamatın daha faziletli olduğu kabul edilir. Bu günlerde yapılan
                  ibadet ve uygulamaların sevabının arttığına inanılır.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  Her ne kadar bu günlerde hacamat yapılması daha faziletli kabul edilse de kesin bir kural
                  değildir. Hicri takvimde belirli günlerin dini anlamda özel olduğuna inanılmakla birlikte,
                  hacamat uygulaması kişisel sağlık durumuna, ihtiyaca ve uygun bir sağlık uzmanı tarafından
                  yapılmasına dayanır.
                </p>
                <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-4 flex gap-3">
                  <span className="text-amber-400 shrink-0 mt-0.5">⚠️</span>
                  <p className="text-white/60 text-xs leading-relaxed">
                    <strong className="text-white">Önemli:</strong> Hicri takvimde özel günlerde hacamat yaptırmayı tercih eden kişilerin,
                    bu konuda bilgili bir uzmana danışarak hareket etmesi önerilir. Herhangi bir tıbbi
                    uygulama öncesinde sağlık uzmanına danışmak büyük önem taşımaktadır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İLGİLİ SAYFALAR */}
      <section className="py-14">
        <div className="container-site">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Daha Fazlası</span>
          <h2 className="font-display text-2xl font-bold text-white mt-3 mb-8">İlgili Sayfalar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/hizmetler/hacamat", baslik: "Hacamat Tedavisi", aciklama: "Kuru & yaş hacamat hakkında detaylı bilgi", emoji: "🩸" },
              { href: "/hizmetler/suluk", baslik: "Sülük Terapisi", aciklama: "Hirudoterapi seansı ve süreç", emoji: "🐛" },
              { href: "/egitimler", baslik: "Eğitim Kursları", aciklama: "Hacamat uzmanlık programları", emoji: "🎓" },
              { href: "/iletisim", baslik: "İletişim", aciklama: "Konya & Almanya hattı", emoji: "📞" },
            ].map(l => (
              <Link key={l.href} href={l.href} title={(l as any).baslik || (l as any).title || (l as any).isim || "Bağlantı Detayı"}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-teal/30 hover:bg-white/8 transition-all group">
                <div className="text-3xl mb-3">{l.emoji}</div>
                <div className="text-white font-bold text-sm mb-1 group-hover:text-teal transition-colors">{l.baslik}</div>
                <div className="text-white/70 text-xs leading-relaxed">{l.aciklama}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ALT CTA */}
      <section className="py-16 bg-teal/5 border-t border-teal/10">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="bg-white rounded-xl p-3 shrink-0 shadow">
              <Image src="/logo.webp" alt="Konya Hacamat Ebusadullah" width={200} height={48} className="h-12 w-auto" />
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-2">Sorularınız mı var?</h2>
              <p className="text-white/70">Randevu öncesi ücretsiz danışmanlık için bize yazın.</p>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a href="https://wa.me/905544062383" title="Türkiye Hacamat İletişim" target="_blank" rel="noopener noreferrer nofollow"
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
              <MessageCircle size={18} fill="currentColor" /> 🇹🇷 WhatsApp
            </a>
            <a href="https://wa.me/491634492870" title="Almanya Hacamat İletişim" target="_blank" rel="noopener noreferrer nofollow"
              className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all">
              <MessageCircle size={18} /> 🇩🇪 Almanya
            </a>
            <Link href="/iletisim" title="İletişim"
              className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all">
              İletişim
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
