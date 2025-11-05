# 🗂️ **Item Management App – Aplikasi CRUD & Upload Gambar Full-Stack**  
**(Latihan Front-End Part 2 – Fullstack Project)**  

---

## 1. 🎯 Judul Aplikasi dan Deskripsi Singkat  

**Item Management App**  

Aplikasi ini merupakan proyek latihan *full-stack* yang dibangun menggunakan **React.js** di sisi *frontend* dan **Node.js/Express.js** di sisi *backend*.  
Fungsinya adalah untuk **mengelola data barang (CRUD)** yang terhubung dengan **PostgreSQL** serta mendukung **upload gambar ke Cloudinary**.  
Aplikasi ini juga dilengkapi sistem **autentikasi JWT (JSON Web Token)** agar setiap pengguna dapat mengakses data pribadinya dengan aman.

---

## 2. ⚙️ Fitur-Fitur  

### ✨ Fitur Utama
- **Autentikasi Pengguna (JWT):** Register & Login dengan token verifikasi.  
- **CRUD Item:** Tambah, lihat, ubah, dan hapus data barang.  
- **Upload Gambar:** File disimpan otomatis ke Cloudinary.  
- **Proteksi Akses:** Endpoint API hanya dapat diakses pengguna login.  
- **Dashboard Interaktif:** Menampilkan daftar item secara dinamis.  
- **Integrasi Database PostgreSQL:** Menyimpan data user & item secara permanen.

### 🧩 Teknologi yang Digunakan  

| Kategori | Teknologi |
|-----------|------------|
| **Frontend** | React.js, Axios, React Router DOM |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL |
| **Media Storage** | Cloudinary |
| **Keamanan** | bcrypt.js, jsonwebtoken |
| **Lainnya** | dotenv, multer, cors |

---

## 3. 🧰 Persyaratan Aplikasi  

Sebelum menjalankan proyek, pastikan telah menginstal:  

- **Node.js** versi 16 ke atas  
- **PostgreSQL** (database `latihan_frontend2`)  
- **Git**  
- **Cloudinary account**  
- **Postman** (opsional, untuk uji API secara manual)

---

## 4. 🚀 Instalasi dan Cara Build  

Aplikasi ini terdiri dari dua bagian: **Backend (Express)** dan **Frontend (React)**. Keduanya harus dijalankan bersamaan.

### A. Instalasi Dependencies

**1. Backend**
```bash
cd backend
npm install
```

**2. Frontend**
```bash
cd ..
npm install
```
### B. Menjalankan Aplikasi

Gunakan dua terminal terpisah:
**Terminal 1 – Backend**
```
cd backend
npm run dev
# Jalan di http://localhost:5000
```

**Terminal 2 – Frontend**
```
npm start
# Terbuka otomatis di http://localhost:3000
```
### C. Alur Penggunaan
1. Buka http://localhost:3000 di browser.
2. Masuk ke halaman Login.
3. Klik “Daftar di sini” untuk membuat akun baru.
4. Setelah registrasi berhasil, masuk kembali melalui halaman Login.
5. Setelah login, pengguna diarahkan ke Dashboard.
6. Di Dashboard, pengguna bisa menambah, melihat, mengedit, dan menghapus data item.

---

## 5. 🧭 Struktur Project
```
latihan-frontend/
├── backend/
│   ├── index.js                     # Entry point Express backend
│   ├── .env                         # Konfigurasi (PORT, DB_URL, JWT, Cloudinary)
│   ├── package.json                 # Dependencies backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                # Koneksi PostgreSQL
│   │   │   └── cloudinary.js        # Setup Cloudinary
│   │   ├── controllers/
│   │   │   ├── authController.js    # Login & Register (JWT)
│   │   │   ├── itemController.js    # CRUD item + upload gambar
│   │   └── middleware/
│   │       ├── auth.js              # Middleware JWT
│   │       └── upload.js            # Middleware multer
│   │   └── routes/
│   │       ├── authRoutes.js        # /api/auth
│   │       ├── itemRoutes.js        # /api/items
│   │       └── userRoutes.js        # (opsional)
│   └── models/
│       └── schema.sql               # Struktur tabel users & items
│
├── src/
│   ├── api/
│   │   └── api.js                   # Axios config
│   ├── components/
│   │   ├── Navbar.js                # Navigasi
│   │   ├── FormModal.js             # Modal tambah/edit item
│   │   └── PrivateRoute.js          # Proteksi halaman
│   ├── pages/
│   │   ├── Login.js                 # Halaman login
│   │   ├── Register.js              # Halaman registrasi
│   │   ├── Dashboard.js             # CRUD item
│   │   └── NotFound.js              # Halaman 404
│   ├── App.js                       # Routing utama
│   ├── index.js                     # Entry point React
│   ├── App.css                      # Styling global
│   └── index.css                    # Reset & global style
│
└── README.md                        # Dokumentasi proyek
```

---

## 6. 🤝 Contributing
Kontribusi sangat terbuka untuk pengembangan proyek ini lebih lanjut.
Langkah untuk berkontribusi:
1. Fork repositori ini.
2. Clone hasil fork ke perangkat lokal.
3. Buat branch baru untuk fitur atau perbaikan Anda.
4. Lakukan commit perubahan dengan deskripsi yang jelas.
5. Push ke branch tersebut dan buat Pull Request ke repositori utama.

---

## 7. ⚖️ Lisensi

Proyek ini dibuat untuk tujuan pembelajaran dalam program CAMP – Web Development & UI/UX Design dan tidak memiliki lisensi komersial.
Silakan gunakan sebagai referensi untuk pengembangan pribadi atau akademik.

---

## 8. 📸 Dokumentasi
**link Dokumentasi Postman:** https://documenter.getpostman.com/view/49073455/2sB3Wqv1ZA
**Screenshot Output Program:**
1. Login dan Register
![Tampilan Register](https://res.cloudinary.com/dedwrmlp7/image/upload/v1762384877/Screenshot_2025-11-06_061350_orfpym.png)
![Tampilan Login](https://res.cloudinary.com/dedwrmlp7/image/upload/v1762384877/Screenshot_2025-11-06_061635_sdst69.png)
2. Menambahkan dan Mengedit Data
![Tampilan Menambahkan Data](https://res.cloudinary.com/dedwrmlp7/image/upload/v1762384880/Screenshot_2025-11-06_061519_c963dq.png)
![Tampilan Mengedit Data](https://res.cloudinary.com/dedwrmlp7/image/upload/v1762384877/Screenshot_2025-11-06_061550_cspo5n.png)
3. Menghapus data
![Tampilan Menghapus Data](https://res.cloudinary.com/dedwrmlp7/image/upload/v1762384878/Screenshot_2025-11-06_061605_glglef.png)
![Tampilan Dashboard](https://res.cloudinary.com/dedwrmlp7/image/upload/v1762384877/Screenshot_2025-11-06_061623_at004f.png)
4. Contoh databse
![Tampilan Dashboard](https://res.cloudinary.com/dedwrmlp7/image/upload/v1762384941/Screenshot_2025-11-06_035508_vqe9cy.png)

---

**Disusun oleh:** Muhammad Hanif

**Bagian dari program:** CAMP – Celerates Indonesia (Batch 3)
