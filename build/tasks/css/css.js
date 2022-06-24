import gulp from 'gulp';
import sass from 'gulp-sass';
import pleeease from 'gulp-pleeease';
import sassGlob from 'gulp-sass-glob';
import plumber from 'gulp-plumber';
import csscomb from 'gulp-csscomb';
import changedInPlace from 'gulp-changed-in-place';
import CONFIG from '../../config';

//編集中のSCSSを監視して、CSSCOMBする

gulp.task('csscomb', ()=>{
    return gulp.src(CONFIG.PATH.scss + '**/*.scss')
        .pipe(plumber())
        .pipe(csscomb())
        .pipe(changedInPlace({firstPass: true}))
        .pipe(gulp.dest(CONFIG.PATH.tmp_scss));
});

gulp.task('moveCombedCss', function() {
    return gulp.src(CONFIG.PATH.tmp_scss + '**/*.scss')
        .pipe(changedInPlace({firstPass: true}))
        .pipe(gulp.dest(CONFIG.PATH.scss));
});


gulp.task('compileSCSS', ()=>{
    return gulp.src(CONFIG.PATH.tmp_scss + '**/*.scss')
        .pipe(plumber())
        .pipe(sassGlob())
        .pipe(sass({outputStyle : 'expanded'}))
        .pipe(pleeease({
            minifier:false,
            autoprefixer:CONFIG.OPTION.autoprefixer
        }))
        .pipe(gulp.dest(CONFIG.PATH.css));
});

gulp.task('compileSCSS_NOCOMB', ()=>{
    return gulp.src(CONFIG.PATH.scss + '**/*.scss')
        .pipe(plumber())
        .pipe(sassGlob())
        .pipe(sass({outputStyle : 'expanded'}))
        .pipe(pleeease({
            minifier:false,
            autoprefixer:CONFIG.OPTION.autoprefixer
        }))
        .pipe(gulp.dest(CONFIG.PATH.css));
});