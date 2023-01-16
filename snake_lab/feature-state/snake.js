let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

const grid = 16;
let count = 0;
let userSpeed = 6;

let snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 1,
};
let apple = {
  x: 160,
  y: 160,
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < userSpeed) {
    return;
  }
  count = 0;

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

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;

      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;

        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
    }
  });
}

document.addEventListener('keydown', function (e) {
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

requestAnimationFrame(loop);

const speed = document.getElementById('speed');
const changeSpeed = () => {
  const speedValue = speed.value;
  if (speedValue === 'fast') {
    userSpeed = 1;
  } else if (speedValue === 'medium') {
    userSpeed = 3;
  } else if (speedValue === 'slow') {
    userSpeed = 5;
  } else if (speedValue === 'turtle') {
    userSpeed = 9;
  }
};

const size = document.getElementById('size');
const changeSize = () => {
  const sizeValue = size.value;
  if (sizeValue === 'bigBoard') {
    canvas.width = 650;
    canvas.height = 650;
  } else if (sizeValue === 'mediumBoard') {
    canvas.width = 500;
    canvas.height = 500;
  } else if (sizeValue === 'smallBoard') {
    canvas.width = 350;
    canvas.height = 350;
  } else if (sizeValue === 'tinyBoard') {
    canvas.width = 200;
    canvas.height = 200;
  }
};
