class Enemy2 {
    constructor(ctx, posX, posY, width, height, gameSize) {
        this.ctx = ctx
        this.enemy2Pos = {x: posX, y: posY}
        this.enemy2Size = {w: width, h: height}
        this.enemy2Vel = {x: 5, y: 1}
        this.enemy2Physics = {gravity: .5}
        this.gameSize = gameSize
        this.enemy2Lives = 2
        this.dead = false
        this.imageInstance = undefined
        

        this.init()
        
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = "images/car.png"
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.enemy2Pos.x, this.enemy2Pos.y, this.enemy2Size.w, this.enemy2Size.h)
    }

    move() {
        this.enemy2Pos.x += this.enemy2Vel.x

        this.enemy2Pos.x += this.enemy2Vel.x
        
        this.enemy2Vel.y += this.enemy2Physics.gravity
        this.enemy2Pos.y += this.enemy2Vel.y
        this.checkCollision()
    }

    checkCollision() {
        if (this.enemy2Pos.y >= this.gameSize.h - this.enemy2Size.h) {
            this.enemy2Vel.y += -6
        }

        if (this.enemy2Pos.y <= 0) {
            this.enemy2Vel.y *= -1
        }
    }
}