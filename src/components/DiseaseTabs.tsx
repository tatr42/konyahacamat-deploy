"use client";
import React, { useState } from "react";
import { Brain, Heart, Bone, Leaf, Users, Zap, ArrowRight } from "lucide-react";

const categories = [
  {
    id: "noroloji",
    label: "Nöroloji",
    icon: Brain,
    color: "from-purple-500/20 to-teal/10",
    diseases: [
      "Migren", "Vertigo", "Epilepsi", "Parkinson", "Alzheimer",
      "Dikkat Kaybı", "Unutkanlık", "Hafıza Bozukluğu", "Tinnitus",
      "Sinir Sıkışması", "Trigeminal Nevralji", "Karpal Tünel",
      "Kol Uyuşması", "Baş Dönmesi", "Konsantrasyon Bozukluğu",
    ],
  },
  {
    id: "kas-iskelet",
    label: "Kas & İskelet",
    icon: Bone,
    color: "from-amber-500/20 to-teal/10",
    diseases: [
      "Boyun Fıtığı", "Bel Fıtığı", "Romatizma", "Gut Hastalığı",
      "Fibromiyalji", "Adale Yırtılması", "Kramp", "Eklem Ağrısı",
      "Romatoid Artrit", "Sırt Ağrısı", "Omuz Ağrısı", "Diz Ağrısı",
    ],
  },
  {
    id: "dahiliye",
    label: "Dahiliye",
    icon: Heart,
    color: "from-red-500/20 to-teal/10",
    diseases: [
      "Tansiyon", "Karaciğer Temizliği", "Hemoroid (Basur)", "Varis",
      "Kronik Yorgunluk", "Uyku Apnesi", "Çok Uyumak", "Uyuyamamak",
      "Sinüzit", "Meniere Sendromu", "Gece Terlemesi", "Ayak Üşümesi",
    ],
  },
  {
    id: "dermatoloji",
    label: "Deri & Göz",
    icon: Leaf,
    color: "from-green-500/20 to-teal/10",
    diseases: [
      "Saç Dökülmesi", "Sedef (Psöriyazis)", "Egzama", "Kurdeşen",
      "Göz Kuruluğu", "Göz Tansiyonu", "Üveyt", "Dil Yanması",
      "Aft (Ağız Yarası)", "Ayak Terlemesi", "Ayak Kokusu", "Cilt Hastalıkları",
    ],
  },
  {
    id: "kadin-erkek",
    label: "Kadın & Erkek",
    icon: Users,
    color: "from-pink-500/20 to-teal/10",
    diseases: [
      "Kısırlık", "Sperm Azlığı", "Adet Düzensizliği", "Menopoz",
      "Jinekolojik Hastalıklar", "Genital Siğil", "Serviks Tedavisi",
      "Pelviks Fertilite", "Performans", "Rahim Ağzı Rahatsızlıkları",
    ],
  },
  {
    id: "psikoloji",
    label: "Psikoloji",
    icon: Zap,
    color: "from-blue-500/20 to-teal/10",
    diseases: [
      "Anksiyete", "Manik Atak", "Bipolar Bozukluk", "Alt Islatma",
      "Titreme", "Panik Atak", "Stres", "Depresyon",
      "Dikkat Dağınıklığı", "OKB", "Uyku Bozukluğu",
    ],
  },
];

export default function DiseaseTabs() {
  const [active, setActive] = useState("noroloji");
  const current = categories.find((c) => c.id === active)!;

  return (
    <section className="py-24 bg-anthracite-dark relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-site relative z-10">
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-3 bg-teal/10 border border-teal/20 px-5 py-2 rounded-full">
            <span className="flex h-2 w-2 rounded-full bg-teal animate-pulse" />
            <span className="text-xs font-black text-teal uppercase tracking-[0.2em]">384+ Hastalık</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-[1.1]">
            Hangi Rahatsızlığa <br />
            <span className="text-teal italic">Şifa Sunuyoruz?</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Hacamat ve sülük terapisi; nörolojik bozukluklardan cilt hastalıklarına, 
            kadın-erkek sorunlarından psikolojik rahatsızlıklara kadar geniş bir yelpazede şifa sunar. 
            Hz. Peygamber'in tavsiye ettiği bu kadim yöntem, {new Date().getFullYear() - 1994} yıllık uzmanlıkla sunulmaktadır.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border ${
                  isActive
                    ? "bg-teal text-anthracite-dark border-teal shadow-lg shadow-teal/20 scale-105"
                    : "bg-white/5 text-white/50 border-white/5 hover:border-teal/30 hover:text-white"
                }`}
              >
                <Icon size={15} />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div
          key={active}
          className={`rounded-3xl p-8 border border-white/5 bg-gradient-to-br ${current.color} transition-all duration-500`}
        >
          <div className="flex flex-wrap gap-3">
            {current.diseases.map((disease, i) => (
              <span
                key={disease}
                className="bg-white/5 border border-white/10 hover:border-teal/40 hover:bg-teal/10 hover:text-teal text-white/70 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 cursor-default"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {disease}
              </span>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-white/30 font-medium">
              * Bu belirtiler için randevu almak veya detaylı bilgi edinmek için bizimle iletişime geçin. Ücretsiz danışmanlık: 0554 406 23 83
            </p>
            <a
              href="https://wa.me/905544062383"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-teal text-anthracite-dark px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shrink-0"
            >
              Randevu Al <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="mt-10 bg-teal/5 border border-teal/10 rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-teal text-xs font-black uppercase tracking-widest mb-2">Ailenizin Doktoru Olun</p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
              Hacamat, Sülük & Akupunktur Kurslarına Katılın
            </h3>
            <p className="text-white/40 text-sm mt-2">
              Bu 384+ hastalığı tedavi etmeyi öğrenin. Uluslararası Standartlarda Sertifika. 1200+ mezun, kendi merkezini kurdu.
            </p>
          </div>
          <a
            href="/egitimler"
            className="inline-flex items-center gap-3 bg-teal text-anthracite-dark px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-teal/20 shrink-0"
          >
            Kurs Programı <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
