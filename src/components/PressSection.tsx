"use client";
import React, { useRef } from "react";
import { Newspaper, ArrowRight, Quote, TrendingUp } from "lucide-react";
import { getYearsExpStr } from "@/lib/experience";

const pressItems = [
  {
    source: "Yenigün",
    headline: "Hacamat umut oldu",
    excerpt: "Konya'da geleneksel tedavi yöntemleri arasında yer alan hacamat, son yıllarda yeniden ilgi görmeye başladı. Ebusadullah, yıllarca sürdürdüğü çalışmalarla hacamatın toplumsal kabulünü artırmaya devam ediyor.",
    tag: "Sağlık",
    year: "2023",
  },
  {
    source: "Bugün Gazetesi",
    headline: "İlacın düşmanı, hacamatın dostu",
    excerpt: "Binlerce yıllık geçmişe sahip hacamat tedavisi, modern tıbbın desteklediği alternatif bir yöntem olarak öne çıkıyor. Doktorlar artık hastalara hacamatı tavsiye ediyor.",
    tag: "Gündem",
    year: "2022",
  },
  {
    source: "Merhaba",
    headline: "Modern Tıp da hacamata yöneldi",
    excerpt: "Doktorlar ve sağlık uzmanları hacamatın faydalarını artık teslim ediyor. Konya merkezli Ebusadullah Akademi, Türkiye genelinde binlerce uygulayıcı yetiştirdi.",
    tag: "Sağlık",
    year: "2023",
  },
  {
    source: "Haber Konya",
    headline: "'Hacamata itibarı yeniden kazandırılıyor'",
    excerpt: `${new Date().getFullYear() - 1994} yılı aşkın deneyimiyle Ebusadullah, geleneksel tedavi yöntemlerini modern hijyen standartlarıyla buluşturuyor. 384 farklı hastalıkta başarılı sonuçlar alınıyor.`,
    tag: "Röportaj",
    year: "2024",
  },
  {
    source: "Sabah",
    headline: "Geleneksel şifanın modern adresi",
    excerpt: "Konya'da kurulan merkez, kısa sürede tüm Türkiye'den hasta ve kursiyer çekmeyi başardı. Kurslar mezunları kendi şehirlerinde merkezler açarak hizmet veriyor.",
    tag: "Yaşam",
    year: "2023",
  },
  {
    source: "Konya Postası",
    headline: "Kurslarla yayılıyor: 384 hastalığa şifa",
    excerpt: "Hacamat ve sülük kursları mezunları, kendi şehirlerinde merkezler açarak geleneksel tedaviyi yaygınlaştırıyor. Ailenizin doktoru olun sloganı binleri harekete geçirdi.",
    tag: "Eğitim",
    year: "2024",
  },
];

export default function PressSection() {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pressItems.map((item, i) => (
            <article
              key={i}
              className="group relative bg-anthracite-light border border-white/5 rounded-3xl p-7 hover:border-teal/20 transition-all duration-500 hover:shadow-xl hover:shadow-teal/5 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              <Quote
                size={48}
                className="absolute top-4 right-4 text-white/3 group-hover:text-teal/10 transition-colors duration-500"
                strokeWidth={1}
              />

              <div className="relative z-10 flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-teal/60 border border-teal/20 px-3 py-1 rounded-full">
                    {item.source}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/20 bg-white/5 px-2 py-1 rounded-lg">
                      {item.tag}
                    </span>
                    <span className="text-[9px] font-bold text-white/15">{item.year}</span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-white group-hover:text-teal transition-colors duration-300 leading-tight">
                  "{item.headline}"
                </h3>

                <p className="text-sm text-white/40 leading-relaxed flex-1">
                  {item.excerpt}
                </p>

                <div className="flex items-center gap-2 text-[11px] font-black text-teal/40 group-hover:text-teal transition-colors pt-2 border-t border-white/5">
                  Haberi Oku <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

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
