import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";

async function isAuthorized() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_auth")?.value;
  const session = await verifySession(token);
  return !!session;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!db) return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
  const { id } = await params;
  const body = await req.json();
  await updateDoc(doc(db, "press", id), body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!db) return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
  const { id } = await params;
  await deleteDoc(doc(db, "press", id));
  return NextResponse.json({ ok: true });
}
