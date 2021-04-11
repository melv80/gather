const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const scale = 2;
const width = 16;
const height = 18;
const scaledWidth = scale * width;
const scaledHeight = scale * height;


playerX = 0;
playerY = 0;
playerXFuture = 0;
playerYFuture = 0;

canvas.width = innerWidth;
canvas.height = innerHeight*.8;


let playerIcon = new Image();
playerIcon.src = 'http://localhost:8080/static/icons/player.png';

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(playerIcon,
        frameX * width, frameY * height, width, height,
        canvasX, canvasY, scaledWidth, scaledHeight);
}

const cycleLoop = [0, 1, 0, 2];
let currentLoopIndex = 0;
let frameCount = 0;
let currentDirection = 0;

(function(){Math.clamp=function(val,min,max){return Math.max(min,Math.min(max,val));}})();

function step() {
    frameCount++;
    if (frameCount < 15) {
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0;
    ctx.clearRect(playerX, playerY, playerIcon.width, playerIcon.height);
    drawFrame(cycleLoop[currentLoopIndex], currentDirection, playerXFuture, playerYFuture);
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }
    playerX = playerXFuture;
    playerY = playerYFuture;

    window.requestAnimationFrame(step);
}

function handleKeyDown(event) {
    if (event.code === "KeyA") {
        currentDirection = 2;
        playerXFuture=playerX-10;
        playerYFuture = playerY;
    }

    if (event.code === "KeyW") {
        currentDirection = 1;
        playerXFuture=playerX;
        playerYFuture = playerY-10;
    }

    if (event.code === "KeyD") {
        currentDirection = 3;
        playerXFuture=playerX+10;
        playerYFuture = playerY;
    }

    if (event.code === "KeyS") {
        currentDirection = 0;
        playerXFuture=playerX;
        playerYFuture = playerY+10;
    }

    playerXFuture = Math.clamp(playerXFuture, 0, innerWidth);
    playerYFuture = Math.clamp(playerYFuture, 0, innerHeight);
}

window.addEventListener('keydown', (event) => {
    handleKeyDown(event);
});
window.requestAnimationFrame(step);