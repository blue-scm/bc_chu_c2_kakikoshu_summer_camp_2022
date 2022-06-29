export default class Main {

    constructor() {

        this.$main = document.getElementById('main');

        this.init();

    }

    init() {

        this.addLoad();
        this.addTransitionend();

    }

    addLoad() {

        window.addEventListener('load', () => this.$main.classList.add('-show'));

    }

    addTransitionend() {

        this.$main.addEventListener('transitionend', e => {

            if (!e.target.classList.contains('-show')) return;

            if (STORAGE.data.state.welcome && !STORAGE.data.state.calendar || STORAGE.data.state.calendar == 'setting') {
                const recommendDate = CONFIG.RECOMMEND_DATE[STORAGE.data.state.month];
                TOP.modal.schedule.setDay(recommendDate, 'recommend');
            }

            STORAGE.data.state.calendar == 'setting' && (TOP.modal.schedule.$calendar.dataset.tab = 1);

        });

    }

}