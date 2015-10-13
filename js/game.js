var game = function() {
    var timout;
    function init(level, finished) {
        var totalMoves = 0;
        var time = -1;
        var data = level.data;
        var leters = ['a', 'b', 'c', 'd', 'e'];
        var totrow = data.length;
        var totcol = data[0].length;
        var html = '<div data-role="huangshouxi" class="ui-grid-' + leters[totcol - 2] + ' ui-grid-height-x ">';
		//var $grid_width = $("div[data-role=huangshouxi]").width();
		//var $window_width = $(window).width();		
		//alert($grid_width);
        clearInterval(timout);
        $.each(data, function(i) {
            var self = this;
            $.each(self, function(j) {
                html += '<div class="ui-block-' + leters[j % 5 ] + ' light">';
				/*$grid_width = $(".light").width();
				$grid_width = $grid_width + "px";*/
                if (data[i][j] === 1) {
                    html += '<div class="ui-bar ui-bar-c"><img width="100%" height="100%"  src="css/images/ECON_white2.png"/></div>';
                } else {
                    html += '<div class="ui-bar ui-bar-b"><img width="100%" height="100%" src="css/images/ECON_white2.png"/></div>';
                }
                html += '</div>';
            });
        });
        html += '</div>';				
        $("#grid").html(html);
		
		//var $grid_width = $("div[data-role=huangshouxi]").width();
		//var $grid_width = $("div[data-role=content]").width();
		//var $grid_width = $("#grid").width();
		//alert($grid_width);
		
		var $window_width = $(window).width();
		var $each_grid_height = $window_width - 32;	
		$each_grid_height = $each_grid_height + "px";
		$("#grid").height($each_grid_height);
		
        $("#grid  div.light").on("click", function() {
			//alert($grid_width);
			//alert($window_width);
			//alert($each_grid_height);
			//alert($grid_width);
			
			
            var index = $(this).index();
            var col = index % totcol;
            var row = (index - col) / totcol;
            toggle(index);
            toggle(rowcol2index(col + 1, row));
            toggle(rowcol2index(col - 1, row));
            toggle(rowcol2index(col, row + 1));
            toggle(rowcol2index(col, row - 1));
            totalMoves++;
            if (isFinish()) {
                clearInterval(timout);
                finished(totalMoves, time);
            }
        });
        var timeoutFn = function() {
            time++;
            $("#time").html('<span class="ui-btn-inner"><span class="ui-btn-text">计时 : ' + time + ' 秒</span></span>'); 
        }
        timeoutFn();
        timout = setInterval(timeoutFn, 1000);
        function rowcol2index(col, row) {
            if (col < 0 || row < 0 || col >= totcol || row >= totrow)
                return -1;
            else
                return row * totcol + col;
        }
        function toggle(index) {
            if (index < 0 || index >= totrow * totcol)
                return;
            $($("#grid div.light")[index]).children().toggleClass("ui-bar-b").toggleClass("ui-bar-c");
        }
        function isFinish() {
            for (var i = 0; i < totrow * totcol; i++) {
                if ($($("#grid div.light")[i]).children().hasClass('ui-bar-c'))
                    return false;
            }
            return true;
        }
    }	

    return {
        init: init
    }	
	
}();