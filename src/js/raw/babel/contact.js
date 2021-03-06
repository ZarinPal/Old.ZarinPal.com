define(['jquery'], function($){
	let map;
	const LatLang = $('#map').data('latlang').split(','),
		Lat = parseFloat(LatLang[0]),
		Lang = parseFloat(LatLang[1]),
		initialize = function() {
			const mapOptions = {
				zoom: 17,
				center: new google.maps.LatLng(Lat, Lang),
				disableDefaultUI: true,
				scrollwheel: false,
				scaleControl: true,
				zoomControl: true,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.LARGE,
					position: google.maps.ControlPosition.TOP_LEFT
				},
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			// myIcon = new google.maps.MarkerImage("dist/img/map-marker.png", null, null, null, new google.maps.Size(40, 52));
			map = new google.maps.Map(document.getElementById('map'), mapOptions);

			const marker = new google.maps.Marker({
				position: new google.maps.LatLng(Lat, Lang),
				map: map,
				optimized: false
			});
		};

	google.maps.event.addDomListener(window, 'load', initialize);
});
