# 🔬 USM PhysX Lab

**Laboratorium Fisika Virtual** — platform simulasi interaktif untuk pembelajaran fisika tingkat SMA, dikembangkan sebagai bagian dari divisi riset edukasi USM.

---

## 📖 Tentang

USM PhysX Lab menyediakan **13 modul simulasi fisika interaktif** yang bisa diakses langsung dari peramban (*browser*) tanpa instalasi apapun. Setiap modul memungkinkan siswa memodifikasi parameter secara *real-time* dan mengamati hasilnya melalui visualisasi grafis Canvas 2D, analisis numerik, serta tantangan eksperimen interaktif.

---

## 🧪 Modul Simulasi (13 Modul)

| Modul | Kategori | Kelas | Lokasi |
|---|---|---|---|
| Gerak Parabola | Mekanika | 10 | `simulations/gerak-parabola/` |
| Kekekalan Energi Mekanik | Mekanika | 10 | `simulations/energi-mekanik/` |
| Tumbukan & Momentum | Mekanika | 10 | `simulations/tumbukan-momentum/` |
| Hukum Hooke | Mekanika | 11 | `simulations/hukum-hooke/` |
| Hukum Coulomb | Listrik & Magnet | 12 | `simulations/hukum-coulomb/` |
| Rangkaian Arus AC | Listrik & Magnet | 12 | `simulations/arus-ac/` |
| Rangkaian Arus DC | Listrik & Magnet | 12 | `simulations/arus-dc/` |
| Gaya Lorentz | Listrik & Magnet | 12 | `simulations/gaya-lorentz/` |
| Pembiasan Cahaya | Gelombang & Optik | 11 | `simulations/pembiasan-cahaya/` |
| Efek Doppler | Gelombang & Optik | 11 | `simulations/efek-doppler/` |
| Cermin Cekung & Cembung | Gelombang & Optik | 11 | `simulations/cermin-optik/` |
| Hukum Gas Ideal | Termodinamika | 11 | `simulations/hukum-gas-ideal/` |
| Hukum Archimedes | Fluida | 11 | `simulations/hukum-archimedes/` |

---

## 🛠️ Teknologi & Fitur Unggulan

- **HTML5 + Vanilla JavaScript (ES6+)** — *Zero-build stack*, tanpa framework heavy, tanpa proses kompilasi.
- **Canvas 2D API** — Rendering visual animasi fisika 60 FPS.
- **Tailwind CSS (CDN)** — Styling modern, responsif, dan fleksibel.
- **Auto-Translate Engine v4 (`lang-loader.js`)** — Terjemahan otomatis 3 bahasa (**Indonesia**, **English**, **Bahasa Melayu**) *real-time* via Google Translate API tanpa kamus manual. Terpadu dengan `window.PhysXLoading` indikator.
- **Dark Mode Support** — Mode gelap/terang tersinkronisasi otomatis via `localStorage`.
- **Mode Tantangan Lab** — Gamifikasi target numerik yang dapat diacak untuk menguji pemahaman siswa.

---

## 🌐 Multi-Bahasa

Dashboard dan seluruh 13 modul mendukung 3 bahasa: **Indonesia**, **English**, dan **Bahasa Melayu**. Bahasa diterjemahkan otomatis secara *real-time* dari sumber Bahasa Indonesia — lihat `lang-loader.js` untuk detail implementasinya.

---

## 🚀 Menjalankan Secara Lokal

Karena ini *pure static web app*, cukup buka `index.html` langsung di peramban, atau jalankan server lokal sederhana:

```bash
# Python 3
python3 -m http.server 8000

# atau Node.js
npx serve .
```

Lalu buka `http://localhost:8000` di peramban Anda.

---

## 📄 Lisensi & Hak Cipta

© 2026 USM PhysX Lab - Educational Research Division. All rights reserved.