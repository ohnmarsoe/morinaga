
$(function() {
	
   	//googlemap
	$.googlemap({selector: 'company-map',
				latlngX: 35.667141,
				latlngY: 139.74});
				

});

(function($){
	$.googlemap = function(option){
			
			var conf = $.extend({
				selector: ' ',
				latlngX: 0,
				latlngY: 0,
			}, option)
			
			var latlng = new google.maps.LatLng(conf.latlngX, conf.latlngY);
			
			var myOptions = {
				zoom: 16,
				center: latlng,
				mapTypeControl: false,
				streetViewControl: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			var map = new google.maps.Map(document.getElementById(conf.selector), myOptions);
			
						
			var markerOptions = {
				position: latlng,
				map: map,
				title: 'mulberHome'
			};
			
			var marker = new google.maps.Marker(markerOptions);
	
			var stylez = [
			 { featureType: "all",
				elementType: "geometry",
				visibility: "on",
			 	stylers: [
				 { "hue": "#0055ff" },
				 { "saturation": -100 },
				 { "lightness": 67 },
				 { "gamma": 0.62 }
			   ]
			 }
			];
		 	
			
			var styledMapOptions = {
			}
			
			var setMapType =  new google.maps.StyledMapType(stylez,styledMapOptions);
			
			map.mapTypes.set('park', setMapType);
			map.setMapTypeId('park');
		
	};
})(jQuery);


