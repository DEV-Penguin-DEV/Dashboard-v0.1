import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import del from 'del';
import browser from 'browser-sync';
import terser from 'gulp-terser';

// Styles

export const styles = () => {
  return gulp.src('src/less/style.less', {
      sourcemaps: true
    })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', {
      sourcemaps: '.'
    }))
    .pipe(browser.stream());
}

// copy public folder

const copyPublic = () => {
  return gulp.src('public/*', '!public/img/*.{png,jpg}', '!public/*.html')
    .pipe(gulp.dest('build'));
}

// HTML

const html = () => {
  return gulp.src('public/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'));
}

// Images

const optimizeImages = () => {
  return gulp.src('public/img/**/*.{png,jpg}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

const copyImages = () => {
  return gulp.src('public/img/**/*.{png,jpg}')
    .pipe(gulp.dest('build/img'))
}

// SVG

const svg = () =>
  gulp.src('public/img/**/*.svg')
  .pipe(svgo())
    .pipe(gulp.dest('build/img'));


// Scripts

const scripts = () => {
  return gulp.src('src/js/*.js')
    .pipe(terser())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

// Clean

const clean = () => {
  return del('build');
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('src/less/**/*.less', gulp.series(styles));
  gulp.watch('src/js/*.js', gulp.series(scripts));
  gulp.watch('public/*.html', gulp.series(html, reload));
}

// Build

export const build = gulp.series(
  clean,
  copyPublic,
  optimizeImages,
  gulp.parallel(
    html,
    scripts,
    styles,
    svg,
  ),
);

// Default

export default gulp.series(
  clean,
  copyPublic,
  copyImages,
  gulp.parallel(
    html,
    scripts,
    styles,
    svg,
  ),
  gulp.series(
    server,
    watcher
  ));
