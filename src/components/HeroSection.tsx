"use client";
import { useEffect, useState } from "react";
import { Phone, Calendar, ChevronDown, Star, Award } from "lucide-react";

const cities = ["Adana","Adıyaman","Afyonkarahisar","Ağrı","Amasya","Ankara","Antalya","Artvin","Aydın","Balıkesir","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale","Çankırı","Çorum","Denizli","Diyarbakır","Edirne","Elazığ","Erzincan","Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Isparta","Mersin","İstanbul","İzmir","Kars","Kastamonu","Kayseri","Kırklareli","Kırşehir","Kocaeli","Konya","Kütahya","Malatya","Manisa","Kahramanmaraş","Mardin","Muğla","Muş","Nevşehir","Niğde","Ordu","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas","Tekirdağ","Tokat","Trabzon","Tunceli","Şanlıurfa","Uşak","Van","Yozgat","Zonguldak","Aksaray","Bayburt","Karaman","Kırıkkale","Batman","Şırnak","Bartın","Ardahan","Iğdır","Yalova","Karabük","Kilis","Osmaniye","Düzce"];

export default function HeroSection() {
  const [cityIdx, setCityIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCityIdx((i) => (i + 1) % cities.length), 222);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-mesh overflow-hidden">
      <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full border border-teal/5 pointer-events-none" />
      <div className="absolute top-1/4 left-[10%] w-[350px] h-[350px] rounded-full border border-teal/10 pointer-events-none translate-x-[75px] translate-y-[75px]" />

      <div className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:block pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-anthracite to-transparent z-10" />
        <img
          src="/academy-hero.webp"
          alt="Ebusadullah Akademi"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="container-site relative z-10 flex flex-col gap-10 pt-10">
        {/* Üst Rozetler */}
        <div className="flex flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 px-4 py-2 rounded-full">
            <Star size={12} className="text-teal fill-teal" />
            <span className="text-[11px] font-black text-teal uppercase tracking-[0.2em]">
              15+ Yıl Deneyim
            </span>
          </div>
          <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 px-4 py-2 rounded-full">
            <Award size={12} className="text-teal" />
            <span className="text-[11px] font-black text-teal uppercase tracking-[0.2em]">
              Uluslararası Sertifika
            </span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-[168px]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
            </span>
            <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest truncate">
              {cities[cityIdx]}
            </span>
          </div>
        </div>

        {/* Ana Başlık */}
        <div className="max-w-3xl space-y-6">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.0] tracking-tight">
            Kadim Şifanın{" "}
            <span className="relative inline-block">
              <span className="text-teal italic">Modern</span>
              <span className="absolute bottom-1 left-0 w-full h-1 bg-teal/20 -z-10 rounded-full" />
            </span>
            <br />
            Adresi
          </h1>

          <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
            Hacamat ve sülük terapisiyle <strong className="text-white">384+ rahatsızlığa</strong> şifa. 
            Profesyonel kurslarla ailenizin doktoru olun. 
            <span className="text-teal"> 1200+ mezun</span> başarıyla kendi merkezini kurdu.
          </p>
        </div>

        {/* CTA Butonları */}
        <div className="flex flex-wrap gap-4">
          <a
            href="tel:05544062383"
            className="bg-teal hover:bg-teal-dark text-anthracite-dark px-8 py-5 rounded-2xl font-black flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-teal/20 text-sm"
          >
            <Phone size={18} fill="currentColor" />
            HEMEN ARA: 0554 406 23 83
          </a>
          <a
            href="/takvim"
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-5 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95 backdrop-blur-sm text-sm"
          >
            <Calendar size={18} />
            Randevu Al
          </a>
        </div>

        {/* Güven Sinyalleri */}
        <div className="flex flex-wrap gap-6 pt-4 border-t border-white/5">
          {[
            "Steril Malzeme",
            "Uluslararası Sertifika",
            "1200+ Mezun",
            "Ücretsiz Danışmanlık",
            "15 Yıllık Deneyim",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
              <span className="text-xs font-bold text-white/40 uppercase tracking-wider">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
        <span className="text-[10px] text-white uppercase tracking-widest font-bold">Keşfet</span>
        <ChevronDown size={20} className="text-teal" />
      </div>
    </section>
  );
}
