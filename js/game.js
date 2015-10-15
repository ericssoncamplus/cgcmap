var game = function() {
    var timout;
    function init(level, finished) {
        var totalMoves = 0;
        var time = -1;
        var data = level.data;
        var leters = ['a', 'b', 'c', 'd', 'e'];
        var totrow = data.length;
        var totcol = data[0].length;
        var html = '<div class="ui-grid-' + leters[totcol - 2] + '">';		
		
        clearInterval(timout);
        $.each(data, function(i) {
            var self = this;
            $.each(self, function(j) {
                html += '<div class="ui-block-' + leters[j % 5 ] + ' light style_border">';
                if (data[i][j] === 1) {
                    html += '<div class="ui-bar ui-bar-c"><img width="100%" height="100%" src="css/images/ECON_white2.png"/></div>';
                } else {
                    html += '<div class="ui-bar ui-bar-b"><img width="100%" height="100%" src="css/images/ECON_white2.png"/></div>';
                }
                html += '</div>';
            });
        });
        html += '</div>';				
        $("#grid").html(html);
		
		$window_width = $(window).width() - 40;
		if(totcol - 2 === 1) {
			$width = $window_width / 3;							
		}
		if(totcol - 2 === 2) {
			$width = $window_width / 4;			
		}
		if(totcol - 2 === 3) {
			$width = $window_width / 5;	
		}
		$each_height = $width + "px";	
		$("#grid div div").height($each_height);
				
        $("#grid  div.light").on("click", function() {							
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