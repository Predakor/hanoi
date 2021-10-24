tower1 = [0];
tower2 = [0];
tower3 = [0];
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
let currentBlock;

function generate(n) {
  let startTower = document.getElementsByClassName("tower");
  let tower = startTower[1];
  for (let i = 0; i < startTower.length; i++) {
    startTower[i].addEventListener("mousedown", check);
  }

  for (let i = 0; i < n; i++) {
    let block = document.createElement("div");
    block.className = "block";
    block.style.width = 30 + (n - 1) * i + "%";
    block.style.background = colors[i];
    block.addEventListener("click", grabBlock);
    startTower[0].appendChild(block);
    tower1[i] = block;
  }
}

function grabBlock() {
  currentBlock = this;
  let currentSize = this.style.width;
  console.log(currentSize);
}

function check() {
  //current block is smaller or tower is empty
  if (currentBlock.style.width < this.style.width || this.style.width == "") {
    moveBlock(this);
  } else {
    // do nothing
    console.log("not git");
  }
}
function moveBlock(target) {
  target.prepend(currentBlock);
  console.log(target);
  currentBlock = "";
}
