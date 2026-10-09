// scripts/create_expanded_lectures.js
// Generates comprehensive, high-yield lecture modules especially for Genel Kültür (Banking) and English (B1-B2)
const fs = require('fs');
const path = require('path');

const lectures = [
  // ============================================================================
  // GENEL KÜLTÜR VE BANKACILIK DERS NOTLARI (P0 - P1)
  // ============================================================================
  {
    "id": "lec-gk-01",
    "section": "genel-kultur",
    "topic": "Ziraat Bankası Kurumsal Tarihi ve Kimliği",
    "title": "Ziraat Bankası'nın Tarihçesi, Kuruluş Felsefesi ve Ziraat Finans Grubu",
    "readTime": "8 dk",
    "summary": "1863 Memleket Sandıkları, Mithat Paşa, 1888 Nizamnamesi, Ulus Genel Müdürlük binası ve Ziraat Finans Grubu iştirakleri.",
    "content": `### 1. Tarihsel Köken: Memleket Sandıkları (1863)
* **Kurucu:** 1863 yılında dönemin Niş Valisi **Mithat Paşa**, Osmanlı köylüsünü tefecilerin ağır faiz sarmalından kurtarmak amacıyla Pirot kasabasında ilk **Memleket Sandığı**'nı kurmuştur.
* **İmece Modeli:** Çiftçilerin ürettikleri ürünlerin bir kısmını devlete ait arazilerde imece usulüyle yetiştirip satması ve elde edilen gelirin bir sandıkta biriktirilmesi esasına dayanır. Köylüye %1 faizle tohumluk ve üretim kredisi sağlanmıştır.
* **1883 Menafi Sandıkları:** Memleket Sandıkları'nın idari yapısı yeniden düzenlenmiş, vilayet merkezlerinde daha kurumsal olan 'Menafi Sandıkları'na dönüştürülmüştür.

### 2. Modern Bankaya Dönüşüm: 15 Ağustos 1888
* **Resmi Kuruluş:** Menafi Sandıkları'nın yerini almak üzere 15 Ağustos 1888'de yürürlüğe giren nizamname ile modern **Ziraat Bankası** resmen kurulmuştur.
* **Tarihi Genel Müdürlük:** Ankara Ulus'taki tarihi Genel Müdürlük binası, Birinci Ulusal Mimarlık Akımı'nın öncülerinden İtalyan Mimar **Giulio Mongeri** tarafından tasarlanmış ve 1929 yılında hizmete açılmıştır.
* **Kurtuluş Savaşı ve Cumhuriyet:** Kurtuluş Savaşı döneminde Ankara idaresi Ziraat Bankası şubeleri üzerinden milli mücadelenin finansmanını sağlamıştır. 1924'te Ziraat Bankası bir anonim şirkete dönüştürülmüştür.

### 3. Ziraat Finans Grubu ve İştirakleri
* Ziraat Bankası yalnızca bir ticari banka değil, geniş bir finansal ekosistemdir:
  * **Ziraat Katılım:** 2015 yılında faaliyete geçen Türkiye'nin ilk kamu katılım bankası.
  * **Ziraat Teknoloji:** Bankanın ve iştiraklerinin tüm dijital altyapısını, yazılım ve veri merkezi sistemlerini geliştiren teknoloji şirketi.
  * **Ziraat Portföy, Ziraat GYO, Ziraat Hayat ve Emeklilik:** Varlık ve emeklilik fonu yönetimi.
  * **Yurt Dışı Ağı:** Almanya, Bosna-Hersek, Rusya, Gürcistan, Azerbaycan, Özbekistan gibi 19'dan fazla ülkede şube ve bağlı ortaklıklar.

> 💡 **Sınav İpucu:** Sınavda en çok sorulan kronoloji: 1863 (Memleket Sandıkları - Mithat Paşa) -> 1883 (Menafi Sandıkları) -> 15 Ağustos 1888 (Resmi Ziraat Bankası Nizamnamesi). Tarihi Genel Müdürlük binasının mimarı Giulio Mongeri'dir.`
  },
  {
    "id": "lec-gk-02",
    "section": "genel-kultur",
    "topic": "Türkiye Bankacılık Sistemi ve Regülasyon Otoriteleri",
    "title": "BDDK, TCMB, TMSF ve 5411 Sayılı Bankacılık Kanunu",
    "readTime": "9 dk",
    "summary": "TCMB para politikası araçları (repo faizi, zorunlu karşılıklar), BDDK denetim rolü, TMSF güvencesi ve Basel kuralları.",
    "content": `### 1. TCMB (Türkiye Cumhuriyet Merkez Bankası)
* **Temel Amaç:** 1211 sayılı kanun uyarınca bankanın birincil görevi **fiyat istikrarını** sağlamak ve korumaktır. Fiyat istikrarı ile çelişmemek kaydıyla hükümetin büyüme politikalarını destekler.
* **Temel Para Politikası Araçları:**
  1. **Politika Faizi (1 Haftalık Repo İhale Faizi):** Bankaların merkez bankasından borçlanma maliyetini belirler. Faiz artırıldığında iç talep ve kredi büyümesi yavaşlar, enflasyonist baskı azalır.
  2. **Zorunlu Karşılık Oranları (ZK / RRR):** Bankaların topladıkları mevduatların kanunen TCMB nezdinde bloke tutmak zorunda oldukları yüzdedir. Kredi hacmini doğrudan sınırlar.
  3. **Açık Piyasa İşlemleri (APİ):** Piyasada likidite fazlası varsa devlet tahvili satarak piyasadan para çeker; likidite açığı varsa tahvil geri alarak piyasaya TL enjekte eder.
  4. **Reeskont Kredileri:** İhracatçı ve döviz kazandırıcı firmalara TCMB kaynaklı düşük faizli iskonto kredisi.

### 2. BDDK (Bankacılık Düzenleme ve Denetleme Kurumu)
* **Kuruluş:** 1999 yılında 4389 sayılı kanunla kurulmuş, 2000 yılında fiilen faaliyete geçmiştir. Güncel çerçevesi **5411 sayılı Bankacılık Kanunu**'dur.
* **Görev ve Yetkileri:** Bankacılık sektöründe güven ve istikrarı sağlamak, mevduat sahiplerinin haklarını korumak, banka kuruluş ve faaliyet lisanslarını vermek/denetlemek.
* **Sermaye Yeterlilik Rasyosu (SYR):** Bir bankanın üstlendiği risklere karşı bulundurması gereken asgari özkaynak oranıdır. Yasal asgari sınır **%8**'dir (Hedef oran genellikle %12 seviyesinde tutulur).

### 3. TMSF (Tasarruf Mevduatı Sigorta Fonu)
* Vatandaşların bankalardaki yurt içi şubelerde açılmış TL ve döviz cinsi tasarruf mevduatlarını sigortalar.
* Mevduat kabul eden bankanın iflası veya izninin kaldırılması durumunda sigorta limitine kadar olan tutarı doğrudan mevduat sahibine öder.

> 💡 **Sınav İpucu:** TCMB'nin temel görevi 'büyümeyi maksimize etmek' değil, **fiyat istikrarını sağlamaktır**. Bankalara lisans veren ve denetleyen kurum TCMB değil, **BDDK**'dır.`
  },
  {
    "id": "lec-gk-03",
    "section": "genel-kultur",
    "topic": "Bankacılık Finansal Tabloları ve Risk Yönetimi",
    "title": "Banka Bilançosu, Kredi Türleri ve Bankacılık Riskleri",
    "readTime": "9 dk",
    "summary": "Aktif/Pasif dengesi, nakdi ve gayrinakdi krediler, Kredi riski, Likidite riski, Piyasa riski ve Operasyonel risk.",
    "content": `### 1. Banka Bilançosunun Yapısı
* Standart muhasebe denkliği: $\\text{Aktifler (Varlıklar)} = \\text{Pasifler (Kaynaklar)} + \\text{Özkaynaklar}$
* **Aktif Kalemler (Bankanın Varlıkları ve Alacakları):**
  * Kasa ve Merkez Bankası mevcudu (Nakit ve ZK)
  * **Krediler:** Bankanın müşterilere verdiği ticari, tarımsal ve bireysel krediler bankanın en büyük aktifidir!
  * Menkul Kıymetler Cüzdanı (Devlet Tahvili, Hazine Bonosu, Eurobond).
* **Pasif Kalemler (Bankanın Borçları ve Yükümlülükleri):**
  * **Mevduatlar:** Müşterilerin yatırdığı paralar banka için birer borçtur (Pasif).
  * Bankalararası Para Piyasası (Repo) borçları.
  * Sendikasyon ve Seküritizasyon kredileri (Yurt dışından sağlanan fonlar).
* **Özkaynaklar:** Ödenmiş sermaye, yedek akçeler ve dağıtılmamış geçmiş yıl kârları.

### 2. Temel Kredi Türleri
* **Nakdi Krediler:** Paranın doğrudan borçlunun hesabına aktarıldığı kredilerdir.
  * *Rotatif Kredi (KMH / Kredili Mevduat):* Belirli bir limit dahilinde para çekilip yatırılabilen, faizin yalnızca kullanılan gün ve tutar üzerinden işlediği kredi.
  * *Spot Kredi:* Faiz oranı ve vadesi baştan sabitlenen, vadesinde anapara ve faizle defaten kapatılan kredi.
  * *İskonto / İştira Kredisi:* Vadesi henüz gelmemiş ticari senet ve çeklerin vadesine kadar olan faiz ve komisyonu düşülerek nakde çevrilmesi.
* **Gayrinakdi Krediler:** Bankanın para vermeyip itibar ve ödeme garantisi sunduğu kredilerdir.
  * *Teminat Mektubu:* Müteahhidin veya firmanın üstlendiği işi yapmaması durumunda bankanın tazminat ödemeyi taahhüt ettiği resmi belge.
  * *Akreditif (Letter of Credit):* Uluslararası dış ticarette alıcı ile satıcı arasında ödemeyi garanti eden bankacılık enstrümanı.

### 3. Bankacılık Risk Türleri (Basel Prensipleri)
1. **Kredi Riski (Credit Risk):** Kredi kullanan müşterinin veya karşı tarafın taahhüdünü yerine getiremeyerek temerrüde (default) düşmesi riski.
2. **Likidite Riski (Liquidity Risk):** Bankanın vadesi gelen mevduat çekilişlerini ve nakit çıkışlarını makul maliyetle karşılayamama riski.
3. **Piyasa Riski (Market Risk):** Faiz, döviz kuru ve menkul kıymet fiyatlarındaki dalgalanmalar nedeniyle banka portföyünün değer kaybetmesi.
4. **Operasyonel Risk (Operational Risk):** Yetersiz veya başarısız iç süreçler, personel dolandırıcılığı, sistem kesintileri (IT çökmeleri) veya harici siber saldırılardan doğan zarar riski.

> 💡 **Sınav İpucu:** Banka bilançosunda müşterinin yatırdığı mevduat **Pasif** (borç), bankanın verdiği kredi ise **Aktif** (alacak) olarak kaydedilir. Teminat mektupları bilanço içinde değil, **Bilanço Dışı (Nazım Hesaplar)** altında izlenir.`
  },
  {
    "id": "lec-gk-04",
    "section": "genel-kultur",
    "topic": "Makroekonomi ve Dijital Finansal Dönüşüm",
    "title": "Para Politikası, Enflasyon Dinamikleri, FAST ve Açık Bankacılık",
    "readTime": "8 dk",
    "summary": "TÜFE/ÜFE farkı, stagflasyon, FAST sistemi, Kolay Adres, Açık Bankacılık (Open Banking / PSD2) ve Dijital Türk Lirası.",
    "content": `### 1. Enflasyon ve Temel Makroekonomik Göstergeler
* **TÜFE (Tüketici Fiyat Endeksi):** Hanehalkının tükettiği mal ve hizmet sepetinin zaman içindeki fiyat değişimini ölçer.
* **ÜFE (Üretici Fiyat Endeksi):** Üreticilerin yurt içinde ürettiği ürünlerin fabrika çıkış fiyatlarındaki değişimi gösterir. Maliyet enflasyonunun öncü göstergesidir.
* **Enflasyon Türleri:**
  * *Talep Enflasyonu:* Toplam talebin toplam arzı aşmasıyla fiyatların yükselmesi.
  * *Maliyet Enflasyonu:* Enerji, hammadde veya döviz kuru artışı nedeniyle üretim maliyetlerinin yükselmesi.
  * *Stagflasyon:* Ekonomik durgunluk (işsizlik artışı ve küçülme) ile yüksek enflasyonun aynı anda yaşanması.
  * *Deflasyon:* Fiyatlar genel düzeyinin sürekli düşmesi ve ekonomik canlılığın kaybolması.

### 2. Dijital Bankacılık ve Yeni Nesil Ödeme Altyapıları
* **EFT vs Havale:**
  * *Havale:* Aynı bankanın farklı hesapları arasında yapılan para transferi (7/24 çalışır).
  * *EFT (Elektronik Fon Transferi):* İki farklı banka arasında TCMB takas sistemi üzerinden yapılan para transferi.
* **FAST (Fonların Anlık ve Sürekli Transferi):**
  * TCMB tarafından işletilen, farklı bankalar arasında 7 gün 24 saat anlık para transferi sağlayan yeni nesil ödeme sistemi.
* **Kolay Adres Sistemi:**
  * IBAN numarası yerine cep telefonu, T.C. kimlik numarası veya e-posta adresinin hesapla eşleştirilerek para transferi yapılmasını sağlayan BKM altyapısı.
* **Açık Bankacılık (Open Banking):**
  * Müşterinin açık rızasıyla hesap ve ödeme verilerinin lisanslı fintech şirketleriyle güvenli API'lar üzerinden paylaşılması (Hesap Bilgisi Hizmeti - HBH, Ödeme Emri Başlatma - ÖEB).
* **Dijital Türk Lirası:**
  * TCMB öncülüğünde Ar-Ge'si yürütülen, blokzincir ve dağıtık defter teknolojisi tabanlı resmi Merkez Bankası Dijital Parası (CBDC).

> 💡 **Sınav İpucu:** FAST sistemi TCMB'ye aittir ve 7/24 çalışır. Havale aynı banka içi transfer iken, EFT farklı bankalar arası transferdir.`
  },

  // ============================================================================
  // İNGİLİZCE DERS NOTLARI (B1 - B2 SEVİYESİ, İŞ VE BANKACILIK DİLİ)
  // ============================================================================
  {
    "id": "lec-eng-01",
    "section": "ingilizce",
    "topic": "İngilizce Gramer Temelleri",
    "title": "Zamanlar (Tenses), Zaman Uyumu ve Sınav İpuçları",
    "readTime": "8 dk",
    "summary": "Present Perfect vs Past Simple ayrımı, Past Continuous ile bölünen eylemler, Present Perfect Continuous ve zaman uyumu.",
    "content": `### 1. Present Perfect vs Past Simple (En Çok Sorulan Ayrım)
* **Past Simple (V2):** Geçmişte belirli bir zamanda gerçekleşmiş ve bitmiş eylemler.
  * *Anahtar Kelimeler:* \`yesterday\`, \`last year\`, \`in 2020\`, \`two days ago\`, \`during the financial crisis\`.
  * *Örnek:* The central bank **increased** the reserve requirement ratio **last month**.
* **Present Perfect (Have/Has + V3):** Geçmişte başlamış, etkisi devam eden veya net bir zaman verilmemiş eylemler.
  * *Anahtar Kelimeler:* \`since 2018\`, \`for five years\`, \`already\`, \`yet\`, \`recently\`, \`so far\`.
  * *Örnek:* The banking sector **has achieved** substantial growth **over the last decade**.

### 2. Süreç Bildiren Zamanlar
* **Present Perfect Continuous (Have/Has been + V-ing):** Geçmişte başlayıp günümüze kadar kesintisiz devam eden eylemler (Özellikle süreç vurgulanır).
  * *Örnek:* Our IT engineers **have been upgrading** the database servers **since early morning**.
* **Past Continuous (Was/Were + V-ing):** Geçmişte belirli bir anda devam etmekte olan ve genellikle başka bir anlık olayla bölünen eylemler (\`While\`, \`As\` bağlaçları).
  * *Örnek:* **While** the tellers **were processing** the end-of-day reports, the power suddenly **went out**.

### 3. Zaman Uyumu Kuralı (Tense Harmony)
* Zaman bağlaçlarının (\`when\`, \`while\`, \`before\`, \`after\`, \`until\`, \`as soon as\`) bulunduğu cümlelerde:
  * **Present taraf Present ile eşleşir:** \`When the market opens (V1), stock prices fluctuate (V1).\`
  * **Past taraf Past ile eşleşir:** \`Before the audit began (V2), the manager had signed (had V3) the balance sheets.\`
  * **ASLA:** Zaman bağlacının hemen arkasındaki yan cümlede \`will\` veya \`would\` kullanılmaz! (\`When the bank *will approve* -> YANLIŞ, \`When the bank approves\` -> DOĞRU).

> 💡 **Sınav İpucu:** Cümlede 'since + geçmiş zaman' (since 2019 / since he arrived) görürseniz ana cümlede mutlaka **Present Perfect** (\`has increased\`) veya **Present Perfect Continuous** (\`has been increasing\`) arayın!`
  },
  {
    "id": "lec-eng-02",
    "section": "ingilizce",
    "topic": "Modals ve Geçmiş Çıkarım Yapıları",
    "title": "Modals ve Geçmiş Çıkarımları (Past Modals)",
    "readTime": "8 dk",
    "summary": "Geçmişe yönelik çıkarım ve pişmanlık kalıpları: should have, cannot have, must have, needn't have.",
    "content": `### 1. Standart Modal Yapıları (Temel Seviye)
* **Obligation (Zorunluluk):** \`must\` (içsel zorunluluk/kural), \`have to\` (dışsal/yasal zorunluluk).
  * *Örnek:* Commercial banks **must comply with** the regulations of the supervisory body.
* **Prohibition (Yasaklama):** \`must not\` (kesin yasak).
* **Absence of Obligation (Zorunluluk Yokluğu):** \`don't have to\` / \`needn't\` (yapmak zorunda değil).

### 2. Sınavın En Kritik Alanı: Geçmiş Modalları (Modal + Have + V3)
Bu yapılar sınav sorularında düzenli olarak test edilir:

| Kalıp | Anlamı ve İşlevi | Türkçe Karşılığı | Örnek Cümle |
| :--- | :--- | :--- | :--- |
| **should have + V3** | Geçmişte yapılmalıydı ama yapılmadı (Pişmanlık/Eleştiri) | Yapmalıydı | The engineers **should have tested** the backup system before the live deployment. |
| **must have + V3** | Geçmişe yönelik güçlü olumlu çıkarım (Kesine yakın tahmin) | Yapmış olmalı | The vault is empty; the robbers **must have known** the security code. |
| **cannot have + V3** | Geçmişe yönelik güçlü olumsuz çıkarım (İmkansızlık) | Yapmış olamaz | He **cannot have stolen** the money because he was out of the country yesterday. |
| **might / may have + V3** | Geçmişe yönelik zayıf ihtimal | Yapmış olabilir | The network failure **might have been caused** by a sudden hardware malfunction. |
| **needn't have + V3** | Yapmasına gerek yoktu ama boşuna yaptı | Yapmasına gerek yoktu | You **needn't have printed** all those loan documents; we already use digital signatures. |

> 💡 **Sınav İpucu:** Bir soruda 'sistem çöktü, keşke önceden önlem alınsaydı' teması varsa doğru cevap neredeyse her zaman **should have taken** veya **should have conducted** kalıbıdır.`
  },
  {
    "id": "lec-eng-03",
    "section": "ingilizce",
    "topic": "Şart Cümleleri (Conditionals)",
    "title": "Conditionals (Type 1, 2, 3) ve Alternatif Şart Bağlaçları",
    "readTime": "8 dk",
    "summary": "Type 1 (Gerçek), Type 2 (Hayali Şimdiki Zaman), Type 3 (Geçmiş Pişmanlık), Unless, Provided that ve In case.",
    "content": `### 1. Conditionals (Şart Cümleleri Tablosu)
* **Type 1 (Real Present / Future):** Gerçekleşmesi olası durumlar.
  * *Kural:* \`If + Present Simple (V1), will + V1\`
  * *Örnek:* If inflation **rises**, the central bank **will raise** the interest rate.
* **Type 2 (Unreal Present):** Şimdiki zamana ait hayali veya gerçekdışı durumlar.
  * *Kural:* \`If + Past Simple (V2), would / could + V1\`
  * *Örnek:* If our branch **had** more employees, we **could process** mortgage applications faster.
* **Type 3 (Unreal Past):** Geçmişte gerçekleşmemiş durumlar (Geçmiş pişmanlıklar).
  * *Kural:* \`If + Past Perfect (had V3), would have / could have + V3\`
  * *Örnek:* If they **had diversified** their loan portfolio, they **would not have suffered** heavy losses.

### 2. Alternatif Şart Bağlaçları
* **Unless (= If ... not):** -medikçe / -mezse. Kendisi olumlu çekimlenir ama anlamı olumsuzdur.
  * *Örnek:* **Unless** you verify your identity with two-factor authentication, you **cannot** access your corporate account.
* **Provided that / As long as:** -dığı sürece / şartıyla.
  * *Örnek:* You are eligible for this loan **provided that** your credit score remains high.
* **In case:** -mesi durumunda / -ar diye (Önlem bildirir).
  * *Örnek:* Keep a local copy of the customer balance sheet **in case** the cloud network disconnects.

> 💡 **Sınav İpucu:** Type 3 sorulurken virgülden sonra \`would have + V3\` varsa, \`If\` kısmında mutlaka \`had + V3\` arayın. Tersi de geçerlidir.`
  },
  {
    "id": "lec-eng-04",
    "section": "ingilizce",
    "topic": "Edilgen Çatı ve Cümle Yapıları",
    "title": "Passive Voice, Relative Clauses ve Gerund / Infinitive",
    "readTime": "8 dk",
    "summary": "Edilgen çatı çekimleri, whose ve where kullanımı, Preposition + Gerund kuralı ve sınav kalıpları.",
    "content": `### 1. Edilgen Çatı (Passive Voice)
* Eylemi yapan değil, eylemden etkilenen nesne vurgulandığında kullanılır. Temel kural: **be + V3**.
  * *Present Continuous Passive:* \`are being reviewed\` (Şu anda incelenmektedir).
  * *Present Perfect Passive:* \`have been approved\` (Onaylanmıştır).
  * *Future Passive:* \`will be implemented\` (Yürürlüğe konacaktır).
  * *Modal Passive:* \`must be encrypted\` (Şifrelenmelidir).
  * *Örnek:* All financial transactions exceeding 100.000 TL **are monitored** automatically by the anti-fraud algorithm.

### 2. Sıfat Cümlecikleri (Relative Clauses)
* **Who:** İnsanlar için özne/nesne (\`The loan officer who handled our case...\`).
* **Which:** Nesneler ve hayvanlar için (\`The legacy software which runs the mainframe...\`).
* **Whose (Sahiplik):** Kendisinden sonra doğrudan bir isim gelir (\`whose + noun\`).
  * *Örnek:* Customers **whose credit scores** are below 1200 cannot qualify for this auto loan.
* **Where:** Yer bildiren ifadeler için (\`The digital branch where all automated transfers are logged.\`).
* **Non-defining (İki virgül arası ekstra bilgi):** İki virgül arasında \`that\` KULLANILMAZ! Mutlaka \`which\` veya \`who\` kullanılır.

### 3. Gerund (-ing) ve Infinitive (to V1)
* **En Altın Kural: Preposition (Edat) + Gerund (-ing):**
  * İngilizcede tüm edatlardan (\`in\`, \`on\`, \`at\`, \`about\`, \`from\`, \`for\`, \`without\`) sonra gelen fiil mutlaka **-ing** alır!
  * *Örnek:* We look forward **to meeting** with foreign investors. (\`look forward to\` yapısındaki \`to\` bir edattır!)
  * *Örnek:* She was accused **of disclosing** confidential client credentials.
  * *Örnek:* Banks succeed **by investing** heavily in artificial intelligence.`
  },
  {
    "id": "lec-eng-05",
    "section": "ingilizce",
    "topic": "Bağlaçlar ve Cümle Tamamlama",
    "title": "Sınavın En Kritik Bağlaçları ve Cümle Tamamlama Taktikleri",
    "readTime": "9 dk",
    "summary": "Zıtlık, sebep-sonuç ve amaç bağlaçlarının cümle/isim alma kuralları, geçiş sözcükleri ve soru çözme taktikleri.",
    "content": `### 1. Zıtlık Bağlaçları (Contrast Conjunctions)
Sınavlarda en çok soru getiren kategoridir:

| Cümle Alanlar (Subject + Verb) | İsim / İsim Öbeği Alanlar (Noun / V-ing) | Geçiş Sözcükleri (Noktalama ile ayrılır) |
| :--- | :--- | :--- |
| **Although** | **Despite** | **However** |
| **Even though** | **In spite of** | **Nevertheless** |
| **While / Whereas** | **Notwithstanding** | **Nonetheless** |

* *Örnek (Cümle alan):* **Although** the benchmark interest rate was raised, consumer borrowing did not decline immediately.
* *Örnek (İsim alan):* **Despite** high inflation, retail spending remained surprisingly resilient.
* *Örnek (Geçiş sözcüğü):* The banking app suffered a server crash; **however**, no data was lost.

### 2. Sebep - Sonuç ve Amaç Bağlaçları
* **Sebep (Cümle alan):** \`Because\`, \`As\`, \`Since\` (-dığı için / çünkü).
  * *Örnek:* As raw material prices surged, producers passed the cost onto consumers.
* **Sebep (İsim alan):** \`Due to\`, \`Owing to\`, \`Because of\`, \`On account of\` (-den dolayı / nedeniyle).
  * *Örnek:* Due to unforeseen hardware failures, internet banking was halted temporarily.
* **Amaç:**
  * \`So that + Subject + Modal (can/could/may):\` -sın diye.
    * *Örnek:* The branch hired extra staff **so that** customers **could receive** prompt service.
  * \`In order to / So as to + V1:\` -mak için.
    * *Örnek:* In order to reduce operational costs, the bank digitized all manual workflows.

> 💡 **Sınav İpucu:** Boşluktan hemen sonra tam bir cümle (\`subject + verb\`) geliyorsa şıklardaki \`Despite\`, \`In spite of\`, \`Due to\` elenir; \`Although\`, \`While\`, \`Because\` seçilir. Boşluktan sonra sadece isim veya \`-ing\` varsa tersi uygulanır!`
  },
  {
    "id": "lec-eng-06",
    "section": "ingilizce",
    "topic": "Bankacılık, Finans ve Bilişim Kelime Dağarcığı",
    "title": "Banka & Finans İngilizcesi: 50 Temel Kelime ve Collocations",
    "readTime": "10 dk",
    "summary": "Assets, Liabilities, Collateral, Maturity, Amortization, Dividend, Preposition eşleşmeleri ve Phrasal Verbs.",
    "content": `### 1. Bankacılık ve Finans Terimleri Sözlüğü
* **Asset:** Varlık, aktifler (Nakit, tahvil, krediler).
* **Liability:** Yükümlülük, borç (Mevduatlar, dış borçlar).
* **Equity:** Özkaynak, hisse senedi sermayesi.
* **Collateral:** Teminat, ipotek, rehin (Kredi karşılığı gösterilen mülk veya menkul).
* **Maturity / Maturity Date:** Vade / Vade sonu tarihi.
* **Amortization:** Kredi veya borcun düzenli taksitlerle kademeli olarak geri ödenmesi / itfa.
* **Yield:** Getiri, kâr oranı.
* **Dividend:** Kâr payı, temettü (Hissedarlara dağıtılan kazanç).
* **Liquidity Squeeze:** Likidite sıkışıklığı (Nakit bulamama durumu).
* **Default:** Temerrüde düşme, borcunu vadesinde ödeyememe.
* **Solvent / Insolvent:** Borçlarını ödeyebilme gücüne sahip olma / İflas eşiğinde olma.
* **Depreciation:** Değer kaybı (Para birimi veya duran varlıklar için).
* **Fiscal Year / Fiscal Policy:** Mali yıl / Maliye politikası (Hükümet harcama ve vergi politikaları).

### 2. Sınavda En Çok Çıkan Edat Eşleşmeleri (Prepositions & Collocations)
* **comply with:** kurallara / yönetmeliğe uymak (\`comply with AML regulations\`).
* **eligible for:** bir şeye / krediye hak kazanmış, uygun (\`eligible for subsidized agricultural loans\`).
* **invest in:** bir alana yatırım yapmak (\`invest heavily in cloud infrastructure\`).
* **account for:** bir orana tekabül etmek, oluşturmak (\`digital transfers account for 70% of turnover\`).
* **susceptible to / vulnerable to:** bir tehlikeye / siber saldırıya karşı savunmasız olmak.
* **rely on / depend on:** bir şeye güvenmek, bel bağlamak.

### 3. Kritik Phrasal Verbs (Banka & Bilişim)
* **Phase out:** Kademeli olarak kullanımdan kaldırmak / devreden çıkarmak (\`phase out legacy mainframes\`).
* **Carry out:** Bir işlemi / denetimi yürütmek, uygulamak (\`carry out a security audit\`).
* **Call off:** İptal etmek (\`call off the merger negotiations\`).
* **Turn down:** Bir teklifi veya kredi başvurusunu reddetmek (\`turn down the loan request\`).
* **Bring about:** Bir değişime veya krize yol açmak, neden olmak (\`bring about economic instability\`).`
  },

  // ============================================================================
  // GENEL YETENEK & ANALİTİK DÜŞÜNME DERS NOTLARI
  // ============================================================================
  {
    "id": "lec-gy-01",
    "section": "genel-yetenek",
    "topic": "Sayısal ve Sözel Mantık Taktikleri",
    "title": "Problem Çözme Kısayolları ve Sözel Mantık Tablo Kurma",
    "readTime": "7 dk",
    "summary": "Faiz, yüzde, hız problemleri formülleri ve sözel mantıkta hata yaptırmayan tablo çizim yöntemi.",
    "content": `### 1. Sayısal Problem Çözüm Formülleri
* **Basit Faiz Formülü:** \`Faiz (F) = (Anapara * Faiz Oranı * Zaman) / Payda\`
  * Yıllık: \`(A * n * t) / 100\`
  * Aylık: \`(A * n * t) / 1200\`
  * Günlük: \`(A * n * t) / 36000\` (Bankacılık hesaplamalarında 1 yıl 360 gün alınır).
* **Ortalama Hız Formülü:** İki şehir arası gidiş hızı V1, dönüş hızı V2 ise:
  * \`V_ort = (2 * V1 * V2) / (V1 + V2)\` (Harmonik Ortalama).
* **Yüzde ve Kar-Zarar:** Bir ürünün maliyetine 100x deyin. %30 karlı satış = 130x. Bu fiyata %20 indirim = 130x * 0.8 = 104x (%4 net kar).

### 2. Sözel Mantıkta 3 Adımda Tablo Kurma
1. **Sabit Değişkeni Bulun:** Günler (Pzt-Paz), sıralar (1-5) veya katlar gibi sıralı olan nesneleri tablonun başlığı yapın.
2. **Kesin Bilgileri Yerleştirin:** \"Deniz 3. gündür\", \"Burak kesinlikle Cuma değildir\" gibi net verileri doğrudan kutucuklara yazın.
3. **Bağlantılı Öbekleri Gruplayın:** \"Ali, Can'dan hemen önceki gündür\" bilgisi \`[Ali, Can]\` şeklinde bitişik bir bloktur. Yalnızca 2 kişilik boş yer arayın!`
  },
  {
    "id": "lec-gy-02",
    "section": "genel-yetenek",
    "topic": "Örüntü ve Matris Çözüm Stratejileri",
    "title": "Örüntü Tamamlama, 3x3 Matrisler ve Uzamsal İlişkiler",
    "readTime": "8 dk",
    "summary": "Sayı dizisi çözüm adımları, görsel matrislerde rotasyon/XOR mantığı ve küp açılımlarında zıt yüz kuralı.",
    "content": `### 1. Sayı Dizilerinde 5 Temel İnceleme Adımı
Soruyla karşılaştığınızda sırasıyla şu kuralları test edin:
1. **Birinci Farklar:** Ardışık terimler arasındaki farkları yazın (+3, +5, +7...).
2. **İkinci Farklar:** Farklar eşit değilse farkların farkına bakın (ikinci dereceden artış).
3. **Çift Diziler (Alternatif Dizi):** Tek numaralı terimler ile çift numaralı terimleri ayrı ayrı inceleyin.
4. **Çarpma ve Toplama Kombinasyonu:** $x_{n+1} = 2x_n + 1$ veya $x_{n+1} = 3x_n - 2$ kalıplarını deneyin.
5. **Kuvvet Serileri:** $n^2 + 1, n^2 - 1, n^3 + 1$ veya Fibonacci ($x_n = x_{n-1} + x_{n-2}$) toplamı.

### 2. Görsel 3x3 Matris Tamamlama Kuralları
* **Satır veya Sütun Rotasyonu:** Şeklin her kutuda saat yönünde veya tersinde 45°, 90° dönmesi.
* **XOR (Mantıksal Dışlama) Kuralı:** İlk iki kutudaki şekiller üst üste bindirildiğinde, **aynı olan çizgiler silinir, farklı olan çizgiler 3. kutuda kalır!**
* **Eleman Sayısı Korunumu:** Her satırdaki toplam siyah daire veya kenar sayısı birbirine eşittir.

### 3. Küp Açılımları ve Uzamsal İlişkiler
* **Karşıt Yüz Kuralı:** Açık bir küpte arada 1 kare boşluk bırakan yüzler küp kapatıldığında birbirine zıt (karşıt) gelir.
* **Temel Kural:** Zıt yüzler küpün hiçbir perspektifinden **aynı anda yan yana görünemez!** Şıklarda yan yana duran karşıt yüzleri doğrudan eleyin.`
  },

  // ============================================================================
  // BİLGİSAYAR MÜHENDİSLİĞİ ALAN NOTLARI (MEVCUT VE GÜÇLENDİRİLMİŞ)
  // ============================================================================
  {
    "id": "lec-alan-01",
    "section": "alan",
    "topic": "Algoritma ve Programlama Mantığı",
    "title": "Karmaşıklık Analizi (Big-O) ve Sıralama/Arama Algoritmaları",
    "readTime": "7 dk",
    "summary": "Big-O notasyonu, en kötü durum analizleri, sıralama algoritmalarının maliyetleri ve arama teknikleri.",
    "content": `### 1. Zaman ve Alan Karmaşıklığı (Asymptotic Notation)
* **O(1) - Sabit Zaman:** Girdi boyutu ne olursa olsun işlem süresi değişmez (Örn: Dizi indeksine erişim, Hash Table okuma).
* **O(log n) - Logaritmik Zaman:** Her adımda problem boyutu yarıya iner (Örn: Sıralı dizide İkili Arama / Binary Search).
* **O(n) - Doğrusal Zaman:** Eleman sayısı kadar işlem (Örn: Sırasız dizide doğrusal arama, tek döngü).
* **O(n log n) - Doğrusal Logaritmik:** Karşılaştırma tabanlı en verimli sıralama algoritmaları (Merge Sort, Heap Sort).
* **O(n²) - Karesel Zaman:** İç içe iki döngü (Örn: Bubble Sort, Selection Sort, Insertion Sort, en kötü durumda Quick Sort).

### 2. Temel Sıralama Algoritmaları Karşılaştırması
| Algoritma | En İyi (Best) | Ortalama (Avg) | En Kötü (Worst) | Bellek (Space) | Kararlılık (Stable) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Quick Sort** | O(n log n) | O(n log n) | **O(n²)** | O(log n) | Hayır |
| **Merge Sort** | O(n log n) | O(n log n) | **O(n log n)** | **O(n)** | **Evet** |
| **Heap Sort** | O(n log n) | O(n log n) | **O(n log n)** | **O(1)** | Hayır |
| **Insertion Sort** | **O(n)** | O(n²) | O(n²) | O(1) | Evet |

> 💡 **Sınav İpucu:** Quick Sort pratikte önbellek dostu olduğu için çok hızlıdır ancak pivot en kötü seçilirse O(n²) olur. Merge Sort garanti O(n log n)'dir ama O(n) ekstra bellek ister.`
  },
  {
    "id": "lec-alan-02",
    "section": "alan",
    "topic": "Veri Yapıları ve Problem Çözme",
    "title": "Temel Veri Yapıları: Stack, Queue, Hash Table ve Ağaçlar",
    "readTime": "8 dk",
    "summary": "LIFO/FIFO yapıları, Hash çakışmaları, İkili Arama Ağaçları (BST) ve Dengeleme (AVL/Heap).",
    "content": `### 1. Yığın (Stack) ve Kuyruk (Queue)
* **Stack (Yığın):** **LIFO** (Last In, First Out). Fonksiyon çağrı yığını (Call Stack), parantez eşleme, Geri Al (Undo) mekanizmalarında kullanılır. Temel işlemler: \`push\`, \`pop\`, \`peek\` (Tümü O(1)).
* **Queue (Kuyruk):** **FIFO** (First In, First Out). Yazıcı kuyrukları, BFS (Genişlik Öncelikli Arama), mesajlaşma sistemleri (RabbitMQ, Kafka). Temel işlemler: \`enqueue\`, \`dequeue\` (Tümü O(1)).

### 2. Hash Tabloları (Hash Table)
* Anahtar-Değer (Key-Value) eşlemesi. Ortalama arama, ekleme, silme: **O(1)**. En kötü durumda çakışmalar (Collision) nedeniyle **O(n)**.
* **Çakışma Çözme:** Chaining (Bağlı liste ile zincirleme) veya Open Addressing (Linear Probing, Quadratic Probing).

### 3. Ağaç Yapıları (Trees)
* **Binary Search Tree (BST):** Sol çocuk < Kök < Sağ çocuk. Dengeliyse arama/ekleme/silme **O(log n)**, zincir haline gelirse **O(n)**.
* **AVL Ağacı:** Kendini dengeleyen BST'dir. Yükseklik farkı (Balance Factor) en fazla 1 olabilir. Denge bozulduğunda döndürmeler (Rotations) yapılır.
* **Heap (Öbek):** Öncelik kuyruklarında (Priority Queue) kullanılır. Max-Heap'te en büyük eleman, Min-Heap'te en küçük eleman köktedir. Ekleme ve çıkarma **O(log n)**.`
  },
  {
    "id": "lec-alan-03",
    "section": "alan",
    "topic": "Veri Tabanı ve SQL",
    "title": "SQL Sorguları, Normalizasyon ve ACID Prensipleri",
    "readTime": "9 dk",
    "summary": "JOIN çeşitleri, 1NF-BCNF kuralları, transaction yönetimi ve bankacılık ACID garantileri.",
    "content": `### 1. SQL JOIN Türleri
* **INNER JOIN:** Yalnızca her iki tabloda da ON koşuluyla eşleşen satırları döndürür.
* **LEFT JOIN:** Sol tablodaki tüm satırları getirir; sağda eşleşmeyenler için sütunlar \`NULL\` olur.
* **GROUP BY ve HAVING:** \`WHERE\` satır bazlı filtreleme yaparken, \`HAVING\` gruplanmış aggregate sonuçlarını (\`COUNT\`, \`SUM\`, \`AVG\`) filtreler.

### 2. Transaction ve ACID Prensipleri (Bankacılık için Hayati)
* **A - Atomicity (Bölünemezlik):** Ya hep ya hiç! İşlem ya tamamen commit edilir ya da rollback ile iptal edilir.
* **C - Consistency (Tutarlılık):** Veritabanı kurallarına ve kısıtlarına her zaman uyulur.
* **I - Isolation (Yalıtım):** Aynı anda çalışan işlemler birbirinin ara durumlarını görmez.
* **D - Durability (Kalıcılık):** Commit edilen işlem sistem çökse dahi diskte kalıcıdır.

### 3. Normalizasyon Aşamaları
* **1NF:** Her sütunda atomik (bölünemez) tek bir değer olmalı, tekrarlayan gruplar bulunmamalı.
* **2NF:** 1NF olmalı + Kısmi bağımlılık (Partial Dependency) olmamalı.
* **3NF:** 2NF olmalı + Geçişli bağımlılık (Transitive Dependency) olmamalı.
* **BCNF:** Her belirleyici bir aday anahtar (Candidate Key) olmalıdır.`
  },
  {
    "id": "lec-alan-04",
    "section": "alan",
    "topic": "Yazılım Mühendisliği ve Sistem Geliştirme",
    "title": "SOLID Prensipleri, Tasarım Desenleri ve SDLC",
    "readTime": "8 dk",
    "summary": "Nesne yönelimli tasarımın 5 temel ilkesi, GoF tasarım desenleri ve Çevik (Agile/Scrum) metodolojiler.",
    "content": `### 1. SOLID Prensipleri
* **S - Single Responsibility:** Bir sınıfın değişmek için yalnızca tek bir nedeni (tek sorumluluğu) olmalıdır.
* **O - Open/Closed:** Sınıflar genişletilmeye açık (Open for extension), değiştirilmeye kapalı (Closed for modification) olmalıdır.
* **L - Liskov Substitution:** Alt sınıflar, üst sınıflarının yerine geçebilmeli ve davranışı bozmamalıdır.
* **I - Interface Segregation:** İstemciler kullanmadıkları metotları içeren şişkin arayüzlere zorlanmamalıdır.
* **D - Dependency Inversion:** Yüksek seviyeli modüller doğrudan düşük seviyeli modüllere değil, soyutlamalara (interfaces) bağımlı olmalıdır.

### 2. Yaygın Tasarım Desenleri (Design Patterns)
* **Singleton:** Tek nesne üretimi ve küresel erişim noktası.
* **Factory Method:** Nesne üretim mantığını istemciden gizleyip alt sınıflara devretme.
* **Observer:** Bir nesnedeki değişikliği tüm abonelere otomatik bildirme.
* **Adapter:** Uyumsuz arayüzleri dönüştürerek birlikte çalıştırma.`
  },
  {
    "id": "lec-alan-05",
    "section": "alan",
    "topic": "Bilgisayar Ağları ve İşletim Sistemleri",
    "title": "OSI 7 Katmanı, TCP/IP ve İşletim Sistemi Kavramları",
    "readTime": "9 dk",
    "summary": "Ağ protokolleri, TCP vs UDP, Süreç ve Thread ayrımı, Deadlock 4 şartı, Sanal Bellek.",
    "content": `### 1. OSI Katmanları ve Protokoller
* **7. Uygulama:** HTTP, HTTPS, DNS, DHCP, FTP, SMTP
* **6. Sunum:** TLS/SSL, Şifreleme, Sıkıştırma
* **5. Oturum:** Oturum yönetimi
* **4. Taşıma:** **TCP** (Güvenilir, bağlantı odaklı, 3-way handshake) vs **UDP** (Hızlı, bağlantısız, ses/video)
* **3. Ağ:** IP, ICMP, Yönlendiriciler (Router)
* **2. Veri Bağlantısı:** MAC adresleri, Çerçeveler (Frame), Switch
* **1. Fiziksel:** Bitler, kablolar, sinyaller

### 2. İşletim Sistemleri Temelleri
* **Process vs Thread:** Process bağımsız bellek alanına sahiptir; Thread aynı process içindeki Heap ve kaynakları paylaşır.
* **Deadlock (Kilitlenme) 4 Şartı (Coffman):**
  1. Mutual Exclusion (Karşılıklı Dışlama)
  2. Hold and Wait (Tut ve Bekle)
  3. No Preemption (Zorla Alma Yok)
  4. Circular Wait (Dairesel Bekleme)
* **Sanal Bellek ve Paging:** İstenen sayfa RAM'de yoksa **Page Fault** oluşur ve diskten (swap) yüklenir.`
  },
  {
    "id": "lec-alan-06",
    "section": "alan",
    "topic": "Bilgi Güvenliği Temelleri",
    "title": "Siber Güvenlik, Kriptografi ve OWASP Top 10",
    "readTime": "8 dk",
    "summary": "CIA Üçlüsü, simetrik vs asimetrik şifreleme, web saldırıları (SQLi, XSS, CSRF) ve bankacılık veri güvenliği.",
    "content": `### 1. CIA Üçlüsü (Bilgi Güvenliğinin Temeli)
* **Confidentiality (Gizlilik):** Veriye yalnızca yetkili kişilerin erişebilmesi (Şifreleme).
* **Integrity (Bütünlük):** Verinin yetkisiz kişilerce bozulmaması (Hash fonksiyonları, dijital imza).
* **Availability (Erişilebilirlik):** Sistemin ihtiyaç duyulduğunda çalışır olması (DDoS koruması, yedeklilik).

### 2. Kriptografi ve Parola Güvenliği
* **Simetrik:** Tek anahtar (AES). Çok hızlıdır.
* **Asimetrik:** Çift anahtar (RSA, ECC). Public key şifreler, Private key çözer.
* **Hash (Özetleme):** Tek yönlüdür (SHA-256, bcrypt). Parolalar tuzlama (salt) ile saklanır.

### 3. OWASP Web Saldırıları
* **SQL Injection (SQLi):** Doğrulanmamış girdinin sorguya sızması. Çözüm: Prepared Statements.
* **Cross-Site Scripting (XSS):** Kullanıcı tarayıcısında zararlı JavaScript çalıştırma.
* **CSRF (Siteler Arası İstek Sahteciliği):** Kullanıcı oturumuyla habersiz istek yapma. Çözüm: Anti-CSRF Token.`
  }
];

const outputPath = path.join(__dirname, '..', 'data', 'lectures.json');
fs.writeFileSync(outputPath, JSON.stringify(lectures, null, 2), 'utf8');
console.log(`lectures.json successfully written with ${lectures.length} comprehensive lectures.`);

// Section summary
const summary = {};
lectures.forEach(l => {
  summary[l.section] = (summary[l.section] || 0) + 1;
});
console.log('Breakdown by section:', summary);
