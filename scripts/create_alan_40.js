// scripts/create_alan_40.js
// Generates exactly 40 Computer Engineering questions matching the Master Prompt syllabus
const fs = require('fs');
const path = require('path');

const existingQuestions = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'questions', 'alan_bilgisayar.json'), 'utf8')
);

const newQuestions = [
  {
    "id": "alan-021",
    "section": "alan",
    "topic": "Algoritma ve Programlama",
    "subtopic": "Rekürsiyon ve Çağrı Yığını",
    "difficulty": 2,
    "stem": "Aşağıdaki özyinelemeli (rekürsif) C fonksiyonu `hesapla(4)` parametresi ile çağrıldığında dönecek sonuç nedir?\n\n```c\nint hesapla(int n) {\n    if (n <= 1) return 1;\n    return n + hesapla(n - 2);\n}\n```",
    "options": [
      "5",
      "7",
      "9",
      "10",
      "15"
    ],
    "answerIndex": 1,
    "explanation": "Adım adım çağrı yığını:\n1. `hesapla(4) = 4 + hesapla(2)`\n2. `hesapla(2) = 2 + hesapla(0)`\n3. `hesapla(0)` için `n <= 1` şartı sağlandığından taban durum devreye girer ve `1` döner.\nSonuç: `4 + 2 + 1 = 7`.",
    "tags": ["algoritma", "rekürsiyon", "c-dili", "kod-çıktısı"],
    "source": "original"
  },
  {
    "id": "alan-022",
    "section": "alan",
    "topic": "Algoritma ve Programlama",
    "subtopic": "Arama Algoritmaları",
    "difficulty": 2,
    "stem": "100.000 elemanlı sıralı bir tamsayı dizisinde İkili Arama (Binary Search) algoritması kullanıldığında, aranan elemanın bulunması veya dizide olmadığının anlaşılması için **en fazla (Worst-Case)** kaç karşılaştırma yapılması gerekir? ($\\log_2(100000) \\approx 16.6$)",
    "options": [
      "10",
      "17",
      "100",
      "50.000",
      "100.000"
    ],
    "answerIndex": 1,
    "explanation": "İkili arama her adımda arama uzayını yarıya indirir. En kötü durum karmaşıklığı $\\lfloor\\log_2(n)\\rfloor + 1$ formülü ile bulunur. $2^{16} = 65.536$ ve $2^{17} = 131.072$ olduğundan, 100.000 eleman için en fazla 17 karşılaştırma yeterlidir.",
    "tags": ["algoritma", "binary-search", "zaman-karmaşıklığı"],
    "source": "original"
  },
  {
    "id": "alan-023",
    "section": "alan",
    "topic": "Veri Yapıları ve Algoritmalar",
    "subtopic": "Yığın (Stack) ve Kuyruk (Queue)",
    "difficulty": 1,
    "stem": "Bir banka şubesinde sıra numarası alan müşterilerin işlem önceliğini belirleyen sistem ile metin düzenleyicilerindeki 'Geri Al (Undo)' fonksiyonunun kullandığı veri yapıları sırasıyla hangi seçenekte doğru verilmiştir?",
    "options": [
      "Kuyruk (Queue - FIFO) / Yığın (Stack - LIFO)",
      "Yığın (Stack - LIFO) / Kuyruk (Queue - FIFO)",
      "Öncelikli Kuyruk / İkili Arama Ağacı",
      "Bağlı Liste / Dizi (Array)",
      "Hash Tablosu / Yığın (Stack)"
    ],
    "answerIndex": 0,
    "explanation": "Müşteri sıra sistemi 'İlk gelen ilk çıkar' (FIFO - First In First Out) mantığıyla Kuyruk (Queue) yapısını; en son yapılan işlemi ilk geri alan Undo sistemi ise 'Son gelen ilk çıkar' (LIFO - Last In First Out) mantığıyla Yığın (Stack) yapısını kullanır.",
    "tags": ["veri-yapıları", "stack", "queue", "fifo", "lifo"],
    "source": "original"
  },
  {
    "id": "alan-024",
    "section": "alan",
    "topic": "Veri Yapıları ve Algoritmalar",
    "subtopic": "Bağlı Liste ve Diziler",
    "difficulty": 2,
    "stem": "Tek yönlü bağlı listelerin (Singly Linked List) dinamik dizilere (Dynamic Array / ArrayList) kıyasla en belirgin avantajı hangisidir?",
    "options": [
      "Herhangi bir indeksteki elemana $O(1)$ sürede rastgele erişim (Random Access) sağlaması",
      "İşaretçinin bilindiği bir konuma yeni düğüm ekleme işleminin diziyi kaydırma maliyeti olmadan $O(1)$ sürede yapılabilmesi",
      "Bellek üzerinde ardışık (contiguous) bloklar halinde tutularak CPU önbellek (Cache) performansını artırması",
      "Her eleman için ilave işaretçi (pointer/reference) depolama yükü getirmemesi",
      "İkili arama (Binary Search) algoritmasını doğrudan desteklemesi"
    ],
    "answerIndex": 1,
    "explanation": "Dizilerde araya veya başa eleman eklerken kalan elemanların kaydırılması $O(n)$ maliyet gerektirir. Bağlı listelerde ise işaretçi adresi biliniyorsa eleman ekleme sadece referans güncellemesi ile $O(1)$ sürede tamamlanır. Ancak bağlı listeler rastgele erişim ($O(1)$) sağlayamaz.",
    "tags": ["veri-yapıları", "linked-list", "array", "performans"],
    "source": "original"
  },
  {
    "id": "alan-025",
    "section": "alan",
    "topic": "Veritabanları ve SQL",
    "subtopic": "GROUP BY ve HAVING",
    "difficulty": 2,
    "stem": "SQL sorgularında gruplanmış veriler üzerinde toplama fonksiyonlarına (Aggregate Functions: SUM, COUNT, AVG vb.) dayalı filtreleme yapmak için hangi anahtar kelime kullanılır?",
    "options": [
      "WHERE",
      "HAVING",
      "ORDER BY",
      "GROUP BY",
      "LIMIT"
    ],
    "answerIndex": 1,
    "explanation": "`WHERE` ifadesi satırlar gruplanmadan önce bireysel satırları filtreler ve aggregate fonksiyonlarla doğrudan kullanılamaz. `HAVING` ifadesi ise `GROUP BY` sonrasında oluşan gruplar üzerinde aggregate filtreleme yapmak için kullanılır (örneğin `HAVING COUNT(*) > 5`).",
    "tags": ["veritabanı", "sql", "having", "group-by"],
    "source": "original"
  },
  {
    "id": "alan-026",
    "section": "alan",
    "topic": "Veritabanları ve SQL",
    "subtopic": "Veritabanı İndeksleri",
    "difficulty": 2,
    "stem": "İlişkisel veritabanlarında sıkça kullanılan B-Tree indeksleme mekanizması ile ilgili aşağıdaki ifadelerden hangisi **yanlıştır**?",
    "options": [
      "`SELECT` sorgularında WHERE ve ORDER BY koşullarının çalışma süresini önemli ölçüde hızlandırır.",
      "Tabloya yapılan `INSERT`, `UPDATE` ve `DELETE` operasyonlarında ek indeks güncelleme maliyeti oluşturur.",
      "İndeksler diskte ilave depolama alanı kaplar.",
      "Bir tablodaki tüm sütunlara ayrı ayrı indeks eklemek veritabanı genel yazma performansını her zaman artırır.",
      "Primary Key tanımlanan bir sütun üzerinde çoğu veritabanı motoru otomatik olarak Clustered Index veya Unique Index oluşturur."
    ],
    "answerIndex": 3,
    "explanation": "Tüm sütunlara gereksiz indeks eklemek, her yazma işleminde (INSERT/UPDATE/DELETE) tüm bu indeks ağaçlarının da güncellenmesini zorunlu kıldığı için yazma performansını ciddi şekilde düşürür. İndeksler yalnızca sık sorgulanan ve seçiciliği yüksek sütunlara konulmalıdır.",
    "tags": ["veritabanı", "sql", "indeks", "b-tree"],
    "source": "original"
  },
  {
    "id": "alan-027",
    "section": "alan",
    "topic": "Veritabanları ve SQL",
    "subtopic": "İlişkisel Bütünlük (Referential Integrity)",
    "difficulty": 2,
    "stem": "İki ilişkisel tablo arasında kurulan Yabancı Anahtar (Foreign Key) kısıtında `ON DELETE CASCADE` kuralı tanımlandığında ne gerçekleşir?",
    "options": [
      "Ana (Primary Key) tablodaki bir kayıt silindiğinde, ona bağlı olan alt tablodaki ilişkili kayıtlar da otomatik olarak silinir.",
      "Alt tablodaki kayıt silindiğinde ana tablodaki kayıt da silinir.",
      "Bağlı kayıtlar varsa ana tablodaki kaydın silinmesi veritabanı tarafından engellenir (hata üretilir).",
      "Ana tablodaki kayıt silindiğinde alt tablodaki yabancı anahtar alanları NULL yapılır.",
      "Silinen kayıtlar geçici bir yedek tablosuna kopyalanır."
    ],
    "answerIndex": 0,
    "explanation": "`ON DELETE CASCADE`, ana (ebeveyn) tablodan bir satır silindiğinde, referans bütünlüğünü korumak adına o satırı işaret eden tüm bağımlı (çocuk) satırların da otomatik olarak silinmesini sağlar.",
    "tags": ["veritabanı", "foreign-key", "cascade", "referential-integrity"],
    "source": "original"
  },
  {
    "id": "alan-028",
    "section": "alan",
    "topic": "İşletim Sistemleri",
    "subtopic": "Process ve Thread Mimarisi",
    "difficulty": 2,
    "stem": "İşletim sistemlerinde Süreç (Process) ve İş Parçacığı (Thread) kavramları karşılaştırıldığında hangisi **doğrudur**?",
    "options": [
      "Aynı sürecin parçası olan thread'ler heap bellek alanını ve açık dosya tanımlayıcılarını ortak paylaşırken, kendilerine ait bağımsız bir çağrı yığınına (stack) ve program sayacına (PC) sahiptirler.",
      "Process'ler arası geçiş (context switch), thread'ler arası geçişe göre daha hızlı ve düşük maliyetlidir.",
      "Bir thread çöktüğünde diğer thread'ler ve ana process hiçbir şekilde etkilenmez.",
      "Thread'ler işletim sisteminden tamamen ayrı sanal adres uzaylarına (Address Space) sahiptir.",
      "Modern işletim sistemlerinde tek bir process içinde birden fazla thread çalıştırılamaz."
    ],
    "answerIndex": 0,
    "explanation": "Aynı sürecin thread'leri kod, veri ve heap alanlarını ortak paylaşır. Ancak her thread bağımsız çalıştırılabilir olduğundan kendi yazmaçlarına (registers), program sayacına (PC) ve yığınına (stack) sahiptir. Process context switch ise adres uzayı değiştiğinden çok daha maliyetlidir.",
    "tags": ["işletim-sistemleri", "process", "thread", "concurrency"],
    "source": "original"
  },
  {
    "id": "alan-029",
    "section": "alan",
    "topic": "İşletim Sistemleri",
    "subtopic": "Sanal Bellek ve Sayfalama",
    "difficulty": 2,
    "stem": "İşletim sistemlerinde sanal bellek yönetimi sırasında bir sürecin erişmek istediği sanal sayfanın fiziksel RAM'de bulunmaması durumuna ne ad verilir ve bu durumda işletim sistemi ne yapar?",
    "options": [
      "Page Fault - Sayfa ikincil depolamadan (disk/swap) fiziksel belleğe yüklenir.",
      "Segmentation Fault - Süreç derhal sonlandırılır.",
      "Deadlock - Süreç askıya alınır ve zamanlayıcı yeniden başlatılır.",
      "Race Condition - Bellek blokları kilitlenir.",
      "Cache Miss - L1 önbelleği temizlenir."
    ],
    "answerIndex": 0,
    "explanation": "Erişilmek istenen sayfanın geçerlilik biti (valid bit) 0 ise donanım bir 'Page Fault' (Sayfa Hatası) kesmesi üretir. İşletim sistemi devreye girerek ilgili sayfayı diskten RAM'e getirir, sayfa tablosunu günceller ve komutu tekrarlar.",
    "tags": ["işletim-sistemleri", "sanal-bellek", "page-fault", "paging"],
    "source": "original"
  },
  {
    "id": "alan-030",
    "section": "alan",
    "topic": "İşletim Sistemleri",
    "subtopic": "CPU Zamanlama (Scheduling)",
    "difficulty": 2,
    "stem": "Her sürece eşit miktarda sabit bir zaman dilimi (Time Quantum) tahsis eden ve bu süre dolduğunda süreci kesip hazır kuyruğunun sonuna atan, adil ve preemptive (kesintili) CPU zamanlama algoritması hangisidir?",
    "options": [
      "First-Come, First-Served (FCFS)",
      "Shortest Job First (SJF)",
      "Round Robin (RR)",
      "Priority Scheduling (Non-preemptive)",
      "Multilevel Feedback Queue"
    ],
    "answerIndex": 2,
    "explanation": "Round Robin (RR), zaman paylaşımlı sistemlerde her göreve eşit 'Time Slice / Quantum' tanıyan ve süre dolunca CPU'yu bir sonraki göreve devreden adil, preemptive bir algoritmadır.",
    "tags": ["işletim-sistemleri", "cpu-scheduling", "round-robin"],
    "source": "original"
  },
  {
    "id": "alan-031",
    "section": "alan",
    "topic": "Bilgisayar Ağları",
    "subtopic": "Taşıma Katmanı (TCP vs UDP)",
    "difficulty": 1,
    "stem": "Aşağıdaki senaryoların hangisinde TCP yerine UDP protokolünün tercih edilmesi daha uygundur?",
    "options": [
      "Banka EFT ve para transferi mesajlarının iletimi",
      "Web sitelerinin HTTPS üzerinden güvenli yüklenmesi",
      "Dosya transferi (FTP) ile büyük arşiv dosyalarının indirilmesi",
      "Gerçek zamanlı çevrimiçi video konferans ve canlı ses yayını",
      "Veritabanı sunucusuna gönderilen SQL sorguları"
    ],
    "answerIndex": 3,
    "explanation": "UDP bağlantısız (connectionless) ve kayıpları yeniden iletmeyen bir protokoldür; gecikmesi çok düşüktür. Canlı video/ses yayınında paket kaybı tolere edilebilir ancak gecikme tolere edilemez. Finansal işlemlerde ise TCP'nin güvenilir ve sıralı teslimatı zorunludur.",
    "tags": ["bilgisayar-ağları", "tcp", "udp", "transport-layer"],
    "source": "original"
  },
  {
    "id": "alan-032",
    "section": "alan",
    "topic": "Bilgisayar Ağları",
    "subtopic": "DNS ve IP Mimarisi",
    "difficulty": 2,
    "stem": "Bir istemci tarayıcısına `www.ziraatbank.com.tr` yazdığında, bu alan adını hedef sunucunun IP adresine çeviren internet altyapı servisi ve varsayılan protokol portu hangisidir?",
    "options": [
      "DNS (Domain Name System) - Port 53",
      "DHCP (Dynamic Host Configuration) - Port 67",
      "HTTP - Port 80",
      "SNMP - Port 161",
      "SMTP - Port 25"
    ],
    "answerIndex": 0,
    "explanation": "DNS (Alan Adı Sistemi), insan tarafından okunabilir alan adlarını sayısal IP adreslerine dönüştürür. Standart sorguları çoğunlukla UDP port 53 üzerinden çalışır.",
    "tags": ["bilgisayar-ağları", "dns", "port-53"],
    "source": "original"
  },
  {
    "id": "alan-033",
    "section": "alan",
    "topic": "Bilgisayar Ağları",
    "subtopic": "Ağ Güvenliği ve Protokoller",
    "difficulty": 1,
    "stem": "Aşağıdaki internet protokolleri ve varsayılan standart port eşleştirmelerinden hangisi **hatalıdır**?",
    "options": [
      "SSH (Secure Shell) - Port 22",
      "HTTPS (HTTP Secure) - Port 443",
      "HTTP - Port 80",
      "RDP (Remote Desktop) - Port 3389",
      "FTPS / SFTP - Port 8080"
    ],
    "answerIndex": 4,
    "explanation": "SFTP güvenli kabuk üzerinden çalıştığı için SSH portu olan 22'yi kullanır; FTPS ise genellikle 990 portunu kullanır. Port 8080 ise alternatif HTTP web ve proxy sunucuları için yaygın kullanılır.",
    "tags": ["bilgisayar-ağları", "portlar", "protokoller"],
    "source": "original"
  },
  {
    "id": "alan-034",
    "section": "alan",
    "topic": "Yazılım Mühendisliği",
    "subtopic": "Agile ve Scrum Metodolojisi",
    "difficulty": 2,
    "stem": "Scrum çerçevesinde (Scrum Framework) ürün gereksinimlerinin önceliklendirilmesinden (Product Backlog), ürün vizyonunun korunmasından ve iş değerinin maksimize edilmesinden sorumlu olan temel rol hangisidir?",
    "options": [
      "Scrum Master",
      "Product Owner (Ürün Sahibi)",
      "Geliştirme Takımı (Developers)",
      "Yazılım Mimarı (Software Architect)",
      "Proje Sponsoru"
    ],
    "answerIndex": 1,
    "explanation": "Product Owner (Ürün Sahibi), Product Backlog'u yöneten, iş gereksinimlerini önceliklendiren ve takımın en yüksek iş değerini üreten işlere odaklanmasını sağlayan kişidir. Scrum Master ise sürecin kurallara uygun yürümesini ve engellerin kaldırılmasını sağlar.",
    "tags": ["yazılım-mühendisliği", "agile", "scrum", "product-owner"],
    "source": "original"
  },
  {
    "id": "alan-035",
    "section": "alan",
    "topic": "Yazılım Mühendisliği",
    "subtopic": "Yazılım Test Türleri",
    "difficulty": 2,
    "stem": "Bir yazılım sistemine yeni bir özellik eklendikten veya hata düzeltmesi yapıldıktan sonra, mevcut çalışan fonksiyonların bozulup bozulmadığını doğrulamak amacıyla yapılan test türü hangisidir?",
    "options": [
      "Birim Testi (Unit Testing)",
      "Regresyon Testi (Regression Testing)",
      "Stres Testi (Stress Testing)",
      "Kullanıcı Kabul Testi (UAT)",
      "Yük Testi (Load Testing)"
    ],
    "answerIndex": 1,
    "explanation": "Regresyon Testi, kodda yapılan değişikliklerin (yeni modül, bug fix, refactoring) var olan özellikleri ve akışları olumsuz etkilemediğini garanti altına almak için çalıştırılan test setidir.",
    "tags": ["yazılım-mühendisliği", "test", "regresyon-testi"],
    "source": "original"
  },
  {
    "id": "alan-036",
    "section": "alan",
    "topic": "Bilgi Güvenliği",
    "subtopic": "Kimlik Doğrulama vs Yetkilendirme",
    "difficulty": 1,
    "stem": "Bilgi güvenliğinde 'Kimlik Doğrulama' (Authentication) ile 'Yetkilendirme' (Authorization) arasındaki farkı en iyi özetleyen ifade hangisidir?",
    "options": [
      "Kimlik Doğrulama 'Kullanıcı kimdir?' sorusuna cevap verirken; Yetkilendirme 'Bu kullanıcının hangi kaynaklara erişim izni vardır?' sorusuna cevap verir.",
      "Kimlik doğrulama sadece şifreleme algoritmalarıyla yapılırken, yetkilendirme firewall tarafından yapılır.",
      "Kimlik doğrulama HTTP 403 Forbidden üretirken, yetkilendirme HTTP 401 Unauthorized üretir.",
      "Yetkilendirme kullanıcı sisteme girmeden önce, kimlik doğrulama ise girdikten sonra yapılır.",
      "İki kavram tamamen aynı güvenlik mekanizmasını temsil eder."
    ],
    "answerIndex": 0,
    "explanation": "Authentication (Kimlik Doğrulama - 401), kullanıcının iddia ettiği kişi olup olmadığını doğrular (parola, OTP, biyometri). Authorization (Yetkilendirme - 403) ise kimliği doğrulanmış kullanıcının belirli bir işlemi yapmaya yetkili olup olmadığını denetler.",
    "tags": ["bilgi-güvenliği", "authentication", "authorization"],
    "source": "original"
  },
  {
    "id": "alan-037",
    "section": "alan",
    "topic": "Bilgi Güvenliği",
    "subtopic": "Hashing ve Parola Güvenliği",
    "difficulty": 2,
    "stem": "Kullanıcı parolalarının veritabanında saklanmasıyla ilgili aşağıdaki güvenlik yaklaşımlarından hangisi modern en iyi uygulama (Best Practice) olarak kabul edilir?",
    "options": [
      "Parolaları AES-256 simetrik anahtar ile şifreleyip anahtarı kaynak kodda saklamak",
      "Parolaları düz metin (Plaintext) olarak saklayıp sadece tablo erişimini kısıtlamak",
      "Parolaları her kullanıcıya özel rastgele üretilen bir tuzlama (Salt) değeri ile birlikte bcrypt veya Argon2 gibi tek yönlü yavaş hash fonksiyonlarından geçirerek saklamak",
      "Hızlı arama yapabilmek için doğrudan MD5 veya SHA-1 hash değerini kaydetmek",
      "Kullanıcı parolalarını tersine çevirerek Base64 formatında kodlamak"
    ],
    "answerIndex": 2,
    "explanation": "Parolalar asla simetrik şifrelemeyle veya düz metinle saklanmaz. MD5/SHA-1 ise çok hızlı olduğundan brute-force ve rainbow table saldırılarına açıktır. Tuzlama (Salt) ve maliyet faktörü ayarlanabilir modern hash algoritmaları (bcrypt, Argon2) endüstri standardıdır.",
    "tags": ["bilgi-güvenliği", "hashing", "salt", "bcrypt", "parola"],
    "source": "original"
  },
  {
    "id": "alan-038",
    "section": "alan",
    "topic": "Bilgi Güvenliği",
    "subtopic": "Web Güvenliği (CSRF)",
    "difficulty": 2,
    "stem": "Kullanıcının daha önce oturum açtığı güvenilir bir web sitesindeki oturum çerezlerini (Cookie) kullanarak, kullanıcının bilgisi ve rızası olmadan kötü niyetli bir siteden istek yaptırılması saldırısına ne ad verilir?",
    "options": [
      "SQL Injection (SQLi)",
      "Cross-Site Request Forgery (CSRF / XSRF)",
      "Cross-Site Scripting (XSS)",
      "Denial of Service (DoS)",
      "Man-in-the-Middle (MitM)"
    ],
    "answerIndex": 1,
    "explanation": "CSRF (Siteler Arası İstek Sahteciliği), kurbanın oturum kimliğini kötüye kullanarak onun adına sahte istekler (örneğin para transferi isteği) tetikler. Bu saldırıyı önlemek için benzersiz Anti-CSRF token'ları ve `SameSite` cookie özellikleri kullanılır.",
    "tags": ["bilgi-güvenliği", "csrf", "web-güvenliği"],
    "source": "original"
  },
  {
    "id": "alan-039",
    "section": "alan",
    "topic": "Yapay Zekâ ve Makine Öğrenmesi",
    "subtopic": "Hata Matrisi (Confusion Matrix) ve Fraud Tespiti",
    "difficulty": 2,
    "stem": "Bir bankacılık dolandırıcılık (Fraud) tespit sisteminde, dolandırıcılık içeren şüpheli işlemlerin gözden kaçırılmaması (yani False Negative oranının mümkün olduğunca sıfıra yaklaştırılması) hedeflenmektedir. Bu durumda hangi performans metriğinin maksimize edilmesi önceliklidir?",
    "options": [
      "Accuracy (Doğruluk Oranı)",
      "Recall (Duyarlılık / Yakalama Oranı)",
      "Specificity (Özgüllük)",
      "Loss (Kayıp Değeri)",
      "Eğitim Süresi"
    ],
    "answerIndex": 1,
    "explanation": "Recall (Duyarlılık) = TP / (TP + FN). Paydada False Negative yer alır. Bir dolandırıcılık yakalama sisteminde asıl felaket gerçek bir dolandırıcılığı kaçırmaktır (False Negative). Bu nedenle Recall metriğini maksimize etmek kritik önceliktir.",
    "tags": ["yapay-zekâ", "makine-öğrenmesi", "recall", "fraud", "confusion-matrix"],
    "source": "original"
  },
  {
    "id": "alan-040",
    "section": "alan",
    "topic": "Yapay Zekâ ve Makine Öğrenmesi",
    "subtopic": "Öğrenme Türleri ve K-Means",
    "difficulty": 2,
    "stem": "Etiketlenmemiş müşteri harcama verilerini kullanarak benzer davranış sergileyen müşteri kitlelerini gruplamak (Müşteri Segmentasyonu) amacıyla kullanılan K-Means algoritması hangi öğrenme kategorisine girer?",
    "options": [
      "Gözetimli Öğrenme (Supervised Learning)",
      "Gözetimsiz Öğrenme (Unsupervised Learning)",
      "Pekiştirmeli Öğrenme (Reinforcement Learning)",
      "Yarı-Gözetimli Öğrenme (Semi-supervised Learning)",
      "Derin Pekiştirmeli Öğrenme (Deep RL)"
    ],
    "answerIndex": 1,
    "explanation": "K-Means kümeleme (Clustering) algoritması, hedef çıktının (etiketin) bulunmadığı veriler üzerinde gizli desen ve benzerlikleri keşfettiği için Gözetimsiz Öğrenme (Unsupervised Learning) sınıfına aittir.",
    "tags": ["yapay-zekâ", "makine-öğrenmesi", "unsupervised-learning", "k-means"],
    "source": "original"
  }
];

const allComputerScience = [...existingQuestions, ...newQuestions];

if (allComputerScience.length !== 40) {
  console.error(`Error: Expected 40 questions, got ${allComputerScience.length}`);
  process.exit(1);
}

const outputPath = path.join(__dirname, '..', 'data', 'questions', 'alan_bilgisayar.json');
fs.writeFileSync(outputPath, JSON.stringify(allComputerScience, null, 2), 'utf8');
console.log(`alan_bilgisayar.json successfully updated with exactly ${allComputerScience.length} questions.`);
