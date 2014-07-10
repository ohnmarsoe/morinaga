(function($) {
	$(function() {
		var thisUrl = location.href;
		if(thisUrl.search("edit-tags.php") > 0) {
			var btnId;
			$('#upload_image_button').click(function() {
				formfield =$('#upload_image').attr('name');
				btnId = "#upload_image_button";
				tb_show('', 'media-upload.php?type=image&post_id=&TB_iframe=true');
				return false;
			});
			$('#upload_image_button02').click(function() {
				formfield02 =$('#upload_image02').attr('name');
				btnId = "#upload_image_button02";
				tb_show('', 'media-upload.php?type=image&post_id=&TB_iframe=true');
				return false;
			});
			window.send_to_editor = function(html) {
				if(btnId == '#upload_image_button') {

					imgurl = $('img',html).attr('src');
					$('#upload_image').val(imgurl);
				}else if(btnId == '#upload_image_button02') {
					
					imgurl02 = $('img',html).attr('src');
					$('#upload_image02').val(imgurl02);
				}
				tb_remove();
			}
		}

		//window.send_to_editor = function(html) {
		//	imgurl02 = $('img',html).attr('src');
		//	$('#upload_image02').val(imgurl02);
		//	tb_remove();
		//}

		//window.send_to_editor = function(html) {
		//	imgurl03 = $('img',html).attr('src');
		//	$('#upload_image03').val(imgurl03);
		//	tb_remove();
		//}
	});
})(jQuery);
