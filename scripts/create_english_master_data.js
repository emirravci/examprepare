const fs = require('fs');
const path = require('path');

const topics = [
  // 1. Tenses
  {
    id: "eng-topic-01",
    number: 1,
    title: "Tenses (Zamanlar)",
    subtitle: "Present, Past, Future, Perfect Zamanlar ve Karşılaştırma",
    icon: "fa-clock",
    summary: "Sınavda zaman soruları anlamdan ziyade 'Zaman İpuçları' ve 'Zaman Uyumu (Tense Agreement)' kurallarıyla 15 saniyede çözülür.",
    theory: [
      {
        heading: "1. Temel Zaman Yapıları ve Anahtar Kelimeleri",
        content: "• **Present Simple:** Genel doğrular, rutinler, banka/şirket işleyişleri. İpuçları: *always, regularly, generally, each month*.\n• **Present Continuous:** Şu anda süren veya geçici durumlar, trendler. İpuçları: *currently, nowadays, at present, gradually increasing*.\n• **Past Simple:** Geçmişte net bir tarihte bitmiş olaylar. İpuçları: *in 1923, yesterday, ago, last year, initially, originally*.\n• **Past Continuous:** Geçmişte devam etmekte olan eylemler (*was/were V-ing*). İpuçları: *while, as, at that time*.\n• **Present Perfect (have/has V3):** Geçmişte başlayıp etkisi süren veya zamanı belirtilmemiş durumlar. İpuçları: *since, for, recently, so far, over the last decade*.\n• **Past Perfect (had V3):** Geçmişteki iki olaydan DAHA ÖNCE olanı. Tek başına kullanılmaz, mutlaka Past Simple bir referans gerekir! İpuçları: *by the time + V2, before, after*.\n• **Future Tenses:** Gelecek planları veya tahminler (*will / be going to / will have V3*). İpuçları: *next month, by next year, in the future*."
      },
      {
        heading: "2. Sınavın En Kritik Zaman Kuralları",
        content: "1. **Zaman Uyumu (Tense Agreement):** Present/Future ile Past aynı cümlede keyfi bağlanamaz! (Past + Past veya Present + Present/Future uyumu esastır).\n2. **SINCE Kuralı:** `Since + Simple Past (V2) , Present Perfect (have/has V3)`. Sınavların en sevdiği formüldür!\n3. **Zaman Bağlaçlarında Will/Would Yasağı:** `When, as soon as, after, before, until, by the time` gibi zaman bağlacının hemen arkasından gelen yan cümleye ASLA 'will' veya 'would' gelmez!"
      }
    ],
    tables: [
      {
        title: "Tenses Karşılaştırma ve İpucu Tablosu",
        headers: ["Zaman (Tense)", "Kalıp", "Sınav Anahtar Kelimeleri (Clues)", "Banka/Ekonomi Örneği"],
        rows: [
          ["Present Simple", "V1 / V-s", "regularly, annually, usually, every day", "The central bank regulates credit flow."],
          ["Present Continuous", "am/is/are + V-ing", "currently, at present, these days, gradually", "Domestic consumer spending is rising."],
          ["Past Simple", "V2 (did)", "in 2008, last quarter, ago, previously, founded", "Ziraat Bank was founded in 1863."],
          ["Present Perfect", "have/has + V3", "since, so far, recently, over the past 5 years", "Digital loans have expanded rapidly."],
          ["Past Perfect", "had + V3", "by the time + V2, before + V2, prior to", "The market had crashed before rates fell."],
          ["Future Perfect", "will have + V3", "by next year, by the end of 2026", "By 2027, the bank will have renewed its core IT."]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (Zaman Uyumu Elemesi):** Şıklarda bir tarafta Past (örn. *was/had*), diğer tarafta Future (*will*) veya Present Perfect (*has done*) varsa o şıkkı doğrudan eleyin.",
      "📌 **Taktik 2 (Zaman Bağlacı Tuzağı):** Boşluk `when, after, until, as soon as` bağlacının hemen içindeyse, şıklardaki `will / would` seçeneklerini anında çizin.",
      "📌 **Taktik 3 (By the time Formülü):**\n• `By the time + V2 (Past)` ➔ Diğer taraf: `had + V3 (Past Perfect)`\n• `By the time + V1 (Present)` ➔ Diğer taraf: `will have + V3 (Future Perfect)`",
      "📌 **Taktik 4 (Since Görünce):** Boşluklardan biri 'Since'in yanındaysa V2, ana cümle ise mutlaka `have/has + V3` olmalıdır."
    ],
    examples: [
      {
        en: "Since the regulatory authority introduced stricter AML rules in 2021, suspicious transactions have dropped significantly.",
        tr: "Düzenleyici otorite 2021'de daha sıkı kara para aklama kuralları getirdiğinden beri, şüpheli işlemler önemli ölçüde düşmüştür.",
        clue: "Since + introduced (V2) , have dropped (Present Perfect)."
      },
      {
        en: "By the time the foreign currency reserves were exhausted, the government had already enacted emergency capital controls.",
        tr: "Döviz rezervleri tükenene kadar, hükümet çoktan acil durum sermaye kontrollerini yürürlüğe koymuştu.",
        clue: "By the time + were (V2) ➔ had already enacted (Past Perfect)."
      }
    ],
    quiz: [
      {
        id: "q-top01-1",
        difficulty: 1,
        stem: "Since the commercial lender ________ its online mobile app last quarter, customer transactions ________ substantially.",
        options: ["updated / have increased", "updates / increased", "had updated / will increase", "was updating / would increase", "has updated / increase"],
        answerIndex: 0,
        explanation: "Klasik 'Since + V2 (Simple Past) , have/has V3 (Present Perfect)' kuralı. 'updated' ve 'have increased' tam oturur.",
        ruleTag: "Since Kuralı"
      },
      {
        id: "q-top01-2",
        difficulty: 2,
        stem: "As soon as the monetary committee ________ the benchmark rate tomorrow morning, commercial interest yields ________ accordingly.",
        options: ["will announce / adjust", "announces / will adjust", "announced / have adjusted", "has announced / adjusted", "is announcing / had adjusted"],
        answerIndex: 1,
        explanation: "Zaman bağlaçlarının (as soon as) hemen arkasından 'will' gelmez. Gelecek bildiren durumlarda: As soon as + Present Simple (announces), ana cümle Future Simple (will adjust) olur.",
        ruleTag: "Zaman Bağlaçlarında Will Yasağı"
      },
      {
        id: "q-top01-3",
        difficulty: 2,
        stem: "By the time the board of directors assembled for the emergency meeting yesterday, the chief executive ________ his resignation.",
        options: ["submits", "had already tendered", "has tendered", "will tender", "is tendering"],
        answerIndex: 1,
        explanation: "By the time + Past Simple (assembled), geçmişte daha önce tamamlanan olay için Past Perfect (had already tendered) gerektirir.",
        ruleTag: "By the time + Past"
      },
      {
        id: "q-top01-4",
        difficulty: 2,
        stem: "Over the past five years, domestic commercial banks ________ heavily in cloud infrastructure to optimize operational workflows.",
        options: ["invested", "have invested", "had invested", "will invest", "are investing"],
        answerIndex: 1,
        explanation: "'Over the past / last X years' geçmişten günümüze süregelen bir dönemi anlattığı için Present Perfect (have invested) ile kullanılır.",
        ruleTag: "Over the past years"
      },
      {
        id: "q-top01-5",
        difficulty: 3,
        stem: "In 1863, Mithat Pasha ________ the first Homeland Funds (Memleket Sandıkları), which later ________ into modern Ziraat Bank.",
        options: ["establishes / evolve", "established / evolved", "has established / was evolving", "had established / will evolve", "was establishing / has evolved"],
        answerIndex: 1,
        explanation: "'In 1863' belirli bir geçmiş tarih bildirdiğinden her iki fiil de Simple Past (V2 - established / evolved) olmalıdır.",
        ruleTag: "Geçmiş Net Tarih (V2)"
      }
    ]
  },

  // 2. Modal Verbs
  {
    id: "eng-topic-02",
    number: 2,
    title: "Modal Verbs (Kipler)",
    subtitle: "Present Modals, Zorunluluk, Tavsiye ve Geçmiş Çıkarımlar (Past Modals)",
    icon: "fa-shield-halved",
    summary: "Sınavda en çok puan getiren kısım geçmişe dair pişmanlık ve güçlü çıkarım bildiren 'Past Modals' (Modal + have + V3) yapılarıdır.",
    theory: [
      {
        heading: "1. Temel Modallar (Present & Future)",
        content: "• **Can / Could:** Yetenek, izin veya genel olasılık (*can approve loans*).\n• **May / Might:** İhtimal (*may fluctuate slightly* - ihtiyatlı dil).\n• **Must / Have to:** Zorunluluk. *Must* kişisel/içsel zorunluluk, *Have to* yasal/dış kural (*Banks have to comply with BDDK*).\n• **Should / Ought to:** Tavsiye, öneri (*Auditors should inspect files regularly*).\n• **Needn't / Don't have to:** Zorunluluk olmaması (*Gereği yok*)."
      },
      {
        heading: "2. Sınavın Gözdesi: Geçmiş Çıkarımları (Past Modals)",
        content: "• **Must have V3:** Geçmişe dair güçlü kesin çıkarım (*... yapmış olmalı!* Örn: The hacker must have known the password).\n• **Can't / Couldn't have V3:** Geçmişte imkansızlık (*... yapmış olamaz!* Örn: He couldn't have authorized the transfer).\n• **Should have V3 / Ought to have V3:** Geçmişte yapılmalıydı ama yapılmadı (Pişmanlık/Eleştiri. Örn: They should have taken precautions).\n• **Could have V3 / Might have V3:** Geçmişte yapabilirdi/olabilirdi ama olmadı (Gerçekleşmemiş ihtimal)."
      }
    ],
    tables: [
      {
        title: "Past Modals Özet Tablosu",
        headers: ["Past Modal Kalıbı", "Anlamı & Mesajı", "Sınav İpucu / Durum", "Örnek Cümle"],
        rows: [
          ["Must have + V3", "Yapmış olmalı (Kesin çıkarım)", "Kanıt var, başka açıklama yok", "The alarm was off; the guard must have disabled it."],
          ["Should have + V3", "Yapsaydı iyi olurdu (Yapmadı)", "Hata, zarar veya pişmanlık var", "The bank should have diversified its loan portfolio."],
          ["Couldn't have + V3", "Yapmış olamaz (İmkansızlık)", "Fiziksel veya mantıksal engel var", "He couldn't have stolen it; he was in Ankara."],
          ["Might / Could have + V3", "Yapabilirdi / Olabilirdi", "Gerçekleşmemiş risk / ihtimal", "The crisis could have triggered bank runs, but didn't."]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (Pişmanlık / Zarar Varsa):** Soru kökünde 'keşke', 'hata oldu', 'zarar meydana geldi', 'ama yapmadı' vurgusu varsa cevap %90 `should have + V3` veya `ought to have + V3`tür.",
      "📌 **Taktik 2 (Güçlü Kanıt Varsa):** Cümlede 'otherwise the system would have crashed' gibi kesin bir durum varsa cevap `must have + V3`tür.",
      "📌 **Taktik 3 (Modal Arkasından V1 Gelir):** Modalların (*must, can, should*) ardından fiil yalın gelir (*to* almaz). Sadece *have to, ought to, used to* 'to' ile kullanılır."
    ],
    examples: [
      {
        en: "Given the immaculate financial records, the internal audit committee must have reviewed all balance sheets thoroughly.",
        tr: "Kusursuz mali kayıtlar göz önüne alındığında, iç denetim komitesi tüm bilançoları derinlemesine incelemiş olmalı.",
        clue: "Kusursuz kayıtlar güçlü kanıttır ➔ must have reviewed."
      },
      {
        en: "The branch manager should have notified senior management immediately upon discovering the fraudulent transfer.",
        tr: "Şube müdürü, sahtekar havaleyi fark eder etmez üst yönetime derhal bildirmeliydi (ama bildirmedi).",
        clue: "Yapılması gerekip yapılmayan görev ➔ should have notified."
      }
    ],
    quiz: [
      {
        id: "q-top02-1",
        difficulty: 1,
        stem: "All commercial institutions operating in the domestic banking sector ________ strictly comply with anti-money laundering regulations.",
        options: ["must", "might", "could", "would rather", "used to"],
        answerIndex: 0,
        explanation: "Yasal ve zorunlu bir kural bildirildiğinde 'must' kullanılır.",
        ruleTag: "Yasal Zorunluluk (Must)"
      },
      {
        id: "q-top02-2",
        difficulty: 2,
        stem: "The network intruders ________ valid root credentials; otherwise, the perimeter intrusion firewall would have blocked them automatically.",
        options: ["must have used", "should have used", "could not use", "might not use", "would rather use"],
        answerIndex: 0,
        explanation: "Geçmişe dair güçlü bir çıkarım (aksi takdirde alarm engellerdi) bildirildiğinden 'must have used' (kullanmış olmalılar) doğru cevaptır.",
        ruleTag: "Past Deduction (Must have V3)"
      },
      {
        id: "q-top02-3",
        difficulty: 2,
        stem: "The risk committee ________ the borrower's credit background more carefully before approving such an enormous unsecured loan.",
        options: ["should have examined", "must examine", "might examine", "cannot have examined", "would examine"],
        answerIndex: 0,
        explanation: "Kredi onaylanmış ve sonrasında sorun çıkmış; geçmişe dair eleştiri/pişmanlık bildirildiğinden 'should have examined' (incelemeliydi) gereklidir.",
        ruleTag: "Past Regret (Should have V3)"
      },
      {
        id: "q-top02-4",
        difficulty: 2,
        stem: "The junior clerk ________ the confidential ledger yesterday because he was away on annual leave the entire week.",
        options: ["could not have accessed", "must have accessed", "should have accessed", "might access", "has to access"],
        answerIndex: 0,
        explanation: "Kişi bütün hafta izinli olduğu için erişmiş olması imkansızdır: 'could not have accessed' (erişmiş olamaz).",
        ruleTag: "Past Impossibility"
      },
      {
        id: "q-top02-5",
        difficulty: 3,
        stem: "Commercial banks ________ keep all their capital in non-interest-bearing vaults; they can lend a designated portion under reserve limits.",
        options: ["need not", "must", "should", "ought to", "can"],
        answerIndex: 0,
        explanation: "'Zorunluluk yok / gerek yok' anlamı taşımaktadır. Bankalar tüm parayı kasada tutmak zorunda değildir (need not keep).",
        ruleTag: "Lack of Necessity"
      }
    ]
  },

  // 3. Passive Voice
  {
    id: "eng-topic-03",
    number: 3,
    title: "Passive Voice (Edilgen Yapı)",
    subtitle: "Tüm Zamanlarda Passive, Modals + Passive, Active/Passive Ayrımı",
    icon: "fa-arrows-rotate",
    summary: "Banka ve akademik metinlerin %60'ı edilgendir. Özne işi yapmıyor, işten etkileniyorsa formül her zaman: 'be + V3'tür.",
    theory: [
      {
        heading: "1. Edilgen Çatının Temel Formülü",
        content: "Edilgen çatı kuralı istisnasız: `BE Fiili + V3 (Past Participle)`dir.\n• Present Simple: *is/are + V3* (*Loans are granted*)\n• Past Simple: *was/were + V3* (*The branch was opened*)\n• Present Perfect: *have/has been + V3* (*Funds have been disbursed*)\n• Past Perfect: *had been + V3* (*The account had been suspended*)\n• Future Simple: *will be + V3* (*Reports will be published*)\n• Modals: *modal + be + V3* (*Must be verified, can be accessed*)\n• Continuous: *is/are/was/were + being + V3* (*The system is being updated*)"
      },
      {
        heading: "2. Active vs. Passive Nasıl Ayırt Edilir?",
        content: "1. **Özne İşi Yapabilir mi?** Özne cansız veya soyutsa (örn: *kredi, dosya, yönetmelik, sunucu*) fiili kendi kendine yapamaz, edilgen olmak zorundadır!\n2. **Fiilden Sonra Nesne Var mı?** Geçişli bir fiilden sonra nesne yoksa ve 'by' veya edat geliyorsa (%90) Passive yapıdır."
      }
    ],
    tables: [
      {
        title: "Tüm Zamanlarda Passive Çekim Tablosu",
        headers: ["Zaman (Tense)", "Active Örnek", "Passive Formülü", "Passive Örnek"],
        rows: [
          ["Present Simple", "The bank approves loans.", "am/is/are + V3", "Loans are approved by the bank."],
          ["Past Simple", "The board signed the merger.", "was/were + V3", "The merger was signed yesterday."],
          ["Present Perfect", "Auditors have audited files.", "have/has been + V3", "Files have been audited."],
          ["Future (Will)", "IT will deploy the patch.", "will be + V3", "The patch will be deployed tomorrow."],
          ["Modals", "Staff must verify IDs.", "modal + be + V3", "IDs must be verified."]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (Cansız Özne Kuralı):** Cümle 'financial records, regulations, accounts, passwords' ile başlıyorsa şıklardaki etken (active: *stores, had stored, will store*) fiilleri hemen eleyin; mutlaka 'be + V3' arayın.",
      "📌 **Taktik 2 (Preposition Takibi):** Boşluğun hemen ardından 'by the committee', 'in the database' gibi edatlar gelip nesne gelmiyorsa edilgen çatıdır.",
      "📌 **Taktik 3 (Modal Passive):** 'must / should / can' arkasından edilgen geliyorsa araya 'be' girer: `must be examined`, `cannot be solved`."
    ],
    examples: [
      {
        en: "Strict regulatory stress tests are conducted annually to ensure system solvency.",
        tr: "Sistem ödeme gücünü sağlamak amacıyla her yıl sıkı yasal stres testleri uygulanır (yürütülür).",
        clue: "Tests cansızdır, kendi kendine yapamaz ➔ are conducted."
      },
      {
        en: "Confidential customer credentials must not be disclosed under any circumstances.",
        tr: "Gizli müşteri kimlik bilgileri hiçbir koşulda ifşa edilmemelidir.",
        clue: "Modal + be + V3 ➔ must not be disclosed."
      }
    ],
    quiz: [
      {
        id: "q-top03-1",
        difficulty: 1,
        stem: "Agricultural credit applications ________ by the branch evaluation committee within five business days.",
        options: ["are reviewed", "reviews", "is reviewing", "have reviewed", "reviewed"],
        answerIndex: 0,
        explanation: "Özne 'Applications' (başvurular - çoğul ve cansız) incelenen nesnedir. Present Simple passive: 'are reviewed'.",
        ruleTag: "Present Simple Passive"
      },
      {
        id: "q-top03-2",
        difficulty: 2,
        stem: "The historic banking hall ________ completely in 1995 to restore its original Ottoman architectural elegance.",
        options: ["was renovated", "renovated", "has renovated", "is renovating", "will renovate"],
        answerIndex: 0,
        explanation: "'In 1995' geçmiş zamandır ve bina kendi kendini yenileyemez; Past Passive: 'was renovated' (yenilendi).",
        ruleTag: "Past Simple Passive"
      },
      {
        id: "q-top03-3",
        difficulty: 2,
        stem: "Sensitive customer authentication tokens ________ on unencrypted hard drives under any circumstances.",
        options: ["must not be stored", "should not store", "do not store", "might not have stored", "ought not to store"],
        answerIndex: 0,
        explanation: "Token'lar depolanan nesnedir ve kesin yasaklama bildirilmiştir: 'must not be stored' (depolanmamalıdır).",
        ruleTag: "Modal Passive"
      },
      {
        id: "q-top03-4",
        difficulty: 2,
        stem: "By next September, a cutting-edge core payment processing system ________ across all nationwide branch locations.",
        options: ["will have been deployed", "will deploy", "has deployed", "was deployed", "deploys"],
        answerIndex: 0,
        explanation: "'By next September' (Future Perfect) + sistem nesnesi (Passive) ➔ 'will have been deployed' (kurulmuş / devreye alınmış olacak).",
        ruleTag: "Future Perfect Passive"
      },
      {
        id: "q-top03-5",
        difficulty: 3,
        stem: "While the quarterly financial audit ________ by external inspectors, several accounting discrepancies were discovered.",
        options: ["was being conducted", "conducted", "has been conducted", "is conducting", "will be conducted"],
        answerIndex: 0,
        explanation: "'While' geçmişte devam eden süreç bildirir; denetim yapıldığı esnada (Past Continuous Passive): 'was being conducted'.",
        ruleTag: "Past Continuous Passive"
      }
    ]
  },

  // 4. Relative Clauses
  {
    id: "eng-topic-04",
    number: 4,
    title: "Relative Clauses (İlgi Cümlecikleri)",
    subtitle: "Who, Whom, Whose, Which, That; Where, When, Why; Defining vs. Non-Defining",
    icon: "fa-link",
    summary: "İki cümleyi bağlayan sıfat cümlecikleridir. Kendinden önceki ismin insan mı, nesne mi, yer mi veya iyelik mi olduğuna bakarak soru çözülür.",
    theory: [
      {
        heading: "1. İlgi Zamirleri ve Kullanım Yerleri",
        content: "• **Who:** İnsanlar için özne konumunda (*The manager who signed the deal*).\n• **Whom:** İnsanlar için nesne konumunda (arkasından özne gelir: *The applicant whom we interviewed*). Edatla da kullanılır (*to whom*).\n• **Whose:** Sahiplik/iyelik bildirir (*Kişi/Nesne + whose + İsim*. Örn: *The borrower whose assets were frozen*).\n• **Which:** Cansız varlıklar ve hayvanlar için (*The policy which lowered rates*).\n• **That:** Hem insan hem nesne için (defining cümlelerde). **VİRGÜLDEN SONRA ASLA THAT GELMEZ!**\n• **Where:** Yer bildirir (arkasından tam cümle gelir: *The branch where I work*).\n• **When:** Zaman bildirir (*The year when the crisis hit*)."
      },
      {
        heading: "2. Defining vs. Non-Defining (Virgül Kuralı)",
        content: "• **Non-Defining:** İki virgül arasında ekstra bilgi verir. **Altın kural:** Virgül varsa asla 'that' seçilemez! İnsan için 'who/whom', nesne için 'which' kullanılır."
      }
    ],
    tables: [
      {
        title: "Relative Pronouns Karar Tablosu",
        headers: ["Nitelediği İsim", "Rolü / Konumu", "Zamir", "Kritik Sınav İpucu"],
        rows: [
          ["İnsan (Person)", "Özne (+ Fiil)", "who / that", "Kendinden sonra doğrudan fiil gelir."],
          ["İnsan (Person)", "Nesne (+ Özne)", "whom / who", "Preposition arkasından sadece 'whom' gelir (to whom)."],
          ["İnsan / Nesne", "Sahiplik (+ İsim)", "whose", "whose + isim (arada the/a olmaz): whose credit history."],
          ["Cansız Nesne", "Özne / Nesne", "which / that", "Virgül (,) varsa THAT elenir, WHICH seçilir!"],
          ["Mekan (Place)", "İçinde geçen eylem", "where / in which", "Yer isminden sonra tam cümle (+ S + V) gelir."]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (Virgül Varsa That'i Ele):** Boşluğun hemen öncesinde virgül (,) varsa şıklardaki `that` seçeneğini anında eleyin.",
      "📌 **Taktik 2 (Whose Formülü):** Boşluktan hemen sonra çıplak bir isim (*names, car, report, decisions*) geliyorsa cevap %95 `whose`dur (*CEO whose decisions*).",
      "📌 **Taktik 3 (Preposition + Which / Whom):** Boşluğun önünde edat (*in, to, for, with*) varsa: İnsan için sadece `whom` (*with whom*), nesne için sadece `which` (*in which*) gelebilir."
    ],
    examples: [
      {
        en: "The managing director, whose bold investment strategies revived the institution, was honored yesterday.",
        tr: "Cesur yatırım stratejileri kurumu canlandıran genel müdür, dün onurlandırıldı.",
        clue: "director + whose + strategies ➔ Sahiplik."
      },
      {
        en: "The branch office in which (where) the robbery occurred was secured by armed police.",
        tr: "Soygunun gerçekleştiği şube binası silahlı polislerce emniyete alındı.",
        clue: "in which = where (eylemin geçtiği mekan)."
      }
    ],
    quiz: [
      {
        id: "q-top04-1",
        difficulty: 1,
        stem: "The senior economist ________ delivered the keynote lecture on inflation is a former central banker.",
        options: ["who", "which", "whose", "where", "whom"],
        answerIndex: 0,
        explanation: "Önceki isim 'The senior economist' insandır ve boşluktan sonra doğrudan fiil (delivered) geldiği için 'who' kullanılır.",
        ruleTag: "Who (Özne Kişi)"
      },
      {
        id: "q-top04-2",
        difficulty: 2,
        stem: "The supervisory committee questioned the executive, ________ strategic decisions during the acquisition caused heavy losses.",
        options: ["whose", "whom", "which", "where", "that"],
        answerIndex: 0,
        explanation: "'The executive' kişisinin 'strategic decisions' (stratejik kararları) sahipliği anlatılmıştır: 'whose' doğrudur.",
        ruleTag: "Whose (İyelik)"
      },
      {
        id: "q-top04-3",
        difficulty: 2,
        stem: "The national liquidity stabilization program, ________ was launched last January, successfully contained market volatility.",
        options: ["which", "that", "where", "whose", "whom"],
        answerIndex: 0,
        explanation: "Virgül (,) olduğu için 'that' kullanılamaz. Program cansız nesne olduğundan 'which' doğru cevaptır.",
        ruleTag: "Virgül Sonrası Which (That Yasağı)"
      },
      {
        id: "q-top04-4",
        difficulty: 2,
        stem: "The modern financial district ________ international bank headquarters are concentrated has experienced surging real estate prices.",
        options: ["where", "which", "whom", "whose", "that"],
        answerIndex: 0,
        explanation: "'The district' bir mekandır ve arkasından tam bir cümle (merkezler yoğunlaşmıştır) geldiği için 'where' gereklidir.",
        ruleTag: "Where (Mekan)"
      },
      {
        id: "q-top04-5",
        difficulty: 3,
        stem: "The external auditing firm with ________ the bank had signed a multi-year advisory contract terminated the agreement prematurely.",
        options: ["which", "whom", "that", "where", "whose"],
        answerIndex: 0,
        explanation: "'firm' cansız/kurumsal bir tüzel varlıktır ve önünde edat (with) bulunmaktadır: 'with which' doğru yapıdır.",
        ruleTag: "Preposition + Which"
      }
    ]
  },

  // 5. Noun Clauses
  {
    id: "eng-topic-05",
    number: 5,
    title: "Noun Clauses (İsim Cümlecikleri)",
    subtitle: "That, What, Whether / If; Soru Kelimeleri ve Dolaylı Cümle Sırası",
    icon: "fa-quote-left",
    summary: "Cümlenin öznesi veya nesnesi konumunda görev alan cümleciklerdir. En kritik kural: Soru kelimesinden sonra her zaman DÜZ CÜMLE dizilimi gelir.",
    theory: [
      {
        heading: "1. Noun Clause Bağlaçları",
        content: "• **That:** Düz bir cümlenin önüne gelerek onu isimleştirir (*I believe that inflation will decrease*).\n• **Whether ... or not / If:** -ıp ıpmadığı (olasılık/şüphe). *Whether* hem cümlenin başında hem edatlardan sonra gelebilir; *If* sadece fiilden sonra nesne konumunda gelir.\n• **What:** Şey / ne (*What the auditor discovered shocked everyone* - what kendisinden sonra eksik nesneli cümle alır).\n• **Wh- Words (How, Why, Where, When):** Soru anlamı taşımayan dolaylı ifadeler."
      },
      {
        heading: "2. Altın Kural: Düz Cümle Dizilimi",
        content: "Noun Clause içinde ASLA devrik soru sırası kullanılmaz! Soru kelimesinden sonra doğrudan `Özne + Yüklem` gelir.\n• Yanlış: *I wonder why did the bank fail.*\n• Doğru: *I wonder why the bank failed.*"
      }
    ],
    tables: [
      {
        title: "That vs. What vs. Whether Ayrımı",
        headers: ["Bağlaç", "Anlamı", "Arkasından Gelen Yapı", "Örnek"],
        rows: [
          ["That", "-dığı / gerçeği", "Tam Cümle (Eksiksiz)", "Analysts know that rates will rise."],
          ["What", "Şey / Ne", "Eksik Cümle (Özne/Nesne yok)", "What they proposed was accepted."],
          ["Whether (or not)", "-ıp ıpmadığı", "Tam Cümle", "We doubt whether the firm is solvent."]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (Düz Cümle Sırası):** Şıklarda soru sırası (did, does, was the...) olanları doğrudan eleyin; özneyle başlayan düz sıra arayın.",
      "📌 **Taktik 2 (That vs What):** Boşluğun arkasındaki cümlede nesne veya özne eksikse cevap `what`tır; cümle tamamsa `that`tir.",
      "📌 **Taktik 3 (Edat Arkası Whether):** Boşluğun önünde edat (about, of, in) varsa 'if' ASLA seçilemez, `whether` seçilir."
    ],
    examples: [
      {
        en: "What the risk management team discovered during the routine inspection alarmed the board.",
        tr: "Risk yönetim ekibinin rutin denetim sırasında keşfettiği ŞEY yönetim kurulunu telaşlandırdı.",
        clue: "discovered fiilinin nesnesi eksik ➔ What."
      },
      {
        en: "The regulator must investigate whether the applicant fulfills the minimum capital adequacy criteria.",
        tr: "Denetleyici kurum, başvuru sahibinin asgari sermaye yeterliliği kriterlerini karşılayıp karşılamadığını araştırmalıdır.",
        clue: "Karşılayıp karşılamadığı (belirsizlik) ➔ whether."
      }
    ],
    quiz: [
      {
        id: "q-top05-1",
        difficulty: 1,
        stem: "Senior banking economists believe ________ continuous monetary tightening will soon stabilize the domestic currency.",
        options: ["that", "what", "whether", "where", "which"],
        answerIndex: 0,
        explanation: "Arkasından eksiksiz tam bir cümle geldiği ve bir gerçeği ifade ettiği için 'that' kullanılır.",
        ruleTag: "That Clause"
      },
      {
        id: "q-top05-2",
        difficulty: 2,
        stem: "________ the commercial enterprise can survive the macroeconomic recession depends on its liquid reserves.",
        options: ["Whether", "If", "What", "Which", "That"],
        answerIndex: 0,
        explanation: "Cümle başında 'olup olmadığı' anlamında sadece 'Whether' kullanılabilir; 'If' cümle başında özne konumunda kullanılmaz.",
        ruleTag: "Whether at Sentence Start"
      },
      {
        id: "q-top05-3",
        difficulty: 2,
        stem: "The judicial investigators could not determine ________ the cyber attackers managed to breach the encrypted database.",
        options: ["how", "that", "what", "which", "whom"],
        answerIndex: 0,
        explanation: "Saldırganların veritabanını 'nasıl' aştığı anlatılmaktadır; yöntem bildiren 'how' doğru cevaptır.",
        ruleTag: "Wh- Noun Clause"
      },
      {
        id: "q-top05-4",
        difficulty: 2,
        stem: "The board members debated about ________ they should proceed with the proposed cross-border bank acquisition.",
        options: ["whether", "if", "that", "what", "which"],
        answerIndex: 0,
        explanation: "Edattan (about) sonra 'if' gelemez; 'olup olmadığı' anlamında edat arkasından sadece 'whether' gelir.",
        ruleTag: "Preposition + Whether"
      },
      {
        id: "q-top05-5",
        difficulty: 3,
        stem: "________ surprised the financial analysts most was the sudden declaration of an unexpected special cash dividend.",
        options: ["What", "That", "Which", "Whether", "Where"],
        answerIndex: 0,
        explanation: "'Surprised' fiilinin öznesi eksiktir; 'Analistleri en çok şaşırtan ŞEY' anlamında 'What' kullanılır.",
        ruleTag: "What Clause"
      }
    ]
  },

  // 6. Adverbial Clauses
  {
    id: "eng-topic-06",
    number: 6,
    title: "Adverbial Clauses (Zarf Cümlecikleri)",
    subtitle: "Zaman, Neden, Koşul, Zıtlık ve Amaç Bildiren Zarf Yapıları",
    icon: "fa-compass",
    summary: "Ana cümlenin zamanını, nedenini veya amacını niteleyen yan cümlelerdir. Cümleler arası mantık ilişkisini çözen adaya doğrudan net kazandırır.",
    theory: [
      {
        heading: "1. Zarf Cümleciği Türleri",
        content: "• **Zaman (Time):** *When, while, as, as soon as, once, until, before, after*.\n• **Neden (Cause):** *Because, since, as, seeing that, inasmuch as*.\n• **Zıtlık (Concession):** *Although, even though, though, whereas, while*.\n• **Amaç (Purpose):** *So that, in order that* (+ modal: can, could, may, might).\n• **Koşul (Condition):** *If, provided that, as long as, unless*."
      },
      {
        heading: "2. Kısaltmalar (Reduction in Adverbial Clauses)",
        content: "Özneler aynı olduğunda bağlaçtan sonra kısaltma yapılabilir:\n• Aktif eylem: *V-ing* (*After examining the ledger = After he examined*)\n• Pasif eylem: *V3* (*When approved by the board = When it is approved*)"
      }
    ],
    tables: [
      {
        title: "Zarf Cümlecikleri Türleri ve İşlevleri",
        headers: ["Tür", "Bağlaçlar", "Anlamı", "Örnek"],
        rows: [
          ["Time", "as soon as, once, until", "Yapar yapmaz / -e kadar", "Once inflation stabilizes, rates will drop."],
          ["Cause", "since, as, because", "-dığı için, mademki", "Since rates are low, credit demand rises."],
          ["Purpose", "so that, in order that", "-sın diye, amacıyla", "They saved data so that audits could proceed."],
          ["Concession", "while, whereas", "Oysa, -e rağmen", "While profits fell, solvency stayed high."]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (So that Arkasından Modal Gelir):** Boşluktan sonraki cümlede `can, could, may, might, would` varsa amaç bildiren `so that` bağlacı aranmalıdır.",
      "📌 **Taktik 2 (Once = As soon as):** Cümle başında `Once` görürseniz 'yapar yapmaz / bir kere olunca' anlamındadır; zaman uyumu gerektirir.",
      "📌 **Taktik 3 (Reduction / Kısaltma):** Cümle başında bağlaçtan hemen sonra özne yoksa, etken eylemler için `V-ing`, edilgen eylemler için `V3` seçilir."
    ],
    examples: [
      {
        en: "Once the national payment gateway went live, retail transaction processing times plunged.",
        tr: "Ulusal ödeme geçidi canlıya alınır alınmaz (bir kez alınınca), perakende işlem süreleri hızla düştü.",
        clue: "Once = as soon as."
      },
      {
        en: "The bank upgraded its mainframe servers so that customer queries could be resolved instantaneously.",
        tr: "Banka, müşteri sorguları anında çözülebilisin diye ana sunucularını yükseltti.",
        clue: "so that + could be resolved (Amaç)."
      }
    ],
    quiz: [
      {
        id: "q-top06-1",
        difficulty: 1,
        stem: "The central bank monitors commercial banks' reserve requirements closely ________ systemic solvency remains secure.",
        options: ["so that", "because of", "despite", "although", "unless"],
        answerIndex: 0,
        explanation: "Sistemik ödeme gücü güvende kalsın diye (amaç) anlamında arkasından tam cümle alan 'so that' kullanılır.",
        ruleTag: "So that (Amaç)"
      },
      {
        id: "q-top06-2",
        difficulty: 2,
        stem: "________ the new statutory AML regulations come into official effect next week, non-compliant firms will face severe fines.",
        options: ["Once", "Unless", "Although", "In spite of", "So that"],
        answerIndex: 0,
        explanation: "'Kurallar yürürlüğe girer girmez / bir kez girdiğinde' anlamında zaman zarf cümleciği 'Once' (As soon as) gereklidir.",
        ruleTag: "Once (Zaman)"
      },
      {
        id: "q-top06-3",
        difficulty: 2,
        stem: "________ evaluating the loan application, the branch manager requested verified corporate tax declarations.",
        options: ["When", "Because", "So that", "Unless", "Although"],
        answerIndex: 0,
        explanation: "Özne kısaltması yapılmış aktif yapı: 'When evaluating...' (Kredi başvurusunu değerlendirirken).",
        ruleTag: "Zarf Cümleciği Kısaltması"
      },
      {
        id: "q-top06-4",
        difficulty: 2,
        stem: "Foreign investors withdrew capital ________ geopolitical tensions and currency volatility in the region escalated.",
        options: ["as", "despite", "in order to", "so as to", "regardless of"],
        answerIndex: 0,
        explanation: "Arkasından tam cümle alan ve 'çünkü / -dıkça' neden bildiren bağlaç 'as'dir. Despite ve in order to tam cümle almaz.",
        ruleTag: "As (Neden / Zaman)"
      },
      {
        id: "q-top06-5",
        difficulty: 3,
        stem: "Commercial banks cannot disburse mortgage facilities ________ the real estate appraiser submits the formal collateral valuation report.",
        options: ["until", "because", "so that", "since", "while"],
        answerIndex: 0,
        explanation: "'Rapor sunulana kadar krediler kullandırılamaz' anlamında zaman sınırı bildiren 'until' (-e kadar) doğru cevaptır.",
        ruleTag: "Until (-e kadar)"
      }
    ]
  },

  // 7. Conjunctions & Transitions
  {
    id: "eng-topic-07",
    number: 7,
    title: "Conjunctions (Bağlaçlar)",
    subtitle: "Zıtlık, Sebep-Sonuç, Paralellik ve Geçiş İfadeleri (+ / - Tekniği)",
    icon: "fa-arrows-split-up-and-left",
    summary: "Sınavda en az 6-8 net doğrudan buradan gelir. Cümle alanlar (+ S + V) ile isim alanlar (+ Noun) arasındaki farkı bilmek soruların yarısını eler.",
    theory: [
      {
        heading: "1. Zıtlık Bağlaçları (+ / -)",
        content: "• **Tam Cümle Alanlar (+ S + V):** *Although, Even though, Though, Whereas, While*.\n• **İsim / Noun Phrase Alanlar (+ Noun / V-ing):** *Despite, In spite of, Notwithstanding*.\n• **Noktalama ile Cümle Başı Gelenler (Transitions):** *However, Nevertheless, Nonetheless, Even so, On the other hand* (Noktalı virgül veya noktadan sonra gelir)."
      },
      {
        heading: "2. Neden-Sonuç ve Koşul Bağlaçları",
        content: "• **Neden (Tam Cümle):** *Because, Since, As*.\n• **Neden (İsim Öbeği):** *Due to, Owing to, Because of, On account of*.\n• **Sonuç (Geçiş):** *Therefore, Thus, Consequently, As a result*.\n• **Koşul:** *Unless (= if not), Provided that, As long as*.\n• **Amaç:** *In order to + V1 vs. So that + S + V*."
      }
    ],
    tables: [
      {
        title: "Cümle Alanlar vs. İsim Alanlar Hayati Tablo",
        headers: ["Grup", "Tam Cümle Alanlar (+ S + V)", "İsim Öbeği Alanlar (+ Noun / V-ing)", "Geçiş Kelimeleri (; Transition ,)"],
        rows: [
          ["Zıtlık (Concession)", "Although, Even though, While", "Despite, In spite of", "However, Nevertheless, Nonetheless"],
          ["Neden-Sonuç (Cause)", "Because, Since, As", "Due to, Owing to, Because of", "Therefore, Consequently, Thus"],
          ["Koşul (Condition)", "Provided that, As long as, If", "In case of", "Otherwise (Yoksa)"],
          ["Ek Bilgi (Addition)", "Moreover, Furthermore (geçiş)", "In addition to, Besides", "Furthermore, In addition"]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (+ / - Duygu Analizi):** Cümlenin bir tarafı olumsuz (- kriz, zarar, kısıtlama) diğer tarafı olumlu (+ kâr, büyüme) ise ZITLIK aranır.",
      "📌 **Taktik 2 (Boşluktan Sonrası Cümle mi İsim mi?):** Boşluktan sonra fiil (yüklem) yoksa sadece isim varsa `Although, Because` elenir; `Despite, Due to` seçilir.",
      "📌 **Taktik 3 (Şık Eleme Kardeşliği):** Şıklarda aynı gruptan iki aynı anlamlı bağlaç varsa (Örn: A) *Although* B) *Even though*) ikisi de birbirini eler!"
    ],
    examples: [
      {
        en: "Despite severe macroeconomic volatility, the national bank recorded record net profit.",
        tr: "Şiddetli makroekonomik oynaklığa RAĞMEN (isim öbeği), ulusal banka rekor kâr açıkladı.",
        clue: "Boşluktan sonra fiil yok (volatility isim) ➔ Despite."
      },
      {
        en: "Interest rates were raised aggressively; consequently, private credit demand contracted.",
        tr: "Faiz oranları agresif biçimde artırıldı; sonuç olarak özel kredi talebi daraldı.",
        clue: "Noktalı virgül + sonuç geçişi ➔ consequently."
      }
    ],
    quiz: [
      {
        id: "q-top07-1",
        difficulty: 1,
        stem: "________ severe foreign exchange volatility throughout the fiscal year, commercial loan volumes expanded impressively.",
        options: ["Despite", "Although", "Because", "In order to", "Provided that"],
        answerIndex: 0,
        explanation: "Boşluktan sonra isim öbeği (severe foreign exchange volatility) gelmiş ve zıtlık (+ / -) vardır: 'Despite' doğru cevaptır.",
        ruleTag: "Despite (+ Noun)"
      },
      {
        id: "q-top07-2",
        difficulty: 2,
        stem: "Digital banking channels offer unmatched speed; ________, they simultaneously introduce sophisticated cyber risk vectors.",
        options: ["however", "therefore", "moreover", "as a result", "because"],
        answerIndex: 0,
        explanation: "Noktalı virgül (;) ve virgül (,) arasında iki zıt durum (hız sunması vs siber risk getirmesi) bağlandığı için 'however' (ancak) gereklidir.",
        ruleTag: "However (Transition)"
      },
      {
        id: "q-top07-3",
        difficulty: 2,
        stem: "The regional branch suspended retail credit operations ________ deteriorating local economic conditions.",
        options: ["due to", "even though", "whereas", "so that", "unless"],
        answerIndex: 0,
        explanation: "İsim öbeği ile kullanılan sebep bağlacı 'due to'dur (-den dolayı). Even though ve whereas tam cümle ister.",
        ruleTag: "Due to (+ Noun)"
      },
      {
        id: "q-top07-4",
        difficulty: 2,
        stem: "________ algorithmic trading models execute orders in microseconds, human supervisory intervention remains critical during market shocks.",
        options: ["While", "In spite of", "Consequently", "Because of", "Therefore"],
        answerIndex: 0,
        explanation: "Cümle başında tam cümle alarak zıtlık bildiren bağlaç 'While'dır (Although yerine kullanılır). In spite of isim ister.",
        ruleTag: "While (Zıtlık Cümlesi)"
      },
      {
        id: "q-top07-5",
        difficulty: 3,
        stem: "Borrowers cannot restructure their non-performing credit facilities ________ they prove temporary financial hardship with valid documents.",
        options: ["unless", "despite", "although", "in order to", "because of"],
        answerIndex: 0,
        explanation: "'Geçici zorluğu kanıtlamadıkça borçlar yapılandırılamaz' koşul uyarısı için 'unless' (= if not) doğru cevaptır.",
        ruleTag: "Unless (Koşul)"
      }
    ]
  },

  // 8. Prepositions
  {
    id: "eng-topic-08",
    number: 8,
    title: "Prepositions (Edatlar)",
    subtitle: "Zaman/Mekan Edatları, Fiil + Edat ve Sıfat + Edat Kalıpları (Collocations)",
    icon: "fa-location-dot",
    summary: "Edat sorularında Türkçe düşünmek hata yaptırır. Sınavda çıkan en kritik fiil-edat ve sıfat-edat eşleşmelerini kalıp olarak ezberlemek esastır.",
    theory: [
      {
        heading: "1. Temel Zaman ve Mekan Edatları (In, On, At)",
        content: "• **At:** Kesin saatler (*at 2 PM*), net noktalar (*at the branch*), geceler (*at night*).\n• **On:** Günler (*on Monday*), tarihler (*on October 24*), yüzeyler (*on the screen*).\n• **In:** Yıllar (*in 2026*), aylar (*in October*), mevsimler (*in summer*), kapalı alanlar/şehirler (*in Istanbul*)."
      },
      {
        heading: "2. Sınavın En Çok Çıkan Fiil + Edat Kalıpları",
        content: "• **comply WITH:** -e uymak (kanun, kural).\n• **deprive OF:** -den mahrum bırakmak.\n• **refrain FROM:** -den kaçınmak, çekinmek.\n• **account FOR:** -e tekabül etmek, oluşturmak, açıklamak.\n• **rely / depend ON:** -e güvenmek, bel bağlamak.\n• **stem / originate FROM:** -den kaynaklanmak.\n• **vulnerable / susceptible TO:** -e karşı savunmasız olmak.\n• **eligible FOR:** -e hak kazanmış, uygun olmak."
      }
    ],
    tables: [
      {
        title: "Sınavda En Çok Soru Getiren Prepositional Eşleşmeler",
        headers: ["Kalıp (Collocation)", "Türkçe Anlamı", "Banka/Ekonomi Kullanımı"],
        rows: [
          ["comply WITH", "Kurallara uymak", "comply with AML regulations"],
          ["vulnerable TO", "Savunmasız olmak", "vulnerable to liquidity shocks"],
          ["deprive OF", "Mahrum bırakmak", "deprive of voting rights"],
          ["refrain FROM", "Çekinmek / yapmamak", "refrain from misleading clients"],
          ["eligible FOR", "Hak sahibi olmak", "eligible for agricultural loans"],
          ["invest IN", "Yatırım yapmak", "invest in digital banking tech"]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (Fiili Gör Edatı Yapıştır):** Cümlede `comply` görürseniz otomatikman `with`, `refrain` görürseniz `from`, `vulnerable` görürseniz `to` arayın.",
      "📌 **Taktik 2 (Preposition Arkasından Gerund Gelir):** Bir edattan (*in, of, by, for, from*) sonra fiil gelecekse o fiil istisnasız `-ing` takısı alır (*refrain from disclosing*)."
    ],
    examples: [
      {
        en: "Developing economies remain particularly vulnerable to sudden external commodity price swings.",
        tr: "Gelişmekte olan ekonomiler, ani dış emtia fiyatı dalgalanmalarına karşı özellikle savunmasızdır.",
        clue: "vulnerable + to."
      },
      {
        en: "Financial institutions must strictly comply with international transaction reporting standards.",
        tr: "Finans kuruluşları uluslararası işlem bildirim standartlarına sıkı şekilde uymalıdır.",
        clue: "comply + with."
      }
    ],
    quiz: [
      {
        id: "q-top08-1",
        difficulty: 1,
        stem: "All authorized brokerage houses are legally required to comply ________ the transparency regulations set by the CMB.",
        options: ["with", "for", "at", "against", "from"],
        answerIndex: 0,
        explanation: "'Comply' fiili her zaman 'with' edatı ile kullanılır (comply with: kurallara uymak).",
        ruleTag: "Comply With"
      },
      {
        id: "q-top08-2",
        difficulty: 2,
        stem: "Due to lack of collateral documentation, the applicant was deprived ________ the subsidized credit program.",
        options: ["of", "with", "from", "in", "by"],
        answerIndex: 0,
        explanation: "'Deprive somebody of something' kalıbı gereği 'deprived of' (mahrum bırakılmış) kullanılır.",
        ruleTag: "Deprive Of"
      },
      {
        id: "q-top08-3",
        difficulty: 2,
        stem: "Small enterprises are exceptionally susceptible ________ sudden liquidity shocks during monetary contractions.",
        options: ["to", "at", "for", "with", "from"],
        answerIndex: 0,
        explanation: "'Susceptible to' (= vulnerable to) bir tehlikeye karşı savunmasız/duyarlı olmak anlamında 'to' edatı alır.",
        ruleTag: "Susceptible To"
      },
      {
        id: "q-top08-4",
        difficulty: 2,
        stem: "Bank representatives must refrain ________ making speculative promises regarding future stock market returns.",
        options: ["from", "to", "with", "in", "by"],
        answerIndex: 0,
        explanation: "'Refrain from + V-ing' bir şey yapmaktan kaçınmak / imtina etmek kuralıdır.",
        ruleTag: "Refrain From"
      },
      {
        id: "q-top08-5",
        difficulty: 3,
        stem: "The written loan contract was signed ________ October 24 ________ 14:00 PM.",
        options: ["on / at", "in / on", "at / in", "by / on", "in / at"],
        answerIndex: 0,
        explanation: "Tam tarih (October 24) için 'on', tam saat (14:00 PM) için 'at' kullanılır.",
        ruleTag: "On Date / At Time"
      }
    ]
  },

  // 9. Pronouns
  {
    id: "eng-topic-09",
    number: 9,
    title: "Pronouns & Determiners (Zamirler)",
    subtitle: "Personal, Possessive, Reflexive Zamirler; Each, Every, Either, Neither, Both, All",
    icon: "fa-users",
    summary: "Zamir soruları özne-nesne referansını ve tekil/çoğul fiil uyumunu test eder. 'Each / Every / Neither' tekil fiil alırken 'Both' çoğul fiil alır.",
    theory: [
      {
        heading: "1. Zamir Türleri",
        content: "• **Kişi ve Nesne Zamirleri:** *He/They (özne)* vs. *Him/Them (nesne)*.\n• **İyelik Sıfatları vs. Zamirleri:** *Their balance (sıfat + isim)* vs. *Theirs (zamir, arkasından isim gelmez)*.\n• **Dönüşlü Zamirler (Reflexive):** *Itself, themselves* (özne işi kendine yaptığında veya vurgu için: *The board itself signed it*)."
      },
      {
        heading: "2. Kritik Dağıtıcı Zamirler (Distributives)",
        content: "• **Each / Every:** Her biri (TEKİL fiil alır: *Each of the branches has a vault*).\n• **Either / Neither:** İkisinden biri / İkisi de değil (TEKİL fiil alır: *Neither of the loans is approved*).\n• **Both:** Her ikisi de (ÇOĞUL fiil alır: *Both proposals were accepted*).\n• **All / None:** Sayılabilen çoğullarla çoğul, sayılamayanlarla tekil fiil alır."
      }
    ],
    tables: [
      {
        title: "Belirteçlerin Fiil Uyumu Tablosu",
        headers: ["Belirteç / Zamir", "İfade Ettiği Sayı", "Aldığı Fiil Türü", "Örnek"],
        rows: [
          ["Each of the ...", "2 veya daha fazla (ayrı ayrı)", "TEKİL FİİL (is / has / V-s)", "Each of the audits was completed."],
          ["Neither of the ...", "2 şeyden hiçbiri", "TEKİL FİİL (is / has)", "Neither of the systems was compromised."],
          ["Both ...", "2 şeyin ikisi de", "ÇOĞUL FİİL (are / have)", "Both candidates were eligible."],
          ["Either ...", "2 şeyden biri", "TEKİL FİİL", "Either option is acceptable."]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (Fiile Bak Tekil mi Çoğul mu?):** Boşluğun devamında tekil fiil (*was, is, has*) varsa `Both, All` elenir; `Each, Neither, Either` kalır.",
      "📌 **Taktik 2 (İki Şey Vurgusu):** Cümlede 'two banks, two options' deniyorsa ve olumsuzluk aranıyorsa cevap `Neither`dır.",
      "📌 **Taktik 3 (Possessive Tuzak):** Boşluktan sonra isim varsa iyelik sıfatı (*their report*); isim yoksa iyelik zamiri (*theirs*) seçilir."
    ],
    examples: [
      {
        en: "Neither of the loan applications was approved due to inadequate credit score ratings.",
        tr: "Yetersiz kredi notu puanı nedeniyle iki kredi başvurusunun hiçbiri onaylanmadı.",
        clue: "Neither of + was (tekil fiil)."
      },
      {
        en: "Each of the regional branch offices undergoes annual compliance audits.",
        tr: "Bölge şube ofislerinin her biri yıllık uyumluluk denetimlerinden geçer.",
        clue: "Each of + undergoes (tekil fiil -s)."
      }
    ],
    quiz: [
      {
        id: "q-top09-1",
        difficulty: 1,
        stem: "The audit inspectors reviewed both financial statements, but ________ of them contained sufficient supporting documentation.",
        options: ["neither", "either", "each", "both", "all"],
        answerIndex: 0,
        explanation: "'Both' (iki bilanço) denmiş ama 'but' (zıtlık) ile olumsuzluk verilmiştir: 'neither of them' (ikisi de yetersizdi).",
        ruleTag: "Neither (İkisi de Değil)"
      },
      {
        id: "q-top09-2",
        difficulty: 2,
        stem: "Each of the new branch managers ________ required to submit weekly portfolio risk reports.",
        options: ["is", "are", "were", "have been", "be"],
        answerIndex: 0,
        explanation: "'Each of + çoğul isim' öznesi TEKİL FİİL alır. Bu yüzden 'is' doğru cevaptır.",
        ruleTag: "Each of + Tekil Fiil"
      },
      {
        id: "q-top09-3",
        difficulty: 2,
        stem: "The commercial bank expanded ________ international operations into Central Asian markets.",
        options: ["its", "it's", "their", "theirs", "itself"],
        answerIndex: 0,
        explanation: "Banka tekil bir tüzel kişilik olduğu için iyelik sıfatı 'its' (onun) olur. (it's = it is kısaltmasıdır, iyelik değildir).",
        ruleTag: "Its vs Their"
      },
      {
        id: "q-top09-4",
        difficulty: 2,
        stem: "The board members discussed the proposal among ________ before taking the final unanimous vote.",
        options: ["themselves", "their", "theirs", "them", "himself"],
        answerIndex: 0,
        explanation: "Üyeler kendi aralarında tartıştığı için dönüşlü zamir 'themselves' (kendi aralarında) kullanılır.",
        ruleTag: "Themselves (Dönüşlü)"
      },
      {
        id: "q-top09-5",
        difficulty: 3,
        stem: "________ the treasury department and the credit risk division approved the revised benchmark rate.",
        options: ["Both", "Neither", "Either", "Each", "All"],
        answerIndex: 0,
        explanation: "'... and ...' bağlacıyla iki unsur bağlandığında ikili kalıp 'Both ... and ...' (hem ... hem de) olur.",
        ruleTag: "Both ... and"
      }
    ]
  },

  // 10. Gerund & Infinitive
  {
    id: "eng-topic-10",
    number: 10,
    title: "Gerund & Infinitive (Fiilimsiler)",
    subtitle: "Verb + V-ing, Verb + to V1 ve Anlam Değiştiren Fiiller (Stop, Remember, Forget)",
    icon: "fa-spell-check",
    summary: "Bir fiilden sonra gelen ikinci fiilin '-ing' mi yoksa 'to + V1' mi alacağını belirleyen kurallardır. Anlam değiştiren fiiller sınavın favori soru tipidir.",
    theory: [
      {
        heading: "1. Gerund (V-ing) Alan Fiiller",
        content: "• *admit, avoid, consider, delay, deny, enjoy, postpone, recommend, resist, risk, suggest*.\n• Preposition (edat) alan tüm kalıplardan sonra fiil her zaman **V-ing** olur (*look forward to meeting, succeed in finding*)."
      },
      {
        heading: "2. Infinitive (to V1) Alan Fiiller",
        content: "• *afford, agree, decide, demand, expect, fail, hope, manage, promise, refuse, tend, wish*.\n• Sıfatlardan sonra genelde **to V1** gelir (*It is difficult to predict*)."
      },
      {
        heading: "3. Anlam Değiştiren Kritik Fiiller",
        content: "• **Stop doing:** O eylemi tamamen bırakmak (*He stopped smoking*).\n• **Stop to do:** Başka bir şey yapmak için durmak (*He stopped to check his phone*).\n• **Remember / Forget doing:** Geçmişte yapılanı hatırlamak/unutmak.\n• **Remember / Forget to do:** Bir görevi yapmayı hatırlamak/unutmak (*Remember to lock the vault*)."
      }
    ],
    tables: [
      {
        title: "Gerund vs. Infinitive Karar Tablosu",
        headers: ["Yapı Türü", "Önemli Fiiller", "Örnek Cümle"],
        rows: [
          ["Gerund (V-ing)", "avoid, consider, delay, suggest, risk", "The bank avoided lending to risky firms."],
          ["Infinitive (to V1)", "decide, refuse, manage, fail, plan", "The board decided to raise interest rates."],
          ["Preposition + V-ing", "refrain from, insist on, succeed in", "They refrained from making speculative bids."]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (Edattan Sonra V-ing):** Boşluğun önünde edat (*in, of, by, for, from, about*) varsa şıklardaki `to + V1` seçeneklerini doğrudan eleyin.",
      "📌 **Taktik 2 (Stop / Remember Dikkat):** Görev/sorumluluksa `to V1` (*Remember to submit reports*); geçmiş anı/alışkanlıksa `V-ing` (*I remember meeting him*).",
      "📌 **Taktik 3 (Look forward to):** Buradaki 'to' edattır! Dolayısıyla arkasından `V-ing` alır: *look forward to hearing from you*."
    ],
    examples: [
      {
        en: "Commercial lenders should avoid extending unsecured credit facilities during volatile periods.",
        tr: "Ticari borç verenler oynak dönemlerde teminatsız kredi kullandırmaktan kaçınmalıdır.",
        clue: "avoid + extending (Gerund)."
      },
      {
        en: "The executive committee decided to suspend dividend distributions for the fiscal year.",
        tr: "İcra komitesi, mali yıl için temettü dağıtımlarını askıya almaya karar verdi.",
        clue: "decide + to suspend (Infinitive)."
      }
    ],
    quiz: [
      {
        id: "q-top10-1",
        difficulty: 1,
        stem: "The senior branch auditor refused ________ the financial report without verifying physical vault assets.",
        options: ["to sign", "signing", "sign", "signed", "to signing"],
        answerIndex: 0,
        explanation: "'Refuse' fiili arkasından her zaman Infinitive alır: 'refuse to sign' (imzalamayı reddetmek).",
        ruleTag: "Refuse to V1"
      },
      {
        id: "q-top10-2",
        difficulty: 2,
        stem: "Financial institutions must refrain from ________ false claims regarding investment portfolio yield guarantees.",
        options: ["making", "to make", "make", "having made", "to making"],
        answerIndex: 0,
        explanation: "Edatlardan (from) sonra gelen fiil her zaman Gerund (-ing) alır: 'refrain from making'.",
        ruleTag: "Preposition + V-ing"
      },
      {
        id: "q-top10-3",
        difficulty: 2,
        stem: "Branch cashiers must remember ________ the electronic vault timer before leaving the premises every evening.",
        options: ["to activate", "activating", "activate", "activated", "to activating"],
        answerIndex: 0,
        explanation: "Geleceğe yönelik yapılması gereken bir görev/sorumluluk hatırlatıldığı için: 'remember to activate' gereklidir.",
        ruleTag: "Remember to V1"
      },
      {
        id: "q-top10-4",
        difficulty: 2,
        stem: "The board considered ________ several unprofitable regional branches to reduce operational expenditure.",
        options: ["closing", "to close", "close", "closed", "to closing"],
        answerIndex: 0,
        explanation: "'Consider' fiili arkasından Gerund alır: 'consider closing' (kapatmayı düşünmek).",
        ruleTag: "Consider + V-ing"
      },
      {
        id: "q-top10-5",
        difficulty: 3,
        stem: "We look forward to ________ mutually beneficial commercial arrangements with your institution.",
        options: ["establishing", "establish", "to establish", "established", "be established"],
        answerIndex: 0,
        explanation: "'Look forward to' kalıbındaki 'to' edattır (preposition); dolayısıyla arkasından V-ing alır: 'establishing'.",
        ruleTag: "Look forward to V-ing"
      }
    ]
  },

  // 11. Conditionals
  {
    id: "eng-topic-11",
    number: 11,
    title: "Conditionals (Koşul Cümleleri)",
    subtitle: "Type 0, 1, 2, 3, Mixed Conditionals ve Devrik Yapılar (Inversion: Had, Should, Were)",
    icon: "fa-code-branch",
    summary: "Şart cümleleri sınavda formül uyumu ve 'If atıldığında yapılan devrikler' üzerinden sorulur. Formülü ezberleyen 10 saniyede doğru şıkkı bulur.",
    theory: [
      {
        heading: "1. Dört Temel Şart Tipi",
        content: "• **Type 0 (Genel Doğru):** `If + Present Simple , Present Simple` (*If you lower rates, demand increases*).\n• **Type 1 (Gelecek Olasılık):** `If + Present Simple , will / can / may + V1` (*If the bank approves, we will disburse*).\n• **Type 2 (Şimdiki Hayali / Unreal Present):** `If + Past Simple (V2) , would / could / might + V1` (*If I were the director, I would invest*).\n• **Type 3 (Geçmiş Pişmanlık / Unreal Past):** `If + had + V3 , would / could / might + have + V3` (*If they had warned us, we would not have lost money*)."
      },
      {
        heading: "2. Sınavın En Prestijli Kuralı: Devrik Yapılar (Inversion)",
        content: "'If' cümleden atıldığında yardımcı fiil başa geçer:\n• Type 1: `Should you require assistance...` (= If you require)\n• Type 2: `Were the bank to decide...` (= If the bank decided)\n• Type 3: `Had they audited the files...` (= If they had audited)"
      }
    ],
    tables: [
      {
        title: "Conditionals Formül Eşleşme Tablosu",
        headers: ["Koşul Tipi", "If Yan Cümlesi", "Ana Cümle", "Devrik Hali (Inversion)"],
        rows: [
          ["Type 1", "If + V1 / Present", "will / can + V1", "Should + Özne + V1 ..."],
          ["Type 2", "If + V2 (Past)", "would / could + V1", "Were + Özne + to V1 ..."],
          ["Type 3", "If + had V3 (Past Perfect)", "would / could have + V3", "Had + Özne + V3 ..."]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (Eşleşme Tablosu):** Yan tarafta `had + V3` varsa, diğer tarafta mutlaka `would/could have + V3` olmalıdır.",
      "📌 **Taktik 2 (Cümle Başında Had / Should Görünce):** Cümle 'Had + Özne + V3' ile başlayıp soru işareti yoksa bu bir Type 3 If cümlesidir; diğer tarafa `would have V3` arayın.",
      "📌 **Taktik 3 (Unless = If Not):** 'Unless' bulunan cümleye ikinci bir olumsuzluk eki (not) gelmez."
    ],
    examples: [
      {
        en: "Had the risk committee identified the loan fraud earlier, the massive financial loss could easily have been prevented.",
        tr: "Risk komitesi kredi sahtekarlığını daha önce tespit etmiş olsaydı, devasa mali kayıp kolaylıkla önlenebilirdi.",
        clue: "Had + identified (Type 3 Devrik) ➔ could have been prevented."
      },
      {
        en: "Should inflation accelerate next month, the central bank will inevitably hike interest rates.",
        tr: "Enflasyon gelecek ay hızlanırsa, merkez bankası kaçınılmaz olarak faizleri artıracaktır.",
        clue: "Should + accelerate (Type 1 Devrik) ➔ will hike."
      }
    ],
    quiz: [
      {
        id: "q-top11-1",
        difficulty: 1,
        stem: "If the central bank ________ benchmark rates sooner, the national currency ________ so severely last winter.",
        options: ["had raised / would not have depreciated", "raised / will not depreciate", "has raised / would not depreciate", "raises / would not have depreciated", "would raise / had not depreciated"],
        answerIndex: 0,
        explanation: "Geçmişte gerçekleşmemiş durum (last winter) Type 3 gerektirir: If had V3 (had raised) , would have V3 (would not have depreciated).",
        ruleTag: "Type 3 Conditional"
      },
      {
        id: "q-top11-2",
        difficulty: 2,
        stem: "________ the senior risk auditor identified the fraudulent entries earlier, the loss could have been averted.",
        options: ["Had", "Should", "Were", "Unless", "If only"],
        answerIndex: 0,
        explanation: "Cümle sonunda 'could have been averted' vardır. Type 3 devrik formülü: 'Had + Özne + V3'tür.",
        ruleTag: "Inversion Type 3 (Had)"
      },
      {
        id: "q-top11-3",
        difficulty: 2,
        stem: "________ you require further clarification regarding loan terms, please do not hesitate to contact our branch.",
        options: ["Should", "Had", "Were", "Unless", "Would"],
        answerIndex: 0,
        explanation: "Type 1 devrik formülü: 'Should you require...' (= If you require).",
        ruleTag: "Inversion Type 1 (Should)"
      },
      {
        id: "q-top11-4",
        difficulty: 2,
        stem: "If the domestic market ________ more liquid, international institutional investors ________ larger sums.",
        options: ["were / would invest", "is / would have invested", "had been / will invest", "was being / invested", "would be / had invested"],
        answerIndex: 0,
        explanation: "Şu anki varsayımsal durum (Type 2): If + were , would + V1 (invest).",
        ruleTag: "Type 2 Conditional"
      },
      {
        id: "q-top11-5",
        difficulty: 3,
        stem: "The loan agreement will be voided immediately ________ the borrower submits authentic financial declarations.",
        options: ["unless", "provided that", "as long as", "if", "only if"],
        answerIndex: 0,
        explanation: "'Borçlu gerçek beyanları sunmadıkça sözleşme feshedilecektir' uyarısı için olumsuz koşul bağlacı 'unless' gereklidir.",
        ruleTag: "Unless Kullanımı"
      }
    ]
  },

  // 12. Articles & Determiners
  {
    id: "eng-topic-12",
    number: 12,
    title: "Articles & Determiners (Tanımlıklar)",
    subtitle: "A, An, The; Some, Any, Much, Many, Few, Little; Another, Other, Others",
    icon: "fa-font",
    summary: "İsimlerin miktarını ve belirliliğini gösteren sözcüklerdir. Sayılabilen çoğul isimlerle 'Many/Few', sayılamayan isimlerle 'Much/Little' kullanılır.",
    theory: [
      {
        heading: "1. Articles: A, An, The",
        content: "• **A / An:** Sayılabilen tekil, belirsiz isimler (*a bank, an auditor*).\n• **The:** Bilinen, belirli, daha önce bahsedilmiş veya dünyada tek olan varlıklar (*the central bank, the economy, the Internet*).\n• **No Article:** Çoğul genel kavramlar (*Banks play a role*), ülke adları (*Turkey* - istisna: *The USA, The Netherlands*)."
      },
      {
        heading: "2. Miktar Belirteçleri (Quantifiers)",
        content: "• **Many / (A) Few:** Sayılabilen çoğul isimlerle (*many branches, few complaints*).\n• **Much / (A) Little:** Sayılamayan isimlerle (*much money, little information*).\n• **A few / A little:** Az ama yeterli (+ olumlu anlam).\n• **Few / Little:** Neredeyse hiç yok (- olumsuz anlam).\n• **Another:** Başka bir (TEKİL isimle: *another bank*).\n• **Other:** Diğer (ÇOĞUL isimle: *other banks*).\n• **Others:** Diğerleri (Arkasından isim GELMEZ: *Some failed, others survived*)."
      }
    ],
    tables: [
      {
        title: "Sayılabilen vs. Sayılamayan Determiners Tablosu",
        headers: ["Belirteç", "İsim Türü", "Anlamı & Mesajı", "Örnek"],
        rows: [
          ["Many / (A) Few", "Sayılabilen Çoğul (+s)", "Çok / Birkaç", "many applications, a few banks"],
          ["Much / (A) Little", "Sayılamayan Tekil", "Çok / Az", "much liquidity, little capital"],
          ["Another", "Sayılabilen Tekil", "Başka bir ...", "another financial option"],
          ["Other", "Sayılabilen Çoğul", "Diğer ...", "other commercial lenders"],
          ["Others", "Zamir (İsimsiz)", "Diğerleri", "Some banks grew; others contracted."]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (İsim Çoğul mu?):** Boşluktan sonraki kelime 's' takısı almışsa (çoğulsa) `much, little, another` doğrudan elenir.",
      "📌 **Taktik 2 (Others Arkasından İsim Almaz):** Şıklarda `others` varsa ve boşluktan sonra isim geliyorsa o şıkkı anında çizin (`others banks` YANLIŞTIR).",
      "📌 **Taktik 3 (Information, Money, Evidence Sayılamaz):** Bu kelimeler tekildir, `much / little` ile kullanılır."
    ],
    examples: [
      {
        en: "Because the startup had little collateral to offer, commercial lenders rejected the application.",
        tr: "Girişimin sunacak neredeyse hiç teminatı olmadığı için (olumsuz), ticari borç verenler başvuruyu reddetti.",
        clue: "collateral sayılamaz + yetersiz ➔ little."
      },
      {
        en: "Some analysts predicted a crash, while others anticipated steady growth.",
        tr: "Bazı analistler çöküş öngördü, diğerleri ise istikrarlı büyüme bekledi.",
        clue: "others = diğer analistler (arkasında isim yok)."
      }
    ],
    quiz: [
      {
        id: "q-top12-1",
        difficulty: 1,
        stem: "The audit team requested ________ additional documentation to corroborate the claimed business expenses.",
        options: ["some", "many", "a few", "few", "another"],
        answerIndex: 0,
        explanation: "'Documentation' sayılamaz bir isimdir; sayılamayan isimlerle 'some' (bir miktar/bazı) kullanılır.",
        ruleTag: "Some + Sayılamayan"
      },
      {
        id: "q-top12-2",
        difficulty: 2,
        stem: "Due to strict privacy controls, very ________ customer records were leaked during the unauthorized network breach.",
        options: ["few", "little", "much", "another", "less"],
        answerIndex: 0,
        explanation: "'records' sayılabilen çoğul bir isimdir. 'Çok az / neredeyse hiç sızmadı' anlamında 'very few' doğru cevaptır.",
        ruleTag: "Few + Çoğul İsim"
      },
      {
        id: "q-top12-3",
        difficulty: 2,
        stem: "While one branch focused on retail banking, ________ branches specialized in agricultural financing.",
        options: ["other", "another", "others", "each", "every"],
        answerIndex: 0,
        explanation: "'branches' çoğul isimdir. Çoğul isimlerin önünde 'diğer' anlamında 'other' kullanılır. 'Another' tekil ister.",
        ruleTag: "Other + Çoğul İsim"
      },
      {
        id: "q-top12-4",
        difficulty: 2,
        stem: "The treasury department had ________ liquidity left, which forced it to borrow from the central bank discount window.",
        options: ["little", "few", "many", "a few", "several"],
        answerIndex: 0,
        explanation: "'Liquidity' sayılamaz bir isimdir ve borç almak zorunda kaldığı için 'neredeyse hiç kalmamıştı' (- olumsuz) anlamında 'little' gerekir.",
        ruleTag: "Little + Sayılamayan"
      },
      {
        id: "q-top12-5",
        difficulty: 3,
        stem: "Some financial institutions opted to merge, whereas ________ preferred to remain independent entities.",
        options: ["others", "other", "another", "every", "each"],
        answerIndex: 0,
        explanation: "Boşluktan sonra isim gelmemiştir; 'diğerleri' anlamında zamir olarak sadece 'others' gelebilir.",
        ruleTag: "Others (Zamir)"
      }
    ]
  },

  // 13. Adjectives & Adverbs
  {
    id: "eng-topic-13",
    number: 13,
    title: "Adjectives & Adverbs (Sıfatlar & Zarflar)",
    subtitle: "Sıfat/Zarf Ayrımı, Karşılaştırmalar (Comparative/Superlative), So/Such, Too/Enough",
    icon: "fa-sliders",
    summary: "Sıfatlar isimleri niteler (*stable economy*), zarflar ise fiilleri, sıfatları ve diğer zarfları niteler (-ly: *grow rapidly*).",
    theory: [
      {
        heading: "1. Sıfat ve Zarf Ayrımı",
        content: "• Sıfat: İsmin önüne gelir (*substantial profit*).\n• Zarf: Genellikle fiilden sonra veya fiille yardımcı fiil arasında yer alır (*profits grew substantially*).\n• -ed vs. -ing Sıfatları: -ed hisseden kişiyi anlatır (*interested investor*); -ing hissettiren şeyi/özelliği anlatır (*interesting report*)."
      },
      {
        heading: "2. Karşılaştırma Kalıpları",
        content: "• **Comparative:** *more ... than / -er than* (*more profitable than*).\n• **Superlative:** *the most ... / the -est* (*the most reliable bank*).\n• **As ... as:** Eşitlik bildirir (*as secure as*).\n• **So ... that / Such ... that:** O kadar ... ki (*so high that nobody could borrow / such a high rate that...*).\n• **Too ... to / Enough to:** Aşırı / Yeterli (*too risky to invest / liquid enough to survive*)."
      }
    ],
    tables: [
      {
        title: "So ... that vs. Such ... that Ayrımı",
        headers: ["Kalıp", "Araya Giren Yapı", "Örnek Cümle"],
        rows: [
          ["so + SIFAT / ZARF + that", "Sadece sıfat veya zarf", "Inflation was so high that rates climbed."],
          ["such + (A/AN) + SIFAT + İSİM + that", "Sıfat tamlaması (isimli)", "It was such a severe crisis that banks closed."],
          ["too + SIFAT + to V1", "Olumsuz aşırılık", "The collateral was too low to secure the loan."],
          ["SIFAT + enough + to V1", "Yeterlilik", "The firm is solvent enough to pay debts."]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (Fiili Niteleme):** Boşluk bir fiilin yanındaysa (%90) `-ly` ile biten bir ZARF (*substantially, drastically, significantly*) aranır.",
      "📌 **Taktik 2 (So vs Such):** Boşluktan sonra isim varsa `such a ... that`, sadece sıfat varsa `so ... that` seçilir.",
      "📌 **Taktik 3 (The + Most):** Cümlenin başında 'the' varsa şıklarda 'more' elenir, 'most' (superlative) seçilir."
    ],
    examples: [
      {
        en: "The bank's annual net profit increased substantially following digital infrastructure upgrades.",
        tr: "Banka yıllık net kârı dijital altyapı yükseltmelerinin ardından önemli ölçüde (zarf) arttı.",
        clue: "increased fiilini niteleyen zarf ➔ substantially."
      },
      {
        en: "The volatility was so extreme that regulatory authorities halted trading for three hours.",
        tr: "Oynaklık o kadar aşırıydı ki denetleyici otoriteler işlemleri üç saat durdurdu.",
        clue: "so + extreme (sıfat) + that."
      }
    ],
    quiz: [
      {
        id: "q-top13-1",
        difficulty: 1,
        stem: "Following the adoption of automated scoring algorithms, loan evaluation processing times decreased ________.",
        options: ["substantially", "substantial", "substance", "substantiate", "substantiated"],
        answerIndex: 0,
        explanation: "'decreased' (azaldı) fiilini nitelemek için bir zarfa ihtiyaç vardır: 'substantially' (önemli ölçüde).",
        ruleTag: "Fiili Niteleyen Zarf (-ly)"
      },
      {
        id: "q-top13-2",
        difficulty: 2,
        stem: "The macroeconomic shock was ________ severe that several undercapitalized banks required emergency state aid.",
        options: ["so", "such", "too", "as", "much"],
        answerIndex: 0,
        explanation: "Sadece sıfat (severe) ve ardından 'that' geldiği için 'so ... that' kalıbı kullanılır.",
        ruleTag: "So ... that"
      },
      {
        id: "q-top13-3",
        difficulty: 2,
        stem: "It was ________ an unprecedented financial turmoil that traditional risk models failed to forecast losses.",
        options: ["such", "so", "too", "very", "enough"],
        answerIndex: 0,
        explanation: "'an unprecedented financial turmoil' bir sıfat tamlaması (isimli) olduğu için 'such ... that' kullanılır.",
        ruleTag: "Such a ... that"
      },
      {
        id: "q-top13-4",
        difficulty: 2,
        stem: "The borrower's current cash flow is simply not stable ________ to guarantee long-term mortgage repayments.",
        options: ["enough", "too", "so", "such", "as"],
        answerIndex: 0,
        explanation: "Sıfattan sonra gelen ve 'yeterli' anlamı katan yapı: 'stable enough to guarantee'dir.",
        ruleTag: "Adjective + Enough to"
      },
      {
        id: "q-top13-5",
        difficulty: 3,
        stem: "Among all public lenders in the country, Ziraat Bank possesses ________ extensive nationwide branch network.",
        options: ["the most", "more", "most", "as", "so"],
        answerIndex: 0,
        explanation: "Tüm kamu bankaları arasında en geniş şube ağı kastedildiğinden Superlative: 'the most extensive' gereklidir.",
        ruleTag: "The Most (Superlative)"
      }
    ]
  },

  // 14. Subject-Verb Agreement
  {
    id: "eng-topic-14",
    number: 14,
    title: "Subject-Verb Agreement (Özne-Fiil Uyumu)",
    subtitle: "Tekil/Çoğul Özne Uyumu, Either...or, Neither...nor, As well as, A number of",
    icon: "fa-handshake",
    summary: "Özne tekilse fiil tekil (*is / has / -s*), çoğulsa fiil çoğul (*are / have / V1*) olmalıdır. Sınavlar araya giren uzun tamlamalarla göz boyamaya çalışır.",
    theory: [
      {
        heading: "1. Araya Giren Sözcüklere Dikkat (The Real Subject)",
        content: "Özne ile fiil arasına 'of, along with, as well as, together with' girdiğinde gerçek özne en baştaki kelimedir!\n• *The expansion of regional branches was successful.* ('branches' çoğul görünse de özne 'expansion' tekildir ➔ *was*!).\n• *The CEO, as well as his assistants, is attending.* (Özne 'CEO' tekildir ➔ *is*)."
      },
      {
        heading: "2. Çift Bağlaçlar ve İstisnalar",
        content: "• **Neither ... nor / Either ... or / Not only ... but also:** Fiile EN YAKIN olan özne fiilin tekil/çoğulluğunu belirler! (*Neither the manager nor the clerks were informed*).\n• **A number of vs. The number of:**\n  - *A number of banks* = Birçok banka (ÇOĞUL fiil alır: *are expanding*).\n  - *The number of banks* = Bankaların sayısı (TEKİL fiil alır: *is increasing*)."
      }
    ],
    tables: [
      {
        title: "Özne-Fiil Uyumu Hayati Formüller",
        headers: ["Özne Kalıbı", "Belirleyici Özne", "Aldığı Fiil", "Örnek"],
        rows: [
          ["A number of + Çoğul İsim", "Çoğul anlam taşır", "ÇOĞUL FİİL (are / have)", "A number of lenders have merged."],
          ["The number of + Çoğul İsim", "Sayı tekildir ('The number')", "TEKİL FİİL (is / has)", "The number of bad loans has risen."],
          ["Özne 1 + as well as + Özne 2", "Özne 1 (en baştaki)", "Özne 1'e uyar", "The governor, as well as deputies, was present."],
          ["Neither A nor B", "B (fiile en yakın olan)", "B'ye uyar", "Neither the CEO nor directors were aware."]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (Preposition Tuzağı):** 'The quality of the services' cümlesinde 'services' çoğuluna kanmayın; 'of'un önündeki 'quality' tekildir, fiil tekil olmalıdır (*is*).",
      "📌 **Taktik 2 (A number of vs The number of):**\n• `A number of` ➔ Çoğul fiil\n• `The number of` ➔ Tekil fiil",
      "📌 **Taktik 3 (Neither...nor Fiil Kuralı):** Fiile en yakın kelimeye bakın: tekilse tekil, çoğulsa çoğul seçin."
    ],
    examples: [
      {
        en: "The implementation of stringent regulatory capital buffers has enhanced systemic resilience.",
        tr: "Sıkı yasal sermaye tamponlarının uygulanması, sistemik direnci artırdı.",
        clue: "Gerçek özne 'The implementation' tekildir ➔ has enhanced."
      },
      {
        en: "A number of commercial lenders have recently lowered interest charges on SME loans.",
        tr: "Birçok ticari borç veren, son zamanlarda KOBİ kredilerindeki faiz masraflarını düşürdü.",
        clue: "A number of = Çoğul ➔ have lowered."
      }
    ],
    quiz: [
      {
        id: "q-top14-1",
        difficulty: 1,
        stem: "The number of non-performing corporate loans in the domestic banking sector ________ steadily over the past six months.",
        options: ["has increased", "have increased", "are increasing", "were increased", "increase"],
        answerIndex: 0,
        explanation: "'The number of' ifadesi sayıyı belirttiği için TEKİL fiil gerektirir: 'has increased'.",
        ruleTag: "The number of + Tekil Fiil"
      },
      {
        id: "q-top14-2",
        difficulty: 2,
        stem: "A number of agricultural cooperatives ________ subsidized financing from Ziraat Bank every spring.",
        options: ["receive", "receives", "is receiving", "has received", "was received"],
        answerIndex: 0,
        explanation: "'A number of' (birçok) çoğul anlam taşır ve ÇOĞUL fiil alır: 'receive' (alırlar).",
        ruleTag: "A number of + Çoğul Fiil"
      },
      {
        id: "q-top14-3",
        difficulty: 2,
        stem: "The head of internal investigations, along with three senior inspectors, ________ the branch files right now.",
        options: ["is reviewing", "are reviewing", "were reviewing", "have reviewed", "review"],
        answerIndex: 0,
        explanation: "'along with' araya giren ek ifadedir; gerçek özne tekil olan 'The head'dir ➔ 'is reviewing'.",
        ruleTag: "Along with (Baştaki Özneye Uyum)"
      },
      {
        id: "q-top14-4",
        difficulty: 2,
        stem: "Neither the branch manager nor the credit loan officers ________ authorized to approve overrides without central clearance.",
        options: ["are", "is", "was", "has been", "be"],
        answerIndex: 0,
        explanation: "'Neither ... nor' kalıbında fiile en yakın özne 'officers' (çoğul) olduğu için fiil çoğul olur: 'are'.",
        ruleTag: "Neither ... nor (En Yakın Özne)"
      },
      {
        id: "q-top14-5",
        difficulty: 3,
        stem: "The rapid proliferation of digital core banking applications ________ traditional physical branch operations.",
        options: ["has transformed", "have transformed", "are transforming", "were transformed", "transform"],
        answerIndex: 0,
        explanation: "Özne 'proliferation' (yayılma / artış - tekil) kelimesidir. Araya giren çoğullar yanıltmamalıdır: 'has transformed'.",
        ruleTag: "Gerçek Özne Takibi"
      }
    ]
  },

  // 15. Word Formation
  {
    id: "eng-topic-15",
    number: 15,
    title: "Word Formation (Kelime Türetme)",
    subtitle: "İsim, Fiil, Sıfat, Zarf Ekleri (-tion, -ment, -ness, -ly, -ive, -al) ve Cümle Konumu",
    icon: "fa-puzzle-piece",
    summary: "Boşluğun önündeki ve arkasındaki kelimelere bakarak boşluğa isim mi, fiil mi, sıfat mı yoksa zarf mı geleceğini 5 saniyede tespit etme sanatıdır.",
    theory: [
      {
        heading: "1. Kelime Son Ekleri (Suffixes)",
        content: "• **İsim (Noun):** *-tion (regulation), -ment (agreement), -ness (effectiveness), -ity (liquidity), -ance/-ence (compliance), -er/-or (investor)*.\n• **Sıfat (Adjective):** *-ive (effective), -al (financial), -ous (prosperous), -able/-ible (feasible, reliable), -ful (successful)*.\n• **Fiil (Verb):** *-ize (stabilize), -en (strengthen), -ify (verify)*.\n• **Zarf (Adverb):** Sıfat + *-ly (substantially, drastically, effectively)*."
      },
      {
        heading: "2. Boşluk Konumuna Göre Kelime Türü Tespiti",
        content: "1. `The / A / An + ________ + of` ➔ Kesinlikle **İSİM (Noun)**.\n2. `Özne + ________ + Nesne` ➔ Kesinlikle **FİİL (Verb)**.\n3. `Sıfat + ________` veya `The + ________ + İsim` ➔ **İSİM** veya **SIFAT**.\n4. `Fiil + ________` veya `Yardımcı Fiil + ________ + Esas Fiil` ➔ Kesinlikle **ZARF (Adverb)**."
      }
    ],
    tables: [
      {
        title: "Kelime Türetme Örnekleri Tablosu",
        headers: ["Kök (Root)", "İsim (Noun)", "Sıfat (Adjective)", "Zarf (Adverb)", "Fiil (Verb)"],
        rows: [
          ["sign", "significance", "significant", "significantly", "signify"],
          ["stable", "stability / stabilization", "stable", "stably", "stabilize"],
          ["finance", "finance / financing", "financial", "financially", "finance"],
          ["comply", "compliance", "compliant", "compliantly", "comply"]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (The ... of Kuralı):** `The ________ of` kalıbında boşluğa sadece İSİM gelebilir; şıklarda `-tion, -ment, -ance, -ity` ile biteni bulun.",
      "📌 **Taktik 2 (İki Fiil Arası Zarf):** `has ________ increased` yapısında iki fiilin arasına sadece ZARF (`-ly`) girebilir.",
      "📌 **Taktik 3 (İsmin Önü Sıfattır):** Boşluktan sonra bir isim geliyorsa (*... crisis, ... policy*) boşluğa SIFAT (`-al, -ive, -able`) gelmelidir."
    ],
    examples: [
      {
        en: "The implementation of automated scoring algorithms improved transaction efficiency.",
        tr: "Otomatik skorlama algoritmalarının uygulanması (isim) işlem verimliliğini artırdı.",
        clue: "The + implementation (isim) + of."
      },
      {
        en: "Domestic lenders must ensure strict regulatory compliance across all branch channels.",
        tr: "Yerli borç verenler tüm şube kanallarında sıkı yasal uyum (isim) sağlamalıdır.",
        clue: "regulatory (sıfat) + compliance (isim)."
      }
    ],
    quiz: [
      {
        id: "q-top15-1",
        difficulty: 1,
        stem: "The rapid ________ of digital mobile banking services has reshaped customer interaction models.",
        options: ["expansion", "expand", "expansive", "expansively", "expanded"],
        answerIndex: 0,
        explanation: "'The rapid ________ of' kalıbı isim gerektirir; '-sion' eki alan 'expansion' (genişleme) doğru cevaptır.",
        ruleTag: "The + Adjective + Noun"
      },
      {
        id: "q-top15-2",
        difficulty: 2,
        stem: "Central banks implement tight monetary policy measures to ________ the value of the national currency.",
        options: ["stabilize", "stability", "stable", "stably", "stabilization"],
        answerIndex: 0,
        explanation: "'in order to / to + V1' yapısı gereği fiil gereklidir; '-ize' son eki alan 'stabilize' (istikrara kavuşturmak) doğrudur.",
        ruleTag: "To + Verb"
      },
      {
        id: "q-top15-3",
        difficulty: 2,
        stem: "Commercial banks experienced a ________ decline in non-performing assets throughout the fiscal year.",
        options: ["remarkable", "remarkably", "remark", "remarked", "remarking"],
        answerIndex: 0,
        explanation: "'a ________ decline' (isim) öncesinde ismi niteleyen bir SIFAT bulunmalıdır: 'remarkable' (kayda değer).",
        ruleTag: "Adjective + Noun"
      },
      {
        id: "q-top15-4",
        difficulty: 2,
        stem: "The chief auditor emphasized that the financial statements were ________ presented in accordance with IFRS standards.",
        options: ["accurately", "accurate", "accuracy", "accurateness", "accredit"],
        answerIndex: 0,
        explanation: "'were ________ presented' (yardımcı fiil ile esas fiil arasında) fiili niteleyen ZARF gerekir: 'accurately' (doğru biçimde).",
        ruleTag: "Verb Modifier Adverb (-ly)"
      },
      {
        id: "q-top15-5",
        difficulty: 3,
        stem: "Maintaining adequate capital reserves is of paramount ________ for ensuring overall systemic solvency.",
        options: ["importance", "important", "importantly", "import", "importing"],
        answerIndex: 0,
        explanation: "'of paramount ________' (edat arkası) isim gerektirir: 'importance' (önem).",
        ruleTag: "Preposition + Noun"
      }
    ]
  },

  // 16. Vocabulary & Collocations
  {
    id: "eng-topic-16",
    number: 16,
    title: "Vocabulary & Collocations",
    subtitle: "Akademik Kelimeler, Finans Phrasal Verbleri ve Sık Kullanılan Eşleşmeler",
    icon: "fa-book-bookmark",
    summary: "Sınavda en çok tekrar eden 30 akademik fiil ve 15 phrasal verb'ü bilmek, kelime sorularında şıkları saniyeler içinde eletir.",
    theory: [
      {
        heading: "1. En Kritik 10 Finans & Sınav Phrasal Verbi",
        content: "1. **Account for:** Açıklamak (%... tekabül etmek).\n2. **Carry out:** Yürütmek, uygulamak (denetim, plan).\n3. **Cope with / Deal with:** Başa çıkmak (krizle, enflasyonla).\n4. **Stem from:** -den kaynaklanmak.\n5. **Turn down:** Reddetmek (kredi başvurusunu).\n6. **Call off:** İptal etmek.\n7. **Put off:** Ertelemek.\n8. **Rule out:** Dışlamak, ihtimal dışı bırakmak.\n9. **Wipe out:** Silip süpürmek, yok etmek.\n10. **Phase out:** Kademeli olarak kullanımdan kaldırmak."
      },
      {
        heading: "2. Kritik Akademik Kelime Çiftleri",
        content: "• *Deteriorate = Worsen* (Kötüleşmek)\n• *Facilitate = Ease* (Kolaylaştırmak)\n• *Hamper = Hinder = Impede* (Engellemek, köstek olmak)\n• *Vulnerable = Susceptible* (Savunmasız)\n• *Feasible = Viable* (Uygulanabilir)\n• *Reluctant = Hesitant* (İsteksiz)\n• *Deplete = Exhaust* (Tüketmek)"
      }
    ],
    tables: [
      {
        title: "Sınavın En Sevdiği Kelime Eşleşmeleri (Collocations)",
        headers: ["Fiil + İsim Eşleşmesi", "Türkçe Anlamı", "Banka/Ekonomi Örneği"],
        rows: [
          ["curb inflation", "Enflasyonu dizginlemek", "stringent policies to curb inflation"],
          ["grant / extend a loan", "Kredi açmak / kullandırmak", "extend loans to agricultural producers"],
          ["default on a debt", "Borcunu ödeyememek (temerrüt)", "borrowers default on mortgage debts"],
          ["boost profitability", "Kârlılığı artırmak", "automation helped boost profitability"],
          ["meet obligations", "Yükümlülükleri karşılamak", "sufficient cash to meet obligations"]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (Zıtlık Kelimesi):** Cümledeki problem (örn. *high inflation, budget deficit*) varsa, çözmek için 'curb, mitigate, eliminate, hamper' gibi dizginleyici fiiller aranır.",
      "📌 **Taktik 2 (Eş Anlam Yakalama):** Şıklarda birbirinin tam zıddı iki kelime varsa (örn. *facilitate* [kolaylaştırmak] vs *hamper* [engellemek]) cevap %80 bu ikisinden biridir.",
      "📌 **Taktik 3 (Phrasal Verb Edat Uyumu):** Boşluktan sonra 'from' geliyorsa `stem from`, 'for' geliyorsa `account for`, 'with' geliyorsa `cope with` seçilir."
    ],
    examples: [
      {
        en: "Small and medium-sized enterprises account for over 65 percent of commercial employment.",
        tr: "Küçük ve orta ölçekli işletmeler ticari istihdamın yüzde 65'inden fazlasını oluşturmaktadır.",
        clue: "Orana tekabül etmek ➔ account for."
      },
      {
        en: "High energy import bills and currency depreciation significantly hampered economic recovery.",
        tr: "Yüksek enerji ithalatı faturaları ve kur değer kaybı, ekonomik toparlanmayı ciddi şekilde engelledi.",
        clue: "Engellemek ➔ hampered."
      }
    ],
    quiz: [
      {
        id: "q-top16-1",
        difficulty: 1,
        stem: "The internal audit committee was authorized to ________ a thorough forensic investigation into the wire fraud.",
        options: ["carry out", "call off", "turn down", "give up", "break down"],
        answerIndex: 0,
        explanation: "'Carry out' araştırma veya denetimi yürütmek / uygulamak anlamına gelir.",
        ruleTag: "Carry out (Yürütmek)"
      },
      {
        id: "q-top16-2",
        difficulty: 2,
        stem: "Excessive bureaucratic bottlenecks and regulatory hurdles can severely ________ private capital investment.",
        options: ["hamper", "facilitate", "accelerate", "promote", "justify"],
        answerIndex: 0,
        explanation: "Bürokratik engeller yatırımları kolaylaştırmaz; engeller/yavaşlatır: 'hamper' (hinder, impede).",
        ruleTag: "Hamper (Engellemek)"
      },
      {
        id: "q-top16-3",
        difficulty: 2,
        stem: "The banking liquidity panic did not emerge randomly; it ________ structural defects in collateral monitoring.",
        options: ["stemmed from", "settled down", "backed up", "turned out", "passed away"],
        answerIndex: 0,
        explanation: "'Stem from' -den kaynaklanmak, ileri gelmek anlamına gelir.",
        ruleTag: "Stem from (Kaynaklanmak)"
      },
      {
        id: "q-top16-4",
        difficulty: 2,
        stem: "Due to deficient credit history and inadequate income proof, the branch officer had to ________ the mortgage request.",
        options: ["turn down", "take over", "put up with", "run out of", "look after"],
        answerIndex: 0,
        explanation: "Kredi başvurusunu reddetmek anlamına gelen phrasal verb: 'turn down' (reject).",
        ruleTag: "Turn down (Reddetmek)"
      },
      {
        id: "q-top16-5",
        difficulty: 3,
        stem: "The government introduced emergency subsidy measures to ________ the adverse economic impacts of the pandemic.",
        options: ["mitigate", "exacerbate", "deteriorate", "magnify", "trigger"],
        answerIndex: 0,
        explanation: "Olumsuz etkileri hafifletmek / azaltmak anlamında 'mitigate' (alleviate, ease) doğru cevaptır. Exacerbate kötüleştirmek demektir.",
        ruleTag: "Mitigate (Hafifletmek)"
      }
    ]
  },

  // 17. Sentence Structure & Word Order
  {
    id: "eng-topic-17",
    number: 17,
    title: "Sentence Structure & Word Order",
    subtitle: "Özne-Fiil-Nesne Dizilimi, Kelime Sırasından Cevap Bulma, Paralel Yapılar",
    icon: "fa-diagram-project",
    summary: "İngilizce cümlenin omurgası 'Özne + Fiil + Nesne' (SVO) sırasıdır. Paralel yapılar (both...and, not only...but also) iki tarafta aynı gramer türünü zorunlu kılar.",
    theory: [
      {
        heading: "1. İngilizce Temel Cümle Dizilimi (S-V-O-M-P-T)",
        content: "• **Subject (Özne):** Kim? (*The bank*)\n• **Verb (Yüklem):** Ne yapıyor? (*granted*)\n• **Object (Nesne):** Neyi? (*the loan*)\n• **Manner (Zarf - Nasıl):** *quickly*\n• **Place (Yer - Nerede):** *at the branch*\n• **Time (Zaman - Ne zaman):** *yesterday*.\nSınavda bir cümlenin öznesi veya ana fiili eksikse şıklarda önce o eksik parçayı arayın!"
      },
      {
        heading: "2. Paralel Yapılar (Parallelism Rule)",
        content: "• **Both ... and ...**\n• **Either ... or ...**\n• **Neither ... nor ...**\n• **Not only ... but also ...**\nKural: Bağlacın birinci tarafında sıfat varsa ikincide de sıfat; isim varsa isim; fiil varsa fiil olmalıdır!"
      }
    ],
    tables: [
      {
        title: "Paralel Yapılar ve Gramer Uyumu Tablosu",
        headers: ["Bağlaç Kalıbı", "1. Unsur (Türü)", "2. Unsur (Türü)", "Örnek Cümle"],
        rows: [
          ["not only ... but also ...", "Sıfat (efficient)", "Sıfat (secure)", "The app is not only efficient but also secure."],
          ["both ... and ...", "İsim (stability)", "İsim (growth)", "Policy ensures both stability and growth."],
          ["either ... or ...", "Fiil (expand)", "Fiil (consolidate)", "The firm must either expand or consolidate."],
          ["neither ... nor ...", "Zarf (quickly)", "Zarf (accurately)", "It worked neither quickly nor accurately."]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (Paralel Eşleme):** `not only`den sonra fiil gelmişse `but also`dan sonra da fiil gelmelidir; sıfat gelmişse sıfat gelmelidir.",
      "📌 **Taktik 2 (Eksik Yüklem Avı):** Soru kökünde uzun bir özne öbeği var ama henüz çekimli fiil yoksa şıklardaki `-ing` veya `to V1` yapılarını eleyin, çekimli fiil (*reduced, has promoted*) arayın.",
      "📌 **Taktik 3 (Devrik Cümle Soru Sırası Değildir):** 'Not only did they lose...' cümle başında olumsuzluk devriğidir; soru işareti taşımaz."
    ],
    examples: [
      {
        en: "The newly adopted core banking platform is not only exceptionally fast but also highly secure.",
        tr: "Yeni benimsenen temel bankacılık platformu yalnızca son derece hızlı değil, aynı zamanda oldukça güvenlidir.",
        clue: "not only + sıfat ... but also + sıfat (Paralel yapı)."
      },
      {
        en: "Not only did the central bank raise benchmark rates, but it also tightened reserve liquidity requirements.",
        tr: "Merkez bankası sadece politika faizlerini artırmakla kalmadı, aynı zamanda zorunlu karşılık likidite şartlarını da sıkılaştırdı.",
        clue: "Not only cümle başında devrik başlar ➔ did it raise."
      }
    ],
    quiz: [
      {
        id: "q-top17-1",
        difficulty: 1,
        stem: "The modern financial software is designed to be ________ cost-effective ________ user-friendly.",
        options: ["both / and", "neither / or", "either / and", "not only / but", "so / as"],
        answerIndex: 0,
        explanation: "'cost-effective' ve 'user-friendly' iki sıfattır; birleştirici paralel bağlaç 'both ... and ...'dir.",
        ruleTag: "Both ... and"
      },
      {
        id: "q-top17-2",
        difficulty: 2,
        stem: "The corporate restructuring plan aims not only to reduce operating overhead ________ to diversify lending revenue streams.",
        options: ["but also", "and also", "as well", "or else", "yet"],
        answerIndex: 0,
        explanation: "'not only' kalıbının ikinci yarısı 'but also' (sadece ... değil, aynı zamanda ...) olarak tamamlanır.",
        ruleTag: "Not only ... but also"
      },
      {
        id: "q-top17-3",
        difficulty: 2,
        stem: "Not only ________ the regulatory audit discover significant compliance breaches, but it also recommended administrative penalties.",
        options: ["did", "was", "has", "does", "had"],
        answerIndex: 0,
        explanation: "'Not only' cümle başında kullanıldığında cümle devrik olur: Geçmiş zaman için 'did + Özne + V1' kullanılır.",
        ruleTag: "Not only Cümle Başı Devriği"
      },
      {
        id: "q-top17-4",
        difficulty: 2,
        stem: "A successful commercial loan portfolio requires ________ diligent risk appraisal and continuous client communication.",
        options: ["both", "either", "neither", "whether", "such"],
        answerIndex: 0,
        explanation: "Cümlede 'and' olduğuna göre ilk parça 'both' (both ... and ...) olmalıdır.",
        ruleTag: "Both and Paralelizmi"
      },
      {
        id: "q-top17-5",
        difficulty: 3,
        stem: "The institution must either adapt to digital decentralized technologies ________ lose its competitive retail market share.",
        options: ["or", "nor", "and", "but", "so"],
        answerIndex: 0,
        explanation: "'either' bağlacının eşleştiği ikinci kelime 'or'dur (ya ... ya da ...).",
        ruleTag: "Either ... or"
      }
    ]
  },

  // 18. Reading Comprehension
  {
    id: "eng-topic-18",
    number: 18,
    title: "Reading Comprehension (Okuduğunu Anlama)",
    subtitle: "Ana Fikir, Bağlamdan Kelime Çıkarımı, Referans Zamirler ve Çıkarım Taktikleri",
    icon: "fa-book-open-reader",
    summary: "Paragrafı kelime kelime çevirmeye çalışmak vakit kaybettirir. İlk ve son cümle kuralı, aşırı kesin kelime (extreme words) eleme taktiği ile sorular hızla çözülür.",
    theory: [
      {
        heading: "1. Soru Türleri ve Çözüm Adımları",
        content: "• **Main Idea (Ana Fikir):** Paragrafın ilk iki ve son cümlesini dikkatle okuyun. Paragrafın genel konusunu özetleyen şıkkı arayın.\n• **Reference Words (it, they, these, this):** Zamirin hemen bir önceki cümlesindeki tekil/çoğul isme bakın.\n• **Inference (Çıkarım):** Metinde açıkça yazmayan ama mantıksal olarak doğru olan sonuçtur (*It can be inferred from the passage that...*).\n• **True / False Soruları:** Paragrafta geçen anahtar kelimeyi bulup eşleştirin."
      },
      {
        heading: "2. Paragraf Sorularında Şık Eleme Sırları",
        content: "• **Extreme Words (Aşırı İfadeler):** Şıklarda *always, never, only, completely, entirely, all* varsa %90 YANLIŞTIR.\n• **Hedge Words (İhtiyatlı Dil):** Şıklarda *may, might, could, likely, tend to, often, partially* varsa %80 DOĞRUDUR (Akademik metinler kesin konuşmaz!)."
      }
    ],
    tables: [
      {
        title: "Şık Eleme ve Tuzak Sözcükler Tablosu",
        headers: ["Tuzak Şık İfadeleri (Genelde Yanlış)", "Doğru Cevap İpuçları (Genelde Doğru)", "Nedeni"],
        rows: [
          ["always, never, all, none", "often, usually, can, sometimes", "Aşırı genelleme bilimsel metne uymaz."],
          ["only, solely, exclusively", "among others, primarily, largely", "Metinde olmayan tekillik atfeder."],
          ["completely, entirely", "partially, to some extent", "Metindeki kısmi durumları abartır."]
        ]
      }
    ],
    tactics: [
      "📌 **Taktik 1 (Önce Soruyu Oku):** Paragrafı okumadan önce soru kökünü okuyun; ne aradığınızı bilerek metne göz atın.",
      "📌 **Taktik 2 (Extreme Words Elemesi):** Paragraf sorularında şıklardaki 'only, never, always' geçenleri ilk turda eleyin.",
      "📌 **Taktik 3 (Referans Zamir Takibi):** 'The word \"it\" in line 4 refers to...' sorularında, o zamirden hemen önceki cümlenin özne ve nesnesine odaklanın."
    ],
    examples: [
      {
        en: "Passage: 'Decentralized finance (DeFi) platforms utilize automated smart contracts to execute transactions without financial intermediaries. While this drastically reduces processing fees, the absence of centralized regulatory supervision exposes retail investors to substantial risk.'",
        tr: "Soru: What can be inferred about DeFi?\nDoğru Şık: Although it offers cost efficiencies, it lacks regulatory protection.\nYanlış Şıklar: It will completely eliminate traditional banking. (Aşırı iddia: completely).",
        clue: "İhtiyatlı ve zıtlığı özetleyen şık doğrudur."
      }
    ],
    quiz: [
      {
        id: "q-top18-1",
        difficulty: 1,
        stem: "Read the excerpt: 'Open Banking initiatives mandate that incumbent commercial banks share customer-permissioned financial data with licensed fintech providers via secure APIs.'\n\nWhat is a strict prerequisite for data sharing under Open Banking?",
        options: [
          "Explicit consent granted by the customer.",
          "The complete elimination of all banking fees.",
          "Government ownership of all participating fintech firms.",
          "The permanent closure of all physical bank branches.",
          "Exemption from international cybersecurity standards."
        ],
        answerIndex: 0,
        explanation: "Metindeki 'customer-permissioned' (müşteri izinli) ifadesi, veri paylaşımının 'müşterinin açık rızası'na (explicit consent) bağlı olduğunu gösterir.",
        ruleTag: "Doğrudan Bilgi Eşleme"
      },
      {
        id: "q-top18-2",
        difficulty: 2,
        stem: "Read the statement: 'Central Bank Digital Currencies (CBDCs) may improve cross-border payment speed, but they could also increase financial disintermediation risks for commercial retail lenders.'\n\nAccording to the passage, what is true regarding CBDCs?",
        options: [
          "They carry both technological benefits and potential risks for commercial banks.",
          "They have completely replaced physical cash across all developed nations.",
          "They can never be monitored by sovereign monetary authorities.",
          "They only serve the financial interests of private cryptocurrency miners.",
          "They entirely eliminate the risk of inflation in any economy."
        ],
        answerIndex: 0,
        explanation: "Metin iki yönlü bir durumu (hız artışı ama ticari bankalar için risk) anlatır. B, C, D ve E şıkları aşırı uç ('completely, never, only, entirely') iddialar taşır.",
        ruleTag: "Extreme Words Elemesi"
      },
      {
        id: "q-top18-3",
        difficulty: 2,
        stem: "Read the sentence: 'When the central bank hiked its benchmark policy rate, commercial banks adjusted their deposit yields immediately, but they were reluctant to increase long-term mortgage loan rates.'\n\nWhat does the pronoun 'they' refer to in the sentence?",
        options: ["Commercial banks", "Benchmark policy rates", "Deposit yields", "Mortgage loan rates", "Central bank officials"],
        answerIndex: 0,
        explanation: "'they were reluctant' eylemini yapan özne, cümlenin ana öznesi olan çoğul 'commercial banks'tir.",
        ruleTag: "Referans Zamir (Pronoun Reference)"
      },
      {
        id: "q-top18-4",
        difficulty: 2,
        stem: "Read the excerpt: 'Artificial intelligence credit models evaluate thousands of alternative data variables. Consequently, individuals with thin credit histories can obtain access to financial services.'\n\nWhat can be concluded from this passage?",
        options: [
          "AI models can help expand financial inclusion for non-traditional borrowers.",
          "Human loan officers are strictly prohibited from evaluating credit applications.",
          "AI models always eliminate credit default risks entirely.",
          "Traditional bank statements are no longer accepted by any lender worldwide.",
          "Only tech-savvy youth are eligible to apply for commercial loans."
        ],
        answerIndex: 0,
        explanation: "'Kredi geçmişi az olanların finansal hizmete erişmesi' finansal kapsayıcılığın (financial inclusion) genişlemesi anlamına gelir.",
        ruleTag: "Mantıksal Çıkarım (Inference)"
      },
      {
        id: "q-top18-5",
        difficulty: 3,
        stem: "In reading comprehension test questions, which of the following answer choices is MOST LIKELY to be incorrect due to unwarranted extreme generalization?",
        options: [
          "The policy completely eliminates all future economic volatility.",
          "The policy may partially mitigate short-term volatility.",
          "The policy tends to influence foreign direct investments.",
          "Some sectors could experience slower growth rates.",
          "The outcome largely depends on fiscal discipline."
        ],
        answerIndex: 0,
        explanation: "'completely eliminates all' aşırı genelleme (extreme words) içerir ve akademik test metinlerinde neredeyse her zaman çeldirici / yanlış şıktır.",
        ruleTag: "Aşırı Genelleme Tespiti"
      }
    ]
  }
];

// Save to data/english_master_topics.json
const outputPath = path.join(__dirname, '../data/english_master_topics.json');
fs.writeFileSync(outputPath, JSON.stringify(topics, null, 2), 'utf8');

console.log(`Successfully generated ${topics.length} English Master topics with 5 questions each (Total ${topics.length * 5} questions).`);
console.log(`Saved to: ${outputPath}`);
