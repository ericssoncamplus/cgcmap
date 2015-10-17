$(document).on("pagebeforechange", function(e, data) {
    if (typeof data.toPage !== 'string') {
        return;
    }
    currentLevel = parseInt(window.localStorage.getItem("level")) || 0; // from persistent
    $.mobile.showPageLoadingMsg();
    var page = data.toPage.toString().split("#");
    var toPagePrefix = page[0];
    var toPage = page[1].toString().split("?")[0];
	
	//alert(toPagePrefix);
 
    switch (toPage) {
        case "game":
        case "retry":
            g = new game.init(level[currentLevel], finishedGame);
            toPage = "game";
            break;
        case "next" :
            var nextlevel = parseInt(getUrlVars()["nextLevel"]) || 0;
            if (nextlevel < level.length - 1) {
                toPage = "game";
                g = new game.init(level[nextlevel], finishedGame);
            } else {
                toPage = "finished";
            }
            currentLevel = nextlevel;
            break;
        case "pre":
            if (currentLevel > 0) {
                toPage = "game";
                g = new game.init(level[--currentLevel], finishedGame);
            } else {
                toPage = "home";
            }
            break;
			
		/*case "success":
			if(currentLevel > 0) {
				
            } else {
                
            }
			break;	*/
			
        case "levels":
            renderLevelSelect(dif);
    }
    window.localStorage.setItem("level", currentLevel);
    data.toPage = toPagePrefix + "#" + toPage;
	//data.toPage = toPagePrefix + toPage;
    $.mobile.hidePageLoadingMsg();
});
$('#time').button('disable');
var currentLevel = parseInt(window.localStorage.getItem("level")) || 0; // from persistent
var dif = parseInt(window.localStorage.getItem("dif")) || 1; // from persistent
var g;

function renderLevelSelect(dif) {

}

function finishedGame(totalMoves, time) {
	

	var gamelevel = (currentLevel + 1);
	
	timestamp = new Date().getTime();

	window.localStorage.setItem("timestamp", timestamp);

	window.location.href="success.html#success?time=" + time + "&currentLevel=" + gamelevel + "&totalMoves=" + totalMoves + "&timestamp=" + timestamp;
}