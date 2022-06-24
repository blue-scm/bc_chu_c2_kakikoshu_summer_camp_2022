import gulp from 'gulp';
import plumber from 'gulp-plumber'
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import CONFIG from '../../config';

//configにconcatjsの配列があったらconcatする
gulp.task('concat', ()=> {
    if (!CONFIG.OPTION.concatjs){
    return
    }
gulp.src(files)
    .pipe(plumber())
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(CONFIG.PATH.js));
});

gulp.task('uglify', ()=> {
    gulp.src(CONFIG.PATH.js + "main.js")
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(CONFIG.PATH.js));
});