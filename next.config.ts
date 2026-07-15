import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // Eski (Next.js öncesi) site yapısından kalan ölü URL'leri kalıcı olarak
  // (308) ilgili yeni sayfalara yönlendiriyoruz. Bu URL'ler Google'ın
  // indeksinde hâlâ duruyor ve şu an 404 veriyor; GSC'deki "Yeniden
  // yönlendirme hatası" ve "Bulunamadı (404)" sorunlarının kaynağı bunlar.
  async redirects() {
    return [
      // 1. ÖNCELİKLİ SPESİFİK — genel /hizmetlerimiz kuralından ÖNCE gelmeli,
      //    yoksa asla tetiklenmez.
      {
        source: "/hizmetlerimiz/haccam-ebusadullah-hakkinda-gixyrXiKX",
        destination: "/hakkimizda",
        permanent: true,
      },
      // 2. GENEL HİZMETLER AİLESİ — kalan tüm /hizmetlerimiz/... linkleri.
      //    (:path* alt yolları da yakalar; :slug yalnızca tek segment yakalardı)
      {
        source: "/hizmetlerimiz/:path*",
        destination: "/hizmetler",
        permanent: true,
      },
      // 3. ESKİ BÜYÜK HARFLİ "hacamatın faydaları/zararları" İÇERİK URL'LERİ
      //    → tek mevcut blog yazısı (faydaları+riskleri kapsıyor). Önek kuralı,
      //    NELERDIR / KIMLERE-YAPILMAZ / ...NOKTALARI... tüm varyantları yakalar.
      //    Not: /blog/hacamanin-faydalari-ve-zararlari ve /blog/hacamat-kimlere-yapilmaz
      //    henüz mevcut DEĞİL; o yazılar açılınca ayrı kurallara bölünebilir.
      {
        source: "/HACAMATIN-FAYDALARI-ZARARLARI-:rest",
        destination: "/blog/hacamat-nedir-tarihi-bilimsel-temelleri-ve-nasil-uygulanir",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
