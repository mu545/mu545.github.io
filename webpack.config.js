const dotenv = require('dotenv')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin')

dotenv.config()

const manifest = {
  path: "/",
  appName: 'Musa Sutisna Website',
  appShortName: 'Musa Website',
  appDescription: 'musa sutisna personal website',
  developerName: 'Musa Sutisna',
  developerURL: 'https://github.com/mu545',
  dir: "auto", 
  lang: "en-US",
  background: "#3273DC",
  theme_color: "#3273DC",
  appleStatusBarStyle: "black-translucent",
  display: "standalone",
  orientation: "any",
  scope: "/",
  start_url: "/index.html",
  version: "1.0.0",
  logging: false,
  pixel_art: false,
  loadManifestWithCredentials: false,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: true,
    favicons: true,
    firefox: true,
    windows: true,
    yandex: true
  }
}

module.exports = {
  mode: process.env.mode,
  entry: {
    app: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint',
      //     options: {
      //       cache: process.env.eslint_cache
      //     }
      //   }
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: manifest.appName,
      meta: {
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      minify: {
        collapseWhitespace: true
      }
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/assets/images/logo.png'),
      publicPath: '/',
      outputPath: '/icons',
      prefix: '/icons',
      inject: true,
      favicons: manifest
    })
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  watch: true
}
