const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const env = process.env.VUE_APP_ENV;
const outputDir = `releases-${env}`;

// gzip
const compress = new CompressionWebpackPlugin({
  filename: "[path].gz[query]",
  algorithm: "gzip",
  threshold: 10240,
  test: new RegExp(
    "\\.(" + ["js", "css", "json", "html", "svg"].join("|") + ")$"
  ),
  minRatio: 0.8,
  deleteOriginalAssets: false
});

module.exports = {
  outputDir: outputDir,
  assetsDir: "dist",

  css: {
    // 提取至独立CSS文件中
    extract: true,
    // 是否为 CSS 开启 source map, 设置为 true 之后可能会影响构建的性能
    sourceMap: false,
    loaderOptions: {
      stylus: {}
    }
  },

  configureWebpack: {
    plugins: [compress]
  },

  // 生产环境的 source map
  productionSourceMap: false,

  chainWebpack: config => {
    // 关闭文件过大时产生的警告
    config.performance.set("hints", false);
    // 压缩代码
    config.optimization.minimize(true);
    // 分割代码
    config.optimization.splitChunks({
      chunks: "all"
    });

    // 设置别名
    config.resolve.alias
      .set("@", path.resolve(__dirname, "src"))
      .set("@view", path.resolve(__dirname, "src/views"));

    config.externals({
      // wx: "wx"
    });
  },

  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: true,

  // 第三方插件配置
  pluginOptions: {
    vconsole: {
      enable: env !== "production"
    },
    // Stylus 全局变量在其他文件无法使用
    "style-resources-loader": {
      preProcessor: "stylus",
      patterns: [
        // 引入全局变量文件 .styl
        path.resolve(__dirname, "src/stylus/base/index.styl")
      ]
    }
  },
  // 本地开发服务配置
  devServer: {
    compress: true,
    open: false,
    port: 9090
  }
};
