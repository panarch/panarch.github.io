const SLOT_WIDTH = 30;
const SLOT_HEIGHT = 30;
const NUM_WIDTH = 20;
const NUM_HEIGHT = 20;
const $board = document.querySelector('.board');

const Slot = {
  EMPTY: 'empty',
  ROAD: 'road',
  WALL: 'wall', // sound on bump
  HOLE: 'hole', // sound on 1-distance - continuous
  TRAP: 'trap', // sound on the position, caution a few times and activate
};

const board = new Array(NUM_HEIGHT);
for (let y = 0; y < NUM_HEIGHT; y++) {
  board[y] = new Array(NUM_WIDTH);
}

const $fragment = document.createDocumentFragment();

function getSlotId(x, y) { return `slot-${ x }-${ y }`; }

for (let x = 0; x < NUM_WIDTH; x++) {
for (let y = 0; y < NUM_HEIGHT; y++) {
    const $slot = document.createElement('div');
    $slot.setAttribute('id', getSlotId(x, y));
    $slot.classList.add('slot');
    $slot.style.left = `${ x * SLOT_WIDTH }px`;
    $slot.style.top = `${ y * SLOT_HEIGHT }px`;
    $fragment.appendChild($slot);
}
}

$board.appendChild($fragment);

let points = [
  [0, 0],
  [5, 0],
  [5, 5],
  [10, 5],
  [10, 19],
  [19, 19],
];

const MaxLengthRatio = {
  FORWARD: 0.7,
  NEUTRAL: 0.6,
  BACKWARD: 0.3,
};

function calculateMaxLengthRatio(direction, start, end) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const forward = [
    dx > 0 ? 1 : (dx < 0 ? -1 : 0),
    dy > 0 ? 1 : (dy < 0 ? -1 : 0),
  ];

  if ((direction[0] !== 0 && direction[0] === forward[0]) ||
      (direction[1] !== 0 && direction[1] === forward[1])) {
    return MaxLengthRatio.FORWARD;
  }

  return MaxLengthRatio.BACKWARD;
}

function generatePath() {
  // pick start & end point
  const choices = [
    [[0, 0], [NUM_WIDTH - 1, NUM_HEIGHT - 1]],
    [[0, NUM_HEIGHT - 1], [NUM_WIDTH - 1, 0]],
  ];

  const choice = choices[Math.random() > 0.5 ? 0 : 1];
  if (Math.random() > 0.5) choice.reverse();

  const [start, end] = choice;
  points = [start];

  let lastDirection = [0, 0];
  let current = start;

  let counter = 0;
  let MAX = 30;

  // loop until it reachs to the end
  while ((current[0] !== end[0] || current[1] !== end[1]) && counter++ < MAX) {
    const directions = [
      [+1, 0], [-1, 0], [0, +1], [0, -1],
    ].filter(d => (
      Math.abs(d[0]) !== Math.abs(lastDirection[0])
    ));

    const direction = directions[Math.floor(Math.random() * directions.length)];
    const ratio = calculateMaxLengthRatio(direction, start, end);
    const length = 2 + Math.floor(Math.random() * Math.min(NUM_WIDTH, NUM_HEIGHT) * ratio);
    const newX = current[0] + direction[0] * length;
    const newY = current[1] + direction[1] * length;

    const newCurrent = [
      Math.max(Math.min(NUM_WIDTH - 1, newX), 0),
      Math.max(Math.min(NUM_HEIGHT - 1, newY), 0),
    ];

    if (newCurrent[0] === current[0] && newCurrent[1] === current[1]) {
      continue;
    }

    current = newCurrent;
    lastDirection = direction;
    points.push(newCurrent);
  }

  generate();
}

function generate() {
  const start = points[0];
  const end = points[points.length - 1];
  const $start = document.getElementById(getSlotId(start[0], start[1]));
  const $end = document.getElementById(getSlotId(end[0], end[1]));
  $start.classList.add('start');
  $end.classList.add('end');

  board[start[0]][start[1]] = Slot.ROAD;
  board[end[0]][end[1]] = Slot.ROAD;

  for (let i = 0; i < points.length - 1; i++) {
    _generate(points[i], points[i + 1]);
  }
}

function _generate(p0, p1) {
  const [minX, maxX] = p0[0] < p1[0] ? [p0[0], p1[0]] : [p1[0], p0[0]];
  const [minY, maxY] = p0[1] < p1[1] ? [p0[1], p1[1]] : [p1[1], p0[1]];

  for (let x = minX; x <= maxX; x++) {
  for (let y = minY; y <= maxY; y++) {
    if (board[x][y] === Slot.EMPTY) {
      board[x][y] = Math.random() < 0.9 ? Slot.ROAD : Slot.TRAP;
    }

    const $slot = document.getElementById(getSlotId(x, y));
    if (!$slot.classList.contains('path')) {
      $slot.classList.add('path');
    }
  }
  }
}

function pickSlotType() {
  // ROAD, WALL, HOLE, TRAP
  const value = Math.random();
  if (value < 0.55) return Slot.ROAD;
  else if (value < 0.70) return Slot.TRAP;
  else if (value < 0.85) return Slot.HOLE;

  return Slot.WALL;
}

function fillEmptySlots() {
  for (let x = 0; x < NUM_WIDTH; x++) {
  for (let y = 0; y < NUM_HEIGHT; y++) {
    if (board[x][y] !== Slot.EMPTY) continue;

    const type = pickSlotType();
    board[x][y] = type;
  }
  }
}

function renderSlots() {
  for (let x = 0; x < NUM_WIDTH; x++) {
  for (let y = 0; y < NUM_HEIGHT; y++) {
    document.getElementById(getSlotId(x, y)).classList.add(board[x][y]);
  }
  }
}

const $player = document.createElement('div');
$player.classList.add('player');

const PLAYER_DIRECTIONS = [
  [0, -1], [1, 0], [0, 1], [-1, 0],
];

const $message = document.querySelector('.message');
let started = false;
let mapHidden = false;

let playerDirection = PLAYER_DIRECTIONS[0];
let playerPosition = [0, 0];

// game logic handlers
function resetPlayerPosition() {
  const [x, y] = points[0];
  document.getElementById(getSlotId(x, y)).appendChild($player);

  playerPosition = [x, y];
  playerDirection = PLAYER_DIRECTIONS[0];
  $player.style.transform = `rotateZ(-45deg)`;

  resetMusicPosition();
  updateTurnSound();
  updateMoveSound();
}

function turn(left = true) {
  let index = PLAYER_DIRECTIONS.indexOf(playerDirection);

  if (left) {
    index--;
    if (index < 0) index = PLAYER_DIRECTIONS.length - 1;
  } else {
    index++;
    if (index >= PLAYER_DIRECTIONS.length) index = 0;
  }

  playerDirection = PLAYER_DIRECTIONS[index];
  $player.style.transform = `rotateZ(${ -45 + 90 * index }deg)`;

  updateTurnSound();
}

function turnLeft() { turn(true); }
function turnRight() { turn(false); }

function move(d) {
  let [x, y] = playerPosition;

  x += playerDirection[0] * d;
  y += playerDirection[1] * d;

  const end = points[points.length - 1]
  const $slot = document.getElementById(getSlotId(x, y));
  if (!$slot || board[x][y] === Slot.WALL) {
    playWallSound();
    return;
  } else if (board[x][y] === Slot.HOLE) {
    playHoleSound();
    started = false;
    showMap();
    $message.textContent = `Oops! You've fallen into a sinkhole.`;
  } else if (x === end[0] && y === end[1]) {
    playSuccessSound();
    started = false;
    $message.textContent = 'Congratulations!!';
    showMap();
  }

  playerPosition = [x, y];
  document.getElementById(getSlotId(x, y)).appendChild($player);
  updateMoveSound();
}

function moveForward() { move(1); }
function moveBackward() { move(-1); }

// sound controls
const synth = new Tone.Synth().toMaster();
const panner = new Tone.Panner3D().toMaster();
panner.maxDistance = 50;
// panner.distanceModel = 'exponential';
// panner.panningModel = 'HRTF';

const player = new Tone.Player({
  url: './Allemande.mp3',
  loop: true,
}).connect(panner)
player.autostart = true;
player.volume.value = 0;

function resetMusicPosition() {
  const [x, y] = points[points.length - 1];
  panner.setPosition(x, 1, y);
}

function updateTurnSound() {
  Tone.Listener.setOrientation(
    playerDirection[0], 0, playerDirection[1],
    0, 1, 0
  );
}

function updateMoveSound() {
  const [x, y] = playerPosition;
  Tone.Listener.setPosition(x, 0, y);

  // check holes

  // check trap
  if (board[x][y] === Slot.TRAP) {
    activateTrap(x, y);
  }

  resetHoleSideSounds();
  if (board[x + 1] && board[x + 1][y] === Slot.HOLE) playHoleSideSound(0, x + 1, y);
  if (board[x - 1] && board[x - 1][y] === Slot.HOLE) playHoleSideSound(1, x - 1, y);
  if (board[x][y + 1] === Slot.HOLE) playHoleSideSound(2, x, y + 1);
  if (board[x][y - 1] === Slot.HOLE) playHoleSideSound(3, x, y - 1);
}

function activateTrap(x, y) {
  function _run(counter) {
    if (x !== playerPosition[0] || y !== playerPosition[1]) {
      return; // cancel trap timer
    }

    if (counter <= 0) {
      synth.triggerAttackRelease('G5', '4n');
      started = false;
      showMap();
      $message.textContent = 'Oops! Trap activated!';
      return;
    } else {
      synth.triggerAttackRelease('F3', '8n');
    }

    setTimeout(_run.bind(this, counter - 1), 500);
  }

  _run(3);
}

const noises = [
  new Tone.Noise({ volume: -30, type: 'brown' }),
  new Tone.Noise({ volume: -30, type: 'brown' }),
  new Tone.Noise({ volume: -30, type: 'brown' }),
  new Tone.Noise({ volume: -30, type: 'brown' }),
];

const noisePanners = [
  new Tone.Panner3D(),
  new Tone.Panner3D(),
  new Tone.Panner3D(),
  new Tone.Panner3D()
];

noises.forEach((noise, i) => {
  noise.connect(noisePanners[i]);
});

noisePanners.forEach(panner => {
  panner.toMaster();
  panner.maxDistance = 1;
});

function resetHoleSideSounds() {
  noises.forEach(noise => {
    noise.stop();
  })
}

function playHoleSideSound(i, x, y) {
  noisePanners[i].setPosition(x, 0, y);
  noises[i].start();
}

function playHoleSound()  {
  synth.triggerAttackRelease('A5', '4n');
}

function playWallSound() {
  const fmsynth = new Tone.FMSynth({
    modulationIndex: 12.22,
    envelope: {
      attack: 0.01,
      decay: 0.2,
    },
    modulation: {
      type: 'square',
    },
    modulationEnvelope: {
      attack: 0.01,
      decay: 0.01,
    },
    volume: -5,
  }).toMaster();

  const note = ['C3', 'C#3', 'D3', 'D#3', 'E3'][Math.floor(Math.random() * 5)];
  fmsynth.triggerAttackRelease(note, '4n');
}

function playSuccessSound() {
  const polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();
  polySynth.triggerAttackRelease(['C4', 'D4', 'G4', 'Bb4'], '2n');
}

// game controls
const $startBtn = document.querySelector('.btn-start');
const $mapBtn = document.querySelector('.btn-map');

$mapBtn.addEventListener('click', toggleMap);
$startBtn.addEventListener('click', function () {
  $startBtn.textContent = 'Restart';
  start();
});

function toggleMap() {
  if (mapHidden) {
    showMap();
  } else {
    hideMap();
  }
}

function showMap() {
  mapHidden = false;
  $board.classList.remove('hidden');
  $mapBtn.textContent = 'Hide Map';
}

function hideMap() {
  mapHidden = true;

  if (!$board.classList.contains('hidden')) {
    $board.classList.add('hidden');
    $mapBtn.textContent = 'Show Map';
  }
}

function start(hide = true) {
  for (let x = 0; x < NUM_WIDTH; x++) {
  for (let y = 0; y < NUM_HEIGHT; y++) {
    board[x][y] = Slot.EMPTY;

    document.getElementById(getSlotId(x, y)).classList
      .remove('path', 'start', 'end', Slot.ROAD, Slot.WALL, Slot.HOLE, Slot.TRAP);
  }
  }

  if (hide) {
    hideMap();
    started = true;
    $message.textContent = 'Close your eyes and try!';
  }

  generatePath();
  fillEmptySlots();
  renderSlots();
  resetPlayerPosition();
}

start(false);

// key event handlers
document.addEventListener('keydown', function (e) {
  if (!started) return;

  switch (e.key) {
  case 'a': return turnLeft();
  case 'd': return turnRight();
  case 'w': return moveForward();
  case 's': return moveBackward();
  }
});
