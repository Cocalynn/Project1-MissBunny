const cards = [
    { name: 'batman', img: 'batman.jpg' },
    { name: 'captain america', img: 'captain-america.jpg' },
    { name: 'green arrow', img: 'green-arrow.jpg' },
    { name: 'ironman', img: 'ironman.jpg' },
    { name: 'spiderman', img: 'spiderman.jpg' },
    { name: 'superman', img: 'superman.jpg' },
    { name: 'the avengers', img: 'the-avengers.jpg' },
    { name: 'thor', img: 'thor.jpg' },
    { name: 'batman', img: 'batman.jpg' },
    { name: 'captain america', img: 'captain-america.jpg' },
    { name: 'green arrow', img: 'green-arrow.jpg' },
    { name: 'ironman', img: 'ironman.jpg' },
    { name: 'spiderman', img: 'spiderman.jpg' },
    { name: 'superman', img: 'superman.jpg' },
    { name: 'the avengers', img: 'the-avengers.jpg' },
    { name: 'thor', img: 'thor.jpg' }
  ];

const game = new CardGame(cards);
let time = 10

window.addEventListener('load', event => {
  //before the game starts, shuffle the deck
  let html = '';
  game.shuffleCards(game.cards);
  game.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });
  document.querySelector('#game-board').innerHTML = html;

  // Timer for the game
  let timer = setInterval(()=>{
    time--;
    document.querySelector('#time-remaining').innerHTML = time
    if(time == 0 && !game.checkIfFinished()){
      clearInterval(timer)
      alert('You lost in ' + game.moves + ' moves!')
    } 
    if(game.checkIfFinished()){
      clearInterval(timer)
      alert('You won in ' + game.moves + ' moves!')
    }
  }, 1000);

  //click event to each card
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
        card.classList.add('turned');  
        game.pickedCards.push(card)
        if (game.pickedCards.length == 2) {
          const card1 = game.pickedCards[0].getAttribute('data-card-name');
          const card2 = game.pickedCards[1].getAttribute('data-card-name');
          console.log(game.pairsClicked);
          console.log(game.pickedCards)
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
        
        // if (game.checkIfFinished()) {
        //   alert('You won!');
        // }
      
    });
  });
    
  }
);






