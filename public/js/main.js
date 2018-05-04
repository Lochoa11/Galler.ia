(function($) {
    $('.bxslider').bxSlider({
    	auto: true,
    	autoControls: true,
    	stopAutoOnClick: true,
    	pager: false,
    	slideWidth: 600
    });
    $('#newPassword, #newPasswordRetyped').on('keyup', function(){
    	if ($('#newPassword').val() == $('#newPasswordRetyped').val()) {
            $(".submit-password").prop("disabled", false);
            $('#message').html('Matching').css('color', 'green');
    	} 
    	else{
            $(".submit-password").prop("disabled", true);
	        $('#message').html('Not Matching').css('color', 'red');
    	} 
    });

})(jQuery); // End of use strict
