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

        window.addEventListener('load', () => this.$main.classList.add('-show_screen'));

    }

    addTransitionend() {

        this.$main.addEventListener('transitionend', e => {
            e.target.localName == 'h1' && this.$main.classList.add('-show_confetti');
        });

    }
}