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
    id: "cluster-suluk-nasil",
    slug: "suluk-tedavisi-nasil-uygulanir",
    title: "Sülük Tedavisi Nasıl Uygulanır? İlk Seansınızda Ne Olur",
    excerpt:
      "İlk sülük seansına gelen kişinin adım adım yaşadıkları: hazırlık, süre, ne hissedilir, seans sonrası ilk saatler ve eve dönerken bilmeniz gerekenler.",
    seoTitle: "Sülük Tedavisi Nasıl Uygulanır? İlk Seansta Ne Olur — Rehber",
    seoDescription:
      "Sülük tedavisi nasıl uygulanır? İlk seansta hazırlık, süre, hissedilenler ve sonrasında yaşananlar adım adım anlatıldı. Uygulamaya gitmeden önce okuyun.",
    category: "Sülük Tedavisi",
    published: true,
    createdAt: { seconds: 1785069000 },
    updatedAt: { seconds: 1785069000 },
    content: `
<p>Uygulamanın teknik tarifini <a href="/blog/suluk-tedavisi-hirudoterapi-nedir">Sülük Tedavisi (Hirudoterapi) Nedir?</a> rehberimizde verdik. Bu yazı farklı bir soruya cevap veriyor: <strong>ilk kez gidiyorsanız o gün ne yaşayacaksınız?</strong> Çoğu kişinin çekincesi işlemin kendisinden değil, bilinmezlikten kaynaklanır.</p>

<h2>Seanstan Önce: Randevu Günü Hazırlığı</h2>
<ul>
  <li><strong>Bölgeyi kokusuz sabunla yıkayın.</strong> Parfüm, deodorant, krem ve losyon kalıntısı sülüğün tutunmasını engeller. En sık yaşanan gecikme sebebi budur.</li>
  <li><strong>Aç gelmeyin, tok da gelmeyin.</strong> Hafif bir öğün yeterlidir; aşırı açlık baş dönmesi yapabilir.</li>
  <li><strong>Kullandığınız ilaçların listesini getirin.</strong> Özellikle kan sulandırıcılar belirleyicidir.</li>
  <li><strong>Rahat kıyafet tercih edin.</strong> Uygulama bölgesine kolay erişilebilmeli.</li>
  <li>O gün alkol ve sigara kullanmayın.</li>
</ul>

<h2>1. Değerlendirme (10–15 dakika)</h2>
<p>Seans doğrudan uygulamayla başlamaz. Önce genel durumunuz, varsa kronik rahatsızlıklarınız, kullandığınız ilaçlar ve daha önce böyle bir uygulama yaptırıp yaptırmadığınız sorulur. Uygun olmayan bir tablo varsa uygulama yapılmaz — bu bir formalite değil, işin en önemli adımıdır. Hangi durumlarda uygulanmadığını <a href="/blog/suluk-tedavisi-kimlere-uygulanmaz">kontrendikasyonlar yazımızda</a> nedenleriyle açıkladık.</p>

<h2>2. Bölge Hazırlığı (5 dakika)</h2>
<p>Uygulama yapılacak bölge kokusuz sabunla temizlenir ve kurulanır. Antiseptik kullanılıyorsa sülük yerleştirilmeden önce tamamen uçması beklenir; kimyasal kokusu kalırsa sülük tutunmaz.</p>

<h2>3. Yerleştirme (5–10 dakika)</h2>
<p>Aç ve bakımlı tıbbi sülük uygun noktaya yerleştirilir ve kendiliğinden tutunması beklenir. Bazen ilk denemede tutunmaz; bu normaldir ve sülüğün "kötü" olduğu anlamına gelmez — genellikle bölgede kalan bir koku ya da sıcaklık farkı sebebidir.</p>
<p><strong>Ne hissedilir?</strong> Tutunma anında sinek ısırığına benzer hafif bir batma olur. Sonrasında sülüğün salgısındaki analjezik etkili bileşenler sayesinde genellikle ağrı hissedilmez. Çoğu kişi bu aşamada rahatlıkla sohbet edebilir.</p>

<h2>4. Emme Süreci (20–60 dakika)</h2>
<p>Süre; sülüğün açlık durumuna, bölgeye ve kişiye göre değişir. Sülük doyduğunda <strong>kendiliğinden bırakır</strong>. Zorla çekilmez — çekmek hem yaralanmaya hem de ağız parçalarının bölgede kalmasına yol açabilir.</p>
<p>Bu süreçte oturarak veya uzanarak beklersiniz. Nadiren baş dönmesi veya hafif bulantı hissedilebilir; böyle bir durumda hemen belirtin, uygulama sonlandırılır.</p>

<h2>5. Sonlandırma ve Pansuman (10 dakika)</h2>
<p>Sülük bıraktıktan sonra bölge steril pansumanla kapatılır. Kullanılan sülük tek kişiliktir ve uygulama sonrası imha edilir; başka bir kişide kullanılması söz konusu değildir.</p>
<p>Bu noktada size sızıntı tarzında bir kanamanın <em>beklenen</em> olduğu anlatılır. Bu, salgıdaki kan sulandırıcı bileşenlerin doğal sonucudur ve genellikle 12–24 saat sürer.</p>

<h2>Toplam Süre ve Eve Dönüş</h2>
<p>Bir seans, değerlendirme dâhil çoğunlukla <strong>60–90 dakika</strong> sürer. Yanınızda yedek pansuman malzemesi bulundurmanız iyi olur; ilk saatlerde pansuman değişimi gerekebilir.</p>
<p>Aynı gün ağır fiziksel efor, hamam ve sauna önerilmez. Uygulama sonrası ilk 24 saat ve sonrasında nelere dikkat edileceğini <a href="/blog/suluk-uygulamasi-sonrasi-bakim">sonrası bakım rehberimizde</a> ayrıntılı anlattık.</p>

<h2>İlk Seanstan Ne Beklemelisiniz?</h2>
<p>Dürüst cevap: bu bir tedavi değil, geleneksel bir uygulamadır ve sonucu kişiden kişiye değişir. Bazı kişiler bölgesel bir rahatlama tarif eder, bazıları belirgin bir değişiklik hissetmez. Tek seansta kalıcı sonuç vaat eden hiçbir açıklamaya itibar etmeyin.</p>
<p>Mevcut bir rahatsızlığınız varsa hekiminizin verdiği tedaviyi <strong>kendi kararınızla bırakmayın</strong>. Sülük uygulaması ilaç tedavisinin alternatifi değildir.</p>
`.trim(),
  },
  {
    id: "cluster-suluk-kontrendikasyon",
    slug: "suluk-tedavisi-kimlere-uygulanmaz",
    title: "Sülük Tedavisi Kimlere Uygulanmaz? Nedenleriyle Kontrendikasyonlar",
    excerpt:
      "Sülük tedavisinin uygulanmadığı durumlar ve her birinin ardındaki neden. Liste ezberlemek yerine mantığını anlayın; emin değilseniz ne yapmalısınız?",
    seoTitle: "Sülük Tedavisi Kimlere Uygulanmaz? Riskler ve Nedenleri",
    seoDescription:
      "Sülük tedavisi hangi durumlarda uygulanmaz ve neden? Kan sulandırıcılar, anemi, gebelik, pıhtılaşma bozuklukları ve alerji riski nedenleriyle açıklandı.",
    category: "Sülük Tedavisi",
    published: true,
    createdAt: { seconds: 1785068000 },
    updatedAt: { seconds: 1785068000 },
    content: `
<p>Sülük uygulamasının en kritik aşaması sülüğün yerleştirilmesi değil, <strong>öncesindeki değerlendirmedir</strong>. Bu yazıda uygulamanın yapılmadığı durumları tek tek ve <em>nedenleriyle</em> ele alıyoruz. Amaç liste ezberletmek değil; mantığını anladığınızda kendi durumunuzu doğru değerlendirebilirsiniz.</p>
<p>Uygulamanın genel çerçevesi için <a href="/blog/suluk-tedavisi-hirudoterapi-nedir">Sülük Tedavisi (Hirudoterapi) Nedir?</a> rehberimize bakabilirsiniz.</p>

<h2>Mantığı Tek Cümlede</h2>
<p>Sülük salgısı kanın pıhtılaşmasını yavaşlatır. Dolayısıyla <strong>kanamayı artıran ya da kan kaybını tolere edemeyecek her tablo</strong> risk oluşturur. Aşağıdaki maddelerin çoğu bu tek mantıktan türer.</p>

<h2>Kan Sulandırıcı İlaç Kullanımı</h2>
<p>Varfarin, yeni nesil oral antikoagülanlar ve düzenli aspirin kullanımı bu başlığa girer. Sülüğün hirudin etkisi ilacın etkisiyle toplanır ve kanama beklenenden uzun sürebilir. <strong>İlacınızı uygulama için kendi kararınızla bırakmayın</strong> — bu, sülük uygulamasından çok daha ciddi bir risktir. Karar hekiminize aittir.</p>

<h2>Kan Pıhtılaşma Bozuklukları</h2>
<p>Hemofili ve benzeri pıhtılaşma faktörü eksiklikleri, trombosit sayısının düşük olduğu tablolar. Bu kişilerde küçük bir yüzeysel yaralanma bile kontrol edilmesi güç kanamaya dönüşebilir. Uygulama yapılmaz.</p>

<h2>İleri Derecede Kansızlık (Anemi)</h2>
<p>Uygulama sırasında ve sonrasındaki sızıntıyla bir miktar kan kaybı olur. Demir eksikliği anemisi ileri düzeydeyse bu kayıp tolere edilemez; halsizlik ve baş dönmesi derinleşir. Kan değerleriniz düşükse önce onu düzeltmek gerekir.</p>

<h2>Gebelik ve Emzirme Dönemi</h2>
<p>Bu dönemde uygulama yapılmaz. Salgıdaki bileşenlerin gebelik üzerindeki etkileri yeterince çalışılmamıştır ve bilinmeyen bir riski üstlenmek için hiçbir gerekçe yoktur. Emzirme döneminde de aynı temkinli yaklaşım geçerlidir.</p>

<h2>Bağışıklık Sistemi Baskılanmış Kişiler</h2>
<p>Organ nakli sonrası immünsupresif kullananlar, kemoterapi görenler ve bağışıklığı ileri düzeyde zayıflamış kişiler. Cilt bütünlüğünü bozan her işlem bu kişilerde enfeksiyon riski taşır ve iyileşme yavaşlar.</p>

<h2>Kontrolsüz Diyabet ve Yara İyileşmesi Sorunu</h2>
<p>Kan şekeri kontrolsüzse yara iyileşmesi belirgin biçimde bozulur. Özellikle ayak ve bacak bölgesinde küçük bir yaranın uzun süre kapanmaması ciddi sorunlara yol açabilir. Bu bölgelerde ayrıca dikkatli olunmalıdır.</p>

<h2>Bilinen Sülük Alerjisi</h2>
<p>Daha önce sülük uygulamasından sonra yaygın döküntü, nefes darlığı, yüzde şişme gibi bir tepki yaşadıysanız uygulama tekrarlanmaz. Alerjik yanıtlar tekrar maruziyette daha şiddetli olabilir.</p>

<h2>Bölgesel Engeller</h2>
<ul>
  <li>Aktif enfeksiyon, apse veya iltihaplı bölge</li>
  <li>Açık yara ve dikişli alanlar</li>
  <li>Yaygın cilt hastalığı bulunan bölgeler</li>
  <li>Varis ameliyatı geçirilmiş bölgeler — hekim görüşü gerekir</li>
  <li>Göz çevresi, mukoza ve büyük damarların yüzeye yakın seyrettiği alanlar</li>
</ul>

<h2>Dikkat Gerektiren Ara Durumlar</h2>
<p>Aşağıdakiler kesin engel değildir ama değerlendirme gerektirir: düşük tansiyon, ileri yaş, çok düşük vücut ağırlığı, aynı gün ağır efor planı, uzun süreli kortizon kullanımı, aktif ateşli hastalık.</p>

<h2>Emin Değilseniz Ne Yapmalısınız?</h2>
<p>Hekiminize üç soruyu sorun:</p>
<ul>
  <li>"Kullandığım ilaçlar arasında kanamayı artıran var mı?"</li>
  <li>"Güncel hemogram değerlerim böyle bir uygulama için uygun mu?"</li>
  <li>"Bilinen bir pıhtılaşma sorunum var mı?"</li>
</ul>
<p>Bu üç sorunun cevabı netleşmeden uygulama yaptırmayın. Uygulama yapan kişi bu soruları size sormuyorsa, orada uygulama yaptırmayın.</p>
`.trim(),
  },
  {
    id: "cluster-suluk-sonrasi",
    slug: "suluk-uygulamasi-sonrasi-bakim",
    title: "Sülük Uygulaması Sonrası Bakım: İlk 24 Saat ve Sonrası",
    excerpt:
      "Sülük uygulamasından sonra ne kadar kanama normal, kaşıntı neden olur, iz ne zaman geçer ve hangi belirtide hekime başvurmalısınız? Saat saat rehber.",
    seoTitle: "Sülük Sonrası Bakım: Kanama, Kaşıntı ve İz — Ne Normal?",
    seoDescription:
      "Sülük uygulaması sonrası ilk 24 saat, kanama süresi, kaşıntı, iz bakımı ve hekime başvurmayı gerektiren belirtiler. Beklenen ile alarm arasındaki fark.",
    category: "Sülük Tedavisi",
    published: true,
    createdAt: { seconds: 1785067000 },
    updatedAt: { seconds: 1785067000 },
    content: `
<p>Sülük uygulamasında en çok soru alan konu işlemin kendisi değil, <strong>sonrasıdır</strong>. Sızıntı tarzında kanamanın beklenen olduğunu bilmeyen kişi paniğe kapılabilir; gerçekten sorun olan bir belirtiyi ise "normaldir" diye geçiştirebilir. Bu yazı ikisini ayırmanız için.</p>
<p>Seansın kendisinde ne olduğunu <a href="/blog/suluk-tedavisi-nasil-uygulanir">ilk seans rehberimizde</a> anlattık.</p>

<h2>İlk 24 Saat</h2>
<p><strong>Kanama:</strong> Bölgeden sızıntı tarzında kanama 12–24 saat sürebilir. Bu, salgıdaki kan sulandırıcı bileşenlerin doğal sonucudur ve beklenen bir durumdur. Pansumanı ıslandıkça değiştirin, bölgeyi ovmayın ve kabuğu kaldırmayın.</p>
<p><strong>Yapılmaması gerekenler:</strong></p>
<ul>
  <li>Duş almayın — bölge ilk 12–24 saat kuru kalmalı.</li>
  <li>Ağır fiziksel efor, hamam ve sauna yok.</li>
  <li>Alkol kullanmayın; kanamayı uzatır.</li>
  <li>Kan sulandırıcı etkisi olan ağrı kesicilerden (aspirin türevleri) kaçının. Ağrı kesici gerekiyorsa hekiminize sorun.</li>
  <li>Pansumanı sıkı sarmayın; bölgeyi boğmadan koruyun.</li>
</ul>
<p><strong>Yapılması iyi olanlar:</strong> bol su için, dinlenin, bölgeyi temiz ve kuru tutun.</p>

<h2>2–3. Günler: Kaşıntı Dönemi</h2>
<p>Bu dönemde bölgede kaşıntı başlaması olağandır ve iyileşme sürecinin bir parçasıdır. <strong>Kaşımayın.</strong> Kaşımak hem enfeksiyon riskini artırır hem de izin daha belirgin kalmasına yol açar.</p>
<p>Kaşıntı rahatsız edici düzeydeyse bölgeye soğuk, temiz bir bez tutabilirsiniz. Kaşıntı gidermek için krem sürmeden önce sorun — her ürün açık cilde uygun değildir.</p>

<h2>1. Hafta: İz ve Kabuklanma</h2>
<p>Sülüğün ısırık izi karakteristik olarak küçük ve üçgen biçimlidir. Kabuklanma başlar; kabuğu kendiliğinden dökülmeye bırakın. Bölgeyi bu dönemde güneşten koruyun — güneş, taze izin koyu renkte kalmasına yol açabilir.</p>

<h2>2–6. Hafta: İzin Solması</h2>
<p>İzler genellikle birkaç hafta içinde belirgin şekilde solar. Cilt tipine ve bölgeye göre bu süre değişir. Ciltte kolay iz kalan bir yapınız varsa (keloid eğilimi gibi) bunu uygulama <em>öncesinde</em> belirtmiş olmanız gerekir.</p>

<h2>Beklenen ile Alarm Arasındaki Fark</h2>
<p><strong>Beklenen:</strong></p>
<ul>
  <li>12–24 saat süren sızıntı tarzında kanama</li>
  <li>Bölgede hafif kızarıklık ve şişlik</li>
  <li>2–3. günde başlayan kaşıntı</li>
  <li>Küçük üçgen iz ve kabuklanma</li>
</ul>
<p><strong>Hekime başvurun:</strong></p>
<ul>
  <li>Kanama 24 saati aşıyor veya damlama şeklinde sürüyorsa</li>
  <li>Bölgeden çevreye yayılan kızarıklık varsa</li>
  <li>Bölgede ısı artışı ve zonklayan ağrı varsa</li>
  <li>İltihaplı (sarı-yeşil) akıntı geliyorsa</li>
  <li>Ateşiniz çıktıysa</li>
  <li>Yaygın döküntü, nefes darlığı veya yüzde şişme varsa <strong>acile başvurun</strong></li>
</ul>

<h2>Pansuman Nasıl Değiştirilir?</h2>
<p>İlk 24 saat içinde pansuman birkaç kez değişebilir. Pratik sıra şöyledir:</p>
<ul>
  <li>Ellerinizi sabunla yıkayın veya tek kullanımlık eldiven kullanın.</li>
  <li>Eski pansumanı yavaşça kaldırın. Yapıştıysa zorlamayın; steril serum fizyolojik veya temiz suyla ıslatıp gevşetin.</li>
  <li>Bölgeye <strong>dokunmayın</strong>, silmeyin, ovmayın.</li>
  <li>Yeni steril gazlı bezi kuru olarak yerleştirin ve gevşekçe sabitleyin.</li>
  <li>Pansumanı sıkı sarmayın — bölgeyi boğmak iyileşmeyi geciktirir.</li>
</ul>
<p>Pansuman malzemesini uygulama sonrası yanınızda bulundurun; eczaneden steril gazlı bez ve hipoalerjenik flaster yeterlidir. Pamuk kullanmayın, lifleri yaraya yapışır.</p>

<h2>İşe ve Günlük Hayata Dönüş</h2>
<p>Masa başı bir işte çalışıyorsanız aynı gün dönebilirsiniz; pansumanın görünmeyeceği ve sürtünmeyeceği bir kıyafet seçin. Fiziksel güç gerektiren, terleten veya kirli ortamda çalışılan işlerde <strong>ilk 24 saat izin almanız</strong> daha doğru olur.</p>
<p>Araç kullanmakta sakınca yoktur; ancak baş dönmesi hissediyorsanız bir süre dinlenin. Uzun yolculuk planı varsa uygulamayı yolculuk gününe denk getirmeyin.</p>

<h2>Sık Sorulan İki Soru</h2>
<p><strong>"Bir sonraki uygulamayı ne zaman yaptırabilirim?"</strong> Bölgenin tamamen iyileşmesi beklenir. Aralık kişiye ve amaca göre değişir; sık tekrar daha iyi sonuç anlamına gelmez.</p>
<p><strong>"Aynı bölgeye tekrar yapılabilir mi?"</strong> İz tamamen iyileşmeden aynı noktaya uygulama yapılmaz.</p>
<p>Bu içerik ön bilgilendirme amaçlıdır. Tereddüt ettiğiniz her durumda hekiminize danışın.</p>
`.trim(),
  },
  {
    id: "cluster-suluk-tur-farki",
    slug: "tibbi-suluk-dogal-suluk-farki",
    title: "Tıbbi Sülük ile Doğadan Toplanan Sülük Farkı",
    excerpt:
      "Her sülük uygulamaya uygun değildir. Tıbbi sülük ile doğadan toplanan sülük arasındaki fark bir tercih değil, güvenlik meselesidir — nedenleriyle.",
    seoTitle: "Tıbbi Sülük Nedir? Doğadan Toplanan Sülükten Farkı",
    seoDescription:
      "Tıbbi sülük (Hirudo medicinalis) ile doğadan toplanan sülük arasındaki fark: tür güvenliği, hijyen, açlık durumu ve taşıdığı riskler nedenleriyle açıklandı.",
    category: "Sülük Tedavisi",
    published: true,
    createdAt: { seconds: 1785066000 },
    updatedAt: { seconds: 1785066000 },
    content: `
<p>Sülük uygulamasında en çok göz ardı edilen konu, kullanılan sülüğün <em>kendisidir</em>. "Sülük sülüktür" yaklaşımı, uygulamanın en ciddi güvenlik açığıdır. Bu yazıda farkı nedenleriyle açıklıyoruz.</p>
<p>Uygulamanın genel çerçevesi için <a href="/blog/suluk-tedavisi-hirudoterapi-nedir">Sülük Tedavisi (Hirudoterapi) Nedir?</a> rehberimize bakabilirsiniz.</p>

<h2>Önce Tür Meselesi</h2>
<p>Uygulamada kullanılan tür <strong>Hirudo medicinalis</strong> ve yakın akrabalarıdır. Doğada bulunan sülüklerin büyük çoğunluğu bu tür değildir. Görsel olarak benzeyen ama uygulamaya uygun olmayan çok sayıda tür vardır; bazıları yeterli miktarda emme yapmaz, bazıları ise dokuya zarar verir.</p>
<p>Tür ayrımı uzmanlık gerektirir. Bir sülüğün "tıbbi" olduğunu görünüşünden anlamak mümkün değildir — bilgi, kaynağından gelir.</p>

<h2>Beslenme Geçmişi Bilinmiyor</h2>
<p>Sülük kan emerek beslenen bir canlıdır. Doğadan toplanan bir sülüğün <strong>daha önce hangi canlıdan beslendiği bilinemez</strong>. Sülüğün sindirim sisteminde kan uzun süre kalabilir; bu da önceki konaktan gelen mikroorganizmaların taşınması anlamına gelir.</p>
<p>Kontrollü üretimde ise sülüğün beslenme geçmişi kayıt altındadır ve uygulamadan önce yeterli açlık süresi sağlanır.</p>

<h2>Yaşadığı Suyun Kalitesi</h2>
<p>Doğal su kaynakları tarımsal ilaç, ağır metal ve endüstriyel atık içerebilir. Sülük yaşadığı ortamdan etkilenir. Kontrollü çiftlik ortamında ise su kalitesi izlenir ve düzenli olarak yenilenir.</p>

<h2>Açlık Durumu Neden Önemli?</h2>
<p>Tok bir sülük yeterli miktarda emmez, çoğu zaman hiç tutunmaz. Uygulamaya hazır sülük belirli bir süre aç bırakılmış olmalıdır. Doğadan toplanan bir sülüğün ne zaman beslendiği bilinemeyeceği için bu kontrol de mümkün değildir.</p>

<h2>Karşılaştırma</h2>
<ul>
  <li><strong>Tür güvenliği:</strong> kontrollü üretimde tür bilinir — doğadan toplamada belirsizdir.</li>
  <li><strong>Beslenme geçmişi:</strong> kayıtlı — bilinmiyor.</li>
  <li><strong>Su kalitesi:</strong> izlenir — bilinmiyor.</li>
  <li><strong>Açlık durumu:</strong> uygulamaya hazır — kontrolsüz.</li>
  <li><strong>Karantina süreci:</strong> uygulanır — yoktur.</li>
  <li><strong>Taşıma koşulları:</strong> yalıtımlı, oksijenli ambalaj — çoğunlukla gelişigüzel.</li>
</ul>

<h2>Fiyat Farkı Nereden Geliyor?</h2>
<p>Kontrollü üretim; su yönetimi, karantina, açlık takibi ve uygun ambalajlama maliyeti taşır. Doğadan toplanan sülüğün maliyeti neredeyse sıfırdır. Aradaki fark bir "marka farkı" değil, bu süreçlerin bedelidir. Fiyatı belirleyen etkenleri <a href="/blog/suluk-fiyatlari-neye-gore-degisir">ayrı bir yazıda</a> ele aldık.</p>

<h2>Tek Kullanım İlkesi</h2>
<p>Kaynağı ne olursa olsun, tıbbi sülük <strong>tek kişiliktir</strong>. Bir kişide kullanılan sülük başka birinde kullanılamaz; uygulama sonrası imha edilir. Bu, kan yoluyla bulaşan enfeksiyon riskini ortadan kaldırmanın tek yoludur.</p>
<p>Bir yerde "sülükleri temizleyip tekrar kullanıyoruz" ifadesini duyarsanız, orada uygulama yaptırmayın.</p>

<h2>Karantina Süreci Nedir?</h2>
<p>Kontrollü üretimde sülük, uygulamaya verilmeden önce bir karantina döneminden geçer. Bu dönemde sülük beslenmez, suyu düzenli olarak yenilenir ve hareket/tepki durumu izlenir. Amaç iki yönlüdür: sindirim sisteminin boşalması ve sağlıklı olmayan bireylerin ayıklanması.</p>
<p>Doğadan toplanan sülükte böyle bir süreç yoktur. Yakalandığı gün satılabilir — ki bu, hem tok olma hem de bilinmeyen bir kaynaktan beslenmiş olma ihtimalini birlikte taşır.</p>

<h2>Taşıma Koşulları Neden Fark Yaratır?</h2>
<p>Sülük canlı bir üründür ve yolculuk onun için stres demektir. Uygun taşımada şunlar bulunur:</p>
<ul>
  <li>Klorsuz su ve oksijen tutan hacim</li>
  <li>Sızdırmaz iç kap ve yalıtımlı dış kutu</li>
  <li>Mevsime göre ısı dengeleyici (yazın soğutucu, kışın ısı koruması)</li>
  <li>Kısa transit süresi ve takip edilebilir gönderi</li>
</ul>
<p>Poşette veya kapağı delikli plastik kapta gönderilen sülükler yolda bitkin düşebilir ya da kaybedilebilir. Bu, ürün fiyatından bağımsız bir kalite göstergesidir.</p>

<h2>Satın Alırken Ne Sormalısınız?</h2>
<ul>
  <li>Sülüğün türü ve kaynağı nedir?</li>
  <li>Ne kadar süredir aç?</li>
  <li>Karantina uygulanıyor mu?</li>
  <li>Hangi koşullarda paketlenip gönderiliyor?</li>
  <li>Elime ulaştığında nasıl saklamalıyım?</li>
</ul>
<p>Bu sorulara net cevap alamadığınız yerden sülük temin etmeyin. Kontrollü koşullarda yetiştirilen <a href="/suluk-satisi">tıbbi sülük temini</a> ve gönderim koşulları hakkında bilgi alabilirsiniz.</p>
`.trim(),
  },
  {
    id: "cluster-suluk-fiyat",
    slug: "suluk-fiyatlari-neye-gore-degisir",
    title: "Sülük Fiyatları Neye Göre Değişir? Fiyatı Belirleyen 6 Etken",
    excerpt:
      "Sülük fiyatları neden sabit değil? Adet, boy, mevsim, kargo mesafesi ve üretim koşulları fiyatı nasıl etkiliyor — ve ucuz sülüğün gerçek maliyeti nedir?",
    seoTitle: "Sülük Fiyatları Neye Göre Değişir? Fiyatı Belirleyen Etkenler",
    seoDescription:
      "Sülük fiyatlarını belirleyen etkenler: adet, boy, mevsim, kargo mesafesi, üretim ve karantina maliyeti. Ucuz sülüğün riskleri ve fiyat sorarken dikkat edilecekler.",
    category: "Sülük Tedavisi",
    published: true,
    createdAt: { seconds: 1785065000 },
    updatedAt: { seconds: 1785065000 },
    content: `
<p>"Sülük ne kadar?" sorusuna internette sabit bir rakam görürseniz temkinli olun. Sülük fiyatı; canlı bir ürün olması, mevsime ve mesafeye bağlı taşıma koşulları ve boy farkı nedeniyle değişkendir. Bu yazıda <strong>fiyatı neyin belirlediğini</strong> açıklıyoruz ki teklif aldığınızda neye baktığınızı bilin.</p>
<p>Güncel fiyat için doğrudan iletişime geçmeniz gerekir; aşağıdaki etkenler teklifin nasıl oluştuğunu anlatır.</p>

<h2>1. Adet</h2>
<p>Fiyat çoğunlukla adet üzerinden verilir. Bireysel kullanımda birkaç adet yeterli olurken, uygulayıcı ve kurumlar toplu temin eder. Toplu alımda birim fiyat düşer — bu, taşıma ve hazırlık maliyetinin daha çok adete bölünmesinden kaynaklanır.</p>

<h2>2. Boy (Gramaj)</h2>
<p>Sülükler boyuna göre sınıflandırılır. Büyük boy sülük daha uzun süre bakılmış, dolayısıyla daha yüksek üretim maliyeti taşımış demektir. Hangi boyun uygun olduğu uygulama bölgesine ve amaca göre değişir; emin değilseniz kullanım amacınızı belirtin, uygun olanı önerelim.</p>

<h2>3. Açlık Süresi ve Hazırlık</h2>
<p>Uygulamaya hazır sülük, belirli bir süre aç bırakılmış ve bakımı yapılmış sülüktür. Bu süre boyunca su yönetimi ve takip maliyeti oluşur. "Hemen kullanıma hazır" ile "az önce yakalandı" arasındaki fark, fiyatın en görünmez ama en önemli kalemidir.</p>

<h2>4. Mevsim ve Taşıma Koşulları</h2>
<p>Canlı gönderide sıcaklık belirleyicidir. Yaz aylarında termal yalıtım ve soğutucu eleman, kış aylarında donmaya karşı ısı koruması gerekir. Bu ilave ambalaj, sıcak ve soğuk dönemlerde maliyeti artırır. Ilıman mevsimlerde standart paketleme yeterli olur.</p>

<h2>5. Kargo Mesafesi</h2>
<p>Mesafe arttıkça hem kargo bedeli hem de yolda geçen süreye bağlı koruma ihtiyacı artar. Uzak bölgelere gönderilerde ilave yalıtım kullanılır. Bu yüzden aynı ürün için farklı illere farklı toplam tutar çıkabilir — ürün fiyatı değil, teslim maliyeti değişmiştir.</p>

<h2>6. Üretim ve Karantina Koşulları</h2>
<p>Kontrollü çiftlik ortamında yetiştirilen sülük; su kalitesi izleme, karantina ve kayıt süreçlerinin maliyetini taşır. Doğadan toplanan sülüğün maliyeti neredeyse sıfırdır ve fiyatı da buna göre düşüktür. Aradaki farkın neden bir güvenlik meselesi olduğunu <a href="/blog/tibbi-suluk-dogal-suluk-farki">tür farkı yazımızda</a> ayrıntılı anlattık.</p>

<h2>Ucuz Sülüğün Gerçek Maliyeti</h2>
<p>Piyasadaki en düşük fiyat çoğunlukla şu üç kalemden birinin atlanmasıyla oluşur: kaynak kontrolü, karantina veya uygun ambalaj. Sonucu ise şunlar olabilir:</p>
<ul>
  <li>Yolda ölen veya bitkin gelen sülükler — parayı tamamen kaybedersiniz</li>
  <li>Tutunmayan tok sülükler — uygulama yapılamaz</li>
  <li>Tür ve hijyen belirsizliği — asıl risk budur</li>
</ul>
<p>Sağlıkla ilgili bir üründe en ucuzu aramak, tasarrufun en pahalı biçimidir.</p>

<h2>Toplam Maliyeti Hesaplarken</h2>
<p>Karşılaştırma yaparken yalnızca birim fiyata bakmak yanıltıcıdır. Toplam maliyet üç kalemden oluşur:</p>
<ul>
  <li><strong>Ürün bedeli</strong> — adet ve boya göre</li>
  <li><strong>Ambalaj</strong> — mevsime göre değişen yalıtım ve ısı dengeleyici</li>
  <li><strong>Kargo</strong> — mesafe ve teslim hızına göre</li>
</ul>
<p>Bu yüzden "adedi şu kadar" bilgisi tek başına anlamlı değildir. Bizden fiyat alırken <strong>kargo dâhil net tutarı</strong> tek seferde iletiyoruz; teslimde sürpriz kalem çıkmaz.</p>

<h2>Uygulayıcı ve Kurumlar İçin Not</h2>
<p>Düzenli çalışan uygulayıcı, klinik ve kurumlar için toplu tedarik planı oluşturuyoruz. Bu planda birim fiyat düşer ve daha önemlisi <strong>tedarik sürekliliği</strong> sağlanır — belirli aralıklarla, önceden konuşulmuş adette gönderim yapılır. Böylece randevu verdiğiniz gün elinizde sülük olmaması riski ortadan kalkar.</p>
<p>Toplu temin düşünüyorsanız aylık yaklaşık kullanım adedinizi paylaşmanız yeterli; uygun bir program birlikte kurulur.</p>

<h2>Fiyat Sorarken Şunları Belirtin</h2>
<ul>
  <li>Kaç adet istiyorsunuz?</li>
  <li>Bireysel mi, uygulayıcı/kurum kullanımı mı?</li>
  <li>Hangi ile gönderilecek?</li>
  <li>Ne zaman kullanmayı planlıyorsunuz?</li>
</ul>
<p>Bu dört bilgiyi paylaştığınızda kargo dâhil net tutarı tek seferde iletebiliyoruz — parça parça fiyat konuşmaya gerek kalmıyor. <a href="/suluk-satisi">Sülük temini sayfamızdan</a> bulunduğunuz ile özel bilgi alabilirsiniz.</p>
`.trim(),
  },
  {
    id: "cluster-suluk-saklama",
    slug: "suluk-bakimi-ve-saklama",
    title: "Sülük Bakımı ve Saklama: Sipariş Sonrası Pratik Rehber",
    excerpt:
      "Sülükler elinize ulaştı, hemen kullanmayacaksınız. Hangi su, hangi kap, hangi sıcaklık? Sık yapılan hatalar ve sülükleri canlı tutmanın kuralları.",
    seoTitle: "Sülük Nasıl Saklanır? Bakım, Su, Kap ve Sıcaklık Rehberi",
    seoDescription:
      "Tıbbi sülük nasıl saklanır? Klorsuz su, cam kavanoz, sıcaklık, su değişimi ve sık yapılan hatalar. Sipariş sonrası pratik bakım rehberi.",
    category: "Sülük Tedavisi",
    published: true,
    createdAt: { seconds: 1785064000 },
    updatedAt: { seconds: 1785064000 },
    content: `
<p>Sülük canlı bir üründür ve elinize ulaştıktan sonraki bakımı doğrudan sizin sorumluluğunuzdadır. İyi bakılan sülük haftalarca canlı ve uygulamaya hazır kalır; yanlış koşullarda ise birkaç günde kaybedilebilir. Bu rehber pratik kurallar üzerine.</p>

<h2>Paket Elinize Ulaştığında İlk 10 Dakika</h2>
<ul>
  <li>Paketi vakit kaybetmeden açın; yalıtımlı kutuda uzun süre beklemesi iyi değildir.</li>
  <li>Sülüklerin hareketli olup olmadığını kontrol edin. Yolculuk sonrası bir süre durgun olmaları normaldir.</li>
  <li>Hazırladığınız temiz suya aktarın (aşağıdaki su kuralına bakın).</li>
  <li>Bir sorun görürseniz aynı gün içinde bize bildirin — geç bildirimde durumu değerlendirmek güçleşir.</li>
</ul>

<h2>Su: En Kritik Kural</h2>
<p><strong>Musluk suyunu doğrudan kullanmayın.</strong> Klor sülükler için toksiktir. Seçenekleriniz:</p>
<ul>
  <li><strong>Klorsuz içme suyu</strong> (damacana/şişe) — en pratik ve güvenli yol.</li>
  <li><strong>Dinlendirilmiş musluk suyu</strong> — geniş ağızlı bir kapta, üstü açık olarak en az 24 saat bekletilmiş su. Acele ediyorsanız bu yöntemi kullanmayın.</li>
</ul>
<p>Su oda sıcaklığında olmalı. Buzdolabından çıkmış soğuk suya aktarmak ani sıcaklık şoku yaratır.</p>

<h2>Kap Seçimi</h2>
<ul>
  <li><strong>Cam kavanoz</strong> tercih edin; plastik kaplarda koku ve kimyasal kalıntı sorun çıkarabilir.</li>
  <li>Geniş ağızlı olsun — oksijen alışverişi için yüzey alanı önemlidir.</li>
  <li>Kabın <strong>ağzı kapalı olmalı ama hava almalı</strong>: ince tülbent veya delikli kapak, lastikle sabitlenmiş. Sülükler tırmanır ve kaçar; bu en sık yaşanan kayıptır.</li>
  <li>Kavanozu tam doldurmayın; su seviyesi yüksekliğin yarısı-üçte ikisi kadar olsun.</li>
</ul>

<h2>Sıcaklık ve Işık</h2>
<p>Serin ve doğrudan güneş görmeyen bir yerde saklayın. İdeal aralık oda sıcaklığının altıdır; kalorifer yanı, pencere önü ve araç içi kesinlikle uygun değildir. Buzdolabına koymak da önerilmez — özellikle dondurucuya yakın raflar risklidir.</p>

<h2>Su Değişimi</h2>
<p>Suyu düzenli aralıklarla tazeleyin. Su bulanıklaştıysa, koku oluştuysa veya dip kısmında atık biriktiyse beklemeden değiştirin. Değişimde:</p>
<ul>
  <li>Yeni su aynı sıcaklıkta olmalı</li>
  <li>Sülükleri elle sıkmadan, yumuşak bir hareketle aktarın</li>
  <li>Kavanozu deterjanla yıkamayın; sıcak suyla durulamak yeterli</li>
</ul>

<h2>Beslemeyin</h2>
<p>Bu şaşırtıcı gelebilir ama en önemli kurallardan biridir: <strong>saklama süresince sülükleri beslemeyin.</strong> Uygulama etkinliği açlık durumuna bağlıdır. Beslenmiş bir sülük tutunmaz ve uygulama yapılamaz.</p>

<h2>Sık Yapılan 5 Hata</h2>
<ul>
  <li>Musluk suyu kullanmak — en yaygın ve en ölümcül hata.</li>
  <li>Kavanozun ağzını açık bırakmak — sülükler tırmanıp kaçar.</li>
  <li>Kavanozu güneş gören bir yere koymak.</li>
  <li>Suyu haftalarca değiştirmemek.</li>
  <li>Farklı tarihlerde alınan sülükleri aynı kaba koymak — karışırsa hangisinin ne kadar aç olduğunu takip edemezsiniz.</li>
</ul>

<h2>Ne Kadar Süre Saklanabilir?</h2>
<p>Uygun koşullarda haftalarca canlı kalabilirler. Ancak uygulamayı mümkün olduğunca teslim tarihine yakın planlamak en iyisidir; uzun bekleme hem risk hem de takip yükü demektir.</p>

<h2>Kullanım Sonrası</h2>
<p>Uygulanmış sülük <strong>tekrar kullanılmaz ve saklanmaz</strong>. Tek kişiliktir ve uygulama sonrası imha edilir. Kullanılmış sülüğü saklamaya çalışmayın — bunun neden kritik olduğunu <a href="/blog/tibbi-suluk-dogal-suluk-farki">tür ve güvenlik yazımızda</a> açıkladık.</p>
`.trim(),
  },
  {
    id: "cluster-hacamat-gunleri",
    slug: "hacamat-gunleri-ayin-kacinda-yapilir",
    title: "Hacamat Günleri: Ayın Kaçında Yapılır?",
    excerpt:
      "Hacamat neden Hicri ayın 17, 19 ve 21. günlerinde tavsiye edilir? Bu günlerin kaynağı, günümüzdeki uygulaması ve bu günler dışında yaptırmanın hükmü.",
    seoTitle: "Hacamat Günleri Hangileri? Ayın Kaçında Yapılır — Rehber",
    seoDescription:
      "Hacamat günleri Hicri ayın 17, 19 ve 21'i olarak bilinir. Bu günlerin kaynağı nedir, neden seçilmiştir, diğer günlerde hacamat yaptırılabilir mi?",
    category: "Hacamat Nedir?",
    published: true,
    createdAt: { seconds: 1785063000 },
    updatedAt: { seconds: 1785063000 },
    content: `
<p>Hacamat hakkında en çok sorulan sorulardan biri zamanlamadır: "Ayın kaçında yaptırmalıyım?" Bu sorunun cevabı geleneğe dayanır ve pratikte esneklik taşır. İkisini birbirine karıştırmadan anlatalım.</p>
<p>Hacamatın ne olduğunu ve nasıl uygulandığını <a href="/blog/hacamat-nedir-tarihi-bilimsel-temelleri-ve-nasil-uygulanir">Hacamat Nedir?</a> rehberimizde ele aldık.</p>

<h2>Klasik Cevap: Hicri Ayın 17, 19 ve 21'i</h2>
<p>Geleneksel uygulamada hacamat için Hicri (kameri) ayın <strong>17, 19 ve 21. günleri</strong> tavsiye edilir. Bu günler hadis-i şeriflerde bildirilmiştir ve yüzyıllardır uygulamanın çerçevesini oluşturur.</p>
<p>Dikkat edilmesi gereken nokta: bu günler <strong>Hicri takvime</strong> göredir, miladi takvime göre değil. Miladi ayın 17'si ile Hicri ayın 17'si farklı günlerdir ve bu, en sık yapılan karışıklıktır.</p>

<h2>Hicri Günü Nasıl Hesaplarsınız?</h2>
<p>Hicri takvim ay döngüsüne dayanır ve miladi takvimden yaklaşık 11 gün kısadır. Bu yüzden hacamat günleri her yıl miladi takvimde kayar. Hicri günü hesaplamak için takvim uygulamalarından veya diyanet takviminden yararlanabilirsiniz.</p>
<p>Uygun günleri ayrıca <a href="/takvim">hacamat takvimi sayfamızda</a> derledik; oradan yaklaşan tarihleri görebilirsiniz.</p>

<h2>Neden Bu Günler?</h2>
<p>Geleneksel açıklamada bu günlerin, ay döngüsünün belirli bir evresine denk gelmesi ve vücut için uygun kabul edilmesi esas alınır. Bu, dinî kaynaklara dayanan bir çerçevedir; bir laboratuvar bulgusu olarak sunulmamalıdır.</p>
<p>Dürüst olmak gerekirse: ay evresinin uygulama sonucuna etkisi konusunda bilimsel bir kanıt bulunmuyor. Bu günlere uymak geleneğe ve sünnete uygun davranma tercihidir; uygulamanın güvenliği ise günden değil, <strong>hijyen ve doğru değerlendirmeden</strong> gelir.</p>

<h2>Haftanın Günleri Meselesi</h2>
<p>Geleneksel kaynaklarda haftanın bazı günleri de öne çıkarılır. Uygulamada esas alınan asıl kriter Hicri ayın günüdür; haftanın günü ikincil bir tercih olarak değerlendirilir.</p>

<h2>Bu Günler Dışında Yaptırılır mı?</h2>
<p>Evet. <strong>Akut bir şikâyet söz konusu olduğunda</strong> hacamat, ayın gününe bakılmaksızın uzman kontrolünde yapılabilir. Geleneksel kaynaklarda da ihtiyaç halinde zamanın beklenmemesi gerektiği belirtilir.</p>
<p>Yani 17, 19 ve 21 bir <em>tercih</em> çerçevesidir, bir <em>yasak</em> değil. Şehir dışından gelecekseniz veya programınız uymuyorsa, uygun günü bekleyip uygulamayı ertelemek zorunda değilsiniz.</p>

<h2>Kadınlarda Zamanlama</h2>
<p>Geleneksel uygulamada âdet döneminde hacamat tercih edilmez. Gerekçesi basittir: o dönemde zaten bir kan kaybı söz konusudur ve buna ek kayıp halsizlik yaratabilir. Dönem tamamlandıktan sonraki günler tercih edilir.</p>
<p>Gebelik ve emzirme döneminde ise uygulama yapılmaz — bu bir zamanlama tercihi değil, kesin bir kontrendikasyondur.</p>

<h2>Mevsim Tercihi</h2>
<p>Geleneksel kaynaklarda ilkbahar ayları öne çıkarılır. Uygulamada belirleyici olan asıl unsur mevsim değil, kişinin o günkü durumudur; ancak aşırı sıcak günlerde terleme nedeniyle uygulama sonrası bölge bakımı zorlaşabilir. Yaz aylarında uygulama yaptıracaksanız günün serin saatlerini tercih edin ve sonrasında terleten ortamlardan uzak durun.</p>

<h2>Zamanlamayla İlgili Pratik Notlar</h2>
<ul>
  <li><strong>Günün saati:</strong> geleneksel tercih sabah saatleridir. Aç karnına değil, hafif bir öğün sonrası gelin.</li>
  <li><strong>Sıklık:</strong> kişiye ve amaca göre değişir; genellikle mevsimsel veya periyodik uygulanır. Sık tekrar daha iyi sonuç anlamına gelmez.</li>
  <li><strong>Randevu:</strong> hacamat günlerinde yoğunluk artar. Bu tarihlerde uygulama yaptırmak istiyorsanız birkaç gün önceden randevu almanız iyi olur.</li>
  <li><strong>Sonrası:</strong> uygulama sonrası aynı gün ağır efor planlamayın. <a href="/blog/hacamat-sonrasi-nelere-dikkat-edilmeli">Hacamat sonrası dikkat edilecekleri</a> ayrıca ele aldık.</li>
</ul>

<h2>Özet</h2>
<p>Hicri ayın 17, 19 ve 21'i geleneksel tercih günleridir ve mümkünse bu günler seçilir. Ancak uygulamanın uygunluğunu belirleyen asıl unsur takvim değil, <strong>kişinin durumu ve uygulamanın steril koşullarda yapılmasıdır</strong>. Doğru günde yapılan hatalı bir uygulama, yanlış günde yapılan doğru bir uygulamadan daha risklidir.</p>
`.trim(),
  },
  {
    id: "cluster-hacamat-noktalari",
    slug: "hacamat-noktalari-haritasi",
    title: "Hacamat Noktaları: Klasik Atlas ve Nokta Seçimi",
    excerpt:
      "Hacamat noktaları nasıl belirlenir, kâhil bölgesi neden merkezdedir ve internetteki nokta haritaları neden tek başına yeterli değildir?",
    seoTitle: "Hacamat Noktaları Nelerdir? Kâhil Bölgesi ve Nokta Seçimi",
    seoDescription:
      "Hacamat noktaları nasıl seçilir? Kâhil (ense-omuz) bölgesi, sırt ve bel noktaları, bölgesel seçim mantığı ve kaçınılması gereken alanlar.",
    category: "Hacamat Nedir?",
    published: true,
    createdAt: { seconds: 1785062000 },
    updatedAt: { seconds: 1785062000 },
    content: `
<p>Hacamatta en çok merak edilen konulardan biri nokta seçimidir. İnternette dolaşan "hacamat noktaları haritası" görselleri yol gösterici olabilir; ancak bir haritanın gösterebileceği ile bir değerlendirmenin belirleyebileceği farklı şeylerdir. Bu yazıda ikisinin sınırını çiziyoruz.</p>
<p>Uygulamanın bütününü <a href="/blog/hacamat-nedir-tarihi-bilimsel-temelleri-ve-nasil-uygulanir">Hacamat Nedir?</a> rehberimizde anlattık.</p>

<h2>Merkez: Kâhil (Ense–Omuz) Bölgesi</h2>
<p>Klasik hacamat uygulamasının merkezinde <strong>kâhil</strong> adı verilen ense–omuz bölgesi bulunur. Boynun arka alt kısmı ile iki omuz arasında kalan üçgen alan olarak tarif edilir ve hadis-i şeriflerde bildirilen bölge budur.</p>
<p>Uygulamaya yeni başlayanlarda ve genel amaçlı uygulamalarda çoğunlukla bu bölge esas alınır. Geleneksel çerçevede "hacamat" denince ilk akla gelen nokta grubudur.</p>

<h2>Sırt ve Bel Bölgesi</h2>
<p>Kâhil dışında sırtın orta ve alt kısmı ile bel bölgesi de klasik atlasta yer alır. Bu bölgeler, kişinin tarif ettiği bölgesel gerginlik ve ağrı hissine göre değerlendirmeye alınır.</p>

<h2>Bölgesel Noktalar</h2>
<p>Klasik bölgelerin dışında, şikâyetin bulunduğu alana yakın bölgesel noktalar seçilebilir: omuz, diz çevresi, baldır, kalça bölgesi gibi. Bu seçim standart bir haritadan okunmaz; kişinin tarifine ve uygulayıcının değerlendirmesine dayanır.</p>

<h2>Nokta Seçimini Belirleyen Etkenler</h2>
<ul>
  <li>Kişinin tarif ettiği şikâyet ve bölgesi</li>
  <li>Genel sağlık durumu ve kullanılan ilaçlar</li>
  <li>Daha önce hacamat yaptırıp yaptırmadığı</li>
  <li>Cilt bütünlüğü ve bölgedeki damar yapısı</li>
  <li>Uygulanacak kupa sayısı ve toplam alan</li>
</ul>
<p>Bu yüzden aynı şikâyeti tarif eden iki kişiye farklı noktalar seçilebilir.</p>

<h2>Uygulama Yapılmayan Bölgeler</h2>
<p>Bazı alanlarda uygulama yapılmaz veya özel dikkat gerekir:</p>
<ul>
  <li>Büyük damarların yüzeye yakın seyrettiği alanlar</li>
  <li>Göz çevresi ve mukozalar</li>
  <li>Varis bulunan bölgeler — hekim görüşü gerekir</li>
  <li>Açık yara, dikişli alan, aktif enfeksiyon bölgesi</li>
  <li>Ben, nevüs ve şüpheli cilt lezyonlarının üzeri</li>
  <li>Yaygın cilt hastalığı bulunan alanlar</li>
  <li>Karın bölgesi — gebelikte kesinlikle uygulanmaz</li>
</ul>

<h2>İnternetteki Haritalar Neden Yeterli Değil?</h2>
<p>Nokta haritaları bölgeleri gösterir; ancak <strong>sizin için hangi noktanın uygun olduğunu göstermez</strong>. Bir harita şunları bilemez:</p>
<ul>
  <li>Kullandığınız ilaçları</li>
  <li>Kan değerlerinizi</li>
  <li>Cildinizde iz kalma eğilimini</li>
  <li>Bölgedeki damar yapınızı</li>
</ul>
<p>Bu bilgiler olmadan seçilen bir nokta, doğru haritadan okunmuş olsa bile yanlış olabilir.</p>

<h2>Kuru ve Yaş Hacamatta Nokta Farkı</h2>
<p>Kuru hacamatta (yalnız vakum) cilt bütünlüğü bozulmadığı için uygulanabilecek alan daha geniştir; kas gerginliği olan bölgelerde daha serbest çalışılabilir. Yaş hacamatta ise yüzeysel çizikler açıldığı için nokta seçimi daha dar ve daha dikkatlidir: damar yapısı, cilt kalınlığı ve iyileşme kapasitesi devreye girer.</p>
<p>Bu yüzden "kuru hacamatta şuraya yapılıyordu" mantığıyla yaş hacamat noktası seçilmez. İki uygulamanın nokta çerçevesi aynı değildir.</p>

<h2>Kaç Kupa Uygulanır?</h2>
<p>Kupa sayısı standart değildir. Belirleyen etkenler: kişinin ilk kez mi yaptırdığı, genel durumu, hedeflenen bölge ve toplam alınacak kan miktarı. İlk uygulamada genellikle daha temkinli davranılır ve sayı sınırlı tutulur.</p>
<p>Çok sayıda kupa daha iyi sonuç anlamına gelmez. Aksine, toplam kan kaybını artırdığı için halsizlik riskini yükseltir. Sayıyı artırmayı teklif eden değil, gerekçesini açıklayan bir uygulayıcı doğru adrestir.</p>

<h2>Kendi Kendine Hacamat Yapılır mı?</h2>
<p>Hayır. Yaş hacamat, cilt bütünlüğünün bozulduğu ve kontrollü kan alındığı bir uygulamadır; sterilizasyon, doğru derinlik ve kanama kontrolü gerektirir. Sırt ve ense bölgesine kişinin kendisinin ulaşması da pratik olarak mümkün değildir.</p>
<p>Kuru kupa (vakum) uygulaması daha düşük risklidir ancak onun da doğru kullanımı eğitim gerektirir.</p>

<h2>Uygulama Öncesi Bilmeniz Gerekenler</h2>
<p>Nokta seçimi kadar önemli olan iki şey: uygulamanın <strong>steril koşullarda</strong> yapılması ve kesici uçların <strong>tek kullanımlık</strong> olması. Doğru nokta, hatalı hijyeni telafi etmez.</p>
<p>Uygulama sonrasında nelere dikkat edileceğini <a href="/blog/hacamat-sonrasi-nelere-dikkat-edilmeli">ayrı bir yazıda</a> ele aldık. Bu içerik ön bilgilendirme amaçlıdır; tıbbi tavsiye yerine geçmez.</p>
`.trim(),
  },
  {
    id: "cluster-hacamat-sonrasi",
    slug: "hacamat-sonrasi-nelere-dikkat-edilmeli",
    title: "Hacamat Sonrası Nelere Dikkat Edilmeli?",
    excerpt:
      "Hacamat sonrası ilk 24 saat, banyo, spor, beslenme ve iz bakımı. Morarma ne zaman geçer, hangi belirtide hekime başvurulmalı?",
    seoTitle: "Hacamat Sonrası Nelere Dikkat Edilmeli? İlk 24 Saat Rehberi",
    seoDescription:
      "Hacamat sonrası banyo, spor, beslenme kuralları; morarma ve iz ne zaman geçer; hangi belirtilerde hekime başvurmalı? Uygulama sonrası bakım rehberi.",
    category: "Hacamat Nedir?",
    published: true,
    createdAt: { seconds: 1785061000 },
    updatedAt: { seconds: 1785061000 },
    content: `
<p>Hacamatın sonucu kadar önemli olan, uygulama sonrası bakımdır. Bu yazıda ilk 24 saatten izin tamamen solmasına kadar geçen süreci ve <strong>neyin beklenen, neyin alarm olduğunu</strong> ayırıyoruz.</p>
<p>Uygulamanın kendisini <a href="/blog/hacamat-nedir-tarihi-bilimsel-temelleri-ve-nasil-uygulanir">Hacamat Nedir?</a> rehberimizde anlattık.</p>

<h2>İlk 24 Saat</h2>
<ul>
  <li><strong>Bölgeyi kuru ve temiz tutun.</strong> Duş almayın; kaçınılmazsa bölgeyi ıslatmadan, kısa tutun.</li>
  <li><strong>Keselenmeyin, ovmayın.</strong> Hamam ve sauna yok.</li>
  <li><strong>Ağır fiziksel efor ve spor yapmayın.</strong> Terleme uygulama bölgesi için uygun değildir.</li>
  <li><strong>Bol su için</strong> ve dinlenin.</li>
  <li><strong>Havuz ve denize girmeyin</strong> — kesi bölgesi kapanana kadar.</li>
  <li>Alkol ve sigara kullanmayın.</li>
  <li>Bölgeyi soğuk havada üşütmeyin; üzerini örtün.</li>
</ul>

<h2>Beslenme</h2>
<p>Geleneksel uygulamada işlemden sonraki ilk gün ağır hayvansal proteinlerden kaçınılması tavsiye edilir. Hafif, sindirimi kolay öğünler ve bol sıvı önerilir. Aşırı tuzlu ve baharatlı yiyeceklerden uzak durmak da yaygın bir tavsiyedir.</p>
<p>Bu tavsiyeler geleneksel çerçeveye aittir; özel bir diyet uygulamanız gerekiyorsa hekiminizin önerisi önceliklidir.</p>

<h2>Morarma ve İz: Zaman Çizelgesi</h2>
<ul>
  <li><strong>İlk saatler:</strong> kupa alanında koyu kırmızı-mor daireler. Beklenen bir görünümdür.</li>
  <li><strong>2–4. gün:</strong> renk açılmaya başlar, kesi noktalarında ince kabuklanma oluşur.</li>
  <li><strong>1. hafta:</strong> morarma belirgin şekilde solar, kabuklar dökülmeye başlar.</li>
  <li><strong>2–3. hafta:</strong> çoğu kişide iz tamamen kaybolur.</li>
</ul>
<p>Kabukları koparmayın; kendiliğinden dökülmelerini bekleyin. Bölgeyi ilk haftalarda güneşten koruyun.</p>

<h2>Ağrı Kesici Kullanımı</h2>
<p>Hafif hassasiyet olağandır. Ağrı kesici gerekiyorsa <strong>kan sulandırıcı etkisi olan aspirin türevlerinden kaçının</strong>; kesi bölgesinden sızıntıyı uzatabilir. Hangi ağrı kesiciyi kullanabileceğinizi hekiminize veya eczacınıza sorun.</p>

<h2>Beklenen ile Alarm Arasındaki Fark</h2>
<p><strong>Beklenen:</strong></p>
<ul>
  <li>Kupa alanında morarma ve renk değişimi</li>
  <li>Hafif hassasiyet ve gerginlik hissi</li>
  <li>İnce kabuklanma ve kaşıntı</li>
  <li>Uygulama günü hafif yorgunluk</li>
</ul>
<p><strong>Hekime başvurun:</strong></p>
<ul>
  <li>Bölgeden çevreye yayılan kızarıklık</li>
  <li>Bölgede ısı artışı ve zonklayan ağrı</li>
  <li>İltihaplı (sarı-yeşil) akıntı</li>
  <li>Ateş</li>
  <li>Durmayan veya yeniden başlayan kanama</li>
  <li>Bir haftadan uzun süren şiddetli ağrı</li>
</ul>

<h2>Pansuman ve Kesi Bakımı</h2>
<p>Yaş hacamatta yüzeysel kesiler açıldığı için bölge kısa süre kapalı tutulur. Pratik kurallar:</p>
<ul>
  <li>Pansumanı ilk gün ıslandıkça değiştirin; ellerinizi önce yıkayın.</li>
  <li>Steril gazlı bez kullanın — <strong>pamuk kullanmayın</strong>, lifleri kesiye yapışır.</li>
  <li>Bölgeye alkol, kolonya veya tuz basmayın; iyileşmeyi geciktirir ve iz bırakır.</li>
  <li>Kesi bölgesine krem veya yağ sürmeden önce sorun; her ürün açık cilde uygun değildir.</li>
  <li>Kabuklar kendiliğinden dökülsün; koparmak izi belirginleştirir.</li>
</ul>

<h2>İz Kalmasını Azaltmak İçin</h2>
<p>Çoğu kişide iz kalmaz. İz riskini azaltmak için: kabukları koparmayın, bölgeyi ilk birkaç hafta güneşten koruyun ve kaşımayın. Ciltte kolay iz kalan bir yapınız varsa (keloid eğilimi gibi) bunu uygulama <em>öncesinde</em> belirtin — nokta seçimi ve kupa sayısı buna göre ayarlanır.</p>

<h2>Ne Zaman Tekrar Yaptırabilirim?</h2>
<p>Bölgenin tamamen iyileşmesi beklenir. Sıklık kişiye ve amaca göre değişir; geleneksel uygulamada mevsimsel veya periyodik aralıklar tercih edilir. <strong>Sık tekrar daha iyi sonuç anlamına gelmez.</strong></p>
<p>Uygun tarih seçimi için <a href="/blog/hacamat-gunleri-ayin-kacinda-yapilir">hacamat günleri yazımıza</a> bakabilirsiniz.</p>

<h2>Son Not</h2>
<p>Uygulama sonrası bakım, uygulamanın kendisinin bir parçasıdır. Size sonrasında nelere dikkat etmeniz gerektiğini anlatmayan bir yerde uygulama yaptırmayın. Bu içerik ön bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez.</p>
`.trim(),
  },
  {
    id: "cluster-suluk-fayda",
    slug: "suluk-tedavisi-neye-iyi-gelir",
    title: "Sülük Tedavisi Neye İyi Gelir? Başvuru Nedenleri ve Dürüst Beklenti",
    excerpt:
      "Sülük tedavisine insanlar hangi nedenlerle başvuruyor, salgısında ne var, modern tıpta nerede kabul görüyor ve ne vaat edilmez? Abartısız bir değerlendirme.",
    seoTitle: "Sülük Tedavisi Neye İyi Gelir? Başvuru Nedenleri — Dürüst Rehber",
    seoDescription:
      "Sülük tedavisi neye iyi gelir sorusuna abartısız cevap: başvuru nedenleri, salgıdaki bileşenler, modern tıpta kabul gördüğü alan, kimlere uygulanmadığı.",
    category: "Sülük Tedavisi",
    published: true,
    createdAt: { seconds: 1785060000 },
    updatedAt: { seconds: 1785060000 },
    content: `
<p>"Sülük tedavisi neye iyi gelir?" en çok sorulan sorumuz. Dürüst cevap şu: bu soruya hastalık adı sayarak cevap veren her kaynağa temkinli yaklaşın. Bu yazıda insanların hangi nedenlerle başvurduğunu, sülük salgısında gerçekten ne bulunduğunu ve neyin vaat <em>edilemeyeceğini</em> abartısız biçimde anlatıyoruz.</p>

<p>Uygulamanın ne olduğunu ve nasıl yapıldığını <a href="/blog/suluk-tedavisi-hirudoterapi-nedir">Sülük Tedavisi (Hirudoterapi) Nedir?</a> rehberimizde ayrıntılı ele aldık; bu yazı beklenti yönetimine odaklanıyor.</p>

<h2>Neden Hastalık Listesi Vermiyoruz?</h2>
<p>Sülük tedavisi geleneksel ve tamamlayıcı bir uygulamadır. Türkiye'de de dünyada da hiçbir otorite, hirudoterapinin belirli bir hastalığı tedavi ettiğini onaylamış değildir. "Şu hastalığa iyi gelir" ifadesi hem yanıltıcı hem de kişinin asıl tedavisini aksatmasına yol açabilecek bir iddiadır.</p>
<p>1994'ten bu yana bu işi yapıyoruz ve şunu net söyleyebiliyoruz: doğru beklentiyle gelen kişi memnun ayrılır, mucize bekleyen kişi hayal kırıklığı yaşar. Bu yüzden beklentiyi baştan doğru kurmayı tercih ediyoruz.</p>

<h2>Sülük Salgısında Gerçekten Ne Var?</h2>
<p>Tıbbi sülüğün (<em>Hirudo medicinalis</em>) tükürük salgısı bilimsel literatürde tanımlanmış çok sayıda bileşen içerir:</p>
<ul>
  <li><strong>Hirudin</strong> — kanın pıhtılaşmasını yavaşlatır. Sülüğün en iyi bilinen bileşenidir.</li>
  <li><strong>Kalin</strong> — trombositlerin kümelenmesini sınırlar.</li>
  <li><strong>Hyaluronidaz</strong> — salgının doku içinde yayılmasını kolaylaştırır.</li>
  <li><strong>Analjezik etkili bileşenler</strong> — ısırığın çoğunlukla ağrısız hissedilmesinin nedenidir.</li>
</ul>
<p><strong>Önemli ayrım:</strong> bu bileşenlerin varlığı laboratuvar düzeyinde gösterilmiştir. Ancak bir bileşenin tanımlanmış olması, uygulamanın herhangi bir hastalığı tedavi ettiği anlamına gelmez. Bileşen bilgisi ile klinik sonuç iddiası iki ayrı şeydir ve internette en çok bu ikisi birbirine karıştırılır.</p>

<h2>Modern Tıpta Sülüğün Kabul Gördüğü Alan</h2>
<p>Sülüğün modern tıpta net biçimde yer bulduğu bir alan vardır: <strong>rekonstrüktif ve mikrocerrahi sonrası venöz tıkanıklık</strong>. Doku nakli veya kopan uzuv dikimi sonrasında toplardamar dolaşımı yeterince açılmadığında, sülük bölgedeki kan birikimini boşaltmak amacıyla kullanılır.</p>
<p>ABD Gıda ve İlaç Dairesi (FDA), 2004 yılında tıbbi sülüğü bu kullanım için tıbbi cihaz kapsamında sınıflandırmıştır. Bu, hirudoterapinin genel olarak onaylandığı anlamına gelmez — yalnızca bu spesifik cerrahi endikasyon için geçerlidir. Yine de sülüğün ciddiye alınan bir araç olduğunu göstermesi bakımından önemlidir.</p>

<h2>İnsanlar Hangi Nedenlerle Başvuruyor?</h2>
<p>Aşağıdakiler bizim gözlemlediğimiz <em>başvuru nedenleridir</em>; tedavi vaadi değildir:</p>
<ul>
  <li><strong>Bölgesel ağrı ve gerginlik hissi</strong> — özellikle sırt, boyun, omuz ve diz çevresi.</li>
  <li><strong>Bacaklarda ağırlık ve dolaşım şikâyeti</strong> — damar görünümü ve şişlik hissi nedeniyle gelenler.</li>
  <li><strong>Spor sonrası bölgesel toparlanma beklentisi</strong> — sporcuların ilgi gösterdiği bir kullanımdır.</li>
  <li><strong>Genel yorgunluk ve ağırlık hissi</strong> — geleneksel çerçevede "durgunluk" olarak tarif edilen tablo.</li>
  <li><strong>Geleneksel uygulamaya duyulan ilgi</strong> — özellikle hacamatla birlikte değerlendirenler.</li>
</ul>
<p>Bu maddeler kişilerin <em>neden geldiğini</em> anlatır. Sonucun kişiden kişiye değişeceğini, bazı kişilerde belirgin bir değişiklik hissedilmeyebileceğini de baştan söylüyoruz.</p>

<h2>Ne Vaat Edilmez — Beklenti Yönetimi</h2>
<ul>
  <li>Hiçbir hastalığın tedavisi vaat edilmez.</li>
  <li>Hekiminizin verdiği ilaçların yerine geçmez; <strong>tedavinizi kendi kararınızla bırakmayın.</strong></li>
  <li>Tek seansta kalıcı sonuç vaat edilmez.</li>
  <li>Kanser, diyabet, tansiyon gibi kronik hastalıklarda "çözüm" olarak sunulmaz.</li>
  <li>Zayıflama, cilt gençleştirme gibi kozmetik sonuçlar garanti edilmez.</li>
</ul>
<p>Bu maddelerden birini size vaat eden bir yere gitmeyin. Sağlık alanında abartılı vaat, çoğu zaman eksik bilginin göstergesidir.</p>

<h2>Kimlere Uygulanmaz?</h2>
<p>Sülük tedavisi aşağıdaki durumlarda uygulanmaz veya özel dikkat gerektirir:</p>
<ul>
  <li>Gebelik ve emzirme dönemi</li>
  <li>İleri derecede kansızlık (anemi)</li>
  <li>Hemofili ve diğer kan pıhtılaşma bozuklukları</li>
  <li>Kan sulandırıcı ilaç kullanımı</li>
  <li>Bağışıklık sistemi baskılanmış kişiler</li>
  <li>Bilinen sülük alerjisi öyküsü</li>
  <li>Aktif enfeksiyon veya açık yara bulunan bölgeler</li>
</ul>
<p>Bu liste kapsayıcı değildir. Uygulama öncesi değerlendirme zorunludur; kronik bir rahatsızlığınız veya düzenli ilaç kullanımınız varsa önce hekiminize danışın.</p>

<h2>Uygulama Öncesi Sormanız Gereken 4 Soru</h2>
<p>Nerede yaptırırsanız yaptırın şunları sorun:</p>
<ul>
  <li>Kullanılan sülük <strong>tıbbi</strong> mi, kaynağı belli mi?</li>
  <li><strong>Tek kişilik kullanım</strong> ilkesine uyuluyor mu, sonrasında imha ediliyor mu?</li>
  <li>Uygulama öncesi <strong>değerlendirme</strong> yapılıyor mu?</li>
  <li>Sonrası bakım ve takip anlatılıyor mu?</li>
</ul>
<p>Bu dördünden biri karşılanmıyorsa uygulamayı yaptırmayın. Sülüğün kaynağı özellikle kritiktir: doğadan toplanan sülüklerin türü ve taşıdığı mikroorganizmalar bilinmez. Kontrollü çiftlik ortamında yetiştirilen <a href="/suluk-satisi">tıbbi sülük</a> ile aradaki fark bir tercih meselesi değil, güvenlik meselesidir.</p>

<h2>Sülük mü, Hacamat mı?</h2>
<p>İkisi sık karıştırılır ama farklı uygulamalardır. Hacamatta kupa vakumu ve yüzeysel çiziklerle kontrollü kan alınır; sülükte ise canlı bir organizmanın salgısı devreye girer. <a href="/blog/hacamat-nedir-tarihi-bilimsel-temelleri-ve-nasil-uygulanir">Hacamat Nedir?</a> rehberimizde hacamatın kendi çerçevesini ayrıca ele aldık.</p>
<p>Hangisinin size uygun olduğu; şikâyetiniz, genel durumunuz ve değerlendirme sonucuna göre belirlenir. Emin değilseniz karar vermeden önce sorun — doğru soru sormak, doğru uygulamadan önce gelir.</p>
`.trim(),
  },
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

<h2>Bu Konuda Ayrıntılı Rehberler</h2>
<ul>
  <li><a href="/blog/hacamat-gunleri-ayin-kacinda-yapilir">Hacamat Günleri: Ayın Kaçında Yapılır?</a> — Hicri takvim, 17/19/21 ve diğer günlerde uygulama</li>
  <li><a href="/blog/hacamat-noktalari-haritasi">Hacamat Noktaları: Klasik Atlas ve Nokta Seçimi</a> — kâhil bölgesi ve uygulanmayan alanlar</li>
  <li><a href="/blog/hacamat-sonrasi-nelere-dikkat-edilmeli">Hacamat Sonrası Nelere Dikkat Edilmeli?</a> — ilk 24 saat, morarma ve alarm belirtileri</li>
</ul>
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

<h2>Bu Konuda Ayrıntılı Rehberler</h2>
<ul>
  <li><a href="/blog/suluk-tedavisi-neye-iyi-gelir">Sülük Tedavisi Neye İyi Gelir?</a> — başvuru nedenleri ve dürüst beklenti</li>
  <li><a href="/blog/suluk-tedavisi-nasil-uygulanir">Sülük Tedavisi Nasıl Uygulanır?</a> — ilk seansınızda adım adım ne olur</li>
  <li><a href="/blog/suluk-tedavisi-kimlere-uygulanmaz">Kimlere Uygulanmaz?</a> — kontrendikasyonlar ve nedenleri</li>
  <li><a href="/blog/suluk-uygulamasi-sonrasi-bakim">Uygulama Sonrası Bakım</a> — ilk 24 saat, kanama, kaşıntı ve iz</li>
  <li><a href="/blog/tibbi-suluk-dogal-suluk-farki">Tıbbi Sülük ile Doğadan Toplanan Sülük Farkı</a> — tür ve güvenlik</li>
  <li><a href="/blog/suluk-bakimi-ve-saklama">Sülük Bakımı ve Saklama</a> — sipariş sonrası pratik rehber</li>
  <li><a href="/blog/suluk-fiyatlari-neye-gore-degisir">Sülük Fiyatları Neye Göre Değişir?</a> — fiyatı belirleyen etkenler</li>
</ul>
`.trim(),
  },
];
