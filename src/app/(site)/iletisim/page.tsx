import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle, Globe } from "lucide-react";
import { getYearsExpStr } from "@/lib/experience";

export const metadata: Metadata = {
  title: "İletişim & Randevu | Konya Hacamat | Ebusadullah Akademi",
  description: "Konya hacamat randevusu için bize ulaşın: 0554 406 23 83 | Almanya: +49 163 449 28 70. Nişantaş Mh. Selçuklu/Konya. WhatsApp ile 7/24 mesaj atabilirsiniz.",

  alternates: { canonical: '/iletisim' },
  openGraph: {
    title: "İletişim & Randevu | Konya Hacamat Ebusadullah",
    description: "Hacamat randevusu için: 0554 406 23 83 | Almanya: +49 163 449 28 70 | Nişantaş Mh. Selçuklu/Konya. WhatsApp 7/24.",
    url: '/iletisim',
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Konya Hacamat İletişim" }],
  },
};

export default function IletisimPage() {
  return (
    <main className="min-h-screen bg-anthracite-dark">
      <section className="pt-20 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px]" />
        <div className="container-site relative z-10">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Bize Ulaşın</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
            İletişim
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Randevu, eğitim veya Almanya seansları hakkında bize yazın ya da arayın.
          </p>
        </div>
      </section>

      <section className="pb-6">
        <div className="container-site">
          <div className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
            <div className="bg-white rounded-xl p-3 shrink-0 shadow">
              <img src="/logo.webp" alt="Konya Hacamat Ebusadullah" className="h-12 w-auto" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              <strong className="text-white">Ebusadullah Hacamat &amp; Akademi</strong> — Konya'da {getYearsExpStr()} yıldır hizmet veren geleneksel tıp merkezi. Hacamat, sülük terapisi ve uzmanlık eğitimleri için bize ulaşın. Almanya seansları için Almanya hattımızı kullanabilirsiniz.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* İletişim Bilgileri */}
            <div className="space-y-6">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4 hover:border-teal/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
                  <MapPin size={22} className="text-teal" />
                </div>
                <div>
                  <div className="text-teal text-[10px] font-black uppercase tracking-widest mb-1">Adres</div>
                  <div className="text-white font-bold">Nişantaş Mh. Dr. Hulusi Baybal Cd.</div>
                  <div className="text-white/60 text-sm">Selçuklu / KONYA</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4 hover:border-teal/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
                  <Phone size={22} className="text-teal" />
                </div>
                <div className="space-y-2">
                  <div className="text-teal text-[10px] font-black uppercase tracking-widest mb-1">Telefon</div>
                  <div>
                    <a href="tel:05544062383" className="text-white font-bold text-xl hover:text-teal transition-colors">0554 406 23 83</a>
                    <div className="text-white/40 text-xs">🇹🇷 Türkiye</div>
                  </div>
                  <div>
                    <a href="tel:+491634492870" className="text-white font-bold text-xl hover:text-teal transition-colors">+49 163 449 28 70</a>
                    <div className="text-white/40 text-xs">🇩🇪 Almanya</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4 hover:border-teal/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
                  <MessageCircle size={22} className="text-teal" />
                </div>
                <div>
                  <div className="text-teal text-[10px] font-black uppercase tracking-widest mb-1">WhatsApp</div>
                  <a href="https://wa.me/905544062383" target="_blank" rel="noopener noreferrer nofollow" className="text-white font-bold hover:text-teal transition-colors">wa.me/905544062383</a>
                  <div className="text-white/40 text-xs mt-1">7/24 mesaj atabilirsiniz</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4 hover:border-teal/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
                  <Mail size={22} className="text-teal" />
                </div>
                <div>
                  <div className="text-teal text-[10px] font-black uppercase tracking-widest mb-1">E-Posta</div>
                  <a href="mailto:info@konyahacamat.net" className="text-white font-bold hover:text-teal transition-colors">info@konyahacamat.net</a>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4 hover:border-teal/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
                  <Clock size={22} className="text-teal" />
                </div>
                <div>
                  <div className="text-teal text-[10px] font-black uppercase tracking-widest mb-1">Çalışma Saatleri</div>
                  <div className="text-white font-bold">Pzt – Cmt: 09:00 – 18:00</div>
                  <div className="text-white/40 text-sm">Pazar: Kapalı</div>
                </div>
              </div>

              {/* Almanya */}
              <div className="bg-teal/5 border border-teal/20 rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
                  <Globe size={22} className="text-teal" />
                </div>
                <div>
                  <div className="text-teal text-[10px] font-black uppercase tracking-widest mb-1">🇩🇪 Almanya Seansları</div>
                  <div className="text-white font-bold">Periyodik Almanya Ziyaretleri</div>
                  <div className="text-white/60 text-sm mt-1">Frankfurt, Köln, Stuttgart bölgelerinde yılda 2–3 kez. Tarihler için WhatsApp'tan yazın.</div>
                </div>
              </div>
            </div>

            {/* Harita & Hızlı Butonlar */}
            <div className="space-y-6">
              {/* Hızlı Butonlar */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-black uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                  <span className="w-3 h-[2px] bg-teal" /> Hızlı İletişim
                </h3>
                <div className="space-y-3">
                  <a href="https://wa.me/905544062383?text=Merhaba%2C%20hacamat%20randevusu%20almak%20istiyorum."
                    target="_blank" rel="noopener noreferrer nofollow"
                    className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white w-full px-5 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all">
                    <MessageCircle size={18} fill="currentColor" /> Tedavi Randevusu Al
                  </a>
                  <a href="https://wa.me/905544062383?text=Merhaba%2C%20e%C4%9Fitim%20programlar%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                    target="_blank" rel="noopener noreferrer nofollow"
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 w-full px-5 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all">
                    <MessageCircle size={18} /> Eğitim Bilgisi Al
                  </a>
                  <a href="https://wa.me/491634492870?text=Merhaba%2C%20Almanya%20seans%20tarihleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                    target="_blank" rel="noopener noreferrer nofollow"
                    className="flex items-center gap-3 bg-teal/10 hover:bg-teal/20 text-teal border border-teal/20 w-full px-5 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all">
                    🇩🇪 Almanya: +49 163 449 28 70
                  </a>
                </div>
              </div>

              {/* Harita */}
              <div className="rounded-2xl overflow-hidden border border-white/10 h-72 group relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.566373752631!2d32.49581177651817!3d37.87040907196147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d085951f2536d7%3A0x1d14a1a09d31d45!2zTmnFnWFudGHFnywgRHIuIEh1bHVzaSBCYXliYWwgQ2QuLCBTZWzDp3VrbHUvS29ueWE!5e0!3m2!1str!2str!4v1715500000000!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale invert contrast-[0.9] opacity-80 group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 transition-all duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=37.8704,32.4958"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    title="Konya Hacamat Yol Tarifi"
                    className="inline-flex items-center gap-2 bg-anthracite-dark/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-[11px] font-bold text-teal uppercase tracking-widest pointer-events-auto hover:bg-teal hover:text-black transition-all shadow-2xl"
                  >
                    <MapPin size={12} /> Yol Tarifi Al
                  </a>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-white/50 text-sm text-center">
                  Ortalama yanıt süresi: <strong className="text-white">15 dakika</strong>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* CROSS LINKS */}
      <section className="py-16 bg-white/3 border-t border-white/5">
        <div className="container-site">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Daha Fazlası</span>
          <h2 className="font-display text-2xl font-bold text-white mt-3 mb-8">Ne Arıyorsunuz?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/hizmetler/hacamat", baslik: "Hacamat Tedavisi", aciklama: "Kuru & yaş hacamat seansları", emoji: "🩸" },
              { href: "/hizmetler/suluk", baslik: "Sülük Terapisi", aciklama: "Hirudoterapi randevusu", emoji: "🐛" },
              { href: "/egitimler", baslik: "Eğitim Kursları", aciklama: "Sertifikalı uzmanlık programları", emoji: "🎓" },
              { href: "/takvim", baslik: "Randevu Takvimi", aciklama: "Faziletli günlerde seans planla", emoji: "📅" },
            ].map(l => (
              <a key={l.href} href={l.href}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-teal/30 hover:bg-white/8 transition-all group">
                <div className="text-3xl mb-3">{l.emoji}</div>
                <div className="text-white font-bold text-sm mb-1 group-hover:text-teal transition-colors">{l.baslik}</div>
                <div className="text-white/50 text-xs leading-relaxed">{l.aciklama}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
