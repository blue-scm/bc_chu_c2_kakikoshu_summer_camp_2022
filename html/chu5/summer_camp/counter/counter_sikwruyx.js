(function () {

	'use strict';

	$(function () {
		var Marathon = new counter();
	});

	// constructor
	function counter() {
		this.init();
	}

	// init
	counter.prototype.init = function () {
		// カウント取得
		this.get();
		// カウント追加
		this.set();
	};

	// カウント取得
	counter.prototype.get = function () {

		var $count = $(".js-counter");

		$count.each(function (index) {
			var $this = $(this)
			var param = $this.attr("data-target");

			// カウント表示
			$.post("get.php", {
				"path": "db/counter.db", "name": param
			}, function (data) {

				var data = JSON.parse(data);

				// データがない場合は初期化
				if (data == '') { data[param] = 0; }

				var count_num = ("000000" + data[param]).slice(-6);
				$('.js-counter[data-target="' + param + '"]').val(count_num);
			});

		});

	};

	// カウント追加
	counter.prototype.set = function () {

		var $btn = $('.js-counter-set');

		$btn.on('click', function () {
			var param = $(this).attr('data-target');
			var num = $('.js-counter-add[name="add-' + param + '"]').val();
			console.log(param);
			// カウントアップ
			$.post("countup.php", {
				"path": "db/counter.db", "name": param, "num": num
			}, countup);

			setTimeout(function () {
				location.reload();
			}, 200);
		});

		function countup(data) {
			console.log('countup_result:' + data);
		}
	};
})();
