import type { NextConfig } from "next";
import {
  assertKeptDistrictsValid,
  prunedDistrictRedirects,
  retiredServiceRedirects,
} from "./src/data/pseo-scope";

// Yol takma adı (@/) burada çözülmez — bu yüzden göreli import.
// Yazım hatası olan bir ilçe girişini sessizce 301'e düşürmek yerine build'i patlat.
assertKeptDistrictsValid();

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
  // Yönlendirmeler dosya sistemi route'larından ÖNCE değerlendirilir; bu yüzden
  // ilgili sayfa dosyaları henüz silinmemiş olsa bile kurallar tetiklenir.
  //
  // SIRA ÖNEMLİ — Next.js ilk eşleşen kuralı uygular:
  //   1. Eski (Next öncesi) ölü URL'ler
  //   2. Kapatılan "...nedir" siloları (wildcard)
  //   3. Budanan ilçeler (açık kurallar)
  async redirects() {
    return [
      // ── 1. ESKİ SİTE YAPISINDAN KALAN ÖLÜ URL'LER ───────────────────────
      // Bu URL'ler Google'ın indeksinde hâlâ duruyor ve GSC'de "Yeniden
      // yönlendirme hatası" / "Bulunamadı (404)" olarak raporlanıyordu.

      // 1a. ÖNCELİKLİ SPESİFİK — genel /hizmetlerimiz kuralından ÖNCE gelmeli,
      //     yoksa asla tetiklenmez.
      {
        source: "/hizmetlerimiz/haccam-ebusadullah-hakkinda-gixyrXiKX",
        destination: "/hakkimizda",
        permanent: true,
      },
      // 1b. GENEL HİZMETLER AİLESİ — kalan tüm /hizmetlerimiz/... linkleri.
      {
        source: "/hizmetlerimiz/:path*",
        destination: "/hizmetler",
        permanent: true,
      },
      // 1c. ESKİ BÜYÜK HARFLİ "hacamatın faydaları/zararları" URL'LERİ.
      //     DÜZELTİLDİ: hedef blog yazısı yoktu, zincir 308 → 404 veriyordu.
      //     Hedef artık src/data/blog-posts.ts içinde YAYINDA (pillar-hacamat).
      {
        source: "/HACAMATIN-FAYDALARI-ZARARLARI-:rest",
        destination: "/blog/hacamat-nedir-tarihi-bilimsel-temelleri-ve-nasil-uygulanir",
        permanent: true,
      },

      // ── 2. KAPATILAN "...NEDİR" SİLOLARI (832 sayfa → 2 pillar) ─────────
      // Kanibalizasyon gerekçesi ve hedefler: src/data/pseo-scope.ts
      ...retiredServiceRedirects(),

      // ── 3. BUDANAN İLÇELER (858 kural → ait olduğu il sayfası) ──────────
      // tr-locations'tan derleme anında türetilir; elle bakım gerektirmez.
      ...prunedDistrictRedirects(),
    ];
  },
};

export default nextConfig;
