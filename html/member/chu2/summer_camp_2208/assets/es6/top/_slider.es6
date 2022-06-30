export default class Slider {

    constructor() {

        this.$slider = document.getElementById('slider');
        this.$dayArray = [...this.$slider.querySelectorAll('.slider__day')];

        this.init();

    }

    init() {

        this.setSlider();

    }

    setSlider() {



        // STORAGE.data.settingDate.forEach((date,i) => {
        //     const $time = this.$dayArray[i].querySelector('time');
        //     const currentDate = date.split('/');
        //       $time.innerHTML = `<em>${currentDate[1]}</em>月<em>${currentDate[2]}</em>日（あ）`;



        // });


        // this.$dayArray.forEach(($day, i) => {
        //     const $time = $day.querySelector('time');
        //     const currentDate = STORAGE.data.settingDate[i].split('/');
        //     console.log(currentDate)
            //  $time.innerHTML = `<em>${currentDate[1]}</em>月<em>${currentDate[2]}</em>日（あ）`;
        // });



    }

}