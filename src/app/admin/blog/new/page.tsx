"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye } from "lucide-react";
import RichEditor from "@/components/RichEditor";

export default function NewBlogPost() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Genel",
    seoTitle: "",
    seoDescription: "",
    published: false,
  });

  const slugify = (text: string) =>
    text.toLowerCase().trim()
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

  const handleTitleChange = (v: string) => {
    setForm(f => ({ ...f, title: v, slug: slugify(v), seoTitle: v }));
  };

  const handleSave = async (published: boolean) => {
    if (!form.title || !form.slug || !form.content) {
      alert("Başlık, slug ve içerik zorunludur.");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, published }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      alert("Kayıt hatası.");
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" title="Admin Panele Dön" className="text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-bold">Yeni Blog Yazısı</h1>
        </div>
        <div className="flex gap-3">
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

        {/* Ana İçerik */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Başlık *</label>
            <input type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)}
              placeholder="Blog yazısı başlığı..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal/50 text-lg font-bold" />
          </div>

          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Özet</label>
            <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
              placeholder="Kısa özet (blog listesinde görünür)..."
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal/50 resize-none" />
          </div>

          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">İçerik *</label>
            <RichEditor
              value={form.content}
              onChange={v => setForm(f => ({ ...f, content: v }))}
              folder="blog"
              placeholder="Yazı içeriğini buraya yazın..."
            />
          </div>
        </div>

        {/* Sağ Panel */}
        <div className="space-y-4">

          {/* Slug */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Slug (URL) *</label>
            <input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-teal text-sm focus:outline-none focus:border-teal/50 font-mono" />
            <p className="text-white/30 text-[10px] mt-1">/blog/{form.slug || "..."}</p>
          </div>

          {/* Kategori */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Kategori</label>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-teal/50">
              {["Temel Bilgi", "Sağlık", "Uygulama", "Teknik", "Güvenlik", "Sülük", "Genel"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* SEO */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
            <h3 className="text-white font-bold text-sm flex items-center gap-2">
              <span className="w-2 h-[2px] bg-teal" /> SEO Ayarları
            </h3>
            <div>
              <label className="text-white/50 text-[10px] uppercase tracking-widest block mb-1">Meta Title</label>
              <input type="text" value={form.seoTitle} onChange={e => setForm(f => ({ ...f, seoTitle: e.target.value }))}
                placeholder="Google'da görünecek başlık"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-teal/50" />
              <p className={`text-[10px] mt-1 ${form.seoTitle.length > 60 ? "text-red-400" : "text-white/30"}`}>{form.seoTitle.length}/60</p>
            </div>
            <div>
              <label className="text-white/50 text-[10px] uppercase tracking-widest block mb-1">Meta Description</label>
              <textarea value={form.seoDescription} onChange={e => setForm(f => ({ ...f, seoDescription: e.target.value }))}
                placeholder="Google'da görünecek açıklama (max 160 karakter)"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-teal/50 resize-none" />
              <p className={`text-[10px] mt-1 ${form.seoDescription.length > 160 ? "text-red-400" : "text-white/30"}`}>{form.seoDescription.length}/160</p>
            </div>

            {/* Google Önizleme */}
            {(form.seoTitle || form.seoDescription) && (
              <div className="bg-white rounded-xl p-3 mt-2">
                <p className="text-[#1a0dab] text-sm font-medium leading-tight">{form.seoTitle || form.title || "Başlık"}</p>
                <p className="text-[#006621] text-[11px] mt-0.5">konyahacamat.net/blog/{form.slug}</p>
                <p className="text-[#545454] text-xs mt-1 leading-snug">{form.seoDescription || "Açıklama..."}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
