module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'import/order': [
      1,
      {
        pathGroups: [
          {
            pattern: 'src/models/**',
            group: 'external',
            position: 'after',
          },
        ],
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],

    'max-len': [
      'error',
      {
        code: 145,
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
      },
    ],
    // disable the rule for all files
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-async-promise-executor': 'off',
  },

  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'],
          ['components', './src/components'],
        ],
        extensions: ['.ts', '.js', '.vue'],
      },
    },
  },

  overrides: [
    {
      files: [
        '*.test.js',
        '*.spec.js',
        '*.spec.ts'
      ],
      rules: {
        'no-unused-expressions': 'off'
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],
};
