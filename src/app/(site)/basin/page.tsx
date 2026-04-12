"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getYearsExpStr } from '@/lib/experience';
import { X, ChevronLeft, ChevronRight, Phone, MessageCircle, Calendar, ZoomIn, ExternalLink, Loader2 } from 'lucide-react';

interface Gazete { id: string; kaynak: string; yil: string; baslik: string; img: string; slug?: string; }

export default function BasinPage() {
  const [gazeteler, setGazeteler] = useState<Gazete[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [aktifYil, setAktifYil] = useState('Tümü');
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/basin')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setGazeteler(data); })
      .finally(() => setYukleniyor(false));
  }, []);

  const yillar = ['Tümü', ...Array.from(new Set(gazeteler.map(g => g.yil))).sort((a, b) => Number(b) - Number(a))];
  const filtrelendi = aktifYil === 'Tümü' ? gazeteler : gazeteler.filter(g => g.yil === aktifYil);
  const aktifGazete = gazeteler.find(g => g.id === lightbox);

  const onceki = () => {
    if (!lightbox) return;
    const idx = filtrelendi.findIndex(g => g.id === lightbox);
    setLightbox(filtrelendi[(idx - 1 + filtrelendi.length) % filtrelendi.length].id);
  };
  const sonraki = () => {
    if (!lightbox) return;
    const idx = filtrelendi.findIndex(g => g.id === lightbox);
    setLightbox(filtrelendi[(idx + 1) % filtrelendi.length].id);
  };

  return (
    <main className="min-h-screen bg-anthracite-dark pt-20 pb-24">

      {/* LIGHTBOX */}
      {lightbox && aktifGazete && (
        <div className="fixed inset-0 z-[500] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <button onClick={e => { e.stopPropagation(); onceki(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-teal/80 flex items-center justify-center transition-colors z-10">
            <ChevronLeft size={24} className="text-white" />
          </button>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={aktifGazete.img} alt={aktifGazete.baslik}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
            <div className="mt-4 flex items-center justify-between px-1">
              <div>
                <span className="text-teal text-[11px] font-black uppercase tracking-widest">{aktifGazete.kaynak}</span>
                <span className="text-white/30 text-[11px] ml-3">{aktifGazete.yil}</span>
                <p className="text-white font-bold text-base mt-1">{aktifGazete.baslik}</p>
              </div>
              <span className="text-white/20 text-sm">{filtrelendi.findIndex(g => g.id === lightbox) + 1} / {filtrelendi.length}</span>
            </div>
          </div>
          <button onClick={e => { e.stopPropagation(); sonraki(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-teal/80 flex items-center justify-center transition-colors z-10">
            <ChevronRight size={24} className="text-white" />
          </button>
          <button onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/80 flex items-center justify-center transition-colors">
            <X size={18} className="text-white" />
          </button>
        </div>
      )}

      <div className="container-site">

        {/* BAŞLIK */}
        <div className="mb-12">
          <span className="text-[11px] font-black text-teal uppercase tracking-[0.3em]">Medyada Biz</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mt-3 mb-4">
            Basın <span className="text-teal italic">Odası</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl">{getYearsExpStr()} yılı aşkın sürede Türkiye'nin önde gelen gazetelerinde yer aldık.</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-14 max-w-xl">
          {[
            { sayi: gazeteler.length || '25+', label: 'Gazete & Dergi' },
            { sayi: getYearsExpStr(), label: 'Yıl Medyada' },
            { sayi: '50+', label: 'Haber & Röportaj' },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <div className="font-display text-3xl font-bold text-teal">{s.sayi}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1 font-bold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* YIL FİLTRE */}
        {!yukleniyor && gazeteler.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {yillar.map(yil => (
              <button key={yil} onClick={() => setAktifYil(yil)}
                className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                  aktifYil === yil ? 'bg-teal text-anthracite-dark' : 'bg-white/5 text-white/50 border border-white/10 hover:border-teal/30 hover:text-teal'
                }`}>
                {yil}
              </button>
            ))}
          </div>
        )}

        {/* GAZETELEr GRİDİ */}
        {yukleniyor ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={32} className="text-teal animate-spin" />
          </div>
        ) : gazeteler.length === 0 ? (
          <div className="text-center py-24 text-white/30">
            <p className="text-lg">Henüz basın haberi eklenmemiş.</p>
            <p className="text-sm mt-2">Admin panelinden ekleyebilirsiniz.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtrelendi.map((gazete) => {
              const inner = (
                <div className="relative z-10 flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-teal/80 border border-teal/20 px-3 py-1 rounded-full bg-black/30">
                      {gazete.kaynak}
                    </span>
                    <span className="text-[9px] font-bold text-white/40 bg-black/30 px-2 py-1 rounded-lg">{gazete.yil}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white leading-tight">
                    "{gazete.baslik}"
                  </h3>
                  <div className="mt-auto flex items-center gap-2 text-[11px] font-black text-teal/60 group-hover:text-teal transition-colors pt-2 border-t border-white/10">
                    {gazete.slug ? <><ExternalLink size={12} /> Haberi Oku</> : <><ZoomIn size={12} /> Görseli Büyüt</>}
                  </div>
                </div>
              );

              const cardClass = "group relative bg-anthracite-light border border-white/5 rounded-3xl p-6 hover:border-teal/30 transition-all duration-300 overflow-hidden cursor-pointer aspect-square flex flex-col";

              return gazete.slug ? (
                <Link key={gazete.id} href={`/basin/${gazete.slug}`} className={cardClass}>
                  {gazete.img && (
                    <>
                      <img src={gazete.img} alt="" aria-hidden className="absolute inset-0 w-full h-full object-contain opacity-30 pointer-events-none" />
                      <div className="absolute inset-0 bg-anthracite-light/75 pointer-events-none" />
                    </>
                  )}
                  {inner}
                </Link>
              ) : (
                <button key={gazete.id} onClick={() => setLightbox(gazete.id)} className={cardClass + " text-left w-full"}>
                  {gazete.img && (
                    <>
                      <img src={gazete.img} alt="" aria-hidden className="absolute inset-0 w-full h-full object-contain opacity-30 pointer-events-none" />
                      <div className="absolute inset-0 bg-anthracite-light/75 pointer-events-none" />
                    </>
                  )}
                  {inner}
                </button>
              );
            })}
          </div>
        )}

        {/* ALT CTA */}
        <div className="mt-20 bg-gradient-to-br from-teal/10 to-white/5 border border-teal/20 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em] block mb-3">Siz de Şifaya Kavuşun</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-snug">
              Hacamat Tedavisi<br /><span className="text-teal italic">İçin Randevu Alın</span>
            </h2>
            <p className="text-white/50 text-sm mt-4 max-w-sm leading-relaxed">{getYearsExpStr()} yıllık deneyim ve steril malzemeyle güvenli hacamat tedavisi için bize ulaşın.</p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
            <a href="https://wa.me/905544062383?text=Merhaba%2C%20hacamat%20tedavisi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105">
              <MessageCircle size={18} fill="currentColor" /> WhatsApp'tan Yaz
            </a>
            <a href="tel:05544062383"
              className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 text-white border border-white/10 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all">
              🇹🇷 <Phone size={18} /> 0554 406 23 83
            </a>
            <a href="tel:+491634492870"
              className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 text-white border border-white/10 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all">
              🇩🇪 <Phone size={18} /> +49 163 449 28 70
            </a>
            <a href="/takvim"
              className="flex items-center justify-center gap-3 bg-teal/10 hover:bg-teal/20 text-teal border border-teal/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all">
              <Calendar size={18} /> Randevu Al
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
