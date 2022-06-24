// config
var PROJECT_ROOT = '../html/chu5/summer_camp/';

//event LP
//var PROJECT_ROOT = '../html/event/preview/';

var BUILD = './';
var device = '';

var CONFIG = {
    PATH: {
        root: PROJECT_ROOT,
        scss: PROJECT_ROOT + device + '/assets/scss/',
        css: PROJECT_ROOT + device + '/assets/css/',
        js: PROJECT_ROOT + device + '/assets/js/',
        es6: PROJECT_ROOT + device + '/assets/es6/',
    },
    OPTION: {
        proxy: "localhost:8099",
        csscomb: false,
        webpack: true,
        autoprefixer: {
            "browsers": ["last 2 versions", "ie >= 9", "Android >= 4", "ios_saf >= 8"]
        },
    }
};

module.exports = CONFIG;
