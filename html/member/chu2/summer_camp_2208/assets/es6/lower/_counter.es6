import Utility from './counter/_utility';
import CountUp from './counter/_count-up';

export default class Counter {

    constructor() {

        this.$counter = document.getElementById('counter');
        this.$display = this.$counter.querySelector('dd');
        this.$btn = this.$counter.querySelector('.counter__btn a');
        this.cmtid = this.$counter.dataset.cmtid;
        this.num = 0;
        this.utility = Utility;
        this.countUp = new CountUp(this);

        this.init();

    }

    init() {

        this.setDone();
        this.getCounter();

    }

    setDone() {

        // カウンターボタンが押下済みの場合は、グレーアウト
        STORAGE.data.state.done >= LOWER.main.$main.dataset.day && this.$btn.classList.add('-done');

    }

    getCounter() {

        const cmt = { CmtSelect: [{ ThmId: CONFIG.COUNTER.THM_ID, DspStrtLoc: 1, DspLin: 9999 }] };

        // オプションを取得後に、カウンターを設定
        $.ajax(this.utility.getOption(cmt)).done(data => this.setCounter(data));

    }

    setCounter(data) {

        console.log(data);

        // 該当の CmtId を持つコメントから増減・カウンター数を取得
        const obj = data.CmtSelect[0].CmtList.find(obj => this.cmtid == obj.CmtId),
            cmt = JSON.parse(obj.Cmt),
            btnCnt = `BtnCnt${CONFIG.COUNTER.BTN_ID}`,
            adjustment = cmt[btnCnt].adjustment;
        this.num = obj[btnCnt];

        // 加算率が設定されている場合は反映
        this.num *= CONFIG.COUNTER.ADDITION ? CONFIG.COUNTER.ADDITION : 1;

        // 増減が設定されている場合は反映
        this.num += adjustment ? adjustment : 0;

        // カウンター数をゼロパディング形式で表示
        this.utility.setDisplay();

    }

}