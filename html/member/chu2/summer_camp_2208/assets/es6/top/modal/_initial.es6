export default class Initial {

    constructor() {

        this.init();

    }

    init() {

        this.setFirstVisit();

    }

    setFirstVisit() {

        if (STORAGE.data.state.calendar) return;

        const $initial = document.getElementById('initial');
        $initial.classList.add('-active');

    }

}