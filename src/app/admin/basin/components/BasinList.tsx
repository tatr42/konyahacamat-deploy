import { PressItem } from "../types";
import { Pencil, Trash2 } from "lucide-react";

interface BasinListProps {
  items: PressItem[];
  loading: boolean;
  openEdit: (item: PressItem) => void;
  handleDelete: (id: string) => void;
}

export function BasinList({ items, loading, openEdit, handleDelete }: BasinListProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-white font-bold">Haberler</h2>
      </div>

      {loading ? (
        <div className="p-8 text-center text-white/30 text-sm">Yükleniyor...</div>
      ) : items.length === 0 ? (
        <div className="p-8 text-center text-white/30 text-sm">Henüz haber eklenmedi.</div>
      ) : (
        <div className="divide-y divide-white/5">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between px-5 py-4 hover:bg-white/3">
              <div className="flex items-center gap-4 min-w-0">
                {item.img && (
                  <img src={item.img} alt="" className="w-12 h-14 object-cover rounded-lg bg-white/5 shrink-0" />
                )}
                <div className="min-w-0">
                  <div className="text-white font-medium text-sm truncate">{item.baslik}</div>
                  <div className="text-teal text-xs mt-0.5">{item.kaynak} · {item.yil}</div>
                  {item.slug && (
                    <a href={`/basin/${item.slug}`} target="_blank" rel="noopener noreferrer"
                      className="text-white/30 text-[10px] font-mono hover:text-teal mt-0.5 inline-block" title={`View ${item.baslik}`}>
                      /basin/{item.slug}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <button onClick={() => openEdit(item)}
                  className="text-white/40 hover:text-teal transition-colors p-2" title="Edit">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)}
                  className="text-white/40 hover:text-red-400 transition-colors p-2" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
