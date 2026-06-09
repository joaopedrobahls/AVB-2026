let cellSize = 40;

let rows = 10;
let cols = 10;

let grid = [];

let selectedWord = null;

// Palavras + perguntas
let words = [

  {
    word: "ATOMO",
    clue: "1 - Qual é a menor unidade da matéria?",
    row: 1,
    col: 1,
    dir: "H"
  },

  {
    word: "ANION",
    clue: "2 - Qual é o átomo que ganha carga negativa?",
    row: 1,
    col: 3,
    dir: "V"
  },

  {
    word: "PROTON",
    clue: "3 - Partícula que fica no núcleo do átomo",
    row: 4,
    col: 1,
    dir: "H"
  },

  {
    word: "NEUTRON",
    clue: "4 - Partícula sem carga (neutra)",
    row: 2,
    col: 6,
    dir: "V"
  },

  {
    word: "ELETRON",
    clue: "5 - Partícula da eletrosfera",
    row: 7,
    col: 1,
    dir: "H"
  }
];

function setup() {

  let canvas = createCanvas(750, 500);

  canvas.parent("game-container");

  initializeGrid();
}

function initializeGrid() {

  grid = [];

  for (let i = 0; i < rows; i++) {

    grid[i] = [];

    for (let j = 0; j < cols; j++) {

      grid[i][j] = "";
    }
  }

  selectedWord = null;
}

function draw() {

  background(220);

  drawAnswersTop();

  drawGrid();

  drawClues();
}

// Mostrar respostas possíveis
function drawAnswersTop() {

  fill(0);

  textSize(16);

  textAlign(CENTER);

  let allWords = words.map(w => w.word).join(" | ");

  text("Respostas: " + allWords, width / 2, 20);
}

// Desenhar cruzadinha
function drawGrid() {

  for (let i = 0; i < rows; i++) {

    for (let j = 0; j < cols; j++) {

      let x = j * cellSize;

      let y = i * cellSize + 40;

      fill(255);

      stroke(0);

      rect(x, y, cellSize, cellSize);

      fill(0);

      textAlign(CENTER, CENTER);

      textSize(18);

      text(grid[i][j], x + cellSize / 2, y + cellSize / 2);
    }
  }

  // Destacar palavra
  if (selectedWord) {

    stroke(255, 0, 0);

    strokeWeight(3);

    noFill();

    for (let i = 0; i < selectedWord.word.length; i++) {

      let r = selectedWord.row + (selectedWord.dir === "V" ? i : 0);

      let c = selectedWord.col + (selectedWord.dir === "H" ? i : 0);

      rect(
        c * cellSize,
        r * cellSize + 40,
        cellSize,
        cellSize
      );
    }
  }
}

// Perguntas
function drawClues() {

  let x = cols * cellSize + 20;

  let y = 80;

  textAlign(LEFT);

  textSize(14);

  for (let w of words) {

    if (w === selectedWord) {

      fill(255, 0, 0);

    } else {

      fill(0);
    }

    text(w.clue, x, y);

    y += 50;
  }
}

// Clique
function mousePressed() {

  let col = floor(mouseX / cellSize);

  let row = floor((mouseY - 40) / cellSize);

  selectedWord = null;

  for (let w of words) {

    for (let i = 0; i < w.word.length; i++) {

      let r = w.row + (w.dir === "V" ? i : 0);

      let c = w.col + (w.dir === "H" ? i : 0);

      if (r === row && c === col) {

        selectedWord = w;

        // Preenchimento automático
        for (let j = 0; j < w.word.length; j++) {

          let rr = w.row + (w.dir === "V" ? j : 0);

          let cc = w.col + (w.dir === "H" ? j : 0);

          grid[rr][cc] = w.word[j];
        }

        return;
      }
    }
  }
}

// Reiniciar
function restartGame() {

  initializeGrid();
}