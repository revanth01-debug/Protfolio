const https = require('https');
const fs = require('fs');
const path = require('path');
const files = [
  'INDEX.html',
  'README.md',
  'changepassword.html',
  'civicus-logo.png',
  'issue.html',
  'lastpage.html',
  'login.html',
  'register.html',
  'script.js',
  'setting.html',
  'style.css',
  'user.html'
];
const outDir = path.join(process.cwd(), 'public', 'projects', 'civictrack');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
let pending = files.length;
files.forEach((file) => {
  const url = `https://raw.githubusercontent.com/revanth01-debug/SIH_HACKATHON_2025/main/${file}`;
  https.get(url, { headers: { 'User-Agent': 'node' } }, (res) => {
    const target = path.join(outDir, file);
    const isBinary = file.endsWith('.png');
    const fileStream = fs.createWriteStream(target, { encoding: isBinary ? 'binary' : 'utf8' });
    if (isBinary) {
      res.setEncoding('binary');
    }
    res.on('data', (chunk) => fileStream.write(chunk, isBinary ? 'binary' : 'utf8'));
    res.on('end', () => {
      fileStream.end();
      console.log('saved', file);
      if (--pending === 0) {
        const indexSrc = path.join(outDir, 'INDEX.html');
        const indexDest = path.join(outDir, 'index.html');
        if (fs.existsSync(indexSrc)) {
          fs.copyFileSync(indexSrc, indexDest);
          console.log('copied INDEX.html -> index.html');
        }
      }
    });
    res.on('error', (e) => {
      console.error('error', file, e);
      if (--pending === 0) {
        console.log('done with errors');
      }
    });
  }).on('error', (e) => {
    console.error('request error', file, e);
    if (--pending === 0) {
      console.log('done with errors');
    }
  });
});
