import Welcome from './modal/_welcome';
import Initial from './modal/_initial';
import Schedule from './modal/_schedule';
import Guide from './modal/_guide';

export default class Modal {

    constructor() {

        if (window.TOP) {
            this.welcome = new Welcome();
            this.initial = new Initial();
            this.schedule = new Schedule();
            this.guide = new Guide();
        }

        this.init();

    }

    init() {

        this.addModal();

    }

    addModal() {

        const $openArray = [...document.querySelectorAll('.js-modal__open')],
            $closeArray = [...document.querySelectorAll('.js-modal__close')];

        $openArray.forEach($open => {
            $open.addEventListener('click', e => this.setOpen(e));
        });

        $closeArray.forEach($close => {
            $close.addEventListener('click', e => this.setClose(e));
        });

    }

    setOpen(e) {

        const id = e.currentTarget.dataset.id,
            scene = e.currentTarget.dataset.scene,
            $target = document.getElementById(id);

        e.preventDefault();
        $target.classList.add('-active');

        scene && this.initial.setScene(scene);

    }

    setClose(e) {

        const $target = e.currentTarget.closest('.-active');

        e.preventDefault();
        $target.classList.remove('-active');

        if ($target.id == 'welcome') {
            STORAGE.data.state.welcome = true;
            STORAGE.set();
        } else if ($target.id == 'guide') {
            STORAGE.data.state.guideTap = true;
            STORAGE.set();
        }

    }

}