"use client";
import { useState } from "react";
import Image from "next/image";

interface Fotograf { id: number; src: string; alt: string; kategori: string; }

const kategoriler = ["Tümü", "Hacamat Seansı", "Eğitim & Kurs", "Mezunlar", "Almanya"];

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
];

export default function GalleryGrid() {
  const [aktifKategori, setAktifKategori] = useState("Tümü");

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
          <div key={foto.id} className="break-inside-avoid rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-teal/30 transition-all hover:scale-[1.02] cursor-pointer group">
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
          </div>
        ))}
      </div>
    </>
  );
}
