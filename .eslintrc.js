module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends:
    [
      'react-app',
      'airbnb',
      'prettier'
    ],
  rules: {
    "react/jsx-filename-extension": [0, { "extensions": [".js", ".jsx"] }],
    "import/prefer-default-export": 0,
    "react/prop-types": 0,
  },
  "settings": {
    "import/resolver": {
      "alias": {
        "map": [
          ['@', './src'],
          ['@components', './src/components'],
        ],
        "extensions": [".js", ".jsx"]
      }
    }
  }
}