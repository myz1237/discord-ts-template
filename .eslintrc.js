module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['simple-import-sort'],
	settings: {
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true
			}
		}
	},
	env: {
		node: true
	},
	rules: {
		'no-warning-comments': [1, { terms: ['todo', 'fixme', 'to-do'], location: 'anywhere' }],
		'max-depth': ['error', 8],
		'@typescript-eslint/consistent-type-definitions': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'no-unused-vars': 'error',
		'prefer-const': 'error',
		'no-irregular-whitespace': 'error',
		'no-empty-function': 'error',
		'no-duplicate-imports': 'error',
		'newline-after-var': 'error'
	}
};
