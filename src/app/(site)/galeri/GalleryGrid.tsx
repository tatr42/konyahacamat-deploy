"use client";
import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { credentials } from "@/data/credentials";

interface Fotograf { id: number; src: string; alt: string; kategori: string; /** Belge gibi dikey/kırpılmaması gereken görseller */ dok?: boolean; }

const kategoriler = ["Tümü", "Hacamat Seansı", "Sülük Terapisi", "Eğitim & Kurs", "Basın & Arşiv", "Belgeler"];

const cert = credentials[0];

const fotograflar: Fotograf[] = [
  { id: 1, src: "/1.webp", alt: "Steril kupa ile profesyonel hacamat uygulaması", kategori: "Hacamat Seansı" },
  { id: 2, src: "/2.webp", alt: "Hacamat seansı öncesi steril alan hazırlığı", kategori: "Hacamat Seansı" },
  { id: 3, src: "/3.webp", alt: "Profesyonel vakum seti ve steril kupa hazırlığı", kategori: "Hacamat Seansı" },
  { id: 4, src: "/8.webp", alt: "Sırt bölgesine hacamat kupası uygulaması", kategori: "Hacamat Seansı" },
  { id: 5, src: "/11.webp", alt: "Hacamat uygulama noktalarının tespiti ve sterilizasyonu", kategori: "Hacamat Seansı" },
  { id: 6, src: "/16.webp", alt: "Geleneksel hacamat kupaları ve uygulama ekipmanları", kategori: "Hacamat Seansı" },
  { id: 7, src: "/6.webp", alt: "Tıbbi sülük ile hirudoterapi seansı hazırlığı", kategori: "Sülük Terapisi" },
  { id: 8, src: "/7.webp", alt: "Yüz bölgesine steril tıbbi sülük uygulaması", kategori: "Sülük Terapisi" },
  { id: 9, src: "/9.webp", alt: "Tek kullanımlık steril tıbbi sülük hazırlığı", kategori: "Sülük Terapisi" },
  { id: 10, src: "/hero-suluk.webp", alt: "Tıbbi sülük terapisi (hirudoterapi) yakın plan", kategori: "Sülük Terapisi" },
  { id: 11, src: "/4.webp", alt: "Ebusadullah Akademi kurs sınıfında uygulamalı eğitim", kategori: "Eğitim & Kurs" },
  { id: 12, src: "/5.webp", alt: "Eğitmen gözetiminde kupa uygulaması eğitimi", kategori: "Eğitim & Kurs" },
  { id: 13, src: "/academy-hero.webp", alt: "Ebusadullah Hacamat & Akademi eğitim salonu", kategori: "Eğitim & Kurs" },
  { id: 14, src: "/10.webp", alt: "Hacamat eğitimi sertifika ve kurs dokümantasyonu", kategori: "Eğitim & Kurs" },
  { id: 15, src: "/13.webp", alt: "Danışmanlık ve eğitim seansı", kategori: "Eğitim & Kurs" },
  { id: 16, src: "/14.webp", alt: "Ebusadullah Hoca — 1990'lar arşiv fotoğrafı", kategori: "Basın & Arşiv" },
  { id: 17, src: "/15.webp", alt: "Ebusadullah Hoca hacamat seansı — 1990'lar arşiv", kategori: "Basın & Arşiv" },
  { id: 18, src: "/basin/rasyonel-haber-2015-70-derde-deva.webp", alt: "Rasyonel Haber 2015 — 70 Derde Deva Hacamat haberi", kategori: "Basın & Arşiv", dok: true },
  { id: 19, src: "/basin/hacamat-bas-bolgesi-uygulama-2015.webp", alt: "Baş bölgesine hacamat uygulaması — Basın arşivi 2015", kategori: "Basın & Arşiv" },
  { id: 20, src: "/basin/hacamat-sirt-uygulama-2015.webp", alt: "Sırt bölgesine hacamat uygulaması — Basın arşivi 2015", kategori: "Basın & Arşiv" },
  { id: 21, src: cert.image, alt: cert.alt, kategori: "Belgeler", dok: true },
];

export default function GalleryGrid() {
  const [aktifKategori, setAktifKategori] = useState("Tümü");
  const [buyutulen, setBuyutulen] = useState<Fotograf | null>(null);

  const filtrelendi = aktifKategori === "Tümü"
    ? fotograflar
    : fotograflar.filter(f => f.kategori === aktifKategori);

  return (
    <>
      {/* Kategori Filtreleri */}
      <div className="flex flex-wrap gap-2 mb-12">
        {kategoriler.map(k => (
          <button
            key={k}
            onClick={() => setAktifKategori(k)}
            aria-pressed={aktifKategori === k}
            className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest cursor-pointer transition-all
              ${k === aktifKategori ? "bg-teal text-anthracite-dark" : "bg-white/5 text-white/70 border border-white/10 hover:border-teal/30 hover:text-teal"}`}
          >
            {k}
          </button>
        ))}
      </div>

      {/* Fotoğraf Grid */}
      <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
        {filtrelendi.map((foto, index) => (
          <div
            key={foto.id}
            onClick={() => setBuyutulen(foto)}
            className="break-inside-avoid rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-teal/30 transition-all hover:scale-[1.02] group cursor-zoom-in relative"
          >
            {foto.dok ? (
              /* Belge / Gazete kupürü: kırpma yok, tam görünür, tıklanınca büyür */
              <div className="aspect-[3/4] bg-white flex items-center justify-center relative">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  priority={index < 4}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/15 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={18} className="text-white" />
                  </div>
                </div>
                <span className="absolute top-2 left-2 text-[9px] font-black uppercase tracking-widest bg-teal text-anthracite-dark px-2 py-1 rounded-full z-10">Belge</span>
              </div>
            ) : (
              <div className="aspect-square bg-white/5 flex items-center justify-center relative">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  priority={index < 4}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-anthracite-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <span className="text-teal text-[9px] font-black uppercase tracking-wider mb-1">{foto.kategori}</span>
                  <p className="text-white text-xs font-medium line-clamp-2">{foto.alt}</p>
                </div>
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={16} className="text-white" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Görsel Büyütme Modal */}
      {buyutulen && (
        <div
          className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setBuyutulen(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={buyutulen.src}
              alt={buyutulen.alt}
              className={`max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl ${buyutulen.dok ? "bg-white" : ""}`}
            />
            <div className="mt-4 text-center max-w-xl">
              <span className="inline-block text-teal text-[10px] font-black uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full mb-2">
                {buyutulen.kategori}
              </span>
              <p className="text-white text-sm font-medium">{buyutulen.alt}</p>
            </div>
            <button
              onClick={() => setBuyutulen(null)}
              aria-label="Kapat"
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/80 flex items-center justify-center transition-colors"
            >
              <X size={18} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
