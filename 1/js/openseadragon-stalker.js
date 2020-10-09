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

		var tracker = new OpenSeadragon.MouseTracker({
			element: self.container, 
			moveHandler: mousemove
		});
		tracker.setTracking(true);

		function mousemove(e){
			im.style.left = e.position.x + imX + "px"; //横の位置
			im.style.top  = e.position.y + imY + "px"; //縦の位置
		}

		self.addHandler('canvas-drag', function(e) {
			im.style.left = e.position.x + imX + "px"; //横の位置
			im.style.top  = e.position.y + imY + "px"; //縦の位置
		});
	};

})();
