function road() {
    const cells = Array.from(document.querySelectorAll(".cell"));
    const carCells = cells.slice(0, 30);
    const crabCells = cells.slice(30);
    const scoreDisplay = document.querySelector(".score");

    let dropCount, speed, score;

    reset();

    document.addEventListener("keydown", e => {
        if (!dropCount) {
            startGame();
        }

        const crab = document.querySelector(".crab");

        if (e.key == "ArrowRight" && crabCells.includes(crab.parentElement.nextElementSibling)) {
            crab.parentElement.nextElementSibling.appendChild(crab);
        }

        if (e.key == "ArrowLeft" && crabCells.includes(crab.parentElement.previousElementSibling)) {
            crab.parentElement.previousElementSibling.appendChild(crab);
        }
    })

    function reset() {
        dropCount = 0;
        speed = 1000;
        score = 0;
        scoreDisplay.innerHTML = "0";

        cells.forEach(cell => cell.innerHTML = "");
        crabCells[1].innerHTML = '<div class="crab"></div>';
    }

    function startGame() {
        reset();
        loop();
    }

    function loop() {
        let stopGame = false;

        for (let i = carCells.length - 1; i >= 0; i--) {
            const cell = carCells[i];
            const nextCell = cells[i + 3];
            const car = cell.children[0];

            if (!car) {
                continue;
            }

            nextCell.appendChild(car);

            if (crabCells.includes(nextCell)) {
                if (nextCell.querySelector(".crab")) {
                    stopGame = true;
                }
                else {
                    score++;
                    speed = Math.max(100, speed - 25);
                    scoreDisplay.innerHTML = score;
                    car.remove();
                    if (score >= 10) {
                        location = "/sun/intro";
                        alert("Clear");
                    }
                }
            }
        }

        if (dropCount % 2 == 0) {
            const position = Math.floor(Math.random() * 3);

            carCells[position].innerHTML = '<div class="car"></div>';
        }

        if (stopGame) {
            location = "/ending-roadkill";
            alert("Game Over");
        }
        else {
            dropCount++;
            setTimeout(loop, speed);
        }
    }
}