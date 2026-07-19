import type { MetadataRoute } from "next";

const BASE = "https://www.konyahacamat.net";

// Admin paneli ve API uçları hiçbir botta taranmamalı.
const DISALLOW = ["/admin", "/admin/", "/admin/*", "/api/", "/api/*"];

/**
 * Yapay zekâ arama/asistan botları — AI cevaplarında ALINTILANMAK için
 * açıkça serbest bırakılıyor. (Zaten "*" ile serbestler; bu açık liste niyeti
 * belgeler ve ileride "*" kısıtlansa bile bu botların erişimini korur.)
 */
const AI_BOTS = [
  // Cevap / arama motorları — AI sonuçlarında alıntı için en kritik olanlar
  "OAI-SearchBot", //     OpenAI ChatGPT arama indeksi
  "ChatGPT-User", //      ChatGPT kullanıcı tetikli erişim
  "Claude-SearchBot", //  Anthropic Claude arama
  "Claude-User", //       Claude kullanıcı tetikli erişim
  "PerplexityBot", //     Perplexity indeks
  "Perplexity-User", //   Perplexity kullanıcı tetikli erişim
  "Google-Extended", //   Google Gemini / AI Overviews
  "Applebot-Extended", // Apple Intelligence
  // Eğitim / tarama botları — model bilgisine dahil olma
  "GPTBot", //            OpenAI
  "ClaudeBot", //         Anthropic
  "anthropic-ai", //      Anthropic (eski)
  "CCBot", //             Common Crawl (birçok LLM kullanır)
  "Amazonbot", //         Amazon
  "Bytespider", //        ByteDance / Doubao
  "cohere-ai", //         Cohere
  "Meta-ExternalAgent", // Meta AI
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_BOTS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
