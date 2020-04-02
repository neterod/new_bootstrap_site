// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    '_': true,
    '__BUILDTIME__': true,
    '$': true,
    'jQuery': true,
    'ga': true,
    'analytics': true,
    'Vue': true,
    'router': true,
    'require': true,
    'customAjax': true,
    'setGridWidth': true,
    'sizeDashboard': true,
    'getOS': true,
    'parseLastUpdated': true,
    'initWidget': true,
    '$route': true,
    'sanitizeUrl': true,
    'initGridStack': true,
    'widgetMixins': true,
    'getVueComp': true,
    'filters': true,
    'debounce': true,
    'copyData': true,
    'columnSpecs': true,
    'echarts': true,
    'CarrotSearchCircles': true,
    'widgetSpecs': true,
    'sharedSpecs': true,
    'isIE': true,
    'exportDataToCSV': true,
    'Pikaday': true,
    'allowNumbersInputOnly': true,
    'allowCharactersNumbersInputOnly': true,
    'allowCharactersInputOnly': true,
    'toTitleCase': true,
    'tippy': true
  },
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // require camelcase: variableName
    'camelcase': 2,
    // require following curly brace coventions
    'curly': 2,
    // require === and !==
    'eqeqeq': 2,
    // indentation 4 spaces
    'indent': [2, 4, {
      'SwitchCase': 1
    }],
    // disallow early use
    'no-use-before-define': 2,
    // require constructor begin with a capital letter
    'newcap': 0,
    // disallow caller/callee
    'no-caller': 2,
    // no trailing spaces at the end of lines
    'no-trailing-spaces': 2,
    // disallow irregular whitespaces
    'no-irregular-whitespace': 2,
    // disallow undeclared variables
    'no-undef': 2,
    // disallow unused variables
    'no-unused-vars': 2,
    // consistent use of semicolons
    'semi': 2,
    // enforce variables to be declared together
    'one-var': 2,
    // require space between function identifiers and their invocations
    'func-call-spacing': 2,
    // require new line after new variable
    'newline-after-var': 2,
    // enforce consistent spacing before opening parenthesis
    'space-before-function-paren': 2,
    // disallow new line at the end of file
    'eol-last': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
