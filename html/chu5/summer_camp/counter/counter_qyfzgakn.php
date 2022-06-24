<?php ob_start();
$user_hash = '$2y$10$x7DpxriwnvbkADRgmL0CZ.j4i8NhuQ5cR/groE7kqcNHyQxuut6uW';
$password_hash = '$2y$10$7m20ZD3gyvNjue2WeEKcJufDR.CeMgohvBXW3c51GgqYkhcPEcvze';
// 生成 php -r 'var_dump(password_hash("PW", PASSWORD_DEFAULT));'
// benesse / kndvmeux

function login(){
    // 認証表示
    header('WWW-Authenticate: Basic realm="Private Page"');
    header('HTTP/1.0 401 Unauthorized');

    die('<a href="../">サイトに戻る</a>');
}

// ログイン判定
if ( !$_SERVER['PHP_AUTH_PW']
    || !$_SERVER['PHP_AUTH_USER']
    || !password_verify($_SERVER['PHP_AUTH_PW'],$password_hash )
    || !password_verify($_SERVER['PHP_AUTH_USER'],$user_hash )){
    login();
}

ob_end_clean(); ?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">

<head>
    <!-- 管理ページへのアクセス監視のため、gaタグを入れています。以下はblueアカウントです。 -->
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script type="text/javascript" src="analytics.php?s=X"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-132560069-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'UA-132560069-1' {
            'custom_map': {
                'dimension1': 'IPアドレス'
            },
            'IPアドレス': <?php echo $_SERVER['REMOTE_ADDR']; ?>,
            'custom_map': {
                'dimension2': 'clientId',
                'dimension3': 'ip_value',
                'dimension4': 'access_time',
                'dimension5': 'ua',
                'dimension6': 'uri_js',
                'dimension7': 'id_php'
            },
            'access_time': setAnalytics.getAccessTime(),
            'ip_value': setAnalytics.getIP(),
            'ua': navigator.userAgent,
            'uri_js': location.pathname,
            'id_php': setAnalytics.getCookie()
        });

    </script>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>カウント管理</title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script type="text/javascript" src="./counter_sikwruyx.js"></script>
</head>

<body>
    <p>複数カウントを一括で管理可能。「data-target」でDB</p>
    DAY1：<input class="js-counter" data-target="day1" type="text" name="counter-day1" size="20" readonly="readonly">　→　追加する数値:　<input class="js-counter-add" data-target="day1" type="text" name="add-day1" size="10">　<button class="js-counter-set" data-target="day1">追加</button><br>
    DAY2：<input class="js-counter" data-target="day2" type="text" name="counter-day2" size="20" readonly="readonly">　→　追加する数値:　<input class="js-counter-add" data-target="day2" type="text" name="add-day2" size="10">　<button class="js-counter-set" data-target="day2">追加</button><br>
    DAY3：<input class="js-counter" data-target="day3" type="text" name="counter-day3" size="20" readonly="readonly">　→　追加する数値:　<input class="js-counter-add" data-target="day3" type="text" name="add-day3" size="10">　<button class="js-counter-set" data-target="day3">追加</button><br>
    DAY4：<input class="js-counter" data-target="day4" type="text" name="counter-day4" size="20" readonly="readonly">　→　追加する数値:　<input class="js-counter-add" data-target="day4" type="text" name="add-day4" size="10">　<button class="js-counter-set" data-target="day4">追加</button><br>
    DAY5：<input class="js-counter" data-target="day5" type="text" name="counter-day5" size="20" readonly="readonly">　→　追加する数値:　<input class="js-counter-add" data-target="day5" type="text" name="add-day5" size="10">　<button class="js-counter-set" data-target="day5">追加</button><br>
    DAY6：<input class="js-counter" data-target="day6" type="text" name="counter-day6" size="20" readonly="readonly">　→　追加する数値:　<input class="js-counter-add" data-target="day6" type="text" name="add-day6" size="10">　<button class="js-counter-set" data-target="day6">追加</button><br>
    DAY7：<input class="js-counter" data-target="day7" type="text" name="counter-day7" size="20" readonly="readonly">　→　追加する数値:　<input class="js-counter-add" data-target="day7" type="text" name="add-day7" size="10">　<button class="js-counter-set" data-target="day7">追加</button><br>
    DAY8：<input class="js-counter" data-target="day8" type="text" name="counter-day8" size="20" readonly="readonly">　→　追加する数値:　<input class="js-counter-add" data-target="day8" type="text" name="add-day8" size="10">　<button class="js-counter-set" data-target="day8">追加</button><br>
    <style>
        * {
            font-size: 20px;
        }
    </style>
</body>

</html>
