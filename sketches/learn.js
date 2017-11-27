var request = new XMLHttpRequest();
request.open("GET", "http://localhost:5000/sound.mp3", true);
request.responseType = "arraybuffer";


const WIDTH = 400;
const HEIGHT = 200;

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var s = audioCtx.createBufferSource();
var analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;

//s.connect(analyser);
//s.connect(analyser);
analyser.connect(audioCtx.destination);


request.onload = function () {
    audioCtx.decodeAudioData(request.response, function (b) {

        s.buffer = b;

        s.start();
    })
};

request.send();

var bufferLength = analyser.frequencyBinCount;
var timeDataArray = new Uint8Array(bufferLength);
var frequencyDataArray = new Uint8Array(bufferLength);

var canvas = document.getElementById('timeCanvas');
var canvasCtx = timeCanvas.getContext("2d");
var freqCanvas = document.getElementById('freqCanvas');
var freqCtx = freqCanvas.getContext("2d");

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

// draw an oscilloscope of the current audio source

function draw() {

    drawVisual = requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    canvasCtx.beginPath();

    var sliceWidth = WIDTH * 1.0 / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {

        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT / 2;

        if (i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
};

draw();