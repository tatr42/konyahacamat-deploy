/**
 * pSEO route-kit — 10 route dosyasının (5 hizmet × il/ilçe) ortak mantığı.
 *
 * Her page.tsx yalnızca kendi ServiceType'ını verir; params üretimi, metadata,
 * iç linkleme ve render burada tek yerde tanımlıdır. Böylece içerik/tasarım
 * değişikliği tek noktadan tüm sayfalara yansır.
 *
 * Kullanım (il route):
 *   export const dynamicParams = false;
 *   export const generateStaticParams = ilStaticParams;
 *   export const generateMetadata = makeIlMetadata("hacamat-kursu");
 *   export default ilPage("hacamat-kursu");
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PROVINCES,
  getProvince,
  getDistrict,
  type Province,
  type District,
} from "@/data/tr-locations";
import {
  KEPT_SERVICES,
  isKeptDistrict,
  keptDistrictPairs,
} from "@/data/pseo-scope";
import {
  buildLocationCtx,
  getServiceCopy,
  imageAlt,
  ALL_SERVICES,
  SERVICE_LABEL,
  HUB_COPY,
  type ServiceType,
  type LocationCtx,
} from "@/lib/pseo/content";
import { pickImage } from "@/lib/pseo/images";
import LocationServicePage from "@/components/pseo/LocationServicePage";
import ServiceHubPage from "@/components/pseo/ServiceHubPage";

const SIBLING_LIMIT = 12;

type Link = { href: string; label: string };

/**
 * Faz 0 sonrası iç linkleme kapsamı — 301 alan URL'lere iç link VERİLMEZ.
 * Kapatılan "...nedir" siloları ve budanan ilçeler link havuzundan düşer.
 */
const KEPT_SERVICE_SET = new Set<string>(KEPT_SERVICES);
const LINKABLE_SERVICES = ALL_SERVICES.filter((s) => KEPT_SERVICE_SET.has(s));

/** 81 il için statik parametre. */
export const ilStaticParams = () => PROVINCES.map((p) => ({ il: p.slug }));

/**
 * YAYINDA KALAN il/ilçe kombinasyonları için statik parametre (Faz 0 budaması).
 *
 * 335 ilçenin tamamı değil, `pseo-scope.KEPT_DISTRICTS` içindeki 49 metropol
 * ilçesi üretilir. Budanan ilçelerin URL'leri `next.config.ts` içinde il
 * sayfasına 301 alır; `dynamicParams = false` olduğu için buradan çıkarmak tek
 * başına 404 üretirdi — yönlendirme kuralları o yüzden zorunludur.
 */
export const ilceStaticParams = () => keptDistrictPairs();

/**
 * İLÇE SAYFALARI İÇİN `noindex, follow` (Faz 1 kapanış kararı).
 *
 * Gerekçe — ölçüme dayalı: Faz 1 sonunda il sayfaları %18-22 benzerliğe indi
 * (hedef <%25 tuttu), ancak ilçe-ilçe benzerlik %33'te kaldı. Kök neden, bir
 * ilin ilçelerinin AYNI il profilini paylaşması (mesafe, iklim, kargo
 * koridoru). Jaccard bir oran olduğu için tekrarlanan metni silmek payda ile
 * birlikte payı da küçültüyor ve oranı düşürmüyor; oranı düşürmenin tek yolu
 * benzersiz metin EKLEMEK, o da ilçe seviyesinde veri gerektiriyor (elimizde
 * yok, uydurmak da veri dürüstlüğü kuralımıza aykırı).
 *
 * `follow` bilinçli: iç link mimarisi ve PageRank akışı korunur, sayfalar
 * kullanıcıya hizmet vermeye devam eder; yalnızca indekslenmezler. İlçe
 * sayfaları zaten Faz 0'da sitemap dışı bırakılmıştı — bu, o kararın
 * tamamlayıcısıdır.
 *
 * GERİ ALMA KOŞULU: ilçe seviyesinde gerçek veri eklenirse (semt, ilçe
 * merkezine mesafe, kargo şubesi) benzerlik yeniden ölçülüp bu kaldırılabilir.
 */
const DISTRICT_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: true,
  googleBot: { index: false, follow: true },
};

function metaFor(
  service: ServiceType,
  ctx: LocationCtx,
  canonical: string,
): Metadata {
  const copy = getServiceCopy(service);
  // OG görseli de kapakla aynı deterministik havuz seçimi olsun
  const cover = pickImage(service, ctx.province, ctx.district?.slug);
  return {
    title: copy.seoTitle(ctx),
    description: copy.seoDescription(ctx),
    alternates: { canonical },
    ...(ctx.isDistrict ? { robots: DISTRICT_ROBOTS } : {}),
    openGraph: {
      title: copy.seoTitle(ctx),
      description: copy.seoDescription(ctx),
      url: canonical,
      images: [
        {
          url: cover.src,
          width: cover.width,
          height: cover.height,
          alt: imageAlt(service, ctx),
        },
      ],
    },
  };
}

/** Aynı lokasyonda diğer hizmetlere linkler. */
function otherServiceLinks(
  service: ServiceType,
  province: Province,
  district?: District,
): Link[] {
  const place = district ? district.name : province.name;
  const base = district
    ? `/${province.slug}/${district.slug}`
    : `/${province.slug}`;
  return LINKABLE_SERVICES.filter((s) => s !== service).map((s) => ({
    href: `/${s}${base}`,
    label: `${place} ${SERVICE_LABEL[s]}`,
  }));
}

// ─── Dizin (hub) seviyesi ─────────────────────────────────────────────────

export function makeHubMetadata(service: ServiceType): Metadata {
  const copy = HUB_COPY[service];
  const canonical = `/${service}`;
  return {
    title: copy.seoTitle,
    description: copy.seoDescription,
    alternates: { canonical },
    openGraph: {
      title: copy.seoTitle,
      description: copy.seoDescription,
      url: canonical,
      images: [{ url: "/logo.webp", width: 1200, height: 630, alt: copy.h1 }],
    },
  };
}

export function hubPage(service: ServiceType) {
  return function Page() {
    return <ServiceHubPage service={service} />;
  };
}

// ─── İl seviyesi ──────────────────────────────────────────────────────────

export function makeIlMetadata(service: ServiceType) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ il: string }>;
  }): Promise<Metadata> {
    const { il } = await params;
    const province = getProvince(il);
    if (!province) return {};
    return metaFor(service, buildLocationCtx(province), `/${service}/${il}`);
  };
}

export function ilPage(service: ServiceType) {
  return async function Page({
    params,
  }: {
    params: Promise<{ il: string }>;
  }) {
    const { il } = await params;
    const province = getProvince(il);
    if (!province) notFound();

    const ctx = buildLocationCtx(province);
    const siblingLinks: Link[] = province.districts
      .filter((dd) => isKeptDistrict(province.slug, dd.slug))
      .slice(0, SIBLING_LIMIT)
      .map((dd) => ({
        href: `/${service}/${province.slug}/${dd.slug}`,
        label: `${dd.name} ${SERVICE_LABEL[service]}`,
      }));

    return (
      <LocationServicePage
        service={service}
        ctx={ctx}
        siblingLinks={siblingLinks}
        otherServices={otherServiceLinks(service, province)}
      />
    );
  };
}

// ─── İlçe seviyesi ────────────────────────────────────────────────────────

export function makeIlceMetadata(service: ServiceType) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ il: string; ilce: string }>;
  }): Promise<Metadata> {
    const { il, ilce } = await params;
    const found = getDistrict(il, ilce);
    if (!found) return {};
    const ctx = buildLocationCtx(found.province, found.district);
    return metaFor(service, ctx, `/${service}/${il}/${ilce}`);
  };
}

export function ilcePage(service: ServiceType) {
  return async function Page({
    params,
  }: {
    params: Promise<{ il: string; ilce: string }>;
  }) {
    const { il, ilce } = await params;
    const found = getDistrict(il, ilce);
    if (!found) notFound();

    const { province, district } = found;
    const ctx = buildLocationCtx(province, district);

    // Üstte il sayfası + kardeş ilçeler (aynı hizmet)
    const siblingLinks: Link[] = [
      {
        href: `/${service}/${province.slug}`,
        label: `${province.name} ${SERVICE_LABEL[service]}`,
      },
      ...province.districts
        .filter(
          (dd) =>
            dd.slug !== district.slug && isKeptDistrict(province.slug, dd.slug),
        )
        .slice(0, SIBLING_LIMIT)
        .map((dd) => ({
          href: `/${service}/${province.slug}/${dd.slug}`,
          label: `${dd.name} ${SERVICE_LABEL[service]}`,
        })),
    ];

    return (
      <LocationServicePage
        service={service}
        ctx={ctx}
        siblingLinks={siblingLinks}
        otherServices={otherServiceLinks(service, province, district)}
      />
    );
  };
}
