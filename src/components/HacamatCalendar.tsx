"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

// Hicri'de faziletli hacamat günleri: 13, 14, 15, 17, 19, 21
const FAZL_GUNLER = [13, 14, 15, 17, 19, 21];

function getHicriGun(date: Date): number {
  const EPOCH = new Date(622, 6, 16).getTime();
  const fark = date.getTime() - EPOCH;
  const hicriGun = Math.floor(fark / 86400000);
  const hicriAy = Math.floor(hicriGun / 29.53059);
  const ayBasi = Math.floor(hicriAy * 29.53059);
  return (hicriGun - ayBasi) + 1;
}

const AYLAR = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
const AYLAR_KISA = ["OCA","ŞUB","MAR","NİS","MAY","HAZ","TEM","AĞU","EYL","EKİ","KAS","ARA"];
const GUNLER = ["PZT","SAL","ÇAR","PER","CUM","CMT","PZR"];

// Ay renklerini farklılaştır (görsel takvim gibi)
const AY_RENK = [
  "from-rose-500 to-rose-600",       // Ocak
  "from-orange-500 to-orange-600",   // Şubat
  "from-emerald-500 to-emerald-600", // Mart
  "from-sky-400 to-sky-500",         // Nisan
  "from-violet-500 to-violet-600",   // Mayıs
  "from-purple-600 to-purple-700",   // Haziran
  "from-teal-500 to-teal-600",       // Temmuz
  "from-violet-600 to-purple-600",   // Ağustos
  "from-blue-500 to-blue-600",       // Eylül
  "from-orange-500 to-red-500",      // Ekim
  "from-emerald-600 to-teal-600",    // Kasım
  "from-green-600 to-emerald-700",   // Aralık
];

function MonthGrid({ yil, ay, secili, onSelect }: {
  yil: number; ay: number; secili: Date | null; onSelect: (d: Date) => void;
}) {
  const bugun = new Date();
  const ilkGun = new Date(yil, ay, 1);
  const sonGun = new Date(yil, ay + 1, 0);
  const offset = (ilkGun.getDay() + 6) % 7; // Pazartesi=0

  const cells: (Date | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: sonGun.getDate() }, (_, i) => new Date(yil, ay, i + 1)),
  ];

  // 6 satıra tamamla
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      {/* Ay başlığı */}
      <div className={`bg-gradient-to-r ${AY_RENK[ay]} px-3 py-2 text-center`}>
        <span className="text-white font-black text-sm uppercase tracking-widest">{AYLAR[ay]}</span>
      </div>
      {/* Gün isimleri */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
        {GUNLER.map(g => (
          <div key={g} className={`text-center text-[9px] font-black py-1 ${g === "CMT" || g === "PZR" ? "text-red-400" : "text-gray-400"}`}>
            {g}
          </div>
        ))}
      </div>
      {/* Günler */}
      <div className="grid grid-cols-7">
        {cells.map((gun, i) => {
          if (!gun) return <div key={i} className="aspect-square" />;
          const hicri = getHicriGun(gun);
          const fazl = FAZL_GUNLER.includes(hicri);
          const bugunMu = gun.toDateString() === bugun.toDateString();
          const seciliMi = secili?.toDateString() === gun.toDateString();
          const gecmis = gun < new Date(bugun.getFullYear(), bugun.getMonth(), bugun.getDate());
          const cumaMi = gun.getDay() === 5;
          const haftaSonu = gun.getDay() === 0 || gun.getDay() === 6;

          return (
            <button
              key={i}
              onClick={() => !gecmis && onSelect(gun)}
              disabled={gecmis}
              className={`aspect-square flex flex-col items-center justify-center text-[11px] font-bold transition-all relative
                ${seciliMi ? "bg-teal text-white scale-95 rounded" :
                  bugunMu ? "bg-yellow-400 text-white rounded font-black" :
                  fazl && !gecmis ? "bg-green-100 text-green-700 rounded" :
                  cumaMi && !gecmis ? "bg-blue-50 text-blue-600" :
                  haftaSonu ? "text-red-400" :
                  gecmis ? "text-gray-200 cursor-not-allowed" :
                  "text-gray-700 hover:bg-gray-50"}
              `}
            >
              <span>{gun.getDate()}</span>
              {fazl && !gecmis && !seciliMi && (
                <span className="w-1 h-1 rounded-full bg-green-500 absolute bottom-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function HacamatCalendar() {
  const bugun = new Date();
  const [yil, setYil] = useState(bugun.getFullYear());
  const [secili, setSecili] = useState<Date | null>(null);

  const whatsapp = (hat: "TR" | "DE") => {
    if (!secili) return "#";
    const tarih = secili.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    const msg = encodeURIComponent(`Merhaba, ${tarih} tarihinde hacamat randevusu almak istiyorum.`);
    return hat === "TR" ? `https://wa.me/905544062383?text=${msg}` : `https://wa.me/491634492870?text=${msg}`;
  };

  return (
    <div className="space-y-6">
      {/* Yıl navigasyonu */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
        <button onClick={() => setYil(y => y - 1)}
          className="text-white/50 hover:text-teal font-black text-lg px-3 py-1 rounded-lg hover:bg-white/5 transition-colors">
          ‹ {yil - 1}
        </button>
        <div className="text-center">
          <div className="text-white font-black text-2xl">{yil}</div>
          <div className="text-white/40 text-[10px] uppercase tracking-widest">Hacamat Takvimi</div>
        </div>
        <button onClick={() => setYil(y => y + 1)}
          className="text-white/50 hover:text-teal font-black text-lg px-3 py-1 rounded-lg hover:bg-white/5 transition-colors">
          {yil + 1} ›
        </button>
      </div>

      {/* 12 aylık grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 12 }, (_, i) => (
          <MonthGrid key={i} yil={yil} ay={i} secili={secili} onSelect={setSecili} />
        ))}
      </div>

      {/* Lejant */}
      <div className="flex flex-wrap gap-4 text-xs bg-white/5 border border-white/10 rounded-xl px-5 py-3">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-green-100 border border-green-300" />
          <span className="text-white/50">Faziletli Hacamat Günü (13, 14, 15, 17, 19, 21)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-yellow-400" />
          <span className="text-white/50">Bugün</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-teal" />
          <span className="text-white/50">Seçili Gün</span>
        </div>
      </div>

      {/* Seçili gün CTA */}
      {secili && (
        <div className="bg-teal/10 border border-teal/30 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-white font-bold text-base">
                {secili.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", weekday: "long" })}
              </div>
              {FAZL_GUNLER.includes(getHicriGun(secili)) && (
                <span className="text-teal text-[10px] font-black bg-teal/10 px-2 py-0.5 rounded-full">✦ Faziletli Hacamat Günü</span>
              )}
            </div>
            <button onClick={() => setSecili(null)} className="text-white/30 hover:text-white text-xl">✕</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href={whatsapp("TR")} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105">
              <MessageCircle size={14} fill="currentColor" /> 🇹🇷 TR Randevu
            </a>
            <a href={whatsapp("DE")} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/10 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105">
              <MessageCircle size={14} /> 🇩🇪 Almanya Randevu
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
