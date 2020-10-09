(function() {

	var imX = 10;
	var imY = 10;

	// ----------
	var $ = window.OpenSeadragon;

	if (!$) {
		$ = require('openseadragon');
		if (!$) {
			throw new Error('OpenSeadragon is missing.');
		}
	}

	// ----------
	$.Viewer.prototype.stalkerImage = function() {
		var self = this;

		var body = document.body;
		var im = document.createElement("div");
		im.id = "stalker";
		im.innerHTML = '<img src="images/skin80.gif" alt="" width="80" height="80">';
		body.appendChild(im);

		window.addEventListener('mouseover',
		function(e){
			im.style.left = e.clientX + 10 + "px"; //横の位置
			im.style.top  = e.clientY + 10 + "px"; //縦の位置
		}, false);

		function mousemove(e){
			im.style.left = e.position.x + imX + "px"; //横の位置
			im.style.top  = e.position.y + imY + "px"; //縦の位置
		}

		var tracker = new OpenSeadragon.MouseTracker({
			element: self.container, 
			moveHandler: mousemove
		});
		tracker.setTracking(true);
		self.addHandler('canvas-drag', mousemove);
	};

})();
