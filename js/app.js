// ==============================================================================
// ZİRAAT BANKASI UZMAN YARDIMCILIĞI SINAV PLATFORMU - ANA UYGULAMA KONTROLCÜSÜ
// ==============================================================================

import { 
    supabase, 
    initAuthListener, 
    showToast, 
    showLoader, 
    hideLoader, 
    showView,
    showConfirmModal,
    isSupabaseConfigured 
} from './supabase.js';

import { db } from './db.js';

// Global Uygulama Durumu
const state = {
    // Practice Modu
    practice: {
        questions: [],
        currentIndex: 0,
        userAnswers: {}, // questionId -> chosenIndex
        flagged: new Set()
    },
    // Tam Deneme Sınav Modu
    exam: {
        questions: [],
        currentIndex: 0,
        answers: {}, // questionId -> chosenIndex
        flagged: new Set(),
        timeRemainingSeconds: 160 * 60, // 160 dakika = 9600 saniye
        timerInterval: null,
        startedAt: null
    },
    // Flashcard Modu
    flashcards: {
        cards: [],
        currentIndex: 0,
        category: 'all'
    },
    // Konu Anlatımı Modu
    lectures: {
        category: 'all',
        searchQuery: ''
    }
};

// ==============================================================================
// BAŞLANGIÇ (DOM READY)
// ==============================================================================
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Soruları ve veritabanını başlat
    await db.init();

    // 2. Auth ve sayfa yönlendiriciyi kur
    initAuthListener();
    initNavigationListeners();

    // 3. Modülleri başlat
    initDashboard();
    initLecturesMode();
    initPracticeMode();
    initExamMode();
    initFlashcardsMode();
    initReviewMode();
    initProfileForm();
    initKeyboardShortcuts();
});

// ==============================================================================
// 1. NAVİGASYON VE SEKME YÖNETİMİ
// ==============================================================================
function initNavigationListeners() {
    const navButtons = document.querySelectorAll('[data-view-target]');

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetView = e.currentTarget.getAttribute('data-view-target');
            if (targetView) {
                // Sınav devam ediyorsa ve sınavdan çıkılmak isteniyorsa onay iste
                if (state.exam.timerInterval && targetView !== 'exam') {
                    showConfirmModal({
                        title: 'Deneme Sınavından Çıkılsın mı?',
                        message: 'Sınav devam ediyor. Çıkarsanız sınavınız kaydedilmeyebilir.',
                        confirmText: 'Çık',
                        cancelText: 'Sınava Dön',
                        isDanger: true,
                        onConfirm: () => {
                            clearInterval(state.exam.timerInterval);
                            state.exam.timerInterval = null;
                            switchView(targetView);
                        }
                    });
                    return;
                }

                switchView(targetView);
            }
        });
    });
}

function switchView(viewId) {
    document.querySelectorAll('[data-view-target]').forEach(b => {
        b.classList.remove('active');
        b.closest('.nav-item')?.classList.remove('active');
    });

    document.querySelectorAll(`[data-view-target="${viewId}"]`).forEach(b => {
        b.classList.add('active');
        b.closest('.nav-item')?.classList.add('active');
    });

    showView(viewId);
}

// ==============================================================================
// 2. DASHBOARD VE GERİ SAYIM
// ==============================================================================
function initDashboard() {
    updateCountdownBadge();
    updateDashboardStats();

    document.addEventListener('view-dashboard-loaded', () => {
        updateCountdownBadge();
        updateDashboardStats();
    });
}

function updateCountdownBadge() {
    const examDate = new Date('2026-10-24T14:00:00');
    const now = new Date();
    const diffMs = examDate - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    const badge = document.getElementById('header-countdown-badge');
    if (badge) {
        badge.textContent = diffDays > 0 ? `${diffDays} Gün Kaldı` : 'Sınav Günü!';
    }
}

function updateDashboardStats() {
    const solvedIds = db.getSolvedQuestionIds();
    const solvedEl = document.getElementById('dash-solved-count');
    if (solvedEl) solvedEl.textContent = solvedIds.size;

    const attempts = db.getLocalAttempts();
    const readinessEl = document.getElementById('dash-readiness-score');

    if (attempts.length > 0) {
        const last = attempts[0];
        const readiness = Math.min(100, Math.round(last.totalScore || 60));
        if (readinessEl) readinessEl.textContent = `%${readiness}`;
    }
}

// ==============================================================================
// 2.5. KONU ANLATIMI VE DERS NOTLARI MODÜLÜ
// ==============================================================================
function initLecturesMode() {
    const searchInput = document.getElementById('lecture-search-input');
    const categoryBtns = document.querySelectorAll('[data-lec-sec]');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            state.lectures.category = e.currentTarget.getAttribute('data-lec-sec');
            renderLecturesList();
        });
    });

    searchInput?.addEventListener('input', (e) => {
        state.lectures.searchQuery = e.target.value.trim().toLowerCase();
        renderLecturesList();
    });

    document.addEventListener('view-lectures-loaded', renderLecturesList);
    renderLecturesList();
}

function renderLecturesList() {
    const container = document.getElementById('lectures-list-container');
    const badge = document.getElementById('lectures-progress-badge');
    if (!container) return;

    let lectures = db.getLectures(state.lectures.category);
    const query = state.lectures.searchQuery;

    if (query) {
        lectures = lectures.filter(l => 
            l.title.toLowerCase().includes(query) ||
            l.topic.toLowerCase().includes(query) ||
            l.summary.toLowerCase().includes(query) ||
            l.content.toLowerCase().includes(query)
        );
    }

    const completedSet = db.getCompletedLectureIds();
    const allTotal = db.getLectures('all').length;
    if (badge) {
        badge.textContent = `${completedSet.size} / ${allTotal} Konu Tamamlandı`;
    }

    if (lectures.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-magnifying-glass text-dim" style="font-size: 2.5rem; margin-bottom: 0.75rem;"></i>
                <h4>Aradığınız kriterde konu bulunamadı</h4>
                <p class="text-muted">Arama filtrenizi temizleyebilir veya başka bir anahtar kelime deneyebilirsiniz.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    lectures.forEach(lec => {
        const isCompleted = completedSet.has(lec.id);
        const card = document.createElement('div');
        card.className = `lecture-card ${isCompleted ? 'completed' : ''}`;
        card.id = `lec-card-${lec.id}`;

        const sectionLabels = {
            'alan': 'ALAN BİLGİSİ (BİLGİSAYAR & YZ)',
            'genel-kultur': 'GENEL KÜLTÜR (BANKA & TARİH)',
            'genel-yetenek': 'GENEL YETENEK (PROBLEM & MANTIK)',
            'ingilizce': 'İNGİLİZCE (GRAMER & KELİME)'
        };

        card.innerHTML = `
            <div class="lecture-card-header">
                <div class="lecture-title-wrap">
                    <div class="lecture-meta">
                        <span class="badge badge-indigo">${sectionLabels[lec.section] || lec.section.toUpperCase()}</span>
                        <span class="badge badge-neutral"><i class="fa-regular fa-clock"></i> ${lec.readTime || '5 dk'}</span>
                        <span class="badge badge-neutral">${escapeHtml(lec.topic)}</span>
                    </div>
                    <h3 class="lecture-title">${escapeHtml(lec.title)}</h3>
                    <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.2rem;">${escapeHtml(lec.summary)}</p>
                </div>
                <div class="lecture-card-actions">
                    <button class="btn-toggle-read ${isCompleted ? 'completed' : ''}" data-lec-id="${lec.id}">
                        <i class="fa-solid ${isCompleted ? 'fa-circle-check' : 'fa-circle'}"></i>
                        <span>${isCompleted ? 'Çalışıldı' : 'Tamamla'}</span>
                    </button>
                    <i class="fa-solid fa-chevron-down chevron-icon"></i>
                </div>
            </div>
            <div class="lecture-card-body">
                <div class="lecture-content-viewer">
                    ${formatLectureContent(lec.content)}
                </div>
            </div>
        `;

        // Başlığa tıklandığında açılır-kapanır (Accordion)
        card.querySelector('.lecture-card-header').addEventListener('click', (e) => {
            if (e.target.closest('.btn-toggle-read')) return; // Butona tıklanmışsa katlama
            card.classList.toggle('expanded');
        });

        // Tamamlandı durumunu değiştir
        card.querySelector('.btn-toggle-read').addEventListener('click', (e) => {
            e.stopPropagation();
            const nowCompleted = db.toggleLectureCompleted(lec.id);
            if (nowCompleted) {
                showToast(`"${lec.title}" tamamlandı olarak işaretlendi! 🎯`, "success", 2500);
            }
            renderLecturesList();
        });

        container.appendChild(card);
    });
}

// Zengin Markdown Formatlayıcı
function formatLectureContent(md) {
    if (!md) return '';

    const lines = md.split('\n');
    const processed = [];
    let inTable = false;
    let tableRows = [];

    for (let i = 0; i < lines.length; i++) {
        const rawLine = lines[i];
        const trimmed = rawLine.trim();

        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
            if (!inTable) {
                inTable = true;
                const headerCells = trimmed.split('|').slice(1, -1).map(c => `<th>${escapeHtml(c.trim())}</th>`).join('');
                tableRows = [`<div style="overflow-x:auto; margin: 1rem 0;"><table class="lecture-table"><thead><tr>${headerCells}</tr></thead><tbody>`];
            } else if (trimmed.includes('---')) {
                // Ayırıcı satır, geç
                continue;
            } else {
                const bodyCells = trimmed.split('|').slice(1, -1).map(c => `<td>${escapeHtml(c.trim())}</td>`).join('');
                tableRows.push(`<tr>${bodyCells}</tr>`);
            }
        } else {
            if (inTable) {
                inTable = false;
                tableRows.push('</tbody></table></div>');
                processed.push(tableRows.join(''));
                tableRows = [];
            }
            processed.push(escapeHtml(rawLine));
        }
    }
    if (inTable) {
        tableRows.push('</tbody></table></div>');
        processed.push(tableRows.join(''));
    }

    let html = processed.join('\n');

    // Başlıklar
    html = html.replace(/### (.*?)(<br>|\n|$)/g, '<h3>$1</h3>');
    html = html.replace(/## (.*?)(<br>|\n|$)/g, '<h2>$1</h2>');

    // Kalın ve İtalik
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Kod etiketleri
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Alıntı blokları (Quote / Tip)
    html = html.replace(/&gt; (.*?)(<br>|\n|$)/g, '<blockquote>$1</blockquote>');

    // Liste maddeleri
    html = html.replace(/^\* (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>\n?)+/gs, '<ul>$&</ul>');

    // Satır sonları
    html = html.replace(/\n/g, '<br>');

    return html;
}

// ==============================================================================
// 3. KONU BAZLI ALIŞTIRMA MODU
// ==============================================================================
function initPracticeMode() {
    const secSelect = document.getElementById('practice-section-select');
    const topSelect = document.getElementById('practice-topic-select');
    const diffSelect = document.getElementById('practice-difficulty-select');
    const typeSelect = document.getElementById('practice-type-select');
    const poolCountEl = document.getElementById('practice-pool-count');
    const btnStart = document.getElementById('btn-start-practice');

    // Bölüm değiştiğinde konu listesini güncelle
    const updateTopics = () => {
        const chosenSection = secSelect.value;
        const allQ = db.getAllQuestions();
        const availableTopics = new Set();

        allQ.forEach(q => {
            if (chosenSection === 'all' || q.section === chosenSection) {
                if (q.topic) availableTopics.add(q.topic);
            }
        });

        topSelect.innerHTML = '<option value="all">Tüm Konular</option>';
        availableTopics.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t;
            opt.textContent = t;
            topSelect.appendChild(opt);
        });

        // Toplam havuz sayısı göster
        const filtered = db.getFilteredQuestions({
            section: secSelect.value,
            topic: topSelect.value,
            difficulty: diffSelect.value,
            filterType: typeSelect.value
        });
        if (poolCountEl) poolCountEl.textContent = `${filtered.length} Soru Mevcut`;
    };

    secSelect?.addEventListener('change', updateTopics);
    diffSelect?.addEventListener('change', updateTopics);
    typeSelect?.addEventListener('change', updateTopics);
    topSelect?.addEventListener('change', updateTopics);

    document.addEventListener('view-practice-loaded', updateTopics);
    updateTopics();

    // Alıştırmayı Başlat
    btnStart?.addEventListener('click', () => {
        const questions = db.getFilteredQuestions({
            section: secSelect.value,
            topic: topSelect.value,
            difficulty: diffSelect.value,
            filterType: typeSelect.value
        });

        if (questions.length === 0) {
            showToast("Seçilen kriterlere uygun soru bulunamadı!", "warning");
            return;
        }

        state.practice.questions = questions;
        state.practice.currentIndex = 0;
        state.practice.userAnswers = {};

        document.getElementById('practice-question-container').style.display = 'block';
        renderPracticeQuestion();
    });

    // Soru Gezinme Butonları
    document.getElementById('btn-practice-prev')?.addEventListener('click', () => {
        if (state.practice.currentIndex > 0) {
            state.practice.currentIndex--;
            renderPracticeQuestion();
        }
    });

    document.getElementById('btn-practice-next')?.addEventListener('click', () => {
        if (state.practice.currentIndex < state.practice.questions.length - 1) {
            state.practice.currentIndex++;
            renderPracticeQuestion();
        } else {
            showToast("Alıştırmadaki tüm soruları tamamladınız! Harika iş.", "success");
        }
    });

    // Bayraklama
    document.getElementById('btn-practice-flag')?.addEventListener('click', (e) => {
        const q = state.practice.questions[state.practice.currentIndex];
        if (!q) return;

        if (state.practice.flagged.has(q.id)) {
            state.practice.flagged.delete(q.id);
            e.currentTarget.querySelector('i').className = 'fa-regular fa-bookmark';
            showToast("İşaret kaldırıldı", "info");
        } else {
            state.practice.flagged.add(q.id);
            e.currentTarget.querySelector('i').className = 'fa-solid fa-bookmark text-accent';
            showToast("Soru işaretlendi (Bayraklandı)", "success");
        }
    });
}

function renderPracticeQuestion() {
    const q = state.practice.questions[state.practice.currentIndex];
    if (!q) return;

    const total = state.practice.questions.length;
    const current = state.practice.currentIndex + 1;

    document.getElementById('practice-question-counter').textContent = `Soru ${current} / ${total}`;
    document.getElementById('practice-badge-section').textContent = formatSectionName(q.section);
    document.getElementById('practice-badge-topic').textContent = q.topic;
    document.getElementById('practice-badge-diff').textContent = `Zorluk: ${q.difficulty === 1 ? 'Kolay' : q.difficulty === 3 ? 'Zor' : 'Orta'}`;
    document.getElementById('practice-question-stem').innerHTML = escapeHtml(q.stem || q.questionText || '').replace(/\n/g, '<br>');

    const prevBtn = document.getElementById('btn-practice-prev');
    const nextBtn = document.getElementById('btn-practice-next');
    if (prevBtn) prevBtn.disabled = state.practice.currentIndex === 0;
    if (nextBtn) nextBtn.textContent = state.practice.currentIndex === total - 1 ? 'Tamamla' : 'Sonraki';

    const optionsContainer = document.getElementById('practice-options-list');
    optionsContainer.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D', 'E'];
    const chosen = state.practice.userAnswers[q.id];
    const isAnswered = chosen !== undefined;

    q.options.forEach((optText, idx) => {
        const item = document.createElement('div');
        item.className = 'option-item';
        if (isAnswered) item.classList.add('locked');

        if (isAnswered) {
            if (idx === q.answerIndex) item.classList.add('correct');
            else if (idx === chosen) item.classList.add('wrong');
        }

        item.innerHTML = `
            <div class="option-key">${letters[idx]}</div>
            <div class="option-text">${escapeHtml(optText)}</div>
        `;

        if (!isAnswered) {
            item.addEventListener('click', () => {
                state.practice.userAnswers[q.id] = idx;
                const isCorrect = idx === q.answerIndex;

                if (!isCorrect) {
                    db.recordWrongQuestion(q.id);
                    showToast("Yanlış cevap! Çözüm açıklamasını inceleyin.", "error", 2500);
                } else {
                    showToast("Tebrikler, doğru cevap!", "success", 2000);
                }

                renderPracticeQuestion();
            });
        }

        optionsContainer.appendChild(item);
    });

    // Açıklama Kutusu
    const expBox = document.getElementById('practice-explanation-box');
    const expText = document.getElementById('practice-explanation-text');
    if (isAnswered && q.explanation) {
        expBox.style.display = 'block';
        expText.innerHTML = escapeHtml(q.explanation).replace(/\n/g, '<br>');
    } else {
        expBox.style.display = 'none';
    }
}

// ==============================================================================
// 4. TAM DENEME SINAVI SIMULASYONU (140 Soru - 160 Dk)
// ==============================================================================
function initExamMode() {
    const btnStart = document.getElementById('btn-start-mock-exam');
    const btnFinish = document.getElementById('btn-finish-exam');
    const btnPrev = document.getElementById('btn-exam-prev');
    const btnNext = document.getElementById('btn-exam-next');
    const btnFlag = document.getElementById('btn-exam-flag');

    btnStart?.addEventListener('click', () => {
        const mock = db.generateMockExam();
        if (mock.questions.length === 0) {
            showToast("Soru havuzunda soru bulunamadı!", "error");
            return;
        }

        state.exam.questions = mock.questions;
        state.exam.currentIndex = 0;
        state.exam.answers = {};
        state.exam.flagged = new Set();
        state.exam.timeRemainingSeconds = 160 * 60; // 160 dk
        state.exam.startedAt = Date.now();

        // Ekranları değiştir
        document.getElementById('exam-lobby-screen').style.display = 'none';
        document.getElementById('exam-result-screen').style.display = 'none';
        document.getElementById('exam-active-screen').style.display = 'block';

        // Sayaç Başlat
        startExamTimer();

        // İlk soruyu render et
        renderExamQuestion();
        renderExamNavigator();
    });

    btnPrev?.addEventListener('click', () => {
        if (state.exam.currentIndex > 0) {
            state.exam.currentIndex--;
            renderExamQuestion();
        }
    });

    btnNext?.addEventListener('click', () => {
        if (state.exam.currentIndex < state.exam.questions.length - 1) {
            state.exam.currentIndex++;
            renderExamQuestion();
        }
    });

    btnFlag?.addEventListener('click', (e) => {
        const q = state.exam.questions[state.exam.currentIndex];
        if (!q) return;

        if (state.exam.flagged.has(q.id)) {
            state.exam.flagged.delete(q.id);
            e.currentTarget.querySelector('i').className = 'fa-regular fa-bookmark';
        } else {
            state.exam.flagged.add(q.id);
            e.currentTarget.querySelector('i').className = 'fa-solid fa-bookmark text-accent';
        }
        renderExamNavigator();
    });

    btnFinish?.addEventListener('click', () => {
        showConfirmModal({
            title: 'Sınavı Teslim Etmek İstiyor musunuz?',
            message: 'Sınavı sonlandırıp baraj ve başarı puanınızı görmek üzeresiniz.',
            confirmText: 'Evet, Teslim Et',
            cancelText: 'Sınava Devam Et',
            isDanger: false,
            onConfirm: finishExam
        });
    });
}

function startExamTimer() {
    if (state.exam.timerInterval) clearInterval(state.exam.timerInterval);

    const timerEl = document.getElementById('exam-timer-display');

    state.exam.timerInterval = setInterval(() => {
        state.exam.timeRemainingSeconds--;

        const mins = Math.floor(state.exam.timeRemainingSeconds / 60);
        const secs = state.exam.timeRemainingSeconds % 60;
        timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        if (state.exam.timeRemainingSeconds <= 0) {
            clearInterval(state.exam.timerInterval);
            state.exam.timerInterval = null;
            showToast("Süre doldu! Sınavınız otomatik olarak teslim ediliyor.", "warning", 4000);
            finishExam();
        }
    }, 1000);
}

function renderExamQuestion() {
    const q = state.exam.questions[state.exam.currentIndex];
    if (!q) return;

    const total = state.exam.questions.length;
    const current = state.exam.currentIndex + 1;

    document.getElementById('exam-question-counter').textContent = `Soru ${current} / ${total}`;
    document.getElementById('exam-badge-section').textContent = formatSectionName(q.section);
    document.getElementById('exam-badge-topic').textContent = q.topic;
    document.getElementById('exam-question-stem').innerHTML = escapeHtml(q.stem || q.questionText || '').replace(/\n/g, '<br>');

    // Bayrak ikonu kontrolü
    const flagBtn = document.getElementById('btn-exam-flag');
    if (flagBtn) {
        flagBtn.querySelector('i').className = state.exam.flagged.has(q.id) 
            ? 'fa-solid fa-bookmark text-accent' 
            : 'fa-regular fa-bookmark';
    }

    const prevBtn = document.getElementById('btn-exam-prev');
    const nextBtn = document.getElementById('btn-exam-next');
    if (prevBtn) prevBtn.disabled = state.exam.currentIndex === 0;
    if (nextBtn) nextBtn.disabled = state.exam.currentIndex === total - 1;

    // Şıklar (Sınav modunda doğru/yanlış anında gösterilmez!)
    const optionsContainer = document.getElementById('exam-options-list');
    optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const chosen = state.exam.answers[q.id];

    q.options.forEach((optText, idx) => {
        const item = document.createElement('div');
        item.className = 'option-item';
        if (chosen === idx) item.classList.add('selected');

        item.innerHTML = `
            <div class="option-key">${letters[idx]}</div>
            <div class="option-text">${escapeHtml(optText)}</div>
        `;

        item.addEventListener('click', () => {
            state.exam.answers[q.id] = idx;
            renderExamQuestion();
            renderExamNavigator();
            updateExamAnsweredCount();
        });

        optionsContainer.appendChild(item);
    });
}

function updateExamAnsweredCount() {
    const answeredCount = Object.keys(state.exam.answers).length;
    const total = state.exam.questions.length;
    const statEl = document.getElementById('exam-answered-stat');
    if (statEl) statEl.textContent = `${answeredCount} / ${total} Cevaplandı`;
}

function renderExamNavigator() {
    const grid = document.getElementById('exam-navigator-grid');
    if (!grid) return;
    grid.innerHTML = '';

    state.exam.questions.forEach((q, idx) => {
        const sq = document.createElement('div');
        sq.className = 'nav-sq';
        sq.textContent = idx + 1;

        if (idx === state.exam.currentIndex) sq.classList.add('active');
        if (state.exam.answers[q.id] !== undefined) sq.classList.add('answered');
        if (state.exam.flagged.has(q.id)) sq.classList.add('flagged');

        sq.addEventListener('click', () => {
            state.exam.currentIndex = idx;
            renderExamQuestion();
            renderExamNavigator();
        });

        grid.appendChild(sq);
    });
}

async function finishExam() {
    if (state.exam.timerInterval) {
        clearInterval(state.exam.timerInterval);
        state.exam.timerInterval = null;
    }

    // Cevapları topla
    const answersList = state.exam.questions.map(q => ({
        questionId: q.id,
        chosen: state.exam.answers[q.id] !== undefined ? state.exam.answers[q.id] : null
    }));

    // Resmi baraj değerlendirmesini çalıştır
    const evalResult = db.evaluateExamResult(answersList);

    // Kayıt oluştur
    const attemptRecord = {
        id: crypto.randomUUID(),
        mode: 'exam',
        startedAt: state.exam.startedAt,
        finishedAt: Date.now(),
        durationSeconds: (160 * 60) - state.exam.timeRemainingSeconds,
        totalQuestions: state.exam.questions.length,
        totalCorrect: evalResult.totalCorrect,
        totalWrong: evalResult.totalWrong,
        totalEmpty: evalResult.totalEmpty,
        totalScore: evalResult.totalScore,
        gyGkCorrect: evalResult.gyGk.correct,
        gyGkWrong: evalResult.gyGk.wrong,
        gyGkPassed: evalResult.gyGk.passed,
        englishCorrect: evalResult.english.correct,
        englishWrong: evalResult.english.wrong,
        englishPassed: evalResult.english.passed,
        alanCorrect: evalResult.alan.correct,
        alanWrong: evalResult.alan.wrong,
        alanPassed: evalResult.alan.passed,
        isAllPassed: evalResult.isAllPassed,
        answers: answersList
    };

    await db.saveAttempt(attemptRecord);

    // Sonuç Ekranını Göster
    document.getElementById('exam-active-screen').style.display = 'none';
    document.getElementById('exam-result-screen').style.display = 'block';

    renderExamResults(evalResult);
}

function renderExamResults(evalResult) {
    const banner = document.getElementById('exam-verdict-banner');
    if (evalResult.isAllPassed) {
        banner.className = 'verdict-banner passed';
        banner.innerHTML = `
            <h2>🎉 TEBRİKLER! TÜM BARAJLARI GEÇTİNİZ</h2>
            <p>1. ve 2. Bölüm (%60) ve Alan Bölümü (%50) baraj şartlarını sağladınız. Tahmini Puan: <strong>${evalResult.totalScore} / 100</strong></p>
        `;
    } else {
        banner.className = 'verdict-banner failed';
        banner.innerHTML = `
            <h2>⚠️ DİKKAT: BARAJ ŞARTINA TAKILDINIZ</h2>
            <p>Mülakata çağrılabilmek için 3 bölümün her birinde barajı geçmeniz zorunludur. Tahmini Puan: <strong>${evalResult.totalScore} / 100</strong></p>
        `;
    }

    // 1. Bölüm Kartı
    const cardGYGK = document.getElementById('card-thresh-gygk');
    const badgeGYGK = document.getElementById('badge-thresh-gygk');
    const scoreGYGK = document.getElementById('score-thresh-gygk');
    const diffGYGK = document.getElementById('diff-thresh-gygk');
    cardGYGK.className = `threshold-card ${evalResult.gyGk.passed ? 'passed' : 'failed'}`;
    badgeGYGK.className = `badge ${evalResult.gyGk.passed ? 'badge-success' : 'badge-danger'}`;
    badgeGYGK.textContent = evalResult.gyGk.passed ? 'Geçti' : 'Kaldı';
    scoreGYGK.textContent = `${evalResult.gyGk.correct} Doğru`;
    diffGYGK.textContent = evalResult.gyGk.diff >= 0 
        ? `Barajdan +${evalResult.gyGk.diff} soru fazla` 
        : `Baraj için ${Math.abs(evalResult.gyGk.diff)} doğru eksik!`;

    // 2. Bölüm Kartı
    const cardEng = document.getElementById('card-thresh-eng');
    const badgeEng = document.getElementById('badge-thresh-eng');
    const scoreEng = document.getElementById('score-thresh-eng');
    const diffEng = document.getElementById('diff-thresh-eng');
    cardEng.className = `threshold-card ${evalResult.english.passed ? 'passed' : 'failed'}`;
    badgeEng.className = `badge ${evalResult.english.passed ? 'badge-success' : 'badge-danger'}`;
    badgeEng.textContent = evalResult.english.passed ? 'Geçti' : 'Kaldı';
    scoreEng.textContent = `${evalResult.english.correct} Doğru`;
    diffEng.textContent = evalResult.english.diff >= 0 
        ? `Barajdan +${evalResult.english.diff} soru fazla` 
        : `Baraj için ${Math.abs(evalResult.english.diff)} doğru eksik!`;

    // 3. Bölüm Kartı
    const cardAlan = document.getElementById('card-thresh-alan');
    const badgeAlan = document.getElementById('badge-thresh-alan');
    const scoreAlan = document.getElementById('score-thresh-alan');
    const diffAlan = document.getElementById('diff-thresh-alan');
    cardAlan.className = `threshold-card ${evalResult.alan.passed ? 'passed' : 'failed'}`;
    badgeAlan.className = `badge ${evalResult.alan.passed ? 'badge-success' : 'badge-danger'}`;
    badgeAlan.textContent = evalResult.alan.passed ? 'Geçti' : 'Kaldı';
    scoreAlan.textContent = `${evalResult.alan.correct} Doğru`;
    diffAlan.textContent = evalResult.alan.diff >= 0 
        ? `Barajdan +${evalResult.alan.diff} soru fazla` 
        : `Baraj için ${Math.abs(evalResult.alan.diff)} doğru eksik!`;
}

// ==============================================================================
// 5. FLASHCARDS (KAVRAM VE KELİME KARTLARI)
// ==============================================================================
function initFlashcardsMode() {
    const cardEl = document.getElementById('active-flashcard');
    const btnKnown = document.getElementById('btn-fc-known');
    const btnAgain = document.getElementById('btn-fc-again');
    const filterBtns = document.querySelectorAll('[data-fc-filter]');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            state.flashcards.category = e.currentTarget.getAttribute('data-fc-filter');
            state.flashcards.currentIndex = 0;
            renderFlashcard();
        });
    });

    // 3D Çevirme Animasyonu
    cardEl?.addEventListener('click', () => {
        cardEl.classList.toggle('is-flipped');
    });

    btnKnown?.addEventListener('click', (e) => {
        e.stopPropagation();
        handleFlashcardReview('known');
    });

    btnAgain?.addEventListener('click', (e) => {
        e.stopPropagation();
        handleFlashcardReview('again');
    });

    document.addEventListener('view-flashcards-loaded', () => {
        state.flashcards.cards = db.getFlashcards(state.flashcards.category);
        renderFlashcard();
    });
}

function renderFlashcard() {
    const cards = db.getFlashcards(state.flashcards.category);
    const cardEl = document.getElementById('active-flashcard');
    if (!cardEl) return;

    cardEl.classList.remove('is-flipped');

    if (cards.length === 0) {
        document.getElementById('fc-front-text').textContent = 'Bu kategoride kart bulunamadı.';
        document.getElementById('fc-back-text').textContent = '';
        return;
    }

    const card = cards[state.flashcards.currentIndex % cards.length];
    document.getElementById('fc-badge').textContent = card.category.toUpperCase();
    document.getElementById('fc-front-text').textContent = card.front;
    document.getElementById('fc-back-text').textContent = card.back;
}

function handleFlashcardReview(status) {
    const cards = db.getFlashcards(state.flashcards.category);
    if (cards.length === 0) return;

    const card = cards[state.flashcards.currentIndex % cards.length];
    db.saveFlashcardProgress(card.id, status);

    state.flashcards.currentIndex = (state.flashcards.currentIndex + 1) % cards.length;
    renderFlashcard();
}

// ==============================================================================
// 6. YANLIŞ DEFTERİ (LEITNER TEKRAR)
// ==============================================================================
function initReviewMode() {
    document.addEventListener('view-review-loaded', renderReviewList);
}

function renderReviewList() {
    const container = document.getElementById('review-questions-list');
    const badge = document.getElementById('review-total-badge');
    if (!container) return;

    const reviews = db.getReviewQuestions();
    if (badge) badge.textContent = `${reviews.length} Soru Tekrarda`;

    if (reviews.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-circle-check text-emerald" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h4>Tebrikler! Yanlış Defteriniz Boş</h4>
                <p class="text-muted">Denemelerde ve alıştırmalarda hata yaptığınız sorular otomatik olarak buraya eklenecektir.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    reviews.forEach(r => {
        const q = db.getQuestionById(r.questionId);
        if (!q) return;

        const item = document.createElement('div');
        item.className = 'content-card';
        item.style.marginBottom = '1rem';
        item.innerHTML = `
            <div class="card-header">
                <div>
                    <span class="badge badge-indigo">${formatSectionName(q.section)}</span>
                    <span class="badge badge-neutral">${q.topic}</span>
                    <span class="badge badge-danger">${r.wrongCount} Kez Hata Yapıldı</span>
                </div>
                <span class="badge badge-success">Leitner Kutu: ${r.box || 1} / 5</span>
            </div>
            <div class="card-body">
                <p style="font-weight: 600; margin-bottom: 0.75rem;">${escapeHtml(q.stem || q.questionText || '')}</p>
                <div class="info-box" style="margin-top: 0.5rem;">
                    <i class="fa-solid fa-circle-check text-success"></i>
                    <div><strong>Doğru Cevap:</strong> ${escapeHtml(q.options[q.answerIndex])}<br><em>${escapeHtml(q.explanation)}</em></div>
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

// ==============================================================================
// 7. KLAVYE KISAYOLLARI (1-5 ile Şık Seçimi, Sol/Sağ ile Gezinme)
// ==============================================================================
function initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
        // Form alanlarında klavye kısayollarını devre dışı bırak
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

        const isPractice = document.getElementById('practice-view').classList.contains('active');
        const isExam = document.getElementById('exam-active-screen').style.display === 'block';

        if (!isPractice && !isExam) return;

        // Şık seçimi: 1, 2, 3, 4, 5
        if (['1', '2', '3', '4', '5'].includes(e.key)) {
            const index = parseInt(e.key) - 1;
            if (isPractice) {
                const q = state.practice.questions[state.practice.currentIndex];
                if (q && state.practice.userAnswers[q.id] === undefined) {
                    state.practice.userAnswers[q.id] = index;
                    renderPracticeQuestion();
                }
            } else if (isExam) {
                const q = state.exam.questions[state.exam.currentIndex];
                if (q) {
                    state.exam.answers[q.id] = index;
                    renderExamQuestion();
                    renderExamNavigator();
                    updateExamAnsweredCount();
                }
            }
        }

        // Sol / Sağ ok tuşları
        if (e.key === 'ArrowLeft') {
            if (isPractice) document.getElementById('btn-practice-prev')?.click();
            if (isExam) document.getElementById('btn-exam-prev')?.click();
        } else if (e.key === 'ArrowRight') {
            if (isPractice) document.getElementById('btn-practice-next')?.click();
            if (isExam) document.getElementById('btn-exam-next')?.click();
        }
    });
}

// ==============================================================================
// 8. PROFİL VE HEDEFLER
// ==============================================================================
function initProfileForm() {
    const profileForm = document.getElementById('profile-form');
    profileForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast("Profil ve sınav ayarları başarıyla kaydedildi!", "success");
    });
}

// Yardımcı HTML Escape
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Yardımcı Bölüm Başlığı Biçimlendirici
function formatSectionName(sec) {
    const map = {
        'bankacilik-genel-kultur': '1. Bölüm: Bankacılık & GK',
        'genel-kultur': '1. Bölüm: Bankacılık & GK',
        'oruntu-analitik': '1. Bölüm: Örüntü & Analitik',
        'genel-yetenek': '1. Bölüm: Genel Yetenek',
        'ingilizce': '2. Bölüm: İngilizce',
        'alan': '3. Bölüm: Bilgisayar Müh.'
    };
    return map[sec] || (sec ? sec.toUpperCase() : 'BÖLÜM');
}
