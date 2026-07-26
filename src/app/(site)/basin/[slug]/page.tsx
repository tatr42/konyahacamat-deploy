import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPressItemBySlug, getPressItems } from "@/lib/press";
import { Newspaper, Calendar, ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import ImageLightbox from "./ImageLightbox";

const BASE = "https://www.konyahacamat.net";

const getItem = getPressItemBySlug;

/** Basın haberleri statik bir listeden geldiği için tüm detaylar build'de üretilir. */
export async function generateStaticParams() {
  const items = await getPressItems();
  return items.filter(i => i.slug).map(i => ({ slug: i.slug as string }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getItem(slug);

  if (!item) return { title: "Haber Bulunamadı" };

  const title = item.seoTitle || `${item.baslik} | ${item.kaynak} | Konya Hacamat`;
  const description = item.seoDescription || `${item.kaynak} gazetesinde yayınlanan haber: ${item.baslik}. Ebusadullah Hacamat & Akademi Konya.`;

  return {
    title,
    description,
    alternates: { canonical: `/basin/${slug}` },
    openGraph: {
      title,
      description,
      images: item.img ? [{ url: item.img, width: 1200, height: 630, alt: item.baslik }] : [{ url: "/logo.webp" }],
      url: `/basin/${slug}`,
      type: "article",
      locale: "tr_TR",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BasinDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getItem(slug);

  if (!item) notFound();

  const url = `${BASE}/basin/${slug}`;
  const absImg = item.img ? (item.img.startsWith("http") ? item.img : `${BASE}${item.img}`) : `${BASE}/logo.webp`;
  // Gün bilgisi verilmemişse yılın başı kullanılır — Google eksik tarihten
  // ziyade tutarsız tarihi cezalandırdığı için alan hiç boş bırakılmaz.
  const yayinTarihi = item.tarih || `${item.yil}-01-01`;

  // Küpürün metni sarmalaması yalnızca yazı içeriği varken anlamlı; içerik
  // yoksa görsel tam genişlikte durur.
  const kupurFloatlar = Boolean(item.icerik);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.seoTitle || item.baslik,
    description: item.seoDescription,
    image: [absImg],
    datePublished: yayinTarihi,
    inLanguage: "tr-TR",
    isAccessibleForFree: true,
    // Röportajı yapan gazeteci imzası küpürde okunaklı değil; kaynak kurum yazılıyor.
    author: { "@type": "Organization", name: item.kaynak },
    publisher: {
      "@type": "Organization",
      name: "Ebusadullah Hacamat & Akademi",
      logo: { "@type": "ImageObject", url: `${BASE}/logo.webp` },
    },
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: BASE },
      { "@type": "ListItem", position: 2, name: "Basın Odası", item: `${BASE}/basin` },
      { "@type": "ListItem", position: 3, name: item.baslik, item: url },
    ],
  };

  const faqSchema = item.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: "tr-TR",
        mainEntity: item.faq.map(({ soru, cevap }) => ({
          "@type": "Question",
          name: soru,
          acceptedAnswer: { "@type": "Answer", text: cevap },
        })),
      }
    : null;

  return (
    <main className="min-h-screen bg-anthracite-dark pt-20 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div className="container-site max-w-3xl">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/70 text-sm mb-8">
          <Link
            href="/basin"
            className="hover:text-teal transition-colors flex items-center gap-1"
            title="Basın Odasına Dön"
          >
            <ArrowLeft size={14} /> Basın Odası
          </Link>
          <span>/</span>
          <span className="text-teal truncate">{item.kaynak}</span>
        </div>

        {/* Meta Bilgileri */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-black text-teal uppercase tracking-widest bg-teal/10 px-3 py-1 rounded-full flex items-center gap-1">
            <Newspaper size={12} /> {item.kaynak}
          </span>
          <time dateTime={yayinTarihi} className="text-white/70 text-sm flex items-center gap-1">
            <Calendar size={12} /> {item.yil}
          </time>
        </div>

        {/* Haber Başlığı */}
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
          {item.baslik}
        </h1>

        {/* Gazete küpürü + makale.
            Küpür, metnin sağından akıp altından devam etmesi için article'ın
            İÇİNDE float'lanır (flex/grid ile metin sarmalama yapılamaz).
            Mobilde float kaldırılır; 1/3 genişlik o boyutta okunmaz olurdu. */}
        {(item.img || item.icerik) && (
          <article className="press-article">
            {item.img && (
              <figure className={kupurFloatlar ? "press-kupur" : undefined}>
                <ImageLightbox
                  src={item.img}
                  alt={`${item.kaynak} — ${item.baslik} başlıklı haberin gazete küpürü`}
                  thumbClassName="mb-3"
                  thumbMaxHeight={kupurFloatlar ? "max-h-[22rem]" : "max-h-[600px]"}
                />
                {item.imgCaption && <figcaption>{item.imgCaption}</figcaption>}
              </figure>
            )}
            {item.icerik && <div dangerouslySetInnerHTML={{ __html: item.icerik }} />}
            <div className="clear-both" />
          </article>
        )}

        {/* SSS — hem okuyucu için hem FAQPage şeması için tek kaynak */}
        {item.faq && item.faq.length > 0 && (
          <section className="mt-16 clear-both">
            <h2 className="font-display text-3xl font-bold text-white mb-8">
              Sıkça Sorulan <span className="text-teal italic">Sorular</span>
            </h2>
            <div className="flex flex-col gap-4">
              {item.faq.map(({ soru, cevap }) => (
                <div key={soru} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-white font-bold text-lg mb-2">{soru}</h3>
                  <p className="text-white/70 leading-relaxed">{cevap}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sağlık beyanı — içerik bir röportaj aktarımı, tıbbi tavsiye değil */}
        <p className="mt-12 text-xs text-white/40 leading-relaxed border-l-2 border-white/10 pl-4 italic">
          Bu içerik, {item.kaynak} gazetesinde yayımlanan röportajın arşiv amaçlı dijital
          aktarımıdır. Metindeki sağlıkla ilgili ifadeler röportaj sahibinin beyanlarıdır;
          tıbbi tavsiye niteliği taşımaz, hekim muayenesinin ve tedavisinin yerine geçmez.
          Şikâyetleriniz için önce hekiminize başvurunuz.
        </p>

        <hr className="border-white/10 my-10" />

        {/* CTA (Eylem Çağrısı) */}
        <div className="bg-teal/5 border border-teal/20 rounded-2xl p-8 text-center">
          <h3 className="text-white font-bold text-xl mb-2">Hacamat Tedavisi İçin Randevu Alın</h3>
          <p className="text-white/70 text-sm mb-6">Konya veya Almanya seansları için bize ulaşın.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/905544062383"
              target="_blank"
              rel="noopener noreferrer nofollow"
              title="WhatsApp üzerinden randevu al"
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all"
            >
              <MessageCircle size={16} fill="currentColor" /> WhatsApp
            </a>
            <Link
              href="/takvim"
              title="Online randevu takvimine git"
              className="flex items-center gap-2 bg-teal text-anthracite-dark px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all"
            >
              Randevu Al
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
