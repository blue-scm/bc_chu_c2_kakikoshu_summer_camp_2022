export default class Main {

    constructor() {

        this.$main = document.getElementById('main');

        this.init();

    }

    init() {

        this.addLoad();

    }

    addLoad() {

        window.addEventListener('load', () => this.$main.classList.add('-show'));

    }

}