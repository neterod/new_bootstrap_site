(function () {
    'use strict';

    var gulp  = require('gulp'),
        uglify  = require('gulp-uglify'),

        sass = require('gulp-sass'),
        eslint = require('gulp-eslint'),
        csslint = require('gulp-csslint'),

        browserSync = require('browser-sync').create(),
        htmlmin = require('gulp-htmlmin'),
        concat = require('gulp-concat'),
        imagemin = require('gulp-imagemin'),
        rename = require('gulp-rename'),
        sourcemaps = require('gulp-sourcemaps'),

        //new
        cached = require('gulp-cached'),
        remember = require('gulp-remember'),

        srcDir = 'src/',
        distDir = 'dist/',
        distJS = distDir + 'js/',

        //isWin = /^win/.test(process.platform),
        //proxy = isWin ? 'http://localhost:2929' : 'http://localwindows:2929',

        /* jQuery library */
        jQuerySrc = [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/flexslider/jquery.flexslider-min.js'
        ],
        jQueryDest = distJS,
        jQueryLibFile = 'jquery.min.js',


        /* Bootstrap 4 libraries */
        libBSDir = 'node_modules/bootstrap/',
        libBSSrc = [
            'node_modules/tether/dist/js/tether.min.js',
            'node_modules/popper.js/dist/umd/popper.min.js',
            libBSDir + 'js/dist/util.js',
            libBSDir + 'js/dist/alert.js',
            libBSDir + 'js/dist/button.js',
            // Bootstrap carousel replaced by flexslider
            // libBSDir + 'js/dist/carousel.js',
            libBSDir + 'js/dist/collapse.js',
            libBSDir + 'js/dist/dropdown.js',
            libBSDir + 'js/dist/modal.js',
            libBSDir + 'js/dist/tooltip.js',
            libBSDir + 'js/dist/popover.js',
            libBSDir + 'js/dist/scrollspy.js',
            libBSDir + 'js/dist/tab.js',
            libBSDir + 'js/dist/toast.js',
            libBSDir + 'js/dist/index.js'
        ],
        libBSDest = distJS,
        libBSFile = 'bootstrap.min.js',

        jsSrc  = [
            srcDir + 'js/plugins/analytics.js',
            srcDir + 'js/plugins/average-bg-image-color.js',
            srcDir + 'js/plugins/back-to-top.js',
            srcDir + 'js/plugins/break-long-urls.js',
            srcDir + 'js/plugins/convert-svg-inline.js',
            srcDir + 'js/plugins/file-reader-downloads.js',
            srcDir + 'js/plugins/mobile-check.js',
            srcDir + 'js/plugins/navbar.js',
            srcDir + 'js/plugins/parallax.js',
            srcDir + 'js/plugins/responsive-tables.js',
            srcDir + 'js/plugins/skip-nav.js',
            srcDir + 'js/plugins/text-resizer.js',
            srcDir + 'js/plugins/google-font-loader.js',
            srcDir + 'js/main.js'
        ],
        jsDest = distJS,
        jsLintSrc = [
            srcDir + 'js/main.js'
        ],

        /* CSS */
        scssBootstrapSrc = srcDir + 'scss/',
        scssSrc = srcDir + 'scss/main.scss',
        cssDest = distDir + 'css/';


    gulp.task('compresslibraries', async function () {

        /* jQuery */
        gulp.src(jQuerySrc)
            .pipe(concat(jQueryLibFile))
            .pipe(uglify())
            .pipe(gulp.dest(jQueryDest));

        /* Boostrap */
        gulp.src(libBSSrc)
            .pipe(concat(libBSFile))
            .pipe(uglify())
            // .pipe(uglify({
            //     mangle: false
            // }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(libBSDest));
    });

    gulp.task('compileimages', async function () {
        return gulp.src(srcDir + 'images/*')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/images'));
    });

    gulp.task('lint', function () {
        return gulp.src(jsLintSrc)
            // eslint() attaches the lint output to the "eslint" property
            // of the file object so it can be used by other modules.
            .pipe(eslint())
            // eslint.format() outputs the lint results to the console.
            // Alternatively use eslint.formatEach() (see Docs).
            .pipe(eslint.format())
            // To have the process exit with an error code (1) on
            // lint error, return the stream and pipe to failAfterError last.
            .pipe(eslint.failAfterError());
    });

    gulp.task('compressjs', async function () {
        gulp.src(jsSrc)
            .pipe(sourcemaps.init())
            .pipe(remember('compressfiles'))
            .pipe(concat('main.min.js'))
            .pipe(uglify({
                mangle: false
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(jsDest));
    });

    gulp.task('compilecss', async function () {
        return gulp.src(scssSrc)
            .pipe(csslint(srcDir + 'scss/.csslintrc'))
            .pipe(remember('scssfiles'))
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(rename('main.min.css'))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(cssDest));
    });

    gulp.task('compileSCSSBootstrap', async function () {
        return gulp.src(scssBootstrapSrc + 'bootstrap.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(rename('bootstrap.min.css'))
            .pipe(gulp.dest(cssDest));
    });

    gulp.task('minifyhtml', async function () {
        return gulp.src(srcDir + '*.html')
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
            .pipe(gulp.dest(distDir));
    });

    gulp.task('server', function () {
        cached.caches = {};
        browserSync.init({
            server: {
                baseDir: distDir
            },
            open: false
        });

        browserSync.watch(cssDest + '*.css', function (event) {
            if (event === 'change') {
                browserSync.reload(cssDest + '*.css');
            }
        });

        gulp.watch('../src/scss/*.scss', gulp.series('compilecss'));

        gulp.watch(srcDir + 'scss/*.scss', gulp.series('compilecss'));
        gulp.watch([srcDir + 'js/*.js', srcDir + 'js/**/*.js'], gulp.series('lint', 'compressjs'));
        gulp.watch(srcDir + '**/*.html', gulp.series('minifyhtml'));

        gulp.watch([distDir + '*.html', jsDest + '*.js', srcDir + 'scss/*.scss']).on('change', browserSync.reload);

        gulp.watch([srcDir + 'scss/variables.scss']).on('change', gulp.series('compileSCSSBootstrap'));
    });

    gulp.task('build', gulp.series('compileSCSSBootstrap', 'compresslibraries', 'compileimages', 'lint', 'compressjs', 'compilecss', 'minifyhtml'));

    gulp.task('default', gulp.series( 'compileimages', 'lint', 'compressjs', 'compilecss', 'minifyhtml', 'server'));
}());
