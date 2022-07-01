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

        // ウェルカムモーダルが閲覧済みで、スケジュールが未設定の場合、オススメスケジュールを表示
        UT.once(this.$main, 'transitionend', () => {

            if (STORAGE.data.state.welcome && !STORAGE.data.settingDate.length) {
                MODAL.schedule.setRecommend();
            }

            // スライダーのアニメーション
            TOP.slider.initialSliding(1500);

        });

    }

}