// Global variables

let gameStarted = false
let score = 0
let lives = 3
let obstacleIntervalId = setInterval(spawnObstacle, 1000)
//temporal start/end game

let startButton = document.querySelector("#start-button")
startButton.addEventListener("click", startGame)

let endButton = document.querySelector("#end-button")
endButton.addEventListener("click", endGame)

// Start Game Marker Event Listener
let marker = document.querySelector("#start-marker")
marker.addEventListener("markerFound", startGame)

function startGame() {
    // remove the event listener
    gameStarted = true
    // this.removeEventListener("markerFound", startGame())
    // Player creation and add it to the scene
    let player = document.createElement("a-entity")
    player.setAttribute("id", "player")
    player.setAttribute("position", "0.1 0.4 -5")
    player.setAttribute("scale", "0.5 0.5 0.5")
    player.setAttribute("collision-detection", "")
    player.setAttribute("movement-controls", "speed:5")
    player.setAttribute("geometry", "primitive: box")
    player.setAttribute("material", "color: blue")
    document.querySelector("a-scene").appendChild(player)
    //spawn obstacles every second
    setInterval(spawnObstacle, 3000)
    // checking for collisions
    player.addEventListener("collide", handleCollision)
}

function spawnObstacle() {
    if (!gameStarted) {
        return;
    }
    let obstacle = document.createElement("a-box")
    let x = (Math.random() * 20) - 10 // a random value between -10 and 10
    let y = 20
    let z = -5
    let position = `${x} ${y} ${z}`
    obstacle.setAttribute("class", "obstacle")
    obstacle.setAttribute("position", position)
    obstacle.setAttribute("color", "red")
    obstacle.setAttribute("scale", "0.5 0.5 0.5")
    obstacle.setAttribute("collision-detection", "")
    obstacle.setAttribute("dynamic-body", "mass: 10; velocity: 0 -3 0")
    obstacle.setAttribute("animation", "property: position; to: 0 0 -5; dur: 5000; easing: linear")
    document.querySelector("a-scene").appendChild(obstacle)
    obstacle.addEventListener("collide", handleCollision)
}


function handleCollision(event) {
    if (event.detail.body.el.classList.contains("obstacle")) {
        console.log("collision detected", event.detail.body.el.classList.contains("obstacle"))
        //Remove the obstacles from the scene
        event.detail.body.el.parentNode.removeChild(event.detail.body.el)
        // increment score
        gameScore()

        //decrement lives
        lives--
        console.log(lives)
        if (lives === 0) {
            endGame()
        }
    }

}

function endGame() {
    gameStarted = false
    clearInterval(obstacleIntervalId)
    let obstacles = document.querySelectorAll("a-box[color='red']")
    obstacles.forEach(function (obstacle) {
        obstacle.parentNode.removeChild(obstacle)
    })
    let player = document.querySelector("#player")
    player.parentNode.removeChild(player)
    score = 0
    lives = 3
    alert("game over your score is " + score)
}

function gameScore() {
    score++
    console.log("the score" + score)
}