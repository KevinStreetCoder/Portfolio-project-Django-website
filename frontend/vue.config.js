const BundleTracker = require("webpack-bundle-tracker");

module.exports = {
    // Set the publicPath to the address where Django server is serving static files
    publicPath: process.env.NODE_ENV === 'production'
            ? ''
            : 'http://127.0.0.1:8080/',
    outputDir: '../static/dist/',

    chainWebpack: config => {

        config.optimization
            .splitChunks(false);

        config
            .plugin('BundleTracker')
            .use(BundleTracker, [{filename: '/webpack-stats.json'}])

        config.output
            .filename('bundle.js')


        config.resolve.alias
            .set('__STATIC__', 'static')

        config.devServer
            //.static('http://localhost:8080')
            .host('127.0.0.1')
            .port(8080)
            .hot(true)
            //.watchOptions({poll: 1000})
            .https(false)
            .headers({"Access-Control-Allow-Origin": ["*"]})
    },

    // Uncomment before executing 'npm run build'
    // css: {
    //     extract: {
    //         filename: 'bundle.css',
    //         chunkFilename: 'bundle.css',
    //     },
    // }
};
