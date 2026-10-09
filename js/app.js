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
    },
    // Dış Kaynaklar ve Video Hub Modu
    resources: {
        activeTab: 'youtube', // 'youtube' | 'osym'
        selectedChannelId: 'channel-egitimserisi',
        category: 'all',
        type: 'all',
        searchQuery: '',
        ytCategory: 'all',
        ytSearchQuery: '',
        ytWatchStatus: 'all', // 'all' | 'watched' | 'unwatched'
        resVisitStatus: 'all' // 'all' | 'visited' | 'unvisited'
    },
    // Kişisel Notlar & Bilgi Panosu Modu
    notes: {
        category: 'all',
        priority: 'all',
        sort: 'smart',
        activeTag: null,
        searchQuery: '',
        viewMode: 'cards',
        editingNoteId: null,
        flashIndex: 0,
        flashNotes: [],
        editorTab: 'write'
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
    initResourcesMode();
    initNotesMode();
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
                    <button class="btn-create-note-from-lecture" data-create-note-lec="${lec.id}" title="Bu konudan hap çalışma notu oluştur">
                        <i class="fa-solid fa-pen-nib"></i> <span>Not Çıkar</span>
                    </button>
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
                ${renderLectureResourcesBox(lec.resourceIds)}
            </div>
        `;

        // Başlığa tıklandığında açılır-kapanır (Accordion)
        card.querySelector('.lecture-card-header').addEventListener('click', (e) => {
            if (e.target.closest('.btn-toggle-read') || e.target.closest('.btn-create-note-from-lecture')) return;
            card.classList.toggle('expanded');
        });

        // Bu konudan not çıkar butonu
        card.querySelector('[data-create-note-lec]')?.addEventListener('click', (e) => {
            e.stopPropagation();
            openNoteEditorFromLecture(lec);
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

// Konu anlatımı içindeki önerilen video ve kaynak kutucuğu
function renderLectureResourcesBox(resourceIds) {
    if (!resourceIds || resourceIds.length === 0) return '';
    const resItems = resourceIds.map(id => db.getResourceById(id)).filter(Boolean);
    if (resItems.length === 0) return '';

    const itemsHtml = resItems.map(r => {
        const iconClass = r.type === 'video' ? 'fa-brands fa-youtube text-rose' :
                          r.type === 'exam_archive' ? 'fa-solid fa-file-pdf text-amber' :
                          r.type === 'interactive' ? 'fa-solid fa-laptop-code text-emerald' : 'fa-solid fa-building-columns text-indigo';
        return `
            <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="lecture-res-link-item">
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                    <i class="${iconClass}" style="font-size: 1.05rem;"></i>
                    <span><strong>${escapeHtml(r.title)}</strong> <span style="font-size: 0.76rem; color: var(--text-muted);">(${escapeHtml(r.provider)})</span></span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span class="resource-badge-tag">${escapeHtml(r.badge || 'Kaynak')}</span>
                    <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.75rem;"></i>
                </div>
            </a>
        `;
    }).join('');

    return `
        <div class="lecture-resources-box">
            <div class="lecture-resources-title">
                <i class="fa-solid fa-play-circle text-indigo"></i>
                <span>Önerilen Video & Çıkmış Soru Kaynakları:</span>
            </div>
            <div class="lecture-res-links-list">
                ${itemsHtml}
            </div>
        </div>
    `;
}

// ==============================================================================
// 2.7. HARİCİ VİDEO VE SINAV ARŞİV KÜTÜPHANESİ (YOUTUBE KANALLARI & ÖSYM)
// ==============================================================================
function initResourcesMode() {
    // 1. Sekme Değiştirici (YouTube vs ÖSYM)
    const subTabBtns = document.querySelectorAll('.res-subtab-btn');
    subTabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            subTabBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            state.resources.activeTab = e.currentTarget.getAttribute('data-res-tab');
            switchResourcesTab();
        });
    });

    // 2. YouTube Arama ve Kategori Filtreleri
    const ytSearchInput = document.getElementById('yt-video-search-input');
    const ytCatBtns = document.querySelectorAll('#yt-video-category-pills [data-yt-cat]');

    ytSearchInput?.addEventListener('input', (e) => {
        state.resources.ytSearchQuery = e.target.value.trim().toLowerCase();
        renderYoutubeVideos();
    });

    ytCatBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            ytCatBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            state.resources.ytCategory = e.currentTarget.getAttribute('data-yt-cat');
            renderYoutubeVideos();
        });
    });

    // 3. ÖSYM Arşiv Arama ve Filtreleri
    const osymSearchInput = document.getElementById('resource-search-input');
    const osymCatBtns = document.querySelectorAll('#resource-category-pills [data-res-cat]');
    const osymTypeBtns = document.querySelectorAll('[data-res-type]');

    osymCatBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            osymCatBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            state.resources.category = e.currentTarget.getAttribute('data-res-cat');
            renderOsymResources();
        });
    });

    osymTypeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            osymTypeBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            state.resources.type = e.currentTarget.getAttribute('data-res-type');
            renderOsymResources();
        });
    });

    osymSearchInput?.addEventListener('input', (e) => {
        state.resources.searchQuery = e.target.value.trim().toLowerCase();
        renderOsymResources();
    });

    // 4. Video Oynatıcı Modalı Kapatma & İzlendi Butonu
    document.getElementById('btn-close-video-modal')?.addEventListener('click', closeVideoPlayerModal);
    document.getElementById('btn-modal-toggle-watched')?.addEventListener('click', handleModalToggleWatched);

    // 5. Yeni Kanal / Video Ekleme Modalı
    document.getElementById('btn-open-add-channel')?.addEventListener('click', () => openAddChannelModal('channel'));
    document.getElementById('btn-open-add-video')?.addEventListener('click', () => openAddChannelModal('video'));
    document.getElementById('btn-close-add-channel')?.addEventListener('click', closeAddChannelModal);
    document.getElementById('btn-cancel-add-channel')?.addEventListener('click', closeAddChannelModal);
    document.getElementById('add-channel-form')?.addEventListener('submit', handleAddChannelSubmit);

    // Mod Seçici Sekmeler (Tekil Video vs Kanal)
    document.querySelectorAll('#add-yt-type-tabs [data-type-tab]').forEach(tabBtn => {
        tabBtn.addEventListener('click', (e) => {
            const targetMode = e.currentTarget.getAttribute('data-type-tab');
            setAddYtMode(targetMode);
        });
    });

    // 6. İzleme Durumu Filtre Butonları (Tümü / İzlenmeyenler / İzlendi)
    document.querySelectorAll('#yt-watch-status-pills [data-yt-watch]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('#yt-watch-status-pills [data-yt-watch]').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            state.resources.ytWatchStatus = e.currentTarget.getAttribute('data-yt-watch');
            renderYoutubeVideos();
        });
    });

    // 7. Yeni Web Sitesi / Kaynak Ekleme Modalı
    document.getElementById('btn-open-add-website')?.addEventListener('click', openAddWebsiteModal);
    document.getElementById('btn-close-add-website')?.addEventListener('click', closeAddWebsiteModal);
    document.getElementById('btn-cancel-add-website')?.addEventListener('click', closeAddWebsiteModal);
    document.getElementById('add-website-form')?.addEventListener('submit', handleAddWebsiteSubmit);

    // 8. Web Viewer (Site Görüntüleyici) Modalı
    document.getElementById('btn-close-web-viewer')?.addEventListener('click', closeWebViewerModal);
    document.getElementById('btn-modal-toggle-visited')?.addEventListener('click', handleModalToggleVisited);

    // 9. Web Kaynakları İncelendi Durumu Filtre Butonları
    document.querySelectorAll('#res-visit-status-pills [data-res-visit]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('#res-visit-status-pills [data-res-visit]').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            state.resources.resVisitStatus = e.currentTarget.getAttribute('data-res-visit');
            renderOsymResources();
        });
    });

    document.addEventListener('view-resources-loaded', renderResourcesList);
    renderResourcesList();
}

function switchResourcesTab() {
    const ytSec = document.getElementById('resources-youtube-section');
    const osymSec = document.getElementById('resources-osym-section');
    if (!ytSec || !osymSec) return;

    if (state.resources.activeTab === 'youtube') {
        ytSec.style.display = 'block';
        osymSec.style.display = 'none';
        renderYoutubeSection();
    } else {
        ytSec.style.display = 'none';
        osymSec.style.display = 'block';
        renderOsymResources();
    }
}

function renderResourcesList() {
    switchResourcesTab();
}

function renderYoutubeSection() {
    renderYoutubeChannelPills();
    renderActiveChannelHero();
    renderYoutubeVideos();
}

function renderYoutubeChannelPills() {
    const pillsContainer = document.getElementById('yt-channel-pills');
    if (!pillsContainer) return;

    const channels = db.getYoutubeChannels();

    let pillsHtml = `
        <button class="pill-btn ${state.resources.selectedChannelId === 'all' ? 'active' : ''}" data-ch-id="all">
            <i class="fa-solid fa-list-check"></i> Tüm Kanallar & Listeler
        </button>
    `;

    channels.forEach(ch => {
        const isSelected = ch.id === state.resources.selectedChannelId;
        const icon = ch.isPlaylist ? '<i class="fa-solid fa-list-ul text-rose"></i>' :
                     ch.id === 'channel-egitimserisi' ? '🎓' :
                     ch.id === 'channel-sorularlayuksel' ? '⭐' :
                     ch.id === 'channel-rustuhoca' ? '📖' :
                     ch.id === 'channel-benimhocam-ilyas' ? '📐' :
                     ch.id === 'channel-modadil' ? '🇬🇧' :
                     ch.id === 'channel-tcmb' ? '🏛️' : '📺';

        pillsHtml += `
            <button class="pill-btn ${isSelected ? 'active' : ''}" data-ch-id="${ch.id}">
                ${icon} ${escapeHtml(ch.name)}
            </button>
        `;
    });

    pillsContainer.innerHTML = pillsHtml;

    pillsContainer.querySelectorAll('[data-ch-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const chId = e.currentTarget.getAttribute('data-ch-id');
            state.resources.selectedChannelId = chId;
            renderYoutubeSection();
        });
    });
}

function renderActiveChannelHero() {
    const heroCard = document.getElementById('yt-active-channel-card');
    if (!heroCard) return;

    if (state.resources.selectedChannelId === 'all') {
        heroCard.innerHTML = `
            <div class="yt-channel-avatar" style="display: flex; align-items: center; justify-content: center; background: rgba(244, 63, 94, 0.2); font-size: 2rem; color: #f43f5e;">
                <i class="fa-brands fa-youtube"></i>
            </div>
            <div class="yt-channel-meta">
                <h3>Tüm Önerilen YouTube Sınav Kanalları & Oynatma Listeleri</h3>
                <p class="yt-channel-desc">Ziraat Bankası Uzman Yardımcılığı için özel derlenmiş YouTube kanalları (@egitimserisi5115, @Sorularlayuksel ve 4 özel oynatma listesi) ile tüm soru çözümleri.</p>
            </div>
            <div>
                <button class="btn btn-sm btn-outline-light" onclick="document.getElementById('btn-open-add-channel').click()">
                    <i class="fa-solid fa-plus"></i> Yeni Kanal Ekle
                </button>
            </div>
        `;
        return;
    }

    const channel = db.getYoutubeChannelById(state.resources.selectedChannelId);
    if (!channel) return;

    let playlistJumpHtml = '';
    if (channel.playlists && channel.playlists.length > 0) {
        playlistJumpHtml = `
            <div style="margin-top: 0.75rem; width: 100%;">
                <div style="font-size: 0.75rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.35rem;">
                    <i class="fa-solid fa-layer-group text-rose"></i> ÖNE ÇIKAN OYNATMA LİSTELERİ (${channel.playlists.length}):
                </div>
                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                    ${channel.playlists.map(p => {
                        const targetId = p.id === 'PLgUANwY_CJ6Vz5u2HSl_Lty_JMd5EDeYD' ? 'playlist-sy-genel-yetenek-2' :
                                         p.id === 'PLgUANwY_CJ6VinSIYIL9QF9f0VwkOxLo5' ? 'playlist-sy-genel-kultur' :
                                         p.id === 'PLgUANwY_CJ6Xxw76TAz7EJOkhuVbpOGnP' ? 'playlist-sy-genel-yetenek-1' :
                                         p.id === 'PLgUANwY_CJ6WJljpGMOI1AZBKgmK2umB6' ? 'playlist-sy-ekonomi' : p.id;
                        return `
                            <button class="btn btn-xs btn-outline-light yt-pl-jump-btn" data-jump-to="${targetId}" style="font-size: 0.75rem; border-radius: 9999px;">
                                <i class="fa-solid fa-list-ul text-rose"></i> ${escapeHtml(p.name)} <span style="opacity: 0.7;">(${p.videoCount})</span>
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    } else if (channel.isPlaylist) {
        playlistJumpHtml = `
            <div style="margin-top: 0.6rem; width: 100%;">
                <button class="btn btn-xs btn-secondary yt-pl-jump-btn" data-jump-to="channel-sorularlayuksel" style="font-size: 0.75rem; border-radius: 9999px;">
                    <i class="fa-solid fa-arrow-left"></i> Sorularla Yüksel (Tüm Videolar)
                </button>
            </div>
        `;
    }

    heroCard.innerHTML = `
        <img src="${channel.avatar || 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png'}" alt="${escapeHtml(channel.name)}" class="yt-channel-avatar" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1384/1384060.png'">
        <div class="yt-channel-meta" style="flex: 1;">
            <h3>
                <span>${escapeHtml(channel.name)}</span>
                <span class="badge ${channel.isPlaylist ? 'badge-indigo' : 'badge-rose'}">${escapeHtml(channel.badge || 'Önerilen Kanal')}</span>
            </h3>
            <div class="yt-channel-handle"><i class="fa-brands fa-youtube text-rose"></i> ${escapeHtml(channel.handle || '')} • ${channel.videos?.length || 0} Video</div>
            <p class="yt-channel-desc">${escapeHtml(channel.description || '')}</p>
            ${playlistJumpHtml}
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: flex-start;">
            <a href="${channel.url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                <i class="fa-brands fa-youtube"></i> ${channel.isPlaylist ? 'Listeyi Aç' : 'Kanala Git'} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.72rem;"></i>
            </a>
        </div>
    `;

    heroCard.querySelectorAll('.yt-pl-jump-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget.getAttribute('data-jump-to');
            if (target) {
                state.resources.selectedChannelId = target;
                renderYoutubeSection();
            }
        });
    });
}

function renderYoutubeVideos() {
    const grid = document.getElementById('yt-videos-grid');
    const badge = document.getElementById('resources-count-badge');
    if (!grid) return;

    // 1. İzleme İstatistiklerini Güncelle (Tüm / İzlenmeyen / İzlendi & İlerleme Çubuğu)
    const stats = db.getVideoWatchStats(state.resources.selectedChannelId, state.resources.ytCategory);
    const countAllEl = document.getElementById('yt-count-all');
    const countUnwatchedEl = document.getElementById('yt-count-unwatched');
    const countWatchedEl = document.getElementById('yt-count-watched');
    const progressTextEl = document.getElementById('yt-watch-progress-text');
    const progressBarEl = document.getElementById('yt-watch-progress-bar');

    if (countAllEl) countAllEl.textContent = stats.total;
    if (countUnwatchedEl) countUnwatchedEl.textContent = stats.unwatched;
    if (countWatchedEl) countWatchedEl.textContent = stats.watched;
    if (progressTextEl) progressTextEl.textContent = `${stats.watched} / ${stats.total} İzlenen (%${stats.percent})`;
    if (progressBarEl) progressBarEl.style.width = `${stats.percent}%`;

    // 2. Videoları Çek
    let videos = db.getAllChannelVideos(state.resources.selectedChannelId, state.resources.ytCategory);

    // 3. İzleme Durumuna Göre Filtrele (Tümü / İzlenmeyenler / İzlendi)
    const watchStatus = state.resources.ytWatchStatus || 'all';
    if (watchStatus === 'watched') {
        videos = videos.filter(v => db.isVideoWatched(v.id));
    } else if (watchStatus === 'unwatched') {
        videos = videos.filter(v => !db.isVideoWatched(v.id));
    }

    // 4. Arama Sorgusu Filtresi
    const query = state.resources.ytSearchQuery;
    if (query) {
        videos = videos.filter(v => 
            v.title.toLowerCase().includes(query) ||
            (v.description && v.description.toLowerCase().includes(query)) ||
            (v.badge && v.badge.toLowerCase().includes(query)) ||
            (v.playlistName && v.playlistName.toLowerCase().includes(query)) ||
            (v.channelName && v.channelName.toLowerCase().includes(query))
        );
    }

    if (badge) {
        badge.textContent = `${videos.length} Video Gösteriliyor`;
    }

    if (videos.length === 0) {
        let emptyMsg = "Aradığınız kriterde video bulunamadı.";
        if (watchStatus === 'watched') {
            emptyMsg = "Henüz izlendi olarak işaretlediğiniz video bulunmuyor. Bir videoyu izlediğinizde üzerindeki onay butonuna tıklayabilirsiniz.";
        } else if (watchStatus === 'unwatched') {
            emptyMsg = "Tebrikler! Bu kategorideki tüm videoları izlediniz 🎉";
        }
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; padding: 2.5rem 1rem;">
                <i class="fa-brands fa-youtube text-dim" style="font-size: 2.5rem; margin-bottom: 0.75rem;"></i>
                <h4>Video Bulunamadı</h4>
                <p class="text-muted">${emptyMsg}</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = '';
    videos.forEach(v => {
        const isWatched = db.isVideoWatched(v.id);
        const card = document.createElement('div');
        card.className = `yt-video-card ${isWatched ? 'is-watched' : ''}`;

        // Check if ID is a YouTube ID (11 chars)
        const isYtId = v.id && v.id.length === 11 && !v.id.includes('-');
        const thumbUrl = isYtId 
            ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`
            : `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60`;

        const watchUrl = v.url || (isYtId ? `https://www.youtube.com/watch?v=${v.id}` : '#');

        card.innerHTML = `
            <div class="yt-thumbnail-wrap" data-play-vid="${v.id}">
                <img src="${thumbUrl}" alt="${escapeHtml(v.title)}" class="yt-thumbnail-img" onerror="this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60'">
                <div class="yt-play-overlay">
                    <div class="yt-play-btn-circle"><i class="fa-solid fa-play" style="margin-left: 3px;"></i></div>
                </div>
                ${isWatched ? `<div class="yt-watched-badge-top"><i class="fa-solid fa-circle-check"></i> İzlendi</div>` : ''}
                ${v.duration ? `<span class="yt-video-duration">${escapeHtml(v.duration)}</span>` : ''}
            </div>
            <div class="yt-card-body">
                <div style="display: flex; gap: 0.4rem; align-items: center; margin-bottom: 0.4rem; flex-wrap: wrap;">
                    <span class="badge ${isWatched ? 'badge-success' : 'badge-rose'}" style="font-size: 0.72rem;">${escapeHtml(v.badge || 'Video Ders')}</span>
                    ${v.playlistName ? `<span class="badge badge-indigo" style="font-size: 0.72rem;"><i class="fa-solid fa-list-ul"></i> ${escapeHtml(v.playlistName)}</span>` : ''}
                    ${v.views ? `<span style="font-size: 0.75rem; color: var(--text-dim);"><i class="fa-regular fa-eye"></i> ${v.views}</span>` : ''}
                </div>
                <h4 class="yt-video-title" data-play-vid="${v.id}" title="${escapeHtml(v.title)}">${escapeHtml(v.title)}</h4>
                <p class="yt-video-desc">${escapeHtml(v.description || '')}</p>
            </div>
            <div class="yt-card-footer">
                <span style="font-size: 0.76rem; font-weight: 600; color: #cbd5e1; display: flex; align-items: center; gap: 0.4rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 140px;">
                    <i class="fa-brands fa-youtube text-rose"></i> ${escapeHtml(v.channelName || 'Sorularla Yüksel')}
                </span>
                <div style="display: flex; gap: 0.35rem; align-items: center;">
                    <button class="btn btn-sm ${isWatched ? 'btn-success' : 'btn-outline-light'} yt-toggle-watched-btn" data-watch-vid="${v.id}" title="${isWatched ? 'İzlenmedi olarak işaretlemek için tıkla' : 'İzlendi olarak işaretle'}" style="padding: 0.3rem 0.55rem; font-size: 0.78rem;">
                        <i class="fa-solid ${isWatched ? 'fa-circle-check' : 'fa-check'}"></i>
                    </button>
                    <button class="btn btn-sm btn-primary" data-play-vid="${v.id}" style="padding: 0.3rem 0.65rem; font-size: 0.78rem;">
                        <i class="fa-solid fa-play"></i> İzle
                    </button>
                    <a href="${watchUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" style="padding: 0.3rem 0.55rem; font-size: 0.78rem;" title="YouTube'da Aç">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                    ${v.isCustom ? `
                        <button class="btn btn-sm btn-outline-danger yt-del-custom-btn" data-del-vid="${v.id}" style="padding: 0.3rem 0.5rem; font-size: 0.78rem;" title="Listemden Sil">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;

        card.querySelectorAll('[data-play-vid]').forEach(el => {
            el.addEventListener('click', () => {
                openVideoPlayerModal(v.id, v.title, v.channelName, watchUrl);
            });
        });

        // Kart üzerinden hızlıca izlendi / izlenmedi toggle
        card.querySelector('.yt-toggle-watched-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            const vidId = e.currentTarget.getAttribute('data-watch-vid');
            const res = db.toggleVideoWatched(vidId);
            if (res) {
                showToast("Video 'İzlendi' olarak kaydedildi! ✅", "success", 2000);
            } else {
                showToast("Video 'İzlenmedi' durumuna alındı.", "info", 2000);
            }
            renderYoutubeVideos();
        });

        // Kullanıcının kendi eklediği videoyu silmesi
        card.querySelector('.yt-del-custom-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            const vidId = e.currentTarget.getAttribute('data-del-vid');
            if (confirm("Bu videoyu özel listenizden silmek istediğinize emin misiniz?")) {
                db.deleteCustomYoutubeVideo(vidId);
                showToast("Video listenizden silindi.", "info", 2000);
                renderYoutubeSection();
            }
        });

        grid.appendChild(card);
    });
}

function renderOsymResources() {
    const container = document.getElementById('resources-grid-container');
    const badge = document.getElementById('resources-count-badge');
    if (!container) return;

    // 1. İstatistikleri Güncelle (Tüm / İncelenmeyen / İncelendi & İlerleme Çubuğu)
    const stats = db.getResourceVisitStats(state.resources.category, state.resources.type);
    const countAllEl = document.getElementById('res-count-all');
    const countUnvisitedEl = document.getElementById('res-count-unvisited');
    const countVisitedEl = document.getElementById('res-count-visited');
    const progressTextEl = document.getElementById('res-visit-progress-text');
    const progressBarEl = document.getElementById('res-visit-progress-bar');

    if (countAllEl) countAllEl.textContent = stats.total;
    if (countUnvisitedEl) countUnvisitedEl.textContent = stats.unvisited;
    if (countVisitedEl) countVisitedEl.textContent = stats.visited;
    if (progressTextEl) progressTextEl.textContent = `${stats.visited} / ${stats.total} İncelenen (%${stats.percent})`;
    if (progressBarEl) progressBarEl.style.width = `${stats.percent}%`;

    // 2. Kaynakları Çek
    let items = db.getResources(state.resources.category, state.resources.type);

    // 3. İncelendi Durumuna Göre Filtrele
    const visitStatus = state.resources.resVisitStatus || 'all';
    if (visitStatus === 'visited') {
        items = items.filter(r => db.isResourceVisited(r.id));
    } else if (visitStatus === 'unvisited') {
        items = items.filter(r => !db.isResourceVisited(r.id));
    }

    // 4. Arama Filtresi
    const query = state.resources.searchQuery;
    if (query) {
        items = items.filter(r =>
            r.title.toLowerCase().includes(query) ||
            r.provider.toLowerCase().includes(query) ||
            r.description.toLowerCase().includes(query) ||
            (r.subCategory && r.subCategory.toLowerCase().includes(query)) ||
            (r.badge && r.badge.toLowerCase().includes(query))
        );
    }

    if (badge) {
        badge.textContent = `${items.length} Kaynak Gösteriliyor`;
    }

    if (items.length === 0) {
        let emptyMsg = "Aradığınız kriterde kaynak bulunamadı.";
        if (visitStatus === 'visited') {
            emptyMsg = "Henüz incelendi olarak işaretlediğiniz kaynak bulunmuyor. Bir siteyi incelediğinizde onay butonuna basabilirsiniz.";
        } else if (visitStatus === 'unvisited') {
            emptyMsg = "Tebrikler! Bu kategorideki tüm kaynakları incelediniz 🎉";
        }
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; padding: 2.5rem 1rem;">
                <i class="fa-solid fa-globe text-dim" style="font-size: 2.5rem; margin-bottom: 0.75rem;"></i>
                <h4>Kaynak Bulunamadı</h4>
                <p class="text-muted">${emptyMsg}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    items.forEach(r => {
        const isVisited = db.isResourceVisited(r.id);
        const card = document.createElement('div');
        card.className = `resource-card ${isVisited ? 'is-visited' : ''}`;

        const iconClass = r.type === 'video' ? 'fa-brands fa-youtube' :
                          r.type === 'exam_archive' ? 'fa-solid fa-file-pdf' :
                          r.type === 'interactive' ? 'fa-solid fa-laptop-code' : 'fa-solid fa-building-columns';

        card.innerHTML = `
            <div>
                ${isVisited ? `<div class="res-visited-badge-top"><i class="fa-solid fa-circle-check"></i> İncelendi</div>` : ''}
                <div class="resource-card-top">
                    <div class="resource-icon-box res-icon-${r.type}">
                        <i class="${iconClass}"></i>
                    </div>
                    <div class="resource-meta">
                        <span class="resource-provider">${escapeHtml(r.provider || 'Kaynak')}</span>
                        <h4 class="resource-title">${escapeHtml(r.title)}</h4>
                    </div>
                </div>
                <p class="resource-desc">${escapeHtml(r.description || '')}</p>
            </div>
            <div class="resource-footer">
                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; align-items: center;">
                    <span class="resource-badge-tag ${isVisited ? 'badge-success' : ''}">${escapeHtml(r.badge || 'Kaynak')}</span>
                    ${r.durationOrCount ? `<span class="resource-badge-tag" style="color: #94a3b8;"><i class="fa-regular fa-clock"></i> ${escapeHtml(r.durationOrCount)}</span>` : ''}
                </div>
                <div style="display: flex; gap: 0.35rem; align-items: center;">
                    <button class="btn btn-sm ${isVisited ? 'btn-success' : 'btn-outline-light'} res-toggle-visited-btn" data-visit-id="${r.id}" title="${isVisited ? 'İncelenmedi olarak işaretle' : 'İncelendi olarak işaretle'}" style="padding: 0.35rem 0.55rem; font-size: 0.78rem;">
                        <i class="fa-solid ${isVisited ? 'fa-circle-check' : 'fa-check'}"></i>
                    </button>
                    <button class="btn btn-sm btn-primary res-open-preview-btn" data-res-id="${r.id}" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;">
                        <i class="fa-solid fa-eye"></i> Görüntüle
                    </button>
                    <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" style="padding: 0.35rem 0.55rem; font-size: 0.8rem;" title="Yeni Sekmede Aç">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                    ${r.isCustom ? `
                        <button class="btn btn-sm btn-outline-danger res-del-custom-btn" data-res-id="${r.id}" style="padding: 0.35rem 0.5rem; font-size: 0.78rem;" title="Listemden Sil">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;

        // İncelendi / İncelenmedi butonu
        card.querySelector('.res-toggle-visited-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            const resId = e.currentTarget.getAttribute('data-visit-id');
            const res = db.toggleResourceVisited(resId);
            if (res) {
                showToast("Kaynak 'İncelendi' olarak kaydedildi! ✅", "success", 2000);
            } else {
                showToast("Kaynak 'İncelenmedi' durumuna alındı.", "info", 2000);
            }
            renderOsymResources();
        });

        // Uygulama içi web önizleme butonu
        card.querySelector('.res-open-preview-btn')?.addEventListener('click', () => {
            openWebViewerModal(r.id, r.title, r.url, r.provider);
        });

        // Özel kaynak silme butonu
        card.querySelector('.res-del-custom-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            const resId = e.currentTarget.getAttribute('data-res-id');
            if (confirm("Bu web kaynağını özel listenizden silmek istediğinize emin misiniz?")) {
                db.deleteCustomResource(resId);
                showToast("Kaynak listenizden silindi.", "info", 2000);
                renderOsymResources();
            }
        });

        container.appendChild(card);
    });
}

// ==============================================================================
// 2.7.1. UYGULAMA İÇİ WEB VIEWER (SİTE GÖRÜNTÜLEYİCİ) KONTROLLERİ
// ==============================================================================
let currentViewingResource = { id: null, title: '', url: '', provider: '' };

function openWebViewerModal(resourceId, title, url, provider) {
    const modal = document.getElementById('web-viewer-modal');
    const iframe = document.getElementById('web-viewer-iframe');
    const titleEl = document.getElementById('web-viewer-title');
    const urlBarEl = document.getElementById('web-viewer-url-bar');
    const providerEl = document.getElementById('web-viewer-provider');
    const extLinkEl = document.getElementById('web-viewer-external-link');

    if (!modal || !iframe) return;

    currentViewingResource = { id: resourceId, title, url, provider };

    if (titleEl) titleEl.textContent = title;
    if (urlBarEl) urlBarEl.textContent = url;
    if (providerEl) providerEl.innerHTML = `<i class="fa-solid fa-globe text-indigo"></i> <strong>${escapeHtml(provider || 'Web Kaynağı')}</strong>`;
    if (extLinkEl) extLinkEl.href = url;

    const isVisited = db.isResourceVisited(resourceId);
    updateModalVisitedUI(isVisited);

    iframe.src = url;
    modal.classList.add('active');
}

function updateModalVisitedUI(isVisited) {
    const badgesWrap = document.getElementById('web-viewer-badges');
    const toggleVisitedBtn = document.getElementById('btn-modal-toggle-visited');

    if (badgesWrap) {
        badgesWrap.innerHTML = isVisited 
            ? `<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> İncelendi Olarak Kayıtlı</span>`
            : `<span class="badge badge-indigo"><i class="fa-solid fa-globe"></i> Web Kaynağı Açık</span>`;
    }

    if (toggleVisitedBtn) {
        if (isVisited) {
            toggleVisitedBtn.className = 'btn btn-success btn-sm';
            toggleVisitedBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>İncelendi</span>`;
            toggleVisitedBtn.title = "İncelenmedi olarak işaretlemek için tıkla";
        } else {
            toggleVisitedBtn.className = 'btn btn-outline-success btn-sm';
            toggleVisitedBtn.innerHTML = `<i class="fa-regular fa-circle-check"></i> <span>İncelendi Olarak İşaretle</span>`;
            toggleVisitedBtn.title = "İncelendi olarak işaretle";
        }
    }
}

function handleModalToggleVisited() {
    if (!currentViewingResource.id) return;
    const nextState = db.toggleResourceVisited(currentViewingResource.id);
    updateModalVisitedUI(nextState);
    if (nextState) {
        showToast("Kaynak 'İncelendi' olarak kaydedildi! ✅", "success", 2500);
    } else {
        showToast("Kaynak 'İncelenmedi' durumuna alındı.", "info", 2500);
    }
    renderOsymResources();
}

function closeWebViewerModal() {
    const modal = document.getElementById('web-viewer-modal');
    const iframe = document.getElementById('web-viewer-iframe');
    if (iframe) iframe.src = 'about:blank';
    if (modal) modal.classList.remove('active');
}

// ==============================================================================
// 2.7.2. ÖZEL WEB SİTESİ EKLEME MODAL KONTROLLERİ
// ==============================================================================
function openAddWebsiteModal() {
    const modal = document.getElementById('add-website-modal');
    if (modal) {
        document.getElementById('add-website-form')?.reset();
        modal.classList.add('active');
        setTimeout(() => document.getElementById('new-res-url')?.focus(), 150);
    }
}

function closeAddWebsiteModal() {
    const modal = document.getElementById('add-website-modal');
    if (modal) modal.classList.remove('active');
}

function handleAddWebsiteSubmit(e) {
    e.preventDefault();
    const url = document.getElementById('new-res-url').value.trim();
    const title = document.getElementById('new-res-title').value.trim();
    const provider = document.getElementById('new-res-provider').value.trim();
    const category = document.getElementById('new-res-category').value;
    const type = document.getElementById('new-res-type').value;
    const desc = document.getElementById('new-res-desc').value.trim();

    if (!url || !title) {
        showToast("Lütfen site linki ve başlığını girin.", "warning");
        return;
    }

    try {
        const added = db.addCustomResource({
            title,
            url,
            provider: provider || 'Özel Kaynak',
            category,
            type,
            description: desc,
            badge: 'Özel Site ⭐'
        });

        showToast(`"${title}" kaynağı listenize eklendi! 🌐`, "success", 3000);
        closeAddWebsiteModal();
        state.resources.activeTab = 'osym';
        renderResourcesList();
    } catch (err) {
        showToast(err.message || "Ekleme sırasında hata oluştu.", "error", 4000);
    }
}

// In-App Video Player Modal Controls & Watched State
let currentPlayingVideo = { id: null, title: '', channelName: '', url: '' };

function openVideoPlayerModal(videoId, title, channelName, url) {
    const modal = document.getElementById('video-player-modal');
    const iframe = document.getElementById('video-modal-iframe');
    const titleEl = document.getElementById('video-modal-title');
    const channelEl = document.getElementById('video-modal-channel');
    const linkEl = document.getElementById('video-modal-yt-link');

    if (!modal || !iframe) return;

    currentPlayingVideo = { id: videoId, title, channelName, url };

    if (titleEl) titleEl.textContent = title;
    if (channelEl) channelEl.innerHTML = `<i class="fa-brands fa-youtube text-rose"></i> <strong>${escapeHtml(channelName || 'YouTube')}</strong>`;
    if (linkEl) linkEl.href = url || `https://www.youtube.com/watch?v=${videoId}`;
    
    // İzleme durumunu modala yansıt
    const isWatched = db.isVideoWatched(videoId);
    updateModalWatchedUI(isWatched);

    // Embed URL
    const isYtId = videoId && videoId.length === 11 && !videoId.includes('-');
    if (isYtId) {
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    } else if (url && url.includes('youtube.com/watch?v=')) {
        const extractedId = url.split('watch?v=')[1]?.split('&')[0];
        iframe.src = `https://www.youtube-nocookie.com/embed/${extractedId}?autoplay=1&rel=0`;
    } else {
        window.open(url, '_blank');
        return;
    }

    modal.classList.add('active');
}

function updateModalWatchedUI(isWatched) {
    const badgesWrap = document.getElementById('video-modal-badges');
    const toggleWatchedBtn = document.getElementById('btn-modal-toggle-watched');

    if (badgesWrap) {
        badgesWrap.innerHTML = isWatched 
            ? `<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> İzlendi Olarak Kayıtlı</span>`
            : `<span class="badge badge-rose"><i class="fa-solid fa-play"></i> Video Oynatılıyor</span>`;
    }

    if (toggleWatchedBtn) {
        if (isWatched) {
            toggleWatchedBtn.className = 'btn btn-success btn-sm';
            toggleWatchedBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>İzlendi</span>`;
            toggleWatchedBtn.title = "İzlenmedi olarak işaretlemek için tıkla";
        } else {
            toggleWatchedBtn.className = 'btn btn-outline-success btn-sm';
            toggleWatchedBtn.innerHTML = `<i class="fa-regular fa-circle-check"></i> <span>İzlendi Olarak İşaretle</span>`;
            toggleWatchedBtn.title = "İzlendi olarak işaretle";
        }
    }
}

function handleModalToggleWatched() {
    if (!currentPlayingVideo.id) return;
    const nextState = db.toggleVideoWatched(currentPlayingVideo.id);
    updateModalWatchedUI(nextState);
    if (nextState) {
        showToast("Video 'İzlendi' olarak kaydedildi! ✅", "success", 2500);
    } else {
        showToast("Video 'İzlenmedi' durumuna alındı.", "info", 2500);
    }
    renderYoutubeVideos();
}

function closeVideoPlayerModal() {
    const modal = document.getElementById('video-player-modal');
    const iframe = document.getElementById('video-modal-iframe');
    if (iframe) iframe.src = 'about:blank'; // Stop video playback
    if (modal) modal.classList.remove('active');
}

// Custom Video & Channel Modal Controls
function openAddChannelModal(mode = 'video') {
    const modal = document.getElementById('add-channel-modal');
    if (modal) {
        document.getElementById('add-channel-form')?.reset();
        setAddYtMode(mode);
        modal.classList.add('active');
        setTimeout(() => document.getElementById('new-channel-url')?.focus(), 150);
    }
}

function setAddYtMode(mode) {
    const modeInput = document.getElementById('add-yt-mode');
    const tabs = document.querySelectorAll('#add-yt-type-tabs [data-type-tab]');
    const lblUrl = document.getElementById('lbl-channel-url');
    const inputUrl = document.getElementById('new-channel-url');
    const hintUrl = document.getElementById('hint-channel-url');
    const lblName = document.getElementById('lbl-channel-name');
    const inputName = document.getElementById('new-channel-name');
    const rowDuration = document.getElementById('row-video-duration');
    const btnSubmitText = document.getElementById('btn-submit-yt-text');

    if (modeInput) modeInput.value = mode;

    tabs.forEach(t => {
        if (t.getAttribute('data-type-tab') === mode) {
            t.classList.add('active');
        } else {
            t.classList.remove('active');
        }
    });

    if (mode === 'video') {
        if (lblUrl) lblUrl.innerHTML = `YouTube Video Linki <span class="required" style="color: var(--danger);">*</span>`;
        if (inputUrl) inputUrl.placeholder = "https://www.youtube.com/watch?v=... veya https://youtu.be/...";
        if (hintUrl) hintUrl.textContent = "YouTube video bağlantısını yapıştırın (watch?v=..., youtu.be/... veya shorts/...).";
        if (lblName) lblName.innerHTML = `Video Başlığı <span class="required" style="color: var(--danger);">*</span>`;
        if (inputName) inputName.placeholder = "Örn: ALES Sayısal Mantık Çıkmış Soru Çözümü";
        if (rowDuration) rowDuration.style.display = 'flex';
        if (btnSubmitText) btnSubmitText.textContent = "Videoyu Listeme Ekle";
    } else {
        if (lblUrl) lblUrl.innerHTML = `YouTube Kanalı veya Liste Linki <span class="required" style="color: var(--danger);">*</span>`;
        if (inputUrl) inputUrl.placeholder = "https://youtube.com/@egitimserisi5115 veya https://youtube.com/playlist?list=...";
        if (hintUrl) hintUrl.textContent = "Kanal kullanıcı adı (@kanal) veya oynatma listesi URL'sini girin.";
        if (lblName) lblName.innerHTML = `Kanal / Liste Adı <span class="required" style="color: var(--danger);">*</span>`;
        if (inputName) inputName.placeholder = "Örn: Sorularla Yüksel - Bankacılık";
        if (rowDuration) rowDuration.style.display = 'none';
        if (btnSubmitText) btnSubmitText.textContent = "Kanalı Listeme Ekle";
    }
}

function closeAddChannelModal() {
    const modal = document.getElementById('add-channel-modal');
    if (modal) modal.classList.remove('active');
}

function handleAddChannelSubmit(e) {
    e.preventDefault();
    const mode = document.getElementById('add-yt-mode')?.value || 'video';
    const url = document.getElementById('new-channel-url').value.trim();
    const name = document.getElementById('new-channel-name').value.trim();
    const category = document.getElementById('new-channel-category').value;
    const desc = document.getElementById('new-channel-desc').value.trim();
    const duration = document.getElementById('new-channel-duration')?.value.trim();

    if (!url || !name) {
        showToast("Lütfen link ve başlık alanlarını doldurun.", "warning");
        return;
    }

    try {
        if (mode === 'video') {
            const added = db.addCustomYoutubeVideo({
                title: name,
                url,
                category,
                description: desc,
                duration: duration || 'Video'
            });
            showToast(`"${name}" videonuz başarıyla eklendi! 🎬`, "success", 3000);
            closeAddChannelModal();
            state.resources.selectedChannelId = 'channel-custom-my-videos';
            state.resources.activeTab = 'youtube';
            renderResourcesList();
        } else {
            const added = db.addCustomYoutubeChannel({
                name,
                url,
                category,
                description: desc,
                badge: 'Öğrenci Ekledi ⭐'
            });
            showToast(`"${name}" kanalı başarıyla eklendi! 📺`, "success", 3000);
            closeAddChannelModal();
            state.resources.selectedChannelId = added.id;
            state.resources.activeTab = 'youtube';
            renderResourcesList();
        }
    } catch (err) {
        showToast(err.message || "Ekleme sırasında hata oluştu.", "error", 4000);
    }
}

// ==============================================================================
// 2.8. KİŞİSEL NOTLARIM & BİLGİ PANOSU MODÜLÜ
// ==============================================================================
let currentDetailNoteId = null;

function initNotesMode() {
    const searchInput = document.getElementById('notes-search-input');
    const searchClearBtn = document.getElementById('notes-search-clear');
    const priorityFilter = document.getElementById('notes-priority-filter');
    const sortSelect = document.getElementById('notes-sort-select');
    const categoryBtns = document.querySelectorAll('#notes-category-pills [data-note-sec]');
    const layoutBtns = document.querySelectorAll('.btn-layout-toggle');
    const btnCreate = document.getElementById('btn-create-note');
    const btnExport = document.getElementById('btn-export-notes');
    const btnFlashReview = document.getElementById('btn-flash-review');
    const btnPrintNotes = document.getElementById('btn-print-notes');
    const btnImportNotes = document.getElementById('btn-import-notes-modal');

    // 1. Kategori Seçimleri
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            state.notes.category = e.currentTarget.getAttribute('data-note-sec');
            renderNotesList();
        });
    });

    // 2. Arama Çubuğu
    searchInput?.addEventListener('input', (e) => {
        const val = e.target.value.trim().toLowerCase();
        state.notes.searchQuery = val;
        if (searchClearBtn) {
            searchClearBtn.style.display = val ? 'block' : 'none';
        }
        renderNotesList();
    });

    searchClearBtn?.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        state.notes.searchQuery = '';
        searchClearBtn.style.display = 'none';
        renderNotesList();
    });

    // 3. Öncelik Filtresi
    priorityFilter?.addEventListener('change', (e) => {
        state.notes.priority = e.target.value;
        renderNotesList();
    });

    // 4. Sıralama Seçimi
    sortSelect?.addEventListener('change', (e) => {
        state.notes.sort = e.target.value;
        renderNotesList();
    });

    // 5. Görünüm Değiştirici (Kartlar vs Tablo)
    layoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            layoutBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            state.notes.viewMode = e.currentTarget.getAttribute('data-layout');
            renderNotesList();
        });
    });

    // 6. Üst Çubuk Eylemleri
    btnCreate?.addEventListener('click', () => {
        openNoteEditorModal(null);
    });

    btnFlashReview?.addEventListener('click', () => {
        openFlashReviewModal();
    });

    btnPrintNotes?.addEventListener('click', () => {
        printNotesStudySheet();
    });

    btnImportNotes?.addEventListener('click', () => {
        openImportNotesModal();
    });

    btnExport?.addEventListener('click', () => {
        handleExportNotesMenu();
    });

    // 7. Not Editör Modalı Sekmeleri (Yaz vs Canlı Önizle)
    const tabBtnWrite = document.getElementById('tab-btn-write');
    const tabBtnPreview = document.getElementById('tab-btn-preview');
    const writePane = document.getElementById('note-editor-write-pane');
    const previewPane = document.getElementById('note-editor-preview-pane');
    const contentText = document.getElementById('note-form-content');

    const switchEditorTab = (tab) => {
        state.notes.editorTab = tab;
        if (tab === 'write') {
            tabBtnWrite?.classList.add('active');
            tabBtnPreview?.classList.remove('active');
            if (writePane) writePane.style.display = 'block';
            if (previewPane) previewPane.style.display = 'none';
        } else {
            tabBtnPreview?.classList.add('active');
            tabBtnWrite?.classList.remove('active');
            if (writePane) writePane.style.display = 'none';
            if (previewPane) {
                previewPane.style.display = 'block';
                const currentText = contentText ? contentText.value : '';
                previewPane.innerHTML = formatLectureContent(currentText) || '<p class="text-muted" style="font-style: italic;">Henüz içerik yazılmadı...</p>';
            }
        }
    };

    tabBtnWrite?.addEventListener('click', () => switchEditorTab('write'));
    tabBtnPreview?.addEventListener('click', () => switchEditorTab('preview'));

    // Editör Şablon Seçici
    const templateSelect = document.getElementById('note-template-select');
    templateSelect?.addEventListener('change', (e) => {
        const tplKey = e.target.value;
        if (!tplKey || !contentText) return;
        insertNoteTemplate(tplKey, contentText);
        e.target.value = '';
        if (state.notes.editorTab === 'preview' && previewPane) {
            previewPane.innerHTML = formatLectureContent(contentText.value);
        }
    });

    // Editör Etkinlikleri
    document.getElementById('btn-close-note-editor')?.addEventListener('click', closeNoteEditorModal);
    document.getElementById('btn-cancel-note-editor')?.addEventListener('click', closeNoteEditorModal);
    document.getElementById('note-editor-form')?.addEventListener('submit', handleNoteFormSubmit);

    // Markdown Hızlı Ekleme Araç Çubuğu
    document.querySelectorAll('#note-editor-md-toolbar .btn-md-tool').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tool = e.currentTarget.getAttribute('data-md');
            insertMarkdownToTextarea(tool);
            if (state.notes.editorTab === 'preview' && previewPane && contentText) {
                previewPane.innerHTML = formatLectureContent(contentText.value);
            }
        });
    });

    // Not Detay Modalı Etkinlikleri
    document.getElementById('btn-close-note-detail')?.addEventListener('click', closeNoteDetailModal);
    document.getElementById('btn-copy-note-detail')?.addEventListener('click', () => {
        if (currentDetailNoteId) copyNoteContent(currentDetailNoteId);
    });
    document.getElementById('btn-edit-note-detail')?.addEventListener('click', () => {
        if (currentDetailNoteId) {
            const id = currentDetailNoteId;
            closeNoteDetailModal();
            openNoteEditorModal(id);
        }
    });

    // Hızlı Tekrar Modalı Etkinlikleri
    document.getElementById('btn-close-flash-review')?.addEventListener('click', closeFlashReviewModal);
    document.getElementById('btn-flash-prev')?.addEventListener('click', () => navigateFlashReview(-1));
    document.getElementById('btn-flash-next')?.addEventListener('click', () => navigateFlashReview(1));

    // İçe Aktarma Modalı Etkinlikleri
    document.getElementById('btn-close-import-modal')?.addEventListener('click', closeImportNotesModal);
    document.getElementById('btn-cancel-import-notes')?.addEventListener('click', closeImportNotesModal);
    document.getElementById('btn-submit-import-notes')?.addEventListener('click', handleImportNotesSubmit);
    document.getElementById('import-notes-file')?.addEventListener('change', handleImportFileInput);

    // Sayfa Yüklendiğinde render
    document.addEventListener('view-notes-loaded', renderNotesList);
    renderNotesList();
}

function renderNotesList() {
    const cardsContainer = document.getElementById('notes-cards-container');
    const tableContainer = document.getElementById('notes-table-container');
    const tableBody = document.getElementById('notes-table-body');
    if (!cardsContainer) return;

    const allNotes = db.getUserNotes(state.notes.sort || 'smart');

    // İstatistik ve Sayaçları Güncelle
    const totalCountEl = document.getElementById('notes-total-count');
    const pinnedCountEl = document.getElementById('notes-pinned-count');
    const p0CountEl = document.getElementById('notes-p0-count');

    if (totalCountEl) totalCountEl.textContent = allNotes.length;
    if (pinnedCountEl) pinnedCountEl.textContent = allNotes.filter(n => n.is_pinned).length;
    if (p0CountEl) p0CountEl.textContent = allNotes.filter(n => n.priority === 'P0').length;

    // Dinamik Etiket Bulutunu Güncelle
    renderNotesTagCloud();

    // Filtreleri Uygula
    let filtered = [...allNotes];

    if (state.notes.category && state.notes.category !== 'all') {
        filtered = filtered.filter(n => n.section === state.notes.category);
    }

    if (state.notes.priority === 'pinned') {
        filtered = filtered.filter(n => n.is_pinned);
    } else if (state.notes.priority && state.notes.priority !== 'all') {
        filtered = filtered.filter(n => n.priority === state.notes.priority);
    }

    if (state.notes.activeTag) {
        const tagLower = state.notes.activeTag.toLowerCase();
        filtered = filtered.filter(n => Array.isArray(n.tags) && n.tags.some(t => t.toLowerCase() === tagLower));
    }

    const query = state.notes.searchQuery;
    if (query) {
        filtered = filtered.filter(n => 
            (n.title && n.title.toLowerCase().includes(query)) ||
            (n.content && n.content.toLowerCase().includes(query)) ||
            (n.tags && n.tags.some(t => t.toLowerCase().includes(query)))
        );
    }

    // Aktif filtrelenmiş listeyi hızlı tekrar ve yazdırma için sakla
    state.notes.flashNotes = filtered;

    const sectionLabels = {
        'bankacilik-genel-kultur': 'Bankacılık & GK',
        'oruntu-analitik': 'Örüntü & Mantık',
        'ingilizce': 'İngilizce',
        'alan': 'Bilgisayar & YZ',
        'genel': 'Sınav Taktikleri'
    };

    const sectionBadges = {
        'bankacilik-genel-kultur': 'badge-amber',
        'oruntu-analitik': 'badge-purple',
        'ingilizce': 'badge-indigo',
        'alan': 'badge-emerald',
        'genel': 'badge-neutral'
    };

    // 1. KART GÖRÜNÜMÜ
    if (state.notes.viewMode === 'cards') {
        cardsContainer.style.display = 'grid';
        if (tableContainer) tableContainer.style.display = 'none';

        if (filtered.length === 0) {
            cardsContainer.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; padding: 3rem 1.5rem;">
                    <i class="fa-solid fa-note-sticky text-dim" style="font-size: 2.75rem; margin-bottom: 0.85rem;"></i>
                    <h4>Kriterlerinize uygun not bulunamadı</h4>
                    <p class="text-muted" style="margin-bottom: 1.25rem;">Filtrelerinizi sıfırlayabilir veya hemen yeni bir çalışma notu ekleyebilirsiniz.</p>
                    <button class="btn btn-primary" onclick="document.getElementById('btn-create-note').click()">
                        <i class="fa-solid fa-plus"></i> Yeni Not Oluştur
                    </button>
                </div>
            `;
            return;
        }

        cardsContainer.innerHTML = '';
        filtered.forEach(note => {
            const card = document.createElement('div');
            card.className = `note-card note-theme-${note.color || 'indigo'} ${note.is_pinned ? 'is-pinned' : ''}`;
            card.id = `note-card-${note.id}`;

            const priorityHtml = note.priority === 'P0' 
                ? '<span class="badge badge-p0"><i class="fa-solid fa-fire"></i> P0 Kesin Çıkar</span>'
                : note.priority === 'P1'
                ? '<span class="badge badge-p1"><i class="fa-solid fa-star"></i> P1 Önemli</span>'
                : '<span class="badge badge-p2"><i class="fa-regular fa-bookmark"></i> P2 Not</span>';

            const tagsHtml = (note.tags && note.tags.length > 0)
                ? note.tags.map(t => `<span class="note-tag-chip" data-click-tag="${escapeHtml(t)}">#${escapeHtml(t)}</span>`).join('')
                : '';

            const updatedStr = formatNoteDate(note.updated_at || note.created_at);

            card.innerHTML = `
                <div class="note-card-header">
                    <div class="note-badges-wrap">
                        <span class="badge ${sectionBadges[note.section] || 'badge-indigo'}">
                            ${sectionLabels[note.section] || 'Genel'}
                        </span>
                        ${priorityHtml}
                    </div>
                    <button class="note-pin-btn ${note.is_pinned ? 'active' : ''}" data-pin-id="${note.id}" title="${note.is_pinned ? 'Sabitlemeyi Kaldır' : 'Başa Tuttur'}">
                        <i class="${note.is_pinned ? 'fa-solid fa-thumbtack text-amber' : 'fa-solid fa-thumbtack text-dim'}"></i>
                    </button>
                </div>

                <div class="note-card-body">
                    <h3 class="note-card-title" data-view-note="${note.id}">${escapeHtml(note.title)}</h3>
                    ${tagsHtml ? `<div class="note-tags-wrap">${tagsHtml}</div>` : ''}
                    <div class="note-content-preview" data-view-note="${note.id}">
                        ${formatLectureContent(note.content)}
                    </div>
                </div>

                <div class="note-card-footer">
                    <span class="note-date-text"><i class="fa-regular fa-clock"></i> ${updatedStr}</span>
                    <div class="note-actions-wrap">
                        <button class="btn-note-icon" data-copy-note="${note.id}" title="İçeriği Kopyala">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                        <button class="btn-note-icon" data-edit-note="${note.id}" title="Düzenle">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="btn-note-icon btn-note-danger" data-delete-note="${note.id}" title="Sil">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            `;

            // Olay dinleyicileri
            card.querySelectorAll('[data-view-note]').forEach(el => {
                el.addEventListener('click', () => openNoteDetailModal(note.id));
            });

            card.querySelectorAll('[data-click-tag]').forEach(el => {
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const tag = e.currentTarget.getAttribute('data-click-tag');
                    state.notes.activeTag = tag;
                    renderNotesList();
                });
            });

            card.querySelector('[data-pin-id]')?.addEventListener('click', (e) => {
                e.stopPropagation();
                handleNotePinToggle(note.id);
            });

            card.querySelector('[data-copy-note]')?.addEventListener('click', (e) => {
                e.stopPropagation();
                copyNoteContent(note.id);
            });

            card.querySelector('[data-edit-note]')?.addEventListener('click', (e) => {
                e.stopPropagation();
                openNoteEditorModal(note.id);
            });

            card.querySelector('[data-delete-note]')?.addEventListener('click', (e) => {
                e.stopPropagation();
                handleNoteDelete(note.id);
            });

            cardsContainer.appendChild(card);
        });

    } else {
        // 2. HIZLI TEKRAR TABLOSU (CHEAT SHEET)
        cardsContainer.style.display = 'none';
        if (tableContainer) tableContainer.style.display = 'block';
        if (!tableBody) return;

        if (filtered.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
                        Aradığınız kriterde not bulunamadı.
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = '';
        filtered.forEach(note => {
            const tr = document.createElement('tr');
            if (note.is_pinned) tr.className = 'is-pinned-row';

            const priorityBadge = note.priority === 'P0' 
                ? '<span class="badge badge-p0">P0</span>'
                : note.priority === 'P1'
                ? '<span class="badge badge-p1">P1</span>'
                : '<span class="badge badge-p2">P2</span>';

            const summaryText = note.content.replace(/[#*`>|]/g, '').replace(/\n+/g, ' ').trim().substring(0, 85) + '...';
            const updatedStr = formatNoteDate(note.updated_at || note.created_at);

            tr.innerHTML = `
                <td style="text-align: center;">
                    <button class="note-pin-btn ${note.is_pinned ? 'active' : ''}" data-pin-id="${note.id}" style="font-size: 0.95rem;">
                        <i class="${note.is_pinned ? 'fa-solid fa-thumbtack text-amber' : 'fa-solid fa-thumbtack text-dim'}"></i>
                    </button>
                </td>
                <td style="text-align: center;">${priorityBadge}</td>
                <td>
                    <span class="badge ${sectionBadges[note.section] || 'badge-neutral'}">
                        ${sectionLabels[note.section] || 'Genel'}
                    </span>
                </td>
                <td>
                    <div class="notes-table-title" data-view-note="${note.id}">${escapeHtml(note.title)}</div>
                    ${note.tags && note.tags.length > 0 ? `<div style="font-size: 0.73rem; color: var(--text-muted); margin-top: 2px;">${note.tags.map(t => `#${escapeHtml(t)}`).join(' ')}</div>` : ''}
                </td>
                <td style="color: #94a3b8; font-size: 0.83rem; cursor: pointer;" data-view-note="${note.id}">
                    ${escapeHtml(summaryText)}
                </td>
                <td style="text-align: center; font-size: 0.78rem; color: var(--text-dim); white-space: nowrap;">
                    ${updatedStr}
                </td>
                <td style="text-align: center; white-space: nowrap;">
                    <div style="display: inline-flex; gap: 4px;">
                        <button class="btn-note-icon" data-view-note="${note.id}" title="İncele"><i class="fa-solid fa-eye"></i></button>
                        <button class="btn-note-icon" data-edit-note="${note.id}" title="Düzenle"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn-note-icon btn-note-danger" data-delete-note="${note.id}" title="Sil"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </td>
            `;

            tr.querySelectorAll('[data-view-note]').forEach(el => {
                el.addEventListener('click', () => openNoteDetailModal(note.id));
            });

            tr.querySelector('[data-pin-id]')?.addEventListener('click', (e) => {
                e.stopPropagation();
                handleNotePinToggle(note.id);
            });

            tr.querySelector('[data-edit-note]')?.addEventListener('click', (e) => {
                e.stopPropagation();
                openNoteEditorModal(note.id);
            });

            tr.querySelector('[data-delete-note]')?.addEventListener('click', (e) => {
                e.stopPropagation();
                handleNoteDelete(note.id);
            });

            tableBody.appendChild(tr);
        });
    }
}

// Dinamik Etiket Bulutu Çizimi
function renderNotesTagCloud() {
    const container = document.getElementById('notes-tag-cloud-container');
    if (!container) return;

    const tags = db.getAllUserNoteTags();
    if (!tags || tags.length === 0) {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'flex';
    let html = `
        <span class="tag-cloud-title"><i class="fa-solid fa-tags"></i> Etiketler:</span>
        <button type="button" class="tag-cloud-chip ${!state.notes.activeTag ? 'active' : ''}" data-filter-tag="">
            Tümü
        </button>
    `;

    tags.forEach(t => {
        const isActive = state.notes.activeTag && state.notes.activeTag.toLowerCase() === t.tag.toLowerCase();
        html += `
            <button type="button" class="tag-cloud-chip ${isActive ? 'active' : ''}" data-filter-tag="${escapeHtml(t.tag)}">
                #${escapeHtml(t.tag)} <span class="tag-cloud-count">${t.count}</span>
            </button>
        `;
    });

    container.innerHTML = html;

    container.querySelectorAll('[data-filter-tag]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tag = e.currentTarget.getAttribute('data-filter-tag');
            state.notes.activeTag = tag || null;
            renderNotesList();
        });
    });
}

// Hızlı Tekrar (Flash Review) Modu
function openFlashReviewModal() {
    const modal = document.getElementById('notes-flash-review-modal');
    if (!modal) return;

    const notes = (state.notes.flashNotes && state.notes.flashNotes.length > 0)
        ? state.notes.flashNotes
        : db.getUserNotes(state.notes.sort || 'smart');

    if (notes.length === 0) {
        showToast("Tekrar edilecek kayıtlı not bulunmuyor.", "warning");
        return;
    }

    state.notes.flashNotes = notes;
    state.notes.flashIndex = 0;

    const filterLabel = document.getElementById('flash-review-filter-label');
    if (filterLabel) {
        if (state.notes.category && state.notes.category !== 'all') {
            filterLabel.textContent = `Bölüm: ${state.notes.category}`;
        } else if (state.notes.activeTag) {
            filterLabel.textContent = `Etiket: #${state.notes.activeTag}`;
        } else {
            filterLabel.textContent = `Tüm Notlar (${notes.length})`;
        }
    }

    renderFlashReviewCard();
    modal.classList.add('active');
    document.addEventListener('keydown', handleFlashReviewKeydown);
}

function closeFlashReviewModal() {
    const modal = document.getElementById('notes-flash-review-modal');
    if (modal) modal.classList.remove('active');
    document.removeEventListener('keydown', handleFlashReviewKeydown);
}

function handleFlashReviewKeydown(e) {
    const modal = document.getElementById('notes-flash-review-modal');
    if (!modal || !modal.classList.contains('active')) return;

    if (e.key === 'ArrowLeft') {
        navigateFlashReview(-1);
    } else if (e.key === 'ArrowRight') {
        navigateFlashReview(1);
    } else if (e.key === 'Escape') {
        closeFlashReviewModal();
    }
}

function navigateFlashReview(direction) {
    const notes = state.notes.flashNotes;
    if (!notes || notes.length === 0) return;

    let newIndex = state.notes.flashIndex + direction;
    if (newIndex < 0) newIndex = notes.length - 1;
    if (newIndex >= notes.length) newIndex = 0;

    state.notes.flashIndex = newIndex;
    renderFlashReviewCard();
}

function renderFlashReviewCard() {
    const notes = state.notes.flashNotes;
    const container = document.getElementById('flash-review-card-container');
    const counterEl = document.getElementById('flash-review-counter');
    if (!notes || notes.length === 0 || !container) return;

    const note = notes[state.notes.flashIndex];
    if (!note) return;

    if (counterEl) {
        counterEl.textContent = `${state.notes.flashIndex + 1} / ${notes.length}`;
    }

    const sectionLabels = {
        'bankacilik-genel-kultur': 'Bankacılık & GK',
        'oruntu-analitik': 'Örüntü & Mantık',
        'ingilizce': 'İngilizce',
        'alan': 'Bilgisayar & YZ',
        'genel': 'Sınav Taktikleri'
    };

    const sectionBadges = {
        'bankacilik-genel-kultur': 'badge-amber',
        'oruntu-analitik': 'badge-purple',
        'ingilizce': 'badge-indigo',
        'alan': 'badge-emerald',
        'genel': 'badge-neutral'
    };

    const priorityHtml = note.priority === 'P0' 
        ? '<span class="badge badge-p0"><i class="fa-solid fa-fire"></i> P0 Kesin Çıkar</span>'
        : note.priority === 'P1'
        ? '<span class="badge badge-p1"><i class="fa-solid fa-star"></i> P1 Önemli</span>'
        : '<span class="badge badge-p2">P2 Not</span>';

    const tagsHtml = (note.tags && note.tags.length > 0)
        ? note.tags.map(t => `<span class="note-tag-chip">#${escapeHtml(t)}</span>`).join('')
        : '';

    container.innerHTML = `
        <div class="flash-card-surface theme-${note.color || 'indigo'}">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                <div style="display: flex; gap: 0.4rem; align-items: center;">
                    <span class="badge ${sectionBadges[note.section] || 'badge-indigo'}">${sectionLabels[note.section] || 'Genel'}</span>
                    ${priorityHtml}
                    ${note.is_pinned ? '<span class="badge badge-amber"><i class="fa-solid fa-thumbtack"></i> Sabit</span>' : ''}
                </div>
                <div style="display: flex; gap: 0.35rem;">
                    <button class="btn-note-icon" id="btn-flash-copy-card" title="Kopyala"><i class="fa-regular fa-copy"></i></button>
                    <button class="btn-note-icon" id="btn-flash-edit-card" title="Düzenle"><i class="fa-solid fa-pen-to-square"></i></button>
                </div>
            </div>

            <h3 style="font-size: 1.35rem; font-weight: 800; color: #ffffff; margin-bottom: 0.5rem; line-height: 1.3;">
                ${escapeHtml(note.title)}
            </h3>

            ${tagsHtml ? `<div style="display: flex; gap: 0.35rem; flex-wrap: wrap; margin-bottom: 1rem;">${tagsHtml}</div>` : ''}

            <div class="lecture-content-viewer note-formatted-content" style="font-size: 0.95rem; line-height: 1.7; color: #e2e8f0;">
                ${formatLectureContent(note.content)}
            </div>
        </div>
    `;

    document.getElementById('btn-flash-copy-card')?.addEventListener('click', () => copyNoteContent(note.id));
    document.getElementById('btn-flash-edit-card')?.addEventListener('click', () => {
        closeFlashReviewModal();
        openNoteEditorModal(note.id);
    });
}

// A4 Sınav Çalışma Föyü Yazdır / PDF Al
function printNotesStudySheet() {
    const notes = (state.notes.flashNotes && state.notes.flashNotes.length > 0)
        ? state.notes.flashNotes
        : db.getUserNotes('smart');

    if (notes.length === 0) {
        showToast("Yazdırılacak not bulunamadı.", "warning");
        return;
    }

    const sectionLabels = {
        'bankacilik-genel-kultur': 'Bankacılık & Genel Kültür',
        'oruntu-analitik': 'Örüntü & Analitik Mantık',
        'ingilizce': 'İngilizce',
        'alan': 'Alan Bilgisi (Bilgisayar & YZ)',
        'genel': 'Sınav Taktikleri'
    };

    let notesHtml = notes.map((n, idx) => `
        <div class="sheet-card" style="break-inside: avoid; page-break-inside: avoid; border: 1px solid #cbd5e1; border-top: 3px solid #334155; border-radius: 6px; padding: 12px 14px; margin-bottom: 14px; background: #fff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
                <h3 style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 0;">${idx + 1}. ${escapeHtml(n.title)} ${n.is_pinned ? '★' : ''}</h3>
                <span style="font-size: 11px; font-weight: 600; color: #64748b; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">${sectionLabels[n.section] || n.section} | ${n.priority}</span>
            </div>
            ${n.tags && n.tags.length > 0 ? `<div style="font-size: 10px; color: #64748b; margin-bottom: 6px;">${n.tags.map(t => '#' + escapeHtml(t)).join(' ')}</div>` : ''}
            <div style="font-size: 12px; line-height: 1.55; color: #334155;">
                ${formatLectureContent(n.content)}
            </div>
        </div>
    `).join('');

    const printWin = window.open('', '_blank');
    if (!printWin) {
        showToast("Yazdırma penceresi tarayıcı tarafından engellendi. Lütfen açılır pencerelere izin verin.", "warning");
        return;
    }

    printWin.document.write(`
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <title>Ziraat Uzman Yardımcılığı - Çalışma Notları Föyü</title>
            <style>
                @page { size: A4; margin: 10mm; }
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #0f172a; margin: 0; padding: 10px; background: #fff; }
                .sheet-header { border-bottom: 2px solid #0f172a; padding-bottom: 8px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: flex-end; }
                .sheet-header h1 { font-size: 18px; margin: 0; font-weight: 800; color: #0f172a; }
                .sheet-header p { font-size: 11px; color: #64748b; margin: 3px 0 0; }
                .sheet-grid { column-count: 2; column-gap: 14px; }
                table { width: 100%; border-collapse: collapse; margin: 6px 0; font-size: 11px; }
                th, td { border: 1px solid #cbd5e1; padding: 4px 6px; text-align: left; }
                th { background: #f8fafc; font-weight: 700; }
                blockquote { border-left: 3px solid #6366f1; background: #f8fafc; padding: 4px 8px; margin: 6px 0; font-style: italic; }
                code { background: #f1f5f9; padding: 1px 4px; border-radius: 3px; font-family: monospace; font-size: 11px; }
                ul { margin: 4px 0 4px 18px; padding: 0; }
                li { margin-bottom: 3px; }
            </style>
        </head>
        <body>
            <div class="sheet-header">
                <div>
                    <h1>Ziraat Bankası Uzman Yardımcılığı Sınavı - Kişisel Çalışma Notları Föyü</h1>
                    <p>Tarih: ${new Date().toLocaleDateString('tr-TR')} | Toplam Not: ${notes.length}</p>
                </div>
            </div>
            <div class="sheet-grid">
                ${notesHtml}
            </div>
            <script>
                window.onload = function() {
                    window.print();
                };
            <\/script>
        </body>
        </html>
    `);
    printWin.document.close();
}

// İçe Aktarma Modalı Kontrolleri
function openImportNotesModal() {
    const modal = document.getElementById('notes-import-modal');
    if (modal) {
        modal.classList.add('active');
        const ta = document.getElementById('import-notes-textarea');
        if (ta) ta.value = '';
    }
}

function closeImportNotesModal() {
    const modal = document.getElementById('notes-import-modal');
    if (modal) modal.classList.remove('active');
}

function handleImportFileInput(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const text = event.target?.result;
        const ta = document.getElementById('import-notes-textarea');
        if (ta && typeof text === 'string') {
            ta.value = text;
        }
    };
    reader.readAsText(file);
}

function handleImportNotesSubmit() {
    const ta = document.getElementById('import-notes-textarea');
    const content = ta?.value.trim();

    if (!content) {
        showToast("Lütfen bir JSON dosyası seçin veya JSON metnini yapıştırın.", "warning");
        return;
    }

    const res = db.importUserNotesFromJSON(content);
    if (res.success) {
        showToast(`${res.count} not başarıyla içe aktarıldı ve birleştirildi! 📥`, "success", 3500);
        closeImportNotesModal();
        renderNotesList();
    } else {
        showToast(res.message || "İçe aktarma başarısız.", "error", 4000);
    }
}

// Dışa Aktarma Menüsü
function handleExportNotesMenu() {
    const md = db.exportUserNotesAsMarkdown();
    const json = db.exportUserNotesAsJSON();

    showConfirmModal({
        title: 'Notları Dışa Aktar',
        message: 'Notlarınızı Markdown (.md) veya tam yedek JSON (.json) formatında indirebilirsiniz.',
        confirmText: '📄 Markdown (.md) İndir',
        cancelText: '📦 JSON Yedek İndir',
        onConfirm: () => {
            downloadBlob(md, `ziraat_calisma_notlarim_${new Date().toISOString().slice(0, 10)}.md`, 'text/markdown');
            showToast("Markdown not dosyası indirildi! 📄", "success");
        },
        onCancel: () => {
            downloadBlob(json, `ziraat_not_yedegi_${new Date().toISOString().slice(0, 10)}.json`, 'application/json');
            showToast("JSON yedek dosyası indirildi! 📦", "success");
        }
    });
}

function downloadBlob(content, filename, type) {
    const blob = new Blob([content], { type: `${type};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Konu Anlatımından Otomatik Not Çıkarma
function openNoteEditorFromLecture(lec) {
    if (!lec) return;
    openNoteEditorModal(null);

    const titleInput = document.getElementById('note-form-title');
    const secSelect = document.getElementById('note-form-section');
    const tagsInput = document.getElementById('note-form-tags');
    const contentText = document.getElementById('note-form-content');
    const prioSelect = document.getElementById('note-form-priority');

    const sectionMap = {
        'alan': 'alan',
        'genel-kultur': 'bankacilik-genel-kultur',
        'genel-yetenek': 'oruntu-analitik',
        'ingilizce': 'ingilizce'
    };

    if (titleInput) titleInput.value = `${lec.title} - Özet Not`;
    if (secSelect) secSelect.value = sectionMap[lec.section] || 'bankacilik-genel-kultur';
    if (prioSelect) prioSelect.value = 'P0';
    if (tagsInput) tagsInput.value = `${lec.topic || ''}, Konu Özeti, Sınav Hap Bilgi`;
    if (contentText) {
        contentText.value = `### 💡 ${lec.title} - Kritik Sınav Notu\n* **Özet:** ${lec.summary || ''}\n\n* **Anahtar Kurallar:**\n  - \n  - \n\n> 🎯 **Sınavda Dikkat Edilmesi Gereken Nokta:** `;
    }

    showToast(`"${lec.title}" konusu için not editörü hazırlandı! ✍️`, "info", 2500);
}

// Hazır Sınav Notu Şablonları
function insertNoteTemplate(type, textarea) {
    let tpl = '';
    switch (type) {
        case 'tip':
            tpl = `### 💡 [Konu Başlığı] Sınav Taktik & Hap Bilgi\n* **Ana Kural:** \n* **Yaygın Çeldirici / Tuzak:** \n> 🎯 **Sınavda Çıkarsa:** `;
            break;
        case 'compare':
            tpl = `### 📊 [Kavram A] vs [Kavram B] Karşılaştırma\n\n| Kriter / Özellik | Kavram A | Kavram B |\n| :--- | :--- | :--- |\n| Tanım | | |\n| Temel Görev | | |\n| Sınav Tuzağı | | |\n\n> 💡 **Özet Ayrım:** `;
            break;
        case 'timeline':
            tpl = `### ⏳ [Konu] Kronoloji & Önemli Tarihler\n* **[Yıl 1]**: İlk gelişme / temel adım\n* **[Yıl 2]**: Yeniden yapılanma / kanun\n* **[Yıl 3]**: Günümüz teşkilat yapısı\n\n> 📌 **Ezber İpucu**: `;
            break;
        case 'formula':
            tpl = `### 📐 [Soru Türü] 5 Adımlı Çözüm Metodu\n1. **1. Adım (Farklar):** \n2. **2. Adım (Kural):** \n3. **3. Adım (Test):** \n4. **4. Adım (Doğrulama):** \n\n* **Formül:** \`...\``;
            break;
        case 'code':
            tpl = `### 💻 [Algoritma / SQL] Temel Mantık\n\`\`\`sql\nSELECT sutun1, COUNT(*)\nFROM tablo\nWHERE kosul\nGROUP BY sutun1\nHAVING COUNT(*) > 1;\n\`\`\`\n\n* **Zaman Karmaşıklığı:** O(...)\n* **Kullanım Alanı:** `;
            break;
        case 'vocab':
            tpl = `### 🇬🇧 [Kelime]: *[Türkçe Anlamı]*\n* **Eş Anlamlılar (Synonyms):** word1, word2\n* **Zıt Anlamlılar (Antonyms):** word3\n* **Örnek Sınav Cümlesi:** *The bank implemented new policies to prevent risk.*\n> 📌 **Kullanıldığı Kalıp (Collocation):** `;
            break;
    }

    if (tpl) {
        const currentVal = textarea.value;
        const prefix = currentVal && !currentVal.endsWith('\n\n') ? (currentVal.endsWith('\n') ? '\n' : '\n\n') : '';
        textarea.value = currentVal ? (currentVal + prefix + tpl) : tpl;
        textarea.focus();
        showToast("Hazır sınav şablonu eklendi! ✍️", "info", 2000);
    }
}

// Not Editör Modalı Açma
function openNoteEditorModal(noteId = null) {
    const modal = document.getElementById('note-editor-modal');
    if (!modal) return;

    state.notes.editingNoteId = noteId;
    state.notes.editorTab = 'write';

    // Sekmeleri sıfırla (Yaz sekmesini aç)
    const tabBtnWrite = document.getElementById('tab-btn-write');
    const tabBtnPreview = document.getElementById('tab-btn-preview');
    const writePane = document.getElementById('note-editor-write-pane');
    const previewPane = document.getElementById('note-editor-preview-pane');

    tabBtnWrite?.classList.add('active');
    tabBtnPreview?.classList.remove('active');
    if (writePane) writePane.style.display = 'block';
    if (previewPane) previewPane.style.display = 'none';

    const modalTitle = document.getElementById('note-editor-title');
    const idInput = document.getElementById('note-form-id');
    const titleInput = document.getElementById('note-form-title');
    const secSelect = document.getElementById('note-form-section');
    const prioSelect = document.getElementById('note-form-priority');
    const pinnedCheck = document.getElementById('note-form-pinned');
    const tagsInput = document.getElementById('note-form-tags');
    const contentText = document.getElementById('note-form-content');

    if (noteId) {
        const note = db.getUserNoteById(noteId);
        if (!note) return;

        if (modalTitle) modalTitle.textContent = 'Çalışma Notunu Düzenle';
        if (idInput) idInput.value = note.id;
        if (titleInput) titleInput.value = note.title;
        if (secSelect) secSelect.value = note.section || 'bankacilik-genel-kultur';
        if (prioSelect) prioSelect.value = note.priority || 'P1';
        if (pinnedCheck) pinnedCheck.checked = !!note.is_pinned;
        if (tagsInput) tagsInput.value = (note.tags || []).join(', ');
        if (contentText) contentText.value = note.content || '';

        const colorRadio = document.querySelector(`input[name="note_color"][value="${note.color || 'indigo'}"]`);
        if (colorRadio) colorRadio.checked = true;

    } else {
        if (modalTitle) modalTitle.textContent = 'Yeni Çalışma Notu Ekle';
        if (idInput) idInput.value = '';
        if (titleInput) titleInput.value = '';
        if (secSelect) secSelect.value = state.notes.category !== 'all' ? state.notes.category : 'bankacilik-genel-kultur';
        if (prioSelect) prioSelect.value = 'P1';
        if (pinnedCheck) pinnedCheck.checked = false;
        if (tagsInput) tagsInput.value = '';
        if (contentText) contentText.value = '';

        const defaultRadio = document.querySelector('input[name="note_color"][value="indigo"]');
        if (defaultRadio) defaultRadio.checked = true;
    }

    modal.classList.add('active');
    setTimeout(() => titleInput?.focus(), 150);
}

function closeNoteEditorModal() {
    const modal = document.getElementById('note-editor-modal');
    if (modal) modal.classList.remove('active');
    state.notes.editingNoteId = null;
}

// Not Formu Kaydetme
function handleNoteFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('note-form-id').value.trim();
    const title = document.getElementById('note-form-title').value.trim();
    const section = document.getElementById('note-form-section').value;
    const priority = document.getElementById('note-form-priority').value;
    const is_pinned = document.getElementById('note-form-pinned').checked;
    const rawTags = document.getElementById('note-form-tags').value.trim();
    const content = document.getElementById('note-form-content').value.trim();
    const checkedColor = document.querySelector('input[name="note_color"]:checked')?.value || 'indigo';

    if (!title || !content) {
        showToast("Lütfen not başlığı ve içeriğini doldurun.", "warning");
        return;
    }

    const tags = rawTags ? rawTags.split(',').map(t => t.trim()).filter(Boolean) : [];

    const notePayload = {
        title,
        section,
        priority,
        is_pinned,
        color: checkedColor,
        tags,
        content
    };

    if (id) {
        notePayload.id = id;
    }

    db.saveUserNote(notePayload);
    showToast(id ? "Not başarıyla güncellendi! 📝" : "Yeni not panoya eklendi! ✨", "success");

    closeNoteEditorModal();
    renderNotesList();
}

// Not Silme
function handleNoteDelete(noteId) {
    const note = db.getUserNoteById(noteId);
    if (!note) return;

    showConfirmModal({
        title: 'Notu Sil',
        message: `"${note.title}" başlıklı notu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`,
        confirmText: 'Evet, Sil',
        cancelText: 'Vazgeç',
        isDanger: true,
        onConfirm: () => {
            db.deleteUserNote(noteId);
            showToast("Not silindi.", "info");
            if (currentDetailNoteId === noteId) {
                closeNoteDetailModal();
            }
            renderNotesList();
        }
    });
}

// Sabitleme Değiştirme
function handleNotePinToggle(noteId) {
    const updated = db.togglePinUserNote(noteId);
    if (updated) {
        if (updated.is_pinned) {
            showToast(`"${updated.title}" başa sabitlendi ⭐`, "success", 2000);
        } else {
            showToast("Sabitleme kaldırıldı.", "info", 1800);
        }
        renderNotesList();
    }
}

// Panoya Kopyalama
function copyNoteContent(noteId) {
    const note = db.getUserNoteById(noteId);
    if (!note) return;

    const copyText = `## ${note.title}\n${note.content}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyText).then(() => {
            showToast("Not içeriği panoya kopyalandı! 📋", "success", 2500);
        }).catch(() => {
            fallbackCopyText(copyText);
        });
    } else {
        fallbackCopyText(copyText);
    }
}

function fallbackCopyText(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        showToast("Not içeriği panoya kopyalandı! 📋", "success", 2500);
    } catch {
        showToast("Kopyalama yapılamadı.", "error");
    }
    document.body.removeChild(ta);
}

// Not Detay Görüntüleme Modalı
function openNoteDetailModal(noteId) {
    const note = db.getUserNoteById(noteId);
    if (!note) return;

    currentDetailNoteId = noteId;
    const modal = document.getElementById('note-detail-modal');
    const badgesWrap = document.getElementById('note-detail-badges');
    const titleEl = document.getElementById('note-detail-title');
    const tagsWrap = document.getElementById('note-detail-tags');
    const contentEl = document.getElementById('note-detail-content');
    const dateEl = document.getElementById('note-detail-date');

    const sectionLabels = {
        'bankacilik-genel-kultur': 'Bankacılık & GK',
        'oruntu-analitik': 'Örüntü & Mantık',
        'ingilizce': 'İngilizce',
        'alan': 'Bilgisayar & YZ',
        'genel': 'Sınav Taktikleri'
    };

    const sectionBadges = {
        'bankacilik-genel-kultur': 'badge-amber',
        'oruntu-analitik': 'badge-purple',
        'ingilizce': 'badge-indigo',
        'alan': 'badge-emerald',
        'genel': 'badge-neutral'
    };

    const priorityHtml = note.priority === 'P0' 
        ? '<span class="badge badge-p0"><i class="fa-solid fa-fire"></i> P0 Kesin Çıkar</span>'
        : note.priority === 'P1'
        ? '<span class="badge badge-p1"><i class="fa-solid fa-star"></i> P1 Önemli</span>'
        : '<span class="badge badge-p2"><i class="fa-regular fa-bookmark"></i> P2 Not</span>';

    if (badgesWrap) {
        badgesWrap.innerHTML = `
            <span class="badge ${sectionBadges[note.section] || 'badge-neutral'}">${sectionLabels[note.section] || 'Genel'}</span>
            ${priorityHtml}
            ${note.is_pinned ? '<span class="badge badge-amber"><i class="fa-solid fa-thumbtack"></i> Sabitlendi</span>' : ''}
        `;
    }

    if (titleEl) titleEl.textContent = note.title;

    if (tagsWrap) {
        if (note.tags && note.tags.length > 0) {
            tagsWrap.innerHTML = note.tags.map(t => `<span class="note-tag-chip">#${escapeHtml(t)}</span>`).join('');
            tagsWrap.style.display = 'flex';
        } else {
            tagsWrap.innerHTML = '';
            tagsWrap.style.display = 'none';
        }
    }

    if (contentEl) {
        contentEl.innerHTML = formatLectureContent(note.content);
    }

    if (dateEl) {
        const fullDate = new Date(note.updated_at || note.created_at).toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        dateEl.textContent = `Son Güncelleme: ${fullDate}`;
    }

    if (modal) modal.classList.add('active');
}

function closeNoteDetailModal() {
    const modal = document.getElementById('note-detail-modal');
    if (modal) modal.classList.remove('active');
    currentDetailNoteId = null;
}

// Markdown Hızlı Ekleme Yardımcısı
function insertMarkdownToTextarea(tool) {
    const textarea = document.getElementById('note-form-content');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);
    let before = textarea.value.substring(0, start);
    let after = textarea.value.substring(end);
    let insert = '';
    let newCursorPos = start;

    switch (tool) {
        case 'bold':
            insert = selected ? `**${selected}**` : '**kalın metin**';
            newCursorPos = start + (selected ? selected.length + 4 : 2);
            break;
        case 'heading':
            insert = selected ? `\n### ${selected}\n` : '\n### Yeni Başlık\n';
            newCursorPos = start + insert.length;
            break;
        case 'list':
            insert = selected ? `\n* ${selected}\n` : '\n* Madde 1\n* Madde 2\n';
            newCursorPos = start + insert.length;
            break;
        case 'quote':
            insert = selected ? `\n> 💡 ${selected}\n` : '\n> 💡 Sınav İpucu Notu...\n';
            newCursorPos = start + insert.length;
            break;
        case 'table':
            insert = '\n| Parametre | Özellik / Değer |\n| :--- | :--- |\n| Konu A | Açıklama A |\n| Konu B | Açıklama B |\n';
            newCursorPos = start + insert.length;
            break;
        case 'code':
            insert = selected ? `\`${selected}\`` : '`kod/terim`';
            newCursorPos = start + (selected ? selected.length + 2 : 1);
            break;
        default:
            return;
    }

    textarea.value = before + insert + after;
    textarea.focus();
    textarea.setSelectionRange(newCursorPos, newCursorPos);
}

function formatNoteDate(isoString) {
    if (!isoString) return '';
    try {
        const d = new Date(isoString);
        return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
    } catch {
        return '';
    }
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
