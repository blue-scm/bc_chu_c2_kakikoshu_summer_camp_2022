/* import Minben from "./_minben.es6"; */

export default class Slider {
    constructor() {
        this.$slider = document.getElementById("slider");
        this.$inner = this.$slider.querySelector(".slider__inner");
        this.$dayArray = [...this.$slider.querySelectorAll(".slider__day")];
        this.$prev = this.$slider.querySelector(".slider__arrow.-prev");
        this.$next = this.$slider.querySelector(".slider__arrow.-next");
        this.dayOfWeekArray = ["日", "月", "火", "水", "木", "金", "土"];
        this.done = STORAGE.data.state.done;
        this.position = 0; // タッチスタートの位置
        this.direction = ""; // スライドする方向
        this.outerWidth = this.$slider.clientWidth; // スライダーのアウター幅
        this.innerWidth = this.$inner.clientWidth; // スライダーのインナー幅
        this.totalRange = this.outerWidth - this.innerWidth; // スライド総範囲
        this.slideNum = 4; // スライド回数
        this.slideRange = this.totalRange / this.slideNum; // スライド範囲
        this.currentAvatar = 0; // アバターの現在位置
        this.currentSlider = 0; // スライダーの現在位置
        this.threshold = 5; // スライドするためのスワイプ範囲（スライド範囲 / threshold）

        /* this.minben = new Minben(); //みんべんクライアント */

        this.init();
    }

    init() {
        this.setDay();
        this.setSlider();
    }

    setDay() {
        let nowDay = 0;

        if (!STORAGE.data.settingDate.length) return;

        // スライダーに設定した日付・状態を反映
        this.$dayArray.forEach(($day, i) => {
            const $time = $day.querySelector("time"),
                settingDate = STORAGE.data.settingDate[i],
                dateArray = settingDate.split("/"),
                date = new Date(settingDate),
                dayOfWeek = date.getDay();

            // 設定した日付
            $time.innerHTML = `<em>${dateArray[1]}</em>月<em>${dateArray[2]}</em>日（${this.dayOfWeekArray[dayOfWeek]}）`;

            // 公開
            STATE.today >= date && $day.classList.add("-active");

            //今何日目か
            STATE.today >= date && nowDay++;

            // 取り組み済み
            /* STORAGE.data.state.done > i && $day.classList.add("-done"); */
            if (STORAGE.data.state.day1 === true) {
                var elems = document.querySelector('[data-day="1"]');

                elems.classList.add('-done');
            }
            if (STORAGE.data.state.day2 === true) {
                var elems = document.querySelector('[data-day="2"]');

                elems.classList.add('-done');
            }
            if (STORAGE.data.state.day3 === true) {
                var elems = document.querySelector('[data-day="3"]');

                elems.classList.add('-done');
            }
            if (STORAGE.data.state.day4 === true) {
                var elems = document.querySelector('[data-day="4"]');

                elems.classList.add('-done');
            }
            if (STORAGE.data.state.day5 === true) {
                var elems = document.querySelector('[data-day="5"]');

                elems.classList.add('-done');
            }
            if (STORAGE.data.state.day6 === true) {
                var elems = document.querySelector('[data-day="6"]');

                elems.classList.add('-done');
            }
            if (STORAGE.data.state.day7 === true) {
                var elems = document.querySelector('[data-day="7"]');

                elems.classList.add('-done');
            }
            if (STORAGE.data.state.day8 === true) {
                var elems = document.querySelector('[data-day="8"]');

                elems.classList.add('-done');
            }
            if (STORAGE.data.state.day9 === true) {
                var elems = document.querySelector('[data-day="9"]');

                elems.classList.add('-done');
            }
            if (STORAGE.data.state.day10 === true) {
                var elems = document.querySelector('[data-day="10"]');

                elems.classList.add('-done');
            }
        });

        //みんべん送信処理
        let stateIndex = nowDay === 0 ? 0 : nowDay - 1;
        if (STORAGE.data.state.done === 10) {
            stateIndex = 10; //ALL DONE時は11番目の画像にする
        }

        /* this.minben.send(stateIndex); */

        //のぶさんボタン有効化
        if (STORAGE.data.state.done === 10) {
            document.querySelector(".slider__complete").classList.add("-active");
        }
    }

    setSlider() {
        // アバターの現在位置の取得
        const index = STORAGE.data.state.done - 1 < 0 ? 0 : STORAGE.data.state.done - 1;

        if (this.$dayArray[index].classList.contains("-active")) {
            this.currentAvatar = index;
        } else {
            this.currentAvatar = STORAGE.data.state.done;
        }

        // スワイプ開始時
        this.$inner.addEventListener("touchstart", (e) => {
            this.position = this.getPosition(e);
            this.direction = "";
        });

        // スワイプ時
        this.$inner.addEventListener("touchmove", (e) => {
            let swipeRange = this.getPosition(e) - this.position, // スワイプ範囲
                currentRange = this.slideRange * this.currentSlider + swipeRange; // 現在位置のスワイプ範囲

            if (0 > currentRange && this.totalRange < currentRange) {
                // 現在位置のスワイプ範囲を反映
                this.$inner.style.transform = `translateX('${currentRange}'px)`;
                this.$inner.style.transition = "none";

                // スライドする方向を設定
                if (Math.abs(this.slideRange / this.threshold) < swipeRange) {
                    this.direction = "right";
                } else if (this.slideRange / this.threshold > swipeRange) {
                    this.direction = "left";
                }
            }
        });

        // スワイプ終了時
        this.$inner.addEventListener("touchend", () => {
            if (this.direction == "right") {
                this.currentSlider--;
            } else if (this.direction == "left") {
                this.currentSlider++;
            }
            this.sliding();
        });

        // 前へボタン押下時
        this.$prev.addEventListener("click", () => {
            this.currentSlider--;
            this.sliding();
        });

        // 次へボタン押下時
        this.$next.addEventListener("click", () => {
            this.currentSlider++;
            this.sliding();
        });
    }

    // 初回動作
    initialSliding(duration, delay) {
        // スライダーの現在位置の初期設定
        if (5 < this.currentAvatar) {
            this.currentSlider = 3;
        } else if (3 < this.currentAvatar) {
            this.currentSlider = 2;
        } else if (1 < this.currentAvatar) {
            this.currentSlider = 1;
        }

        this.sliding(duration, delay);
    }

    // スライド動作
    sliding(duration = 500, delay = 0) {
        // スライドアニメーション
        this.$inner.style.transform = `translateX(${this.slideRange * this.currentSlider}px)`;
        this.$inner.style.transition = `transform ${duration / 1000}s ${delay / 1000}s`;

        // 前・次へボタンの表示・非表示
        this.$prev.classList.add("-active");
        this.$next.classList.add("-active");
        1 > this.currentSlider && this.$prev.classList.remove("-active");
        this.slideNum - 1 < this.currentSlider && this.$next.classList.remove("-active");
    }

    // X座標取得
    getPosition(e) {
        return e.originalEvent.touches[0].clientX;
    }
}
