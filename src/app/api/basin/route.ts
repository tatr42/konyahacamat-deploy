export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from "firebase/firestore";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";

async function isAuthorized() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_auth")?.value;
  const session = await verifySession(token);
  return !!session;
}

export async function GET() {
  try {
    if (!db) return NextResponse.json([], { status: 200 });
    const q = query(collection(db, "press"), orderBy("yil", "desc"));
    const snap = await getDocs(q);
    return NextResponse.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Firebase GET /basin hatası:", msg);
    return NextResponse.json([], { status: 200 });
  }
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
