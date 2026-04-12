"use client";
import { useEffect, useState } from "react";
import { Newspaper, ArrowRight, Quote, TrendingUp } from "lucide-react";
import { getYearsExpStr } from "@/lib/experience";

interface PressItem {
  id: string;
  kaynak: string;
  yil: string;
  baslik: string;
  slug: string;
  icerik: string;
  img?: string;
}

export default function PressSection() {
  const [items, setItems] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/basin")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setItems(data.slice(0, 6)); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-anthracite relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 24px,
            rgba(255,255,255,0.8) 24px, rgba(255,255,255,0.8) 25px
          )`,
        }}
      />

      <div className="container-site relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 bg-teal/10 border border-teal/20 px-5 py-2 rounded-full">
              <Newspaper size={14} className="text-teal" />
              <span className="text-xs font-black text-teal uppercase tracking-[0.2em]">Medyada Biz</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-[1.1]">
              Basında <span className="text-teal italic">Biz</span>
            </h2>
            <p className="text-white/50 max-w-md text-base">
              50'den fazla ulusal ve yerel gazetede yer alan çalışmalarımız. Hacamatın Türkiye'deki en güvenilir adresi olarak tanınıyoruz.
            </p>
          </div>
          <a
            href="/basin"
            className="inline-flex items-center gap-2 text-teal text-sm font-black uppercase tracking-widest hover:gap-4 transition-all shrink-0"
          >
            Tüm Haberler <ArrowRight size={16} />
          </a>
        </div>

        {/* Kartlar — mobilde yatay kaydırma */}
        {loading ? (
          <div className="flex gap-5 overflow-x-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="shrink-0 w-[78vw] sm:w-auto sm:flex-1 h-52 rounded-3xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-white/30 text-sm">Henüz basın haberi eklenmemiş.</p>
        ) : (
          <div className="flex gap-5 overflow-x-auto pb-3 -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 snap-x snap-mandatory scrollbar-none">
            {items.map((item) => (
              <article
                key={item.id}
                className="group relative bg-anthracite-light border border-white/5 rounded-3xl p-7 hover:border-teal/20 transition-all duration-500 hover:shadow-xl hover:shadow-teal/5 cursor-pointer overflow-hidden shrink-0 w-[78vw] sm:w-auto snap-start"
              >
                {/* Arka plan görseli — %30 */}
                {item.img && (
                  <>
                    <img
                      src={item.img}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 w-full h-full object-contain opacity-30 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-anthracite-light/80 pointer-events-none" />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <Quote
                  size={48}
                  className="absolute top-4 right-4 text-white/3 group-hover:text-teal/10 transition-colors duration-500"
                  strokeWidth={1}
                />
                <div className="relative z-10 flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-teal/60 border border-teal/20 px-3 py-1 rounded-full">
                      {item.kaynak}
                    </span>
                    <span className="text-[9px] font-bold text-white/15">{item.yil}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-teal transition-colors duration-300 leading-tight">
                    "{item.baslik}"
                  </h3>
                  {item.icerik && (
                    <p className="text-sm text-white/40 leading-relaxed flex-1 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: item.icerik.replace(/<[^>]+>/g, " ").slice(0, 160) + "…" }}
                    />
                  )}
                  <a
                    href={`/basin/${item.slug}`}
                    className="flex items-center gap-2 text-[11px] font-black text-teal/40 group-hover:text-teal transition-colors pt-2 border-t border-white/5"
                  >
                    Haberi Oku <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Medya Güven Bandı */}
        <div className="mt-10 bg-white/5 border border-white/5 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={16} className="text-teal" />
            <p className="text-teal text-[10px] font-black uppercase tracking-widest">Medya Güveni</p>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-3xl">
            Hacamat tedavisinin uzman kişiler tarafından yapılması ve hijyenik koşulların sağlanması son derece önemlidir.
            Ebusadullah Akademi olarak tüm uygulamalarımızda steril malzeme kullanıyor,
            uluslararası hijyen standartlarına uygun çalışıyoruz. Bu nedenle ulusal medyanın güvenilir kaynağı olarak yer alıyoruz.
          </p>
        </div>

        {/* Alt İstatistik Şeridi */}
        <div className="mt-16 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: "50+", label: "Gazete & Dergi" },
            { num: "1200+", label: "Sertifikalı Mezun" },
            { num: "384", label: "Tedavi Alanı" },
            { num: getYearsExpStr(), label: "Yıllık Deneyim" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center group">
              <span className="font-display text-4xl md:text-5xl font-bold text-teal group-hover:scale-110 transition-transform duration-300 inline-block">
                {stat.num}
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/30 font-bold mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
