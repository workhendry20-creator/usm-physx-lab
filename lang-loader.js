// ==========================================
// USM PhysX Lab - Universal Language Loader
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil pilihan bahasa yang disimpan oleh dashboard utama
    const currentLang = localStorage.getItem('selectedLanguage') || 'id';
    
    console.log(`[PhysX Lang-Loader] Aktif menggunakan bahasa: ${currentLang.toUpperCase()}`);

    // Kamus mini otomatis khusus komponen UI standard navigasi simulasi
    const commonUI = {
        id: { "btn-back": "← Kembali", "class10": "Kelas 10", "class11": "Kelas 11", "class12": "Kelas 12" },
        en: { "btn-back": "← Back", "class10": "Grade 10", "class11": "Grade 11", "class12": "Grade 12" },
        ms: { "btn-back": "← Kembali", "class10": "Tingkatan 10", "class11": "Tingkatan 11", "class12": "Tingkatan 12" }
    };

    // 2. Terjemahkan komponen dasar UI yang punya attribute [data-key] standard
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (commonUI[currentLang] && commonUI[currentLang][key]) {
            el.innerText = commonUI[currentLang][key];
        }
    });

    // 3. JIKA BAHASA INDONESIA, STOP DISINI (Karena text dasar HTML sudah Indonesia)
    if (currentLang === 'id') return;

    // 4. OTOMATIS TRANSLASI ELEMENT FISIKA (Cloud API Fallback tanpa ngetik kamus panjang)
    // Mencari elemen teks fisik di simulasi untuk ditranslasikan otomatis secara real-time
    const textSelectors = 'h2, h3, label, p, button, span:not([id]), div:not([id]):not([class*="bg-slate"])';
    const elements = document.querySelectorAll(textSelectors);

    elements.forEach(el => {
        const originalText = el.innerText.trim();

        // Filter proteksi: Jangan terjemahkan jika teks berisi angka rumus matematika/satuan fisika saja
        if (!originalText || originalText.length < 2) return;
        if (/^[\d\s.,ΩHμF°+=\-·]*$/.test(originalText)) return; 
        if (el.querySelector('canvas') || el.id) return; // Proteksi canvas/engine

        // Eksekusi penembakan translasi dinamis cloud gratis
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=${currentLang}&dt=t&q=${encodeURIComponent(originalText)}`;

        fetch(url)
            .then(res => res.json())
            .then(cleanData => {
                if (cleanData && cleanData[0] && cleanData[0][0] && cleanData[0][0][0]) {
                    el.innerText = cleanData[0][0][0];
                }
            })
            .catch(error => console.warn('[PhysX Lang] Skipping dynamic cloud translation for element:', originalText));
    });
});