import type { Post } from "@/lib/posts";

/**
 * Blog yazıları — ELLE düzenlenir.
 *
 * Firebase/Firestore kaldırıldı; yazılar artık bu dosyadan okunur.
 * Yeni yazı eklemek için aşağıdaki listeye bir nesne ekleyin.
 * Sadece `published: true` olan yazılar sitede görünür.
 *
 * Alanlar:
 *   id          : benzersiz bir kimlik (herhangi bir metin, ör. "1")
 *   slug        : URL parçası — /blog/<slug> (küçük harf, tireli)
 *   title       : başlık
 *   excerpt     : kısa özet (liste ve meta açıklama için)
 *   content     : HTML içerik (<p>, <h2>, <ul> ... kullanabilirsiniz)
 *   category    : kategori etiketi (ör. "Hacamat Nedir?")
 *   published   : true → yayında, false → taslak (gizli)
 *   createdAt   : { seconds: <unix-saniye> } — tarih (sıralama + görünüm)
 *   updatedAt?  : opsiyonel güncelleme tarihi (sitemap için)
 *   seoTitle?   : opsiyonel özel SEO başlığı
 *   seoDescription? : opsiyonel özel SEO açıklaması
 *
 * Unix saniyeyi bulmak için: Math.floor(Date.now()/1000) veya
 * https://www.unixtimestamp.com adresini kullanabilirsiniz.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * DİL KURALI (E-E-A-T / YMYL): Bu yazılar sağlık konusundadır. "Tedavi eder",
 * "iyileştirir", "şifa verir" gibi kesin tıbbi iddia KULLANILMAZ. Bunun yerine
 * "geleneksel uygulamada ... amacıyla kullanılır" kalıbı esas alınır. Sayfanın
 * altındaki MedicalDisclaimer bileşeni ayrıca otomatik basılır.
 *
 * SLUG UYARISI: Aşağıdaki iki yazının slug'ı `next.config.ts` içindeki 301
 * yönlendirmelerinin HEDEFİDİR. Slug değiştirilirse yönlendirmeler 404'e düşer.
 *   - hacamat-nedir-tarihi-bilimsel-temelleri-ve-nasil-uygulanir
 *   - suluk-tedavisi-hirudoterapi-nedir
 */
export const BLOG_POSTS: Post[] = [
  {
    id: "pillar-hacamat",
    slug: "hacamat-nedir-tarihi-bilimsel-temelleri-ve-nasil-uygulanir",
    title: "Hacamat Nedir? Tarihi, Uygulaması ve Bilinmesi Gerekenler",
    excerpt:
      "Hacamat (kupa terapisi / hijama) nedir, tarihçesi nedir, nasıl uygulanır ve kimlere uygulanmaz? Geleneksel uygulamanın kapsamlı rehberi.",
    seoTitle: "Hacamat Nedir? Nasıl Yapılır, Kimlere Uygulanmaz — Kapsamlı Rehber",
    seoDescription:
      "Hacamat (kupa terapisi) nedir, tarihçesi, uygulama adımları, noktaları ve dikkat edilmesi gerekenler. 1994'ten beri süregelen uygulama tecrübesiyle hazırlanmış rehber.",
    category: "Hacamat Nedir?",
    published: true,
    createdAt: { seconds: 1785024000 },
    updatedAt: { seconds: 1785024000 },
    content: `
<p>Hacamat, cilde yerleştirilen kupalarla oluşturulan vakumun ardından açılan yüzeysel çiziklerden kontrollü biçimde bir miktar kan alınmasına dayanan geleneksel bir uygulamadır. Arapçada <em>hicame</em>, Türkçede <em>kupa terapisi</em>, uluslararası literatürde <em>hijama</em> veya <em>wet cupping</em> olarak geçer.</p>

<p>Bu rehber, 1994'ten bu yana süregelen uygulama ve eğitim tecrübemize dayanarak hazırlanmıştır. Amacı bilgilendirmedir; tıbbi tanı veya tedavi yerine geçmez.</p>

<h2>Hacamatın Tarihçesi</h2>
<p>Kupa uygulamasının izleri Mezopotamya, Mısır ve Çin tıp geleneklerine kadar uzanır. İslam geleneğinde ise hacamat, hadis-i şeriflerde teşvik edilen bir uygulama olarak özel bir yer tutar. Osmanlı döneminde "haccam" adı verilen uygulayıcılar bu işi meslek olarak sürdürmüş, uygulama günümüze kadar kesintisiz aktarılmıştır.</p>
<p>Modern dönemde uygulama; steril tek kullanımlık malzeme, hijyen protokolleri ve kontrendikasyon değerlendirmesi eklenerek güncellenmiştir. Bugün geleneksel ve tamamlayıcı tıp başlığı altında değerlendirilir.</p>

<h2>Kuru Hacamat ve Yaş Hacamat Farkı</h2>
<p>İki temel uygulama biçimi vardır:</p>
<ul>
  <li><strong>Kuru hacamat (dry cupping):</strong> Yalnızca vakum uygulanır, cilt bütünlüğü bozulmaz. Bölgesel dolaşımı hareketlendirmek amacıyla kullanılır.</li>
  <li><strong>Yaş hacamat (wet cupping / hicame):</strong> Vakumun ardından steril bistüri ile yüzeysel çizikler açılır ve ikinci vakumla kontrollü miktarda kan alınır. Halk arasında "hacamat" denince genellikle bu kastedilir.</li>
</ul>

<h2>Hacamat Nasıl Yapılır? Adım Adım</h2>
<p>Uygulama, eğitimli kişilerce ve steril koşullarda yapılmalıdır. Genel akış şöyledir:</p>
<ul>
  <li><strong>Değerlendirme:</strong> Kişinin genel durumu, kullandığı ilaçlar ve varsa kronik rahatsızlıkları sorgulanır. Uygun olmayan durumlarda uygulama yapılmaz.</li>
  <li><strong>Bölge temizliği:</strong> Uygulama yapılacak bölge antiseptikle temizlenir.</li>
  <li><strong>Birinci vakum:</strong> Kupalar yerleştirilir ve pompayla vakum oluşturulur, kısa süre bekletilir.</li>
  <li><strong>Yüzeysel çizik:</strong> Kupa kaldırılır, steril ve tek kullanımlık bistüri ile çok yüzeysel çizikler açılır.</li>
  <li><strong>İkinci vakum:</strong> Kupa yeniden yerleştirilir; kontrollü miktarda kan kupada toplanır.</li>
  <li><strong>Sonlandırma ve bakım:</strong> Bölge temizlenir, kapatılır ve sonrası için bakım önerileri verilir.</li>
</ul>
<p>Kullanılan bistüri ve tek kullanımlık malzemeler kişiye özeldir; tekrar kullanılmaz.</p>

<h2>Hacamat Noktaları</h2>
<p>Noktalar rastgele seçilmez. Sünnette bildirilen <strong>kâhil (ense–omuz)</strong> bölgesi klasik uygulamanın merkezindedir. Buna ek olarak sırt, bel ve şikâyete göre belirlenen bölgesel noktalar bir "atlas" mantığıyla değerlendirilir.</p>
<p>Doğru nokta seçimi kişiye göre değişir ve uygulayıcının değerlendirmesini gerektirir. İnternette dolaşan genel nokta haritaları yol gösterici olabilir ancak kişisel bir uygulama planı yerine geçmez.</p>

<h2>Hacamat Ne Amaçla Yapılır?</h2>
<p>Geleneksel uygulamada hacamat; bölgesel dolaşımı hareketlendirmek ve durgunlaştığı kabul edilen kanı boşaltmak amacıyla kullanılır. Kişiler çoğunlukla sırt–boyun bölgesindeki gerginlik, yorgunluk hissi ve genel rahatlama beklentisiyle başvurur.</p>
<p>Bu ifadeler geleneksel çerçeveyi aktarır; hacamat bir hastalığın tanısı, tedavisi veya ilaç tedavisinin alternatifi değildir. Mevcut bir rahatsızlığınız varsa hekiminize danışmadan ilaçlarınızı bırakmayın.</p>

<h2>Hacamat Kimlere Uygulanmaz?</h2>
<p>Aşağıdaki durumlarda uygulama yapılmaz veya özel dikkat gerektirir:</p>
<ul>
  <li>Gebelik ve emzirme dönemi</li>
  <li>Kan sulandırıcı ilaç kullanımı</li>
  <li>Kan pıhtılaşma bozuklukları ve ileri derecede kansızlık (anemi)</li>
  <li>Kontrolsüz diyabet ve yara iyileşmesini bozan durumlar</li>
  <li>Aktif enfeksiyon, ateş, açık yara veya cilt hastalığı bulunan bölgeler</li>
  <li>Çok düşük tansiyon, aşırı halsizlik veya aç karnına gelinen durumlar</li>
</ul>
<p>Uygulama öncesi mutlaka değerlendirme yapılmalıdır. Şüpheli durumlarda hekim görüşü alınır.</p>

<h2>Hacamat Ne Sıklıkla Yapılır?</h2>
<p>Sıklık kişiye ve amaca göre değişir. Geleneksel uygulamada mevsimsel veya periyodik aralıklar tercih edilir. Uygun aralık, kişinin durumu değerlendirilerek belirlenir; sık tekrar her zaman daha iyi sonuç anlamına gelmez.</p>

<h2>Hacamat Sonrası Nelere Dikkat Edilmeli?</h2>
<ul>
  <li>Uygulama bölgesi ilk 24 saat kuru ve temiz tutulur.</li>
  <li>Aynı gün ağır fiziksel efor, hamam ve sauna önerilmez.</li>
  <li>Bol su içilmesi ve dinlenilmesi tavsiye edilir.</li>
  <li>Bölgede birkaç gün süren morarma ve hafif hassasiyet normaldir.</li>
  <li>Isı artışı, yayılan kızarıklık veya akıntı gibi belirtilerde hekime başvurulmalıdır.</li>
</ul>

<h2>Güvenli Uygulama İçin Kontrol Listesi</h2>
<p>Nerede yaptırırsanız yaptırın şu dördünü sorun:</p>
<ul>
  <li>Bistüri ve kesici uçlar <strong>tek kullanımlık</strong> mı?</li>
  <li>Kupalar CE sertifikalı ve hijyen protokolüne uygun mu?</li>
  <li>Uygulama öncesi <strong>değerlendirme</strong> yapılıyor mu?</li>
  <li>Uygulayıcı eğitim almış mı, sonrası için bakım bilgisi veriyor mu?</li>
</ul>
<p>Bu dört maddeden biri eksikse uygulamayı yaptırmayın.</p>
`.trim(),
  },
  {
    id: "pillar-suluk",
    slug: "suluk-tedavisi-hirudoterapi-nedir",
    title: "Sülük Tedavisi (Hirudoterapi) Nedir? Kapsamlı Rehber",
    excerpt:
      "Sülük tedavisi nedir, nasıl uygulanır, tıbbi sülük ile doğadan toplanan sülük farkı nedir ve kimlere uygulanmaz? Hirudoterapinin kapsamlı rehberi.",
    seoTitle: "Sülük Tedavisi (Hirudoterapi) Nedir? Nasıl Uygulanır — Rehber",
    seoDescription:
      "Sülük tedavisi nedir, hirudoterapi nasıl uygulanır, tıbbi sülük neden önemlidir, kimlere uygulanmaz? Uygulama ve tedarik tecrübesiyle hazırlanmış kapsamlı rehber.",
    category: "Sülük Tedavisi",
    published: true,
    createdAt: { seconds: 1785024000 },
    updatedAt: { seconds: 1785024000 },
    content: `
<p>Sülük tedavisi (hirudoterapi), tıbbi sülüğün belirlenen bölgeye tutundurulup kontrollü şekilde emmesi esasına dayanan geleneksel bir uygulamadır. Kullanılan tür <strong>Hirudo medicinalis</strong> ve yakın akrabalarıdır; her sülük bu iş için uygun değildir.</p>

<p>Bu rehber bilgilendirme amaçlıdır ve tıbbi tanı veya tedavi yerine geçmez. Uygulama, eğitimli kişilerce ve steril koşullarda yapılmalıdır.</p>

<h2>Hirudoterapinin Tarihçesi</h2>
<p>Sülük uygulaması antik Mısır ve Yunan hekimliğinden bu yana bilinir. Osmanlı tıbbında ve Avrupa'da 19. yüzyıla kadar yaygın biçimde kullanılmış, modern tıbbın gelişimiyle bir dönem geri plana düşmüş, 20. yüzyılın sonlarında özellikle rekonstrüktif cerrahide venöz dolaşımı desteklemek amacıyla yeniden gündeme gelmiştir.</p>

<h2>Sülük Salgısında Ne Var?</h2>
<p>Tıbbi sülüğün tükürük salgısı çok sayıda biyoaktif bileşen içerir. En bilinenleri:</p>
<ul>
  <li><strong>Hirudin:</strong> Kanın pıhtılaşmasını yavaşlatan bileşen.</li>
  <li><strong>Kalin:</strong> Trombosit toplanmasını sınırlayan bileşen.</li>
  <li><strong>Hyaluronidaz:</strong> Salgının doku içinde yayılmasını kolaylaştıran enzim.</li>
  <li><strong>Analjezik etkili bileşenler:</strong> Isırığın çoğunlukla ağrısız hissedilmesinin nedeni budur.</li>
</ul>
<p>Bu bileşenler bilimsel literatürde tanımlanmıştır. Ancak bileşenlerin varlığı, uygulamanın herhangi bir hastalığı tedavi ettiği anlamına gelmez.</p>

<h2>Sülük Tedavisi Nasıl Uygulanır?</h2>
<ul>
  <li><strong>Değerlendirme:</strong> Kişinin genel durumu, ilaçları ve kan değerleri sorgulanır.</li>
  <li><strong>Bölge hazırlığı:</strong> Uygulama bölgesi kokusuz sabunla temizlenir. Parfüm, krem ve kimyasal kalıntı sülüğün tutunmasını engeller.</li>
  <li><strong>Yerleştirme:</strong> Aç ve bakımlı sülük uygun noktaya yerleştirilir, kendiliğinden tutunması beklenir.</li>
  <li><strong>Emme süreci:</strong> Sülük doyduğunda kendiliğinden bırakır. Zorla çekilmez.</li>
  <li><strong>Sonlandırma:</strong> Bölge steril pansumanla kapatılır. Bir süre sızıntı tarzında kanama olması beklenen bir durumdur.</li>
  <li><strong>İmha:</strong> Kullanılan sülük tek kişiliktir ve uygulama sonrası imha edilir.</li>
</ul>

<h2>Tıbbi Sülük ile Doğadan Toplanan Sülük Farkı</h2>
<p>Bu ayrım, uygulamanın en kritik güvenlik başlığıdır.</p>
<ul>
  <li><strong>Tıbbi sülük:</strong> Kontrollü koşullarda, temiz suda bakılır; türü bilinir, karantina süreci uygulanır, aç ve uygulamaya hazır teslim edilir.</li>
  <li><strong>Doğadan toplanan sülük:</strong> Türü belirsizdir, taşıdığı mikroorganizmalar bilinmez, hangi canlıdan beslendiği takip edilemez. Uygulamada kullanılması önerilmez.</li>
</ul>
<p>Fiyat farkı burada bir tercih meselesi değil, güvenlik meselesidir.</p>

<h2>Sülük Tedavisi Ne Amaçla Uygulanır?</h2>
<p>Geleneksel uygulamada hirudoterapi; bölgesel dolaşımı desteklemek ve durgunluk hissedilen bölgeyi hareketlendirmek amacıyla kullanılır. Başvuru nedenleri çoğunlukla bölgesel ağrı ve gerginlik hissi, yorgunluk ve genel rahatlama beklentisidir.</p>
<p>Uygulama bir hastalığın tedavisi veya ilaç tedavisinin alternatifi değildir. Hekiminizin verdiği tedaviyi kendi kararınızla bırakmayın.</p>

<h2>Sülük Kimlere Uygulanmaz?</h2>
<ul>
  <li>Gebelik ve emzirme dönemi</li>
  <li>İleri derecede kansızlık (anemi)</li>
  <li>Hemofili ve diğer kan pıhtılaşma bozuklukları</li>
  <li>Kan sulandırıcı ilaç kullananlar</li>
  <li>Bağışıklık sistemi baskılanmış kişiler</li>
  <li>Bilinen sülük alerjisi öyküsü olanlar</li>
  <li>Aktif enfeksiyon veya açık yara bulunan bölgeler</li>
</ul>
<p>Bu liste kapsayıcı değildir. Uygulama öncesi değerlendirme zorunludur.</p>

<h2>Uygulama Sonrası: Normal Olan ve Olmayan</h2>
<p><strong>Beklenen:</strong> Küçük üçgen biçimli bir iz, birkaç saat süren sızıntı tarzında kanama, bölgede kaşıntı ve hafif kızarıklık. Kaşıntı, iyileşme sürecinin olağan bir parçasıdır ve kaşınmaması gerekir.</p>
<p><strong>Hekime başvurulması gereken:</strong> Yayılan kızarıklık, ısı artışı, iltihaplı akıntı, ateş, 24 saatten uzun süren belirgin kanama veya yaygın döküntü.</p>
<p>İzler genellikle birkaç hafta içinde belirgin şekilde solar. Bölgenin ilk günlerde temiz ve kuru tutulması, güneşten korunması önerilir.</p>

<h2>Sülük Saklama ve Bakım</h2>
<p>Sülük satın alındığında hemen kullanılmayacaksa doğru koşullarda saklanmalıdır:</p>
<ul>
  <li>Klorsuz, dinlendirilmiş temiz su (musluk suyu doğrudan kullanılmaz)</li>
  <li>Serin, ışık almayan ortam</li>
  <li>Ağzı hava alacak şekilde kapatılmış, kaçmaya izin vermeyen kap</li>
  <li>Suyun düzenli aralıklarla tazelenmesi</li>
  <li>Beslenmemiş (aç) tutulması — uygulama etkinliği buna bağlıdır</li>
</ul>

<h2>Güvenli Uygulama İçin Kontrol Listesi</h2>
<ul>
  <li>Sülük <strong>tıbbi</strong> mi, kaynağı belli mi?</li>
  <li><strong>Tek kişilik</strong> kullanım ilkesine uyuluyor mu?</li>
  <li>Uygulama öncesi değerlendirme yapılıyor mu?</li>
  <li>Sonrası bakım ve takip anlatılıyor mu?</li>
</ul>
<p>Bu maddelerden biri karşılanmıyorsa uygulamayı yaptırmayın.</p>
`.trim(),
  },
];
