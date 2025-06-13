let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let strikeLine = document.getElementById("strike-line");

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const styleMap = {
  "0,1,2": { top: "50px", left: "0px", width: "300px", rotate: "0deg" },     // row 1
  "3,4,5": { top: "150px", left: "0px", width: "300px", rotate: "0deg" },    // row 2
  "6,7,8": { top: "250px", left: "0px", width: "300px", rotate: "0deg" },    // row 3

  "0,3,6": { top: "0px", left: "50px", width: "300px", rotate: "90deg" },    // col 1
  "1,4,7": { top: "0px", left: "150px", width: "300px", rotate: "90deg" },   // col 2
  "2,5,8": { top: "0px", left: "250px", width: "300px", rotate: "90deg" },   // col 3

  "0,4,8": { top: "0px", left: "0px", width: "424px", rotate: "45deg" },     // diag ↘
  "2,4,6": { top: "0px", left: "0px", width: "424px", rotate: "-45deg" },    // diag ↙
};


const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  strikeLine.style.display = "none"; // ✅ hide line
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    box.innerText = turnO ? "O" : "X";
    turnO = !turnO;
    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Match Tied! Try Again!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinnner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const drawStrikeLine = (pattern) => {
  const key = pattern.join(",");
  const style = styleMap[key];
  if (style) {
    strikeLine.style.display = "block";
    strikeLine.style.top = style.top;
    strikeLine.style.left = style.left;
    strikeLine.style.width = style.width;
    strikeLine.style.transform = `rotate(${style.rotate})`;
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 !== "" && val1 === val2 && val2 === val3) {
      showWinnner(val1);
      drawStrikeLine(pattern);
      return true;
    }
  }
  return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
