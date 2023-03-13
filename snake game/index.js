const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
let gameover=false;
let foodX=13, foodY=10;
let snakeX=5,snakeY=10;
let snakeBody=[];
let velocityX=0,velocityY=0;
let setIntervalId;
let score=0;
// ggetting high score from local storage..
let highScore=localStorage.getItem("high-score") || 0;
highScoreElement.innerText=`High Score: ${highScore}`;
//  console.log(playBoard)
const changeFoodPosition = ()=>{
    foodX=Math.floor(Math.random() * 30)  + 1;
    foodY=Math.floor(Math.random() * 30)  + 1;
    
}
const handleGameOver = () => {
    // clearing the timer reloading the page on game over
    clearInterval(setIntervalId);
    alert("GAme Over! press OK to replay..");
    location.reload();

}
const changeDirection = (e) => {
    // console.log(e);
    // /change velocity value based on key press;
      if(e.key==="ArrowUp" && velocityY !=1){
        velocityX=0;
        velocityY=-1;
      
      }
      else if(e.key==="ArrowDown" && velocityY !=-1){
        velocityX=0;
        velocityY=1;

      }
      else if(e.key==="ArrowLeft" && velocityY != 1){
        velocityX=-1;
        velocityY=0;
      
      }
      else if(e.key==="ArrowRight" && velocityY !=-1){
        velocityX=1;
        velocityY=0;
      
      }
      // initGame();
}
const initGame =() => {
    if(gameover)return handleGameOver();
    let htmlMarkup =`<div class="food" style="grid-area :${foodY} / ${foodX}"></div>`;
   // Checking if the snake hit the food
    if(snakeX === foodX && snakeY === foodY){
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);// pushing food position to snake body array
    // console.log(snakeBody);
    score++;
    highScore = score >= highScore ?  score : highScore;
    localStorage.setItem("high-score", highScore)
    scoreElement.innerText=` Score ${score}`;
    highScoreElement.innerText=`High Score:${highScore}`;
   }
   let n=snakeBody.length-1;
   for(let i =n;i > 0;i--){
  //   // shifting forword values of the element in the snake body by one 
     snakeBody[i]=snakeBody[i-1];
   }  
   snakeBody[0]= [snakeX, snakeY];// setting first element of snake body to current snake position
    // updating the snake;s head position based on the current velocity
   snakeX += velocityX;
   snakeY += velocityY;
//    Checking if the snake's head is out of wall . if so setting gameover to true;
   if(snakeX <= 0 || snakeY > 30 || snakeY <= 0 || snakeX > 30)
{
   gameover=true;
  //  console.log("Game Over");
    // const element=Array[i]
   }
   let m= snakeBody.length;
for(let i=0;i<m;i++){
  htmlMarkup += `<div class="head" style="grid-area :${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
}
  
   playBoard.innerHTML= htmlMarkup;

   
   
}

changeFoodPosition();
initGame();
setIntervalId = setInterval(initGame,125);
document.addEventListener('keydown',changeDirection);
    
