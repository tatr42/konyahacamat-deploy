import PromoCard from "@/components/promo/PromoCard";
import { type Promo } from "@/data/promos";

/**
 * Sayfa kenarındaki dikey promo rayı — eski portal sitelerdeki
 * "sağ sütun reklam alanı"nın modern karşılığı.
 *
 * DAVRANIŞ
 *   Masaüstü (lg+): sağ sütunda `sticky`. Yazı uzun olduğu için okuma
 *     boyunca ekranda kalır; kısa yazıda içerikle birlikte akar.
 *   Mobil/tablet: dikey rayın yeri yok. Aynı kartlar yatay kaydırmalı
 *     bir şeride dönüşür — kart genişliği 78vw, yani bir sonraki kartın
 *     kenarı görünür ve kaydırılabilirliği kendini belli eder.
 *
 * `aside` + başlık kullanılır: ekran okuyucuda ana içerikten ayrışsın ve
 * atlanabilsin diye. Kartlar reklam değil kendi hizmetlerimiz olduğu için
 * `rel="nofollow"` YOK — iç link değeri bilinçli olarak korunur.
 */
interface Props {
  promos: Promo[];
  /** Ray başlığı. */
  title?: string;
  className?: string;
}

export default function PromoRail({
  promos,
  title = "Öne Çıkanlar",
  className = "",
}: Props) {
  if (promos.length === 0) return null;

  return (
    <aside aria-label={title} className={className}>
      <div className="mb-4 flex items-center gap-3">
        <span className="teal-divider" />
        <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-white/50">
          {title}
        </h2>
      </div>

      {/* Masaüstü: dikey yığın */}
      <div className="hidden flex-col gap-5 lg:flex">
        {promos.map((p) => (
          <PromoCard key={p.id} promo={p} sizes="320px" />
        ))}
      </div>

      {/* Mobil/tablet: yatay kaydırmalı şerit.
          Negatif margin + padding, kartların konteyner kenarına
          yapışmadan ekran kenarına kadar kaymasını sağlar. */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 scrollbar-none lg:hidden">
        {promos.map((p) => (
          <PromoCard
            key={p.id}
            promo={p}
            sizes="(max-width: 640px) 78vw, 45vw"
            className="w-[78vw] shrink-0 snap-start sm:w-[45vw]"
          />
        ))}
      </div>
    </aside>
  );
}
