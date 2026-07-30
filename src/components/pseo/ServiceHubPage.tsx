/**
 * Hizmet dizin (hub) sayfası — bir hizmetin tüm il/ilçe sayfalarına köprü.
 *
 * Amaç: (1) `/{hizmet}` kök URL'inin 404 vermemesi, (2) yetim sayfa kalmaması
 * — 81 il ve YAYINDA KALAN ilçeler buradan linklenerek iç linkleme tamamlanır,
 * (3) tamamen statik (SSG) — dinamik veri yok.
 *
 * İlçe listesi `isKeptDistrict` ile SÜZÜLÜR. Süzülmediğinde her hub, budanan
 * 286 ilçenin tamamına link veriyordu (3 hub × 286 = 858 iç link) ve bunların
 * hepsi 301'e gidiyordu: tarama bütçesi ziyan olur, GSC'de "Yönlendirmeli
 * sayfa" şişer, link değeri ölü URL'lere dağılır. Yönlendirme tablosu doğru
 * olsa bile link grafiği onu takip etmezse budama yarım kalır.
 *
 * Server component; sadece sunum + yapısal veri (BreadcrumbList + ItemList).
 */

import Link from "next/link";
import { MapPin, Phone, ChevronRight, Droplet, Truck, Tag, ArrowRight } from "lucide-react";
import { provincesByRegion } from "@/data/tr-locations";
import { isKeptDistrict } from "@/data/pseo-scope";
import {
  type ServiceType,
  HUB_COPY,
  HUB_BODY,
  SERVICE_LABEL,
  PHONE_DISPLAY,
  WHATSAPP,
} from "@/lib/pseo/content";

const BASE = "https://www.konyahacamat.net";

export default function ServiceHubPage({ service }: { service: ServiceType }) {
  const copy = HUB_COPY[service];
  const body = HUB_BODY[service];
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

  // Product + FAQPage — yalnızca HUB_BODY dolu servislerde (ör. suluk-satisi).
  // Product FİYATSIZ: uydurma fiyat yok; Offer yalnızca availability + url taşır.
  const productSchema = body && {
    "@context": "https://schema.org",
    "@type": "Product",
    name: body.product.name,
    description: body.product.description,
    brand: { "@type": "Brand", name: "Ebusadullah Hacamat & Akademi" },
    category: "Tıbbi Sülük / Hirudoterapi",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      areaServed: "TR",
      priceCurrency: "TRY",
      url: `${BASE}/${service}`,
      seller: { "@type": "Organization", name: "Ebusadullah Hacamat & Akademi" },
    },
  };

  const faqSchema = body && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "tr-TR",
    mainEntity: body.faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
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
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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

      {/* ZENGİN GÖVDE — yalnızca HUB_BODY dolu servislerde (satış/dönüşüm) */}
      {body && (
        <>
          {/* Ürün değeri: Tıbbi Sülük Nedir, Neden Bizden? */}
          <section className="py-16 lg:py-20 bg-anthracite border-t border-white/5">
            <div className="container-site">
              <div className="inline-flex items-center gap-2 text-teal mb-4">
                <Droplet size={18} />
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">Ürün</span>
              </div>
              <h2 className="text-2xl lg:text-4xl font-display font-bold text-white mb-5 max-w-3xl">
                {body.value.heading}
              </h2>
              <p className="text-white/70 leading-relaxed max-w-3xl mb-4">{body.value.intro}</p>
              <p className="text-white/50 text-sm mb-10">
                Sülük tedavisinin ne olduğu ve faydaları için{" "}
                <Link href={body.value.blogHref} className="text-teal hover:underline" title={body.value.blogLabel}>
                  {body.value.blogLabel}
                </Link>{" "}
                rehberimizi okuyabilirsiniz.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {body.value.cards.map((c) => (
                  <div key={c.title} className="bg-anthracite-dark/50 border border-white/10 rounded-3xl p-6 hover:border-teal/30 transition-colors">
                    <h3 className="text-white font-bold text-lg mb-2">{c.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Canlı kargo — dönüşüm engelini çözen bölüm */}
          <section className="py-16 lg:py-20 bg-anthracite-dark">
            <div className="container-site">
              <div className="inline-flex items-center gap-2 text-teal mb-4">
                <Truck size={18} />
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">Kargo</span>
              </div>
              <h2 className="text-2xl lg:text-4xl font-display font-bold text-white mb-5 max-w-3xl">
                {body.shipping.heading}
              </h2>
              <p className="text-white/70 leading-relaxed max-w-3xl mb-10">{body.shipping.intro}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {body.shipping.steps.map((s, i) => (
                  <div key={s.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="text-teal font-black text-3xl font-display mb-3 opacity-30">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-white font-bold text-base mb-2">{s.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Fiyat & Sipariş — ticari CTA */}
          <section className="py-16 lg:py-20 bg-anthracite border-t border-white/5">
            <div className="container-site">
              <div className="bg-gradient-to-br from-teal/10 to-white/5 border border-teal/20 rounded-3xl p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 text-teal mb-4">
                    <Tag size={18} />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em]">Fiyat</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-display font-bold text-white mb-4">
                    {body.order.heading}
                  </h2>
                  {body.order.paragraphs.map((p) => (
                    <p key={p} className="text-white/70 leading-relaxed mb-4 max-w-2xl">{p}</p>
                  ))}
                  <ul className="space-y-2">
                    {body.order.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-white/70 text-sm">
                        <span className="text-teal mt-0.5 shrink-0">•</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3 shrink-0 w-full lg:w-auto">
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-center justify-center gap-2 bg-teal text-anthracite-dark px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all"
                  >
                    <Phone size={16} /> WhatsApp'tan Fiyat Al
                  </a>
                  <a
                    href={`tel:+${WHATSAPP}`}
                    className="flex items-center justify-center gap-2 bg-white/10 text-white border border-white/10 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* İL / İLÇE DİZİNİ — bölgelere göre */}
      <section className="py-16 lg:py-24 bg-anthracite border-t border-white/5">
        <div className="container-site space-y-16">
          {body?.directoryHeading && (
            <h2 className="text-2xl lg:text-4xl font-display font-bold text-white max-w-3xl">
              {body.directoryHeading}
            </h2>
          )}
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
                      {p.districts
                        .filter((dd) => isKeptDistrict(p.slug, dd.slug))
                        .map((dd) => (
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

      {/* SSS + tedavi çapraz-link bandı — yalnızca HUB_BODY dolu servislerde */}
      {body && (
        <section className="py-16 lg:py-24 bg-anthracite-dark border-t border-white/5">
          <div className="container-site max-w-3xl">
            <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Merak Edilenler</span>
            <h2 className="text-2xl lg:text-4xl font-display font-bold text-white mt-3 mb-10">
              {SERVICE_LABEL[service]} Hakkında Sık Sorulan Sorular
            </h2>
            <div className="space-y-4">
              {body.faq.map(({ q, a }) => (
                <div key={q} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-teal/20 transition-colors">
                  <h3 className="text-white font-bold mb-2">{q}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>

            {/* Tedavi niyetini /hizmetler/suluk'a yönlendir (anti-kanibalizasyon) */}
            <div className="mt-12 bg-teal/5 border border-teal/20 rounded-3xl p-8 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-2">{body.crossLink.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{body.crossLink.desc}</p>
              </div>
              <Link
                href={body.crossLink.href}
                title={body.crossLink.label}
                className="flex items-center justify-center gap-2 bg-white/10 text-white border border-white/10 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all shrink-0"
              >
                {body.crossLink.label} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
