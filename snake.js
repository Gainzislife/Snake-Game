const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// create the snake
let snake = [];
snake[0] = {
    x : 5 * box,
    y : 6 * box
};

// // create food
let food = {
    x : Math.floor(Math.random() * 17 + 1) * box,
    y : Math.floor(Math.random() * 15 + 3) * box
};

//create score
let score = 0;

//control snake
let d;

document.addEventListener("keydown", direction);

function direction(event) {
    if(event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if(event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if(event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if(event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

//check collision
function collision(h, s) {
    for(let i = 0; i < s.length; i++) {
        if(h.x == s[i].x && h.y == s[i].y) {
            return true;
        }
    }
    return false;
}

// draw everything
function draw() {
    //background + white border
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 608, 608);
    ctx.strokeStyle = "white";
    ctx.strokeRect(box, 3*box, 17*box, 15*box);

    //snake
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = ( i == 0) ? "green" : "white";
        ctx.fillRect(snake[i]. x,snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i]. x,snake[i].y, box, box);
    }

    ctx.fillStyle = "purple";
    ctx.fillRect(food.x, food.y, box, box);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //which direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    //if the snake eats food
    if(snakeX == food.x && snakeY == food.y) {
        score++;

        // create food
        food = {
            x : Math.floor(Math.random() * 17 + 1) * box,
            y : Math.floor(Math.random() * 15 + 3) * box
        };
    } else {
        //remove the tail
        snake.pop();
    }

    //add new head
    let newHead = {
        x : snakeX,
        y : snakeY
    };

    //GAME OVER
    if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    //score
    ctx.fillStyle = "white";
    ctx.font = "45px forte";
    ctx.fillText("Score: " + score, 2*box, 2*box);
}

// call draw function
let game = setInterval(draw, 100);
