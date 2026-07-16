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
  buildLocationCtx,
  getServiceCopy,
  imageAlt,
  ALL_SERVICES,
  SERVICE_IMAGE,
  SERVICE_LABEL,
  HUB_COPY,
  type ServiceType,
  type LocationCtx,
} from "@/lib/pseo/content";
import LocationServicePage from "@/components/pseo/LocationServicePage";
import ServiceHubPage from "@/components/pseo/ServiceHubPage";

const SIBLING_LIMIT = 12;

type Link = { href: string; label: string };

/** 81 il için statik parametre. */
export const ilStaticParams = () => PROVINCES.map((p) => ({ il: p.slug }));

/** Tüm il/ilçe kombinasyonları için statik parametre. */
export const ilceStaticParams = () =>
  PROVINCES.flatMap((p) =>
    p.districts.map((dd) => ({ il: p.slug, ilce: dd.slug })),
  );

function metaFor(
  service: ServiceType,
  ctx: LocationCtx,
  canonical: string,
): Metadata {
  const copy = getServiceCopy(service);
  const cover = SERVICE_IMAGE[service];
  return {
    title: copy.seoTitle(ctx),
    description: copy.seoDescription(ctx),
    alternates: { canonical },
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
  return ALL_SERVICES.filter((s) => s !== service).map((s) => ({
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
        .filter((dd) => dd.slug !== district.slug)
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
