$(document).on("pagebeforechange", function(e, data) {
    if (typeof data.toPage !== 'string') {
        return;
    }
    $.mobile.showPageLoadingMsg();
    var page = data.toPage.toString().split("#");
    var toPagePrefix = page[0];
    var toPage = page[1];
	
	//alert(toPagePrefix);
 
    switch (toPage) {
        case "game":
        case "retry":
            g = new game.init(level[currentLevel], finishedGame);
            toPage = "game";
            break;
        case "next" :
            if (currentLevel < level.length - 1) {
                toPage = "game";
                g = new game.init(level[++currentLevel], finishedGame);
            } else {
                toPage = "finished";
            }
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
	
	//level = (currentLevel + 1);
	
	/*$("#currentLevel1").html(currentLevel);
    $("#score1").html(totalMoves);
    $("#timeEl1").html(time);*/
	
	$("#currentLevel2").html(currentLevel);
    $("#score2").html(totalMoves);
    $("#timeEl2").html(time);
	
	timestamp = new Date().getTime();
	
	//window.localStorage.setItem("level", level);
	window.localStorage.setItem("timestamp", timestamp);
	
	//var successContent = time + "秒" + totalMoves + "步过第" + (currentLevel + 1) + "关,不服来战";
	
	//$("#success").attr("data-title", successContent);
	
    //$.mobile.changePage("#success?level="+currentLevel, {transition: "slideup"});
	/*$.mobile.changePage("file://localhost/C:/Zhuang/WorkSpace/demoWorkSpace/cgcmap/success.html", {transition: "slideup"});*/
	/*$.mobile.changePage("success.html", {transition: "slideup"});*/
	//window.location.href="test.html?currentLevel=5";
	//window.location.href="success.html?time=" + time + "&currentLevel=" + level + "&totalMoves=" + totalMoves;
	window.location.href="success.html?time=" + time + "&currentLevel=" + currentLevel + "&totalMoves=" + totalMoves + "&timestamp=" + timestamp;
	//window.location.href="success.html?time=" + time + "&currentLevel=" + level + "&totalMoves=" + totalMoves + "&huangshouxi=huangshouxi";
}