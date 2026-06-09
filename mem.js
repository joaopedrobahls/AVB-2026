let symbols = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O'];

let names = [
  'Hidrogênio',
  'Hélio',
  'Lítio',
  'Berílio',
  'Boro',
  'Carbono',
  'Nitrogênio',
  'Oxigênio'
];

let cards = [];

let cardSize = 90;

let flippedCards = [];

let matchedPairs = 0;

let canClick = true;

function setup() {

  let canvas = createCanvas(450, 450);

  canvas.parent('game-container');

  initializeGame();
}

function initializeGame() {

  cards = [];

  flippedCards = [];

  matchedPairs = 0;

  canClick = true;

  document.getElementById("score").innerText = matchedPairs;

  let deck = [];

  // Criar pares
  for (let i = 0; i < symbols.length; i++) {

    deck.push({
      type: 'symbol',
      value: symbols[i],
      id: i
    });

    deck.push({
      type: 'name',
      value: names[i],
      id: i
    });
  }

  // Embaralhar
  deck = shuffle(deck);

  // Criar grade
  for (let row = 0; row < 4; row++) {

    for (let col = 0; col < 4; col++) {

      let card = deck.pop();

      cards.push(
        new Card(
          col * (cardSize + 10) + 20,
          row * (cardSize + 10) + 20,
          card
        )
      );
    }
  }
}

function draw() {

  background(240);

  for (let card of cards) {

    card.show();
  }

  // Vitória
  if (matchedPairs === symbols.length) {

    fill(34, 197, 94);

    textAlign(CENTER);

    textSize(32);

    text("🎉 Você venceu!", width / 2, height - 15);
  }
}

function mousePressed() {

  if (!canClick) return;

  for (let card of cards) {

    if (
      card.isClicked(mouseX, mouseY) &&
      !card.flipped &&
      !card.matched
    ) {

      card.flip();

      flippedCards.push(card);

      if (flippedCards.length === 2) {

        canClick = false;

        setTimeout(checkMatch, 1000);
      }

      break;
    }
  }
}

function checkMatch() {

  if (flippedCards[0].id === flippedCards[1].id) {

    flippedCards[0].matched = true;

    flippedCards[1].matched = true;

    matchedPairs++;

    document.getElementById("score").innerText = matchedPairs;

  } else {

    flippedCards[0].flip();

    flippedCards[1].flip();
  }

  flippedCards = [];

  canClick = true;
}

function restartGame() {

  initializeGame();
}

class Card {

  constructor(x, y, data) {

    this.x = x;

    this.y = y;

    this.data = data;

    this.id = data.id;

    this.flipped = false;

    this.matched = false;
  }

  show() {

    stroke(15, 23, 42);

    strokeWeight(2);

    if (this.matched) {

      fill(134, 239, 172);

    } else if (this.flipped) {

      fill(255);

    } else {

      fill(37, 99, 235);
    }

    rect(this.x, this.y, cardSize, cardSize, 12);

    if (this.flipped || this.matched) {

      fill(0);

      noStroke();

      textAlign(CENTER, CENTER);

      if (this.data.type === 'symbol') {

        textSize(26);

      } else {

        textSize(14);
      }

      text(
        this.data.value,
        this.x + cardSize / 2,
        this.y + cardSize / 2
      );
    }
  }

  isClicked(px, py) {

    return (
      px > this.x &&
      px < this.x + cardSize &&
      py > this.y &&
      py < this.y + cardSize
    );
  }

  flip() {

    this.flipped = !this.flipped;
  }
}