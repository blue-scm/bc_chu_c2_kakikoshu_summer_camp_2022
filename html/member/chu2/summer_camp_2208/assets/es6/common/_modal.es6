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
            $open.addEventListener('click', () => this.setOpen($open));
        });

        $closeArray.forEach($close => {
            $close.addEventListener('click', () => this.setClose($close));
        });

    }

    setOpen($open) {

        const id = $open.dataset.id,
            scene = $open.dataset.scene,
            $target = document.getElementById(id);

        $target.classList.add('-active');

        scene && this.initial.setScene(scene);

    }

    setClose($close) {

        const $target = $close.closest('.-active');

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