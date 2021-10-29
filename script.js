const towers = document.getElementsByClassName("tower");
const counter = document.getElementById("counter");
const historyPanel = document.querySelector(".history-window");
const colors = [
  "#f72585",
  "#b5179e",
  "#7209b7",
  "#560bad",
  "#480ca8",
  "#3a0ca3",
  "#3f37c9",
  "#4895ef",
  "#4cc9f0",
];
let blocks = [];
let currentBlock, moves, size, minMoves;

//=================creating section======================//

function start(n) {
  currentBlock = 0;
  moves = 0;
  for (let i = 0; i < towers.length; i++)
    towers[i].addEventListener("mousedown", check);

  generate(n);
}

function generate(n, start) {
  start = start || 0;
  for (let i = start; i < n; i++) {
    let block = document.createElement("div");
    block.className = "block";
    block.style.width = 30 + 8 * i + "%";
    block.style.background = colors[i];
    block.addEventListener("click", grabBlock);
    towers[0].appendChild(block);
    blocks.push(block);
  }
  size = blocks.length;
  updateMovesCounter();
}

function reset() {
  currentBlock = 0;
  moves = 0;
  updateMovesCounter();
  while (historyPanel.firstChild) {
    historyPanel.removeChild(historyPanel.firstChild);
  }
  for (let i = 0; i < size; i++) {
    towers[0].appendChild(blocks[i]);
  }
}

function change() {
  num = parseInt(hanoiNum.value);

  if (num == size) return;

  //desired size < actual size
  if (num < size) {
    for (let i = num; i < size; i++) {
      blocks[i].remove();
    }
    blocks.splice(num, size - num);
    size = blocks.length;
  } else {
    generate(num, size);
  }
  reset();
}

//=================moving section======================//
function grabBlock() {
  let tower = this.parentElement;
  if (tower.firstChild == this) {
    currentBlock = this;
  }
}

function check() {
  let firstBlock = this.firstChild;
  if (currentBlock != 0)
    if (firstBlock == null || currentBlock.style.width < firstBlock.style.width)
      moveBlock(this);

  function moveBlock(target) {
    let startTower = towerToLetter(currentBlock.parentElement);
    target.prepend(currentBlock);
    moves++;
    currentBlock = "";
    counter.innerText = moves + "/" + minMoves;

    addMove(startTower, towerToLetter(target));
    if (towers[2].childNodes.length == size) alert("You win");
  }
}

function addMove(_startTower, _endTower) {
  let currentMove = document.createElement("div");
  currentMove.innerText = `${moves}. ${_startTower}>${_endTower}`;
  currentMove.classList.add("history-row");
  historyPanel.appendChild(currentMove);
}
function updateMovesCounter() {
  minMoves = 2 ** size - 1;
  counter.innerText = "0/" + minMoves;
}
function towerToLetter(_tower) {
  if (_tower == towers[0]) return "A";
  if (_tower == towers[1]) return "B";
  if (_tower == towers[2]) return "C";
}
//=================solution section======================//
function solution() {
  min = size * size - 1;
  let moves = ["AB", "AC", "BC"];
  let moves2 = ["AC", "AB", "BC"];
  let j = 0;
  if (size % 2 == 0) {
    //algorith  AB AC BC Until C tower is complete
    for (let i = 0; i < min; i++, j++) {
      if (j == 3) j = 0;
      console.log(moves[j]);
    }
  } else {
    //algorith  AC AB BC Until C tower is complete
    for (let i = 0; i < min; i++, j++) {
      if (j == 3) j = 0;
      console.log(moves2[j]);
    }
  }
}
