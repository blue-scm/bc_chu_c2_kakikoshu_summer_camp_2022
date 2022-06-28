export default class Main {

    constructor() {

        this.init();

    }

    init() {

        this.addLoad();

    }

    addLoad() {

        const $main = document.getElementById('main');

        window.addEventListener('load', () => $main.classList.add('-show'));

    }

}