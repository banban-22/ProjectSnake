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

      apple.x = getRandomInt(0, canvas.width / 16) * grid;
      apple.y = getRandomInt(0, canvas.height / 16) * grid;
    }

    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;

        apple.x = getRandomInt(0, canvas.width / 16) * grid;
        apple.y = getRandomInt(0, canvas.height / 16) * grid;
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

const snakeColor = document.getElementById('snakeColor');
function snakeColorChange() {
  let snakeColorValue = snakeColor.value;

  if (snakeColorValue === 'yellow') {
    context.fillStyle = '#ffff00';
    context.fillRect(snake.x, snake.y, grid - 1, grid - 1);
  } else if (snakeColorValue === 'orange') {
    context.fillStyle = '#ffa500';
    context.fillRect(snake.x, snake.y, grid - 1, grid - 1);
  } else if (snakeColorValue === 'redOrange') {
    context.fillStyle = '#ff5349';
    context.fillRect(snake.x, snake.y, grid - 1, grid - 1);
  } else if (snakeColorValue === 'red') {
    context.fillStyle = '#ff0000';
    context.fillRect(snake.x, snake.y, grid - 1, grid - 1);
  } else if (snakeColorValue === 'redViolet') {
    context.fillStyle = '#c71585';
    context.fillRect(snake.x, snake.y, grid - 1, grid - 1);
  } else if (snakeColorValue === 'violet') {
    context.fillStyle = '#ee82ee';
    context.fillRect(snake.x, snake.y, grid - 1, grid - 1);
  } else if (snakeColorValue === 'blueViolet') {
    context.fillStyle = '#8a2be2';
    context.fillRect(snake.x, snake.y, grid - 1, grid - 1);
  } else if (snakeColorValue === 'blue') {
    context.fillStyle = '#0000ff';
    context.fillRect(snake.x, snake.y, grid - 1, grid - 1);
  } else if (snakeColorValue === 'blueGreen') {
    context.fillStyle = '#0d98ba';
    context.fillRect(snake.x, snake.y, grid - 1, grid - 1);
  }
}

const appleColor = document.getElementById('appleColor');
function appleColorChange() {
  let appleColorValue = appleColor.value;
  console.log(appleColor);

  if (appleColorValue === 'yellow') {
    context.fillStyle = '#ffff00';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  } else if (appleColorValue === 'orange') {
    context.fillStyle = '#ffa500';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  } else if (appleColorValue === 'redOrange') {
    context.fillStyle = '#ff5349';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  } else if (appleColorValue === 'red') {
    context.fillStyle = '#ff0000';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  } else if (appleColorValue === 'redViolet') {
    context.fillStyle = '#c71585';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  } else if (appleColorValue === 'violet') {
    context.fillStyle = '#ee82ee';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  } else if (appleColorValue === 'blueViolet') {
    context.fillStyle = '#8a2be2';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  } else if (appleColorValue === 'blue') {
    context.fillStyle = '#0000ff';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  } else if (appleColorValue === 'blueGreen') {
    context.fillStyle = '#0d98ba';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  }
}

requestAnimationFrame(loop);
