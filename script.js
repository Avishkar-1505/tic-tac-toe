const gameboard = (function (){
    let gameArr = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];

    function updateGameArr(player, x, y) {
        if(gameArr[x][y] !== " "){
            return false;
        }

        gameArr[x][y] = player.type;
        // console.log(gameArr);
        return true;
    }

    function checkGameOver(player, x, y){
        let win = true;
        for(let i=0;i<3;i++){
            if(gameArr[i][y] !== player.type){
                win = false;
                break;
            }
        }

        if(win){
            return win;
        }
        
        win = true;
        for(let i=0;i<3;i++){
            if(gameArr[x][i] !== player.type){
                win = false;
                break;
            }
        }

        if(win){
            return win;
        }

        
        if((x===y) || (x===0 && y===2) || (x===2 && y===0)){
            win = true;

            if(x===1 && y===1){
                let i=0, j=0;
                while(i<3 && j<3){
                    if(gameArr[i][j]!==player.type){
                        win = false;
                        break;
                    }
                    i++;
                    j++;
                }

                if(win){
                    return win;
                }

                win = true;
                j = 2;
                
                while(i<3 && j>=0){
                    if(gameArr[i][j]!==player.type){
                        win = false;
                        break;
                    }
                    i++;
                    j--;
                }

                
                return win;
                

            }
            else if(x===y){

                let i=0, j=0;
                while(i<3 && j<3){
                    if(gameArr[i][j]!==player.type){
                        win = false;
                        break;
                    }
                    i++;
                    j++;
                }
                
            }
            else{
                let i=0, j=2;

                while(i<3 && j>=0){
                    if(gameArr[i][j]!==player.type){
                        win = false;
                        break;
                    }
                    i++;
                    j--;
                }
            }
        }
        
        return win;
        
    }

    function checkAllFill(){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(gameArr[i][j]===" "){
                    return false;
                }
            }
        }

        return true;
    }

    function resetGameArr(){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                gameArr[i][j]=" "
            }
        }
    }

    return {updateGameArr, checkGameOver, checkAllFill, resetGameArr};
})();


function createPlayer(name, type){
    return {name, type};
}


const game = (function() {
    let turn = 1;
    let player1 = null;
    let player2 = null;
    let winner = null;

    function gameInit() {
        
        turn = 1;

        const startModal = document.querySelector(".start");
        const startForm = document.querySelector(".init");

        startModal.showModal();

        startForm.addEventListener("submit", (event)=>{
            event.preventDefault()

            const formData = new FormData(startForm);

            const p1 = formData.get("p1");
            const p2 = formData.get("p2");
            console.log(p1);
            console.log(p2);


            player1 = createPlayer(p1, "X");
            player2 = createPlayer(p2, "O");
            startModal.close()
            gameLoop();
        })

    }


    function gameLoop() {

        const boxes = document.querySelectorAll(".box");

        const turnIndicator = document.querySelector(".turn");

        turnIndicator.innerHTML = `${player1.name}'s Turn`;

        boxes.forEach((box)=>{
            box.addEventListener("click", ()=>{
                let x = Number(box.getAttribute("x"));
                let y = Number(box.getAttribute("y"));
                
                if(turn === 1){
                    // console.log(`Player ${player1.name} clicked ${x} ${y}`)

                    if(gameboard.updateGameArr(player1, x, y)){
                        box.innerHTML = "X"
                    }
                    else{
                        return;
                    }
                    
                    if(gameboard.checkGameOver(player1, x, y)){
                        winner = player1;
                        gameOver();
                        return;
                    }

                    if(gameboard.checkAllFill()){
                        gameOver()
                        return;
                    }

                    turn = 0;
                    turnIndicator.innerHTML = `${player2.name}'s Turn`
                }
                else{
                    // console.log(`Player ${player2.name} clicked ${x} ${y}`)
                    
                    if(gameboard.updateGameArr(player2, x, y)){
                        box.innerHTML = "O";
                    }
                    else{
                        return;
                    }
                    if(gameboard.checkGameOver(player2, x, y)){
                        winner = player2;
                        gameOver()
                        return;
                        
                    }

                    if(gameboard.checkAllFill()){
                        gameOver();
                        return;
                    }


                    turn = 1;
                    turnIndicator.innerHTML = `${player1.name}'s Turn`
                }

            })
        })

    }

    function gameOver() {

        const endModal = document.querySelector(".end");
        const winName = document.querySelector("#win");
        const restart = document.querySelector("#restart")
        endModal.showModal();

        

        if(winner === null){
            winName.innerHTML = "Tie :>"
        }
        else{
            winName.innerHTML = `${winner.name} wins :]`;
        }

        restart.addEventListener("click", ()=>{
            endModal.close();
            gameReset();
        })

        
    }

    function gameReset() {
        gameboard.resetGameArr();

        const boxes = document.querySelectorAll(".box");

        boxes.forEach((box)=>{
            box.innerHTML = '';
        })

    }

    return {gameInit};
}
)()


game.gameInit();
