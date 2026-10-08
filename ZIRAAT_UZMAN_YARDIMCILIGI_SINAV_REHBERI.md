# Ziraat Bankası Uzman Yardımcılığı Sınavı Hazırlık Rehberi (Bilgisayar Mühendisliği)

**Hedef Sınav Tarihi:** 24 Ekim  
**Hedef Kadro:** Uzman Yardımcısı (Bilgi Teknolojileri / Mühendislik Grubu)  
**Sınavı Düzenleyen Kurum:** Ziraat Bankası (İstanbul Üniversitesi / Sınav Merkezi İş Birliğiyle)

---

## 1. Sınavın Genel Formatı ve Kritik Kurallar

* **Toplam Soru Sayısı:** 140 Soru
* **Toplam Sınav Süresi:** 160 Dakika
* **Soru Başına Ortalama Süre:** ~1.14 Dakika (Hızlı karar alma ve zaman yönetimi çok önemlidir)
* **Puanlama Kuralı (Kritik Avantaj):** **Yanlış cevaplar doğru cevapları GÖTÜRMEZ.**  
  *(Asla boş soru bırakılmamalıdır! Emin olunmayan sorularda en mantıklı seçenek işaretlenmelidir.)*
* **Baraj Kuralı:** Sınavda genellikle her bir bölüm grubu için ayrı baraj şartı (%50 veya %60 başarı) bulunmaktadır. Bu nedenle yalnızca alan bilgisine değil, İngilizce ve GY-GK bölümlerine de dengeli hazırlanmak şarttır.

---

## 2. Soru Dağılımı ve Test Grupları

| Bölüm No | Test Adı | Soru Sayısı | Tahmini İdeal Süre |
| :--- | :--- | :--- | :--- |
| **1. Bölüm** | **Genel Yetenek & Genel Kültür** | **60 Soru** | **60 - 65 dk** |
| | - Genel Yetenek (Matematik, Sayısal Mantık, Türkçe, Sözel Mantık) | ~40 Soru | |
| | - Genel Kültür (Tarih, Coğrafya, Vatandaşlık, Güncel Bilgiler) | ~20 Soru | |
| **2. Bölüm** | **Yabancı Dil (İngilizce)** | **40 Soru** | **40 - 45 dk** |
| **3. Bölüm** | **Alan Bilgisi (Bilgisayar Mühendisliği / Bilişim)** | **40 Soru** | **45 - 50 dk** |
| **TOPLAM** | | **140 Soru** | **160 Dakika** |

---

## 3. Bilgisayar Mühendisliği Alan Bilgisi Konuları

Banka BT alımlarında teknik sorular genellikle üniversite müfredatının temel yapı taşlarından ve sektörel pratiklerden gelir:

### 1. Algoritmalar ve Veri Yapıları
* Zaman ve Alan Karmaşıklığı: Asymptotic Notations, Big-O ($O(1), O(n), O(n \log n), O(n^2)$)
* Veri Yapıları: Diziler (Arrays), Bağlı Listeler (Linked Lists), Yığın (Stack), Kuyruk (Queue)
* Ağaç Yapıları: İkili Arama Ağaçları (BST), AVL, Heap, Trie
* Graf Algoritmaları: BFS, DFS, Dijkstra en kısa yol
* Sıralama & Arama: QuickSort, MergeSort, Binary Search

### 2. Veritabanı Yönetim Sistemleri (RDBMS & NoSQL)
* İlişkisel Veritabanı Kavramları: Primary Key, Foreign Key, Unique, Check
* SQL Sorguları: `SELECT`, `JOIN` (INNER, LEFT, RIGHT, FULL), `GROUP BY`, `HAVING`, Alt sorgular (Subqueries)
* Normalizasyon: 1NF, 2NF, 3NF, BCNF kuralları ve anormalliklerin giderilmesi
* Transaction & ACID Prensipleri: Atomicity, Consistency, Isolation, Durability
* İndeksleme ve Performans (B-Tree indeksler)

### 3. Nesne Yönelimli Programlama (OOP) ve Yazılım Mimarisi
* 4 Temel OOP İlkesi: Kapsülleme (Encapsulation), Kalıtım (Inheritance), Çok Biçimlilik (Polymorphism), Soyutlama (Abstraction)
* SOLID Prensipleri (Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion)
* Temel Tasarım Desenleri (Design Patterns): Singleton, Factory, Observer, Builder, Adapter
* Yazılım Yaşam Döngüsü (SDLC) ve Çevik Yöntemler: Agile, Scrum, Kanban
* Versiyon Kontrol Sistemleri: Git (commit, merge, rebase, branch stratejileri)

### 4. Bilgisayar Ağları ve İletişim Protokolleri
* OSI 7 Katmanı ve TCP/IP Modeli (Her katmanın görevi ve çalışan protokoller)
* Taşıma Katmanı: TCP vs UDP farkları, el sıkışma (3-way handshake)
* Uygulama Katmanı Protokolleri: HTTP/HTTPS, DNS, DHCP, FTP, SMTP, SSH
* IP Adresleme & Alt Ağlar (Subnetting, IPv4 / IPv6, CIDR notasyonu)
* Temel Ağ Güvenliği: Firewall, VPN, SSL/TLS, Simetrik vs Asimetrik Şifreleme (AES, RSA)

### 5. İşletim Sistemleri ve Sistem Mimarisi
* Süreç ve İş Parçacığı (Process vs Thread, Context Switching)
* Eşzamanlılık (Concurrency), Yarış Durumu (Race Condition), Kilitlenme (Deadlock) ve 4 şartı (Coffman koşulları)
* CPU Zamanlama Algoritmaları: FCFS, SJF, Round Robin, Priority
* Bellek Yönetimi: Sanal Bellek (Virtual Memory), Sayfalama (Paging), Segmentasyon, Page Fault

### 6. Güncel Finansal Teknolojiler (Fintek) ve Güvenlik Kavramları
* Web Mimarileri: RESTful API, JSON, SOAP farkları
* Mikroservis Mimarisi vs Monolitik Mimari
* Kimlik Doğrulama & Yetkilendirme: OAuth 2.0, JWT (JSON Web Token)
* Temel Web Güvenlik Açıkları: SQL Injection, XSS, CSRF
* Temel Yapay Zeka & Makine Öğrenmesi Terimleri (Supervised vs Unsupervised learning)

---

## 4. Genel Yetenek - Genel Kültür Konuları

* **Matematik & Sayısal Mantık:** Oran-orantı, problemler (sayı, kesir, yüzde, yaş, işçi-havuz, hareket), grafik ve tablo okuma, permütasyon-kombinasyon-olasılık, sayı dizileri ve şekil ilişkileri.
* **Türkçe:** Paragrafta ana fikir, yardımcı fikirler, anlatım teknikleri, mantıksal sıralama, sözel mantık bulmacaları.
* **Genel Kültür:** 
  * Atatürk İlkeleri ve İnkılap Tarihi (Milli Mücadele, Antlaşmalar, Kongreler)
  * Türkiye Coğrafyası (Bölgeler, tarım, madenler, ticaret, nüfus yapısı)
  * Temel Vatandaşlık (Anayasa hukuku, devlet organları, temel haklar)
  * Güncel Olaylar (Son ekonomik gelişmeler, uluslararası kuruluşlar, Ziraat Bankası'nın kuruluş tarihi ve temel misyonu - 1863 Mithat Paşa / Memleket Sandıkları).

---

## 5. İngilizce Testi İçin Bilinmesi Gerekenler

* **Gramer & Yapılar:** Tenses, Conditionals (If Clauses), Passive Voice, Relative Clauses, Modals, Conjunctions (Bağlaçlar).
* **Kelime Bilgisi:** İş dünyası, finans, bankacılık ve teknoloji ağırlıklı terimler (`inflation`, `assets`, `liabilities`, `transaction`, `breach`, `fluctuation`, `yield` vb.).
* **Okuma Parçaları:** Orta-ileri seviye (B1-B2) 4-5 kısa paragraf ve bunlara bağlı çıkarım soruları.

---

## 6. Sınava Kalan Süre İçin 16 Günlük Hızlı Kamp Planı

### 📅 1. Hafta (1 - 7. Gün): Alan Bilgisi & Temel Kavramlar
* **Gün 1-2:** Veri Yapıları (Ağaçlar, Hash Table, Stack, Queue) & Algoritmalar (Sıralama, Big-O).
* **Gün 3-4:** SQL & Veritabanı (Karmaşık JOIN sorguları, Normalizasyon, ACID).
* **Gün 5:** OOP Prensipleri, SOLID, Design Patterns & Git.
* **Gün 6:** Bilgisayar Ağları (OSI, TCP/IP, Protokoller) & Güvenlik (SQLi, XSS, Şifreleme).
* **Gün 7:** İşletim Sistemleri (Process, Thread, Deadlock, Sayfalama) & Haftalık Alan Bilgisi Mini Testi.
* *(Her gün 30 dk İngilizce kelime/bağlaç tekrarı)*

### 📅 2. Hafta (8 - 13. Gün): GY-GK & Soru Pratiği
* **Gün 8-9:** Sayısal Mantık & Problem Çözme Hızlandırma.
* **Gün 10:** Sözel Mantık Çözüm Taktikleri & Hızlı Paragraf Okuma.
* **Gün 11:** İnkılap Tarihi & Coğrafya Hızlı Tekrarı + Vatandaşlık Önemli Maddeleri.
* **Gün 12:** İngilizce Paragraf Çözümleri & Cümle Tamamlama Egzersizleri.
* **Gün 13:** Karma Alan Bilgisi + Fintek / Güncel Teknoloji Kavramları.

### 📅 Son 3 Gün (14 - 16. Gün): Simülasyon ve Son Rötuşlar
* **Gün 14:** **Tam Zamanlı Deneme Sınavı (140 Soru - 160 Dakika)**, eksik analizi.
* **Gün 15:** Yanlış yapılan soruların tekrarı, formül ve kavram notları okuma.
* **Gün 16:** Hafif zihinsel tekrar, sınav evraklarının hazırlanması ve dinlenme.

---

## 7. Sınav Anı Taktikleri

1. **Boş Bırakmama Kuralı:** Yanlış doğruyu götürmediği için sürenin son 3-5 dakikasında boş kalan soru kesinlikle olmamalıdır.
2. **Turlama Yöntemi:** İlk turda 30-40 saniye içinde çözebildiğiniz net soruları işaretleyin; uzun işlem veya kafa karıştıran soruların yanına işaret koyup ikinci turda dönün.
3. **Zaman Disiplini:** Bir soruda 2 dakikadan fazla takılmayın. 140 soru olduğu için soru kaçırmamak anahtardır.
