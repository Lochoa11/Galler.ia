$(document).ready(function(){

	$("#myId").dropzone({ url: "/images" });

	$('.bxslider').bxSlider({
        auto: true,
        autoControls: true,
        stopAutoOnClick: true,
        pager: true,
        slideWidth: 600
      });

});