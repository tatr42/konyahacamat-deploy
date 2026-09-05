# PLAN.md — Konyahacamat.net Uzun Soluklu İyileştirme Yol Haritası & Stratejik SEO / GEO Rehberi

Bu doküman, projede tespit edilen teknik eksiklikleri, performans darboğazlarını, kanibalizasyon önleme yöntemlerini, yapay zeka (AI/GEO) içerik stratejisini ve içerik doluluğu eylem planını kapsayan **uzun soluklu master rehberdir**.

---

## 🚀 1. KODDA NE EKSİK VE AĞIRLIK YAPAN KODLAR (PERFORMANS & MİMARİ)

### A. Kodda Tespit Edilen Eksikler ve İyileştirme Alanları
1. **Dinamik Rota Önbelleklemesi (SSG & ISR & `React.cache`):**
   - Firebase/Firestore veritabanı sorguları her HTTP isteğinde tekrar çalıştırılmamalıdır.
   - `generateStaticParams()` kullanılarak tüm blog, basın ve hizmet sayfaları derleme (build) anında önceden üretilmeli (SSG), dynamic route'larda ise `export const dynamic = 'force-static'` veya ISR (`revalidate = 3600`) tercih edilmelidir.
   - Aynı istek yaşam döngüsünde birden fazla kez çağrılan veritabanı fonksiyonları `React.cache()` ile sarmalanmalıdır.

2. **İstemci Tarafı Durum & Hesaplama Karmaşıklığı (React Optimization):**
   - Karmaşık filtreleme, sıralama veya arama işlemleri barındıran istemci bileşenlerinde (ör. hastalık/şikayet filtreleri, şehir/ilçe seçimleri) türetilen veriler `useMemo` ve callback'ler `useCallback` ile koruma altına alınmalıdır.
   - Büyük liste renderlarında gereksiz DOM elementlerinden kaçınılmalıdır.

3. **Veritabanı Guard ve Hata Sınırları (Error Boundaries & Fallbacks):**
   - Vercel build aşamasında veya Firebase API anahtarları eksik olduğunda sayfa çökmesini önlemek için tüm Firebase istemcileri koşullu başlatılmalı (`process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? getFirestore(app) : null`) ve query fonksiyonları `if (!db) return null` denetimleri yapmalıdır.

4. **Yapay Zeka Crawler & LLM Endpoint'leri:**
   - OpenAI, Perplexity, Anthropic ve Google Gemini botlarının siteyi tarayıp doğru özetlemesi için `src/app/llms.txt/route.ts` dinamik route handler'ı güncel tutulmalıdır.

### B. Ağırlık Yapan Kodlar ve Temizlik Yöntemleri
1. **Senkron Third-Party Script'ler (Analytics, Pixel, Haritalar):**
   - `@next/third-parties/google` gibi kütüphaneler ana iş parçacığını (Main Thread) kilitleyerek Total Blocking Time (TBT) süresini yükseltmektedir.
   - Tüm analitik ve harita scriptleri Next.js `<Script strategy="lazyOnload">` ile ertelenmelidir.

2. **Görsel Yükü & LCP (Largest Contentful Paint) / CLS:**
   - Standart `<img>` etiketleri kesinlikle kullanılmamalı, Next.js `<Image>` bileşeni tercih edilmelidir.
   - Ekranın üst kısmında kalan (Above-the-fold) Hero görsellerine `priority` ve `fetchPriority="high"` verilmeli, responsive boyutlandırma için `sizes="(max-width: 768px) 100vw, 50vw"` doğru ayarlanmalıdır.

3. **CSS / JS Bundle Boyutu:**
   - Kullanılmayan CSS sınıfları ve kütüphaneleri elenmeli, Tailwind CSS 4 JIT mantığıyla minimal CSS üretimi sağlanmalıdır.
   - İkon kütüphanesinden (`lucide-react`) tüm paket yerine yalnızca kullanılan ikon bileşenleri import edilmelidir.

---

## 🌐 2. 2 SİTE BİRBİRİNİ ARAMADA NASIL GERİ ÇEKMEZ? (ÇİFTE DOMAIN & KANİBALİZASYON ÖNLEME)

Eğer aynı sektörde iki farklı alan adınız varsa (Örn: `konyahacamat.net` ve `konyahacamat.com.tr`):

### A. Net Niş ve Konumlandırma Ayrımı (Silo Mimarisi)
* **`konyahacamat.net` (Yerel Klinik & Randevu & Rehber):**
  - **Fokus:** Sadece Konya içi fiziksel klinik hizmetleri, hacamat & sülük randevuları, yerel konum, seans hazırlığı, şikayet/semptom destek rehberleri ve Almanya/Berlin gurbetçi yerinde hizmet bilgilendirmesi.
  - **Uzak Durulacak Alan:** Türkiye geneli hacamat eğitimi satışı veya sertifikasyon duyuruları bu sitede doğrudan sunulmaz.

* **`konyahacamat.com.tr` (Akademi & Eğitim & Tedarik):**
  - **Fokus:** Türkiye geneli (81 il + ilçeler) hacamat kursu, haccamlık eğitimi, akademi, sertifikasyon programları ve kupa/sülük malzemesi e-ticareti (`/hacamat-kursu`, `/hacamat-egitimi`).

### B. Yönlendirme ve Çapraz Bağlantı (Backlink) Kuralları
1. **301 Kalıcı Yönlendirmeler (`COMTR_LIVE` Mimarisi):**
   - `.net` üzerindeki eğitim ve kurs rotaları (`/hacamat-kursu/*`), `src/data/pseo-scope.ts` içerisindeki `transferredServiceRedirects()` fonksiyonu ile `COMTR_LIVE = true` durumunda `.com.tr` üzerindeki eşdeğer sayfalara 301 yönlendirilir.
2. **Kopyalanmış İçerikten (Duplicate Content) Kaçınma:**
   - İki sitede asla aynı paragrafı, makaleyi veya ürün açıklamasını yayınlamayın. Yapay zeka ile kelimeleri değiştirilmiş (spin edilmiş) metinler dahi Google SpamBrain tarafından tespit edilip her iki sitenin sıralamasını düşürür.
3. **Cross-Domain Canonical:**
   - Eğer bir içerik zorunlu olarak her iki sitede de geçiyorsa, orijinal kaynağı göstermek için `<link rel="canonical" href="https://www.konyahacamat.net/orijinal-sayfa" />` kullanılmalıdır.
4. **Spam Bağlantı (Reciprocal Links) Engeli:**
   - Header/Footer menülerinden tüm sayfaları kapsayan karşılıklı toplu bağlantı verilmemelidir. Bağlantılar yalnızca sayfa gövdesinden bağlamsal (contextual) olarak yönlendirilmelidir.

---

## 🤖 3. YAPAY ZEKA (AI) İÇERİKLERİNİN ANLAŞILMAMASI VE ÖNE ÇIKMASI (GEO / HELPFUL CONTENT / E-E-A-T)

Google'ın Helpful Content Update (HCU) ve E-E-A-T (Deneyim, Uzmanlık, Otorite, Güvenilirlik) güncellemeleri, sıfatlarla dolu jenerik AI metinlerini tespit edip arama sonuçlarında geriye itmektedir:

### A. Information Gain (Bilgi Kazanımı) İlkesi
* Sadece internetteki mevcut makaleleri özetleyen AI metinleri sıfır değer üretir.
* Metinlere **gerçek klinik tecrübeler, seans süresi detayları, sterilizasyon standartları, kupaların tutma süresi, kullanılan sarf malzemelerin kalitesi ve vaka gözlemleri** eklenerek makalenin internetteki diğer kaynaklardan daha fazla bilgi vermesi sağlanmalıdır.

### B. GEO (Generative Engine Optimization - AI Arama Motoru Optimizasyonu)
* ChatGPT, Perplexity ve Google AI Overviews gibi yapay zeka arama motorlarında kaynak gösterilmek ve ilk sırada çıkmak için:
  1. **AI-Özet / Kısa Cevap Blokları:** Makale başlarına veya H2 altlarına **40–50 kelimelik net, doğrudan yanıt veren bilgi kutuları** eklenmelidir.
  2. **Net ve Soru-Cevap Odaklı Yapı:** "Hacamat kaç dakika sürer?", "Hacamat sonrası banyo ne zaman yapılır?" gibi sorulara çekinmeden ve dolandırmadan net cevap verilmelidir.

### C. E-E-A-T Sinyalleri ve YMYL Sağlık Kuralları
1. **Uzman Biyografisi (Author Box):** Tüm blog ve rehber sayfalarında makaleyi kaleme alan haccam/uzmanın adı, deneyim yılı (`getYearsExpStr()`), sertifikaları ve fotoğrafı yer almalıdır.
2. **Yasal Tıp Uyarısı (Medical Disclaimer):** "Sitemizde yer alan bilgiler tanı ve tedavi amacı taşımaz, destekleyici geleneksel tıp bilgilendirmesidir." uyarısı her sağlık içeriğinde bulunmalıdır.
3. **Zengin Şema Markup (JSON-LD):**
   - `MedicalBusiness`, `FAQPage`, `HowTo` ve `Article` şemaları eksiksiz yapılandırılmalı; `acceptedAnswer` metinleri içerisinde dahili linkler (`<a>`) kullanılarak arama botlarının site içi dolaşımı kolaylaştırılmalıdır.

---

## 📝 4. EKLENMESİ GEREKEN İÇERİKLER VE İÇERİK DOLULUĞU

1. **Şikayet ve Semptom Odaklı Rehberler:**
   - Yasal çerçevede (tanı/tedavi iddiası bulunmadan) hazırlanan baş ağrısı, kronik yorgunluk, bel/boyun hassasiyeti, uyku kalitesi ve stres yönetimi destek rehberleri.
2. **Detaylı Hazırlık ve Sonrası Rehberleri (FAQ Clusters):**
   - Hacamat öncesi (12-24 saatlik diyet, hayvansal gıda kısıtlaması, açlık durumu) ve sonrası (banyo süresi, kantaron yağı kullanımı, dinlenme) adım adım kullanıcı rehberleri.
3. **Gerçek Varlık ve Görsel Kanıtlar:**
   - Stok fotoğraflar yerine klinik ortamı, sterilizasyon vakum cihazları, tek kullanımlık kupalar ve seans anını gösteren özgün fotoğraflar / kısa videolar.
4. **Almanya / Yurt Dışı Hizmet Sayfası:**
   - Almanya (Berlin vb.) gurbetçileri için Türkiye'ye seyahat etmelerine gerek kalmadan yerinde hizmet ve danışmanlık alabildiklerini açıklayan özel içerik alanı.

---

## 📅 SPRINT PLANLARI VE UYGULAMA DURUMU

**Durum işaretleri:** `[ ]` bekliyor · `[x]` tamam · `[!]` **dış veri bekliyor (bloke)**

### Sprint 1: Kritik Kırıklar ve Güvenlik / Şema Temelleri
- [x] **1.1. İşletme sabitleri tek kaynak (`src/lib/business.ts`)**
- [x] **1.2. Çift WhatsApp widget kaldırıldı**
- [x] **1.3. Footer nofollow düzeltildi**
- [x] **1.4. JSON-LD mutlak URL'ler sağlandı**
- [x] **1.5. Root şema birleştirildi (`MedicalBusiness`)**
- [x] **1.6. Blog tipografisi düzenlendi (`globals.css`)**
- [x] **1.7. Vercel Analytics aktif edildi**
- [x] **1.8. `/kvkk` sayfası yazıldı**
- [x] **1.9. Geo koordinatları Google Maps pin'ine göre güncellendi**

### Sprint 2: Yasal / Kalite Riskleri ve İçerik Revizyonu
- [x] **2.1. Hastalık listesi → Şikayet listesine dönüştürüldü**
- [x] **2.2. Müşteri yorumları YMYL kurallarına göre düzenlendi**
- [ ] **2.3. Galeri sayfası gerçek görsellerle doldurulacak**
- [x] **2.4. `llms.txt` dinamik route olarak güncellendi**

### Sprint 3: Görsel Varlık Üretimi & Optimizasyon
- [ ] **3.1. Stok görseller gerçek seans fotoğrafları ile değiştirilecek**
- [x] **3.2. Dinamik OG kart üretimi (`src/app/og/route.tsx`) eklendi**
- [ ] **3.3. `<Image>` `sizes` nitelikleri eksiksiz tamamlanacak**
- [ ] **3.4. Favicon ve Manifest güncellenecek**

### Sprint 4: SEO Derinleştirme & Statik Üretim
- [x] **4.1. Blog statik üretim (`generateStaticParams`) yapılandırıldı**
- [x] **4.2. AI-Özet (GEO) blokları eklendi**
- [x] **4.3. Hacamat blog kümesi genişletildi**
- [x] **4.4. Hicri takvim hesabı hassaslaştırıldı (`Intl.DateTimeFormat`)**

### Sprint 5: Kod Hijyeni ve Mimari Temizlik
- [x] **5.1. Eski ps1 scriptleri temizlendi**
- [x] **5.2. Dahili linkler Next.js `<Link>` bileşenine dönüştürüldü ve modülerize edildi**
- [x] **5.3. İç içe `<main>` etiketleri tekilleştirildi**
- [x] **5.4. Blog zenginleştirme modülünde bağımlılık import yolu düzeltildi (`src/lib/blog/enrich.ts`)**
