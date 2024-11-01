
# Netflix Clone

Proyek ini adalah klon aplikasi Netflix yang dibangun menggunakan **React**, **Firebase**, dan **MongoDB Atlas**. Proyek ini bertujuan untuk memberikan pengalaman pengguna yang mirip dengan Netflix dengan fitur autentikasi dan tampilan responsif.

## Fitur

- **Autentikasi**: Pengguna dapat mendaftar dan masuk menggunakan Firebase Authentication.
- **Database**: Data pengguna disimpan di MongoDB Atlas.
- **Antarmuka Pengguna**: Antarmuka yang responsif dan menarik mirip dengan Netflix.

## Teknologi yang Digunakan

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Autentikasi**: Firebase Authentication

## Setup

Ikuti langkah-langkah berikut untuk mengatur dan menjalankan proyek ini di lingkungan lokal Anda:

1. **Clone Repository**:
   ```bash
   git clone https://github.com/username/repository-name.git
   ```

2. **Masuk ke Direktori Proyek**:
   ```bash
   cd repository-name
   ```

3. **Instal Dependensi**:
   ```bash
   npm install
   ```

4. **Buat File `.env`**:
   Salin file `.env.example` ke file baru bernama `.env` dan isi variabel lingkungan dengan konfigurasi Firebase Anda.
   ```bash
   cp .env.example .env
   ```

5. **Jalankan Aplikasi**:
   - **Untuk Backend**: Arahkan ke folder backend dan jalankan:
     ```bash
     cd backend
     npm run dev
     ```
   - **Untuk Frontend**: Arahkan ke folder frontend dan jalankan:
     ```bash
     cd ../frontend
     npm run dev
     ```

## Struktur Proyek

```
repository-name/
├── backend/
│   ├── ... (kode backend)
├── frontend/
│   ├── ... (kode frontend)
├── .env
├── .env.example
├── README.md
└── package.json
```

## Kontribusi

Jika Anda ingin berkontribusi, silakan fork repo ini dan buat pull request.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
