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
    lives: 5,
    score: 0,
    turboScore: 0,
    countDown: 15,
    countDownCounter: 0,
    enemy1: [],
    enemy2: [],
    bonus: [],
    turboMode: false,






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
    },

    drawAll() {
        setInterval(() => {
            this.clearEnemy1()
            this.createEnemy1()
            this.createEnemy2()
            this.loseLives()
            this.enemy1Score()
            this.enemy2Score()
            if (this.lives <= 0) {
                this.gameOver()
            }
            
            this.enemy1.forEach(elm => {
                elm.move()
                elm.draw()
            })
            this.enemy2.forEach(elm => {
                elm.move()
                elm.draw()
            })

            this.bonus.forEach(elm => {
                elm.move()
                elm.draw()
            })

            if (this.score % 20 === 0 && this.score != 0) {
                this.turboMode = true
                this.score += 1
            }

            if (this.turboMode) {
                this.countDownCounter++

                if (this.framesCounter % 20 === 0) {
                    this.enemy1.push(new Enemy1(
                        this.ctx,
                        0,
                        Math.random() * this.gameSize.h,
                        100,
                        100,
                        this.gameSize
                    ))
                    
                }

                if (this.framesCounter % 20 === 0) {
                    this.enemy2.push(new Enemy2(
                        this.ctx,
                        0,
                        Math.random() * this.gameSize.h,
                        200,
                        200,
                        this.gameSize
                    ))
                    
                }

                if (this.framesCounter % 200 === 0) {
                    this.bonus.push(new Bonus(
                        this.ctx,
                        0,
                        Math.random() * this.gameSize.h,
                        100,
                        100,
                        this.gameSize
                    ))
                    
                }


                document.querySelector(".turbo-score span").innerHTML = this.turboScore
                this.enemy1.forEach(elem => {
                    if (elem.enemy1Lives <= 0) {
                        this.turboScore += 1
                        elem.dead = true
                            
                    }
                })

                this.enemy2.forEach(elem => {
                    if (elem.enemy2Lives <= 0) {
                        this.turboScore += 2
                        elem.dead = true
                    }
                })

                this.bonus.forEach(elem => {
                    if (elem.bonusLives <= 0) {
                        this.enemy1.forEach(elem => {
                            elem.enemy1Vel = {x: 4, y: 1}
                        })

                        this.enemy2.forEach(elem => {
                            elem.enemy2Vel = {x: 2, y: 1}
                        })
                        elem.dead = true
                    }
                })
            }

            if(this.countDownCounter % 375 === 0) {
                this.turboMode = false
                this.countDownCounter = 0
                this.countDown = 15
            }

            if (this.countDownCounter % 25 === 0 && this.countDownCounter != 0) {
                this.countDown -= 1
            }

            document.querySelector(".count-down span").innerHTML = this.countDown



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
            if(this.turboMode && e.type === "mousemove" || !this.turboMode && e.type === "click") {
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

                this.bonus.forEach(elem => {
                    if (elem.bonusPos.x < e.clientX &&
                        elem.bonusPos.x + elem.bonusSize.w > e.clientX &&
                        elem.bonusPos.y < e.clientY &&
                        elem.bonusSize.h + elem.bonusPos.y > e.clientY) {
                        elem.bonusLives--
                    }
                })
            }
               
        }  
        document.addEventListener("click", logKey)
        document.addEventListener("mousemove", logKey)
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
        
        if (this.bonus.some(elem => {
            return elem.bonusPos.x >= elem.gameSize.w
        })) {
            this.lives -= 1
        }


    },

    enemy1Score() {
        document.querySelector(".score span").innerHTML = this.score

        if (this.turboMode === false) {
            this.enemy1.forEach(elem => {
                if (elem.enemy1Lives <= 0) {
                    this.score += 1
                    elem.dead = true
                }
            })
        }
        
    },

    enemy2Score() {
        document.querySelector(".score span").innerHTML = this.score

        if (this.turboMode === false) {
            this.enemy2.forEach(elem => {
                if (elem.enemy2Lives <= 0) {
                    this.score += 2
                    elem.dead = true
                }
            })
        }
        
    },
    gameOver() { 
        document.querySelector(".total-score span").innerHTML = this.score + this.turboScore


        document.querySelector(".game-div").style.display = "none"
        document.querySelector(".main").style.display = "flex"


    },

    








    clearEnemies() {
        this.enemy1 = this.enemy1.filter(elm => elm.enemy1Pos.x <= this.gameSize.w  && !elm.dead)
        this.enemy2 = this.enemy2.filter(elm => elm.enemy2Pos.x <= this.gameSize.w  && !elm.dead)
        this.bonus = this.bonus.filter(elm => elm.bonusPos.x <= this.gameSize.w && !elm.dead && this.turboMode)
    }
}