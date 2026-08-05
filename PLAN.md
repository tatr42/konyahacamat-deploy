# PLAN.md — Konyahacamat.net İyileştirme Yol Haritası

Bu doküman, sitedeki teknik borçları, yasal riskleri, SEO eksikliklerini ve UX/UI
kırıklarını gidermek için önceliklendirilmiş eylem planıdır.

**Durum işaretleri:** `[ ]` bekliyor · `[x]` tamam · `[!]` **dış veri bekliyor (bloke)**

---

## Sprint 1: Kritik Kırıklar ve Güvenlik / Şema Temelleri

- [x] **6. İşletme sabitleri tek kaynak (`src/lib/business.ts`)** — telefon, adres,
      sosyal medya, yıl/mezun sayısı tek merkezde. *Diğer maddelerin bağımlılık kökü,
      bu yüzden ilk yapıldı.*
- [x] **3. Çift WhatsApp widget** — `(site)/page.tsx` içindeki mükerrer render kaldırıldı;
      yalnızca `(site)/layout.tsx` üzerinden basılıyor.
- [x] **7. Footer nofollow** — kendi domainine verilen `nofollow`+`target=_blank`
      kaldırıldı, dahili `<Link>`'e çevrildi.
- [x] **4. JSON-LD mutlak URL'ler** — `url`, `image`, `logo` alanları mutlak URL oldu.
      (`metadataBase` JSON-LD'ye uygulanmaz.)
- [x] **5. Şema birleştirme** — root layout tek `MedicalBusiness` (`@id` ile);
      ana sayfadaki mükerrer ikinci işletme şeması kaldırıldı, `availableService`
      root şemaya taşındı.
- [x] **2. Blog tipografisi** — `.blog-article` CSS bloğu `globals.css`'e yazıldı
      (repo geleneği: `.press-article` ile aynı yaklaşım, yeni bağımlılık yok).
      Ölü `prose prose-invert` sınıfları kaldırıldı. Tarayıcıda doğrulandı:
      `p` margin-bottom 20px, `h2` 30px + `scroll-margin-top` 112px,
      `ul` list-style disc, `a` teal + underline.
- [x] **9b. Vercel Analytics** — `<Analytics />` render'ı tamamlandı (import ölüydü).
- [x] **1. `/kvkk` sayfası** — YAZILDI ve yayında (site geneli 404 kapandı).
      Kaynak: 6698 s. Kanun m.10 + "Aydınlatma Yükümlülüğünün Yerine Getirilmesinde
      Uyulacak Usul ve Esaslar Hakkında Tebliğ" (RG 10.03.2018/30356) m.4 —
      zorunlu 5 unsurun (a–d) tamamı ayrı bölüm olarak karşılandı; ayrıca özel
      nitelikli veri/açık rıza (m.6), yurt dışı aktarım (m.9), saklama süresi,
      başvuru usulü (30 gün) ve Kurul'a şikâyet hakkı eklendi. Sitemap'e girdi.
      İçerik uydurulmadı; kod incelemesiyle doğrulanan gerçek veri akışına dayanıyor
      (backend yok, form sunucuya POST etmiyor, 3. taraflar: Vercel/WhatsApp/Google Haritalar).
      **Yan düzeltme:** `/gizlilik` sayfasındaki "Google Analytics çerezleri
      kullanılmaktadır" beyanı YANLIŞTI (sitede GA yok, Vercel Analytics var) — düzeltildi.
      **Kalan (bloke değil, iyileştirme):** `BUSINESS.legalName` boş olduğu için veri
      sorumlusu ticari adla anılıyor. Yasal ünvan `src/lib/business.ts`'e yazıldığında
      sayfa otomatik günceller — tek satırlık iş.
- [!] **8. Geo koordinatları** — `layout.tsx` içinde TODO olarak duruyor. Yerel paket
      sıralaması için kritik. **Gerekli veri:** Google İşletme Profili pin'inden
      alınan KESİN lat/lng. *Şehir merkezi koordinatı kullanılmayacak.*
- [!] **9. GA4 / dönüşüm takibi** — sitede hiç ölçüm yok; tek dönüşüm kanalı olan
      WhatsApp ve `tel:` tıklamaları ölçülmüyor. **Gerekli veri:** GA4 Measurement ID.

---

## Sprint 2: Yasal / Kalite Riskleri ve İçerik Revizyonu

- [x] **1. Hastalık listesi → şikâyet listesi** — tamamlandı ve tarayıcıda doğrulandı.
      - `constants/diseases.ts`: tüm tanı adları şikâyet/semptom diline çevrildi;
        `diseases` alanı `complaints` olarak yeniden adlandırıldı; dosya başına
        bağlayıcı dil kuralı yazıldı. Ciddi tanılar (Epilepsi, Parkinson, Alzheimer,
        Bipolar, Kısırlık, Serviks, Göz Tansiyonu, Sedef, Romatoid Artrit…)
        **şikâyet biçiminde bile** eklenmedi — geciktirilmesi zarar veren tablolar.
      - Başlık: "Hangi Rahatsızlığa Şifa Sunuyoruz?" → **"Hangi Şikâyetlerle
        Başvuruluyor?"**; rozet "384+ Hastalık" → "Sık Gelen Şikâyetler".
      - `SafetyNotice` `components/SafetyNotice.tsx`'e çıkarıldı (client bundle'ı
        şişirmemek için) ve ana sayfadaki listenin altına eklendi. pSEO
        sayfalarındaki kullanım regresyonsuz doğrulandı.
      - Aynı iddianın diğer örnekleri: `AcademySection` "Ailenizin **Doktoru Olun**"
        + "384+ hastalığı **tedavi etmeyi öğrenin**" + "Hijyen Sertifikası";
        `PressSection` ve `/hakkimizda` içindeki çıplak "384 / Tedavi Alanı"
        istatistikleri. Hepsi düzeltildi.
      - `/hizmetler` ve `/hizmetler/hacamat` içindeki **atıflı** kullanım
        ("geleneksel kaynaklarda … belirtilmektedir") bilinçli olarak KORUNDU —
        kabul edilebilir çerçeve odur.
- [ ] **1b. Kalan YMYL ifadeleri (metadata + JSON-LD)** — aynı risk ailesi ama
      **anahtar kelime hedeflemesini etkilediği için karar senin**:
      - `(site)/page.tsx:38` FAQ şeması: "…**yüksek tansiyon**, migren, cilt
        hastalıkları… genel **detoks**" — tanı adları yapısal veride.
      - `(site)/page.tsx:18` + `hizmetler/suluk`: "varis, eklem, ödem ve dolaşım
        **tedavisi**" — hem `<title>`/description hem `MedicalTherapy` şemasında.
      - `almanya-hacamat`: "**%100** steril", "enfeksiyon riski olmadan tedavi imkanı".
- [x] **2. Müşteri yorumları** — tıbbi sonuç iddiaları ("%90 azalma", "migren geçti")
      hizmet/deneyim diline (hijyen, bilgilendirme, ortam) çevrildi; dosya başına
      YMYL kuralı yazıldı. **Kalan:** metinler hâlâ placeholder — Google İşletme
      Profili'ndeki gerçek, izinli yorumlarla değiştirilmeli. Gerçek yoruma
      geçilene kadar `Review`/`AggregateRating` şeması bağlanmayacak.
- [ ] **3. Galeri sayfası** — "Fotoğraflar yüklenme aşamasındadır." metni indekste;
      "Mezunlar" ve "Almanya" kategorileri boş; alt metinler "Hacamat seansı 1..9".
      Gerçek içerikle doldur **veya** `noindex` + sitemap dışı.
- [ ] **4. `llms.txt` yeniden üretimi** — statik dosya bayat: "uluslararası geçerli
      sertifika" ifadesi (kendi YMYL kuralınızın ihlali) + 301'lenmiş `/hacamat-nedir`,
      `/suluk-nedir` URL'leri. `src/app/llms.txt/route.ts` olarak `business.ts`'ten üret.
- [!] **5. Almanya sayfası doğrulaması** — metadata "Berlin" + "%100 Hijyenik" diyor,
      içerik/FAQ "Frankfurt, Köln, Stuttgart" diyor. **Gerekli bilgi:** gerçekten
      hizmet verilen şehirler.

---

## Sprint 3: Görsel Varlık Üretimi & Optimizasyon

- [ ] **1. Unsplash stok görsel temizliği** — 21 görsellik havuzun 20'si stok
      ("bitki çayı", "sıcak taş terapisi", "cerrahi eldiven"). 411 pSEO sayfasında
      4'erli basılıyor ve alt metni "Kadıköy adresine canlı sülük kargo paketi" gibi
      **yanıltıcı** oluyor. 15–20 gerçek fotoğraf (paketleme, kargo kutusu, sülük kabı,
      kupa seti, uygulama) ile havuzu tamamen değiştir.
- [x] **2. OG görseli** — statik `og-default.webp` yerine DİNAMİK kart tercih edildi:
      `src/app/og/route.tsx` (`next/og` ImageResponse) sayfa başlığına/türüne özel
      1200×630 markalı kart üretir; `src/lib/og.ts` yardımcısı üzerinden ~14 statik
      sayfa + root default + blog/basın detay bağlandı. pSEO il sayfaları gerçek ürün
      fotoğrafını korur. `/og` 200 + 1200×630 render tarayıcıda doğrulandı.
- [ ] **3. `next/image` sizes** — 32 `<Image>` kullanımının 21'inde `sizes` yok;
      `fill` kullananlarda zorunlu.
- [ ] **4. Favicon & manifest** — `fav.webp` 2000×2000 / 79 KB, WebP favicon her yerde
      desteklenmiyor. `icon.png` (32/180/512) + `manifest.webmanifest`.

---

## Sprint 4: SEO Derinleştirme

- [ ] **1. Blog statik üretim** — `blog/[slug]` için `generateStaticParams` +
      `dynamicParams = false`. Veri zaten statik; `revalidate = 300` kalıntıları da kalksın.
- [ ] **2. Article şeması** — `image`, `dateModified`, kişi bazlı `author` eksik.
- [ ] **3. Sitemap `lastmod`** — statik ve pSEO sayfalarında hiç yok.
- [ ] **4. `/malzemeler` ↔ `/kupa-malzemeleri`** — ikisi de ulusal "hacamat malzemeleri"
      niyetini hedefliyor (kanibalizasyon). Biri katalog/`Product`, diğeri il dizini
      olacak **veya** 301.
- [~] **5. Eksik şemalar** — pSEO il/ilçe sayfalarına hizmete göre `Product`
      (suluk-satisi / kupa-malzemeleri, FİYATSIZ — availability+brand+seller) ve
      `Course` (hacamat-kursu, provider + courseMode online/onsite) eklendi
      (`content.locationServiceSchema` → `LocationServicePage`). Tarayıcıda doğrulandı.
      **Kalan:** `WebSite`(+`SearchAction`), `Organization`, `ContactPage`, `ImageGallery`, `Event`.
- [x] **8. AI-özet ("Kısa Cevap") blokları** — her il/ilçe sayfasının tepesine hizmete
      + lokasyona özel 40–55 kelimelik soru-cevap özeti (`content.aiSummary`); AI
      Overviews/ChatGPT alıntısı ve öne çıkan snippet için. Uydurma fiyat/istatistik yok.
- [x] **9. Hacamat blog kümesi** — 3 yeni yazı: `hacamat-kimlere-yapilmaz`
      (kontrendikasyon, YMYL-güvenli), `hacamat-fiyatlari-neye-gore-degisir`,
      `suluk-mu-hacamat-mi-hangisi`. İç linkli, geçmiş tarih damgalı; blog listesi +
      sitemap + 200 render doğrulandı. Hacamat tarafındaki içerik boşluğunu kapatır.
- [ ] **6. Hub içerik dengesi** — `HUB_BODY` yalnızca `suluk-satisi` için dolu;
      `kupa-malzemeleri` hub'ı ince içerik durumunda.
- [x] **7. Hicri takvim doğruluğu** — DÜZELTİLDİ ve canlıda doğrulandı.
      Eski hesap ortalama ay uzunluğu (29.53059) + Jülyen epoch (`new Date(622,6,16)`)
      + yerel saat dilimi kullanıyordu; ölçülen sapma 1–2 gün.
      Yerine `Intl.DateTimeFormat("en-u-ca-islamic-umalqura")` (sıfır bağımlılık),
      UTC sabitlemesi, modül düzeyinde tek formatter + `Map` önbelleği
      (12 aylık ızgara ~420 hücre üretiyor, hücre başına formatter kurmak pahalıydı).
      Doğrulama: 2026'nın kalanında işaretli **30 faziletli günün tamamı** bağımsız
      kontrolü geçti (0 hata). Seçili güne "Hicri: 22 Safer" satırı eklendi.
      **Dürüstlük notu arayüze eklendi:** Ümmü'l-Kura ile Diyanet takvimi/rü'yet
      arasında bir gün fark olabileceği yazıyor — kaldırılmamalı.

---

## Sprint 5: Kod Hijyeni ve Mimari Temizlik

- [ ] **1. `business.ts` yayılımı** — kalan sabit telefon/adres/yıl kullanımları
      (11 dosyada tekrar eden numara dâhil) tek kaynağa bağlanacak.
- [ ] **2. `<Link>` migrasyonu** — `ServicesGrid`, `DiseaseTabs`, `HeroSection`,
      `iletisim`, `BasinClient` içindeki iç `<a href="/...">` kullanımları.
- [x] **3. İç içe `<main>`** — 14 sayfadaki ikinci `<main>` → `<div>`. Doğrulandı:
      derlenmiş HTML'de sayfa başına 1 `<main>`, `layout.tsx` dışında `<main>` yok.
- [ ] **4. Navbar a11y & animasyon** — masaüstü dropdown yalnızca CSS `:hover` ile
      açılıyor (klavye/dokunmatikte erişilemiyor), `aria-expanded`/`aria-haspopup` yok,
      `window.location.href` router'ı atlıyor; `animate-in`/`slide-in-from-*` sınıfları
      `tailwindcss-animate` kurulu olmadığı için no-op.
- [ ] **5. Ölü dosyalar & lint** — `sifre-guncelle.ps1` / `sifre-test.ps1` kaldırılmış
      `/api/admin/login`'e istek atıyor; `package.json`'da `lint` script'i var ama
      `eslint` kurulu değil; `test` script'i Windows'ta glob genişletemiyor ve
      `*.test.ts` dosyaları `tsc --noEmit`'te TS5097 veriyor.
- [ ] **6. pSEO ilçe kararı** — 147 ilçe sayfası üretiliyor ama `noindex`. Gerçek ilçe
      verisi eklenip `index`'e alınacak **veya** `KEPT_DISTRICTS = []` ile tamamen 301.
