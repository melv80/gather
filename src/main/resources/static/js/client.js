const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const scale = 2;
const width = 16;
const height = 18;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
const cycleLoop = [0, 1, 0, 2];

canvas.width = innerWidth;
canvas.height = innerHeight*.8;

let frameCount = 0;
let currentLoopIndex = 0;

class Player {
    constructor() {
        this.currentDirection = 0;
        this.playerX = 0;
        this.playerY = 0;
        this.nextX = 0;
        this.nextY = 0;

        this.icon = new Image();
        this.icon.src = 'http://localhost:8080/static/icons/player.png';

    }

    drawFrame(frameX) {

        this.nextX = Math.clamp(this.nextX, 0, innerWidth);
        this.nextY = Math.clamp(this.nextY, 0, innerHeight);

        ctx.clearRect(this.playerX, this.playerY, this.icon.width, this.icon.height);
        ctx.drawImage(this.icon,
            frameX * width, this.currentDirection * height, width, height,
            this.nextX, this.nextY, scaledWidth, scaledHeight);
        this.playerX = this.nextX;
        this.playerY = this.nextY;
    }

    moveRight() {
        this.currentDirection = 3;
        this.nextX =this.playerX+10;
        this.nextY = this.playerY;
    }

    moveDown() {
        this.currentDirection = 0;
        this.nextX =this.playerX;
        this.nextY = this.playerY+10;
    }

    moveUp() {
        this.currentDirection = 1;
        this.nextX =this.playerX;
        this.nextY = this.playerY-10;
    }

    moveLeft() {
        this.currentDirection = 2;
        this.nextX=this.playerX-10;
        this.nextY = this.playerY;
    }
}


let localPlayer = new Player();

(function(){Math.clamp=function(val,min,max){return Math.max(min,Math.min(max,val));}})();

function step() {
    frameCount++;
    if (frameCount < 15) {
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0;
    localPlayer.drawFrame(cycleLoop[currentLoopIndex]);
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }

    window.requestAnimationFrame(step);
}


function handleKeyDown(event) {
    if (event.code === "KeyA") {
        localPlayer.moveLeft();
    }

    if (event.code === "KeyW") {
        localPlayer.moveUp();
    }

    if (event.code === "KeyS") {
        localPlayer.moveDown();
    }

    if (event.code === "KeyD") {
        localPlayer.moveRight();
    }

}

window.addEventListener('keydown', (event) => {
    handleKeyDown(event);
});
window.requestAnimationFrame(step);