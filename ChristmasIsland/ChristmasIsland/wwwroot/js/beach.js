function beach() {
    let lastRenderTime = 0;
    let gameOver = false;
    const gameBoard = document.getElementById('game-board');
    const GRID_SIZE = 21;

    function update() {
        updateCrab();
        updateBaby();
        checkDeath();
    }

    function draw(gameBoard) {
        gameBoard.innerHTML = '';
        drawCrab(gameBoard);
        drawBaby(gameBoard);
    }

    function checkDeath() {
        gameOver = outsideGrid(getCrabHead()) || crabIntersection();

    }

    const CRAB_SPEED = 2;
    const crabBody = [{ x: 11, y: 11 }];
    let newSegments = 0;

    function updateCrab() {
        addSegments();
        const inputDirection = getInputDirection();
        for (let i = crabBody.length - 2; i >= 0; i--) {
            crabBody[i + 1] = { ...crabBody[i] };
        }

        crabBody[0].x += inputDirection.x;
        crabBody[0].y += inputDirection.y;
    }

    function drawCrab(gameBoard) {
        crabBody.forEach(segment => {
            const crabElement = document.createElement('div');
            crabElement.style.gridRowStart = segment.y;
            crabElement.style.gridColumnStart = segment.x;
            crabElement.classList.add('crab');
            gameBoard.appendChild(crabElement);
        })
    }

    function expandCrab(amount) {
        newSegments += amount;
    }

    function onCrab(position, { ignoreHead = false } = {} ) {
        return crabBody.some((segment, index) => {
            if (ignoreHead && index == 0) return false;
            return equalPositions(segment, position);
        })
    }

    function equalPositions(pos1, pos2) {
        return pos1.x == pos2.x && pos1.y == pos2.y;
    }

    function addSegments() {
        for (let i = 0; i < newSegments; i++) {
            crabBody.push({ ...crabBody[crabBody.length - 1] });
        }

        newSegments = 0;
    }

    function getCrabHead() {
        return crabBody[0];
    }

    function crabIntersection() {
        return onCrab(crabBody[0], { ignoreHead: true });
    }

    let baby = getRandomBabyPosition();

    const EXPANSION_RATE = 1;

    function updateBaby() {
        if (onCrab(baby)) {
            expandCrab(EXPANSION_RATE);
            baby = getRandomBabyPosition();
        }
    }

    function drawBaby(gameBoard) {
        const babyElement = document.createElement('div');
        babyElement.style.gridRowStart = baby.y;
        babyElement.style.gridColumnStart = baby.x;
        babyElement.classList.add('baby');
        gameBoard.appendChild(babyElement);
    }

    function getRandomBabyPosition() {
        let newBabyPosition
        while (newBabyPosition == null || onCrab(newBabyPosition)) {
            newBabyPosition = randomGridPosition();
        }

        return newBabyPosition;
    }


    function randomGridPosition() {
        return {
            x: Math.floor(Math.random() * GRID_SIZE) + 1,
            y: Math.floor(Math.random() * GRID_SIZE) + 1
        };
    }

    function outsideGrid(position) {
        return (
            position.x < 1 || position.x > GRID_SIZE || position.y < 1 || position.y > GRID_SIZE
        );
    }

    let inputDirection = { x: 0, y: 0 };
    let lastInputDirection = { x: 0, y: 0 };

    function getInputDirection() {
        lastInputDirection = inputDirection;
        return inputDirection;
    }

    function animate() {
        if (gameOver) {
            location = "/ending-missing";
            return alert("Game Over");
        }

        if (crabBody.length >= 10) {
            location = "/ending-clear";
            return alert("Clear");
        }

        requestAnimationFrame(animate);
        let currentTime = new Date().getTime();
        const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
        if (secondsSinceLastRender < 1 / CRAB_SPEED) return

        lastRenderTime = currentTime;

        update();

        draw(gameBoard);
    }
    animate();

    document.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp':
                if (lastInputDirection.y != 0) break;
                inputDirection = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                if (lastInputDirection.y != 0) break;
                inputDirection = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                if (lastInputDirection.x != 0) break;
                inputDirection = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                if (lastInputDirection.x != 0) break;
                inputDirection = { x: 1, y: 0 };
                break;
        }
    })
}