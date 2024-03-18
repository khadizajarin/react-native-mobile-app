module.exports = function(api) {
  api.cache(true);

  const presets = [
    '@babel/preset-react',
    '@babel/preset-flow', 
  ];

  const plugins = [];

  return {
    presets,
    plugins
  };
}
