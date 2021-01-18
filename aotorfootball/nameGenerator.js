const aot = [
"Armin Arlert",
"Boris Feulner",
"Conny Springer",
"Dirk Reiss",
"Florian Reiss",
"Franz Kefka",
"Gunther Schultz",
"Ian Dietrich",
"Karl Fritz",
"Kenny Ackermann",
"Kitz Woermann",
"Luke Siss",
"Martin Springer",
"Reiner Braun",
"Theo Magath",
"Thomas Wagner",
"Jean Kirschstein",
"Sasha Braus",
"Marlo Freudenberg",
"Darius Walbrunn",
"Zeke Jaeger",
"Reiner Braun",
"Dieter Ness",
"Dennis Aiblinger",
"Rico Brzenska",
"Marco Bodt",
"Elliot Stratmann"
];

const football = [
"Grischa Proemel",
"Thomas Linke",
"Marco Bode",
"Felix Magath",
"Christian Springer",
"Sandro Wagner",
"Markus Brzenska",
"Markus Feulner",
"Marco Reus",
"Benjamin Lauth",
"Sascha Kirschstein",
"Nico Schulz",
"Paul Steiner",
"Timo Horn",
"Clemens Fritz",
"Christian Woerns",
"Robin Krausse",
"Peter Dietrich",
"Keven Schlotterbeck",
"David Raum",
"Luca Waldschmidt",
"Christian Guenter",
"Soeren Gonther",
"Reiner Geyer"
];

let currentName = "";
let guesses = 0;
let points = 0;

function getName() {
document.getElementById("newGame").style.display = "none";
const rand = Math.floor(Math.random() * 2);
const arr = rand === 0
  ? aot
  : football;

const rand2 = Math.floor(Math.random() * arr.length);
currentName = arr[rand2];
return currentName;
}

function isFootballer() {
    isInArray(football);
}

function isAoT() {
    isInArray(aot);
}

function isInArray(arr) {
document.getElementById("newGame").style.display = "block";
guesses++;
for (name of arr) {
  if (name === currentName) {
    points++;
    document.getElementById("result").innerHTML = "CORRECT! " + points + " / " + guesses;
    return true;
  }
}
document.getElementById("result").innerHTML = "WRONG! " + points + " / " + guesses;
return false;
}

function newGame() {
document.getElementById("name").innerHTML = getName();
document.getElementById("result").innerHTML = "";
document.getElementById("newGame").style.display = "none";
}

document.getElementById("name").innerHTML = getName();
document.getElementById("aotButton").addEventListener('click', isAoT, true);
document.getElementById("footballButton").addEventListener('click', isFootballer, true);
document.getElementById("newGame").addEventListener('click', newGame, true);