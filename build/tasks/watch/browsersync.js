import gulp from 'gulp';
import browserSync from 'browser-sync'
import CONFIG from '../../config';


gulp.task('browserSync', ()=> {
    
    if(CONFIG.OPTION.proxy){
        browserSync.init({
            proxy: CONFIG.OPTION.proxy
        });
    } else {
        browserSync.init({
            server: {
                baseDir: "../html"
            }
        });
    }

    // srcフォルダ以下のファイルを監視
    gulp.watch([CONFIG.PATH.root + '/**'], function () {
        browserSync.reload();
    });

});
