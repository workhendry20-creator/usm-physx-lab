// ==========================================
// USM PhysX Lab - Universal Auto-Translate Engine (v4)
// Sumber bahasa: Indonesia (ID) -> diterjemahkan otomatis ke EN / MS
// TANPA kamus manual - semua teks diterjemahkan live via Google Translate
// Dipakai bersama di Dashboard (index.html) dan seluruh 8 modul simulasi
// v4: menambahkan komponen loading universal (progress bar + spinner "Loading")
//     yang bisa dipakai ulang oleh proses async lain di masa depan
// ==========================================
(function () {
    // Hanya untuk label tombol dropdown bahasa (bukan konten, jadi bukan "kamus")
    const FLAG_LABEL = { id: '🇮🇩 ID', en: '🇬🇧 EN', ms: '🇲🇾 MS' };

    // Elemen teks statis yang aman diterjemahkan otomatis.
    const TARGET_SELECTOR = 'h1, h2, h3, h4, h5, p, label, a:not([id]), li, td, th, span:not([id]), .i18n';

    // =====================================================================
    // KOMPONEN LOADING UNIVERSAL (dipakai untuk translate & bisa dipakai
    // ulang untuk proses loading lain di masa depan lewat window.PhysXLoading)
    // =====================================================================
    let activeLoadingCount = 0; // hitung berapa proses loading yg jalan bersamaan

    function injectLoadingStyles() {
        if (document.getElementById('physx-loading-style')) return;
        const style = document.createElement('style');
        style.id = 'physx-loading-style';
        style.textContent = `
            #physx-lang-bar {
                position: fixed;
                top: 0; left: 0;
                height: 3px;
                width: 0%;
                background: linear-gradient(90deg, #6366F1, #06B6D4);
                z-index: 9999;
                transition: width 0.35s ease, opacity 0.25s ease;
                opacity: 0;
                pointer-events: none;
            }
            #physx-lang-bar.active { opacity: 1; }

            #physx-loading-badge {
                position: fixed;
                bottom: 20px;
                right: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
                background: #ffffff;
                border: 1px solid #E2E8F0;
                box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
                padding: 10px 16px;
                border-radius: 9999px;
                font-family: 'Plus Jakarta Sans', sans-serif;
                font-size: 13px;
                font-weight: 600;
                color: #2E3A59;
                z-index: 9999;
                opacity: 0;
                transform: translateY(8px);
                pointer-events: none;
                transition: opacity 0.25s ease, transform 0.25s ease;
            }
            #physx-loading-badge.active {
                opacity: 1;
                transform: translateY(0);
            }
            .physx-spinner {
                width: 16px;
                height: 16px;
                border: 2.5px solid #E2E8F0;
                border-top-color: #6366F1;
                border-radius: 50%;
                animation: physx-spin 0.7s linear infinite;
                flex-shrink: 0;
            }
            @keyframes physx-spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    function ensureLoadingBar() {
        injectLoadingStyles();
        let bar = document.getElementById('physx-lang-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'physx-lang-bar';
            document.body.appendChild(bar);
        }
        return bar;
    }

    function ensureLoadingBadge() {
        injectLoadingStyles();
        let badge = document.getElementById('physx-loading-badge');
        if (!badge) {
            badge = document.createElement('div');
            badge.id = 'physx-loading-badge';
            badge.innerHTML = `<div class="physx-spinner"></div><span id="physx-loading-text">Loading...</span>`;
            document.body.appendChild(badge);
        }
        return badge;
    }

    // API publik: window.PhysXLoading.show("Teks opsional"), .hide()
    // Reusable untuk proses async apapun di masa depan (bukan cuma translate).
    function showLoading(text) {
        activeLoadingCount++;

        const bar = ensureLoadingBar();
        bar.style.width = '0%';
        bar.classList.add('active');
        requestAnimationFrame(() => { bar.style.width = '75%'; });

        const badge = ensureLoadingBadge();
        document.getElementById('physx-loading-text').innerText = text || 'Loading...';
        badge.classList.add('active');
    }

    function hideLoading() {
        activeLoadingCount = Math.max(0, activeLoadingCount - 1);
        if (activeLoadingCount > 0) return; // masih ada proses loading lain yg jalan

        const bar = document.getElementById('physx-lang-bar');
        if (bar) {
            bar.style.width = '100%';
            setTimeout(() => {
                bar.classList.remove('active');
                setTimeout(() => { bar.style.width = '0%'; }, 300);
            }, 150);
        }

        const badge = document.getElementById('physx-loading-badge');
        if (badge) badge.classList.remove('active');
    }

    window.PhysXLoading = { show: showLoading, hide: hideLoading };
    // =====================================================================

    async function translateText(text, targetLang) {
        if (!text || text.trim().length < 2) return text;
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        try {
            const res = await fetch(url);
            const json = await res.json();
            return json[0].map(chunk => chunk[0]).join('');
        } catch (err) {
            console.warn('[PhysX Lang] Gagal menerjemahkan teks:', text, err);
            return text; // fallback: tampilkan teks asli jika API gagal/offline
        }
    }

    function isProtectedElement(el) {
        if (el.tagName === 'CANVAS' || el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return true;
        if (el.querySelector('canvas')) return true;
        if (el.closest('[data-no-translate]')) return true;
        return false;
    }

    function isSkippableText(text) {
        if (!text || text.trim().length < 2) return true;
        if (/^[\d\s.,ΩHμF°+=\-·%πθ]*$/.test(text)) return true;
        return false;
    }

    async function applyLanguage(lang) {
        localStorage.setItem('selectedLanguage', lang);
        document.documentElement.lang = lang;

        // Kembali ke Bahasa Indonesia = instan (ambil dari cache), tidak perlu loading.
        const isTranslating = lang !== 'id';
        if (isTranslating) showLoading('Menerjemahkan...');

        const dropdownBtn = document.getElementById('langDropdownBtn');
        if (dropdownBtn) {
            const span = dropdownBtn.querySelector('span');
            if (span) span.innerText = FLAG_LABEL[lang] || FLAG_LABEL.id;
        }

        const pendingTasks = [];

        const titleEl = document.querySelector('title');
        if (titleEl) {
            if (titleEl.dataset.original === undefined) titleEl.dataset.original = titleEl.textContent;
            pendingTasks.push((async () => {
                titleEl.textContent = (lang === 'id')
                    ? titleEl.dataset.original
                    : await translateText(titleEl.dataset.original, lang);
            })());
        }

        const searchInput = document.getElementById('searchBar');
        if (searchInput) {
            if (searchInput.dataset.original === undefined) searchInput.dataset.original = searchInput.placeholder;
            pendingTasks.push((async () => {
                searchInput.placeholder = (lang === 'id')
                    ? searchInput.dataset.original
                    : await translateText(searchInput.dataset.original, lang);
            })());
        }

        const elements = document.querySelectorAll(TARGET_SELECTOR);
        elements.forEach((el) => {
            if (isProtectedElement(el)) return;
            if (el.dataset.original === undefined) el.dataset.original = el.innerText;

            const original = el.dataset.original;
            if (isSkippableText(original)) return;

            pendingTasks.push((async () => {
                el.innerText = (lang === 'id') ? original : await translateText(original, lang);
            })());
        });

        await Promise.all(pendingTasks);

        if (isTranslating) hideLoading();
    }

    window.PhysXLang = { applyLanguage, translateText };

    document.addEventListener('DOMContentLoaded', () => {
        const savedLang = localStorage.getItem('selectedLanguage') || 'id';
        console.log(`[PhysX Lang-Loader] Aktif menggunakan bahasa: ${savedLang.toUpperCase()}`);
        applyLanguage(savedLang);
    });
})();