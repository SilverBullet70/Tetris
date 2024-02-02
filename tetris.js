// jQuery CDN

// Your JavaScript code goes here

var canvas = document.getElementById("tetris");
const CANVAS_WIDTH = 12;
const CANVAS_HEIGHT = 2 * (CANVAS_WIDTH - 2);

const I_TETROMINO = [
    [0, 1, 2, 3],
    [0, CANVAS_WIDTH, 2 * CANVAS_WIDTH, 3 * CANVAS_WIDTH],
    [0, 1, 2, 3],
    [0, CANVAS_WIDTH, 2 * CANVAS_WIDTH, 3 * CANVAS_WIDTH]
];

const O_TETROMINO = [
    [0, 1, CANVAS_WIDTH, CANVAS_WIDTH + 1],
    [0, 1, CANVAS_WIDTH, CANVAS_WIDTH + 1],
    [0, 1, CANVAS_WIDTH, CANVAS_WIDTH + 1],
    [0, 1, CANVAS_WIDTH, CANVAS_WIDTH + 1]
];

const T_TETROMINO = [
    [0, 1, 2, CANVAS_WIDTH + 1],
    [0, CANVAS_WIDTH, CANVAS_WIDTH + 1, 2 * CANVAS_WIDTH],
    [1, CANVAS_WIDTH, CANVAS_WIDTH + 1, CANVAS_WIDTH + 2],
    [1, CANVAS_WIDTH, CANVAS_WIDTH + 1, 2 * CANVAS_WIDTH + 1]
];

const J_TETROMINO = [
    [1, CANVAS_WIDTH + 1, 2 * CANVAS_WIDTH, 2 * CANVAS_WIDTH + 1],
    [0, 1, 2, CANVAS_WIDTH + 2],
    [0, 1, CANVAS_WIDTH, 2 * CANVAS_WIDTH],
    [0, CANVAS_WIDTH, CANVAS_WIDTH + 1, CANVAS_WIDTH + 2]
];

const L_TETROMINO = [
    [0, CANVAS_WIDTH, 2 * CANVAS_WIDTH, 2 * CANVAS_WIDTH + 1],
    [0, 1, 2, CANVAS_WIDTH],
    [0, 1, CANVAS_WIDTH + 1, 2 * CANVAS_WIDTH + 1],
    [2, CANVAS_WIDTH, CANVAS_WIDTH + 1, CANVAS_WIDTH + 2]
];

const S_TETROMINO = [
    [1, 2, CANVAS_WIDTH, CANVAS_WIDTH + 1],
    [0, CANVAS_WIDTH, CANVAS_WIDTH + 1, 2 * CANVAS_WIDTH + 1],
    [1, 2, CANVAS_WIDTH, CANVAS_WIDTH + 1],
    [0, CANVAS_WIDTH, CANVAS_WIDTH + 1, 2 * CANVAS_WIDTH + 1]
];

const Z_TETROMINO = [
    [0, 1, CANVAS_WIDTH + 1, CANVAS_WIDTH + 2],
    [1, CANVAS_WIDTH, CANVAS_WIDTH + 1, 2 * CANVAS_WIDTH],
    [0, 1, CANVAS_WIDTH + 1, CANVAS_WIDTH + 2],
    [1, CANVAS_WIDTH, CANVAS_WIDTH + 1, 2 * CANVAS_WIDTH]
];


const TETROMINOES = [I_TETROMINO, O_TETROMINO, T_TETROMINO, J_TETROMINO, L_TETROMINO, S_TETROMINO, Z_TETROMINO];

const STARTING_POSITION = 4;
var currentPosition = STARTING_POSITION;
var currentTetromino = getRandomTetromino();
var currentRotation = getRandomRotation();

function getRandomTetromino() {
    return Math.floor(Math.random() * 7);
}

function getRandomRotation() {
    return Math.floor(Math.random() * 4);
}

var squares = [];
var interval = 0;
function startNewObject() {
    draw(squares, currentTetromino, currentRotation, currentPosition);
    interval = setInterval(
        function () {
            moveDown(squares, currentTetromino, currentRotation, currentPosition);
        }, 500);
}

$(document).ready(function () {

    for (var i = 0; i < CANVAS_HEIGHT * CANVAS_WIDTH; i++) {
        if (i % CANVAS_WIDTH == 0 || i % CANVAS_WIDTH == CANVAS_WIDTH - 1) {
            var fixed = $("<div></div>");
            fixed.addClass("border");
            $("#tetris").append(fixed);
            squares.push(fixed);
            continue;
        }


        var block = $("<div></div>");
        // if (i >= CANVAS_WIDTH * (CANVAS_HEIGHT - 1)) {
        //     block.addClass("fixed");
        // }
        $("#tetris").append(block);
        squares.push(block);


    }

    for (var i = 0; i < CANVAS_WIDTH; i++) {
        var block = $("<div></div>");
        block.addClass("fixed");
        fixed.addClass("border");
        $("#tetris").append(block);
        squares.push(block);

    }


    startNewObject();

    $(document).keydown(function (e) {
        switch (e.which) {
            case 37: // left
                if (!isLeftFixed()) {
                    console.log("left");
                    undraw();
                    currentPosition -= 1;
                    draw();
                }
                break;

            case 38: // up
                undraw();
                currentRotation = (currentRotation + 1) % 4;
                draw();
                break;

            case 39: // right
                if (!isRightFixed()) {
                    undraw();
                    currentPosition += 1;
                    draw();
                }
                break;

            case 40: // down
                undraw();
                currentPosition += CANVAS_WIDTH;
                draw();
                isEnd();
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

});

function isNextFixed() {
    var flag = false;
    TETROMINOES[currentTetromino][currentRotation].forEach(index => {
        if (squares[index + currentPosition + CANVAS_WIDTH].hasClass('fixed')) {
            flag = flag || true;
        }
    });
    return flag;

}

function isRightFixed() {
    var flag = false;
    let max = 0;
    TETROMINOES[currentTetromino][currentRotation].forEach(index => {
        if (index % CANVAS_WIDTH > max) {
            max = index % CANVAS_WIDTH;
        }
    });

    if (squares[max + currentPosition + 1].hasClass('border') || squares[max + currentPosition + 1].hasClass('fixed')) {
        flag = true;
    }
    return flag;

}

function isLeftFixed() {
    var flag = false;
    let min = TETROMINOES[currentTetromino][currentRotation][0];
    TETROMINOES[currentTetromino][currentRotation].forEach(index => {
        if (index % CANVAS_WIDTH < min) {
            min = index % CANVAS_WIDTH;
        }
    });

    if (squares[min + currentPosition - 1].hasClass('border') || squares[min + currentPosition - 1].hasClass('fixed')) {
        flag = true;
        console.log("left fixed");
    }
    return flag;

}

function isEnd() {
    console.log("isEnd?");


    if (isNextFixed()) {
        console.log("yes");
        //clearInterval(interval);
        freeze();
        currentPosition = STARTING_POSITION;
        currentTetromino = getRandomTetromino();
        currentRotation = getRandomRotation();
        if (squares[currentPosition].hasClass("fixed") || squares[currentPosition + CANVAS_WIDTH].hasClass("fixed")){
            clearInterval(interval);
        }
        return;
    }

  
    console.log("no");
}

function freeze() {
    TETROMINOES[currentTetromino][currentRotation].forEach(index => {
        console.log("in freeze");
        console.log(index + currentPosition);
        squares[index + currentPosition].addClass("fixed");
    });
}

function moveDown() {
    // var endFunc = () => {};

    //console.log(isEnd(squares, tetromino, rot, position));

    undraw();
    currentPosition += CANVAS_WIDTH;
    draw();
    isEnd();

}


function draw() {
    TETROMINOES[currentTetromino][currentRotation].forEach(index => {
        squares[index + currentPosition].addClass("block");
    });
}

function undraw() {
    TETROMINOES[currentTetromino][currentRotation].forEach(index => {
        squares[index + currentPosition].removeClass("block");
    });
}