/**
 * DİNAMİK OG KARTI — 1200×630 sosyal paylaşım görseli.
 *
 * NEDEN VAR:
 *   Statik sayfalar paylaşımda `/logo.webp`'i (bir logo) 1200×630 diye
 *   bildiriyordu; WhatsApp/Twitter/LinkedIn önizlemesi bozuk ve markasız
 *   çıkıyordu. Bu route, sayfa başlığına özel, markalı bir kart üretir.
 *
 *   pSEO il/ilçe sayfaları GERÇEK ürün fotoğrafı kullandığı için buraya
 *   bağlanmaz (fotoğraf, jenerik karttan iyidir). Bu route yalnızca statik
 *   sayfalar ve marka geneli içindir — `@/lib/og` üzerinden çağrılır.
 *
 * KULLANIM: /og?title=...&eyebrow=...
 *   title   : büyük başlık (zorunlu; yoksa marka başlığı)
 *   eyebrow : üstteki küçük teal etiket (opsiyonel)
 *
 * Not: /api altında DEĞİL — robots.ts `/api/*` yolunu kapatıyor; OG görselinin
 * Google Görseller ve önizleme botlarınca çekilebilmesi için kök `/og`.
 */

import { ImageResponse } from "next/og";

export const runtime = "nodejs";

// Tasarım tokenları (globals.css ile aynı)
const ANTHRACITE_DARK = "#0f1219";
const ANTHRACITE = "#1a1f2e";
const TEAL = "#2dd4c0";
const GOLD = "#d4a853";

const BRAND = "Ebusadullah Hacamat & Akademi";
const SITE = "konyahacamat.net";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title =
    (searchParams.get("title") || "").slice(0, 120) ||
    "Konya Sülük Terapisi & Hacamat";
  const eyebrow = (searchParams.get("eyebrow") || "").slice(0, 60);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `radial-gradient(1000px 500px at 15% 20%, rgba(45,212,192,0.14), transparent 60%), linear-gradient(135deg, ${ANTHRACITE} 0%, ${ANTHRACITE_DARK} 70%)`,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Dekoratif halka */}
        <div
          style={{
            position: "absolute",
            top: "-160px",
            right: "-120px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            border: `2px solid rgba(45,212,192,0.15)`,
            display: "flex",
          }}
        />

        {/* Üst: marka satırı */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: TEAL,
              color: ANTHRACITE_DARK,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "34px",
              fontWeight: 800,
            }}
          >
            E
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "white",
                fontSize: "26px",
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              {BRAND}
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "18px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              {SITE}
            </span>
          </div>
        </div>

        {/* Orta: başlık */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {eyebrow ? (
            <span
              style={{
                color: TEAL,
                fontSize: "24px",
                fontWeight: 800,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              {eyebrow}
            </span>
          ) : null}
          <span
            style={{
              color: "white",
              fontSize: title.length > 60 ? "60px" : "76px",
              fontWeight: 800,
              lineHeight: 1.08,
              display: "flex",
              maxWidth: "980px",
            }}
          >
            {title}
          </span>
          <div
            style={{
              width: "120px",
              height: "6px",
              borderRadius: "4px",
              background: `linear-gradient(90deg, ${TEAL}, ${GOLD})`,
              display: "flex",
            }}
          />
        </div>

        {/* Alt: güven şeridi */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {["32+ Yıl Deneyim", "CE Steril Malzeme", "81 İle Kargo"].map((t) => (
            <div
              key={t}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: TEAL,
                  display: "flex",
                }}
              />
              <span
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontSize: "22px",
                  fontWeight: 600,
                }}
              >
                {t}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
