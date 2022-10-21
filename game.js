const { userInfo } = require("os");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

async function execute(runFn) {
  try {
    await runFn(prompt);
    rl.close();
  } catch (e) {
    console.error("unable to prompt", e);
  }
}

function run(runFn) {
  execute(runFn).then();
  rl.on("close", () => process.exit(0));
}

module.exports = { run };

function drawTable(table) {
  const divider = "-------------";
  let tabledraw = divider;
  tabledraw += "\n";
  for (let i = 0; i < table.length; i++) {
    if (table[i] === "") {
      tabledraw += "| " + i + " ";
    } else {
      tabledraw += "| " + table[i] + " ";
    }

    if ((i + 1) % 3 === 0) {
      tabledraw += "|\n" + divider + "\n";
    }
  }
  return tabledraw;
}

async function ttt() {
  Win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const table = ["", "", "", "", "", "", "", "", ""];
  const currentTableStr = drawTable(table);
  console.log(currentTableStr);

  let username1 = await prompt("Player1, choose your name: ");
  let userInput1 = [];

  let username2 = await prompt("Player2, choose your name: ");
  let userInput2 = [];

  let gameFinished = false;

  while (!gameFinished) {
    let x = await prompt(username1 + " enter your field: ");
    table[x] = "x";

    console.log(drawTable(table));

    let o = await prompt(username2 + " enter your field: ");
    table[o] = "O";

    console.log(drawTable(table));
  }
}

run(ttt);
