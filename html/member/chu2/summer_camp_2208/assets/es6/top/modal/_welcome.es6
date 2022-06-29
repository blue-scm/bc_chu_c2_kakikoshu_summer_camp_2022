export default class Welcome {

    constructor() {

        this.init();

    }

    init() {

        this.setFirstVisit();

    }

    setFirstVisit() {

        if (STORAGE.data.state.welcome) return;

        const $welcome = document.getElementById('welcome');
        $welcome.classList.add('-active');

    }

}