import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection, addDoc, getDocs, serverTimestamp, query, orderBy,
} from "firebase/firestore";

export async function GET() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  const posts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const doc = await addDoc(collection(db, "posts"), {
    ...body,
    createdAt: serverTimestamp(),
    views: 0,
    published: body.published ?? false,
  });
  return NextResponse.json({ id: doc.id });
}
