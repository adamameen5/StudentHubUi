const { execSync } = require('child_process');

// Get release type (major, minor, patch) and optional beta flag from command line
const releaseType = process.argv[2] || 'patch';
const isBeta = process.argv[3] === 'beta';

// Run standard-version to bump package.json and create changelog
const standardVersionArgs = isBeta 
  ? `npx standard-version --no-verify --release-as patch --prerelease beta`
  : `npx standard-version --no-verify --release-as ${releaseType}`;

// Force tag overwrite if it exists
try {
  execSync(standardVersionArgs, { stdio: 'inherit' });
} catch (error) {
  if (error.message.includes('tag') && error.message.includes('already exists')) {
    console.warn('Tag already exists, forcing overwrite...');
    const packageJson = require('../package.json');
    const tag = isBeta ? `v${packageJson.version}-beta.0` : `v${packageJson.version}`;
    execSync(`git tag -d ${tag} || true`, { stdio: 'inherit' }); // Delete local tag
    execSync(`git push origin :refs/tags/${tag} || true`, { stdio: 'inherit' }); // Delete remote tag
    execSync(standardVersionArgs, { stdio: 'inherit' }); // Retry
  } else {
    throw error;
  }
}

// Read updated package.json to log the new version
const fs = require('fs');
const path = require('path');
const packageJsonPath = path.join(__dirname, '../package.json');
const updatedPackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const newVersion = updatedPackageJson.version;

console.log(`Version bumped to ${newVersion} in package.json`);