const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const radius = 60;
const width = canvas.width;
const height = canvas.height;

let snakeBody = [{ x: 260, y: 200 }];

let rectangleDimention = {
  width: 20,
  height: 20,
};

let speed = {
  dx: 0,
  dy: 0,
};

const position = {
  x: width / 2,
  y: height / 2,
};

function createRectangle(x, y, color) {
  context.beginPath();
  context.rect(x, y, rectangleDimention.width, rectangleDimention.height);
  context.fillStyle = color || "red";
  context.fill();
  context.stroke();
}

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

  isEatenFood(x, y) {
    if (this.foodX === x && this.foodY === y) return true;

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
  }

  grow() {
    const isEatenFood = food.isEatenFood(snakeBody[0].x, snakeBody[0].y);

    if (!isEatenFood) return;

    const head = snakeBody;
    const newPart = { x: snakeBody[0] };
  }

  step() {
    let snakePart;

    context.clearRect(0, 0, width, height);

    for (let i = 0; i < snakeBody.length; i++) {
      snakePart = snakeBody[i];
      createRectangle(snakePart.x, snakePart.y, "red");
    }

    const isEatenFood = food.isEatenFood(snakeBody[0].x, snakeBody[0].y);

    if (isEatenFood) {
      let size = snakeBody.length;

      food.generateFood();
      let newPart = {
        x: snakeBody[size - 1] + 20,
        y: snakeBody[size - 1].y + 20,
      };
      snakeBody.push(newPart);
    }

    snakeBody.unshift({
      x: snakeBody[0].x + speed.dx,
      y: snakeBody[0].y + speed.dy,
    });
    snakeBody.pop();
    createRectangle(snakeBody[0].x, snakeBody[0].y, "yellow");

    // create food
    createRectangle(food.foodX, food.foodY, "orange");
  }

  move() {
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
        case "k":
          SnakeController.up();
          break;
        case "j":
          SnakeController.down();
          break;
        case "l":
          SnakeController.right();
          break;
        case "h":
          SnakeController.left();
          break;
      }
    });
  }
}

const snakeGame = new SnakeGame();
const food = new Food();

food.generateFood();
setInterval(() => {
  snakeGame.step();
}, 50);
snakeGame.move();
