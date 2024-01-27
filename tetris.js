// jQuery CDN

// Your JavaScript code goes here

var canvas = document.getElementById("tetris");
const CANVAS_WIDTH = 10;
const CANVAS_HEIGHT = 2 * CANVAS_WIDTH;

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

$(document).ready(function () {
    var squares = [];
    for (var i = 0; i < CANVAS_HEIGHT * CANVAS_WIDTH; i++) {
        var block = $("<div></div>");
        if (i >= CANVAS_WIDTH * (CANVAS_HEIGHT - 1)) {
            block.addClass("fixed");
        }
        $("#tetris").append(block);
        squares.push(block);
    }

    var position = 4;
    var tetromino = Math.floor(Math.random() * 7);
    var rot = Math.floor(Math.random() * 4);
   

        draw(squares, tetromino, rot, position);
    
            moveDown(squares, tetromino, rot, position);
        


        console.log("tetromino: " + tetromino);
        console.log("rot: " + rot);
        console.log("position: " + position);

        // position += CANVAS_WIDTH;


   // }
});

function isEnd(squares, tetromino, rot, position, interval) {
    TETROMINOES[tetromino][rot].forEach(index => {
      
        if (squares[index + position + CANVAS_WIDTH].hasClass("fixed")) {
                freeze(squares, tetromino, rot, position, interval);
                clearInterval(interval);
                return;
        }
      
    });

}

function freeze(squares, tetromino, rot, position, interval) {
    clearInterval(interval);
    TETROMINOES[tetromino][rot].forEach(index => {
        squares[index + position+ CANVAS_WIDTH].addClass("fixed");
    });

}

function moveDown(squares, tetromino, rot, position) {
    var interval = setInterval(
        function () {
            //console.log(isEnd(squares, tetromino, rot, position));
            isEnd(squares, tetromino, rot, position, interval)
            undraw(squares, tetromino, rot, position);
            position += CANVAS_WIDTH;
            draw(squares, tetromino, rot, position);

        }, 1000);

    console.log(interval);

}


function draw(squares, tetromino, rot, position) {
    TETROMINOES[tetromino][rot].forEach(index => {
        squares[index + position].addClass("block");
    });
}

function undraw(squares, tetromino, rot, position) {
    TETROMINOES[tetromino][rot].forEach(index => {
        squares[index + position].removeClass("block");
    });
}