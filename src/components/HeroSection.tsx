"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, Calendar, ChevronDown, Star, Award } from "lucide-react";
import { getYearsExpStr } from "@/lib/experience";

const cities = ["Adana","Adıyaman","Afyonkarahisar","Ağrı","Amasya","Ankara","Antalya","Artvin","Aydın","Balıkesir","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale","Çankırı","Çorum","Denizli","Diyarbakır","Edirne","Elazığ","Erzincan","Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Isparta","Mersin","İstanbul","İzmir","Kars","Kastamonu","Kayseri","Kırklareli","Kırşehir","Kocaeli","Konya","Kütahya","Malatya","Manisa","Kahramanmaraş","Mardin","Muğla","Muş","Nevşehir","Niğde","Ordu","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas","Tekirdağ","Tokat","Trabzon","Tunceli","Şanlıurfa","Uşak","Van","Yozgat","Zonguldak","Aksaray","Bayburt","Karaman","Kırıkkale","Batman","Şırnak","Bartın","Ardahan","Iğdır","Yalova","Karabük","Kilis","Osmaniye","Düzce"];

export default function HeroSection() {
  const [cityIdx, setCityIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCityIdx((i) => (i + 1) % cities.length), 222);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative hero-mesh overflow-hidden">

      {/* Dekoratif halkalar */}
      <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full border border-teal/5 pointer-events-none" />
      <div className="absolute top-1/4 left-[10%] w-[350px] h-[350px] rounded-full border border-teal/10 pointer-events-none translate-x-[75px] translate-y-[75px]" />

      {/* İçerik + Görsel Grid */}
      <div className="container-site relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[560px] lg:min-h-[680px] pt-28 pb-20 lg:py-0">

        {/* Sol: Metin */}
        <div className="flex flex-col gap-8 lg:py-36">

          {/* Rozetler */}
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 px-4 py-2 rounded-full shrink-0 whitespace-nowrap">
              <Star size={12} className="text-teal fill-teal shrink-0" />
              <span className="text-[11px] font-black text-teal uppercase tracking-[0.2em]">
                {getYearsExpStr()} Yıl Deneyim
              </span>
            </div>
            <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 px-4 py-2 rounded-full shrink-0 whitespace-nowrap">
              <Award size={12} className="text-teal shrink-0" />
              <span className="text-[11px] font-black text-teal uppercase tracking-[0.2em]">
                Uluslararası Sertifika
              </span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-full shrink-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
              </span>
              {/* Görünmez en uzun şehir — genişliği sabitler */}
              <span className="text-[11px] font-bold uppercase tracking-widest invisible select-none pointer-events-none absolute">
                Afyonkarahisar
              </span>
              <span className="text-[11px] font-bold text-white/70 uppercase tracking-widest w-[110px]">
                {cities[cityIdx]}
              </span>
            </div>
          </div>

          {/* Başlık */}
          <div className="space-y-5">
            <h1 className="font-display text-4xl sm:text-5xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight">
              Kadim Şifanın{" "}
              <span className="relative inline-block">
                <span className="text-teal italic">Modern</span>
                <span className="absolute bottom-1 left-0 w-full h-1 bg-teal/20 -z-10 rounded-full" />
              </span>
              <br />
              Adresi
            </h1>

            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-md font-medium">
              Hacamat ve sülük terapisiyle <strong className="text-white">384+ rahatsızlığa</strong> şifa.
              Profesyonel kurslarla ailenizin doktoru olun.{" "}
              <span className="text-teal">1200+ mezun</span> başarıyla kendi merkezini kurdu.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:05544062383"
              title="Konya Hacamat Hemen Ara: 0554 406 23 83"
              className="bg-teal hover:bg-teal-dark text-anthracite-dark px-6 py-4 rounded-2xl font-black flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-teal/20 text-sm"
            >
              <Phone size={16} fill="currentColor" />
              HEMEN ARA: 0554 406 23 83
            </a>
            <a
              href="/takvim"
              title="Hacamat Randevusu Al"
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95 backdrop-blur-sm text-sm"
            >
              <Calendar size={16} />
              Randevu Al
            </a>
          </div>

          {/* Güven sinyalleri */}
          <div className="flex flex-wrap gap-5 pt-4 border-t border-white/5">
            {[
              "Steril Malzeme",
              "Uluslararası Sertifika",
              "1200+ Mezun",
              "Ücretsiz Danışmanlık",
              `${new Date().getFullYear() - 1994} Yıllık Deneyim`,
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ: Fotoğraf */}
        <div className="hidden lg:block relative h-full min-h-[680px] overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-anthracite to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-anthracite via-anthracite/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-anthracite to-transparent z-10 pointer-events-none" />
          <Image src="/16.webp" alt="Hacamat kupası" fill priority fetchPriority="high"
            className="object-cover object-center"
            sizes="50vw" />
        </div>

      </div>

      {/* Alt geçiş */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-anthracite-light pointer-events-none z-10" />

      {/* Keşfet */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-30 z-20">
        <span className="text-[10px] text-white uppercase tracking-widest font-bold">Keşfet</span>
        <ChevronDown size={18} className="text-teal" />
      </div>
    </section>
  );
}
