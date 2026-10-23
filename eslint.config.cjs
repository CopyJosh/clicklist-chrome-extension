const globals = require('globals');
module.exports = [{ ignores: ['build/**', 'node_modules/**'] }, {
  files: ['src/**/*.js', 'scripts/**/*.cjs', 'tests/**/*.cjs'],
  languageOptions: { ecmaVersion: 'latest', sourceType: 'module',
    parserOptions: { ecmaFeatures: { jsx: true } }, globals: { ...globals.browser, ...globals.node } },
  rules: { 'no-undef': 'error', 'no-unreachable': 'error' }
}];
