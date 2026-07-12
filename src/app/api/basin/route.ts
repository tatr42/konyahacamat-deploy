export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getPressItems } from "@/lib/press";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";

async function isAuthorized() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_auth")?.value;
  const session = await verifySession(token);
  return !!session;
}

export async function GET() {
  // Vercel'de SDK'nin gRPC baglantisi calismadigi icin REST katmani kullanilir
  const items = await getPressItems();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!db) return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    const body = await req.json();
    const docRef = await addDoc(collection(db, "press"), { ...body, createdAt: serverTimestamp() });
    return NextResponse.json({ id: docRef.id });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Firebase POST /basin hatası:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
