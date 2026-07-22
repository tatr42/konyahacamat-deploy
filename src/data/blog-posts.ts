import type { Post } from "@/lib/posts";

/**
 * Blog yazıları — ELLE düzenlenir.
 *
 * Firebase/Firestore kaldırıldı; yazılar artık bu dosyadan okunur.
 * Yeni yazı eklemek için aşağıdaki listeye bir nesne ekleyin.
 * Sadece `published: true` olan yazılar sitede görünür.
 *
 * Alanlar:
 *   id          : benzersiz bir kimlik (herhangi bir metin, ör. "1")
 *   slug        : URL parçası — /blog/<slug> (küçük harf, tireli)
 *   title       : başlık
 *   excerpt     : kısa özet (liste ve meta açıklama için)
 *   content     : HTML içerik (<p>, <h2>, <ul> ... kullanabilirsiniz)
 *   category    : kategori etiketi (ör. "Hacamat Nedir?")
 *   published   : true → yayında, false → taslak (gizli)
 *   createdAt   : { seconds: <unix-saniye> } — tarih (sıralama + görünüm)
 *   updatedAt?  : opsiyonel güncelleme tarihi (sitemap için)
 *   seoTitle?   : opsiyonel özel SEO başlığı
 *   seoDescription? : opsiyonel özel SEO açıklaması
 *
 * Unix saniyeyi bulmak için: Math.floor(Date.now()/1000) veya
 * https://www.unixtimestamp.com adresini kullanabilirsiniz.
 */
export const BLOG_POSTS: Post[] = [
  // Örnek (kopyalayıp doldurun, published: true yapın):
  // {
  //   id: "1",
  //   slug: "hacamat-nedir-nasil-yapilir",
  //   title: "Hacamat Nedir, Nasıl Yapılır?",
  //   excerpt: "Hacamatın tanımı, faydaları ve uygulama adımları.",
  //   content: "<p>Hacamat...</p><h2>Faydaları</h2><p>...</p>",
  //   category: "Hacamat Nedir?",
  //   published: true,
  //   createdAt: { seconds: 1737504000 },
  // },
];
