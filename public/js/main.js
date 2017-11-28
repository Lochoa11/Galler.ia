(function($) {
    $('.bxslider').bxSlider({
    	auto: true,
    	autoControls: true,
    	stopAutoOnClick: true,
    	pager: true,
    	slideWidth: 600
    });
    $('#newPassword, #newPasswordRetyped').on('keyup', function(){
    	if ($('#newPassword').val() == $('#newPasswordRetyped').val()) {
	        $('#message').html('Matching').css('color', 'green');
    	} 
    	else{
	        $('#message').html('Not Matching').css('color', 'red');
    	} 
    });

})(jQuery); // End of use strict
