const towers = document.getElementsByClassName("tower");
const counter = document.getElementById("counter");
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
  for (let i = 0; i < size; i++) {
    towers[0].appendChild(blocks[i]);
  }
}

function change() {
  num = parseInt(hanoiNum.value);

  if (num == size) {
    reset();
    return;
  }

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
  var firstBlock = this.firstChild;
  if (currentBlock != 0)
    if (firstBlock == null) moveBlock(this);
    else if (currentBlock.style.width < firstBlock.style.width) moveBlock(this);

  function moveBlock(target) {
    target.prepend(currentBlock);
    moves++;
    currentBlock = "";
    counter.innerText = moves + "/" + minMoves;
    if (towers[2].childNodes.length == size) alert("You win");
  }
}

function updateMovesCounter() {
  minMoves = 2 ** size - 1;
  counter.innerText = "0/" + minMoves;
}
//=================solution section======================//
function solution() {
  min = size * size - 1;
  let moves = ["AB", "AC", "BC"];
  let moves2 = ["AC", "AB", "BC"];
  if (size % 2 == 0) {
    for (let i = 0, j = 0; i < min; i++) {
      j = j > 2 ? (j = 0) : j++;
      console.log(moves[j]);
    }
    //algorith  AB AC BC Until C tower is complete
  } else {
    for (let i = 0, j = 0; i < min; i++, j++) {
      j = j > 2 ? (j = 0) : j++;
      console.log(moves2[j]);
    }
    //algorith  AC AB BC Until C tower is complete
  }
}
