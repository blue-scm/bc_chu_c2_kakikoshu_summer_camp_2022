import gulp from 'gulp';
import CONFIG from './config';
import requireDir from 'require-dir';

requireDir('./tasks', {recurse: true});

//コンパイルが必要なもののwatch
gulp.task('compileWatch', ()=> {

    //combオプションがあればリアルタイムCOMBコンパイル
    if (CONFIG.OPTION.csscomb) {
        gulp.watch(CONFIG.PATH.scss + '**/*.scss', ['csscomb']);
        gulp.watch(CONFIG.PATH.tmp_scss + '**/*.scss', ['moveCombedCss']);
        gulp.watch(CONFIG.PATH.tmp_scss + '**/*.scss', ['compileSCSS']);
    } else {
        gulp.watch(CONFIG.PATH.scss + '**/*.scss', ['compileSCSS_NOCOMB']);
    }



//webpackオプションがあればコンパイル
if (CONFIG.OPTION.webpack) {
    gulp.watch([CONFIG.PATH.es6 + '**/*.es6'], ['webpack']);
}
});


gulp.task('default', [
    'compileWatch',
    'browserSync'
]);