export default class Up {

    constructor() {

        this.init();

    }

    init() {

        this.addAnswer();

    }

    addAnswer() {

        const $up = document.getElementById('up'),
            $answer = $up.querySelector('.up__answer');

        $answer.addEventListener('click', () => $up.classList.toggle('-answer'));

    }

}