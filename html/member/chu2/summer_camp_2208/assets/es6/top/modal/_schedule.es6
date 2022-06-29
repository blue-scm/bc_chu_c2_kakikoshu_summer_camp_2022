export default class Schedule {

    constructor() {

        this.$schedule = document.getElementById('schedule');
        this.$calendar = this.$schedule.querySelector('.schedule__calendar');
        this.$recommend = this.$calendar.querySelector('.schedule__cont .-recommend');
        this.$recommendDate = [...this.$recommend.querySelectorAll('[data-date]')];
        this.$recommendDecision = this.$recommend.querySelector('.schedule__btn .-decision');
        this.$setting = this.$calendar.querySelector('.schedule__cont .-setting');
        this.$settingDate = [...this.$setting.querySelectorAll('[data-date]')];
        this.$settingBack = this.$setting.querySelector('.schedule__btn .-back');
        this.$settingDecision = this.$setting.querySelector('.schedule__btn .-decision');
        this.currentDay = 0;

        this.init();

    }

    init() {

        this.addTab();
        this.addToggle();
        this.addSetting();
        this.addBtn();

    }

    addTab() {

        const $tabArray = [...this.$calendar.querySelectorAll('.schedule__tab button')];

        $tabArray.forEach(($tab, i) => {
            $tab.addEventListener('click', () => this.$calendar.dataset.tab = i);
        });

    }

    addToggle() {

        const $toggle = this.$recommend.querySelector('.schedule__toggle');

        $toggle.addEventListener('click', () => {
            STORAGE.data.state.month = STORAGE.data.state.month == 'july' ? 'august' : 'july';
            const recommendDate = CONFIG.RECOMMEND_DATE[STORAGE.data.state.month];
            this.$recommend.dataset.month = STORAGE.data.state.month;
            this.$recommendDate.forEach($date => $date.dataset.day = '');
            UT.once(this.$recommend, 'transitionend', () => this.setDay(recommendDate, 'recommend'));
        });

    }

    setDay(dateArray, calendar) {

        const $sec = this.$calendar.querySelector(`.schedule__cont .-${calendar}`);

        // スケジュールに日付を一括設定
        dateArray.forEach((date, i) => {
            const $date = $sec.querySelector(`[data-date='${date}']`);
            $date.dataset.day = i + 1;
        });

    }

    addSetting() {

        this.$settingDate.forEach(($date, i) => {
            $date.addEventListener('click', e => this.setSetting(e, i));
        });

    }

    setSetting(e, i) {

        if (this.currentDay == 10) return;

        // マイスケジュールに日付を設定
        this.currentDay++;
        e.currentTarget.dataset.day = this.currentDay;

        // 設定した日付まで吹き出し削除・押下無効
        const $disableDate = this.$settingDate.slice(0, i + 1);
        $disableDate.forEach($date => {
            const $speech = $date.querySelector('span');
            $date.style.pointerEvents = 'none';
            $speech && $date.removeChild($speech);
        });

        this.setSpeech(e.currentTarget);
        this.setBtn();

    }

    setSpeech($target) {

        if (this.currentDay == 0) return;

        const $speech = document.createElement('span');
        $speech.innerHTML = this.currentDay == 10 ? '決定ボタン<br>を押そう!' : `${this.currentDay + 1}日目を<br>設定しよう!`;

        // 日付の上に吹き出しを表示
        $target.appendChild($speech);

    }

    setBtn() {

        // 「前日の選択に戻る」「決定！」ボタンの表示／非表示
        this.currentDay > 0 ? this.$settingBack.classList.add('-active') : this.$settingBack.classList.remove('-active');
        this.currentDay == 10 ? this.$settingDecision.classList.add('-active') : this.$settingDecision.classList.remove('-active');

    }

    addBtn() {

        this.$recommendDecision.addEventListener('click', () => {
            this.nextScene(CONFIG.RECOMMEND_DATE[STORAGE.data.state.month], 'recommend');
        });

        this.$settingBack.addEventListener('click', () => {

            // 現在の日付・吹き出し削除
            const $currentDay = this.$setting.querySelector(`[data-day='${this.currentDay}']`),
                $currentSpeech = $currentDay.querySelector('span');
            this.currentDay--;
            $currentDay.dataset.day = '';
            $currentSpeech && $currentDay.removeChild($currentSpeech);

            // 前に設定した日付から押下有効
            const $beforeDay = this.$setting.querySelector(`[data-day='${this.currentDay}']`),
                $disableDate = this.$settingDate.slice(UT.index($beforeDay) + 1, this.$settingDate.lengh);
            $disableDate.forEach($date => $date.style.pointerEvents = '');

            this.setSpeech($beforeDay);
            this.setBtn();

        });

        this.$settingDecision.addEventListener('click', () => {
            const $currentDay = [...this.$setting.querySelectorAll('[data-date]:not([data-day=""])')],
                settingDate = [];
            $currentDay.forEach($day => settingDate.push($day.dataset.date));
            this.nextScene(settingDate, 'setting');
        });

    }

    nextScene(settingDate, calendar) {

        STORAGE.data.state.calendar ? TOP.modal.setClose(TOP.modal.initial.$initial) : TOP.modal.initial.setScene('howto');

        STORAGE.data.settingDate = settingDate;
        STORAGE.data.state.calendar = calendar;
        STORAGE.set();

    }

}