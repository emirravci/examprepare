// ==============================================================================
// İNGİLİZCE AKADEMİ & 24+ BARAJ GARANTİLEME MODÜLÜ (ENGLISH MASTER)
// 18 Özel Sınav Konusu, Karşılaştırma Tabloları, Şık Eleme Taktikleri & 5'er Soruluk Testler
// ==============================================================================

import { englishFormulas } from './english_formulas.js';

class EnglishMasterManager {
    constructor() {
        this.topics = [];
        this.activeTopicId = "eng-topic-01";
        this.activeTab = "lecture"; // "lecture", "tactics", "quiz"
        this.activeViewMode = "curriculum"; // "curriculum" or "formulas"
        this.progress = this.loadProgress();
        this.quizState = {}; // { [topicId]: { userAnswers: { [qId]: selectedIndex }, submitted: boolean, score: number } }
        this.searchQuery = "";
        this.filterStatus = "all"; // "all", "completed", "incomplete"
        this.isLoaded = false;
    }

    loadProgress() {
        try {
            return JSON.parse(localStorage.getItem('ziraat_english_master_progress') || '{}');
        } catch {
            return {};
        }
    }

    saveProgress() {
        try {
            localStorage.setItem('ziraat_english_master_progress', JSON.stringify(this.progress));
        } catch (e) {
            console.warn("[EnglishMaster] Progress save error:", e);
        }
    }

    async init() {
        if (!this.isLoaded) {
            try {
                const res = await fetch('./data/english_master_topics.json');
                this.topics = await res.json();
                this.isLoaded = true;
            } catch (err) {
                console.error("[EnglishMaster] Konu verisi yüklenemedi:", err);
                return;
            }
        }

        // İlk seçili konuyu ayarla (varsa en son kaldığı veya ilk konu)
        const lastActive = localStorage.getItem('ziraat_english_master_last_topic');
        if (lastActive && this.topics.some(t => t.id === lastActive)) {
            this.activeTopicId = lastActive;
        } else if (this.topics.length > 0) {
            this.activeTopicId = this.topics[0].id;
        // Mod tercihini kontrol et (varsa son kalınan)
        const savedMode = localStorage.getItem('ziraat_english_view_mode');
        if (savedMode === 'formulas' || savedMode === 'curriculum') {
            this.activeViewMode = savedMode;
        }

        this.bindEvents();
        this.render();
        this.switchViewMode(this.activeViewMode);
    }

    bindEvents() {
        // Arama kutusu
        const searchInput = document.getElementById('eng-topic-search');
        if (searchInput) {
            searchInput.oninput = (e) => {
                this.searchQuery = e.target.value.trim().toLowerCase();
                this.renderTopicList();
            };
        }

        // Filtreleme butonları (Tümü / Tamamlananlar / Kalanlar)
        const filterBtns = document.querySelectorAll('[data-eng-filter]');
        filterBtns.forEach(btn => {
            btn.onclick = (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterStatus = btn.getAttribute('data-eng-filter');
                this.renderTopicList();
            };
        });

        // Mod Geçiş Butonları (18 Konu vs Formüller & Mantık Eğitmeni)
        const modeBtns = document.querySelectorAll('[data-eng-view-mode]');
        modeBtns.forEach(btn => {
            btn.onclick = () => {
                const mode = btn.getAttribute('data-eng-view-mode');
                this.switchViewMode(mode);
            };
        });
    }

    switchViewMode(mode) {
        this.activeViewMode = mode;
        try {
            localStorage.setItem('ziraat_english_view_mode', mode);
        } catch (e) {}

        const curriculumContainer = document.getElementById('eng-curriculum-container');
        const formulasContainer = document.getElementById('eng-formulas-container');
        const modeBtns = document.querySelectorAll('[data-eng-view-mode]');

        modeBtns.forEach(b => {
            if (b.getAttribute('data-eng-view-mode') === mode) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });

        if (mode === 'formulas') {
            if (curriculumContainer) curriculumContainer.style.display = 'none';
            if (formulasContainer) {
                formulasContainer.style.display = 'block';
                englishFormulas.init();
            }
        } else {
            if (curriculumContainer) curriculumContainer.style.display = 'block';
            if (formulasContainer) formulasContainer.style.display = 'none';
        }
    }

    getActiveTopic() {
        return this.topics.find(t => t.id === this.activeTopicId) || this.topics[0];
    }

    selectTopic(topicId) {
        this.activeTopicId = topicId;
        localStorage.setItem('ziraat_english_master_last_topic', topicId);
        this.activeTab = "lecture"; // Yeni konuya geçince ders notundan başla
        this.render();
        
        // Mobil / küçük ekranda detaya kaydır
        const contentPane = document.getElementById('eng-workspace-main');
        if (contentPane && window.innerWidth < 992) {
            contentPane.scrollIntoView({ behavior: 'smooth' });
        }
    }

    switchTab(tabName) {
        this.activeTab = tabName;
        this.renderActiveTopicContent();
    }

    render() {
        this.updateGlobalStats();
        this.renderTopicList();
        this.renderActiveTopicContent();
    }

    updateGlobalStats() {
        const total = this.topics.length;
        const completedCount = Object.values(this.progress).filter(p => p.completed).length;
        const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

        const countEl = document.getElementById('eng-stat-completed-count');
        const percentEl = document.getElementById('eng-stat-percent');
        const progressBar = document.getElementById('eng-global-progress-bar');
        const remainingEl = document.getElementById('eng-stat-remaining');

        if (countEl) countEl.textContent = `${completedCount} / ${total} Konu`;
        if (percentEl) percentEl.textContent = `%${percent}`;
        if (progressBar) progressBar.style.width = `${percent}%`;
        if (remainingEl) remainingEl.textContent = `${total - completedCount} Konu Kaldı`;
    }

    renderTopicList() {
        const container = document.getElementById('eng-topic-list-container');
        if (!container) return;

        let filtered = this.topics.filter(t => {
            const matchesQuery = !this.searchQuery || 
                t.title.toLowerCase().includes(this.searchQuery) ||
                t.subtitle.toLowerCase().includes(this.searchQuery) ||
                t.summary.toLowerCase().includes(this.searchQuery);

            if (!matchesQuery) return false;

            const isDone = Boolean(this.progress[t.id]?.completed);
            if (this.filterStatus === 'completed') return isDone;
            if (this.filterStatus === 'incomplete') return !isDone;
            return true;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="padding: 1.5rem; text-align: center;">
                    <i class="fa-solid fa-magnifying-glass text-muted" style="font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
                    <p class="text-muted" style="font-size: 0.85rem;">Kriterlere uygun konu bulunamadı.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(t => {
            const isActive = t.id === this.activeTopicId;
            const userProg = this.progress[t.id] || {};
            const isCompleted = Boolean(userProg.completed);
            const score = userProg.score;

            let badgeHtml = '';
            if (isCompleted) {
                badgeHtml = `<span class="badge badge-success" style="font-size: 0.7rem;"><i class="fa-solid fa-check"></i> Tamamlandı (${score}/5)</span>`;
            } else if (score !== undefined) {
                badgeHtml = `<span class="badge badge-amber" style="font-size: 0.7rem;"><i class="fa-solid fa-rotate-left"></i> ${score}/5 Skor</span>`;
            } else {
                badgeHtml = `<span class="badge badge-neutral" style="font-size: 0.7rem;">Başlanmadı</span>`;
            }

            return `
                <div class="eng-topic-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
                     data-topic-id="${t.id}" onclick="window.englishMaster.selectTopic('${t.id}')">
                    <div class="eng-topic-number">${String(t.number).padStart(2, '0')}</div>
                    <div class="eng-topic-info">
                        <div class="eng-topic-title-row">
                            <span class="eng-topic-name"><i class="fa-solid ${t.icon} text-indigo" style="margin-right: 4px;"></i> ${t.title}</span>
                            ${badgeHtml}
                        </div>
                        <span class="eng-topic-sub text-muted">${t.subtitle}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderActiveTopicContent() {
        const topic = this.getActiveTopic();
        if (!topic) return;

        const currentIdx = this.topics.findIndex(t => t.id === topic.id);
        const prevTopic = currentIdx > 0 ? this.topics[currentIdx - 1] : null;
        const nextTopic = currentIdx < this.topics.length - 1 ? this.topics[currentIdx + 1] : null;

        const userProg = this.progress[topic.id] || {};
        const isCompleted = Boolean(userProg.completed);

        // Header Title & Meta
        const headerContainer = document.getElementById('eng-active-header');
        if (headerContainer) {
            headerContainer.innerHTML = `
                <div class="eng-active-meta">
                    <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                        <span class="badge badge-indigo">KONU ${topic.number} / 18</span>
                        ${isCompleted ? '<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Tamamlandı & Öğrenildi</span>' : '<span class="badge badge-amber"><i class="fa-solid fa-hourglass-half"></i> Çalışma Aşamasında</span>'}
                    </div>
                    <h2 class="eng-active-title"><i class="fa-solid ${topic.icon} text-accent" style="margin-right: 0.5rem;"></i>${topic.title}</h2>
                    <p class="eng-active-subtitle text-muted">${topic.subtitle}</p>
                </div>
                <div class="eng-active-nav-btns">
                    ${prevTopic ? `
                        <button class="btn btn-secondary btn-sm" onclick="window.englishMaster.selectTopic('${prevTopic.id}')" title="${prevTopic.title}">
                            <i class="fa-solid fa-arrow-left"></i> Önceki Konu
                        </button>
                    ` : '<button class="btn btn-secondary btn-sm" disabled style="opacity: 0.4;"><i class="fa-solid fa-arrow-left"></i> İlk Konu</button>'}
                    
                    ${nextTopic ? `
                        <button class="btn btn-primary btn-sm" onclick="window.englishMaster.selectTopic('${nextTopic.id}')" title="${nextTopic.title}">
                            Sonraki Konu <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    ` : '<button class="btn btn-secondary btn-sm" disabled style="opacity: 0.4;">Son Konu <i class="fa-solid fa-flag-checkered"></i></button>'}
                </div>
            `;
        }

        // Tab Navigation Bar
        const tabsContainer = document.getElementById('eng-active-tabs-bar');
        if (tabsContainer) {
            tabsContainer.innerHTML = `
                <button class="eng-tab-btn ${this.activeTab === 'lecture' ? 'active' : ''}" onclick="window.englishMaster.switchTab('lecture')">
                    <i class="fa-solid fa-book-open"></i> 1. Ders Notu & Tablolar
                </button>
                <button class="eng-tab-btn ${this.activeTab === 'tactics' ? 'active' : ''}" onclick="window.englishMaster.switchTab('tactics')">
                    <i class="fa-solid fa-bullseye"></i> 2. Şık Eleme Taktikleri & Örnekler
                </button>
                <button class="eng-tab-btn ${this.activeTab === 'quiz' ? 'active' : ''}" onclick="window.englishMaster.switchTab('quiz')">
                    <i class="fa-solid fa-circle-question"></i> 3. 5 Soruluk Mini Test
                    ${userProg.score !== undefined ? `<span class="badge badge-accent" style="margin-left: 6px; font-size: 0.7rem;">${userProg.score}/5</span>` : ''}
                </button>
            `;
        }

        // Tab Content Pane
        const paneContainer = document.getElementById('eng-tab-pane-container');
        if (!paneContainer) return;

        if (this.activeTab === 'lecture') {
            paneContainer.innerHTML = this.renderLectureTab(topic);
        } else if (this.activeTab === 'tactics') {
            paneContainer.innerHTML = this.renderTacticsTab(topic);
        } else if (this.activeTab === 'quiz') {
            paneContainer.innerHTML = this.renderQuizTab(topic);
        }
    }

    renderLectureTab(topic) {
        // Summary callout
        const summaryHtml = `
            <div class="eng-summary-card">
                <div class="eng-summary-icon"><i class="fa-solid fa-lightbulb"></i></div>
                <div class="eng-summary-text">
                    <strong>Hızlı Özet & Sınav Mantığı:</strong>
                    <p style="margin: 0.25rem 0 0; color: #cbd5e1;">${topic.summary}</p>
                </div>
            </div>
        `;

        // Theory sections
        const theoryHtml = topic.theory.map(sec => `
            <div class="eng-theory-card">
                <h4 class="eng-theory-heading"><i class="fa-solid fa-angle-right text-indigo"></i> ${sec.heading}</h4>
                <div class="eng-theory-body">
                    ${this.formatMarkdownText(sec.content)}
                </div>
            </div>
        `).join('');

        // Tables
        const tablesHtml = (topic.tables || []).map(tbl => `
            <div class="eng-table-card">
                <h4 class="eng-table-title"><i class="fa-solid fa-table text-indigo"></i> ${tbl.title}</h4>
                <div class="table-responsive">
                    <table class="eng-comparison-table">
                        <thead>
                            <tr>
                                ${tbl.headers.map(h => `<th>${h}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${tbl.rows.map(row => `
                                <tr>
                                    ${row.map((cell, idx) => `<td class="${idx === 0 ? 'font-semibold text-accent' : ''}">${cell}</td>`).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `).join('');

        return `
            <div class="eng-tab-content-fade">
                ${summaryHtml}
                ${theoryHtml}
                ${tablesHtml}
                <div class="eng-tab-footer-actions">
                    <button class="btn btn-primary" onclick="window.englishMaster.switchTab('tactics')">
                        Şık Eleme Taktiklerine Geç <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderTacticsTab(topic) {
        // Tactics cards
        const tacticsHtml = (topic.tactics || []).map((tac, i) => `
            <div class="eng-tactic-card">
                <div class="eng-tactic-header">
                    <span class="eng-tactic-badge"><i class="fa-solid fa-crosshairs"></i> FORMÜL ${i + 1}</span>
                </div>
                <div class="eng-tactic-body">
                    ${this.formatMarkdownText(tac)}
                </div>
            </div>
        `).join('');

        // Real Exam Example Sentences
        const examplesHtml = (topic.examples || []).map((ex, i) => `
            <div class="eng-example-card">
                <div class="eng-example-en">
                    <i class="fa-solid fa-quote-left text-indigo" style="margin-right: 0.5rem; opacity: 0.6;"></i>
                    <strong>${ex.en}</strong>
                </div>
                <div class="eng-example-tr text-muted">
                    <i class="fa-solid fa-arrow-right-arrow-left text-muted" style="margin-right: 0.4rem; font-size: 0.8rem;"></i>
                    ${ex.tr}
                </div>
                <div class="eng-example-clue">
                    <i class="fa-solid fa-key text-amber"></i> <strong>Soru Çözüm İpucu:</strong> ${ex.clue}
                </div>
            </div>
        `).join('');

        return `
            <div class="eng-tab-content-fade">
                <div class="eng-section-heading-row">
                    <h3><i class="fa-solid fa-bolt text-amber"></i> Boşluk Doldurma ve Şık Eleme Sırları</h3>
                    <p class="text-muted">Bu kuralları formül gibi ezberlediğinizde sorularda 2-3 şıkkı ilk 5 saniyede elersiniz.</p>
                </div>
                <div class="eng-tactics-grid">
                    ${tacticsHtml}
                </div>

                <div class="eng-section-heading-row" style="margin-top: 2rem;">
                    <h3><i class="fa-solid fa-graduation-cap text-indigo"></i> Sınav Formatında Örnek Cümle Analizi</h3>
                    <p class="text-muted">Banka ve finans metinlerinde bu kuralların gerçek sınav tarzı kullanımları:</p>
                </div>
                <div class="eng-examples-grid">
                    ${examplesHtml}
                </div>

                <div class="eng-tab-footer-actions">
                    <button class="btn btn-secondary" onclick="window.englishMaster.switchTab('lecture')">
                        <i class="fa-solid fa-arrow-left"></i> Konu Notuna Dön
                    </button>
                    <button class="btn btn-primary" onclick="window.englishMaster.switchTab('quiz')">
                        5 Soruluk Mini Teste Başla <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderQuizTab(topic) {
        const quizList = topic.quiz || [];
        const state = this.quizState[topic.id] || { userAnswers: {}, submitted: false, score: 0 };
        const userProg = this.progress[topic.id] || {};

        const answeredCount = Object.keys(state.userAnswers).length;
        const totalCount = quizList.length;

        const questionsHtml = quizList.map((q, idx) => {
            const chosen = state.userAnswers[q.id];
            const isAnswered = chosen !== undefined;
            const isCorrect = chosen === q.answerIndex;

            const letters = ['A', 'B', 'C', 'D', 'E'];

            const optionsHtml = q.options.map((opt, optIdx) => {
                let optClass = 'eng-quiz-option';
                let iconHtml = `<span class="eng-opt-letter">${letters[optIdx]}</span>`;

                if (isAnswered) {
                    if (optIdx === q.answerIndex) {
                        optClass += ' correct';
                        iconHtml = `<span class="eng-opt-letter correct"><i class="fa-solid fa-check"></i></span>`;
                    } else if (optIdx === chosen) {
                        optClass += ' wrong';
                        iconHtml = `<span class="eng-opt-letter wrong"><i class="fa-solid fa-xmark"></i></span>`;
                    } else {
                        optClass += ' disabled';
                    }
                }

                return `
                    <div class="${optClass}" onclick="window.englishMaster.selectAnswer('${topic.id}', '${q.id}', ${optIdx})">
                        ${iconHtml}
                        <span class="eng-opt-text">${opt}</span>
                    </div>
                `;
            }).join('');

            let feedbackBox = '';
            if (isAnswered) {
                feedbackBox = `
                    <div class="eng-quiz-feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}">
                        <div class="feedback-title">
                            ${isCorrect ? '<i class="fa-solid fa-circle-check text-success"></i> Tebrikler, Doğru Cevap!' : '<i class="fa-solid fa-circle-xmark text-danger"></i> Yanlış Cevap!'}
                            <span class="badge badge-neutral" style="font-size: 0.72rem; margin-left: auto;">${q.ruleTag || 'Kural Analizi'}</span>
                        </div>
                        <div class="feedback-body">
                            <strong>Açıklama & Eleme Mantığı:</strong> ${q.explanation}
                        </div>
                    </div>
                `;
            }

            const diffBadges = [
                '',
                '<span class="badge badge-success" style="font-size: 0.68rem;">⭐ Temel Düzey</span>',
                '<span class="badge badge-indigo" style="font-size: 0.68rem;">⭐⭐ Orta Düzey (Sınav Formatı)</span>',
                '<span class="badge badge-danger" style="font-size: 0.68rem;">⭐⭐⭐ İleri / Tuzak Soru</span>'
            ];

            return `
                <div class="eng-quiz-card" id="card-${q.id}">
                    <div class="eng-quiz-header">
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <span class="eng-q-badge">Soru ${idx + 1} / 5</span>
                            ${diffBadges[q.difficulty || 2]}
                        </div>
                        <span class="badge badge-neutral" style="font-size: 0.7rem;">${q.ruleTag || topic.title}</span>
                    </div>

                    <div class="eng-quiz-stem">
                        ${q.stem}
                    </div>

                    <div class="eng-quiz-options-list">
                        ${optionsHtml}
                    </div>

                    ${feedbackBox}
                </div>
            `;
        }).join('');

        // Score Card at Bottom if all 5 answered
        let scoreCardHtml = '';
        if (answeredCount === totalCount) {
            // calculate score
            let correctCount = 0;
            quizList.forEach(q => {
                if (state.userAnswers[q.id] === q.answerIndex) correctCount++;
            });
            const isPassing = correctCount >= 3; // 3/5 (%60 barajı)

            scoreCardHtml = `
                <div class="eng-quiz-result-card ${isPassing ? 'result-passed' : 'result-failed'}">
                    <div class="result-header">
                        <div class="result-icon">
                            ${isPassing ? '<i class="fa-solid fa-award text-success" style="font-size: 2.2rem;"></i>' : '<i class="fa-solid fa-triangle-exclamation text-amber" style="font-size: 2.2rem;"></i>'}
                        </div>
                        <div class="result-title-wrap">
                            <h3>${isPassing ? 'Tebrikler! Konu Kazanım Testini Başarıyla Tamamladınız.' : 'Tekrar Gerekli: Barajın Altında Kaldınız'}</h3>
                            <p class="text-muted">
                                Toplam Skorunuz: <strong>${correctCount} / 5 Doğru</strong> (%${correctCount * 20})
                                ${isPassing ? '— Ziraat %60 barajını aştınız.' : '— Konuyu tam kavramak için en az 3 doğru gereklidir.'}
                            </p>
                        </div>
                    </div>

                    <div class="result-actions">
                        <button class="btn btn-secondary btn-sm" onclick="window.englishMaster.retryQuiz('${topic.id}')">
                            <i class="fa-solid fa-rotate-left"></i> Testi Yeniden Çöz
                        </button>
                        ${isPassing ? `
                            <button class="btn btn-success" onclick="window.englishMaster.completeTopic('${topic.id}', ${correctCount})">
                                <i class="fa-solid fa-check-double"></i> Konuyu Tamamla & Sonraki Konuya Geç
                            </button>
                        ` : `
                            <button class="btn btn-secondary btn-sm" onclick="window.englishMaster.switchTab('tactics')">
                                <i class="fa-solid fa-lightbulb"></i> Taktikleri Tekrar İncele
                            </button>
                        `}
                    </div>
                </div>
            `;
        }

        return `
            <div class="eng-tab-content-fade">
                <div class="eng-quiz-status-bar">
                    <div>
                        <h3 style="margin: 0; font-size: 1.1rem;"><i class="fa-solid fa-circle-check text-indigo"></i> 5 Soruluk Konu Kavrama Testi</h3>
                        <p class="text-muted" style="margin: 0.2rem 0 0; font-size: 0.85rem;">Şıkkınızı seçin; anında doğru/yanlış analizini ve şık eleme gerekçesini görün.</p>
                    </div>
                    <div class="eng-quiz-score-badge">
                        <span>Cevaplanan: <strong>${answeredCount} / ${totalCount}</strong></span>
                    </div>
                </div>

                <div class="eng-quiz-list">
                    ${questionsHtml}
                </div>

                ${scoreCardHtml}
            </div>
        `;
    }

    selectAnswer(topicId, questionId, chosenIndex) {
        if (!this.quizState[topicId]) {
            this.quizState[topicId] = { userAnswers: {}, submitted: false, score: 0 };
        }
        const state = this.quizState[topicId];
        
        // Zaten cevaplanmışsa tekrar seçilemesin
        if (state.userAnswers[questionId] !== undefined) return;

        state.userAnswers[questionId] = chosenIndex;

        // Tüm sorular cevaplandıysa skoru kaydet
        const topic = this.topics.find(t => t.id === topicId);
        if (topic && Object.keys(state.userAnswers).length === topic.quiz.length) {
            let correctCount = 0;
            topic.quiz.forEach(q => {
                if (state.userAnswers[q.id] === q.answerIndex) correctCount++;
            });
            state.score = correctCount;

            // Otomatik ilerlemeye kaydet
            if (!this.progress[topicId]) this.progress[topicId] = {};
            this.progress[topicId].score = correctCount;
            if (correctCount >= 3) {
                this.progress[topicId].completed = true;
            }
            this.progress[topicId].lastDate = new Date().toISOString();
            this.saveProgress();
            this.updateGlobalStats();
            this.renderTopicList();
        }

        this.renderActiveTopicContent();
    }

    retryQuiz(topicId) {
        if (this.quizState[topicId]) {
            this.quizState[topicId] = { userAnswers: {}, submitted: false, score: 0 };
        }
        this.renderActiveTopicContent();
    }

    completeTopic(topicId, score) {
        if (!this.progress[topicId]) this.progress[topicId] = {};
        this.progress[topicId].completed = true;
        this.progress[topicId].score = score;
        this.progress[topicId].lastDate = new Date().toISOString();
        this.saveProgress();

        // Sonraki konuya geçiş yap
        const currentIdx = this.topics.findIndex(t => t.id === topicId);
        if (currentIdx < this.topics.length - 1) {
            const nextTopic = this.topics[currentIdx + 1];
            this.selectTopic(nextTopic.id);
        } else {
            alert("🎉 Tebrikler! 18 konunun tamamını başarıyla tamamladınız. Artık tam deneme sınavlarında 24+ barajı için hazırsınız!");
            this.render();
        }
    }

    formatMarkdownText(text) {
        if (!text) return '';
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code class="eng-inline-code">$1</code>')
            .replace(/\n• /g, '<br>• ')
            .replace(/\n/g, '<br>');
        return html;
    }
}

// Global instance initialization
export const englishMaster = new EnglishMasterManager();
if (typeof window !== 'undefined') {
    window.englishMaster = englishMaster;
}
