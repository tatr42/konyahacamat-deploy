import Link from "next/link";
import { Megaphone } from "lucide-react";
import { ACCENT_CLASSES, TICKER_ITEMS } from "@/data/promos";

/**
 * Kayan duyuru bandı — "kurslar başladı / kayıtlar devam ediyor / randevu
 * takvimi açık" gibi kısa haberleri sürekli döndürür.
 *
 * NEDEN CSS, NEDEN JS DEĞİL:
 *   Bant her sayfada var ve hiç etkileşim almıyor. `setInterval` ile
 *   döndürmek her sayfaya gereksiz istemci JS'i ve bir hidrasyon sınırı
 *   eklerdi. Saf CSS animasyonu sunucu bileşeni olarak kalmasını sağlar.
 *
 * SONSUZ DÖNGÜ:
 *   Liste iki kez basılır ve şerit -%50 kaydırılır. İkinci kopya birinciyle
 *   çakıştığı an animasyon başa döner, dolayısıyla dikiş görünmez.
 *   İkinci kopya ekran okuyucudan `aria-hidden` ile gizlenir — aynı
 *   duyuruyu iki kez okumasın diye.
 */
interface Props {
  className?: string;
}

export default function AnnouncementTicker({ className = "" }: Props) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className={`marquee-hover-pause relative flex items-stretch overflow-hidden border-y border-white/10 bg-gradient-to-r from-anthracite-light via-anthracite to-anthracite-light ${className}`}
    >
      {/* Sabit sol etiket — şerit altından kayıp geçsin diye üstte durur. */}
      <div className="relative z-20 flex shrink-0 items-center gap-2 bg-gold px-4 py-2.5 text-anthracite-dark">
        <Megaphone size={14} className="shrink-0" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Duyuru</span>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div className="marquee-track" style={{ ["--marquee-duration" as string]: "48s" }}>
          {items.map((item, i) => {
            const c = ACCENT_CLASSES[item.accent];
            const isClone = i >= TICKER_ITEMS.length;
            return (
              <Link
                key={`${item.text}-${i}`}
                href={item.href}
                title={item.text}
                aria-hidden={isClone || undefined}
                tabIndex={isClone ? -1 : undefined}
                className="flex shrink-0 items-center gap-2.5 whitespace-nowrap px-6 py-2.5 text-xs font-bold text-white/70 transition-colors hover:text-white"
              >
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${c.bg}`} />
                {item.text}
                <span className="ml-4 text-white/15">•</span>
              </Link>
            );
          })}
        </div>

        {/* Kenarlarda yumuşak sönümleme — metin sert kesilmesin. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-anthracite-light to-transparent" />
      </div>
    </div>
  );
}
