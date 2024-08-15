// 1. Deposit some money
// 2. Determine  number of lines to bet on
// 3. Collect a bet Amount
// 4. spin the sloth machine
// 5. check if the user won
// 6. give the user money
//7. play again / has money?
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOLS_VALUEs = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSYMBOLS = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomindex = Math.floor(Math.random() * reelSYMBOLS.length);
      const selectedSYMBOl = reelSYMBOLS[randomindex];
      reels[i].push(selectedSYMBOl);
      reelSYMBOLS.splice(randomindex, 1);
    }
  }

  return reels;
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter Amount : ");
    const numberDepositAmount = parseFloat(depositAmount);
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalide Deposit amount, Try again");
    } else {
      return numberDepositAmount;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const Lines = prompt("Enter The number of lines to bet on (1-3) : ");
    const NumberOfLines = parseFloat(Lines);
    if (isNaN(NumberOfLines) || NumberOfLines <= 0 || NumberOfLines > 3) {
      console.log("Invalide NumbersOfLine , Try again");
    } else {
      return NumberOfLines;
    }
  }
};

const getBet = (balance, Lines) => {
  while (true) {
    const Bet = prompt("Enter The per line bet : ");
    const numberBet = parseFloat(Bet);
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / Lines) {
      console.log("Invalide bet , Try again");
    } else {
      return numberBet;
    }
  }
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
};

const prinRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinning = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOLS_VALUE[symbols[0]];
    }
  }
  return winnings;
};

const game = () => {
  while (true) {
    let balance = deposit();
    console.log("you have a balance of $" + balance);
    const numberoflines = getNumberOfLines();
    const bet = getBet(balance, numberoflines);
    balance -= bet * numberoflines;
    const reels = spin();
    const rows = transpose(reels);
    prinRows(rows);
    const winning = getWinning(rows, bet, numberoflines);
    balance += winning;
    console.log("you win $" + winning.toString());
    if (balance === 0) {
      console.log("your broke");
      break;
    }
    const playAgain = prompt("do you want to play again?");
    if (playAgain != "y") break;
  }
};

game();
