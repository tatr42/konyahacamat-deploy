import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, increment } from "firebase/firestore";

export async function POST(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ref = doc(db, "views", slug);
  await setDoc(ref, { count: increment(1), slug }, { merge: true });
  return NextResponse.json({ ok: true });
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const snap = await getDoc(doc(db, "views", slug));
  return NextResponse.json({ count: snap.exists() ? snap.data().count : 0 });
}
