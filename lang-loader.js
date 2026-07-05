// ==========================================
// USM PhysX Lab - Universal Auto-Translate Engine (v3)
// Sumber bahasa: Indonesia (ID) -> diterjemahkan otomatis ke EN / MS
// TANPA kamus manual - semua teks diterjemahkan live via Google Translate
// Dipakai bersama di Dashboard (index.html) dan seluruh 8 modul simulasi
// v3: menambahkan loading indicator (progress bar) saat proses terjemahan berjalan
// ==========================================
(function () {
    // Hanya untuk label tombol dropdown bahasa (bukan konten, jadi bukan "kamus")
    const FLAG_LABEL = { id: '🇮🇩 ID', en: '🇬🇧 EN', ms: '🇲🇾 MS' };

    // Elemen teks statis yang aman diterjemahkan otomatis.
    // Elemen ber-id SENGAJA di-skip (mayoritas id dipakai untuk readout dinamis
    // seperti m-time, num-v0, status-label, dsb). Elemen statis yang kebetulan
    // butuh id (nav, footer, hero-title) ditandai manual dengan class="i18n".
    const TARGET_SELECTOR = 'h1, h2, h3, h4, h5, p, label, a:not([id]), li, td, th, span:not([id]), .i18n';

    // ---------- Loading Indicator (progress bar tipis di atas halaman) ----------
    function injectLoadingBarStyles() {
        if (document.getElementById('physx-lang-bar-style')) return;
        const style = document.createElement('style');
        style.id = 'physx-lang-bar-style';
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
        `;
        document.head.appendChild(style);
    }

    function ensureLoadingBar() {
        injectLoadingBarStyles();
        let bar = document.getElementById('physx-lang-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'physx-lang-bar';
            document.body.appendChild(bar);
        }
        return bar;
    }

    function showLoadingIndicator() {
        const bar = ensureLoadingBar();
        bar.style.width = '0%';
        bar.classList.add('active');
        // beri jeda 1 frame supaya transisi CSS "width" ke-trigger dengan benar
        requestAnimationFrame(() => {
            bar.style.width = '75%';
        });
    }

    function hideLoadingIndicator() {
        const bar = document.getElementById('physx-lang-bar');
        if (!bar) return;
        bar.style.width = '100%';
        setTimeout(() => {
            bar.classList.remove('active');
            setTimeout(() => { bar.style.width = '0%'; }, 300);
        }, 150);
    }
    // -----------------------------------------------------------------------

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
        // Skip teks yang cuma berisi angka/rumus/satuan fisika (mis: "9.8", "Ω", "45°")
        if (/^[\d\s.,ΩHμF°+=\-·%πθ]*$/.test(text)) return true;
        return false;
    }

    async function applyLanguage(lang) {
        localStorage.setItem('selectedLanguage', lang);
        document.documentElement.lang = lang;

        // Kembali ke Bahasa Indonesia = instan (ambil dari cache), tidak perlu loading bar.
        // Selain itu (EN/MS) = perlu panggil API, tampilkan loading bar sampai selesai.
        const isTranslating = lang !== 'id';
        if (isTranslating) showLoadingIndicator();

        // 1. Update label dropdown bahasa (kalau halaman ini punya dropdown-nya, yaitu dashboard)
        const dropdownBtn = document.getElementById('langDropdownBtn');
        if (dropdownBtn) {
            const span = dropdownBtn.querySelector('span');
            if (span) span.innerText = FLAG_LABEL[lang] || FLAG_LABEL.id;
        }

        const pendingTasks = [];

        // 2. Judul tab browser
        const titleEl = document.querySelector('title');
        if (titleEl) {
            if (titleEl.dataset.original === undefined) titleEl.dataset.original = titleEl.textContent;
            pendingTasks.push((async () => {
                titleEl.textContent = (lang === 'id')
                    ? titleEl.dataset.original
                    : await translateText(titleEl.dataset.original, lang);
            })());
        }

        // 3. Placeholder search bar (khusus dashboard)
        const searchInput = document.getElementById('searchBar');
        if (searchInput) {
            if (searchInput.dataset.original === undefined) searchInput.dataset.original = searchInput.placeholder;
            pendingTasks.push((async () => {
                searchInput.placeholder = (lang === 'id')
                    ? searchInput.dataset.original
                    : await translateText(searchInput.dataset.original, lang);
            })());
        }

        // 4. Semua elemen teks umum di halaman (dashboard + 8 modul simulasi)
        const elements = document.querySelectorAll(TARGET_SELECTOR);
        elements.forEach((el) => {
            if (isProtectedElement(el)) return;

            // Simpan teks asli Bahasa Indonesia HANYA sekali (jadi sumber kebenaran)
            if (el.dataset.original === undefined) {
                el.dataset.original = el.innerText;
            }

            const original = el.dataset.original;
            if (isSkippableText(original)) return;

            pendingTasks.push((async () => {
                el.innerText = (lang === 'id') ? original : await translateText(original, lang);
            })());
        });

        // Tunggu SEMUA proses translate selesai baru sembunyikan loading bar
        await Promise.all(pendingTasks);

        if (isTranslating) hideLoadingIndicator();
    }

    // Expose ke global scope supaya bisa dipanggil dari dashboard (dropdown bahasa)
    // maupun function lain seperti toggleSeeMore()
    window.PhysXLang = { applyLanguage, translateText };

    document.addEventListener('DOMContentLoaded', () => {
        const savedLang = localStorage.getItem('selectedLanguage') || 'id';
        console.log(`[PhysX Lang-Loader] Aktif menggunakan bahasa: ${savedLang.toUpperCase()}`);
        applyLanguage(savedLang);
    });
})();