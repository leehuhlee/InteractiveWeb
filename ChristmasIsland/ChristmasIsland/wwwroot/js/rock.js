function rock() {
	var canvasWidth = 600;
	var canvasHeigth = 380; // 키워드 생성되는 세로범위
	var goal = 5;
	var keyword = ['hanna', 'maggie', 'peter', 'justin', 'ilikim', 'meike'];

	function heart_counter(heart) {
		var result = "<font color=red>";
		for (var x = 0; x < heart; ++x) {
			result += "♥";
		}
		result += "</font>";
		return result;
	}

	var keyword_cnt = 0;
	var score = 0;
	var heart = 5;

	document.getElementById('score').innerHTML = "Score : " + score
	document.getElementById('heart').innerHTML = "Life : " + heart_counter(heart);

	function gamewin() {
		clearInterval(setInterval1);
		clearInterval(setInterval2);
		location = "/beach/intro";
		alert("Clear");
	}

	function remove_node(pRemoveEle) {
		var vRemove = document.getElementById(pRemoveEle);
		var vParent = vRemove.parentNode;
		vParent.removeChild(vRemove);
		vRemove = null;
	}

	function gameover(code) {
		clearInterval(setInterval1);
		clearInterval(setInterval2);
		location = "/ending-angry";
		alert("Game Over");
	}

	function random_speed(maxSpeed) {
		return parseInt(Math.random() * maxSpeed) + 1;
	}

	function random_width() {
		return parseInt(Math.random() * canvasWidth) + 50;
	}

	function keyword_rain() {
		this.y = 0;
		this.speed = random_speed(2);

		this.node = document.createElement('h3');
		this.node.id = keyword[keyword_cnt];
		this.node.innerHTML = keyword[keyword_cnt++];

		if (keyword_cnt >= keyword.length) {
			clearInterval(setInterval1);
		}

		this.node.style.position = 'absolute';
		this.node.style.left = random_width() + "px";
		console.log(this.node.style.position.x);

		document.getElementById('canvas').appendChild(this.node);

		keyword_rain.prototype.move = function () {
			if (this.y > canvasHeigth) { 
				this.node.remove(); 
				this.y = this.speed = 0;
				keyword.splice(keyword.indexOf(this.node.id), 1);
				keyword_cnt -= 1;
				heart -= 1;
				document.getElementById('heart').innerHTML = "Life : " + heart_counter(heart);
				if (heart < 1) gameover(1);
				if (keyword.length == 0) gameover(2);
				return;
			}
			this.y += this.speed;
			this.node.style.top = this.y + 'px';
		}
	}

	function keydown(keyCode) {
		if (keyCode == "Enter") {
			var text = document.getElementById('text');

			if (keyword.indexOf(text.value) != -1) {
				remove_node(text.value);
				for (var i in game) {
					if (game[i]['node'].id == text.value) {
						game[i]['y'] = 0;
						game[i]['speed'] = 0;
					}
				}
				keyword.splice(keyword.indexOf(text.value), 1);
				keyword_cnt -= 1;
				score++;
				document.getElementById('score').innerHTML = "Score : " + score;
			}
			text.value = "";
			if (score >= goal) { gamewin(); return; }
			if (keyword.length == 0) { gameover(2); return; }
		}
		return;
	}

	var game = [];

	var setInterval1 = setInterval(function () {
		game.push(new keyword_rain());
	}, 1000);

	var setInterval2 = setInterval(function () {
		for (var x in game) { game[x].move(); }
	}, 15);

	document.addEventListener("keydown", e => {
		keydown(e.key);
	})
}