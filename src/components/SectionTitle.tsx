interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
  className?: string;
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  light = false,
  center = false,
  className = "",
}: SectionTitleProps) {
  return (
    <div 
      className={`flex flex-col gap-5 ${center ? "items-center text-center mx-auto" : "items-start"} ${className}`}
    >
      {/* Üst Etiket (Label) */}
      {label && (
        <div className="flex items-center gap-3">
          {!center && <span className="w-8 h-px bg-teal/40" />}
          <span
            className={`text-[10px] md:text-xs uppercase tracking-[0.3em] font-black ${
              light ? "text-teal" : "text-teal-dark"
            }`}
          >
            {label}
          </span>
          {center && <span className="w-8 h-px bg-teal/40" />}
        </div>
      )}

      {/* Ana Başlık */}
      <h2
        className={`font-display text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight ${
          light ? "text-white" : "text-anthracite-dark"
        }`}
      >
        {title}
      </h2>

      {/* Alt Başlık / Açıklama */}
      {subtitle && (
        <p
          className={`text-base md:text-lg leading-relaxed max-w-2xl font-medium ${
            light ? "text-text-muted" : "text-warm-gray"
          }`}
        >
          {subtitle}
        </p>
      )}

      {/* Şık Bir Ayırıcı (Divider) */}
      <div className={`relative h-1 w-20 rounded-full overflow-hidden ${center ? "mx-auto" : ""}`}>
        <div className="absolute inset-0 bg-teal/20" />
        <div className="absolute inset-0 bg-teal w-1/2 rounded-full" />
      </div>
    </div>
  );
}