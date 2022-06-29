import Welcome from './_welcome';
import Initial from './_initial';
import Schedule from './_schedule';

export default class Modal {

    constructor() {

        this.welcome = new Welcome();
        this.initial = new Initial();
        this.schedule = new Schedule();

        this.init();

    }

    init() {

        this.addModal();

    }

    addModal() {

        const $openArray = [...document.querySelectorAll('.js-modal__open')],
            $closeArray = [...document.querySelectorAll('.js-modal__close')];

        $openArray.forEach($open => $open.addEventListener('click', e => this.setOpen(e)));
        $closeArray.forEach($close => $close.addEventListener('click', e => this.setClose(e)));

    }

    setOpen(e) {

        const id = e.currentTarget.dataset.id,
            $target = document.getElementById(id);

        $target.classList.add('-active');

    }

    setClose(e) {

        const $target = e.currentTarget.closest('.-active');

        $target.classList.remove('-active');

        if ($target.id == 'welcome') {
            STORAGE.data.state.welcome = true;
            STORAGE.set();
        }

    }

}