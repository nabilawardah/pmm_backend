const mix = require('laravel-mix')
require('laravel-mix-bundle-analyzer')

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

mix
  .copyDirectory('resources/assets', 'public')
  .js('resources/js/app.js', 'public/js')
  .js('resources/js/helper/prefetch.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css')
  .extract([
    'jquery',
    'axios',
    'pell',
    'datatables.net-fixedcolumns-bs4',
    'datatables.net-fixedcolumns-dt',
    'datatables.net-fixedcolumns',
    'datatables.net-dt',
    'datatables.net',
    'slick-carousel',
    'vanilla-lazyload',
    // 'validator',
    'dayjs',
    'lodash.transform',
    'lodash.isequal',
    'lodash.isobject',
  ])
  .sourceMaps()

// ADJUST with your own setup
// Change to your own proxy if you're using Laravel Valet,
// or change to http://localhost:3000 if you're not using laravel valet
mix.browserSync('http://pmm.dushi')

if (mix.inProduction()) {
  mix.version()
}

if (mix.inProduction()) {
  mix.bundleAnalyzer()
}
