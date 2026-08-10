import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ACCENT_CLASSES, type Promo } from "@/data/promos";

/**
 * Görselli promo/duyuru kartı — sitedeki "reklam alanı" biriminin kendisi.
 *
 * Sunucu bileşenidir: içinde durum yok, bu yüzden istemciye JS gitmez.
 * Renk, görsel ve metin `src/data/promos.ts`ten gelir.
 *
 * VARYANTLAR
 *   card  — dikey, görsel üstte. Izgara ve kenar rayı için varsayılan.
 *   wide  — yatay şerit; görsel solda. Yazı arası ve bölüm sonu için.
 *   mini  — görselsiz, tek satır. Yoğun listelerde nefes aldırır.
 */
type Variant = "card" | "wide" | "mini";

interface Props {
  promo: Promo;
  variant?: Variant;
  /**
   * `sizes` doğru verilmezse Next.js her kart için tam genişlikte görsel
   * indirir. Kenar rayı 320px, ızgara ~380px civarıdır.
   */
  sizes?: string;
  /** Kart görselinin öncelikli yüklenmesi (ekranın üstündeki tek promo için). */
  priority?: boolean;
  className?: string;
}

export default function PromoCard({
  promo,
  variant = "card",
  sizes = "(max-width: 640px) 88vw, (max-width: 1024px) 45vw, 340px",
  priority = false,
  className = "",
}: Props) {
  const c = ACCENT_CLASSES[promo.accent];

  // Dış bağlantılar (COMTR_LIVE açıkken akademi com.tr'ye gider) <a> ile
  // açılmalı: next/link prefetch'i farklı domainde anlamsız.
  const isExternal = promo.href.startsWith("http");
  const Wrapper = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href: promo.href, rel: "noopener noreferrer" }
    : { href: promo.href };

  if (variant === "mini") {
    return (
      <Wrapper
        {...(linkProps as { href: string })}
        title={promo.title}
        className={`group flex items-center gap-3 rounded-2xl border ${c.border} ${c.bgSoft} px-4 py-3 transition-all hover:bg-white/5 active:scale-[0.98] ${className}`}
      >
        <span className={`h-2 w-2 shrink-0 rounded-full ${c.bg}`} />
        <span className="flex-1 text-sm font-bold text-white/85 group-hover:text-white">
          {promo.title}
        </span>
        <ArrowRight
          size={14}
          className={`${c.text} shrink-0 transition-transform group-hover:translate-x-1`}
        />
      </Wrapper>
    );
  }

  const isWide = variant === "wide";

  return (
    <Wrapper
      {...(linkProps as { href: string })}
      title={promo.title}
      className={`group relative flex overflow-hidden rounded-3xl border ${c.border} bg-anthracite-light/60 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${c.glowHover} active:scale-[0.99] ${
        isWide ? "flex-col sm:flex-row" : "flex-col"
      } ${className}`}
    >
      {/* ── Görsel ── */}
      <div
        className={`relative shrink-0 overflow-hidden ${
          isWide ? "h-40 sm:h-auto sm:w-52 lg:w-64" : "h-44"
        }`}
      >
        <Image
          src={promo.image}
          alt={promo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Renkli tint: her promo kendi rengini görselin üstüne bırakır —
            eski portal sitelerdeki renkli kutu hissini veren şey bu.
            `mix-blend-overlay` fotoğrafın detayını yok etmeden renklendirir. */}
        <div className={`pointer-events-none absolute inset-0 ${c.bg} opacity-25 mix-blend-overlay`} />

        {/* Metin okunurluğu için koyulaştırma. */}
        <div
          className={`pointer-events-none absolute inset-0 ${
            isWide
              ? "bg-gradient-to-r from-anthracite-dark/20 to-anthracite-light/80 sm:to-anthracite-light"
              : "bg-gradient-to-t from-anthracite-light via-anthracite-light/40 to-transparent"
          }`}
        />

        {/* Rozet */}
        <span
          className={`absolute left-4 top-4 rounded-full ${c.bg} px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] ${c.onAccent} shadow-lg`}
        >
          {promo.badge}
        </span>

        {promo.note && (
          <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-anthracite-dark/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white/80 backdrop-blur-sm">
            {promo.note}
          </span>
        )}
      </div>

      {/* ── Metin ── */}
      <div className={`flex flex-1 flex-col gap-2 p-5 ${isWide ? "sm:justify-center" : ""}`}>
        <h3
          className={`font-display text-lg font-bold leading-tight text-white transition-colors ${c.textGroupHover}`}
        >
          {promo.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/55">{promo.desc}</p>

        <span
          className={`mt-2 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest ${c.text}`}
        >
          {promo.cta}
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Wrapper>
  );
}
