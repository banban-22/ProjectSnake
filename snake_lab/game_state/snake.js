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
  // keep track of all grids the snake body occupies
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
  // make smooth animation with looping
  requestAnimationFrame(loop);

  //   frame rate based on the userSpeed
  if (++count < userSpeed) {
    return;
  }
  count = 0;

  // to clear the entire canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // snake movement + velocity
  snake.x += snake.dx;
  snake.y += snake.dy;

  // situation where the snake collides with the horizontal axises
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  // situation where the snake collides with the vertical axises
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // snake body movement
  const snakeBodyMovement = () => {
    snake.cells.unshift({ x: snake.x, y: snake.y });

    // remove cells as we move away from them
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }
  };
  snakeBodyMovement();

  // drawing an apple
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  // Draw the snake on the canvas
  context.fillStyle = 'green';
  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    //   When Snake cell collides Apple
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;

      // apple moves another random location
      apple.x = getRandomInt(0, canvas.width / 16) * grid;
      apple.y = getRandomInt(0, canvas.height / 16) * grid;
    }

    // modified bubble sort
    for (var i = index + 1; i < snake.cells.length; i++) {
      // if one piece of the snakes body is occupying the same space as another piece of the snakes body, reset the game
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 1;
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
    // arrow left
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.which === 38 && snake.dy === 0) {
    // arrow right
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.which === 39 && snake.dx === 0) {
    // arrow up
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.which === 40 && snake.dy === 0) {
    // arrow down
    snake.dy = grid;
    snake.dx = 0;
  }
});

// starting the game
requestAnimationFrame(loop);
