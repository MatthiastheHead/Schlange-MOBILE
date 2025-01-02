const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Steuerkreuz-Buttons
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

let snake = [{ x: 300, y: 300 }];
let dx = 20; // Bewegung auf der x-Achse
let dy = 0;  // Bewegung auf der y-Achse
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

    const hitWallLeft = snake[0].x < 0;
    const hitWallRight = snake[0].x >= canvas.width;
    const hitWallTop = snake[0].y < 0;
    const hitWallBottom = snake[0].y >= canvas.height;

    return hitWallLeft || hitWallRight || hitWallTop || hitWallBottom;
}

// Event-Listener für Pfeiltasten
document.addEventListener('keydown', (event) => {
    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.key;
    const goingUp = dy === -20;
   
