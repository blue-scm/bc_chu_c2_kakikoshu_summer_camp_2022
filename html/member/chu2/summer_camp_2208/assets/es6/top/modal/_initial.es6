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

        if (STORAGE.data.state.calendar) return;

        this.$initial.classList.add('-active');
        this.$close.style.display = 'none';

    }

    setScene(scene) {

        this.$initial.dataset.scene = scene;
        this.$close.style.display = 'block';

        STORAGE.data.state.calendar && (this.$inner.style.transition = 'none');

        if (scene != 'schedule') return;

        this.$initial.addEventListener('transitionend', e => {
            if (!e.target.classList.contains('-active')) return;

            const dateArray = STORAGE.data.state.calendar == 'recommend' ? CONFIG.RECOMMEND_DATE[STORAGE.data.state.month] : STORAGE.data.settingDate;
            TOP.modal.schedule.setDay(dateArray, STORAGE.data.state.calendar);

            if (STORAGE.data.state.calendar == 'setting') {
                TOP.modal.schedule.currentDay = 10;
                TOP.modal.schedule.setBtn();
            }

        });

    }

}