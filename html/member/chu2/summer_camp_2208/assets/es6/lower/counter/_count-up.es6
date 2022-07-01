export default class CountUp {

    constructor(counter) {

        this.counter = counter;
        this.ua = window.navigator.userAgent;
        this.href = this.counter.$btn.href;

        this.init();

    }

    init() {
        this.doneCount();
        this.addCounter();

        
 
    }

    doneCount(){
        const count1 = document.querySelector('[data-day="1"]');
        if (count1) {
            const countbtn1 = count1.querySelector('.counter__btn a');

            countbtn1.addEventListener('click', btnCnt);

            function btnCnt(){
                STORAGE.data.state.day1 = true;
                STORAGE.set();
            }

            
        }
        
        const count2 = document.querySelector('[data-day="2"]');
        if (count2) {
            const countbtn2 = count2.querySelector('.counter__btn a');

            countbtn2.addEventListener('click', btnCnt);

            function btnCnt() {
                STORAGE.data.state.day2 = true;
                STORAGE.set();
            }
        }

        
        const count3 = document.querySelector('[data-day="3"]');
        if (count3) {
            const countbtn3 = count3.querySelector('.counter__btn a');

            countbtn3.addEventListener('click', btnCnt);

            function btnCnt() {
                STORAGE.data.state.day3 = true;
                STORAGE.set();
            }
        }

        
        const count4 = document.querySelector('[data-day="4"]');
        if (count4) {
            const countbtn4 = count4.querySelector('.counter__btn a');

            countbtn4.addEventListener('click', btnCnt);

            function btnCnt() {
                STORAGE.data.state.day4 = true;
                STORAGE.set();
            }
        }

        
        const count5 = document.querySelector('[data-day="5"]');
        if (count5) {
            const countbtn5 = count5.querySelector('.counter__btn a');

            countbtn5.addEventListener('click', btnCnt);

            function btnCnt() {
                STORAGE.data.state.day5 = true;
                STORAGE.set();
            }
        }

        
        const count6 = document.querySelector('[data-day="6"]');
        if (count6) {
            const countbtn6 = count6.querySelector('.counter__btn a');

            countbtn6.addEventListener('click', btnCnt);

            function btnCnt() {
                STORAGE.data.state.day6 = true;
                STORAGE.set();
            }
        }

        
        const count7 = document.querySelector('[data-day="7"]');
        if (count7) {
            const countbtn7 = count7.querySelector('.counter__btn a');

            countbtn7.addEventListener('click', btnCnt);

            function btnCnt() {
                STORAGE.data.state.day7 = true;
                STORAGE.set();
            }
        }

        
        const count8 = document.querySelector('[data-day="8"]');
        if (count8) {
            const countbtn8 = count8.querySelector('.counter__btn a');

            countbtn8.addEventListener('click', btnCnt);

            function btnCnt() {
                STORAGE.data.state.day8 = true;
                STORAGE.set();
            }
        }

        
        const count9 = document.querySelector('[data-day="9"]');
        if (count9) {
            const countbtn9 = count9.querySelector('.counter__btn a');

            countbtn9.addEventListener('click', btnCnt);

            function btnCnt() {
                STORAGE.data.state.day9 = true;
                STORAGE.set();
            }
        }

        
        const count10 = document.querySelector('[data-day="10"]');
        if (count10) {
            const countbtn10 = count10.querySelector('.counter__btn a');
             
            countbtn10.addEventListener('click', btnCnt);

            function btnCnt() {
                STORAGE.data.state.day10 = true;
                STORAGE.set();
            }
        } 
       
    }

    addCounter() {
        let addcounter = false;

        if (!addcounter){
            return;
        }

        // カウンターボタン押下時
        /* this.counter.$btn.addEventListener('click', (e) => this.doneCount(e)); */
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