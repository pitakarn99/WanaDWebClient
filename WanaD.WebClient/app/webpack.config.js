/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require("dotenv-webpack");
const { ProvidePlugin } = require("webpack");
const cssLoader = "css-loader";
const CopyWebpackPlugin = require("copy-webpack-plugin");
const postcssLoader = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: ["autoprefixer"],
    },
  },
};
const cssRules = [
  {
    loader: 'css-loader'
  }
];
module.exports = function (env, { analyze }) {
  const production = env.production || process.env.NODE_ENV === "production";
  return {
    target: "web",
    mode: production ? "production" : "development",
    devtool: production ? undefined : "eval-cheap-source-map",
    entry: {
      app: ['./src/main.ts'],
	  oidc: [
	  	'./src/Lib/Fs.Oidc/LoginCallback.ts'
	  ],
	  oidcsilentlogin: [
	  	'./src/Lib/Fs.Oidc/SilentLogin.ts'
	  ],
	  oidclogout: [
	  	'./src/Lib/Fs.Oidc/LogoutCallback.ts'
	  ]
    },
    output: {
      //path: path.resolve(__dirname, "dist"),
      path: path.resolve(__dirname, "../wwwroot/webpack"),
      publicPath: './webpack/',
      filename: production ? '[name].[chunkhash].bundle.js' : '[name].[fullhash].bundle.js',
      chunkFilename: production ? '[name].[chunkhash].chunk.js' : '[name].[fullhash].chunk.js'
    },
	
    resolve: {
      extensions: [".ts", ".js"],
      modules: [
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "dev-app"),
        "node_modules",
      ],
      alias: production
        ? {
            // add your production aliases here
          }
        : {
            ...getAureliaDevAliases(),
            // add your development aliases here
          },
    },
    devServer: {
      historyApiFallback: true,
      open: !process.env.CI,
      port: 9090,
    },
    module: {
      rules: [
        { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset" },
        {
          test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          type: "asset",
        },
        { test: /\.css$/i, use: ["style-loader", cssLoader, postcssLoader] },
        {
          test: /\.ts$/i,
          use: ["ts-loader", "@aurelia/webpack-loader"]
        },
        {
          test: /[/\\]src[/\\].+\.html$/i,
          use: "@aurelia/webpack-loader"
        },
		{ test: /\.json$/i,
		exclude: [
			path.resolve(__dirname, "src/Config")
		],	  loader: 'json-loader', type: 'javascript/auto' },
		{ test: /environment\.json$/i, use: [
        {loader: "app-settings-loader", options: {env: production ? 'production' : 'development' }},
      ]},
	  { test: /(FsConfig|open-id-connect-configuration).json$/i, 
	  include: [
			path.resolve(__dirname, "src/Config")
		],
	  use: [
		{
			loader: "file-loader",
			options: 
			{ 
				name: "[name].[ext]?bust=[contenthash]",
				outputPath: "./Config/"
			}
		},
      ], type: 'javascript/auto'}
      ]
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: "src/Modules/**/Locales/**/*" }],
      }),
      new ProvidePlugin({
        jQuery: "jquery",
        $: "jquery",
        "window.jQuery": "jquery",
        "window.$": "jquery",
      }),
      //new HtmlWebpackPlugin({ template: "index.html", favicon: "favicon.ico" }),
      new HtmlWebpackPlugin({
		  template: '_Layout.cshtml',
		  filename: '../../Views/Shared/_Layout.cshtml',
		  chunks: ['app','lang-en','lang-th'],
		  minify: false
      }),
	  new HtmlWebpackPlugin({
		  template: '_OidcLayout.cshtml',
		  filename: '../../Views/Shared/_OidcLayout.cshtml',
		  chunks: ['oidc'],
		  minify: false
      }),
	  new HtmlWebpackPlugin({
		  template: '_OidcLogoutLayout.cshtml',
		  filename: '../../Views/Shared/_OidcLogoutLayout.cshtml',
		  chunks: ['oidclogout'],
		  minify: false
      }),
	  new HtmlWebpackPlugin({
		  template: '_OidcSilentLoginLayout.cshtml',
		  filename: '../../Views/Shared/_OidcSilentLoginLayout.cshtml',
		  chunks: ['oidcsilentlogin'],
		  minify: false
      }),
      new Dotenv({
        path: `./.env${
          production ? "" : "." + (process.env.NODE_ENV || "development")
        }`,
      }),
      analyze && new BundleAnalyzerPlugin(),
    ].filter((p) => p),
  };
};

function getAureliaDevAliases() {
  return [
    "aurelia",
    "fetch-client",
    "kernel",
    "metadata",
    "platform",
    "platform-browser",
    "route-recognizer",
    "router",
    "router-lite",
    "runtime",
    "runtime-html",
    "testing",
    "state",
    "ui-virtualization",
  ].reduce((map, pkg) => {
    const name = pkg === "aurelia" ? pkg : `@aurelia/${pkg}`;
    try {
      const packageLocation = require.resolve(name);
      map[name] = path.resolve(packageLocation, `../../esm/index.dev.mjs`);
    } catch {
      /**/
    }
    return map;
  }, {});
}
