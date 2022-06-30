export default class Utility {

    /*
    オブジェクトの深い凍結
    obj：凍結するオブジェクト
    */
    static deepFreeze(obj) {

        // オブジェクトで定義されたプロパティを取得
        const prop = Object.getOwnPropertyNames(obj);

        // 自分自身を凍結する前にプロパティを凍結
        for (const i in prop) {
            const val = obj[prop[i]];
            if (!val || typeof val != 'object') continue;
            this.deepFreeze(val);
        }

        return Object.freeze(obj);

    }

    /*
    要素のインデックス取得
    $target：インデックスを取得するターゲットの要素
    */
    static index($target) {

        if (!$target) return -1;

        let i = 0;
        while ($target = $target.previousElementSibling) i++;

        return i;

    }

    /*
    DOM 監視
    $target：監視するターゲットの要素
    callback：コールバック関数
    option：オプション（https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit）
    */
    static mutation($target, callback, option) {

        const mutation = new MutationObserver(callback);

        mutation.observe($target, option);

    }

    /*
    重複しない乱数を配列に追加
    min：範囲の最小値
    max：範囲の最大値
    array：元になる数値の配列
    */
    static noOverlap(min, max, array = []) {

        while (true) {
            const num = this.random(min, max);

            // 重複しない場合は格納
            if (array.some(val => val == num)) continue;
            array.push(num);

            break;
        }

        return array;

    }

    /*
    1回だけイベント処理を実行
    $target：ターゲットの要素
    callback：コールバック関数
    type：イベントの種類
    */
    static once($target, type, callback) {

        const once = e => {
            $target.removeEventListener(type, once);
            callback(e);
        };

        $target.addEventListener(type, once);

    }

    /*
    乱数取得
    min：範囲の最小値
    max：範囲の最大値
    digit：小数点以下の桁数
    */
    static random(min, max, digit) {

        // 指定した最小値から最大値までの乱数を取得
        let num = Math.random() * (max - min + 1) + min;

        // 小数点以下切り捨て
        num = digit ? Math.floor(num * Math.pow(10, digit)) / Math.pow(10, digit) : Math.floor(num);

        return num;

    }

    /*
    配列をシャッフル
    [...array]：数値の配列
    */
    static shuffle([...array]) {

        for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;

    }

    /*
    配列の並び替え
    array：並び替えする配列
    order：昇順（asc）／降順（desc）
    */
    static sort(array, order = 'asc') {

        let compare;

        if (order == 'asc') {
            compare = (a, b) => a - b;
        } else if (order == 'desc') {
            compare = (a, b) => b - a;
        }

        array.sort(compare);

    }

    /*
    ULIZA 取得
    episodeid：ULIZA のエピソードコード
    width：ULIZA の横幅
    height：ULIZA の高さ
    */
    static uliza(episodeid) {

        return `<iframe src="//www2.uliza.jp/IF/RequestVideoTag.aspx?clientid=${CONFIG.ULIZA.CLIENT_ID}&amp;episodeid=${episodeid}&amp;playertype=HTML5Player&amp;iframe=1&amp;maxml=&amp;plurl=&amp;u_option_adshowflag=0&amp;html5flag=2&amp;u_base_pw=${CONFIG.ULIZA.WIDTH}&amp;u_base_ph=${CONFIG.ULIZA.HEIGHT}&amp;u_option_autoplay=0&amp;u_option_previousimage=1&amp;playbackrates=1.0%2C1.2%2C1.5" frameborder="0" allowfullscreen="" width="${CONFIG.ULIZA.WIDTH}" height="${CONFIG.ULIZA.HEIGHT}"></iframe>`;

    }

    /*
    ゼロパディングを生成
    digit：桁数
    num：数値
    */
    static zero(digit, num) {

        return (Array(digit).join(0) + num).slice(-digit);

    }

}