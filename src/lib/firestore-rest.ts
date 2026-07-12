/**
 * Firestore REST API katmanı (sunucu tarafı okumalar için).
 *
 * Firebase JS SDK'sının gRPC bağlantısı Vercel serverless ortamında
 * kurulamıyor ("Could not reach Cloud Firestore backend"). REST API
 * düz HTTPS fetch kullandığı için her ortamda çalışır. Güvenlik
 * kuralları REST çağrılarında da aynen uygulanır.
 */

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

type FirestoreValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  timestampValue?: string;
  nullValue?: null;
  arrayValue?: { values?: FirestoreValue[] };
  mapValue?: { fields?: Record<string, FirestoreValue> };
};

/** Firestore REST değerini düz JS değerine çevirir. */
function decodeValue(v: FirestoreValue): unknown {
  if (v.stringValue !== undefined) return v.stringValue;
  if (v.integerValue !== undefined) return Number(v.integerValue);
  if (v.doubleValue !== undefined) return v.doubleValue;
  if (v.booleanValue !== undefined) return v.booleanValue;
  if (v.timestampValue !== undefined)
    return { seconds: Math.floor(Date.parse(v.timestampValue) / 1000) };
  if (v.arrayValue !== undefined)
    return (v.arrayValue.values ?? []).map(decodeValue);
  if (v.mapValue !== undefined) return decodeFields(v.mapValue.fields ?? {});
  return null;
}

function decodeFields(fields: Record<string, FirestoreValue>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(fields)) out[k] = decodeValue(v);
  return out;
}

export interface QueryOptions {
  /** { field, value } eşitlik filtresi (opsiyonel) */
  where?: { field: string; value: string | boolean | number };
  /** { field, desc } sıralama (opsiyonel) */
  orderBy?: { field: string; desc?: boolean };
  limit?: number;
}

/**
 * Bir koleksiyonda structured query çalıştırır, düz objeler döner.
 * Hata durumunda boş dizi döner (çağıran taraf loglamak isterse
 * throwOnError ile fırlatılabilir).
 */
export async function queryCollection(
  collectionId: string,
  opts: QueryOptions = {}
): Promise<Array<Record<string, unknown> & { id: string }>> {
  if (!PROJECT_ID || !API_KEY) return [];

  const structuredQuery: Record<string, unknown> = {
    from: [{ collectionId }],
  };
  if (opts.where) {
    const v =
      typeof opts.where.value === "boolean"
        ? { booleanValue: opts.where.value }
        : typeof opts.where.value === "number"
          ? { integerValue: String(opts.where.value) }
          : { stringValue: opts.where.value };
    structuredQuery.where = {
      fieldFilter: {
        field: { fieldPath: opts.where.field },
        op: "EQUAL",
        value: v,
      },
    };
  }
  if (opts.orderBy) {
    structuredQuery.orderBy = [
      {
        field: { fieldPath: opts.orderBy.field },
        direction: opts.orderBy.desc ? "DESCENDING" : "ASCENDING",
      },
    ];
  }
  if (opts.limit) structuredQuery.limit = opts.limit;

  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery?key=${API_KEY}`;
  // cache secenegi bilerek verilmiyor: ISR sayfalari kendi revalidate
  // suresini uygular, force-dynamic API route'lari her istekte taze calisir.
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ structuredQuery }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Firestore REST ${res.status}: ${msg.slice(0, 200)}`);
  }

  const rows: Array<{ document?: { name: string; fields?: Record<string, FirestoreValue> } }> =
    await res.json();

  return rows
    .filter(r => r.document)
    .map(r => ({
      id: r.document!.name.split("/").pop()!,
      ...decodeFields(r.document!.fields ?? {}),
    }));
}
