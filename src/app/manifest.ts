import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ebusadullah Hacamat & Akademi",
    short_name: "Konya Hacamat",
    description: "Konya Meram'da 32+ yıllık tecrübeyle profesyonel hacamat ve sülük terapisi hizmeti, uluslararası sertifikalı eğitimler.",
    start_url: "/",
    display: "standalone",
    background_color: "#121417",
    theme_color: "#121417",
    lang: "tr",
    icons: [
      {
        src: "/fav.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        src: "/fav.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}
