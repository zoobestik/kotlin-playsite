// It's for vitest and nextjs cross compatibility.
// vitest - `require` is necessary, nextjs - is string declaration is important.
function getPlugin(name, options) {
  if (process.env.TEST_CT === 'true') {
    const plugin = require(name);
    return options ? plugin(options) : plugin;
  }

  return options ? [name, options] : name;
}

const postcssConfig = {
  plugins: [
    getPlugin('postcss-import'),
    getPlugin('postcss-custom-media'),
    getPlugin('postcss-flexbugs-fixes'),

    getPlugin('postcss-preset-env', {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': true,
        'nesting-rules': true,
      },
    }),
  ],
};

module.exports = postcssConfig;
