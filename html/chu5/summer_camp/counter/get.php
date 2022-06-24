<?php
  // Post引数取得
  $name = isset($_POST['name']) ? $_POST['name'] : NULL;
  $path = isset($_POST['path']) ? $_POST['path'] : NULL;

  // カウンター用php読み込み
  require_once("counter.php");
  $cCnt = new CCounter($path);

  // 処理
  $cCnt->connect_db();        // DB接続
  $cnt = $cCnt->get_count($name);  // 値取得
  $cCnt->disconnect_db();     // DB切断
  echo $cnt;                  // カウント値を表示
?>