$(function(){

  //ヘッダー・フッターの読み込み
	$('header').load("/common/headfoot2019/header.shtml");
	$('footer').load("/common/headfoot2019/footer.shtml");

  //チャレタブ判定
  var uach = navigator.userAgent.toLowerCase();
  var chuZemiModels = ['BenesseBrowser'];
  var regchuZemiModels = new RegExp(chuZemiModels.join('|').toLowerCase());
  var charange_tab;
  if (uach.match(regchuZemiModels)) {
      charange_tab = true;
  }
  //header footerの出しわけ
  if (charange_tab) {
    $('header').hide();
    $('footer').hide();
  } else {
    $('header').show();
    $('footer').show();
  }

});