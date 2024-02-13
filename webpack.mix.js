const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    resolve: {
        fallback: {
            stream: require.resolve("stream-browserify"),
            http: require.resolve("stream-http"),
            https: require.resolve("https-browserify"),
            zlib: require.resolve("browserify-zlib"),
        },
    },
});

mix.js("resources/js/app.js", "public/js")
    .sass("resources/sass/app.scss", "public/css")
    .sourceMaps();

mix.js("resources/js/index.js", "public/react/js").react();
