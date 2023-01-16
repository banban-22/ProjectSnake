// - mutable object variables for both the snake & the apple, called "snake" & "apple"
let snake = {
  x: 100,
  y: 100,
  // snake velocity. moves one grid length every frame in either the x or y direction
  dx: grid,
  dy: 0,

  // keep track of all grids the snake body occupies
  // - an empty array to hold the snakes body, called "cells"
  cells: [],
  // - a default value for initial snake length, called "maxCells", with an initial value of 1
  maxCells: 1,
};
let apple = { x: 50, y: 50 };

// - an immutable variable for the canvas grid, called "grid"
const grid = 16;

// - a mutable variable for the canvas, called "canvas"
let canvas;

// - mutable variables for snake speed and the count of speed, called "userSpeed" & "count". give count a default value of 0, and userSpeed a default value of 6.
let userSpeed = 6;
let count = 0;

const game = document.getElementById('game');
let context = game.getContext('2d');

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const loop = () => {
  // make smooth animation with looping
  requestAnimationFrame(loop);

  //   frame rate based on the userSpeed
  if (++count < userSpeed) {
    return;
  }
  count === 0;

  // to clear the entire canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // snake movement
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
    if (cell.x == apple.x && cell.y == apple.y) {
      snake.maxCells++;

      // apple moves another random location
      apple.x = getRandomInt(0, canvas.width / 16) * grid;
      apple.y = getRandomInt(0, canvas.height / 16) * grid;
    }

    // modified bubble sort
    for (let i = index + 1; i < snake.cells.length; i++) {
      // if one piece of the snakes body is occupying the same space as another piece of the snakes body, reset the game
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
