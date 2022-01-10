const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const baseDir = process.cwd();

const releaseFolder = path.join(baseDir, 'release');
const zipFolder = path.join(releaseFolder, 'zip');
const zipFile = path.join(zipFolder, 'BuscaTermos-portable.zip');

const checkAndCreateReleaseFolder = () => {
  if (!fs.existsSync(releaseFolder)) {
    fs.mkdirSync(releaseFolder);
  }
  if (!fs.existsSync(zipFolder)) {
    fs.mkdirSync(zipFolder);
  }
};

const createZip = () => {
  checkAndCreateReleaseFolder();

  const output = fs.createWriteStream(zipFile);
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
    } else {
      throw err;
    }
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);
  archive.directory(path.join(baseDir, 'dist', 'win-unpacked'), false);
  archive.finalize();
};

createZip();
