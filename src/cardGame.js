class CardGame {
    constructor(cards) {
      this.cards = cards;
      this.pickedCards = [];
      this.moves = 0;
      this.pairsGuessed = 0;
    }
  
    shuffleCards() {
      if (arguments.length === 0) {
        return undefined;
      } 
      var array = arguments[0];
      var m = array.length, t, i;
  
    // While there remain elements to shuffle…
      while (m) {
  
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
  
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
  
      return array;
  
    }
  
    checkIfPair(card1, card2) {
      // ... write your code here
      this.moves++;
      if (card1 === card2) {
        this.pairsGuessed++;
        return true;
      }
      return false;
    }
  
    checkIfFinished() {
      // ... write your code here
      if (this.pairsGuessed === this.cards.length / 2) {
        return true;
      }
      return false;
    }
  }
  