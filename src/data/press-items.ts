import type { PressItem } from "@/lib/press";

/**
 * Basın haberleri ("Medyada Biz") — ELLE düzenlenir.
 *
 * Firebase/Firestore kaldırıldı; haberler artık bu dosyadan okunur.
 * Yeni haber eklemek için aşağıdaki listeye bir nesne ekleyin.
 *
 * Alanlar:
 *   id        : benzersiz bir kimlik (herhangi bir metin, ör. "1")
 *   kaynak    : gazete/dergi adı (ör. "Yenigün")
 *   yil       : yıl metni (ör. "2024") — liste yıla göre sıralanır
 *   baslik    : haber başlığı
 *   img       : görsel yolu — /public içindeki dosya (ör. "/basin/haber-01.webp")
 *               veya tam bir URL (https://...)
 *   slug?     : verilirse /basin/<slug> detay sayfası açılır; verilmezse
 *               kart tıklanınca görsel büyütülür (lightbox)
 *   icerik?   : detay sayfası için HTML içerik
 *   seoTitle? : opsiyonel özel SEO başlığı
 *   seoDescription? : opsiyonel özel SEO açıklaması
 */
export const PRESS_ITEMS: PressItem[] = [
  // Örnek (kopyalayıp doldurun):
  // {
  //   id: "1",
  //   kaynak: "Yenigün",
  //   yil: "2024",
  //   baslik: "Konya'da hacamatın güvenilir adresi",
  //   img: "/basin/haber-01.webp",
  //   slug: "konyada-hacamatin-guvenilir-adresi",
  //   icerik: "<p>Haberin detayı...</p>",
  // },
];
