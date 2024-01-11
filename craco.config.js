const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.module.rules[1].oneOf = [
        ...[
          {
            test: /.svg$/, // 存放svg的文件夹
            include: path.resolve("./src/icons"),
            use: [
              { loader: "svg-sprite-loader", options: {} },
              { loader: "svgo-loader", options: { symbolId: "[name]" } },
            ],
          },
        ],
        ...webpackConfig.module.rules[1].oneOf,
      ];
      return webpackConfig;
    },
  },
  devServer: {
    port: 5000,
    hot: true,
    client: {
      overlay: false,
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
      },
    },
  },
};
