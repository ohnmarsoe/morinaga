var hostUrl = location.hostname;
hostUrl = "http://" + hostUrl;
var encodeHost = encodeURI(hostUrl);
var ua = navigator.userAgent.toLowerCase();


$(window).bind({
	load: function() {
		socialiteFunc();
		fbScialiteFunc();
		socialHover();
		archiveAuto();
		bodyClass();
		archiveImg();
		labelAction();
		labelActionTbl();
		//spHeight();
		hotAuto();
		newAuto();
		isAndroid();
		socialListHover();
		if($(window).width() < 601) {
			$("section.line2").prependTo("#content-wrap");
			$("section.line3").prependTo("#content-wrap");
		}
	},
	resize: function() {
		bodyClass();
		archiveImg();
		//spHeight();
		removeNone();
	}
});



/*--------------------------------------------------------------------
	windowサイズによってbodyにクラス名を付ける
--------------------------------------------------------------------*/

var bodyClass = function() {
	var ww = $(window).width();
	$("body").attr("class","");
	if(ww < 601) {
	//	$("body").addClass("sp");
	//	$("#icon-menu").removeClass("anim");
	//	$("div.label").removeClass("active");
	//	$("section.line1").addClass("top_index");
	//		$("#label1").addClass("active");
		$("body").addClass("sp");
		$("#label3").removeClass("active");
		$("#icon-menu").removeClass("anim");
	}else if(ww < 1025) {
		$("body").addClass("tbl");
		$("#label1").addClass("active");
		$("#label3").addClass("active");
	}else{
		$("body").addClass("pc");
	}
}


/*-------------------------------------------------------------------
	socialite.jsの処理
-------------------------------------------------------------------*/

var socialiteFunc = function() {
	var	articles = $('ul.sns-btns'), socialised = { }, win = $(window), updateArticles, onUpdate, updateTimeout;

	updateArticles = function()
	{
		// viewport bounds
		var	wT = win.scrollTop(),
			wL = win.scrollLeft(),
			wR = wL + win.width(),
			wB = wT + win.height();
		// check which articles are visible and socialise!
		for (var i = 0; i < articles.length; i++) {
			if (socialised[i]) {
				continue;
			}
			// article bounds
			var	art = $(articles[i]),
				aT = art.offset().top,
				aL = art.offset().left,
				aR = aL + art.width(),
				aB = aT + art.height();
			// vertial point inside viewport
			if ((aT >= wT && aT <= wB) || (aB >= wT && aB <= wB)) {
				// horizontal point inside viewport
				if ((aL >= wL && aL <= wR) || (aR >= wL && aR <= wR)) {
					socialised[i] = true;
					Socialite.load(articles[i]);
				}
			}
		}
	};

	onUpdate = function()
	{
		if (updateTimeout) {
			clearTimeout(updateTimeout);
		}
		updateTimeout = setTimeout(updateArticles, 100);
	};

	win.on('scroll', onUpdate);

	setTimeout(updateArticles, 100);
}



var fbScialiteFunc = function() {
	var	articles = $('div.fblike'), socialised = { }, win = $(window), updateArticles, onUpdate, updateTimeout;

	updateArticles = function()
	{
		// viewport bounds
		var	wT = win.scrollTop(),
			wL = win.scrollLeft(),
			wR = wL + win.width(),
			wB = wT + win.height();
		// check which articles are visible and socialise!
		for (var i = 0; i < articles.length; i++) {
			if (socialised[i]) {
				continue;
			}
			// article bounds
			var	art = $(articles[i]),
				aT = art.offset().top,
				aL = art.offset().left,
				aR = aL + art.width(),
				aB = aT + art.height();
			// vertial point inside viewport
			if ((aT >= wT && aT <= wB) || (aB >= wT && aB <= wB)) {
				// horizontal point inside viewport
				if ((aL >= wL && aL <= wR) || (aR >= wL && aR <= wR)) {
					socialised[i] = true;
					Socialite.load(articles[i]);
				}
			}
		}
	};

	onUpdate = function()
	{
		if (updateTimeout) {
			clearTimeout(updateTimeout);
		}
		updateTimeout = setTimeout(updateArticles, 100);
	};

	win.on('scroll', onUpdate);

	setTimeout(updateArticles, 100);
}

/*-------------------------------------------------------------------
	social画像にホバーしたらソーシャルボタンが出てくる
-------------------------------------------------------------------*/

var socialHover = function() {
	$('#home div.sns-count-box .hover-area').live('mouseenter', function() {
		var self = $(this);
		var permalink = self.parent().parent().find("div.img-box").find("a").attr("href");
		var encodePermalink = encodeURI(permalink);
		var title_plain = self.parent().parent().find("div.txt-box").find("a").text();
		var encodeTitle = encodeURI(title_plain);
		var pocket = '<iframe width="135" height="22" id="pocket-button-5" frameborder="0" allowtransparency="true" scrolling="NO" src="' + 'https://widgets.getpocket.com/v1/button?label=pocket&amp;count=horizontal&amp;v=1&amp;url=' + permalink + '&amp;title=' + title_plain + ';src=' + permalink + '&amp;r=0.9076863683294505'+ '"></iframe>';
		Socialite.load(self.parent().prev().find('ul')[0]);
		
		self.closest("article.post").find("li.pocket").append(pocket);
		setTimeout(function(){
			self.fadeOut(250, function() {
				self.parent().css({display: "none"});
			});
		}, 300);

		
		$.ajax({
		    url:'http://urls.api.twitter.com/1/urls/count.json',
		    dataType:'jsonp',
		    data:{
		        url:permalink
		    },
		    success:function(res){
				var count = res.count;
				if(count) {
					self.parent().prev().find("span.cnt").text(count);
					self.parent().prev().find("a.twtbtn").attr("href",'https://twitter.com/intent/tweet?original_referer=' + encodeHost + '&text=' + encodeTitle + '&tw_p=tweetbutton&url=' + encodePermalink);
				}else{
					self.parent().prev().find("span.cnt").text(count);
					self.parent().prev().find("a.twtbtn").attr("href",'https://twitter.com/intent/tweet?original_referer=' + encodeHost + '&text=' + encodeTitle + '&tw_p=tweetbutton&url=' + encodePermalink);
				}
		    },
		    error:function(){
				self.parent().prev().find("span.cnt").text(count);
				self.parent().prev().find("a.twtbtn").attr("href",'https://twitter.com/intent/tweet?original_referer=' + encodeHost + '&text=' + encodeTitle + '&tw_p=tweetbutton&url=' + encodePermalink);
		    }
		});

	});

}

var socialListHover = function() {
	$('#list div.sns-count-box .hover-area').live('mouseenter', function() {
		var self = $(this);
		var permalink = self.parent().parent().parent().parent().parent().find("div.img-box").find("a").attr("href");
		var encodePermalink = encodeURI(permalink);
		var title_plain = self.parent().parent().parent().parent().parent().find("div.txt-box").find("h2").find("a").text();
		
		var encodeTitle = encodeURI(title_plain);
		var pocket = '<iframe width="135" height="22" id="pocket-button-5" frameborder="0" allowtransparency="true" scrolling="NO" src="' + 'https://widgets.getpocket.com/v1/button?label=pocket&amp;count=horizontal&amp;v=1&amp;url=' + permalink + '&amp;title=' + title_plain + ';src=' + permalink + '&amp;r=0.9076863683294505'+ '"></iframe>';
		Socialite.load(self.parent().prev().find('ul')[0]);
		
		self.closest("article.post").find("li.pocket").append(pocket);
		setTimeout(function(){
			self.fadeOut(250, function() {
				self.parent().css({display: "none"});
			});
		}, 300);

		
				//console.log(permalink);
		$.ajax({
		    url:'http://urls.api.twitter.com/1/urls/count.json',
		    dataType:'jsonp',
		    data:{
		        url:permalink
		    },
		    success:function(res){
				var count = res.count;
				if(count) {
					self.parent().prev().find("span.cnt").text(count);
					self.parent().prev().find("a.twtbtn").attr("href",'https://twitter.com/intent/tweet?original_referer=' + encodeHost + '&text=' + encodeTitle + '&tw_p=tweetbutton&url=' + encodePermalink);
				}else{
					self.parent().prev().find("span.cnt").text(count);
					self.parent().prev().find("a.twtbtn").attr("href",'https://twitter.com/intent/tweet?original_referer=' + encodeHost + '&text=' + encodeTitle + '&tw_p=tweetbutton&url=' + encodePermalink);
				}
		    },
		    error:function(){
				self.parent().prev().find("span.cnt").text(count);
				self.parent().prev().find("a.twtbtn").attr("href",'https://twitter.com/intent/tweet?original_referer=' + encodeHost + '&text=' + encodeTitle + '&tw_p=tweetbutton&url=' + encodePermalink);
		    }
		});

	});

}




/*-------------------------------------------------------------------
	トップページラインナップ、レシピ、ブログの切り替え
-------------------------------------------------------------------*/
var labelAction = function() {
	
		$("body.sp #label1").find("a").live({
			click: function() {
				$("div.label").removeClass("active");
				$(this).parent().addClass("active");
				$("section.line").css("display", "none").removeClass("adr-current");
				$("section.line1").css("display", "block").addClass("adr-current");
				$("#content-wrap").removeAttr("style");
				$("html, body").animate({
					scrollTop: "152px"
				},0);
				return false;
			}
		});
		
		$("body.sp #label2").find("a").live({
			click: function() {
				$("div.label").removeClass("active");
				$(this).parent().addClass("active");
				$("section.line").css("display", "none").removeClass("adr-current");
				$("section.line2").css("display", "block").addClass("adr-current");
				$("#content-wrap").removeAttr("style");
				$("html, body").animate({
					scrollTop: "152px"
				},0);
				return false;
			}
		});
		
		$("body.sp #label3").find("a").live({
			click: function() {
				$("div.label").removeClass("active");
				$(this).parent().addClass("active");
				$("section.line").css("display", "none").removeClass("adr-current");
				$("section.line3").css("display", "block").addClass("adr-current");
				$("#content-wrap").removeAttr("style");
				$("html, body").animate({
					scrollTop: "152px"
				},0);
				return false;
			}
		});
	//}
}

//タブレットサイズのときの処理ここから
var labelActionTbl = function() {
	$("body.tbl #label2").find("a").live({
		click: function() {
			//HOT、NEWの幅を取得
				$("#label2, #label3").removeClass("active");
				$(this).parent().addClass("active");
				
				$("section.line3").css("display", "none");
				$("section.line2").css("display", "table-cell");
			return false;
		}
	});
	
	$("body.tbl #label3").find("a").live({
		click: function() {
	
				if(ua.indexOf('ipad') > 0 || ua.indexOf('android') > 0) {
					effectTime = 0;
				}else{
					effectTime = 250;
				}
				$("#label2, #label3").removeClass("active");
				$(this).parent().addClass("active");
	
				$("section.line2").css("display", "none");
				$("section.line3").css("display", "table-cell");
	
			return false;
		}
	});
}	

//タブレットサイズのときの処理ここから
var labelActionTbl = function() {
	$("body.tbl #label2").find("a").live({
		click: function() {
			//HOT、NEWの幅を取得
				$("#label2, #label3").removeClass("active");
				$(this).parent().addClass("active");
				
				$("section.line3").css("display", "none");
				$("section.line2").css("display", "table-cell");
			return false;
		}
	});
	
	$("body.tbl #label3").find("a").live({
		click: function() {
	
				if(ua.indexOf('ipad') > 0 || ua.indexOf('android') > 0) {
					effectTime = 0;
				}else{
					effectTime = 250;
				}
				$("#label2, #label3").removeClass("active");
				$(this).parent().addClass("active");
	
				$("section.line2").css("display", "none");
				$("section.line3").css("display", "table-cell");
	
			return false;
		}
	});
}	


/*-------------------------------------------------------------------
	androidだった場合の初期設定
-------------------------------------------------------------------*/
var isAndroid = function() {
	if(ua.indexOf('android') > 0) {
		$("#home section.line").css({
			position: "static",
		}).not("section.top_index").css({
			display: "none"
		});
		
		$("#content-wrap").css({
			height: "auto"
		});
	}
}


/*-------------------------------------------------------------------
	トップページラインナップ、レシピ、ブログの切り替え
-------------------------------------------------------------------*/

var spHeight = function() {

	if( $("body").attr("id") == "home" ) {
		if($("body").hasClass("sp")) {
			if( ua.indexOf("iphone") > 0 || ua.indexOf("ipod") > 0 || ua.indexOf("android") > 0 ) {
				$("body").bind({
					touchstart: function() {
						heightEven();
					}
				});
			}else{
				$(window).bind({
					scroll: function() {
						heightEven();
					}
				});
			}
		}
	}

	var heightEven = function() {
		setTimeout(function() {
			
			if($("section.current").length > 0) {
				$("body.sp #content-wrap").css({
					height: $("section.current").height() + "px"
				});
			}else{
				$("body.sp #content-wrap").css({
					height: $("section.top_index").height() + "px"
				});
			}
				
		}, 0);
	}

}







var removeNone = function() {

	if($("body").hasClass("tbl") && $("section.line3").width() < 400) {
		$("#loading01").find("div.inner").css({
			width: $("section.line3").width() * 0.9 + "px"
		});
		//$("#loading01").fadeOut(250, function() {
		//});
	}else if($("body").hasClass("tbl") && $("section.line3").width() > 400) {
		$("#loading01").find("div.inner").css({
			width: "400px"
		});
	}

	if($("body").hasClass("pc") || $("body").hasClass("tbl")) {
		$("section.line1, section.line2,  section.line3").removeAttr("style");
		$("section.top_index").removeClass("top_index");
		var section1 = $("section.line1");
		var section2 = $("section.line2");
		var section3 = $("section.line3");
		if(!section2.prev().hasClass('line1') || !section2.next().hasClass("line3")) {
			$("#content-wrap").append(section1).append(section2).append(section3);
		}
	}


}



/*-------------------------------------------------------------------
	PC用アーカイブオートロード
-------------------------------------------------------------------*/


var archiveAuto = function() {
	if($("#archive-template").length > 0){
		var bottom_flag = false;
		var auto_load_enabled = true;
		var ajaxFlag = 0;
		var jsonUrl = '/api/get_posts';
		var offset = $("#list-inner").find("article.post").length;
		var showposts = 5;
		var template = $("#archive-template").html();
		var compiled = _.template(template);
		var sort_type = $("#sort_type").attr("value");
		var sort_value = $("#sort_value").attr("value");
	
	
		$(window).bind("scroll", function() {

			if($("#list-inner").length > 0) {
				var sec1Y = $("#list-inner").find("article").last().offset().top - $(window).height();
				if ( $(window).scrollTop() > sec1Y) {
					if($("#list-inner").length > 0 && $("body").hasClass("pc")) {
						ajaxFunc();
					}
				}
			}
		});
	
		$("#loadbtn").bind({
			click: function() {
				ajaxFunc();
				return false;
			}
		});
	
	
		var ajaxFunc = function() {
			var joinHtml;
			var htmlArray = [];
	
			var dataObj = {};
			if(sort_type == "post_type") {
				dataObj = {
					'offset': offset,
					'showposts': showposts,
					'post_type': sort_value
				}
			}else if(sort_type == 's'){
				dataObj = {
					'offset': offset,
					'showposts': showposts,
					's': sort_value,
					'post_type': 'blog-press'

				}

			}else{
				dataObj = {
					'offset': offset,
					'showposts': showposts,
					'taxonomy': sort_type,
					'term': sort_value
				}
			}
	
			if(ajaxFlag == 0) {
				ajaxFlag = 1;
				$.ajax({
				    type: 'get',
					dataType: 'json',
				    url: jsonUrl,
				    data: dataObj,
				    success: function(data) {
						offset = offset + showposts;
						_.each(data.posts, function(val) {
	
	
							//thumbnail = thumbnail.url;
							var pcImg, spImg, content, category, time, badgeClass, badgeLink;
							if(val.thumbnail_images['w260-h144'].url) {
								pcImg = val.thumbnail_images['w260-h144'].url;
							}else{
								pcImg = val.thumbnail['medium'];
							}
							var spImg = val.thumbnail_images['w90-h90'].url;
			

	
							if($(window).width() > 640) {
								thumb = pcImg;
							}else{
								thumb = spImg;
							}
	
							content = val.excerpt;
							content = content.replace("<p>", "");
							content = content.replace("</p>", "");
							content = content.replace("[&hellip;]", "...");
	
							var obj = {
								permalink: val.url,
								title: val.title,
								image: thumb,
								spImg: spImg,
								pcImg: pcImg,
								type: val.type,
								content: content,
								thumb: thumb
							}
							htmlArray[htmlArray.length] = compiled(obj);
						});
	
						joinHtml = htmlArray.join('');
						if(joinHtml.length) {
							$("#loading").removeClass("is-none");
						}
	
						setTimeout(function() {
							
							$("#list-inner").append(joinHtml);
	
							for(var i = 0; i < $("#list-inner article.pbloc-list.is-none").length; i++) {
								fadeInBox(i,"#list-inner article.pbloc-list.is-none");
								$("#loading").addClass("is-none");
							}
	
						}, 1000);
						if(offset < data.count_total) {
							ajaxFlag = 0;
						}else{
							$("#loadbtn").remove();
						}
				    },
					error: function() {
						
					}
				});
	
			}
		}
	}
}


var archiveImg = function() {
	if( $(window).width() < 641 && ( ua.indexOf("iphone") < 0 || ua.indexOf("ipod") < 0 || ua.indexOf("android") < 0) ) {

		$("#list-inner").find("div.img-box").find("img").each(function() {
			$(this).attr("src", $(this).parent().parent().attr("data-thumbnail"));
		});
		
	}else{
		$("#list-inner").find("div.img-box").find("img").each(function() {
			$(this).attr("src", $(this).parent().parent().attr("data-origin"));
		});
	}
	
}


/*-------------------------------------------------------------------
	トップページのホットオートロード
-------------------------------------------------------------------*/

var hotAuto = function() {
	if($("#hot-template").length > 0) {
		var bottom_flag = false;
		var auto_load_enabled = true;
		var ajaxFlag = 0;
		var jsonUrl = '/api/get_posts';
		var offset = $("section.line2").find("article").length;
		//var offset = 0;
		var showposts = 2;
		var postType = 'blog-press-marketplace-maintenance';
		var template = $("#hot-template").html();
		var compiled = _.template(template);
		var idArray = [];
		idArray.push(parseInt( ( $("section.line2").find("article.post").last().attr("data-id") ) ));
	
	
		$(window).bind("scroll", function() {
			
			if(!$("body").hasClass("sp") && !$("body").hasClass("tbl")) {
				var sec2Y = $("section.line2").find("article").last().offset().top;
				if(( $(window).height() + $(window).scrollTop() ) > sec2Y) {
				
					//if( $("section.line3").find("div.line-inner").height() < $("section.line2").find("div.line-inner").height() ) {
						ajaxFunc();
					//}
				}

			}

		});
	
		$("#loadbtn-hot").bind({
			click: function() {
				ajaxFunc();
				return false;
			}
		});
	
	
		var ajaxFunc = function() {
			var joinHtml;
			var htmlArray = [];
	
			var dataObj = {};
				dataObj = {
					'offset': offset,
					'showposts': showposts,
					'post_type': postType,
					'meta_key': 'views',
					'orderby': 'meta_value_num',
					'order': 'desc'
				}
	
			if(ajaxFlag == 0) {
				ajaxFlag = 1;
				$.ajax({
				    type: 'get',
					dataType: 'json',
				    url: jsonUrl,
				    data: dataObj,
					cache: false,
				    success: function(data) {
						//console.log(data);
						var postNum = 0;

						_.each(data.posts, function(val) {
						//console.log(idArray);
						//console.log(val.id, __a, $.inArray(val.id, __a));
						if ( $.inArray(val.id, idArray) !== -1 ) {
								//console.log("今：" + val.id);
								//console.log('かぶってるyp');
								postNum++;
								return false;
						}
						idArray.push(val.id);
							
							if(val.thumbnail_images && val.thumbnail_images['w350-h194'].url) {
								thumbnail = val.thumbnail_images['w350-h194'].url;
							}else if(val.thumbnail_images && val.thumbnail_images['full'].url){
								thumbnail = val.thumbnail_images['full'].url;
							}else{
								thumbnail = '';
							}
							var time;

							time = "";
	
	
							var dayArray = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	
							time = val.date;
							time = time.split(' ');
							time01 = time[0].split('-');
							time = time01[0] +'.'+ time01[1] + '.' + time01[2];
	
	
	
							var obj = {
								permalink: val.url,
								title: val.title,
								image: thumbnail,
								time: time
							}

							htmlArray[htmlArray.length] = compiled(obj);
							
						});
						joinHtml = htmlArray.join('');
						$("section.line2 div.line-inner").append(joinHtml);
						for(var j = 0; j < $("section.line2 article.is-none").length; j++) {
							fadeInBox(j, "section.line2 article.is-none");
						}
						//offset = offset + showposts;
						offset = offset + postNum;
						if(offset < data.count_total ) {
							ajaxFlag = 0;
						}else{
							$("#loadbtn-hot").remove();
						}
				    },
					error: function() {
					}
				});
	
			}
		}
	}
}



/*-------------------------------------------------------------------
	トップページのニューオートロード
-------------------------------------------------------------------*/

var newAuto = function() {
	if($("#new-template").length > 0) {
		var bottom_flag = false;
		var auto_load_enabled = true;
		var ajaxFlag = 0;
		var jsonUrl = '/api/get_posts';
		var offset = $("section.line3").find("article").length;
		//var offset = 0;
		var showposts = 2;
		var postType = 'blog-press-marketplace-maintenance';
		var template = $("#new-template").html();
		var compiled = _.template(template);
	
	
	
		$(window).bind("scroll", function() {

			if(!$("body").hasClass("sp") && !$("body").hasClass("tbl")) {
				var sec3Y = $("section.line3").find("article").last().offset().top;
					if(( $(window).height() + $(window).scrollTop() ) > sec3Y) {
					
						//if( $("section.line3").find("div.line-inner").height() < $("section.line2").find("div.line-inner").height() ) {
							ajaxFunc();
						//}
					}

			}
		});
	
		$("#loadbtn-new").bind({
			click: function() {
				ajaxFunc();
				return false;
			}
		});
	
	
		var ajaxFunc = function() {
			var joinHtml;
			var htmlArray = [];
	
			var dataObj = {};
			dataObj = {
				'offset': offset,
				'showposts': showposts,
				'post_type': postType
			}
	
			if(ajaxFlag == 0) {
				ajaxFlag = 1;
				$.ajax({
				    type: 'get',
					dataType: 'json',
				    url: jsonUrl,
				    data: dataObj,
				    success: function(data) {
						offset = offset + showposts;
						_.each(data.posts, function(val) {
	
	
							var content, time, time01, time02, hour;


							if(val.thumbnail_images['w581-h322'] && val.thumbnail_images['w581-h322'].url) {
								thumbnail = val.thumbnail_images['w581-h322'].url;
							}else if(val.thumbnail_images && val.thumbnail_images['full'].url){
								thumbnail = val.thumbnail_images['full'].url;
							}else{
								thumbnail = '';
							}
			
	
							if(val.custom_fields.list_text) {
								content = val.custom_fields.list_text;
							}else{
								content = val.excerpt;
								content = content.replace("<p>", "");
								content = content.replace("</p>", "");
								content = content.replace("[...]", "...");
							}
	
							time = val.date;
							time = time.split(' ');
							time01 = time[0].split('-');
							time02 = time[1].split(':');
							hour = time02[0] + ':' + time02[1];
							time = time01[0] +'.'+ time01[1] + '.' + time01[2];

							var obj = {
								permalink: val.url,
								title: val.title,
								image: thumbnail,
								content: content,
								time: time,
								hour: hour
							}
	
							htmlArray[htmlArray.length] = compiled(obj);
							
						});
						joinHtml = htmlArray.join('');
						$("section.line3 div.line-inner").append(joinHtml);
						for(var i = 0; i < $("section.line3 article.is-none").length; i++) {
							var thisIndex = $("section.line3 article").index($("section.line3 article.is-none").eq(i));
							fadeInBox(i, "section.line3 article.is-none");
						}
						if(offset < data.count_total ) {
							ajaxFlag = 0;
						}else{
							$("#loadbtn-new").parent().parent().remove();
						}
				    },
					error: function() {
					}
				});
			}
		}
	}
}


//順番にフェードインさせる関数
function fadeInBox(num, selector) {

	
	if($(selector).eq(num).prev().hasClass("ad_container")) {
		$(selector).eq(num).prev().fadeIn(300, function() {
			$(this).removeClass("is-none");
		});
	}

	$(selector).eq(num).delay(300*num).fadeIn(300, function() {
		$(this).removeClass("is-none");
	});
}


