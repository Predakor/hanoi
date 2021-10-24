const towers = document.getElementsByClassName("tower");
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
let currentBlock, moves, size;

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
    block.style.width = 30 + (n - 1) * i + "%";
    block.style.background = colors[i];
    block.addEventListener("click", grabBlock);
    towers[0].appendChild(block);
    blocks[i] = block;
  }
  size = blocks.length;
}

function reset() {
  currentBlock = 0;
  moves = 0;
  for (let i = 0; i < size; i++) {
    towers[0].appendChild(blocks[i]);
  }
}

function change() {
  num = hanoiNum.value;
  if (num == size) reset();
  else if (num < size) {
    for (let i = num; i < size; i++) {
      blocks[i].remove();
    }
    blocks.splice(num, size - num);
  } else generate(num, size);
}

//=================moving section======================//
function grabBlock() {
  let tower = this.parentElement;
  if (tower.firstChild == this || tower.firstChild == null) {
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

    if (towers[2].childNodes == size) alert("You win");
  }
}

//=================solution section======================//
function solution() {
  if (size % 2 == 0) {
    //algorith 1 AB AC BC Until C tower is complete
  } else {
    //algorith 1 AC AB BC Until C tower is complete
  }
}
