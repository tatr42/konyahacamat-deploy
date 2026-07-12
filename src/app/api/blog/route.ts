export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { queryCollection } from "@/lib/firestore-rest";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";

async function isAuthorized() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_auth")?.value;
  const session = await verifySession(token);
  return !!session;
}

export async function GET() {
  // Admin paneli taslaklari da listeler; bu yuzden published filtresi yok.
  // Vercel'de SDK'nin gRPC baglantisi calismadigi icin REST katmani kullanilir.
  try {
    const posts = await queryCollection("posts", {
      orderBy: { field: "createdAt", desc: true },
    });
    return NextResponse.json(posts);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Firestore GET /blog hatası:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!db) return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
  const body = await req.json();
  const doc = await addDoc(collection(db, "posts"), {
    ...body,
    createdAt: serverTimestamp(),
    views: 0,
    published: body.published ?? false,
  });
  return NextResponse.json({ id: doc.id });
}
