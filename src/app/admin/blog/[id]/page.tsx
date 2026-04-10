"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react";

interface Post {
  title: string; slug: string; excerpt: string; content: string;
  category: string; seoTitle: string; seoDescription: string; published: boolean;
}

export default function EditBlogPost() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Post>({
    title: "", slug: "", excerpt: "", content: "",
    category: "Genel", seoTitle: "", seoDescription: "", published: false,
  });

  useEffect(() => {
    fetch(`/api/blog/${id}`).then(r => r.json()).then(data => {
      setForm({
        title: data.title || "", slug: data.slug || "", excerpt: data.excerpt || "",
        content: data.content || "", category: data.category || "Genel",
        seoTitle: data.seoTitle || "", seoDescription: data.seoDescription || "",
        published: data.published || false,
      });
      setLoading(false);
    });
  }, [id]);

  const handleSave = async (published: boolean) => {
    setSaving(true);
    await fetch(`/api/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, published }),
    });
    setSaving(false);
    router.push("/admin");
  };

  const handleDelete = async () => {
    if (!confirm("Bu yazıyı silmek istediğinizden emin misiniz?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    router.push("/admin");
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white/50">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-white/50 hover:text-white"><ArrowLeft size={20} /></Link>
          <h1 className="font-bold">Yazıyı Düzenle</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={handleDelete} className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 rounded-xl text-sm hover:bg-red-500/20">
            <Trash2 size={14} />
          </button>
          <button onClick={() => handleSave(false)} disabled={saving}
            className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/15 disabled:opacity-50">
            <Save size={14} /> Taslak
          </button>
          <button onClick={() => handleSave(true)} disabled={saving}
            className="flex items-center gap-2 bg-teal text-anthracite-dark px-4 py-2 rounded-xl text-sm font-black hover:opacity-90 disabled:opacity-50">
            <Eye size={14} /> Yayınla
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Başlık</label>
            <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50 text-lg font-bold" />
          </div>
          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Özet</label>
            <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50 resize-none" />
          </div>
          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">İçerik</label>
            <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={20}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50 resize-y font-mono text-sm" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Slug</label>
            <input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-teal text-sm focus:outline-none font-mono" />
            <p className="text-white/30 text-[10px] mt-1">/blog/{form.slug}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Kategori</label>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none">
              {["Temel Bilgi", "Sağlık", "Uygulama", "Teknik", "Güvenlik", "Sülük", "Genel"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
            <h3 className="text-white font-bold text-sm">SEO Ayarları</h3>
            <div>
              <label className="text-white/50 text-[10px] uppercase tracking-widest block mb-1">Meta Title</label>
              <input type="text" value={form.seoTitle} onChange={e => setForm(f => ({ ...f, seoTitle: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none" />
              <p className={`text-[10px] mt-1 ${form.seoTitle.length > 60 ? "text-red-400" : "text-white/30"}`}>{form.seoTitle.length}/60</p>
            </div>
            <div>
              <label className="text-white/50 text-[10px] uppercase tracking-widest block mb-1">Meta Description</label>
              <textarea value={form.seoDescription} onChange={e => setForm(f => ({ ...f, seoDescription: e.target.value }))} rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none resize-none" />
              <p className={`text-[10px] mt-1 ${form.seoDescription.length > 160 ? "text-red-400" : "text-white/30"}`}>{form.seoDescription.length}/160</p>
            </div>
            {(form.seoTitle || form.seoDescription) && (
              <div className="bg-white rounded-xl p-3">
                <p className="text-[#1a0dab] text-sm font-medium">{form.seoTitle || form.title}</p>
                <p className="text-[#006621] text-[11px]">konyahacamat.net/blog/{form.slug}</p>
                <p className="text-[#545454] text-xs mt-1">{form.seoDescription}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
