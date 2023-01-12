function getRandomPosition() {
    let x = (Math.random() - 0.5) * 2 * 5
    let y = (Math.random() - 0.5) * 2 * 5
    let z = -5
    return { x: x, y: y, z: z }
}

AFRAME.registerComponent('player', {
    schema: {
        position: { default: { x: 0.1, y: 0.4, z: -5 } },
        color: { default: 'blue' },
        scale: { default: { x: 0.5, y: 0.5, z: 0.5 } },
        lives: { default: 3 },
        speed: { default: 5 }
    },
    init: function () {
        let data = this.data
        let el = this.el
        el.setAttribute('color', data.color)
        el.setAttribute('scale', data.scale)
        el.setAttribute('collision-detection', "")
        el.setAttribute('movement-controls', "speed:" + data.speed)
        el.setAttribute('position', data.position)
        el.setAttribute('dynamic-body', "")
        el.addEventListener('collide', this.onCollide.bind(this))
    },
    onCollide: function (event) {
        if (event.detail.body.el.id === "obstacle") {
            event.detail.body.el.parentNode.removeChild(event.detail.body.el)
            this.data.lives--
            this.el.components["game-score"].incrementScore()
        }
        if (this.data.lives === 0) {
            this.el.sceneEl.components["end-game"].endGame()
        }
    }
})

AFRAME.registerComponent('obstacle', {
    schema: {
        position: { default: { x: 0, y: 0, z: -5 } },
        color: { default: 'red' },
        scale: { default: { x: 0.5, y: 0.5, z: 0.5 } }
    },
    init: function () {
        let data = this.data
        let el = this.el
        let position = getRandomPosition()
        el.setAttribute('color', data.color)
        el.setAttribute('scale', data.scale)
        el.setAttribute('position', `${position.x} ${position.y} ${position.z}`)
        el.setAttribute('dynamic-body', "mass:10; velocity:0 0 -3")
        el.setAttribute('animation', "property: position; to 0 0.1 -5; dur:5000")
    }
});

AFRAME.registerComponent('game-score', {
    schema: {
        score: { default: 0 },
    },
    init: function () {
        let data = this.data
    },
    incrementScore: function () {
        this.data.score++
    }
})

AFRAME.registerComponent('end-game', {
    schema: {
        gameStarted: { default: false }
    },
    init: function () {
        let data = this.data
    },
    startGame: function () {
        this.data.gameStarted = true
    },
    endGame: function () {
        this.data.gameStarted = false
        alert("Game over!")
    }
})

const startButton = document.querySelector("#start-button")
const endButton = document.querySelector("#end-button")
const scene = document.querySelector("a-scene")
if (startButton) {
    startButton.addEventListener("click", function () {
        if (scene && scene.components["end-game"]) {
            scene.components["end-game"].startGame()
        }
    })
}
if (endButton) {
    endButton.addEventListener("click", function () {
        if (scene && scene.components["end-game"]) {
            scene.components["end-game"].endGame()
        }
    })
}
