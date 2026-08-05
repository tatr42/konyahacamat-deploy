"use client";
import { useState } from "react";
import Image from "next/image";
import { Award, X, ZoomIn, ShieldCheck, Calendar, BadgeCheck } from "lucide-react";
import { credentials, CREDENTIALS_DISCLAIMER, type Credential } from "@/data/credentials";

/** Belgenin tam hâlini gösteren büyütme katmanı. */
function Lightbox({ cred, onClose }: { cred: Credential; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
      onClick={onClose}
    >
      {/* Belge fotoğrafı; boyutları önceden bilinmediği için next/image yerine img. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cred.image}
        alt={cred.alt}
        className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl bg-white"
        onClick={e => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        aria-label="Belgeyi kapat"
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/80 flex items-center justify-center transition-colors"
      >
        <X size={18} className="text-white" />
      </button>
    </div>
  );
}

/**
 * Belge vitrini.
 * - `mode="section"`: başlık + belge kartları + kapsam notu (Hakkımızda, Eğitimler).
 * - `mode="badge"`: kompakt güven rozeti (Ana sayfa). Tıklanınca belge büyür.
 */
export default function CertificateShowcase({ mode = "section" }: { mode?: "section" | "badge" }) {
  const [active, setActive] = useState<Credential | null>(null);

  if (mode === "badge") {
    const cred = credentials[0];
    return (
      <>
        <button
          type="button"
          onClick={() => setActive(cred)}
          className="group inline-flex items-center gap-4 bg-white/5 border border-white/10 hover:border-teal/40 rounded-2xl p-3 pr-5 text-left transition-colors w-full max-w-[400px] mx-auto cursor-zoom-in"
        >
          <div className="relative w-14 h-[72px] rounded-lg overflow-hidden bg-white shrink-0 border border-white/10">
            <Image src={cred.image} alt={cred.alt} fill sizes="56px" className="object-contain" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/25 transition-opacity">
              <ZoomIn size={16} className="text-white" />
            </div>
          </div>
          <div className="min-w-0">
            <span className="flex items-center gap-1.5 text-teal text-[10px] font-black uppercase tracking-widest">
              <BadgeCheck size={13} /> Belgeli Uygulayıcı
            </span>
            <p className="text-white font-bold text-sm mt-0.5 leading-tight">
              Uluslararası Hijama (Al-Hijamah) Sertifikası
            </p>
            <p className="text-white/40 text-[11px] mt-0.5">Faculty of Homeopathy Malaysia · {cred.year}</p>
          </div>
        </button>
        {active && <Lightbox cred={active} onClose={() => setActive(null)} />}
      </>
    );
  }

  return (
    <section id="belgeler" className="py-20 bg-white/3 border-y border-white/5 scroll-mt-24">
      <div className="container-site max-w-5xl">
        <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Belgelendirme</span>
        <h2 className="font-display text-4xl font-bold text-white mt-3 mb-4">
          Eğitim &amp; <span className="text-teal italic">Belgeler</span>
        </h2>
        <p className="text-white/60 max-w-2xl mb-10 leading-relaxed">
          Kurucumuz Ebusadullah Hoca&apos;nın yurt dışında aldığı hacamat (Al-Hijamah) eğitimine ait
          belgelerden biri aşağıdadır. Belgenin tamamını görmek için üzerine tıklayabilirsiniz.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map(cred => (
            <button
              key={cred.id}
              type="button"
              onClick={() => setActive(cred)}
              className="group text-left bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-teal/40 transition-all hover:scale-[1.01]"
            >
              <div className="relative aspect-[3/4] bg-white cursor-zoom-in">
                <Image
                  src={cred.image}
                  alt={cred.alt}
                  fill
                  sizes="(min-width:1024px) 320px, (min-width:640px) 45vw, 90vw"
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <span className="flex items-center gap-1.5 text-teal text-[10px] font-black uppercase tracking-widest mb-1.5">
                  <Award size={13} /> Hacamat / Al-Hijamah
                </span>
                <p className="text-white font-bold text-sm leading-snug">{cred.title}</p>
                <p className="text-white/50 text-xs mt-1.5">{cred.issuer}</p>
                <p className="text-white/50 text-xs mt-1">Belge sahibi: {cred.holder}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-white/40 text-[11px]">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={11} /> {cred.year}
                  </span>
                  {cred.refNo && <span>Belge No: {cred.refNo}</span>}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 bg-amber-400/5 border border-amber-400/20 rounded-2xl p-5 flex gap-3">
          <ShieldCheck size={20} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-white/60 text-sm leading-relaxed">{CREDENTIALS_DISCLAIMER}</p>
        </div>
      </div>

      {active && <Lightbox cred={active} onClose={() => setActive(null)} />}
    </section>
  );
}
