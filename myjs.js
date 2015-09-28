$(document).ready(function() {
	var winwidth = $(window).width();
	var winheight = $(window).height();		
	
	var pstyle1 = $("#pstyle1");
	pstyle1.css({
		width: (winwidth / 3 - 10)  + 'px',
		height: (winheight / 4 + 3) + 'px'
	});
	var pstyle2 = $("#pstyle2");
	pstyle2.css({
		width: (winwidth / 3 - 10)  + 'px',
		height: (winheight / 4 + 3) + 'px'
	});
	var pstyle3 = $("#pstyle3");
	pstyle3.css({
		width: (winwidth / 3 - 10)  + 'px',
		height: (winheight / 4 + 3) + 'px'
	});
});
