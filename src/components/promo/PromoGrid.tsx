import PromoCard from "@/components/promo/PromoCard";
import { type Promo } from "@/data/promos";

/**
 * Renkli promo ızgarası — ana sayfanın "duyuru panosu" bölümü.
 *
 * Her kart kendi vurgu rengini taşıdığı için ızgara yan yana dizildiğinde
 * eski portal sitelerdeki canlı, çok renkli kutu düzeni oluşur; tipografi
 * ve kart iskeleti tek tip kaldığı için de dağınık görünmez.
 *
 * Mobilde ızgara yerine yatay kaydırmalı şerit: 8 kartlık dikey bir yığın
 * telefonda sayfayı gereksiz uzatıyordu.
 */
interface Props {
  promos: Promo[];
  eyebrow?: string;
  title: React.ReactNode;
  desc?: string;
  /** Bölüm başlığını gizleyip yalnızca kartları basar (dar kuşak kullanımı). */
  compact?: boolean;
  className?: string;
}

/**
 * Sütun sayısı kart adedine uyar: 3 kartı 4 sütuna dizmek sağda boş bir
 * hücre bırakıyor ve kuşak yarım kalmış görünüyordu.
 * Sınıflar TAM METİN — Tailwind birleştirilmiş adı göremez.
 */
function gridColsClass(count: number): string {
  if (count <= 2) return "sm:grid-cols-2";
  if (count === 3) return "sm:grid-cols-2 lg:grid-cols-3";
  return "sm:grid-cols-2 lg:grid-cols-4";
}

export default function PromoGrid({
  promos,
  eyebrow = "Duyurular",
  title,
  desc,
  compact = false,
  className = "",
}: Props) {
  if (promos.length === 0) return null;

  return (
    <section className={`relative overflow-hidden ${compact ? "py-16" : "py-24"} ${className}`}>
      {/* Çok renkli arka plan parıltıları — bölümün "canlı" hissini kartlardan
          bağımsız olarak taşıyan katman. blur değeri yüksek tutuldu ki
          renkler karışsın, tek tek leke olarak okunmasın. */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-indigo/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-coral/10 blur-[140px]" />

      <div className="container-site relative z-10">
        {compact ? (
          <div className="mb-8 flex items-center gap-3">
            <span className="teal-divider" />
            <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-white/50">
              {title}
            </h2>
          </div>
        ) : (
          <div className="mb-14 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2">
              <span className="flex h-2 w-2 animate-pulse rounded-full bg-gold" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gold">
                {eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold leading-[1.1] text-white md:text-6xl">
              {title}
            </h2>
            {desc && <p className="max-w-xl text-base text-white/60">{desc}</p>}
          </div>
        )}

        <div
          className={`-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-3 scrollbar-none sm:mx-0 sm:grid sm:px-0 ${gridColsClass(promos.length)}`}
        >
          {promos.map((p) => (
            <PromoCard
              key={p.id}
              promo={p}
              className="w-[78vw] shrink-0 snap-start sm:w-auto"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
