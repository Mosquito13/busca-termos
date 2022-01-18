const fs = require('fs');
const path = require('path');
const msi = require('electron-wix-msi');

const baseDir = process.cwd();
const version = fs.readFileSync(path.join(baseDir, 'version'));

const msiCreator = new msi.MSICreator({
  appDirectory: path.join(baseDir, 'dist', 'win-unpacked'),
  outputDirectory: path.join(baseDir, 'release', 'msi'),
  appIconPath: path.join(baseDir, 'dist', '.icon-ico', 'icon.ico'),
  description: 'BuscaTermos',
  exe: 'BuscaTermos',
  name: 'BuscaTermos',
  manufacturer: 'Giovane de Oliveira',
  ui: {
    chooseDirectory: true
  },
  version: version.toString(),
  arch: 'x64'
});

const createMsi = async () => {
  await msiCreator.create();
  await msiCreator.compile();
};

createMsi();
