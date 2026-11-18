import { ACCENT_CLASSES, type PromoAccent } from "@/data/promos";

/**
 * Renkli sayaç bandı — "1200+ mezun / 32+ yıl / 4 program" gibi rakamları
 * büyük ve her biri kendi renginde gösterir.
 *
 * Rakamlar ANİMASYONLU DEĞİL, bilerek: sayaç animasyonu istemci bileşeni
 * (+ IntersectionObserver) gerektirir ve bu banda her sayfada JS yükler.
 * Daha önemlisi, sunucuda basılan sabit rakam anında okunur — animasyonlu
 * sayaç ise ilk boyamada "0" gösterip metni görsel olarak kaydırır.
 * Canlılık, animasyon yerine renk ve ölçekle sağlanıyor.
 */

export interface Stat {
  /** Büyük rakam — "1200+", "32+" gibi. */
  num: string;
  label: string;
  accent: PromoAccent;
}

interface Props {
  stats: Stat[];
  className?: string;
}

export default function StatsBand({ stats, className = "" }: Props) {
  if (stats.length === 0) return null;

  return (
    <section className={`relative overflow-hidden py-14 ${className}`}>
      {/* Renkli fon parıltıları */}
      <div className="pointer-events-none absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-indigo/10 blur-[120px]" />

      <div className="container-site relative z-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {stats.map((s) => {
            const c = ACCENT_CLASSES[s.accent];
            return (
              <div
                key={s.label}
                className={`group relative overflow-hidden rounded-3xl border ${c.border} ${c.bgSoft} p-6 text-center transition-transform duration-500 hover:-translate-y-1`}
              >
                {/* Rengin kart içine yayıldığı yumuşak leke */}
                <div
                  className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full ${c.bg} opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40`}
                />
                <p
                  className={`font-display text-4xl font-bold leading-none md:text-5xl ${c.text}`}
                >
                  {s.num}
                </p>
                <p className="mt-3 text-[10px] font-black uppercase tracking-[0.15em] text-white/50">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
