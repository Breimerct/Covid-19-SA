import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'src-capacitor/**',
      'src-cordova/**',
      'src-electron/**',
      '.quasar/**',
      'quasar.config.*.temporary.compiled*'
    ]
  },
  
  // JavaScript/TypeScript files
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly'
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      'prefer-promise-reject-errors': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  },

  // Vue files
  {
    files: ['**/*.vue'],
    languageOptions: {
      globals: {
        ...globals.browser,
        process: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly'
      },
      parser: pluginVue.parser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': tseslint
    },
    rules: {
      ...pluginVue.configs.essential.rules,
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      'prefer-promise-reject-errors': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },

  // Prettier compatibility
  eslintConfigPrettier
]