(function() {

	var imX = 10;
	var imY = 10;
	var exp = 180;

	// ----------
	var $ = window.OpenSeadragon;

	if (!$) {
		$ = require('openseadragon');
		if (!$) {
			throw new Error('OpenSeadragon is missing.');
		}
	}

	// ----------
	$.Viewer.prototype.nav = function(c) {
		var self = this;



		var li = "";
		li += '<li';
		if (c == "index") li += ' class="current"';
		li += '><a href="./">通常地図</a></li>';
		li += '<li';
		if (c == "all2") li += ' class="current"';
		li += '><a href="./all2.html#zoom=19.92753623188406&x=0.8067259594949632&y=0.6080154476736246">全体地図</a></li>';
		li += '<li';
		if (c == "Nether") li += ' class="current"';
		li += '><a href="Nether.html">ネザー地図</a></li>';
		li += '<li';
		if (c == "New") li += ' class="current"';
		li += '><a href="New.html">新規ワールド</a></li>';
		li += '<li';
		if (c == "New_Nether") li += ' class="current"';
		li += '><a href="New_Nether.html">新規ワールドネザー</a></li>';
		var u = document.createElement('ul');
		u.innerHTML = li

		var n = document.createElement('nav');
		n.appendChild(u);
		n.innerHTML += '<img src="images/center.gif">';

		//const main = document.getElementById("main");
		//main.appendChild(n);


		self.addControl(n, { anchor: OpenSeadragon.ControlAnchor.TOP_LEFT });




	};
})();