import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!db) return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
  const { id } = await params;
  const body = await req.json();
  await updateDoc(doc(db, "press", id), body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!db) return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
  const { id } = await params;
  await deleteDoc(doc(db, "press", id));
  return NextResponse.json({ ok: true });
}
