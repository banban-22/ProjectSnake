// - mutable object variables for both the snake & the apple, called "snake" & "apple"
let snake = { x: '100px' + dx, y: '100px' + dy };
let apple = { x: '50px', y: '50px' };

// - an immutable variable for the canvas grid, called "grid"
const grid = 16;

// - a mutable variable for the canvas, called "canvas"
let canvas;

// - a mutable variable for the canvas movement, called "context"
let context;

// - mutable variables for snake speed and the count of speed, called "userSpeed" & "count". give count a default value of 0, and userSpeed a default value of 6.
let userSpeed = 6;
let count = 0;

// - an empty array to hold the snakes body, called "cells"
let cells = [];

// - a default value for initial snake length, called "maxCells", with an initial value of 1
let maxCells = 1;
