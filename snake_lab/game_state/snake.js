// - mutable object variables for both the snake & the apple, called "snake" & "apple"
let snake = {
  x: '100px',
  y: '100px',
  // snake velocity. moves one grid length every frame in either the x or y direction
  dx: grid,
  dy: 0,

  // keep track of all grids the snake body occupies
  // - an empty array to hold the snakes body, called "cells"
  cells: [],
  // - a default value for initial snake length, called "maxCells", with an initial value of 1
  maxCells: 1,
};
let apple = { x: '50px', y: '50px' };

// - an immutable variable for the canvas grid, called "grid"
const grid = 16;

// - a mutable variable for the canvas, called "canvas"
let canvas;

// - mutable variables for snake speed and the count of speed, called "userSpeed" & "count". give count a default value of 0, and userSpeed a default value of 6.
let userSpeed = 6;
let count = 0;

const game = document.getElementById('game');
// - a mutable variable for the canvas movement, called "context"
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
};

// drawing an apple
context.fillStyle = 'red';
context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

// Draw the snake on the canvas
context.fillStyle = 'green';
snake.cells.forEach(cell, index){}
