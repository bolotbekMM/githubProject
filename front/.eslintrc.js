module.exports = {
  extends: ['airbnb', 'prettier', 'eslint-config-prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
  },
};
