class game {
    start() {

        this.game = document.getElementById("game")
        this.gamearr = []
        for (let r = 0; r < 64; r++) {
            let rowarr = []
            let row = document.createElement("div")
            row.className = "row"
            for (let c = 0; c < 64; c++) {
                let gamespace = document.createElement("div")
                gamespace.className = "space"
                gamespace.id = `space row ${r} clumn${c}`
                rowarr.push(gamespace)
                row.appendChild(gamespace)
            }
            this.gamearr.push(rowarr)
            this.game.appendChild(row)

        }

    }
    addfood(){
        if(document.getElementById("food")== undefined){
            let x=Math.floor(Math.random()*63)
            let y = Math.floor(Math.random()*63)
            let food=[x,y]
            player.addBlock()
            snake.gamearr[food[0]][food[1]].id="food"
            score.innerText++
        }
    }
    init() {
       
        player.getinput()
   
        this.gameUpdate =  setInterval(() => {
            player.move()
           this.addfood()
        }, 50);
    }

    end(){
       clearInterval(this.gameUpdate)
       alert("You Lose")
    }
}

class Player {
    constructor() {
        this.position = [[31, 31], [31, 30], [31, 29]]
        this.direction = "right"
    }
    generate() {
        this.position.forEach(block => {
            snake.gamearr[block[0]][block[1]].id = "player"
        })
    }
  move() {
    this.position.forEach(block => {
        if(block[0]!== -1 && block[0]!==64 && block[1]!== -1 && block[1]!==64 ){
            snake.gamearr[block[0]][block[1]].className="space"
            snake.gamearr[block[0]][block[1]].id = "space"
        }
        else{
            snake.end()  
        }
      
    })
        if (this.direction == "up") {
            const pre = this.position
            for(let i = pre.length; i > 1 ;i--){
                this.position[i-1][0] = pre[i-2][0]
                this.position[i-1][1] = pre[i-2][1]
            }
          this.position[0][0]-=1
        }

        if (this.direction == "down") {
            const pre = this.position
            for(let i = pre.length; i > 1 ;i--){
                this.position[i-1][0] = pre[i-2][0]
                this.position[i-1][1] = pre[i-2][1]
            }
          this.position[0][0]+=1
            
        }
        
        if (this.direction == "right") {
            const pre = this.position
            for(let i = pre.length; i > 1 ;i--){
                this.position[i-1][0] = pre[i-2][0]
                this.position[i-1][1] = pre[i-2][1]

            }
         this.position[0][1]+=1 
           
        }
        if (this.direction == "left") {
            const pre = this.position
            for(let i = pre.length; i > 1 ;i--){
                this.position[i-1][0] = pre[i-2][0]
                this.position[i-1][1] = pre[i-2][1]
            }
         this.position[0][1]-=1
            
        }
      
        this.position.forEach(block => {
            if(snake.gamearr[block[0]][block[1]]!= undefined){
                snake.gamearr[block[0]][block[1]].id = "player"
            }
            else(snake.end)
        })
    }
    addBlock(){
        let newblock = [this.position[this.position.length-1][0]-1,this.position[this.position.length-1][1]]
        this.position.push(newblock)
    }

    getinput() {
        document.addEventListener("keydown", () => {
            if (event.keyCode == 38) {
                this.direction = "up"
            }
            if (event.keyCode == 40) {
                this.direction = "down"
            }
            if (event.keyCode == 37) {
                this.direction = "left"
            }
            if (event.keyCode == 39) {
                this.direction = "right"
            }
        })
    }

}
let snake = new game();
let player = new Player();

snake.start();
player.generate()
let btn = document.createElement("button")
btn.addEventListener("click", () => { snake.init() })
snake.game.insertBefore(btn, snake.game.firstChild)
let score = document.createElement("p")
score.innerText= 0
snake.game.insertBefore(score, snake.game.firstChild)
