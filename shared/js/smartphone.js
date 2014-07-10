if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
	window.addEventListener('load', function () {
		setTimeout(doScroll, 100);
	}, false);
	
	window.onorientationchange = function() {
		setTimeout(doScroll, 100);
	};  
	
	function doScroll() {
		if (window.pageYOffset === 0) {
			window.scrollTo(0, 1);
		}
	}

};

