// scripts/create_ingilizce_40.js
// Generates exactly 40 English questions (B1-B2 level, banking, grammar, vocab, cloze, reading)
const fs = require('fs');
const path = require('path');

const existingQuestions = [
  {
    "id": "eng-001",
    "section": "ingilizce",
    "topic": "Grammar",
    "subtopic": "Conditionals",
    "difficulty": 2,
    "stem": "If the central bank ________ the benchmark interest rate sooner, the domestic currency ________ so significantly against foreign currencies last year.",
    "options": [
      "had raised / would not have depreciated",
      "raised / will not depreciate",
      "has raised / would not depreciate",
      "raises / would not have depreciated",
      "would raise / had not depreciated"
    ],
    "answerIndex": 0,
    "explanation": "Cümle geçmişte gerçekleşmemiş bir durumu anlattığı için Type 3 Conditional (Past Unreal) yapısı gerektirir: If + Past Perfect (had raised), would + have + V3 (would not have depreciated).",
    "tags": ["grammar", "conditionals", "if-clause", "type-3"],
    "source": "original"
  },
  {
    "id": "eng-002",
    "section": "ingilizce",
    "topic": "Vocabulary",
    "subtopic": "Banking & Finance",
    "difficulty": 2,
    "stem": "In financial accounting, a company's total ________ represents the debts and financial obligations that it owes to outside parties, such as loans and accounts payable.",
    "options": [
      "assets",
      "liabilities",
      "dividends",
      "revenues",
      "equities"
    ],
    "answerIndex": 1,
    "explanation": "'Liabilities' (yükümlülükler / borçlar), bir işletmenin dış taraflara olan borç ve taahhütlerini ifade eder. 'Assets' ise varlıklar demektir.",
    "tags": ["vocabulary", "finance", "accounting", "banking"],
    "source": "original"
  },
  {
    "id": "eng-003",
    "section": "ingilizce",
    "topic": "Grammar",
    "subtopic": "Conjunctions",
    "difficulty": 2,
    "stem": "________ experiencing volatile market fluctuations in the first quarter, the state bank managed to report record net profitability by year-end.",
    "options": [
      "In spite of",
      "Although",
      "Therefore",
      "Unless",
      "Provided that"
    ],
    "answerIndex": 0,
    "explanation": "'In spite of' (veya Despite) kendisinden sonra isim öbeği veya -ing (gerund) alır ve zıtlık bildirir: 'In spite of experiencing...'. 'Although' ise tam bir cümle (özne + yüklem) gerektirirdi.",
    "tags": ["grammar", "conjunctions", "in-spite-of"],
    "source": "original"
  },
  {
    "id": "eng-004",
    "section": "ingilizce",
    "topic": "Vocabulary",
    "subtopic": "Cybersecurity & IT",
    "difficulty": 2,
    "stem": "The financial institution immediately notified its regulatory authorities and affected customers following a severe data ________ that compromised sensitive account credentials.",
    "options": [
      "prosperity",
      "surplus",
      "breach",
      "collateral",
      "maturity"
    ],
    "answerIndex": 2,
    "explanation": "'Data breach' (veri ihlali/sızıntısı), hassas verilerin yetkisiz kişilerin eline geçmesi durumudur.",
    "tags": ["vocabulary", "cybersecurity", "breach", "it"],
    "source": "original"
  },
  {
    "id": "eng-005",
    "section": "ingilizce",
    "topic": "Sentence Completion",
    "subtopic": "Relative Clauses",
    "difficulty": 2,
    "stem": "Machine learning algorithms, ________ ability to identify subtle patterns in massive transaction streams is well documented, are increasingly deployed for real-time fraud prevention.",
    "options": [
      "whose",
      "which",
      "whom",
      "that",
      "where"
    ],
    "answerIndex": 0,
    "explanation": "Burada sahiplik (iyelik) ilişkisi vardır: 'Algoritmaların yeteneği' anlamını vermek için 'whose + noun' (whose ability) yapısı kullanılır.",
    "tags": ["grammar", "relative-clauses", "whose"],
    "source": "original"
  },
  {
    "id": "eng-006",
    "section": "ingilizce",
    "topic": "Grammar",
    "subtopic": "Passive Voice",
    "difficulty": 2,
    "stem": "The new risk management guidelines ________ by the supervisory banking authority before the close of the current fiscal quarter.",
    "options": [
      "will be implemented",
      "implementing",
      "implemented",
      "have implemented",
      "were implementing"
    ],
    "answerIndex": 0,
    "explanation": "Cümle gelecekte denetleyici kurum tarafından uygulanacak kuralları anlatan bir edilgen (Passive Voice) yapıdır: 'will be implemented' (uygulanacaktır).",
    "tags": ["grammar", "passive-voice", "future"],
    "source": "original"
  },
  {
    "id": "eng-007",
    "section": "ingilizce",
    "topic": "Vocabulary",
    "subtopic": "Financial Terms",
    "difficulty": 2,
    "stem": "Commercial banks often require borrowers to pledge physical property or securities as ________ to guarantee the repayment of substantial business loans.",
    "options": [
      "collateral",
      "dividend",
      "subsidy",
      "deficit",
      "inflation"
    ],
    "answerIndex": 0,
    "explanation": "'Collateral' (teminat, rehin, ipotek), kredi geri ödemesini güvence altına almak için bankaya sunulan varlıktır.",
    "tags": ["vocabulary", "finance", "collateral"],
    "source": "original"
  },
  {
    "id": "eng-008",
    "section": "ingilizce",
    "topic": "Grammar",
    "subtopic": "Conjunctions of Contrast",
    "difficulty": 2,
    "stem": "________ traditional retail branches continue to experience declining foot traffic, mobile banking applications are registering unprecedented user engagement.",
    "options": [
      "While",
      "Because",
      "Despite",
      "Therefore",
      "In case"
    ],
    "answerIndex": 0,
    "explanation": "'While' (veya Whereas), iki durum arasındaki zıtlığı belirtmek için tam bir yan cümlenin (Subject + Verb) başında kullanılır: 'Geleneksel şubeler azalırken, mobil bankacılık rekor kırıyor'. 'Despite' arkasından tam cümle alamaz.",
    "tags": ["grammar", "conjunctions", "while", "contrast"],
    "source": "original"
  },
  {
    "id": "eng-009",
    "section": "ingilizce",
    "topic": "Vocabulary",
    "subtopic": "Phrasal Verbs",
    "difficulty": 2,
    "stem": "Digital payment transactions now ________ more than sixty percent of the total retail banking turnover in metropolitan areas.",
    "options": [
      "account for",
      "look down upon",
      "run out of",
      "turn down",
      "take after"
    ],
    "answerIndex": 0,
    "explanation": "'Account for' (oluşturmak, tekabül etmek, açıklamak), bir bütünün belirli bir oranını oluşturmak anlamına gelir ('account for more than 60%').",
    "tags": ["vocabulary", "phrasal-verbs", "account-for"],
    "source": "original"
  },
  {
    "id": "eng-010",
    "section": "ingilizce",
    "topic": "Vocabulary",
    "subtopic": "Economics",
    "difficulty": 2,
    "stem": "A persistent rise in raw material and energy prices often triggers ________ pressures throughout an economy, prompting consumers to cut discretionary spending.",
    "options": [
      "inflationary",
      "obsolete",
      "redundant",
      "negligible",
      "fraudulent"
    ],
    "answerIndex": 0,
    "explanation": "'Inflationary pressures' (enflasyonist baskılar), fiyatlar genel düzeyinin yukarı doğru itilmesini ifade eden yaygın bir ekonomi terimidir.",
    "tags": ["vocabulary", "economics", "inflationary"],
    "source": "original"
  },
  {
    "id": "eng-011",
    "section": "ingilizce",
    "topic": "Grammar",
    "subtopic": "Modals",
    "difficulty": 3,
    "stem": "The automated payment system failed during peak hours; the engineers ________ the stress-test simulations thoroughly before deployment.",
    "options": [
      "should have conducted",
      "must conduct",
      "can conduct",
      "would conduct",
      "needn't have conducted"
    ],
    "answerIndex": 0,
    "explanation": "'Should have + V3' (yapmalıydı ama yapmadı), geçmişe yönelik pişmanlık veya yerine getirilmemiş bir gerekliliği ifade eder: 'Mühendisler sistemi canlıya almadan önce simülasyonları yapmalıydı'.",
    "tags": ["grammar", "modals", "should-have"],
    "source": "original"
  },
  {
    "id": "eng-012",
    "section": "ingilizce",
    "topic": "Vocabulary",
    "subtopic": "Banking",
    "difficulty": 2,
    "stem": "Treasury bonds that have a 10-year ________ will pay fixed semi-annual coupon interest until the principal amount is reimbursed.",
    "options": [
      "maturity",
      "bankruptcy",
      "recession",
      "depreciation",
      "arbitrage"
    ],
    "answerIndex": 0,
    "explanation": "'Maturity' (vade / vade sonu), bir finansal borç veya yatırım aracının anaparasının geri ödeneceği son tarihtir.",
    "tags": ["vocabulary", "finance", "maturity"],
    "source": "original"
  },
  {
    "id": "eng-013",
    "section": "ingilizce",
    "topic": "Sentence Completion",
    "subtopic": "Cause and Effect",
    "difficulty": 2,
    "stem": "The central bank decided to lower reserve requirements ________ commercial lenders could provide more liquidity to private sector enterprises.",
    "options": [
      "so that",
      "whereas",
      "despite",
      "unless",
      "however"
    ],
    "answerIndex": 0,
    "explanation": "'So that' (-sın diye / amacıyla), amaç bildiren bir bağlaçtır ve kendisinden sonra cümle ile birlikte sıklıkla 'could / can / may' modalları kullanılır.",
    "tags": ["grammar", "conjunctions", "so-that"],
    "source": "original"
  }
];

const newQuestions = [
  {
    "id": "eng-014",
    "section": "ingilizce",
    "topic": "Grammar",
    "subtopic": "Tenses",
    "difficulty": 2,
    "stem": "While the database administrators ________ the customer records to the newly installed servers, an unexpected network timeout interrupted the synchronization process.",
    "options": [
      "migrated",
      "were migrating",
      "have migrated",
      "will migrate",
      "had been migrated"
    ],
    "answerIndex": 1,
    "explanation": "'While' ile başlayan yan cümlede geçmişte devam eden bir eylem (Past Continuous: 'were migrating') anlatılırken, diğer cümlede onu bölen anlık eylem Past Simple ('interrupted') ile ifade edilir.",
    "tags": ["grammar", "tenses", "past-continuous", "while"],
    "source": "original"
  },
  {
    "id": "eng-015",
    "section": "ingilizce",
    "topic": "Grammar",
    "subtopic": "Tenses",
    "difficulty": 2,
    "stem": "Our fintech subsidiary ________ biometric authentication solutions for regional banks since early 2021 without reporting any major downtime.",
    "options": [
      "is providing",
      "has been providing",
      "provided",
      "had provided",
      "will have provided"
    ],
    "answerIndex": 1,
    "explanation": "'Since early 2021' zaman ifadesi geçmişte başlayıp günümüze kadar kesintisiz devam eden süreçleri belirtmek için Present Perfect Continuous ('has been providing') gerektirir.",
    "tags": ["grammar", "tenses", "present-perfect-continuous", "since"],
    "source": "original"
  },
  {
    "id": "eng-016",
    "section": "ingilizce",
    "topic": "Grammar",
    "subtopic": "Modals of Deduction",
    "difficulty": 2,
    "stem": "The account balance looks completely unchanged; the automated payment order ________ processed yet by the clearinghouse.",
    "options": [
      "must be",
      "cannot have been",
      "should be",
      "might have been",
      "would have been"
    ],
    "answerIndex": 1,
    "explanation": "'Cannot have been + V3', geçmişe veya mevcut sonuca dayalı güçlü bir olumsuz çıkarım ('işlenmiş olamaz') ifade eder. Bakiye hiç değişmediğine göre işlemin gerçekleşmiş olması imkansız görünmektedir.",
    "tags": ["grammar", "modals", "deduction", "cannot-have-been"],
    "source": "original"
  },
  {
    "id": "eng-017",
    "section": "ingilizce",
    "topic": "Grammar",
    "subtopic": "Passive Voice",
    "difficulty": 2,
    "stem": "All corporate loan applications above five million lira ________ currently ________ by the senior credit committee to prevent non-performing assets.",
    "options": [
      "are / being reviewed",
      "have / reviewed",
      "were / reviewing",
      "will / review",
      "is / reviewed"
    ],
    "answerIndex": 0,
    "explanation": "'Currently' (şu anda) ifadesi ve eylemin başkası tarafından yapılması (komite tarafından incelenmesi) nedeniyle Present Continuous Passive ('are being reviewed') yapısı doğrudur. Özne çoğul ('applications') olduğu için 'are' kullanılır.",
    "tags": ["grammar", "passive-voice", "present-continuous-passive"],
    "source": "original"
  },
  {
    "id": "eng-018",
    "section": "ingilizce",
    "topic": "Grammar",
    "subtopic": "Conditionals",
    "difficulty": 2,
    "stem": "If our branch ________ specialized loan officers for agricultural clients, we ________ faster evaluation of farming subsidies right now.",
    "options": [
      "had / could deliver",
      "has / delivered",
      "would have / can deliver",
      "had had / delivered",
      "will have / will deliver"
    ],
    "answerIndex": 0,
    "explanation": "Şu anki varsayımsal durumu (şu an uzmanımız olsaydı, şu an daha hızlı yapardık) ifade eden Type 2 Conditional kuralı: 'If + Past Simple, could / would + V1' kalıbıdır ('had / could deliver').",
    "tags": ["grammar", "conditionals", "type-2"],
    "source": "original"
  },
  {
    "id": "eng-019",
    "section": "ingilizce",
    "topic": "Grammar",
    "subtopic": "Prepositions & Collocations",
    "difficulty": 1,
    "stem": "Commercial banking entities are legally required to strictly comply ________ anti-money laundering (AML) regulations established by the financial crimes investigation board.",
    "options": [
      "with",
      "for",
      "about",
      "against",
      "under"
    ],
    "answerIndex": 0,
    "explanation": "'Comply' fiili daima 'with' edatıyla birlikte kullanılır: 'comply with regulations' (yönetmeliklere/kurallara uymak).",
    "tags": ["grammar", "prepositions", "collocations", "comply-with"],
    "source": "original"
  },
  {
    "id": "eng-020",
    "section": "ingilizce",
    "topic": "Grammar",
    "subtopic": "Prepositions & Collocations",
    "difficulty": 2,
    "stem": "Smallholder farmers who maintain a clean credit history are eligible ________ subsidized interest rate loans provided through official rural development funds.",
    "options": [
      "for",
      "with",
      "at",
      "of",
      "by"
    ],
    "answerIndex": 0,
    "explanation": "'Eligible' sıfatı bir hakka veya avantaja uygunluğu belirtirken 'for' edatı alır: 'eligible for a loan' (krediye uygun / kredi alma hakkına sahip).",
    "tags": ["grammar", "prepositions", "eligible-for"],
    "source": "original"
  },
  {
    "id": "eng-021",
    "section": "ingilizce",
    "topic": "Grammar",
    "subtopic": "Prepositions & Collocations",
    "difficulty": 1,
    "stem": "Over the past five years, state-owned banks have invested heavily ________ cloud-native core banking infrastructure to enhance operational agility.",
    "options": [
      "in",
      "on",
      "at",
      "over",
      "through"
    ],
    "answerIndex": 0,
    "explanation": "'Invest' fiili bir şeye/alana yatırım yapıldığında 'in' edatı ile kullanılır: 'invest in cloud infrastructure' (bulut altyapısına yatırım yapmak).",
    "tags": ["grammar", "prepositions", "invest-in"],
    "source": "original"
  },
  {
    "id": "eng-022",
    "section": "ingilizce",
    "topic": "Grammar",
    "subtopic": "Determiners & Pronouns",
    "difficulty": 2,
    "stem": "The auditing team inspected two different accounting software vendors, but ________ of them met the strict fault-tolerance standards outlined in the tender.",
    "options": [
      "neither",
      "either",
      "none",
      "both",
      "all"
    ],
    "answerIndex": 0,
    "explanation": "İki seçenekten bahsederken ('two different vendors') her ikisinin de sağlamadığını (olumsuz) belirtmek için 'neither of them' kullanılır. 'None' ise ikiden fazla seçenek için kullanılır.",
    "tags": ["grammar", "determiners", "neither"],
    "source": "original"
  },
  {
    "id": "eng-023",
    "section": "ingilizce",
    "topic": "Grammar",
    "subtopic": "Gerunds & Infinitives",
    "difficulty": 2,
    "stem": "We sincerely appreciate your prompt inquiry and look forward to ________ our strategic partnership during the forthcoming annual financial conference.",
    "options": [
      "expand",
      "expanding",
      "expanded",
      "expansion",
      "be expanded"
    ],
    "answerIndex": 1,
    "explanation": "'Look forward to' deyimindeki 'to' bir edattır (preposition). Preposition'lardan sonra gelen fiiller daima Gerund (-ing) alır: 'look forward to expanding'.",
    "tags": ["grammar", "gerunds-infinitives", "look-forward-to"],
    "source": "original"
  },
  {
    "id": "eng-024",
    "section": "ingilizce",
    "topic": "Grammar",
    "subtopic": "Gerunds & Infinitives",
    "difficulty": 2,
    "stem": "To prevent unauthorized access, IT security policies strictly prohibit staff members from ________ confidential credentials via unencrypted messaging channels.",
    "options": [
      "transmitting",
      "to transmit",
      "transmit",
      "transmitted",
      "having transmitted"
    ],
    "answerIndex": 0,
    "explanation": "'Prohibit somebody from doing something' kalıbında, 'from' edatından sonra fiil -ing (gerund) takısı almalıdır: 'from transmitting'.",
    "tags": ["grammar", "gerunds-infinitives", "prohibit-from"],
    "source": "original"
  },
  {
    "id": "eng-025",
    "section": "ingilizce",
    "topic": "Vocabulary",
    "subtopic": "Banking & Finance",
    "difficulty": 2,
    "stem": "At the annual general assembly, the board recommended distributing a cash ________ of 1.20 TL per share to shareholders out of retained earnings.",
    "options": [
      "deficit",
      "dividend",
      "mortgage",
      "inflation",
      "depreciation"
    ],
    "answerIndex": 1,
    "explanation": "'Dividend' (kâr payı / temettü), bir şirketin elde ettiği kârdan hisse sahiplerine hisse başına dağıttığı paydır.",
    "tags": ["vocabulary", "banking", "dividend", "shares"],
    "source": "original"
  },
  {
    "id": "eng-026",
    "section": "ingilizce",
    "topic": "Vocabulary",
    "subtopic": "Banking & Finance",
    "difficulty": 2,
    "stem": "During periods of rapid capital outflows, commercial banks can face a severe ________ squeeze if interbank lending rates skyrocket unexpectedly.",
    "options": [
      "liquidity",
      "validity",
      "redundancy",
      "versatility",
      "conformity"
    ],
    "answerIndex": 0,
    "explanation": "'Liquidity squeeze' (likidite sıkışıklığı), piyasada nakit veya kolay nakde çevrilebilir varlıkların yetersiz kalması durumudur.",
    "tags": ["vocabulary", "banking", "liquidity"],
    "source": "original"
  },
  {
    "id": "eng-027",
    "section": "ingilizce",
    "topic": "Vocabulary",
    "subtopic": "Banking & Finance",
    "difficulty": 3,
    "stem": "Under the standard loan agreement, the gradual repayment of the debt principal along with regular interest charges over time is referred to as ________.",
    "options": [
      "amortization",
      "inflation",
      "securitization",
      "insolvency",
      "arbitrage"
    ],
    "answerIndex": 0,
    "explanation": "'Amortization' (itfa / amortisman / borç tükenimi), bir kredinin ana para ve faizinin belirlenen bir geri ödeme planına göre taksitlerle kademeli olarak kapatılmasıdır.",
    "tags": ["vocabulary", "banking", "amortization"],
    "source": "original"
  },
  {
    "id": "eng-028",
    "section": "ingilizce",
    "topic": "Vocabulary",
    "subtopic": "Synonyms & Antonyms",
    "difficulty": 2,
    "stem": "Choose the word closest in meaning to the underlined word:\n\"Exchange rates tend to *fluctuate* dramatically whenever central banks unexpectedly alter their interest rate guidance.\"",
    "options": [
      "vary",
      "stabilize",
      "decline",
      "persist",
      "disappear"
    ],
    "answerIndex": 0,
    "explanation": "'Fluctuate' (dalgalanmak, değişkenlik göstermek) kelimesinin en yakın anlamlısı 'vary' (farklılaşmak, değişmek) kelimesidir.",
    "tags": ["vocabulary", "synonyms", "fluctuate"],
    "source": "original"
  },
  {
    "id": "eng-029",
    "section": "ingilizce",
    "topic": "Vocabulary",
    "subtopic": "Phrasal Verbs",
    "difficulty": 2,
    "stem": "The IT department intends to ________ outmoded mainframe architectures and replace them with modular microservice architectures by next year.",
    "options": [
      "phase out",
      "bring up",
      "give in",
      "look into",
      "carry on"
    ],
    "answerIndex": 0,
    "explanation": "'Phase out' (kademeli olarak sonlandırmak / kullanımdan kaldırmak), eski bir sistem veya ürünün yerine yenisi konurken yavaşça devreden çıkarılmasıdır.",
    "tags": ["vocabulary", "phrasal-verbs", "phase-out"],
    "source": "original"
  },
  {
    "id": "eng-030",
    "section": "ingilizce",
    "topic": "Sentence Completion",
    "subtopic": "Transitions & Conjunctions",
    "difficulty": 2,
    "stem": "________ the macroeconomic climate remained challenging throughout the fiscal year, the agricultural credit portfolio showed surprisingly low default rates.",
    "options": [
      "Even though",
      "Because",
      "In order that",
      "So as to",
      "As a result of"
    ],
    "answerIndex": 0,
    "explanation": "'Even though' (-e rağmen / her ne kadar ... olsa da) tam cümle ile zıtlık bildiren bir yan cümle bağlacıdır. Makroekonomik şartlar zorlu olmasına rağmen batık kredi oranının düşük çıkması zıtlıktır.",
    "tags": ["sentence-completion", "conjunctions", "even-though"],
    "source": "original"
  },
  {
    "id": "eng-031",
    "section": "ingilizce",
    "topic": "Sentence Completion",
    "subtopic": "Reason Clauses",
    "difficulty": 2,
    "stem": "Due to unforeseen hardware maintenance in the central data warehouse, ________.",
    "options": [
      "all overnight batch settlement jobs were postponed until the following morning",
      "because the mobile banking application functioned without any latency",
      "which caused customers to express great satisfaction with banking speed",
      "if the credit card verification system had operated seamlessly",
      "in spite of the prompt resolution of all customer inquiries"
    ],
    "answerIndex": 0,
    "explanation": "'Due to ...' (nedeniyle) bir sebep bildiren zarf öbeğidir ve arkasından mantıklı bir sonuç ana cümlesi gerektirir: 'Merkezi depodaki bakım nedeniyle tüm gece mutabakat işleri ertesi sabaha ertelendi.'",
    "tags": ["sentence-completion", "cause-and-effect"],
    "source": "original"
  },
  {
    "id": "eng-032",
    "section": "ingilizce",
    "topic": "Error Identification",
    "subtopic": "Subject-Verb Agreement",
    "difficulty": 2,
    "stem": "Identify the underlined part that contains a grammatical error:\n\n\"(A) *Each of* the regional branches (B) *have reported* a notable increase in (C) *digital loan applications* (D) *since* the revised mobile interface (E) *was released*.\"",
    "options": [
      "(A) Each of",
      "(B) have reported",
      "(C) digital loan applications",
      "(D) since",
      "(E) was released"
    ],
    "answerIndex": 1,
    "explanation": "'Each of + plural noun' yapısı daima tekil fiil (singular verb) gerektirir. 'Each of the regional branches has reported' olmalıdır; 'have reported' dil bilgisi hatasıdır.",
    "tags": ["error-identification", "grammar", "subject-verb-agreement"],
    "source": "original"
  },
  {
    "id": "eng-033",
    "section": "ingilizce",
    "topic": "Error Identification",
    "subtopic": "Adjective / Adverb Usage",
    "difficulty": 2,
    "stem": "Identify the underlined part that contains a grammatical error:\n\n\"The newly launched (A) *fraud detection* system operates (B) *remarkable* (C) *efficiently* by cross-referencing customer location data (D) *with* ongoing POS transaction (E) *records*.\"",
    "options": [
      "(A) fraud detection",
      "(B) remarkable",
      "(C) efficiently",
      "(D) with",
      "(E) records"
    ],
    "answerIndex": 1,
    "explanation": "'Efficiently' bir zarftır (adverb). Bir zarfı nitelemek için sıfat ('remarkable') değil, başka bir zarf kullanılmalıdır: 'remarkably efficiently' (kayda değer derecede verimli).",
    "tags": ["error-identification", "grammar", "adjective-adverb"],
    "source": "original"
  },
  {
    "id": "eng-034",
    "section": "ingilizce",
    "topic": "Dialogue Completion",
    "subtopic": "Customer Support",
    "difficulty": 2,
    "stem": "Complete the dialogue:\n\nCustomer: \"Good morning, I tried to make a SWIFT transfer to my supplier abroad, but the system displayed an error code 'ERR-402'.\"\nBank Representative: \"________\"\nCustomer: \"No, I didn't verify that. Let me look up their exact IBAN and BIC immediately.\"",
    "options": [
      "Did you make sure that the recipient's bank routing details and SWIFT code were completely accurate?",
      "Would you like to open a multi-currency foreign exchange deposit account today?",
      "Our physical branches are currently closed due to public holiday regulations.",
      "The foreign exchange rate has just increased by five percent since yesterday.",
      "You cannot cancel an international transaction once it is cleared."
    ],
    "answerIndex": 0,
    "explanation": "Müşterinin 'Hayır, bunu kontrol etmemiştim, hemen IBAN ve BIC kodlarına bakayım' cevabı; temsilcinin alıcının şube/SWIFT kodlarının doğruluğunu soran bir soru yönelttiğini gösterir.",
    "tags": ["dialogue-completion", "banking", "swift"],
    "source": "original"
  },
  {
    "id": "eng-035",
    "section": "ingilizce",
    "topic": "Dialogue Completion",
    "subtopic": "IT Helpdesk",
    "difficulty": 2,
    "stem": "Complete the dialogue:\n\nLoan Analyst: \"I cannot access the risk score dashboard this morning. The screen keeps prompting me for secondary authorization.\"\nSecurity Administrator: \"We rolled out mandatory two-factor authentication (2FA) for all intranet tools over the weekend.\"\nLoan Analyst: \"Oh, I see. What should I do next to log in?\"\nSecurity Administrator: \"________\"",
    "options": [
      "Simply open the corporate authenticator app on your registered smartphone and enter the 6-digit passcode.",
      "You should reinstall Windows on your laptop to wipe out any corrupt files.",
      "The loan interest rates are recalculated every Monday by our treasury division.",
      "We will probably cancel all customer loans that were submitted last week.",
      "Please deposit twenty lira to renew your debit card subscription."
    ],
    "answerIndex": 0,
    "explanation": "2FA (İki faktörlü kimlik doğrulama) ile ilgili bir soruya IT yöneticisinin 'Kurumsal kimlik doğrulayıcı uygulamanızı açıp 6 haneli kodu giriniz' demesi bağlama tam uygundur.",
    "tags": ["dialogue-completion", "it", "security", "2fa"],
    "source": "original"
  },
  {
    "id": "eng-036",
    "section": "ingilizce",
    "topic": "Cloze Test",
    "subtopic": "Digital Banking Evolution",
    "difficulty": 2,
    "stem": "Read the text and choose the best option for blank [1]:\n\n\"The modern banking sector has witnessed an unprecedented transformation over the last decade. Traditional branch-centric operations are rapidly giving way to digital-first banking paradigms. Consequently, financial institutions must continuously update their legacy software architectures [1] ________ cyber threats become ever more sophisticated.\"",
    "options": [
      "as",
      "despite",
      "unlike",
      "instead",
      "unless"
    ],
    "answerIndex": 0,
    "explanation": "'As' burada '-dıkça / çünkü' (as cyber threats become...) anlamında sebep veya eş zamanlı gelişim bildirmektedir: 'Siber tehditler daha sofistike hale geldikçe kurumlar yazılımlarını güncellemelidir'.",
    "tags": ["cloze-test", "conjunctions", "as"],
    "source": "original"
  },
  {
    "id": "eng-037",
    "section": "ingilizce",
    "topic": "Cloze Test",
    "subtopic": "Digital Banking Evolution",
    "difficulty": 2,
    "stem": "Read the text and choose the best option for blank [2]:\n\n\"...Furthermore, customer expectations regarding speed and usability have escalated dramatically. Mobile applications that fail to offer intuitive navigation risk losing market share, [2] ________ the underlying core banking engine is technically robust.\"",
    "options": [
      "even if",
      "in order that",
      "so as to",
      "owing to",
      "because of"
    ],
    "answerIndex": 0,
    "explanation": "'Even if' (-se bile / olsa dahi), koşullu zıtlık bildirir: 'Altyapı sağlam olsa bile, sezgisel bir arayüz sunamayan mobil uygulamalar pazar payını kaybetme riski taşır'.",
    "tags": ["cloze-test", "conditionals", "even-if"],
    "source": "original"
  },
  {
    "id": "eng-038",
    "section": "ingilizce",
    "topic": "Reading Comprehension",
    "subtopic": "Open Banking & API Economy",
    "difficulty": 2,
    "stem": "Answer the question according to the text below:\n\n\"Open Banking represents a regulatory and technological framework that mandates financial institutions to share customer-permissioned financial data with certified third-party providers via standardized Application Programming Interfaces (APIs). In Turkey, regulatory frameworks spearheaded by the Central Bank (TCMB) and the Banking Regulation and Supervision Agency (BDDK) have established robust security standards for open banking implementations, such as Account Information Services (AIS) and Payment Initiation Services (PIS). While incumbent commercial banks initially perceived open banking as a threat to their proprietary customer data, many have now embraced it as an opportunity to expand their digital ecosystem by partnering with agile fintech startups.\"\n\nAccording to the passage, what is the primary role of APIs in Open Banking?",
    "options": [
      "They allow secure sharing of customer-approved financial data with certified third-party providers.",
      "They completely eliminate the need for supervisory banking oversight bodies like BDDK.",
      "They permanently replace all physical bank branches with automated teller machines.",
      "They guarantee that bank deposit interest rates remain permanently fixed.",
      "They enable customers to bypass all authentication requirements during online purchases."
    ],
    "answerIndex": 0,
    "explanation": "Metnin ilk cümlesinde açıkça belirtilmiştir: 'mandates financial institutions to share customer-permissioned financial data with certified third-party providers via standardized Application Programming Interfaces (APIs)'.",
    "tags": ["reading-comprehension", "open-banking", "apis"],
    "source": "original"
  },
  {
    "id": "eng-039",
    "section": "ingilizce",
    "topic": "Reading Comprehension",
    "subtopic": "Open Banking & API Economy",
    "difficulty": 2,
    "stem": "According to the passage on Open Banking, how has the perspective of incumbent commercial banks changed over time?",
    "options": [
      "They initially viewed it as a threat to their proprietary data, but now see it as an opportunity to collaborate with fintechs.",
      "They completely refused to comply with regulatory standards published by TCMB.",
      "They decided to stop all mobile software development and return to branch banking.",
      "They merged all of their credit card divisions into a single unified state institution.",
      "They ceased offering payment initiation services due to excessive operating expenses."
    ],
    "answerIndex": 0,
    "explanation": "Metnin son cümlesinde: 'While incumbent commercial banks initially perceived open banking as a threat to their proprietary customer data, many have now embraced it as an opportunity to expand their digital ecosystem by partnering with agile fintech startups' ifadesi yer almaktadır.",
    "tags": ["reading-comprehension", "banks-fintech", "open-banking"],
    "source": "original"
  },
  {
    "id": "eng-040",
    "section": "ingilizce",
    "topic": "Reading Comprehension",
    "subtopic": "Open Banking & API Economy",
    "difficulty": 2,
    "stem": "What can be inferred from the passage regarding Open Banking in Turkey?",
    "options": [
      "Open banking services operate within a strictly regulated environment supervised by official authorities such as TCMB and BDDK.",
      "Third-party providers can access user banking data without obtaining explicit customer consent.",
      "Turkish banks are technologically behind foreign banks and cannot implement API standards.",
      "Payment Initiation Services are prohibited under current Turkish banking legislation.",
      "Customer financial data is made publicly readable on the internet without any encryption."
    ],
    "answerIndex": 0,
    "explanation": "Metinde TCMB ve BDDK öncülüğünde sağlam güvenlik standartlarının getirildiği açıkça vurgulanmaktadır. Bu da açık bankacılığın resmi otoritelerce sıkı biçimde düzenlenen ve denetlenen bir ortamda çalıştığını gösterir.",
    "tags": ["reading-comprehension", "inference", "banking-regulations"],
    "source": "original"
  }
];

const allEnglish = [...existingQuestions, ...newQuestions];

if (allEnglish.length !== 40) {
  console.error(`Error: Expected 40 questions, got ${allEnglish.length}`);
  process.exit(1);
}

const outputPath = path.join(__dirname, '..', 'data', 'questions', 'ingilizce.json');
fs.writeFileSync(outputPath, JSON.stringify(allEnglish, null, 2), 'utf8');
console.log(`ingilizce.json successfully updated with exactly ${allEnglish.length} questions.`);
