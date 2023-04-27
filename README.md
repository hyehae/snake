# snake
Snake game made with java script
<br><br>
## 1. css
#### 1-1. play-board
grid를 사용해 가로 세로를 각각 30칸으로 설정한다.
#### 1-2. score
현재 스코어와 최고 스코어를 각각 표시한다. 이 때 최고 스코어는 local storage를 사용하도록 js에서 설정한다.
<br><br>
## 2. java script
### 2-1. 기본 동작
#### 2-1-1. food
foodX, foodY 값을 `Math.floor(Math.random()*30)+1`을 이용해 0~30 사이 랜덤 값으로 설정한다.<br>
head가 food에 닿으면 score가 올라가고, snake body가 한 칸 추가되며, foodX foodY의 값을 새로 계산해 위치를 옮긴다.
#### 2-1-2. keydown
키보드 화살표로 조작할 수 있도록 `eventListener("keydown")`를 추가한다.<br>
이 때 velocityX, velocityY를 사용하는데, 이는 후에 snakeX, snakeY 값에 더해지며 snake가 움직일 수 있게 된다.
#### 2-1-3. high score (local storage)
<pre><code>let highScore = localStorage.getItem("high-score") || 0;
    highScoreElement.innerText = `High Score: ${highScore}`;</code></pre>

<pre><code>highScore = score >= highScore ? score : highScore; <br>
    localStorage.setItem("high-score", highScore);</code></pre>

최고점은 local storage에 저장한다.
#### 2-1-4. snake
`snakeX`, `snakeY` 는 각각 snake의 head를 의미한다.<br>
head가 food에 닿으면 `snakeBody`에 닿인 food의 위치를 저장하고 grid에 표시되도록 한다.<br>
<pre><code>for (let i = snakeBody.length - 1; i > 0; i--)
  snakeBody[i] = snakeBody[i-1];
}</code></pre>
snakeBody를 한 칸씩 앞으로 옮기며 snake가 이동하도록 만든다.
<br><br>
### 2-2. 게임 진행
#### 2-2-1. interval
`setIntervalId = setInterval(initGame, 100)`는 100ms마다 initGame을 실행한다. 숫자값을 변경해 snake의 속도를 조절할 수 있다.
#### 2-2-2. head가 벽에 닿는 경우
반대쪽 벽으로 이어져 나오게 한다. (상하/좌우 동일)
#### 2-2-3. Game over
snake의 head가 자기 자신의 body에 닿이면 game over가 된다.<br>
이럴 경우 `clearInterval(setIntervalId)`로 interval을 초기화하고 게임 오버 alert를 띄운 후 사용자가 확인 버튼을 누르면 페이지가 새로고침 된다.
<br><br>
## 3. trouble (23.04.27)
head가 벽에 닿았을 때 반대쪽 벽으로 나오도록 아래 코드를 작성했다.
<pre><code>    if (snakeX <= 0) {
        snakeX = 30;
    } else if (snakeX > 30) {
        snakeX = 0;
    }
    if (snakeY <= 0) {
        snakeY = 30;
    } else if (snakeY > 30) {
        snakeY = 0;
    }</code></pre>
body 전체가 반대쪽으로 나올 때 까지 (0,0) 위치에 body 한 칸이 나타나는 버그가 있다.
<hr>
reference - https://youtu.be/K8Rh5x3c9Pw
