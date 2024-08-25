import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the directory name of the file

export default [
	{
		files: ['**/*.ts', '**/*.mjs']
	},
	{
		ignores: [
			'**/dist',
			'**/node_modules',
			'test',
			'*.config.js',
			'*.config.ts',
			'*.config.mjs'
		]
	},
	includeIgnoreFile(path.join(__dirname, '.gitignore')),
	{
		plugins: {
			'simple-import-sort': simpleImportSort,
			import: importPlugin
		},

		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				sourceType: 'module',
				project: './tsconfig.json'
			}
		},

		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true
				}
			}
		},

		rules: {
			'@typescript-eslint/strict-boolean-expressions': [
				'error',
				{
					allowString: false,
					allowNumber: false,
					allowNullableObject: true,
					allowNullableBoolean: false
				}
			],
			'@typescript-eslint/unbound-method': 'error',
			'no-warning-comments': [
				1,
				{
					terms: ['todo', 'fixme', 'to-do'],
					location: 'anywhere'
				}
			],

			'max-depth': ['error', 8],
			'@typescript-eslint/consistent-type-definitions': 'off',
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
			'no-unused-vars': 'error',
			'prefer-const': 'error',
			'no-irregular-whitespace': 'error',
			'no-empty-function': 'error',
			'no-duplicate-imports': 'error',
			'newline-after-var': 'error',
			eqeqeq: 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true
				}
			]
		}
	}
];
