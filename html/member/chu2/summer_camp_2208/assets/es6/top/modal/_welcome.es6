export default class Welcome {

    constructor() {

        this.$welcome = document.getElementById('welcome');

        this.init();

    }

    init() {

        this.setFirstVisit();
        this.addTransitionend();

    }

    setFirstVisit() {

        if (STORAGE.data.state.welcome) return;

        this.$welcome.classList.add('-active');

    }

    addTransitionend() {

        this.$welcome.addEventListener('transitionend', e => {

            if (e.target.className != 'm-welcome') return;

            const recommendDate = CONFIG.RECOMMEND_DATE[STORAGE.data.state.month];
            TOP.modal.schedule.setDay(recommendDate, 'recommend');

        });

    }

}