/**
 * Hizmet dizin (hub) sayfası — bir hizmetin tüm il/ilçe sayfalarına köprü.
 *
 * Amaç: (1) `/{hizmet}` kök URL'inin 404 vermemesi, (2) yetim sayfa kalmaması
 * — 81 il ve altındaki ilçeler buradan linklenerek iç linkleme tamamlanır,
 * (3) tamamen statik (SSG) — dinamik veri yok.
 *
 * Server component; sadece sunum + yapısal veri (BreadcrumbList + ItemList).
 */

import Link from "next/link";
import { MapPin, Phone, ChevronRight } from "lucide-react";
import { provincesByRegion } from "@/data/tr-locations";
import {
  type ServiceType,
  HUB_COPY,
  SERVICE_LABEL,
  PHONE_DISPLAY,
  WHATSAPP,
} from "@/lib/pseo/content";

const BASE = "https://www.konyahacamat.net";

export default function ServiceHubPage({ service }: { service: ServiceType }) {
  const copy = HUB_COPY[service];
  const groups = provincesByRegion();

  const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Merhaba, ${SERVICE_LABEL[service]} hakkında bilgi almak istiyorum.`,
  )}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: BASE },
      {
        "@type": "ListItem",
        position: 2,
        name: SERVICE_LABEL[service],
        item: `${BASE}/${service}`,
      },
    ],
  };

  // İl sayfalarını tek bir ItemList olarak işaretle (keşfedilebilirlik).
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.h1,
    itemListElement: groups
      .flatMap((g) => g.provinces)
      .map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${p.name} ${SERVICE_LABEL[service]}`,
        url: `${BASE}/${service}/${p.slug}`,
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 bg-anthracite-dark overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
        </div>

        <div className="container-site relative z-10">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-teal transition-colors">Ana Sayfa</Link>
            <ChevronRight size={14} />
            <span className="text-white/70">{SERVICE_LABEL[service]}</span>
          </nav>

          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal font-bold text-sm">
              <MapPin size={16} />
              <span>{copy.badge}</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-black text-white leading-tight">
              {copy.h1}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-3xl font-medium">
              {copy.intro}
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="bg-teal text-anthracite-dark px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-teal/20 flex items-center gap-2"
              >
                <Phone size={18} />
                WhatsApp ile İletişim
              </a>
              <a
                href={`tel:+${WHATSAPP}`}
                className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* İL / İLÇE DİZİNİ — bölgelere göre */}
      <section className="py-16 lg:py-24 bg-anthracite border-t border-white/5">
        <div className="container-site space-y-16">
          {groups.map((group) => (
            <div key={group.region}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl lg:text-3xl font-display font-bold text-white whitespace-nowrap">
                  {group.region}
                  <span className="text-gold"> Bölgesi</span>
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-teal/40 to-transparent" />
                <span className="text-white/40 text-sm shrink-0">
                  {group.provinces.length} il
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.provinces.map((p) => (
                  <div
                    key={p.slug}
                    className="bg-anthracite-dark/50 p-6 rounded-3xl border border-white/5 hover:border-teal/30 transition-all"
                  >
                    <Link
                      href={`/${service}/${p.slug}`}
                      className="group flex items-center justify-between mb-4"
                    >
                      <span className="text-lg font-bold text-white group-hover:text-teal transition-colors">
                        {p.name} {SERVICE_LABEL[service]}
                      </span>
                      <ChevronRight
                        size={18}
                        className="text-white/30 group-hover:text-teal group-hover:translate-x-1 transition-all shrink-0"
                      />
                    </Link>
                    <div className="flex flex-wrap gap-2">
                      {p.districts.map((dd) => (
                        <Link
                          key={dd.slug}
                          href={`/${service}/${p.slug}/${dd.slug}`}
                          className="px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-xs hover:bg-teal/10 hover:text-teal transition-all"
                        >
                          {dd.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
