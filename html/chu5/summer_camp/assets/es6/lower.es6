export default class Lower {
    constructor() {
        this.$contentInner = $('.l-content__inner');
        this.init();
    }

    init() {

        // 下層ページのみ
        if (this.$contentInner.hasClass('lower')) {

            // ローカルストレージ取得
            this.data = JSON.parse(localStorage.getItem('chu5_summer_camp'));

            // 現在のDAY取得
            this.day = this.$contentInner.attr('class').slice(-1);

            this.header(); // ヘッダー
            this.work(); // 取り組みエリア
        }
    }

    header() {
        const that = this,
            $header = $('#js-header'),
            $headerDay = $header.find('em'),
            $headerTime = $header.find('time'),
            $headerList = $header.find('.lower__header__list'),
            $headerItem = $headerList.find('.lower__header__item');

        let date = ''; // ヘッダーの日付

        $headerDay.html('DAY<span>' + that.day + '</span>');

        // ローカルストレージに保存した日付を表示
        if (that.data.state.calendar == 'recommend') {
            date = that.data.recommendDate[that.day - 1];
        } else if (that.data.state.calendar == 'setting') {
            date = that.data.settingDate[that.day - 1];
        }
        $headerTime.text(dateFormat(date));

        // 今日やることの項目が5つより下の場合
        if (5 > $headerItem.length) {
            $headerList.addClass('-col2');
        }

        // 日付フォーマットの設定
        function dateFormat(date) {
            let format = 'MM月DD日';
            format = format.replace(/MM/g, new Date(date).getMonth() + 1);
            format = format.replace(/DD/g, new Date(date).getDate());
            return format;
        }
    }

    work() {
        const that = this,
            $work = $('#js-work'),
            $workBtn = $work.find('.lower__right__btn'),
            $workDay = $work.find('em'),
            $workNum = $work.find('dd'),
            $navItem = $('#js-nav').find('.js-nav-item');

        let ua = window.navigator.userAgent;

        $workDay.html('DAY<span>' + that.day + '</span>');
        showCount()

        // 取り組み済みの場合
        if (that.data.state.already > that.day - 1) {
            $workBtn.removeClass('-active');
        }

        // 取り組みボタン押下時
        $workBtn.on('click', function () {

            let $this = $(this),
                param = $this.attr('data-target'); // カウント対象取得

            $this.css('transition', 'opacity 0.25s').removeClass('-active');
            $navItem.eq(that.data.state.already).addClass('-already');
            that.data.state.already++;
            localStorage.setItem('chu5_summer_camp', JSON.stringify(that.data));

            // カウントアップ
            $.post('counter/countup.php', {
                path: 'db/counter.db',
                name: param,
                num: 1
            });

            showCount();

            // アプリホームへリダイレクト
            setTimeout(function () {
                if (ua.indexOf('BenesseBrowser') != -1) {
                    BenesseBrowserView.transitionHome();
                } else {
                    location.href = 'https://d.benesse.ne.jp/zemi/top';
                }
            }, 500);
        });

        // カウント数反映
        function showCount() {

            let param = $workNum.attr('data-target'); // カウント対象取得

            // カウント表示
            $.post('counter/get.php', {
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
                ('00000' + data[param]).slice(-5).split('').forEach(function (num) {
                    countNum += '<span>' + num + '</span>';
                });
                $workNum.html(countNum);
            });
        }
    }
}
