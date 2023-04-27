const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");


let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setInvervalId;
let score = 0;

//local storage 활용
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;


const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    // grid 칸 안(0-30)에서 랜덤으로 food 위치 값 결정
}

const changeDirection = (e) => {
    // 키보드 화살표에 따라 head velocity 변경
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
}

const handleGameOver = () => {
    // interval 초기화, 페이지 새로고침
    clearInterval(setIntervalId);
    alert("Game Over!");
    location.reload();
}

const initGame = () => {
    if(gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`; // snake food 생성

    if(snakeX === foodX && snakeY == foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]); // 닿인 food의 위치 저장
        score++; // score 증가

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        // snakeBody를 한 칸씩 앞으로 옮겨서 snake가 이동하게 만듦
        snakeBody[i] = snakeBody[i-1];
    }

    snakeBody[0] = [snakeX, snakeY]; // snake body의 첫번째 element를 현재 위치(head position)으로 설정

    // head의 위치를 변경시키면서 움직이게 됨
    snakeX += velocityX;
    snakeY += velocityY;

    //[0][0]에 body가 나타나는 버그
    if (snakeX <= 0) {
        snakeX = 30;
    } else if (snakeX > 30) {
        snakeX = 0;
    }
    if (snakeY <= 0) {
        snakeY = 30;
    } else if (snakeY > 30) {
        snakeY = 0;
    }
    // if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    //     gameOver = true;
    // }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`; // body 추가
        // head가 body에 닿이면 game over
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    // htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`; // snake head 생성

    playBoard.innerHTML = htmlMarkup; // play-board에 snake food 넣기
}
changeFoodPosition();
setIntervalId = setInterval(initGame, 100); //100ms 마다 head가 움직임 (숫자값으로 head 속도 조절 가능)
document.addEventListener("keydown", changeDirection);