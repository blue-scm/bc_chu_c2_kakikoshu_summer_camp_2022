export default class Top {
    constructor() {
        this.$contentInner = $('.l-content__inner');
        this.init();
    }

    init() {

        // トップページのみ
        if (this.$contentInner.hasClass('top')) {

            // ローカルストレージ取得
            this.data = JSON.parse(localStorage.getItem('chu5_summer_camp'));

            this.slider(); // スライダー
            this.footer(); // フッター
        }
    }

    slider() {
        const that = this,
            $window = $(window),
            $slider = $('#js-slider'),
            $sliderInner = $slider.find('.top__slider__inner'),
            $sliderBtn = $sliderInner.find('.top__slider__btn'),
            $sliderPrev = $slider.find('.-prev'),
            $sliderNext = $slider.find('.-next'),
            $calendarDecision = $('#js-calendar').find('.calendar__decision');

        let position = 0, // タッチスタートの位置
            direction = '', // スライドする方向
            outerWidth = $slider.width(), // スライダーのアウター幅
            innerWidth = $sliderInner.width(), // スライダーのインナー幅
            totalRange = outerWidth - innerWidth, // スライド総範囲
            slideNum = 3, // スライド回数
            slideRange = totalRange / slideNum, // スライド範囲
            currentAvatar = 0, // アバターの現在位置
            currentSlider = 0, // スライダーの現在位置
            threshold = 5; // スライドするためのスワイプ範囲（スライド範囲 / threshold）

        // アバターの現在位置の取得
        if (!$sliderBtn.eq(that.data.state.already).hasClass('-active')) {
            currentAvatar = that.data.state.already - 1;
        } else {
            currentAvatar = that.data.state.already;
        }

        // ページ読込時
        $window.on('load', function () {
            initialSliding(1500, 500);
        });

        // カレンダーの決定ボタン押下時
        $calendarDecision.on('click', function () {
            initialSliding(1500, 500);
        });

        // スワイプ開始時
        $sliderInner.on('touchstart', function (e) {
            position = getPosition(e);
            direction = '';
        });

        // スワイプ時
        $sliderInner.on('touchmove', function (e) {

            let swipeRange = getPosition(e) - position, // スワイプ範囲
                currentRange = slideRange * currentSlider + swipeRange; // 現在位置のスワイプ範囲

            if (0 > currentRange && totalRange < currentRange) {

                // 現在位置のスワイプ範囲を反映
                $sliderInner.css({
                    transform: 'translateX(' + currentRange + 'px)',
                    transition: 'none'
                });

                // スライドする方向を設定
                if (Math.abs(slideRange / threshold) < swipeRange) {
                    direction = 'right';
                } else if (slideRange / threshold > swipeRange) {
                    direction = 'left';
                }
            }
        });

        // スワイプ終了時
        $sliderInner.on('touchend', function () {
            if (direction == 'right') {
                currentSlider--;
            } else if (direction == 'left') {
                currentSlider++;
            }
            sliding();
        });

        // 前へボタン押下時
        $sliderPrev.on('click', function () {
            currentSlider--;
            sliding();
        });

        // 次へボタン押下時
        $sliderNext.on('click', function () {
            currentSlider++;
            sliding();
        });

        // 初回動作
        function initialSliding(duration, delay) {

            // スライダーの現在位置の初期設定
            if (5 < currentAvatar) {
                currentSlider = 3;
            } else if (3 < currentAvatar) {
                currentSlider = 2;
            } else if (1 < currentAvatar) {
                currentSlider = 1;
            }

            sliding(duration, delay);
        }

        // スライド動作
        function sliding(duration = 500, delay = 0) {

            // スライドアニメーション
            $sliderInner.css({
                transform: 'translateX(' + slideRange * currentSlider + 'px)',
                transition: 'transform ' + duration / 1000 + 's ' + delay / 1000 + 's'
            });

            // 前・次へボタンの表示・非表示
            $sliderPrev.add($sliderNext).addClass('-active');
            if (1 > currentSlider) {
                $sliderPrev.removeClass('-active');
            }
            if (slideNum - 1 < currentSlider) {
                $sliderNext.removeClass('-active');
            }
        }

        // X座標取得
        function getPosition(e) {
            return e.originalEvent.touches[0].clientX;
        }
    }

    footer() {
        const that = this,
            $footer = $('#js-footer'),
            $footerSubmission = $footer.find('.-submission dd'),
            $footerCorrect = $footer.find('.-correct dd');

        let param = $footerSubmission.attr('data-target'), // カウント対象取得
            memberID = BAEC.ApiClient.getMemberIDFromCookie(); // 会員番号

        // カウント表示
        $.post('https://blog.benesse.ne.jp/chu5/hanabi2019/counter/get.php', {
            path: 'db/counter.db',
            name: param
        }, function (data) {
            var data = JSON.parse(data),
                countNum = '';

            // データがない場合は初期化
            if (data == '') {
                data[param] = 0;
            }

            // カウント要素作成
            ('000000' + data[param]).slice(-6).split('').forEach(function (num) {
                countNum += '<span>' + num + '</span>';
            });
            $footerSubmission.html(countNum);
        });

        // API呼び出し
        BAEC.ApiClient.getMemberInfo({
            complete: function (response) {
                if (response.error) {
                    console.log('会員情報の取得に失敗しました。');
                    console.log(response.error);
                    return;
                }

                // コールバック
                let baec = new BAEC.ApiClient();
                baec.addRequest('learningHistory.achievementTable3.get', {
                    memberID: memberID,
                    line: response.data['line'],
                    schoolYearCode: response.data['gakunen'],
                    yearMonthNo: '201908'
                });
                baec.callApi(
                    function (data, dataType) {
                        let dataNum = data.result.AchievementTableThirdInformation['perfectAnswerLessonTotalNumber'], // 100%正答数
                            countNum = '';

                        // カウント要素作成
                        ('00' + dataNum).slice(-2).split('').forEach(function (num) {
                            countNum += '<span>' + num + '</span>';
                        });
                        $footerCorrect.html(countNum);
                    },
                    function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                    }
                );
            }
        });
    }
}
