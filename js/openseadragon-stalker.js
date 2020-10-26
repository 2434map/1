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
		im.id= 'stalker';
		im.classList.add('stalkerOn');
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
		//console.dir(self.viewport); 
		//var dataString = self.viewport._contentAspectRatio.toFixed(10);
		//console.log(dataString);
		//console.log(self.viewport.getAspectRatio());

		let pointerButton = new OpenSeadragon.Button({
			tooltip:  'Pointer',
			srcRest:  'images/pointer_rest.png',
			srcGroup: 'images/pointer_grouphover.png',
			srcHover: 'images/pointer_hover.png',
			srcDown:  'images/pointer_pressed.png',
			onClick: pointerChange
		});
		//self.addControl(pointerButton.element, { anchor: OpenSeadragon.ControlAnchor.TOP_LEFT });
		self.buttons.buttons.push(pointerButton);
		self.buttons.element.appendChild(pointerButton.element);

		function pointerChange(){
			if (document.querySelector('.stalkerOn')){ 
				let elements = document.getElementsByClassName('stalkerOn');
				Array.prototype.forEach.call(elements, function(element) {
					element.classList.add('stalkerOff');
					element.classList.remove('stalkerOn');
				});
			} else if(document.querySelector('.stalkerOff')) {
				let elements = document.getElementsByClassName('stalkerOff');
				Array.prototype.forEach.call(elements, function(element) {
					element.classList.add('stalkerOn');
					element.classList.remove('stalkerOff');
				});
			}
		}

	};

})();
