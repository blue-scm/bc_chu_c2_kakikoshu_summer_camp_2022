export default class CountUp {

    constructor(counter) {

        this.counter = counter;
        this.$btn = this.counter.$counter.querySelector('.counter__btn a');
        this.ua = window.navigator.userAgent;
        this.href = this.$btn.href;

        this.init();

    }

    init() {

        this.addCounter();

    }

    addCounter() {

        // カウンターボタン押下時
        this.$btn.addEventListener('click', e => this.getCountUp(e));

    }

    getCountUp(e) {

        e.preventDefault();

        const btnCnt = { BtnCntInsert: [{ ThmId: CONFIG.COUNTER.THM_ID, CmtId: this.counter.cmtid, BtnId: CONFIG.COUNTER.BTN_ID }] };

        // オプションを取得後に、カウントアップ
        $.ajax(this.counter.utility.getOption(btnCnt)).done(() => this.setCountUp());

    }

    setCountUp() {

        // カウンター数を加算後にゼロパディング形式で表示
        this.counter.num += CONFIG.COUNTER.ADDITION;
        this.counter.utility.setDisplay();

        // リダイレクト
        const terms = this.ua.indexOf('BenesseBrowser') != -1 && 9 > LOWER.main.$main.dataset.day;
        setTimeout(() => terms ? BenesseBrowserView.transitionHome() : (location.href = this.href), 1000);

    }

}