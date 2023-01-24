const cards = [
    { name: 'v-bunny-01', img: 'v-bunny-01.png' },
    { name: 'v-bunny-02', img: 'v-bunny-02.png' },
    { name: 'v-bunny-03', img: 'v-bunny-03.png' },
    { name: 'v-bunny-04', img: 'v-bunny-04.png' },
    { name: 'v-bunny-05', img: 'v-bunny-05.png' },
    { name: 'v-bunny-06', img: 'v-bunny-06.png' },
    { name: 'v-bunny-07', img: 'v-bunny-07.png' },
    { name: 'v-bunny-08', img: 'v-bunny-08.png' },
    { name: 'v-bunny-01', img: 'v-bunny-01.png' },
    { name: 'v-bunny-02', img: 'v-bunny-02.png' },
    { name: 'v-bunny-03', img: 'v-bunny-03.png' },
    { name: 'v-bunny-04', img: 'v-bunny-04.png' },
    { name: 'v-bunny-05', img: 'v-bunny-05.png' },
    { name: 'v-bunny-06', img: 'v-bunny-06.png' },
    { name: 'v-bunny-07', img: 'v-bunny-07.png' },
    { name: 'v-bunny-08', img: 'v-bunny-08.png' },
  ];

const game = new CardGame(cards);
let time = 60
let isGameOn = false
let isMusicOn = true
let isSoundOn = true
let audio = document.getElementsByTagName('audio')[0];
let clickSound = new Audio('.../Project1-MissBunny/sounds/click-button.mp3');
let flipSound = new Audio('.../Project1-MissBunny/sounds/flip-card.mp3');
let scoreInfo = document.createElement('p')

document.getElementById('winner').insertBefore(scoreInfo, document.querySelector('#winner button'));

// set bunny head images by side
const bunnyKeys = Object.keys(document.querySelectorAll('#bunny-head'))
bunnyKeys.forEach((key) => {
    setInterval(() => {
        let Num = Math.floor(Math.random() * 12) + 1
        if (Num < 10) {Num = '0' + Num}
        document.querySelectorAll('#bunny-head')[key].innerHTML = `<img src="images/game-board/h-bunny-${Num}.png" alt="bunny head">`
        }, 1000)

})


// Game settings
document.getElementById('music').onclick = () => {
    if (isSoundOn){
        clickSound.play();
    }
    if (isMusicOn) {
        document.getElementById('music').innerHTML = `<img src="./images/setting/Icon_MusicOff.png" >`
        audio.pause();
        isMusicOn = false
    } else {
        document.getElementById('music').innerHTML = `<img src="./images/setting/Icon_MusicOn.png" >`
        audio.play();
        isMusicOn = true
    }
}

document.getElementById('sound').onclick = () => {
    
    if (isSoundOn) {
        document.getElementById('sound').innerHTML = `<img src="./images/setting/Icon_SoundOff.png" >`
        clickSound.play();
        isSoundOn = false
    } else {
        document.getElementById('sound').innerHTML = `<img src="./images/setting/Icon_SoundOn.png" >`
        clickSound.play();
        isSoundOn = true
    }
}

document.getElementById('question').onclick = () => {
    document.getElementById('how-to-play').style.display = 'flex';
    if (isSoundOn){
        clickSound.play();
    }
}

document.getElementById('game-intro').onclick = () => {
    document.getElementById('how-to-play').style.display = 'none';  
    if (isSoundOn){
        clickSound.play();
    }
}

function restart() {
    //reset the game
    document.getElementsByClassName('play')[0].style.display = 'none';
    document.getElementById('winner').style.display = 'none';
    document.getElementById('loser').style.display = 'none';
    document.getElementById('game-board').innerHTML = '';
    game.score = 0;
    game.pairsGuessed = 0;
    game.moves = 0;
    document.querySelector('#moves-count').innerHTML = game.moves;
    game.pickedCards = [];
    time = 60;
    document.querySelector('#time-remaining').innerHTML = time;
    isGameOn = true;
    //show the game board
    let html = '';
    game.shuffleCards(game.cards);
    game.cards.forEach((pic) => {
        html += `
        <div class="card" data-card-name="${pic.name}">
            <div class="back" name="${pic.img}"></div>
            <div class="front" style="background: url(images/card/${pic.img}) no-repeat; background-size: cover"></div>
        </div>
    `;
    });
    document.querySelector('#game-board').innerHTML = html;


}

const keys = Object.keys(document.getElementsByClassName('play'))
keys.forEach(key=>{
    document.getElementsByClassName('play')[key].onclick = () => {
        if (isSoundOn){
            clickSound.play();
        }
        restart()
        // Timer for the game
        let timer = setInterval(()=>{
            time--;
            document.querySelector('#time-remaining').innerHTML = time
            if(time <= 10){
                document.getElementsByClassName('shake')[0].style.animation = 'shake 0.5s';
                document.getElementsByClassName('shake')[0].style.animationIterationCount = 'infinite';
                document.getElementsByClassName('shake')[1].style.animation = 'shake 0.5s';
                document.getElementsByClassName('shake')[1].style.animationIterationCount = 'infinite';
                
            }
            if(time == 0 && !game.checkIfFinished()){
                clearInterval(timer)
                document.getElementsByClassName('shake')[0].style.animation = 'none';
                document.getElementsByClassName('shake')[1].style.animation = 'none';
                document.getElementById('loser').style.display = 'flex';
                isGameOn = false
            } 
            if(game.checkIfFinished()){
                clearInterval(timer)
                document.getElementsByClassName('shake')[0].style.animation = 'none';
                document.getElementsByClassName('shake')[1].style.animation = 'none';
                document.getElementById('winner').style.display = 'flex';
                game.score = Math.floor(100* time/game.moves)
                scoreInfo.innerHTML = `Your score is ${game.score}!`               
                isGameOn = false
            }
            }, 1000);
        
        
        //click event to each card   
        document.querySelectorAll('.card').forEach((card) => {
                
            card.addEventListener('click', () => {
                if (isSoundOn){
                    flipSound.play();}
                if (isGameOn == true) {
                card.classList.add('turned');  
                game.pickedCards.push(card)
                if (game.pickedCards.length == 2) {
                    const card1 = game.pickedCards[0].getAttribute('data-card-name');
                    const card2 = game.pickedCards[1].getAttribute('data-card-name');
                    if (game.checkIfPair(card1, card2)) {
                    game.pickedCards[0].classList.add('blocked');
                    game.pickedCards[1].classList.add('blocked');
                    game.pickedCards = [];
                    } else {
                    setTimeout(() => {
                        game.pickedCards.forEach((card) => {
                        card.classList.remove('turned');})
                        game.pickedCards = [];
                    }, 1000);
                    }} 
    
                document.querySelector('#moves-count').innerHTML = game.moves;
                }
            });
            
        });
    
    }
})







