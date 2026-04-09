import type { Metadata } from "next";
import Link from "next/link";
import { Droplets, ShieldCheck, Clock, CheckCircle, ChevronRight, MessageCircle, Phone } from "lucide-react";
import { getYearsExpStr } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Hacamat & Sülük Terapisi Konya | Geleneksel Tıp Hizmetleri | Ebusadullah",
  description: "Konya Ebusadullah Akademi'de kuru hacamat, yaş hacamat ve sülük terapisi hizmetleri. CE sertifikalı steril uygulama, 32+ yıl deneyim, Almanya periyodik seansları.",
  keywords: ["konya hacamat hizmetleri", "konya geleneksel tıp", "kuru hacamat konya", "yaş hacamat", "sülük terapisi", "hacamat ve sülük", "ebusadullah konya"],
  alternates: { canonical: "https://konyahacamat.net/hizmetler" },
  openGraph: {
    title: "Hacamat & Sülük Terapisi Konya | Ebusadullah Akademi",
    description: "Kuru hacamat, yaş hacamat ve sülük terapisi. Steril uygulama, 32+ yıl deneyim. Konya ve Almanya'da hizmet.",
    url: "https://konyahacamat.net/hizmetler",
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Konya Hacamat Hizmetleri" }],
  },
};

const hizmetler = [
  {
    baslik: "Kuru Hacamat",
    aciklama:
      "Deri yüzeyine negatif basınç uygulayarak derin doku dolaşımını ve lenf akışını destekler. Kesi yapılmaz. Kas ağrıları, yorgunluk ve dolaşım sorunlarında tercih edilir. Çocuklar ve hassas ciltler için de uygundur.",
    faydalar: ["Kas gevşemesi ve ağrı giderimi", "Lenf sistemi aktivasyonu", "Dolaşım bozukluklarında destek", "Stres ve yorgunluk azaltımı"],
    sure: "30–45 dk",
    href: "/hizmetler/hacamat",
  },
  {
    baslik: "Yaş Hacamat",
    aciklama:
      "Sünnet noktalarına küçük yüzeysel kesiler açılarak metabolik atıkların vücuttan uzaklaştırıldığı klasik yöntemdir. Hz. Peygamber (SAV)'in tavsiye ettiği ve geleneksel İslam tıbbının temel uygulamasıdır.",
    faydalar: ["Kan detoksifikasyonu", "Bağışıklık sistemi güçlendirme", "Kronik ağrı yönetimi", "Enerji ve canlılık artışı"],
    sure: "45–60 dk",
    href: "/hizmetler/hacamat",
  },
  {
    baslik: "Sülük Terapisi",
    aciklama:
      "Tıbbi sülükler (Hirudo medicinalis) doğal antikoagülan, anestezik ve anti-inflamatuar salgıları sayesinde yerel kan dolaşımını iyileştirir. Varis, eklem iltihabı ve mikrosirkülasyon bozukluklarında etkilidir.",
    faydalar: ["Doğal antikoagülan etki", "Varis ve ödem tedavisinde destek", "Eklem iltihabında yardımcı tedavi", "Mikrosirkülasyon iyileştirmesi"],
    sure: "30–60 dk",
    href: "/hizmetler/suluk",
  },
];

const hijyen = [
  "Her seans için tek kullanımlık steril vantuz seti",
  "CE sertifikalı tek kullanımlık bistüri",
  "Tıbbi sülükler için özel izole taşıma",
  "Uygulama öncesi deri antisepsisi protokolü",
  "Sertifikalı uzman tarafından bireysel değerlendirme",
  "Tıbbi atık protokollerine uygun imha",
];

export default function HizmetlerPage() {
  return (
    <main className="min-h-screen bg-anthracite-dark">

      {/* HERO */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-[400px] h-[400px] rounded-full bg-teal/5 blur-[100px]" />
        <div className="container-site relative z-10">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Tedavi Hizmetleri</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
            Kadim Şifa,<br /><span className="text-teal italic">Modern Standart</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
            Her tedavi, steril ekipman ve bireysel protokol ile kişisel ihtiyacınıza göre planlanır.
            Konya kliniğimizde ve Almanya periyodik seanslarımızda hizmet veriyoruz.
          </p>
        </div>
      </section>

      {/* HİZMETLER */}
      <section className="py-20">
        <div className="container-site flex flex-col gap-10">
          {hizmetler.map((h, i) => (
            <div key={h.baslik}
              className={`grid grid-cols-1 lg:grid-cols-5 gap-8 items-center bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-teal/20 transition-colors ${i % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
              <div className={`lg:col-span-3 flex flex-col gap-5 ${i % 2 === 1 ? "lg:col-start-1" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center">
                    <Droplets size={16} className="text-teal" />
                  </div>
                  <span className="flex items-center gap-1.5 text-teal text-[11px] font-black bg-teal/10 px-3 py-1 rounded-full">
                    <Clock size={11} /> {h.sure}
                  </span>
                </div>
                <h2 className="font-display text-3xl font-bold text-white">{h.baslik}</h2>
                <p className="text-white/60 text-sm leading-relaxed">{h.aciklama}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {h.faydalar.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-white/70">
                      <CheckCircle size={12} className="text-teal shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href={h.href}
                  className="self-start flex items-center gap-2 bg-teal text-anthracite-dark px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
                  Detaylı Bilgi <ChevronRight size={14} />
                </Link>
              </div>
              <div className={`lg:col-span-2 ${i % 2 === 1 ? "lg:col-start-4" : ""} bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 min-h-[180px]`}>
                <div className="text-6xl">{i === 0 ? "🫧" : i === 1 ? "🩸" : "🐛"}</div>
                <div className="text-white font-bold text-center">{h.baslik}</div>
                <div className="text-white/40 text-xs text-center">Süre: {h.sure}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HİJYEN */}
      <section className="py-20 bg-white/3 border-y border-white/5">
        <div className="container-site">
          <div className="mb-10">
            <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Hijyen Protokolü</span>
            <h2 className="font-display text-3xl font-bold text-white mt-3">Güvenliğiniz Önceliğimizdir</h2>
            <p className="text-white/50 mt-2 text-sm max-w-xl">Sıfır enfeksiyon riski için her seansta uluslararası sterilizasyon standartlarını uyguluyoruz.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hijyen.map(h => (
              <div key={h} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-teal/20 transition-colors">
                <ShieldCheck size={16} className="text-teal shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm leading-relaxed">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEDEN BİZ */}
      <section className="py-20">
        <div className="container-site">
          <div className="mb-10">
            <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Fark Yaratan Unsurlar</span>
            <h2 className="font-display text-3xl font-bold text-white mt-3">Neden Ebusadullah Akademi?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { rakam: getYearsExpStr(), etiket: "Yıl Deneyim", aciklama: "1994'ten bu yana kesintisiz hizmet" },
              { rakam: "1200+", etiket: "Eğitim Mezunu", aciklama: "Türkiye ve Avrupa'da yetişmiş uzmanlar" },
              { rakam: "384+", etiket: "Rahatsızlık", aciklama: "Geleneksel kaynaklarda belirtilen fayda alanı" },
              { rakam: "10+", etiket: "Ülke", aciklama: "Mezunlarımızın aktif hizmet verdiği ülkeler" },
            ].map(s => (
              <div key={s.etiket} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-teal/20 transition-colors">
                <div className="font-display text-4xl font-bold text-teal mb-1">{s.rakam}</div>
                <div className="text-white font-bold text-sm mb-1">{s.etiket}</div>
                <div className="text-white/40 text-xs">{s.aciklama}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RANDEVU */}
      <section id="randevu" className="py-20 bg-teal/5 border-t border-teal/10">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-white mb-2">Tedavinizi Planlayın</h2>
            <p className="text-white/50 max-w-md">WhatsApp üzerinden bize ulaşarak uygun tarih ve seans hakkında bilgi alabilirsiniz.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a href="https://wa.me/905544062383?text=Merhaba%2C%20tedavi%20randevusu%20almak%20istiyorum."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
              <MessageCircle size={18} fill="currentColor" /> 🇹🇷 WhatsApp TR
            </a>
            <a href="https://wa.me/491634492870?text=Merhaba%2C%20tedavi%20randevusu%20almak%20istiyorum."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all">
              <MessageCircle size={18} /> 🇩🇪 WhatsApp Almanya
            </a>
            <Link href="/takvim"
              className="flex items-center gap-2 bg-teal/10 text-teal border border-teal/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-teal/20 transition-all">
              Takvimden Randevu <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
