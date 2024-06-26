class Food {
  constructor() {
    this.foodX;
    this.foodY;
  }

  random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 20) * 20;
  }

  generateFood() {
    console.log(width, height);
    this.foodX = this.random_food(0, width);
    this.foodY = this.random_food(0, height);
    console.log(this.foodX, this.foodY, "food position ");
    createRectangle(this.foodX, this.foodY, "gren");
  }

  isEatenFood() {
    const headPosition = snakeBody[0];

    if (this.foodX === headPosition.x && this.foodY === headPosition.y)
      return true;

    return false;
  }
}

const SnakeController = {
  up: () => {
    speed.dx = 0;
    speed.dy = -20;
  },

  down: () => {
    speed.dx = 0;
    speed.dy = 20;
  },

  left: () => {
    speed.dy = 0;
    speed.dx = -20;
  },

  right: () => {
    speed.dy = 0;
    speed.dx = 20;
  },
};

class SnakeGame {
  constructor() {
    this.isStart = false;
    this.isGameOver = false;
    this.score = 0;
  }

  startGame() {
    this.isStart = true;
    this.isGameOver = false;
  }

  endGame() {
    this.isGameOver = true;
    thi.isStart = false;
  }

  grow() {
    // increment the score ;
    this.score++;

    // create new part of snake
    let newPart = {
      x: snakeBody[snakeBody.length - 1] + 20,
      y: snakeBody[snakeBody.length - 1].y + 20,
    };
    // add part to snake
    snakeBody.push(newPart);

    // genearate a new food
    food.generateFood();
  }

  move() {
    let snakePart;

    // clear the canvas
    context.clearRect(0, 0, width, height);

    // draw the snake
    for (let i = 0; i < snakeBody.length; i++) {
      snakePart = snakeBody[i];
      createRectangle(snakePart.x, snakePart.y, "red");
    }

    if (food.isEatenFood()) this.grow();

    // move the head
    snakeBody.unshift({
      x: snakeBody[0].x + speed.dx,
      y: snakeBody[0].y + speed.dy,
    });

    // remove the tail of snake
    snakeBody.pop();

    // create head of snake
    createRectangle(snakeBody[0].x, snakeBody[0].y, "yellow");

    // create food
    createRectangle(food.foodX, food.foodY, "orange");
  }

  direct() {
    // listen
    document.addEventListener("keydown", (event) => {
      const pressedKey = event.key;
      if (
        pressedKey === "k" ||
        pressedKey === "j" ||
        pressedKey === "l" ||
        pressedKey === "h"
      )
        this.isStart = true;

      switch (pressedKey) {
        case "k": // move up
          SnakeController.up();
          break;
        case "j": //move down
          SnakeController.down();
          break;
        case "l": // move right
          SnakeController.right();
          break;
        case "h": // move left
          SnakeController.left();
          break;
      }
    });
  }
}

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const width = canvas.width; // canvas width
const height = canvas.height; // canvas height

// snake body
let snakeBody = [{ x: 0, y: 0 }];

// snake part dimension
let rectangleDimention = {
  width: 20,
  height: 20,
};

// speed
let speed = {
  dx: 0,
  dy: 0,
};

// draw the part of snake
function createRectangle(x, y, color) {
  context.beginPath();
  context.rect(x, y, rectangleDimention.width, rectangleDimention.height);
  context.fillStyle = color || "red";
  context.fill();
  context.stroke();
}

const snakeGame = new SnakeGame();
const food = new Food();

food.generateFood();
setInterval(() => {
  snakeGame.move();
}, 50);
snakeGame.direct();
