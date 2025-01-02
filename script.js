const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Steuerkreuz-Buttons
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

const scoreDisplay = document.getElementById('scoreDisplay');

let snake = [{ x: 300, y: 300 }];
let dx = 20;
let dy = 0;
let food = getRandomFoodPosition();
let score = 0;
let changingDirection = false;

function clearCanvas() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function advanceSnake() {
    let head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Durchlässige Ränder
    if (head.x < 0) {
        head.x = canvas.width - 20;
    } else if (head.x >= canvas.width) {
        head.x = 0;
    }

    if (head.y < 0) {
        head.y = canvas.height - 20;
    } else if (head.y >= canvas.height) {
        head.y = 0;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = `Punkte: ${score}`;
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }
}

function getRandomFoodPosition() {
    const x = Math.floor(Math.random() * canvas.width / 20) * 20;
    const y = Math.floor(Math.random() * canvas.height / 20) * 20;
    return { x, y };
}

function drawFood() {
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(food.x, food.y, 20, 20);
}

function main() {
    if (checkGameOver()) {
        alert('Game Over!');
        document.location.reload();
        return;
    }

    changingDirection = false;
    setTimeout(() => {
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        main();
    }, 100);
}

function checkGameOver() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    return false; // Kein Game Over durch Ränder
}

// Steuerung mit Pfeiltasten
document.addEventListener('keydown', (event) => {
    if (changingDirection) return;
    changingDirection = true;

    const goingUp = dy === -20;
    const goingDown = dy === 20;
    const goingRight = dx === 20;
    const goingLeft = dx === -20;

    switch (event.key) {
        case 'ArrowUp':
            if (!goingDown) {
                dx = 0;
                dy = -20;
            }
            break;
        case 'ArrowDown':
            if (!goingUp) {
                dx = 0;
                dy = 20;
            }
            break;
        case 'ArrowLeft':
            if (!goingRight) {
                dx = -20;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (!goingLeft) {
                dx = 20;
                dy = 0;
            }
            break;
    }
});

// Steuerkreuz-Events
upButton.addEventListener('click', () => {
    if (!changingDirection && dy !== 20) {
        dx = 0;
        dy = -20;
        changingDirection = true;
    }
});

downButton.addEventListener('click', () => {
    if (!changingDirection && dy !== -20) {
        dx = 0;
        dy = 20;
        changingDirection = true;
    }
});

leftButton.addEventListener('click', () => {
    if (!changingDirection && dx !== 20) {
        dx = -20;
        dy = 0;
        changingDirection = true;
    }
});

rightButton.addEventListener('click', () => {
    if (!changingDirection && dx !== -20) {
        dx = 20;
        dy = 0;
        changingDirection = true;
    }
});

main();
