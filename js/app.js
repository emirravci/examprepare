// ========================================================
// MAIN APPLICATION CONTROLLER
// ========================================================

import { 
    supabase, 
    initAuthListener, 
    showToast, 
    showLoader, 
    hideLoader, 
    showView,
    isSupabaseConfigured 
} from './supabase.js';

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    // 1. Supabase Auth Listener'ı Başlat
    initAuthListener();

    // 2. Mobil ve Masaüstü Navigasyon Butonlarını Bağla
    initNavigationListeners();

    // 3. Profil Formu Dinleyicisi
    initProfileForm();

    // 4. View Yüklenme Eventlerini Dinle
    initViewEventListeners();
});

// ========================================================
// NAVİGASYON VE SEKME YÖNETİMİ
// ========================================================
function initNavigationListeners() {
    const navButtons = document.querySelectorAll('[data-view-target]');

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetView = e.currentTarget.getAttribute('data-view-target');
            if (targetView) {
                // Hem sidebar hem alt menüdeki butonların aktifliğini güncelle
                document.querySelectorAll('[data-view-target]').forEach(b => {
                    b.classList.remove('active');
                    b.closest('.nav-item')?.classList.remove('active');
                });

                document.querySelectorAll(`[data-view-target="${targetView}"]`).forEach(b => {
                    b.classList.add('active');
                    b.closest('.nav-item')?.classList.add('active');
                });

                showView(targetView);
            }
        });
    });
}

// ========================================================
// KULLANICI PROFİLİ VE HEDEFLER
// ========================================================
function initProfileForm() {
    const profileForm = document.getElementById('profile-form');
    if (!profileForm) return;

    // Profil formunu kaydet
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!isSupabaseConfigured() || !supabase) {
            showToast("Supabase henüz bağlı değil. Lütfen js/supabase.js dosyasını güncelleyin.", "warning");
            return;
        }

        showLoader();

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) throw new Error("Oturum açık değil!");

            const userId = session.user.id;
            const fullName = document.getElementById('profile-name')?.value.trim();
            const targetExam = document.getElementById('profile-target-exam')?.value;
            const targetScore = document.getElementById('profile-target-score')?.value.trim();
            const targetDate = document.getElementById('profile-target-date')?.value;

            const profileData = {
                id: userId,
                full_name: fullName,
                target_exam: targetExam,
                target_score: targetScore,
                target_date: targetDate,
                updated_at: new Date().toISOString()
            };

            const { error } = await supabase
                .from('profiles')
                .upsert(profileData);

            if (error) throw error;

            showToast("Profil ve hedefler başarıyla güncellendi!", "success");

            // Header ve dashboard üzerindeki bilgileri güncelle
            updateHeaderAndDashboardProfile(profileData);

        } catch (err) {
            console.error("Profil güncelleme hatası:", err);
            showToast(err.message || "Profil kaydedilirken hata oluştu.", "error");
        } finally {
            hideLoader();
        }
    });

    // Kullanıcı giriş yaptığında profili yükle
    document.addEventListener('auth-user-authenticated', async (e) => {
        const user = e.detail?.user;
        if (user && supabase) {
            loadUserProfile(user.id);
        }
    });
}

async function loadUserProfile(userId) {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (data) {
            const nameInput = document.getElementById('profile-name');
            const examInput = document.getElementById('profile-target-exam');
            const scoreInput = document.getElementById('profile-target-score');
            const dateInput = document.getElementById('profile-target-date');

            if (nameInput) nameInput.value = data.full_name || '';
            if (examInput) examInput.value = data.target_exam || 'YKS-TYT-AYT';
            if (scoreInput) scoreInput.value = data.target_score || '';
            if (dateInput) dateInput.value = data.target_date || '';

            updateHeaderAndDashboardProfile(data);
        }
    } catch (err) {
        console.warn("Profil yüklenirken dikkat (Tablo henüz oluşturulmamış olabilir):", err);
    }
}

function updateHeaderAndDashboardProfile(data) {
    if (data.full_name) {
        const userNameEl = document.getElementById('current-user-name');
        if (userNameEl) userNameEl.textContent = data.full_name;
    }

    if (data.target_exam) {
        const dashExamEl = document.getElementById('dash-target-exam');
        if (dashExamEl) dashExamEl.textContent = data.target_exam;
    }

    if (data.target_date) {
        const daysLeft = calculateDaysLeft(data.target_date);
        const dashDaysEl = document.getElementById('dash-days-left');
        if (dashDaysEl) {
            dashDaysEl.textContent = daysLeft !== null ? `${daysLeft} Gün` : 'Tarih Girin';
        }
    }
}

function calculateDaysLeft(targetDateStr) {
    if (!targetDateStr) return null;
    const target = new Date(targetDateStr);
    const today = new Date();
    target.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
}

// ========================================================
// SAYFA DEĞİŞİMİ VE MODÜLER YÜKLEYİCİLER
// ========================================================
function initViewEventListeners() {
    document.addEventListener('view-dashboard-loaded', () => {
        // Dashboard yenileme mantığı
    });

    document.addEventListener('view-exams-loaded', () => {
        // Sınavlar ve çalışmalar listesi yenileme mantığı
    });

    document.addEventListener('view-stats-loaded', () => {
        // İstatistik grafikleri ve analizleri yenileme mantığı
    });

    document.addEventListener('view-profile-loaded', () => {
        // Profil sayfası açıldığında yapılacak işlemler
    });
}
