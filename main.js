// Array Of Words
const wordslvl_1 = [
  "apple",
  "banana",
  "carrot",
  "donut",
  "eggs",
  "fries",
  "grapes",
  "honey",
  "ice",
  "juice",
  "kiwi",
  "lemon",
  "melon",
  "nuts",
  "orange",
  "pizza",
  "quiche",
  "rice",
  "salad",
  "toast",
  "umbrella",
  "vanilla",
  "water",
  "xylophone",
  "yogurt",
];
const wordslvl_2 = [
  "almond",
  "bagel",
  "croissant",
  "dumpling",
  "enchilada",
  "falafel",
  "granola",
  "hamburger",
  "italian",
  "jambalaya",
  "kabob",
  "lasagna",
  "muffin",
  "noodle",
  "omelette",
  "pancake",
  "quesadilla",
  "risotto",
  "spaghetti",
  "taco",
  "udon",
  "vegetable",
  "waffle",
  "xocolatl",
  "yakitori",
];
const wordslvl_3 = [
  "amalgamate",
  "blasphemy",
  "cacophony",
  "defenestration",
  "ephemeral",
  "facetious",
  "garrulous",
  "histrionic",
  "indefatigable",
  "jejune",
  "kaleidoscope",
  "labyrinthine",
  "mnemonic",
  "nefarious",
  "obfuscate",
  "parsimonious",
  "quintessential",
  "recalcitrant",
  "sanguine",
  "taciturn",
  "ubiquitous",
  "vivacious",
  "welter",
  "xenophobia",
  "yellowbelly",
];
// Elements Selection
let lvl = document.querySelector(".lvl");
let selectlevel = document.querySelectorAll(".levels span");
let lvlTime = document.querySelector(".seconds");
let startBtn = document.querySelector(".start-play");
let theWord = document.querySelector(".the-word");
let input = document.querySelector("input");
let UpcomingWord = document.querySelector(".upcoming-word");
let leftTime = document.querySelector(".time span");
let gotScore = document.querySelector(".score .got");
let totalScore = document.querySelector(".score .total");
let finsh = document.querySelector(".finsh");
let lastScore = document.querySelector(".lastScore span");

if (localStorage.getItem("Score")) {
  lastScore.innerHTML = `score of last game is ${JSON.parse(localStorage.getItem("Score"))["Last Score"]}`
} else lastScore.innerHTML = "First Game Let's Go"

// Setting Levels
const lvls = {
  Easy: 6,
  Normal: 5,
  Hard: 4,
};
// Default Settings
let words = wordslvl_1;
let default_lvl = "Easy";
let levelDuration = lvls[default_lvl];
lvl.innerHTML = default_lvl;
lvlTime.innerHTML = levelDuration;
leftTime.innerHTML = levelDuration;
totalScore.innerHTML = words.length;

// Disable Paste
input.onpaste = function () {
  // window.alert("It not Allowed to PASTE the word");
  input.value = "DON'T cheat, NO Copy & Paste";
  return false;
};


// The Click To Start
function startGame(e) {
  input.value = "";
  input.focus();
  geneWord();
}
window.addEventListener('keyup', (event) => {
  if (event.key == "Enter") {
    startGame()
  } else ''
})

startBtn.addEventListener('click', () => {
  startGame()
})

// Selec level and add class to taget
selectlevel.forEach((li) => {
  // attach a click event listener to each list item
  li.addEventListener("click", (e) => {
    // remove the active class from all list items
    e.target.parentElement.querySelectorAll(".active").forEach((elem) => {
      elem.classList.remove("active");
      e.target.classList.add("active");
      changeValues(e.target.innerHTML);
    });
  });
});
// change values accprding to level
function changeValues(value) {
  if (value == "Easy") {
    words = wordslvl_1;
    lvl.innerHTML = value;
    levelDuration = lvls[value];
    lvlTime.innerHTML = levelDuration;
    leftTime.innerHTML = levelDuration;
  } else if (value == "Normal") {
    words = wordslvl_2;
    lvl.innerHTML = value;
    levelDuration = lvls[value];
    lvlTime.innerHTML = levelDuration;
    leftTime.innerHTML = levelDuration;
  } else if (value == "Hard") {
    words = wordslvl_3;
    lvl.innerHTML = value;
    levelDuration = lvls[value];
    lvlTime.innerHTML = levelDuration;
    leftTime.innerHTML = levelDuration;
  }
}

// Create span Of the theWord
function geneWord() {
  theWord.innerHTML = "";
  // Create random word and append to div
  let mainWord = document.createElement("span");
  randomWord = words[Math.floor(Math.random() * words.length)];
  mainWord.innerHTML = randomWord;
  theWord.appendChild(mainWord);
  // get word index
  let wordIndex = words.indexOf(randomWord);
  //remove the word from array
  words.splice(wordIndex, 1);
  // Empty UpcomingWord
  UpcomingWord.innerHTML = "";
  upcomingWrod();
  // Start Down Counter
  start(mainWord);
}
// Creat Upcoming Elements
function upcomingWrod() {
  UpcomingWord.innerHTML = "";
  words.forEach((word) => {
    let wordSpan = document.createElement("span");
    wordSpan.innerHTML = word;
    UpcomingWord.appendChild(wordSpan);
  });
}
// statistic of score time countdown
function start(theMainWord) {
  // Start Down Counter
  let downcount = setInterval(() => {
    leftTime.innerHTML -= 1;
    if (leftTime.innerHTML === "0") {
      clearInterval(downcount);
      if (input.value.toLowerCase() === theMainWord.innerHTML.toLowerCase()) {
        input.value = "";
        // Increase Score
        gotScore.innerHTML++;
        if (words.length > 0) {
          geneWord();
          leftTime.innerHTML = levelDuration;
        } else {
          if_Win();
        }
      } else {
        if_Lose();
      }
    }
  }, 1000);
}

// function to creat Span IF lose or win
function if_Lose() {
  let span = document.createElement("span");
  span.className = "lose";
  let spanText = document.createTextNode("Game Over");
  span.appendChild(spanText);
  finsh.appendChild(span);
  addScorToLoclaStorage();
  input.value = "";
  input.blur();
  setTimeout(() => {
    location.reload();
  }, 2500);
}

function if_Win() {
  let span = document.createElement("span");
  span.className = "win";
  let spanText = document.createTextNode("Congratz");
  span.appendChild(spanText);
  finsh.appendChild(span);
  addScorToLoclaStorage();
  input.value = "";
  input.blur();
  setTimeout(() => {
    location.reload();
  }, 2500);
}

function addScorToLoclaStorage() {
  const now = new Date();
  const options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const date = now.toLocaleString("en-US", options);
  const StorageScore = {
    Date: date,
    "Last Score": gotScore.innerHTML,
  };
  localStorage.setItem("Score", JSON.stringify(StorageScore));
}
