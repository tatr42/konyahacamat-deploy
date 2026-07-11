import { cache } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export interface PressItem {
  id: string;
  kaynak: string;
  yil: string;
  baslik: string;
  img: string;
  slug?: string;
  icerik?: string;
}

/**
 * Basın haberlerini sunucuda getirir (api/basin GET sorgusunun aynısı).
 * React.cache sayesinde aynı istek içinde mükerrer sorgu atmaz.
 * Alanlar bilinçli olarak tek tek seçilir: Firestore Timestamp objeleri
 * client component props'undan geçemez, bu yüzden ...spread kullanılmaz.
 */
export const getPressItems = cache(async (): Promise<PressItem[]> => {
  try {
    if (!db) return [];
    const q = query(collection(db, "press"), orderBy("yil", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => {
      const data = d.data();
      return {
        id: d.id,
        kaynak: data.kaynak ?? "",
        yil: data.yil ?? "",
        baslik: data.baslik ?? "",
        img: data.img ?? "",
        slug: data.slug || undefined,
        icerik: data.icerik || undefined,
      };
    });
  } catch (err) {
    console.error("Firestore getPressItems hatası:", err instanceof Error ? err.message : err);
    return [];
  }
});
