const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 300, y: 300 }];
let dx = 20;
let dy = 0;
let food = getRandomFoodPosition();
let score = 0;

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
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }
}

function getRandomFoodPosition() {
    const x = Math.floor(Math.random() * 30) * 20;
    const y = Math.floor(Math.random() * 30) * 20;
    return { x, y };
}

function drawFood() {
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(food.x, food.y, 20, 20);
}

function main() {
    if (checkGameOver()) return alert('Game Over!');
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
    return false;
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    const goingUp = dy === -20;
    const goingDown = dy === 20;
    const goingRight = dx === 20;
    const goingLeft = dx === -20;

    if (key === 'ArrowUp' && !goingDown) {
        dx = 0;
        dy = -20;
    } else if (key === 'ArrowDown' && !goingUp) {
        dx = 0;
        dy = 20;
    } else if (key === 'ArrowLeft' && !goingRight) {
        dx = -20;
        dy = 0;
    } else if (key === 'ArrowRight' && !goingLeft) {
        dx = 20;
        dy = 0;
    }
});

main();
