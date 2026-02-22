const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);
const libRoot = path.resolve(__dirname, '..');

config.watchFolders = [libRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(libRoot, 'node_modules'),
];

module.exports = config;
