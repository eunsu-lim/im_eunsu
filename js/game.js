var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleWidth = 100;
var paddleHeight = 10;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;
var brickRowCount = 3;
var brickColumnCount = 7;
var brickWidth = 50;
var brickHeight = 15;
var brickPadding = 10;
var brickOffsetTop = 25;
var brickOffsetLeft = 25;

var bricks = [];
for(var c = 0; c < brickColumnCount; c++){
    bricks[c] = [];
    for(var r = 0; r < brickRowCount; r++){
        bricks[c][r] = { x : 0, y : 0, status:1 };
    }
}

var score = 0;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.keyCode == 39){
        rightPressed = true;
    }
    else if(e.keyCode == 37){
        leftPressed = true;
    }
    else if(e.keyCode == 32){
        spacePressed == true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 39){
        rightPressed = false;
    }
    else if(e.keyCode == 37){
        leftPressed = false;
    }
    else if(e.keyCode == 32){
        spacePressed = false;
    }
}




// 충돌감지
function collisionDetection(){
    for(var c = 0; c < brickColumnCount; c++){
        for(var r = 0; r < brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1){
                if( x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount * brickColumnCount){
                        alert("Win!");
                        document.location.reload();
                        
                    }
                }   
            }
            
        }
    }
}

function drawScore(){
    ctx.font = "12px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("score : " + score, 8, 30);
}


function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "lightpink";
    ctx.fill();
    ctx.closePath();    
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "purple";
    ctx.fill();
    ctx.closePath();
}


function drawBricks(){
    for(var c = 0; c < brickColumnCount; c++){
        for(var r = 0; r < brickRowCount; r++){
            if(bricks[c][r].status == 1){
                var brickX = (c * (brickWidth+brickPadding)) + brickOffsetLeft;
                var brickY = (r* (brickHeight+brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "yellow";
                ctx.fill();
                ctx.closePath();
            }            
        } 
    }
}

// drawing loop
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();

    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
        dx = -dx;
    }
    if(y + dy < ballRadius){
        dy = -dy;
    } else if( y + dy > canvas.height-ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }
        else{
            alert("Game Over");
            document.location.reload();
        }
        
    } 
    
    
    if(rightPressed && paddleX < canvas.width-paddleWidth){
        paddleX += 5;
    }
    else if(leftPressed && paddleX > 0){
        paddleX -= 5;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}


draw();