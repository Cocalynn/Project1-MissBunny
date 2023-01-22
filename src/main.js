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
let time = 10
let isGameOn = false
let isMusicOn = true
let isSoundOn = true
var audio = new Audio('./images/setting/BackgroundMusic.mp3');
audio.play();
var sound = new Audio('./images/setting/FlipCard.mp3');
sound.play();

// set bunny head images by side
let bunnyHead = document.querySelectorAll('#bunny-head')
setInterval(() => {
let Num = Math.floor(Math.random() * 12) + 1
if (Num < 10) {Num = '0' + Num}
bunnyHead[0].innerHTML = `<img src="images/game-board/h-bunny-${Num}.png" alt="bunny head">`
}, 1000)
setInterval(() => {
let Num = Math.floor(Math.random() * 12) + 1
if (Num < 10) {Num = '0' + Num}
bunnyHead[1].innerHTML = `<img src="images/game-board/h-bunny-${Num}.png" alt="bunny head">`
}, 1000)

// Music and Sound Control
document.getElementById('music').onclick = () => {
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
        sound.pause();
        isSoundOn = false
    } else {
        document.getElementById('sound').innerHTML = `<img src="./images/setting/Icon_SoundOn.png" >`
        sound.play();
        isSoundOn = true
    }
}


let restart = () => {
    //reset the game
    document.getElementById('play').style.display = 'none';
    document.getElementById('winner').style.display = 'none';
    document.getElementById('loser').style.display = 'none';
    document.getElementById('game-board').innerHTML = '';
    game.pairsGuessed = 0;
    game.moves = 0;
    game.pickedCards = [];
    time = 10;
    document.querySelector('#time-remaining').innerHTML = time;
    isGameOn = true
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
document.getElementById('play').onclick = () => {
    restart()
    // Timer for the game
    let timer = setInterval(()=>{
    time--;
    document.querySelector('#time-remaining').innerHTML = time
    if(time == 0 && !game.checkIfFinished()){
        clearInterval(timer)
        document.getElementById('loser').style.display = 'flex';
        //document.getELementById('game-board').style.backdropFilter = 'blur(10px)';//doesnt work
        isGameOn = false
    } 
    if(game.checkIfFinished()){
        clearInterval(timer)
        document.getElementById('winner').style.display = 'flex';
        //document.getELementById('game-board').style.backdropFilter = 'blur(10px)';//doesnt work
        isGameOn = false
    }
    }, 1000);

    //click event to each card
   
    document.querySelectorAll('.card').forEach((card) => {
          
        card.addEventListener('click', () => {
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
                //card.style.pointerEvents = 'auto';
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

document.getElementById('play-again-win').onclick = () => {
    restart()
    document.getElementById('winner').style.display = 'none';
    // Timer for the game
    timer = setInterval(()=>{
        time--;
        document.querySelector('#time-remaining').innerHTML = time
        if(time == 0 && !game.checkIfFinished()){
            clearInterval(timer)
            document.getElementById('loser').style.display = 'flex';
            //document.getELementById('game-board').style.backdropFilter = 'blur(10px)';//doesnt work
            isGameOn = false
        } 
        if(game.checkIfFinished()){
            clearInterval(timer)
            document.getElementById('winner').style.display = 'flex';
            //document.getELementById('game-board').style.backdropFilter = 'blur(10px)';//doesnt work
            isGameOn = false
        }
        }, 1000);
    
    
    //click event to each card   
    document.querySelectorAll('.card').forEach((card) => {
        
        card.addEventListener('click', () => {
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
                //card.style.pointerEvents = 'auto';
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

document.getElementById('play-again-lose').onclick = () => {
    restart()
    // Timer for the game
    timer = setInterval(()=>{
        time--;
        document.querySelector('#time-remaining').innerHTML = time
        if(time == 0 && !game.checkIfFinished()){
            clearInterval(timer)
            document.getElementById('loser').style.display = 'flex';
            //document.getELementById('game-board').style.backdropFilter = 'blur(10px)';//doesnt work
            isGameOn = false
        } 
        if(game.checkIfFinished()){
            clearInterval(timer)
            document.getElementById('winner').style.display = 'flex';
            //document.getELementById('game-board').style.backdropFilter = 'blur(10px)';//doesnt work
            isGameOn = false
        }
        }, 1000);
    
    
    //click event to each card   
    document.querySelectorAll('.card').forEach((card) => {
            
        card.addEventListener('click', () => {
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
                //card.style.pointerEvents = 'auto';
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






