// Codecademy JavaScipt Portfolio Syntax Project: Mixed Messages (random message generator)
// My project title: Random Cricket Captaincy!

// random integer function 0 to num - 1
function rndNum(num) {
  return Math.floor(Math.random() * num);
}

// create function to randomly select the cricket roles and form the messages
function rndSelCricketRoles(object) {
  // create array to contain randomly selected message components
  let selCricketRoles = [];
  // create array to contain positional data for canvas
  let canvasCoords = [];
  // loop over object properties
  for (const key in object) {
    //generate random number to select value
    const rndIndex = rndNum(object[key].length);
    // switch between the object keys
    switch (key) {
      case "batting":
        const batPos = object[key][rndIndex];
        canvasCoords.push(batPos);
        selCricketRoles.push(`Your batting position will be number ${batPos}.`);
        object[key].splice(rndIndex, 1); // must delete as can't have two batters at same position
        break;
      case "bowling":
        const bowlPos = object[key][rndIndex];
        canvasCoords.push(bowlPos[1], bowlPos[2]);
        // special wording for non-bowler
        if (rndIndex === 0) {
          selCricketRoles.push(`You will not be bowling today.`);
          break;
        } else {
          selCricketRoles.push(`Today you will be bowling ${bowlPos[0]}.`);
          break;
        }
      case "fielding":
        // special wording for wicket keeper
        const fieldPos = object[key][rndIndex];
        canvasCoords.push(fieldPos[1], fieldPos[2]);
        if (rndIndex === 0) {
          selCricketRoles.push(`You will be our wicket keeper today.`);
          delete object[key].splice(rndIndex, 1); // must delete as can't have two fielders in same position
          break;
        } else {
          selCricketRoles.push(`I'd like you to field at ${fieldPos[0]}.`);
          delete object[key].splice(rndIndex, 1); // must delete as can't have two fielders in same position
          break;
        }
      case "training":
        // special wording for first three values
        if (rndIndex <= 2) {
          selCricketRoles.push(
            `You would benefit from attending a course in ${object[key][rndIndex]}.`
          );
          break;
        } else {
          selCricketRoles.push(
            `You would benefit from some ${object[key][rndIndex]}.`
          );
          break;
        }
      case "comments":
        selCricketRoles.push(object[key][rndIndex]);
        break;
      default:
        selCricketRoles.push(
          `I have a lack of information about you. Twelfth man please.`
        );
        break;
    }
  }
  return { selCricketRoles, canvasCoords }; // return the array of random message components
}

// factory fnction to create players/roles object
const playerFactory = (
  playerName,
  battingNo,
  battingPosition,
  bowlingX,
  bowlingY,
  bowlingType,
  fieldingX,
  fieldingY,
  fieldingPosition,
  trainingType,
  playerComment
) => {
  return {
    playerName,
    battingNo,
    battingPosition,
    bowlingX,
    bowlingY,
    bowlingType,
    fieldingX,
    fieldingY,
    fieldingPosition,
    trainingType,
    playerComment,
  };
};

const players = [
  "Hugo Swigalot",
  "Ken Lawrance",
  "Robert Hawkins",
  "Steve Lawrance",
  "Andy Phillips",
  "Gareth Pegg",
  "David Dimbleby",
  "Matt Debbage",
  "Tim Rochford",
  "Mick Butterworth",
  "Silja Pike",
];

const possCricketRoles = {
  batting: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  bowling: [
    ["non-bowler", null, null],
    ["right arm leg break", 19, 26],
    ["right arm off break", 19, 25],
    ["left arm orthodox", 21, 25],
    ["left arm chinaman", 21, 26],
    ["right arm fast", 19.5, 30],
    ["right arm fast/medium", 19.3, 28],
    ["right arm medium", 19, 27],
    ["left arm fast", 20.5, 30],
    ["left arm fast/medium", 20.7, 28],
    ["left arm medium", 21, 27],
  ],
  fielding: [
    ["wicket keeper", 19.8, 14],
    ["mid off", 16.5, 26],
    ["mid on", 23, 26],
    ["gully", 15.8, 15],
    ["point", 12, 17],
    ["cover", 12.5, 20.5],
    ["square leg", 29, 17],
    ["mid wicket", 27, 20.5],
    ["fine leg", 27.8, 4.2],
    ["third man", 9, 6],
    ["short third man", 13, 11],
    ["first slip", 19.2, 13],
    ["second slip", 18.7, 13.3],
    ["third slip", 18.2, 13.6],
    ["fourth slip", 17.7, 13.9],
    ["fifth slip", 17.2, 14.2],
    ["fly slip", 15, 9],
    ["deep point", 3, 17],
    ["deep cover", 2.6, 22],
    ["extra cover", 12, 24],
    ["deep extra cover", 7, 32],
    ["long off", 15, 37],
    ["long on", 25, 37],
    ["cow corner", 34.8, 29.7],
    ["deep square leg", 37, 16],
    ["short fine leg", 25, 10],
    ["leg slip", 23, 14],
    ["short leg", 23, 17],
    ["short mid wicket", 23, 19],
    ["silly point", 17, 17],
    ["silly mid off", 17, 19],
    ["silly mid on", 22.5, 20.2],
    ["backward square leg", 28, 12],
    ["backward point", 12, 15],
    ["deep backward point", 4.5, 11.8],
    ["long leg", 31.5, 6.7],
    ["leg gully", 24, 15.5],
    ["deep mid wicket", 37.4, 22],
  ],
  training: [
    "the art of sledging",
    "friendly banter for the village cricketer",
    "basic personal hygiene",
    "fitness training",
    "batting practice",
    "bowling practice",
    "catching practice",
    "throwing practice",
    "slip catching practice",
    "wicket keeping drills",
    "running between the wickets practice",
    "ground fielding drills",
  ],
  comments: [
    "The captain is an idiot.",
    "I am delighted with my involvement today.",
    "I feel like a much valued member of the team.",
    "What a waste of my time.",
    "You will not receive my vote at the AGM.",
    "Splurge ring dink glooster rooster!",
  ],
};

const playersArray = [];

// loop over all players to assign roles
function assignRoles() {
  for (const player of players) {
    const playerRoles = rndSelCricketRoles(possCricketRoles);
    playersArray.push(
      playerFactory(
        player,
        playerRoles.canvasCoords[0],
        playerRoles.selCricketRoles[0],
        playerRoles.canvasCoords[1],
        playerRoles.canvasCoords[2],
        playerRoles.selCricketRoles[1],
        playerRoles.canvasCoords[3],
        playerRoles.canvasCoords[4],
        playerRoles.selCricketRoles[2],
        playerRoles.selCricketRoles[3],
        playerRoles.selCricketRoles[4]
      )
    );
  }
  return playersArray;
}

assignRoles();



/*
    playerName,
    battingNo,
    battingPosition,
    bowlingX,
    bowlingY,
    bowlingType,
    fieldingX,
    fieldingY,
    fieldingPosition,
    trainingType,
    playerComment,
*/

/*draw***************************************************/

function getSet() {
  const canvas = document.querySelector("#pitch");
  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext("2d");
  const pitchRad = Math.min(0.455 * canvas.width, 0.455 * canvas.height);
  // number of lines going across:
  const linesAcross = 40;
  // number of lines going up/down:
  const linesUpDown = 40;
  // spacing of the lines going across:
  const spacingAcross = canvas.height / linesAcross;
  // spacing of the lines going up/down:
  const spacingUpDown = canvas.width / linesUpDown;
  return {
    canvas,
    ctx,
    pitchRad,
    linesAcross,
    linesUpDown,
    spacingAcross,
    spacingUpDown,
  };
}

function drawField() {
  const set = getSet();
  const [cv, cx, pr] = [set.canvas, set.ctx, set.pitchRad];
  cx.clearRect(0, 0, cv.width, cv.height);
  cx.fillStyle = "#608a44";
  cx.beginPath();
  cx.arc(cv.width / 2, cv.height / 2, pr, 0, 2 * Math.PI);
  cx.fill();
}

function drawPitch() {
  const set = getSet();
  const [cv, cx, pr] = [set.canvas, set.ctx, set.pitchRad];
  const pitchScale = 0.4;
  const pitchRatio = 0.25;
  const pitchLength = pitchScale * pr;
  const pitchWidth = pitchRatio * pitchScale * pr;
  cx.fillStyle = "darkkhaki";
  cx.fillRect(
    cv.width / 2 - pitchWidth / 2,
    cv.height / 2 - pitchLength / 2,
    pitchWidth,
    pitchLength
  );
}

function drawGrid() {
  const set = getSet();
  const [cv, cx, lA, lUD, sA, sUD] = [
    set.canvas,
    set.ctx,
    set.linesAcross,
    set.linesUpDown,
    set.spacingAcross,
    set.spacingUpDown,
  ];
  cx.strokeStyle = "black";
  cx.lineWidth = 1;
  // lines going across:
  for (let i = 1; i < lA; i++) {
    cx.beginPath();
    cx.moveTo(0, i * sA);
    cx.lineTo(cv.width, i * sA);
    cx.stroke();
    cx.fillStyle = "red";
    cx.textAlign = "center";
    cx.textBaseline = "middle";
    cx.fillText(i, sUD / 2, i * sA);
    cx.fillText(i, cv.width - sUD / 2, i * sA);
  }
  // lines going up/down:
  for (let i = 1; i < lUD; i++) {
    cx.beginPath();
    cx.moveTo(i * sUD, 0);
    cx.lineTo(i * sUD, cv.height);
    cx.stroke();
    cx.fillStyle = "red";
    cx.textAlign = "center";
    cx.textBaseline = "middle";
    cx.fillText(i, i * sUD, sA / 2);
    cx.fillText(i, i * sUD, cv.height - sA / 2);
  }
}

// function for drawing players
function drawPlayer(x, y, colour = "white") {
  const set = getSet();
  const [cx, sA, sUD] = [set.ctx, set.spacingAcross, set.spacingUpDown];
  cx.fillStyle = colour;
  cx.beginPath();
  cx.arc(sA * x, sUD * y, 5, 0, 2 * Math.PI);
  cx.fill();
}

// who is bowling?
function bowlerNumGen() {
  const num = rndNum(11);
  if (playersArray[num].bowlingX === null) {
    return bowlerNumGen();
  } else {
    return num;
  }
}

// function for rendering the players
function drawPos() {
  const bowlerNum = bowlerNumGen();
  const open = document.getElementById("open");
  open.innerHTML = playersArray[bowlerNum].playerName;
  for (let i = 0; i < 11; i++) {
    if (i === bowlerNum) {
      drawPlayer(
        playersArray[bowlerNum].bowlingX,
        playersArray[bowlerNum].bowlingY,
        "blue"
      );
    } else {
      drawPlayer(playersArray[i].fieldingX, playersArray[i].fieldingY);
    }
  }
  // draw batters. Non striker changes sides according to bowlers action.
  drawPlayer(20.1, 17.3, "black");
  if (playersArray[bowlerNum].bowlingX < 20) {
    drawPlayer(20.7, 22.7, "black");
  } else {
    drawPlayer(19.3, 22.7, "black");
  }
}

drawField();
drawPitch();
drawPos();
//drawGrid();

//interact/////////////////////////////////////////////////////////

const p1butt = document.getElementById("p1");
const p2butt = document.getElementById("p2");
const p3butt = document.getElementById("p3");
const p4butt = document.getElementById("p4");
const p5butt = document.getElementById("p5");
const p6butt = document.getElementById("p6");
const p7butt = document.getElementById("p7");
const p8butt = document.getElementById("p8");
const p9butt = document.getElementById("p9");
const p10butt = document.getElementById("p10");
const p11butt = document.getElementById("p11");

p1butt.innerHTML = playersArray[0].playerName;
p2butt.innerHTML = playersArray[1].playerName;
p3butt.innerHTML = playersArray[2].playerName;
p4butt.innerHTML = playersArray[3].playerName;
p5butt.innerHTML = playersArray[4].playerName;
p6butt.innerHTML = playersArray[5].playerName;
p7butt.innerHTML = playersArray[6].playerName;
p8butt.innerHTML = playersArray[7].playerName;
p9butt.innerHTML = playersArray[8].playerName;
p10butt.innerHTML = playersArray[9].playerName;
p11butt.innerHTML = playersArray[10].playerName;

const refreshButton = document.getElementById("refresh-button");

const tabName = document.getElementById("name");
const tabBat = document.getElementById("bat");
const tabBowl = document.getElementById("bowl");
const tabField = document.getElementById("field");
const tabTrain = document.getElementById("train");
const tabComment = document.getElementById("comment");
const tabD = document.getElementsByClassName("td");

function displayRoles(p) {
  tabName.innerHTML = playersArray[p].playerName;
  tabBat.innerHTML = playersArray[p].battingPosition;
  tabBowl.innerHTML = playersArray[p].bowlingType;
  tabField.innerHTML = playersArray[p].fieldingPosition;
  tabTrain.innerHTML = playersArray[p].trainingType;
  if (p === 0) {
    tabComment.innerHTML =
      'I keep "The Art of Captaincy" by Mike Brearley at my bedside.';
  } else {
    tabComment.innerHTML = playersArray[p].playerComment;
  }
}

p1butt.addEventListener("click", function () {
  displayRoles(0);
});
p2butt.addEventListener("click", function () {
  displayRoles(1);
});
p3butt.addEventListener("click", function () {
  displayRoles(2);
});
p4butt.addEventListener("click", function () {
  displayRoles(3);
});
p5butt.addEventListener("click", function () {
  displayRoles(4);
});
p6butt.addEventListener("click", function () {
  displayRoles(5);
});
p7butt.addEventListener("click", function () {
  displayRoles(6);
});
p8butt.addEventListener("click", function () {
  displayRoles(7);
});
p9butt.addEventListener("click", function () {
  displayRoles(8);
});
p10butt.addEventListener("click", function () {
  displayRoles(9);
});
p11butt.addEventListener("click", function () {
  displayRoles(10);
});


/*
// draw all possible player fielding positions
for (let i = 0; i < possCricketRoles.fielding.length; i++) {
    drawPlayer(possCricketRoles.fielding[i][1], possCricketRoles.fielding[i][2]);
  }
*/