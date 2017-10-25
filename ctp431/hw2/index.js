const $box = document.querySelector('.box');
const $bars = document.querySelectorAll('.box > div');

const context = new AudioContext();
const analyser = context.createAnalyser();
analyser.fftSize = 2048;
analyser.smoothingTimeConstant = 0;    

var source = null;
var myAudioBuffer = null;
var sourceNode = null;
var mediaSourceNode = null;

var HEIGHT = 400;
var SOUND_METER_MIN_LEVEL = -96.0;  // dB

var micOn = false;
var filePlayOn = false;

var animation_function;
var animation_id;

// load demo audio feils
var demo_buffer;

const $micAudio = document.querySelector('#micInput');
const $demoAudio = document.querySelector('#demoAudio');
$micAudio.addEventListener("click", playMic, false);
$demoAudio.addEventListener("click", playFile, false);

window.onload= async function(){
  
  // analyzer

  const fileName = 'Piano_Store.mp3';
  const response = await fetch(`./music/${ fileName }`, { method: 'GET' });
  const result = await response.arrayBuffer();
  context.decodeAudioData(result, function (buffer) { demo_buffer = buffer; });
  animation_function = draw_octaveband;
}

let prevTime = null;
let angle = 0;
let scale = 1.0;
let prevSoundLevels = null;
let rotateDirection = 1;
let origin = 0.5; // 0 ~ 1.0
let originDirection = 1;
function draw_octaveband(time) {

  // get samples 
  var data_array = new Float32Array(analyser.frequencyBinCount);
  analyser.getFloatFrequencyData(data_array);

  var octaveband_level_db = calc_octaveband(data_array)

  function _calculateSoundLevel(db) {
    return (db - SOUND_METER_MIN_LEVEL)/(0.0-SOUND_METER_MIN_LEVEL)*HEIGHT;
  }

  const soundLevels = octaveband_level_db.map(db => _calculateSoundLevel(db))

  const color = (255 - soundLevels[0] * 35 / HEIGHT) | 0;
  document.body.style.backgroundColor = `rgb(${ color }, ${ color }, ${ color })`;

  const color2 = (255 - soundLevels[1] * 25 / HEIGHT) | 0;
  document.querySelector('.container').style.backgroundColor = `rgb(${ color2 }, ${ color2 }, ${ color2 })`;

  const color3 = (255 - soundLevels[2] * 15 / HEIGHT) | 0;
  $box.style.backgroundColor = `rgb(${ color3 }, ${ color3 }, ${ color3 })`;

  // 2d canvas context

  const scaleX = 0.4 + soundLevels[5] / 350;

  for (var i=0; i<10; i++) {
		const $bar = $bars[i];
		$bar.textContent = octaveband_level_db[i] | 0;

    // fill rectangular (for the sound level)
    const soundLevel = soundLevels[i];
    const scaleY = soundLevel / HEIGHT * 1.2;
    const translateY = origin * 400 + ((0.5 - origin) * 10) - origin * scaleY * HEIGHT;
    const transform = 
      `translate3d(${ 39 * i + 9 }px, ${ translateY }px, 0) scale3d(${ scaleX }, ${ scaleY }, 1.0)`;
    $bar.style.transform = transform; 
  }

  const _velocity = -soundLevels[3] / 8;
  const _scaleVelocity = soundLevels[4] / 300;
  const _originVelocity = soundLevels[8] / 300;

  if (prevTime !== null) {
    const reverse = Math.abs(soundLevels[9] - prevSoundLevels[9]) > 20;
    if (reverse) {
      rotateDirection *= -1;
    }
    const gap = (time - prevTime) / 1000;
    angle += gap * _velocity * rotateDirection;
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

  animation_id = requestAnimationFrame(animation_function);
}

function playMic()
{
    if (filePlayOn) {
      turnOffFileAudio();
    }

    if (micOn) {
    turnOffMicAudio();
    return;
    }

  if (!navigator.getUserMedia)
    navigator.getUserMedia = (navigator.getUserMedia({audio: true}) || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
                
  if (!navigator.getUserMedia)
    alert("Error: getUserMedia not supported!");
            
  // get audio input streaming          
  navigator.getUserMedia({audio: true}, onStream, onStreamError)

  micOn = true;

  var mic = document.getElementById("micInput");
  mic.innerHTML = 'Mic Off'
}

let _stream;

// success callback
function onStream(stream) {
    mediaSourceNode = context.createMediaStreamSource(stream);
    _stream = stream;
  
  // Connect graph
  mediaSourceNode.connect(analyser);
              
  // visualize audio animation
  animation_id = requestAnimationFrame(animation_function, context.sampleRate/analyser.fftSize);
}

// errorCallback       
function onStreamError(error) {
  console.error('Error getting microphone', error);

  micOn = false;
}


function playFile() {
    if (filePlayOn) {
      turnOffFileAudio();
      return;
    }

    if (micOn) {
    turnOffMicAudio();
    }

    sourceNode = context.createBufferSource();

    sourceNode.buffer = demo_buffer;
    sourceNode.connect(context.destination);
    sourceNode.start(0);

  sourceNode.connect(analyser);

  // visualize audio animation
  animation_id = requestAnimationFrame(animation_function, context.sampleRate/analyser.fftSize);

  filePlayOn = true;
  
  var demoAudio = document.getElementById("demoAudio");
  demoAudio.innerHTML = 'Demo Audio Stop'
}


function turnOffMicAudio() {
  var mic = document.getElementById("micInput");    
  mic.innerHTML = 'Mic On'
  mediaSourceNode = null;
  micOn = false;

  _stream.getAudioTracks()[0].stop();

  stopAnimation();
}

function turnOffFileAudio() {
  var demoAudio = document.getElementById("demoAudio");
  demoAudio.innerHTML = 'Demo Audio Play'
  sourceNode.stop(0);
    sourceNode = null;
    filePlayOn = false;

  stopAnimation();
}

function stopAnimation() { 
  $box.style.opacity = 0;
  prevTime = null;
  window.cancelAnimationFrame(animation_id);
}
function calc_octaveband(input_array) {
  var lower_freqs = [22, 44, 88, 177, 355, 710, 1420, 2840, 5680, 11360];
  var upper_freqs = [44, 88, 177, 355, 710, 1420, 2840, 5680, 11360, 22720];
  var center_freqs = [31.5, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

  // compute FFT power first 
  var fft_power = new Array(input_array.length);
  for (var i = 0; i < input_array.length; i++) {
    fft_power[i] = Math.pow(10.0, input_array[i]/10.0);
  }

  var band_power = new Array(center_freqs.length);

  for (var i = 0; i < center_freqs.length; i++) {
    var lower_bin = Math.floor(lower_freqs[i]/22050.0*input_array.length);
    var upper_bin = Math.floor(upper_freqs[i]/22050.0*input_array.length);
    var center_bin = Math.ceil(center_freqs[i]/22050.0*input_array.length);

    if (upper_bin >= fft_power.length) {
      upper_bin = fft_power.length-1;
    }

    band_power[i] = 0;
    for (var j=lower_bin; j<upper_bin; j++ ) {
      band_power[i] = band_power[i] + fft_power[j];
    }
  }

  var band_level_db = new Array(band_power.length);

  for (var i = 0; i < band_level_db.length; i++) {
    band_level_db[i] = 10.0*Math.log10(band_power[i]);

    if (band_level_db[i] < SOUND_METER_MIN_LEVEL) {
      band_level_db[i] = SOUND_METER_MIN_LEVEL;
    }

  }

  return band_level_db;
}
