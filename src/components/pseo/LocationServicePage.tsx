/**
 * Lokasyon + hizmet pSEO sayfası — paylaşılan sunum bileşeni.
 *
 * Tüm il/ilçe hizmet sayfaları (hacamat-kursu, suluk-satisi, kupa-malzemeleri,
 * hacamat-nedir, suluk-nedir) bu tek bileşeni kullanır. İçerik, lib/pseo/content
 * tarafından lokasyona göre FARKLILAŞTIRILMIŞ olarak buraya gelir; burada yalnızca
 * sunum ve yapısal veri (JSON-LD) vardır.
 *
 * Server component (varsayılan) — statik üretime uygundur.
 */

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  CheckCircle2,
  Truck,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import {
  type ServiceType,
  type LocationCtx,
  getServiceCopy,
  cargoLine,
  serviceReachLine,
  whatsappLink,
  localCtaCopy,
  imageAlt,
  imageTrioAlts,
  deepContentBlocks,
  selectFaqs,
  locationServiceSchema,
  aiSummary,
  SERVICE_LABEL,
  PHONE_DISPLAY,
  WHATSAPP,
} from "@/lib/pseo/content";
import { pickImage, pickTrio } from "@/lib/pseo/images";
import { dative } from "@/lib/pseo/turkish";
import LocalContactCta from "@/components/pseo/LocalContactCta";
import { BlockWidgetView, widgetKey } from "@/components/pseo/BlockWidgets";
import { TableOfContents } from "@/components/blog/BlogEnrichment";
import type { TocItem } from "@/lib/blog/enrich";
import { slugify } from "@/data/tr-locations";

const BASE = "https://www.konyahacamat.net";

interface Props {
  service: ServiceType;
  ctx: LocationCtx;
  /** İç linkleme için: aynı hizmetteki diğer lokasyonlar */
  siblingLinks?: { href: string; label: string }[];
  /** İç linkleme için: aynı lokasyondaki diğer hizmetler */
  otherServices?: { href: string; label: string }[];
}

export default function LocationServicePage({
  service,
  ctx,
  siblingLinks = [],
  otherServices = [],
}: Props) {
  const copy = getServiceCopy(service);
  // Dinamik SSS: 15'lik havuzdan lokasyona özel, deterministik 4 soru
  const faq = selectFaqs(service, ctx);
  const wa = whatsappLink(service, ctx);
  // Deterministik havuz seçimi: aynı il/ilçe+hizmet her zaman aynı görsel
  const cover = pickImage(service, ctx.province, ctx.district?.slug);
  const alt = imageAlt(service, ctx);
  // 3'lü galeri: kapak hariç, lokasyona özel deterministik 3 görsel + alt metni
  const trio = pickTrio(service, ctx.province, ctx.district?.slug, cover.src);
  const trioAlts = imageTrioAlts(service, ctx);
  // Derin içerik blokları (kargo güvencesi, noktalar, Konya ulaşım)
  const blocks = deepContentBlocks(service, ctx);
  const cta = localCtaCopy(service, ctx);
  // AI/öne-çıkan-snippet için tepe "Kısa Cevap" özeti (40–55 kelime).
  const summary = aiSummary(service, ctx);

  // İçindekiler: derin içerik blokları + SSS. Sunucuda, blok başlıklarından
  // üretilir — id'ler build çıktısında hazır olduğundan botlar JS olmadan görür.
  const faqHeadingId = "sik-sorulan-sorular";
  const toc: TocItem[] = [
    ...blocks.map((block) => ({
      id: slugify(block.title),
      text: block.title,
      level: 2 as const,
    })),
    { id: faqHeadingId, text: `${ctx.place} Sık Sorulan Sorular`, level: 2 },
  ];

  const path = ctx.isDistrict
    ? `/${service}/${ctx.province.slug}/${ctx.district!.slug}`
    : `/${service}/${ctx.province.slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  // Hizmet niteliğine göre Product (satış) veya Course (eğitim) şeması.
  // Bilgi siloları (hacamat-nedir/suluk-nedir) için null döner.
  const serviceSchema = locationServiceSchema(service, ctx, cover.src);

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
      {
        "@type": "ListItem",
        position: 3,
        name: ctx.province.name,
        item: `${BASE}/${service}/${ctx.province.slug}`,
      },
      ...(ctx.isDistrict
        ? [
            {
              "@type": "ListItem",
              position: 4,
              name: ctx.district!.name,
              item: `${BASE}${path}`,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}

      {/* HERO */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 bg-anthracite-dark overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-[120px]" />
        </div>

        <div className="container-site relative z-10">
          {/* Breadcrumb (görsel) */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8 flex-wrap">
            <Link href="/" className="hover:text-teal transition-colors">Ana Sayfa</Link>
            <ChevronRight size={14} />
            <Link href={`/${service}/${ctx.province.slug}`} className="hover:text-teal transition-colors">
              {SERVICE_LABEL[service]}
            </Link>
            <ChevronRight size={14} />
            <span className="text-white/70">{ctx.full}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-3 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal font-bold text-sm">
                <MapPin size={16} />
                <span>{ctx.full} Hizmet Bölgesi</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-display font-black text-white leading-tight">
                {copy.h1(ctx)}
              </h1>
              <p className="text-lg text-white/70 leading-relaxed max-w-3xl font-medium">
                {copy.intro(ctx)}
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="bg-teal text-anthracite-dark px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-teal/20 flex items-center gap-2"
                >
                  <Phone size={18} />
                  {copy.cta(ctx)}
                </a>
                <a
                  href={`tel:+${WHATSAPP}`}
                  className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Kapak görseli — lokasyona özel alt metniyle */}
            <div className="lg:col-span-2 relative">
              <div className="absolute -inset-3 bg-teal/10 rounded-[2rem] blur-2xl -z-10" />
              <Image
                src={cover.src}
                width={cover.width}
                height={cover.height}
                alt={alt}
                priority
                className="w-full h-auto rounded-3xl border border-white/10 shadow-2xl object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <span className="px-3 py-1.5 rounded-full bg-anthracite-dark/80 backdrop-blur-sm border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-widest">
                  Steril & CE Sertifikalı
                </span>
                <span className="px-3 py-1.5 rounded-full bg-gold/90 text-anthracite-dark text-[10px] font-black uppercase tracking-widest">
                  {ctx.place}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KISA CEVAP — AI/öne çıkan snippet için sayfa tepesinde net özet */}
      {summary && (
        <section className="py-10 lg:py-12 bg-anthracite-dark border-t border-white/5">
          <div className="container-site max-w-4xl">
            <div className="bg-teal/[0.06] border border-teal/20 rounded-3xl p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-teal" />
                <span className="text-teal text-[11px] font-black uppercase tracking-[0.25em]">
                  Kısa Cevap
                </span>
              </div>
              <p className="text-white/85 text-lg leading-relaxed">{summary}</p>
            </div>
          </div>
        </section>
      )}

      {/* LOKASYONA ÖZEL BİLGİ KARTLARI */}
      <section className="py-16 lg:py-24 bg-anthracite border-t border-white/5">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={<Truck size={28} />}
              title={`${dative(ctx.place)} Kargo`}
              body={cargoLine(ctx)}
            />
            <InfoCard
              icon={<GraduationCap size={28} />}
              title="Hizmet & Erişim"
              body={serviceReachLine(ctx)}
            />
            <InfoCard
              icon={<ShieldCheck size={28} />}
              title="Steril & Sertifikalı"
              body="CE sertifikalı, steril ve tek kullanımlık malzeme. 1994'ten beri süregelen tecrübe ile güvenli uygulama ve eğitim."
            />
          </div>
        </div>
      </section>

      {/* 3'LÜ GÖRSEL GALERİSİ — lokasyona özel, deterministik */}
      <section className="py-16 lg:py-24 bg-anthracite-dark border-t border-white/5">
        <div className="container-site">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-10">
            {ctx.place}{" "}
            <span className="text-teal">Uygulama &amp; Malzeme Görselleri</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {trio.map((img, i) => (
              <figure
                key={img.src}
                className="relative group overflow-hidden rounded-3xl border border-white/10"
              >
                <Image
                  src={img.src}
                  width={img.width}
                  height={img.height}
                  alt={trioAlts[i]}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-anthracite-dark/95 to-transparent p-4 pt-10">
                  <span className="text-white/85 text-xs font-medium leading-snug">
                    {trioAlts[i]}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* DERİN İÇERİK — lokasyona özel bilgi blokları (600+ kelime motoru) */}
      <section className="py-16 lg:py-24 bg-anthracite border-t border-white/5">
        <div className="container-site max-w-4xl">
          <TableOfContents toc={toc} />
        </div>
        <div className="container-site max-w-4xl space-y-12">
          {blocks.map((block) => (
            <article key={block.title}>
              <h2
                id={slugify(block.title)}
                className="scroll-mt-32 text-2xl lg:text-3xl font-display font-bold text-white mb-5"
              >
                {block.title}
              </h2>
              <div className="space-y-4">
                {block.paragraphs.map((p, i) => (
                  <p key={i} className="text-white/60 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              {/* Her ilde AYNI olan bilgi: metin değil, yapısal sunum */}
              {block.widgets?.map((w) => (
                <BlockWidgetView key={widgetKey(w)} widget={w} />
              ))}
            </article>
          ))}
        </div>
      </section>

      {/* SSS */}
      <section className="py-16 lg:py-24 bg-anthracite-dark border-t border-white/5">
        <div className="container-site max-w-3xl">
          <h2
            id={faqHeadingId}
            className="scroll-mt-32 text-3xl lg:text-4xl font-display font-bold text-white mb-10"
          >
            {ctx.place} <span className="text-teal">Sık Sorulan Sorular</span>
          </h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div
                key={i}
                className="bg-anthracite p-6 rounded-2xl border border-white/5"
              >
                <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-teal shrink-0 mt-1" />
                  {item.q}
                </h3>
                <p className="text-white/60 leading-relaxed pl-8">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YEREL DÖNÜŞÜM BANDI — tel + WhatsApp + Hızlı Bilgi formu */}
      <LocalContactCta
        title={cta.title}
        subtitle={cta.subtitle}
        phoneDisplay={PHONE_DISPLAY}
        phoneHref={`+${WHATSAPP}`}
        whatsapp={WHATSAPP}
        waPrefix={cta.waPrefix}
      />

      {/* İÇ LİNKLEME */}
      {(siblingLinks.length > 0 || otherServices.length > 0) && (
        <section className="py-16 bg-anthracite border-t border-white/5">
          <div className="container-site space-y-10">
            {otherServices.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-5">
                  {ctx.full} — Diğer Hizmetler
                </h2>
                <div className="flex flex-wrap gap-3">
                  {otherServices.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm hover:border-teal/40 hover:text-teal transition-all"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {siblingLinks.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-5">
                  {SERVICE_LABEL[service]} — Diğer Bölgeler
                </h2>
                <div className="flex flex-wrap gap-3">
                  {siblingLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm hover:border-teal/40 hover:text-teal transition-all"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

function InfoCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-anthracite-dark/50 p-7 rounded-3xl border border-white/5 hover:border-teal/30 transition-all group">
      <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mb-5 text-teal group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
      <p className="text-white/60 leading-relaxed text-sm">{body}</p>
    </div>
  );
}
