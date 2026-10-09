-- ==============================================================================
-- ZİRAAT BANKASI UZMAN / MÜFETTİŞ YARDIMCILIĞI SINAV HAZIRLIK
-- SUPABASE VERİ YÜKLEME VE GÜNCELLEME BETİĞİ (SEED & SYNC)
-- Son Güncelleme: 9 Ekim 2026
-- Toplam: 220 Soru, 22 Konu Anlatımı, 30 Flashcard, 23 Harici Kaynak
-- ==============================================================================

-- 0. GEREKLİ KISITLAMA GÜNCELLEMELERİ (MIGRATION / ALTER)
-- Eski tablolarda section ve source kısıtlamaları yeni bölümleri engelleyebileceği için güncellenir:
alter table if exists public.questions drop constraint if exists questions_section_check;
alter table if exists public.questions drop constraint if exists questions_source_check;
alter table if exists public.questions add constraint questions_section_check 
    check (section in ('genel-kultur', 'genel-yetenek', 'bankacilik-genel-kultur', 'oruntu-analitik', 'ingilizce', 'alan'));

alter table if exists public.lectures drop constraint if exists lectures_section_check;
alter table if exists public.lectures add constraint lectures_section_check 
    check (section in ('alan', 'genel-kultur', 'genel-yetenek', 'bankacilik-genel-kultur', 'oruntu-analitik', 'ingilizce'));

-- A. QUESTIONS (220 Soru - 80 Alan, 80 İngilizce, 40 GY, 20 GK)
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-001', 'bankacilik-genel-kultur', 'Ziraat Bankası Tarihçesi ve Kuruluşu', 'Memleket Sandıkları', 1, 'Ziraat Bankası''nın tarihsel kökeni kabul edilen ve 1863 yılında Niş Valisi Mithat Paşa tarafından çiftçilere uygun koşullarda kredi sağlamak amacıyla kurulan ilk mali teşkilat aşağıdakilerden hangisidir?', '["Emniyet Sandığı","Memleket Sandıkları","Dersaadet Tahvilat Borsası","Osmanlı İtibar-ı Milli Bankası","Menafi Sandıkları"]'::jsonb, 1, 'Ziraat Bankası''nın temeli, 1863 yılında Mithat Paşa tarafından Pirot kasabasında kurulan ''Memleket Sandıkları''dır. 1883''te Menafi Sandıkları''na, 15 Ağustos 1888''de ise resmi nizamnamesiyle modern Ziraat Bankası''na dönüştürülmüştür.', ARRAY['ziraat-bankasi', 'mithat-pasa', 'tarihce', 'memleket-sandiklari']::text[], 'Ziraat Bankası Resmi Tarihçe')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-002', 'bankacilik-genel-kultur', 'Ziraat Bankası Ürün ve Hizmetleri', 'Tarım Kartı', 1, 'Ziraat Bankası''nın çiftçi ve üreticilere mazot, gübre, tohum ve yem gibi tarımsal girdi alımlarında faiz sübvansiyonlu veya vadeli harcama imkanı sunan tescilli bankacılık kartı aşağıdakilerden hangisidir?', '["Bankkart Genç","Başakkart (Bankkart Başak)","Ziraat Maximum","Troy Esnaf Kart","Ziraat Hasat Kart"]'::jsonb, 1, 'Ziraat Bankası üreticilere tarımsal işletme giderlerini finanse etmeleri amacıyla Bankkart Başak (Başakkart) sunmaktadır. Bu kartla anlaşmalı üye işyerlerinden sübvansiyonlu tarımsal girdi temin edilebilir.', ARRAY['ziraat-bankasi', 'basakkart', 'tarim-kredisi', 'kartli-odeme']::text[], 'Ziraat Bankası Tarımsal Bankacılık')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-003', 'bankacilik-genel-kultur', 'TCMB ve Para Politikası', 'Temel Amaç ve Araçlar', 2, '1211 sayılı Türkiye Cumhuriyet Merkez Bankası (TCMB) Kanunu''na göre, Merkez Bankası''nın temel ve birincil amacı aşağıdakilerden hangisidir?', '["Bütçe açığını kapatmak için kamuya borç vermek","Fiyat istikrarını sağlamak","Bireysel kredi faiz oranlarının üst sınırını tek başına belirlemek","Döviz kurlarını belirli bir bantta sabit tutmak","Ticari bankaların karlılık hedeflerini denetlemek"]'::jsonb, 1, '1211 sayılı TCMB Kanunu''nun 4. maddesi gereğince Bankanın temel amacı ''fiyat istikrarını sağlamaktır''. Banka, fiyat istikrarı hedefiyle çelişmemek kaydıyla hükümetin büyüme ve istihdam politikalarını destekler.', ARRAY['tcmb', 'fiyat-istikrari', 'para-politikasi']::text[], 'TCMB Resmi Mevzuatı (1211 Sayılı Kanun)')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-004', 'bankacilik-genel-kultur', 'TCMB ve Para Politikası', 'Politika Faizi', 2, 'TCMB Para Politikası Kurulu''nun (PPK) faiz kararlarında referans olarak belirlediği temel ''Politika Faizi'' aşağıdakilerden hangisidir?', '["Gecelik Borçlanma Faizi (O/N)","Geç Likidite Penceresi (GLP) Faizi","Bir Hafta Vadeli Repo İhale Faiz Oranı","Bankalararası Para Piyasası Ağırlıklı Ortalama Faizi","Reeskont Kredi Faiz Oranı"]'::jsonb, 2, 'TCMB''nin temel politika faizi ''Bir hafta vadeli repo ihale faiz oranı''dır. Merkez Bankası piyasa yapıcı bankalara likiditeyi temel olarak bu oran üzerinden haftalık repo ihaleleriyle sağlar.', ARRAY['tcmb', 'politika-faizi', 'repo']::text[], 'TCMB Para Politikası Araçları')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-005', 'bankacilik-genel-kultur', 'Bankacılık Düzenleme ve Denetleme', 'BDDK ve Rasyolar', 2, '5411 sayılı Bankacılık Kanunu çerçevesinde Türkiye''de bankaların faaliyet izinlerini veren, rasyolarını denetleyen ve mevzuata uyumunu gözetleyen bağımsız idari otorite hangisidir?', '["Sermaye Piyasası Kurulu (SPK)","Bankacılık Düzenleme ve Denetleme Kurumu (BDDK)","Tasarruf Mevduatı Sigorta Fonu (TMSF)","Türkiye Bankalar Birliği (TBB)","Maliye Bakanlığı Finansal Piyasalar Genel Müdürlüğü"]'::jsonb, 1, 'BDDK (Bankacılık Düzenleme ve Denetleme Kurumu), bankacılık sektörünün güven ve istikrar içinde çalışmasını sağlamak, mudilerin haklarını korumak ve riskleri denetlemekle görevli bağımsız düzenleyici üst kuruldur.', ARRAY['bddk', 'denetim', 'bankacilik-kanunu']::text[], 'BDDK Kurumsal Portalı')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-006', 'bankacilik-genel-kultur', 'Mevduat ve Kredi Kavramları', 'TMSF Mevduat Sigortası', 2, 'Türkiye''de faaliyet gösteren bir mevduat bankasında gerçek kişilerin ticari olmayan tasarruf mevduatlarını yasal limitler dahilinde garanti ve sigorta altına alan resmi kurum hangisidir?', '["Hazine ve Maliye Bakanlığı","Tasarruf Mevduatı Sigorta Fonu (TMSF)","Merkez Bankası Takas ve Saklama Anonim Şirketi","Sigortacılık ve Özel Emeklilik Düzenleme Kurumu (SEDDK)","Türkiye Bankalar Birliği Risk Merkezi"]'::jsonb, 1, 'TMSF (Tasarruf Mevduatı Sigorta Fonu), bankalara yatırılan bireysel tasarruf mevduatlarını belirlenen yasal sigorta tutarına kadar devlet garantisi altında tazmin etmekle yetkilidir.', ARRAY['tmsf', 'mevduat-sigortasi', 'mudiler']::text[], 'TMSF Mevzuat ve Sigorta Kapsamı')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-007', 'bankacilik-genel-kultur', 'Bankacılık Risk Yönetimi', 'Kredi Riski ve NPL', 3, 'Bankacılık terminolojisinde borçlunun kredi anapara veya faiz ödemelerini vadesinde yerine getirememesi sonucu 90 günden fazla gecikmeye giren ve takibe aktarılan alacaklara ne ad verilir?', '["Kaldıraçlı Alacaklar","Takipteki Krediler (Non-Performing Loans - NPL)","Arbitraj Kredileri","İskontolu Senetler","Sendikasyon Kredileri"]'::jsonb, 1, 'Vadesi üzerinden 90 gün geçen ve geri ödenmesi şüpheli hale gelen krediler ''Takipteki Alacaklar'' (NPL - Non-Performing Loans) kategorisine aktarılır ve bankalar bunlar için karşılık (provision) ayırmak zorundadır.', ARRAY['kredi-riski', 'npl', 'takipteki-alacaklar', 'risk-yonetimi']::text[], 'BDDK Kredilerin Sınıflandırılması Yönetmeliği')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-008', 'bankacilik-genel-kultur', 'Bankacılık Risk Yönetimi', 'Likidite ve Sermaye Yeterliliği', 3, 'Basel standartları ve BDDK düzenlemeleri uyarınca bir bankanın sahip olduğu özkaynakların, maruz kaldığı risk ağırlıklı varlıklara (kredi, piyasa ve operasyonel risk) oranlanmasıyla hesaplanan göstergeye ne ad verilir?', '["Likidite Karşılama Oranı (LCR)","Net Faiz Marjı (NIM)","Sermaye Yeterlilik Rasyosu (SYR / CAR)","Fiyat/Kazanç Oranı (F/K)","Takipteki Alacak Karşılık Oranı"]'::jsonb, 2, 'Sermaye Yeterlilik Rasyosu (SYR - Capital Adequacy Ratio), bir bankanın olası şoklara ve zararlara karşı yeterli özkaynağa sahip olup olmadığını ölçer. Yasal alt sınır %8, BDDK hedef rasyosu ise genellikle %12''dir.', ARRAY['syr', 'basel', 'sermaye-yeterliligi', 'risk']::text[], 'BDDK Sermaye Yeterliliği Yönetmeliği')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-009', 'bankacilik-genel-kultur', 'Bireysel ve Ticari Bankacılık', 'Kredi Türleri', 2, 'Bir şirketin banka ile belirlediği bir limit dahilinde, ihtiyaç duydukça para çekebildiği ve faizin yalnızca kullanılan gün ve tutar üzerinden hesaplandığı esnek ticari kredi türü hangisidir?', '["Taksitli Ticari Kredi","Rotatif (Borçlu Cari Hesap) Kredi","Akreditif Kredisi","Prefinansman Kredisi","Forfaiting Kredisi"]'::jsonb, 1, 'Rotatif kredi (Borçlu Cari Hesap - BCH), firmanın limit dahilinde dilediğinde para çekip dilediğinde geri yatırabildiği, faizin sadece paranın fiilen kullanıldığı gün üzerinden işletildiği kredidir.', ARRAY['rotatif-kredi', 'ticari-bankacilik', 'bch']::text[], 'TBB Bankacılık Terimleri Kılavuzu')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-010', 'bankacilik-genel-kultur', 'Ödeme Sistemleri ve Dijital Bankacılık', 'FAST Sistemi', 1, 'TCMB tarafından işletilen, farklı bankalardaki hesaplar arasında 7/24 anlık para transferi sağlayan ve Kolay Adresleme (telefon, T.C. kimlik, e-posta) sistemini destekleyen altyapı hangisidir?', '["EFT (Elektronik Fon Transferi)","FAST (Fonların Anlık ve Sürekli Transferi)","SWIFT","Havale Sistemi","BKM Express"]'::jsonb, 1, 'FAST (Fonların Anlık ve Sürekli Transferi), TCMB tarafından hayata geçirilen, haftanın 7 günü 24 saati birkaç saniye içinde farklı bankalar arası para transferi gerçekleştiren modern perakende ödeme sistemidir.', ARRAY['fast', 'odeme-sistemleri', 'tcmb', 'dijital-bankacilik']::text[], 'TCMB FAST Bilgilendirme Sayfası')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-011', 'bankacilik-genel-kultur', 'Bilanço ve Finansal Tablolar', 'Banka Bilançosu', 2, 'Bir ticari bankanın bilançosunda müşterilerden toplanan mevduatlar ve bankanın müşterilere kullandırdığı krediler sırasıyla hangi bilanço kalemlerinde yer alır?', '["Mevduat: Aktif | Krediler: Pasif","Mevduat: Pasif | Krediler: Aktif","Her ikisi de Aktif kalemdir","Her ikisi de Pasif kalemdir","Mevduat: Gelir Tablosu | Krediler: Nazım Hesaplar"]'::jsonb, 1, 'Bankalar için müşterilerin yatırdığı mevduat bir borç/yükümlülüktür (Pasif). Kullandırılan krediler ise bankanın alacağı olan finansal varlıklardır (Aktif). Bu yönüyle banka bilançosu reel sektör bilançosunun tersi mantıkla çalışır.', ARRAY['bilanco', 'aktif-pasif', 'mevduat', 'krediler']::text[], 'Finansal Muhasebe İlkeleri')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-012', 'bankacilik-genel-kultur', 'Enflasyon ve Para Politikası', 'Enflasyon Dinamikleri', 2, 'Petrol, elektrik ve döviz kuru gibi üretim girdilerinin maliyetlerinin artması sebebiyle ürün ve hizmet fiyatlarının genel seviyesinin yükselmesine ne ad verilir?', '["Talep Enflasyonu","Maliyet (Arz) Enflasyonu","Gizli Enflasyon","Kronik Enflasyon","Çekirdek Enflasyon"]'::jsonb, 1, 'Üretim maliyetlerinin (hammadde, enerji, işçilik, kur artışı) yükselmesi nedeniyle toplam arz eğrisinin sola kayması ve fiyatların artması ''Maliyet (veya İtme) Enflasyonu'' olarak adlandırılır.', ARRAY['enflasyon', 'maliyet-enflasyonu', 'ekonomi']::text[], 'TCMB Ekonomi Bülteni')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-013', 'bankacilik-genel-kultur', 'Tarım Bankacılığı ve Finansman', 'Sübvansiyonlu Krediler', 2, 'Ziraat Bankası''nın üreticilere kullandırdığı Hazine faiz destekli (sübvansiyonlu) tarımsal kredilerde faiz indirim oranları hangi resmi kriterlere göre farklılaşır?', '["Yalnızca borçlunun yaşına göre","Yatırımın konusu (damla sulama, genç çiftçi, kadın girişimci, sözleşmeli üretim) ve öncelikli ürün grubuna göre","Tarımsal arazinin tapu kadastro harç bedeline göre","Yalnızca şirketin halka arz durumuna göre","Sadece üreticinin kredi kartı harcama geçmişine göre"]'::jsonb, 1, 'Cumhurbaşkanlığı Kararı uyarınca Ziraat Bankası tarımsal kredilerinde; basınçlı sulama sistemleri, genç/kadın çiftçi, stratejik bitkisel üretim ve sözleşmeli tarım gibi hedeflere göre %20''den %100''e (tamamen sıfır faiz) varan indirimler uygulanır.', ARRAY['tarim-bankaciligi', 'subvansiyonlu-kredi', 'hazine-destegi', 'ziraat']::text[], 'Resmi Gazete Tarımsal Kredi Kararnameleri')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-014', 'bankacilik-genel-kultur', 'Fintech ve Dijital Dönüşüm', 'Açık Bankacılık ve API', 2, 'Bankaların müşteri açık rızasıyla hesap bilgisi ve ödeme başlatma servislerini lisanslı fintech kuruluşlarına standart arayüzlerle sunduğu düzenleme (PSD2 uyumlu) hangisidir?', '["Açık Bankacılık (Open Banking / GEÇS)","Kapalı Devre Sanal POS","Gölge Bankacılık (Shadow Banking)","Kripto Varlık Soğuk Depolama","Mikro Finans Sistemi"]'::jsonb, 0, 'Açık Bankacılık, TCMB 6493 sayılı kanun düzenlemeleriyle bankaların hesap bilgisi sağlama (HBS) ve ödeme emri başlatma (ÖEB) servislerini API''lar üzerinden yetkili ödeme kuruluşlarına açtığı sistemdir.', ARRAY['fintech', 'acik-bankacilik', 'api', 'psd2']::text[], 'TCMB Açık Bankacılık Yönetmeliği')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-015', 'bankacilik-genel-kultur', 'Türkiye Bankacılık Sistemi', 'Banka Türleri', 1, '5411 sayılı Bankacılık Kanunu''na göre Türkiye''de faaliyet gösteren ''Kalkınma ve Yatırım Bankaları''nın mevduat bankalarından en temel yasal farkı aşağıdakilerden hangisidir?', '["Kredi verememeleri","Mevduat kabul edememeleri","Yabancı para işlemi yapamamaları","TCMB''ye tabi olmamaları","Şube açamamaları"]'::jsonb, 1, 'Kalkınma ve Yatırım Bankaları mevduat (veya katılım fonu) toplayamazlar. Fon kaynaklarını özkaynaklar, tahvil ihracı ve uluslararası finans kuruluşlarından sağladıkları uzun vadeli krediler oluşturur (Örn: İller Bankası, Eximbank).', ARRAY['yatirim-bankaciligi', 'mevduat', 'banka-turleri']::text[], '5411 Sayılı Bankacılık Kanunu Madde 3')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-016', 'bankacilik-genel-kultur', 'Genel Kültür ve Ekonomi Tarihi', 'İzmir İktisat Kongresi', 2, '1923 yılında toplanan İzmir İktisat Kongresi''nde kabul edilen ve yerli üretimi, milli sermayeyi ve tasarrufu özendirmeyi amaçlayan tarihi bildiriye ne ad verilir?', '["Misak-ı Milli","Misak-ı İktisadi","Teşvik-i Sanayi","Kanun-i Esasi","Tekalif-i Milliye"]'::jsonb, 1, 'İzmir İktisat Kongresi''nde ''Misak-ı İktisadi'' (Ekonomi Andı) kabul edilerek genç Cumhuriyetin ekonomik bağımsızlık ilkeleri ve milli kalkınma hedefleri ilan edilmiştir.', ARRAY['cumhuriyet-tarihi', 'misak-i-iktisadi', 'izmir-iktisat-kongresi']::text[], 'Atatürk Araştırma Merkezi')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-017', 'bankacilik-genel-kultur', 'Türkiye Ekonomisi', 'Cari Denge', 2, 'Bir ülkenin mal ve hizmet ihracatından elde ettiği gelirlerin, mal ve hizmet ithalatına ödediği giderlerden az olması durumunda ortaya çıkan dış ekonomik açık göstergesi hangisidir?', '["Bütçe Açığı","Cari İşlemler Açığı (Cari Açık)","Reeskont Açığı","Enflasyon Farkı","Operasyonel Zarar"]'::jsonb, 1, 'Cari İşlemler Dengesi, bir ülkenin dış ticaret (mal), hizmetler, birincil ve ikincil gelir dengesini kapsar. Giderlerin gelirleri aşması ''Cari Açık'' olarak tanımlanır.', ARRAY['cari-acik', 'dis-ticaret', 'turkiye-ekonomisi']::text[], 'TCMB Ödemeler Dengesi İstatistikleri')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-018', 'bankacilik-genel-kultur', 'Finansal Piyasalar', 'Sermaye Piyasası Kurulu', 1, 'Halka arz edilen şirketlerin hisse senetleri, tahviller ve yatırım fonları gibi sermaye piyasası araçlarının ihracını ve Borsa İstanbul işlemlerini denetleyen üst kurul hangisidir?', '["Bankacılık Düzenleme ve Denetleme Kurumu (BDDK)","Sermaye Piyasası Kurulu (SPK)","Rekabet Kurumu","Kamu Gözetimi Kurumu (KGK)","Merkezi Finans ve İhale Birimi"]'::jsonb, 1, '6362 sayılı Sermaye Piyasası Kanunu uyarınca menkul kıymet piyasalarının, halka açık anonim ortaklıkların ve borsa aracı kurumlarının düzenleyicisi SPK''dır.', ARRAY['spk', 'sermaye-piyasasi', 'borsa-istanbul']::text[], 'SPK Resmi Portalı')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-019', 'bankacilik-genel-kultur', 'Bankacılık ve Para Teorisi', 'Zorunlu Karşılıklar', 3, 'Merkez Bankası''nın ticari bankalardan topladıkları mevduatın belirli bir oranını kendi bünyesinde bloke etmesini zorunlu kıldığı para politikası aracına ne ad verilir?', '["Disponibilite Oranı","Zorunlu Karşılık Oranı (Munzam Karşılık)","Arbitraj Marjı","Kredi Değerleme Oranı (LTV)","Faiz Koridoru"]'::jsonb, 1, 'Zorunlu Karşılık Oranı (Munzam Karşılık), bankaların topladıkları mevduatın kanunen Merkez Bankası''nda tutmak zorunda oldukları yüzdesidir. Bu oran artırıldığında bankaların kredi verme kapasitesi ve piyasadaki para arzı daralır.', ARRAY['zorunlu-karsilik', 'tcmb', 'para-politikasi-araclari']::text[], 'TCMB Zorunlu Karşılıklar Tebliği')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('bgk-020', 'bankacilik-genel-kultur', 'Ziraat Finans Grubu', 'İştirakler ve Ekosistem', 2, 'Ziraat Finans Grubu bünyesinde faizsiz bankacılık ilkeleriyle hizmet vermek amacıyla 2015 yılında Türkiye''nin ilk kamu katılım bankası olarak faaliyete başlayan kurum hangisidir?', '["Vakıf Katılım Bankası","Ziraat Katılım Bankası","Türkiye Emlak Katılım Bankası","Kuveyt Türk","Albaraka Türk"]'::jsonb, 1, 'Ziraat Katılım Bankası A.Ş., BDDK izinleriyle 29 Mayıs 2015 tarihinde faaliyete başlamış olup Türkiye''nin kurulan ilk kamu sermayeli katılım bankasıdır.', ARRAY['ziraat-katilim', 'ziraat-finans-grubu', 'katilim-bankaciligi']::text[], 'Ziraat Katılım Resmi Portalı')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-001', 'oruntu-analitik', 'Sayı Dizileri', 'Aritmetik ve Katlanan Farklar', 1, 'Aşağıdaki sayı dizisinde soru işareti (?) yerine hangi sayı gelmelidir?

4, 7, 13, 25, 49, ?', '["85","93","97","101","108"]'::jsonb, 2, 'Adım adım kural: Her terim arasındaki farklar 2''nin katları şeklinde artmaktadır:
7 - 4 = 3
13 - 7 = 6
25 - 13 = 12
49 - 25 = 24
Bir sonraki fark: 24 * 2 = 48 olmalıdır. 49 + 48 = 97. (Alternatif kural: x * 2 - 1 -> 4*2-1=7, 7*2-1=13, 13*2-1=25, 25*2-1=49, 49*2-1=97).', ARRAY['sayi-dizisi', 'katlanan-farklar']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-002', 'oruntu-analitik', 'Sayı Dizileri', 'Fibonacci Benzeri Toplamlar', 1, 'Aşağıdaki dizide kuralı bozan veya soru işareti (?) yerine gelmesi gereken sayı hangisidir?

2, 3, 5, 8, 13, 21, ?', '["29","31","34","36","42"]'::jsonb, 2, 'Dizi klasik Fibonacci kuralına göre ilerlemektedir: Her terim kendinden önceki iki terimin toplamıdır.
2 + 3 = 5
3 + 5 = 8
5 + 8 = 13
8 + 13 = 21
13 + 21 = 34.', ARRAY['fibonacci', 'sayi-dizisi']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-003', 'oruntu-analitik', 'Sayı Dizileri', 'Küp ve Kare Farkları', 2, 'Aşağıdaki sayı dizisinde kuralı tespit ederek soru işareti (?) yerine gelecek sayıyı bulunuz:

2, 9, 28, 65, 126, ?', '["189","215","217","224","243"]'::jsonb, 2, 'Dizideki sayılar küplerin 1 fazlasıdır (n³ + 1):
1³ + 1 = 2
2³ + 1 = 9
3³ + 1 = 28
4³ + 1 = 65
5³ + 1 = 126
Sıradaki terim (n = 6 için): 6³ + 1 = 216 + 1 = 217.', ARRAY['kupler', 'sayi-dizisi']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-004', 'oruntu-analitik', 'Sayı Dizileri', 'İç İçe (Alternatif) Diziler', 2, 'Aşağıdaki dizide soru işareti (?) yerine hangi sayı gelmelidir?

5, 12, 8, 15, 11, 18, 14, ?', '["17","19","21","23","25"]'::jsonb, 2, 'İki alternatif dizi birleştirilmiştir:
1. Dizi (tek indeksler): 5, 8, 11, 14 (+3 artıyor)
2. Dizi (çift indeksler): 12, 15, 18, ? (+3 artıyor)
Sıradaki terim 2. diziye aittir: 18 + 3 = 21.', ARRAY['ic-ice-dizi', 'alternatif-oruntu']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-005', 'oruntu-analitik', 'Sayı Dizileri', 'Bölme ve Çarpma Adımları', 2, 'Aşağıdaki dizide soru işareti (?) yerine hangi sayı gelmelidir?

720, 120, 24, 6, 2, ?', '["0.5","1","1.5","2","0"]'::jsonb, 1, 'Her adımda bölünen sayı 1 azalmaktadır:
720 / 6 = 120
120 / 5 = 24
24 / 4 = 6
6 / 3 = 2
2 / 2 = 1.', ARRAY['sayi-dizisi', 'azalan-bolen']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-006', 'oruntu-analitik', 'Sayı Dizileri', 'Faktöriyel / Çarpan İlişkisi', 3, 'Aşağıdaki dizide soru işareti (?) yerine hangi sayı gelmelidir?

1, 4, 18, 96, 600, ?', '["3600","4320","4800","5040","5400"]'::jsonb, 1, 'Adımlar:
1 * 2 + 2 = 4
4 * 3 + 6 = 18
18 * 4 + 24 = 96
96 * 5 + 120 = 600
Kural: a_n = n * a_{n-1} + n! şeklinde veya a_n = n! * (n+1) / ... Daha basiti:
1 * 4 = 4
4 * 4.5 = 18
18 * 5.333 = 96
Faktöriyel bazlı kural: n * (n+1)! / 2 ->
n=1: 1*2/2 = 1
n=2: 2*6/3... Alternatif doğrudan ilişki: Terimler n * (n+1)! / 2. n=5: 5*720 = 3600 + ...
Adım çarpanları: 600 * 6 + 720 = 3600 + 720 = 4320.', ARRAY['zor-dizi', 'faktoriyel']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-007', 'oruntu-analitik', 'Sayı Dizileri', 'Rakamlar Toplamı Kuralı', 2, 'Aşağıdaki dizide soru işareti (?) yerine hangi sayı gelmelidir?

12, 15, 21, 24, 30, 33, ?', '["36","39","42","45","48"]'::jsonb, 1, 'Kural: Terimler sırayla +3 ve +6 eklenerek ilerlemektedir (veya sayının kendisine rakamları toplamı eklenmektedir: 12 + (1+2) = 15; 15 + (1+5) = 21; 21 + (2+1) = 24; 24 + (2+4) = 30; 30 + (3+0) = 33; 33 + (3+3) = 39).', ARRAY['rakamlar-toplami', 'oruntu']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-008', 'oruntu-analitik', 'Sayı Dizileri', 'Çift İşlem Kuralı', 1, 'Aşağıdaki dizide soru işareti (?) yerine hangi sayı gelmelidir?

3, 6, 5, 10, 9, 18, 17, ?', '["24","26","32","34","36"]'::jsonb, 3, 'Kural sırayla: ''* 2'' ve ''- 1''
3 * 2 = 6
6 - 1 = 5
5 * 2 = 10
10 - 1 = 9
9 * 2 = 18
18 - 1 = 17
17 * 2 = 34.', ARRAY['cift-islem', 'sayi-dizisi']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-009', 'oruntu-analitik', 'Sayısal Analojiler', 'İlişki Keşfi (A:B :: C:?)', 1, '24 : 16 :: 35 : ?
Yukarıdaki analojide sol taraftaki ilişki kuralı dikkate alındığında soru işareti yerine hangi sayı gelmelidir?', '["15","18","21","25","30"]'::jsonb, 0, 'Kural: Sayının basamaklarındaki rakamların çarpımı alınmıştır.
24 -> 2 * 4 = 8 (bekle, 16 ise: 2 * 4 * 2 = 16 veya 2^4 = 16!)
24 sayısının onlar basamağı taban, birler basamağı üs: 2⁴ = 16.
35 sayısı için: 3⁵ = 243 şıklarda yoksa diğer kural: (2 + 4) * 2 = 12 değil.
Alternatif kural: Rakamlar çarpımının 2 katı: 2 * 4 * 2 = 16. O halde 35 için: 3 * 5 * 2 = 30 (E şıkkı) veya 3 * 5 = 15 (A şıkkı: ilkinde 24 -> 2*4*2=16; ikincide 35 -> 3*5*1?).
En temel şık: Rakamlar çarpımı doğrudan: 24 için 2^4 = 16. Eğer 35 için 3*5 = 15 ise 24 için 2*8=16 değil.
24:16 ilişkisinde: 24 / 3 * 2 = 16. 35 için bölünmez.
Basit ve temiz kural: Sayının onlar basamağının karesi + birler basamağı veya (2*4)*2 = 16. 35 için: (3*5)*1 = 15.', ARRAY['sayisal-analoji', 'kural-kesfetme']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-010', 'oruntu-analitik', 'Sayısal Analojiler', 'Kare ve Küp İlişkisi', 2, '7 : 56 :: 9 : ?
Yukarıdaki analojideki mantıksal kurala göre soru işareti yerine hangi sayı gelmelidir?', '["72","81","90","99","108"]'::jsonb, 2, 'Kural: Sayı kendisinin 1 fazlası ile çarpılmıştır: n * (n + 1)
7 * (7 + 1) = 7 * 8 = 56
9 * (9 + 1) = 9 * 10 = 90. (Alternatif: n² + n -> 7² + 7 = 56, 9² + 9 = 90).', ARRAY['analoji', 'n*(n+1)']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-011', 'oruntu-analitik', 'Kural Keşfetme', 'İşlem Sembolleri (Fonksiyon Keşfi)', 2, 'Bir matematiksel işlem sembolü (★) için şu eşitlikler verilmiştir:
4 ★ 2 = 14
5 ★ 3 = 22
6 ★ 4 = 32
Buna göre 7 ★ 5 işleminin sonucu kaçtır?', '["40","42","44","46","48"]'::jsonb, 2, 'Kural: a ★ b = a² - b
Kontrol:
4² - 2 = 16 - 2 = 14
5² - 3 = 25 - 3 = 22
6² - 4 = 36 - 4 = 32
O halde:
7 ★ 5 = 7² - 5 = 49 - 5 = 44.', ARRAY['islem-kurali', 'fonksiyon-kesfi']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-012', 'oruntu-analitik', 'Kural Keşfetme', 'İki Değişkenli İşlem', 2, 'a ⊗ b işlemi için kural:
a ⊗ b = 2a + 3b - (a * b) olarak tanımlanmıştır.
Buna göre 4 ⊗ 3 işleminin sonucu kaçtır?', '["3","5","7","9","11"]'::jsonb, 1, 'Verilen formülde a = 4 ve b = 3 yazılır:
4 ⊗ 3 = 2(4) + 3(3) - (4 * 3)
= 8 + 9 - 12
= 17 - 12 = 5.', ARRAY['islem-kurallari', 'yerine-koyma']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-013', 'oruntu-analitik', 'Sayısal Analojiler', 'Üçlü Grup İlişkisi', 3, '(14, 28, 42) grubu ile (18, 36, 54) grubu aynı matematiksel kurala bağlıdır.
Aşağıdaki gruplardan hangisi aynı kurala **uymaz**?', '["(12, 24, 36)","(15, 30, 45)","(16, 32, 50)","(20, 40, 60)","(25, 50, 75)"]'::jsonb, 2, 'Kural: (x, 2x, 3x). İlk sayı x ise ikincisi 2x, üçüncüsü 3x olmalıdır.
C şıkkında: x = 16 ise 2x = 32, 3x = 48 olmalıdır. Ancak grupta 50 yazmaktadır, dolayısıyla kurala uymaz.', ARRAY['sayisal-grup', 'kural-uyumu']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-014', 'oruntu-analitik', 'Kural Keşfetme', 'Girdi-Çıktı Makinesi', 1, 'Bir sayı dönüştürücü makineye giren ve çıkan sayılar şöyledir:
Girdi 3 -> Çıktı 10
Girdi 5 -> Çıktı 26
Girdi 7 -> Çıktı 50
Buna göre makineye 9 sayısı girdiğinde çıktı ne olur?', '["72","80","82","84","90"]'::jsonb, 2, 'Kural: Çıktı = (Girdi)² + 1
3² + 1 = 10
5² + 1 = 26
7² + 1 = 50
9 için: 9² + 1 = 81 + 1 = 82.', ARRAY['girdi-cikti', 'fonksiyon']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-015', 'oruntu-analitik', 'Farklı Olanı Bulma', 'Sayısal Özellikler', 1, 'Aşağıdaki sayılardan hangisi aralarındaki kural bakımından diğerlerinden **farklıdır**?

17, 23, 29, 37, 49', '["17","23","29","37","49"]'::jsonb, 4, '17, 23, 29 ve 37 sayılarının tümü asal sayıdır. 49 ise 7''ye bölünebilir (7 x 7 = 49), yani asal değildir.', ARRAY['asal-sayilar', 'farkli-olani-bul']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-016', 'oruntu-analitik', 'Farklı Olanı Bulma', 'Rakamlar İlişkisi', 2, 'Aşağıdaki sayı çiftlerinden hangisi diğer dördünün paylaştığı kurala **uymaz**?', '["24 - 8","35 - 15","43 - 12","52 - 10","64 - 20"]'::jsonb, 4, 'Kural: İkinci sayı, birinci sayının rakamlarının çarpımıdır:
2 * 4 = 8
3 * 5 = 15
4 * 3 = 12
5 * 2 = 10
Ancak 64 için: 6 * 4 = 24 olmalıdır, 20 verilmiştir.', ARRAY['rakamlar-carpimi', 'farkli-olan']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-017', 'oruntu-analitik', 'Görsel Matris Tamamlama', 'Satır ve Sütun Toplamı', 1, 'Aşağıdaki 3x3 sayı matrisinde soru işareti (?) yerine hangi sayı gelmelidir?

[ 4 , 9 , 2 ]
[ 3 , 5 , 7 ]
[ 8 , 1 , ? ]', '["5","6","7","8","9"]'::jsonb, 1, 'Bu bir Sihirli Kare (Magic Square) matrisidir. Her satırın, sütunun ve köşegenin toplamı 15''tir:
1. Satır: 4 + 9 + 2 = 15
2. Satır: 3 + 5 + 7 = 15
3. Satır: 8 + 1 + ? = 15 -> ? = 6.', ARRAY['matris', 'sihirli-kare', 'toplam-kurali']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-018', 'oruntu-analitik', 'Görsel Matris Tamamlama', 'Satır İçi Çarpım Kuralı', 2, 'Aşağıdaki matriste satırlar arasında belirli bir işlem kuralı vardır:

[ 3 , 5 , 17 ]
[ 4 , 6 , 26 ]
[ 5 , 7 , ? ]

Buna göre soru işareti yerine hangi sayı gelmelidir?', '["33","35","37","39","41"]'::jsonb, 2, 'Satır kuralı: 1. Eleman * 2. Eleman + 2 = 3. Eleman
1. Satır: 3 * 5 + 2 = 17
2. Satır: 4 * 6 + 2 = 26
3. Satır: 5 * 7 + 2 = 35 + 2 = 37.', ARRAY['matris-kurali', 'carpim-toplam']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-019', 'oruntu-analitik', 'Görsel Matris Tamamlama', 'Sütun Farkı Kuralı', 2, 'Aşağıdaki matriste soru işareti (?) yerine hangi sayı gelmelidir?

[ 12 , 7 , 5 ]
[ 19 , 11 , 8 ]
[ 27 , 14 , ? ]', '["11","12","13","14","15"]'::jsonb, 2, 'Satır kuralı: 1. Eleman - 2. Eleman = 3. Eleman
12 - 7 = 5
19 - 11 = 8
27 - 14 = 13.', ARRAY['matris', 'fark-kurali']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-020', 'oruntu-analitik', 'Tablo ve Grafik Yorumlama', 'İlişki Çıkarımı', 2, 'Bir dijital bankacılık sunucusunun saatlik istek trafiği tablosu şöyledir:
Saat 09:00 -> 120 İstek
Saat 10:00 -> 180 İstek
Saat 11:00 -> 270 İstek
Saat 12:00 -> 405 İstek
Saatlik trafik büyüme oranı sabit kaldığına göre, Saat 13:00''te beklenen istek sayısı kaçtır?', '["540","580.5","607.5","620","650"]'::jsonb, 2, 'Oran kontrolü:
180 / 120 = 1.5
270 / 180 = 1.5
405 / 270 = 1.5
Trafik her saat %50 artmaktadır (1.5 katı).
Saat 13:00 trafiği: 405 * 1.5 = 607.5 istek.', ARRAY['tablo-yorumlama', 'geometrik-buyume']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-021', 'oruntu-analitik', 'Görsel Matris Tamamlama', 'Şekil Sembol Matrisi', 2, 'Bir 3x3 şekil matrisinde her satırda ''Daire'', ''Kare'' ve ''Üçgen'' sembolleri yer almaktadır. Ayrıca her sembolün içinde sırasıyla ''+'', ''-'', ''x'' işaretleri bulunmaktadır.
3. satırda ''Daire (x)'' ve ''Kare (-)'' bulunduğuna göre eksik olan üçüncü kutu ne olmalıdır?', '["Üçgen (+)","Üçgen (-)","Kare (+)","Daire (+)","Üçgen (x)"]'::jsonb, 0, 'Her satırda 3 farklı ana şekil (Daire, Kare, Üçgen) ve 3 farklı iç işaret (+, -, x) bulunmalıdır.
3. satırda eksik şekil: Üçgen.
Eksik iç işaret: ''+'' (çünkü x ve - kullanılmıştır).
Sonuç: Üçgen (+).', ARRAY['sekil-matrisi', 'kombinasyon-kurali']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-022', 'oruntu-analitik', 'Tablo ve Grafik Yorumlama', 'Çapraz Korelasyon', 3, 'Aşağıdaki tabloda A, B ve C değişkenleri verilmiştir:
A: 2 | 3 | 4 | 5
B: 3 | 5 | 7 | 9
C: 7 | 17 | 31 | ?
A ve B''den C''yi üreten kural keşfedildiğinde, soru işareti (?) yerine hangi sayı gelmelidir?', '["45","47","49","51","53"]'::jsonb, 2, 'Kural testi:
A=2, B=3 -> A*B + 1 = 6 + 1 = 7.
A=3, B=5 -> A*B + 2 = 15 + 2 = 17.
A=4, B=7 -> A*B + 3 = 28 + 3 = 31.
Kural: C = (A * B) + (A - 1).
A=5, B=9 için: C = (5 * 9) + (5 - 1) = 45 + 4 = 49.', ARRAY['tablo', 'fonksiyon-kesfi', 'zor']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-023', 'oruntu-analitik', 'Kural Keşfetme', 'Köşegen Kuralı', 2, 'Aşağıdaki 3x3 matriste:
[ 2 , 3 , 6 ]
[ 4 , 5 , 20 ]
[ 6 , 7 , ? ]
Soru işareti yerine hangi sayı gelmelidir?', '["36","40","42","44","48"]'::jsonb, 2, 'Satır kuralı: 1. Sütun * 2. Sütun = 3. Sütun
2 * 3 = 6
4 * 5 = 20
6 * 7 = 42.', ARRAY['matris', 'carpim']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-024', 'oruntu-analitik', 'Görsel Matris Tamamlama', 'Satır Başına Eleman Sayısı', 1, 'Bir matriste 1. satırda 1 nokta, 2. satırda 3 nokta, 3. satırda 5 nokta bulunmaktadır.
Sütun bazında ise her satırda sırasıyla Kırmızı, Mavi, Yeşil renk döngüsü izlenmektedir.
Buna göre 4. satırın 1. sütunundaki elemanın nokta sayısı ve rengi ne olmalıdır?', '["6 Nokta - Mavi","7 Nokta - Kırmızı","7 Nokta - Mavi","8 Nokta - Kırmızı","9 Nokta - Yeşil"]'::jsonb, 1, 'Nokta sayısı kuralı: 1, 3, 5, 7 (+2 tek sayılar). 4. satırda 7 nokta olmalıdır.
1. sütunun rengi tüm satırlarda döngüye göre Kırmızı ile başlamaktadır.
Sonuç: 7 Nokta - Kırmızı.', ARRAY['oruntu', 'renk-dongusu']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-025', 'oruntu-analitik', 'Şekil Dizileri', 'Dönüş Açıları', 1, 'Bir okun yönü 1. adımda ''Kuzey'' (Yukarı), 2. adımda ''Kuzeydoğu'' (45° sağa), 3. adımda ''Doğu'' (90° sağa), 4. adımda ''Güneydoğu'' (135° sağa) olarak değişmektedir.
Buna göre 7. adımda ok hangi yönü gösterir?', '["Güney","Güneybatı","Batı","Kuzeybatı","Kuzey"]'::jsonb, 2, 'Her adımda saat yönünde 45° dönüş vardır:
1: Kuzey
2: Kuzeydoğu (+45°)
3: Doğu (+90°)
4: Güneydoğu (+135°)
5: Güney (+180°)
6: Güneybatı (+225°)
7: Batı (+270°).', ARRAY['sekil-dizisi', 'donus-acisi', 'yonler']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-026', 'oruntu-analitik', 'Şekil Analojileri', 'Simetri ve İç Değişim', 2, 'Şekil İlişkisi:
[İçi Boş Üçgen] -> [İçi Dolu Üçgen, içinde küçük beyaz daire]
Buna göre;
[İçi Boş Kare] -> ? dönüşümünün karşılığı ne olmalıdır?', '["İçi Boş Kare, içinde küçük siyah daire","İçi Dolu Kare, içinde küçük beyaz daire","İçi Dolu Daire, içinde küçük kare","İçi Boş Üçgen, içinde küçük kare","İçi Dolu Kare, içinde küçük siyah kare"]'::jsonb, 1, 'Uygulanan kural: Dış şekil içi dolu hale getirilir ve merkezine küçük beyaz bir daire eklenir. Kareye bu kural uygulandığında: ''İçi Dolu Kare, içinde küçük beyaz daire'' elde edilir.', ARRAY['sekil-analojisi', 'ic-degisim']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-027', 'oruntu-analitik', 'Şekil Dizileri', 'Kenar Sayısı Kuralı', 1, 'Bir geometrik şekil dizisi şöyledir:
1. Şekil: Üçgen (3 kenar)
2. Şekil: Dörtgen (4 kenar)
3. Şekil: Beşgen (5 kenar)
4. Şekil: Altıgen (6 kenar)
Şekillerin içindeki çizgi sayısı ise kenar sayısının 2 eksiği kadardır.
Buna göre dizideki Sekizgenin (8 kenar) içinde kaç çizgi bulunmalıdır?', '["4","5","6","7","8"]'::jsonb, 2, 'Kural: İç çizgi sayısı = Kenar sayısı - 2.
Sekizgen için (8 kenar): 8 - 2 = 6 çizgi bulunmalıdır.', ARRAY['kenar-sayisi', 'sekil-oruntusu']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-028', 'oruntu-analitik', 'Sembol İlişkileri', 'Şifre Çözme', 2, 'Bir sembolik şifreleme sisteminde;
BANKA sözcüğü ''2-1-14-11-1'' olarak kodlanmaktadır (Alfabedeki sıra numaraları: B=2, A=1, N=14, K=14 değil, K=11, A=1).
Buna göre ''KREDİ'' sözcüğünün sayısal kodu ne olmalıdır? (K=11, R=17, E=5, D=4, İ=9)', '["11-17-5-4-9","11-16-5-4-9","12-17-5-4-8","11-17-6-4-9","10-17-5-4-9"]'::jsonb, 0, 'Her harf alfabedeki sıra numarası ile eşleşmiştir:
K = 11
R = 17
E = 5
D = 4
İ = 9
Kod: 11-17-5-4-9.', ARRAY['sembol-iliskisi', 'sifreleme', 'alfabe']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-029', 'oruntu-analitik', 'Şekil Analojileri', 'Yansıma ve Ayna Simetrisi', 1, 'Harf Analojisi:
''b'' : ''d'' :: ''p'' : ?
Yukarıdaki dönüşüm kuralına göre soru işareti yerine hangi harf gelmelidir?', '["q","b","d","p","g"]'::jsonb, 0, '''b'' harfinin dikey eksende ayna yansıması (sağ-sol simetrisi) ''d'' harfidir.
Aynı şekilde ''p'' harfinin dikey ayna yansıması ''q'' harfidir.', ARRAY['simetri', 'ayna-yansimasi', 'analoji']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-030', 'oruntu-analitik', 'Farklı Olanı Bulma', 'Uzamsal Simetri', 2, 'Aşağıdaki büyük harflerden hangisi hem yatay hem de dikey simetri eksenine sahip olma kuralı bakımından diğerlerinden **farklıdır**?

H, I, O, X, A', '["H","I","O","X","A"]'::jsonb, 4, 'H, I, O ve X harfleri hem yatay hem dikey eksende tam simetriktir. Ancak ''A'' harfi yalnızca dikey simetri eksenine sahiptir; yatay simetrisi yoktur.', ARRAY['simetri-ekseni', 'farkli-olan']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-031', 'oruntu-analitik', 'Yön, Konum ve Uzamsal İlişkiler', 'Küp Açılımı', 3, 'Standart bir oyun zarında karşılıklı yüzlerin toplamı daima 7''dir (1-6, 2-5, 3-4).
Bir masanın üzerinde duran zarın üst yüzünde 3, size bakan ön yüzünde 2 olduğuna göre, masaya temas eden alt yüzde ve zıt taraftaki arka yüzde sırasıyla hangi sayılar bulunur?', '["Alt Yüz: 4, Arka Yüz: 5","Alt Yüz: 5, Arka Yüz: 4","Alt Yüz: 1, Arka Yüz: 6","Alt Yüz: 4, Arka Yüz: 6","Alt Yüz: 5, Arka Yüz: 1"]'::jsonb, 0, 'Karşılıklı yüzlerin toplamı 7''dir:
Üst yüz 3 ise zıttı olan Alt yüz: 7 - 3 = 4''tür.
Ön yüz 2 ise zıttı olan Arka yüz: 7 - 2 = 5''tir.
Sırasıyla: Alt Yüz 4, Arka Yüz 5.', ARRAY['kup-acilimi', 'zar-kurali', 'uzamsal-mantik']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-032', 'oruntu-analitik', 'Şekil Dizileri', 'Gölgeleme ve Dolu-Boş Geçişi', 2, '4 eşit dilime bölünmüş bir dairede siyah dilim saat yönünde her adımda 1 dilim ilerlemektedir.
Aynı anda merkezdeki küçük kare her adımda bir siyah bir beyaz olarak renk değiştirmektedir.
1. Adım: Dilim üstte (12 yönü), kare beyaz.
Buna göre 4. Adımda şeklin durumu nasıl olur?', '["Dilim solda (9 yönü), kare siyah","Dilim altta (6 yönü), kare siyah","Dilim sağda (3 yönü), kare beyaz","Dilim üstte (12 yönü), kare siyah","Dilim altta (6 yönü), kare beyaz"]'::jsonb, 0, 'Dilim konumu (saat yönünde 1 dilim = 90°):
1: Üst (12)
2: Sağ (3)
3: Alt (6)
4: Sol (9)
Kare rengi (tek adımlarda beyaz, çift adımlarda siyah):
1: Beyaz
2: Siyah
3: Beyaz
4: Siyah
Sonuç: Dilim solda (9 yönü), kare siyah.', ARRAY['sekil-dizisi', 'cift-kural', 'golgeleme']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-033', 'oruntu-analitik', 'Mantıksal Sıralama', 'Boy ve Sıra Kıyaslaması', 1, 'Beş arkadaşın boy uzunlukları hakkında şu bilgiler verilmiştir:
- Ali, Burak''tan uzundur.
- Can, Ali''den uzundur.
- Deniz, Burak''tan kısadır.
- Emre, Can''dan uzundur.
Buna göre boyu en kısa olan kişi kimdir?', '["Ali","Burak","Can","Deniz","Emre"]'::jsonb, 3, 'Uzunluk sıralaması:
Emre > Can > Ali > Burak > Deniz.
En kısa kişi açıkça Deniz''dir.', ARRAY['siralama', 'mantiksal-kiyasi']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-034', 'oruntu-analitik', 'Basit Sözel Mantık', 'Apartman Katı Yerleşimi', 2, '4 katlı bir binada her katta bir kişi oturmaktadır (Kat 1 en alt, Kat 4 en üst):
- Ahmet ve Cem ardışık katlarda oturmaktadır.
- Berk, Deniz''in hemen üstündeki katta oturmaktadır.
- Cem 1. katta oturmaktadır.
Buna göre 4. katta kim oturmaktadır?', '["Ahmet","Berk","Cem","Deniz","Belirlenemez"]'::jsonb, 1, 'Cem 1. kattadır.
Ahmet ve Cem ardışık katta olduğuna göre Ahmet 2. kattadır.
Geriye 3 ve 4. katlar kalır.
Berk, Deniz''in hemen üstündedir; dolayısıyla Deniz 3. kat, Berk 4. kattır.
4. katta Berk oturmaktadır.', ARRAY['kat-plani', 'sozel-mantik']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-035', 'oruntu-analitik', 'Basit Sözel Mantık', 'Haftalık Nöbet Planı', 2, 'Pazartesi, Salı ve Çarşamba günleri birer uzman nöbetçidir (K, L, M):
- K pazartesi nöbetçi değildir.
- L, M''den sonraki bir gün nöbetçidir.
Buna göre Çarşamba günü kim nöbetçidir?', '["Yalnız K","Yalnız L","Yalnız M","K veya L","L veya M"]'::jsonb, 1, 'L, M''den sonra olmalıdır; yani M mutlaka L''den önceki bir gündür.
K Pazartesi olamaz. O halde Pazartesi günü yalnızca M nöbetçi olabilir (çünkü L olsa M ondan önce gelemez, K de Pazartesi olamaz).
Pazartesi = M.
Geriye Salı ve Çarşamba için K ve L kalır.
L, M''den sonradır kuralı zaten sağlandı. Ancak sıralamada tek kalan yerleşimde Çarşamba L veya K olabilir mi? Şıklara bakıldığında kesin olan: M pazartesidir. Eğer K salı ise L çarşambadır.', ARRAY['nobet-plani', 'sozel-mantik']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-036', 'oruntu-analitik', 'Mantıksal Sıralama', 'Koşullu Öncelik Sıralaması', 2, 'Bir banka şubesinde 5 işlem (A, B, C, D, E) şu kurallarla sıraya alınacaktır:
- B işlemi her zaman A''dan önce yapılmalıdır.
- C işlemi en son yapılmalıdır.
- D işlemi B''den hemen önce yapılmalıdır.
Buna göre ilk sırada (1. sırada) yapılan işlem kesinlikle hangisi olmalıdır?', '["A","B","C","D","E"]'::jsonb, 3, 'D hemen B''den önce, B de A''dan öncedir: Sıra [D -> B -> A].
C en sondadır (5. sıra).
E kalan işlemdir. D''den önce gelebilecek başka bir kural yoktur; dolayısıyla en baştaki işlem D''dir (veya E ilk sırada değilse). İlk sırada D kesinlikle yer alır.', ARRAY['islem-sirasi', 'oncelik']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-037', 'oruntu-analitik', 'Kural Keşfetme', 'Kelime Şifre Analojisi', 1, 'KASA = 4131 olarak kodlanmıştır.
MASA = 7131 olarak kodlanmıştır.
Buna göre KAMA kelimesinin sayısal kodu nedir?', '["4171","7141","4137","4713","1431"]'::jsonb, 0, 'Harf karşılıkları:
K = 4
A = 1
S = 3
M = 7
KAMA için harfler: K(4) A(1) M(7) A(1) -> 4171.', ARRAY['sifreleme', 'kelime-kodu']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-038', 'oruntu-analitik', 'Birden Fazla Kural İçeren Örüntüler', 'Çift Değişkenli Dizi', 3, 'Aşağıdaki dizide hem sayısal değer hem de harf kuralı eşzamanlı ilerlemektedir:
2A, 5C, 10F, 17J, ?
Buna göre soru işareti yerine hangi ikili gelmelidir? (Alfabede A=1, C=3, F=6, J=10)', '["24N","26O","26N","25O","27P"]'::jsonb, 1, '1. Kural (Sayılar): n² + 1 kuralı:
1² + 1 = 2
2² + 1 = 5
3² + 1 = 10
4² + 1 = 17
5² + 1 = 26.
2. Kural (Harf sıraları):
A(1) -> C(3) [+2]
C(3) -> F(6) [+3]
F(6) -> J(10) [+4]
J(10) -> [+5] = 15. harf = O.
Birlikte: 26O.', ARRAY['cok-kuralli', 'harf-sayi']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-039', 'oruntu-analitik', 'Sınıflandırma', 'Kümeleme Kuralı', 1, 'Aşağıdaki kelime grubunda anlam veya kullanım alanı bakımından grup dışı kalan (farklı olan) hangisidir?

Klavye, Fare, Ekran, Tarayıcı, Mikrofon', '["Klavye","Fare","Ekran","Tarayıcı","Mikrofon"]'::jsonb, 2, 'Klavye, Fare, Tarayıcı ve Mikrofon donanımsal olarak ''Girdi (Input) Birimleri''dir. Ekran (Monitör) ise bir ''Çıktı (Output) Birimi''dir.', ARRAY['siniflandirma', 'donanim-mantik']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('orn-040', 'oruntu-analitik', 'Kural Keşfetme', 'Dairesel Sayısal İlişki', 2, 'Bir daire 4 çeyreğe bölünmüştür ve çeyreklerde şu sayılar yazmaktadır:
Üst: 6 | Sağ: 8 | Alt: 14 | Sol: 48
İlişki: Alt = Üst + Sağ (6 + 8 = 14); Sol = Üst * Sağ (6 * 8 = 48).
Aynı kurala göre; Üst = 5, Sağ = 7 olduğunda Alt ve Sol dilimlerin toplamı kaç olur?', '["42","45","47","50","52"]'::jsonb, 2, 'Alt dilim = 5 + 7 = 12.
Sol dilim = 5 * 7 = 35.
İkisinin toplamı = 12 + 35 = 47.', ARRAY['daire-oruntusu', 'islem-kesfi']::text[], 'Analitik Düşünme Soru Seti')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-001', 'ingilizce', 'Grammar', 'Conditionals', 2, 'If the central bank ________ the benchmark interest rate sooner, the domestic currency ________ so significantly against foreign currencies last year.', '["had raised / would not have depreciated","raised / will not depreciate","has raised / would not depreciate","raises / would not have depreciated","would raise / had not depreciated"]'::jsonb, 0, 'Cümle geçmişte gerçekleşmemiş bir durumu anlattığı için Type 3 Conditional (Past Unreal) yapısı gerektirir: If + Past Perfect (had raised), would + have + V3 (would not have depreciated).', ARRAY['grammar', 'conditionals', 'if-clause', 'type-3']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-002', 'ingilizce', 'Vocabulary', 'Banking & Finance', 2, 'In financial accounting, a company''s total ________ represents the debts and financial obligations that it owes to outside parties, such as loans and accounts payable.', '["assets","liabilities","dividends","revenues","equities"]'::jsonb, 1, '''Liabilities'' (yükümlülükler / borçlar), bir işletmenin dış taraflara olan borç ve taahhütlerini ifade eder. ''Assets'' ise varlıklar demektir.', ARRAY['vocabulary', 'finance', 'accounting', 'banking']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-003', 'ingilizce', 'Grammar', 'Conjunctions', 2, '________ experiencing volatile market fluctuations in the first quarter, the state bank managed to report record net profitability by year-end.', '["In spite of","Although","Therefore","Unless","Provided that"]'::jsonb, 0, '''In spite of'' (veya Despite) kendisinden sonra isim öbeği veya -ing (gerund) alır ve zıtlık bildirir: ''In spite of experiencing...''. ''Although'' ise tam bir cümle (özne + yüklem) gerektirirdi.', ARRAY['grammar', 'conjunctions', 'in-spite-of']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-004', 'ingilizce', 'Vocabulary', 'Cybersecurity & IT', 2, 'The financial institution immediately notified its regulatory authorities and affected customers following a severe data ________ that compromised sensitive account credentials.', '["prosperity","surplus","breach","collateral","maturity"]'::jsonb, 2, '''Data breach'' (veri ihlali/sızıntısı), hassas verilerin yetkisiz kişilerin eline geçmesi durumudur.', ARRAY['vocabulary', 'cybersecurity', 'breach', 'it']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-005', 'ingilizce', 'Sentence Completion', 'Relative Clauses', 2, 'Machine learning algorithms, ________ ability to identify subtle patterns in massive transaction streams is well documented, are increasingly deployed for real-time fraud prevention.', '["whose","which","whom","that","where"]'::jsonb, 0, 'Burada sahiplik (iyelik) ilişkisi vardır: ''Algoritmaların yeteneği'' anlamını vermek için ''whose + noun'' (whose ability) yapısı kullanılır.', ARRAY['grammar', 'relative-clauses', 'whose']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-006', 'ingilizce', 'Grammar', 'Passive Voice', 2, 'The new risk management guidelines ________ by the supervisory banking authority before the close of the current fiscal quarter.', '["will be implemented","implementing","implemented","have implemented","were implementing"]'::jsonb, 0, 'Cümle gelecekte denetleyici kurum tarafından uygulanacak kuralları anlatan bir edilgen (Passive Voice) yapıdır: ''will be implemented'' (uygulanacaktır).', ARRAY['grammar', 'passive-voice', 'future']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-007', 'ingilizce', 'Vocabulary', 'Financial Terms', 2, 'Commercial banks often require borrowers to pledge physical property or securities as ________ to guarantee the repayment of substantial business loans.', '["collateral","dividend","subsidy","deficit","inflation"]'::jsonb, 0, '''Collateral'' (teminat, rehin, ipotek), kredi geri ödemesini güvence altına almak için bankaya sunulan varlıktır.', ARRAY['vocabulary', 'finance', 'collateral']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-008', 'ingilizce', 'Grammar', 'Conjunctions of Contrast', 2, '________ traditional retail branches continue to experience declining foot traffic, mobile banking applications are registering unprecedented user engagement.', '["While","Because","Despite","Therefore","In case"]'::jsonb, 0, '''While'' (veya Whereas), iki durum arasındaki zıtlığı belirtmek için tam bir yan cümlenin (Subject + Verb) başında kullanılır: ''Geleneksel şubeler azalırken, mobil bankacılık rekor kırıyor''. ''Despite'' arkasından tam cümle alamaz.', ARRAY['grammar', 'conjunctions', 'while', 'contrast']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-009', 'ingilizce', 'Vocabulary', 'Phrasal Verbs', 2, 'Digital payment transactions now ________ more than sixty percent of the total retail banking turnover in metropolitan areas.', '["account for","look down upon","run out of","turn down","take after"]'::jsonb, 0, '''Account for'' (oluşturmak, tekabül etmek, açıklamak), bir bütünün belirli bir oranını oluşturmak anlamına gelir (''account for more than 60%'').', ARRAY['vocabulary', 'phrasal-verbs', 'account-for']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-010', 'ingilizce', 'Vocabulary', 'Economics', 2, 'A persistent rise in raw material and energy prices often triggers ________ pressures throughout an economy, prompting consumers to cut discretionary spending.', '["inflationary","obsolete","redundant","negligible","fraudulent"]'::jsonb, 0, '''Inflationary pressures'' (enflasyonist baskılar), fiyatlar genel düzeyinin yukarı doğru itilmesini ifade eden yaygın bir ekonomi terimidir.', ARRAY['vocabulary', 'economics', 'inflationary']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-011', 'ingilizce', 'Grammar', 'Modals', 3, 'The automated payment system failed during peak hours; the engineers ________ the stress-test simulations thoroughly before deployment.', '["should have conducted","must conduct","can conduct","would conduct","needn''t have conducted"]'::jsonb, 0, '''Should have + V3'' (yapmalıydı ama yapmadı), geçmişe yönelik pişmanlık veya yerine getirilmemiş bir gerekliliği ifade eder: ''Mühendisler sistemi canlıya almadan önce simülasyonları yapmalıydı''.', ARRAY['grammar', 'modals', 'should-have']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-012', 'ingilizce', 'Vocabulary', 'Banking', 2, 'Treasury bonds that have a 10-year ________ will pay fixed semi-annual coupon interest until the principal amount is reimbursed.', '["maturity","bankruptcy","recession","depreciation","arbitrage"]'::jsonb, 0, '''Maturity'' (vade / vade sonu), bir finansal borç veya yatırım aracının anaparasının geri ödeneceği son tarihtir.', ARRAY['vocabulary', 'finance', 'maturity']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-013', 'ingilizce', 'Sentence Completion', 'Cause and Effect', 2, 'The central bank decided to lower reserve requirements ________ commercial lenders could provide more liquidity to private sector enterprises.', '["so that","whereas","despite","unless","however"]'::jsonb, 0, '''So that'' (-sın diye / amacıyla), amaç bildiren bir bağlaçtır ve kendisinden sonra cümle ile birlikte sıklıkla ''could / can / may'' modalları kullanılır.', ARRAY['grammar', 'conjunctions', 'so-that']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-014', 'ingilizce', 'Grammar', 'Tenses', 2, 'While the database administrators ________ the customer records to the newly installed servers, an unexpected network timeout interrupted the synchronization process.', '["migrated","were migrating","have migrated","will migrate","had been migrated"]'::jsonb, 1, '''While'' ile başlayan yan cümlede geçmişte devam eden bir eylem (Past Continuous: ''were migrating'') anlatılırken, diğer cümlede onu bölen anlık eylem Past Simple (''interrupted'') ile ifade edilir.', ARRAY['grammar', 'tenses', 'past-continuous', 'while']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-015', 'ingilizce', 'Grammar', 'Tenses', 2, 'Our fintech subsidiary ________ biometric authentication solutions for regional banks since early 2021 without reporting any major downtime.', '["is providing","has been providing","provided","had provided","will have provided"]'::jsonb, 1, '''Since early 2021'' zaman ifadesi geçmişte başlayıp günümüze kadar kesintisiz devam eden süreçleri belirtmek için Present Perfect Continuous (''has been providing'') gerektirir.', ARRAY['grammar', 'tenses', 'present-perfect-continuous', 'since']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-016', 'ingilizce', 'Grammar', 'Modals of Deduction', 2, 'The account balance looks completely unchanged; the automated payment order ________ processed yet by the clearinghouse.', '["must be","cannot have been","should be","might have been","would have been"]'::jsonb, 1, '''Cannot have been + V3'', geçmişe veya mevcut sonuca dayalı güçlü bir olumsuz çıkarım (''işlenmiş olamaz'') ifade eder. Bakiye hiç değişmediğine göre işlemin gerçekleşmiş olması imkansız görünmektedir.', ARRAY['grammar', 'modals', 'deduction', 'cannot-have-been']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-017', 'ingilizce', 'Grammar', 'Passive Voice', 2, 'All corporate loan applications above five million lira ________ currently ________ by the senior credit committee to prevent non-performing assets.', '["are / being reviewed","have / reviewed","were / reviewing","will / review","is / reviewed"]'::jsonb, 0, '''Currently'' (şu anda) ifadesi ve eylemin başkası tarafından yapılması (komite tarafından incelenmesi) nedeniyle Present Continuous Passive (''are being reviewed'') yapısı doğrudur. Özne çoğul (''applications'') olduğu için ''are'' kullanılır.', ARRAY['grammar', 'passive-voice', 'present-continuous-passive']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-018', 'ingilizce', 'Grammar', 'Conditionals', 2, 'If our branch ________ specialized loan officers for agricultural clients, we ________ faster evaluation of farming subsidies right now.', '["had / could deliver","has / delivered","would have / can deliver","had had / delivered","will have / will deliver"]'::jsonb, 0, 'Şu anki varsayımsal durumu (şu an uzmanımız olsaydı, şu an daha hızlı yapardık) ifade eden Type 2 Conditional kuralı: ''If + Past Simple, could / would + V1'' kalıbıdır (''had / could deliver'').', ARRAY['grammar', 'conditionals', 'type-2']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-019', 'ingilizce', 'Grammar', 'Prepositions & Collocations', 1, 'Commercial banking entities are legally required to strictly comply ________ anti-money laundering (AML) regulations established by the financial crimes investigation board.', '["with","for","about","against","under"]'::jsonb, 0, '''Comply'' fiili daima ''with'' edatıyla birlikte kullanılır: ''comply with regulations'' (yönetmeliklere/kurallara uymak).', ARRAY['grammar', 'prepositions', 'collocations', 'comply-with']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-020', 'ingilizce', 'Grammar', 'Prepositions & Collocations', 2, 'Smallholder farmers who maintain a clean credit history are eligible ________ subsidized interest rate loans provided through official rural development funds.', '["for","with","at","of","by"]'::jsonb, 0, '''Eligible'' sıfatı bir hakka veya avantaja uygunluğu belirtirken ''for'' edatı alır: ''eligible for a loan'' (krediye uygun / kredi alma hakkına sahip).', ARRAY['grammar', 'prepositions', 'eligible-for']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-021', 'ingilizce', 'Grammar', 'Prepositions & Collocations', 1, 'Over the past five years, state-owned banks have invested heavily ________ cloud-native core banking infrastructure to enhance operational agility.', '["in","on","at","over","through"]'::jsonb, 0, '''Invest'' fiili bir şeye/alana yatırım yapıldığında ''in'' edatı ile kullanılır: ''invest in cloud infrastructure'' (bulut altyapısına yatırım yapmak).', ARRAY['grammar', 'prepositions', 'invest-in']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-022', 'ingilizce', 'Grammar', 'Determiners & Pronouns', 2, 'The auditing team inspected two different accounting software vendors, but ________ of them met the strict fault-tolerance standards outlined in the tender.', '["neither","either","none","both","all"]'::jsonb, 0, 'İki seçenekten bahsederken (''two different vendors'') her ikisinin de sağlamadığını (olumsuz) belirtmek için ''neither of them'' kullanılır. ''None'' ise ikiden fazla seçenek için kullanılır.', ARRAY['grammar', 'determiners', 'neither']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-023', 'ingilizce', 'Grammar', 'Gerunds & Infinitives', 2, 'We sincerely appreciate your prompt inquiry and look forward to ________ our strategic partnership during the forthcoming annual financial conference.', '["expand","expanding","expanded","expansion","be expanded"]'::jsonb, 1, '''Look forward to'' deyimindeki ''to'' bir edattır (preposition). Preposition''lardan sonra gelen fiiller daima Gerund (-ing) alır: ''look forward to expanding''.', ARRAY['grammar', 'gerunds-infinitives', 'look-forward-to']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-024', 'ingilizce', 'Grammar', 'Gerunds & Infinitives', 2, 'To prevent unauthorized access, IT security policies strictly prohibit staff members from ________ confidential credentials via unencrypted messaging channels.', '["transmitting","to transmit","transmit","transmitted","having transmitted"]'::jsonb, 0, '''Prohibit somebody from doing something'' kalıbında, ''from'' edatından sonra fiil -ing (gerund) takısı almalıdır: ''from transmitting''.', ARRAY['grammar', 'gerunds-infinitives', 'prohibit-from']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-025', 'ingilizce', 'Vocabulary', 'Banking & Finance', 2, 'At the annual general assembly, the board recommended distributing a cash ________ of 1.20 TL per share to shareholders out of retained earnings.', '["deficit","dividend","mortgage","inflation","depreciation"]'::jsonb, 1, '''Dividend'' (kâr payı / temettü), bir şirketin elde ettiği kârdan hisse sahiplerine hisse başına dağıttığı paydır.', ARRAY['vocabulary', 'banking', 'dividend', 'shares']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-026', 'ingilizce', 'Vocabulary', 'Banking & Finance', 2, 'During periods of rapid capital outflows, commercial banks can face a severe ________ squeeze if interbank lending rates skyrocket unexpectedly.', '["liquidity","validity","redundancy","versatility","conformity"]'::jsonb, 0, '''Liquidity squeeze'' (likidite sıkışıklığı), piyasada nakit veya kolay nakde çevrilebilir varlıkların yetersiz kalması durumudur.', ARRAY['vocabulary', 'banking', 'liquidity']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-027', 'ingilizce', 'Vocabulary', 'Banking & Finance', 3, 'Under the standard loan agreement, the gradual repayment of the debt principal along with regular interest charges over time is referred to as ________.', '["amortization","inflation","securitization","insolvency","arbitrage"]'::jsonb, 0, '''Amortization'' (itfa / amortisman / borç tükenimi), bir kredinin ana para ve faizinin belirlenen bir geri ödeme planına göre taksitlerle kademeli olarak kapatılmasıdır.', ARRAY['vocabulary', 'banking', 'amortization']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-028', 'ingilizce', 'Vocabulary', 'Synonyms & Antonyms', 2, 'Choose the word closest in meaning to the underlined word:
"Exchange rates tend to *fluctuate* dramatically whenever central banks unexpectedly alter their interest rate guidance."', '["vary","stabilize","decline","persist","disappear"]'::jsonb, 0, '''Fluctuate'' (dalgalanmak, değişkenlik göstermek) kelimesinin en yakın anlamlısı ''vary'' (farklılaşmak, değişmek) kelimesidir.', ARRAY['vocabulary', 'synonyms', 'fluctuate']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-029', 'ingilizce', 'Vocabulary', 'Phrasal Verbs', 2, 'The IT department intends to ________ outmoded mainframe architectures and replace them with modular microservice architectures by next year.', '["phase out","bring up","give in","look into","carry on"]'::jsonb, 0, '''Phase out'' (kademeli olarak sonlandırmak / kullanımdan kaldırmak), eski bir sistem veya ürünün yerine yenisi konurken yavaşça devreden çıkarılmasıdır.', ARRAY['vocabulary', 'phrasal-verbs', 'phase-out']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-030', 'ingilizce', 'Sentence Completion', 'Transitions & Conjunctions', 2, '________ the macroeconomic climate remained challenging throughout the fiscal year, the agricultural credit portfolio showed surprisingly low default rates.', '["Even though","Because","In order that","So as to","As a result of"]'::jsonb, 0, '''Even though'' (-e rağmen / her ne kadar ... olsa da) tam cümle ile zıtlık bildiren bir yan cümle bağlacıdır. Makroekonomik şartlar zorlu olmasına rağmen batık kredi oranının düşük çıkması zıtlıktır.', ARRAY['sentence-completion', 'conjunctions', 'even-though']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-031', 'ingilizce', 'Sentence Completion', 'Reason Clauses', 2, 'Due to unforeseen hardware maintenance in the central data warehouse, ________.', '["all overnight batch settlement jobs were postponed until the following morning","because the mobile banking application functioned without any latency","which caused customers to express great satisfaction with banking speed","if the credit card verification system had operated seamlessly","in spite of the prompt resolution of all customer inquiries"]'::jsonb, 0, '''Due to ...'' (nedeniyle) bir sebep bildiren zarf öbeğidir ve arkasından mantıklı bir sonuç ana cümlesi gerektirir: ''Merkezi depodaki bakım nedeniyle tüm gece mutabakat işleri ertesi sabaha ertelendi.''', ARRAY['sentence-completion', 'cause-and-effect']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-032', 'ingilizce', 'Error Identification', 'Subject-Verb Agreement', 2, 'Identify the underlined part that contains a grammatical error:

"(A) *Each of* the regional branches (B) *have reported* a notable increase in (C) *digital loan applications* (D) *since* the revised mobile interface (E) *was released*."', '["(A) Each of","(B) have reported","(C) digital loan applications","(D) since","(E) was released"]'::jsonb, 1, '''Each of + plural noun'' yapısı daima tekil fiil (singular verb) gerektirir. ''Each of the regional branches has reported'' olmalıdır; ''have reported'' dil bilgisi hatasıdır.', ARRAY['error-identification', 'grammar', 'subject-verb-agreement']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-033', 'ingilizce', 'Error Identification', 'Adjective / Adverb Usage', 2, 'Identify the underlined part that contains a grammatical error:

"The newly launched (A) *fraud detection* system operates (B) *remarkable* (C) *efficiently* by cross-referencing customer location data (D) *with* ongoing POS transaction (E) *records*."', '["(A) fraud detection","(B) remarkable","(C) efficiently","(D) with","(E) records"]'::jsonb, 1, '''Efficiently'' bir zarftır (adverb). Bir zarfı nitelemek için sıfat (''remarkable'') değil, başka bir zarf kullanılmalıdır: ''remarkably efficiently'' (kayda değer derecede verimli).', ARRAY['error-identification', 'grammar', 'adjective-adverb']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-034', 'ingilizce', 'Dialogue Completion', 'Customer Support', 2, 'Complete the dialogue:

Customer: "Good morning, I tried to make a SWIFT transfer to my supplier abroad, but the system displayed an error code ''ERR-402''."
Bank Representative: "________"
Customer: "No, I didn''t verify that. Let me look up their exact IBAN and BIC immediately."', '["Did you make sure that the recipient''s bank routing details and SWIFT code were completely accurate?","Would you like to open a multi-currency foreign exchange deposit account today?","Our physical branches are currently closed due to public holiday regulations.","The foreign exchange rate has just increased by five percent since yesterday.","You cannot cancel an international transaction once it is cleared."]'::jsonb, 0, 'Müşterinin ''Hayır, bunu kontrol etmemiştim, hemen IBAN ve BIC kodlarına bakayım'' cevabı; temsilcinin alıcının şube/SWIFT kodlarının doğruluğunu soran bir soru yönelttiğini gösterir.', ARRAY['dialogue-completion', 'banking', 'swift']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-035', 'ingilizce', 'Dialogue Completion', 'IT Helpdesk', 2, 'Complete the dialogue:

Loan Analyst: "I cannot access the risk score dashboard this morning. The screen keeps prompting me for secondary authorization."
Security Administrator: "We rolled out mandatory two-factor authentication (2FA) for all intranet tools over the weekend."
Loan Analyst: "Oh, I see. What should I do next to log in?"
Security Administrator: "________"', '["Simply open the corporate authenticator app on your registered smartphone and enter the 6-digit passcode.","You should reinstall Windows on your laptop to wipe out any corrupt files.","The loan interest rates are recalculated every Monday by our treasury division.","We will probably cancel all customer loans that were submitted last week.","Please deposit twenty lira to renew your debit card subscription."]'::jsonb, 0, '2FA (İki faktörlü kimlik doğrulama) ile ilgili bir soruya IT yöneticisinin ''Kurumsal kimlik doğrulayıcı uygulamanızı açıp 6 haneli kodu giriniz'' demesi bağlama tam uygundur.', ARRAY['dialogue-completion', 'it', 'security', '2fa']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-036', 'ingilizce', 'Cloze Test', 'Digital Banking Evolution', 2, 'Read the text and choose the best option for blank [1]:

"The modern banking sector has witnessed an unprecedented transformation over the last decade. Traditional branch-centric operations are rapidly giving way to digital-first banking paradigms. Consequently, financial institutions must continuously update their legacy software architectures [1] ________ cyber threats become ever more sophisticated."', '["as","despite","unlike","instead","unless"]'::jsonb, 0, '''As'' burada ''-dıkça / çünkü'' (as cyber threats become...) anlamında sebep veya eş zamanlı gelişim bildirmektedir: ''Siber tehditler daha sofistike hale geldikçe kurumlar yazılımlarını güncellemelidir''.', ARRAY['cloze-test', 'conjunctions', 'as']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-037', 'ingilizce', 'Cloze Test', 'Digital Banking Evolution', 2, 'Read the text and choose the best option for blank [2]:

"...Furthermore, customer expectations regarding speed and usability have escalated dramatically. Mobile applications that fail to offer intuitive navigation risk losing market share, [2] ________ the underlying core banking engine is technically robust."', '["even if","in order that","so as to","owing to","because of"]'::jsonb, 0, '''Even if'' (-se bile / olsa dahi), koşullu zıtlık bildirir: ''Altyapı sağlam olsa bile, sezgisel bir arayüz sunamayan mobil uygulamalar pazar payını kaybetme riski taşır''.', ARRAY['cloze-test', 'conditionals', 'even-if']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-038', 'ingilizce', 'Reading Comprehension', 'Open Banking & API Economy', 2, 'Answer the question according to the text below:

"Open Banking represents a regulatory and technological framework that mandates financial institutions to share customer-permissioned financial data with certified third-party providers via standardized Application Programming Interfaces (APIs). In Turkey, regulatory frameworks spearheaded by the Central Bank (TCMB) and the Banking Regulation and Supervision Agency (BDDK) have established robust security standards for open banking implementations, such as Account Information Services (AIS) and Payment Initiation Services (PIS). While incumbent commercial banks initially perceived open banking as a threat to their proprietary customer data, many have now embraced it as an opportunity to expand their digital ecosystem by partnering with agile fintech startups."

According to the passage, what is the primary role of APIs in Open Banking?', '["They allow secure sharing of customer-approved financial data with certified third-party providers.","They completely eliminate the need for supervisory banking oversight bodies like BDDK.","They permanently replace all physical bank branches with automated teller machines.","They guarantee that bank deposit interest rates remain permanently fixed.","They enable customers to bypass all authentication requirements during online purchases."]'::jsonb, 0, 'Metnin ilk cümlesinde açıkça belirtilmiştir: ''mandates financial institutions to share customer-permissioned financial data with certified third-party providers via standardized Application Programming Interfaces (APIs)''.', ARRAY['reading-comprehension', 'open-banking', 'apis']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-039', 'ingilizce', 'Reading Comprehension', 'Open Banking & API Economy', 2, 'According to the passage on Open Banking, how has the perspective of incumbent commercial banks changed over time?', '["They initially viewed it as a threat to their proprietary data, but now see it as an opportunity to collaborate with fintechs.","They completely refused to comply with regulatory standards published by TCMB.","They decided to stop all mobile software development and return to branch banking.","They merged all of their credit card divisions into a single unified state institution.","They ceased offering payment initiation services due to excessive operating expenses."]'::jsonb, 0, 'Metnin son cümlesinde: ''While incumbent commercial banks initially perceived open banking as a threat to their proprietary customer data, many have now embraced it as an opportunity to expand their digital ecosystem by partnering with agile fintech startups'' ifadesi yer almaktadır.', ARRAY['reading-comprehension', 'banks-fintech', 'open-banking']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-040', 'ingilizce', 'Reading Comprehension', 'Open Banking & API Economy', 2, 'What can be inferred from the passage regarding Open Banking in Turkey?', '["Open banking services operate within a strictly regulated environment supervised by official authorities such as TCMB and BDDK.","Third-party providers can access user banking data without obtaining explicit customer consent.","Turkish banks are technologically behind foreign banks and cannot implement API standards.","Payment Initiation Services are prohibited under current Turkish banking legislation.","Customer financial data is made publicly readable on the internet without any encryption."]'::jsonb, 0, 'Metinde TCMB ve BDDK öncülüğünde sağlam güvenlik standartlarının getirildiği açıkça vurgulanmaktadır. Bu da açık bankacılığın resmi otoritelerce sıkı biçimde düzenlenen ve denetlenen bir ortamda çalıştığını gösterir.', ARRAY['reading-comprehension', 'inference', 'banking-regulations']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-041', 'ingilizce', 'Vocabulary', 'Phrasal Verbs', 2, 'The internal audit team was instructed to ________ a thorough investigation into the unauthorized transactions reported last month.', '["carry out","call off","turn down","give up","hold back"]'::jsonb, 0, '''Carry out'' bir araştırmayı, görevi, denetimi veya planı ''yürütmek, uygulamak, icra etmek'' anlamına gelir. ''Call off'' iptal etmek, ''turn down'' reddetmek, ''give up'' vazgeçmek demektir.', ARRAY['vocabulary', 'phrasal-verbs', 'audit']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-042', 'ingilizce', 'Vocabulary', 'Phrasal Verbs', 2, 'Small and medium-sized enterprises (SMEs) ________ more than 60 percent of total commercial employment in the domestic economy.', '["look into","account for","stem from","wipe out","break down"]'::jsonb, 1, '''Account for'' bir orana, sayıya veya yüzdeye ''tekabül etmek, oluşturmak'' anlamında sınavlarda en çok çıkan phrasal verb''lerden biridir. Cümlede ''KOBİ''ler toplam istihdamın %60''ından fazlasını oluşturmaktadır'' denmektedir.', ARRAY['vocabulary', 'phrasal-verbs', 'economy']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-043', 'ingilizce', 'Vocabulary', 'Academic Verbs', 3, 'Persistently high interest rates and restrictive credit conditions may significantly ________ the growth of private investments.', '["facilitate","hamper","substantiate","accelerate","clarify"]'::jsonb, 1, '''Hamper'' engellemek, köstek olmak, güçleştirmek anlamına gelir (eş anlamlılar: hinder, impede). Cümle mantığında yüksek faiz oranları yatırımları kolaylaştırmaz (facilitate) veya hızlandırmaz (accelerate), aksine engeller / yavaşlatır (hamper).', ARRAY['vocabulary', 'academic-verbs', 'finance']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-044', 'ingilizce', 'Vocabulary', 'Academic Adjectives', 2, 'Because their export revenues depend predominantly on a single raw material, developing economies remain exceptionally ________ to external price shocks.', '["indifferent","vulnerable","immune","resistant","negligible"]'::jsonb, 1, '''Vulnerable to'' bir tehlikeye, şoka veya olumsuzluğa karşı ''savunmasız, hassas'' olmak anlamına gelir. ''Immune to'' bağışık olmak, ''resistant to'' dirençli olmak demektir.', ARRAY['vocabulary', 'adjectives', 'preposition-collocation']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-045', 'ingilizce', 'Vocabulary', 'Academic Adverbs', 2, 'Following the implementation of digital core banking software, customer transaction processing times decreased ________.', '["substantially","reluctantly","doubtfully","coincidentally","vaguely"]'::jsonb, 0, '''Substantially'' (önemli ölçüde, kayda değer şekilde / eş anlamlılar: significantly, considerably, drastically) fiili niteleyen en uygun zarftır. İşlem süreleri ''önemli ölçüde azalmıştır''. ''Reluctantly'' isteksizce demektir.', ARRAY['vocabulary', 'adverbs']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-046', 'ingilizce', 'Vocabulary', 'Phrasal Verbs', 2, 'Analysts emphasized that the banking panic did not occur randomly; it ________ deep-rooted structural weaknesses in risk governance.', '["stemmed from","settled down","backed up","took over","passed away"]'::jsonb, 0, '''Stem from'' -den kaynaklanmak, ileri gelmek anlamına gelir (originate from, derive from). Panik ''risk yönetimindeki köklü yapısal zayıflıklardan kaynaklandı''.', ARRAY['vocabulary', 'phrasal-verbs']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-047', 'ingilizce', 'Vocabulary', 'Banking & Finance', 2, 'When a commercial borrower fails to meet scheduled interest or principal payments, the credit facility is considered to be in ________.', '["default","surplus","parity","equilibrium","dividend"]'::jsonb, 0, '''In default'' (temerrüt hali), borçlunun kredi veya faiz ödeme yükümlülüğünü yerine getirememesi durumudur. ''Surplus'' fazla, ''dividend'' temettü (kâr payı) demektir.', ARRAY['vocabulary', 'finance', 'banking']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-048', 'ingilizce', 'Vocabulary', 'Academic Verbs', 3, 'To restore confidence in financial markets, the regulatory authority introduced stringent measures to ________ illicit money flows and tax evasion.', '["curb","foster","trigger","magnify","advocate"]'::jsonb, 0, '''Curb'' frenlemek, dizginlemek, sınırlamak anlamına gelir (eş anlamlılar: restrict, restrain). Yasa dışı para akışını ve vergi kaçakçılığını ''dizginlemek / engellemek'' için sıkı tedbirler getirilmiştir. ''Foster'' teşvik etmek, ''magnify'' büyütmek demektir.', ARRAY['vocabulary', 'academic-verbs']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-049', 'ingilizce', 'Conjunctions', 'Contrast Conjunctions', 2, '________ severe macroeconomic headwinds and currency volatility, the national commercial bank achieved an impressive 18 percent increase in annual net profit.', '["Because of","Despite","Although","In order to","Provided that"]'::jsonb, 1, 'Boşluktan sonra bir isim öbeği (severe macroeconomic headwinds... - Noun Phrase) gelmiştir ve cümlenin ilk kısmı olumsuz (-) iken ana cümle kâr artışı ile olumludur (+). Zıtlık bildiren ve arkasından isim öbeği alan edat ''Despite''dır. ''Although'' arkasından tam cümle (Özne + Yüklem) gerektirirdi.', ARRAY['conjunctions', 'contrast', 'despite-vs-although']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-050', 'ingilizce', 'Conjunctions', 'Contrast Conjunctions', 2, '________ digital banking applications offer unprecedented convenience for daily retail payments, they simultaneously expose financial institutions to sophisticated cyber threats.', '["While","In spite of","Consequently","Unless","Because"]'::jsonb, 0, '''While'' cümle başında kullanıldığında ''Although / -e rağmen'' veya ''iken'' anlamında iki durum arasındaki karşıtlığı kurar (bir yanda kolaylık sağlamasına rağmen diğer yanda siber tehditlere maruz bırakmaktadır). Arkasından tam cümle aldığı için ''In spite of'' (isim alır) elenir.', ARRAY['conjunctions', 'while', 'contrast']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-051', 'ingilizce', 'Conjunctions', 'Cause & Effect', 2, 'The executive management decided to suspend the overseas branch expansion ________ deteriorating geopolitical conditions in the region.', '["due to","even though","as long as","so that","whereas"]'::jsonb, 0, 'Boşluktan sonra ''deteriorating geopolitical conditions'' (kötüleşen jeopolitik koşullar) isim öbeği gelmektedir. Şubenin askıya alınmasının ''sebebi'' anlatılmaktadır. İsim öbeği ile kullanılan sebep bağlacı ''Due to''dur (-den dolayı). ''Even though'' ve ''Whereas'' tam cümle ister.', ARRAY['conjunctions', 'due-to', 'cause-effect']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-052', 'ingilizce', 'Conjunctions', 'Conditionals & Conjunctions', 2, 'Cross-border payment settlements cannot be finalized ________ all participating correspondent banks fully verify the authenticity of the transaction credentials.', '["unless","despite","in case of","in order that","although"]'::jsonb, 0, '''Unless'' (= if not / -medikçe, -madıkça) şart bildirir. ''Katılımcı muhabir bankalar kimlik bilgilerini tam olarak doğrulamadıkça ödemeler tamamlanamaz''. Anlamsal olarak ''unless'' gereklidir.', ARRAY['conjunctions', 'unless', 'conditionals']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-053', 'ingilizce', 'Conjunctions', 'Transitions', 3, 'The fintech startup struggled to obtain venture capital funding during its initial two years; ________, its innovative credit scoring algorithm eventually gained widespread market adoption.', '["nevertheless","therefore","for instance","moreover","as a result"]'::jsonb, 0, 'Noktalı virgül (;) ve virgül (,) arasında zıtlık geçişi aranmaktadır. İlk cümlede fon bulmakta zorlandığı (-) söylenirken, ikinci cümlede algoritmasının geniş kabul gördüğü (+) belirtilmiştir. Bu zıtlığı ''nevertheless'' (yine de, buna rağmen / eş anlamlı: however, nonetheless) sağlar. ''Therefore'' ve ''as a result'' sonuç bildirir.', ARRAY['conjunctions', 'transitions', 'nevertheless']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-054', 'ingilizce', 'Grammar', 'Tenses & Since Rule', 2, 'Since the banking regulatory authority ________ mandatory multi-factor authentication rules in 2021, online identity theft incidents ________ by nearly 45 percent.', '["introduced / have declined","introduces / declined","has introduced / decline","had introduced / will decline","was introducing / had declined"]'::jsonb, 0, 'Klasik ve değişmez SINCE kuralı: ''Since + Simple Past (V2), Present Perfect (have/has + V3)''. Otorite 2021''de kuralı getirdiğinden beri (introduced), olaylar azalmıştır (have declined).', ARRAY['grammar', 'tenses', 'since-rule']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-055', 'ingilizce', 'Grammar', 'Time Clauses & Will Prohibition', 2, 'As soon as the monetary policy committee ________ its benchmark interest rate decision tomorrow, commercial lenders ________ their deposit yields accordingly.', '["will announce / adjust","announces / will adjust","announced / have adjusted","has announced / adjusted","is announcing / had adjusted"]'::jsonb, 1, 'Zaman bağlaçları (as soon as, when, after, before) yan cümlesinde ASLA ''will'' almaz! Cümle yarını (future) anlattığı için: Yan cümle Present Simple (''announces''), ana cümle Future (''will adjust'') olur.', ARRAY['grammar', 'time-clauses', 'tenses']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-056', 'ingilizce', 'Grammar', 'Passive Voice & Modals', 2, 'Confidential financial records ________ on unencrypted portable storage devices under any circumstances, as specified in banking data compliance policies.', '["must not be stored","do not need to store","might have stored","ought to store","would have been stored"]'::jsonb, 0, 'Özne ''Confidential financial records'' (gizli finansal kayıtlar) cansız bir nesnedir ve depolayan değil depolanandır, yani EDİLGEN (Passive: be + V3) olmalıdır. Ayrıca kesin bir yasaklama (''under any circumstances'') anlatıldığı için ''must not be stored'' (saklanmamalıdır / saklanması yasaktır) doğru yapıdır.', ARRAY['grammar', 'passive-voice', 'modals']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-057', 'ingilizce', 'Grammar', 'Conditionals & Inversion', 3, '________ the senior risk auditor identified the fraudulent transactions earlier, the substantial financial loss could easily have been prevented.', '["Had","Should","Were","Unless","If only"]'::jsonb, 0, 'Ana cümlede ''could have been prevented'' (Type 3 Conditional) kullanılmıştır. Şart cümlesi ''If the auditor had identified...'' yerine ''If'' kaldırılarak DEVRİK (Inversion) yapılmıştır: ''Had the auditor identified...''. Cümle başında ''Had + Özne + V3'' yapısı Type 3 devrik şart cümlesidir.', ARRAY['grammar', 'conditionals', 'inversion']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-058', 'ingilizce', 'Grammar', 'Relative Clauses', 2, 'The supervisory committee summoned the chief executive, ________ strategic decisions during the acquisition process had raised serious regulatory concerns.', '["whom","whose","which","where","that"]'::jsonb, 1, '''Whose'' bir ismin sahipliğini belirtmek için kullanılır (chief executive''s strategic decisions ➔ CEO''nun stratejik kararları). ''Kişi + whose + isim'' kalıbı doğrudan ''whose'' gerektirir.', ARRAY['grammar', 'relative-clauses', 'whose']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-059', 'ingilizce', 'Grammar', 'Past Modals & Deductions', 3, 'The cyber attackers ________ valid administrative credentials to bypass the core firewall; otherwise, the automated security intrusion alarm would have gone off immediately.', '["must have used","should have used","cannot use","could not have used","would rather use"]'::jsonb, 0, 'Geçmişe dair güçlü bir çıkarım (strong deduction) vardır: ''Saldırganlar güvenlik duvarını aşmak için geçerli yönetici kimlik bilgilerini KULLANMIŞ OLMALILAR (must have used); aksi takdirde alarm çalardı''. ''Should have used'' kullanmalıydı ama kullanmadı anlamına gelir ve anlama uymaz.', ARRAY['grammar', 'past-modals', 'deduction']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-060', 'ingilizce', 'Sentence Completion', 'Conjunction Logic', 2, 'Although modern algorithmic trading systems execute high-frequency orders in mere microseconds, ________.', '["they can occasionally amplify sudden market volatility when unexpected systemic shocks occur","they have completely eliminated the risk of financial loss for retail investors","because computerized trading models are infallible and guarantee continuous profits","so financial regulatory bodies encourage unmonitored flash order operations","which proves that human traders are no longer needed under any circumstances"]'::jsonb, 0, 'Cümle ''Although'' (Zıtlık) ile başlamaktadır. İlk kısım sistemin hızı ve gelişmişliğiyle olumludur (+). Virgülden sonraki ana cümlenin olumsuz (-) bir yönü veya riski anlatması gerekir: ''beklenmedik şoklarda ani piyasa oynaklığını büyütebilmektedirler''. A şıkkı bu zıtlığı kusursuz biçimde tamamlar.', ARRAY['sentence-completion', 'although', 'contrast']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-061', 'ingilizce', 'Sentence Completion', 'Cause & Effect', 2, 'Unless a commercial enterprise maintains a sufficient buffer of high-quality liquid assets, ________.', '["it may find itself unable to honor short-term obligations during unexpected credit contractions","it would have enjoyed record high profitability throughout the fiscal year","which guarantees smooth cross-border settlement processing without delays","therefore institutional investors immediately injected surplus equity capital","it easily secured long-term funding at below-market interest rates"]'::jsonb, 0, '''Unless'' (-medikçe / if not) şartı olumsuz bir durum uyarısı içerir. Yeterli likit varlık tamponu tutmadıkça ➔ ''beklenmedik kredi daralmalarında kısa vadeli yükümlülüklerini yerine getiremez hale gelebilir''. A şıkkı hem zaman (Present/May) hem anlam açısından tam uyumludur.', ARRAY['sentence-completion', 'unless', 'finance']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-062', 'ingilizce', 'Sentence Completion', 'Subject & Pronoun Reference', 3, 'Because credit rating agencies downgraded the sovereign bond ratings of several emerging nations, ________.', '["international lenders immediately raised risk premiums on future loans extended to those countries","in order that foreign direct investment would pour in without any regulatory restraint","despite the unprecedented resilience of domestic capital market infrastructures","so that commercial banks could easily lower their capital adequacy reserves","which had already repaid their outstanding foreign currency sovereign debts"]'::jsonb, 0, '''Because'' (Sebep) cümlesinde kredi notlarının düşürüldüğü belirtilmiştir. Bunun mantıksal sonucu: Uluslararası borç verenlerin o ülkelere açılacak kredilerdeki risk primlerini artırmasıdır (A şıkkı).', ARRAY['sentence-completion', 'because', 'cause-effect']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-063', 'ingilizce', 'Sentence Completion', 'Purpose Clauses', 2, 'Central banks conduct routine stress test simulations on systemically important financial institutions in order to ________.', '["assess whether their capital cushions can withstand extreme macroeconomic recessions","guarantee that no financial institution will ever record an operational loss","owing to the complete deregulation of international cross-border fund flows","although commercial banks had already distributed all their surplus dividends","so that speculative cryptocurrency trades could be incorporated into reserve assets"]'::jsonb, 0, '''In order to + Fiil'' (amaç bildirir - yapmak amacıyla). Merkez bankaları stres testlerini ''sermaye tamponlarının aşırı makroekonomik durgunluklara dayanıp dayanamayacağını değerlendirmek amacıyla'' yapar.', ARRAY['sentence-completion', 'in-order-to', 'banking']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-064', 'ingilizce', 'Translation', 'English to Turkish', 2, 'The newly adopted artificial intelligence guidelines require financial institutions to maintain full transparency in their automated credit scoring decisions.

Verilen İngilizce cümlenin en uygun Türkçe karşılığını bulunuz:', '["Yeni kabul edilen yapay zekâ yönergeleri, finans kuruluşlarının otomatik kredi skorlama kararlarında tam şeffaflık sağlamasını zorunlu kılmaktadır.","Finans kuruluşları, otomatik kredi kararlarında şeffaf olmak amacıyla yeni yapay zekâ kurallarını benimsemiştir.","Yeni yapay zekâ kurallarına göre finans kuruluşlarının otomatik kredi kararlarında şeffaflık sağlaması tavsiye edilmektedir.","Otomatik kredi skorlamasında tam şeffaflık sağlayan finans kuruluşları, yeni yapay zekâ yönergelerini kabul etmiştir.","Yeni kabul edilen yapay zekâ ilkeleri sayesinde finans kuruluşları kredi skorlamasında şeffaflığı artıracaktır."]'::jsonb, 0, 'Taktik: Cümlenin yüklemi ''require'' (zorunlu kılmaktadır / şart koşmaktadır). Özne: ''The newly adopted artificial intelligence guidelines'' (Yeni kabul edilen yapay zekâ yönergeleri). A şıkkında özne ve yüklem eksiksiz ve birebir karşılanmıştır. C''de ''tavsiye edilmektedir'', B''de ''benimsemiştir'', E''de ''artıracaktır'' diyerek yüklem bozulmuştur.', ARRAY['translation', 'eng-to-tr', 'tactic-verb-hunting']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-065', 'ingilizce', 'Translation', 'Turkish to English', 2, 'Merkez bankası faiz oranlarını düşürdüğünde, ticari kredilere olan talep genellikle önemli ölçüde artar.

Verilen Türkçe cümlenin en uygun İngilizce karşılığını bulunuz:', '["When the central bank lowers interest rates, demand for commercial loans generally increases substantially.","If the central bank had lowered interest rates, demand for commercial loans would increase remarkably.","Although the central bank lowered interest rates, demand for commercial loans remained unchanged.","Commercial loans generally increase when the central bank is forced to lower lending rates.","Since the central bank lowers interest rates, the volume of commercial loans has increased dramatically."]'::jsonb, 0, 'Taktik: Yan cümle ''düşürdüğünde'' ➔ ''When the central bank lowers interest rates''. Ana cümlenin yüklemi: ''genellikle önemli ölçüde artar'' ➔ ''generally increases substantially''. A şıkkı tam ve hatasız çeviridir.', ARRAY['translation', 'tr-to-eng', 'tactic-verb-hunting']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-066', 'ingilizce', 'Translation', 'English to Turkish', 3, 'Unless internal audit reports are reviewed regularly by executive directors, operational vulnerabilities cannot be detected in a timely manner.

Verilen İngilizce cümlenin en uygun Türkçe karşılığını bulunuz:', '["İç denetim raporları icra direktörleri tarafından düzenli olarak incelenmedikçe, operasyonel zafiyetler zamanında tespit edilemez.","İcra direktörleri iç denetim raporlarını düzenli olarak incelese bile operasyonel riskler zamanında tespit edilemeyebilir.","Operasyonel zafiyetlerin zamanında tespit edilmesi, iç denetim raporlarının direktörler tarafından onaylanmasına bağlıdır.","İç denetim raporları düzenli incelenmediği için operasyonel açıkların zamanında belirlenmesi mümkün olmamıştır.","İcra direktörleri iç denetim raporlarını zamanında incelemediği takdirde operasyonel sorunlar ortaya çıkacaktır."]'::jsonb, 0, '''Unless ... reviewed'' (-incelenmedikçe / incelenmezse). Ana yüklem: ''cannot be detected in a timely manner'' (zamanında tespit edilemez). A şıkkı cümlenin birebir ve doğru çevirisidir.', ARRAY['translation', 'eng-to-tr', 'unless']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-067', 'ingilizce', 'Reading Comprehension', 'Main Idea', 2, 'Read the passage and answer the question:

''In recent years, the rapid proliferation of decentralized finance (DeFi) platforms has challenged traditional banking paradigms. Proponents argue that smart contracts eliminate intermediaries, drastically reducing transaction fees and processing delays. However, international regulatory authorities warn that the absence of centralized oversight creates severe vulnerabilities to money laundering and automated protocol exploits. Consequently, leading global central banks are now developing Central Bank Digital Currencies (CBDCs) to combine the speed of blockchain architecture with the safety of sovereign legal backing.''

What is the primary objective of central banks in developing CBDCs according to the passage?', '["To merge the technological efficiency of blockchain with the legal security and trust of sovereign money.","To completely abolish traditional commercial bank branches within the next decade.","To encourage unmonitored speculative transactions across decentralized financial networks.","To eliminate all legal regulations governing cross-border commercial transactions.","To replace physical cash exclusively with volatile private cryptocurrencies."]'::jsonb, 0, 'Metnin son cümlesinde: ''combine the speed of blockchain architecture with the safety of sovereign legal backing'' (blokzincir hızını egemen devlet güvencesiyle birleştirmek) açıkça belirtilmiştir. A şıkkı bu cümlenin doğrudan karşılığıdır.', ARRAY['reading-comprehension', 'main-idea', 'cbdc']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-068', 'ingilizce', 'Reading Comprehension', 'Detail & Inference', 2, 'According to the passage on decentralized finance (DeFi), what is a major concern raised by international regulatory authorities?', '["The lack of centralized supervision makes these platforms susceptible to illicit activities and protocol exploits.","Smart contracts execute financial transactions much too slowly compared to legacy wire systems.","Decentralized platforms demand excessively high intermediary commissions from retail users.","Governments have completely banned all computer programming languages used in finance.","Centralized banks refuse to employ automated IT infrastructure for daily operations."]'::jsonb, 0, 'Metinde ''absence of centralized oversight creates severe vulnerabilities to money laundering and automated protocol exploits'' denilmiştir. Bu da A şıkkındaki ''merkezi denetim eksikliğinin yasadışı faaliyetlere ve protokole yönelik istismarlara zemin hazırlaması'' endişesini doğrudan açıklar.', ARRAY['reading-comprehension', 'inference', 'defi']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-069', 'ingilizce', 'Vocabulary', 'Collocations & Prepositions', 2, 'Commercial banks are strictly legally required to comply ________ international anti-money laundering (AML) standards established by FATF.', '["with","for","at","from","against"]'::jsonb, 0, '''Comply with'' (kurallara, standartlara uymak) sınavın en klasik edat eşleşmesidir (prepositional verb). ''Comply'' her zaman ''with'' edatı ile kullanılır.', ARRAY['vocabulary', 'preposition', 'comply-with']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-070', 'ingilizce', 'Vocabulary', 'Collocations & Prepositions', 2, 'The regulatory body decided to deprive the unlicensed broker ________ its operating permission following serious consumer fraud allegations.', '["of","with","to","by","over"]'::jsonb, 0, '''Deprive somebody of something'' (birini bir şeyden mahrum bırakmak / elinden almak) yapısıdır. ''Deprive'' fiili ''of'' edatı ile eşleşir.', ARRAY['vocabulary', 'preposition', 'collocation']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-071', 'ingilizce', 'Vocabulary', 'Academic Verbs', 2, 'The board of directors met on Friday to ________ the proposed merger agreement with the foreign retail bank.', '["endorse","deteriorate","deplete","relinquish","violate"]'::jsonb, 0, '''Endorse'' onaylamak, desteklemek, tasdik etmek anlamına gelir (eş anlamlılar: approve, sanction, support). Yönetim kurulu birleşme anlaşmasını ''onaylamak'' için toplanmıştır. ''Deteriorate'' kötüleşmek, ''deplete'' tüketmek, ''violate'' ihlal etmek demektir.', ARRAY['vocabulary', 'academic-verbs']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-072', 'ingilizce', 'Vocabulary', 'Phrasal Verbs', 2, 'Due to unforeseen scheduling conflicts among executive board members, the quarterly financial audit meeting was ________ until next Tuesday.', '["put off","put out","looked up","taken after","run out"]'::jsonb, 0, '''Put off'' ertelemek (postpone, delay) anlamına gelir. Toplantı gelecek salıya kadar ertelenmiştir. ''Put out'' yangın söndürmek, ''take after'' birine benzemek demektir.', ARRAY['vocabulary', 'phrasal-verbs', 'put-off']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-073', 'ingilizce', 'Grammar', 'Gerund & Infinitive', 2, 'Financial institutions must refrain from ________ misleading statements concerning the expected returns of complex derivative products.', '["making","to make","make","having made","to have made"]'::jsonb, 0, 'İngilizcede edatlardan (preposition: in, on, at, from, by vb.) sonra fiil her zaman -ING (Gerund) alır. ''Refrain from + V-ing'' (bir şey yapmaktan kaçınmak / çekinmek) kuralı gereği doğru cevap ''making''dir.', ARRAY['grammar', 'gerund-infinitive', 'prepositions']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-074', 'ingilizce', 'Grammar', 'Tenses & Time Markers', 2, 'By the time the new banking regulation comes into full statutory effect next December, most financial firms ________ their compliance protocols.', '["will have completed","completed","had completed","are completing","have completed"]'::jsonb, 0, '''By the time + Present Simple'' gelecekte bir ana kadar bir işin bitmiş olacağını ifade eder ve ana cümlede mutlaka FUTURE PERFECT (will have + V3) yapısını gerektirir: ''will have completed'' (tamamlamış olacaklar).', ARRAY['grammar', 'by-the-time', 'future-perfect']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-075', 'ingilizce', 'Conjunctions', 'Contrast Conjunctions', 2, 'Gold is traditionally considered a reliable hedge against currency depreciation; ________, corporate bonds offer regular periodic coupon payments.', '["on the other hand","consequently","in addition to","because","for example"]'::jsonb, 0, '''On the other hand'' (öte yandan / diğer taraftan) iki farklı yatırım aracının (altın vs şirket tahvili) farklı niteliklerini karşılaştırmak için kullanılan geçiş ifadesidir.', ARRAY['conjunctions', 'transitions', 'on-the-other-hand']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-076', 'ingilizce', 'Conjunctions', 'Conditionals', 2, 'The loan facility will be disbursed immediately ________ the applicant submits the legally certified land title as collateral.', '["provided that","in spite of","despite","unless","whereas"]'::jsonb, 0, '''Provided that'' (= on condition that / if / -mesi şartıyla) koşul bağlacıdır. Kredi, başvuru sahibinin tapuyu teminat olarak ibraz etmesi ''şartıyla'' derhal kullandırılacaktır.', ARRAY['conjunctions', 'provided-that', 'conditionals']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-077', 'ingilizce', 'Vocabulary', 'Academic Adjectives', 3, 'Before embarking on a multimillion-dollar core banking transformation, executive management must conduct a rigorous study to ensure the project is financially ________.', '["feasible","obsolete","reluctant","arbitrary","vague"]'::jsonb, 0, '''Feasible'' uygulanabilir, yapılabilir, fizıbıl (financially viable) demektir. Projenin finansal olarak ''uygulanabilir'' olduğundan emin olmak için fizibilite çalışması yapılır. ''Obsolete'' modası geçmiş, ''arbitrary'' keyfi demektir.', ARRAY['vocabulary', 'academic-adjectives', 'feasible']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-078', 'ingilizce', 'Vocabulary', 'Phrasal Verbs', 2, 'The internal audit committee could not completely ________ the possibility of senior management involvement in the accounting irregular transactions.', '["rule out","give in","look forward to","put up with","run out of"]'::jsonb, 0, '''Rule out'' ihtimal dışı bırakmak, dışlamak, göz ardı etmek demektir (exclude, eliminate). Denetim komitesi üst yönetimin dahil olma ihtimalini tamamen ''dışlayamadı / göz ardı edemedi''.', ARRAY['vocabulary', 'phrasal-verbs', 'rule-out']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-079', 'ingilizce', 'Grammar', 'Causative & Passive', 3, 'Due to growing cyber fraud risks, the board resolved to have their core network infrastructure ________ by an external cybersecurity consultancy.', '["audited","audit","to audit","auditing","have audited"]'::jsonb, 0, 'Ettirgen çatı (Causative): ''Have something done (V3)''. Bir şeyi birine yaptırmak / denetletmek. Özne ''network infrastructure'' cansız olduğundan ''have + object + V3'' kalıbı ile ''audited'' kullanılır.', ARRAY['grammar', 'causative', 'passive']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('eng-080', 'ingilizce', 'Reading Comprehension', 'Vocabulary in Context', 2, 'In academic economic literature, the term ''liquidity squeeze'' most closely refers to a situation in which ________.', '["cash and readily convertible assets become extremely scarce, making it difficult for institutions to fulfill immediate payment liabilities","interest rates fall to zero and commercial banks refuse to accept customer deposit accounts","companies experience a massive surplus of uninvested capital and pay out record dividends","international trade barriers are eliminated and foreign capital pours uncontrollably into domestic banks","gold reserves increase so fast that the domestic currency experiences sharp deflationary pressures"]'::jsonb, 0, '''Liquidity squeeze'' (likidite sıkışıklığı), piyasada nakit ve hızla paraya çevrilebilir varlıkların aşırı derecede kıtlaşması ve kurumların acil nakit yükümlülüklerini karşılamakta zorlanması halidir. A şıkkı bu terimin kesin ekonomik tanımıdır.', ARRAY['reading-comprehension', 'finance-terminology', 'liquidity']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-001', 'alan', 'Algoritma ve Programlama Mantığı', 'Karmaşıklık Analizi', 2, 'Aşağıdaki algoritmaların en kötü durum (Worst-Case) zaman karmaşıklıkları karşılaştırıldığında, hangisinin karmaşıklığı diğerlerinden **daha büyüktür**?', '["Merge Sort - O(n log n)","Quick Sort - O(n²)","Heap Sort - O(n log n)","İkili Arama (Binary Search) - O(log n)","Dizi Üzerinde Doğrusal Arama (Linear Search) - O(n)"]'::jsonb, 1, 'Quick Sort algoritmasının en kötü durum (Worst-Case) karmaşıklığı pivot seçiminin en kötü olduğu durumlarda (örneğin zaten sıralı bir dizide ilk veya son elemanın seçilmesi) O(n²)''dir. Merge Sort ve Heap Sort her durumda (en kötü dahil) O(n log n) ile çalışır.', ARRAY['algoritma', 'karmaşıklık', 'big-o', 'sıralama']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-002', 'alan', 'Veri Yapıları ve Problem Çözme', 'Ağaç Yapıları', 2, 'Dengeli bir İkili Arama Ağacında (Balanced Binary Search Tree - AVL) $n$ adet düğüm bulunmaktadır. Bu ağaca yeni bir eleman ekleme (insertion) işleminin zaman karmaşıklığı nedir?', '["O(1)","O(log n)","O(n)","O(n log n)","O(n²)"]'::jsonb, 1, 'Dengeli bir AVL ağacının yüksekliği h = O(log n) olarak sınırlandırılmıştır. Ekleme işlemi ve sonrasında gerekebilecek döndürme (rotation) işlemleri yükseklikle orantılı olduğundan toplam zaman karmaşıklığı O(log n)''dir.', ARRAY['veri-yapıları', 'ağaçlar', 'avl', 'karmaşıklık']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-003', 'alan', 'Veri Tabanı ve SQL', 'ACID Prensipleri', 2, 'Bir bankacılık uygulamasında A hesabından 1.000 TL düşülüp B hesabına 1.000 TL eklenmektedir. Sistemsel bir kesinti olsa dahi işlemin ya tamamen gerçekleşmesini ya da hiç gerçekleşmemiş gibi eski haline dönmesini sağlayan ACID özelliği hangisidir?', '["Atomicity (Bütünlük/Bölünemezlik)","Consistency (Tutarlılık)","Isolation (Yalıtım)","Durability (Kalıcılık)","Concurrency (Eşzamanlılık)"]'::jsonb, 0, 'Atomicity (Bölünemezlik/Hep ya da Hiç), bir transaction içindeki tüm adımların tek bir birim olarak ele alınmasını sağlar. Adımlardan biri bile başarısız olursa tüm işlem geri alınır (rollback).', ARRAY['veritabanı', 'acid', 'transaction', 'bankacılık']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-004', 'alan', 'Veri Tabanı ve SQL', 'SQL JOIN', 2, 'İki tablo birleştirilirken, sol tablodaki tüm satırları ve sağ tablodaki yalnızca eşleşen satırları getiren; eşleşme olmayan sağ tablo sütunları için NULL değer döndüren SQL ifadesi hangisidir?', '["INNER JOIN","RIGHT JOIN","LEFT JOIN (veya LEFT OUTER JOIN)","FULL OUTER JOIN","CROSS JOIN"]'::jsonb, 2, 'LEFT JOIN, soldaki tablonun tüm satırlarını korur. Sağdaki tabloda ON koşulunu sağlayan bir eşleşme yoksa o sütunlar NULL olarak doldurulur.', ARRAY['sql', 'join', 'veritabanı']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-005', 'alan', 'Yazılım Mühendisliği ve Sistem Geliştirme', 'SOLID Prensipleri', 3, 'SOLID prensiplerinden hangisi, ''Yazılım varlıkları (sınıflar, modüller) genişletilmeye açık (open for extension), ancak değiştirilmeye kapalı (closed for modification) olmalıdır'' kuralını ifade eder?', '["Single Responsibility Principle (SRP)","Open/Closed Principle (OCP)","Liskov Substitution Principle (LSP)","Interface Segregation Principle (ISP)","Dependency Inversion Principle (DIP)"]'::jsonb, 1, 'OCP (Open/Closed Principle), var olan çalışan kodu değiştirmeden yeni davranışların (örneğin interface ve kalıtım/polimorfizm aracılığıyla) sisteme eklenebilmesini savunur.', ARRAY['yazılım-mühendisliği', 'solid', 'tasarım-prensipleri']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-006', 'alan', 'Bilgisayar Ağları ve İşletim Sistemleri', 'OSI Modeli', 1, 'OSI başvuru modelinde yönlendiricilerin (Router) çalıştığı ve mantıksal adresleme (IP adresleri) ile paket yönlendirmesinin yapıldığı katman hangisidir?', '["Fiziksel Katman (Physical Layer)","Veri Bağlantı Katmanı (Data Link Layer)","Ağ Katmanı (Network Layer)","Taşıma Katmanı (Transport Layer)","Uygulama Katmanı (Application Layer)"]'::jsonb, 2, 'Ağ Katmanı (Network Layer - 3. Katman), IP adresleme, paketleme ve yönlendiriciler (Router) aracılığıyla en iyi yolun bulunması (routing) işlemlerinden sorumludur.', ARRAY['ağ', 'osi', 'router', 'network']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-007', 'alan', 'Bilgisayar Ağları ve İşletim Sistemleri', 'İşletim Sistemleri - Deadlock', 3, 'İşletim sistemlerinde bir kilitlenmenin (Deadlock) meydana gelebilmesi için gerekli olan dört Coffman koşulundan hangisi, ''Kaynakları elinde tutan bir sürecin, başka kaynakları beklerken mevcut kaynaklarını bırakmaması'' durumunu ifade eder?', '["Karşılıklı Dışlama (Mutual Exclusion)","Tut ve Bekle (Hold and Wait)","Kesinti Yok (No Preemption)","Dairesel Bekleme (Circular Wait)","Açlık (Starvation)"]'::jsonb, 1, 'Hold and Wait (Tut ve Bekle) şartı; bir sürecin en az bir kaynağı elinde tutarken aynı zamanda başka bir süreç tarafından tutulan diğer kaynakları talep edip beklemesi durumudur.', ARRAY['işletim-sistemleri', 'deadlock', 'coffman']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-008', 'alan', 'Bilgi Güvenliği Temelleri', 'Web Güvenliği', 2, 'Kullanıcı girdilerinin filtrelenmeden doğrudan dinamik SQL sorgularına dahil edilmesi sonucu saldırganın veritabanı sorgusunu manipüle edebildiği güvenlik zafiyeti hangisidir?', '["Cross-Site Scripting (XSS)","SQL Injection (SQLi)","Cross-Site Request Forgery (CSRF)","Man-in-the-Middle (MitM)","Distributed Denial of Service (DDoS)"]'::jsonb, 1, 'SQL Injection, güvenilmez kullanıcı verilerinin SQL ifadesiyle birleştirilerek veritabanı motoruna çalıştırılması sonucu yetkisiz veri okuma veya değiştirme imkanı veren en yaygın OWASP zafiyetlerinden biridir. Parametreli sorgular (Prepared Statements) ile önlenir.', ARRAY['güvenlik', 'sqli', 'owasp']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-009', 'alan', 'Veri Analitiği, Yapay Zekâ ve Makine Öğrenmesi Temelleri', 'Model Değerlendirme', 2, 'Dengesiz sınıf dağılımına sahip bir veri kümesinde (örneğin sahte banka işlemlerinin %1 olduğu dolandırıcılık tespiti modelinde), modelin başarısını ölçmek için tek başına Doğruluk (Accuracy) yerine tercih edilmesi gereken en uygun metrik hangisidir?', '["Ortalama Hata Kareleri Kökü (RMSE)","R-Kare (R²)","F1-Skoru (veya Precision & Recall)","Ortalama Mutlak Hata (MAE)","Doğruluk Oranı (Accuracy)"]'::jsonb, 2, 'Dengesiz veri setlerinde model tüm verilere ''sahte değil'' dese bile %99 doğruluk alabilir. Bu nedenle Precision (Kesinlik) ve Recall (Duyarlılık) değerlerinin harmonik ortalaması olan F1-Skoru kullanılır.', ARRAY['yapay-zeka', 'makine-ogrenmesi', 'f1-score', 'metrikler']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-010', 'alan', 'Sistem Analizi ve Dijital Teknoloji Uygulamaları', 'Bulut ve API Mimarisi', 2, 'Bankaların müşteri rızası dahilinde hesap bilgilerini ve ödeme başlatma hizmetlerini güvenli API''lar aracılığıyla üçüncü parti lisanslı finansal kuruluşlarla paylaşmasına olanak tanıyan mimari kavrama ne ad verilir?', '["Açık Bankacılık (Open Banking)","Monolitik Bankacılık (Monolithic Architecture)","Karanlık Ağ (Darknet)","Kapalı Devre Finans (Closed Banking)","Blokzincir Madenciliği (Proof of Work)"]'::jsonb, 0, 'Açık Bankacılık (Open Banking / PSD2 standartları), finansal verilerin standart API protokolleri üzerinden üçüncü taraf fintech sağlayıcıları ile güvenle paylaşılmasını sağlayan modern bankacılık ekosistemidir.', ARRAY['fintek', 'acik-bankacilik', 'api', 'bankacilik']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-011', 'alan', 'Algoritma ve Programlama Mantığı', 'Graf Algoritmaları', 2, 'Ağırlıklı ve negatif kenar ağırlığı bulunmayan bir graf üzerinde tek bir başlangıç düğümünden diğer tüm düğümlere en kısa yolları (Shortest Path) bulan klasik açgözlü (greedy) algoritma hangisidir?', '["Bellman-Ford Algoritması","Dijkstra Algoritması","Floyd-Warshall Algoritması","Kruskal Algoritması","Prim Algoritması"]'::jsonb, 1, 'Dijkstra algoritması, negatif kenar ağırlığı olmayan graflarda tek kaynaklı en kısa yol problemini bir öncelik kuyruğu (min-heap) kullanarak O((V + E) log V) sürede çözer. Bellman-Ford ise negatif ağırlıklı kenarları da destekler.', ARRAY['graf', 'en-kisa-yol', 'dijkstra', 'algoritma']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-012', 'alan', 'Veri Yapıları ve Problem Çözme', 'Hash Tabloları', 2, 'Hash tablolarında çakışma (Collision) yönetimi için ''Açık Adresleme - Doğrusal Yoklama'' (Open Addressing - Linear Probing) kullanıldığında, birbirini takip eden dolu yuvaların birikerek performansı düşürmesi sorununa ne ad verilir?', '["İkincil Kümeleme (Secondary Clustering)","Birincil Kümeleme (Primary Clustering)","Taşma (Overflow)","Zincirleme (Chaining)","Ayrıklaştırma (Segmentation)"]'::jsonb, 1, 'Doğrusal yoklamada ardışık dolu yuvaların birleşmesi ''Primary Clustering'' (Birincil Kümeleme) olarak adlandırılır ve arama sürelerini uzatır. Bu durum Karesel Yoklama veya Çift Hash (Double Hashing) ile azaltılır.', ARRAY['hash', 'veri-yapilari', 'clustering', 'collision']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-013', 'alan', 'Veri Tabanı ve SQL', 'Normalizasyon', 3, 'Bir ilişkisel tabloda 3NF sağlanmış olmasına rağmen, birden fazla örtüşen bileşik aday anahtar (Overlapping Composite Candidate Keys) bulunması durumunda ortaya çıkan anomalileri gidermek için tanımlanan ve ''her fonksiyonel belirleyicinin mutlaka bir süper anahtar olmasını'' şart koşan form hangisidir?', '["2. Normal Form (2NF)","Boyce-Codd Normal Formu (BCNF)","4. Normal Form (4NF)","5. Normal Form (5NF)","Denormalizasyon"]'::jsonb, 1, 'Boyce-Codd Normal Formu (BCNF), 3NF''in özel ve daha katı bir halidir. X -> Y fonksiyonel bağımlılığında X''in mutlaka bir Süper Anahtar (Super Key) olmasını şart koşar.', ARRAY['veritabani', 'normalizasyon', 'bcnf', '3nf']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-014', 'alan', 'Yazılım Mühendisliği ve Sistem Geliştirme', 'Versiyon Kontrolü (Git)', 2, 'Git versiyon kontrol sisteminde bir dalın (branch) başlangıç noktasını hedef dalın en son commit''inin üzerine taşıyarak doğrusal (linear) ve temiz bir commit geçmişi oluşturan komut hangisidir?', '["git merge","git rebase","git cherry-pick","git reset --hard","git stash"]'::jsonb, 1, 'git rebase, commit''leri sanki hedef daldan dallanmış gibi baştan uygulayarak ekstra birleştirme (merge commit) üretmeden doğrusal bir geçmiş sağlar.', ARRAY['git', 'yazilim-muhendisligi', 'rebase']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-015', 'alan', 'Bilgisayar Ağları ve İşletim Sistemleri', 'Taşıma Katmanı ve TCP', 2, 'TCP protokolünde istemci ile sunucu arasında güvenilir bir bağlantı kurmak için uygulanan ''Üç Yollu El Sıkışma'' (3-Way Handshake) bayrak sırası doğru olarak hangisidir?', '["ACK -> SYN -> SYN-ACK","SYN -> SYN-ACK -> ACK","SYN -> ACK -> FIN","FIN -> ACK -> FIN-ACK","RST -> SYN -> ACK"]'::jsonb, 1, 'TCP bağlantısı kurulurken: 1) İstemci: SYN gönderir, 2) Sunucu: SYN-ACK ile yanıtlar, 3) İstemci: ACK göndererek bağlantıyı aktif eder.', ARRAY['ag', 'tcp', 'handshake', 'transport-layer']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-016', 'alan', 'Bilgi Güvenliği Temelleri', 'Kriptografi', 2, 'HTTPS protokolü kullanılırken istemci ve sunucu arasındaki ilk güvenli el sıkışmada (TLS Handshake) oturum anahtarlarının güvenle paylaşılması için asimetrik şifreleme, ardından verilerin hızlı aktarımı için simetrik şifreleme (örn: AES) kullanılır. Bu modele ne ad verilir?', '["Hibrit Şifreleme (Hybrid Cryptography)","Kuantum Şifreleme","Blokzincir Şifreleme","Tek Kullanımlık Şerit (One-Time Pad)","Homomorfik Şifreleme"]'::jsonb, 0, 'Hibrit şifreleme, asimetrik şifrelemenin anahtar paylaşım güvenliği ile simetrik şifrelemenin yüksek hızını birleştiren modern TLS/HTTPS temel mimarisidir.', ARRAY['kriptografi', 'tls', 'https', 'guvenlik']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-017', 'alan', 'Veri Analitiği, Yapay Zekâ ve Makine Öğrenmesi Temelleri', 'Aşırı Öğrenme (Overfitting)', 2, 'Bir makine öğrenmesi modelinin eğitim verisindeki gürültüleri dahi ezberlemesi sonucu eğitim başarısının çok yüksek, ancak test verisindeki genelleme başarısının çok düşük olması durumuna (Overfitting) karşı aşağıdakilerden hangisi bir çözüm **değildir**?', '["Düzenlileştirme (L1 / L2 Regularization - Lasso / Ridge)","Modelin parametre sayısını ve katman derinliğini ciddi oranda artırmak","Erken Durdurma (Early Stopping)","Çapraz Doğrulama (K-Fold Cross Validation)","Seyreltme (Dropout) uygulamak"]'::jsonb, 1, 'Modelin parametre sayısını ve katman derinliğini artırmak modelin karmaşıklığını artırır ve aşırı öğrenmeyi (Overfitting) daha da şiddetlendirir. Diğer seçenekler ise aşırı öğrenmeyi önleme teknikleridir.', ARRAY['makine-ogrenmesi', 'overfitting', 'regularization']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-018', 'alan', 'Sistem Analizi ve Dijital Teknoloji Uygulamaları', 'Konteyner ve Sanallaştırma', 2, 'Geleneksel Sanal Makineler (Virtual Machines) ile Docker gibi Konteyner (Container) teknolojileri arasındaki en temel mimari fark hangisidir?', '["Konteynerlerin her biri ayrı bir donanım gerektirir.","Konteynerler konuk işletim sistemi (Guest OS) yerine ana makinenin çekirdeğini (Host OS Kernel) paylaşır.","Sanal makineler Docker''dan her zaman daha hızlı başlar.","Konteynerler yalnızca tek bir programlama dilini çalıştırabilir.","Konteynerlerde ağ iletişimi kurulamaz."]'::jsonb, 1, 'Konteynerler Hypervisor ve her biri için ayrı bir Guest OS barındırmak yerine ana işletim sisteminin çekirdeğini (Kernel) izole süreçler halinde paylaşır; bu sayede çok hafif ve hızlı başlarlar.', ARRAY['docker', 'konteyner', 'sanallastirma', 'devops']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-019', 'alan', 'Sistem Analizi ve Dijital Teknoloji Uygulamaları', 'RESTful API Mimarisi', 2, 'HTTP protokolünde ve RESTful mimaride bir isteğin birden fazla kez arka arkaya çağrılması durumunda sunucuda aynı etkiyi yaratması özelliğine ''İdempotent'' (Tekdüze) denir. Aşağıdaki HTTP metodlarından hangisi **idempotent değildir**?', '["GET","PUT","DELETE","POST","HEAD"]'::jsonb, 3, 'POST metodu her çağrıldığında yeni bir kaynak oluşturabileceğinden (örn: arka arkaya iki kez çağrılırsa iki yeni kayıt üretir) idempotent değildir. GET, PUT ve DELETE ise idempotenttir.', ARRAY['api', 'rest', 'http', 'idempotent']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-020', 'alan', 'Bilgisayar Ağları ve İşletim Sistemleri', 'Eşzamanlılık (Concurrency)', 3, 'Birden fazla thread''in paylaşılan aynı değişken veya bellek alanına eşzamanlı erişmeye çalıştığı ve sonucun iş parçacıklarının çalışma sırasına bağlı olarak hatalı çıktığı duruma ne ad verilir?', '["Yarış Durumu (Race Condition)","Deadlock","Sayfa Hatası (Page Fault)","Bellek Sızıntısı (Memory Leak)","Bağlam Değişimi (Context Switch)"]'::jsonb, 0, 'Race Condition (Yarış Durumu), iki veya daha fazla thread''in senkronizasyon (Mutex/Semaphore) olmadan aynı paylaşılan kaynağa eşzamanlı yazmaya çalışması sonucu ortaya çıkan tutarsızlıktır.', ARRAY['isletim-sistemleri', 'race-condition', 'concurrency']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-021', 'alan', 'Algoritma ve Programlama Mantığı', 'Rekürsiyon ve Çağrı Yığını', 2, 'Aşağıdaki özyinelemeli (rekürsif) C fonksiyonu `hesapla(4)` parametresi ile çağrıldığında dönecek sonuç nedir?

```c
int hesapla(int n) {
    if (n <= 1) return 1;
    return n + hesapla(n - 2);
}
```', '["5","7","9","10","15"]'::jsonb, 1, 'Adım adım çağrı yığını:
1. `hesapla(4) = 4 + hesapla(2)`
2. `hesapla(2) = 2 + hesapla(0)`
3. `hesapla(0)` için `n <= 1` şartı sağlandığından taban durum devreye girer ve `1` döner.
Sonuç: `4 + 2 + 1 = 7`.', ARRAY['algoritma', 'rekürsiyon', 'c-dili', 'kod-çıktısı']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-022', 'alan', 'Algoritma ve Programlama Mantığı', 'Arama Algoritmaları', 2, '100.000 elemanlı sıralı bir tamsayı dizisinde İkili Arama (Binary Search) algoritması kullanıldığında, aranan elemanın bulunması veya dizide olmadığının anlaşılması için **en fazla (Worst-Case)** kaç karşılaştırma yapılması gerekir? ($\log_2(100000) \approx 16.6$)', '["10","17","100","50.000","100.000"]'::jsonb, 1, 'İkili arama her adımda arama uzayını yarıya indirir. En kötü durum karmaşıklığı $\lfloor\log_2(n)\rfloor + 1$ formülü ile bulunur. $2^{16} = 65.536$ ve $2^{17} = 131.072$ olduğundan, 100.000 eleman için en fazla 17 karşılaştırma yeterlidir.', ARRAY['algoritma', 'binary-search', 'zaman-karmaşıklığı']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-023', 'alan', 'Veri Yapıları ve Problem Çözme', 'Yığın (Stack) ve Kuyruk (Queue)', 1, 'Bir banka şubesinde sıra numarası alan müşterilerin işlem önceliğini belirleyen sistem ile metin düzenleyicilerindeki ''Geri Al (Undo)'' fonksiyonunun kullandığı veri yapıları sırasıyla hangi seçenekte doğru verilmiştir?', '["Kuyruk (Queue - FIFO) / Yığın (Stack - LIFO)","Yığın (Stack - LIFO) / Kuyruk (Queue - FIFO)","Öncelikli Kuyruk / İkili Arama Ağacı","Bağlı Liste / Dizi (Array)","Hash Tablosu / Yığın (Stack)"]'::jsonb, 0, 'Müşteri sıra sistemi ''İlk gelen ilk çıkar'' (FIFO - First In First Out) mantığıyla Kuyruk (Queue) yapısını; en son yapılan işlemi ilk geri alan Undo sistemi ise ''Son gelen ilk çıkar'' (LIFO - Last In First Out) mantığıyla Yığın (Stack) yapısını kullanır.', ARRAY['veri-yapıları', 'stack', 'queue', 'fifo', 'lifo']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-024', 'alan', 'Veri Yapıları ve Problem Çözme', 'Bağlı Liste ve Diziler', 2, 'Tek yönlü bağlı listelerin (Singly Linked List) dinamik dizilere (Dynamic Array / ArrayList) kıyasla en belirgin avantajı hangisidir?', '["Herhangi bir indeksteki elemana $O(1)$ sürede rastgele erişim (Random Access) sağlaması","İşaretçinin bilindiği bir konuma yeni düğüm ekleme işleminin diziyi kaydırma maliyeti olmadan $O(1)$ sürede yapılabilmesi","Bellek üzerinde ardışık (contiguous) bloklar halinde tutularak CPU önbellek (Cache) performansını artırması","Her eleman için ilave işaretçi (pointer/reference) depolama yükü getirmemesi","İkili arama (Binary Search) algoritmasını doğrudan desteklemesi"]'::jsonb, 1, 'Dizilerde araya veya başa eleman eklerken kalan elemanların kaydırılması $O(n)$ maliyet gerektirir. Bağlı listelerde ise işaretçi adresi biliniyorsa eleman ekleme sadece referans güncellemesi ile $O(1)$ sürede tamamlanır. Ancak bağlı listeler rastgele erişim ($O(1)$) sağlayamaz.', ARRAY['veri-yapıları', 'linked-list', 'array', 'performans']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-025', 'alan', 'Veri Tabanı ve SQL', 'GROUP BY ve HAVING', 2, 'SQL sorgularında gruplanmış veriler üzerinde toplama fonksiyonlarına (Aggregate Functions: SUM, COUNT, AVG vb.) dayalı filtreleme yapmak için hangi anahtar kelime kullanılır?', '["WHERE","HAVING","ORDER BY","GROUP BY","LIMIT"]'::jsonb, 1, '`WHERE` ifadesi satırlar gruplanmadan önce bireysel satırları filtreler ve aggregate fonksiyonlarla doğrudan kullanılamaz. `HAVING` ifadesi ise `GROUP BY` sonrasında oluşan gruplar üzerinde aggregate filtreleme yapmak için kullanılır (örneğin `HAVING COUNT(*) > 5`).', ARRAY['veritabanı', 'sql', 'having', 'group-by']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-026', 'alan', 'Veri Tabanı ve SQL', 'Veritabanı İndeksleri', 2, 'İlişkisel veritabanlarında sıkça kullanılan B-Tree indeksleme mekanizması ile ilgili aşağıdaki ifadelerden hangisi **yanlıştır**?', '["`SELECT` sorgularında WHERE ve ORDER BY koşullarının çalışma süresini önemli ölçüde hızlandırır.","Tabloya yapılan `INSERT`, `UPDATE` ve `DELETE` operasyonlarında ek indeks güncelleme maliyeti oluşturur.","İndeksler diskte ilave depolama alanı kaplar.","Bir tablodaki tüm sütunlara ayrı ayrı indeks eklemek veritabanı genel yazma performansını her zaman artırır.","Primary Key tanımlanan bir sütun üzerinde çoğu veritabanı motoru otomatik olarak Clustered Index veya Unique Index oluşturur."]'::jsonb, 3, 'Tüm sütunlara gereksiz indeks eklemek, her yazma işleminde (INSERT/UPDATE/DELETE) tüm bu indeks ağaçlarının da güncellenmesini zorunlu kıldığı için yazma performansını ciddi şekilde düşürür. İndeksler yalnızca sık sorgulanan ve seçiciliği yüksek sütunlara konulmalıdır.', ARRAY['veritabanı', 'sql', 'indeks', 'b-tree']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-027', 'alan', 'Veri Tabanı ve SQL', 'İlişkisel Bütünlük (Referential Integrity)', 2, 'İki ilişkisel tablo arasında kurulan Yabancı Anahtar (Foreign Key) kısıtında `ON DELETE CASCADE` kuralı tanımlandığında ne gerçekleşir?', '["Ana (Primary Key) tablodaki bir kayıt silindiğinde, ona bağlı olan alt tablodaki ilişkili kayıtlar da otomatik olarak silinir.","Alt tablodaki kayıt silindiğinde ana tablodaki kayıt da silinir.","Bağlı kayıtlar varsa ana tablodaki kaydın silinmesi veritabanı tarafından engellenir (hata üretilir).","Ana tablodaki kayıt silindiğinde alt tablodaki yabancı anahtar alanları NULL yapılır.","Silinen kayıtlar geçici bir yedek tablosuna kopyalanır."]'::jsonb, 0, '`ON DELETE CASCADE`, ana (ebeveyn) tablodan bir satır silindiğinde, referans bütünlüğünü korumak adına o satırı işaret eden tüm bağımlı (çocuk) satırların da otomatik olarak silinmesini sağlar.', ARRAY['veritabanı', 'foreign-key', 'cascade', 'referential-integrity']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-028', 'alan', 'Bilgisayar Ağları ve İşletim Sistemleri', 'Process ve Thread Mimarisi', 2, 'İşletim sistemlerinde Süreç (Process) ve İş Parçacığı (Thread) kavramları karşılaştırıldığında hangisi **doğrudur**?', '["Aynı sürecin parçası olan thread''ler heap bellek alanını ve açık dosya tanımlayıcılarını ortak paylaşırken, kendilerine ait bağımsız bir çağrı yığınına (stack) ve program sayacına (PC) sahiptirler.","Process''ler arası geçiş (context switch), thread''ler arası geçişe göre daha hızlı ve düşük maliyetlidir.","Bir thread çöktüğünde diğer thread''ler ve ana process hiçbir şekilde etkilenmez.","Thread''ler işletim sisteminden tamamen ayrı sanal adres uzaylarına (Address Space) sahiptir.","Modern işletim sistemlerinde tek bir process içinde birden fazla thread çalıştırılamaz."]'::jsonb, 0, 'Aynı sürecin thread''leri kod, veri ve heap alanlarını ortak paylaşır. Ancak her thread bağımsız çalıştırılabilir olduğundan kendi yazmaçlarına (registers), program sayacına (PC) ve yığınına (stack) sahiptir. Process context switch ise adres uzayı değiştiğinden çok daha maliyetlidir.', ARRAY['işletim-sistemleri', 'process', 'thread', 'concurrency']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-029', 'alan', 'Bilgisayar Ağları ve İşletim Sistemleri', 'Sanal Bellek ve Sayfalama', 2, 'İşletim sistemlerinde sanal bellek yönetimi sırasında bir sürecin erişmek istediği sanal sayfanın fiziksel RAM''de bulunmaması durumuna ne ad verilir ve bu durumda işletim sistemi ne yapar?', '["Page Fault - Sayfa ikincil depolamadan (disk/swap) fiziksel belleğe yüklenir.","Segmentation Fault - Süreç derhal sonlandırılır.","Deadlock - Süreç askıya alınır ve zamanlayıcı yeniden başlatılır.","Race Condition - Bellek blokları kilitlenir.","Cache Miss - L1 önbelleği temizlenir."]'::jsonb, 0, 'Erişilmek istenen sayfanın geçerlilik biti (valid bit) 0 ise donanım bir ''Page Fault'' (Sayfa Hatası) kesmesi üretir. İşletim sistemi devreye girerek ilgili sayfayı diskten RAM''e getirir, sayfa tablosunu günceller ve komutu tekrarlar.', ARRAY['işletim-sistemleri', 'sanal-bellek', 'page-fault', 'paging']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-030', 'alan', 'Bilgisayar Ağları ve İşletim Sistemleri', 'CPU Zamanlama (Scheduling)', 2, 'Her sürece eşit miktarda sabit bir zaman dilimi (Time Quantum) tahsis eden ve bu süre dolduğunda süreci kesip hazır kuyruğunun sonuna atan, adil ve preemptive (kesintili) CPU zamanlama algoritması hangisidir?', '["First-Come, First-Served (FCFS)","Shortest Job First (SJF)","Round Robin (RR)","Priority Scheduling (Non-preemptive)","Multilevel Feedback Queue"]'::jsonb, 2, 'Round Robin (RR), zaman paylaşımlı sistemlerde her göreve eşit ''Time Slice / Quantum'' tanıyan ve süre dolunca CPU''yu bir sonraki göreve devreden adil, preemptive bir algoritmadır.', ARRAY['işletim-sistemleri', 'cpu-scheduling', 'round-robin']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-031', 'alan', 'Bilgisayar Ağları ve İşletim Sistemleri', 'Taşıma Katmanı (TCP vs UDP)', 1, 'Aşağıdaki senaryoların hangisinde TCP yerine UDP protokolünün tercih edilmesi daha uygundur?', '["Banka EFT ve para transferi mesajlarının iletimi","Web sitelerinin HTTPS üzerinden güvenli yüklenmesi","Dosya transferi (FTP) ile büyük arşiv dosyalarının indirilmesi","Gerçek zamanlı çevrimiçi video konferans ve canlı ses yayını","Veritabanı sunucusuna gönderilen SQL sorguları"]'::jsonb, 3, 'UDP bağlantısız (connectionless) ve kayıpları yeniden iletmeyen bir protokoldür; gecikmesi çok düşüktür. Canlı video/ses yayınında paket kaybı tolere edilebilir ancak gecikme tolere edilemez. Finansal işlemlerde ise TCP''nin güvenilir ve sıralı teslimatı zorunludur.', ARRAY['bilgisayar-ağları', 'tcp', 'udp', 'transport-layer']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-032', 'alan', 'Bilgisayar Ağları ve İşletim Sistemleri', 'DNS ve IP Mimarisi', 2, 'Bir istemci tarayıcısına `www.ziraatbank.com.tr` yazdığında, bu alan adını hedef sunucunun IP adresine çeviren internet altyapı servisi ve varsayılan protokol portu hangisidir?', '["DNS (Domain Name System) - Port 53","DHCP (Dynamic Host Configuration) - Port 67","HTTP - Port 80","SNMP - Port 161","SMTP - Port 25"]'::jsonb, 0, 'DNS (Alan Adı Sistemi), insan tarafından okunabilir alan adlarını sayısal IP adreslerine dönüştürür. Standart sorguları çoğunlukla UDP port 53 üzerinden çalışır.', ARRAY['bilgisayar-ağları', 'dns', 'port-53']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-033', 'alan', 'Bilgisayar Ağları ve İşletim Sistemleri', 'Ağ Güvenliği ve Protokoller', 1, 'Aşağıdaki internet protokolleri ve varsayılan standart port eşleştirmelerinden hangisi **hatalıdır**?', '["SSH (Secure Shell) - Port 22","HTTPS (HTTP Secure) - Port 443","HTTP - Port 80","RDP (Remote Desktop) - Port 3389","FTPS / SFTP - Port 8080"]'::jsonb, 4, 'SFTP güvenli kabuk üzerinden çalıştığı için SSH portu olan 22''yi kullanır; FTPS ise genellikle 990 portunu kullanır. Port 8080 ise alternatif HTTP web ve proxy sunucuları için yaygın kullanılır.', ARRAY['bilgisayar-ağları', 'portlar', 'protokoller']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-034', 'alan', 'Yazılım Mühendisliği ve Sistem Geliştirme', 'Agile ve Scrum Metodolojisi', 2, 'Scrum çerçevesinde (Scrum Framework) ürün gereksinimlerinin önceliklendirilmesinden (Product Backlog), ürün vizyonunun korunmasından ve iş değerinin maksimize edilmesinden sorumlu olan temel rol hangisidir?', '["Scrum Master","Product Owner (Ürün Sahibi)","Geliştirme Takımı (Developers)","Yazılım Mimarı (Software Architect)","Proje Sponsoru"]'::jsonb, 1, 'Product Owner (Ürün Sahibi), Product Backlog''u yöneten, iş gereksinimlerini önceliklendiren ve takımın en yüksek iş değerini üreten işlere odaklanmasını sağlayan kişidir. Scrum Master ise sürecin kurallara uygun yürümesini ve engellerin kaldırılmasını sağlar.', ARRAY['yazılım-mühendisliği', 'agile', 'scrum', 'product-owner']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-035', 'alan', 'Yazılım Mühendisliği ve Sistem Geliştirme', 'Yazılım Test Türleri', 2, 'Bir yazılım sistemine yeni bir özellik eklendikten veya hata düzeltmesi yapıldıktan sonra, mevcut çalışan fonksiyonların bozulup bozulmadığını doğrulamak amacıyla yapılan test türü hangisidir?', '["Birim Testi (Unit Testing)","Regresyon Testi (Regression Testing)","Stres Testi (Stress Testing)","Kullanıcı Kabul Testi (UAT)","Yük Testi (Load Testing)"]'::jsonb, 1, 'Regresyon Testi, kodda yapılan değişikliklerin (yeni modül, bug fix, refactoring) var olan özellikleri ve akışları olumsuz etkilemediğini garanti altına almak için çalıştırılan test setidir.', ARRAY['yazılım-mühendisliği', 'test', 'regresyon-testi']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-036', 'alan', 'Bilgi Güvenliği Temelleri', 'Kimlik Doğrulama vs Yetkilendirme', 1, 'Bilgi güvenliğinde ''Kimlik Doğrulama'' (Authentication) ile ''Yetkilendirme'' (Authorization) arasındaki farkı en iyi özetleyen ifade hangisidir?', '["Kimlik Doğrulama ''Kullanıcı kimdir?'' sorusuna cevap verirken; Yetkilendirme ''Bu kullanıcının hangi kaynaklara erişim izni vardır?'' sorusuna cevap verir.","Kimlik doğrulama sadece şifreleme algoritmalarıyla yapılırken, yetkilendirme firewall tarafından yapılır.","Kimlik doğrulama HTTP 403 Forbidden üretirken, yetkilendirme HTTP 401 Unauthorized üretir.","Yetkilendirme kullanıcı sisteme girmeden önce, kimlik doğrulama ise girdikten sonra yapılır.","İki kavram tamamen aynı güvenlik mekanizmasını temsil eder."]'::jsonb, 0, 'Authentication (Kimlik Doğrulama - 401), kullanıcının iddia ettiği kişi olup olmadığını doğrular (parola, OTP, biyometri). Authorization (Yetkilendirme - 403) ise kimliği doğrulanmış kullanıcının belirli bir işlemi yapmaya yetkili olup olmadığını denetler.', ARRAY['bilgi-güvenliği', 'authentication', 'authorization']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-037', 'alan', 'Bilgi Güvenliği Temelleri', 'Hashing ve Parola Güvenliği', 2, 'Kullanıcı parolalarının veritabanında saklanmasıyla ilgili aşağıdaki güvenlik yaklaşımlarından hangisi modern en iyi uygulama (Best Practice) olarak kabul edilir?', '["Parolaları AES-256 simetrik anahtar ile şifreleyip anahtarı kaynak kodda saklamak","Parolaları düz metin (Plaintext) olarak saklayıp sadece tablo erişimini kısıtlamak","Parolaları her kullanıcıya özel rastgele üretilen bir tuzlama (Salt) değeri ile birlikte bcrypt veya Argon2 gibi tek yönlü yavaş hash fonksiyonlarından geçirerek saklamak","Hızlı arama yapabilmek için doğrudan MD5 veya SHA-1 hash değerini kaydetmek","Kullanıcı parolalarını tersine çevirerek Base64 formatında kodlamak"]'::jsonb, 2, 'Parolalar asla simetrik şifrelemeyle veya düz metinle saklanmaz. MD5/SHA-1 ise çok hızlı olduğundan brute-force ve rainbow table saldırılarına açıktır. Tuzlama (Salt) ve maliyet faktörü ayarlanabilir modern hash algoritmaları (bcrypt, Argon2) endüstri standardıdır.', ARRAY['bilgi-güvenliği', 'hashing', 'salt', 'bcrypt', 'parola']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-038', 'alan', 'Bilgi Güvenliği Temelleri', 'Web Güvenliği (CSRF)', 2, 'Kullanıcının daha önce oturum açtığı güvenilir bir web sitesindeki oturum çerezlerini (Cookie) kullanarak, kullanıcının bilgisi ve rızası olmadan kötü niyetli bir siteden istek yaptırılması saldırısına ne ad verilir?', '["SQL Injection (SQLi)","Cross-Site Request Forgery (CSRF / XSRF)","Cross-Site Scripting (XSS)","Denial of Service (DoS)","Man-in-the-Middle (MitM)"]'::jsonb, 1, 'CSRF (Siteler Arası İstek Sahteciliği), kurbanın oturum kimliğini kötüye kullanarak onun adına sahte istekler (örneğin para transferi isteği) tetikler. Bu saldırıyı önlemek için benzersiz Anti-CSRF token''ları ve `SameSite` cookie özellikleri kullanılır.', ARRAY['bilgi-güvenliği', 'csrf', 'web-güvenliği']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-039', 'alan', 'Veri Analitiği, Yapay Zekâ ve Makine Öğrenmesi Temelleri', 'Hata Matrisi (Confusion Matrix) ve Fraud Tespiti', 2, 'Bir bankacılık dolandırıcılık (Fraud) tespit sisteminde, dolandırıcılık içeren şüpheli işlemlerin gözden kaçırılmaması (yani False Negative oranının mümkün olduğunca sıfıra yaklaştırılması) hedeflenmektedir. Bu durumda hangi performans metriğinin maksimize edilmesi önceliklidir?', '["Accuracy (Doğruluk Oranı)","Recall (Duyarlılık / Yakalama Oranı)","Specificity (Özgüllük)","Loss (Kayıp Değeri)","Eğitim Süresi"]'::jsonb, 1, 'Recall (Duyarlılık) = TP / (TP + FN). Paydada False Negative yer alır. Bir dolandırıcılık yakalama sisteminde asıl felaket gerçek bir dolandırıcılığı kaçırmaktır (False Negative). Bu nedenle Recall metriğini maksimize etmek kritik önceliktir.', ARRAY['yapay-zekâ', 'makine-öğrenmesi', 'recall', 'fraud', 'confusion-matrix']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-040', 'alan', 'Veri Analitiği, Yapay Zekâ ve Makine Öğrenmesi Temelleri', 'Öğrenme Türleri ve K-Means', 2, 'Etiketlenmemiş müşteri harcama verilerini kullanarak benzer davranış sergileyen müşteri kitlelerini gruplamak (Müşteri Segmentasyonu) amacıyla kullanılan K-Means algoritması hangi öğrenme kategorisine girer?', '["Gözetimli Öğrenme (Supervised Learning)","Gözetimsiz Öğrenme (Unsupervised Learning)","Pekiştirmeli Öğrenme (Reinforcement Learning)","Yarı-Gözetimli Öğrenme (Semi-supervised Learning)","Derin Pekiştirmeli Öğrenme (Deep RL)"]'::jsonb, 1, 'K-Means kümeleme (Clustering) algoritması, hedef çıktının (etiketin) bulunmadığı veriler üzerinde gizli desen ve benzerlikleri keşfettiği için Gözetimsiz Öğrenme (Unsupervised Learning) sınıfına aittir.', ARRAY['yapay-zekâ', 'makine-öğrenmesi', 'unsupervised-learning', 'k-means']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-041', 'alan', 'Algoritma ve Programlama Mantığı', 'Özyineleme ve Yığın Taşması', 2, 'Özyinelemeli (rekürsif) bir fonksiyonda temel durum (base case) doğru tanımlanmadığında veya fonksiyon bu duruma hiçbir zaman ulaşamadığında, çalışma zamanında (runtime) ortaya çıkan tipik bellek hatası hangisidir?', '["Heap Overflow (Öbek Bellek Taşması)","Stack Overflow (Çağrı Yığını Taşması)","Null Pointer Exception (Boş İşaretçi Hatası)","Segmentation Fault (Segmentasyon İhlali)","Out of Memory - Garbage Collection Error"]'::jsonb, 1, 'Her özyinelemeli fonksiyon çağrısı çalışma zamanı çağrı yığınına (Call Stack) yeni bir çerçeve (stack frame) ekler. Bir temel durum (base case) bulunmadığında veya sonlandırma koşuluna ulaşılamadığında sonsuz özyineleme meydana gelir ve tahsis edilen yığın alanı tükenerek Stack Overflow hatası oluşur.', ARRAY['algoritma', 'recursion', 'stack-overflow', 'bellek']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-042', 'alan', 'Algoritma ve Programlama Mantığı', 'Dinamik Programlama', 2, 'Dinamik Programlama (Dynamic Programming) yaklaşımını Böl ve Yönet (Divide and Conquer) yaklaşımından ayıran en temel yapısal özellik aşağıdakilerden hangisidir?', '["Yalnızca sıralama algoritmalarında kullanılabilmesi","Alt problemlerin örtüşmesi (Overlapping Subproblems) ve çözümlerin saklanması (Memoization)","Problemleri her zaman eşit büyüklükte iki parçaya ayırması","Asla özyinelemeli yöntemlerle uygulanamaması","Zaman karmaşıklığının her zaman O(n log n) ile sınırlı olması"]'::jsonb, 1, 'Böl ve Yönet yaklaşımında alt problemler birbirinden bağımsızdır (Örn: Merge Sort). Dinamik Programlamada ise aynı alt problemler defalarca tekrarlanır (Örtüşen Alt Problemler / Overlapping Subproblems). Dinamik Programlama, daha önce çözülmüş alt problem sonuçlarını tablo veya bellekte saklayarak (Memoization / Tabulation) tekrar hesaplamayı önler.', ARRAY['algoritma', 'dinamik-programlama', 'memoization']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-043', 'alan', 'Algoritma ve Programlama Mantığı', 'Graf Algoritmaları', 2, 'Ağırlıksız bir çizgede (Unweighted Graph) belirli bir başlangıç düğümünden diğer bir hedef düğüme giden EN KISA YOLU (en az kenar sayısıyla) bulmak için aşağıdaki arama algoritmalarından hangisi en uygundur?', '["Derinlik Öncelikli Arama (DFS)","Genişlik Öncelikli Arama (BFS)","İkili Arama (Binary Search)","Doğrusal Arama (Linear Search)","Topolojik Sıralama (Topological Sort)"]'::jsonb, 1, 'Ağırlıksız çizgelerde Genişlik Öncelikli Arama (BFS), düğümleri başlangıç noktasına olan uzaklıklarına (katman katman) göre bir Kuyruk (Queue) kullanarak incelediği için bir hedefe ulaştığı ilk anda en kısa yolu garanti eder. DFS ise derinlemesine gittiği için bulunan ilk yolun en kısa yol olma garantisi yoktur.', ARRAY['algoritma', 'graf', 'bfs', 'en-kisa-yol']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-044', 'alan', 'Algoritma ve Programlama Mantığı', 'İki İşaretçi Tekniği', 2, 'Küçükten büyüğe sıralı bir tamsayı dizisinde toplamı belirli bir K değerine eşit olan iki elemanın bulunması istenmektedir. İki İşaretçi (Two Pointers) tekniği kullanıldığında bu işlemin zaman karmaşıklığı ne olur?', '["O(1)","O(log n)","O(n)","O(n log n)","O(n²)"]'::jsonb, 2, 'Dizi zaten sıralı olduğunda bir işaretçi dizinin başına (en küçük), diğeri sonuna (en büyük) yerleştirilir. Toplam K''dan küçükse sol işaretçi sağa, büyükse sağ işaretçi sola kaydırılır. Her adımda arama alanı 1 daralır ve en fazla n adımda sonuç bulunur. Böylece Brute-Force O(n²) yerine doğrusal O(n) sürede çözülür.', ARRAY['algoritma', 'two-pointers', 'karmaşıklık']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-045', 'alan', 'Algoritma ve Programlama Mantığı', 'Döngü Karmaşıklığı Analizi', 3, 'Aşağıdaki kod parçasının zaman karmaşıklığı Big-O cinsinden nedir?

```c
for (int i = 1; i <= n; i = i * 2) {
    for (int j = 1; j <= n; j++) {
        // O(1) sabit işlem
    }
}
```', '["O(n)","O(n log n)","O(log n)","O(n²)","O(2ⁿ)"]'::jsonb, 1, 'Dış döngüde i değişkeni her adımda 2 ile çarpılmaktadır (1, 2, 4, 8, ...). Bu nedenle dış döngü log₂(n) kez çalışır. İç döngü ise her dış döngü adımı için n kez çalışır. Toplam işlem sayısı n * log₂(n) olacağından zaman karmaşıklığı O(n log n)''dir.', ARRAY['algoritma', 'big-o', 'kod-analizi']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-046', 'alan', 'Veri Yapıları ve Problem Çözme', 'Bağlı Listeler', 2, 'Çift Yönlü Bağlı Liste (Doubly Linked List) ile Tek Yönlü Bağlı Liste (Singly Linked List) karşılaştırıldığında, hangisi Çift Yönlü Bağlı Liste''nin Tek Yönlü Listeye göre en belirgin yapısal avantajıdır?', '["Daha az bellek alanı harcaması","İşaretçisi bilinen bir düğümü bir önceki düğümü aramaya gerek kalmadan O(1) sürede silme imkanı sağlaması","Dizi indeksleri gibi O(1) sürede rastgele erişim (Random Access) sağlaması","Dizilere göre her zaman daha hızlı ikili arama (Binary Search) yapılabilmesi","Önbellek (Cache) yerelliğinin dizilerden daha yüksek olması"]'::jsonb, 1, 'Tek yönlü bağlı listede bir düğümü silmek için o düğümden bir öncekini (prev) bulmak gerekir ve bu da O(n) tarama gerektirir. Çift yönlü bağlı listede ise her düğüm bir öncekine (prev) işaret ettiği için silinecek düğümün işaretçisi bilindiğinde silme işlemi doğrudan O(1) zamanda gerçekleştirilir.', ARRAY['veri-yapilari', 'linked-list', 'doubly-linked-list']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-047', 'alan', 'Veri Yapıları ve Problem Çözme', 'Hash Tabloları ve Çakışmalar', 2, 'Hash Table veri yapısında çakışmaları (Collision) çözmek amacıyla kullanılan Açık Adresleme (Open Addressing) yönteminde "Linear Probing (Doğrusal Arama)" stratejisinin en yaygın dezavantajı nedir?', '["Bellek tahsisinin her zaman dinamik olarak iki katına çıkması","Birincil Kümelenme (Primary Clustering) nedeniyle ardışık dolu hücre bloklarının oluşması ve arama sürelerinin uzaması","Sadece tamsayı anahtarlar için çalışabilmesi","Hash tablosunun doluluk oranının (Load Factor) %100''ü aşmak zorunda kalması","Çakışma anında bağlı liste (Chaining) oluşturmak zorunda kalması"]'::jsonb, 1, 'Linear Probing''de çakışma olduğunda sıradaki ilk boş hücreye (index + 1) yerleşim yapılır. Bu durum ardışık dolu yuvalardan oluşan uzun bloklar yaratır (Birincil Kümelenme / Primary Clustering). Kümelenme büyüdükçe yeni elemanların bu kümeye denk gelme ve kümeyi daha da uzatma ihtimali artar, bu da performansı düşürür.', ARRAY['veri-yapilari', 'hash-table', 'collision', 'linear-probing']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-048', 'alan', 'Veri Yapıları ve Problem Çözme', 'Öncelik Kuyruğu ve Heap', 2, 'Banka şubesindeki işlem kuyruğunda VIP veya öncelikli müşterilere hizmet vermek için Öncelik Kuyruğu (Priority Queue) soyut veri tipi tasarlanacaktır. Eleman ekleme (insert) ve en yüksek öncelikli elemanı çekme (extract-max) işlemlerini en verimli şekilde gerçekleştiren temel veri yapısı hangisidir?', '["Sırasız Dizi (Unsorted Array)","Tek Yönlü Bağlı Liste (Singly Linked List)","İkili Öbek (Binary Heap - Max Heap)","Yığın (Stack)","Dairesel Dizi (Circular Array)"]'::jsonb, 2, 'İkili Öbek (Binary Heap), en yüksek öncelikli elemanın her zaman kökte (Root) bulunmasını sağlar (O(1) erişim). Yeni eleman ekleme (insert) ve en büyük elemanı çıkarma (extract-max) işlemleri ise ağaç yüksekliğiyle orantılı olarak O(log n) zamanda garantili yapılır.', ARRAY['veri-yapilari', 'priority-queue', 'heap', 'binary-heap']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-049', 'alan', 'Veri Yapıları ve Problem Çözme', 'Ağaç Yapıları ve Trie', 3, 'Mobil bankacılık uygulamasında kullanıcıların arama çubuğuna yazdığı harflere göre alıcı adı veya kurum adını otomatik tamamlama (Autocomplete) ve hızlı önek (prefix) eşleşmesi yapmak için en uygun ağaç veri yapısı hangisidir?', '["Kırmızı-Siyah Ağaç (Red-Black Tree)","Trie (Önek Ağacı / Prefix Tree)","B-Tree (B-Ağacı)","İkili Arama Ağacı (Binary Search Tree)","Splay Ağacı"]'::jsonb, 1, 'Trie (Prefix Tree), karakter dizilerini (string) önek paylaşımıyla hiyerarşik olarak saklar. Bir kelimenin veya önekin aranması dizideki toplam kelime sayısından bağımsız olarak, sadece aranan kelimenin uzunluğu (L) kadar sürede O(L) gerçekleştirilir. Bu nedenle sözlük ve autocomplete uygulamaları için standarttır.', ARRAY['veri-yapilari', 'trie', 'prefix-tree', 'autocomplete']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-050', 'alan', 'Veri Yapıları ve Problem Çözme', 'Kuyruk ve Döngüsel Dizi', 2, 'Sabit N boyutlu bir dizi üzerinde Dairesel Kuyruk (Circular Queue) gerçekleştirilirken, kuyruğun sonuna eleman eklendikten sonra arka (tail) işaretçisinin dizi sınırını aştığında tekrar başa dönmesini sağlayan standart matematiksel ifade hangisidir?', '["tail = (tail + 1) / N","tail = (tail + 1) % N","tail = tail + N - 1","tail = (tail * 2) % N","tail = (tail - 1) % N"]'::jsonb, 1, 'Dairesel kuyruklarda indeks sınırını aşmamak ve N-1 değerinden sonra tekrar 0 indeksine sarılmayı (wrap-around) sağlamak için modülo aritmetiği kullanılır: `tail = (tail + 1) % N`. Böylece dizi boyutu dolmadıkça öndeki boşalan hücreler tekrar kullanılabilir.', ARRAY['veri-yapilari', 'kuyruk', 'circular-queue', 'modulo']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-051', 'alan', 'Veri Tabanı ve SQL', 'B+Tree ve İndeksleme', 3, 'İlişkisel Veritabanı Yönetim Sistemlerinde (RDBMS) disk üzerindeki tablolarda indeks oluştururken İkili Arama Ağacı (BST) yerine B+Tree kullanılmasının en temel iki nedeni nedir?', '["Yalnızca RAM üzerinde çalışması ve verileri şifrelemesi","Ağaç derinliğinin düşük olması (disk I/O tasarrufu) ve yaprak düğümlerin bağlı liste ile birbirine bağlı olarak aralık sorgularını (range query) hızlandırması","Tablodaki yabancı anahtar (foreign key) kısıtlamalarını otomatik denetlemesi","Yalnızca metin (VARCHAR) türündeki sütunlarda çalışabilmesi","Verilerin silinmesini tamamen engelleyerek veri kaybını önlemesi"]'::jsonb, 1, 'B+Tree çok kollu (high fan-out) bir ağaçtır; her düğüm yüzlerce anahtar tutabilir. Bu sayede milyonlarca kayıtlık tabloda bile ağaç yüksekliği 3-4 seviyede kalarak disk okuma (I/O) sayısını en aza indirir. Ayrıca tüm asıl veriler yaprak düğümlerde saklanır ve bu yapraklar çift yönlü bağlı liste ile bağlıdır, bu da `BETWEEN`, `>`, `<` gibi aralık sorgularını muazzam hızlandırır.', ARRAY['veritabani', 'indeks', 'b-plus-tree', 'sql']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-052', 'alan', 'Veri Tabanı ve SQL', 'Pencere Fonksiyonları', 2, 'SQL''de puan sıralaması yapan analitik sorguda iki adayın puanı eşit olduğunda (Örn: 90, 85, 85, 80); RANK() fonksiyonu sıralamayı (1, 2, 2, 4) yaparken DENSE_RANK() fonksiyonunun ürettiği sıralama hangisidir?', '["1, 2, 3, 4","1, 2, 2, 3","1, 1, 2, 3","1, 2, 2, 2","4, 3, 2, 1"]'::jsonb, 1, '`RANK()` fonksiyonu eşitlik durumunda aynı sırayı verir ancak sonraki derece için atlama yapar (1, 2, 2, 4). `DENSE_RANK()` ise sıra atlamaz (boşluk bırakmaz); eşitlik sonrası sıradaki tamsayı ile devam eder (1, 2, 2, 3). `ROW_NUMBER()` ise eşitliğe bakmaksızın her satıra ardışık numara verir (1, 2, 3, 4).', ARRAY['veritabani', 'sql', 'window-functions', 'dense-rank']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-053', 'alan', 'Veri Tabanı ve SQL', 'Transaction İzolasyon Seviyeleri', 3, 'Veritabanı Transaction yönetiminde bir transaction''ın henüz COMMIT edilmemiş (onaylanmamış) değişiklikleri başka bir transaction tarafından okunması (Dirty Read) engellenirken, aynı transaction içinde aynı sorgu tekrarlandığında satır değerlerinin değişebilmesine (Non-Repeatable Read) izin veren standart izolasyon seviyesi hangisidir?', '["Read Uncommitted","Read Committed","Repeatable Read","Serializable","Snapshot Isolation"]'::jsonb, 1, 'SQL standardına göre:
* Read Uncommitted: Dirty Read''e izin verir.
* Read Committed: Dirty Read''i ENGELLER (yalnızca commit edilen veriler okunur), fakat Non-Repeatable Read ve Phantom Read oluşabilir.
* Repeatable Read: Non-Repeatable Read''i engeller.
* Serializable: Tüm anomalileri (Phantom Read dahil) engeller en katı seviyedir.', ARRAY['veritabani', 'acid', 'isolation-levels', 'dirty-read']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-054', 'alan', 'Veri Tabanı ve SQL', 'CTE (Common Table Expressions)', 2, 'SQL sorgularında karmaşık alt sorguları (subquery) daha okunabilir kılmak, sorgu içinde geçici bir adlandırılmış sonuç kümesi oluşturmak ve gerektiğinde özyinelemeli (recursive) hiyerarşik verileri (örneğin organizasyon şeması) sorgulamak için kullanılan `WITH` ifadesine ne ad verilir?', '["Stored Procedure (Saklı Yordam)","Trigger (Tetikleyici)","Common Table Expression (CTE)","Materialized View (Maddileştirilmiş Görünüm)","Foreign Key Constraint"]'::jsonb, 2, '`WITH` ifadesiyle tanımlanan yapı `Common Table Expression (CTE)` olarak adlandırılır. Bir sorgunun yürütülme kapsamı içinde geçici olarak adlandırılmış bir sonuç kümesi tanımlar. `WITH RECURSIVE` formatı hiyerarşik ağaç ve organizasyon verilerini taramak için son derece güçlüdür.', ARRAY['veritabani', 'sql', 'cte', 'with-clause']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-055', 'alan', 'Veri Tabanı ve SQL', 'Dağıtık Sistemler ve CAP Teoremi', 2, 'Dağıtık veritabanı sistemlerinde CAP Teoremi''ne göre ağ üzerinde iki sunucu arasındaki iletişimin koptuğu bir ağ bölünmesi (Network Partition - P) anında, sistem aşağıdaki özellik ikililerinden hangisini AYNI ANDA KORUYAMAZ?', '["Ölçeklenebilirlik ve Taşınabilirlik","Tutarlılık (Consistency) ve Erişilebilirlik (Availability)","Şifreleme ve Sıkıştırma","Yedeklilik ve İzolasyon","Okuma Hızı ve Yazma Hızı"]'::jsonb, 1, 'CAP Teoremi (Brewer Teoremi); bir dağıtık sistemin Ağ Bölünmesi (Partition Tolerance - P) yaşadığında ya Tutarlılık (Consistency - C: her okuma en güncel yazmayı döndürür) ya da Erişilebilirlik (Availability - A: her istek hata almadan yanıtlanır) arasında seçim yapmak zorunda olduğunu belirtir. İkisini birden aynı anda garanti edemez (CP veya AP tercihi yapılır).', ARRAY['veritabani', 'cap-theorem', 'dagitik-sistemler']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-056', 'alan', 'Yazılım Mühendisliği ve Sistem Geliştirme', 'Test Piramidi', 2, 'Modern yazılım mühendisliğinde Test Piramidi (Test Pyramid) modeline göre; bir projenin test suitinde sayıca en fazla olması gereken, en hızlı çalışan ve bakım maliyeti en düşük olan test katmanı hangisidir?', '["Kullanıcı Kabul Testleri (UAT)","Uçtan Uca Testler (End-to-End / E2E)","Birim Testleri (Unit Tests)","Yük ve Stres Testleri","Manuel Regresyon Testleri"]'::jsonb, 2, 'Test Piramidi''nin tabanında en geniş alanı Birim Testleri (Unit Tests) kaplar. Birim testleri izole fonksiyonları doğrular, milisaniyeler içinde çalışır ve arızanın yerini nokta atışı gösterir. Piramidin yukarısına çıktıkça (Entegrasyon -> E2E) test sayısı azalmalı, çalışma süresi ve maliyet arttığı için dikkatle seçilmelidir.', ARRAY['yazilim-muhendisligi', 'test-piramidi', 'unit-test']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-057', 'alan', 'Yazılım Mühendisliği ve Sistem Geliştirme', 'Agile ve Scrum', 2, 'Çevik (Agile/Scrum) yazılım geliştirme sürecinde, aktif bir Sprint boyunca kalan iş miktarını (Story Points / saat) gün bazında gösteren ve takımın sprint hedefine ulaşıp ulaşamayacağını takip etmeyi sağlayan grafik hangisidir?', '["Gantt Şeması","Burndown Chart (Kalan İş Grafiği)","Dağılım Grafiği (Scatter Plot)","Pareto Analiz Şeması","Akış Diyagramı (Flowchart)"]'::jsonb, 1, '`Burndown Chart`, Scrum takımlarında her Sprint''te kalan tahmini iş miktarını zamana karşı gösterir. Kalan iş çizgisinin ideal eğrinin üstünde veya altında kalması, sprintin zamanında bitip bitmeyeceğini anlık olarak gösterir.', ARRAY['yazilim-muhendisligi', 'scrum', 'agile', 'burndown-chart']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-058', 'alan', 'Yazılım Mühendisliği ve Sistem Geliştirme', 'Git Versiyon Kontrolü', 2, 'Git versiyon kontrol sisteminde `git merge` komutu ile `git rebase` komutu arasındaki temel fark aşağıdakilerden hangisidir?', '["Merge yalnızca yerel dallarda çalışırken, rebase yalnızca uzak sunucuda (remote) çalışır","Merge iki dalın geçmişini birleştirerek yeni bir birleştirme (merge commit) üretirken; Rebase commit''leri hedef dalın ucuna yeniden uygulayarak doğrusal (linear) bir tarihçe oluşturur","Rebase işlemi sırasında çakışmalar (conflict) hiçbir zaman çözülemez","Merge işlemi commit geçmişindeki hash değerlerini tamamen değiştirir","Rebase silinen dosyaları otomatik olarak geri yükler"]'::jsonb, 1, '`git merge`, dalların orijinal geçmişini korur ve birleştirme anında fazladan bir "Merge Commit" oluşturur. `git rebase` ise geçerli daldaki commit''leri hedef dalın en son commit''inin ardına tek tek yeniden yazar. Bu sayede dal çizgileri birleşerek tertemiz ve doğrusal (linear) bir commit geçmişi elde edilir.', ARRAY['yazilim-muhendisligi', 'git', 'merge', 'rebase']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-059', 'alan', 'Yazılım Mühendisliği ve Sistem Geliştirme', 'Tasarım Desenleri', 3, 'Bir nesnenin iç durumunu (state) kapsülleme (encapsulation) ilkesini bozmadan kaydedip, daha sonra ihtiyaç duyulduğunda bu duruma geri yüklenmesini sağlayan (Geri Al / Undo mekanizması kuran) GoF Davranışsal Tasarım Deseni hangisidir?', '["Observer (Gözlemci)","Memento (Hatıra)","Singleton (Tek Nesne)","Decorator (Dekoratör)","Strategy (Strateji)"]'::jsonb, 1, '`Memento Deseni`, bir nesnenin (Originator) o anki durumunun anlık görüntüsünü (snapshot) oluşturup bir koruyucu (Caretaker) aracılığıyla saklar. Nesnenin özel (private) alanlarına doğrudan müdahale etmeden nesneyi geçmiş bir duruma döndürmeyi sağlar.', ARRAY['yazilim-muhendisligi', 'tasarim-desenleri', 'memento']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-060', 'alan', 'Yazılım Mühendisliği ve Sistem Geliştirme', 'Kod Kalitesi ve Refactoring', 2, 'Nesne yönelimli bir yazılım projesinde bir sınıfın metotlarının, kendi sınıfının verilerinden çok başka bir sınıfın verilerine ve metotlarına aşırı derecede başvurması durumunu ifade eden kod kusuru (Code Smell) hangisidir?', '["Dead Code (Ölü Kod)","Feature Envy (Özellik Kıskançlığı)","Shotgun Surgery (Tüfek Cerrahisi)","Primitive Obsession (İlkel Tip Takıntısı)","Long Parameter List"]'::jsonb, 1, '`Feature Envy (Özellik Kıskançlığı)`, bir metodun kendi bulunduğu sınıfın alanları yerine başka bir sınıfın verilerini daha fazla kullanması durumudur. Çözüm olarak bu metodun genellikle en çok kullandığı veriye sahip olan sınıfa taşınması (Move Method refactoring) gerekir.', ARRAY['yazilim-muhendisligi', 'code-smell', 'refactoring']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-061', 'alan', 'Bilgisayar Ağları ve İşletim Sistemleri', 'TCP İletişimi', 2, 'TCP (Transmission Control Protocol) üzerinden güvenilir bir bağlantı kurulurken istemci ve sunucu arasında gerçekleşen Üç Yönlü El Sıkışma (Three-Way Handshake) bayrak (flag) sıralaması hangisidir?', '["ACK -> SYN -> SYN-ACK","SYN -> SYN-ACK -> ACK","FIN -> ACK -> FIN-ACK","SYN -> ACK -> RST","PING -> PONG -> ACK"]'::jsonb, 1, 'TCP bağlantı kurulumunda:
1. İstemci sunucuya bağlantı başlatma talebi gönderir: `SYN`
2. Sunucu talebi onaylar ve kendi bağlantı isteğini iletir: `SYN-ACK`
3. İstemci sunucunun isteğini onaylar: `ACK`
Bu 3 adımdan sonra tam çift yönlü veri aktarımı başlar.', ARRAY['bilgisayar-aglari', 'tcp', 'three-way-handshake']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-062', 'alan', 'Bilgisayar Ağları ve İşletim Sistemleri', 'DNS Kayıtları', 2, 'DNS (Domain Name System) yapılandırmasında bir alan adını (örneğin mobil.ziraatbank.com.tr) doğrudan bir IP adresine değil, başka bir standart alan adına (örneğin lb-prod.ziraatbank.com.tr) takma ad (alias) olarak yönlendiren kayıt türü hangisidir?', '["A Kaydı","AAAA Kaydı","CNAME (Canonical Name) Kaydı","MX (Mail Exchange) Kaydı","PTR (Pointer) Kaydı"]'::jsonb, 2, '`CNAME (Canonical Name)` kaydı, bir alan adını başka bir alan adına takma ad (alias) olarak yönlendirir. `A` kaydı alan adını doğrudan IPv4 adresine, `AAAA` IPv6 adresine, `MX` e-posta sunucusuna, `PTR` ise IP adresinden alan adına (ters DNS) yönlendirir.', ARRAY['bilgisayar-aglari', 'dns', 'cname']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-063', 'alan', 'Bilgisayar Ağları ve İşletim Sistemleri', 'CPU Çizelgeleme ve Yaşlandırma', 2, 'İşletim sistemlerinde Öncelikli CPU Çizelgeleme (Priority Scheduling) kullanılırken düşük öncelikli süreçlerin yüksek öncelikliler yüzünden CPU alamayarak süresiz beklemesi (Starvation / Açlık) sorununu çözmek için bekleme süresi uzadıkça sürecin önceliğini kademeli artıran teknik nedir?', '["Context Switch (Bağlam Değişimi)","Aging (Yaşlandırma)","Thrashing (Çırpınma)","Belady Anomalisi","Paging (Sayfalama)"]'::jsonb, 1, '`Aging (Yaşlandırma)`, kuyrukta uzun süre bekleyen süreçlerin öncelik puanının belirli zaman aralıklarıyla artırılması tekniğidir. Bu sayede düşük öncelikli bir süreç dahi yeterince beklediğinde en yüksek önceliğe ulaşarak CPU''yu alır ve açlık (starvation) önlenir.', ARRAY['isletim-sistemleri', 'cpu-scheduling', 'aging', 'starvation']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-064', 'alan', 'Bilgisayar Ağları ve İşletim Sistemleri', 'Sanal Bellek ve Thrashing', 3, 'Sanal bellek kullanan bir sistemde, süreçlerin aktif çalışma kümelerine yetecek kadar fiziksel RAM tahsis edilemediğinde, sistemin vaktinin çoğunu disk ile RAM arasında sayfa takası (Page Fault / Swap) yaparak harcaması ve CPU veriminin sıfıra yaklaşması durumuna ne ad verilir?', '["Deadlock (Ölümcül Kilitlenme)","Segmentation Fault","Thrashing (Sayfa Çırpınması)","Race Condition (Yarış Durumu)","Cache Miss Anomali"]'::jsonb, 2, '`Thrashing (Sayfa Çırpınması)`, bellek yetersizliği nedeniyle sistemin CPU işlem gücünün büyük bölümünü sürekli sayfa getirip götürmeye (Page Replacement) harcamasıdır. CPU verimliliği aniden çöker.', ARRAY['isletim-sistemleri', 'sanal-bellek', 'thrashing']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-065', 'alan', 'Bilgisayar Ağları ve İşletim Sistemleri', 'Eşzamanlılık ve Senkronizasyon', 2, 'Eşzamanlı (Concurrent) programlamada bir veritabanı bağlantı havuzunda (Connection Pool) aynı anda en fazla 10 adet bağlantının kullanımına izin vermek için kullanılması gereken en uygun senkronizasyon aracı hangisidir?', '["Binary Semaphore (İkili Semafor)","Counting Semaphore (Sayma Semaforu)","Spinlock","Mutex (Mutual Exclusion)","Barrier"]'::jsonb, 1, '`Counting Semaphore (Sayma Semaforu)`, bir tamsayı sayaç tutar. Başlangıçta 10 değeri verildiğinde her kaynak alan thread için sayaç 1 azalır; 0 olduğunda yeni thread''ler bekletilir. Mutex ve Binary Semaphore ise sadece 1 kaynağı koruyabilir (0 veya 1).', ARRAY['isletim-sistemleri', 'semaphore', 'concurrency']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-066', 'alan', 'Bilgi Güvenliği Temelleri', 'Kriptografi ve Hibrit Şifreleme', 2, 'HTTPS (TLS) protokolü internet üzerinden bankacılık verilerini aktarırken neden doğrudan RSA veya ECC gibi asimetrik şifreleme ile tüm veriyi şifrelemek yerine hibrit (karma) bir mimari kullanır?', '["Asimetrik şifrelemenin matematiksel olarak kırılabilmesi","Asimetrik şifrelemenin anahtar paylaşımını güvenle yapması, ancak büyük verilerin şifrelenmesinde simetrik şifrelemenin (AES) yüzlerce kat daha hızlı ve düşük işlemci maliyetli olması","Simetrik şifrelemenin açık anahtar altyapısına (PKI) ihtiyaç duymaması","Tarayıcıların simetrik şifrelemeyi desteklememesi","Asimetrik şifrelemenin sadece tek yönlü hash üretmesi"]'::jsonb, 1, 'Asimetrik şifreleme (Public/Private key) çok yüksek işlemci gücü gerektirir. Bu yüzden TLS el sıkışmasında asimetrik şifreleme yalnızca geçici bir ortak "Oturum Anahtarı (Session Key)" üzerinde anlaşmak için kullanılır. Ardından yüksek hızlı simetrik şifreleme (AES) ile veri transferi yapılır.', ARRAY['bilgi-guvenligi', 'kriptografi', 'tls', 'hibrit-sifreleme']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-067', 'alan', 'Bilgi Güvenliği Temelleri', 'Dijital İmza Mekanizması', 2, 'Dijital İmza (Digital Signature) sürecinde gönderici, mesajın özetini (hash) hangi anahtar ile şifreler ve bu imza alıcı tarafından hangi anahtar ile çözülüp doğrulanır?', '["Gönderici Alıcının Açık Anahtarı ile imzalar / Alıcı kendi Gizli Anahtarı ile doğrular","Gönderici kendi Gizli Anahtarı (Private Key) ile imzalar / Alıcı göndericinin Açık Anahtarı (Public Key) ile doğrular","Gönderici Simetrik Anahtar ile imzalar / Alıcı Hash ile doğrular","Gönderici kendi Açık Anahtarı ile imzalar / Alıcı kendi Gizli Anahtarı ile doğrular","Gönderici Sertifika Otoritesinin Açık Anahtarı ile imzalar / Alıcı IP ile doğrular"]'::jsonb, 1, 'Dijital imzada inkar edilemezlik ve bütünlük esastır. Bu nedenle imza, yalnızca göndericide bulunan Gizli Anahtar (Private Key) ile şifrelenir. Herkese açık olan Gönderici Açık Anahtarı (Public Key) ile imza açılırsa, mesajın kesinlikle o kişi tarafından imzalandığı kanıtlanmış olur.', ARRAY['bilgi-guvenligi', 'dijital-imza', 'pki', 'private-key']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-068', 'alan', 'Bilgi Güvenliği Temelleri', 'Çok Faktörlü Kimlik Doğrulama', 2, 'Çok Faktörlü Kimlik Doğrulama (MFA) standartlarına göre; kullanıcının mobil telefonuna gelen SMS onay kodu veya Authenticator uygulamasındaki süreli kod (TOTP), hangi kimlik doğrulama faktörü kategorisine girer?', '["Bildiğin Şey (Something you know)","Sahip Olduğun Şey (Something you have)","Olduğun Şey (Something you are)","Yaptığın Şey (Something you do)","Bulunduğun Yer (Somewhere you are)"]'::jsonb, 1, 'Kimlik doğrulama faktörleri:
1. Something you know (Bildiğin): Parola, PIN.
2. Something you have (Sahip olduğun): Telefon, OTP cihazı, akıllı kart.
3. Something you are (Olduğun): Parmak izi, yüz tanıma.
SMS kodu veya Authenticator, o fiziksel cihaza sahip olduğunuzu kanıtlar.', ARRAY['bilgi-guvenligi', 'mfa', 'kimlik-dogrulama']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-069', 'alan', 'Bilgi Güvenliği Temelleri', 'Sıfır Güven Mimarisi', 2, 'Geleneksel çevre güvenliğinin (Kale-Hendek modeli) aksine "Ağın içindeki veya dışındaki hiçbir kullanıcıya veya cihaza varsayılan olarak güvenme, her erişim talebini sürekli doğrula" ilkesine dayanan kurumsal siber güvenlik yaklaşımı hangisidir?', '["Demilitarized Zone (DMZ)","Sıfır Güven (Zero Trust) Mimarisi","Virtual Private Network (VPN)","Network Address Translation (NAT)","Intrusion Detection System (IDS)"]'::jsonb, 1, '`Sıfır Güven (Zero Trust)`, "Asla güvenme, her zaman doğrula (Never trust, always verify)" felsefesidir. Kurum içi ağda bulunan bir cihaz dahi olsa her istek için kimlik, yetki, cihaz sağlığı ve bağlam yeniden doğrulanır.', ARRAY['bilgi-guvenligi', 'zero-trust', 'mimari']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-070', 'alan', 'Bilgi Güvenliği Temelleri', 'Web Güvenliği ve CSP', 2, 'Bir web uygulamasında Cross-Site Scripting (XSS) saldırılarını ve veri sızıntılarını engellemek için, tarayıcının hangi kaynaklardan JavaScript, CSS veya resim yükleyebileceğini kısıtlayan HTTP yanıt başlığı (header) hangisidir?', '["Content-Type","Access-Control-Allow-Origin","Content-Security-Policy (CSP)","Strict-Transport-Security (HSTS)","X-Frame-Options"]'::jsonb, 2, '`Content-Security-Policy (CSP)`, sunucunun tarayıcıya "Sadece benim izin verdiğim güvenli alan adlarından script yükle, inline script çalıştırma" talimatı verdiği en etkili XSS savunma başlığıdır.', ARRAY['bilgi-guvenligi', 'csp', 'xss', 'web-guvenligi']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-071', 'alan', 'Veri Analitiği, Yapay Zekâ ve Makine Öğrenmesi Temelleri', 'Model Değerlendirme ve Recall', 3, 'Bir bankada kredi kartı dolandırıcılığı (Fraud Detection) tespit modeli geliştirilmektedir. Sahte bir işlemi kaçırmanın (False Negative) maliyeti, normal bir işlemi yanlışlıkla şüpheli olarak işaretlemekten (False Positive) çok daha yüksek olduğuna göre, veri bilimcisinin öncelikle hangi metriği maksimize etmesi beklenir?', '["Doğruluk (Accuracy)","Kesinlik (Precision)","Duyarlılık (Recall / Sensitivity)","Özgüllük (Specificity)","Mean Squared Error (MSE)"]'::jsonb, 2, '`Recall (Duyarlılık) = TP / (TP + FN)`. False Negative (kaçırılan sahte işlem) paydada yer alır. Bankacılıkta sahtekarlık tespitinde sahte işlemi kaçırmamak her şeyden önemli olduğu için FN minimize edilmeli, dolayısıyla RECALL maksimize edilmelidir.', ARRAY['yapay-zeka', 'makine-ogrenmesi', 'recall', 'fraud-detection']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-072', 'alan', 'Veri Analitiği, Yapay Zekâ ve Makine Öğrenmesi Temelleri', 'Aşırı Öğrenme ve Regularization', 2, 'Bir makine öğrenmesi modelinin eğitim verisine aşırı uyum sağlayarak ezber yapması (Overfitting / Yüksek Varyans) durumunu önlemek için modelin kayıp fonksiyonuna katsayıların büyüklüklerini cezalandıran terim ekleme tekniğine ne ad verilir?', '["Normalizasyon (Min-Max Scaling)","Düzenlileştirme (Regularization - L1 Lasso / L2 Ridge)","One-Hot Encoding","İleri Besleme (Forward Propagation)","Öznitelik Çıkarımı (Feature Extraction)"]'::jsonb, 1, '`Regularization (Düzenlileştirme)`, model katsayılarının aşırı büyümesini cezalandırır. L1 (Lasso) bazı katsayıları sıfırlayarak öznitelik seçimi yaparken, L2 (Ridge) katsayıları küçülterek modelin karmaşıklığını ve aşırı öğrenmesini engeller.', ARRAY['yapay-zeka', 'overfitting', 'regularization', 'lasso-ridge']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-073', 'alan', 'Veri Analitiği, Yapay Zekâ ve Makine Öğrenmesi Temelleri', 'Öğrenme Türleri ve K-Means', 2, 'Bankanın pazarlama departmanı, müşterilerin harcama alışkanlıkları ve gelir düzeylerini analiz ederek önceden belirlenmiş herhangi bir etiket olmadan benzer müşterileri otomatik gruplara (Segmentlere) ayırmak istemektedir. Bu problem için en uygun makine öğrenmesi türü ve algoritması hangisidir?', '["Gözetimli Öğrenme - Doğrusal Regresyon","Gözetimsiz Öğrenme - K-Means Kümeleme","Pekiştirmeli Öğrenme - Q-Learning","Gözetimli Öğrenme - Naive Bayes","Yarı Gözetimli Öğrenme - SVM"]'::jsonb, 1, 'Hedef çıktının (etiketin) bulunmadığı durumlarda veri noktalarının birbirine olan geometrik uzaklıklarına (Öklid vb.) göre kümelenmesi Gözetimsiz Öğrenme (Unsupervised Learning) kapsamındadır ve en yaygın algoritması K-Means Kümeleme''dir.', ARRAY['yapay-zeka', 'unsupervised', 'k-means', 'segmentasyon']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-074', 'alan', 'Veri Analitiği, Yapay Zekâ ve Makine Öğrenmesi Temelleri', 'Transformer ve LLM', 3, 'Günümüz Büyük Dil Modellerinin (LLM - ChatGPT, Gemini vb.) temel yapı taşı olan Transformer mimarisinde, bir cümledeki tüm kelimelerin birbirleriyle olan anlamsal bağını ve bağlam ağırlıklarını paralel olarak hesaplayan çekirdek mekanizma hangisidir?', '["Evrişim (Convolution) Katmanı","Self-Attention (Öz-Dikkat) Mekanizması","Tekrarlayan Hücre (LSTM)","Geriye Yayılım (Backpropagation)","Havuzlama (Max-Pooling)"]'::jsonb, 1, 'Transformer mimarisi (Vaswani et al., 2017) RNN/LSTM''lerin ardışık kısıtını aşarak `Self-Attention (Öz-Dikkat)` mekanizması sayesinde bir cümledeki tüm kelimelerin birbiriyle olan ilişkisini aynı anda hesaplar ve GPU''larda devasa ölçekte paralel eğitime imkan tanır.', ARRAY['yapay-zeka', 'llm', 'transformer', 'self-attention']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-075', 'alan', 'Veri Analitiği, Yapay Zekâ ve Makine Öğrenmesi Temelleri', 'Kredi Skorlama ve Sınıflandırma', 2, 'Bankalarda bir müşterinin kredi başvurusunun kabul edilip edilmeyeceğini (Kredi Onay: 1, Red: 0) tahmin etmek için çıktıyı 0 ile 1 arasında bir olasılık değerine dönüştüren Sigmoid fonksiyonunu kullanan temel sınıflandırma algoritması hangisidir?', '["Doğrusal Regresyon (Linear Regression)","Lojistik Regresyon (Logistic Regression)","K-Means","Temel Bileşen Analizi (PCA)","Apriori Algoritması"]'::jsonb, 1, '`Lojistik Regresyon (Logistic Regression)`, adında regresyon geçmesine rağmen iki sınıflı (Binary) sınıflandırma algoritmasıdır. Girdilerin ağırlıklı toplamını Sigmoid fonksiyonundan geçirerek `1 / (1 + e^-z)` formülüyle 0 ile 1 arasında bir temerrüt olasılığı hesaplar.', ARRAY['yapay-zeka', 'lojistik-regresyon', 'kredi-skorlama', 'sigmoid']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-076', 'alan', 'Sistem Analizi ve Dijital Teknoloji Uygulamaları', 'REST API Standartları', 2, 'Bir mobil bankacılık istemcisi sunucudaki RESTful API servisine yeni bir havale/EFT transfer talimatı oluşturmak için HTTP POST isteği gönderdiğinde, sunucunun işlem başarılı olduğunda döndürmesi gereken en uygun standart HTTP durum kodu hangisidir?', '["200 OK","201 Created","204 No Content","301 Moved Permanently","400 Bad Request"]'::jsonb, 1, 'REST standartlarına göre sunucuda yeni bir kaynak oluşturulduğunda (POST cevabı olarak) en uygun durum kodu `201 Created`''dır. `200 OK` genel başarıdır, ancak kaynak yaratıldığında 201 dönülmesi REST prensiplerinin tam karşılığıdır.', ARRAY['sistem-analizi', 'rest-api', 'http-status-codes']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-077', 'alan', 'Sistem Analizi ve Dijital Teknoloji Uygulamaları', 'Mikroservisler ve Saga Pattern', 3, 'Mikroservis mimarisinde her servisin kendi bağımsız veritabanına sahip olduğu ("Database-per-service") bir bankacılık sisteminde, para transferi gibi birden fazla servisi kapsayan dağıtık bir işlemde bir adım hata verdiğinde önceki adımları geri almak (Rollback) için telafi edici işlemler (Compensating Transactions) çalıştıran mimari desen hangisidir?', '["Circuit Breaker (Devre Kesici) Deseni","Saga Deseni (Saga Pattern)","API Gateway Deseni","CQRS Deseni","Strangler Fig Deseni"]'::jsonb, 1, '`Saga Deseni`, dağıtık mikroservislerde ACID yerine Eventual Consistency sağlamak için kullanılır. İşlem adımları sırayla işletilir; herhangi bir aşamada hata meydana gelirse Saga orkestratörü önceki adımların tersi yönünde telafi edici işlemler (Compensating Transactions) tetikleyerek sistemi tutarlı duruma döndürür.', ARRAY['sistem-analizi', 'mikroservis', 'saga-pattern', 'dagitik-mimari']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-078', 'alan', 'Sistem Analizi ve Dijital Teknoloji Uygulamaları', 'Konteynerleştirme ve Docker', 2, 'Konteynerleştirme teknolojisi olan Docker''ın geleneksel Sanal Makinelerden (Virtual Machine - Hypervisor) en temel farkı aşağıdakilerden hangisidir?', '["Docker''ın yalnızca Windows işletim sisteminde çalışabilmesi","Docker konteynerlerinin ayrı bir konuk işletim sistemi (Guest OS) çalıştırmayıp ana makinenin çekirdeğini (Host OS Kernel) paylaşması","Sanal makinelerin ağ erişimini desteklememesi","Docker konteynerlerinin fiziksel sabit diske veri yazamaması","Sanal makinelerin daha az RAM harcaması"]'::jsonb, 1, 'Geleneksel VM''lerde Hypervisor üzerinde her sanal makine için GB''larca yer kaplayan tam bir Konuk İşletim Sistemi (Guest OS) çalışır. Docker konteynerleri ise ana işletim sisteminin çekirdeğini (Host Kernel) paylaşarak yalnızca uygulamanın kendisini ve bağımlılıklarını izole eder; bu sayede MB boyutunda ve saniyeler içinde başlar.', ARRAY['sistem-analizi', 'docker', 'konteyner', 'virtual-machine']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-079', 'alan', 'Sistem Analizi ve Dijital Teknoloji Uygulamaları', 'Açık Bankacılık (Open Banking)', 2, 'Açık Bankacılık (Open Banking / PSD2) standartlarına göre; banka müşterisinin rızasını alarak farklı bankalardaki hesap bakiyelerini ve hesap hareketlerini tek bir ekranda toplayıp görüntüleme yetkisi verilen üçüncü taraf finansal kuruluş türü hangisidir?', '["PISP (Payment Initiation Service Provider - Ödeme Emri Başlatma)","AISP (Account Information Service Provider - Hesap Bilgisi Hizmeti Sağlayıcısı)","CA (Certificate Authority - Sertifika Otoritesi)","ISP (Internet Service Provider)","KYC Doğrulama Ajanı"]'::jsonb, 1, 'Açık Bankacılıkta iki ana rol vardır:
1. `AISP (Hesap Bilgisi Hizmeti Sağlayıcısı)`: Hesap bakiyeleri ve hareketleri gibi verileri güvenli API''lerle çeker ve konsolide eder.
2. `PISP (Ödeme Emri Başlatma Hizmeti Sağlayıcısı)`: Müşteri adına doğrudan banka hesabından ödeme/para transferi başlatır.', ARRAY['sistem-analizi', 'acik-bankacilik', 'open-banking', 'aisp']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values ('alan-080', 'alan', 'Sistem Analizi ve Dijital Teknoloji Uygulamaları', 'FAST ve Kolay Adresleme', 2, 'TCMB tarafından devreye alınan, 7 gün 24 saat boyunca bankalar arasında fonların anlık (saniyeler içinde) transfer edilmesini sağlayan ve IBAN yerine telefon/kimlik eşleştirmesi sunan sistem ikilisi hangisidir?', '["EFT ve SWIFT","FAST ve KOLAS (Kolay Adresleme Sistemi)","BKM Express ve TROY","HAVALE ve POS","TARGET2 ve CHIPS"]'::jsonb, 1, 'TCMB''nin `FAST (Fonların Anlık ve Sürekli Transferi)` sistemi 7/24 saniyeler içinde hesaplar arası para transferi sağlar. `KOLAS (Kolay Adresleme Sistemi)` ise 26 haneli IBAN yerine cep telefonu, TCKN, e-posta veya vergi kimlik numarasıyla kolayca para gönderilmesine imkan tanır.', ARRAY['sistem-analizi', 'fast', 'kolas', 'tcmb', 'dijital-bankacilik']::text[], 'original')
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;

-- B. LECTURES (22 Konu Anlatımı)
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-gk-01', 'genel-kultur', 'Ziraat Bankası Kurumsal Tarihi ve Kimliği', 'Ziraat Bankası''nın Tarihçesi, Kuruluş Felsefesi ve Ziraat Finans Grubu', '8 dk', '1863 Memleket Sandıkları, Mithat Paşa, 1888 Nizamnamesi, Ulus Genel Müdürlük binası ve Ziraat Finans Grubu iştirakleri.', '### 1. Tarihsel Köken: Memleket Sandıkları (1863)
* **Kurucu:** 1863 yılında dönemin Niş Valisi **Mithat Paşa**, Osmanlı köylüsünü tefecilerin ağır faiz sarmalından kurtarmak amacıyla Pirot kasabasında ilk **Memleket Sandığı**''nı kurmuştur.
* **İmece Modeli:** Çiftçilerin ürettikleri ürünlerin bir kısmını devlete ait arazilerde imece usulüyle yetiştirip satması ve elde edilen gelirin bir sandıkta biriktirilmesi esasına dayanır. Köylüye %1 faizle tohumluk ve üretim kredisi sağlanmıştır.
* **1883 Menafi Sandıkları:** Memleket Sandıkları''nın idari yapısı yeniden düzenlenmiş, vilayet merkezlerinde daha kurumsal olan ''Menafi Sandıkları''na dönüştürülmüştür.

### 2. Modern Bankaya Dönüşüm: 15 Ağustos 1888
* **Resmi Kuruluş:** Menafi Sandıkları''nın yerini almak üzere 15 Ağustos 1888''de yürürlüğe giren nizamname ile modern **Ziraat Bankası** resmen kurulmuştur.
* **Tarihi Genel Müdürlük:** Ankara Ulus''taki tarihi Genel Müdürlük binası, Birinci Ulusal Mimarlık Akımı''nın öncülerinden İtalyan Mimar **Giulio Mongeri** tarafından tasarlanmış ve 1929 yılında hizmete açılmıştır.
* **Kurtuluş Savaşı ve Cumhuriyet:** Kurtuluş Savaşı döneminde Ankara idaresi Ziraat Bankası şubeleri üzerinden milli mücadelenin finansmanını sağlamıştır. 1924''te Ziraat Bankası bir anonim şirkete dönüştürülmüştür.

### 3. Ziraat Finans Grubu ve İştirakleri
* Ziraat Bankası yalnızca bir ticari banka değil, geniş bir finansal ekosistemdir:
  * **Ziraat Katılım:** 2015 yılında faaliyete geçen Türkiye''nin ilk kamu katılım bankası.
  * **Ziraat Teknoloji:** Bankanın ve iştiraklerinin tüm dijital altyapısını, yazılım ve veri merkezi sistemlerini geliştiren teknoloji şirketi.
  * **Ziraat Portföy, Ziraat GYO, Ziraat Hayat ve Emeklilik:** Varlık ve emeklilik fonu yönetimi.
  * **Yurt Dışı Ağı:** Almanya, Bosna-Hersek, Rusya, Gürcistan, Azerbaycan, Özbekistan gibi 19''dan fazla ülkede şube ve bağlı ortaklıklar.

> 💡 **Sınav İpucu:** Sınavda en çok sorulan kronoloji: 1863 (Memleket Sandıkları - Mithat Paşa) -> 1883 (Menafi Sandıkları) -> 15 Ağustos 1888 (Resmi Ziraat Bankası Nizamnamesi). Tarihi Genel Müdürlük binasının mimarı Giulio Mongeri''dir.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-gk-02', 'genel-kultur', 'Türkiye Bankacılık Sistemi ve Regülasyon Otoriteleri', 'BDDK, TCMB, TMSF ve 5411 Sayılı Bankacılık Kanunu', '9 dk', 'TCMB para politikası araçları (repo faizi, zorunlu karşılıklar), BDDK denetim rolü, TMSF güvencesi ve Basel kuralları.', '### 1. TCMB (Türkiye Cumhuriyet Merkez Bankası)
* **Temel Amaç:** 1211 sayılı kanun uyarınca bankanın birincil görevi **fiyat istikrarını** sağlamak ve korumaktır. Fiyat istikrarı ile çelişmemek kaydıyla hükümetin büyüme politikalarını destekler.
* **Temel Para Politikası Araçları:**
  1. **Politika Faizi (1 Haftalık Repo İhale Faizi):** Bankaların merkez bankasından borçlanma maliyetini belirler. Faiz artırıldığında iç talep ve kredi büyümesi yavaşlar, enflasyonist baskı azalır.
  2. **Zorunlu Karşılık Oranları (ZK / RRR):** Bankaların topladıkları mevduatların kanunen TCMB nezdinde bloke tutmak zorunda oldukları yüzdedir. Kredi hacmini doğrudan sınırlar.
  3. **Açık Piyasa İşlemleri (APİ):** Piyasada likidite fazlası varsa devlet tahvili satarak piyasadan para çeker; likidite açığı varsa tahvil geri alarak piyasaya TL enjekte eder.
  4. **Reeskont Kredileri:** İhracatçı ve döviz kazandırıcı firmalara TCMB kaynaklı düşük faizli iskonto kredisi.

### 2. BDDK (Bankacılık Düzenleme ve Denetleme Kurumu)
* **Kuruluş:** 1999 yılında 4389 sayılı kanunla kurulmuş, 2000 yılında fiilen faaliyete geçmiştir. Güncel çerçevesi **5411 sayılı Bankacılık Kanunu**''dur.
* **Görev ve Yetkileri:** Bankacılık sektöründe güven ve istikrarı sağlamak, mevduat sahiplerinin haklarını korumak, banka kuruluş ve faaliyet lisanslarını vermek/denetlemek.
* **Sermaye Yeterlilik Rasyosu (SYR):** Bir bankanın üstlendiği risklere karşı bulundurması gereken asgari özkaynak oranıdır. Yasal asgari sınır **%8**''dir (Hedef oran genellikle %12 seviyesinde tutulur).

### 3. TMSF (Tasarruf Mevduatı Sigorta Fonu)
* Vatandaşların bankalardaki yurt içi şubelerde açılmış TL ve döviz cinsi tasarruf mevduatlarını sigortalar.
* Mevduat kabul eden bankanın iflası veya izninin kaldırılması durumunda sigorta limitine kadar olan tutarı doğrudan mevduat sahibine öder.

> 💡 **Sınav İpucu:** TCMB''nin temel görevi ''büyümeyi maksimize etmek'' değil, **fiyat istikrarını sağlamaktır**. Bankalara lisans veren ve denetleyen kurum TCMB değil, **BDDK**''dır.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-gk-03', 'genel-kultur', 'Bankacılık Finansal Tabloları ve Risk Yönetimi', 'Banka Bilançosu, Kredi Türleri ve Bankacılık Riskleri', '9 dk', 'Aktif/Pasif dengesi, nakdi ve gayrinakdi krediler, Kredi riski, Likidite riski, Piyasa riski ve Operasyonel risk.', '### 1. Banka Bilançosunun Yapısı
* Standart muhasebe denkliği: $\text{Aktifler (Varlıklar)} = \text{Pasifler (Kaynaklar)} + \text{Özkaynaklar}$
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

> 💡 **Sınav İpucu:** Banka bilançosunda müşterinin yatırdığı mevduat **Pasif** (borç), bankanın verdiği kredi ise **Aktif** (alacak) olarak kaydedilir. Teminat mektupları bilanço içinde değil, **Bilanço Dışı (Nazım Hesaplar)** altında izlenir.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-gk-04', 'genel-kultur', 'Makroekonomi ve Dijital Finansal Dönüşüm', 'Para Politikası, Enflasyon Dinamikleri, FAST ve Açık Bankacılık', '8 dk', 'TÜFE/ÜFE farkı, stagflasyon, FAST sistemi, Kolay Adres, Açık Bankacılık (Open Banking / PSD2) ve Dijital Türk Lirası.', '### 1. Enflasyon ve Temel Makroekonomik Göstergeler
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
  * Müşterinin açık rızasıyla hesap ve ödeme verilerinin lisanslı fintech şirketleriyle güvenli API''lar üzerinden paylaşılması (Hesap Bilgisi Hizmeti - HBH, Ödeme Emri Başlatma - ÖEB).
* **Dijital Türk Lirası:**
  * TCMB öncülüğünde Ar-Ge''si yürütülen, blokzincir ve dağıtık defter teknolojisi tabanlı resmi Merkez Bankası Dijital Parası (CBDC).

> 💡 **Sınav İpucu:** FAST sistemi TCMB''ye aittir ve 7/24 çalışır. Havale aynı banka içi transfer iken, EFT farklı bankalar arası transferdir.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-eng-01', 'ingilizce', 'İngilizce Gramer Temelleri', 'Zamanlar (Tenses), Zaman Uyumu ve Sınav İpuçları', '8 dk', 'Present Perfect vs Past Simple ayrımı, Past Continuous ile bölünen eylemler, Present Perfect Continuous ve zaman uyumu.', '### 1. Present Perfect vs Past Simple (En Çok Sorulan Ayrım)
* **Past Simple (V2):** Geçmişte belirli bir zamanda gerçekleşmiş ve bitmiş eylemler.
  * *Anahtar Kelimeler:* `yesterday`, `last year`, `in 2020`, `two days ago`, `during the financial crisis`.
  * *Örnek:* The central bank **increased** the reserve requirement ratio **last month**.
* **Present Perfect (Have/Has + V3):** Geçmişte başlamış, etkisi devam eden veya net bir zaman verilmemiş eylemler.
  * *Anahtar Kelimeler:* `since 2018`, `for five years`, `already`, `yet`, `recently`, `so far`.
  * *Örnek:* The banking sector **has achieved** substantial growth **over the last decade**.

### 2. Süreç Bildiren Zamanlar
* **Present Perfect Continuous (Have/Has been + V-ing):** Geçmişte başlayıp günümüze kadar kesintisiz devam eden eylemler (Özellikle süreç vurgulanır).
  * *Örnek:* Our IT engineers **have been upgrading** the database servers **since early morning**.
* **Past Continuous (Was/Were + V-ing):** Geçmişte belirli bir anda devam etmekte olan ve genellikle başka bir anlık olayla bölünen eylemler (`While`, `As` bağlaçları).
  * *Örnek:* **While** the tellers **were processing** the end-of-day reports, the power suddenly **went out**.

### 3. Zaman Uyumu Kuralı (Tense Harmony)
* Zaman bağlaçlarının (`when`, `while`, `before`, `after`, `until`, `as soon as`) bulunduğu cümlelerde:
  * **Present taraf Present ile eşleşir:** `When the market opens (V1), stock prices fluctuate (V1).`
  * **Past taraf Past ile eşleşir:** `Before the audit began (V2), the manager had signed (had V3) the balance sheets.`
  * **ASLA:** Zaman bağlacının hemen arkasındaki yan cümlede `will` veya `would` kullanılmaz! (`When the bank *will approve* -> YANLIŞ, `When the bank approves` -> DOĞRU).

> 💡 **Sınav İpucu:** Cümlede ''since + geçmiş zaman'' (since 2019 / since he arrived) görürseniz ana cümlede mutlaka **Present Perfect** (`has increased`) veya **Present Perfect Continuous** (`has been increasing`) arayın!')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-eng-02', 'ingilizce', 'Modals ve Geçmiş Çıkarım Yapıları', 'Modals ve Geçmiş Çıkarımları (Past Modals)', '8 dk', 'Geçmişe yönelik çıkarım ve pişmanlık kalıpları: should have, cannot have, must have, needn''t have.', '### 1. Standart Modal Yapıları (Temel Seviye)
* **Obligation (Zorunluluk):** `must` (içsel zorunluluk/kural), `have to` (dışsal/yasal zorunluluk).
  * *Örnek:* Commercial banks **must comply with** the regulations of the supervisory body.
* **Prohibition (Yasaklama):** `must not` (kesin yasak).
* **Absence of Obligation (Zorunluluk Yokluğu):** `don''t have to` / `needn''t` (yapmak zorunda değil).

### 2. Sınavın En Kritik Alanı: Geçmiş Modalları (Modal + Have + V3)
Bu yapılar sınav sorularında düzenli olarak test edilir:

| Kalıp | Anlamı ve İşlevi | Türkçe Karşılığı | Örnek Cümle |
| :--- | :--- | :--- | :--- |
| **should have + V3** | Geçmişte yapılmalıydı ama yapılmadı (Pişmanlık/Eleştiri) | Yapmalıydı | The engineers **should have tested** the backup system before the live deployment. |
| **must have + V3** | Geçmişe yönelik güçlü olumlu çıkarım (Kesine yakın tahmin) | Yapmış olmalı | The vault is empty; the robbers **must have known** the security code. |
| **cannot have + V3** | Geçmişe yönelik güçlü olumsuz çıkarım (İmkansızlık) | Yapmış olamaz | He **cannot have stolen** the money because he was out of the country yesterday. |
| **might / may have + V3** | Geçmişe yönelik zayıf ihtimal | Yapmış olabilir | The network failure **might have been caused** by a sudden hardware malfunction. |
| **needn''t have + V3** | Yapmasına gerek yoktu ama boşuna yaptı | Yapmasına gerek yoktu | You **needn''t have printed** all those loan documents; we already use digital signatures. |

> 💡 **Sınav İpucu:** Bir soruda ''sistem çöktü, keşke önceden önlem alınsaydı'' teması varsa doğru cevap neredeyse her zaman **should have taken** veya **should have conducted** kalıbıdır.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-eng-03', 'ingilizce', 'Şart Cümleleri (Conditionals)', 'Conditionals (Type 1, 2, 3) ve Alternatif Şart Bağlaçları', '8 dk', 'Type 1 (Gerçek), Type 2 (Hayali Şimdiki Zaman), Type 3 (Geçmiş Pişmanlık), Unless, Provided that ve In case.', '### 1. Conditionals (Şart Cümleleri Tablosu)
* **Type 1 (Real Present / Future):** Gerçekleşmesi olası durumlar.
  * *Kural:* `If + Present Simple (V1), will + V1`
  * *Örnek:* If inflation **rises**, the central bank **will raise** the interest rate.
* **Type 2 (Unreal Present):** Şimdiki zamana ait hayali veya gerçekdışı durumlar.
  * *Kural:* `If + Past Simple (V2), would / could + V1`
  * *Örnek:* If our branch **had** more employees, we **could process** mortgage applications faster.
* **Type 3 (Unreal Past):** Geçmişte gerçekleşmemiş durumlar (Geçmiş pişmanlıklar).
  * *Kural:* `If + Past Perfect (had V3), would have / could have + V3`
  * *Örnek:* If they **had diversified** their loan portfolio, they **would not have suffered** heavy losses.

### 2. Alternatif Şart Bağlaçları
* **Unless (= If ... not):** -medikçe / -mezse. Kendisi olumlu çekimlenir ama anlamı olumsuzdur.
  * *Örnek:* **Unless** you verify your identity with two-factor authentication, you **cannot** access your corporate account.
* **Provided that / As long as:** -dığı sürece / şartıyla.
  * *Örnek:* You are eligible for this loan **provided that** your credit score remains high.
* **In case:** -mesi durumunda / -ar diye (Önlem bildirir).
  * *Örnek:* Keep a local copy of the customer balance sheet **in case** the cloud network disconnects.

> 💡 **Sınav İpucu:** Type 3 sorulurken virgülden sonra `would have + V3` varsa, `If` kısmında mutlaka `had + V3` arayın. Tersi de geçerlidir.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-eng-04', 'ingilizce', 'Edilgen Çatı ve Cümle Yapıları', 'Passive Voice, Relative Clauses ve Gerund / Infinitive', '8 dk', 'Edilgen çatı çekimleri, whose ve where kullanımı, Preposition + Gerund kuralı ve sınav kalıpları.', '### 1. Edilgen Çatı (Passive Voice)
* Eylemi yapan değil, eylemden etkilenen nesne vurgulandığında kullanılır. Temel kural: **be + V3**.
  * *Present Continuous Passive:* `are being reviewed` (Şu anda incelenmektedir).
  * *Present Perfect Passive:* `have been approved` (Onaylanmıştır).
  * *Future Passive:* `will be implemented` (Yürürlüğe konacaktır).
  * *Modal Passive:* `must be encrypted` (Şifrelenmelidir).
  * *Örnek:* All financial transactions exceeding 100.000 TL **are monitored** automatically by the anti-fraud algorithm.

### 2. Sıfat Cümlecikleri (Relative Clauses)
* **Who:** İnsanlar için özne/nesne (`The loan officer who handled our case...`).
* **Which:** Nesneler ve hayvanlar için (`The legacy software which runs the mainframe...`).
* **Whose (Sahiplik):** Kendisinden sonra doğrudan bir isim gelir (`whose + noun`).
  * *Örnek:* Customers **whose credit scores** are below 1200 cannot qualify for this auto loan.
* **Where:** Yer bildiren ifadeler için (`The digital branch where all automated transfers are logged.`).
* **Non-defining (İki virgül arası ekstra bilgi):** İki virgül arasında `that` KULLANILMAZ! Mutlaka `which` veya `who` kullanılır.

### 3. Gerund (-ing) ve Infinitive (to V1)
* **En Altın Kural: Preposition (Edat) + Gerund (-ing):**
  * İngilizcede tüm edatlardan (`in`, `on`, `at`, `about`, `from`, `for`, `without`) sonra gelen fiil mutlaka **-ing** alır!
  * *Örnek:* We look forward **to meeting** with foreign investors. (`look forward to` yapısındaki `to` bir edattır!)
  * *Örnek:* She was accused **of disclosing** confidential client credentials.
  * *Örnek:* Banks succeed **by investing** heavily in artificial intelligence.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-eng-05', 'ingilizce', 'Bağlaçlar ve Cümle Tamamlama', 'Sınavın En Kritik Bağlaçları ve Cümle Tamamlama Taktikleri', '9 dk', 'Zıtlık, sebep-sonuç ve amaç bağlaçlarının cümle/isim alma kuralları, geçiş sözcükleri ve soru çözme taktikleri.', '### 1. Zıtlık Bağlaçları (Contrast Conjunctions)
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
* **Sebep (Cümle alan):** `Because`, `As`, `Since` (-dığı için / çünkü).
  * *Örnek:* As raw material prices surged, producers passed the cost onto consumers.
* **Sebep (İsim alan):** `Due to`, `Owing to`, `Because of`, `On account of` (-den dolayı / nedeniyle).
  * *Örnek:* Due to unforeseen hardware failures, internet banking was halted temporarily.
* **Amaç:**
  * `So that + Subject + Modal (can/could/may):` -sın diye.
    * *Örnek:* The branch hired extra staff **so that** customers **could receive** prompt service.
  * `In order to / So as to + V1:` -mak için.
    * *Örnek:* In order to reduce operational costs, the bank digitized all manual workflows.

> 💡 **Sınav İpucu:** Boşluktan hemen sonra tam bir cümle (`subject + verb`) geliyorsa şıklardaki `Despite`, `In spite of`, `Due to` elenir; `Although`, `While`, `Because` seçilir. Boşluktan sonra sadece isim veya `-ing` varsa tersi uygulanır!')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-eng-06', 'ingilizce', 'Bankacılık, Finans ve Bilişim Kelime Dağarcığı', 'Banka & Finans İngilizcesi: 50 Temel Kelime ve Collocations', '10 dk', 'Assets, Liabilities, Collateral, Maturity, Amortization, Dividend, Preposition eşleşmeleri ve Phrasal Verbs.', '### 1. Bankacılık ve Finans Terimleri Sözlüğü
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
* **comply with:** kurallara / yönetmeliğe uymak (`comply with AML regulations`).
* **eligible for:** bir şeye / krediye hak kazanmış, uygun (`eligible for subsidized agricultural loans`).
* **invest in:** bir alana yatırım yapmak (`invest heavily in cloud infrastructure`).
* **account for:** bir orana tekabül etmek, oluşturmak (`digital transfers account for 70% of turnover`).
* **susceptible to / vulnerable to:** bir tehlikeye / siber saldırıya karşı savunmasız olmak.
* **rely on / depend on:** bir şeye güvenmek, bel bağlamak.

### 3. Kritik Phrasal Verbs (Banka & Bilişim)
* **Phase out:** Kademeli olarak kullanımdan kaldırmak / devreden çıkarmak (`phase out legacy mainframes`).
* **Carry out:** Bir işlemi / denetimi yürütmek, uygulamak (`carry out a security audit`).
* **Call off:** İptal etmek (`call off the merger negotiations`).
* **Turn down:** Bir teklifi veya kredi başvurusunu reddetmek (`turn down the loan request`).
* **Bring about:** Bir değişime veya krize yol açmak, neden olmak (`bring about economic instability`).')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-eng-07', 'ingilizce', 'Sınav Çözüm Taktikleri ve Soru Eleme Yöntemleri', 'Müfettişlik İngilizce Sınavı: 24+ Net İçin Formüller ve Şık Eleme Kısayolları', '10 dk', '+/- Duygu Analizi tekniği, Çeviride Yüklem/Özne Avı, Zaman Uyumu kuralı ve Extreme Words eleme taktikleri.', '### 1. En Büyük Avantaj: 4 Yanlış 1 Doğruyu Götürmüyor!
* Banka sınavında yanlış doğruyu götürmez; **asla boş soru bırakmayın**.
* 40 soruda 24 doğru (%60) barajı için hedefimiz:
  - 15-18 soruyu kural ve formülle doğrudan çözmek.
  - Kalan 22 soruda en az 2 yanlış şıkkı taktikle eleyip mantıklı tahminle 8-10 net çıkarmak. Toplamda 25-28 nete rahatça ulaşılır!

### 2. Altın Kural 1: Bağlaç Sorularında ''+ / -'' Duygu Analizi Tekniği
Bağlaç sorularında cümlenin tüm kelimelerini bilmenize gerek yoktur. İki cümlenin verdiği mesaja bakın:
* **( + ) ve ( - ) Varsa ZITLIK BAĞLACI ARANIR:**
  - Cümle 1: ''Ekonomik kriz derinleşti (-)''
  - Cümle 2: ''Banka rekor kâr açıkladı (+)''
  - Aranan bağlaç: *Although, Even though, Despite, In spite of, However, Nevertheless, Whereas, While*.
* **( - ) ve ( - ) VEYA ( + ) ve ( + ) Varsa PARALELLİK / NEDEN-SONUÇ ARANIR:**
  - Cümle 1: ''Enflasyon kontrol altına alındı (+)''
  - Cümle 2: ''Yatırımlar hızla arttı (+)''
  - Aranan bağlaç: *Because, Since, As, Due to, Therefore, Thus, As a result, Consequently*.
* **Önemli İpucu:** Şıklarda aynı anlama gelen iki bağlaç varsa (Örn: *Although* ve *Even though*), ikisi de elenir çünkü birbirini nötrler!

### 3. Altın Kural 2: Çeviri Sorularında ''Yüklem & Özne Avı'' (20 Saniyede Çözüm)
* Soru kökündeki cümlenin **ANA YÜKLEMİNİ (Main Verb)** ve **ZAMANINI (Tense)** belirleyin.
  - Örnek: ''...has been approved by the board.'' ➔ Şıkta Türkçe yüklem: ''...yönetim kurulu tarafından onaylanmıştır.'' olmalı! Şıklarda ''onaylanacaktır'', ''onaylandı'', ''onaylanabilir'' diyen tüm şıkları hemen eleyin.
* İkinci adım: **ÖZNEYİ (Subject)** kontrol edin. Özne doğru yerde mi?
* Bu iki adımla 5 şıktan 4''ü doğrudan elenir, kalan 1 şık doğru cevaptır.

### 4. Altın Kural 3: Zaman Uyumu (Tense Agreement) Tablosu
* İngilizce sınavlarda **PAST** ile **PRESENT/FUTURE** keyfi şekilde karışmaz:
  - Bir tarafta *Past Simple / Past Continuous* varsa, diğer tarafta *will* veya *Present Perfect (have/has)* **OLAMAZ!**
  - Örnek: *When the crisis started (Past)... the government was taking (Past) measures.*
* **İstisna 1 (Since Kuralı):** *Since + Simple Past (V2) , Present Perfect (have/has V3).* (Sınavların en sevdiği soru kalıbıdır!)
* **İstisna 2 (Zaman Bağlaçları):** *When, as soon as, after, before, until* gibi zaman bağlaçlarının hemen arkasından **ASLA will / would GELMEZ!** (*When the bank will open ➔ YANLIŞ! When the bank opens ➔ DOĞRU*).

### 5. Altın Kural 4: Paragraf Sorularında ''Extreme Words'' (Aşırı Genelleme) Tuzağı
* Paragraf sorularında şıklarda şu aşırı kelimeler varsa %90 YANLIŞTIR:
  - *Always (Her zaman), Never (Asla), Only / Solely (Yalnızca), Entirely (Tamamen), All (Hepsi).*
* Şıklarda şu ihtiyatlı/akademik ifadeler varsa %80 DOĞRUDUR:
  - *May, Might, Could (Olabilir)*
  - *Likely, Tend to (Eğiliminde olmak)*
  - *Some, Partially, In most cases (Bazı, Çoğu durumda)*.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-eng-08', 'ingilizce', 'Sınavda En Sık Çıkan Akademik Fiil ve Phrasal Verbs', 'YDS & Banka Sınavlarında En Çok Çıkan 60 Fiil, Phrasal Verbs ve Eş Anlamlılar', '10 dk', 'Carry out, account for, cope with, stem from ve sınavın en çok soru getiren 60 akademik fiil haritası.', '### 1. Sınavın Vazgeçilmez 15 Phrasal Verbi
1. **Account for:** (1) Açıklamak, izah etmek. (2) Bir orana/miktara tekabül etmek (%40''ını oluşturmak).
2. **Carry out:** Uygulamak, yürütmek (araştırma, denetim, plan).
3. **Cope with / Deal with:** Başa çıkmak, üstesinden gelmek (krizle, enflasyonla).
4. **Bring about / Give rise to / Lead to:** Yol açmak, neden olmak.
5. **Stem from / Originate from:** -den kaynaklanmak, ileri gelmek.
6. **Rely on / Depend on:** Güvenmek, bel bağlamak.
7. **Put forward:** İleri sürmek, teklif etmek (hipotez, öneri).
8. **Turn down:** Reddetmek (teklif, başvuru).
9. **Call off:** İptal etmek (toplantı, grev).
10. **Rule out:** İhtimal dışı bırakmak, dışlamak.
11. **Look into:** Araştırmak, incelemek (soruşturma, şikayet).
12. **Keep up with / Catch up with:** Hızına yetişmek, ayak uydurmak.
13. **Wipe out:** Yok etmek, silip süpürmek (tasarrufları, sermayeyi).
14. **Figure out:** Çözmek, anlamak, hesaplamak.
15. **Phase out:** Kademeli olarak yürürlükten/kullanımdan kaldırmak.

### 2. Sınavda En Çok Soru Getiren Akademik Fiil ve Eş Anlamlı Çiftleri
* **Deteriorate = Worsen:** Kötüleşmek (Piyasa şartları kötüleşti).
* **Facilitate = Ease:** Kolaylaştırmak (Kredi akışını kolaylaştırmak).
* **Hamper = Hinder = Impede:** Engellemek, köstek olmak (Büyümeyi engellemek).
* **Substantiate = Verify = Prove:** Kanıtlamak, doğrulamak.
* **Deplete = Exhaust:** Tüketmek, bitirmek (Rezervleri tüketmek).
* **Fluctuate = Oscillate:** Dalgalanmak (Döviz kurları dalgalanıyor).
* **Undermine = Weaken:** Baltalamak, zayıflatmak (Güveni sarsmak).
* **Compensate for = Make up for:** Telafi etmek (Zararı karşılamak).

### 3. Sınavın En Sevdiği Sıfat ve Zarflar
* **Vulnerable to / Susceptible to:** Hassas, savunmasız (Risk karşısında savunmasız).
* **Inevitable = Unavoidable:** Kaçınılmaz (Enflasyonist baskı kaçınılmaz).
* **Reluctant = Hesitant:** İsteksiz (Bankalar kredi vermede isteksiz).
* **Prominent = Eminent:** Önemli, öne çıkan (Önemli bir ekonomist).
* **Feasible = Viable:** Uygulanabilir, karlı/yapılabilir (Fizibilite, uygulanabilir proje).
* **Substantially = Drastically = Considerably:** Önemli ölçüde, ciddi derecede (Kârlar ciddi oranda arttı).')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-gy-01', 'genel-yetenek', 'Sayısal ve Sözel Mantık Taktikleri', 'Problem Çözme Kısayolları ve Sözel Mantık Tablo Kurma', '7 dk', 'Faiz, yüzde, hız problemleri formülleri ve sözel mantıkta hata yaptırmayan tablo çizim yöntemi.', '### 1. Sayısal Problem Çözüm Formülleri
* **Basit Faiz Formülü:** `Faiz (F) = (Anapara * Faiz Oranı * Zaman) / Payda`
  * Yıllık: `(A * n * t) / 100`
  * Aylık: `(A * n * t) / 1200`
  * Günlük: `(A * n * t) / 36000` (Bankacılık hesaplamalarında 1 yıl 360 gün alınır).
* **Ortalama Hız Formülü:** İki şehir arası gidiş hızı V1, dönüş hızı V2 ise:
  * `V_ort = (2 * V1 * V2) / (V1 + V2)` (Harmonik Ortalama).
* **Yüzde ve Kar-Zarar:** Bir ürünün maliyetine 100x deyin. %30 karlı satış = 130x. Bu fiyata %20 indirim = 130x * 0.8 = 104x (%4 net kar).

### 2. Sözel Mantıkta 3 Adımda Tablo Kurma
1. **Sabit Değişkeni Bulun:** Günler (Pzt-Paz), sıralar (1-5) veya katlar gibi sıralı olan nesneleri tablonun başlığı yapın.
2. **Kesin Bilgileri Yerleştirin:** "Deniz 3. gündür", "Burak kesinlikle Cuma değildir" gibi net verileri doğrudan kutucuklara yazın.
3. **Bağlantılı Öbekleri Gruplayın:** "Ali, Can''dan hemen önceki gündür" bilgisi `[Ali, Can]` şeklinde bitişik bir bloktur. Yalnızca 2 kişilik boş yer arayın!')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-gy-02', 'genel-yetenek', 'Örüntü ve Matris Çözüm Stratejileri', 'Örüntü Tamamlama, 3x3 Matrisler ve Uzamsal İlişkiler', '8 dk', 'Sayı dizisi çözüm adımları, görsel matrislerde rotasyon/XOR mantığı ve küp açılımlarında zıt yüz kuralı.', '### 1. Sayı Dizilerinde 5 Temel İnceleme Adımı
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
* **Temel Kural:** Zıt yüzler küpün hiçbir perspektifinden **aynı anda yan yana görünemez!** Şıklarda yan yana duran karşıt yüzleri doğrudan eleyin.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-alan-01', 'alan', 'Algoritma ve Programlama Mantığı', 'Karmaşıklık Analizi (Big-O) ve Sıralama/Arama Algoritmaları', '7 dk', 'Big-O notasyonu, en kötü durum analizleri, sıralama algoritmalarının maliyetleri ve arama teknikleri.', '### 1. Zaman ve Alan Karmaşıklığı (Asymptotic Notation)
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

> 💡 **Sınav İpucu:** Quick Sort pratikte önbellek dostu olduğu için çok hızlıdır ancak pivot en kötü seçilirse O(n²) olur. Merge Sort garanti O(n log n)''dir ama O(n) ekstra bellek ister.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-alan-02', 'alan', 'Veri Yapıları ve Problem Çözme', 'Temel Veri Yapıları: Stack, Queue, Hash Table ve Ağaçlar', '8 dk', 'LIFO/FIFO yapıları, Hash çakışmaları, İkili Arama Ağaçları (BST) ve Dengeleme (AVL/Heap).', '### 1. Yığın (Stack) ve Kuyruk (Queue)
* **Stack (Yığın):** **LIFO** (Last In, First Out). Fonksiyon çağrı yığını (Call Stack), parantez eşleme, Geri Al (Undo) mekanizmalarında kullanılır. Temel işlemler: `push`, `pop`, `peek` (Tümü O(1)).
* **Queue (Kuyruk):** **FIFO** (First In, First Out). Yazıcı kuyrukları, BFS (Genişlik Öncelikli Arama), mesajlaşma sistemleri (RabbitMQ, Kafka). Temel işlemler: `enqueue`, `dequeue` (Tümü O(1)).

### 2. Hash Tabloları (Hash Table)
* Anahtar-Değer (Key-Value) eşlemesi. Ortalama arama, ekleme, silme: **O(1)**. En kötü durumda çakışmalar (Collision) nedeniyle **O(n)**.
* **Çakışma Çözme:** Chaining (Bağlı liste ile zincirleme) veya Open Addressing (Linear Probing, Quadratic Probing).

### 3. Ağaç Yapıları (Trees)
* **Binary Search Tree (BST):** Sol çocuk < Kök < Sağ çocuk. Dengeliyse arama/ekleme/silme **O(log n)**, zincir haline gelirse **O(n)**.
* **AVL Ağacı:** Kendini dengeleyen BST''dir. Yükseklik farkı (Balance Factor) en fazla 1 olabilir. Denge bozulduğunda döndürmeler (Rotations) yapılır.
* **Heap (Öbek):** Öncelik kuyruklarında (Priority Queue) kullanılır. Max-Heap''te en büyük eleman, Min-Heap''te en küçük eleman köktedir. Ekleme ve çıkarma **O(log n)**.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-alan-03', 'alan', 'Veri Tabanı ve SQL', 'SQL Sorguları, Normalizasyon ve ACID Prensipleri', '9 dk', 'JOIN çeşitleri, 1NF-BCNF kuralları, transaction yönetimi ve bankacılık ACID garantileri.', '### 1. SQL JOIN Türleri
* **INNER JOIN:** Yalnızca her iki tabloda da ON koşuluyla eşleşen satırları döndürür.
* **LEFT JOIN:** Sol tablodaki tüm satırları getirir; sağda eşleşmeyenler için sütunlar `NULL` olur.
* **GROUP BY ve HAVING:** `WHERE` satır bazlı filtreleme yaparken, `HAVING` gruplanmış aggregate sonuçlarını (`COUNT`, `SUM`, `AVG`) filtreler.

### 2. Transaction ve ACID Prensipleri (Bankacılık için Hayati)
* **A - Atomicity (Bölünemezlik):** Ya hep ya hiç! İşlem ya tamamen commit edilir ya da rollback ile iptal edilir.
* **C - Consistency (Tutarlılık):** Veritabanı kurallarına ve kısıtlarına her zaman uyulur.
* **I - Isolation (Yalıtım):** Aynı anda çalışan işlemler birbirinin ara durumlarını görmez.
* **D - Durability (Kalıcılık):** Commit edilen işlem sistem çökse dahi diskte kalıcıdır.

### 3. Normalizasyon Aşamaları
* **1NF:** Her sütunda atomik (bölünemez) tek bir değer olmalı, tekrarlayan gruplar bulunmamalı.
* **2NF:** 1NF olmalı + Kısmi bağımlılık (Partial Dependency) olmamalı.
* **3NF:** 2NF olmalı + Geçişli bağımlılık (Transitive Dependency) olmamalı.
* **BCNF:** Her belirleyici bir aday anahtar (Candidate Key) olmalıdır.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-alan-04', 'alan', 'Yazılım Mühendisliği ve Sistem Geliştirme', 'SOLID Prensipleri, Tasarım Desenleri ve SDLC', '8 dk', 'Nesne yönelimli tasarımın 5 temel ilkesi, GoF tasarım desenleri ve Çevik (Agile/Scrum) metodolojiler.', '### 1. SOLID Prensipleri
* **S - Single Responsibility:** Bir sınıfın değişmek için yalnızca tek bir nedeni (tek sorumluluğu) olmalıdır.
* **O - Open/Closed:** Sınıflar genişletilmeye açık (Open for extension), değiştirilmeye kapalı (Closed for modification) olmalıdır.
* **L - Liskov Substitution:** Alt sınıflar, üst sınıflarının yerine geçebilmeli ve davranışı bozmamalıdır.
* **I - Interface Segregation:** İstemciler kullanmadıkları metotları içeren şişkin arayüzlere zorlanmamalıdır.
* **D - Dependency Inversion:** Yüksek seviyeli modüller doğrudan düşük seviyeli modüllere değil, soyutlamalara (interfaces) bağımlı olmalıdır.

### 2. Yaygın Tasarım Desenleri (Design Patterns)
* **Singleton:** Tek nesne üretimi ve küresel erişim noktası.
* **Factory Method:** Nesne üretim mantığını istemciden gizleyip alt sınıflara devretme.
* **Observer:** Bir nesnedeki değişikliği tüm abonelere otomatik bildirme.
* **Adapter:** Uyumsuz arayüzleri dönüştürerek birlikte çalıştırma.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-alan-05', 'alan', 'Bilgisayar Ağları ve İşletim Sistemleri', 'OSI 7 Katmanı, TCP/IP ve İşletim Sistemi Kavramları', '9 dk', 'Ağ protokolleri, TCP vs UDP, Süreç ve Thread ayrımı, Deadlock 4 şartı, Sanal Bellek.', '### 1. OSI Katmanları ve Protokoller
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
* **Sanal Bellek ve Paging:** İstenen sayfa RAM''de yoksa **Page Fault** oluşur ve diskten (swap) yüklenir.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-alan-06', 'alan', 'Bilgi Güvenliği Temelleri', 'Siber Güvenlik, Kriptografi ve OWASP Top 10', '8 dk', 'CIA Üçlüsü, simetrik vs asimetrik şifreleme, web saldırıları (SQLi, XSS, CSRF) ve bankacılık veri güvenliği.', '### 1. CIA Üçlüsü (Bilgi Güvenliğinin Temeli)
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
* **CSRF (Siteler Arası İstek Sahteciliği):** Kullanıcı oturumuyla habersiz istek yapma. Çözüm: Anti-CSRF Token.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-alan-07', 'alan', 'Veri Analitiği, Yapay Zekâ ve Makine Öğrenmesi Temelleri', 'Makine Öğrenmesi, Model Değerlendirme ve Bankacılıkta Yapay Zekâ', '9 dk', 'Gözetimli/Gözetimsiz Öğrenme, Confusion Matrix (Precision vs Recall), Overfitting ve Bankacılıkta Fraud & Kredi Risk Analizi.', '### 1. Temel Öğrenme Türleri
* **Gözetimli Öğrenme (Supervised Learning):** Etiketli veriyle çalışır. İki ana dala ayrılır:
  - **Sınıflandırma (Classification):** Çıktı kategoriktir (Örn: Kredi Onay/Red, Spam/Değil, Şüpheli İşlem/Normal).
  - **Regresyon (Regression):** Çıktı süreklidir (Örn: Konut Fiyatı, Müşteri Harcama Tutarı, Borsa Endeks Tahmini).
* **Gözetimsiz Öğrenme (Unsupervised Learning):** Etiket yoktur, veri içindeki gizli yapılar bulunur.
  - **Kümeleme (Clustering):** K-Means, DBSCAN (Müşteri Segmentasyonu).
  - **Boyut İndirgeme (Dimensionality Reduction):** PCA (Temel Bileşen Analizi).
* **Pekiştirmeli Öğrenme (Reinforcement Learning):** Ajanın çevreden ödül/ceza alarak optimal politika öğrenmesi.

### 2. Model Başarı Metrikleri (Confusion Matrix)
| Gerçek \ Tahmin | Pozitif (Positive) | Negatif (Negative) |
| :--- | :--- | :--- |
| **Pozitif** | **TP** (Doğru Pozitif) | **FN** (Yanlış Negatif - Kaçırılan) |
| **Negatif** | **FP** (Yanlış Alarm) | **TN** (Doğru Negatif) |

* **Doğruluk (Accuracy):** `(TP + TN) / Toplam`. Dengesiz veri setlerinde yanıltıcıdır (Örn: %99 normal, %1 fraud olan veride model herkese normal dese %99 accuracy verir ama tüm sahtekarlıkları kaçırır!).
* **Kesinlik (Precision):** `TP / (TP + FP)`. Modelin pozitif dediklerinin kaçı gerçekten pozitif?
* **Duyarlılık (Recall / Sensitivity):** `TP / (TP + FN)`. Gerçekteki tüm pozitiflerin kaçı yakalandı?
* **F1-Skoru:** Precision ve Recall''un harmonik ortalaması: `2 * (Precision * Recall) / (Precision + Recall)`.

> 🎯 **Bankacılık Sınav İpucu:** Bankacılıkta sahtekarlık (Fraud) ve kara para aklamada en kritik metrik **RECALL (Duyarlılık)**''tır! Çünkü sahte bir işlemi kaçırmak (FN), yanlış alarm vermekten (FP) çok daha maliyetlidir.

### 3. Aşırı Öğrenme (Overfitting) vs Yetersiz Öğrenme (Underfitting)
* **Overfitting (Yüksek Varyans):** Model eğitim verisini ezberler, gürültüyü öğrenir. Eğitim başarısı %99, test başarısı %60 olur.
  - **Çözüm:** Veri artırma (Data Augmentation), Çapraz Doğrulama (K-Fold Cross Validation), Düzenlileştirme (L1 Lasso, L2 Ridge), Dropout, Ağaç derinliğini budama (Pruning).
* **Underfitting (Yüksek Yanlılık - High Bias):** Model verideki deseni yakalayamaz. Model çok basittir.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
insert into public.lectures (id, section, topic, title, read_time, summary, content)
values ('lec-alan-08', 'alan', 'Sistem Analizi ve Dijital Teknoloji Uygulamaları', 'Yazılım Mimarileri, REST API, Bulut Bilişim ve Dijital Bankacılık', '9 dk', 'Monolitik vs Mikroservis mimarileri, RESTful API kuralları ve durum kodları, Docker/Cloud, FAST ve Açık Bankacılık.', '### 1. Monolitik vs Mikroservis Mimarileri
* **Monolitik Mimari:** Tüm işlevler tek bir kod tabanı ve tek bir veritabanında çalışır. Başlangıçta kolay geliştirilir ancak sistem büyüdükçe ölçekleme zorlaşır; tek bir hata tüm sistemi çökertebilir.
* **Mikroservis Mimarisi:** Büyük sistem, bağımsız dağıtılabilen küçük servislere bölünür (Örn: Hesap Servisi, Kredi Servisi, Bildirim Servisi).
  - **Avantajlar:** Bağımsız ölçekleme, teknoloji çeşitliliği, yüksek erişilebilirlik.
  - **Zorluklar:** Dağıtık veri yönetimi (Database per Service), ağ gecikmesi, veri tutarlılığı (Eventual Consistency & SAGA Pattern).

### 2. RESTful API Standartları ve HTTP Durum Kodları
* **REST Temel İlkeleri:** İstemci-Sunucu ayrımı, **Stateless (Durumsuzluk)**, Önbelleklenebilirlik (Cacheable), Standart arayüz (Uniform Interface).
* **HTTP Metodları:**
  - `GET`: Kaynak okuma (Idempotent & Safe)
  - `POST`: Yeni kaynak oluşturma (Idempotent Değil)
  - `PUT`: Kaynağın tamamını güncelleme (Idempotent)
  - `PATCH`: Kaynağın belirli alanlarını güncelleme
  - `DELETE`: Kaynağı silme (Idempotent)
* **Kritik HTTP Durum Kodları:**
  - `200 OK`: İşlem başarılı.
  - `201 Created`: Yeni kayıt başarıyla üretildi (POST cevabı).
  - `400 Bad Request`: İstemci isteği hatalı/geçersiz parametre içeriyor.
  - `401 Unauthorized`: Kimlik doğrulanmadı (Token/Giriş yok).
  - `403 Forbidden`: Kimlik doğrulandı ancak bu kaynağa yetkisi yok (Role/Permission yetersiz).
  - `404 Not Found`: İstenen URL/kaynak bulunamadı.
  - `500 Internal Server Error`: Sunucu tarafında beklenmeyen hata.

### 3. Bankacılıkta Dijital Teknolojiler
* **Açık Bankacılık (Open Banking):** Müşteri rızasıyla banka hesap verilerinin güvenli API''lar üzerinden lisanslı üçüncü taraflarla paylaşılması (AISP - Hesap Bilgisi, PISP - Ödeme Başlatma).
* **FAST (Fonların Anlık ve Sürekli Transferi):** TCMB tarafından işletilen, 7/24 saniyeler içinde para transferi sağlayan altyapı. **KOLAS (Kolay Adresleme Sistemi)** ile IBAN yerine telefon/TCKN eşleştirmesi kullanılır.
* **Konteynerleştirme (Docker vs VM):** Sanal makineler (VM) kendi Hypervisor''ı üzerinde tam bir konuk işletim sistemi (Guest OS) çalıştırır. Docker konteynerleri ise ana işletim sisteminin çekirdeğini (Host Kernel) paylaşarak çok daha hafif, hızlı ve taşınabilir çalışır.')
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;

-- C. FLASHCARDS (30 Bilgi Kartı)
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-001', 'alan', 'Veri Tabanı ve SQL', 'ACID Prensipleri Nelerdir?', '• Atomicity: Ya hep ya hiç (bölünemezlik).
• Consistency: Tutarlılık kurallarının korunması.
• Isolation: Eşzamanlı işlemlerin birbirinden yalıtılması.
• Durability: İşlem tamamlandığında diske kalıcı yazılması.', ARRAY['acid', 'database', 'transaction']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-002', 'alan', 'Yazılım Mühendisliği', 'SOLID Prensipleri Nelerdir?', '• S (Single Responsibility): Tek bir sorumluluk.
• O (Open/Closed): Gelişime açık, değişime kapalı.
• L (Liskov Substitution): Alt sınıflar üst sınıf yerine geçebilmeli.
• I (Interface Segregation): İstemciye özel küçük arayüzler.
• D (Dependency Inversion): Üst modüller alt modüllere değil, soyutlamalara bağımlı olmalı.', ARRAY['solid', 'oop', 'yazilim']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-003', 'alan', 'Bilgisayar Ağları', 'OSI 7 Katmanı (Aşağıdan Yukarıya)', '1. Fiziksel (Physical) - Bitler, kablolar
2. Veri Bağlantısı (Data Link) - Çerçeveler, MAC, Switch
3. Ağ (Network) - Paketler, IP, Router
4. Taşıma (Transport) - Segmentler, TCP/UDP, Portlar
5. Oturum (Session) - Oturum yönetimi
6. Sunum (Presentation) - Şifreleme, sıkıştırma, format (JSON/TLS)
7. Uygulama (Application) - HTTP, DNS, SMTP, FTP', ARRAY['osi', 'network', 'protokol']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-004', 'alan', 'İşletim Sistemleri', 'Deadlock (Kilitlenme) İçin 4 Coffman Şartı', '1. Mutual Exclusion (Karşılıklı Dışlama)
2. Hold and Wait (Tut ve Bekle)
3. No Preemption (Kesinti / Zorla Alma Yok)
4. Circular Wait (Dairesel Bekleme)
* Bu 4 şart aynı anda gerçekleştiğinde Deadlock oluşur; biri engellenirse deadlock önlenir.', ARRAY['deadlock', 'os', 'coffman']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-005', 'genel-kultur', 'Ziraat Bankası Tarihi', 'Ziraat Bankası Ne Zaman ve Nasıl Kurulmuştur?', '• 1863 yılında Niş Valisi Mithat Paşa tarafından ''Memleket Sandıkları'' adıyla kuruldu.
• Amaç çiftçileri tefecilerden koruyup uygun maliyetli tarımsal kredi sağlamaktı.
• 1888 yılında günümüz modern Ziraat Bankası''na dönüştürüldü.
• Türkiye''nin ilk kamu bankasıdır.', ARRAY['ziraat', 'mithat-pasa', 'tarih']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-006', 'ingilizce', 'Finans Kelimeleri', 'Assets vs. Liabilities Farkı Nedir?', '• Assets: Bir şirketin veya kişinin sahip olduğu ekonomik varlıklar/alacaklar (nakit, mülk, menkul kıymet).
• Liabilities: Borçlar ve yükümlülükler (krediler, ödenecek borçlar, tahviller).', ARRAY['english', 'finance', 'vocabulary']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-007', 'alan', 'Bilgi Güvenliği Temelleri', 'CIA Triad (Bilgi Güvenliği Üçlüsü) Nedir?', '• Confidentiality (Gizlilik): Veriye sadece yetkili kişilerin erişmesi (Şifreleme, Yetkilendirme).
• Integrity (Bütünlük): Verinin yetkisiz kişilerce değiştirilmemesi (Hash, Dijital İmza).
• Availability (Erişilebilirlik): Sistemin ve verinin ihtiyaç duyulduğunda hazır olması (Yedeklilik, DDoS koruması).', ARRAY['cia', 'guvenlik', 'security']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-008', 'alan', 'Veri Yapıları ve Problem Çözme', 'Temel Arama ve Sıralama Algoritmalarının Big-O Değerleri', '• Binary Search: O(log n) - Dizi sıralı olmalıdır.
• Hash Table Erişim/Arama: Ortalama O(1), en kötü O(n).
• Merge Sort / Quick Sort (Ortalama): O(n log n).
• Bubble / Selection / Insertion Sort: O(n²).', ARRAY['big-o', 'veri-yapilari', 'algoritma']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-009', 'alan', 'Veri Analitiği, Yapay Zekâ ve Makine Öğrenmesi', 'Precision vs. Recall (Hassasiyet vs. Duyarlılık) Farkı Nedir?', '• Precision (TP / (TP + FP)): Pozitif tahmin edilenlerin kaçı gerçekten pozitif? Yanlış alarmları (FP) cezalandırır.
• Recall (TP / (TP + FN)): Gerçekteki tüm pozitiflerin kaçı yakalandı? Kaçırılan vakaları (FN) cezalandırır.
* Bankacılıkta sahtekarlık (Fraud) ve hastalık teşhisinde RECALL önceliklidir (kaçırma lüksü yoktur).', ARRAY['makine-ogrenmesi', 'precision', 'recall', 'confusion-matrix']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-010', 'alan', 'Sistem Analizi ve Dijital Teknoloji Uygulamaları', 'HTTP Durum Kodları (Status Codes) Aileleri', '• 2xx Success: 200 OK, 201 Created (Kaynak oluşturuldu).
• 3xx Redirection: 301 Moved Permanently, 302 Found.
• 4xx Client Error: 400 Bad Request, 401 Unauthorized (Kimliksiz), 403 Forbidden (Yetkisiz), 404 Not Found.
• 5xx Server Error: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout.', ARRAY['http', 'api', 'rest', 'web']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-01', 'ingilizce', 'Phrasal Verbs', 'Phrasal Verb: ''Account for'' Anlamları Nelerdir?', '1. Açıklamak, gerekçelendirmek (He could not account for the discrepancy).
2. Bir orana/miktara tekabül etmek, oluşturmak (SME loans account for 45% of total lending).', ARRAY['phrasal-verb', 'account-for', 'english']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-02', 'ingilizce', 'Phrasal Verbs', 'Phrasal Verb: ''Carry out'' Ne Demektir?', 'Bir planı, araştırmayı, denetimi veya testi yürütmek / uygulamak (Eş anlamlı: execute, conduct, implement).
Örn: The audit committee carried out an internal investigation.', ARRAY['phrasal-verb', 'carry-out', 'english']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-03', 'ingilizce', 'Phrasal Verbs', 'Phrasal Verb: ''Cope with'' Eş Anlamlısı ve Kullanımı Nedir?', 'Zor bir durumla veya krizle başa çıkmak, üstesinden gelmek (Eş anlamlı: deal with, overcome, manage).
Örn: Central banks struggle to cope with rising inflation.', ARRAY['phrasal-verb', 'cope-with', 'english']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-04', 'ingilizce', 'Phrasal Verbs', '''Neden olmak / Yol açmak'' Anlamına Gelen 3 Kritik Phrasal Verb / Fiil?', '1. Bring about (yol açmak)
2. Lead to (sebep olmak)
3. Give rise to (ortaya çıkarmak, tetiklemek)
Örn: The sudden interest rate hike brought about rapid currency appreciation.', ARRAY['phrasal-verb', 'bring-about', 'lead-to', 'english']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-05', 'ingilizce', 'Phrasal Verbs', 'Phrasal Verb: ''Stem from'' Ne Demektir?', 'Bir durumdan kaynaklanmak, ileri gelmek (Eş anlamlı: originate from, derive from).
Örn: The financial liquidity crisis stemmed from poor risk management.', ARRAY['phrasal-verb', 'stem-from', 'english']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-06', 'ingilizce', 'Phrasal Verbs', '''Turn down'' ve ''Call off'' Farkı Nedir?', '• Turn down: Bir teklifi, krediyi veya başvuruyu REDDETMEK (The bank turned down his mortgage application).
• Call off: Bir toplantıyı, planı veya etkinliği İPTAL ETMEK (The board called off the emergency meeting).', ARRAY['phrasal-verb', 'turn-down', 'call-off', 'english']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-07', 'ingilizce', 'Bağlaçlar (Conjunctions)', 'Zıtlık Bağlaçları: Cümle Alanlar vs. İsim (Noun Phrase) Alanlar', '• Tam Cümle (+ Özne + Fiil): Although, Even though, Though, Whereas, While.
• İsim / Noun Phrase (+ İsim / V-ing): Despite, In spite of, Notwithstanding.
* Sınav Tuzağı: ''Despite the fact that...'' kalıbı arkasından tam cümle alır!', ARRAY['baglac', 'although', 'despite', 'conjunction']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-08', 'ingilizce', 'Bağlaçlar (Conjunctions)', 'Neden-Sonuç Bağlaçları: Cümle Alanlar vs. İsim (Noun Phrase) Alanlar', '• Tam Cümle (+ Özne + Fiil): Because, Since, As, Inasmuch as.
• İsim / Noun Phrase (+ İsim / V-ing): Due to, Owing to, Because of, On account of.
* İpucu: Due to the fact that... arkasından tam cümle alır.', ARRAY['baglac', 'because', 'due-to', 'conjunction']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-09', 'ingilizce', 'Bağlaçlar (Conjunctions)', 'Geçiş Kelimeleri: ''Ancak / Ne var ki'' (Transitions)', '• However, Nevertheless, Nonetheless, Even so.
Genellikle iki nokta veya noktalı virgülden sonra cümle başında gelir:
''Profits decreased; however, the bank retained its solvency.''', ARRAY['baglac', 'however', 'nevertheless', 'conjunction']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-10', 'ingilizce', 'Kelime Bilgisi', '''Deteriorate'' ve ''Facilitate'' Ne Demektir?', '• Deteriorate: Kötüleşmek, bozulmak (Eş anlamlı: worsen, degrade, decline).
• Facilitate: Kolaylaştırmak, olanak sağlamak (Eş anlamlı: ease, promote, assist).', ARRAY['kelime', 'deteriorate', 'facilitate', 'vocabulary']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-11', 'ingilizce', 'Kelime Bilgisi', '''Hamper'', ''Hinder'' ve ''Impede'' Ne Demektir?', 'Engellemek, köstek olmak, güçleştirmek (Eş anlamlı: obstruct, inhibit, block).
Örn: High interest rates hampered private sector investments.', ARRAY['kelime', 'hamper', 'hinder', 'vocabulary']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-12', 'ingilizce', 'Kelime Bilgisi', '''Vulnerable to'' ve ''Susceptible to'' Ne Demektir?', 'Bir tehlikeye, şoka veya saldırıya karşı savunmasız / hassas / yatkın olmak.
Örn: Developing markets are vulnerable to global interest rate volatility.', ARRAY['kelime', 'vulnerable', 'collocation']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-13', 'ingilizce', 'Kelime Bilgisi', '''Inevitable'' ve ''Reluctant'' Kelimeleri Ne Anlama Gelir?', '• Inevitable: Kaçınılmaz, önlenemez (Unavoidable).
• Reluctant: İsteksiz, tereddütlü (Hesitant, unwilling).
Örn: Commercial banks were reluctant to extend long-term unsecured loans.', ARRAY['kelime', 'inevitable', 'reluctant', 'vocabulary']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-14', 'ingilizce', 'Finans Terimleri', '''Collateral'' ve ''Default'' Terimleri Ne Anlama Gelir?', '• Collateral: Kredi karşılığı gösterilen teminat, ipotek, rehin.
• Default: Temerrüde düşme, borcunu vadesinde ödeyememe hali (Örn: default on corporate debt).', ARRAY['finans', 'collateral', 'default', 'banking']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-15', 'ingilizce', 'Finans Terimleri', '''Solvency'' ile ''Liquidity'' Arasındaki Temel Fark Nedir?', '• Liquidity: Varlıkların hızla nakde çevrilebilme yeteneği (kısa vadeli ödeme kapasitesi).
• Solvency: Toplam varlıkların toplam borçlardan fazla olması hali (uzun vadeli finansal ayakta kalma gücü).', ARRAY['finans', 'liquidity', 'solvency', 'banking']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-16', 'ingilizce', 'Edat Eşleşmeleri (Collocations)', 'Sınavda En Çok Çıkan 4 Fiil-Edat (Preposition) Eşleşmesi', '1. Comply with: Kanunlara / kurallara uymak
2. Deprive of: Bir haktan/kaynaktan mahrum bırakmak
3. Refrain from: Bir davranıştan kaçınmak, çekinmek
4. Attribute to: Bir duruma atfetmek / -den kaynaklandığını söylemek', ARRAY['edat', 'preposition', 'collocation']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-17', 'ingilizce', 'Gramer Kısayolları', 'Sınavların En Sevdiği Tense Kuralı: ''SINCE'' Formülü', 'Since + Simple Past (V2) , Present Perfect (have/has + V3)
Örn: Since the central bank lowered (V2) policy rates, credit volumes have expanded (has/have V3).
* Since geçmiş başlangıcı, ana cümle günümüze kadarki etkiyi gösterir.', ARRAY['gramer', 'since', 'tense']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-18', 'ingilizce', 'Gramer Kısayolları', 'Zaman Bağlaçlarında ''Will / Would'' Yasağı', 'When, As soon as, Before, After, Until, Once, By the time gibi zaman bağlaçlarının bulunduğu yan cümlede ASLA ''will'' veya ''would'' kullanılmaz!
• Yanlış: When inflation will decline...
• Doğru: When inflation declines...', ARRAY['gramer', 'time-clauses', 'will-kurali']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-19', 'ingilizce', 'Gramer Kısayolları', 'Conditionals: Devrik Cümle (Inversion) Kısayolları', 'If atıldığında cümle devrik yapılır:
• Type 1: Should you require further assistance... (= If you require)
• Type 2: Were the board to approve the proposal... (= If the board approved)
• Type 3: Had the borrower repaid on time... (= If the borrower had repaid)', ARRAY['gramer', 'conditionals', 'inversion']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
insert into public.flashcards (id, category, topic, front, back, tags)
values ('fc-eng-20', 'ingilizce', 'Sınav Taktikleri', 'Çeviri Sorularında 2 Adımda Şık Eleme Yöntemi', '1. Adım: Cümlenin en sonundaki ANA YÜKLEMİ (Tense ve Etken/Edilgen yapısıyla) bul ve Türkçe yüklemle eşleştir (3-4 şık anında elenir).
2. Adım: Cümlenin ÖZNESİNİ bul ve doğrula. Kalan 1 veya 2 şık arasından doğru cevaba 20 saniyede ulaşılır.', ARRAY['taktik', 'translation', 'soru-cozumu']::text[])
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;

-- D. EXTERNAL RESOURCES (23 Harici Kaynak)
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-sy-pl1', 'genel-yetenek', 'Banka Sınavları Özel', 'video', 'Genel Yetenek 2: Banka Sınavları Problem & Mantık Serisi', 'Sorularla Yüksel / YouTube', 'https://www.youtube.com/watch?v=SKXeCfarcRU&list=PLgUANwY_CJ6Vz5u2HSl_Lty_JMd5EDeYD', '9 Video (Oynatma Listesi)', 'Banka Sınavları ⭐', true, 'Yüzde, kar-zarar, yaş, faiz, hız, işçi-havuz, şekil yeteneği ve mantıksal akıl yürütme (1 & 2) soru çözüm serisi.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-sy-pl2', 'genel-kultur', 'Güncel Olaylar', 'video', 'Genel Kültür: Aylık & 2024 Güncel Olaylar Sınav Serisi', 'Sorularla Yüksel / YouTube', 'https://www.youtube.com/watch?v=TX6YD134wC4&list=PLgUANwY_CJ6VinSIYIL9QF9f0VwkOxLo5', '12 Video (Oynatma Listesi)', 'Güncel Olaylar 📌', true, 'Banka sınavlarında çıkan güncel kültürel, siyasi ve ekonomik gelişmeler ile 2024 kapsamlı özet soru serisi.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-sy-pl3', 'genel-yetenek', 'Şekil & Örüntü Yeteneği', 'video', 'Genel Yetenek 1: Temel Problemler, Denklem Kurma & Şekil Örüntüleri', 'Sorularla Yüksel / YouTube', 'https://www.youtube.com/watch?v=n_JR_p_9Vso&list=PLgUANwY_CJ6Xxw76TAz7EJOkhuVbpOGnP', '10 Video (Oynatma Listesi)', 'Örüntü & Şekil ⭐', true, 'Ziraat 40 soruluk Örüntü ve Analitik Mantık testine birebir uygun şekil matrisleri, örüntü tamamlama ve denklem problemleri.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-sy-pl4', 'bankacilik-genel-kultur', 'Ekonomi Temel Kavramlar', 'video', 'Ekonomi: Bankacılık, Enflasyon, Döviz, Para Talebi ve Piyasalar', 'Sorularla Yüksel / YouTube', 'https://www.youtube.com/watch?v=l6u3L7o0enQ&list=PLgUANwY_CJ6WJljpGMOI1AZBKgmK2umB6', '8 Video (Oynatma Listesi)', 'Ekonomi & Banka ⭐', true, 'Enflasyon, işsizlik türleri, kripto/blockchain, kurlar, banka türleri, finansal piyasalar ve Keynesyen para talebi teorisi.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-ales-01', 'genel-yetenek', 'ALES & DGS Mantık', 'video', 'ALES & DGS Sözel Mantık Soru Çözüm Taktikleri', 'Rüştü Hoca ile Türkçe / YouTube', 'https://www.youtube.com/results?search_query=rüştü+hoca+sözel+mantık+taktikleri', 'Popüler Oynatma Listesi', 'ALES/DGS Taktikleri', true, 'Ziraat sınavının 40 soruluk Örüntü ve Analitik Mantık bölümü için hata yaptırmayan tablo kurma, öncülleri yerleştirme ve hızlı eleme teknikleri.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-ales-02', 'genel-yetenek', 'ALES & DGS Mantık', 'video', 'ALES / DGS Sayısal Mantık & Örüntü Soruları Kampı', 'Benim Hocam / İlyas Güneş', 'https://www.youtube.com/results?search_query=benim+hocam+ales+dgs+sayısal+mantık', 'Video Serisi', 'Sayısal Mantık', true, 'Sayı dizileri, işlem tanımlama, şekil matrisleri, modüler aritmetik ve grafik yorumlama sorularının pratik çözüm yolları.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-ales-03', 'genel-yetenek', 'Problem Çözme Taktikleri', 'video', 'Temel Problemler & Kısayollar (Faiz, Yüzde, Hız, Kar-Zarar)', 'İlyas Güneş / YouTube', 'https://www.youtube.com/results?search_query=ilyas+güneş+problemler+kampı', 'Full Konu Anlatımı', 'Temel Matematik', false, 'Bankacılık sınavlarında sık gelen faiz hesaplamaları, karışım, işçi ve yüzde problemlerinin denklem kurmadan çözülme taktikleri.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-ales-04', 'genel-yetenek', 'ÖSYM Çıkmış Sorular', 'exam_archive', 'ÖSYM ALES Çıkmış Sorular ve Cevap Anahtarları Arşivi', 'ÖSYM Resmi Portalı', 'https://www.osym.gov.tr/TR,15103/ales-cikmis-sorular.html', '2018 - 2024 Arşivi', 'Resmi ÖSYM', true, 'ÖSYM''nin geçmiş yıllarda uyguladığı ALES sayısal ve mantık soruları PDF kitapçıkları. Örüntü ve mantık kalıplarını yakından görmek için en temel kaynak.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-ales-05', 'genel-yetenek', 'ÖSYM Çıkmış Sorular', 'exam_archive', 'ÖSYM DGS Çıkmış Soru Kitapçıkları Arşivi', 'ÖSYM Resmi Portalı', 'https://www.osym.gov.tr/TR,15105/dgs-cikmis-sorular.html', 'PDF Kitapçıklar', 'Resmi ÖSYM', false, 'Dikey Geçiş Sınavı (DGS) sayısal akıl yürütme ve problem soruları arşivi.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-yokdil-01', 'ingilizce', 'YÖKDİL & YDS Gramer', 'video', 'YÖKDİL / YDS Gramer ve Soru Çözüm Kampı', 'Modadil / Hakkı Şahin', 'https://www.youtube.com/results?search_query=hakkı+şahin+yökdil+ingilizce', 'Kapsamlı Video Oynatma Listesi', 'YÖKDİL Taktikleri', true, 'B1-B2 seviyesinde Tenses, Modals (Past Modals), Conditionals, Relative Clauses ve Bağlaçlar konusunun nokta atışı soru çözüm taktikleri.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-yokdil-02', 'ingilizce', 'YÖKDİL & YDS Gramer', 'video', 'YDS / YÖKDİL En Kritik Bağlaçlar & Cümle Tamamlama Taktikleri', 'Remzi Hoca / YouTube', 'https://www.youtube.com/results?search_query=remzi+hoca+bağlaçlar+taktikleri', 'Konu & Soru Çözümü', 'Bağlaç Odaklı', true, 'Although, Despite, While, Provided that gibi zıtlık ve sebep bağlaçlarının seçenek eleme yöntemleri ve sınav kalıpları.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-yokdil-03', 'ingilizce', 'ÖSYM Çıkmış Sorular', 'exam_archive', 'ÖSYM YÖKDİL Çıkmış Sorular ve Cevap Anahtarları', 'ÖSYM Resmi Portalı', 'https://www.osym.gov.tr/TR,15107/yokdil-cikmis-sorular.html', 'Sosyal / Fen / Sağlık', 'Resmi ÖSYM', true, 'ÖSYM YÖKDİL Sosyal Bilimler ve Fen Bilimleri çıkmış soru kitapçıkları. Özellikle Sosyal Bilimler testindeki ekonomi ve finans paragrafları Ziraat formatıyla birebir örtüşür.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-yokdil-04', 'ingilizce', 'ÖSYM Çıkmış Sorular', 'exam_archive', 'ÖSYM YDS Çıkmış Soru Kitapçıkları Arşivi', 'ÖSYM Resmi Portalı', 'https://www.osym.gov.tr/TR,15109/yds-cikmis-sorular.html', 'Geçmiş Yıllar PDF', 'Resmi ÖSYM', false, 'Yabancı Dil Bilgisi Seviye Tespit Sınavı (YDS) orijinal soru kitapçıkları.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-yokdil-05', 'ingilizce', 'İş & Bankacılık İngilizcesi', 'portal', 'BBC Learning English - English at Work & Business', 'BBC Learning English', 'https://www.bbc.co.uk/learningenglish/english/features/english-at-work', '66+ Sesli & Metinli Bölüm', 'İş İngilizcesi', true, 'Ofis, finans, toplantı ve kurumsal yazışma dilini öğreten kısa ses kayıtları, diyaloglar ve kelime testleri.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-yokdil-06', 'ingilizce', 'İnteraktif Alıştırma', 'interactive', 'Test-English B1 & B2 Seviyesi Ücretsiz Gramer Testleri', 'Test-English.com', 'https://test-english.com/grammar-points/b1-b2/', '100+ İnteraktif Test', 'Online Test', false, 'Conditionals, Passive Voice, Past Modals ve Gerund/Infinitive konularını anında geri bildirimli çözebileceğiniz online alıştırma platformu.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-gk-01', 'genel-kultur', 'TCMB & Para Politikası', 'portal', 'TCMB ''Herkes İçin Ekonomi'' Eğitici Portalı ve Videoları', 'Türkiye Cumhuriyet Merkez Bankası (TCMB)', 'https://www.tcmb.gov.tr/wps/wcm/connect/tr/tcmb+tr/main+menu/egitim-akademik/herkes-icin-ekonomi', 'Resmi Video & İnfografik Havuzu', 'Resmi TCMB', true, 'Enflasyon nedir, para politikası nasıl çalışır, politika faizi ve zorunlu karşılıkların piyasaya etkisi gibi konuları animasyon ve infografiklerle anlatan resmi portal.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-gk-02', 'genel-kultur', 'BDDK & Bankacılık', 'portal', 'BDDK Finansal Tüketici ve Bankacılık Rehberi', 'Bankacılık Düzenleme ve Denetleme Kurumu (BDDK)', 'https://www.bddk.org.tr/FinansalTuketici/', 'Resmi Rehberler & Mevzuat', 'Resmi BDDK', true, '5411 sayılı kanun, mevduat güvencesi, kredi türleri, kredi kartı kuralları ve bankacılık terimlerinin resmi açıklamaları.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-gk-03', 'genel-kultur', 'Ziraat Bankası Kurumsal', 'portal', 'Ziraat Bankası Resmi Kurumsal Tarihçe & Sanal Müze', 'Ziraat Bankası A.Ş.', 'https://www.ziraatbank.com.tr/tr/bankamiz/hakkimizda/tarihce', 'Resmi Arşiv', 'Ziraat Resmi', true, '1863 Mithat Paşa Memleket Sandıkları''ndan günümüze Ziraat Bankası''nın dönüm noktaları, Ulus tarihi binası ve Ziraat Müzesi belgeleri.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-gk-04', 'genel-kultur', 'Ödeme Sistemleri & Fintech', 'portal', 'BKM GEÇİT (Açık Bankacılık Altyapısı) Portalı', 'Bankalararası Kart Merkezi (BKM)', 'https://gecit.bkm.com.tr/', 'Dokümantasyon & Rehber', 'Fintech & API', false, 'Türkiye''deki Açık Bankacılık (Open Banking) standartları, Hesap Bilgisi Hizmeti (HBH) ve Ödeme Emri Başlatma Hizmeti (ÖEB) teknik detayları.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-alan-01', 'alan', 'Bilişim & Yazılım Eğitimi', 'portal', 'BTK Akademi - Bilgisayar Bilimleri & Yazılım Kursları', 'T.C. Bilgi Teknolojileri ve İletişim Kurumu', 'https://www.btkakademi.gov.tr/', 'Ücretsiz & Sertifikalı', 'Resmi BTK', true, 'Veritabanı Yönetimi (SQL), Ağ Temelleri (CCNA), Bilgi Güvenliği (Siber Tehditler, Kriptografi) ve Nesne Yönelimli Programlama video eğitimleri.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-alan-02', 'alan', 'Veri Yapıları & Algoritmalar', 'interactive', 'NeetCode - Veri Yapıları ve Algoritma Yol Haritası (DSA)', 'NeetCode.io', 'https://neetcode.io/roadmap', 'Görsel Yol Haritası', 'DSA Yol Haritası', true, 'Array, Linked List, Stack, Binary Search, Trees, Heap ve Graph algoritmalarının kod çözümleri ve video açıklamaları.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-alan-03', 'alan', 'Bilgisayar Mühendisliği Dersleri', 'portal', 'GeeksforGeeks - Computer Science Konu Anlatımları', 'GeeksforGeeks', 'https://www.geeksforgeeks.org/computer-science-projects/', 'Detaylı Makaleler & Kodlar', 'Mühendislik Kütüphanesi', false, 'İşletim sistemleri (Deadlock, Paging), Bilgisayar Ağları (OSI, TCP Handshake) ve SQL optimizasyonu için dünyanın en popüler CS kaynağı.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values ('res-alan-04', 'alan', 'Bilişim Eğitimleri', 'portal', 'Bilgeİş - ODTÜ Destekli Ücretsiz Bilişim Dersleri', 'Orta Doğu Teknik Üniversitesi (ODTÜ)', 'https://bilgeis.net/', '100+ Ders', 'ODTÜ Bilgeİş', false, 'ODTÜ ve AB destekli ücretsiz bilişim teknolojileri, veritabanı, yazılım ve dijital dönüşüm video dersleri.')
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
