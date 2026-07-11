import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import GalleryGrid from "./GalleryGrid";

export const metadata: Metadata = {
  title: "Galeri | Hacamat Seansı & Kurs Fotoğrafları | Ebusadullah Akademi Konya",
  description: "Ebusadullah Hacamat & Akademi galeri. Konya'daki hacamat seansları, sülük terapisi uygulamaları, uzmanlık kursları ve Almanya faaliyetlerinden görüntüler.",
  alternates: { canonical: '/galeri' },
  openGraph: {
    title: "Galeri | Hacamat Seansı & Kurs Fotoğrafları | Ebusadullah Konya",
    description: "Hacamat seansları, kurs eğitimleri ve Almanya faaliyetlerinden fotoğraflar. Ebusadullah Hacamat & Akademi.",
    url: '/galeri',
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Hacamat Galeri Konya" }],
  },
};

export default function GaleriPage() {
  return (
    <main className="min-h-screen bg-anthracite-dark">
      <section className="pt-20 pb-16">
        <div className="container-site">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Görseller</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mt-4 mb-6">Galeri</h1>
          <p className="text-white/70 text-lg max-w-xl mb-10">
            Seans, eğitim ve Almanya faaliyetlerimizden kareler.
          </p>

          <GalleryGrid />

          <p className="text-white/70 text-center text-sm mt-12">Fotoğraflar yüklenme aşamasındadır.</p>
        </div>
      </section>

      {/* SEO METNİ */}
      <section className="py-16 bg-white/3 border-t border-white/5">
        <div className="container-site">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="bg-white rounded-2xl p-5 shrink-0 shadow-lg">
              <Image src="/logo.webp" alt="Konya Hacamat Ebusadullah" width={200} height={56} className="h-14 w-auto" />
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
    </main>
  );
}
