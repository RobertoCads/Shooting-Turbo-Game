const shootingGame = {
    appName: 'Shooting Game',
    author: 'Mikel Laiseca & Roberto Cadenas',
    version: '1.0.0',
    license: undefined,
    canvas: document.querySelector("#myCanvas"),
    title: document.querySelector(".main"),
    gameSize: {w: undefined, h: undefined},
    cursor: document.getElementById("mouse"),
    ctx: undefined,
    framesCounter: 0,
    lives: 20,
    score: 0,
    enemy1: [],
    enemy2: [],
    init() {
        this.setContext()
        this.setSize()
        this.drawAll()
        this.takeCoor()
        // this.enemy1Score() 
          
    },

    setContext() {
        this.ctx = document.querySelector("#myCanvas").getContext("2d")
    },

    setSize() {
        this.gameSize = {
            w: window.innerWidth,
            h: 600
        }
        document.querySelector("#myCanvas").setAttribute("width", this.gameSize.w)
        document.querySelector("#myCanvas").setAttribute("height", this.gameSize.h)
    },

    createEnemy1() {
        if (this.framesCounter % 60 === 0) {
            this.enemy1.push(new Enemy1(
                this.ctx,
                0,
                Math.random() * this.gameSize.h,
                100,
                100,
                this.gameSize
            ))
            
        }
        // this.enemy1.push(
        //     new Enemy1(this.ctx, 0, 0, 50, 50, this.gameSize),
        //     new Enemy1(this.ctx, 0, 60, 50, 50, this.gameSize)
        // )
    },

    createEnemy2() {

        if (this.framesCounter % 100 === 0) {
            this.enemy2.push(new Enemy2(
                this.ctx,
                0,
                Math.random() * this.gameSize.h,
                200,
                200,
                this.gameSize
            ))
            
        }
        // this.enemy2.push(
        //     new Enemy2(this.ctx, 0, 20, 100, 100, this.gameSize),
        //     new Enemy2(this.ctx, 0, 200, 100, 100, this.gameSize)
        // )
    },

    drawAll() {
        setInterval(() => {
            this.clearEnemy1()
            this.createEnemy1()
            this.createEnemy2()
            this.loseLives()
            this.enemy1Score()
            this.gameOver()
            this.enemy1.forEach(elm => {
                elm.move()
                elm.draw()
            })
            this.enemy2.forEach(elm => {
                elm.move()
                elm.draw()
            })
            this.framesCounter++
        }, 40)
        
    },

    clearEnemy1() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
        this.clearEnemies()
    },

    takeCoor() {
        let coords = document.querySelector("#myCanvas")
        
        

        const logKey = (e) => {
            coords.innerText = `Screen X/Y: ${e.screenX} ${e.screenY}`
            this.enemy1.forEach(elem => {
                if (elem.enemy1Pos.x < e.clientX &&
                    elem.enemy1Pos.x + elem.enemy1Size.w > e.clientX &&
                    elem.enemy1Pos.y < e.clientY &&
                    elem.enemy1Size.h + elem.enemy1Pos.y > e.clientY) {
                    elem.enemy1Lives--
                 }
            })

            this.enemy2.forEach(elem => {
                if (elem.enemy2Pos.x < e.clientX &&
                    elem.enemy2Pos.x + elem.enemy2Size.w > e.clientX &&
                    elem.enemy2Pos.y < e.clientY &&
                    elem.enemy2Size.h + elem.enemy2Pos.y > e.clientY) {
                    elem.enemy2Lives--
                 }
            })   
        }  
        document.addEventListener("click", logKey)
    },

    loseLives() {
        document.querySelector(".lives span").innerHTML = this.lives
        if (this.enemy1.some(elem => {
            return elem.enemy1Pos.x >= elem.gameSize.w
           
       })) {
            this.lives -= 1
        }

        if (this.enemy2.some(elem => {
            return elem.enemy2Pos.x >= elem.gameSize.w
           
       })) {
            this.lives -= 2
        }  
    },

    enemy1Score() {
        document.querySelector(".score span").innerHTML = this.score
        if (this.enemy1.enemy1Lives === 0) {
            this.score += 1
        }
    },

    gameOver() {
        if (this.lives === 0) {
            window.location.href = "gameover.html"
        }
    },

    








    clearEnemies() {
        this.enemy1 = this.enemy1.filter(elm => elm.enemy1Pos.x <= this.gameSize.w  && elm.enemy1Lives > 0)
        this.enemy2 = this.enemy2.filter(elm => elm.enemy2Pos.x <= this.gameSize.w  && elm.enemy2Lives > 0)
    }
}