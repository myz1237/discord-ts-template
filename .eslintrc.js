module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['simple-import-sort', 'unused-imports'],
	extends: ['plugin:@typescript-eslint/recommended-type-checked'],
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname
	},
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
		'@typescript-eslint/strict-boolean-expressions': [
			'error',
			{
				allowString: false,
				allowNumber: false,
				allowNullableObject: true,
				allowNullableBoolean: false
			}
		],
		'@typescript-eslint/consistent-type-definitions': 'off',
		'@typescript-eslint/unbound-method': 'error',
		'unused-imports/no-unused-imports': 'error',
		eqeqeq: 'error',
		'no-warning-comments': [1, { terms: ['todo', 'fixme', 'to-do'], location: 'anywhere' }],
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
