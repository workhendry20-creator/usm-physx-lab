// =====================================================================
// USM PhysX Lab - Universal Challenge & Gamification Engine (v1)
// Menangani Skor XP, Tingkat Level, Confetti Toast, Notifikasi Sukses,
// dan Penyimpanan Prestasi Siswa di LocalStorage
// =====================================================================

(function () {
    // Inisialisasi Data Gamifikasi di localStorage
    function getStoredXP() {
        return parseInt(localStorage.getItem('physx_total_xp') || '0', 10);
    }

    function getStoredSolved() {
        return parseInt(localStorage.getItem('physx_total_solved') || '0', 10);
    }

    function addXP(amount) {
        const currentXP = getStoredXP() + amount;
        const currentSolved = getStoredSolved() + 1;
        localStorage.setItem('physx_total_xp', currentXP);
        localStorage.setItem('physx_total_solved', currentSolved);
        updateScoreBadges();
        return { totalXP: currentXP, totalSolved: currentSolved };
    }

    function getTitleLevel(xp) {
        if (xp >= 1000) return '🏆 Master Fisika USM';
        if (xp >= 500) return '🌟 Analis Fisika Senior';
        if (xp >= 200) return '🔬 Eksperimenter Muda';
        return '🌱 Pemula Lab';
    }

    function updateScoreBadges() {
        const xp = getStoredXP();
        const solved = getStoredSolved();
        const title = getTitleLevel(xp);

        document.querySelectorAll('.physx-xp-display').forEach(el => {
            el.innerText = `${xp} XP`;
        });
        document.querySelectorAll('.physx-solved-display').forEach(el => {
            el.innerText = `${solved} Selesai`;
        });
        document.querySelectorAll('.physx-title-display').forEach(el => {
            el.innerText = title;
        });
    }

    // Injeksi CSS Animasi & Style Toast / Modal
    function injectStyles() {
        if (document.getElementById('physx-gamification-style')) return;
        const style = document.createElement('style');
        style.id = 'physx-gamification-style';
        style.textContent = `
            @keyframes physxPopIn {
                0% { transform: scale(0.7) translateY(20px); opacity: 0; }
                70% { transform: scale(1.05) translateY(-5px); opacity: 1; }
                100% { transform: scale(1) translateY(0); opacity: 1; }
            }
            @keyframes physxConfettiFloat {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(120px) rotate(360deg); opacity: 0; }
            }
            .physx-modal-card {
                animation: physxPopIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
        `;
        document.head.appendChild(style);
    }

    // Trigger Confetti Effect pada Modal
    function createConfetti(container) {
        const colors = ['#6366F1', '#06B6D4', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6'];
        for (let i = 0; i < 25; i++) {
            const dot = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 90 + 5;
            const size = Math.random() * 8 + 6;
            const duration = Math.random() * 1.5 + 1;

            dot.style.cssText = `
                position: absolute;
                top: 0;
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                border-radius: ${Math.random() > 0.5 ? '50%' : '3px'};
                pointer-events: none;
                animation: physxConfettiFloat ${duration}s ease-out forwards;
                z-index: 10;
            `;
            container.appendChild(dot);
        }
    }

    // Modal Perayaan Sukses
    function triggerSuccessModal(challengeName, onNextChallenge) {
        injectStyles();

        // Cek jika modal sudah terbuka
        if (document.getElementById('physx-success-modal')) return;

        const { totalXP, totalSolved } = addXP(100);
        const titleLevel = getTitleLevel(totalXP);

        const overlay = document.createElement('div');
        overlay.id = 'physx-success-modal';
        overlay.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300';

        const card = document.createElement('div');
        card.className = 'physx-modal-card relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-500/30 text-center overflow-hidden';

        card.innerHTML = `
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div class="w-16 h-16 bg-gradient-to-tr from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/30 mx-auto mb-4 animate-bounce">
                🎉
            </div>
            <h2 class="i18n text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-1">
                Tantangan Berhasil!
            </h2>
            <p class="i18n text-xs text-slate-500 dark:text-slate-400 mb-4">
                Selamat! Anda berhasil menyelesaikan target <strong class="text-indigo-600 dark:text-indigo-400">${challengeName || 'Eksperimen'}</strong>.
            </p>

            <div class="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-700/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700 mb-6">
                <div>
                    <span class="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Bonus XP</span>
                    <span class="text-lg font-black text-indigo-600 dark:text-indigo-400">+100 XP ⚡</span>
                </div>
                <div>
                    <span class="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Total Poin</span>
                    <span class="text-lg font-black text-emerald-500">${totalXP} XP</span>
                </div>
            </div>

            <div class="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full border border-amber-500/20 text-xs font-bold mb-6">
                <span>${titleLevel}</span>
            </div>

            <div class="flex items-center gap-3">
                <button id="physx-btn-close-modal" class="flex-1 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-all">
                    Tutup
                </button>
                <button id="physx-btn-next-challenge" class="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-bold rounded-xl shadow-md transition-all">
                    Tantangan Baru →
                </button>
            </div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);
        createConfetti(card);

        document.getElementById('physx-btn-close-modal').onclick = () => {
            overlay.remove();
        };

        document.getElementById('physx-btn-next-challenge').onclick = () => {
            overlay.remove();
            if (typeof onNextChallenge === 'function') {
                onNextChallenge();
            }
        };

        // Jika lang-loader terpasang, terjemahkan modal otomatis
        if (window.PhysXLang && localStorage.getItem('selectedLanguage') !== 'id') {
            window.PhysXLang.applyLanguage(localStorage.getItem('selectedLanguage'));
        }
    }

    // Public API
    window.PhysXGamification = {
        getXP: getStoredXP,
        getSolved: getStoredSolved,
        triggerSuccess: triggerSuccessModal,
        updateBadges: updateScoreBadges
    };

    document.addEventListener('DOMContentLoaded', updateScoreBadges);
})();
