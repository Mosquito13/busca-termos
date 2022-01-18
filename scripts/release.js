const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const baseDir = process.cwd();
const version = fs.readFileSync(path.join(baseDir, 'version'));

execSync(`npm version ${version}`);