export default class State {

    constructor() {

        // 今日の日時
        this.today = new Date();

        // カウンターのURL
        this.counterUrl = CONFIG.COUNTER.URL;

        CONFIG.USE_PARAM && this.init();

    }

    init() {

        this.obj = {};

        // パラメータを取得
        this.getParam();

        // 今日の日付を変更
        this.changeToday();

        // カウンターをテストモードに変更
        this.changeTest();

    }

    getParam() {

        const param = location.search.substring(1).split('&');

        // 取得したパラメータをオブジェクトに格納
        for (const i in param) {
            const key = param[i].split('=');
            this.obj[key[0]] = key[1];
        }

    }

    changeToday() {

        if (!this.obj.date) return;

        let dateTime = this.obj.date;
        dateTime += this.obj.time ? ` ${this.obj.time}` : ``;
        this.today = new Date(dateTime);

    }

    changeTest() {

        if (!this.obj.test) return;

        this.counterUrl = CONFIG.COUNTER.TEST;

    }

}