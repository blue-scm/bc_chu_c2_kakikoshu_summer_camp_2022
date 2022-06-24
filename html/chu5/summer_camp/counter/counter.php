<?php
class CCounter {
  private $m_db;        // SQLite3 instance
  private $m_db_fpath;  // DBファイルパス
  private $m_db_table;  // テーブル
  private $m_db_column; // カラム

  // コンストラクタ
  function __construct( $path = 'counter.db' ) {
    $this->m_db = NULL;
    $this->m_db_fpath = $path;
    $this->m_db_table = "t_cnt";
  }
 
  // DB接続
  function connect_db(){
    if($this->m_db == NULL){
      // DBファイル存在確認
      $isDbExist = file_exists($this->m_db_fpath);
      
      // DB接続
      $this->m_db = new SQLite3($this->m_db_fpath);
      try {
        $this->m_db->enableExceptions(TRUE);
      }catch(Exception $error){
        // エラー表示
        echo "[".__LINE__."] Caught exception: ".$error->getMessage();
      }

      // DB新規作成の場合
      if($isDbExist === FALSE){
        try {
          // テーブルを作成
          $this->m_db->exec('CREATE TABLE "'.$this->m_db_table.'" (t_cnt_name varchar(20), t_cnt_num int);');
        }catch(Exception $error){
          // エラー表示
          echo "[".__LINE__."] Caught exception: ".$error->getMessage();
        }
      }  
    }
  }
 
  // DB切断
  function disconnect_db(){
    if($this->m_db != NULL){
      $this->m_db->close();
      $this->m_db = NULL;
    }
  }
 
  // カウントアップ
  function count_up($t_cnt_name = NULL, $t_cnt_num = 1){
    $result = '';
    if($this->m_db != NULL && $t_cnt_name != NULL){

      try {
        // レコード取得
        $rs = $this->m_db->query('SELECT COUNT(*) FROM '.$this->m_db_table.' WHERE t_cnt_name = "'.$t_cnt_name.'";');
        $row = $rs->fetchArray();
        $isRecordExist = $row[0];
          
        // インクリメントクエリ
        $query = 'UPDATE "'.$this->m_db_table.'" SET t_cnt_num = t_cnt_num+'.$t_cnt_num.' WHERE t_cnt_name = "'.$t_cnt_name.'";';
        // レコード新規作成の場合
        if($isRecordExist < 1){
          // レコード新規作成クエリ
          $query = 'INSERT INTO "'.$this->m_db_table.'" (t_cnt_name,t_cnt_num) VALUES("'.$t_cnt_name.'",1);';
        }
      }catch(Exception $error){
          // エラー表示
          echo "[".__LINE__."] Caught exception: ".$error->getMessage();
      }

      // トランザクション開始
      $this->m_db->exec('begin');
      try {
        // クエリ実行
        $this->m_db->exec($query);
        
        // トランザクションコミット
        $this->m_db->exec('commit');

        // カウンタの値を取得
        $rs = $this->m_db->query('SELECT "t_cnt_num" FROM "'.$this->m_db_table.'" WHERE t_cnt_name = "'.$t_cnt_name.'";');
        $row = $rs->fetchArray();
        $cnt = $row['t_cnt_num'];

        // カウントアップした値を返す
        $result = $cnt;
      }catch(Exception $error){
        try {
          // トランザクションロールバック
          $this->m_db->exec('rollback');
        }catch(Exception $error){
          // エラー表示
          echo "[".__LINE__."] Caught exception: ".$error->getMessage();
        }
  
        // エラー表示
        $result = "[".__LINE__."] Caught exception: ".$error->getMessage();
      }
    }
    return $result;
  }

  // 値取得
  function get_count($t_cnt_name = NULL){
    $result = '';

    // 全取得クエリ
    $query = 'SELECT * FROM "'.$this->m_db_table.'";';
    // フィールド指定がある場合はそれのみ取出し
    if($t_cnt_name != NULL){
      try {
        // 一部取得クエリ作成
        $query = 'SELECT * FROM "'.$this->m_db_table.'" WHERE t_cnt_name = "'.$t_cnt_name.'";';
      }catch(Exception $error){
        // エラー表示
        echo "[".__LINE__."] Caught exception: ".$error->getMessage();
      }
    }

    if($this->m_db != NULL){
      try {
        // カウンタの値を取得
        $rs = $this->m_db->query($query);
        $allData = array();

        while ($row = $rs->fetchArray(MYSQLI_ASSOC)) {
          $allData = array_merge($allData,array($row['t_cnt_name']=>$row['t_cnt_num']));
        }

        // json変換した値を返す
        $result = json_encode($allData);
      }catch(Exception $error){
        // エラー表示
        $result = "[".__LINE__."] Caught exception: ".$error->getMessage();
      }
    }
    return $result;
  }
}
?>