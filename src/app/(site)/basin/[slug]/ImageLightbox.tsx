"use client";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

export default function ImageLightbox({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="rounded-2xl overflow-hidden border border-white/10 mb-10 cursor-zoom-in relative group"
        onClick={() => setOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full object-contain max-h-[600px] bg-white/5"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={22} className="text-white" />
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/80 flex items-center justify-center transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
        </div>
      )}
    </>
  );
}
