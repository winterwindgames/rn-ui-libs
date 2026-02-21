const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const libraryRoot = path.resolve(__dirname, '..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [libraryRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
];

// Ensure fitspark-ui always resolves to the same location (prevent dual module instances)
config.resolver.extraNodeModules = {
  'fitspark-ui': libraryRoot,
};

module.exports = config;
