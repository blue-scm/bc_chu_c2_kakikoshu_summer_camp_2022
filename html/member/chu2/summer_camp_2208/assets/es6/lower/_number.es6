export default class Number {
    constructor() {
       /*  this.init(); */
    }

    init() {
        this.gamenumber();
    }

    gamenumber() {
        $(window).on('load', function() {
        /*
         * Runstant
         * 思いたったらすぐ開発. プログラミングに革命を...
         */
        phina.globalize();
        // シーンの定義
        var myScenes = [{
            label: 'title',
            className: 'TitleScene',
            nextLabel: '',
        }, {
            label: 'main',
            className: 'MainScene',
            nextLabel: '',
        }, {
            label: 'result',
            className: 'ResultScene',
            nextLabel: '',
        }];
        var ASSETS = {
            image: {
                'title': './assets/img/lower/number/title_bg.png',
                'main_bg': './assets/img/lower/number/bg.png',
                'finish_bg': './assets/img/lower/number/finish.png',
                'retry': './assets/img/lower/number/retry.png',
                'start': './assets/img/lower/number/start.png',
                'no_play': './assets/img/lower/number/no_play.png',
                'return': './assets/img/lower/number/return.png'
            },
        };
        var SCREEN_WIDTH = 420;
        var SCREEN_HEIGHT = 396;
        var MAX_PER_LINE = 5; // ピースの横に並ぶ最大数
        var PIECE_SIZE = 50; // マスのサイズ
        var BOARD_PADDING = 20;
        var MAX_NUM = MAX_PER_LINE * MAX_PER_LINE; // ピース全体の数
        var BOARD_SIZE = SCREEN_WIDTH - BOARD_PADDING * 5; // マスのサイズ
        var BOARD_OFFSET_X = BOARD_PADDING + PIECE_SIZE / 5; // マスのサイズ
        var PIECE_APPEAR_ANIMATION = {
            // loop: true,
            tweens: [
                ['to', {
                    rotation: 380
                }, 500],
                ['set', {
                    rotation: 0
                }],
            ]
        };
        phina.define('TitleScene', {
            superClass: 'DisplayScene',
            init: function() {
                this.superInit();
                this.backgroundColor = 'rgba(255,213,5)';
                var sprite = Sprite('title').addChildTo(this);
                sprite.x = 210;
                sprite.y = 199;
                // ローカルストレージ取得
                var data = JSON.parse(localStorage.getItem('member/chu2/summer_camp_2208/index'));
                // 現在の日時
                var current = new Date();
                // プレイ回数が回復する日付
                var limit = new Date(data.number.date);
                limit = new Date(limit.getFullYear(), limit.getMonth(), limit.getDate() + 1);
                if (current.getTime() > limit.getTime()) {
                    data.number.count = 0;
                }
                if (2 < data.number.count) {
                    sprite = Sprite('no_play').addChildTo(this); // 今日はもう遊べないよ！
                } else {
                    sprite = Sprite('start').addChildTo(this); // スタート
                }
                sprite.x = 210;
                sprite.y = 340;
                sprite.setInteractive(true); // タッチを有効にする
                // sprite.onpointend = function(){
                //   this.exit();
                // };
                var self = this;
                // 画面タッチ時
                sprite.onpointend = function() {
                    if (2 < data.number.count) {
                        return;
                    }
                    // プレイ回数のカウントアップ
                    data.number.count++;
                    // プレイ日時
                    data.number.date = current;
                    // ローカルストレージ保存
                    localStorage.setItem('member/chu2/summer_camp_2208/index', JSON.stringify(data));
                    // 次のシーンへ
                    self.exit();
                };
            },
        });
        phina.define('MainScene', {
            superClass: 'DisplayScene',
            init: function() {
                this.superInit({
                    width: SCREEN_WIDTH,
                    height: SCREEN_HEIGHT,
                });
                this.backgroundColor = 'rgba(255,213,5)';
                var sprite = Sprite('main_bg').addChildTo(this);
                sprite.x = 210;
                sprite.y = 199;
                var self = this;
                var sprite = Sprite('return').addChildTo(this); // もどるボタン
                sprite.x = 60;
                sprite.y = 20;
                sprite.setInteractive(true); // タッチを有効にする
                sprite.onpointend = function() {
                    self.exit('title'); // スタート画面に戻る
                };
                this.currentIndex = 1;
                this.group = DisplayElement().addChildTo(this);
                var gridX = Grid(BOARD_SIZE, 5.2); // マス同士のマージン
                var gridY = Grid(BOARD_SIZE, 5.2);
                var self = this;
                var numbers = Array.range(1, MAX_NUM + 1).shuffle();
                numbers.each(function(index, i) {
                    // グリッド上でのインデックス
                    var xIndex = i % MAX_PER_LINE;
                    var yIndex = Math.floor(i / MAX_PER_LINE);
                    var p = Piece(index).addChildTo(self.group);
                    p.x = gridX.span(xIndex + 1) + 26; // マスのX座標
                    p.y = gridY.span(yIndex + 1) + 36; // マスのY座標
                    p.fill = 'rgba(40, 100, 150)', // ピースの色変更
                        p.stroke = 'rgba(255,255,255)', // ピースの縁色
                        p.strokeWidth = 5; // 縁の太さ
                    p.onpointstart = function() {
                        self.check(this);
                    };
                    p.appear();
                });
                // タイマーラベルを生成
                var timerLabel = Label('0').addChildTo(this);
                timerLabel.origin.x = 1;
                timerLabel.x = 238; // タイマーの位置
                timerLabel.y = 52;
                timerLabel.fill = '#444';
                timerLabel.fontSize = 17; // タイマーのフォントサイズ
                // timerLabel.align = 'right';
                timerLabel.baseline = 'bottom';
                this.timerLabel = timerLabel;
                this.time = 0;
                this.onpointstart = function(e) {
                    var p = e.pointer;
                    var wave = Wave().addChildTo(this);
                    wave.x = p.x;
                    wave.y = p.y;
                };
            },
            // onenter: function() {
            //   var scene = CountScene({
            //     // backgroundColor: 'rgba(70,70,68,29)',
            //     count: ['スタート'],//始まる前のやつ
            //     fontSize :10,
            //   });
            //   this.app.pushScene(scene);
            // },
            update: function(app) {
                // タイマーを更新
                this.time += app.ticker.deltaTime;
                var sec = this.time / 1000; // 秒数に変換
                this.timerLabel.text = sec.toFixed(0) + '秒';
                this.timerLabel.result = sec.toFixed(0);
            },
            check: function(piece) {
                if (this.currentIndex === piece.index) {
                    piece.alpha = 0.5; // 押したマスの透明度
                    if (this.currentIndex >= MAX_NUM) {
                        this.exit({
                            resultTime: this.timerLabel.result,
                        });
                    } else {
                        this.currentIndex += 1;
                    }
                }
            }
        });
        phina.define('ResultScene', {
            superClass: 'DisplayScene',
            init: function(param) {
                this.superInit(param);
                this.backgroundColor = 'rgba(162,219,214)';
                this.backgroundColor = 'rgba(255,213,5)';
                var sprite = Sprite('finish_bg').addChildTo(this);
                sprite.x = 210;
                sprite.y = 199;
                var self = this;
                Label({
                    text: param.resultTime + '秒',
                    fontSize: 32,
                    fill: 'rgba(66,66,66)',
                }).addChildTo(this).setPosition(this.gridX.center(0), this.gridY.span(9.87));
                var sprite = Sprite('retry').addChildTo(this); // もう一回
                sprite.x = 210;
                sprite.y = 340;
                sprite.setInteractive(true); // タッチを有効にする
                sprite.onpointend = function() {
                    self.exit('title');
                };
            },
        });
        phina.define('Piece', {
            superClass: 'Button',
            init: function(index) {
                this.superInit({
                    width: PIECE_SIZE,
                    height: PIECE_SIZE,
                    fontSize: 24,
                    text: index + '', // マスの中の数字
                });
                this.index = index;
            },
            appear: function() {
                this.tweener.clear().fromJSON(PIECE_APPEAR_ANIMATION);
            },
        });
        phina.main(function() {
            // アプリケーション生成
            var app = GameApp({
                domElement: document.getElementById("phinaCanvas"),
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
                startLabel: 'title',
                scenes: myScenes, // シーン定義を渡す
                fit: false, // 画面にフィットさせない
                assets: ASSETS,
            });
            // app.enableStats(); // FPSの表示、重いので消した
            app.run();
        });
    });
}
}