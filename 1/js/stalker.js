function stalker() {
	var body = document.body;
	var stalker = document.createElement("div");
	stalker.id = "stalker";
	stalker.innerHTML = '<img src="images/skin80.gif" alt="" width="80" height="80">';
	body.appendChild(stalker);

	body.addEventListener("mousemove", function(e) {
		stalker.style.left = e.clientX + 10 + "px"; //横の位置
		stalker.style.top  = e.clientY + 10 + "px"; //縦の位置
	}, false);
}
