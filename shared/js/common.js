$(window).bind({
	load: function() {
		spNavReverse();
	}
});
	var imgWidth, ty, labelSecH, ua, sliderTimer, labelSecPos;

	ua = navigator.userAgent.toLowerCase();
	
	jQuery.easing['jswing'] = jQuery.easing['swing'];
	
	jQuery.extend( jQuery.easing,{
		def: 'easeOutQuad',
		easeOutQuart: function (x, t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeOutQuint: function(e, f, a, h, g) {
			return h * ((f = f / g - 1) * f * f * f * f + 1) + a
		},
		easeInOutQuint: function(e, f, a, h, g) {
			if ((f /= g / 2) < 1) {
				return h / 2 * f * f * f * f * f + a
			}
			return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
		},
		easeOutExpo: function(e, f, a, h, g) {
			return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a
		},
		easeInOutExpo: function(e, f, a, h, g) {
			if (f == 0) {
				return a
			}
			if (f == g) {
				return a + h
			}
			if ((f /= g / 2) < 1) {
				return h / 2 * Math.pow(2, 10 * (f - 1)) + a
			}
			return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
		}
	});
	
	var isTop;
	var firstHeight;
	
	//最初に実行する関数
	$(window).on({
		load: function() {
			slider_position();
			setTimeout(function(){
				$('#slider ul').css({
					display : 'none',
					'visibility': 'visible'}).fadeIn(500);
			},200);
			
			imgWidth = $("#slider-wrap li").width() + parseInt($("#slider-wrap li").css("marginLeft")) * 2;
			
			autoSlide(true);
			
			firstHeight = $("#bst-wrap").height();
			contentHeight();
		},
		resize: function() {
			slideWidth();
			slider_position();
			imgWidth = $("#slider-wrap li").width() + parseInt($("#slider-wrap li").css("marginLeft")) * 2;
			
			if($("#top-wrap").length > 0) set_position();
			
			contentHeight();
		},
		scroll: function() {
		
			if($("#top-wrap").length > 0) set_position();
			
		}

	});

	//#リンク
	$('a[href^=#]').click(function(e) {
      e.preventDefault();
	});



/* fixedしているラベルの動きにアニメーション(スマホ時)
-------------------------------------------------------------------------------------*/
	var labelSecTop = 0;
	var ita = 0;
	var isScr = false;
	
	var $label = $('#label-sec');
	var $labelHeight = $('#label-wrap').height();
	
	$label.css({'-webkit-transform': 'translate3d(0,0,0)'});
	function set_position() {
		var sy = $(window).scrollTop();
		
		if ($(window).width() > 768) {
			labelSecH = 220;
			labelSecPos = 100;
			labelSecTop = 320;
			
		} else if ($(window).width() > 568) {
			labelSecH = 220;
			labelSecPos = 106;
			labelSecTop = 326;
			
		} else {
			labelSecH = 126;
			labelSecPos = 100;
			labelSecTop = 226;
		}
		
		
		if (sy >= labelSecH) {
			
			if(ua.indexOf("android") > 0) {
				
				$label.css({
					position: 'absolute',
					top: sy - labelSecH - 1
				});
				
				$label.addClass("bgcolor");
				
				$("#slider-wrap ul").addClass("is-visible");
				//$("#bst-wrap").addClass("bgfff");
			
			} else {
				
				
				if (ua.indexOf('iphone') > 0 || ua.indexOf('ipad') > 0 || ua.indexOf('ipod') > 0) {
					if (sy > labelSecH + $labelHeight) $label.addClass("mov");
					$("#bst-wrap").addClass("bgfff");
				}
				
				$label.css({
					position: 'fixed',
					top: labelSecPos +'px'
				});
				
				
				$label.addClass("bgcolor");
				
				$("#slider-wrap ul").addClass("is-visible");
				
				ita = sy;
				$label.off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd');
				
				isScr = false;
			}
						
		} else {
			
			if(ua.indexOf("android") > 0) {
				
				$label.css({
					position: 'absolute',
					top: 0 +'px'
				});
				
				$label.removeClass("bgcolor");
				
				$("#slider-wrap ul").removeClass("is-visible");
				//$("#bst-wrap").removeClass("bgfff");
			
			} else {
			
				$label.removeClass("bgcolor");
				$("#bst-wrap").removeClass("bgfff");
				
				if (ua.indexOf('iphone') > 0 || ua.indexOf('ipad') > 0 || ua.indexOf('ipod') > 0) {
					
					if (ita >= labelSecH) {
						
						$label.addClass("mov").css({
							top: labelSecTop - sy
						}).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function() {
							
							$(this).removeClass("mov");
							
							$(this).css({
								position: 'absolute',
								top: 0
							});
							
							$("#slider-wrap ul").removeClass("is-visible");
							
							
							isIn = false;
						});
						
						isScr = true;
						ita = sy;
						
						return false;
						
						
					} else {
						
						if (!isScr) {
						
							$label.removeClass("mov").css({
								position: 'absolute',
								top: 0
							});
							
							$label.off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd');
							$("#slider-wrap ul").removeClass("is-visible");
						}
						isScr = false;
					}
				
				} else {
					
					$label.removeClass("mov").css({
						position: 'absolute',
						top: 0
					});
					$("#slider-wrap ul").removeClass("is-visible");
				
				}
			}
			
		}
		
		if (sy >= labelSecH) {
			autoSlide(false);
		} else {
			autoSlide(true);
		}
		
		/* スライダーは白くふんわり
		-------------------------------------------*/	
		var baseY = 0;
		
		if ($(window).width() > 768) {
			if(ua.indexOf("msie") > 0){
				$('#slider ul').css({
					top: baseY - sy/2
				});
			}else{
				$('#slider ul').css({
					top: baseY - sy/2,
					opacity: 1 - ((sy-50)/100)
				});
			}
		}
	};
	


/* スライド画像を画角で切り替えます
-----------------------------------------------*/
function slideWidth() {
	var windowW = $(window).width();
	if(windowW <= 568 ) {
		
		$("#slider").find("ul").find("a").find("img").each(function() {
			$(this).attr({
				src: $(this).attr("data-sp")
			});
		});
	}else{
		$("#slider").find("ul").find("a").find("img").each(function() {
			$(this).attr({
				src: $(this).attr("data-pc")
			});
		});
	}
	
}

slideWidth();

/* スライダーのポジション
-----------------------------------------------*/
function slider_position() {
	var wW = $(window).width();
	var sliderW = $('#slider ul').outerWidth(true);
	var sliderImgW = $('#slider li').outerWidth(true);
	var sliderPos = wW/2 - ((sliderImgW/2)*3);
	
	if (wW > $("#slider-view").width()) sliderPos = 0;
	
	$('#slider-wrap').css({
		left: sliderPos
	});
	if (wW < 768) {
		$('#slider ul').css({
			top: 0,
			opacity: 1
		});
	}
	
}

/* 自動でスライドさせます
-----------------------------------------------*/
	
	//3つの時
	var sliderLength = $("#slider-wrap li").length;
	if (sliderLength == 3) $("#slider-wrap li").eq(0).clone().appendTo("#slider-wrap ul");
	
	var slideTimer = null;
	var switchDelay = 6000;
	function autoSlide(bool) {
		
		if (bool) {
		
		  if (slideTimer !== null) return;			
			
			$("#slider-wrap").each(function(){
				var targetObj = $(this);
				var findUl = targetObj.find('ul');
				
				slideTimer = setInterval(function(){
					
					findUl.animate({marginLeft: -1 * imgWidth + "px"}, 800, "easeOutExpo", function() {
						
						if (sliderLength == 3) {
							$("#slider-wrap li").eq(0).remove().end().eq(1).clone().appendTo("#slider-wrap ul");
						} else {
							$("#slider-wrap li").eq(0).appendTo("#slider-wrap ul");
						}
						
						$("#slider-wrap ul").css({
							marginLeft: 0
						});
						
					});
					
				},switchDelay);
		
			});
		
		} else {
			clearInterval(slideTimer);
			slideTimer = null;
		}
	};
	

var subArr = ["#nav-submenu1","#nav-submenu2","#nav-submenu3","#nav-submenu4"];

var menuOpenFlg = false;

/* スマホメニュー
-----------------------------------------------*/
var smpMenuHeight;
function smpMenuHeightInit() {
	
	$("#nav, #smp-nav-wrap > ul").css({
		visibility: "hidden",
		display: "block"});
	
	var ulHeightArr = [];
		for (var i=0; i < subArr.length; i++) {
		  ulHeightArr.push($(subArr[i]).height());
		}
		var subMenuHeight = Math.max.apply(null, ulHeightArr);
		
		smpMenuHeight = Math.max($("#nav-smpmenu").height(),subMenuHeight);
		
		if (smpMenuHeight > $(window).height()) {
		
			$("#nav").css({
				height: smpMenuHeight + "px"
			}).css({
			visibility: "visible",
			display: "none"});
		
		} else {
			$("#nav").css({
				height: $(window).height() + "px"
			}).css({
			visibility: "visible",
			display: "none"});
		}
		
		$("#smp-nav-wrap > ul").css({
		visibility: "visible",
		display: "none"});

}

smpMenuHeightInit();

$.easing.quart = function (x, t, b, c, d) { return -c * ((t=t/d-1)*t*t*t - 1) + b; };

/* スマホメニュー OPEN
-----------------------------------------------*/
$("#smp-menu a").click(function(){
	
	
	
		var menuBtn = $(this);
		
		$("#bst-wrap").removeAttr("style");
		$("#nav-smpmenu").css({display: "block"});
		
		//$('html,body').stop().animate({scrollTop:0}, 500, 'quart');
		$('html,body').stop().animate({scrollTop:0}, 0);
		
		$("#nav").slideToggle("fast", function(){
			if ($(this).css('display') == 'none') {
				/*close*/
				menuOpenFlg = false;
				menuBtn.find('img').css({ opacity: 1});
				
				$("#smp-nav-wrap").find("ul").removeClass("anim").removeClass("lower");
				autoSlide(true);
				
			} else {
				
				if ($(window).height() < smpMenuHeight + $("#header-wrap").height()) {
					$("#bst-wrap").css({height: smpMenuHeight + $("#header-wrap").height()});
					$("#nav").css({ position: 'absolute'});
					
				} else {
					$("#nav").css({ position: 'fixed'});
				}
				
				/*open*/
				menuOpenFlg = true;
				menuBtn.find('img').css({ opacity: 0.5});
				
				
				autoSlide(false);
			}
		});
	
	
		
});

var oldNum = 0;
$("#nav ul li.sub a").click(function(){
	
	var href= $(this).attr("href");
	var btnNum = href.split("-")[1]-1;
	
	$(subArr[oldNum]).hide();
	$(subArr[btnNum]).show(0,function(){
	
    	$("#smp-nav-wrap").find("ul").addClass("anim").addClass("lower");
	});
	
	oldNum = btnNum;
});

$("#nav ul li.dl-back a").click(function(){
    $("#smp-nav-wrap").find("ul").removeClass("lower");
		if(ua.indexOf("android") < 0) {
			$("#smp-nav-wrap").removeAttr("style");
		}
	}
);

var spNavReverse = function() {
	$(window).bind({
		resize: function() {
			if($(window).width() > 768) {
				
				if ($("#nav").css('display') == 'block') {
					$("#nav").css({display: "none"});
					
					menuOpenFlg = false;
					$("#smp-menu a").find('img').css({ opacity: 1});
					
					$("#smp-nav-wrap").find("ul").removeClass("anim").removeClass("lower");
					autoSlide(true);
				}
				
			}
		} 
	});
}




/* パンクズラベルのとこ
-----------------------------------------------*/

$(window).bind('load resize', function() {
		//var dateWidth = ($(window).width() < 568) ? 0 : $('#date').outerWidth();
		var dateWidth = ($('#date').css('display') == 'none') ? 0 : $('#date').outerWidth();
		var liWidth = Math.floor($('#label-pkz').width() - $('#pankuzu li:first-child').width() - dateWidth);
		$("#pankuzu li .title-txt").css({ width: liWidth-5 });
		
		var liWidthS = Math.floor($('#label-pkz').width());
		$("#pankuzu li .single-txt").css({ width: liWidthS-5 });
	});



/* ie8 で投稿imgの height:auto が出来ない用
-----------------------------------------------*/

if (ua.indexOf("msie") != -1){
	//$(window).bind('load resize', function() {
	$("#post-inner .article-content img").each(function(){
		var imgw = $(this).attr('width');
		
		if (imgw > 701) $(this).css({ width: 100 +'%',height: 'auto'});
		/*
		if (imgw > $(this).parent().width()) {
			$(this).css({ width: 100 +'%',height: 'auto'});
		} else {
			$(this).css({ width: 'auto',height: 'auto'});
		}
		*/
	});
	//});
}


/* 投稿imgの キャプション付きの場合
-----------------------------------------------*/

$('.wp-caption').each(function() {
	var divW = $(this).css("width");
	$(this).removeAttr("style").css({ "max-width": divW, "height": 'auto' });
});


/*footer
----------------------------------------------*/
function contentHeight() {
	
	if ($(window).width() > 1024) {
		if ($(window).height() < firstHeight) {
			$("body").css({'overflow': 'auto'});
			$("#content-wrap").css({'height': 'auto'});	
		} else {
			var newH = Math.floor($("#footer").height() + $("#label-bg").height() + parseInt($("#top-wrap, #post-wrap").css("marginTop")));
			$("#content-wrap").css({'height': $(window).height() -newH});
			$("body").css({'overflow': 'hidden'});
		}
	} else {
		$("body").removeAttr("style");
		$("#content-wrap").removeAttr("style");
	}
	
};


/* 検索ボタン
------------------------------------------------------------------------------------------*/
	$("#gm-search-input").find("span.search-input-text").css({
		width: 0,
		overflow: "hidden",
	});
	
	var isSearchOpen = false;
	$("#gm-search-btn").find("a").toggle(function() {
		
		isSearchOpen = true;
		
		var wWth = $(window).width();
		var movePos = (wWth < 530)? 170 : 240;
		
		setTimeout(function(){
		$("#gm-search-input").css({
			display: "block"
		});
		},20);
		
		
		$("#gm-search-input").find("span.search-input-text").stop().animate({
				width: movePos + "px"
			},250);
			
			
		if ((wWth < 1080 && wWth > 768) || wWth < 460) {
		$("#logo-wrap").stop().animate({
			marginLeft: -movePos + "px"
		},250);
		}

		return false;
	},function() {
		
		isSearchOpen = false;
		
		$("#gm-search-input").find("span.search-input-text").stop().animate({
				width: 0
			},250, function(){
				$("#gm-search-input").css({
				display: "none"
				});
				$(this).find("input").attr('value','');
			});
		$("#logo-wrap").stop().animate({
			marginLeft: 0
		},250);
		
		
		return false;
	});
	
	$(window).resize(function() {
		if (isSearchOpen && $(window).width() > 568) {
			isSearchOpen = false;
			$("#gm-search-btn").find("a").trigger("click");
		}
	});







