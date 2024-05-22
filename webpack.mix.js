let mix = require('laravel-mix');
require('laravel-mix-compress');
// require("laravel-mix-clean-css");
// require("laravel-mix-purgecss");

mix.js("src/js/app.js", "dist/js/app.min.js")
   .sass("src/scss/style.scss", "dist/css/style.min.css")
   .options({ outputStyle: "compressed", processCssUrls: false })
   .compress();