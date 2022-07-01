export default class Shuryosho {
    constructor() {
        this.setEvent();
    }

    setEvent() {
        const open = document.querySelector(".shuryosho__open");
        const close = document.querySelector(".shuryosho__close");
        const modal = document.querySelector(".shuryosho");

        open.addEventListener("click", () => {
            modal.classList.add("-active");
        });

        close.addEventListener("click", () => {
            modal.classList.remove("-active");
        });
    }
}
