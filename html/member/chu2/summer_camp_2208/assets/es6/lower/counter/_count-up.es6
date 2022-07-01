export default class CountUp {

    constructor(counter) {

        this.counter = counter;
        this.ua = window.navigator.userAgent;
        this.href = this.counter.$btn.href;

        this.init();

    }

    init() {

        this.addCounter();

 
    }

    addCounter() {
        let addcounter = false;

        if (!addcounter){
            return;
        }

        // カウンターボタン押下時
        this.counter.$btn.addEventListener('click', (e) => this.getCountUp(e));

        addcounter = true;
    }

    getCountUp(e) {

        e.preventDefault();

        const btnCnt = { BtnCntInsert: [{ ThmId: CONFIG.COUNTER.THM_ID, CmtId: this.counter.cmtid, BtnId: CONFIG.COUNTER.BTN_ID }] };

        // オプションを取得後に、カウントアップ
        $.ajax(this.counter.utility.getOption(btnCnt)).done(() => this.setCountUp());

    }

    setCountUp() {
        const count1 = document.querySelector('[data-day="3"]');
        const countbtn = count1.querySelector('.counter__btn a');

        if (this.counter.$btn === countbtn) {
            STORAGE.data.done.day3 = true;
            STORAGE.set();
        }

        // カウンター数を加算後にゼロパディング形式で表示
        this.counter.num += CONFIG.COUNTER.ADDITION;
        this.counter.utility.setDisplay();

        // カウンターボタンを押下済みに設定
        this.counter.$btn.classList.add('-done');
        STORAGE.data.state.done++;
        STORAGE.set();

        // リダイレクト
        const terms = this.ua.indexOf('BenesseBrowser') != -1 && 9 > LOWER.main.$main.dataset.day;
        setTimeout(() => terms ? BenesseBrowserView.transitionHome() : (location.href = this.href), 1000);


        
        

    }

}