// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { gulp, src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const beeper = require('beeper');
const notify = require('gulp-notify');
const del = require('del');
const svgSymbols = require('gulp-svg-symbols');




const srcPath = {
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
  svg: 'src/svg/**/*.svg'
}

const distPath = {
  css: 'assets/css',
  js: 'assets/js',
  svg: 'assets/img'
}

watching = false;

function onError(err) {
  notify({
    title: 'Task failed',
    message: 'See the terminal for details.',
  });
  beeper();
  console.log(`
**************************************************
    ${err.filename} - ${err.line}:${err.col}.
    ------------------------------
    ${err.name}
    ${err.message}
**************************************************
  `);
  if (watching) {
    this.emit('end');
  } else {
    process.exit(1);
  }
}

function clean() {
  return del([
    'assets/css/*',
    'assets/js/*'
  ])
};

// autoprefixer applies vendor prefixes based
// on browsers specified in .browserslistrc
function scssTask() {
  return src([srcPath.scss])
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass().on('error', onError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(distPath.css));
}

// This task combines all files into a single minified file.
// If you have non-global JS files disable the concat() below.
function jsTask() {
  return src([srcPath.js]) // Can exclude files with ![filename]
    .pipe(uglify()).on('error', onError)
    .pipe(concat('scripts.min.js'))
    .pipe(dest(distPath.js)
    );
}

function svgTask() {
  return src([srcPath.svg])
    .pipe(svgSymbols({
      id: 'icon-%f',
      templates: ['default-svg'],
      title: '%f',
      slug: function (name) {
        return name.toLowerCase().trim().replace(/\s/g, '-');
      }
    }))
    .pipe(dest(distPath.svg));
}


// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
  watching = true;
  watch(
    [
      srcPath.scss,
      srcPath.js,
      srcPath.svg
    ],
    series(
      clean,
      parallel(scssTask, jsTask, svgTask)
    )
  );
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// Then runs watch task
exports.default = series(
  parallel(scssTask, jsTask, svgTask),
  watchTask
);

exports.build = parallel(scssTask, jsTask, svgTask);