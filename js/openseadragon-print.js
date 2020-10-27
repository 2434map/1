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
	$.Viewer.prototype.printMode = function() {
		var self = this;

		let printButton = new OpenSeadragon.Button({
			tooltip:  'Print',
			srcRest:  'images/print_rest.png',
			srcGroup: 'images/print_grouphover.png',
			srcHover: 'images/print_hover.png',
			srcDown:  'images/print_pressed.png',
			onClick: printModeOn
		});
		//self.addControl(pointerButton.element, { anchor: OpenSeadragon.ControlAnchor.TOP_LEFT });
		self.buttons.buttons.push(printButton);
		self.buttons.element.appendChild(printButton.element);


		function printModeOn(){
			if  (jQuery('.stalkerOn').length) jQuery(".stalkerOn").css('display','none');
			self.buttons.element.style.display = "none";
			self.navigator.element.style.display = "none";
			jQuery("nav").css('display','none');
			jQuery("main").addClass('printMode');
			self.viewport.setRotation(90);
			jQuery("a.marker").css('transform','rotate(90deg)');
			jQuery("#print").css('display','block');
		}

		if(jQuery('#off') != undefined){ 
			jQuery('#off').on('click', printModeOff);
		}
		if(jQuery('#run') != undefined){ 
			jQuery('#run').on('click', function() {window.print();});
		}



		function printModeOff(){
			if  (jQuery('.stalkerOn').length) jQuery(".stalkerOn").css('display','block');
			if  (jQuery('.stalkerOff').length) jQuery(".stalkerOff").css('display','none');
			self.buttons.element.style.display = "inline-block";
			self.navigator.element.style.display = "inline-block";
			jQuery("nav").css('display','block');
			jQuery("main").removeClass('printMode');
			self.viewport.setRotation(0);
			jQuery("a.marker").css('transform','rotate(0deg)');
			jQuery("#print").css('display','none');
		}

	};
})();