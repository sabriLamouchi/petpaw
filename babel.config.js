module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    
    plugins: [
      'react-native-reanimated/plugin',
      '@babel/plugin-transform-export-namespace-from',
      '@babel/plugin-transform-runtime',
      ['module-resolver', {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      }],
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true
      }]
    ],
  };
};
