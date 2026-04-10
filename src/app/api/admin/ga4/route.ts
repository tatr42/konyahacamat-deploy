import { NextResponse } from "next/server";
import crypto from "crypto";

async function getAccessToken(): Promise<string | null> {
  const email = process.env.GA4_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GA4_PRIVATE_KEY;
  if (!email || !rawKey) return null;

  // Vercel bazen \n'leri zaten newline'a çevirir, bazen çevirmez — her ikisini de destekle
  const key = rawKey.includes("\\n") ? rawKey.replace(/\\n/g, "\n") : rawKey;
  const now = Math.floor(Date.now() / 1000);

  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({
    iss: email,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  })).toString("base64url");

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(`${header}.${payload}`);
  const signature = sign.sign(key, "base64url");
  const jwt = `${header}.${payload}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const data = await res.json();
  return data.access_token ?? null;
}

async function ga4Report(token: string, propertyId: string, body: object) {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  return res.json();
}

export async function GET() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const email = process.env.GA4_SERVICE_ACCOUNT_EMAIL;

  if (!propertyId || !email) {
    return NextResponse.json({ configured: false });
  }

  try {
    const token = await getAccessToken();
    if (!token) return NextResponse.json({ configured: false, error: "Token alınamadı — private key veya email hatalı olabilir" });

    const [countriesData, pagesData, overviewData] = await Promise.all([
      ga4Report(token, propertyId, {
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        dimensions: [{ name: "countryId" }, { name: "country" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, descending: true }],
        limit: 12,
      }),
      ga4Report(token, propertyId, {
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, descending: true }],
        limit: 10,
      }),
      ga4Report(token, propertyId, {
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        metrics: [
          { name: "sessions" },
          { name: "activeUsers" },
          { name: "screenPageViews" },
          { name: "bounceRate" },
        ],
      }),
    ]);

    const countries = (countriesData.rows ?? []).map((r: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }) => ({
      code: r.dimensionValues[0].value,
      name: r.dimensionValues[1].value,
      sessions: parseInt(r.metricValues[0].value),
    }));

    const pages = (pagesData.rows ?? []).map((r: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }) => ({
      path: r.dimensionValues[0].value,
      views: parseInt(r.metricValues[0].value),
    }));

    const overview = overviewData.rows?.[0]?.metricValues ?? [];
    const summary = {
      sessions: parseInt(overview[0]?.value ?? "0"),
      users: parseInt(overview[1]?.value ?? "0"),
      pageviews: parseInt(overview[2]?.value ?? "0"),
      bounceRate: parseFloat(overview[3]?.value ?? "0"),
    };

    return NextResponse.json({ configured: true, countries, pages, summary });
  } catch (err) {
    const msg = String(err);
    console.error("GA4 API hatası:", msg);
    return NextResponse.json({ configured: false, error: msg });
  }
}
