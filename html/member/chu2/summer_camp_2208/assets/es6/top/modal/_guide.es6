export default class Guide {

    constructor() {

        this.init();

    }

    init() {

        this.setFirstVisit();

    }

    setFirstVisit() {

        if (STORAGE.data.state.guideTap) return;

        const $guide = document.getElementById('guide');
        $guide.classList.add('-active');

    }

}