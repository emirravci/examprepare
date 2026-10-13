// ==============================================================================
// İNGİLİZCE SINAVI İÇİN MANTIK ODAKLI FORMÜL VE SORU ÇÖZME EĞİTMENİ
// js/english_formulas.js
// 8 Temel Kavram Primers, 8 Adımlı Sınav Algoritması, 32 Kilit Formül Kütüphanesi,
// 10 Adımlı Mantık Dökümleri ve "V1-V2-V3 Mantığı" Başlangıç Dersi
// ==============================================================================

export class EnglishFormulasManager {
    constructor() {
        this.data = null;
        this.activeSubTab = "subtab-primers"; // "subtab-primers", "subtab-algorithm", "subtab-library", "subtab-intro-lesson"
        this.selectedCategory = "all";
        this.searchQuery = "";
        this.isLoaded = false;
        
        // Simülasyon durumu: { [simId]: currentStepIndex }
        this.simState = {};

        // Sınav / Test yanıtları durumu
        this.quizAnswers = this.loadState();
        
        // Aktif detay modal formülü
        this.activeFormulaId = null;
    }

    loadState() {
        try {
            return JSON.parse(localStorage.getItem('ziraat_english_formulas_state') || '{}');
        } catch {
            return {};
        }
    }

    saveState() {
        try {
            localStorage.setItem('ziraat_english_formulas_state', JSON.stringify(this.quizAnswers));
        } catch (e) {
            console.warn("[EnglishFormulas] State save error:", e);
        }
    }

    async init() {
        if (!this.isLoaded) {
            try {
                const res = await fetch('./data/english_formulas.json');
                this.data = await res.json();
                this.isLoaded = true;
            } catch (err) {
                console.error("[EnglishFormulas] Veri yüklenemedi:", err);
                return;
            }
        }

        this.bindEvents();
        this.render();
    }

    bindEvents() {
        // Alt sekme geçişleri
        const subNav = document.getElementById('eng-formulas-subnav');
        if (subNav) {
            subNav.addEventListener('click', (e) => {
                const btn = e.target.closest('[data-eng-subtab]');
                if (btn) {
                    const target = btn.getAttribute('data-eng-subtab');
                    this.setSubTab(target);
                }
            });
        }
    }

    setSubTab(subTabId) {
        this.activeSubTab = subTabId;
        
        // Navigasyon butonlarını güncelle
        const buttons = document.querySelectorAll('#eng-formulas-subnav [data-eng-subtab]');
        buttons.forEach(b => {
            if (b.getAttribute('data-eng-subtab') === subTabId) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });

        this.renderSubTabContent();
    }

    render() {
        const container = document.getElementById('eng-formulas-container');
        if (!container) return;

        // Üst panel yapısını oluştur
        container.innerHTML = `
            <div class="eng-formulas-wrapper">
                <!-- Üst Tanıtım Başlığı -->
                <div class="eng-formulas-header">
                    <div class="eng-formulas-header-content">
                        <div class="eng-badge-pill">
                            <i class="fa-solid fa-brain"></i> Mantık Odaklı Soru Çözme Metodu
                        </div>
                        <h2>İngilizce Sınavı Mantık & Formül Antrenörü</h2>
                        <p>
                            Yalnızca ezber kurallar değil; yapıların <em>neden ve nasıl çalıştığını</em>, Türkçeden farkını,
                            boşluğun öncesi ve sonrasından 8 adımda şık elemeyi ve 32 formülün 10 adımlı mantığını öğren.
                        </p>
                    </div>

                    <!-- 4'lü Alt Sekme Navigasyonu -->
                    <div class="eng-formulas-subnav" id="eng-formulas-subnav">
                        <button class="eng-subtab-btn ${this.activeSubTab === 'subtab-primers' ? 'active' : ''}" data-eng-subtab="subtab-primers">
                            <i class="fa-solid fa-shapes"></i>
                            <span>1. Temel Kavramlar (8)</span>
                        </button>
                        <button class="eng-subtab-btn ${this.activeSubTab === 'subtab-algorithm' ? 'active' : ''}" data-eng-subtab="subtab-algorithm">
                            <i class="fa-solid fa-diagram-project"></i>
                            <span>2. 8 Adımlı Çözüm Algoritması</span>
                        </button>
                        <button class="eng-subtab-btn ${this.activeSubTab === 'subtab-library' ? 'active' : ''}" data-eng-subtab="subtab-library">
                            <i class="fa-solid fa-square-root-variable"></i>
                            <span>3. Formül Kütüphanesi (A-G)</span>
                        </button>
                        <button class="eng-subtab-btn ${this.activeSubTab === 'subtab-intro-lesson' ? 'active' : ''}" data-eng-subtab="subtab-intro-lesson">
                            <i class="fa-solid fa-graduation-cap"></i>
                            <span>4. Başlangıç Dersi: V1-V2-V3</span>
                        </button>
                    </div>
                </div>

                <!-- Dinamik Alt İçerik Alanı -->
                <div class="eng-formulas-main-pane" id="eng-formulas-main-pane">
                    <!-- Dinamik olarak render edilecek -->
                </div>
            </div>

            <!-- Formül 10 Adımlı Detay Modalı -->
            <div class="eng-formula-modal-backdrop" id="eng-formula-modal" style="display: none;">
                <div class="eng-formula-modal-dialog">
                    <div class="eng-formula-modal-header" id="eng-modal-header"></div>
                    <div class="eng-formula-modal-body" id="eng-modal-body"></div>
                </div>
            </div>
        `;

        this.bindEvents();
        this.renderSubTabContent();
    }

    renderSubTabContent() {
        const pane = document.getElementById('eng-formulas-main-pane');
        if (!pane || !this.data) return;

        switch (this.activeSubTab) {
            case 'subtab-primers':
                this.renderPrimers(pane);
                break;
            case 'subtab-algorithm':
                this.renderAlgorithm(pane);
                break;
            case 'subtab-library':
                this.renderLibrary(pane);
                break;
            case 'subtab-intro-lesson':
                this.renderIntroLesson(pane);
                break;
            default:
                this.renderPrimers(pane);
        }
    }

    // =========================================================================
    // 1. TEMEL KAVRAMLAR ATÖLYESİ (PRIMERS)
    // =========================================================================
    renderPrimers(pane) {
        const primers = this.data.primers || [];
        
        pane.innerHTML = `
            <div class="eng-subpane-header">
                <div>
                    <h3>💡 Temel Kavramlar Atölyesi</h3>
                    <p class="text-muted">
                        İngilizceyi sıfırdan ve sağlam temelle anlamak için bilmen gereken 8 yapı taşı. 
                        Ezberlemeden önce mantığını kavra, mini kontrollerle test et.
                    </p>
                </div>
                <div class="eng-primers-stat-badge">
                    <i class="fa-solid fa-layer-group text-primary"></i> 8 Temel Prensip
                </div>
            </div>

            <div class="eng-primers-grid">
                ${primers.map(p => this.renderPrimerCard(p)).join('')}
            </div>
        `;

        // Event listener'ları bağla
        pane.querySelectorAll('[data-primer-check-idx]').forEach(btn => {
            btn.onclick = (e) => {
                const primerId = btn.getAttribute('data-primer-id');
                const optIdx = parseInt(btn.getAttribute('data-primer-check-idx'), 10);
                this.handlePrimerCheck(primerId, optIdx);
            };
        });
    }

    renderPrimerCard(p) {
        const answered = this.quizAnswers[p.id];
        const isCorrect = answered !== undefined && answered === p.quickCheck.correctIndex;

        return `
            <div class="eng-primer-card" id="card-${p.id}">
                <div class="eng-primer-card-top">
                    <div class="eng-primer-icon">
                        <i class="fa-solid ${p.icon}"></i>
                    </div>
                    <div class="eng-primer-meta">
                        <span class="eng-tag-badge">${p.badge}</span>
                        <h4>${p.title}</h4>
                    </div>
                </div>

                <div class="eng-primer-summary">
                    <i class="fa-solid fa-lightbulb text-amber"></i> ${p.summary}
                </div>

                <div class="eng-primer-logic">
                    ${p.logic.replace(/\n/g, '<br>')}
                </div>

                <!-- Parçalar / Tablo -->
                <div class="eng-primer-breakdown">
                    ${p.breakdown.map(b => `
                        <div class="eng-breakdown-row">
                            <span class="eng-breakdown-term">${b.term}</span>
                            <span class="eng-breakdown-desc">${b.desc}</span>
                        </div>
                    `).join('')}
                </div>

                <!-- Mini Kontrol Sorusu -->
                <div class="eng-primer-quiz-box">
                    <div class="eng-quiz-box-title">
                        <i class="fa-solid fa-circle-question"></i> Anında Kontrol Sorusu
                    </div>
                    <div class="eng-quiz-box-question">${p.quickCheck.question}</div>
                    <div class="eng-quiz-box-options">
                        ${p.quickCheck.options.map((opt, idx) => {
                            let btnClass = "eng-opt-btn";
                            if (answered !== undefined) {
                                if (idx === p.quickCheck.correctIndex) btnClass += " correct";
                                else if (idx === answered) btnClass += " wrong";
                            }
                            return `
                                <button class="${btnClass}" 
                                        data-primer-id="${p.id}" 
                                        data-primer-check-idx="${idx}"
                                        ${answered !== undefined ? 'disabled' : ''}>
                                    <span class="opt-indicator">${String.fromCharCode(65 + idx)}</span>
                                    <span>${opt}</span>
                                </button>
                            `;
                        }).join('')}
                    </div>

                    ${answered !== undefined ? `
                        <div class="eng-quiz-feedback ${isCorrect ? 'feedback-success' : 'feedback-error'}">
                            <i class="fa-solid ${isCorrect ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
                            <div>
                                <strong>${isCorrect ? 'Harika! Doğru tespit.' : 'Dikkat!'}</strong> 
                                ${p.quickCheck.explanation}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    handlePrimerCheck(primerId, selectedIdx) {
        this.quizAnswers[primerId] = selectedIdx;
        this.saveState();
        
        // Sadece o kartı güncelle
        const primer = this.data.primers.find(p => p.id === primerId);
        const cardElem = document.getElementById(`card-${primerId}`);
        if (primer && cardElem) {
            cardElem.outerHTML = this.renderPrimerCard(primer);
            
            // Yeni karttaki butonları tekrar dinle
            const updatedCard = document.getElementById(`card-${primerId}`);
            if (updatedCard) {
                updatedCard.querySelectorAll('[data-primer-check-idx]').forEach(btn => {
                    btn.onclick = (e) => {
                        const optIdx = parseInt(btn.getAttribute('data-primer-check-idx'), 10);
                        this.handlePrimerCheck(primerId, optIdx);
                    };
                });
            }
        }
    }

    // =========================================================================
    // 2. 8 ADIMLI SINAV SORUSU ÇÖZME ALGORİTMASI
    // =========================================================================
    renderAlgorithm(pane) {
        const algo = this.data.algorithm;
        if (!algo) return;

        pane.innerHTML = `
            <div class="eng-subpane-header">
                <div>
                    <h3>🎯 8 Adımlı Sınav Sorusu Çözme Algoritması</h3>
                    <p class="text-muted">${algo.description}</p>
                </div>
                <div class="eng-primers-stat-badge">
                    <i class="fa-solid fa-shield-halved text-success"></i> Soru Eleme Motoru
                </div>
            </div>

            <!-- Adımlar Akış Çizelgesi (Timeline) -->
            <div class="eng-algo-steps-list">
                ${algo.steps.map(s => `
                    <div class="eng-algo-step-card">
                        <div class="eng-algo-step-number">
                            <span>0${s.step}</span>
                        </div>
                        <div class="eng-algo-step-content">
                            <h4>${s.name}</h4>
                            <p class="eng-algo-step-action">${s.action}</p>
                            <div class="eng-algo-step-pills">
                                <div class="eng-algo-pill-tip">
                                    <i class="fa-solid fa-lightbulb"></i> <strong>Püf Noktası:</strong> ${s.tip}
                                </div>
                                <div class="eng-algo-pill-bad">
                                    <i class="fa-solid fa-triangle-exclamation"></i> <strong>Kaçınılacak Hata:</strong> ${s.badHabit}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- İnteraktif Soru Simülatörü Bölümü -->
            <div class="eng-simulator-section">
                <div class="eng-simulator-header">
                    <div class="eng-badge-pill"><i class="fa-solid fa-play"></i> Canlı Simülatör</div>
                    <h3>Adım Adım Soru Çözme Uygulaması</h3>
                    <p class="text-muted">
                        Aşağıdaki gerçek sınav sorusunu 8 adımlı mantık algoritmasıyla adım adım incele. 
                        "Sonraki Adım" butonuna tıklayarak ipuçlarını ve elenen seçenekleri canlı izle.
                    </p>
                </div>

                <div class="eng-simulator-container" id="eng-simulator-container">
                    ${algo.simulations.map(sim => this.renderSimulationCard(sim)).join('')}
                </div>
            </div>
        `;

        // Simülasyon ileri/geri butonlarını bağla
        pane.querySelectorAll('[data-sim-next]').forEach(btn => {
            btn.onclick = () => {
                const simId = btn.getAttribute('data-sim-next');
                this.advanceSimulation(simId, 1);
            };
        });

        pane.querySelectorAll('[data-sim-prev]').forEach(btn => {
            btn.onclick = () => {
                const simId = btn.getAttribute('data-sim-prev');
                this.advanceSimulation(simId, -1);
            };
        });

        pane.querySelectorAll('[data-sim-reset]').forEach(btn => {
            btn.onclick = () => {
                const simId = btn.getAttribute('data-sim-reset');
                this.resetSimulation(simId);
            };
        });
    }

    renderSimulationCard(sim) {
        const currentStep = this.simState[sim.id] !== undefined ? this.simState[sim.id] : 0;
        const totalSteps = sim.walkthrough.length;
        const isFinished = currentStep >= totalSteps - 1;
        const activeWalk = sim.walkthrough[currentStep] || sim.walkthrough[0];

        return `
            <div class="eng-sim-card" id="sim-card-${sim.id}">
                <div class="eng-sim-header-row">
                    <span class="eng-sim-title"><i class="fa-solid fa-microscope text-indigo"></i> ${sim.title}</span>
                    <span class="eng-sim-progress-indicator">Adım ${currentStep + 1} / ${totalSteps}</span>
                </div>

                <div class="eng-sim-question-box">
                    <div class="eng-sim-question-text">
                        "${sim.questionText}"
                    </div>
                    <div class="eng-sim-options-grid">
                        ${sim.options.map(opt => `
                            <div class="eng-sim-option-pill ${isFinished && opt.isCorrect ? 'highlight-correct' : ''}">
                                ${opt.text} ${isFinished && opt.isCorrect ? '<i class="fa-solid fa-circle-check text-success"></i>' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Aktif Walkthrough Adımı -->
                <div class="eng-sim-walkthrough-pane">
                    <div class="eng-sim-step-badge">
                        <i class="fa-solid fa-arrow-right"></i> ${activeWalk.title}
                    </div>
                    <div class="eng-sim-step-desc">
                        ${activeWalk.text}
                    </div>
                </div>

                <!-- Kontrol Butonları -->
                <div class="eng-sim-actions-bar">
                    <button class="btn btn-secondary btn-sm" data-sim-prev="${sim.id}" ${currentStep === 0 ? 'disabled' : ''}>
                        <i class="fa-solid fa-arrow-left"></i> Önceki Adım
                    </button>
                    ${!isFinished ? `
                        <button class="btn btn-primary btn-sm" data-sim-next="${sim.id}">
                            Sonraki Adımı Gör <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    ` : `
                        <button class="btn btn-success btn-sm" data-sim-reset="${sim.id}">
                            <i class="fa-solid fa-rotate-left"></i> Baştan İncele
                        </button>
                    `}
                </div>
            </div>
        `;
    }

    advanceSimulation(simId, delta) {
        const sim = this.data.algorithm.simulations.find(s => s.id === simId);
        if (!sim) return;

        let cur = this.simState[simId] !== undefined ? this.simState[simId] : 0;
        cur = Math.max(0, Math.min(sim.walkthrough.length - 1, cur + delta));
        this.simState[simId] = cur;

        const cardElem = document.getElementById(`sim-card-${simId}`);
        if (cardElem) {
            cardElem.outerHTML = this.renderSimulationCard(sim);
            this.rebindSimButtons(simId);
        }
    }

    resetSimulation(simId) {
        this.simState[simId] = 0;
        const sim = this.data.algorithm.simulations.find(s => s.id === simId);
        const cardElem = document.getElementById(`sim-card-${simId}`);
        if (sim && cardElem) {
            cardElem.outerHTML = this.renderSimulationCard(sim);
            this.rebindSimButtons(simId);
        }
    }

    rebindSimButtons(simId) {
        const card = document.getElementById(`sim-card-${simId}`);
        if (!card) return;

        const nextBtn = card.querySelector('[data-sim-next]');
        if (nextBtn) nextBtn.onclick = () => this.advanceSimulation(simId, 1);

        const prevBtn = card.querySelector('[data-sim-prev]');
        if (prevBtn) prevBtn.onclick = () => this.advanceSimulation(simId, -1);

        const resetBtn = card.querySelector('[data-sim-reset]');
        if (resetBtn) resetBtn.onclick = () => this.resetSimulation(simId);
    }

    // =========================================================================
    // 3. FORMÜL KÜTÜPHANESİ (LIBRARY: A-G, 32 FORMÜL, 10 ADIMLI MODAL)
    // =========================================================================
    renderLibrary(pane) {
        const categories = this.data.categories || [];
        const formulas = this.data.formulas || [];

        // Filtrele
        const filtered = formulas.filter(f => {
            const matchCat = this.selectedCategory === 'all' || f.catId === this.selectedCategory;
            const matchSearch = !this.searchQuery || 
                f.title.toLowerCase().includes(this.searchQuery) ||
                f.formula.toLowerCase().includes(this.searchQuery) ||
                f.purpose.toLowerCase().includes(this.searchQuery) ||
                f.examTips.toLowerCase().includes(this.searchQuery);
            return matchCat && matchSearch;
        });

        pane.innerHTML = `
            <div class="eng-subpane-header">
                <div>
                    <h3>📐 Mantık Odaklı Formül Kütüphanesi</h3>
                    <p class="text-muted">
                        A'dan G'ye 7 kategoride 32 kritik sınav formülü. Kartın üzerine tıklayarak 10 adımlı derin mantık analizini ve çıkmış soru kalıbını incele.
                    </p>
                </div>
                <div class="eng-primers-stat-badge">
                    <i class="fa-solid fa-cubes-stacked text-indigo"></i> ${filtered.length} / ${formulas.length} Formül
                </div>
            </div>

            <!-- Toolbar: Arama ve Kategori Filtreleri -->
            <div class="eng-library-toolbar">
                <div class="eng-library-search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" id="eng-formula-search-input" 
                           placeholder="Formül veya kural ara (örn: have V3, despite, unless, passive, modal)..." 
                           value="${this.searchQuery}" class="form-input">
                </div>

                <div class="eng-library-cats-row" id="eng-formula-cat-filters">
                    <button class="eng-cat-pill ${this.selectedCategory === 'all' ? 'active' : ''}" data-cat-id="all">
                        Tümü (${formulas.length})
                    </button>
                    ${categories.map(c => `
                        <button class="eng-cat-pill ${this.selectedCategory === c.id ? 'active' : ''}" data-cat-id="${c.id}">
                            <i class="fa-solid ${c.icon}"></i> ${c.name}
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Formül Kartları Grid'i -->
            <div class="eng-formulas-cards-grid">
                ${filtered.length > 0 ? filtered.map(f => this.renderFormulaCard(f)).join('') : `
                    <div class="eng-empty-search-state">
                        <i class="fa-solid fa-filter-circle-xmark"></i>
                        <p>Aradığınız kriterlere uygun formül bulunamadı.</p>
                        <button class="btn btn-secondary btn-sm" id="btn-reset-formula-search">Aramayı Temizle</button>
                    </div>
                `}
            </div>
        `;

        // Arama inputu
        const searchInput = document.getElementById('eng-formula-search-input');
        if (searchInput) {
            searchInput.oninput = (e) => {
                this.searchQuery = e.target.value.trim().toLowerCase();
                this.renderLibrary(pane);
            };
        }

        // Kategori filtreleri
        pane.querySelectorAll('[data-cat-id]').forEach(btn => {
            btn.onclick = () => {
                this.selectedCategory = btn.getAttribute('data-cat-id');
                this.renderLibrary(pane);
            };
        });

        // Boş arama temizle
        const resetBtn = document.getElementById('btn-reset-formula-search');
        if (resetBtn) {
            resetBtn.onclick = () => {
                this.searchQuery = "";
                this.selectedCategory = "all";
                this.renderLibrary(pane);
            };
        }

        // Formül detay açma kartları
        pane.querySelectorAll('[data-open-formula]').forEach(card => {
            card.onclick = () => {
                const formulaId = card.getAttribute('data-open-formula');
                this.openFormulaModal(formulaId);
            };
        });
    }

    renderFormulaCard(f) {
        const cat = this.data.categories.find(c => c.id === f.catId);
        const catName = cat ? cat.name : "Formül";

        return `
            <div class="eng-formula-card" data-open-formula="${f.id}">
                <div class="eng-fcard-top">
                    <span class="eng-fcard-cat">${catName}</span>
                    <span class="eng-fcard-inspect-hint"><i class="fa-solid fa-arrow-up-right-from-square"></i> Mantık Dökümü</span>
                </div>
                
                <h4 class="eng-fcard-title">${f.title}</h4>
                
                <div class="eng-fcard-syntax">
                    <code>${f.formula}</code>
                </div>

                <p class="eng-fcard-purpose">
                    <i class="fa-solid fa-bullseye text-primary"></i> ${f.purpose}
                </p>

                <div class="eng-fcard-footer">
                    <span class="eng-fcard-exam-tip"><i class="fa-solid fa-bolt text-amber"></i> ${f.examTips.substring(0, 75)}...</span>
                </div>
            </div>
        `;
    }

    // =========================================================================
    // 10 ADIMLI FORMÜL DETAY MODALI
    // =========================================================================
    openFormulaModal(formulaId) {
        const f = this.data.formulas.find(item => item.id === formulaId);
        if (!f) return;

        this.activeFormulaId = formulaId;
        const modal = document.getElementById('eng-formula-modal');
        const modalHeader = document.getElementById('eng-modal-header');
        const modalBody = document.getElementById('eng-modal-body');
        if (!modal || !modalHeader || !modalBody) return;

        const cat = this.data.categories.find(c => c.id === f.catId);

        modalHeader.innerHTML = `
            <div class="eng-mheader-left">
                <span class="eng-tag-badge">${cat ? cat.name : ''}</span>
                <h3>${f.title}</h3>
                <div class="eng-formula-syntax-badge">
                    <code>${f.formula}</code>
                </div>
            </div>
            <button class="eng-modal-close-btn" id="btn-close-formula-modal">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;

        modalBody.innerHTML = `
            <div class="eng-tenstep-layout">
                
                <!-- Adım 1 & 2: Temel Mantık ve Formül Açıklaması -->
                <div class="eng-step-section">
                    <div class="eng-step-badge-num">Adım 1 & 2: Temel Mantık ve Formül</div>
                    <div class="eng-step-text-block">
                        <p><strong>Neden Var?</strong> ${f.purpose}</p>
                        <div class="eng-formula-callout">
                            <i class="fa-solid fa-code"></i> Formül: <strong>${f.formula}</strong>
                        </div>
                    </div>
                </div>

                <!-- Adım 3 & 4: Parçaların Görevi ve Türkçe Mantık Farkı -->
                <div class="eng-step-section">
                    <div class="eng-step-badge-num">Adım 3 & 4: Parçaların Görevi ve Türkçe Karşılaştırması</div>
                    <div class="eng-step-grid-2">
                        <div class="eng-subbox">
                            <h5><i class="fa-solid fa-puzzle-piece text-indigo"></i> Formüldeki Parçalar</h5>
                            <p>${f.parts}</p>
                        </div>
                        <div class="eng-subbox">
                            <h5><i class="fa-solid fa-language text-amber"></i> Türkçeden Farkı Nedir?</h5>
                            <p>${f.trComparison}</p>
                        </div>
                    </div>
                </div>

                <!-- Adım 5: Kolaydan Zora Örnekler -->
                <div class="eng-step-section">
                    <div class="eng-step-badge-num">Adım 5: Kolaydan Zora Örnek Cümleler</div>
                    <div class="eng-examples-list">
                        ${f.examples.map((ex, i) => `
                            <div class="eng-example-item">
                                <span class="eng-ex-badge">Örnek 0${i + 1}</span>
                                <div class="eng-ex-text">
                                    <div class="eng-ex-en"><strong>EN:</strong> ${ex.en}</div>
                                    <div class="eng-ex-tr text-muted"><strong>TR:</strong> ${ex.tr}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Adım 6: Neden Doğru, Neden Yanlış Analizi -->
                <div class="eng-step-section">
                    <div class="eng-step-badge-num">Adım 6: Neden Doğru, Neden Yanlış Analizi</div>
                    <div class="eng-why-box">
                        <i class="fa-solid fa-check-double text-success"></i>
                        <div>${f.whyRightWrong}</div>
                    </div>
                </div>

                <!-- Adım 7 & 8: Sınav İpuçları ve İstisnalar/Tuzaklar -->
                <div class="eng-step-section">
                    <div class="eng-step-badge-num">Adım 7 & 8: Sınav İpuçları ve Çeldirici Tuzaklar</div>
                    <div class="eng-step-grid-2">
                        <div class="eng-subbox border-warning">
                            <h5><i class="fa-solid fa-bolt text-amber"></i> Sınavda Hangi Kelimeyi Görürsem?</h5>
                            <p>${f.examTips}</p>
                        </div>
                        <div class="eng-subbox border-danger">
                            <h5><i class="fa-solid fa-triangle-exclamation text-danger"></i> En Büyük Tuzaklar & İstisnalar</h5>
                            <p>${f.traps}</p>
                        </div>
                    </div>
                </div>

                <!-- Adım 9 & 10: Mini Test & Yanlış Analizi -->
                <div class="eng-step-section" id="modal-quiz-section-${f.id}">
                    <div class="eng-step-badge-num">Adım 9 & 10: Mini Test ve Düşünme Hatası Analizi</div>
                    ${this.renderFormulaModalQuiz(f)}
                </div>

            </div>
        `;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Kapatma eventleri
        const closeBtn = document.getElementById('btn-close-formula-modal');
        if (closeBtn) closeBtn.onclick = () => this.closeFormulaModal();

        modal.onclick = (e) => {
            if (e.target === modal) this.closeFormulaModal();
        };

        this.bindModalQuizEvents(f);
    }

    renderFormulaModalQuiz(f) {
        const q = f.miniQuiz;
        if (!q) return '<p class="text-muted">Bu formül için mini test bulunmuyor.</p>';

        const answered = this.quizAnswers[`formula_${f.id}`];
        const isCorrect = answered !== undefined && answered === q.correctIndex;

        return `
            <div class="eng-modal-quiz-card">
                <div class="eng-modal-q-title"><i class="fa-solid fa-circle-question text-primary"></i> ${q.question}</div>
                <div class="eng-modal-options-list">
                    ${q.options.map((opt, idx) => {
                        let btnClass = "eng-opt-btn";
                        if (answered !== undefined) {
                            if (idx === q.correctIndex) btnClass += " correct";
                            else if (idx === answered) btnClass += " wrong";
                        }
                        return `
                            <button class="${btnClass}" data-modal-quiz-idx="${idx}" ${answered !== undefined ? 'disabled' : ''}>
                                <span class="opt-indicator">${String.fromCharCode(65 + idx)}</span>
                                <span>${opt}</span>
                            </button>
                        `;
                    }).join('')}
                </div>

                ${answered !== undefined ? `
                    <div class="eng-quiz-feedback ${isCorrect ? 'feedback-success' : 'feedback-error'}">
                        <i class="fa-solid ${isCorrect ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
                        <div>
                            <strong>${isCorrect ? 'Harika Çözüm!' : 'Yanlış Seçenek!'}</strong> 
                            ${q.explanation}
                            ${!isCorrect && f.wrongAnalysis ? `
                                <div class="eng-wrong-diagnosis">
                                    <i class="fa-solid fa-stethoscope"></i> <strong>Düşünme Hatası Teşhisi:</strong> ${f.wrongAnalysis}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    bindModalQuizEvents(f) {
        const modalBody = document.getElementById('eng-modal-body');
        if (!modalBody) return;

        modalBody.querySelectorAll('[data-modal-quiz-idx]').forEach(btn => {
            btn.onclick = () => {
                const idx = parseInt(btn.getAttribute('data-modal-quiz-idx'), 10);
                this.quizAnswers[`formula_${f.id}`] = idx;
                this.saveState();
                
                // Quiz bölümünü yeniden render et
                const quizSection = document.getElementById(`modal-quiz-section-${f.id}`);
                if (quizSection) {
                    quizSection.innerHTML = `
                        <div class="eng-step-badge-num">Adım 9 & 10: Mini Test ve Düşünme Hatası Analizi</div>
                        ${this.renderFormulaModalQuiz(f)}
                    `;
                    this.bindModalQuizEvents(f);
                }
            };
        });
    }

    closeFormulaModal() {
        const modal = document.getElementById('eng-formula-modal');
        if (modal) modal.style.display = 'none';
        document.body.style.overflow = '';
        this.activeFormulaId = null;
    }

    // =========================================================================
    // 4. BAŞLANGIÇ DERSİ: V1, V2, V3 VE YARDIMCI FİİLLERİN MANTIĞI
    // =========================================================================
    renderIntroLesson(pane) {
        const lesson = this.data.introLesson;
        if (!lesson) return;

        pane.innerHTML = `
            <div class="eng-subpane-header">
                <div>
                    <div class="eng-badge-pill"><i class="fa-solid fa-key"></i> Kilit Başlangıç Dersi</div>
                    <h3>${lesson.title}</h3>
                    <p class="text-muted">${lesson.subtitle}</p>
                </div>
                <div class="eng-primers-stat-badge">
                    <i class="fa-solid fa-bolt text-amber"></i> Ezber Bozan 6 Bölüm
                </div>
            </div>

            <!-- Ders İçeriği Bölümleri -->
            <div class="eng-lesson-sections-container">
                ${lesson.sections.map((sec, idx) => `
                    <div class="eng-lesson-section-card">
                        <div class="eng-lesson-card-header">
                            <span class="eng-lesson-idx-badge">0${idx + 1}</span>
                            <h4>${sec.title}</h4>
                        </div>
                        <div class="eng-lesson-card-body">
                            ${this.formatMarkdownText(sec.content)}
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Başlangıç Dersi Pekiştirme Testi -->
            <div class="eng-lesson-test-section">
                <div class="eng-lesson-test-header">
                    <div class="eng-badge-pill"><i class="fa-solid fa-vial-circle-check"></i> Anlama Kontrolü</div>
                    <h3>Başlangıç Dersi Pekiştirme ve Hata Teşhis Testi</h3>
                    <p class="text-muted">
                        V1, V2, V3 ve yardımcı fiillerin arkasındaki mantığı tam oturttun mu? Aşağıdaki 4 soruyu çözerek düşünme hatası teşhisini gör.
                    </p>
                </div>

                <div class="eng-lesson-test-grid">
                    ${lesson.test.map((q, idx) => this.renderIntroQuestionCard(q, idx)).join('')}
                </div>
            </div>
        `;

        // Test sorularının tıklama eventleri
        pane.querySelectorAll('[data-intro-opt-idx]').forEach(btn => {
            btn.onclick = () => {
                const qId = btn.getAttribute('data-intro-qid');
                const optIdx = parseInt(btn.getAttribute('data-intro-opt-idx'), 10);
                this.handleIntroQuizAnswer(qId, optIdx);
            };
        });
    }

    renderIntroQuestionCard(q, index) {
        const answered = this.quizAnswers[q.id];
        const isCorrect = answered !== undefined && answered === q.correctIndex;

        return `
            <div class="eng-intro-q-card" id="card-${q.id}">
                <div class="eng-intro-q-num">
                    <i class="fa-solid fa-circle-question"></i> Soru ${index + 1}
                </div>
                <div class="eng-intro-q-text">
                    ${q.question}
                </div>
                <div class="eng-intro-q-options">
                    ${q.options.map((opt, optIdx) => {
                        let btnClass = "eng-opt-btn";
                        if (answered !== undefined) {
                            if (optIdx === q.correctIndex) btnClass += " correct";
                            else if (optIdx === answered) btnClass += " wrong";
                        }
                        return `
                            <button class="${btnClass}" data-intro-qid="${q.id}" data-intro-opt-idx="${optIdx}" ${answered !== undefined ? 'disabled' : ''}>
                                <span class="opt-indicator">${String.fromCharCode(65 + optIdx)}</span>
                                <span>${opt}</span>
                            </button>
                        `;
                    }).join('')}
                </div>

                ${answered !== undefined ? `
                    <div class="eng-quiz-feedback ${isCorrect ? 'feedback-success' : 'feedback-error'}">
                        <i class="fa-solid ${isCorrect ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
                        <div>
                            <strong>${isCorrect ? 'Tebrikler! Mantığı tam kavradın.' : 'Dikkat!'}</strong> 
                            ${q.explanation}
                            ${!isCorrect && q.diagnosis ? `
                                <div class="eng-wrong-diagnosis">
                                    <i class="fa-solid fa-stethoscope"></i> <strong>Neden Yanıldın?</strong> ${q.diagnosis}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    handleIntroQuizAnswer(qId, optIdx) {
        this.quizAnswers[qId] = optIdx;
        this.saveState();

        const lesson = this.data.introLesson;
        const qIndex = lesson.test.findIndex(item => item.id === qId);
        if (qIndex === -1) return;

        const q = lesson.test[qIndex];
        const cardElem = document.getElementById(`card-${qId}`);
        if (cardElem) {
            cardElem.outerHTML = this.renderIntroQuestionCard(q, qIndex);

            // Rebind
            const updatedCard = document.getElementById(`card-${qId}`);
            if (updatedCard) {
                updatedCard.querySelectorAll('[data-intro-opt-idx]').forEach(btn => {
                    btn.onclick = () => {
                        const newIdx = parseInt(btn.getAttribute('data-intro-opt-idx'), 10);
                        this.handleIntroQuizAnswer(qId, newIdx);
                    };
                });
            }
        }
    }

    formatMarkdownText(text) {
        if (!text) return "";
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            .replace(/• (.*?)(<br>|<\/p>|$)/g, '<li class="eng-bullet-li">$1</li>');
    }
}

// Global instance export
export const englishFormulas = new EnglishFormulasManager();
