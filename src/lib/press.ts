import { PRESS_ITEMS } from "@/data/press-items";

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
  /** Tam yayın tarihi (ISO, ör. "2015-09-02"). Yoksa `yil` kullanılır. */
  tarih?: string;
  /** Küpür görselinin altına yazılan açıklama. */
  imgCaption?: string;
  /**
   * Detay sayfasının sonunda görünür SSS bölümü olarak basılır ve aynı
   * veriden FAQPage JSON-LD üretilir. Google, şemadaki cevabın sayfada
   * görünür olmasını şart koştuğu için tek kaynak buradadır.
   */
  faq?: { soru: string; cevap: string }[];
}

/**
 * Basın haberlerini döndürür (yıla göre yeniden eskiye).
 * İçerik src/data/press-items.ts dosyasından elle yönetilir.
 */
export async function getPressItems(): Promise<PressItem[]> {
  return [...PRESS_ITEMS].sort((a, b) => Number(b.yil) - Number(a.yil));
}

/** Slug ile tek basın haberi getirir; bulunamazsa null. */
export async function getPressItemBySlug(slug: string): Promise<PressItem | null> {
  return PRESS_ITEMS.find(i => i.slug === slug) ?? null;
}
