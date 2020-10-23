(function() {

	var mh = 36;
	var mw = 36;

	// ----------
	var $ = window.OpenSeadragon;

	if (!$) {
		$ = require('openseadragon');
		if (!$) {
			throw new Error('OpenSeadragon is missing.');
		}
	}

	// ----------
	$.Viewer.prototype.markerLink = function(f, w) {
		var self = this;


		var markerfile = f;
		var marker = [];
		function readMarkerCsv(data) {
			var csv = jQuery.csv.toArrays(data);
			for(var i=0; i<csv.length; i++) if(i>0) marker.push(csv[i]);
		}
		jQuery(document).ajaxStop(function() {
			jQuery.get(markerfile, readMarkerCsv, 'text');// マーカー情報
		});



		var hEl = self.HTMLelements();
		var M = [];

		for(var i=0; i<marker.length; i++){
			M[i] = document.createElement("a");
			M[i].className = "marker markerOn";
			M[i].setAttribute("href",marker[i][3]);
			M[i].setAttribute("title",marker[i][2]);
			M[i].setAttribute("target","_blank");
			hEl.addElement({
				id: "M"+String(i),
				element: M[i],
				x: Math.round(marker[i][0]*w)-Math.round(mw/2),
				y: Math.round(marker[i][1]*w)-Math.round(mh/2),
				width: mw,
				height: mh
			})
			new OpenSeadragon.MouseTracker({element: M[i], clickHandler: onMarker});
		}

		function onMarker(e){
			var target = e.originalEvent.target;
			if (target.matches('a')) {
				if (target.getAttribute('target') === '_blank') window.open(target.getAttribute('href'));
				else location.href = target.getAttribute('href');
			}
		}

		// 変化検知
		var imagingHelper = self.activateImagingHelper({onImageViewChanged: onImageViewChanged});
		function onImageViewChanged(event) {
			//alert(imagingHelper.getZoomFactor());
			if(imagingHelper.getZoomFactor() > 0.5){
				if(jQuery('.markerOn').length) jQuery("a.marker").css('display','block');
			} else {
				jQuery("a.marker").css('display','none');
			}
		}

		if(imagingHelper.getZoomFactor() > 0.5){
			if(jQuery('.markerOn').length) jQuery("a.marker").css('display','block');
		} else {
			jQuery("a.marker").css('display','none');
		}

		let markerButton = new OpenSeadragon.Button({
			tooltip:  'Marker',
			srcRest:  'images/marker_rest.png',
			srcGroup: 'images/marker_grouphover.png',
			srcHover: 'images/marker_hover.png',
			srcDown:  'images/marker_pressed.png',
			onClick: markerChange
		});
		//self.addControl(markerButton.element, { anchor: OpenSeadragon.ControlAnchor.TOP_LEFT });
		self.buttons.buttons.push(markerButton);
		self.buttons.element.appendChild(markerButton.element);

		function markerChange(){
			if  (jQuery('.markerOn').length){ 
				jQuery("a.marker").removeClass('markerOn');
				jQuery("a.marker").css('display','none');
			} else {
				jQuery("a.marker").addClass('markerOn');
				if(imagingHelper.getZoomFactor() > 0.5){
					jQuery("a.marker").css('display','block');
				} else {
					jQuery("a.marker").css('display','none');
				}
			}
		}


	}

})();
