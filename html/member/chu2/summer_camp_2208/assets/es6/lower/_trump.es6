export default class Trump {
    constructor() {
        this.init();
    }

    init() {
        this.gametrump();
    }

    gametrump() {
        // グローバル
        // ローカルストレージ
        var data;
        // 現在の日時
        var current = new Date();
        // div要素を格納
        var cards = [];
        // 開始時間
        var startTime;
        // 経過秒数用 タイマーID
        var timer;
        // カードめくり用 タイマーID
        var backTimer;
        // 1枚目かどうかのフラグ   1枚目: true   2枚目: false
        var flgFirst = true;
        // 1枚目のカードを格納
        var cardFirst;
        // そろえた枚数
        var countUnit = 0;

        function Button2_Click() {
            // リロード&戻るボタン
            window.location.reload();
        }
        window.onload = function () {
            // スタート画面
            document.getElementById('start').style.display = 'block';
            document.getElementById('timer').style.display = 'none';
            // ローカルストレージ取得
            data = JSON.parse(localStorage.getItem('member/chu2/summer_camp_2208/index'));
            // プレイ回数が回復する日付
            var limit = new Date(data.trump.date);
            limit = new Date(limit.getFullYear(), limit.getMonth(), limit.getDate() + 1);
            if (current.getTime() > limit.getTime()) {
                data.trump.count = 0;
            }
            if (2 < data.trump.count) {
                var str_img = document.getElementById('str_img');
                str_img.setAttribute('src', 'assets/img/lower/trump/no_play.png');
            }
        };

        function Button1_Click() {
            if (2 < data.trump.count) {
                return;
            }
            // プレイ回数のカウントアップ
            data.trump.count++;
            // プレイ日時
            data.trump.date = current;
            // ローカルストレージ保存
            localStorage.setItem('member/chu2/summer_camp_2208/index', JSON.stringify(data));
            // 数字格納 一時配列
            document.getElementById('start').style.display = 'none';
            document.getElementById('timer').style.display = 'block';
            var arr = [];
            for (var i = 0; i < 10; i++) {
                // ペアの数字を10組
                arr.push(i);
                arr.push(i);
            }
            // シャッフル
            shuffle(arr);
            var panel = document.getElementById('panel');
            // div要素作成
            for (i = 0; i < 20; i++) {
                var div = document.createElement('div');
                div.className = 'card back';
                div.index = i;
                div.number = arr[i];
                div.innerHTML = '';
                div.onclick = turn;
                panel.appendChild(div);
                cards.push(div);
            }
            // 開始時刻を取得
            startTime = new Date();
            // タイマー開始
            startTimer();
        }
        // シャッフル用関数
        function shuffle(arr) {
            var n = arr.length;
            var temp, i;
            while (n) {
                i = Math.floor(Math.random() * n--);
                temp = arr[n];
                arr[n] = arr[i];
                arr[i] = temp;
            }
            return arr;
        }
        // クリック時の処理
        function turn(e) {
            var div = e.target;
            // カードのタイマー処理が動作中は return
            if (backTimer) return;
            // 裏向きのカードをクリックした場合は数字を表示する
            if (div.innerHTML == '') {
                div.className = 'card';
                div.innerHTML = div.number;
            } else {
                // 数字が表示されているカードは return
                return;
            }
            // 1枚目の処理
            if (flgFirst) {
                // cardFirst は2枚目の処理のときに使う
                cardFirst = div;
                // フラグ変更
                flgFirst = false;
                // 2枚目の処理
            } else {
                // 数字が1枚目と一致する場合
                if (cardFirst.number == div.number) {
                    countUnit++;
                    // 見えない状態にする
                    backTimer = setTimeout(function () {
                        div.className = 'card finish';
                        cardFirst.className = 'card finish';
                        backTimer = NaN;
                    }, 500);
                    // 一致しない場合
                } else {
                    // カードを裏側に戻す
                    backTimer = setTimeout(function () {
                        div.className = 'card back';
                        div.innerHTML = '';
                        cardFirst.className = 'card back';
                        cardFirst.innerHTML = '';
                        cardFirst = null;
                        backTimer = NaN;
                    }, 500);
                }
                flgFirst = true;
            }
        }
        // タイマー開始
        function startTimer() {
            timer = setInterval(showSecond, 1000);
        }
        // 秒数表示
        function showSecond() {
            var nowTime = new Date();
            var elapsedTime = Math.floor((nowTime - startTime) / 1000);
            var str = elapsedTime + '秒';
            var re = document.getElementById('result');
            re.innerHTML = str;
            var re = document.getElementById('sec');
            re.innerHTML = str;
            if (countUnit == 10) {
                clearInterval(timer); // timer終了
                document.getElementById('sec').style.display = 'block'; //クリアタイム表示
                document.getElementById('message').style.display = 'block'; //ゲームクリアのメッセージ表示
                document.getElementById('panel').style.display = 'none'; //カード非表示
                document.getElementById('timer').style.display = 'none'; //タイマー非表示
                document.getElementById('retry_btn').style.display = 'block'; //リロードボタン表示
                document.getElementById('return_btn').style.display = 'none'; //戻るボタン非表示
            }
        }
    }
}