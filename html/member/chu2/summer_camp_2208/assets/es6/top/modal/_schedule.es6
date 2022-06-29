export default class Schedule {

    constructor() {

        this.$schedule = document.getElementById('schedule');
        this.$calendar = this.$schedule.querySelector('.schedule__calendar');
        this.$dayArray = [...this.$calendar.querySelectorAll('.-setting [data-day]')];
        this.currentDay = 0;

        this.init();

    }

    init() {

        this.addTab();
        this.addDay();

    }

    addTab() {

        const $tabArray = [...this.$calendar.querySelectorAll('.schedule__tab button')];

        $tabArray.forEach(($tab, i) => {
            $tab.addEventListener('click', () => this.$calendar.dataset.tab = i);
        });

    }

    addDay() {

        this.$dayArray.forEach(($day, i) => {
            $day.addEventListener('click', e => {
                this.currentDay++;
                e.currentTarget.dataset.day = this.currentDay;
                this.setDisable(i);
            });
        });

    }

    setDisable(i) {

        const $DisableArray = this.$dayArray.slice(0, i + 1);

        $DisableArray.forEach($disable => $disable.style.pointerEvents = 'none');

    }

}