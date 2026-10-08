// ==============================================================================
// VERİ VE DEPOLAMA YÖNETİCİSİ (SUPABASE + LOCAL STORAGE CACHE / OFFLINE)
// ==============================================================================

import { supabase, isSupabaseConfigured } from './supabase.js';

class DataManager {
    constructor() {
        this.questions = [];
        this.flashcards = [];
        this.isLoaded = false;
    }

    // 1. SORULARI VE KARTLARI YÜKLE
    async init() {
        if (this.isLoaded) return;

        try {
            // Local JSON dosyalarından soruları yükle
            const [alanRes, gkRes, gyRes, engRes, fcRes] = await Promise.all([
                fetch('./data/questions/alan_bilgisayar.json').then(r => r.json()).catch(() => []),
                fetch('./data/questions/genel_kultur.json').then(r => r.json()).catch(() => []),
                fetch('./data/questions/genel_yetenek.json').then(r => r.json()).catch(() => []),
                fetch('./data/questions/ingilizce.json').then(r => r.json()).catch(() => []),
                fetch('./data/flashcards.json').then(r => r.json()).catch(() => [])
            ]);

            this.questions = [...alanRes, ...gkRes, ...gyRes, ...engRes];
            this.flashcards = fcRes;

            // Supabase bağlıysa soruları ve kartları eşitlemeyi deneyebiliriz (sessiz arka plan)
            if (isSupabaseConfigured() && supabase) {
                this.syncQuestionsToSupabase();
            }

            this.isLoaded = true;
            console.log(`[DataManager] ${this.questions.length} soru, ${this.flashcards.length} kart yüklendi.`);
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
                    difficulty: q.difficulty || 2,
                    stem: q.stem,
                    options: q.options,
                    answer_index: q.answerIndex,
                    explanation: q.explanation,
                    tags: q.tags || [],
                    source: q.source || 'original'
                }));

                await supabase.from('questions').upsert(mappedQuestions, { onConflict: 'id', ignoreDuplicates: true });
            }
        } catch (e) {
            console.warn("Supabase arka plan soru eşitleme bildirimi:", e);
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
            list = list.filter(q => q.section === section);
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

    // 3. TAM DENEME SINAVI OLUŞTURMA (140 Soru: 20 GK + 40 GY + 40 İngilizce + 40 Alan)
    generateMockExam() {
        const gk = this.questions.filter(q => q.section === 'genel-kultur');
        const gy = this.questions.filter(q => q.section === 'genel-yetenek');
        const eng = this.questions.filter(q => q.section === 'ingilizce');
        const alan = this.questions.filter(q => q.section === 'alan');

        // Karıştırıcı yardımcı fonksiyon
        const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

        // İdeal kota: GK 20, GY 40, Eng 40, Alan 40
        // Soru havuzu geliştikçe kota kadar seçer, henüz soru sayısı azsa eldeki tüm soruları alır
        const pickCount = (arr, count) => shuffle(arr).slice(0, count);

        const examGK = pickCount(gk, 20);
        const examGY = pickCount(gy, 40);
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

            if (q.section === 'genel-kultur') {
                if (isCorrect) gkCorrect++;
                else if (isWrong) gkWrong++;
                else gkEmpty++;
            } else if (q.section === 'genel-yetenek') {
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
}

export const db = new DataManager();
