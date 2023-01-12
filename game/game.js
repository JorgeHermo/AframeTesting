// Global variables

let gameStarted = false
let score = 0
let lives = 3
let obstacleIntervalId = setInterval(spawnObstacle, 1000)

let startButton = document.querySelector("#start-button")
startButton.addEventListener("click", startGame)

let endButton = document.querySelector("#end-button")
endButton.addEventListener("click", endGame)

// Start Game Marker Event Listener
// let marker = document.querySelector("#start-marker")
// marker.addEventListener("markerFound", startGame)

function startGame() {
    // remove the event listener
    gameStarted = true
    createPlayer()
    //spawn obstacles every second
    setInterval(spawnObstacle, 1000)
    // checking for collisions
}

// Player set-up
function createPlayer() {
    let player = document.createElement("a-entity");
    player.setAttribute("class", "player");
    player.setAttribute("position", "0.1 0.4 -5");
    player.setAttribute("scale", "0.5 0.5 0.5");
    player.setAttribute("collision-detection", "");
    player.setAttribute("movement-controls", "speed:5");
    player.setAttribute("dynamic-body", "mass:5;");
    player.setAttribute("geometry", "primitive: box");
    player.setAttribute("material", "color: blue");
    document.querySelector("a-scene").appendChild(player);
}

function spawnObstacle() {
    if (!gameStarted) {
        return;
    }
    let obstacle = document.createElement("a-box")
    let minX = -10
    let maxX = 10
    let x = (Math.random() * (maxX - minX)) + minX
    let y = 5
    let z = -5
    let position = `${x} ${y} ${z}`
    obstacle.setAttribute("class", "obstacle")
    obstacle.setAttribute("position", position)
    obstacle.setAttribute("color", "red")
    obstacle.setAttribute("scale", "0.5 0.5 0.5")
    obstacle.setAttribute("collision-detection", "")
    obstacle.setAttribute("dynamic-body", "mass: 20;")
    obstacle.setAttribute("animation", `property: position; to: ${x} -20 ${z}; dur: 10000; easing: linear`)
    document.querySelector("a-scene").appendChild(obstacle)
    obstacle.addEventListener("collide", handleCollision)
}


function handleCollision(event) {
    if (event.detail.body.el.classList.contains("player")) {
        // code to handle player collision
        console.log("Player collided with", event.detail.body.el.id);
        lives--;
        updateLives();
        if (lives === 0) {
            endGame();
        }
    } else if (event.detail.body.el.classList.contains("obstacle")) {
        // code to handle obstacle collision
        console.log("Obstacle collided with", event.detail.body.el.id);
        event.detail.body.el.parentNode.removeChild(event.detail.body.el);
    }
}

function endGame() {
    gameStarted = false
    clearInterval(obstacleIntervalId)
    let obstacles = document.querySelectorAll("a-box[color='red']")
    obstacles.forEach(function (obstacle) {
        obstacle.parentNode.removeChild(obstacle)
    })
    let player = document.querySelector(".player")
    player.parentNode.removeChild(player)
    score = 0
    lives = 3
    alert("game over your score is " + score)
}

function gameScore() {
    score++
    console.log("the score" + score)
}

function updateLives() {
    let livesDisplay = document.querySelector("#lives")
    livesDisplay.innerHTML = `Lives: ${lives}`
}

let leftButton = document.querySelector("#left-button")
leftButton.addEventListener("click", moveLeft)

let rightButton = document.querySelector("#right-button")
rightButton.addEventListener("click", moveRight)

function moveLeft() {
    console.log("click izquierda");
    if (!gameStarted) {
        createPlayer();
    }
    let player = document.querySelector(".player");
    let currentPosition = player.getAttribute("position");
    let newPosition = {
        x: currentPosition.x - 0.5,
        y: currentPosition.y,
        z: currentPosition.z
    };
    player.setAttribute("position", newPosition);
}


function moveRight() {
    console.log("click derecha");
    if (!gameStarted) {
        createPlayer();
    }
    let player = document.querySelector(".player");
    let currentPosition = player.getAttribute("position");
    let newPosition = {
        x: currentPosition.x + 0.5,
        y: currentPosition.y,
        z: currentPosition.z
    };
    player.setAttribute("position", newPosition);
}
