import { cache } from "react";
import { queryCollection } from "@/lib/firestore-rest";

export interface PressItem {
  id: string;
  kaynak: string;
  yil: string;
  baslik: string;
  img: string;
  slug?: string;
  icerik?: string;
  seoTitle?: string;
  seoDescription?: string;
}

function toPressItem(row: Record<string, unknown> & { id: string }): PressItem {
  return {
    id: row.id,
    kaynak: (row.kaynak as string) ?? "",
    yil: (row.yil as string) ?? "",
    baslik: (row.baslik as string) ?? "",
    img: (row.img as string) ?? "",
    slug: (row.slug as string) || undefined,
    icerik: (row.icerik as string) || undefined,
    seoTitle: (row.seoTitle as string) || undefined,
    seoDescription: (row.seoDescription as string) || undefined,
  };
}

/**
 * Basın haberlerini REST üzerinden getirir (yıla göre yeniden eskiye).
 * React.cache sayesinde aynı istek içinde mükerrer sorgu atmaz.
 */
export const getPressItems = cache(async (): Promise<PressItem[]> => {
  try {
    const rows = await queryCollection("press", {
      orderBy: { field: "yil", desc: true },
    });
    return rows.map(toPressItem);
  } catch (err) {
    console.error("Firestore getPressItems hatası:", err instanceof Error ? err.message : err);
    return [];
  }
});

/** Slug ile tek basın haberi getirir; bulunamazsa null. */
export const getPressItemBySlug = cache(async (slug: string): Promise<PressItem | null> => {
  try {
    const rows = await queryCollection("press", {
      where: { field: "slug", value: slug },
      limit: 1,
    });
    return rows.length ? toPressItem(rows[0]) : null;
  } catch (err) {
    console.error("Firestore getPressItemBySlug hatası:", err instanceof Error ? err.message : err);
    return null;
  }
});
