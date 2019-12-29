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

mix
  .copyDirectory("resources/assets", "public")
  .js("resources/js/app.js", "public/js")
  .js("resources/js/prefetch.js", "public/js")
  .sass("resources/sass/app.scss", "public/css")
  .extract(["jquery", "axios", "datatables.net-fixedcolumns-bs4"])
  .sourceMaps();

// ADJUST with your own setup
// Change to your own proxy if you're using Laravel Valet,
// or change to http://localhost:3000 if you're not using laravel valet
mix.browserSync("http://pmm.dushi");

if (mix.inProduction()) {
  mix.version();
}
