<?php
/**
 * RTQ Abdurrahman bin Auf - Handler Upload Dokumen Pendaftaran SPMB
 * Menyimpan berkas pendaftaran dengan folder unik per santri & membuat tautan publik untuk WA Admin.
 */

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");

$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Handle preflight OPTIONS request
if ($requestMethod === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json; charset=UTF-8");

if ($requestMethod !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Hanya menerima permintaan POST.'
    ]);
    exit;
}

// Helper untuk deteksi Base URL (mendukung https, reverse proxy, port custom, subdirektori)
function getBaseUrl() {
    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')
        || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443);
    $protocol = $isHttps ? 'https://' : 'http://';
    
    $host = $_SERVER['HTTP_HOST'] ?? ($_SERVER['SERVER_NAME'] ?? 'localhost');
    
    $scriptDir = dirname($_SERVER['SCRIPT_NAME'] ?? '');
    $scriptDir = str_replace('\\', '/', $scriptDir);
    if ($scriptDir === '/' || $scriptDir === '.' || empty($scriptDir)) {
        $scriptDir = '';
    } else {
        $scriptDir = rtrim($scriptDir, '/');
    }
    
    return $protocol . $host . $scriptDir;
}

// Helper sanitasi nama file & teks
function sanitizeString($str) {
    $clean = preg_replace('/[^a-zA-Z0-9_\-\s]/', '', $str);
    $clean = preg_replace('/\s+/', '_', trim($clean));
    return $clean ?: 'santri';
}

// Ambil input form
$namaSantri = trim($_POST['namaSantri'] ?? '');
$ttl        = trim($_POST['ttl'] ?? '');
$gender     = trim($_POST['gender'] ?? '');
$usia       = trim($_POST['usia'] ?? '');
$namaAyah   = trim($_POST['namaAyah'] ?? '');
$namaIbu    = trim($_POST['namaIbu'] ?? '');
$noWa       = trim($_POST['noWa'] ?? '');
$alamat     = trim($_POST['alamat'] ?? '');
$program    = trim($_POST['program'] ?? '');

if (empty($namaSantri)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Nama santri wajib diisi.'
    ]);
    exit;
}

// Validasi berkas
if (!isset($_FILES['filePendaftaran']) || !isset($_FILES['fileKesantrian'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Kedua berkas formulir (Form Pendaftaran & Paket Formulir Kesantrian) wajib diunggah!'
    ]);
    exit;
}

$filePendaftaran = $_FILES['filePendaftaran'];
$fileKesantrian  = $_FILES['fileKesantrian'];

if ($filePendaftaran['error'] !== UPLOAD_ERR_OK || $fileKesantrian['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Terjadi kesalahan saat mengunggah berkas. Kode error: ' . $filePendaftaran['error'] . ' / ' . $fileKesantrian['error']
    ]);
    exit;
}

// Batas ukuran (maks 25 MB per berkas)
$maxSize = 25 * 1024 * 1024;
if ($filePendaftaran['size'] > $maxSize || $fileKesantrian['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Ukuran berkas terlalu besar! Maksimal 25MB per berkas.'
    ]);
    exit;
}

// Ekstensi yang diizinkan
$allowedExtensions = ['docx', 'doc', 'pdf', 'jpg', 'jpeg', 'png'];

$extPendaftaran = strtolower(pathinfo($filePendaftaran['name'], PATHINFO_EXTENSION));
$extKesantrian  = strtolower(pathinfo($fileKesantrian['name'], PATHINFO_EXTENSION));

if (!in_array($extPendaftaran, $allowedExtensions) || !in_array($extKesantrian, $allowedExtensions)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Format file tidak didukung! Format yang diperbolehkan: .docx, .doc, .pdf, .jpg, .png'
    ]);
    exit;
}

// Buat folder unik per pendaftaran santri agar TIDAK NYASAR atau tertimpa santri lain
$cleanSantriName = sanitizeString($namaSantri);
$timestamp = date('Ymd_His');
$randomToken = bin2hex(random_bytes(4)); // 8 karakter unik heksadesimal acak
$registrationId = 'REG-' . date('Ymd') . '-' . strtoupper($randomToken);
$folderName = $timestamp . '_' . $cleanSantriName . '_' . $randomToken;

$baseUploadDir = __DIR__ . '/uploads/pendaftaran';
$targetDir = $baseUploadDir . '/' . $folderName;

if (!is_dir($targetDir)) {
    if (!mkdir($targetDir, 0755, true)) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Gagal membuat folder penyimpanan di server.'
        ]);
        exit;
    }
}

// Proteksi folder dari directory browsing
$protectionFiles = [
    __DIR__ . '/uploads/index.html',
    $baseUploadDir . '/index.html',
    $targetDir . '/index.html'
];
foreach ($protectionFiles as $pFile) {
    if (!file_exists($pFile)) {
        @file_put_contents($pFile, '<!DOCTYPE html><html><head><title>Akses Dibatasi</title></head><body><h3>403 Forbidden - RTQ Abdurrahman bin Auf</h3></body></html>');
    }
}

// Nama berkas tujuan di server (jelas & unik untuk santri ini)
$targetNamePendaftaran = 'Form_Pendaftaran_' . $cleanSantriName . '.' . $extPendaftaran;
$targetNameKesantrian  = 'Paket_Kesantrian_' . $cleanSantriName . '.' . $extKesantrian;

$destPendaftaran = $targetDir . '/' . $targetNamePendaftaran;
$destKesantrian  = $targetDir . '/' . $targetNameKesantrian;

// Pindahkan file ke folder tujuan
$moved1 = move_uploaded_file($filePendaftaran['tmp_name'], $destPendaftaran);
if (!$moved1) {
    $moved1 = @copy($filePendaftaran['tmp_name'], $destPendaftaran);
}

$moved2 = move_uploaded_file($fileKesantrian['tmp_name'], $destKesantrian);
if (!$moved2) {
    $moved2 = @copy($fileKesantrian['tmp_name'], $destKesantrian);
}

if (!$moved1 || !$moved2) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Gagal memindahkan file ke penyimpanan server. Pastikan folder memiliki izin tulis (chmod 755/777).'
    ]);
    exit;
}

// Bangun URL publik lengkap untuk masing-masing berkas
$baseUrl = getBaseUrl();
$urlPendaftaran = $baseUrl . '/uploads/pendaftaran/' . $folderName . '/' . rawurlencode($targetNamePendaftaran);
$urlKesantrian  = $baseUrl . '/uploads/pendaftaran/' . $folderName . '/' . rawurlencode($targetNameKesantrian);

// Simpan data pendaftaran ke file JSON di folder santri untuk arsip & verifikasi panitia
$metadata = [
    'registrationId'  => $registrationId,
    'timestamp'       => date('c'),
    'namaSantri'      => $namaSantri,
    'ttl'             => $ttl,
    'gender'          => $gender,
    'usia'            => $usia,
    'namaAyah'        => $namaAyah,
    'namaIbu'         => $namaIbu,
    'noWa'            => $noWa,
    'alamat'          => $alamat,
    'program'         => $program,
    'filePendaftaran' => [
        'originalName' => $filePendaftaran['name'],
        'serverName'   => $targetNamePendaftaran,
        'size'         => $filePendaftaran['size'],
        'url'          => $urlPendaftaran
    ],
    'fileKesantrian'  => [
        'originalName' => $fileKesantrian['name'],
        'serverName'   => $targetNameKesantrian,
        'size'         => $fileKesantrian['size'],
        'url'          => $urlKesantrian
    ],
    'ipAddress'       => $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN',
    'userAgent'       => $_SERVER['HTTP_USER_AGENT'] ?? 'UNKNOWN'
];

@file_put_contents($targetDir . '/data_pendaftaran.json', json_encode($metadata, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

// Respon sukses JSON
echo json_encode([
    'success'         => true,
    'message'         => 'Berkas formulir berhasil disimpan di server!',
    'registrationId'  => $registrationId,
    'studentName'     => $namaSantri,
    'folder'          => $folderName,
    'filePendaftaran' => [
        'name' => $targetNamePendaftaran,
        'url'  => $urlPendaftaran,
        'size' => number_format($filePendaftaran['size'] / 1024, 1) . ' KB'
    ],
    'fileKesantrian'  => [
        'name' => $targetNameKesantrian,
        'url'  => $urlKesantrian,
        'size' => number_format($fileKesantrian['size'] / 1024, 1) . ' KB'
    ]
]);
