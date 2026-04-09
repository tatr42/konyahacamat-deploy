"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Loader2 } from 'lucide-react';

interface Post { id: string; slug: string; title: string; excerpt: string; category: string; createdAt?: { seconds: number }; }

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setPosts(data.filter((p: Post & { published?: boolean }) => p.published)); })
      .finally(() => setYukleniyor(false));
  }, []);

  return (
    <>
      {yukleniyor ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={32} className="text-teal animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-24 text-white/30">
          <p className="text-lg">Henüz blog yazısı yayınlanmamış.</p>
          <p className="text-sm mt-2">Admin panelinden yazı ekleyebilirsiniz.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}
              className="group bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-teal/30 hover:bg-white/[0.08] transition-all duration-300 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-teal uppercase tracking-widest bg-teal/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                {post.createdAt && (
                  <div className="flex items-center gap-1 text-white/30 text-[11px]">
                    <Clock size={12} />
                    <span>{new Date(post.createdAt.seconds * 1000).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</span>
                  </div>
                )}
              </div>
              <h2 className="text-white font-bold text-xl group-hover:text-teal transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed flex-1">{post.excerpt}</p>
              <div className="flex items-center gap-2 text-teal text-[12px] font-black uppercase tracking-widest mt-2">
                <BookOpen size={14} /> Devamını Oku
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
