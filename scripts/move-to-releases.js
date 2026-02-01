#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find the project root
const projectRoot = path.resolve(__dirname, '..');

const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
const version = packageJson.version;

console.log(`📦 Moving package to releases/ directory...`);

const releasesDir = path.join(projectRoot, 'releases');
const distDir = path.join(projectRoot, 'dist');

// Create releases directory if it doesn't exist
if (!fs.existsSync(releasesDir)) {
  fs.mkdirSync(releasesDir, { recursive: true });
}

// Get the package tarball name from npm pack output
try {
  // Check if there's a dist directory first
  if (fs.existsSync(distDir)) {
    const files = fs.readdirSync(distDir);
    const tarball = files.find(f => f.endsWith('.tgz'));

    if (tarball) {
      const sourcePath = path.join(distDir, tarball);
      const targetPath = path.join(releasesDir, tarball);

      // Move the tarball to releases directory
      fs.renameSync(sourcePath, targetPath);

      console.log(`✓ Moved ${tarball} to releases/ directory`);
      console.log(`✓ New location: releases/${tarball}`);
      console.log(`✓ Size: ${fs.statSync(targetPath).size} bytes`);

      // Also move .tgz.md file if exists
      const mdFile = tarball.replace('.tgz', '.tgz.md');
      if (fs.existsSync(path.join(distDir, mdFile))) {
        fs.renameSync(
          path.join(distDir, mdFile),
          path.join(releasesDir, mdFile)
        );
        console.log(`✓ Moved ${mdFile} to releases/ directory`);
      }

    } else {
      console.error('❌ No .tgz file found in dist/ directory');
      process.exit(1);
    }
  } else {
    console.error('❌ dist/ directory does not exist');
    console.log('   Please run npm run package first');
    process.exit(1);
  }

} catch (error) {
  console.error('❌ Error moving package:', error.message);
  process.exit(1);
}

console.log('\n✨ Release package moved successfully\n');
