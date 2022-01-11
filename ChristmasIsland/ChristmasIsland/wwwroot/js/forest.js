function forest() {
    const scoreDisplay = document.querySelector(".score");

    let score = 0;
    let startGame = false;

    function reset() {
        score = 0;
        startGame = true;
        var ant = document.getElementById("ant");
        if (ant.classList != "block") {
            ant.classList.add("block");
        }
        scoreDisplay.innerHTML = score;
    }

    function jump() {
        var crab = document.getElementById("crab");
        var ant = document.getElementById("ant");

        if (crab.classList != "jump") {
            crab.classList.add("jump");
            setTimeout(function () {
                crab.classList.remove("jump");
            }, 300);
        }
        
    }

    function loop() {
        let isAlive = setInterval(function () {
            let crabTop = parseInt(window.getComputedStyle(crab).getPropertyValue("top"));
            let antLeft = parseInt(window.getComputedStyle(ant).getPropertyValue("left"));

            if (antLeft < 50 && antLeft > 0 && crabTop >= 140) {
                location = "/ending-ant";
                alert("Game Over");
            }

        }, 10);
    }

    document.addEventListener("keydown", function (event) {
        if (!startGame) {
            reset();
            loop();
        }
        else {
            scoreDisplay.innerHTML = score + 1;
            jump();
            score++;
            if (score >= 10) {
                location = "/road/intro";
                alert("Clear");
            }
        }
    })
}

