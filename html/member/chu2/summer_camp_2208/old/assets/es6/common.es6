export default class Common {
    constructor() {
        this.window = $(window);
        this.$contentInner = $('.l-content__inner');

        // ローカルストレージ取得
        this.data = JSON.parse(localStorage.getItem('chu5_summer_camp'));

        // ローカルストレージ初期設定
        if (!this.data) {
            this.data = {
                recommendDate: ['2019/7/22', '2019/7/23', '2019/7/24', '2019/7/27', '2019/7/29', '2019/7/30', '2019/7/31', '2019/8/3'],
                settingDate: [],
                state: {
                    already: 0
                },
                trump: {
                    date: new Date(),
                    count: 0
                },
                number: {
                    date: new Date(),
                    count: 0
                }
            }
            localStorage.setItem('chu5_summer_camp', JSON.stringify(this.data));
        }

        this.init();
    }

    init() {
        this.loading(); // ローディング
        this.guide(); // ガイド
        this.modal(); // モーダルウィンドウ
        this.calendar(); // カレンダー
        this.nav(); // ナビゲーション
        this.uliza(); // 動画
    }

    loading() {
        const that = this;

        // ページ読込時
        that.window.on('load', function () {
            that.$contentInner.removeClass('-loading');
        });
    }

    guide() {
        const that = this,
            $guideTap = $('#js-guide-tap'),
            $guideTapClose = $guideTap.find('.guide__close'),
            $guideCalendar = $('#js-guide-calendar'),
            $guideCalendarClose = $guideCalendar.find('.guide__close'),
            $guideAnswer = $('#js-guide-answer'),
            $guideAnswerClose = $guideAnswer.find('.guide__close'),
            $guideAnswerOpen = $('#js-answer-open');

        // タップガイドの閉じるボタン押下済みの場合
        if (that.data.state.guideTap == false) {
            $guideTap.remove();
        }

        // タップガイドの閉じるボタン押下時
        $guideTapClose.on('click', function () {
            that.data.state.guideTap = false;
            $guideTap.removeClass('-active');
            localStorage.setItem('chu5_summer_camp', JSON.stringify(that.data));
        });

        // カレンダーガイドの閉じるボタン押下時
        $guideCalendarClose.on('click', function () {
            $guideCalendar.removeClass('-active');
        });

        // 答えの閉じるボタン押下時
        $guideAnswerClose.on('click', function () {
            $guideAnswer.removeClass('-active');
        });

        // 答えの開くボタン押下時
        $guideAnswerOpen.on('click', function () {
            $guideAnswer.addClass('-active');
        });
    }

    modal() {
        const that = this,
            $modal = $('#js-modal'),
            $modalInner = $modal.find('.modal__inner'),
            $modalClose = $modal.find('.modal__close'),
            $modalOpen = $('.js-modal-open'),
            $opening = $('#js-opening'),
            $openingTxt = $opening.find('.opening__txt'),
            $openingRegister = $opening.find('.opening__register'),
            $calendarDecision = $modal.find('.calendar__decision'),
            $sliderBtn = $('#js-slider').find('[class^=top__slider]');

        let outerWidth = -$modal.width(), // モーダルウィンドウのアウター幅
            current = 0; // モーダルウィンドウの現在位置

        // モーダルウィンドウの初期設定
        if (that.data.state.calendar) {
            $modal.removeClass('-active');
            that.window.on('load', function () {
                $sliderBtn.addClass('-display');
            });
        }

        // 閉じるボタン押下時
        $modalClose.on('click', function () {
            $modal.css('transition', 'all 0.5s').removeClass('-active');
            $sliderBtn.addClass('-display');
        });

        // カレンダー設定・オープニングムービーのテキストリンク押下時
        $modalOpen.on('click', function () {
            let $this = $(this);
            current = $this.attr('href').slice(1);
            $modal.css('transition', 'all 0.5s').addClass('-active');
            $openingTxt.add($openingRegister).remove();
            sliding();
        });

        // 日程登録・決定ボタン押下時
        $openingRegister.add($calendarDecision).on('click', function () {
            if (that.data.state.calendar) {
                $modal.css('transition', 'all 0.5s').removeClass('-active');
            } else {
                current++;
                sliding(500);
            }
        });

        // スライド動作
        function sliding(duration = 0) {

            // スライドアニメーション
            $modalInner.css({
                transform: 'translateX(' + outerWidth * current + 'px)',
                transition: 'transform ' + duration / 1000 + 's'
            });

            // 閉じるボタン表示
            if (1 < current || that.data.state.calendar) {
                $modalClose.addClass('-active');
            }
        }
    }

    calendar() {
        const that = this,
            $modalOpen = $('.js-modal-open'),
            $openingRegister = $('#js-opening').find('.opening__register'),
            $calendar = $('#js-calendar'),
            $calendarTab = $calendar.find('.calendar__tab'),
            $calendarCont = $calendar.find('.calendar__cont'),
            $recommendCont = $calendar.find('.calendar__cont.-recommend'),
            $recommendDate = $recommendCont.find('.calendar__date'),
            $recommendDecision = $recommendCont.find('.calendar__decision'),
            $settingCont = $calendar.find('.calendar__cont.-setting'),
            $settingDate = $settingCont.find('.calendar__date'),
            $settingBack = $settingCont.find('.calendar__back'),
            $settingDecision = $settingCont.find('.calendar__decision');

        let currentModal = 0, // モーダルウィンドウの現在位置
            currentTab = 0, // タブの現在位置
            currentDate = 0; // 日付の現在位置

        // マイスケジュールの初期設定
        if (that.data.settingDate) {
            $settingDate.each(function () {
                let $this = $(this);
                if (that.data.settingDate[currentDate] == $this.attr('data-date')) {
                    setDate($this, '-disable');
                }
            });
        }

        // カレンダー設定のテキストリンク押下時
        $modalOpen.on('click', function () {
            let $this = $(this);
            currentModal = $this.attr('href').slice(1);
            if (that.data.state.calendar == 'recommend') {
                currentTab = 0;
            } else if (that.data.state.calendar == 'setting') {
                currentTab = 1;
            }
            switchTab();
            if (1 == currentModal) {
                displayDay($recommendDate.add($settingDate));
            }
        });

        // 日程登録ボタン押下時
        $openingRegister.on('click', function () {
            displayDay($recommendDate);
        });

        // カレンダーのタブ押下時
        $calendarTab.on('click', function () {
            let $this = $(this);
            currentTab = $this.index();
            switchTab();
        });

        // オススメスケジュールの決定ボタン押下時
        $recommendDecision.on('click', function () {
            saveDate('recommend');
        });

        // マイスケジュールの日付押下時
        $settingDate.on('click', function () {
            let $this = $(this);
            $settingCont.removeClass('-duration');
            setDate($this, '-active -disable');
        });

        // マイスケジュールの戻るボタン押下時
        $settingBack.on('click', function () {
            currentDate--;
            $settingCont.removeClass('-duration');
            if (1 > currentDate) {
                $settingDate.removeClass('-active -disable').removeAttr('data-day').find('.calendar__ico, .calendar__speech').remove();
                $settingBack.removeClass('-active');
            } else {

                let $prevDate = $settingCont.find('[data-day=' + currentDate + ']'); // 前日

                $prevDate.append('<em class="calendar__speech">' + (currentDate + 1) + '日目を<br>設定しよう!</em>');
                $prevDate.nextAll().removeClass('-active -disable').removeAttr('data-day').find('.calendar__ico, .calendar__speech').remove();
            }
            if (8 > currentDate) {
                $settingDecision.removeClass('-active');
            }
        });

        // マイスケジュールの決定ボタン押下時
        $settingDecision.on('click', function () {
            saveDate('setting');
        });

        // カレンダーのタブ切り替え
        function switchTab() {
            $calendarTab.add($calendarCont).removeClass('-active');
            $calendarTab.eq(currentTab).addClass('-active');
            $calendarCont.eq(currentTab).addClass('-active');
        }

        // カレンダーの日付設定
        function setDate($this, currentClass) {
            if (!$this.attr('data-day') && 8 > currentDate) {
                currentDate++;
                $this.addClass(currentClass).attr('data-day', currentDate).append('<em class="calendar__ico">DAY<br><span>' + currentDate + '</span></em><span class="calendar__speech">' + (currentDate + 1) + '日目を<br>設定しよう!</span>');
                $this.prevAll().addClass('-disable').find('.calendar__speech').remove();
                $settingBack.addClass('-active');
            }
            if (7 < currentDate) {
                $this.find('.calendar__speech').html('決定ボタン<br>を押そう!');
                $settingDecision.addClass('-active');
            }
        }

        // 時間差でDAYアイコン表示
        function displayDay($date) {
            $date.each(function () {

                let $this = $(this),
                    day = $this.attr('data-day'); // DAYのデータ属性取得

                if (day) {
                    $this.addClass('-active').find('.calendar__ico').css('animation-delay', 0.25 * day + 's');
                }
            });
        }

        // 決定した日程をローカルストレージに保存
        function saveDate(calendar) {
            that.data.state.calendar = calendar;
            if ('setting' == calendar) {
                that.data.settingDate = [];
                $settingDate.each(function () {

                    let $this = $(this),
                        day = $this.attr('data-day'), // DAYのデータ属性取得
                        date = $this.attr('data-date'); // 日付のデータ属性取得

                    if (day) {
                        that.data.settingDate.push(date);
                    }
                });
            }
            localStorage.setItem('chu5_summer_camp', JSON.stringify(that.data));
        }
    }

    nav() {
        const that = this,
            $nav = $('#js-nav'),
            $navItem = $nav.find('.js-nav-item'),
            $navOmake = $nav.find('.top__slider__omake'),
            $guideCalendar = $('#js-guide-calendar'),
            $calendarDecision = $('#js-calendar').find('.calendar__decision');

        let today = new Date().getTime(), // 今日の日時
            date = '', // ナビゲーションの日付
            time = '00:00:00', // ナビゲーションの時間
            openDate = new Date('2019/8/7 ' + time).getTime(); // 花火大会のオープン日時

        // オープン日以降且つ全て取り組み済みの場合
        if (that.$contentInner.hasClass('top') && openDate < today && 7 < that.data.state.already) {
            $navOmake.addClass('-active');
        }

        setDate();
        setAvatar();

        // 日付ボタン・タブ押下時
        $navItem.on('click', function (e) {
            let $this = $(this);
            if (!$this.hasClass('-active') || that.data.state.already < $navItem.index($this)) {
                e.preventDefault();
            }
            if (!$this.hasClass('-active') && !$this.is($navOmake)) {
                $guideCalendar.addClass('-active');
            }
        });

        // カレンダーの決定ボタン押下時
        $calendarDecision.on('click', function () {
            $navItem.removeClass('-active').find('.user').remove();
            setDate();
            setAvatar();
        });

        // ナビゲーションの日付設定
        function setDate() {
            $navItem.each(function (i) {
                let $this = $(this),
                    $navTime = $this.find('time');

                // ローカルストレージに保存した日付を表示
                if (that.data.state.calendar == 'recommend') {
                    date = that.data.recommendDate[i];
                } else if (that.data.state.calendar == 'setting') {
                    date = that.data.settingDate[i];
                }
                $navTime.text(dateFormat(date));

                // 今日までの日付を有効化
                date = new Date(date + ' ' + time).getTime();
                if (today > date) {
                    $this.addClass('-active');
                }

                // 取り組み済のアイコンを付与
                if (that.data.state.already > i) {
                    $this.addClass('-already');
                }
            });
        }

        // 日付フォーマットの設定
        function dateFormat(date) {
            let format = 'MM月DD日';
            format = format.replace(/MM/g, new Date(date).getMonth() + 1);
            format = format.replace(/DD/g, new Date(date).getDate());
            return format;
        }

        // アバターの設定
        function setAvatar() {
            BAEC.ApiClient.setAkamaiToken({
                complete: function (response) {
                    if (response.error) {
                        console.log('Akamaiトークンの設定に失敗しました。');
                        console.log(response.error);
                        return;
                    }

                    // アバター・ニックネーム取得
                    BAEC.ApiClient.getAvatarNickname({
                        complete: function (response) {
                            if (response.error) {
                                console.log('アバター・ニックネームの取得に失敗しました。');
                                console.log(response.error);
                                return;
                            }

                            // ニックネーム
                            let name = response.data.nickname;

                            // アバター画像
                            let avatar = response.data.avatar;
                            if (avatar) {
                                console.log(avatar);

                                // AkamaiベースURLを取得
                                let akamaiBaseUrl = BAEC.ApiClient.getAkamaiBaseUrl();

                                // アバター画像URLを生成
                                avatar = akamaiBaseUrl + avatar.mainImageUrl;
                            }

                            // アバター・ニックネーム要素設定
                            let elem = '<span class="user"><span class="avatar"><img src="' + avatar + '"></span><span class="name">' + name + '</span></span>';

                            // アバター・ニックネーム表示
                            if (!$navItem.eq(that.data.state.already).hasClass('-active')) {
                                $navItem.eq(that.data.state.already - 1).append(elem);
                            } else {
                                $navItem.eq(that.data.state.already).append(elem);
                            }
                        }
                    });
                }
            });
        }
    }

    uliza() {
        const $uliza = $('#js-uliza'),
            $ulizaClose = $uliza.find('.uliza__close'),
            $ulizaOpen = $('.js-uliza-open');

        // オープンボタン押下時
        $ulizaOpen.on('click', function () {
            let path = $(this).attr('data-path'),
                iframe = '<iframe src="' + path + '" frameborder="0" width="782" height="440" allowfullscreen></iframe>';
            $uliza.prepend(iframe).addClass('-active');
        });

        // クローズボタン押下時
        $ulizaClose.on('click', function () {
            $uliza.removeClass('-active').find('iframe').remove();
        });
    }
}
