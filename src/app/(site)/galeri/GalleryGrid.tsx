"use client";
import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { credentials } from "@/data/credentials";

interface Fotograf { id: number; src: string; alt: string; kategori: string; /** Belge gibi dikey/kırpılmaması gereken görseller */ dok?: boolean; }

const kategoriler = ["Tümü", "Hacamat Seansı", "Eğitim & Kurs", "Mezunlar", "Belgeler", "Almanya"];

const cert = credentials[0];

const fotograflar: Fotograf[] = [
  { id: 1, src: "/1.webp", alt: "Hacamat seansı 1", kategori: "Hacamat Seansı" },
  { id: 2, src: "/2.webp", alt: "Hacamat seansı 2", kategori: "Hacamat Seansı" },
  { id: 3, src: "/3.webp", alt: "Hacamat seansı 3", kategori: "Hacamat Seansı" },
  { id: 4, src: "/4.webp", alt: "Hacamat seansı 4", kategori: "Eğitim & Kurs" },
  { id: 5, src: "/5.webp", alt: "Hacamat seansı 5", kategori: "Eğitim & Kurs" },
  { id: 6, src: "/6.webp", alt: "Hacamat seansı 6", kategori: "Eğitim & Kurs" },
  { id: 7, src: "/7.webp", alt: "Hacamat seansı 7", kategori: "Hacamat Seansı" },
  { id: 8, src: "/8.webp", alt: "Hacamat seansı 8", kategori: "Hacamat Seansı" },
  { id: 9, src: "/9.webp", alt: "Hacamat seansı 9", kategori: "Hacamat Seansı" },
  { id: 10, src: cert.image, alt: cert.alt, kategori: "Belgeler", dok: true },
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
        {filtrelendi.map(foto => (
          <div
            key={foto.id}
            onClick={() => foto.dok && setBuyutulen(foto)}
            className={`break-inside-avoid rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-teal/30 transition-all hover:scale-[1.02] group ${foto.dok ? "cursor-zoom-in" : "cursor-pointer"}`}
          >
            {foto.dok ? (
              /* Belge: kırpma yok, tam görünür, tıklanınca büyür */
              <div className="aspect-[3/4] bg-white flex items-center justify-center relative">
                <Image src={foto.src} alt={foto.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-contain" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/15 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={18} className="text-white" />
                  </div>
                </div>
                <span className="absolute top-2 left-2 text-[9px] font-black uppercase tracking-widest bg-teal text-anthracite-dark px-2 py-1 rounded-full">Belge</span>
              </div>
            ) : (
              <div className="aspect-square bg-white/5 flex items-center justify-center relative">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
                {/* Placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/10 group-hover:text-white/20 transition-colors">
                  <div className="text-4xl font-black font-display">{foto.id}</div>
                  <div className="text-[9px] uppercase tracking-widest mt-1">{foto.kategori}</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-anthracite-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Belge büyütme */}
      {buyutulen && (
        <div
          className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setBuyutulen(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={buyutulen.src}
            alt={buyutulen.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl bg-white"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setBuyutulen(null)}
            aria-label="Belgeyi kapat"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/80 flex items-center justify-center transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
        </div>
      )}
    </>
  );
}
