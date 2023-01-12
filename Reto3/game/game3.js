startButton.addEventListener("click", function () {
    for (let i = 0; i < 5; i++) {
        obstacle.setAttribute("color", " red")
        obstacle.setAttribute("scale", "0.5 0.5 0.5")
        obstacle.setAttribute("position", `${getRandomPosition()}`)
        obstacle.setAttribute("dynamic.body", "")
    }
})