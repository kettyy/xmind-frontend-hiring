const CracoAntDesignPlugin = require("craco-antd");

const path = require("path");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        // You can customize the theme in here, or by creating an
        // antd.customize.json file in your project's root directory.
        customizeTheme: {
          // "@primary-color": "#F62F24",
        },
        lessLoaderOptions: {
          // Any other less-loader options
          // See: https://webpack.js.org/loaders/less-loader/
        },
      },
    },
  ],
  webpack: { alias: { "@": path.resolve(__dirname, "src") } },
};
