"use client";
import { useEffect, useState } from "react";

/**
 * Görüntülenme sayacı — Firebase kaldırıldı, sayaç artık tarayıcı
 * tabanlıdır (localStorage). Her yazı için ziyaretçinin kendi
 * tarayıcısında tutulan sayı gösterilir; sunucuda saklanmaz.
 */
export default function ViewCounter({ slug, initialCount }: { slug: string; initialCount: number }) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const key = `blog_views_${slug}`;
    const stored = Number(localStorage.getItem(key) ?? "0") + 1;
    localStorage.setItem(key, String(stored));
    setCount(initialCount + stored);
  }, [slug, initialCount]);

  return <span>{count} görüntüleme</span>;
}
