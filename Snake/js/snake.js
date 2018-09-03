// mobile

var buttons = document.getElementsByClassName("buttons")[0];
var upButton = document.getElementsByTagName("button")[0];
var leftButton = document.getElementsByTagName("button")[1];
var downButton = document.getElementsByTagName("button")[2];
var rightButton = document.getElementsByTagName("button")[3];

(function() {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1 || userAgent.indexOf('iPod') > -1 || userAgent.indexOf('Symbian') > -1) {
        buttons.style.display = "block";
        if(window.orientation==90||window.orientation==-90) {
            document.getElementsByTagName('body')[0].style.zoom = 0.9;
        } else {
            document.getElementsByTagName('body')[0].style.zoom = 1.5;
        }
    }
})();

upButton.onclick = function() {
    if (snake.row-1 != body.rows[0]) {
        snake.direction = "up";
        snake.img = '<img class="snake up" src="img/snake.png">';
    }
}

leftButton.onclick = function() {
    if (snake.col-1 != body.cols[0]) {
        snake.direction = "left";
        snake.img = '<img class="snake left" src="img/snake.png">';
    }
}

downButton.onclick = function() {
    if (snake.row+1 != body.rows[0]) {
        snake.direction = "down";
        snake.img = '<img class="snake down" src="img/snake.png">';
    }
}

rightButton.onclick = function() {
    if (snake.col+1 != body.cols[0]) {
        snake.direction = "right";
        snake.img = '<img class="snake right" src="img/snake.png">';
    }
}


//******************************************************************************
// pc

var rowCount = 12;
var colCount = 13;
var cells;
var start = document.getElementById("start");
var gameOver = document.getElementById("game-over");
var gameSpace = document.getElementById("game-space");
var score = document.getElementsByClassName("score")[0];
var snake = {
    row: 0,
    col: colCount-1,
    lastRow: 0,
    lastCol: 0,
    img: '<img class="snake left" src="img/snake.png">',
    direction: "left",
    fps: 2,
    init: function() {
        snake.row = 0;
        snake.col = colCount-1;
        snake.lastRow = 0;
        snake.lastCol = 0;
        snake.img = '<img class="snake left" src="img/snake.png">';
        snake.direction = "left";
        snake.fps = 2;
    },
    computePosition: function() {
        snake.lastRow = snake.row;
        snake.lastCol = snake.col;
        if (snake.direction == "down") {
            snake.row++;
        } else if (snake.direction == "right") {
            snake.col++;
        } else if (snake.direction == "up") {
            snake.row--;
        } else if (snake.direction == "left") {
            snake.col--;
        }
    },
    hit: function() {
        if (snake.row<0 || snake.row>=rowCount || snake.col<0 || snake.col>=colCount) {
            return true;
        } else {
            for (var i = 0; i < body.cols.length; i++) {
                if (snake.row == body.rows[i] && snake.col == body.cols[i]) {
                    return true;
                }
            }
            return false;
        }
    },
    display: function() {
        if (snake.row>=0 && snake.row<rowCount && snake.col>=0 && snake.col<colCount) {
            cells[snake.row*colCount+snake.col].innerHTML = snake.img;
        } else {
            cells[snake.lastRow*colCount+snake.lastCol].innerHTML = snake.img;
        }
    },
    checkEat: function() {
        if (snake.row == food.row && snake.col == food.col) {
            score.innerHTML++;
            if (Number(score.innerHTML) % 3 == 0) snake.fps++;
            food.new();
            body.display(true);
        } else {
            body.display(false);
        }
    }
};
var body = {
    rows: [0],
    cols: [colCount],
    img: '<img class="body" src="img/body.png">',
    init: function() {
        body.rows = [0];
        body.cols = [colCount];
    },
    display: function(eat) {
        if (eat == false) {
            cells[body.rows[0]*colCount+body.cols[0]].innerHTML = "";
            body.rows.shift();
            body.cols.shift();
        }
        var count = body.rows.length;
        body.rows[count] = snake.lastRow;
        body.cols[count] = snake.lastCol;
        cells[body.rows[count]*colCount+body.cols[count]].innerHTML = body.img;
    }
}
var food = {
    row: 0,
    col: 0,
    img: '<img class="food" src="img/food.png">',
    new: function() {
        food.row = Math.floor(Math.random()*rowCount);
        food.col = Math.floor(Math.random()*colCount);
        while (cells[food.row*colCount+food.col].innerHTML.length > 0) {
            food.row = Math.floor(Math.random()*rowCount);
            food.col = Math.floor(Math.random()*colCount);
        }
        cells[food.row*colCount+food.col].innerHTML = food.img;
    }
};


function displayGrid() {
    score.innerHTML = "0";
    gameSpace.innerHTML = "";
    snake.init();
    body.init();
    var table = document.createElement("table");
    for (var i = 0; i < rowCount; i++) {
        var tmpRow = table.insertRow();
        for (var j = 0; j < colCount; j++) {
            var cell = tmpRow.insertCell();
            cell.className = "cell cell" + ((i*colCount+j)%2).toString();
        }
    }
    gameSpace.appendChild(table);
    cells = document.getElementsByTagName("td");
}

function gameLoop() {
    snake.computePosition();
    snake.checkEat();
    snake.display();
    if (snake.hit()) {
        gameOver.innerHTML = "GAME OVER!<br />Your final score is<br />"+score.innerHTML+"!";
        gameOver.style.display = "block";
    } else {
        setTimeout(function() {
            window.requestAnimationFrame(gameLoop);
        }, 1000 / snake.fps);
    }
}

gameOver.onclick = function() {
    gameOver.style.display = "none";
    start.style.display = "block";
    gameSpace.innerHTML = "";
    score.innerHTML = "0";
}

start.onclick = function() {
    start.style.display = "none";
    displayGrid();
    food.new();

    // keycode:  ←37 ↑38 →39 ↓40
    document.onkeydown = function() {
        switch(event.keyCode) {
            case 37:
                if (snake.col-1 != body.cols[0]) {
                    snake.direction = "left";
                    snake.img = '<img class="snake left" src="img/snake.png">';
                }
                break;
            case 38:
                if (snake.row-1 != body.rows[0]) {
                    snake.direction = "up";
                    snake.img = '<img class="snake up" src="img/snake.png">';
                }
                break;
            case 39:
                if (snake.col+1 != body.cols[0]) {
                    snake.direction = "right";
                    snake.img = '<img class="snake right" src="img/snake.png">';
                }
                break;
            case 40:
                if (snake.row+1 != body.rows[0]) {
                    snake.direction = "down";
                    snake.img = '<img class="snake down" src="img/snake.png">';
                }
                break;
        }
    }

    window.requestAnimationFrame(gameLoop);
}

