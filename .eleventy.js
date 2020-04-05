let nunjucks = require('nunjucks');
let njIncludeData = require('nunjucks-includeData');

module.exports = function(config) {
  config.addPassthroughCopy('src/styles');

  let njEnv = nunjucks.configure('src/templates');
  njIncludeData.install(njEnv);
  config.setLibrary("njk", njEnv);

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'templates'
    },
    passthroughFileCopy: true
  };
};
