"use client";
import { useEffect, useState } from "react";

export default function ViewCounter({ slug, initialCount }: { slug: string; initialCount: number }) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    fetch(`/api/views/${slug}`, { method: "POST" }).then(() => {
      setCount(c => c + 1);
    });
  }, [slug]);

  return <span>{count} görüntüleme</span>;
}
