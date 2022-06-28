export default class Timer {

    constructor() {

        this.init();

    }

    init() {

        // タイマーの設定
        this.setTimer();

    }

    setTimer() {

        const $timerArray = [...document.querySelectorAll('.js-timer')];

        $timerArray.forEach($timer => {
            let start = $timer.dataset.start,
                end = $timer.dataset.end;
            start = start ? new Date(start) : STATE.today;
            end = end ? new Date(end) : null;

            // 今日の日時が開始前／終了後の場合は、要素を削除
            if (start > STATE.today || STATE.today >= end && end) {
                $timer.parentNode.removeChild($timer);
            }

        });

    }

}