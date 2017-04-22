const elixir = require('laravel-elixir');
require('laravel-elixir-vue-2');
require('laravel-elixir-pug');


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
    mix.webpack(
        './src/js/merchants/app.js',
        './public/assets/js/merchants/app.js'
    );
    //
    mix.pug(
        {
            // Compile to blade.php files or html files
            blade: false,
            // Pretty output or uglified
            pretty: false,
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


    mix.copy('./src/img/', 'public/assets/img/');

    mix.copy('./src/img/favicons/', 'public/');

    mix.copy('./src/js/raw/', 'public/assets/js/');

    mix.copy('./src/fonts/', 'public/assets/fonts/');

    mix.copy('./src/manifests/', 'public/');
    mix.browserSync(
    {
        proxy 			: "zarinpal.dev"
    });
});
