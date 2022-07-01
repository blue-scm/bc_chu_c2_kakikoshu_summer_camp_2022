export default class Header {

    constructor() {

        this.init();

    }

    init() {

        this.setDate();

    }

    setDate() {

        const $header = document.getElementById('header'),
            $dateArray = [...$header.querySelectorAll('.header__date strong')],
            day = LOWER.main.$main.dataset.day - 1,
            currentDate = STORAGE.data.settingDate[day].split('/');

        // 「〇月〇日はこれをやろう！」の日付を設定
        $dateArray.forEach(($date, i) => {
            $date.dataset.txt = currentDate[i + 1];
            $date.textContent = currentDate[i + 1];
        });

    }

}