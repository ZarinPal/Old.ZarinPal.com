const elixir = require('laravel-elixir');
require('laravel-elixir-pug');
require('laravel-elixir-jade');
require('laravel-elixir-vue');


/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function (mix) {
    mix.pug(
        {
            // Compile to blade.php files or html files
            blade: false,
            // Pretty output or uglified
            pretty: true,
            // Source of pug files
            src: 'src/pug/',
            // Files to look for, useful if you are still naming files .pug
            search: '**/*.pug',
            // Files to skip, useful for partials
            exclude: '**/partials/**/*.pug',
            // Extension of pug files. Only needed to be set if still naming file .pug
            pugExtension: '.pug',
            // If blade is true, output to resources/views, otherwise public/html
            dest: 'public/',
            // Any additional watches
            additional_watches: []
        }
    );
    mix.sass(
        [
            './src/sass/styles.scss'
        ],
        'public/assets/css/styles.css'
    );

    mix.sass(
        [
            './src/sass/en.scss'
        ],
        'public/assets/css/en.css'
    );

    mix.webpack(
        './src/js/merchants/app.js',
        './public/assets/js/merchants/app.js'
    );

    elixir(function (mix) {
        mix.copy('./src/img/', 'public/assets/img/');
    });

    elixir(function (mix) {
        mix.copy('./src/img/favicons/', 'public/');
    });

    elixir(function (mix) {
        mix.copy('./src/js/raw/', 'public/assets/js/');
    });

    elixir(function (mix) {
        mix.copy('./src/fonts/', 'public/assets/fonts/');
    });

    elixir(function (mix) {
        mix.copy('./src/manifests/', 'public/');
    });

});
