"use client";
import React from 'react';
import Image from 'next/image';
import { CheckCircle2, Calendar, Info, Globe } from 'lucide-react';

const stats = [
  { num: "1200+", label: "Mezun" },
  { num: "15+", label: "Yıl Deneyim" },
  { num: "384", label: "Tedavi Alanı" },
  { num: "6+", label: "Şehir" },
];

export default function AcademySection() {
  return (
    <section className="py-24 bg-anthracite-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-20 items-center text-left">
        
        {/* Sol Taraf */}
        <div className="relative group">
          <div className="absolute -top-6 -left-6 w-32 h-32 border-l-2 border-t-2 border-teal/20 transition-all group-hover:border-teal/50"></div>
          <div className="relative z-10 bg-white/5 rounded-[3rem] p-4 border border-white/10 aspect-[3/4] max-w-[400px] mx-auto overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden">
              <Image 
                src="/academy-hero.webp" 
                alt="Ebusadullah Akademi Hacamat Eğitimi" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-anthracite-dark/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl flex items-center gap-4 transform transition-all duration-500 group-hover:translate-y-[-5px]">
                <div className="w-12 h-12 bg-teal rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-teal/20">
                  <Globe className="text-anthracite-dark" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-tight tracking-tight">Uluslararası Standartlarda</h4>
                  <p className="text-teal text-[10px] font-black uppercase mt-1 tracking-widest">Sertifika Programı</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6 max-w-[400px] mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <p className="text-teal font-display text-2xl font-bold">{s.num}</p>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ Taraf */}
        <div className="space-y-8 flex flex-col items-start relative z-20">
          <div className="inline-flex items-center gap-3 bg-teal/10 border border-teal/20 px-5 py-2 rounded-full">
            <span className="flex h-2 w-2 rounded-full bg-teal animate-pulse"></span>
            <span className="text-xs font-black text-teal uppercase tracking-[0.2em]">Kariyer Fırsatı</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-display text-white leading-[1.1] font-bold">
            Ailenizin <span className="text-teal italic">Doktoru Olun:</span> <br /> 
            <span className="relative">
              Ebusadullah Akademi
              <span className="absolute bottom-2 left-0 w-full h-1 bg-teal/20 -z-10"></span>
            </span>
          </h2>

          <p className="text-white/60 text-lg leading-relaxed max-w-xl">
            Hacamat, sülük terapisi, akupunktur ve manuel sınıkçı kurslarımızla 384+ hastalığı tedavi etmeyi öğrenin. 
            Mezunlarımız kendi merkezlerini kurarak bağımsız çalışıyor. 1200'den fazla mezunumuzun arasına katılın.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 w-full">
            {[
              "Uygulamalı Eğitim",
              "Hijyen Sertifikası",
              "Uluslararası Standartlar",
              "Süresiz Destek",
              "Kadim Tıp Bilgisi",
              "Mezunlar Kendi Merkezini Kuruyor",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/80 text-sm font-semibold group cursor-default">
                <div className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center group-hover:bg-teal transition-colors duration-300 shrink-0">
                  <CheckCircle2 className="text-teal group-hover:text-anthracite-dark" size={14} />
                </div>
                {item}
              </li>
            ))}
          </ul>

          <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 space-y-3">
            <p className="text-teal text-[10px] font-black uppercase tracking-widest mb-4">Kurs Programları</p>
            {[
              "Hacamat & Kuru Hacamat Kursu",
              "Sülük (Hirudoterapi) Kursu",
              "Akupunktur Kursu",
              "Manuel Sınıkçı Kursu",
              "Derin Doku Manipülasyon Kursu",
            ].map((kurs) => (
              <div key={kurs} className="flex items-center gap-3 text-white/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0"></span>
                {kurs}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button className="bg-teal hover:bg-teal-dark text-anthracite-dark px-10 py-5 rounded-2xl font-black flex items-center gap-3 transition-all active:scale-95 shadow-xl shadow-teal/10">
              <Calendar size={20} /> EĞİTİM TAKVİMİ
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95 backdrop-blur-sm">
              <Info size={20} /> BİLGİ AL
            </button>
          </div>

          <p className="text-white/30 text-xs">
            Ücretsiz danışmanlık için arayın: <a href="tel:05544062383" className="text-teal hover:underline font-bold">0554 406 23 83</a>
          </p>
        </div>
      </div>
    </section>
  );
}
