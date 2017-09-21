const context = new AudioContext();
const padIds = ['#s1', '#s2', '#s3', '#s4'];
const fileNames = ['sound1.wav', 'sound2.wav', 'sound3.wav', 'sound4.wav'];
const buffers = new Array(4);
const gainNodes = new Array(4);
const $playDemo = document.querySelector('#play-demo');
const $play = document.querySelector('#play');
const $record = document.querySelector('#record');
const demoRecords = [[0,640],[0,846],[0,941],[0,1032],[0,1260],[0,1462],[0,1688],[0,1906],[1,2409],[2,2823],[1,3056],[1,3433],[2,3662],[3,3867],[1,4062],[1,4140],[1,4222],[2,4461],[1,4709],[1,5136],[2,5337],[3,5550]];
let isRecording = false;
let isPlaying = false;
let beginTime;
let records = [];

$record.addEventListener('click', function () {
  $record.textContent = isRecording ? 'Record' : 'Stop';
  isRecording = !isRecording;

  if (isRecording) {
    beginTime = Date.now();
    records = [];
  } else if (records.length > 0) {
    $play.removeAttribute('disabled');
  }
});

$playDemo.addEventListener('click', function () {
  isPlaying = true;
  $playDemo.setAttribute('disabled', '');
  $play.setAttribute('disabled', '');
  $record.setAttribute('disabled', '');

  playRecords(true);
});

$play.addEventListener('click', function () {
  isPlaying = true;
  $playDemo.setAttribute('disabled', '');
  $play.setAttribute('disabled', '');
  $record.setAttribute('disabled', '');

  playRecords();
});

for (let i = 0; i < 4; i++) {
  gainNodes[i] = context.createGain();
  gainNodes[i].gain.value = calculateGain(-12);
  gainNodes[i].connect(context.destination);
}

fileNames.forEach(async (fileName, i) => {
  const response = await fetch(`./sounds/${ fileName }`, { method: 'GET' });
  const result = await response.arrayBuffer();
  context.decodeAudioData(result, function (buffer) { buffers[i] = buffer; });
});

padIds.forEach((id, i) => {
  const $pad = document.querySelector(id);
  const $input = $pad.querySelector('input');
  const $button = $pad.querySelector('button');
  const $dbLabel = $pad.querySelector('p');

  $input.addEventListener('change', function () {
    const value = $input.value;
    $dbLabel.textContent = `${ value }dB`;
    gainNodes[i].gain.value = calculateGain(Number(value));
  });

  $button.addEventListener('mousedown', function () { if (!isPlaying) play(i); });
  $button.addEventListener('transitionend', function () { $button.classList.remove('active'); });
});

window.addEventListener('keydown', e => {
  if (isPlaying) return;

  switch (e.keyCode) {
  case 67: // d, c
  case 68:
    play(0);
    break;
  case 70: // f, v
  case 86:
    play(1);
    break;
  case 74: // j, n
  case 78:
    play(2);
    break;
  case 75: // k, m
  case 77:
    play(3);
    break;
  }
});

function playRecords(isDemo = false) {
  const _records = isDemo ? demoRecords : records;
  _records.forEach(([i, time]) => {
    setTimeout(function () { play(i) }, time);
  });

  const lastTime = _records[_records.length - 1][1];
  setTimeout(function () {
    isPlaying = false;

    $playDemo.removeAttribute('disabled');
    $record.removeAttribute('disabled');
    if (records.length > 0) $play.removeAttribute('disabled');
  }, lastTime);
}

function play(i) {
  if (i < 0) return;

  if (isRecording) {
    records.push([i, Date.now() - beginTime]);
  }

  const $button = document.querySelector(`${ padIds[i] } > button`);
  $button.classList.toggle('active');

  const source = context.createBufferSource();
  source.buffer = buffers[i];
  source.connect(gainNodes[i]);
  source.start();
}

function calculateGain(db) {
  return Math.pow(10, db / 20);
}
