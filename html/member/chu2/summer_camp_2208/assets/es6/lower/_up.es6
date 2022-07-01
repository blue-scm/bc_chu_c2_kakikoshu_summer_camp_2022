export default class Up {

    constructor() {

        this.init();

    }

    init() {

        this.addAnswer();

    }

    addAnswer() {

        const $up = document.getElementById('up');
        if ($up != null) {
            const $answer = $up.querySelector('.up__answer');

            //「答え合わせ！」ボタン押下時
            $answer.addEventListener('click', () => $up.classList.toggle('-answer'));
        }

    }

}