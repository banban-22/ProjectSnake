let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
const speed = document.getElementById('speed');
const size = document.getElementById('size');
const snakeColor = document.getElementById('snakeColor');
const appleColor = document.getElementById('appleColor');
const bgColor = document.getElementById('bgColor');
const color = document.getElementById('color');
const userScore = document.querySelector('.userScore');

const grid = 16;
let count = 0;
let userSpeed = 6;
let score = 0;
let bgColorInit = 'white';

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

  context.fillStyle = bgColorChange();
  context.fillRect(0, 0, canvas.width, canvas.height);

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

  context.fillStyle = appleColorChange();
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  context.fillStyle = snakeColorChange();
  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score += 1;
      let scoreDisplay = `Score: ${score}`;
      userScore.innerHTML = scoreDisplay;

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
  if ((e.which === 37 && snake.dx === 0) || (e.key == 'a' && snake.dx === 0)) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (
    (e.which === 39 && snake.dx === 0) ||
    (e.key == 'w' && snake.dx === 0)
  ) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (
    (e.which === 38 && snake.dy === 0) ||
    (e.key == 'd' && snake.dy === 0)
  ) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (
    (e.which === 40 && snake.dy === 0) ||
    (e.key == 's' && snake.dy === 0)
  ) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

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

const changeSize = () => {
  const sizeValue = size.value;
  if (sizeValue === 'bigBoard') {
    canvas.width = 640;
    canvas.height = 640;
  } else if (sizeValue === 'mediumBoard') {
    canvas.width = 480;
    canvas.height = 480;
  } else if (sizeValue === 'smallBoard') {
    canvas.width = 320;
    canvas.height = 320;
  } else if (sizeValue === 'tinyBoard') {
    canvas.width = 240;
    canvas.height = 240;
  }
};

function snakeColorChange() {
  let snakeColorValue = snakeColor.value;

  if (snakeColorValue === 'yellow') {
    context.fillStyle = '#ffff00';
  } else if (snakeColorValue === 'orange') {
    context.fillStyle = '#ffa500';
  } else if (snakeColorValue === 'redViolet') {
    context.fillStyle = '#c71585';
  } else if (snakeColorValue === 'violet') {
    context.fillStyle = '#ee82ee';
  } else if (snakeColorValue === 'blueViolet') {
    context.fillStyle = '#8a2be2';
  } else if (snakeColorValue === 'blue') {
    context.fillStyle = '#0000ff';
  } else if (snakeColorValue === 'blueGreen') {
    context.fillStyle = '#0d98ba';
  } else if (snakeColorValue === 'cyan') {
    context.fillStyle = '#00FFFF';
  } else {
    context.fillStyle = '#00ff00';
  }
}

function appleColorChange() {
  let appleColorValue = appleColor.value;

  switch (appleColorValue) {
    case 'appleColor':
      context.fillStyle = '#ff0000';
      break;
    case 'yellow':
      context.fillStyle = '#ffff00';
      break;
    case 'orange':
      context.fillStyle = '#ffa500';
      break;
    case 'redViolet':
      context.fillStyle = '#c71585';
      break;
    case 'violet':
      context.fillStyle = '#ee82ee';
      break;
    case 'blueViolet':
      context.fillStyle = '#8a2be2';
      break;
    case 'blue':
      context.fillStyle = '#0000ff';
      break;
    case 'blueGreen':
      context.fillStyle = '#0d98ba';
      break;
    case 'cyan':
      context.fillStyle = '#00FFFF';
      break;
    default:
      context.fillStyle = '#ff0000';
      break;
  }
}

color.addEventListener('click', () => {
  bgColorInit = bgColor.value;
});

function bgColorChange() {
  let inputColor = bgColorInit;

  if (inputColor === '') {
    context.fillStyle = 'black';
  } else {
    context.fillStyle = inputColor;
  }
}

requestAnimationFrame(loop);
