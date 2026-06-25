import { defineConfig } from 'eslint/config'
import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginSvelte from 'eslint-plugin-svelte'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
import svelteParser from 'svelte-eslint-parser'

const tailwindEntryPoint = 'src/renderer/src/assets/main.css'

const strictTailwindRules = {
  // Class order is enforced by prettier-plugin-tailwindcss (format:check).
  // eslint-plugin-better-tailwindcss uses a different sort algorithm for custom @theme utilities.
  'better-tailwindcss/enforce-consistent-class-order': 'off',
  'better-tailwindcss/enforce-consistent-variant-order': 'error',
  'better-tailwindcss/enforce-consistent-variable-syntax': 'error',
  'better-tailwindcss/enforce-consistent-important-position': 'error',
  'better-tailwindcss/enforce-shorthand-classes': 'error',
  'better-tailwindcss/enforce-logical-properties': 'error',
  'better-tailwindcss/enforce-consistent-line-wrapping': ['error', { printWidth: 300 }]
}

export default defineConfig(
  { ignores: ['**/node_modules', '**/dist', '**/out'] },
  tseslint.configs.recommended,
  eslintPluginSvelte.configs['flat/recommended'],
  eslintPluginBetterTailwindcss.configs['recommended-error'],
  {
    files: ['**/*.{svelte,ts,tsx,js,jsx}'],
    settings: {
      'better-tailwindcss': {
        entryPoint: tailwindEntryPoint
      }
    },
    rules: strictTailwindRules
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    files: ['**/*.{tsx,svelte}'],
    rules: {
      'svelte/no-unused-svelte-ignore': 'off'
    }
  },
  eslintConfigPrettier
)
