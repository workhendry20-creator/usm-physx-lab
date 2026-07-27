# 🔬 USM PhysX Lab — Project Overview

> **Dokumen Gambaran Umum Proyek**  
> Laboratorium Fisika Virtual Interaktif untuk Pembelajaran SMA (Kelas 10–12)  
> *Dikembangkan oleh Divisi Riset Edukasi USM (2026)*

---

## 📌 1. Ringkasan Proyek (Project Summary)

**USM PhysX Lab** adalah platform laboratorium fisika virtual berbasis web yang menyediakan simulasi interaktif tanpa perlu instalasi aplikasi tambahan (*Zero-Install / Static Web App*). Platform ini dirancang khusus untuk membantu siswa SMA memahami konsep fisika abstrak melalui visualisasi grafis 2D *real-time*, eksperimen numerik, serta fitur tantangan interaktif.

### 🎯 Tujuan Utama
- **Aksesibilitas Tinggi**: Dapat diakses langsung dari peramban web (*browser*) ponsel pintar, tablet, maupun komputer.
- **Interaktivitas Real-time**: Siswa dapat menggeser parameter (*slider*, *input number*, *drag-and-drop*) dan mengamati langsung perubahan pada canvas fisika.
- **Multi-Bahasa Otomatis**: Mendukung 3 bahasa (**Indonesia**, **English**, dan **Bahasa Melayu**) secara otomatis tanpa perlu kamus manual.
- **Zero Build Tools**: Menggunakan *vanilla web stack* tanpa skrip *build/bundler* rumit, memudahkan eksekusi dan pemeliharaan lokal.

---

## 🛠️ 2. Arsitektur Teknis & Tech Stack

| Komponen | Teknologi | Deskripsi |
|---|---|---|
| **Core Logic** | HTML5 + Vanilla JavaScript (ES6+) | Logika simulasi, perhitungan rumus fisika, dan *event listener* tanpa framework JavaScript heavy. |
| **Visual Rendering** | HTML5 Canvas 2D API | Seluruh grafik animasi fisika (proyektil, medan magnet, vektor gaya, partikel gas) dirender pada canvas 60 FPS. |
| **Styling & Theme** | Tailwind CSS (CDN) + Custom CSS | Menggunakan sistem *utility-first* Tailwind CSS dipadu dengan CSS custom variables untuk dark mode dan animasi. |
| **Multi-Language** | `lang-loader.js` (Engine v4) | Menggunakan Google Translate API (`gtx` client) secara live dari teks Bahasa Indonesia ke EN/MS. Dilengkapi sistem `window.PhysXLoading` progress bar & spinner. |
| **State Storage** | `localStorage` | Menyimpan preferensi pengguna seperti Pilihan Tema (`darkMode`: `1`/`0`) dan Pilihan Bahasa (`selectedLanguage`: `id`/`en`/`ms`). |

---

## 📂 3. Struktur Direktori Proyek

```text
usm-physx-lab/
├── index.html                   # Dashboard Utama & Katalog Simulasi
├── index-clay-preview.html      # Pratinjau Desain Alternatif (Claymorphism Style)
├── panduan.html                 # Panduan Penggunaan & FAQ Interaktif
├── tentang-riset.html           # Informasi Latar Belakang Riset & Tim
├── kebijakan-privasi.html       # Halaman Kebijakan Privasi
├── kontak.html                  # Halaman Kontak
├── peta-situs.html              # Halaman Sitemap
├── lang-loader.js               # Universal Auto-Translate Engine & Loading Component (v4)
├── README.md                    # Dokumentasi dasar proyek
├── projectoverview.md           # [Berkas Ini] Ringkasan & Arsitektur Lengkap Proyek
├── assets/                      # Aset Gambar & Media
│   └── img/                     # Direktori Gambar Pratinjau Kartu Simulasi
└── simulations/                 # Direktori 13 Modul Simulasi Fisika
    ├── gerak-parabola/          # [Mekanika - K10] Trajektori & Drag Udara
    ├── energi-mekanik/          # [Mekanika - K10] Kekekalan Energi Bidang Miring
    ├── tumbukan-momentum/       # [Mekanika - K10] Tumbukan Lenting & Momentum
    ├── hukum-hooke/             # [Mekanika - K11] Elastisitas & Pegas
    ├── hukum-coulomb/           # [Listrik - K12] Muatan & Gaya Elektrostatik
    ├── arus-ac/                 # [Listrik - K12] Rangkaian AC & Osiloskop
    ├── arus-dc/                 # [Listrik - K12] Sirkuit DC & Aliran Elektron
    ├── gaya-lorentz/            # [Listrik - K12] Gerak Muatan dalam Medan Magnet
    ├── pembiasan-cahaya/        # [Optik - K11] Hukum Snellius & Indeks Bias
    ├── efek-doppler/            # [Optik - K11] Frekuensi Gelombang Bunyi
    ├── cermin-optik/            # [Optik - K11] Cermin Cekung/Cembung & Sinar Istimewa
    ├── hukum-gas-ideal/         # [Termodinamika - K11] Sistem Gas Tertutup PV=nRT
    └── hukum-archimedes/        # [Fluida - K11] Gaya Apung & Massa Jenis
```

---

## 🧪 4. Katalog Modul Simulasi Fisika (13 Modul)

Proyek ini memiliki **13 modul simulasi interaktif** yang terbagi dalam 5 kategori:

### 🌌 A. Mekanika (4 Modul)
1. **Gerak Parabola** (*Kelas 10*) — [simulations/gerak-parabola/](file:///Users/mm/usm-physx-lab/simulations/gerak-parabola/index.html)
   - *Konsep*: Lintasan proyektil, sudut elevasi, gravitasi ($g$), dan coefisien hambatan udara ($k$).
   - *Fitur*: Kurva lintasan $X$-$Y$, pembacaan waktu udara ($t$), tinggi maksimum ($H_{max}$), dan jarak terjauh ($R_{max}$).
2. **Kekekalan Energi Mekanik** (*Kelas 10*) — [simulations/energi-mekanik/](file:///Users/mm/usm-physx-lab/simulations/energi-mekanik/index.html)
   - *Konsep*: Energi Kinetik ($E_k$), Energi Potensial ($E_p$), Energi Mekanik Total ($E_m$), serta efek gesekan bidang miring.
3. **Tumbukan & Momentum** (*Kelas 10*) — [simulations/tumbukan-momentum/](file:///Users/mm/usm-physx-lab/simulations/tumbukan-momentum/index.html)
   - *Konsep*: Kekekalan momentum, tumbukan lenting sempurna ($e=1$), lenting sebagian, dan tidak lenting sama sekali ($e=0$).
4. **Hukum Hooke** (*Kelas 11*) — [simulations/hukum-hooke/](file:///Users/mm/usm-physx-lab/simulations/hukum-hooke/index.html)
   - *Konsep*: Elastisitas pegas, gaya pemulih ($F = -k \Delta x$), energi potensial pegas ($E_p = \frac{1}{2} k \Delta x^2$).

### ⚡ B. Listrik & Magnet (4 Modul)
5. **Hukum Coulomb** (*Kelas 12*) — [simulations/hukum-coulomb/](file:///Users/mm/usm-physx-lab/simulations/hukum-coulomb/index.html)
   - *Konsep*: Interaksi muatan statis ($q_1, q_2$), jarak ($r$), gaya tarik/tolak elektrostatik.
   - *Fitur*: *Drag-and-drop* muatan langsung di canvas, visualisasi vektor gaya.
6. **Rangkaian Arus AC** (*Kelas 12*) — [simulations/arus-ac/](file:///Users/mm/usm-physx-lab/simulations/arus-ac/index.html)
   - *Konsep*: Rangkaian Resistor-Induktor-Kapasitor (RLC) seri/paralel, impedansi ($Z$), frekuensi resonansi, dan osiloskop gelombang sinusoidal.
7. **Rangkaian Arus DC** (*Kelas 12*) — [simulations/arus-dc/](file:///Users/mm/usm-physx-lab/simulations/arus-dc/index.html)
   - *Konsep*: Hukum Ohm ($V = IR$), Hukum Kirchhoff, hambatan seri/paralel, dan animasi aliran elektron.
8. **Gaya Lorentz** (*Kelas 12*) — [simulations/gaya-lorentz/](file:///Users/mm/usm-physx-lab/simulations/gaya-lorentz/index.html)
   - *Konsep*: Gerak partikel bermuatan dalam medan magnet homogen ($F = qvB \sin\theta$), jari-jari siklotron ($R$).

### 🔬 C. Gelombang & Optik (3 Modul)
9. **Pembiasan Cahaya** (*Kelas 11*) — [simulations/pembiasan-cahaya/](file:///Users/mm/usm-physx-lab/simulations/pembiasan-cahaya/index.html)
   - *Konsep*: Hukum Snellius ($n_1 \sin\theta_1 = n_2 \sin\theta_2$), pemantulan sempurna (*total internal reflection*), sudut kritis.
10. **Efek Doppler** (*Kelas 11*) — [simulations/efek-doppler/](file:///Users/mm/usm-physx-lab/simulations/efek-doppler/index.html)
    - *Konsep*: Perubahan frekuensi teramati ($f_p$) akibat pergerakan relatif sumber bunyi ($v_s$) dan pengamat ($v_p$).
11. **Cermin Cekung & Cembung** (*Kelas 11*) — [simulations/cermin-optik/](file:///Users/mm/usm-physx-lab/simulations/cermin-optik/index.html)
    - *Konsep*: Pembentukan bayangan pada cermin lengkung, tiga sinar istimewa, titik fokus ($f$), dan perbesaran ($M$).

### 🌡️ D. Termodinamika (1 Modul)
12. **Hukum Gas Ideal** (*Kelas 11*) — [simulations/hukum-gas-ideal/](file:///Users/mm/usm-physx-lab/simulations/hukum-gas-ideal/index.html)
    - *Konsep*: Persamaan $PV = nRT$, simulasi gerak acak partikel gas (teori kinetik gas), pengaruh suhu ($T$), volume ($V$), dan jumlah mol ($n$).

### 💧 E. Fluida (1 Modul)
13. **Hukum Archimedes** (*Kelas 11*) — [simulations/hukum-archimedes/](file:///Users/mm/usm-physx-lab/simulations/hukum-archimedes/index.html)
    - *Konsep*: Gaya apung ($F_a = \rho g V_b$), kondisi benda terapung, melayang, dan tenggelam berdasarkan perbedaan massa jenis.

---

## 🌟 5. Fitur Kunci & Keunggulan Platform

1. **Dashboard & Filtering Interaktif**
   - Pencarian real-time berdasarkan judul/kata kunci simulasi (`searchBar`).
   - Filter cepat kategori (Semua, Mekanika, Listrik & Magnet, Gelombang & Optik, Termodinamika, Fluida).
   - Pengaturan batas tampilan ("Lihat Semua Simulasi" / "Tampilkan Lebih Sedikit").

2. **Gamifikasi Mode Tantangan (Lab Challenge)**
   - Setiap modul dilengkapi dengan widget **Tantangan Lab** (misal: "Capai R_max = 45m", "Hasilkan Gaya Coulomb = 12N").
   - Fitur "Acak Tantangan Baru" untuk menguji pemahaman konsep siswa secara individual.

3. **Universal Auto-Translation Engine (`lang-loader.js` v4)**
   - Menerjemahkan otomatis teks elemen HTML (`h1-h5, p, label, button, .i18n`) ke bahasa **EN** atau **MS** secara *on-the-fly* via Google Translate API.
   - Komponen UI `window.PhysXLoading` menampilkan progress bar di bagian atas dan spinner indikator di pojok kanan bawah selama proses menerjemahkan.
   - Menggunakan atribut `data-no-translate` dan `isProtectedElement()` untuk mencegah perusakan elemen Canvas, Script, atau SVG.

4. **Sistem Tema Gelap/Terang (Dark Mode)**
   - Eksekusi skrip penentu tema di bagian `<head>` untuk mencegah *flashing* warna saat halaman pertama kali dimuat.
   - Sinkronisasi instan ikon matahari/bulan dan penyimpanan preferensi di `localStorage`.

5. **Penanganan Fallback Gambar (`handleImgError`)**
   - Jika berkas gambar pratinjau simulasi di `assets/img/` belum tersedia atau gagal dimuat, skrip otomatis menggantinya dengan SVG Data URI *placeholder* mikrofon/mikroskop.

---

## 🔎 6. Temuan & Catatan Penting untuk Revisi Mendatang

1. **Sinkronisasi README.md dengan Codebase**
   - *Temuan*: `README.md` saat ini mencatat **8 modul**, padahal di codebase sudah diimplementasikan **13 modul** lengkap.
   - *Tindakan*: Perlu pembaruan pada `README.md` agar mencerminkan 13 modul serta kategori Fluida (Hukum Archimedes).

2. **File JavaScript Kosong/Redundant**
   - *Temuan*: Di dalam subfolder simulasi (seperti `simulations/gerak-parabola/sketch.js`, `simulations/arus-ac/sketch.js`), terdapat file `sketch.js` berukuran 0 byte. Logika simulasi aktual telah diintegrasikan secara *inline* di dalam `index.html`.
   - *Tindakan*: Perlu diputuskan apakah file `sketch.js` akan dihapus atau dimanfaatkan untuk pemisahan modul (*code separation*).

3. **Aset Gambar Pratinjau Kartu**
   - *Temuan*: Folder `assets/img/` kosong, sehingga kartu simulasi di dashboard bergantung pada fungsi `handleImgError()` SVG fallback.
   - *Tindakan*: Menambahkan aset gambar visual yang menarik untuk 13 modul simulasi atau memproduksi ilustrasi SVG khusus.

---

*Dokumen disusun untuk USM PhysX Lab — 2026.*
