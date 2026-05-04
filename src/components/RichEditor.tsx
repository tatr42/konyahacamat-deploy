"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import {
  Bold, Italic, Underline, Strikethrough,
  Heading1, Heading2, Heading3, Type,
  AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Link2, Image, Video, Code,
  X, Upload, Check,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  folder?: string;
  placeholder?: string;
}

export default function RichEditor({
  value,
  onChange,
  folder = "blog",
  placeholder = "İçeriği buraya yazın...",
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initializedRef = useRef(false);
  const savedRange = useRef<Range | null>(null);

  const [htmlMode, setHtmlMode] = useState(false);
  const [htmlText, setHtmlText] = useState("");
  const [imgModal, setImgModal] = useState<"closed" | "choose" | "url" | "uploading">("closed");
  const [imgUrl, setImgUrl] = useState("");
  const [linkModal, setLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("https://");
  const [videoModal, setVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  /* ── Initialize content from prop ── */
  useEffect(() => {
    if (editorRef.current && !initializedRef.current && value !== "") {
      editorRef.current.innerHTML = value;
      initializedRef.current = true;
    }
  }, [value]);

  /* ── Core helpers ── */
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) savedRange.current = sel.getRangeAt(0).cloneRange();
  };
  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && savedRange.current) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }
  };

  const exec = useCallback(
    (cmd: string, val?: string) => {
      editorRef.current?.focus();
      document.execCommand(cmd, false, val ?? "");
      if (editorRef.current) onChange(editorRef.current.innerHTML);
    },
    [onChange]
  );

  const insertHTML = useCallback(
    (html: string) => {
      editorRef.current?.focus();
      document.execCommand("insertHTML", false, html);
      if (editorRef.current) onChange(editorRef.current.innerHTML);
    },
    [onChange]
  );

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  /* ── HTML mode toggle ── */
  const toggleHtml = () => {
    if (!htmlMode) {
      setHtmlText(editorRef.current?.innerHTML ?? "");
      setHtmlMode(true);
    } else {
      if (editorRef.current) {
        editorRef.current.innerHTML = htmlText;
        onChange(htmlText);
      }
      setHtmlMode(false);
    }
  };

  /* ── Image upload ── */
  const uploadFile = async (file: File) => {
    setImgModal("uploading");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const { url } = await res.json();
      restoreSelection();
      insertHTML(`<img src="${url}" alt="" style="max-width:100%;height:auto;border-radius:8px;margin:8px 0;" />`);
    } catch (e) {
      alert("Yükleme hatası: " + e);
    }
    setImgModal("closed");
  };

  const insertImgUrl = () => {
    if (!imgUrl.trim()) return;
    restoreSelection();
    insertHTML(`<img src="${imgUrl}" alt="" style="max-width:100%;height:auto;border-radius:8px;margin:8px 0;" />`);
    setImgUrl("");
    setImgModal("closed");
  };

  /* ── Link insert ── */
  const insertLink = () => {
    if (!linkUrl.trim()) return;
    restoreSelection();
    exec("createLink", linkUrl);
    setLinkUrl("https://");
    setLinkModal(false);
  };

  /* ── Video embed ── */
  const insertVideo = () => {
    const match = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (!match) { alert("Geçerli bir YouTube URL'si girin."); return; }
    restoreSelection();
    insertHTML(
      `<div style="position:relative;padding-bottom:56.25%;height:0;margin:12px 0;">` +
      `<iframe src="https://www.youtube.com/embed/${match[1]}" ` +
      `style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:8px;" ` +
      `frameborder="0" allowfullscreen></iframe></div>`
    );
    setVideoUrl("");
    setVideoModal(false);
  };

  /* ── Toolbar button ── */
  const Btn = ({
    onClick, title, active, children,
  }: { onClick: () => void; title: string; active?: boolean; children: React.ReactNode }) => (
    <button
      type="button"
      title={title}
      onMouseDown={e => { e.preventDefault(); onClick(); }}
      className={`p-1.5 rounded-lg transition-all hover:bg-white/15 ${
        active ? "bg-teal/20 text-teal" : "text-white/70 hover:text-white"
      }`}
    >
      {children}
    </button>
  );

  const Sep = () => <span className="w-px h-5 bg-white/10 mx-0.5 shrink-0" />;

  /* ── Render ── */
  return (
    <>
      <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5 focus-within:border-teal/40 transition-colors">

        {/* ── Toolbar ── */}
        <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-white/10 bg-white/[0.03]">

          <Btn onClick={() => exec("bold")}           title="Kalın (Ctrl+B)"><Bold size={14} /></Btn>
          <Btn onClick={() => exec("italic")}         title="İtalik (Ctrl+I)"><Italic size={14} /></Btn>
          <Btn onClick={() => exec("underline")}      title="Altı Çizili"><Underline size={14} /></Btn>
          <Btn onClick={() => exec("strikeThrough")}  title="Üstü Çizili"><Strikethrough size={14} /></Btn>

          <Sep />

          <Btn onClick={() => exec("formatBlock", "h1")} title="Büyük Başlık (H1)"><Heading1 size={14} /></Btn>
          <Btn onClick={() => exec("formatBlock", "h2")} title="Orta Başlık (H2)"><Heading2 size={14} /></Btn>
          <Btn onClick={() => exec("formatBlock", "h3")} title="Küçük Başlık (H3)"><Heading3 size={14} /></Btn>
          <Btn onClick={() => exec("formatBlock", "p")}  title="Normal Metin"><Type size={14} /></Btn>

          <Sep />

          <Btn onClick={() => exec("insertUnorderedList")} title="Madde Listesi"><List size={14} /></Btn>
          <Btn onClick={() => exec("insertOrderedList")}   title="Numaralı Liste"><ListOrdered size={14} /></Btn>

          <Sep />

          <Btn onClick={() => exec("justifyLeft")}   title="Sola Hizala"><AlignLeft size={14} /></Btn>
          <Btn onClick={() => exec("justifyCenter")} title="Ortala"><AlignCenter size={14} /></Btn>
          <Btn onClick={() => exec("justifyRight")}  title="Sağa Hizala"><AlignRight size={14} /></Btn>

          <Sep />

          <Btn onClick={() => { saveSelection(); setLinkModal(true); }}  title="Link Ekle"><Link2 size={14} /></Btn>
          <Btn onClick={() => { saveSelection(); setImgModal("choose"); }} title="Fotoğraf Ekle"><Image size={14} /></Btn>
          <Btn onClick={() => { saveSelection(); setVideoModal(true); }} title="YouTube Video Ekle"><Video size={14} /></Btn>

          <span className="flex-1" />
          <Btn onClick={toggleHtml} title="HTML Kodu Görüntüle / Düzenle" active={htmlMode}><Code size={14} /></Btn>
        </div>

        {/* ── Editable area ── */}
        {htmlMode ? (
          <textarea
            value={htmlText}
            onChange={e => { setHtmlText(e.target.value); onChange(e.target.value); }}
            rows={18}
            spellCheck={false}
            className="w-full bg-transparent px-4 py-3 text-emerald-400 font-mono text-xs focus:outline-none resize-y"
            placeholder="Ham HTML kodu..."
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            data-placeholder={placeholder}
            className="rich-editor-area min-h-[300px] px-4 py-4 text-white/80 focus:outline-none leading-relaxed
              [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:my-3
              [&_h2]:text-xl  [&_h2]:font-bold [&_h2]:text-white [&_h2]:my-2
              [&_h3]:text-lg  [&_h3]:font-bold [&_h3]:text-white [&_h3]:my-2
              [&_strong]:text-white [&_strong]:font-bold
              [&_em]:italic
              [&_u]:underline
              [&_s]:line-through
              [&_ul]:list-disc   [&_ul]:pl-6 [&_ul]:my-2 [&_ul]:text-white/70
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 [&_ol]:text-white/70
              [&_a]:text-teal [&_a]:underline
              [&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-2
              [&_iframe]:w-full [&_iframe]:rounded-lg"
          />
        )}
      </div>

      {/* ── Image Modal ── */}
      {imgModal !== "closed" && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/15 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-white">Fotoğraf Ekle</h3>
              <button onClick={() => setImgModal("closed")} aria-label="Kapat" className="text-white/70 hover:text-white"><X size={18} /></button>
            </div>

            {imgModal === "uploading" && (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-white/70 text-sm">Yükleniyor, WebP&apos;ye dönüştürülüyor...</p>
              </div>
            )}

            {imgModal === "choose" && (
              <div className="space-y-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center gap-3 bg-white/5 border border-white/10 hover:border-teal/40 rounded-xl px-5 py-4 text-left transition-all"
                >
                  <Upload size={18} className="text-teal shrink-0" />
                  <div>
                    <div className="text-white font-bold text-sm">Dosya Yükle</div>
                    <div className="text-white/70 text-xs">PNG, JPG → otomatik WebP dönüşümü</div>
                  </div>
                </button>
                <button
                  onClick={() => setImgModal("url")}
                  className="w-full flex items-center gap-3 bg-white/5 border border-white/10 hover:border-teal/40 rounded-xl px-5 py-4 text-left transition-all"
                >
                  <Link2 size={18} className="text-white/40 shrink-0" />
                  <div>
                    <div className="text-white font-bold text-sm">URL ile Ekle</div>
                    <div className="text-white/70 text-xs">https://... veya /uploads/resim.webp</div>
                  </div>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => { if (e.target.files?.[0]) uploadFile(e.target.files[0]); }}
                />
              </div>
            )}

            {imgModal === "url" && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={imgUrl}
                  onChange={e => setImgUrl(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && insertImgUrl()}
                  placeholder="https://... veya /uploads/resim.webp"
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal/50"
                />
                {imgUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imgUrl} alt="önizleme"
                    className="w-full max-h-40 object-contain rounded-lg bg-white/5"
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                )}
                <div className="flex gap-3">
                  <button onClick={insertImgUrl}
                    className="flex items-center gap-2 bg-teal text-black px-5 py-2.5 rounded-xl font-black text-sm hover:opacity-90">
                    <Check size={14} /> Ekle
                  </button>
                  <button onClick={() => setImgModal("choose")}
                    className="bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/15">
                    Geri
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Link Modal ── */}
      {linkModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/15 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">Link Ekle</h3>
              <button onClick={() => setLinkModal(false)} aria-label="Kapat" className="text-white/70 hover:text-white"><X size={18} /></button>
            </div>
            <p className="text-white/70 text-xs mb-3">Önce metni seçin, sonra linki ekleyin.</p>
            <input
              type="text"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && insertLink()}
              placeholder="https://..."
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal/50 mb-4"
            />
            <div className="flex gap-3">
              <button onClick={insertLink}
                className="flex items-center gap-2 bg-teal text-black px-5 py-2.5 rounded-xl font-black text-sm hover:opacity-90">
                <Check size={14} /> Ekle
              </button>
              <button onClick={() => setLinkModal(false)}
                className="bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/15">
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Video Modal ── */}
      {videoModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/15 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">YouTube Video Ekle</h3>
              <button onClick={() => setVideoModal(false)} aria-label="Kapat" className="text-white/70 hover:text-white"><X size={18} /></button>
            </div>
            <input
              type="text"
              value={videoUrl}
              onChange={e => setVideoUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && insertVideo()}
              placeholder="https://www.youtube.com/watch?v=..."
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal/50 mb-4"
            />
            <div className="flex gap-3">
              <button onClick={insertVideo}
                className="flex items-center gap-2 bg-teal text-black px-5 py-2.5 rounded-xl font-black text-sm hover:opacity-90">
                <Check size={14} /> Ekle
              </button>
              <button onClick={() => setVideoModal(false)}
                className="bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/15">
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
