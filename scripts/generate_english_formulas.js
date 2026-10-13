// ==============================================================================
// GENERATE ENGLISH FORMULAS & LOGIC TRAINER DATA
// Generates data/english_formulas.json with full 10-step pedagogy & 8-step algorithm
// ==============================================================================

const fs = require('fs');
const path = require('path');

const formulasData = {
  meta: {
    title: "İngilizce Sınavı İçin Mantık Odaklı Formül ve Soru Çözme Eğitmeni",
    description: "Yalnızca kural ezberletmeyen, kuralların neden ve nasıl çalıştığını mantığıyla öğreten ve çoktan seçmeli sınavlarda şık eleten akıllı formül rehberi.",
    version: "1.0.0",
    totalFormulas: 28,
    totalPrimers: 8,
    algorithmSteps: 8
  },

  // 1. TEMEL KAVRAMLAR ATÖLYESİ (Foundation Primers)
  primers: [
    {
      id: "primer-svo",
      title: "1. Özne, Fiil, Nesne ve Tümleç (S-V-O Yapısı)",
      badge: "Cümle Omurgası",
      icon: "fa-cubes",
      summary: "Türkçe 'Ali elmayı yedi' (Özne-Nesne-Fiil) derken, İngilizce 'Ali yedi elmayı' (S-V-O) der. Fiil öznenin hemen arkasından gelmek ZORUNDADIR.",
      logic: `İngilizcede ekler (ismin -i hali, -de hali gibi çekim ekleri) çok kısıtlıdır. Bu yüzden kimin kimi etkilediğini anlamanın TEK yolu kelime sırasıdır. 
      Örnek:
      • "The cat chased the dog" (Kedi köpeği kovaladı)
      • "The dog chased the cat" (Köpek kediyi kovaladı)
      Kelime sırası değiştiği an cümlenin faili değişir! Sınavda boşluk gördüğünde ilk soru: 'Bu cümlenin öznesi nerede, fiili nerede?' olmalıdır.`,
      breakdown: [
        { term: "Subject (Özne)", desc: "Eylemi yapan veya durumun sahibi (I, You, The bank, Inflation)." },
        { term: "Verb (Fiil)", desc: "Eylemi veya durumu bildiren motor güç (invests, increased, is)." },
        { term: "Object (Nesne)", desc: "Fiilden doğrudan etkilenen varlık (interest rates, the report)." },
        { term: "Complement / Adverbial (Tümleç / Zarf)", desc: "Eylemin nerede, ne zaman, nasıl olduğunu belirten ek bilgi (yesterday, significantly)." }
      ],
      quickCheck: {
        question: "'The central bank _______ interest rates yesterday.' cümlesinde eksik olan temel parça nedir?",
        options: ["Özne (Subject)", "Fiil (Verb)", "Nesne (Object)", "Zaman Zarfı (Time)"],
        correctIndex: 1,
        explanation: "Özne 'The central bank', nesne 'interest rates', zaman zarfı 'yesterday' mevcuttur. Cümlenin kalbi olan 'Fiil (Verb)' eksiktir!"
      }
    },
    {
      id: "primer-word-classes",
      title: "2. Sözcük Türleri: İsim, Sıfat, Zarf ve Edat",
      badge: "Sözcük Rolleri",
      icon: "fa-shapes",
      summary: "Bir kelimenin anlamını bilmesen bile cümledeki yerinden onun isim mi, sıfat mı, zarf mı olduğunu anlayabilirsin.",
      logic: `Sınavlarda boşluk doldururken kelimenin sözlük anlamından önce 'türü' şıkları eler:
      1. İsim (Noun): Varlıkların adı. Özne veya nesne konumunda bulunur. (-tion, -ment, -ness ile biter).
      2. Sıfat (Adjective): İsmi niteler. DAİMA isimden önce gelir! ('a successful investment').
      3. Zarf (Adverb): Fiili, sıfatı veya başka bir zarfı niteler. Genellikle '-ly' ile biter ('dramatically increased').
      4. Edat (Preposition): İsimlerin önüne gelerek yön, zaman veya konum bağı kurar ('in the market', 'at 5 PM').`,
      breakdown: [
        { term: "İsim (Noun)", desc: "Neyi / Kimi? sorusuna cevap verir. Örn: Decision, Development." },
        { term: "Sıfat (Adjective)", desc: "Nasıl bir isim? sorusuna cevap verir. Örn: Rapid growth, Efficient staff." },
        { term: "Zarf (Adverb)", desc: "Nasıl / Ne kadar yapıldı? sorusuna cevap verir. Örn: Grew rapidly, extremely hard." },
        { term: "Edat (Preposition)", desc: "Kendisinden sonra daima bir isim veya V-ing ister! Örn: before signing, in 2026." }
      ],
      quickCheck: {
        question: "'The manager handled the crisis _______.' Boşluğa hangi sözcük türü gelmelidir?",
        options: ["Sıfat (careful)", "Zarf (carefully)", "İsim (carefulness)", "Edat (with)"],
        correctIndex: 1,
        explanation: "'handled' (yönetti) fiilini niteleyeceğimiz için bir eylemin nasıl yapıldığını bildiren ZARF (carefully) gelmelidir."
      }
    },
    {
      id: "primer-aux-vs-main",
      title: "3. Yardımcı Fiil ile Ana Fiil Arasındaki Fark",
      badge: "Motor vs Yük Vagonu",
      icon: "fa-gears",
      summary: "Yardımcı fiil (Auxiliary) zaman ve kip yükünü taşır; Ana fiil (Main Verb) ise cümlenin asıl anlamını bildirir.",
      logic: `Türkçede 'gidi-yor-du-m' derken tüm zaman eklerini ana fiilin sonuna yapıştırırız. İngilizce ise yükü böler:
      • Yardımcı fiil (do/does/did, am/is/are, have/has/had, will, can, must): Zamanı, tekillik-çoğulluğu ve olumsuzluk ekini (not) sırtlanır.
      • Ana fiil: Anlamı söyler. Yardımcı fiil zaman yükünü sırtlandığında, ana fiil yükten kurtulup YALIN (V1) hale döner!
      Örnek:
      - 'She goes' (Yardımcı fiil yok, fiil 'es' takısını kendisi taşıyor).
      - 'She DOES not GO' ('does' ortaya çıktı, yükü aldı, 'go' rahatlayıp V1 oldu).
      - 'She DID not GO' ('did' geçmişi aldı, 'go' yine V1 kaldı).`,
      breakdown: [
        { term: "Yardımcı Fiil (Auxiliary)", desc: "be (am/is/are/was/were), do (do/does/did), have (have/has/had) ve Modallar (can, must, will)." },
        { term: "Ana Fiil (Main Verb)", desc: "Eylemin sözlük anlamı: eat, analyze, approve, sign." },
        { term: "Altın Kural", desc: "Bir cümlede zaman yükü İKİ KERE taşınmaz! 'Did went' asla denmez, 'did go' denir!" }
      ],
      quickCheck: {
        question: "Aşağıdaki cümlelerin hangisinde yardımcı fiil - ana fiil kuralı çiğnenmiştir?",
        options: ["She did not understand the instructions.", "Did they signed the contract yesterday?", "We do not accept cash payments.", "Will the bank reduce the rates?"],
        correctIndex: 1,
        explanation: "'Did' zaten geçmiş zaman yükünü taşımaktadır; arkasından gelen fiil V1 (sign) olmalıydı. 'Did they signed' ağır bir gramer hatasıdır!"
      }
    },
    {
      id: "primer-v1-v2-v3",
      title: "4. V1, V2, V3 ve V-ing Ne Demektir?",
      badge: "Fiil Hallerinin Şifresi",
      icon: "fa-list-ol",
      summary: "V1 fiilin çıplak halidir. V2 sadece geçmiş zaman yüklemidir. V3 ve V-ing ise tek başına zaman bildirmez, birer sıfattır!",
      logic: `En büyük kafa karışıklığı V3'ü bir 'zaman' sanmaktır. V3 bir zaman DEĞİLDİR!
      • V1 (Base Form): Sözlük hali. Geniş zaman ve yardımcı fiillerden sonra kullanılır (go, take).
      • V2 (Past Simple): Tek başına geçmiş zaman yüklemidir. Sadece ve sadece geçmişte bitmiş eylemlerde kullanılır (went, took).
      • V3 (Past Participle): 'Yapılmış / Bitmiş' anlamına gelen bir SIFAT-FİİLDİR (broken = kırılmış, written = yazılmış). Tek başına cümle kuramaz! Yanına 'have/has' alırsa Present Perfect olur ('sahibim bitmiş eyleme'), yanına 'be' alırsa Passive olur ('kırılmış durumdayım').
      • V-ing (Present Participle / Gerund): 'Yapılmakta olan' veya 'eylemin adı'dır (running = koşan veya koşma eylemi). Yanına 'am/is/are' alırsa Continuous zaman olur.`,
      breakdown: [
        { term: "V1 (Yalın)", desc: "Modallardan ve do/does/did'den sonra gelen hafif, yüksüz hal." },
        { term: "V2 (Geçmiş)", desc: "Tek başına yüklem olabilen geçmiş form." },
        { term: "V3 (Participle)", desc: "Bitmişlik sıfatı. 'have + V3' (etki sürüyor) veya 'be + V3' (edilgen)." },
        { term: "V-ing (Süreç/İsim)", desc: "Süreç sıfatı veya fiilden türemiş isim (Reading is good)." }
      ],
      quickCheck: {
        question: "'The letter _______ by the director yesterday.' Cümlede 'was' olmadan doğrudan 'written' yazılabilir mi?",
        options: ["Evet, V3 tek başına geçmiş zaman yüklemi olabilir.", "Hayır, V3 tek başına yüklem olamaz; passive için 'was written' gerekir.", "Evet, yesterday olduğu için V3 yeterlidir.", "Hayır, V-ing yazılmalıdır."],
        correctIndex: 1,
        explanation: "V3 tek başına yüklem oluşturamaz. Cümlenin edilgen geçmiş zaman yüklemi olabilmesi için 'was written' (be + V3) şarttır!"
      }
    },
    {
      id: "primer-regular-irregular",
      title: "5. Düzenli ve Düzensiz Fiiller (Regular vs Irregular)",
      badge: "Biçim Mantığı",
      icon: "fa-spell-check",
      summary: "Düzenli fiiller -ed alır; düzensiz fiiller ise eski Cermen köklerinden gelen iç ses değişimine uğrar.",
      logic: `İngilizcede fiillerin %95'i düzenlidir ve sonuna -ed ekler (play -> played -> played). 
      Ancak günlük hayatta ve sınavlarda en çok karşımıza çıkan yaklaşık 150 fiil 'düzensizdir' (irregular).
      Burada dikkat edilecek sınav tuzağı:
      Bazı düzensiz fiillerin V1, V2 ve V3 halleri tamamen aynıdır (cut - cut - cut, put - put - put, cost - cost - cost).
      Örnek: 'The car cost 50,000 dollars.' -> 'car' tekil olmasına rağmen 'cost' fiilinde -s takısı yoksa, bu fiil V2 (geçmiş zaman) demektir!`,
      breakdown: [
        { term: "Düzenli (Regular)", desc: "-ed takısı alır: invest -> invested -> invested." },
        { term: "3 Hali Farklı", desc: "write -> wrote -> written / break -> broke -> broken." },
        { term: "V2 ve V3 Aynı", desc: "buy -> bought -> bought / find -> found -> found." },
        { term: "3 Hali de Aynı (Tuzak!)", desc: "cut, cost, let, set, hit, put, read (okunuşu red olur)." }
      ],
      quickCheck: {
        question: "'The company cut its budget last month.' Cümlesindeki 'cut' fiili hangi formdadır?",
        options: ["V1 (Geniş Zaman)", "V2 (Geçmiş Zaman)", "V3 (Sıfat-fiil)", "V-ing"],
        correctIndex: 1,
        explanation: "'The company' tekil bir öznedir; geniş zaman olsaydı 'cuts' olurdu. 'last month' geçmiş zaman ipucu olduğundan bu 'cut', V2 geçmiş zaman halidir."
      }
    },
    {
      id: "primer-sentence-types",
      title: "6. Olumlu, Olumsuz ve Soru Cümlesi Mimarisi",
      badge: "Sözdizim Şablonları",
      icon: "fa-code-branch",
      summary: "Olumsuz yapmak için yardımcı fiile 'not' ekle; soru sormak için yardımcı fiili öznenin ÖNÜNE fırlat!",
      logic: `İngilizcede soru cümlesi kurmak için Türkçedeki gibi cümlenin sonuna '-mı / -mi' eklenmez.
      Mekanizma şöyledir:
      1. Olumlu: [Özne] + [Yardımcı Fiil] + [Ana Fiil] + [Nesne] -> She has finished the project.
      2. Olumsuz: [Özne] + [Yardımcı Fiil + NOT] + [Ana Fiil] -> She has NOT finished the project.
      3. Soru: [Yardımcı Fiil] + [Özne] + [Ana Fiil] ? -> HAS she finished the project?
      Sınav İpucu: 'Wh-' sorularında (What, Where, Why, When) arkasından HEMEN yardımcı fiil gelmelidir:
      'Why did they cancel the meeting?' (Doğru) vs 'Why they canceled...?' (Yanlış - bu ancak Noun Clause içinde olur!).`,
      breakdown: [
        { term: "Olumlu Sırası", desc: "S + V + O (Özne + Fiil + Nesne)" },
        { term: "Olumsuz Sırası", desc: "S + Aux + not + Main Verb" },
        { term: "Doğrudan Soru", desc: "Aux + S + Main Verb ?" },
        { term: "Dolaylı Soru (Noun Clause)", desc: "I wonder [why they canceled...] -> Burada düz cümle sırasına döner!" }
      ],
      quickCheck: {
        question: "Hangisi gramer olarak DOĞRU bir doğrudan soru cümlesidir?",
        options: ["Where they did go yesterday?", "Where did they go yesterday?", "Where they went yesterday?", "Where did they went yesterday?"],
        correctIndex: 1,
        explanation: "Soru kalıbı: Wh-kelimesi + Yardımcı fiil (did) + Özne (they) + Ana fiil V1 (go). Yani 'Where did they go yesterday?'"
      }
    },
    {
      id: "primer-clauses",
      title: "7. Ana Cümle ve Yan Cümle (Main vs Subordinate Clause)",
      badge: "Cümle Hiyerarşisi",
      icon: "fa-network-wired",
      summary: "Bir bağlaç ile başlayan kısım YAN cümledir ve tek başına ayakta duramaz; onu tamamlayan bağımsız bir ANA cümle şarttır.",
      logic: `Sınavlarda uzun ve karmaşık görünen cümleleri çözmenin sırrı ikiye bölmektir:
      [Yan Cümle - Bağımlı] + [Ana Cümle - Bağımsız]
      Örnek:
      'Although the inflation rate increased significantly, the bank did not raise interest rates.'
      • 'Although the inflation rate increased...' = Yan cümle (Tek başına bırakırsan 'Enflasyon belirgin şekilde artmasına rağmen...' yarım kalır).
      • 'the bank did not raise interest rates' = Ana cümle (Tek başına tam bir yargı bildirir).
      Altın Sınav Kuralı: Boşluğun yan cümlede mi yoksa ana cümlede mi olduğuna bak. Yan cümlelerde 'will / would' genellikle KULLANILMAZ (Zaman ve şart bağlaçlarından hemen sonra)!`,
      breakdown: [
        { term: "Ana Cümle (Main Clause)", desc: "Kendi başına bağımsız anlam taşıyan temel gövde." },
        { term: "Yan Cümle (Subordinate)", desc: "Bağlaçla (Although, When, Because, If) başlayan tamamlayıcı parça." },
        { term: "Virgül Kuralı", desc: "Yan cümle başa gelirse ortaya VİRGÜL konur; ana cümle baştaysa virgüle gerek yoktur." }
      ],
      quickCheck: {
        question: "'When the new regulation _______, all accounts will be audited.' Boşluğa ne gelmelidir?",
        options: ["will take effect", "takes effect", "would take effect", "took effect"],
        correctIndex: 1,
        explanation: "'When' bir zaman bağlacıdır ve yan cümle oluşturur. Zaman bağlaçlarının arkasından gelecek zaman anlamı için 'will' değil, Present Simple (takes effect) gelir!"
      }
    },
    {
      id: "primer-word-order",
      title: "8. Kelime Sırası Neden Hayatidir?",
      badge: "Sözdizim Disiplini",
      icon: "fa-arrows-left-right",
      summary: "İngilizcede özne ile fiilin arasına gereksiz sözcük sokulmaz. Zaman ve yer zarfları en sona (veya vurgu için en başa) atılır.",
      logic: `Türkçede 'Dün bankaya erkenden gittim' de desen, 'Bankaya dün erkenden gittim' de desen anlaşılır çünkü ekler kimin ne yaptığını taşır.
      İngilizcede ise kelime sırası bozulursa cümle anlamsızlaşır:
      Standart Dizi: [ÖZNE] + [FİİL] + [NESNE] + [TARZ] + [YER] + [ZAMAN]
      (M-P-T Kuralı: Manner -> Place -> Time / Nasıl -> Nerede -> Ne zaman).
      Örnek:
      'The auditor checked the accounts carefully in the branch yesterday.'
      Özne (The auditor) + Fiil (checked) + Nesne (the accounts) + Tarz (carefully) + Yer (in the branch) + Zaman (yesterday).
      Fiil ile nesnenin arasına ASLA zarf sokulamaz! 'checked carefully the accounts' YANLIŞTIR!`,
      breakdown: [
        { term: "Temel Sıra", desc: "S (Özne) + V (Fiil) + O (Nesne)" },
        { term: "Zarf Sıralaması", desc: "Nasıl (Manner) -> Nerede (Place) -> Ne zaman (Time)" },
        { term: "Sınav Çeldiricisi", desc: "Fiil ile nesne arasına zarf koyan şıkları doğrudan ele!" }
      ],
      quickCheck: {
        question: "Aşağıdaki cümle dizilimlerinden hangisi İngilizce kurallarına TAM UYGUNDUR?",
        options: [
          "She speaks fluently English in meetings.",
          "She speaks English fluently in meetings.",
          "She speaks in meetings fluently English.",
          "Fluently she speaks in meetings English."
        ],
        correctIndex: 1,
        explanation: "Fiil (speaks) ile Nesne (English) arasına zarf giremez! Önce nesne gelir, ardından zarf (fluently) ve yer (in meetings) sıralanır."
      }
    }
  ],

  // 2. 8 ADIMLI SINAV SORUSU ÇÖZME ALGORİTMASI
  algorithm: {
    title: "8 Adımlı Sınav Sorusu Çözme Algoritması",
    description: "Sınavda bir gramer veya kelime sorusu gördüğünde panik yapmadan bu 8 adımı uygula; doğru şık kendiliğinden ortaya çıkacaktır.",
    steps: [
      {
        step: 1,
        name: "Soru Kökünü & Boşluğun Yerini Tara",
        action: "Cümleyi baştan sona hızlıca tara. Boşluk nerede? Ana cümlede mi, yan cümlede mi? Boşluk bir yüklem mi, bağlaç mı, edat mı istiyor?",
        tip: "Boşluğun önünde ve arkasında ne var? Virgül var mı? Tek bir cümle mi yoksa iki parça mı?",
        badHabit: "Tüm metni Türkçe'ye kelime kelime çevirmeye çalışmak zaman kaybettirir; önce yapısal pozisyonu gör."
      },
      {
        step: 2,
        name: "Zaman İpucu Ara (Tense Markers)",
        action: "Cümlede zaman bildiren bir zarf var mı? (yesterday, since 2010, so far, by the time, recently, next year, currently...)",
        tip: "Eğer açık bir zaman zarfı yoksa, cümlenin diğer tarafındaki fiile bak (Zaman Uyumu / Tense Agreement). Present bir cümlede durup dururken Past şıkkı seçilmez.",
        badHabit: "Yesterday görüp hemen Present Perfect seçmek (Yesterday kesin geçmiş ister, V2 gerektirir!)."
      },
      {
        step: 3,
        name: "Cümle Aktif mi Pasif mi? (Voice Check)",
        action: "Özne boşluktaki eylemi KENDİSİ Mİ YAPIYOR, yoksa o eylemden ETKİLENİYOR MU?",
        tip: "Boşluktan sonra bir NESNE var mı? Eğer geçişli bir fiilden sonra nesne yoksa ve 'by...' gibi bir ifade varsa cümle %95 PASİFTİR (be + V3).",
        badHabit: "Öznenin insan veya cansız olmasına aldanmak; bazen insan da pasif olabilir ('The applicant was rejected')."
      },
      {
        step: 4,
        name: "Bağlaç veya Yan Cümle Var mı?",
        action: "Cümlede 'Although, Because, When, If, While, Since' gibi bir bağlaç var mı? Yoksa iki cümleyi bağlamak için boşluğa bir bağlaç mı gerekiyor?",
        tip: "Bağlaç sorusuysa: Boşluktan sonra TAM CÜMLE (Özne+Fiil) mi geliyor, yoksa İSİM / V-ing mi geliyor? Bu ayrım şıkların yarısını eler!",
        badHabit: "Although ile Despite'ın ikisi de 'rağmen' diye Türkçeye çevrildiği için yapısal farkı unutmak."
      },
      {
        step: 5,
        name: "Boşluğun Önündeki Kelimeye Bak (Immediate Context)",
        action: "Boşluğun hemen solundaki kelime nedir? Bir edat mı (in, on, at, of)? Özel bir fiil mi (suggest, enjoy, decide)? Sıfat mı?",
        tip: "Edat varsa -> ardından V-ing gelir. 'decide/want' varsa -> 'to + V1' gelir. 'make/let' varsa -> çıplak 'V1' gelir.",
        badHabit: "Cümlenin bütününe dalıp hemen önündeki kilit tetikleyici kelimeyi gözden kaçırmak."
      },
      {
        step: 6,
        name: "Şıkları Yapısal Olarak Ele (Grammatical Elimination)",
        action: "Kurala uymayan şıkları tereddüt etmeden çiz! Gramer kurallarına göre imkansız kombinasyonları sil.",
        tip: "Örn: Past bir bağlaç varsa 'will'li şıkları ele. İsim öbeği gelmişse 'Although / Because' şıklarını ele. Tekil özneye 'have' verilmişse ele.",
        badHabit: "Kulağa hoş geldiği için gramer olarak imkansız olan şıkkı işaretlemek."
      },
      {
        step: 7,
        name: "Kalan Şıklarda Anlam & Mantık Kontrolü Yap",
        action: "Genellikle elenen şıklardan sonra 2 şık kalır. Şimdi bu 2 şıkkı cümleye koyup mantık ve neden-sonuç / zıtlık kontrolü yap.",
        tip: "Cümle olumlu bir sonuçla mı bitiyor yoksa olumsuz mu? 'Because' (neden) mi yoksa 'Although' (zıtlık) mı mantıklı oturuyor?",
        badHabit: "İlk eline geçen şıkkı işaretleyip diğer güçlü alternatifi kontrol etmemek."
      },
      {
        step: 8,
        name: "Neden Diğerleri Değil? (Çeldirici Sağlaması)",
        action: "Seçtiğin şıktan emin olmak için: Diğer 3-4 şıkkın neden kesinlikle YANLIŞ olduğunu tek bir cümleyle kendine açıkla.",
        tip: "'A şıkkı elendi çünkü zaman uyumsuzluğu var. C şıkkı elendi çünkü edattan sonra to V1 gelmez. D elendi çünkü pasif değil aktif.' Tamam, cevap kesinlikle B!",
        badHabit: "Aceleyle sonraki soruya atlayıp dikkatsizlik hatasını fark edememek."
      }
    ],

    // İnteraktif Simülatör Soruları (Adım adım rehberli çözüm)
    simulations: [
      {
        id: "sim-01",
        title: "Örnek 1: Zaman & Aktif/Pasif Soru Analizi",
        questionText: "The new digital banking system _______ by our IT department before the annual audit _______ last month.",
        options: [
          { text: "A) will be tested / began", isCorrect: false },
          { text: "B) has been tested / begins", isCorrect: false },
          { text: "C) had been tested / began", isCorrect: true },
          { text: "D) was testing / had begun", isCorrect: false }
        ],
        walkthrough: [
          { stepIndex: 1, title: "Adım 1: Boşlukların Yeri", text: "İki boşluk var. İlk boşluk ana cümlede ('The new digital banking system...'), ikinci boşluk ise 'before...' zaman bağlacının yan cümlesinde." },
          { stepIndex: 2, title: "Adım 2: Zaman İpucu", text: "'last month' (geçen ay) ipucu var! Demek ki tüm olay geçmişte (PAST) gerçekleşmiş. A şıkkındaki 'will be tested' ve B şıkkındaki 'has been tested / begins' (Present) anında elenir!" },
          { stepIndex: 3, title: "Adım 3: Aktif mi Pasif mi?", text: "İlk boşluktaki özne 'The new digital banking system' (sistem). Sistem kendi kendini test edemez; 'by our IT department' (IT departmanımız tarafından) denmiş. Yani İLK BOŞLUK KESİNLİKLE PASİF (be + V3) olmalıdır. D şıkkındaki 'was testing' aktiftir, elenir!" },
          { stepIndex: 4, title: "Adım 4: Bağlaç Analizi", text: "'before' bağlacı iki geçmiş eylemden birinin daha önce olduğunu gösterir. Before'un içi Past Simple (V2), ana cümle ise daha önce biten Past Perfect (had + V3) olur." },
          { stepIndex: 5, title: "Adım 5: Yapısal Eleme", text: "Kalan şıklar arasında C: 'had been tested' (Past Perfect Passive) ve 'began' (V2). Mükemmel uyum!" },
          { stepIndex: 6, title: "Adım 6-8: Sonuç & Sağlama", text: "Doğru Cevap: C! Sistem denetim başlamadan önce test edilmişti. Diğer şıkların hepsi ya zaman ya da pasiflik kuralından çöktü." }
        ]
      },
      {
        id: "sim-02",
        title: "Örnek 2: Bağlaç & Yapısal Eleme Analizi",
        questionText: "_______ experiencing severe market volatility, the investment fund achieved record profits this quarter.",
        options: [
          { text: "A) Although", isCorrect: false },
          { text: "B) Despite", isCorrect: true },
          { text: "C) Because", isCorrect: false },
          { text: "D) Therefore", isCorrect: false }
        ],
        walkthrough: [
          { stepIndex: 1, title: "Adım 1: Boşluğun Yeri", text: "Boşluk en başta. İki durumu birbirine bağlayan bir yapı arıyoruz." },
          { stepIndex: 2, title: "Adım 4 & 5: Boşluğun Sağına Bak!", text: "Boşluktan hemen sonra 'experiencing severe market volatility' (şiddetli piyasa oynaklığı tecrübe etme) gelmiş. ÖZNE VE FİİL YOK! Sadece 'V-ing + İsim Öbeği' var." },
          { stepIndex: 3, title: "Adım 6: Şıkları Yapısal Olarak Ele", text: "'Although' ve 'Because' kendisinden sonra TAM CÜMLE (Özne + Fiil) ister! Bu yüzden A ve C şıkları gramer olarak İMKANSIZDIR, doğrudan elenir! 'Therefore' ise iki bağımsız cümle arasında noktalama ile kullanılır, cümlenin başında tek başına V-ing alamaz." },
          { stepIndex: 4, title: "Adım 7: Anlam Kontrolü", text: "'Despite' (rağmen) kendisinden sonra İsim veya V-ing alır. Anlam: 'Şiddetli dalgalanmaya RAĞMEN rekor kâr elde etti.' Zıtlık anlamı kusursuz oturuyor." },
          { stepIndex: 5, title: "Adım 8: Çeldirici Sağlaması", text: "En büyük çeldirici 'Although' idi; ancak Although tam cümle isterdi ('Although it experienced...'). Boşluktan sonra V-ing olduğu için TEK GEÇERLİ SEÇENEK: B (Despite)!" }
        ]
      }
    ]
  },

  // 3. 7 KATEGORİ FORMÜL KÜTÜPHANESİ (A'dan G'ye - 10 Adımlı Detaylı Formüller)
  categories: [
    { id: "cat-tenses", name: "A. Zamanlar (Tenses)", icon: "fa-clock", count: 8 },
    { id: "cat-passive", name: "B. Passive Voice (Edilgen Yapı)", icon: "fa-shield-halved", count: 5 },
    { id: "cat-conjunctions", name: "C. Bağlaçlar (Conjunctions)", icon: "fa-link", count: 7 },
    { id: "cat-verbs", name: "D. Fiillerden Sonra Gelen Yapılar", icon: "fa-arrow-right-arrow-left", count: 4 },
    { id: "cat-clauses", name: "E. Relative Clauses & Yan Cümleler", icon: "fa-diagram-project", count: 3 },
    { id: "cat-prepositions", name: "F. Edatlar & Kelime Türleri", icon: "fa-font", count: 2 },
    { id: "cat-structures", name: "G. Karşılaştırmalar & Modals", icon: "fa-scale-balanced", count: 3 }
  ],

  formulas: [
    // --- KATEGORİ A: ZAMANLAR ---
    {
      id: "form-present-simple",
      catId: "cat-tenses",
      title: "Simple Present Tense (Geniş Zaman)",
      formula: "S + V1 / V(s/es)",
      purpose: "Genel gerçekleri, bankacılık kurallarını, bilimsel yasaları ve değişmeyen rutinleri ifade etmek için vardır. Anlık değil, evrensel ve kalıcı durumları anlatır.",
      parts: "Özne (I/You/We/They) için yalın fiil V1; tekil özneler (He/She/It/The Bank) için fiilin sonuna '-s/-es' gelir. Soru ve olumsuzlukta devreye 'do/does' girer ve fiil V1'e döner.",
      trComparison: "Türkçedeki '-r / -ar / -er' ekidir (yapar, çalışır). Ancak Türkçede şimdiki zaman eki '-yor' bazen genel gerçeklerde de kullanılır ('Dünya dönüyor'); İngilizcede genel gerçeklerde KESİNLİKLE 'is running' denmez, Simple Present kullanılır.",
      examples: [
        { en: "Central banks regulate the money supply.", tr: "Merkez bankaları para arzını düzenler. (Genel bankacılık kuralı - Kolay)" },
        { en: "The branch manager approves loan requests every Monday.", tr: "Şube müdürü her pazartesi kredi taleplerini onaylar. (Rutin - Orta)" },
        { en: "Whenever inflation rises, consumer confidence decreases.", tr: "Enflasyon ne zaman yükselse, tüketici güveni azalır. (Ekonomik kural / Sıfır Koşul - İleri)" }
      ],
      whyRightWrong: "Soru: 'Water _______ at 100°C.' Doğru: 'boils'. Yanlış: 'is boiling' (anlık değil, evrensel kural), 'boiled' (geçmişte kalmadı, her zaman geçerli).",
      examTips: "Cümlede 'always, usually, regularly, every year, generally, whenever' görüyorsan veya bir tanım / bilimsel yasa anlatılıyorsa ilk olarak Simple Present düşün.",
      traps: "Tekil özne tuzağı! 'The board of directors' (Yönetim kurulu) tekil kabul edilir ve fiil -s alır ('meets'). Ayrıca zaman bağlaçlarının (when, after) içinde gelecek zaman anlamında 'will' yerine Simple Present kullanılır!",
      miniQuiz: {
        question: "Economic indicators clearly show that high interest rates _______ investment in the manufacturing sector.",
        options: ["discouraged", "discourages", "discourage", "will be discouraged"],
        correctIndex: 2,
        explanation: "Özne 'high interest rates' (çoğul öznedir). Cümle genel bir ekonomik gerçeği ifade ettiği için Simple Present çoğul formu olan 'discourage' (V1) gelmelidir."
      },
      wrongAnalysis: "A'yı seçtiysen geçmiş zaman tuzağına düştün ('show' present iken sebepsiz past'a gidilmez). B'yi seçtiysen 'rates' çoğul öznesini tekil sanıp -s ekledin."
    },
    {
      id: "form-present-continuous",
      catId: "cat-tenses",
      title: "Present Continuous (Şimdiki Zaman & Değişen Trendler)",
      formula: "S + am/is/are + V-ing",
      purpose: "Konuşma anında gerçekleşen eylemleri veya şu sıralar devam eden geçici trendleri, artış/azalış eğilimlerini anlatır.",
      parts: "'am/is/are' yardımcı fiili şimdiki zamanı sırtlar; fiile eklenen '-ing' ise eylemin bir süreç halinde devam ettiğini gösterir.",
      trComparison: "Türkçedeki '-yor' ekidir. Ancak dikkat: İngilizcede düşünce, his ve sahiplik bildiren fiiller (Stative Verbs: know, believe, have, want, need) KESİNLİKLE -ing almaz!",
      examples: [
        { en: "The auditors are inspecting the financial statements right now.", tr: "Denetçiler şu anda mali tabloları inceliyor. (Anlık - Kolay)" },
        { en: "Digital banking adoption is increasing rapidly this year.", tr: "Dijital bankacılık benimsenmesi bu yıl hızla artıyor. (Trend - Orta)" },
        { en: "More and more customers are shifting to mobile transactions.", tr: "Gittikçe daha fazla müşteri mobil işlemlere geçiş yapıyor. (Dinamik süreç - İleri)" }
      ],
      whyRightWrong: "'I am knowing the answer' YANLIŞTIR; 'know' zihinsel durum bildirir, doğrusu 'I know'dur.",
      examTips: "'currently, at the moment, right now, nowadays, this quarter, gradually, increasingly' gibi kelimeler gördüğünde 'am/is/are + V-ing' güçlü adaydır.",
      traps: "Stative fiil tuzağı: 'The account belongs (is belonging DEĞİL) to our VIP client.'",
      miniQuiz: {
        question: "Due to recent technological innovations, the global payment landscape _______ at an unprecedented pace.",
        options: ["transforms", "is transforming", "transformed", "has transformed"],
        correctIndex: 1,
        explanation: "'at an unprecedented pace' (benzeri görülmemiş bir hızla) ifadesi devam eden dinamik bir dönüşüm sürecini vurgular; 'is transforming' en uygun yapıdır."
      },
      wrongAnalysis: "C'yi seçtiysen 'recent' ifadesini geçmiş sandın; recent genellikle present ile bağlantı kurar. A'yı seçtiysen statik bir durum sandın, oysa burada hızlı bir süreç vardır."
    },
    {
      id: "form-past-simple",
      catId: "cat-tenses",
      title: "Simple Past Tense (Geçmiş Zaman: did & V2)",
      formula: "S + V2 (Olumlu) / S + did not + V1 (Olumsuz/Soru)",
      purpose: "Geçmişte belirli bir zamanda BAŞLAMIŞ ve TAMAMEN BİTMİŞ olayları anlatır. Şimdiki zamanla hiçbir bağı kalmamıştır.",
      parts: "Olumlu cümlede düzenli fiiller '-ed' alır, düzensiz fiiller V2 olur. Olumsuz ve soruda 'did' zaman yükünü sırtlandığı için ana fiil YALIN (V1) hale döner!",
      trComparison: "Türkçedeki bilinen geçmiş zaman '-di / -ti' ekidir. İngilizcedeki en kritik fark: Cümlede geçmiş bir zaman noktası (in 2020, yesterday, ago) varsa Present Perfect ASLA kullanılamaz, V2 ZORUNLUDUR!",
      examples: [
        { en: "The company signed the merger agreement yesterday.", tr: "Şirket birleşme anlaşmasını dün imzaladı. (Kolay)" },
        { en: "Why did the financial regulators reject the proposal?", tr: "Mali denetleyiciler teklifi neden reddetti? ('did' geldi, 'reject' V1 oldu! - Orta)" },
        { en: "Founded in 1863, Ziraat Bank played a pivotal role in Turkish agriculture.", tr: "1863'te kurulan Ziraat Bankası, Türk tarımında hayati bir rol oynadı. (İleri)" }
      ],
      whyRightWrong: "'I have seen him yesterday' YANLIŞTIR! 'yesterday' geçmişte kapalı bir zamandır, doğrusu 'I saw him yesterday'dir.",
      examTips: "'yesterday, ... ago, in 1999, last week, during the Ottoman era, in the past' görürsen şıklarda hemen V2 (Simple Past) ara!",
      traps: "'did'den sonra fiile tekrar -ed takan veya V2 yapan şıklar (Örn: 'did signed') doğrudan elenmelidir!",
      miniQuiz: {
        question: "The Turkish Republic _______ its first national investment bank in 1925 to support industrialization.",
        options: ["has established", "established", "establishes", "had been establishing"],
        correctIndex: 1,
        explanation: "'in 1925' geçmişte kesin ve kapalı bir tarih bildirir. Bu tür net geçmiş tarihlerde daima Simple Past (V2) kullanılır: 'established'."
      },
      wrongAnalysis: "A'yı (has established) seçtiysen en yaygın sınav tuzağına düştün! Present Perfect (have/has V3) kesin geçmiş tarih (in 1925) ile KULLANILAMAZ!"
    },
    {
      id: "form-past-continuous",
      catId: "cat-tenses",
      title: "Past Continuous (Geçmişte Süreç & Kesilen Eylem)",
      formula: "S + was/were + V-ing",
      purpose: "Geçmişte belirli bir anda devam etmekte olan bir süreci anlatır. Genellikle arka plandaki uzun süreci anlatırken, aniden araya giren kısa bir olay (V2) tarafından kesilir.",
      parts: "'was/were' geçmiş zaman yardımcı fiilidir; 'V-ing' ise o anda eylemin sürdüğünü gösterir.",
      trComparison: "Türkçedeki '-yordu' ekidir (çalışıyordu, konuşuyordu).",
      examples: [
        { en: "While the technician was updating the server, the power went out.", tr: "Teknisyen sunucuyu güncellerken elektrik kesildi. (Uzun eylem: was updating, Kesen eylem: went out - Kolay)" },
        { en: "The market was recovering steadily until the unexpected announcement.", tr: "Beklenmeyen duyuruya kadar piyasa istikrarlı bir şekilde toparlanıyordu. (Orta)" },
        { en: "What were you doing when the fraud alert was triggered?", tr: "Sahtekarlık uyarısı tetiklendiğinde ne yapıyordun? (İleri)" }
      ],
      whyRightWrong: "'While' genellikle arkasından uzun süreç (was/were V-ing) ister; 'When' ise arkasından kesen anlık olayı (V2) ister.",
      examTips: "'While / As + was/were V-ing, [Simple Past V2]' kalıbı sınavlarda en çok sorulan refleks kalıbıdır.",
      traps: "İki eylem aynı anda paralel olarak sürüyorsa her ikisi de Past Continuous olabilir: 'While I was studying, my colleague was preparing the report.'",
      miniQuiz: {
        question: "While the risk committee _______ the loan portfolio, a major default _______ in the corporate division.",
        options: [
          "reviewed / was occurring",
          "was reviewing / occurred",
          "had reviewed / occurs",
          "reviews / had occurred"
        ],
        correctIndex: 1,
        explanation: "'While' devam eden arka plan sürecini (was reviewing), araya giren anlık vaka ise Simple Past'ı (occurred) alır."
      },
      wrongAnalysis: "A'yı seçtiysen kısa anlık olayı (default) süreç sanarak 'was occurring' yaptın. C veya D'yi seçtiysen zaman uyumunu bozdun."
    },
    {
      id: "form-present-perfect",
      catId: "cat-tenses",
      title: "Present Perfect Tense (have/has + V3: Sonuç ve Deneyim)",
      formula: "S + have/has + V3",
      purpose: "Geçmişte ne zaman olduğu belirtilmeyen ama SONUCU veya ETKİSİ ŞU ANDA DEVAM EDEN eylemleri anlatır. Geçmiş ile şimdiki zaman arasındaki köprüdür.",
      parts: "'have/has' şimdiki zaman mülkiyet yardımcı fiilidir; 'V3' ise bitmişlik sıfatıdır. Mantık: 'I have eaten' = 'Yemiş olma durumuna şu an sahibim'.",
      trComparison: "Türkçede karşılığı tam yoktur; hem '-di' hem '-miş' diye çevrilebilir. Ancak mantık farkı: Türkçede dün de olsa az önce de olsa 'yedim' deriz. İngilizcede 'dün' dersen 'saw', 'az önce/etkisi sürüyor' dersen 'have seen' dersin!",
      examples: [
        { en: "The central bank has raised the policy rate by 200 basis points.", tr: "Merkez bankası politika faizini 200 baz puan artırdı. (Haber değeri var, etkisi şu an devrede! - Kolay)" },
        { en: "We have worked with this audit firm since 2018.", tr: "2018'den beri bu denetim firmasıyla çalışmaktayız. (Hala çalışıyoruz! - Orta)" },
        { en: "So far, no suspicious transaction has been detected in the system.", tr: "Şu ana kadar sistemde hiçbir şüpheli işlem tespit edilmedi. (İleri)" }
      ],
      whyRightWrong: "Soru: 'I have lost my passport' vs 'I lost my passport in 2015'. İlkinde pasaportum hala kayıp! İkincisinde ise geçmiş bir olay anlatılıyor, belki sonradan buldum.",
      examTips: "'since, for (süregelen), already, yet, just, so far, up to now, recently, ever, never' kelimelerini gördüğünde have/has + V3 ilk hedeftir!",
      traps: "'Since' kuralı: 'Since + Simple Past (V2), [Present Perfect (have/has V3)]'. Örnek: 'Since the crisis began in 2020, inflation has increased.'",
      miniQuiz: {
        question: "Since the introduction of contactless payment systems, customer checkout times _______ drastically.",
        options: ["decreased", "have decreased", "had decreased", "will decrease"],
        correctIndex: 1,
        explanation: "'Since + isim/olay' başladığı andan günümüze kadar devam eden etkiyi anlatır. Ana cümle daima Present Perfect (have decreased) olur."
      },
      wrongAnalysis: "A'yı (decreased) seçtiysen 'since'in ana cümleyi günümüze bağladığı gerçeğini unuttun. C'yi (had decreased) seçtiysen olay geçmişte bitmiş gibi davrandın."
    },
    {
      id: "form-past-perfect",
      catId: "cat-tenses",
      title: "Past Perfect Tense (had + V3: Geçmişin Geçmişi)",
      formula: "S + had + V3",
      purpose: "Geçmişte yaşanan İKİ olaydan daha önce gerçekleşeni (Geçmişin Geçmişini) vurgulamak için vardır. Tek başına ortada hiçbir geçmiş referansı yokken kullanılmaz!",
      parts: "'had' geçmiş zaman yardımcı fiilidir; 'V3' ise o geçmiş andan da önce bitmişliği gösterir.",
      trComparison: "Türkçedeki '-mıştı / -mişti' ekidir (yapmıştı, bitirmişti).",
      examples: [
        { en: "The market had closed before the news was released.", tr: "Haber yayınlanmadan önce piyasa kapanmıştı. (Önce piyasa kapandı: had closed, sonra haber geldi: was released - Kolay)" },
        { en: "By the time the inspectors arrived, the manager had already left.", tr: "Müfettişler geldiğinde, müdür çoktan ayrılmıştı. (Orta)" },
        { en: "He realized that he had transferred the money to the wrong account.", tr: "Parayı yanlış hesaba aktarmış olduğunu fark etti. (İleri)" }
      ],
      whyRightWrong: "'By the time + V2, [had + V3]' altın bir sınav kuralıdır. 'by the time' arkasından past gelirse ana cümle had + V3 olur.",
      examTips: "'by the time + Past', 'before + Past', 'after + had V3' kalıpları Past Perfect'in en büyük sinyalleridir.",
      traps: "Cümlede hiçbir geçmiş (Past) referans yokken doğrudan 'had + V3' seçmek en büyük çeldirici tuzağıdır!",
      miniQuiz: {
        question: "By the time the executive board convened to discuss the bailout, the share price _______ by over 40%.",
        options: ["plunged", "had plunged", "has plunged", "would plunge"],
        correctIndex: 1,
        explanation: "'By the time + V2 (convened)' yapısı, ana eylemin o toplantıdan DAHA ÖNCE gerçekleşip bittiğini belirtir: 'had plunged'."
      },
      wrongAnalysis: "C'yi (has plunged) seçtiysen Past bir cümleye Present soktun (zaman uyumsuzluğu). A'yı seçtiysen öncelik-sonralık ilişkisini kaçırdın."
    },
    {
      id: "form-future-tenses",
      catId: "cat-tenses",
      title: "Future Tenses (will + V1 vs be going to + V1)",
      formula: "will + V1 (Anlık/Tahmin) | am/is/are going to + V1 (Plan/Kanıt)",
      purpose: "Gelecekteki eylemleri anlatır. 'will' anlık kararlar, sözler ve genel tahminler için; 'be going to' ise önceden yapılmış planlar veya gözle görülür kanıtlar için kullanılır.",
      parts: "'will' bir modaldır ve arkasından daima YALIN FİİL (V1) ister. 'be going to'da ise çekim 'am/is/are' üzerindedir.",
      trComparison: "Türkçedeki '-ecek / -acak' ekidir. Türkçede plan ile anlık karar ayrımı belirgin değildir; İngilizcede ise bu ayrım gramere yansır.",
      examples: [
        { en: "Look at those dark economic figures; a recession is going to happen.", tr: "Şu karanlık ekonomik verilere bak; bir durgunluk yaşanacak. (Gözle görülür kanıt var: is going to - Kolay)" },
        { en: "I think the central bank will keep rates steady.", tr: "Bence merkez bankası faizleri sabit tutacak. (Kişisel tahmin / I think: will - Orta)" },
        { en: "As soon as the contract is ready, we will sign it.", tr: "Sözleşme hazır olur olmaz imzalayacağız. (Zaman bağlacı kuralı - İleri)" }
      ],
      whyRightWrong: "Zaman bağlaçlarının (when, as soon as, after) hemen içine 'will' YAZILMAZ! 'When I will arrive' YANLIŞTIR; 'When I arrive' DOĞRUDUR.",
      examTips: "'I think, probably, perhaps, hope' -> 'will'. 'Look at...', 'has planned to...' -> 'be going to'.",
      traps: "'When / Once / As soon as + [Present], [WILL + V1]' kuralı sınavların vazgeçilmezidir.",
      miniQuiz: {
        question: "Once the regulatory authorities _______ the new software, all domestic banks _______ it immediately.",
        options: [
          "will approve / adopt",
          "approve / will adopt",
          "approved / will adopt",
          "have approved / adopted"
        ],
        correctIndex: 1,
        explanation: "'Once' bir zaman bağlacıdır ve içine 'will' alamaz; Present Simple (approve) alır. Ana cümle ise geleceği bildiren 'will adopt' olur."
      },
      wrongAnalysis: "A'yı seçtiysen zaman bağlacının içine 'will' koyma hatasına düştün. C'yi seçtiysen 'approved' (past) ile 'will' (future) arasında zaman uyumsuzluğu yarattın."
    },
    {
      id: "form-future-perfect",
      catId: "cat-tenses",
      title: "Future Perfect Tense (will have + V3)",
      formula: "S + will have + V3",
      purpose: "Gelecekteki belirli bir zamana kadar TAMAMLANMIŞ VE BİTMİŞ OLACAK eylemleri ifade eder.",
      parts: "'will have' gelecekteki bitmişlik yükünü taşır; 'V3' eylemin tamamlanmış olduğunu bildirir.",
      trComparison: "Türkçedeki '-mış olacak / tamamlamış olacağız' kalıbıdır.",
      examples: [
        { en: "By 2030, the bank will have digitalized all customer operations.", tr: "2030 yılına kadar banka tüm müşteri operasyonlarını dijitalleştirmiş olacak. (Kolay)" },
        { en: "By the end of this month, we will have reached our revenue target.", tr: "Bu ayın sonuna kadar gelir hedefimize ulaşmış olacağız. (Orta)" },
        { en: "By the time the audit team arrives tomorrow, the accountants will have prepared all files.", tr: "Yarın denetim ekibi geldiğinde, muhasebeciler tüm dosyaları hazırlamış olacak. (İleri)" }
      ],
      whyRightWrong: "'By the time + Present, [will have + V3]' vs 'By the time + Past, [had + V3]'. Aradaki tek fark zaman referansıdır!",
      examTips: "'By + Gelecek Zaman' (By 2035, by next year, by tomorrow) veya 'By the time + Present' gördüğünde refleks olarak 'will have + V3' ara!",
      traps: "'In 2030' derse 'will + V1' kullanılır; ancak 'BY 2030' (2030'a kadar) derse 'will have + V3' kullanılır!",
      miniQuiz: {
        question: "By the time the fiscal year concludes, our branch _______ more than five thousand new accounts.",
        options: ["opens", "will have opened", "had opened", "has opened"],
        correctIndex: 1,
        explanation: "'By the time + Present (concludes)' kalıbı gelecekteki tamamlanmışlığı anlatır. Ana cümleye 'will have opened' gelir."
      },
      wrongAnalysis: "C'yi (had opened) seçtiysen 'concludes' fiilinin present olduğunu kaçırıp geçmiş sandın. D'yi seçtiysen geleceğe Present Perfect bağladın."
    },

    // --- KATEGORİ B: PASSIVE VOICE ---
    {
      id: "form-passive-present",
      catId: "cat-passive",
      title: "Simple Present Passive (am/is/are + V3)",
      formula: "S + am/is/are + V3",
      purpose: "İşi kimin yaptığının bilinmediği, önemsiz olduğu veya yapılan işin/nesnenin kendisinin vurgulanmak istendiği genel durumlarda kullanılır.",
      parts: "'am/is/are' öznenin tekillik/çoğulluğuna göre 'be' fiilinin şimdiki halidir; 'V3' ise pasifliği sağlar.",
      trComparison: "Türkçedeki '-il / -in' edilgenlik ekleridir (yapılır, denetlenir, basılır).",
      examples: [
        { en: "Interest rates are determined by the monetary policy committee.", tr: "Faiz oranları para politikası kurulu tarafından belirlenir. (Kolay)" },
        { en: "Cash transactions over the limit are closely monitored.", tr: "Limitin üzerindeki nakit işlemler yakından izlenir. (Orta)" },
        { en: "All loan applications are evaluated according to strict credit scores.", tr: "Tüm kredi başvuruları katı kredi notlarına göre değerlendirilir. (İleri)" }
      ],
      whyRightWrong: "'The committee determines rates' (Aktif) -> 'Rates are determined by the committee' (Pasif). Odak 'komite'den 'oranlar'a kaydı.",
      examTips: "Özne eylemi yapamıyorsa (Örn: 'The report', 'The money', 'The system') ve arkasından doğrudan nesne gelmiyorsa %90 pasif yapıdır.",
      traps: "Pasif cümlede 'be' fiili unutulamaz! 'Rates determined' tek başına yüklem olamaz, 'Rates are determined' olmalıdır.",
      miniQuiz: {
        question: "Confidential financial data _______ across highly encrypted corporate servers to prevent cyber attacks.",
        options: ["stores", "is stored", "are storing", "have stored"],
        correctIndex: 1,
        explanation: "'data' (burada tekil kabul edilmiş veri bütünü) kendi kendini saklayamaz; 'is stored' (saklanır - Simple Present Passive) olmalıdır."
      },
      wrongAnalysis: "A veya C'yi seçtiysen verinin kendi kendine işlem yapamayacağını (aktif olamayacağını) gözden kaçırdın."
    },
    {
      id: "form-passive-past",
      catId: "cat-passive",
      title: "Simple Past Passive (was/were + V3)",
      formula: "S + was/were + V3",
      purpose: "Geçmişte tamamlanmış ve işten etkilenenin ön planda olduğu olayları anlatır.",
      parts: "'was' tekil özneler, 'were' çoğul özneler içindir; 'V3' edilgenliği taşır.",
      trComparison: "Türkçedeki '-ildi / -indi' ekidir (satıldı, imzalandı, kuruldu).",
      examples: [
        { en: "The contract was signed by both parties yesterday.", tr: "Sözleşme dün her iki tarafça imzalandı. (Kolay)" },
        { en: "Millions of shares were sold during the market crash.", tr: "Piyasa çöküşü sırasında milyonlarca hisse satıldı. (Orta)" },
        { en: "The suspicious transfer was blocked before the funds left the institution.", tr: "Şüpheli transfer, fonlar kurumdan ayrılmadan önce bloke edildi. (İleri)" }
      ],
      whyRightWrong: "Aktif: 'The manager signed the contract' vs Pasif: 'The contract was signed'. İkinci cümlede önemli olan müdür değil, sözleşmenin imzalanmış olmasıdır.",
      examTips: "Cümlede geçmiş zaman zarfı (yesterday, in 2021) var ve özne eylemi yapmıyor, eyleme maruz kalıyorsa -> 'was/were + V3'.",
      traps: "'were' çoğul, 'was' tekildir. Öznenin sonundaki -s takısını gözden kaçırma: 'The files were checked', 'The file was checked'.",
      miniQuiz: {
        question: "The groundbreaking banking reform _______ into law by the parliament after intensive debates in 2001.",
        options: ["passed", "was passed", "is passed", "has been passed"],
        correctIndex: 1,
        explanation: "Reform kendi kendine kanunlaşamaz; parlamento tarafından çıkarılmıştır (pasif) ve 'in 2001' geçmiş zaman bildirir -> 'was passed'."
      },
      wrongAnalysis: "D'yi seçtiysen 'in 2001' gibi kesin geçmiş zaman bildiren bir tarihe Present Perfect bağladın."
    },
    {
      id: "form-passive-perfect",
      catId: "cat-passive",
      title: "Perfect Passive (have/has been + V3 & had been + V3)",
      formula: "have/has been + V3 (Present) | had been + V3 (Past)",
      purpose: "Etkisi süren veya geçmişte bir olaydan önce tamamlanmış pasif durumları anlatır.",
      parts: "Perfect yapının 'have/has/had' parçası + passive yapının 'been' parçası + ana fiilin 'V3' hali birleşir.",
      trComparison: "Türkçede 'yapılmıştır / yapılmıştı' biçiminde ifade edilir.",
      examples: [
        { en: "All outstanding debts have been cleared this month.", tr: "Tüm ödenmemiş borçlar bu ay temizlendi / ödendi. (Etkisi sürüyor - Kolay)" },
        { en: "The software had been tested thoroughly before it was launched.", tr: "Yazılım piyasaya sürülmeden önce kapsamlı şekilde test edilmişti. (Geçmişin geçmişi - Orta)" },
        { en: "Substantial capital has been injected into the domestic market recently.", tr: "Son zamanlarda iç piyasaya önemli miktarda sermaye enjekte edildi. (İleri)" }
      ],
      whyRightWrong: "'has injected' (enjekte etti - aktif) vs 'has been injected' (enjekte edildi - pasif). Sermaye enjekte etmez, edilir!",
      examTips: "'has done' (aktif) ile 'has been done' (pasif) arasındaki fark: Cümlede 'been' varsa o cümle PASİFTİR!",
      traps: "'The company has been established' (Şirket kuruldu - Doğru) vs 'The company has established a new branch' (Şirket yeni şube kurdu - Nesne var, bu aktif!). Nesneye dikkat et!",
      miniQuiz: {
        question: "Several unauthorized transactions _______ on your account before the fraud detection alert was activated.",
        options: [
          "had been conducted",
          "have been conducted",
          "were conducting",
          "had conducted"
        ],
        correctIndex: 0,
        explanation: "Olay fraud alarmından (past) daha önce gerçekleşmiştir (Past Perfect) ve işlemler yetkisizce yapılmıştır (Passive): 'had been conducted'."
      },
      wrongAnalysis: "D'yi seçtiysen 'been'i unutup cümleyi aktif yaptın (işlemler kendi kendini yürütemez!)."
    },
    {
      id: "form-passive-modal",
      catId: "cat-passive",
      title: "Modal Passive (Modal + be + V3)",
      formula: "can / must / should / may + be + V3",
      purpose: "Zorunluluk, olasılık, yetenek veya tavsiye bildiren kuralların edilgen ifadesidir.",
      parts: "Modal değişmez + ardından çıplak 'be' gelir + ana fiil 'V3' olur.",
      trComparison: "Türkçedeki 'yapılmalı, yapılabilir, yapılmak zorundadır' ifadeleridir.",
      examples: [
        { en: "Loan applications must be submitted by Friday.", tr: "Kredi başvuruları cuma gününe kadar teslim edilmelidir. (Zorunluluk - Kolay)" },
        { en: "These security regulations should be strictly followed.", tr: "Bu güvenlik kurallarına sıkı sıkıya uyulmalıdır. (Tavsiye/Kural - Orta)" },
        { en: "Market risks can be minimized through portfolio diversification.", tr: "Piyasa riskleri portföy çeşitlendirmesi yoluyla minimize edilebilir. (Yetenek/Olasılık - İleri)" }
      ],
      whyRightWrong: "Modalın arkasından 'be' konulmazsa fiil yalın kalır ve aktif olur: 'must submit' (teslim etmeli) vs 'must be submitted' (teslim edilmeli).",
      examTips: "Kural veya talimat cümlelerinde 'must be V3' veya 'should be V3' kalıbı standarttır.",
      traps: "Geçmiş modal passive: 'should have been V3' (yapılmış olmalıydı ama yapılmadı!).",
      miniQuiz: {
        question: "To prevent money laundering, all suspicious activities _______ to the compliance department immediately.",
        options: ["must report", "must be reported", "are reporting", "should report"],
        correctIndex: 1,
        explanation: "'Activities' rapor etmez, rapor edilir (passive). Zorunluluk kuralı olduğu için 'must be reported'."
      },
      wrongAnalysis: "A'yı seçtiysen aktif şıkkı işaretledin ('faaliyetler rapor etmelidir' gibi anlamsız bir yapı oldu)."
    },
    {
      id: "form-passive-continuous",
      catId: "cat-passive",
      title: "Continuous Passive (am/is/are/was/were being + V3)",
      formula: "S + be + being + V3",
      purpose: "Şu anda veya geçmişte belirli bir anda YAPILMAKTA OLAN (süreç halindeki) edilgen işleri anlatır.",
      parts: "'be' (is/are/was/were) zamanı verir; 'being' devam eden süreci taşır; 'V3' pasifliği tamamlar.",
      trComparison: "Türkçedeki 'yapılmakta / edilmekte' kalıbıdır.",
      examples: [
        { en: "The bank branch is being renovated at the moment.", tr: "Banka şubesi şu anda tadilattan geçirilmektedir / yenilenmektedir. (Kolay)" },
        { en: "When I visited the office, the new policy was being discussed.", tr: "Ofisi ziyaret ettiğimde, yeni politika tartışılmaktaydı. (Orta)" },
        { en: "Thousands of transactions are being processed every second by the AI system.", tr: "Yapay zeka sistemi tarafından her saniye binlerce işlem gerçekleştirilmektedir. (İleri)" }
      ],
      whyRightWrong: "'is renovating' (yeniliyor - aktif) vs 'is being renovated' (yenileniyor - pasif). Şube kendisi tadilat yapmaz!",
      examTips: "'at the moment, right now' ile birlikte pasif özne gelirse 'is/are being V3' aranır.",
      traps: "'being' ile 'been' karışımı: 'has been V3' (tamamlanmış), 'is being V3' (şu an yapılmakta olan).",
      miniQuiz: {
        question: "Due to the merger, the existing IT infrastructure _______ to support the increased traffic right now.",
        options: ["is upgrading", "is being upgraded", "has upgraded", "was being upgraded"],
        correctIndex: 1,
        explanation: "'right now' şimdiki zamanı, altyapı öznesi ise edilgenliği gerektirir: 'is being upgraded' (yükseltilmektedir)."
      },
      wrongAnalysis: "A'yı seçtiysen aktif yaptın; D'yi seçtiysen 'right now' varken geçmiş zamana (was) gittin."
    },

    // --- KATEGORİ C: BAĞLAÇLAR ---
    {
      id: "form-conj-contrast-clauses",
      catId: "cat-conjunctions",
      title: "Zıtlık Bağlaçları: Cümle Alanlar vs İsim Alanlar",
      formula: "Although / Even though + S + V | Despite / In spite of + Noun / V-ing",
      purpose: "Beklentinin aksine gerçekleşen zıt durumları bağlar. Sınavlarda en çok sorulan ve en çok elenme sağlayan bağlaç grubudur.",
      parts: "Although grubu kendisinden sonra TAM CÜMLE (Özne + Fiil) ister. Despite grubu ise bir edat öbeğidir ve kendisinden sonra ASLA tam cümle almaz; İSİM veya V-ING ister!",
      trComparison: "İkisi de Türkçeye '-e rağmen / karşın' diye çevrilir. Türkçe çeviri aynı olduğu için yapısal kuralı bilmeyenler tuzağa düşer!",
      examples: [
        { en: "Although the inflation was high, consumer spending increased.", tr: "Enflasyon yüksek olmasına rağmen tüketici harcamaları arttı. (Although + S + V - Kolay)" },
        { en: "Despite high inflation, consumer spending increased.", tr: "Yüksek enflasyona rağmen tüketici harcamaları arttı. (Despite + Noun - Kolay)" },
        { en: "In spite of facing severe regulatory fines, the corporation maintained its market share.", tr: "Ağır yasal cezalarla karşılaşmasına rağmen şirket pazar payını korudu. (In spite of + V-ing - İleri)" }
      ],
      whyRightWrong: "'Despite the inflation was high' KESİNLİKLE YANLIŞTIR! Despite tam cümle alamaz! Ancak 'Despite the fact that + S + V' olursa tam cümle alabilir.",
      examTips: "Boşluğun sağına bak: Eğer 'Özne + Fiil' varsa -> Although / Even though / Though. Eğer sadece 'İsim Öbeği' veya 'V-ing' varsa -> Despite / In spite of.",
      traps: "'However' bir geçiş kelimesidir (Transition); iki cümleyi tek virgülle birbirine bağlayamaz, noktalı virgül veya nokta ister: '; however, '.",
      miniQuiz: {
        question: "_______ the severe geopolitical tensions in the region, the cross-border trade volume expanded significantly.",
        options: ["Although", "Despite", "Even though", "Whereas"],
        correctIndex: 1,
        explanation: "Boşluktan sonra 'the severe geopolitical tensions' (isim öbeği) gelmiştir; fiil yoktur! Bu yüzden tam cümle isteyen Although, Even though ve Whereas elenir; cevap 'Despite'dır."
      },
      wrongAnalysis: "A veya C'yi seçtiysen cümlenin içinde fiil olup olmadığını kontrol etmeden ezbere çeviriye kandın."
    },
    {
      id: "form-conj-reason",
      catId: "cat-conjunctions",
      title: "Neden Bağlaçları: Cümle vs İsim Alanlar",
      formula: "Because / Since / As + S + V | Because of / Due to / Owing to + Noun / V-ing",
      purpose: "Bir olayın gerekçesini ve nedenini bildirmek için kullanılır.",
      parts: "Because/Since/As doğrudan tam cümle alır. Sonunda '-of / -to' edatı olanlar (Because of, Due to, Owing to) ise isim veya V-ing alır.",
      trComparison: "Because = 'çünkü / -dığı için'; Because of = '-den dolayı / sebebiyle'.",
      examples: [
        { en: "The stock index dropped because foreign investors sold their assets.", tr: "Hisse senedi endeksi düştü çünkü yabancı yatırımcılar varlıklarını sattı. (Because + S + V - Kolay)" },
        { en: "The stock index dropped because of massive foreign asset sales.", tr: "Hisse senedi endeksi büyük yabancı varlık satışları sebebiyle düştü. (Because of + Noun - Kolay)" },
        { en: "Due to increasing operational costs, the bank decided to close ten branches.", tr: "Artan operasyonel maliyetler nedeniyle banka on şubesini kapatma kararı aldı. (Due to + Noun - Orta)" }
      ],
      whyRightWrong: "Due to'dan sonra tam cümle gelmez! 'Due to the costs increased' YANLIŞTIR. 'Due to the fact that the costs increased' DOĞRUDUR.",
      examTips: "Boşluktan sonra özne+fiil var mı yok mu? Var ise -> Because/Since/As. Yok ise -> Because of / Due to / Owing to.",
      traps: "'Since' zaman anlamında '-den beri' iken, sebep anlamında 'Because' ile birebir aynıdır: 'Since we don't have enough capital, we cannot invest.'",
      miniQuiz: {
        question: "_______ the company failed to comply with anti-fraud guidelines, the supervisory board imposed a hefty penalty.",
        options: ["Because of", "Due to", "Owing to", "Since"],
        correctIndex: 3,
        explanation: "Boşluktan sonra 'the company (özne) failed (fiil)...' şeklinde TAM CÜMLE gelmektedir. 'Because of, Due to, Owing to' isim ister; tam cümle alan tek seçenek 'Since'dir."
      },
      wrongAnalysis: "A, B veya C'yi seçtiysen 'failed' fiilini görmeyip tüm parçayı tek bir isim öbeği sandın."
    },
    {
      id: "form-conj-result",
      catId: "cat-conjunctions",
      title: "Sonuç Bağlaçları (Therefore, Thus, Consequently, As a result)",
      formula: "Sentence 1. Therefore / Thus / Consequently, Sentence 2.",
      purpose: "Bir önceki cümlenin mantıksal sonucunu bildirmek için kullanılır. İki bağımsız fikir arasında köprü kurar.",
      parts: "Genellikle iki bağımsız cümle arasında noktalama işaretleriyle (nokta veya noktalı virgül) kullanılır ve ardından VİRGÜL gelir.",
      trComparison: "Türkçedeki 'Bu nedenle, bundan dolayı, sonuç olarak' ifadeleridir.",
      examples: [
        { en: "The applicant had a poor credit score. Therefore, his mortgage request was declined.", tr: "Başvuranın düşük bir kredi notu vardı. Bu nedenle, konut kredisi talebi reddedildi. (Kolay)" },
        { en: "The interest margin widened; thus, the bank achieved record quarterly earnings.", tr: "Faiz marjı genişledi; böylece banka rekor çeyrek kazancı elde etti. (Orta)" },
        { en: "Inflation pressures intensified; consequently, policymakers were forced to hike rates.", tr: "Enflasyon baskıları yoğunlaştı; sonuç olarak politika yapıcılar faiz artırmak zorunda kaldı. (İleri)" }
      ],
      whyRightWrong: "Noktalama farkı: 'Because' iki cümleyi tek başına bağlayabilir ('We stayed inside because it rained'). 'Therefore' ise başına nokta/noktalı virgül ister ('It rained; therefore, we stayed inside').",
      examTips: "Cümle başında büyük harfle başlayıp arkasından VİRGÜL alan veya noktalı virgülden sonra gelen kelimeler: 'Therefore, Thus, Consequently, However, Furthermore'.",
      traps: "'Thus' bazen V-ing ile kısaltma olarak kullanılabilir: '...thus reducing costs' (böylece maliyetleri azaltarak).",
      miniQuiz: {
        question: "The commercial bank suffered catastrophic credit losses during the downturn; _______, it required government intervention.",
        options: ["although", "consequently", "because", "despite"],
        correctIndex: 1,
        explanation: "Noktalı virgülle ayrılmış ve arkasından virgül almış sonuç bildiren bir geçiş kelimesi gerekiyor: 'consequently' (sonuç olarak)."
      },
      wrongAnalysis: "A veya D'yi seçtiysen zıtlık sandın, oysa burada neden-sonuç ilişkisi var. C'yi seçtiysen noktalama kuralını unuttun."
    },
    {
      id: "form-conj-condition",
      catId: "cat-conjunctions",
      title: "Şart Bağlaçları (Unless = If not, Provided that, As long as)",
      formula: "Unless + Olumlu Cümle (= If + Olumsuz Cümle)",
      purpose: "Bir eylemin gerçekleşmesini belirli bir koşula bağlar. 'Unless' kendi içinde 'not' anlamı barındırır (-medikçe / -mezse).",
      parts: "'Unless' zaten olumsuz anlam taşıdığı için girdiği yan cümlede ikinci bir 'not' KULLANILMAZ! 'Provided that' ve 'As long as' ise 'şartıyla / sürece' anlamına gelir.",
      trComparison: "Türkçedeki '-madıkça / -medikçe' veya '-dığı takdirde' ekleridir.",
      examples: [
        { en: "Unless you provide the required financial documents, the loan cannot be processed.", tr: "Gerekli mali belgeleri sunmadıkça, kredi işleme alınamaz. (Unless + olumlu fiil - Kolay)" },
        { en: "You can open an offshore account provided that you deposit a minimum of $50,000.", tr: "En az 50.000$ yatırmanız şartıyla denizaşırı bir hesap açabilirsiniz. (Provided that - Orta)" },
        { en: "As long as market liquidity remains stable, no emergency intervention is needed.", tr: "Piyasa likiditesi istikrarlı kaldığı sürece acil müdahaleye gerek yoktur. (As long as - İleri)" }
      ],
      whyRightWrong: "'Unless you don't provide...' YANLIŞTIR! Çifte olumsuzluk mantık hatası yaratır. 'Unless you provide...' DOĞRUDUR.",
      examTips: "Şart bağlaçlarının içinde 'will' kullanılmaz! Yan cümle Present Simple, ana cümle 'will / can / modal' olur.",
      traps: "'Unless' gördüğünde ana cümlenin olumsuz veya kısıtlayıcı bir sonuca sahip olup olmadığını kontrol et.",
      miniQuiz: {
        question: "_______ the borrower repays the outstanding balance within thirty days, legal proceedings will be initiated.",
        options: ["If", "Unless", "As long as", "Provided that"],
        correctIndex: 1,
        explanation: "Ana cümlede 'yasal işlem başlatılacak' (olumsuz yaptırım) var. Yani 'ödemediği sürece' (Unless) anlamı gereklidir. 'If' olsaydı öderse dava açılır gibi saçma bir anlam çıkardı."
      },
      wrongAnalysis: "A'yı (If) seçtiysen anlam kontrolü yapmadın: Borçlu öderse mi dava açılır, ödemezse mi?"
    },
    {
      id: "form-conj-purpose",
      catId: "cat-conjunctions",
      title: "Amaç Bağlaçları: So that vs In order to",
      formula: "So that + S + modal + V1 | in order to / so as to + V1",
      purpose: "Bir eylemin hangi amaca hizmet etmek üzere yapıldığını (-sın diye / amacıyla) belirtir.",
      parts: "'So that' arkasından TAM CÜMLE ve genellikle bir modal (can, could, will, would) ister. 'In order to' ise doğrudan FİİL (V1) ister!",
      trComparison: "Türkçedeki '-mek için / -sın diye' yapısıdır.",
      examples: [
        { en: "The bank upgraded its firewalls so that cyber hackers could not infiltrate the system.", tr: "Banka, siber korsanlar sisteme sızamasın diye güvenlik duvarlarını yükseltti. (So that + S + could - Kolay)" },
        { en: "The bank upgraded its firewalls in order to prevent cyber intrusions.", tr: "Banka, siber sızmaları önlemek amacıyla güvenlik duvarlarını yükseltti. (In order to + V1 - Kolay)" },
        { en: "Interest rates were cut in order to stimulate domestic manufacturing investments.", tr: "Faiz oranları yerli imalat yatırımlarını canlandırmak amacıyla düşürüldü. (Orta)" }
      ],
      whyRightWrong: "Boşluktan sonra doğrudan fiil varsa 'so that' GELEMEZ! 'so that prevent' YANLIŞ; 'in order to prevent' DOĞRUDUR.",
      examTips: "Boşluktan sonra 'Subject + can/could/would' görüyorsan -> 'so that'. Boşluktan sonra doğrudan V1 görüyorsan -> 'in order to / to'.",
      traps: "Olumsuz amaç: 'in order NOT to V1' (yapmamak için).",
      miniQuiz: {
        question: "The treasury issued new high-yield bonds _______ attract foreign institutional investors to the market.",
        options: ["so that", "in order to", "because", "although"],
        correctIndex: 1,
        explanation: "Boşluktan hemen sonra 'attract' (V1 fiil) gelmiştir. Özne yoktur. Dolayısıyla 'in order to + V1' tek doğru yapıdır."
      },
      wrongAnalysis: "A'yı (so that) seçtiysen 'so that'in ardından özne ve modal gerektiğini unuttun."
    },
    {
      id: "form-conj-paired",
      catId: "cat-conjunctions",
      title: "İkili Paralel Bağlaçlar (Not only...but also, Neither...nor, Either...or, Both...and)",
      formula: "Not only A but also B | Neither A nor B | Either A or B | Both A and B",
      purpose: "İki benzer ögeyi (iki isim, iki sıfat veya iki cümle) dengeli ve paralel bir şekilde birbirine bağlar.",
      parts: "Eşleşmeler sabittir: Not only -> but also, Neither -> nor, Either -> or, Both -> and. Asla çaprazlanamazlar!",
      trComparison: "Not only...but also = Sadece ... değil aynı zamanda ...; Neither...nor = Ne ... ne de ...; Either...or = Ya ... ya da ...; Both...and = Hem ... hem de ...",
      examples: [
        { en: "The project requires both substantial capital and skilled engineering.", tr: "Proje hem önemli bir sermaye hem de yetenekli mühendislik gerektirir. (Both...and - Kolay)" },
        { en: "Neither the branch manager nor the regional directors were aware of the fraud.", tr: "Ne şube müdürü ne de bölge müdürleri sahtekarlıktan haberdardı. (Neither...nor - Orta)" },
        { en: "The new fintech app is not only exceptionally secure but also extremely user-friendly.", tr: "Yeni fintech uygulaması sadece olağanüstü güvenli değil, aynı zamanda son derece kullanıcı dostudur. (İleri)" }
      ],
      whyRightWrong: "'Neither...or' veya 'Either...nor' sınavdaki en bariz tuzak eşleştirmelerdir. 'Neither' daima 'nor' ile gider!",
      examTips: "Cümlede 'nor' görüyorsan ilk parçaya 'neither'; 'or' görüyorsan 'either'; 'and' görüyorsan 'both' yerleştir.",
      traps: "Fiil uyumu: 'Neither A nor B' ve 'Either A or B' kalıplarında fiil B'ye (fiile en yakın özneye) uyar! Örn: 'Neither the manager nor the employees WERE present.'",
      miniQuiz: {
        question: "The executive committee decided that the company must _______ diversify its supply chain _______ invest heavily in local warehouses.",
        options: [
          "either / nor",
          "neither / or",
          "not only / but also",
          "both / or"
        ],
        correctIndex: 2,
        explanation: "Eşleşme kuralı: 'not only ... but also' doğru ikiliyi oluşturur. Diğer şıklardaki eşleşmeler (either/nor, neither/or, both/or) tamamen yanlıştır."
      },
      wrongAnalysis: "A veya B'yi seçtiysen ikili bağlaçların sabit çiftlerini (either-or, neither-nor) karıştırdın."
    },
    {
      id: "form-conj-degree",
      catId: "cat-conjunctions",
      title: "Derece ve Sonuç Bağlaçları: So...that vs Such...that",
      formula: "so + Sıfat/Zarf + that | such + (a/an) + Sıfat + İSİM + that",
      purpose: "Bir niteliğin o kadar aşırı olduğunu ve bu durumun belirli bir sonuca yol açtığını ('öylesine ... ki') ifade eder.",
      parts: "'so' doğrudan sıfat veya zarf alır ('so high that'). 'such' ise araya mutlaka bir İSİM sokar ('such a high rate that')!",
      trComparison: "Türkçedeki 'o kadar ... ki, [sonuç]' kalıbıdır.",
      examples: [
        { en: "The market collapse was so severe that trading was halted.", tr: "Piyasa çöküşü öylesine şiddetliydi ki işlemler durduruldu. (so + Sıfat + that - Kolay)" },
        { en: "It was such a severe crisis that multiple banks went bankrupt.", tr: "Öylesine şiddetli bir krizdi ki birden fazla banka battı. (such + a + Sıfat + İSİM + that - Orta)" },
        { en: "The algorithmic system processed data so rapidly that human traders could not compete.", tr: "Algoritmik sistem verileri o kadar hızlı işledi ki insan tüccarlar rekabet edemedi. (so + Zarf + that - İleri)" }
      ],
      whyRightWrong: "Boşluğun devamında İSİM var mı? 'severe' (tek başına sıfat) -> so severe that. 'severe crisis' (sıfat + isim) -> such a severe crisis that.",
      examTips: "'so much / so many / so few / so little' kalıplarında isim gelse bile 'so' kullanılır! İstisna tuzağıdır.",
      traps: "'such' arkasından tekil sayılabilen isim varsa 'a/an' şarttır ('such an important issue that').",
      miniQuiz: {
        question: "The inflation rate reached _______ alarming levels that the monetary authority called an emergency meeting.",
        options: ["so", "such", "too", "as"],
        correctIndex: 1,
        explanation: "'alarming levels' bir SIFAT + İSİM öbeğidir (çoğul isim 'levels'). İsim öbeğiyle birlikte 'such ... that' kalıbı kullanılır."
      },
      wrongAnalysis: "A'yı (so) seçtiysen 'levels' ismini görmeyip sadece 'alarming' sıfatına odaklandın."
    },

    // --- KATEGORİ D: FİİLLERDEN SONRA GELEN YAPILAR ---
    {
      id: "form-verb-gerund",
      catId: "cat-verbs",
      title: "Gerund Alan Fiiller (enjoy, avoid, suggest + V-ing)",
      formula: "Verb + V-ing",
      purpose: "Bazı fiiller kendilerinden sonra gelen ikinci fiili 'isim-fiil' (eylemin kendisi, süreç veya alışkanlık) olarak ister.",
      parts: "Ana fiil çekimlenir + takip eden fiil '-ing' takısı alır.",
      trComparison: "Türkçede '-meyi / -mayı' ekidir (kaçınmak, tavsiye etmek, ertelemek).",
      examples: [
        { en: "Prudent investors avoid taking unnecessary speculative risks.", tr: "Sağduyulu yatırımcılar gereksiz spekülatif riskler almaktan kaçınırlar. (avoid + taking - Kolay)" },
        { en: "The economic advisor suggested diversifying the assets.", tr: "Ekonomik danışman varlıkları çeşitlendirmeyi önerdi. (suggest + diversifying - Orta)" },
        { en: "We must consider restructuring our long-term corporate debt.", tr: "Uzun vadeli şirket borcumuzu yeniden yapılandırmayı değerlendirmeliyiz. (consider + restructuring - İleri)" }
      ],
      whyRightWrong: "'suggest to diversify' YANLIŞTIR! 'suggest' daima V-ing ister. Sınavlarda en çok çıkan Gerund fiilleri: avoid, consider, delay, enjoy, finish, postpone, suggest, recommend, risk, admit, deny.",
      examTips: "Bu fiil listesini hafızaya al: 'avoid, suggest, consider, risk, deny, postpone'. Bunların arkasından 'to V1' olan şıkları doğrudan ele!",
      traps: "'look forward to + V-ing' ve 'be used to + V-ing' kalıplarındaki 'to' bir edattır (infinitive 'to'su değildir), bu yüzden arkalarından V-ing gelir!",
      miniQuiz: {
        question: "Due to rising geopolitical instability, many multinational firms postponed _______ in foreign emerging markets.",
        options: ["to invest", "investing", "invested", "have invested"],
        correctIndex: 1,
        explanation: "'postpone' (ertelemek) fiili kendisinden sonra daima GERUND (V-ing) ister: 'postponed investing'."
      },
      wrongAnalysis: "A'yı (to invest) seçtiysen postpone fiilinin gerund kuralını unutup infinitive şıkkına gittin."
    },
    {
      id: "form-verb-infinitive",
      catId: "cat-verbs",
      title: "Infinitive Alan Fiiller (decide, want, plan, hope + to V1)",
      formula: "Verb + to + V1",
      purpose: "Geleceğe yönelik bir niyet, hedef, karar veya amaç bildiren fiiller genellikle arkalarından 'to + V1' ister.",
      parts: "Ana fiil çekimlenir + 'to' eki + ikinci fiilin yalın hali (V1).",
      trComparison: "Türkçedeki '-mek / -mak istemek, karar vermek' yapısıdır.",
      examples: [
        { en: "The board decided to approve the annual budget.", tr: "Yönetim kurulu yıllık bütçeyi onaylamaya karar verdi. (decide + to approve - Kolay)" },
        { en: "The startup aims to expand its operations across Europe.", tr: "Girişim, operasyonlarını Avrupa geneline genişletmeyi hedefliyor. (aim + to expand - Orta)" },
        { en: "The customer refused to disclose the source of the funds.", tr: "Müşteri fonların kaynağını açıklamayı reddetti. (refuse + to disclose - İleri)" }
      ],
      whyRightWrong: "'decided approving' YANLIŞTIR. Karar geleceğe dönüktür ve 'decide to V1' ister. Başlıca fiiller: agree, decide, demand, hope, manage, offer, plan, refuse, promise, want, attempt.",
      examTips: "Niyet / Karar / Hedef bildiren fiiller (decide, plan, hope, aim, manage, fail) -> 'to + V1'.",
      traps: "'remember, forget, stop' fiilleri her iki yapıyı da alır ama anlam değişir! 'stop to talk' = konuşmak için durmak; 'stop talking' = konuşmayı kesmek.",
      miniQuiz: {
        question: "Despite intense lobbying from competitors, the central authority agreed _______ the banking license.",
        options: ["granting", "to grant", "granted", "to granting"],
        correctIndex: 1,
        explanation: "'agree' (kabul etmek / anlaşmak) fiili kendisinden sonra daima INFINITIVE (to + V1) ister: 'agreed to grant'."
      },
      wrongAnalysis: "A'yı (granting) seçtiysen agree fiilini Gerund alan fiillerle karıştırdın."
    },
    {
      id: "form-verb-bare",
      catId: "cat-verbs",
      title: "Ettirgen & Çıplak Fiiller (make, let, have + Nesne + V1)",
      formula: "make / let / have + Object + V1 (Çıplak Fiil)",
      purpose: "Birine bir şeyi zorla yaptırmak (make), yapmasına izin vermek (let) veya yaptırmak (have) durumlarını anlatır. İkinci fiil 'to' ALMAZ!",
      parts: "Ettirgen fiil + Eylemi yapan nesne + 'to'suz yalın fiil (V1).",
      trComparison: "Türkçedeki ettirgenlik ekleridir (-dır, -t: yaptırmak, izin vermek).",
      examples: [
        { en: "The security protocol makes all employees change their passwords monthly.", tr: "Güvenlik protokolü tüm çalışanların şifrelerini aylık değiştirmesini zorunlu kılar. (make + obj + V1 - Kolay)" },
        { en: "The manager let the intern review the audit files.", tr: "Müdür stajyerin denetim dosyalarını incelemesine izin verdi. (let + obj + V1 - Orta)" },
        { en: "We will have our legal counsel review the final contract.", tr: "Nihai sözleşmeyi hukuk müşavirimize inceleteceğiz. (have + obj + V1 - İleri)" }
      ],
      whyRightWrong: "'The manager made me to sign' YANLIŞTIR! 'make' ettirgeninde 'to' KESİNLİKLE KULLANILMAZ: 'made me sign'.",
      examTips: "'make / let / have + kişi' gördüğünde arkasındaki boşluğa 'to'suz, -ing'siz, tamamen ÇIPLAK V1 ara!",
      traps: "Passive tuzak: Eğer 'make' pasif yapılırsa 'to' geri gelir! 'I was made TO sign the paper.' Sınavlarda çok tehlikeli bir istisnadır!",
      miniQuiz: {
        question: "The strict internal regulations let no employee _______ unverified third-party software on bank terminals.",
        options: ["to install", "installing", "install", "installed"],
        correctIndex: 2,
        explanation: "'let + nesne + V1' kuralı gereğince 'let' arkasından çıplak fiil (bare infinitive) ister: 'install'."
      },
      wrongAnalysis: "A'yı (to install) seçtiysen 'let' fiilinin 'to' almadığı altın kuralını atladın."
    },
    {
      id: "form-verb-prep-gerund",
      catId: "cat-verbs",
      title: "Edat + Fiil Formülü (Preposition + V-ing)",
      formula: "Preposition (in, on, at, for, by, about, of, without) + V-ing",
      purpose: "İngilizcede bir edatın arkasından bir eylem gelecekse, o eylem gramer gereği MUTLAKA isimleşmek (V-ing olmak) zorundadır.",
      parts: "Herhangi bir edat + ana fiile eklenen '-ing'. Asla 'to V1' veya çıplak V1 gelemez!",
      trComparison: "Türkçedeki '-meden / -meksizin' (without doing), '-erek / -arak' (by doing) ekleridir.",
      examples: [
        { en: "You cannot withdraw cash without entering your PIN.", tr: "PIN kodunuzu girmeden nakit çekemezsiniz. (without + entering - Kolay)" },
        { en: "The bank improved security by implementing biometric authentication.", tr: "Banka, biyometrik kimlik doğrulama uygulayarak güvenliği artırdı. (by + implementing - Orta)" },
        { en: "The analyst is responsible for assessing market risk factors.", tr: "Analist piyasa risk faktörlerini değerlendirmekten sorumludur. (responsible for + assessing - İleri)" }
      ],
      whyRightWrong: "'responsible for assess' veya 'without enter' ağır gramer hatasıdır. Edatın arkası daima V-ing'dir.",
      examTips: "Boşluğun hemen solunda bir edat (of, for, in, at, on, by, without, about, after, before) varsa şıklarda doğrudan V-ing ara!",
      traps: "'by + V-ing' (yaparak / ederek) vs 'without + V-ing' (yapmaksızın / yapmadan). Sınavda yöntem sorularının değişmez cevabıdır.",
      miniQuiz: {
        question: "Financial institutions mitigate credit vulnerability by _______ stringent underwriting criteria.",
        options: ["applied", "applying", "to apply", "apply"],
        correctIndex: 1,
        explanation: "Boşluğun hemen önünde 'by' edatı vardır. Edatlardan sonra fiil daima V-ing formunda gelir: 'applying'."
      },
      wrongAnalysis: "C'yi (to apply) seçtiysen edatların arkasına 'to + fiil' gelemeyeceği temel kuralını ihlal ettin."
    },

    // --- KATEGORİ E: RELATIVE & NOUN CLAUSES ---
    {
      id: "form-clause-relative-pronouns",
      catId: "cat-clauses",
      title: "Relative Pronouns (Who, Which, That, Whose, Where)",
      formula: "İnsan + Who | Cansız/Hayvan + Which | Her ikisi + That | Sahiplik + Whose + İsim | Yer + Where",
      purpose: "Bir ismi niteleyen ve onun hakkında ek bilgi veren sıfat cümlecikleri (Relative Clause) kurar.",
      parts: "Nitelenecek isim + İlgi zamiri (Who/Which/That/Whose) + Yan cümle.",
      trComparison: "Türkçedeki sıfat-fiil ekleridir (-en/-an, -dığı/-diği: gelen kişi, yaptığım anlaşma).",
      examples: [
        { en: "The customer who filed the complaint was invited to the branch.", tr: "Şikayette bulunan müşteri şubeye davet edildi. (İnsan: who - Kolay)" },
        { en: "The loan product which offers low interest rates is very popular.", tr: "Düşük faiz oranları sunan kredi ürünü çok popülerdir. (Cansız: which - Kolay)" },
        { en: "The bank whose assets were frozen faced bankruptcy.", tr: "Varlıkları dondurulan banka iflasla yüzleşti. (Sahiplik: whose + assets - Orta)" }
      ],
      whyRightWrong: "'whose' arkasından DAİMA bir isim ister ve o ismin önünde 'the/a' olmaz: 'whose assets' (varlıkları olan). 'where' ise arkasından tam cümle ister.",
      examTips: "Virgüllü (Non-defining) cümlelerde 'THAT' ASLA KULLANILAMAZ! ', that...' gördüğün şıkkı anında ele!",
      traps: "Yer isimlerinde tuzak: Eğer yer ismi bir mekan olarak eylemin geçtiği yerse 'WHERE'; o mekanı bir nesne gibi niteliyorsan 'WHICH' kullanılır! Örn: 'The building WHERE we work' vs 'The building WHICH was built in 1990'.",
      miniQuiz: {
        question: "The multinational conglomerate, _______ subsidiary defaulted on commercial bonds, requested state assistance.",
        options: ["which", "who", "whose", "where"],
        correctIndex: 2,
        explanation: "Boşluktan sonra 'subsidiary' (bağlı ortaklık - isim) gelmiştir ve bir mülkiyet bağı vardır (holdingin bağlı ortaklığı). Bu yüzden 'whose' gereklidir."
      },
      wrongAnalysis: "A'yı (which) seçtiysen mülkiyet ilişkisini görmeyip holding cansız diye doğrudan which'e gittin."
    },
    {
      id: "form-clause-noun-clauses",
      catId: "cat-clauses",
      title: "Noun Clauses (That, Whether/If, Wh-words)",
      formula: "Fiil + that + Tam Cümle | Fiil + whether/if + Cümle",
      purpose: "Cümlede bir ismin, öznenin veya nesnenin yerini tutan tümce yapısıdır. Genellikle düşünce, inanç veya belirsizlik bildiren fiillerden sonra gelir.",
      parts: "Geçiş kelimesi (that / whether) + DÜZ CÜMLE SIRASI (Özne + Fiil). Soru sırası YAPILMAZ!",
      trComparison: "Türkçedeki '... yaptığını' (that) veya '... yapıp yapmadığını' (whether/if) kalıplarıdır.",
      examples: [
        { en: "The board announced that the merger was finalized.", tr: "Yönetim kurulu, birleşmenin tamamlandığını duyurdu. (Fiil + that + S + V - Kolay)" },
        { en: "The regulators investigated whether the bank complied with reserve rules.", tr: "Denetleyiciler bankanın karşılık kurallarına uyup uymadığını araştırdı. (whether = olup olmadığını - Orta)" },
        { en: "No one knows how the cyber attacker breached the network.", tr: "Siber saldırganın ağa nasıl sızdığını kimse bilmiyor. (Düz sıra: how + S + V - İleri)" }
      ],
      whyRightWrong: "Noun clause içinde ASLA soru devrikliği yapılmaz! 'I wonder where did he go' YANLIŞTIR; 'I wonder where he went' DOĞRUDUR.",
      examTips: "'whether ... or not' ikilisi sınavlarda çok yaygındır. Belirsizlik fiilleri (wonder, not sure, ask, investigate) 'whether/if' ister.",
      traps: "Edatlardan sonra 'if' KULLANILMAZ; sadece 'whether' kullanılır! 'about whether' (Doğru) vs 'about if' (Yanlış).",
      miniQuiz: {
        question: "Internal auditors are currently examining _______ the unauthorized fund transfers were caused by a software glitch or insider fraud.",
        options: ["that", "whether", "what", "which"],
        correctIndex: 1,
        explanation: "Cümlede '... or ...' seçeneği ve bir inceleme/belirsizlik (examining) vardır. İki ihtimalden hangisi olduğunu sorgularken 'whether ... or' kalıbı kullanılır."
      },
      wrongAnalysis: "A'yı (that) seçtiysen 'or' ile verilen alternatif ikilemini ve belirsizlik fiilini gözden kaçırdın."
    },
    {
      id: "form-clause-reduced",
      catId: "cat-clauses",
      title: "Reduced Relative Clauses (Kısaltmalar: V-ing vs V3)",
      formula: "İsim + V-ing (Aktif Kısaltma) | İsim + V3 (Pasif Kısaltma)",
      purpose: "Uzun sıfat cümleciklerini (who is, which was) atarak cümleyi daha akıcı ve profesyonel hale getirir. Sınavlarda en çok puan kaybettiren ileri düzey konudur.",
      parts: "Nitelenecek isim + eylemi yapan ise 'V-ing'; eyleme maruz kalan ise 'V3'.",
      trComparison: "Türkçedeki sıfat fiiller: 'başvuran' (applying) vs 'onaylanan' (approved).",
      examples: [
        { en: "Customers requiring assistance should approach counter 4. (= who require)", tr: "Yardım talep eden müşteriler 4 numaralı gişeye yaklaşmalıdır. (Aktif: requiring - Kolay)" },
        { en: "Loans approved before October will benefit from lower rates. (= which were approved)", tr: "Ekimden önce onaylanan krediler daha düşük faizlerden yararlanacak. (Pasif: approved - Orta)" },
        { en: "The capital raised through the initial public offering was allocated to tech investments.", tr: "Halka arz yoluyla toplanan sermaye teknoloji yatırımlarına tahsis edildi. (Pasif: raised - İleri)" }
      ],
      whyRightWrong: "İsim ile kısaltma fiili arasına bak: 'Loans' kredilerdir; krediler onaylamaz, onaylanır! O halde 'approving' değil 'approved' olmalıdır.",
      examTips: "Cümlede zaten ana bir yüklem varsa (örneğin 'will benefit'), boşluğa ikinci bir çekimli yüklem (was approved vb.) KOYAMAZSIN; kısaltma (approved) gerekir!",
      traps: "Cümlede iki yüklem arasına bağlaç olmadan yeni bir çekimli fiil koyan şıkları ele!",
      miniQuiz: {
        question: "Any commercial transaction _______ the statutory reporting limit must be flagged by the automated anti-laundering system.",
        options: ["exceeds", "exceeded", "exceeding", "is exceeded"],
        correctIndex: 2,
        explanation: "Cümlenin ana yüklemi 'must be flagged'dir. 'Any commercial transaction' öznesini niteleyen aktif bir kısaltma gereklidir (= which exceeds): 'exceeding'."
      },
      wrongAnalysis: "A'yı (exceeds) seçtiysen cümleye bağlaçsız ikinci bir ana fiil soktun. B'yi seçtiysen işlemi pasif sandın."
    },

    // --- KATEGORİ F: EDATLAR & KELİME TÜRLERİ ---
    {
      id: "form-prep-time-place",
      catId: "cat-prepositions",
      title: "Zaman ve Mekan Edatları (in, on, at)",
      formula: "in (Geniş: Yıl, Ay, Ülke) | on (Belirli: Gün, Tarih, Cadde) | at (Nokta: Saat, Belirli Mekan)",
      purpose: "Zaman ve mekan hiyerarşisini piramit şeklinde düzenler: En geni elementten (in) en dar ve net noktaya (at) doğru daralır.",
      parts: "in: in 2026, in May, in Turkey, in the morning | on: on Monday, on May 15, on the corner | at: at 3 PM, at the headquarters, at night.",
      trComparison: "Türkçede hepsi tek bir ek olan '-de / -da'dır (2026'da, pazartesi de, saat 3'te). İngilizce ise kapsama alanına göre böler.",
      examples: [
        { en: "The monetary policy announcement will take place at 2:00 PM on Thursday.", tr: "Para politikası duyurusu perşembe günü saat 14:00'te gerçekleşecek. (at saat, on gün - Kolay)" },
        { en: "The current liquidity framework was introduced in 2021.", tr: "Mevcut likidite çerçevesi 2021 yılında yürürlüğe girdi. (in yıl - Kolay)" },
        { en: "Our operations in the London office remain robust.", tr: "Londra ofisindeki operasyonlarımız güçlü kalmaya devam ediyor. (in şehir - Orta)" }
      ],
      whyRightWrong: "Tarihlerde dikkat: Sadece ay varsa 'IN May', ama gün ve ay birlikte verilmişse 'ON May 15'!",
      examTips: "Saat gördün -> 'at'. Gün/Tarih gördün -> 'on'. Yıl/Ay/Mevsim gördün -> 'in'.",
      traps: "'at the weekend' (İngiliz İngilizcesi) vs 'on the weekend' (Amerikan İngilizcesi). Sınavlarda genellikle standart 'on Monday' veya 'in July' gibi net kalıplar sorulur.",
      miniQuiz: {
        question: "The bilateral trade pact was officially ratified _______ November 12, _______ a ceremony held in Ankara.",
        options: ["in / on", "on / at", "at / in", "on / on"],
        correctIndex: 1,
        explanation: "'November 12' belirli bir tarihtir (gün içerir), bu yüzden 'on' alır. Törenin yapıldığı spesifik etkinlik mekanı için ise 'at a ceremony' kullanılır."
      },
      wrongAnalysis: "A'yı seçtiysen sadece 'November'a odaklanıp 12 sayısını (günü) kaçırdın."
    },
    {
      id: "form-word-type-discovery",
      catId: "cat-prepositions",
      title: "Boşluğun Sağı & Solu Formülü (Kelime Türü Tespiti)",
      formula: "a/an/the + [SIFAT] + İsim | Fiil + [ZARF (-ly)] | [İSİM] + Fiil",
      purpose: "Sözcük anlamını hiç bilmesen bile gramer pozisyonundan doğru sözcük türevini (-tion, -ment, -ly, -ive) seçmeni sağlar.",
      parts: "Belirteç (the/a/an) ile İsim arasına SIFAT girer. Fiilden hemen sonra veya cümlenin sonunda eylemi niteleyen ZARF (-ly) gelir.",
      trComparison: "Türkçede de 'hızlı büyüme' (sıfat+isim) ve 'hızla büyüdü' (zarf+fiil) ayrımı vardır.",
      examples: [
        { en: "The bank achieved substantial growth this year.", tr: "Banka bu yıl kayda değer bir büyüme elde etti. (substantial [sıfat] + growth [isim] - Kolay)" },
        { en: "The stock price dropped dramatically following the news.", tr: "Hisse senedi fiyatı haberin ardından dramatik bir şekilde düştü. (dropped [fiil] + dramatically [zarf] - Kolay)" },
        { en: "Effective communication is essential for organizational success.", tr: "Etkili iletişim örgütsel başarı için elzemdir. (Sıfat + İsim - Orta)" }
      ],
      whyRightWrong: "'dropped dramatic' YANLIŞTIR; fiili sıfat niteleyemez, zarf (-ly) nitelemelidir.",
      examTips: "Son eklere göre tür analizi: İsim (-tion, -ment, -ness, -ity), Sıfat (-ive, -al, -able, -ful), Zarf (-ly).",
      traps: "Her -ly ile biten zarf değildir! 'friendly, costly, lovely' birer SIFATTIR! 'costly investment' (maliyetli yatırım - sıfat).",
      miniQuiz: {
        question: "The implementation of the AI-driven core banking software resulted in a _______ increase in transaction speed.",
        options: ["significance", "significantly", "significant", "signify"],
        correctIndex: 2,
        explanation: "'a [_____] increase' yapısında 'increase' bir isimdir (artış). İsimden önce onu niteleyen SIFAT gelmelidir: 'significant' (kayda değer)."
      },
      wrongAnalysis: "B'yi (significantly) seçtiysen ismi nitelemek için zarf kullandın. A'yı seçtiysen iki ismi gereksiz yere yan yana koydun."
    },

    // --- KATEGORİ G: KARŞILAŞTIRMALAR & MODALS ---
    {
      id: "form-comp-as-as",
      catId: "cat-structures",
      title: "Eşitlik ve Üstünlük Karşılaştırmaları (as...as, more...than)",
      formula: "as + Sıfat/Zarf + as (Eşitlik) | Comparative + than (Üstünlük)",
      purpose: "İki finansal varlığı, şirketi veya göstergeyi eşitlik veya üstünlük açısından kıyaslar.",
      parts: "'as ... as' arasına sıfat veya zarf YALIN girer (as high as). Üstünlükte tek heceliler '-er than' (higher than), çok heceliler 'more ... than' alır.",
      trComparison: "as...as = '... kadar'; more...than = '...-den daha ...'.",
      examples: [
        { en: "The yield on government bonds is not as high as last quarter.", tr: "Devlet tahvillerinin getirisi geçen çeyrekteki kadar yüksek değil. (as high as - Kolay)" },
        { en: "Emerging markets are more volatile than developed economies.", tr: "Gelişmekte olan piyasalar gelişmiş ekonomilerden daha dalgalıdır. (more volatile than - Kolay)" },
        { en: "The new protocol works as efficiently as the previous enterprise framework.", tr: "Yeni protokol önceki kurumsal çerçeve kadar verimli çalışıyor. (Zarf: as efficiently as - Orta)" }
      ],
      whyRightWrong: "'as higher as' KESİNLİKLE YANLIŞTIR! 'as...as' arasına derecelendirilmiş sıfat giremez, sadece yalın sıfat/zarf girer.",
      examTips: "Cümlede 'than' gördüysen şıklarda mutlaka '-er' veya 'more' ara. 'as' gördüysen ikinci 'as'i ara.",
      traps: "Olumsuz eşitlikte ilk 'as' yerine 'so' gelebilir: 'not so high as'.",
      miniQuiz: {
        question: "The quarterly revenue growth was not _______ robust _______ the board had initially projected.",
        options: ["so / that", "as / as", "more / than", "such / as"],
        correctIndex: 1,
        explanation: "'not as robust as' eşitlik/kıyas kalıbıdır. 'robust' sıfatı yalın durumdadır ve beklentiyle karşılaştırılmaktadır."
      },
      wrongAnalysis: "A'yı (so/that) seçtiysen derece-sonuç bağlacıyla eşitlik kıyaslamasını karıştırdın."
    },
    {
      id: "form-comp-too-enough",
      catId: "cat-structures",
      title: "Aşırılık ve Yeterlilik Yapıları (too...to V1 vs Adj + enough to V1)",
      formula: "too + Sıfat + to + V1 (Olumsuz Aşırılık) | Sıfat + enough + to + V1 (Yeterlilik)",
      purpose: "'too...to' bir şeyin bir eylemi yapamayacak kadar aşırı olduğunu (gizli olumsuzluk); 'enough to' ise bir eylemi yapmaya yetecek seviyede olduğunu bildirir.",
      parts: "'too' sıfattan ÖNCE gelir ('too high to afford'). 'enough' ise sıfattan SONRA gelir ('strong enough to survive')!",
      trComparison: "too high to buy = 'alamayacak kadar yüksek'; rich enough to buy = 'alacak kadar zengin'.",
      examples: [
        { en: "The interest rate was too high for small businesses to borrow.", tr: "Faiz oranı küçük işletmelerin borçlanamayacağı kadar yüksekti. (too high to borrow - Kolay)" },
        { en: "The commercial bank's capital reserves are large enough to absorb sudden shocks.", tr: "Ticari bankanın sermaye karşılıkları ani şokları absorbe edecek kadar büyüktür. (large enough to absorb - Orta)" },
        { en: "The regulatory fine was too severe for the startup to recover.", tr: "Yasal ceza girişimin toparlanamayacağı kadar ağırdı. (İleri)" }
      ],
      whyRightWrong: "'enough strong' YANLIŞTIR! Sıfat daima 'enough'ın ÖNÜNDE yer alır: 'strong enough'. İsim ise arkasında yer alır: 'enough money'.",
      examTips: "Sıfattan sonra gelen 'enough to V1' sözcük sırası sınavların en sevdiği çeldiricidir.",
      traps: "'too' kendi içinde gizli bir 'yapılamaz / imkansız' olumsuzluğu taşır; cümlede 'not' olmasa bile sonuç olumsuzdur!",
      miniQuiz: {
        question: "The firm's liquidity buffer is not _______ to withstand an extended economic downturn.",
        options: ["enough resilient", "resilient enough", "too resilient", "so resilient"],
        correctIndex: 1,
        explanation: "Sıfat (resilient) ile 'enough' sıralamasında sıfat ÖNCE gelir: 'resilient enough to withstand' (dayanacak kadar dirençli)."
      },
      wrongAnalysis: "A'yı (enough resilient) seçtiysen sıfatın 'enough'tan önce gelmesi gerektiği kuralını ters uyguladın."
    },
    {
      id: "form-modal-past-deductions",
      catId: "cat-structures",
      title: "Geçmişe Dair Modal Çıkarımları (Must have V3 vs Should have V3)",
      formula: "Must have + V3 (Kuvvetli İhtimal) | Should have + V3 (Tavsiye/Pişmanlık)",
      purpose: "Geçmişte yaşanmış bir olaya dair mantıksal çıkarım yaparken veya yapılması gerekip de yapılmayan hataları ifade ederken kullanılır.",
      parts: "Modal + have + V3. Zamanı geçmişe çeken parça 'have + V3'tür.",
      trComparison: "Must have V3 = 'yapmış olmalı (kesin öyle oldu)'; Should have V3 = 'yapmalıydı (ama yapmadı!)'; Couldn't have V3 = 'yapmış olamaz'.",
      examples: [
        { en: "The vault is completely empty; the thieves must have disabled the alarm.", tr: "Kasa tamamen boş; hırsızlar alarmı devre dışı bırakmış olmalı. (Kuvvetli geçmiş çıkarımı - Kolay)" },
        { en: "The risk management team should have hedged against currency fluctuations.", tr: "Risk yönetim ekibi kur dalgalanmalarına karşı önlem almalıydı. (Ama almadı! - Pişmanlık/Eleştiri - Orta)" },
        { en: "The junior clerk couldn't have authorized such a massive transaction alone.", tr: "Genç memur tek başına böylesine devasa bir işleme yetki vermiş olamaz. (İmkansızlık - İleri)" }
      ],
      whyRightWrong: "'must do' (şimdi yapmalı - zorunluluk) vs 'must have done' (geçmişte yapmış olmalı - mantıksal tahmin). Anlam tamamen başkadır!",
      examTips: "'should have V3' sınavda daima 'keşke yapılsaydı ama maalesef yapılmadı' bağlamında bir eleştiri sorusu olarak gelir.",
      traps: "'must have V3' geçmiş zorunluluk DEĞİLDİR! Geçmiş zorunluluk 'HAD TO'dur. 'I had to pay the fine' (Cezayı ödemek zorunda kaldım).",
      miniQuiz: {
        question: "The compliance officer _______ the suspicious transaction before authorizing the offshore wire, but he overlooked the red flags.",
        options: [
          "must investigate",
          "should have investigated",
          "could investigate",
          "might have investigated"
        ],
        correctIndex: 1,
        explanation: "Cümlenin devamında 'ancak kırmızı bayrakları (uyarıları) gözden kaçırdı' deniyor. Yani 'incelemeliydi ama incelemedi' eleştirisi vardır: 'should have investigated'."
      },
      wrongAnalysis: "A'yı seçtiysen geçmişte bitmiş bir olaya present modal koydun. D'yi seçtiysen gerçekleşmemiş bir görevin eleştirildiğini fark etmedin."
    }
  ],

  // 4. BAŞLANGIÇ DERSİ: V1, V2, V3 VE YARDIMCI FİİLLERİN DERİN MANTIĞI
  introLesson: {
    id: "lesson-01-v123-aux",
    title: "1. Temel Ders: V1, V2, V3 ve Yardımcı Fiillerin Mantığı",
    subtitle: "Ezber Bozan Mantık: İngilizcede Neden 3 Fiil Hali Var ve Yardımcı Fiiller Nasıl Çalışır?",
    sections: [
      {
        title: "1. Neden 3 Farklı Fiil Hali Var? (V1, V2, V3'ün Görev Bölüşümü)",
        content: `İngilizcede fiil hallerini ezberlemek yerine arkasındaki mantığı kavramak her şeyi kolaylaştırır:
        
        • **V1 (Base / Bare Form):** Fiilin en yalın, çıplak sözlük halidir (write, do, break). Kendi üzerinde hiçbir zaman veya kip yükü taşımaz. Çok hafiftir. Bu yüzden modalların (can, must, will) ve 'do/does/did' yardımcı fiillerinin arkasından daima V1 gelir. Çünkü zaman yükünü zaten yardımcı fiil sırtlamıştır!
        
        • **V2 (Past Simple Form):** Fiilin TEK BAŞINA geçmiş zaman yüklemi olabildiği tek haldir (wrote, did, broke). Sadece geçmişte bitmiş eylemlerde kullanılır. Yanına yardımcı fiil ALMAZ. 'I wrote a letter' derken 'wrote' tek başına yüklemdir.
        
        • **V3 (Past Participle Form):** İşte en büyük sınav sırrı: **V3 BİR ZAMAN DEĞİLDİR!** V3, fiilden türetilmiş 'bitmişlik ve pasiflik sıfatıdır' (written = yazılmış, broken = kırılmış, stolen = çalınmış). 
        Tek başına cümle kuramaz! 'The window broken' derseniz cümle olmaz ('Kırılmış pencere' olur). Cümle olması için yanına ya 'have/has' alıp Perfect Zaman olmalıdır ('I have written'), ya da 'be' fiilini alıp Edilgen (Passive) olmalıdır ('The window was broken').`
      },
      {
        title: "2. 'did' Neden Ardından V1 İster?",
        content: `Çoğu öğrenci 'did went' veya 'did finished' hatası yapar. Neden yanlıştır?
        
        İngilizcede bir kural vardır: **'Bir cümlede zaman yükü yalnızca BİR KEZ taşınır!'**
        
        Olumlu cümlede yardımcı fiil yoktur:
        'She went to the bank.' (Zaman yükünü 'went' [V2] tek başına sırtlar).
        
        Olumsuz veya soru yaparken 'did' sahneye çıkar:
        'did', 'do' fiilinin geçmiş zaman halidir. Yani geçmiş zaman yükünü KENDİSİ sırtına almıştır!
        Cümlenin motoru zamanı üzerine aldığı için, arkasından gelen ana fiil yükten kurtulur ve en hafif haline, yani **V1'e (go)** döner:
        
        • 'She DID not GO.' (Doğru)
        • 'Did they SIGN the deal?' (Doğru)`
      },
      {
        title: "3. 'have/has' Neden V3 ile Kullanılır?",
        content: `Present Perfect Tense'in arkasındaki mantık şudur:
        
        İngilizcede 'have', 'sahip olmak' demektir.
        'V3' ise 'tamamlanmış, bitmiş bir eylem sıfatıdır'.
        
        Şu iki parçayı birleştirin:
        'I have' (Şu anda sahibim) + 'eaten' (yenmiş/bitmiş eyleme) = 'Karnım şu an tok, eylemi bitirmiş durumdayım!'
        
        İşte bu yüzden Present Perfect geçmişte ne zaman olduğunu değil, eylemin **ŞU ANDAKİ ETKİSİNİ** anlatır:
        • 'The central bank has raised the rates.' (Merkez bankası faizleri artırdı ve etkisi ŞU ANDA devrede!).`
      },
      {
        title: "4. 'had + V3' ile 'have/has + V3' Arasındaki Fark",
        content: `İki formül arasındaki farkı tek bir zaman çizgisiyle anlayabilirsiniz:
        
        • **have/has + V3 (Present Perfect):** Referans noktası ŞİMDİDİR (Present). Eylem geçmişte yapılmıştır ama etkisi doğrudan bugüne uzanır.
        
        • **had + V3 (Past Perfect):** Referans noktası GEÇMİŞTE BİR ANDIR (Past). Geçmişteki o andan da DAHA ÖNCE gerçekleşmiş bir olayı anlatır.
        
        Örnek Karşılaştırma:
        - 'The market has recovered.' -> Piyasa şu anda toparlanmış durumdadır (Bugün).
        - 'The market had recovered before the bell rang yesterday.' -> Dün zil çalmadan önce piyasa çoktan toparlanmıştı (Dünün de öncesi).`
      },
      {
        title: "5. 'was doing' ile 'did' Arasındaki Fark: Film Şeridi vs Fotoğraf Karesi",
        content: `• **was doing (Past Continuous):** Geçmişteki bir 'film şerididir'. Eylemin devam ettiğini, belirli bir anda sürecin aktığını gösterir.
        
        • **did (Simple Past):** Geçmişteki tek bir 'fotoğraf karesidir'. Eylem başlamış ve bitmiştir.
        
        Birbirine bağlandıklarında:
        'While the auditor was examining the records, the fire alarm rang.'
        Denetçi kayıtları inceliyordu (Uzun süreç / Film akıyor) -> Yangın alarmı çaldı (Anlık vaka / Fotoğraf karesi süreci kesti).`
      },
      {
        title: "6. 'will + V1' Neden Kullanılır? Modalların Yalın Fiil Kuralı",
        content: `'will', 'can', 'must', 'should', 'may' gibi kelimeler birer yardımcı fiildir (Modal Auxiliary).
        
        Tıpkı 'did' gibi, modallar da kip ve gelecek yükünü tamamen kendi üzerine alır. Ana fiil hiçbir zaman ek alamaz (-s takısı, -ed takısı, -ing takısı ALAMAZ!).
        
        Bu yüzden:
        • 'will be' (will is/are DEĞİL)
        • 'will have' (will has DEĞİL)
        • 'will do' (will did DEĞİL)`
      }
    ],

    // Dersi Pekiştirme Mini Testi (4 Kritik Soru + Düşünme Hatası Teşhisi)
    test: [
      {
        id: "intro-q1",
        question: "Why can we NOT say 'Did they attended the economic summit?' in English?",
        options: [
          "Because 'attend' is an irregular verb.",
          "Because 'did' already carries the past tense marker; the main verb must remain in base form (V1).",
          "Because question sentences always require the past participle (V3).",
          "Because 'economic summit' is a singular noun phrase."
        ],
        correctIndex: 1,
        explanation: "Doğru! 'did' zaten geçmiş zaman yükünü taşır; fiil iki kere geçmişe bükülemez ve yalın (V1 - attend) kalmalıdır.",
        diagnosis: "Eğer başka şık seçtiysen: Yardımcı fiilin ana fiilin yükünü hafiflettiği temel prensibi tekrar gözden geçirmelisin."
      },
      {
        id: "intro-q2",
        question: "Which of the following sentences correctly demonstrates why V3 cannot function as a standalone predicate without an auxiliary verb?",
        options: [
          "The annual report written by the external auditor yesterday.",
          "The annual report was written by the external auditor yesterday.",
          "The annual report wrote by the external auditor yesterday.",
          "The annual report is writing by the external auditor yesterday."
        ],
        correctIndex: 1,
        explanation: "Doğru! 'written' (V3) bir bitmişlik sıfatıdır; tek başına yüklem olamaz. Cümlenin geçmişte pasif yüklem olabilmesi için 'was written' yardımcı fiil kombinasyonu şarttır.",
        diagnosis: "A şıkkını seçtiysen V3'ü tek başına çekimli fiil sanma yanılgısına düştün. C'yi seçtiysen aktif/pasif ayrımını gözden kaçırdın."
      },
      {
        id: "intro-q3",
        question: "In the sentence 'The bank has finalized the agreement', what does the combination 'has + V3' specifically communicate?",
        options: [
          "The agreement was signed in a distant historical century with no current relevance.",
          "The bank possesses the completed state of the agreement right now, and its effect is currently active.",
          "The agreement will be finalized in the near future.",
          "The bank was in the middle of signing when an interruption occurred."
        ],
        correctIndex: 1,
        explanation: "Harika mantık! 'has' (sahip) + 'finalized' (bitmiş duruma). Anlaşma şu an tamamlanmış durumdadır ve etkisi aktif olarak devam etmektedir.",
        diagnosis: "A'yı seçtiysen Simple Past (tarihsel geçmiş) ile Present Perfect farkını karıştırdın."
      },
      {
        id: "intro-q4",
        question: "'By the time the board arrived, the CEO had already signed the decree.' Why is 'had signed' used instead of 'has signed'?",
        options: [
          "Because 'arrived' is in the past; the signing happened even BEFORE that past moment (Past of the Past).",
          "Because 'had' is always used with singular subjects like CEO.",
          "Because 'already' cannot be used with 'has'.",
          "Because 'the decree' is a passive object."
        ],
        correctIndex: 0,
        explanation: "Kusursuz! 'arrived' geçmişte bir andır. İmzalama eylemi yönetim kurulu gelmeden önce de tamamlanıp bittiği için geçmişin geçmişi olan 'had signed' kullanılmıştır.",
        diagnosis: "B'yi seçtiysen 'had'in özne tekilliğiyle ilgisi olmadığını (tüm öznelerde had olduğunu) hatırlamalısın."
      }
    ]
  }
};

// JSON dosyasına kaydet
const outputPath = path.join(__dirname, '..', 'data', 'english_formulas.json');
fs.writeFileSync(outputPath, JSON.stringify(formulasData, null, 2), 'utf-8');

console.log(`[SUCCESS] english_formulas.json generated successfully at ${outputPath}`);
console.log(`Total Primers: ${formulasData.primers.length}`);
console.log(`Total Algorithm Steps: ${formulasData.algorithm.steps.length}`);
console.log(`Total Formulas: ${formulasData.formulas.length}`);
console.log(`Intro Lesson Sections: ${formulasData.introLesson.sections.length}`);
