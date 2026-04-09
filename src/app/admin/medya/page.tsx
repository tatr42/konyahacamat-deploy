"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Copy, Check, Trash2, FolderOpen } from "lucide-react";

const FOLDERS = ["basin", "galeri", "blog", "uploads"];

interface UploadedFile { url: string; fileName: string; }

export default function MedyaPage() {
  const [folder, setFolder] = useState("uploads");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (fileList: FileList) => {
    setUploading(true);
    const results: UploadedFile[] = [];
    for (const file of Array.from(fileList)) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        results.push(data);
      }
    }
    setFiles(prev => [...results, ...prev]);
    setUploading(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) upload(e.dataTransfer.files);
  }, [folder]);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const removeFromList = (url: string) => {
    setFiles(prev => prev.filter(f => f.url !== url));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center gap-3">
        <Link href="/admin/dashboard" className="text-white/50 hover:text-white"><ArrowLeft size={20} /></Link>
        <h1 className="font-bold">Medya Yöneticisi</h1>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-6">

        {/* Klasör Seçimi */}
        <div className="flex flex-wrap gap-2">
          {FOLDERS.map(f => (
            <button key={f} onClick={() => setFolder(f)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                folder === f ? "bg-teal text-anthracite-dark" : "bg-white/5 border border-white/10 text-white/60 hover:border-teal/30 hover:text-teal"
              }`}>
              <FolderOpen size={14} /> /{f}
            </button>
          ))}
        </div>

        {/* Upload Alanı */}
        <div
          onDrop={handleDrop}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
            dragOver ? "border-teal bg-teal/5" : "border-white/10 hover:border-teal/30 hover:bg-white/3"
          }`}>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => e.target.files && upload(e.target.files)}
          />
          <Upload size={32} className={`mx-auto mb-3 ${dragOver ? "text-teal" : "text-white/30"}`} />
          <p className="text-white font-bold">{uploading ? "Yükleniyor ve WebP'ye dönüştürülüyor..." : "Dosyaları sürükleyin veya tıklayın"}</p>
          <p className="text-white/30 text-sm mt-1">PNG, JPG, JPEG → otomatik WebP dönüşümü</p>
          <p className="text-teal text-xs mt-2 font-bold uppercase tracking-widest">Hedef: /public/{folder}/</p>
        </div>

        {/* Yüklenen Dosyalar */}
        {files.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="text-white font-bold">Bu Oturumda Yüklenenler ({files.length})</h2>
              <p className="text-white/30 text-xs mt-1">Sayfa yenilenince liste sıfırlanır, dosyalar public klasöründe kalır.</p>
            </div>
            <div className="divide-y divide-white/5">
              {files.map(f => (
                <div key={f.url} className="flex items-center gap-4 px-5 py-3">
                  <img src={f.url} alt={f.fileName} className="w-14 h-14 object-cover rounded-lg bg-white/5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">{f.fileName}</div>
                    <div className="text-teal text-xs font-mono mt-0.5">{f.url}</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => copyUrl(f.url)}
                      className={`p-2 rounded-lg transition-colors ${copied === f.url ? "bg-teal/20 text-teal" : "bg-white/5 text-white/50 hover:text-white"}`}>
                      {copied === f.url ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                    <button onClick={() => removeFromList(f.url)}
                      className="p-2 rounded-lg bg-white/5 text-white/30 hover:text-red-400 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bilgi */}
        <div className="bg-white/3 border border-white/5 rounded-xl p-4 text-white/40 text-xs space-y-1">
          <p>• Tüm görseller otomatik olarak <strong className="text-white/60">WebP</strong> formatına dönüştürülür (%85 kalite)</p>
          <p>• Dosyalar <strong className="text-white/60">public/{folder}/</strong> klasörüne kaydedilir</p>
          <p>• URL'yi kopyalayıp blog içeriği veya basın sayfasında kullanabilirsiniz</p>
        </div>

      </div>
    </div>
  );
}
