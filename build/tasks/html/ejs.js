import CONFIG from "../../config.js";

import { src, dest } from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import ejs from "gulp-ejs";
import fs from "fs";
import rename from "gulp-rename";

export function compileEjs(cb) {
    const json = JSON.parse(fs.readFileSync(CONFIG.PATH.ejs_json));
    src(CONFIG.PATH.ejs + "**/!(_)*.ejs")
        .pipe(
            plumber({
                errorHandler: notify.onError("Error: <%= error.message %>"),
            })
        )
        .pipe(ejs(json))
        .pipe(rename({ extname: ".html" }))
        .pipe(dest(CONFIG.PATH.root));

    cb();
}
