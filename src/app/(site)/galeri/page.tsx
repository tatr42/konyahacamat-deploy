import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Galeri | Hacamat Seansı & Kurs Fotoğrafları | Ebusadullah Akademi Konya",
  description: "Ebusadullah Hacamat & Akademi galeri. Konya'daki hacamat seansları, sülük terapisi uygulamaları, uzmanlık kursları ve Almanya faaliyetlerinden görüntüler.",
  alternates: { canonical: "/galeri" },
  openGraph: {
    title: "Galeri | Hacamat Seansı & Kurs Fotoğrafları | Ebusadullah Konya",
    description: "Hacamat seansları, kurs eğitimleri ve Almanya faaliyetlerinden fotoğraflar. Ebusadullah Hacamat & Akademi.",
    url: "https://konyahacamat.net/galeri",
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Hacamat Galeri Konya" }],
  },
};

const kategoriler = ["Tümü", "Hacamat Seansı", "Eğitim & Kurs", "Mezunlar", "Almanya"];

const fotograflar = [
  { id: 1, src: "/1.webp", alt: "Hacamat seansı 1", kategori: "Hacamat Seansı" },
  { id: 2, src: "/2.webp", alt: "Hacamat seansı 2", kategori: "Hacamat Seansı" },
  { id: 3, src: "/3.webp", alt: "Hacamat seansı 3", kategori: "Hacamat Seansı" },
  { id: 4, src: "/4.webp", alt: "Hacamat seansı 4", kategori: "Eğitim & Kurs" },
  { id: 5, src: "/5.webp", alt: "Hacamat seansı 5", kategori: "Eğitim & Kurs" },
  { id: 6, src: "/6.webp", alt: "Hacamat seansı 6", kategori: "Eğitim & Kurs" },
  { id: 7, src: "/7.webp", alt: "Hacamat seansı 7", kategori: "Hacamat Seansı" },
  { id: 8, src: "/8.webp", alt: "Hacamat seansı 8", kategori: "Hacamat Seansı" },
  { id: 9, src: "/9.webp", alt: "Hacamat seansı 9", kategori: "Hacamat Seansı" },
];

export default function GaleriPage() {
  return (
    <main className="min-h-screen bg-anthracite-dark">
      <section className="pt-20 pb-16">
        <div className="container-site">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Görseller</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mt-4 mb-6">Galeri</h1>
          <p className="text-white/50 text-lg max-w-xl mb-10">
            Seans, eğitim ve Almanya faaliyetlerimizden kareler.
          </p>

          {/* Kategori Filtreleri - client-side için şimdilik statik */}
          <div className="flex flex-wrap gap-2 mb-12">
            {kategoriler.map(k => (
              <span key={k} className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest cursor-pointer transition-all
                ${k === "Tümü" ? "bg-teal text-anthracite-dark" : "bg-white/5 text-white/50 border border-white/10 hover:border-teal/30 hover:text-teal"}`}>
                {k}
              </span>
            ))}
          </div>

          {/* Fotoğraf Grid */}
          <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
            {fotograflar.map(foto => (
              <div key={foto.id} className="break-inside-avoid rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-teal/30 transition-all hover:scale-[1.02] cursor-pointer group">
                <div className="aspect-square bg-white/5 flex items-center justify-center relative">
                  <img
                    src={foto.src}
                    alt={foto.alt}
                    className="w-full h-full object-cover"
                  />
                  {/* Placeholder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/10 group-hover:text-white/20 transition-colors">
                    <div className="text-4xl font-black font-display">{foto.id}</div>
                    <div className="text-[9px] uppercase tracking-widest mt-1">{foto.kategori}</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-anthracite-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>

          <p className="text-white/30 text-center text-sm mt-12">Fotoğraflar yüklenme aşamasındadır.</p>
        </div>
      </section>

      {/* SEO METNİ */}
      <section className="py-16 bg-white/3 border-t border-white/5">
        <div className="container-site">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="bg-white rounded-2xl p-5 shrink-0 shadow-lg">
              <img src="/logo.webp" alt="Konya Hacamat Ebusadullah" className="h-14 w-auto" />
            </div>
            <div className="space-y-3 text-white/60 text-sm leading-relaxed max-w-2xl">
              <p>
                <strong className="text-white">Ebusadullah Hacamat &amp; Akademi</strong> olarak Konya'daki seans ve eğitim faaliyetlerimizi buradan takip edebilirsiniz.
                Galerimizde hacamat uygulamaları, sülük terapisi seansları, akademi kursları ve Almanya'daki periyodik ziyaretlerimize ait görüntüler yer almaktadır.
              </p>
              <p>
                1200'den fazla mezun yetiştirdiğimiz eğitim programlarımıza ait sertifika törenleri ve uygulama fotoğrafları da galerimizde güncellenmektedir.
                Almanya başta olmak üzere Avrupa'daki faaliyetlerimizi de buradan izleyebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="py-14">
        <div className="container-site">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Daha Fazlası</span>
          <h2 className="font-display text-2xl font-bold text-white mt-3 mb-8">Hizmetlerimiz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/hizmetler/hacamat", baslik: "Hacamat Tedavisi", aciklama: "Seans bilgisi ve randevu alın", emoji: "🩸" },
              { href: "/hizmetler/suluk", baslik: "Sülük Terapisi", aciklama: "Hirudoterapi seansları", emoji: "🐛" },
              { href: "/egitimler", baslik: "Eğitim Kursları", aciklama: "Hacamat uzmanlık sertifikası", emoji: "🎓" },
              { href: "/takvim", baslik: "Randevu Takvimi", aciklama: "Faziletli günlerde randevu", emoji: "📅" },
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
    </main>
  );
}
