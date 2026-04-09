"use client";
import React from "react";
import { Droplets, Bug, GraduationCap, ShoppingBag, ArrowRight, Shield, Globe, Clock } from "lucide-react";
import { getYearsExpStr } from "@/lib/experience";

const services = [
  {
    icon: Droplets,
    title: "Hacamat Tedavisi",
    sub: "Kuru & Yaş Hacamat",
    desc: `Hz. Peygamber'in (s.a.v) tavsiye ettiği kadim tedavi yöntemi. ${getYearsExpStr()} yıllık deneyim, steril malzemeler, uzman eller. Konya ve çevre illerde hizmet.`,
    href: "/hizmetler/hacamat",
    badge: "En Çok Tercih",
    gradient: "from-teal/20 via-teal/5 to-transparent",
    accent: "bg-teal",
  },
  {
    icon: Bug,
    title: "Sülük Terapisi",
    sub: "Hirudoterapi",
    desc: "Tıbbi sülüklerle doğal kan temizliği ve doku yenilenmesi. Canlı, sağlıklı, tıbbi standartlarda sülükler. Serviks ve jinekolojik uygulamalar dahil.",
    href: "/hizmetler/suluk",
    badge: "Doğal Tedavi",
    gradient: "from-sage/20 via-sage/5 to-transparent",
    accent: "bg-sage",
  },
  {
    icon: GraduationCap,
    title: "Hacamat & Sülük Kursu",
    sub: "Uluslararası Sertifika",
    desc: "Uygulamalı eğitim. 1200+ mezun. Hacamat, sülük, akupunktur ve manuel sınıkçı kursları. Mezunlar kendi merkezlerini kuruyor.",
    href: "/egitimler",
    badge: "Sertifikalı",
    gradient: "from-gold/20 via-gold/5 to-transparent",
    accent: "bg-gold",
  },
  {
    icon: ShoppingBag,
    title: "Malzeme Satışı",
    sub: "Kupalar & Ekipman",
    desc: "Profesyonel hacamat kupaları, vakum setleri, steril lanseler, tıbbi sülükler. Kurs mezunlarına özel indirim. Toptan ve perakende.",
    href: "/malzemeler",
    badge: "Toptan Mevcut",
    gradient: "from-white/10 via-white/3 to-transparent",
    accent: "bg-warm-gray",
  },
];

const badges = [
  { icon: Shield, text: "Steril & Hijyenik" },
  { icon: Globe, text: "Uluslararası Standartlar" },
  { icon: Clock, text: `${getYearsExpStr()} Yıl Deneyim` },
];

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-anthracite-light relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="container-site relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-3 bg-teal/10 border border-teal/20 px-5 py-2 rounded-full">
              <span className="text-xs font-black text-teal uppercase tracking-[0.2em]">Hizmetlerimiz</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-[1.1]">
              Eğitim & <span className="text-teal italic">Tedavi</span>
            </h2>
            <p className="text-white/50 text-base max-w-md">
              Hacamat kupaları, malzemeleri ve tıbbi sülük satışından sertifikalı kurs programlarına kadar eksiksiz hizmet.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {badges.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-2.5 rounded-xl">
                <Icon size={14} className="text-teal" />
                <span className="text-xs font-bold text-white/60">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <a
                key={svc.title}
                href={svc.href}
                className={`group relative rounded-3xl p-7 border border-white/5 hover:border-teal/20 bg-gradient-to-br ${svc.gradient} bg-white/[0.02] transition-all duration-500 hover:shadow-xl hover:shadow-teal/5 hover:-translate-y-1 flex flex-col gap-5 overflow-hidden`}
              >
                <span className="absolute top-5 right-5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
                  {svc.badge}
                </span>

                <div className={`w-14 h-14 rounded-2xl ${svc.accent} bg-opacity-10 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={26} className="text-teal" />
                </div>

                <div className="flex-1">
                  <p className="text-[10px] text-teal/60 font-black uppercase tracking-widest mb-1">{svc.sub}</p>
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-teal transition-colors duration-300">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">{svc.desc}</p>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-black text-teal/40 group-hover:text-teal transition-all pt-2 border-t border-white/5">
                  Daha Fazla <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Neden Biz? */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Kalite & Güvenilirlik", desc: "Tüm ürün ve uygulamalarımızda hijyen standartlarına sıkı sıkıya bağlıyız. Steril tek kullanımlık malzeme garantisi." },
            { title: "Eğitim & Bilgi", desc: `${getYearsExpStr()} yıllık deneyimle binlerce kursiyere hacamat, sülük ve geleneksel tıp eğitimi verdik. Mezunlar aktif olarak kendi merkezlerini işletiyor.` },
            { title: "Müşteri Odaklılık", desc: "Her hastamıza özel yaklaşım. Randevu öncesi ücretsiz danışmanlık. Kurs sonrası süresiz teknik destek." },
          ].map((item) => (
            <div key={item.title} className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-teal/20 transition-all">
              <h4 className="text-white font-bold text-lg mb-3 font-display">{item.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
