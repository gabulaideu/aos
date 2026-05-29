// Karma configuration
var isTravis = process.env.TRAVIS || false;
var browsers = isTravis ? ['ChromeHeadlessNoSandbox'] : ['ChromeHeadless'];
var singleRun = true; // Run once and exit

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: browsers,
    frameworks: ['jasmine'],

    files: [
      'test/setup.js',
      'test/index.js',
      {
        pattern: 'test/fixtures/**/*.html',
        watched: true,
        included: false,
        served: true
      },
      {
        pattern: 'dist/**/*.css',
        watched: true,
        included: false,
        served: true
      }
    ],

    preprocessors: {
      'test/index.js': ['webpack']
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      externals: {
        react: 'window.React',
        vue: 'window.Vue'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
          }
        ]
      }
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-webpack'
    ],

    reporters: ['progress'],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    port: 9876,
    singleRun: singleRun,
    colors: true,
    logLevel: config.LOG_INFO
  })
}
