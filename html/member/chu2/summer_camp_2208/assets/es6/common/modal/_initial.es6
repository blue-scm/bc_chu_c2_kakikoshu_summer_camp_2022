export default class Initial {

    constructor() {

        this.$initial = document.getElementById('initial');
        this.$inner = this.$initial.querySelector('.m-initial__inner');
        this.$close = this.$initial.querySelector('.m-initial__close');

        this.init();

    }

    init() {

        this.setFirstVisit();

    }

    setFirstVisit() {

        if (STORAGE.data.settingDate.length) return;

        this.$initial.classList.add('-active');
        this.$close.style.display = 'none';

    }

    setScene(scene) {

        this.$initial.dataset.scene = scene;
        this.$close.style.display = 'block';

        // 初回以外は横スライドのアニメーションを無効
        STORAGE.data.settingDate.length && (this.$inner.style.transition = 'none');

        if (scene != 'schedule') return;

        // 初回以外でスケジュールを開いた場合、登録したスケジュールを表示
        UT.once(this.$initial, 'transitionend', () => {

            const dateArray = STORAGE.data.state.calendar == 'recommend' ? CONFIG.RECOMMEND_DATE[STORAGE.data.state.month] : STORAGE.data.settingDate;
            MODAL.schedule.setDay(dateArray, STORAGE.data.state.calendar);

            if (STORAGE.data.state.calendar == 'setting') {
                MODAL.schedule.currentDay = 10;
                MODAL.schedule.setBtn();
            }

        });

    }

}