const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const OUT_DIR = path.join(__dirname, 'out');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.doc': 'application/msword',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
};

// Helper sanitasi teks
function sanitizeString(str) {
  if (!str) return 'santri';
  const clean = str.replace(/[^a-zA-Z0-9_\-\s]/g, '').trim().replace(/\s+/g, '_');
  return clean || 'santri';
}

// Multipart parser sederhana tanpa dependensi eksternal
function parseMultipart(buffer, boundary) {
  const boundaryBuf = Buffer.from('--' + boundary);
  const parts = [];
  let start = 0;

  while ((start = buffer.indexOf(boundaryBuf, start)) !== -1) {
    start += boundaryBuf.length;
    if (buffer.slice(start, start + 2).toString() === '--') {
      break; // Akhir multipart
    }
    if (buffer.slice(start, start + 2).toString() === '\r\n') {
      start += 2;
    }

    const nextBoundary = buffer.indexOf(boundaryBuf, start);
    if (nextBoundary === -1) break;

    const partBuf = buffer.slice(start, nextBoundary - 2); // potong trailing \r\n
    const headerEnd = partBuf.indexOf(Buffer.from('\r\n\r\n'));
    if (headerEnd === -1) {
      start = nextBoundary;
      continue;
    }

    const headerStr = partBuf.slice(0, headerEnd).toString('latin1');
    const bodyBuf = partBuf.slice(headerEnd + 4);

    const nameMatch = headerStr.match(/name="([^"]+)"/i);
    const filenameMatch = headerStr.match(/filename="([^"]+)"/i);
    const contentTypeMatch = headerStr.match(/Content-Type:\s*([^\r\n]+)/i);

    if (nameMatch) {
      parts.push({
        name: nameMatch[1],
        filename: filenameMatch ? filenameMatch[1] : null,
        contentType: contentTypeMatch ? contentTypeMatch[1] : null,
        data: bodyBuf,
      });
    }

    start = nextBoundary;
  }

  return parts;
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(reqUrl.pathname);

  // 1. HANDLER UPLOAD PENDAFTARAN (POST /upload.php atau /api/upload)
  if (
    req.method === 'POST' &&
    (pathname === '/upload.php' ||
      pathname === '/api/upload' ||
      pathname === '/api/upload.php')
  ) {
    const contentType = req.headers['content-type'] || '';
    const boundaryMatch = contentType.match(/boundary=([^;]+)/i);

    if (!boundaryMatch) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Content-Type harus multipart/form-data' }));
      return;
    }

    const boundary = boundaryMatch[1].trim().replace(/^"|"$/g, '');
    const chunks = [];

    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const fullBuffer = Buffer.concat(chunks);
        const parts = parseMultipart(fullBuffer, boundary);

        const fields = {};
        const files = {};

        for (const p of parts) {
          if (p.filename !== null) {
            files[p.name] = p;
          } else {
            fields[p.name] = p.data.toString('utf8');
          }
        }

        const namaSantri = (fields.namaSantri || '').trim();
        const ttl = (fields.ttl || '').trim();
        const gender = (fields.gender || '').trim();
        const usia = (fields.usia || '').trim();
        const namaAyah = (fields.namaAyah || '').trim();
        const namaIbu = (fields.namaIbu || '').trim();
        const noWa = (fields.noWa || '').trim();
        const alamat = (fields.alamat || '').trim();
        const program = (fields.program || '').trim();

        if (!namaSantri) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Nama santri wajib diisi.' }));
          return;
        }

        const filePendaftaran = files.filePendaftaran;
        const fileKesantrian = files.fileKesantrian;

        if (!filePendaftaran || !fileKesantrian) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: false,
            message: 'Kedua berkas formulir wajib diunggah!',
          }));
          return;
        }

        // Buat folder unik per santri
        const cleanName = sanitizeString(namaSantri);
        const dateStr = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
        const randToken = crypto.randomBytes(4).toString('hex');
        const regId = 'REG-' + dateStr.slice(0, 8) + '-' + randToken.toUpperCase();
        const folderName = `${dateStr}_${cleanName}_${randToken}`;

        const uploadBaseDir = path.join(OUT_DIR, 'uploads', 'pendaftaran');
        const targetDir = path.join(uploadBaseDir, folderName);

        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }

        // Tulis proteksi index.html
        const protectHtml = '<!DOCTYPE html><html><head><title>Akses Dibatasi</title></head><body><h3>403 Forbidden - RTQ ABA</h3></body></html>';
        if (!fs.existsSync(path.join(uploadBaseDir, 'index.html'))) {
          fs.writeFileSync(path.join(uploadBaseDir, 'index.html'), protectHtml);
        }
        fs.writeFileSync(path.join(targetDir, 'index.html'), protectHtml);

        // Simpan File 1
        const extP = (path.extname(filePendaftaran.filename) || '.docx').toLowerCase();
        const nameP = `Form_Pendaftaran_${cleanName}${extP}`;
        fs.writeFileSync(path.join(targetDir, nameP), filePendaftaran.data);

        // Simpan File 2
        const extK = (path.extname(fileKesantrian.filename) || '.docx').toLowerCase();
        const nameK = `Paket_Kesantrian_${cleanName}${extK}`;
        fs.writeFileSync(path.join(targetDir, nameK), fileKesantrian.data);

        // Tentukan protokol & base URL
        const proto = req.headers['x-forwarded-proto'] || 'http';
        const host = req.headers['x-forwarded-host'] || req.headers.host || `localhost:${PORT}`;
        const baseUrl = `${proto}://${host}`;

        const urlP = `${baseUrl}/uploads/pendaftaran/${folderName}/${encodeURIComponent(nameP)}`;
        const urlK = `${baseUrl}/uploads/pendaftaran/${folderName}/${encodeURIComponent(nameK)}`;

        // Simpan metadata JSON
        const metadata = {
          registrationId: regId,
          timestamp: new Date().toISOString(),
          namaSantri,
          ttl,
          gender,
          usia,
          namaAyah,
          namaIbu,
          noWa,
          alamat,
          program,
          filePendaftaran: {
            originalName: filePendaftaran.filename,
            serverName: nameP,
            size: filePendaftaran.data.length,
            url: urlP,
          },
          fileKesantrian: {
            originalName: fileKesantrian.filename,
            serverName: nameK,
            size: fileKesantrian.data.length,
            url: urlK,
          },
          ipAddress: req.socket.remoteAddress || 'UNKNOWN',
        };

        fs.writeFileSync(
          path.join(targetDir, 'data_pendaftaran.json'),
          JSON.stringify(metadata, null, 2)
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            success: true,
            message: 'Berkas formulir berhasil disimpan di server!',
            registrationId: regId,
            studentName: namaSantri,
            folder: folderName,
            filePendaftaran: {
              name: nameP,
              url: urlP,
              size: (filePendaftaran.data.length / 1024).toFixed(1) + ' KB',
            },
            fileKesantrian: {
              name: nameK,
              url: urlK,
              size: (fileKesantrian.data.length / 1024).toFixed(1) + ' KB',
            },
          })
        );
      } catch (err) {
        console.error('Upload error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Terjadi kesalahan pemrosesan berkas di server.' }));
      }
    });

    return;
  }

  // 2. STATIC FILE SERVER DARI FOLDER out/
  let filePath = path.join(OUT_DIR, pathname === '/' ? 'index.html' : pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Jika direktori, coba cari index.html di dalamnya
      if (!err && stats.isDirectory()) {
        const indexInDir = path.join(filePath, 'index.html');
        if (fs.existsSync(indexInDir)) {
          filePath = indexInDir;
        } else {
          res.writeHead(403);
          res.end('Akses Dibatasi');
          return;
        }
      } else {
        // Fallback jika tidak ditemukan
        const notFoundPath = path.join(OUT_DIR, '404.html');
        if (fs.existsSync(notFoundPath)) {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          fs.createReadStream(notFoundPath).pipe(res);
          return;
        }
        res.writeHead(404);
        res.end('404 Not Found');
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=================================================`);
  console.log(` RTQ Abdurrahman bin Auf Server Berjalan Aktif!  `);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` Static Root: ${OUT_DIR}`);
  console.log(` Upload Endpoint: http://localhost:${PORT}/upload.php`);
  console.log(`=================================================`);
});
