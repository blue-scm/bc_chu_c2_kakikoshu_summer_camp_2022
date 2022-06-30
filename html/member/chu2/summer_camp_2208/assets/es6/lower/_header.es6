export default class Header {

    constructor() {

        this.init();

    }

    init() {

        this.addLoad();

    }

    addLoad() {

        const $header = document.getElementById('header'),
            $dateArray = [...$header.querySelectorAll('.header__date strong')],
            day = LOWER.main.$main.dataset.day - 1,
            currentDate = STORAGE.data.settingDate[day].split('/');

        $dateArray.forEach(($date, i) => {
            $date.dataset.txt = currentDate[i + 1];
            $date.textContent = currentDate[i + 1];
        });

    }

}