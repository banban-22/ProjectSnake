let snake = {
  x: 100,
  y: 100,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 1,
};
let apple = { x: 50, y: 50 };
const grid = 16;
let canvas;
let userSpeed = 6;
let count = 0;

const game = document.getElementById('game');
let context = game.getContext('2d');

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const loop = () => {
  requestAnimationFrame(loop);

  if (++count < userSpeed) {
    return;
  }
  count === 0;

  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  const snakeBodyMovement = () => {
    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }
  };
  snakeBodyMovement();

  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  context.fillStyle = 'green';
  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x == apple.x && cell.y == apple.y) {
      snake.maxCells++;

      apple.x = getRandomInt(0, canvas.width / 16) * grid;
      apple.y = getRandomInt(0, canvas.height / 16) * grid;
    }

    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x == snake.cells[i].x && cell.y == snake.cells[i].y) {
        snake.x = 100;
        snake.y = 100;
        snake.dx = grid;
        snake.dy = 0;
        snake.maxCells = 1;
        snake.cells = [];

        apple.x = getRandomInt(0, canvas.width / 16) * grid;
        apple.y = getRandomInt(0, canvas.height / 16) * grid;
      }
    }
  });
};

document.addEventListener('keydown', function (e) {
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

requestAnimationFrame(loop);
