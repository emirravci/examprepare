// ==============================================================================
// VERİ VE DEPOLAMA YÖNETİCİSİ (SUPABASE + LOCAL STORAGE CACHE / OFFLINE)
// ==============================================================================

import { supabase, isSupabaseConfigured } from './supabase.js';

class DataManager {
    constructor() {
        this.questions = [];
        this.flashcards = [];
        this.lectures = [];
        this.resources = [];
        this.youtubeChannels = [];
        this.isLoaded = false;
    }

    // 1. SORULARI, KARTLARI VE KONU ANLATIMLARINI YÜKLE
    async init() {
        if (this.isLoaded) return;

        try {
            // Local JSON dosyalarından verileri yükle
            const [alanRes, bgkRes, ornRes, engRes, masterRes, fcRes, lecRes, extRes, ytRes] = await Promise.all([
                fetch('./data/questions/alan_bilgisayar.json').then(r => r.json()).catch(() => []),
                fetch('./data/questions/bankacilik_genel_kultur.json').then(r => r.json()).catch(() => []),
                fetch('./data/questions/oruntu_analitik.json').then(r => r.json()).catch(() => []),
                fetch('./data/questions/ingilizce.json').then(r => r.json()).catch(() => []),
                fetch('./data/questions/ziraat_140_tam_deneme.json').then(r => r.json()).catch(() => []),
                fetch('./data/flashcards.json').then(r => r.json()).catch(() => []),
                fetch('./data/lectures.json').then(r => r.json()).catch(() => []),
                fetch('./data/external_resources.json').then(r => r.json()).catch(() => []),
                fetch('./data/youtube_channels.json').then(r => r.json()).catch(() => [])
            ]);

            this.masterExamQuestions = masterRes.length === 140 ? masterRes : [];
            this.questions = masterRes.length > 0 ? masterRes : [...bgkRes, ...ornRes, ...engRes, ...alanRes];
            this.flashcards = fcRes;
            this.lectures = lecRes;
            this.resources = extRes;
            this.youtubeChannels = ytRes || [];

            // Supabase bağlıysa soruları ve kartları eşitlemeyi deneyebiliriz (sessiz arka plan)
            if (isSupabaseConfigured() && supabase) {
                this.syncQuestionsToSupabase();
            }

            this.isLoaded = true;
            console.log(`[DataManager] ${this.questions.length} soru, ${this.flashcards.length} kart, ${this.lectures.length} konu anlatımı, ${this.resources.length} harici kaynak, ${this.youtubeChannels.length} YouTube kanalı yüklendi.`);
        } catch (err) {
            console.error("[DataManager] Soru yükleme hatası:", err);
        }
    }

    async syncQuestionsToSupabase() {
        try {
            // Soruları Supabase'e toplu upsert et
            if (this.questions.length > 0) {
                const mappedQuestions = this.questions.map(q => ({
                    id: q.id,
                    section: q.section,
                    topic: q.topic,
                    subtopic: q.subtopic || null,
                    difficulty: typeof q.difficulty === 'number' ? q.difficulty : 2,
                    stem: q.stem || q.questionText || '',
                    options: q.options,
                    answer_index: q.answerIndex !== undefined ? q.answerIndex : q.correctAnswer,
                    explanation: q.explanation || '',
                    tags: q.tags || [],
                    source: q.source || 'Ziraat Master Hazırlık Seti'
                }));

                await supabase.from('questions').upsert(mappedQuestions, { onConflict: 'id', ignoreDuplicates: true });
            }

            // Konu anlatımlarını Supabase'e toplu upsert et
            if (this.lectures.length > 0) {
                const mappedLectures = this.lectures.map(l => ({
                    id: l.id,
                    section: l.section,
                    topic: l.topic,
                    title: l.title,
                    read_time: l.readTime || '7 dk',
                    summary: l.summary || '',
                    content: l.content
                }));
                await supabase.from('lectures').upsert(mappedLectures, { onConflict: 'id', ignoreDuplicates: true });
            }
        } catch (e) {
            console.warn("Supabase arka plan eşitleme bildirimi:", e);
        }
    }

    getAllQuestions() {
        return this.questions;
    }

    getQuestionById(id) {
        return this.questions.find(q => q.id === id);
    }

    // 2. FİLTRELİ SORU LİSTESİ ALMA (ALIŞTIRMA İÇİN)
    getFilteredQuestions({ section = 'all', topic = 'all', difficulty = 'all', filterType = 'all' } = {}) {
        let list = [...this.questions];

        if (section && section !== 'all') {
            if (section === 'bankacilik-genel-kultur' || section === 'genel-kultur') {
                list = list.filter(q => q.section === 'bankacilik-genel-kultur' || q.section === 'genel-kultur');
            } else if (section === 'oruntu-analitik' || section === 'genel-yetenek') {
                list = list.filter(q => q.section === 'oruntu-analitik' || q.section === 'genel-yetenek');
            } else {
                list = list.filter(q => q.section === section);
            }
        }

        if (topic && topic !== 'all') {
            list = list.filter(q => q.topic === topic);
        }

        if (difficulty && difficulty !== 'all') {
            list = list.filter(q => q.difficulty === parseInt(difficulty));
        }

        const reviewList = this.getReviewQuestions();
        const solvedIds = this.getSolvedQuestionIds();

        if (filterType === 'only-wrong') {
            const wrongIds = new Set(reviewList.map(r => r.questionId));
            list = list.filter(q => wrongIds.has(q.id));
        } else if (filterType === 'only-unsolved') {
            list = list.filter(q => !solvedIds.has(q.id));
        }

        return list;
    }

    // 3. TAM DENEME SINAVI OLUŞTURMA (140 Soru: 20 Bankacılık/GK + 40 Örüntü/GY + 40 İngilizce + 40 Alan)
    generateMockExam() {
        const bgk = this.questions.filter(q => q.section === 'bankacilik-genel-kultur' || q.section === 'genel-kultur');
        const orn = this.questions.filter(q => q.section === 'oruntu-analitik' || q.section === 'genel-yetenek');
        const eng = this.questions.filter(q => q.section === 'ingilizce');
        const alan = this.questions.filter(q => q.section === 'alan');

        const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);
        const pickCount = (arr, count) => shuffle(arr).slice(0, count);

        const examGK = pickCount(bgk, 20);
        const examGY = pickCount(orn, 40);
        const examEng = pickCount(eng, 40);
        const examAlan = pickCount(alan, 40);

        const totalExamQuestions = [...examGK, ...examGY, ...examEng, ...examAlan];

        return {
            questions: totalExamQuestions,
            counts: {
                gk: examGK.length,
                gy: examGY.length,
                eng: examEng.length,
                alan: examAlan.length,
                total: totalExamQuestions.length
            },
            idealCounts: { gk: 20, gy: 40, eng: 40, alan: 40, total: 140 }
        };
    }

    // 4. ATTEMPT (DENEME / ALIŞTIRMA) KAYDETME
    async saveAttempt(attempt) {
        // LocalStorage'a kaydet
        const localAttempts = this.getLocalAttempts();
        localAttempts.unshift(attempt);
        localStorage.setItem('ziraat_attempts', JSON.stringify(localAttempts));

        // Supabase bağlıysa buluta kaydet
        if (isSupabaseConfigured() && supabase) {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    const row = {
                        user_id: session.user.id,
                        mode: attempt.mode,
                        started_at: new Date(attempt.startedAt).toISOString(),
                        finished_at: new Date(attempt.finishedAt || Date.now()).toISOString(),
                        duration_seconds: attempt.durationSeconds || 0,
                        total_questions: attempt.totalQuestions || 0,
                        total_correct: attempt.totalCorrect || 0,
                        total_wrong: attempt.totalWrong || 0,
                        total_empty: attempt.totalEmpty || 0,
                        total_score: attempt.totalScore || 0,
                        gy_gk_correct: attempt.gyGkCorrect || 0,
                        gy_gk_wrong: attempt.gyGkWrong || 0,
                        gy_gk_empty: attempt.gyGkEmpty || 0,
                        gy_gk_passed: attempt.gyGkPassed || false,
                        english_correct: attempt.englishCorrect || 0,
                        english_wrong: attempt.englishWrong || 0,
                        english_empty: attempt.englishEmpty || 0,
                        english_passed: attempt.englishPassed || false,
                        alan_correct: attempt.alanCorrect || 0,
                        alan_wrong: attempt.alanWrong || 0,
                        alan_empty: attempt.alanEmpty || 0,
                        alan_passed: attempt.alanPassed || false,
                        is_all_passed: attempt.isAllPassed || false,
                        answers_data: attempt.answers || []
                    };
                    await supabase.from('attempts').insert(row);
                }
            } catch (err) {
                console.warn("[DataManager] Supabase attempt kaydetme hatası (Localde saklandı):", err);
            }
        }

        // Yanlışları otomatik yanlış defterine aktar
        if (attempt.answers) {
            attempt.answers.forEach(ans => {
                if (!ans.isCorrect && ans.chosen !== null) {
                    this.recordWrongQuestion(ans.questionId);
                }
            });
        }

        return attempt;
    }

    getLocalAttempts() {
        try {
            return JSON.parse(localStorage.getItem('ziraat_attempts') || '[]');
        } catch {
            return [];
        }
    }

    getSolvedQuestionIds() {
        const attempts = this.getLocalAttempts();
        const set = new Set();
        attempts.forEach(att => {
            (att.answers || []).forEach(ans => {
                if (ans.chosen !== null) set.add(ans.questionId);
            });
        });
        return set;
    }

    // 5. YANLIŞ DEFTERİ VE ARALIKLI TEKRAR (LEITNER 1..5 KUTULARI)
    getReviewQuestions() {
        try {
            return JSON.parse(localStorage.getItem('ziraat_reviews') || '[]');
        } catch {
            return [];
        }
    }

    recordWrongQuestion(questionId) {
        const reviews = this.getReviewQuestions();
        const existing = reviews.find(r => r.questionId === questionId);

        if (existing) {
            existing.wrongCount = (existing.wrongCount || 1) + 1;
            existing.box = 1; // Hata yapıldığında 1. kutuya geri düşer (Leitner)
            existing.dueAt = Date.now();
        } else {
            reviews.push({
                questionId,
                box: 1,
                wrongCount: 1,
                correctCount: 0,
                dueAt: Date.now()
            });
        }

        localStorage.setItem('ziraat_reviews', JSON.stringify(reviews));

        // Supabase senkronizasyonu
        if (isSupabaseConfigured() && supabase) {
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (session?.user) {
                    supabase.from('user_reviews').upsert({
                        user_id: session.user.id,
                        question_id: questionId,
                        box: 1,
                        wrong_count: existing ? existing.wrongCount : 1,
                        due_at: new Date().toISOString()
                    }, { onConflict: 'user_id,question_id' }).catch(() => {});
                }
            });
        }
    }

    updateReviewBox(questionId, isCorrect) {
        const reviews = this.getReviewQuestions();
        const item = reviews.find(r => r.questionId === questionId);
        if (!item) return;

        if (isCorrect) {
            item.box = Math.min((item.box || 1) + 1, 5);
            item.correctCount = (item.correctCount || 0) + 1;
            // Kutuya göre bir sonraki tekrar tarihi: Box 1: 1 gün, Box 2: 3 gün, Box 3: 7 gün vb.
            const daysMap = { 1: 1, 2: 2, 3: 4, 4: 7, 5: 14 };
            const daysToAdd = daysMap[item.box] || 1;
            item.dueAt = Date.now() + (daysToAdd * 24 * 60 * 60 * 1000);
        } else {
            item.box = 1;
            item.wrongCount = (item.wrongCount || 1) + 1;
            item.dueAt = Date.now();
        }

        localStorage.setItem('ziraat_reviews', JSON.stringify(reviews));
    }

    // 6. FLASHCARDS (KAVRAM KARTLARI)
    getFlashcards(category = 'all') {
        if (!category || category === 'all') return this.flashcards;
        return this.flashcards.filter(f => f.category === category);
    }

    getFlashcardProgress() {
        try {
            return JSON.parse(localStorage.getItem('ziraat_fc_progress') || '{}');
        } catch {
            return {};
        }
    }

    saveFlashcardProgress(cardId, status) {
        const progress = this.getFlashcardProgress();
        progress[cardId] = {
            status, // 'known' | 'learning' | 'again'
            reviewedAt: Date.now()
        };
        localStorage.setItem('ziraat_fc_progress', JSON.stringify(progress));
    }

    // 7. BARAJ VE BAŞARI HESAPLAYICI (RESMİ 36 / 24 / 20 BARAJLARINA GÖRE)
    evaluateExamResult(answers) {
        let gkCorrect = 0, gkWrong = 0, gkEmpty = 0;
        let gyCorrect = 0, gyWrong = 0, gyEmpty = 0;
        let engCorrect = 0, engWrong = 0, engEmpty = 0;
        let alanCorrect = 0, alanWrong = 0, alanEmpty = 0;

        answers.forEach(a => {
            const q = this.getQuestionById(a.questionId);
            if (!q) return;

            const isCorrect = a.chosen !== null && a.chosen === q.answerIndex;
            const isEmpty = a.chosen === null;
            const isWrong = !isEmpty && !isCorrect;

            a.isCorrect = isCorrect;

            if (q.section === 'genel-kultur' || q.section === 'bankacilik-genel-kultur') {
                if (isCorrect) gkCorrect++;
                else if (isWrong) gkWrong++;
                else gkEmpty++;
            } else if (q.section === 'genel-yetenek' || q.section === 'oruntu-analitik') {
                if (isCorrect) gyCorrect++;
                else if (isWrong) gyWrong++;
                else gyEmpty++;
            } else if (q.section === 'ingilizce') {
                if (isCorrect) engCorrect++;
                else if (isWrong) engWrong++;
                else engEmpty++;
            } else if (q.section === 'alan') {
                if (isCorrect) alanCorrect++;
                else if (isWrong) alanWrong++;
                else alanEmpty++;
            }
        });

        // 1. Bölüm: GY-GK birleşiktir (20 GK + 40 GY = 60 soru)
        const gyGkTotalCorrect = gkCorrect + gyCorrect;
        const gyGkTotalWrong = gkWrong + gyWrong;
        const gyGkTotalEmpty = gkEmpty + gyEmpty;

        // Baraj Kuralları:
        // Bölüm 1: >= 36 doğru (%60)
        // Bölüm 2: >= 24 doğru (%60)
        // Bölüm 3: >= 20 doğru (%50)
        const gyGkPassed = gyGkTotalCorrect >= 36;
        const englishPassed = engCorrect >= 24;
        const alanPassed = alanCorrect >= 20;

        const totalCorrect = gyGkTotalCorrect + engCorrect + alanCorrect;
        const totalWrong = gyGkTotalWrong + engWrong + alanWrong;
        const totalEmpty = gyGkTotalEmpty + engEmpty + alanEmpty;

        // Toplam puan 140 üzerinden 100'e ölçeklenir
        const totalScore = parseFloat(((totalCorrect / 140) * 100).toFixed(2));
        const isOverallScorePassed = totalScore >= 60;

        // Tüm barajlar + genel puan geçildi mi?
        const isAllPassed = gyGkPassed && englishPassed && alanPassed && isOverallScorePassed;

        return {
            totalScore,
            totalCorrect,
            totalWrong,
            totalEmpty,
            isAllPassed,
            gyGk: {
                correct: gyGkTotalCorrect,
                wrong: gyGkTotalWrong,
                empty: gyGkTotalEmpty,
                threshold: 36,
                passed: gyGkPassed,
                diff: gyGkTotalCorrect - 36 // Artıysa barajın üstünde, eksiyse baraja kalan
            },
            english: {
                correct: engCorrect,
                wrong: engWrong,
                empty: engEmpty,
                threshold: 24,
                passed: englishPassed,
                diff: engCorrect - 24
            },
            alan: {
                correct: alanCorrect,
                wrong: alanWrong,
                empty: alanEmpty,
                threshold: 20,
                passed: alanPassed,
                diff: alanCorrect - 20
            }
        };
    }

    // 8. KONU ANLATIMLARI (LECTURES)
    getLectures(section = 'all') {
        if (!section || section === 'all') return this.lectures;
        return this.lectures.filter(l => l.section === section);
    }

    getLectureById(id) {
        return this.lectures.find(l => l.id === id);
    }

    getCompletedLectureIds() {
        try {
            return new Set(JSON.parse(localStorage.getItem('ziraat_completed_lectures') || '[]'));
        } catch {
            return new Set();
        }
    }

    toggleLectureCompleted(id) {
        const completed = this.getCompletedLectureIds();
        if (completed.has(id)) {
            completed.delete(id);
        } else {
            completed.add(id);
        }
        localStorage.setItem('ziraat_completed_lectures', JSON.stringify([...completed]));
        return completed.has(id);
    }

    // 9. DIŞ KAYNAKLAR VE RESMİ PORTALLAR SİSTEMİ
    getCustomResources() {
        try {
            const raw = localStorage.getItem('ziraat_custom_external_resources');
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    }

    addCustomResource({ title, url, category, type, description, badge, provider }) {
        if (!url || !title) {
            throw new Error("Lütfen geçerli bir site linki ve başlık girin.");
        }
        let cleanUrl = url.trim();
        if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
            cleanUrl = 'https://' + cleanUrl;
        }

        const customList = this.getCustomResources();
        const newResource = {
            id: `custom_res_${Date.now()}`,
            title: title.trim(),
            url: cleanUrl,
            category: category || 'genel-kultur',
            type: type || 'portal',
            description: description || 'Öğrencinin eklediği özel web kaynağı.',
            badge: badge || 'Özel Site ⭐',
            provider: provider || 'Özel Kaynak',
            durationOrCount: 'Web Sitesi',
            isCustom: true,
            created_at: new Date().toISOString()
        };

        customList.unshift(newResource);
        localStorage.setItem('ziraat_custom_external_resources', JSON.stringify(customList));
        return newResource;
    }

    deleteCustomResource(id) {
        let customList = this.getCustomResources();
        customList = customList.filter(r => r.id !== id);
        localStorage.setItem('ziraat_custom_external_resources', JSON.stringify(customList));
        return true;
    }

    // İncelendi / Ziyaret Edildi (Visited Boolean) Takip Sistemi
    getVisitedResources() {
        try {
            const raw = localStorage.getItem('ziraat_visited_resources');
            return raw ? JSON.parse(raw) : {};
        } catch {
            return {};
        }
    }

    isResourceVisited(id) {
        if (!id) return false;
        const map = this.getVisitedResources();
        return Boolean(map[id]);
    }

    setResourceVisited(id, isVisited) {
        if (!id) return false;
        const map = this.getVisitedResources();
        if (isVisited) {
            map[id] = {
                visited: true,
                updatedAt: new Date().toISOString()
            };
        } else {
            delete map[id];
        }
        localStorage.setItem('ziraat_visited_resources', JSON.stringify(map));
        return Boolean(isVisited);
    }

    toggleResourceVisited(id) {
        const current = this.isResourceVisited(id);
        const nextState = !current;
        this.setResourceVisited(id, nextState);
        return nextState;
    }

    getResourceVisitStats(category = 'all', type = 'all') {
        const items = this.getResources(category, type);
        const map = this.getVisitedResources();
        let visited = 0;
        items.forEach(r => {
            if (map[r.id]) visited++;
        });
        const total = items.length;
        const unvisited = Math.max(0, total - visited);
        const percent = total > 0 ? Math.round((visited / total) * 100) : 0;
        return { total, visited, unvisited, percent };
    }

    getResources(category = 'all', type = 'all') {
        const customItems = this.getCustomResources();
        let list = [...customItems, ...this.resources];
        if (category && category !== 'all') {
            list = list.filter(r => r.category === category);
        }
        if (type && type !== 'all') {
            list = list.filter(r => r.type === type);
        }
        return list;
    }

    getResourceById(id) {
        const customItems = this.getCustomResources();
        return [...customItems, ...this.resources].find(r => r.id === id);
    }

    // 10. KİŞİSEL ÇALIŞMA NOTLARI VE BİLGİ PANOSU
    getDefaultStarterNotes() {
        return [
            {
                id: 'note_ziraat_history_1863',
                title: 'Ziraat Bankası Tarihçesi & İlkler Kronolojisi',
                section: 'bankacilik-genel-kultur',
                priority: 'P0',
                color: 'amber',
                is_pinned: true,
                tags: ['Mithat Paşa', 'Memleket Sandıkları', '1863', 'Menafi Sandıkları', 'Mimar Mongeri', 'İlk Banknot'],
                content: `### Ziraat Bankası Kuruluş & Önemli Dönemeçler
* **1863**: Mithat Paşa tarafından Niş (Pirot) kasabasında ilk **Memleket Sandıkları** kuruldu (Köylüye faizsiz/düşük faizli imece finansmanı).
* **1883**: Memleket Sandıkları yeniden yapılandırılarak **Menafi Sandıkları** adını aldı.
* **15 Ağustos 1888**: Menafi Sandıkları kaldırılarak resmen **Ziraat Bankası** teşkilatı kuruldu.
* **Ulus Genel Müdürlük Binası**: İtalyan mimar **Giulio Mongeri** tarafından Birinci Ulusal Mimarlık Akımı ile inşa edildi (1926-1929).
* **Başak Amblemi**: Aykut Köksal tarafından tasarlanmış tescilli simge.
* **Cumhuriyetin İlk Banknotu (1927)**: Ziraat Bankası şubeleri aracılığıyla tedavüle sunuldu.

> 💡 **Sınav Taktik Notu**: Soru kökünde "1863" ve "Mithat Paşa" varsa cevap Memleket Sandıkları; "1888" varsa Ziraat Bankası kuruluşudur!`,
                created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
                updated_at: new Date(Date.now() - 86400000 * 2).toISOString()
            },
            {
                id: 'note_conditionals_summary',
                title: 'Type 3 vs Mixed Conditionals Formül Tablosu',
                section: 'ingilizce',
                priority: 'P0',
                color: 'indigo',
                is_pinned: true,
                tags: ['Conditionals', 'Type 3', 'Mixed Conditionals', 'YÖKDİL', 'Gramer'],
                content: `### Conditionals Karşılaştırma & Sınav Taktikleri

| Koşul Türü | If Cümlesi (Koşul) | Ana Cümle (Sonuç) | Zaman Anlamı |
| :--- | :--- | :--- | :--- |
| **Type 2** | Past Simple (had, were) | would / could + V1 | Şu an / Gelecek (Hayali) |
| **Type 3** | Past Perfect (had V3) | would have + V3 | Geçmiş (Değişmez Pişmanlık) |
| **Mixed (Past -> Present)** | had + V3 (Geçmiş eylem) | would + V1 + **now / today** | Geçmişteki durumun bugünkü sonucu |
| **Mixed (Present -> Past)** | Past Simple (Genel durum) | would have + V3 + **yesterday** | Genel özelliğin dünkü sonucu |

> 📌 **İpucu**: Cümlede *If he had listened to the manager yesterday, he would not be in trouble **now**.* yapısında virgülden sonra "now/today" varsa kesinlikle **Mixed Conditional** işaretle!`,
                created_at: new Date(Date.now() - 86400000).toISOString(),
                updated_at: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: 'note_sorting_complexity',
                title: 'Big-O Karmaşıklık & Sıralama Algoritmaları Karşılaştırması',
                section: 'alan',
                priority: 'P0',
                color: 'emerald',
                is_pinned: false,
                tags: ['Algoritmalar', 'Big-O', 'QuickSort', 'MergeSort', 'HeapSort', 'Stable'],
                content: `### Sıralama Algoritmaları Özet Tablosu

| Algoritma | Ortalama Süre | En Kötü (Worst) | Bellek (Space) | Stable mı? |
| :--- | :--- | :--- | :--- | :--- |
| **QuickSort** | O(n log n) | **O(n²)** (Kötü pivot) | O(log n) | Hayır |
| **MergeSort** | O(n log n) | **O(n log n)** | **O(n)** | **Evet** |
| **HeapSort** | O(n log n) | O(n log n) | O(1) (In-place) | Hayır |
| **Binary Search** | O(log n) | O(log n) | O(1) | - (Dizi sıralı olmalı) |

* **QuickSort**: Pratikte en hızlıdır ancak sıralı dizide pivot ilk eleman seçilirse worst-case O(n²) olur.
* **MergeSort**: Garantili O(n log n) sunar ve stable'dır, ancak O(n) ek bellek harcar.`,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 'note_pattern_steps',
                title: 'Sayı Dizileri & Matrislerde 5 Adımlı Çözüm Yolu',
                section: 'oruntu-analitik',
                priority: 'P1',
                color: 'purple',
                is_pinned: false,
                tags: ['Sayı Dizileri', 'Fibonacci', 'Çift Kural', 'Matris', 'ALES Mantık'],
                content: `### Sayısal Örüntü Çözme Adımları
1. **Farklar Dizisi**: Sayılar arası farkları yaz (\`+3, +5, +7, +9...\`). Farklar eşit değilse farkların farkına (2. derece türev) bak.
2. **Kombine İşlemler**: \`(x * 2) + 1\`, \`(x * 3) - 2\` gibi çarpma-toplama kombinasyonlarını test et.
3. **Alternatif / Çift Dizi**: Tek numaralı terimler kendi içinde (1., 3., 5.), çift numaralılar kendi içinde (2., 4., 6.) ilerliyor olabilir.
4. **Fibonacci Mantığı**: Bir önceki iki terimin toplamı: T_n = T_{n-1} + T_{n-2} veya çarpımı.
5. **Kare & Küp Sapmaları**: n^2 ± 1, n^3 ± 2 kalıplarını kontrol et (örn: 0, 7, 26, 63 -> n^3 - 1).`,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ];
    }

    getUserNotes() {
        try {
            const raw = localStorage.getItem('ziraat_user_notes');
            let notes = [];
            if (!raw) {
                notes = this.getDefaultStarterNotes();
                localStorage.setItem('ziraat_user_notes', JSON.stringify(notes));
            } else {
                notes = JSON.parse(raw);
                if (!Array.isArray(notes) || notes.length === 0) {
                    notes = this.getDefaultStarterNotes();
                    localStorage.setItem('ziraat_user_notes', JSON.stringify(notes));
                }
            }

            // Sıralama: Önce Sabitlenenler (is_pinned true), sonra P0 > P1 > P2, sonra en yeni tarih
            const priorityWeight = { 'P0': 3, 'P1': 2, 'P2': 1 };
            notes.sort((a, b) => {
                if (a.is_pinned !== b.is_pinned) {
                    return a.is_pinned ? -1 : 1;
                }
                const pDiff = (priorityWeight[b.priority] || 1) - (priorityWeight[a.priority] || 1);
                if (pDiff !== 0) return pDiff;
                return new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0);
            });

            return notes;
        } catch (e) {
            console.error("Not yükleme hatası:", e);
            return this.getDefaultStarterNotes();
        }
    }

    getUserNoteById(id) {
        const notes = this.getUserNotes();
        return notes.find(n => n.id === id);
    }

    saveUserNote(noteData) {
        const notes = this.getUserNotes();
        const now = new Date().toISOString();
        let targetNote = null;

        if (noteData.id) {
            const index = notes.findIndex(n => n.id === noteData.id);
            if (index !== -1) {
                targetNote = {
                    ...notes[index],
                    ...noteData,
                    updated_at: now
                };
                notes[index] = targetNote;
            }
        }

        if (!targetNote) {
            targetNote = {
                id: noteData.id || `note_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
                title: noteData.title || 'Başlıksız Not',
                content: noteData.content || '',
                section: noteData.section || 'bankacilik-genel-kultur',
                priority: noteData.priority || 'P1',
                color: noteData.color || 'indigo',
                is_pinned: !!noteData.is_pinned,
                tags: Array.isArray(noteData.tags) ? noteData.tags : [],
                created_at: now,
                updated_at: now
            };
            notes.unshift(targetNote);
        }

        localStorage.setItem('ziraat_user_notes', JSON.stringify(notes));

        // Supabase ile arka plan eşitlemesi
        if (isSupabaseConfigured() && supabase) {
            this.syncNoteToSupabase(targetNote);
        }

        return targetNote;
    }

    deleteUserNote(noteId) {
        let notes = this.getUserNotes();
        notes = notes.filter(n => n.id !== noteId);
        localStorage.setItem('ziraat_user_notes', JSON.stringify(notes));

        // Supabase'den sil
        if (isSupabaseConfigured() && supabase) {
            (async () => {
                try {
                    const { data: { user } } = await supabase.auth.getUser();
                    if (user) {
                        await supabase.from('user_notes').delete().eq('id', noteId).eq('user_id', user.id);
                    }
                } catch (e) {
                    console.warn("Supabase not silme uyarısı:", e);
                }
            })();
        }
        return true;
    }

    togglePinUserNote(noteId) {
        const note = this.getUserNoteById(noteId);
        if (!note) return null;
        return this.saveUserNote({
            ...note,
            is_pinned: !note.is_pinned
        });
    }

    async syncNoteToSupabase(note) {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            await supabase.from('user_notes').upsert({
                id: note.id,
                user_id: user.id,
                title: note.title,
                content: note.content,
                section: note.section,
                tags: note.tags || [],
                priority: note.priority || 'P1',
                is_pinned: !!note.is_pinned,
                color: note.color || 'indigo',
                created_at: note.created_at,
                updated_at: note.updated_at
            }, { onConflict: 'id' });
        } catch (err) {
            console.warn("Not Supabase senkronizasyon uyarısı:", err);
        }
    }

    async syncUserNotesFromSupabase() {
        if (!isSupabaseConfigured() || !supabase) return;
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('user_notes')
                .select('*')
                .eq('user_id', user.id);

            if (error || !data || data.length === 0) return;

            const localNotes = this.getUserNotes();
            const localMap = new Map(localNotes.map(n => [n.id, n]));

            data.forEach(remote => {
                const existing = localMap.get(remote.id);
                if (!existing || new Date(remote.updated_at) > new Date(existing.updated_at)) {
                    localMap.set(remote.id, {
                        id: remote.id,
                        title: remote.title,
                        content: remote.content,
                        section: remote.section,
                        tags: remote.tags || [],
                        priority: remote.priority,
                        is_pinned: remote.is_pinned,
                        color: remote.color,
                        created_at: remote.created_at,
                        updated_at: remote.updated_at
                    });
                }
            });

            const merged = Array.from(localMap.values());
            localStorage.setItem('ziraat_user_notes', JSON.stringify(merged));
        } catch (e) {
            console.warn("Supabase notları çekme hatası:", e);
        }
    }

    exportUserNotesAsMarkdown() {
        const notes = this.getUserNotes();
        const header = `# ZİRAAT BANKASI UZMAN YARDIMCILIĞI - ÇALIŞMA NOTLARIM\nOluşturulma: ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')}\nToplam Not: ${notes.length}\n\n---\n\n`;

        const sectionNames = {
            'bankacilik-genel-kultur': 'Bankacılık & Genel Kültür',
            'oruntu-analitik': 'Örüntü & Analitik Mantık',
            'ingilizce': 'İngilizce',
            'alan': 'Alan Bilgisi (Bilgisayar & YZ)',
            'genel': 'Genel Sınav Taktikleri'
        };

        const body = notes.map((n, i) => {
            const sec = sectionNames[n.section] || n.section;
            const pinStr = n.is_pinned ? ' [SABİTLENDİ ⭐]' : '';
            const tagsStr = (n.tags && n.tags.length > 0) ? `Etiketler: ${n.tags.map(t => `#${t}`).join(' ')}\n` : '';
            return `## ${i + 1}. ${n.title}${pinStr}\n**Bölüm:** ${sec} | **Öncelik:** ${n.priority}\n${tagsStr}\n${n.content}\n\n---\n`;
        }).join('\n');

        return header + body;
    }

    // 11. YOUTUBE KANALLARI VE VİDEO EĞİTİM PORTALI
    getYoutubeChannels() {
        let customChannels = [];
        try {
            const raw = localStorage.getItem('ziraat_custom_youtube_channels');
            if (raw) customChannels = JSON.parse(raw);
        } catch {
            customChannels = [];
        }
        
        // Add custom videos channel group if user added individual videos
        const customVideos = this.getCustomYoutubeVideos();
        let list = [...this.youtubeChannels, ...customChannels];
        if (customVideos.length > 0) {
            const myVideosChannel = {
                id: 'channel-custom-my-videos',
                name: '⭐ Eklediğim Videolar',
                handle: '@kisisel-liste',
                url: '#',
                avatar: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png',
                badge: 'Kendi Listem 🎯',
                category: 'all',
                description: 'Kendi eklediğiniz özel YouTube ders videoları ve soru çözümleri.',
                isCustomGroup: true,
                videoCount: customVideos.length,
                videos: customVideos
            };
            list.splice(1, 0, myVideosChannel); // Place near the top right after Eğitim Serisi
        }

        return list;
    }

    getYoutubeChannelById(id) {
        return this.getYoutubeChannels().find(c => c.id === id);
    }

    // ========================================================
    // YOUTUBE VİDEO ID VE URL ÇÖZÜMLEME
    // ========================================================
    extractYoutubeVideoId(url) {
        if (!url || typeof url !== 'string') return null;
        url = url.trim();
        // Regex handles: watch?v=, youtu.be/, /embed/, /v/, /shorts/
        const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
        const match = url.match(regExp);
        if (match && match[1] && match[1].length === 11) {
            return match[1];
        }
        // Fallback: If passed directly an 11-char ID
        if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
            return url;
        }
        return null;
    }

    // ========================================================
    // ÖZEL VİDEO EKLEME / SİLME (LOCALSTORAGE)
    // ========================================================
    getCustomYoutubeVideos() {
        try {
            const raw = localStorage.getItem('ziraat_custom_youtube_videos');
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    }

    addCustomYoutubeVideo({ title, url, category, description, duration }) {
        const videoId = this.extractYoutubeVideoId(url);
        if (!videoId) {
            throw new Error("Geçerli bir YouTube video linki bulunamadı. Lütfen kontrol edin.");
        }

        const customVideos = this.getCustomYoutubeVideos();
        const existing = customVideos.find(v => v.id === videoId);
        if (existing) {
            throw new Error("Bu video zaten ekli listenizde bulunuyor!");
        }

        const newVideo = {
            id: videoId,
            title: title || 'Eklenen Video',
            url: url.startsWith('http') ? url : `https://www.youtube.com/watch?v=${videoId}`,
            duration: duration || 'Video',
            badge: 'Özel Eklenen ⭐',
            category: category || 'genel-yetenek',
            playlistName: 'Özel Videolarım',
            description: description || 'Öğrencinin eklediği özel ders videosu.',
            views: 'Kişisel',
            isCustom: true,
            channelId: 'channel-custom-my-videos',
            channelName: 'Kendi Listem',
            created_at: new Date().toISOString()
        };

        customVideos.unshift(newVideo);
        localStorage.setItem('ziraat_custom_youtube_videos', JSON.stringify(customVideos));
        return newVideo;
    }

    deleteCustomYoutubeVideo(videoId) {
        let customVideos = this.getCustomYoutubeVideos();
        customVideos = customVideos.filter(v => v.id !== videoId);
        localStorage.setItem('ziraat_custom_youtube_videos', JSON.stringify(customVideos));
        return true;
    }

    // ========================================================
    // İZLENDİ / İZLENMEDİ (WATCHED BOOLEAN) TAKİP SİSTEMİ
    // ========================================================
    getWatchedVideos() {
        try {
            const raw = localStorage.getItem('ziraat_watched_youtube_videos');
            return raw ? JSON.parse(raw) : {};
        } catch {
            return {};
        }
    }

    isVideoWatched(videoId) {
        if (!videoId) return false;
        const map = this.getWatchedVideos();
        return Boolean(map[videoId]);
    }

    setVideoWatched(videoId, isWatched) {
        if (!videoId) return false;
        const map = this.getWatchedVideos();
        if (isWatched) {
            map[videoId] = {
                watched: true,
                updatedAt: new Date().toISOString()
            };
        } else {
            delete map[videoId];
        }
        localStorage.setItem('ziraat_watched_youtube_videos', JSON.stringify(map));
        return Boolean(isWatched);
    }

    toggleVideoWatched(videoId) {
        const current = this.isVideoWatched(videoId);
        const nextState = !current;
        this.setVideoWatched(videoId, nextState);
        return nextState;
    }

    getVideoWatchStats(channelId = 'all', category = 'all') {
        const videos = this.getAllChannelVideos(channelId, category);
        const map = this.getWatchedVideos();
        let watched = 0;
        videos.forEach(v => {
            if (map[v.id]) watched++;
        });
        const total = videos.length;
        const unwatched = Math.max(0, total - watched);
        const percent = total > 0 ? Math.round((watched / total) * 100) : 0;
        return { total, watched, unwatched, percent };
    }

    addCustomYoutubeChannel({ name, url, category, description, badge }) {
        let customChannels = [];
        try {
            const raw = localStorage.getItem('ziraat_custom_youtube_channels');
            if (raw) customChannels = JSON.parse(raw);
        } catch {}

        // YouTube URL'sinden ID veya handle çıkarma
        let cleanHandle = '@kanal';
        let isVideo = false;
        let videoId = this.extractYoutubeVideoId(url);

        if (videoId) {
            isVideo = true;
        } else if (url.includes('/@')) {
            cleanHandle = '@' + url.split('/@')[1]?.split('?')[0]?.split('/')[0];
        }

        const newChannel = {
            id: `custom_channel_${Date.now()}`,
            name: name || 'Özel Eğitim Kaynağı',
            handle: cleanHandle,
            url: url,
            avatar: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png',
            badge: badge || 'Öğrenci Kaynağı ⭐',
            category: category || 'bankacilik-genel-kultur',
            description: description || 'Öğrenci tarafından eklenen YouTube eğitim kanalı / oynatma listesi.',
            isFeatured: false,
            videoCount: isVideo ? 1 : 0,
            videos: isVideo && videoId ? [
                {
                    id: videoId,
                    title: name,
                    url: url,
                    duration: 'Video',
                    badge: badge || 'Özel Video',
                    category: category || 'bankacilik-genel-kultur',
                    views: 'Öğrenci',
                    description: description || 'Özel eklenen video'
                }
            ] : [],
            created_at: new Date().toISOString()
        };

        customChannels.unshift(newChannel);
        localStorage.setItem('ziraat_custom_youtube_channels', JSON.stringify(customChannels));
        return newChannel;
    }

    getAllChannelVideos(channelId = 'all', category = 'all') {
        const channels = this.getYoutubeChannels();
        let allVideos = [];
        const seenVids = new Set();

        channels.forEach(ch => {
            if (channelId !== 'all' && ch.id !== channelId) return;
            // When viewing "all" channels, skip playlist sub-entries so videos aren't duplicated
            if (channelId === 'all' && ch.isPlaylist) return;

            (ch.videos || []).forEach(v => {
                // Category match: match video's category or channel's category
                if (category !== 'all' && v.category !== category && ch.category !== category) return;

                if (channelId === 'all') {
                    if (seenVids.has(v.id)) return;
                    seenVids.add(v.id);
                }

                allVideos.push({
                    ...v,
                    channelId: ch.id,
                    channelName: ch.name,
                    channelAvatar: ch.avatar,
                    channelHandle: ch.handle
                });
            });
        });

        // Also if channelId is 'all' and custom videos exist not already included:
        const customVideos = this.getCustomYoutubeVideos();
        if (channelId === 'all' || channelId === 'channel-custom-my-videos') {
            customVideos.forEach(v => {
                if (category !== 'all' && v.category !== category) return;
                if (!seenVids.has(v.id)) {
                    seenVids.add(v.id);
                    allVideos.push(v);
                }
            });
        }

        return allVideos;
    }
}

export const db = new DataManager();

