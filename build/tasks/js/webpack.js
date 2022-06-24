import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import webpack from 'webpack-stream';
import CONFIG from '../../config';

gulp.task('webpack', ()=> {
    gulp
    .src(CONFIG.PATH.es6 + '**/*.es6')
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(webpack(require('../../webpack.config.js')))
    .pipe(gulp.dest(CONFIG.PATH.js));
});
