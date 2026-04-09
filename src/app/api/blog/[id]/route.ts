import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const snap = await getDoc(doc(db, "posts", id));
  if (!snap.exists()) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ id: snap.id, ...snap.data() });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  await updateDoc(doc(db, "posts", id), { ...body, updatedAt: serverTimestamp() });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteDoc(doc(db, "posts", id));
  return NextResponse.json({ ok: true });
}
