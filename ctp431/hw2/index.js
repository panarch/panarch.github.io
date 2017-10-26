const $body = document.body;
const $select = document.querySelector('select');
const $file = document.querySelector('input[type="file"]');
const $container = document.querySelector('.container');
const $box = document.querySelector('.box');
const $bars = document.querySelectorAll('.box > div');
const $micButton = document.querySelector('.mic-button');
const $demoButton = document.querySelector('.demo-button');
const $fileButton = document.querySelector('.file-button');
$micButton.addEventListener('click', playMic, false);
$demoButton.addEventListener('click', playFile, false);
$fileButton.addEventListener('click', playFile.bind(null, false), false);
$select.addEventListener('change', loadSample);
$file.addEventListener('change', loadFile);

const HEIGHT = 400;
const MIN_DB = -96.0; // dB

const context = new AudioContext();
const analyser = context.createAnalyser();
analyser.fftSize = 2048;
analyser.smoothingTimeConstant = 0;    

let source = null;
let sourceNode = null;
let mediaSourceNode = null;

let micOn = false;
let filePlayOn = false;
let animationId;
let demoBuffer;
let fileBuffer;

async function loadSample() {
  $demoButton.setAttribute('disabled', '');
  const fileName = $select.value;
  const response = await fetch(`./music/${ fileName }`, { method: 'GET' });
  const result = await response.arrayBuffer();
  demoBuffer = await context.decodeAudioData(result);

  $demoButton.removeAttribute('disabled');
}

async function loadFile() {
  $fileButton.setAttribute('disabled', '');
  const file = $file.files[0];
  const fileReader = new FileReader();
  fileReader.onload = async function (event) {
    fileBuffer = await context.decodeAudioData(event.target.result);
    $fileButton.removeAttribute('disabled');
  };
  fileReader.readAsArrayBuffer(file);

}

loadSample();

function getColor(color) { return `rgb(${ color }, ${ color }, ${ color })`; }

let prevTime = null;
let prevSoundLevels = null;
let angle = 0;
let scale = 1.0;
let origin = 0.5; // 0 ~ 1.0
let originDirection = 1;
let rotateDirection = 1;

function animate(time) {
  const dataArray = new Float32Array(analyser.frequencyBinCount);
  analyser.getFloatFrequencyData(dataArray);

  const dbs = calcOctaveband(dataArray)
  const soundLevels = dbs.map(db => ((db - MIN_DB) / (0.0 - MIN_DB) * HEIGHT));
  const color = (255 - soundLevels[0] * 35 / HEIGHT) | 0;
  const color2 = (255 - soundLevels[1] * 25 / HEIGHT) | 0;
  const color3 = (255 - soundLevels[2] * 15 / HEIGHT) | 0;
  $body.style.backgroundColor = getColor(color);
  $container.style.backgroundColor = getColor(color2);
  $box.style.backgroundColor = getColor(color3);

  const scaleX = 0.4 + soundLevels[5] / 350;

  for (let i = 0; i < 10; i++) {
    const $bar = $bars[i];
    const soundLevel = soundLevels[i];
    const scaleY = soundLevel / HEIGHT * 1.2;
    const translateY = origin * 400 + ((0.5 - origin) * 10) - origin * scaleY * HEIGHT;
    const transform = 
      `translate3d(${ 39 * i + 9 }px, ${ translateY }px, 0) scale3d(${ scaleX }, ${ scaleY }, 1.0)`;

    $bar.style.transform = transform; 
    $bar.textContent = dbs[i] | 0;
  }

  const _rotateVelocity = -soundLevels[3] / 8;
  const _scaleVelocity = soundLevels[4] / 300;
  const _originVelocity = soundLevels[8] / 300;

  if (prevTime !== null) {
    const reverse = Math.abs(soundLevels[9] - prevSoundLevels[9]) > 20;
    if (reverse) {
      rotateDirection *= -1;
    }
    const gap = (time - prevTime) / 1000;
    angle += gap * _rotateVelocity * rotateDirection;
    scale = 0.6 + soundLevels[5] / 400;

    origin += gap * _originVelocity * originDirection;
    if (origin > 1.0) {
      origin = 1.0;
      originDirection = -1;
    } else if (origin < 0) {
      origin = 0;
      originDirection = 1;
    }

    $box.style.transform =
      `rotate3d(0, 0, 1.0, ${ angle }deg) scale3d(${ scale }, ${ scale }, 1)`;
  } else {
    $box.style.opacity = 1.0;
  }

  prevTime = time;
  prevSoundLevels = soundLevels;

  animationId = requestAnimationFrame(animate);
}

function playMic() {
  if (filePlayOn) {
    turnOffFileAudio();
  }

  if (micOn) {
    turnOffMicAudio();
    return;
  }

  if (!navigator.getUserMedia) {
    navigator.getUserMedia = (navigator.getUserMedia({audio: true}) || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }

  if (!navigator.getUserMedia)
    alert('Error: getUserMedia not supported!');

  // get audio input streaming
  navigator.getUserMedia({ audio: true }, onStream, onStreamError);

  micOn = true;
  $micButton.textContent = 'Mic Off';
}

let _stream;

// success callback
function onStream(stream) {
  mediaSourceNode = context.createMediaStreamSource(stream);
  _stream = stream;

  // Connect graph
  mediaSourceNode.connect(analyser);

  // visualize audio animation
  animationId = requestAnimationFrame(animate, context.sampleRate / analyser.fftSize);
}

// errorCallback       
function onStreamError(error) {
  console.error('Error getting microphone', error);

  micOn = false;
}

function playFile(demo = true) {
  if (filePlayOn) {
    turnOffFileAudio();
    return;
  }

  if (micOn) {
    turnOffMicAudio();
  }

  sourceNode = context.createBufferSource();
  sourceNode.buffer = demo ? demoBuffer : fileBuffer;
  sourceNode.connect(context.destination);
  sourceNode.start(0);
  sourceNode.connect(analyser);

  // visualize audio animation
  animationId = requestAnimationFrame(animate, context.sampleRate/analyser.fftSize);

  filePlayOn = true;
  
  if (demo) {
    $demoButton.textContent = 'Demo Audio Stop';
  } else {
    $fileButton.textContent = 'File Audio Stop';
  }
}

function turnOffMicAudio() {
  $micButton.textContent = 'Mic On';
  mediaSourceNode = null;
  micOn = false;

  _stream.getAudioTracks()[0].stop();

  stopAnimation();
}

function turnOffFileAudio() {
  $demoButton.textContent = 'Demo Audio Play';
  $fileButton.textContent = 'File Audio Play';
  sourceNode.stop(0);
  sourceNode = null;
  filePlayOn = false;

  stopAnimation();
}

function stopAnimation() { 
  $body.style.backgroundColor = 'white';
  $container.style.backgroundColor = 'white';
  $box.style.backgroundColor = 'white';
  $box.style.opacity = 0;
  prevTime = null;
  window.cancelAnimationFrame(animationId);
}

function calcOctaveband(inputArray) {
  const lowerFreqs = [22, 44, 88, 177, 355, 710, 1420, 2840, 5680, 11360];
  const upperFreqs = [44, 88, 177, 355, 710, 1420, 2840, 5680, 11360, 22720];
  const centerFreqs = [31.5, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

  // compute FFT power first 
  const fftPower = new Array(inputArray.length);
  for (let i = 0; i < inputArray.length; i++) {
    fftPower[i] = Math.pow(10.0, inputArray[i]/10.0);
  }

  const bandPower = new Array(centerFreqs.length);

  for (let i = 0; i < centerFreqs.length; i++) {
    const lowerBin = Math.floor(lowerFreqs[i] / 22050.0 * inputArray.length);
    let upperBin = Math.floor(upperFreqs[i] / 22050.0 * inputArray.length);
    // const center_bin = Math.ceil(centerFreqs[i] / 22050.0 * inputArray.length);

    if (upperBin >= fftPower.length) {
      upperBin = fftPower.length - 1;
    }

    bandPower[i] = 0;
    for (let j = lowerBin; j< upperBin; j++ ) {
      bandPower[i] = bandPower[i] + fftPower[j];
    }
  }

  const bandLevelDbs = new Array(bandPower.length);

  for (let i = 0; i < bandLevelDbs.length; i++) {
    bandLevelDbs[i] = 10.0 * Math.log10(bandPower[i]);

    if (bandLevelDbs[i] < MIN_DB) {
      bandLevelDbs[i] = MIN_DB;
    }
  }

  return bandLevelDbs;
}
