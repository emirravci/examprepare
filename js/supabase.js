// ========================================================
// SUPABASE CLIENT INITIALIZATION & SHARED SPA INFRASTRUCTURE
// ========================================================

// Supabase Proje Bilgileri
// Yeni oluşturduğunuz Supabase projenizin Settings -> API ekranındaki bilgileri buraya girebilirsiniz.
export const SUPABASE_URL = "https://YOUR_SUPABASE_PROJECT_ID.supabase.co";
export const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

// Supabase bağlantı kontrolü
export const isSupabaseConfigured = () => {
    return (
        SUPABASE_URL && 
        SUPABASE_ANON_KEY && 
        !SUPABASE_URL.includes("YOUR_SUPABASE_PROJECT_ID") && 
        !SUPABASE_ANON_KEY.includes("YOUR_SUPABASE_ANON_KEY")
    );
};

if (!isSupabaseConfigured()) {
    console.warn(
        "⚠️ Supabase bağlantısı henüz yapılandırılmadı!\n" +
        "Lütfen 'js/supabase.js' içerisindeki SUPABASE_URL ve SUPABASE_ANON_KEY değerlerini kendi Supabase projenizle güncelleyin."
    );
}

// Global Supabase Client
export const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
}) : null;

// ========================================================
// GLOBAL LOADER (YÜKLENİYOR SPINNER)
// ========================================================
export function showLoader() {
    const loader = document.getElementById('global-loader');
    if (loader) loader.classList.add('active');
}

export function hideLoader() {
    const loader = document.getElementById('global-loader');
    if (loader) loader.classList.remove('active');
}

// ========================================================
// TOAST BILDIRIM SISTEMI
// ========================================================
export function showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconClass = 'fa-circle-info';
    if (type === 'success') iconClass = 'fa-circle-check';
    if (type === 'error') iconClass = 'fa-triangle-exclamation';
    if (type === 'warning') iconClass = 'fa-circle-exclamation';

    toast.innerHTML = `
        <div class="toast-content">
            <i class="fa-solid ${iconClass}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close" aria-label="Kapat"><i class="fa-solid fa-xmark"></i></button>
    `;

    container.appendChild(toast);

    const removeToast = () => {
        toast.classList.add('fade-out');
        toast.addEventListener('animationend', () => toast.remove());
    };

    const timeoutId = setTimeout(removeToast, duration);

    toast.querySelector('.toast-close')?.addEventListener('click', (e) => {
        e.stopPropagation();
        clearTimeout(timeoutId);
        removeToast();
    });

    toast.addEventListener('click', () => {
        clearTimeout(timeoutId);
        removeToast();
    });
}

// ========================================================
// ONAY MODALI (CONFIRMATION DIALOG)
// ========================================================
let currentModalConfirmHandler = null;

export function showConfirmModal({
    title = 'Emin misiniz?',
    message = 'Bu işlemi geri alamayabilirsiniz.',
    confirmText = 'Evet, Devam Et',
    cancelText = 'Vazgeç',
    isDanger = true,
    onConfirm = () => {}
}) {
    const modal = document.getElementById('confirm-modal');
    if (!modal) return;

    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').textContent = message;

    const confirmBtn = document.getElementById('confirm-ok-btn');
    const cancelBtn = document.getElementById('confirm-cancel-btn');

    confirmBtn.textContent = confirmText;
    cancelBtn.textContent = cancelText;

    if (isDanger) {
        confirmBtn.className = 'btn btn-danger';
    } else {
        confirmBtn.className = 'btn btn-primary';
    }

    modal.classList.add('active');

    // Handler temizleme ve atama
    if (currentModalConfirmHandler) {
        confirmBtn.removeEventListener('click', currentModalConfirmHandler);
    }

    currentModalConfirmHandler = async () => {
        modal.classList.remove('active');
        await onConfirm();
    };

    confirmBtn.addEventListener('click', currentModalConfirmHandler);
}

export function hideConfirmModal() {
    const modal = document.getElementById('confirm-modal');
    if (modal) modal.classList.remove('active');
}

// Modal kapatma olayları
document.getElementById('confirm-cancel-btn')?.addEventListener('click', hideConfirmModal);
document.getElementById('confirm-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'confirm-modal') hideConfirmModal();
});

// ========================================================
// SPA VIEW (SAYFA) GEÇİŞ SİSTEMİ
// ========================================================
const navItems = {
    'dashboard': document.querySelectorAll('[data-view-target="dashboard"]'),
    'exams': document.querySelectorAll('[data-view-target="exams"]'),
    'stats': document.querySelectorAll('[data-view-target="stats"]'),
    'profile': document.querySelectorAll('[data-view-target="profile"]')
};

export async function showView(viewId, extraData = null) {
    // Tüm view section'ları gizle
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });

    // Tüm navigasyon butonlarındaki active class'ını kaldır
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // İlgili view'ı aktif et
    const targetView = document.getElementById(`${viewId}-view`);
    if (targetView) {
        targetView.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // İlgili menü öğelerini aktif et
    if (navItems[viewId]) {
        navItems[viewId].forEach(el => {
            el.closest('.nav-item')?.classList.add('active');
        });
    }

    // Mobil menü / başlık senkronizasyonu
    const pageTitleEl = document.getElementById('current-page-title');
    if (pageTitleEl) {
        const titles = {
            'dashboard': 'Genel Bakış',
            'exams': 'Sınavlar & Çalışmalar',
            'stats': 'İstatistikler',
            'profile': 'Profil & Hedefler'
        };
        pageTitleEl.textContent = titles[viewId] || 'Sınav Hazırlık';
    }

    // Dinamik lazy-loading ve veri güncelleme eventi tetikle
    const event = new CustomEvent(`view-${viewId}-loaded`, { detail: extraData });
    document.dispatchEvent(event);
}

// Navigasyon butonlarına tıklama dinleyicileri
document.querySelectorAll('[data-view-target]').forEach(button => {
    button.addEventListener('click', (e) => {
        const target = e.currentTarget.getAttribute('data-view-target');
        if (target) showView(target);
    });
});

// ========================================================
// KİMLİK DOĞRULAMA (AUTH) KONTROLCÜSÜ
// ========================================================
const authView = document.getElementById('auth-view');
const appContainer = document.getElementById('app-container');
const currentUserEmail = document.getElementById('current-user-email');
const currentUserName = document.getElementById('current-user-name');
const btnLogout = document.querySelectorAll('.btn-logout-action');

// Auth Form Elementleri
const authForm = document.getElementById('auth-form');
const authEmail = document.getElementById('auth-email');
const authPassword = document.getElementById('auth-password');
const authFullName = document.getElementById('auth-fullname');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const authToggleBtn = document.getElementById('auth-toggle-mode');
const authModeTitle = document.getElementById('auth-mode-title');
const authModeDesc = document.getElementById('auth-mode-desc');
const fullnameGroup = document.getElementById('fullname-group');

let isSignUpMode = false; // true ise Kayıt Ol modu, false ise Giriş Yap modu

export function setAuthMode(signUp) {
    isSignUpMode = signUp;
    if (isSignUpMode) {
        authModeTitle.textContent = 'Hesap Oluştur';
        authModeDesc.textContent = 'Sınav hedeflerine ulaşmak için hemen başla';
        authSubmitBtn.querySelector('span').textContent = 'Kayıt Ol';
        fullnameGroup.style.display = 'block';
        if (authFullName) authFullName.required = true;
        authToggleBtn.innerHTML = `Zaten hesabın var mı? <strong>Giriş Yap</strong>`;
    } else {
        authModeTitle.textContent = 'Tekrar Hoş Geldin!';
        authModeDesc.textContent = 'Sınav hazırlık paneline erişmek için giriş yap';
        authSubmitBtn.querySelector('span').textContent = 'Giriş Yap';
        fullnameGroup.style.display = 'none';
        if (authFullName) authFullName.required = false;
        authToggleBtn.innerHTML = `Henüz hesabın yok mu? <strong>Kayıt Ol</strong>`;
    }
}

authToggleBtn?.addEventListener('click', () => {
    setAuthMode(!isSignUpMode);
});

// Giriş & Kayıt Form Submit İşlemi
authForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!isSupabaseConfigured()) {
        showToast("Supabase ayarları henüz yapılmadı! Lütfen js/supabase.js dosyasını güncelleyin.", "warning");
        return;
    }

    const email = authEmail.value.trim();
    const password = authPassword.value.trim();
    const fullName = authFullName?.value.trim() || '';

    if (password.length < 6) {
        showToast("Şifre en az 6 karakter olmalıdır!", "error");
        return;
    }

    showLoader();

    try {
        if (isSignUpMode) {
            // Kayıt Ol
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName
                    }
                }
            });

            if (error) throw error;

            if (data?.session) {
                showToast("Kayıt başarılı! Hoş geldin.", "success");
            } else {
                showToast("Kayıt başarılı! E-posta onay linkini kontrol edebilir veya giriş yapabilirsiniz.", "success");
                setAuthMode(false);
            }
        } else {
            // Giriş Yap
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;
            showToast("Giriş başarılı! İyi çalışmalar.", "success");
        }
    } catch (err) {
        console.error("Auth hatası:", err);
        const errorMsg = err.message || "Giriş işlemi başarısız. Lütfen bilgilerinizi kontrol edin.";
        showToast(errorMsg, "error");
    } finally {
        hideLoader();
    }
});

// Çıkış Yap İşlemi
export async function handleLogout() {
    showConfirmModal({
        title: 'Çıkış Yapılsın mı?',
        message: 'Oturumunuz sonlandırılacaktır.',
        confirmText: 'Çıkış Yap',
        cancelText: 'Vazgeç',
        isDanger: false,
        onConfirm: async () => {
            showLoader();
            try {
                if (supabase) {
                    const { error } = await supabase.auth.signOut();
                    if (error) throw error;
                }
                showToast("Oturum kapatıldı.", "info");
            } catch (err) {
                console.error("Çıkış hatası:", err);
                showToast("Çıkış yapılırken bir hata oluştu.", "error");
            } finally {
                hideLoader();
            }
        }
    });
}

btnLogout.forEach(btn => {
    btn.addEventListener('click', handleLogout);
});

// ========================================================
// AUTH DURUMUNU İZLEME (STATE LISTENER)
// ========================================================
export function initAuthListener() {
    if (!supabase) return;

    supabase.auth.onAuthStateChange(async (event, session) => {
        if (session && session.user) {
            // Kullanıcı oturum açtı
            if (authView) authView.style.display = 'none';
            if (appContainer) appContainer.style.display = 'block';

            const user = session.user;
            const name = user.user_metadata?.full_name || user.email.split('@')[0];

            if (currentUserEmail) currentUserEmail.textContent = user.email;
            if (currentUserName) currentUserName.textContent = name;

            authForm?.reset();

            // İlk açılışta Dashboard view'ı göster
            showView('dashboard');
            
            // Kullanıcı profil eventini yayınla
            document.dispatchEvent(new CustomEvent('auth-user-authenticated', { detail: { user } }));
        } else {
            // Kullanıcı oturumu kapalı
            if (appContainer) appContainer.style.display = 'none';
            if (authView) authView.style.display = 'flex';
            if (currentUserEmail) currentUserEmail.textContent = '';
            if (currentUserName) currentUserName.textContent = '';
        }
    });
}
