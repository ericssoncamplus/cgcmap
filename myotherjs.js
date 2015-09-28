$(document).ready(function() {
	var winwidth = $(window).width();
	var winheight = $(window).height();		

	var content = $("#content");
	content.css({
		width: (winwidth - 10)  + 'px',
		height: (winheight - 80) + 'px'
	});
});
