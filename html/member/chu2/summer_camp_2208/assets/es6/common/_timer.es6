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
            start = start ? this.getUpdateTime(start) : STATE.today;
            end = end ? this.getUpdateTime(end) : null;

            // 今日の日時が開始前／終了後の場合は、要素を削除
            if (start > STATE.today || STATE.today >= end && end) {
                $timer.parentNode.removeChild($timer);
            }

        });

    }

    getUpdateTime(date) {

        // タイマーが日付のみ・更新時間が設定済みの場合は、更新時間を追加
        const regex = /^(\d+)\/(\d+)\/(\d+)$/;
        date += date.match(regex) && CONFIG.UPDATE.TIME ? ` ${CONFIG.UPDATE.TIME}` : ``;

        return new Date(date);

    }

}