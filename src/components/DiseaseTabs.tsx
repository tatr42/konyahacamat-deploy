"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { Brain, Heart, Bone, Leaf, Users, Zap, ArrowRight, ChevronDown } from "lucide-react";

const categories = [
  {
    id: "noroloji",
    label: "Nöroloji",
    icon: Brain,
    color: "from-purple-500/20 to-teal/10",
    img: "/11.webp",
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
    img: "/10.webp",
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

const VISIBLE_CATS = 2;   // mobilde görünen kategori sayısı
const VISIBLE_DISEASES = 6; // başta görünen hastalık sayısı

export default function DiseaseTabs() {
  const [active, setActive] = useState("noroloji");
  const [catOpen, setCatOpen] = useState(false);
  const [diseasesExpanded, setDiseasesExpanded] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const current = categories.find((c) => c.id === active)!;

  // Dropdown dışına tıklayınca kapat
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Kategori değişince hastalık listesini sıfırla
  const selectCat = (id: string) => {
    setActive(id);
    setDiseasesExpanded(false);
    setCatOpen(false);
  };

  const visibleCats = categories.slice(0, VISIBLE_CATS);
  const hiddenCats = categories.slice(VISIBLE_CATS);
  const activeIsHidden = hiddenCats.some(c => c.id === active);

  const visibleDiseases = diseasesExpanded ? current.diseases : current.diseases.slice(0, VISIBLE_DISEASES);
  const hasMore = current.diseases.length > VISIBLE_DISEASES;

  return (
    <section className="py-12 md:py-24 bg-anthracite-dark relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-site relative z-10">

        {/* Başlık */}
        <div className="max-w-2xl mb-8 space-y-3">
          <div className="inline-flex items-center gap-3 bg-teal/10 border border-teal/20 px-5 py-2 rounded-full">
            <span className="flex h-2 w-2 rounded-full bg-teal animate-pulse" />
            <span className="text-xs font-black text-teal uppercase tracking-[0.2em]">384+ Hastalık</span>
          </div>
          <h2 className="font-display text-3xl md:text-6xl font-bold text-white leading-[1.1]">
            Hangi Rahatsızlığa <br />
            <span className="text-teal italic">Şifa Sunuyoruz?</span>
          </h2>
        </div>

        {/* Kategori Seçimi */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {/* Her zaman görünen kategoriler */}
          {visibleCats.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                onClick={() => selectCat(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  isActive
                    ? "bg-teal text-black border-teal"
                    : "bg-white/5 text-white/60 border-white/10 hover:border-teal/30 hover:text-white"
                }`}
              >
                <Icon size={13} />
                {cat.label}
              </button>
            );
          })}

          {/* "Daha Fazla" dropdown */}
          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setCatOpen(o => !o)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeIsHidden
                  ? "bg-teal text-black border-teal"
                  : "bg-white/5 text-white/60 border-white/10 hover:border-teal/30 hover:text-white"
              }`}
            >
              {activeIsHidden ? (
                <>
                  {(() => { const Icon = current.icon; return <Icon size={13} />; })()}
                  {current.label}
                </>
              ) : (
                "Daha Fazla"
              )}
              <ChevronDown size={12} className={`transition-transform ${catOpen ? "rotate-180" : ""}`} />
            </button>

            {catOpen && (
              <div className="absolute top-full left-0 mt-2 bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 min-w-[160px]">
                {hiddenCats.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = cat.id === active;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => selectCat(cat.id)}
                      className={`flex items-center gap-2.5 w-full px-4 py-3 text-xs font-bold text-left transition-colors ${
                        isActive ? "text-teal bg-teal/10" : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon size={13} />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Hastalık Listesi */}
        <div
          key={active}
          className={`relative rounded-2xl p-5 border border-white/5 bg-gradient-to-br overflow-hidden ${current.color}`}
        >
          {/* Mobilde arkaplan — %30 opaklık */}
          {current.img && (
            <div className="md:hidden absolute inset-0 w-full h-full opacity-30 pointer-events-none">
              <Image
                src={current.img}
                alt={current.label}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          )}

          {/* Üst satır: sol görsel + sağ etiketler */}
          <div className="flex gap-4 items-start">
            {/* Sol: görsel — sadece md+ ekranlarda */}
            {current.img && (
              <div className="hidden md:block shrink-0 pointer-events-none w-44 h-44">
                <Image
                  src={current.img}
                  alt={current.label}
                  width={176}
                  height={176}
                  className="object-contain w-full h-full"
                />
              </div>
            )}

            {/* Sağ: hastalık etiketleri + genişlet */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2">
                {visibleDiseases.map((disease) => (
                  <span
                    key={disease}
                    className="bg-white/5 border border-white/10 text-white/70 text-xs font-semibold px-3 py-1.5 rounded-lg"
                  >
                    {disease}
                  </span>
                ))}
              </div>
              {hasMore && (
                <button
                  onClick={() => setDiseasesExpanded(e => !e)}
                  className="mt-4 flex items-center gap-1.5 text-teal text-xs font-black uppercase tracking-widest"
                >
                  {diseasesExpanded ? "Daha Az Göster" : `+${current.diseases.length - VISIBLE_DISEASES} Daha Fazlasını Gör`}
                  <ChevronDown size={13} className={`transition-transform ${diseasesExpanded ? "rotate-180" : ""}`} />
                </button>
              )}
            </div>
          </div>

          {/* Alt: iletişim + randevu */}
          <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-[10px] text-white/30">
              * Ücretsiz danışmanlık: 0554 406 23 83
            </p>
            <a
              href="https://wa.me/905544062383"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 bg-teal text-black px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider hover:opacity-90 transition-all shrink-0"
            >
              Randevu Al <ArrowRight size={12} />
            </a>
          </div>
        </div>

        {/* Kurs CTA */}
        <div className="mt-8 bg-teal/5 border border-teal/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <p className="text-teal text-xs font-black uppercase tracking-widest mb-1">Ailenizin Doktoru Olun</p>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white">
              Hacamat, Sülük & Akupunktur Kursları
            </h3>
            <p className="text-white/40 text-xs mt-1">
              384+ hastalığı tedavi etmeyi öğrenin. 1200+ mezun, kendi merkezini kurdu.
            </p>
          </div>
          <a
            href="/egitimler"
            title="Hacamat Kurs Programı"
            className="inline-flex items-center gap-2 bg-teal text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shrink-0"
          >
            Kurs Programı <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}
