/**
 * Created by tvaisanen on 11/25/17.
 */

var HEIGHT = 200;
var WIDTH = 400;

window.requestAnimationFrame = (function(){
return window.requestAnimationFrame  ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback){
  window.setTimeout(callback, 1000 / 60);
};
})();

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");

var frequencyBars = 100;
// Array containing all the frequencies we want to get
// response for when calling getFrequencyResponse()
var myFrequencyArray = new Float32Array(frequencyBars);
for (var i = 0; i < frequencyBars; ++i) {
    myFrequencyArray[i] = 2000 / frequencyBars * (i + 1);
}

var analyser = audioCtx.createAnalyser();

var magResponseOutput = new Float32Array(myFrequencyArray.length);
var phaseResponseOutput = new Float32Array(myFrequencyArray.length);
var bufferLength = analyser.frequencyBinCount;
var freqDomain = new Uint8Array(bufferLength);

var canvasFreq = document.getElementById("canvasFreq");
var drawContext = canvasFreq.getContext("2d");



var freqResponseOutput = document.querySelector('.freq-response-output');

var currentFilter = null;

var SAMPLETIME = 1;
var QUESTIONS = 3;
var QUESTION_COUNT = 0;
var FILTERTYPES = ['lowpass', 'lowshelf', 'highpass', 'highshelf', 'bandpass', 'peaking', 'notch', 'allpass'];

var selection = document.querySelector('#selection');

var btnNew = document.querySelector('#btnNewQuestion');

var btnLowPass = document.querySelector('#btnLowPass');
var btnLowShelf = document.querySelector('#btnLowShelf');

var btnHighPass = document.querySelector('#btnHighPass');
var btnHighShelf = document.querySelector('#btnHighSelf');

var btnAllPass = document.querySelector('#btnAllPass');
var btnBandPass = document.querySelector('#btnBandPass');

var btnNotch = document.querySelector('#btnNotch');
var btnPeaking = document.querySelector('#btnPeaking');

function correctAnswer(correct) {
    if (correct) {
        selection.style['color'] = 'green';
    } else {
        selection.style['color'] = 'red';
    }
}

var btnActions = {
    btnNewQuestion: {
        fn: function () {
            newQuestion()
        },
    },
    btnLowShelf: {
        fn: function () {
            selection.innerHTML = 'Low Shelf'

        },
        filterType: "lowshelf"
    },
    btnLowPass: {
        fn: function () {
            selection.innerHTML = 'Low Pass'
        },
        filterType: "lowpass"
    },
    btnHighSelf: {
        fn: function () {
            selection.innerHTML = 'High Shelf'
        },
        filterType: "highshelf"
    },
    btnHighPass: {
        fn: function () {
            selection.innerHTML = 'High Pass'
        },
        filterType: "highpass"
    },
    btnAllPass: {
        fn: function () {
            selection.innerHTML = 'All Pass'
        },
        filterType: 'allpass'
    },
    btnBandPass: {
        fn: function () {
            selection.innerHTML = 'Band Pass'
        },
        filterType: 'bandpass'
    },
    btnNotch: {
        fn: function () {
            selection.innerHTML = 'Notch'
        },
        filterType: 'notch'
    },
    btnPeaking: {
        fn: function () {
            selection.innerHTML = 'Peaking'
        },
        filterType: "peaking"
    },
};


var buttons = [btnNew, btnLowShelf, btnLowPass, btnHighPass, btnHighShelf, btnAllPass, btnBandPass, btnPeaking, btnNotch];

buttons.forEach(function (btn) {
    //console.debug(btn);
    btn.addEventListener('click', function () {
        try {
            console.debug(btnActions[btn.id]);
            var activeBtn = btnActions[btn.id];
            activeBtn.fn();
            if (activeBtn.filterType) {
                correctAnswer(activeBtn.filterType == currentFilter)
                console.log(activeBtn.filterType == currentFilter);
            }
        }

        catch
            (e) {

            console.group("BtnEventListener()");
            console.error(e);
            console.debug(btn.id);
            console.debug(btnActions);
            console.groupEnd();

        }
    });
})
;

function createNoiseBuffer(time) {
    var arrayBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * time, audioCtx.sampleRate);

    for (var channel = 0; channel < arrayBuffer.numberOfChannels; channel++) {
        var nowBuffering = arrayBuffer.getChannelData(channel);
        for (var i = 0; i < arrayBuffer.length; i++) {
            nowBuffering[i] = Math.random() * 2 - 1;
        }
    }

    return arrayBuffer;
}


function drawFrequencyResponse(mag, phase) {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    var barWidth = 400 / frequencyBars;

    // Magnitude
    canvasContext.strokeStyle = "blue";
    canvasContext.beginPath();

    for (var frequencyStep = 0; frequencyStep < frequencyBars; ++frequencyStep) {
        canvasContext.lineTo(
            frequencyStep * barWidth,
            canvas.height - mag[frequencyStep] * 90);
    }
    canvasContext.stroke();

    // Phase
    canvasContext.strokeStyle = "red";
    canvasContext.beginPath();
    for (var frequencyStep = 0; frequencyStep < frequencyBars; ++frequencyStep) {
        var x = frequencyStep * barWidth;
        var y = canvas.height - (phase[frequencyStep] * 90 + 300) / Math.PI;
        canvasContext.lineTo(x, y);
        // console.debug("x: " + x + ", y: " + y);
    }
    canvasContext.stroke();
}

function updateFrequencyResponse(filter) {
    filter.getFrequencyResponse(
        myFrequencyArray,
        magResponseOutput,
        phaseResponseOutput);
    drawFrequencyResponse(magResponseOutput, phaseResponseOutput);
}

function calcFrequencyResponse(filter) {
    filter.getFrequencyResponse(myFrequencyArray, magResponseOutput, phaseResponseOutput);

    for (i = 0; i <= myFrequencyArray.length - 1; i++) {
        var listItem = document.createElement('li');
        listItem.innerHTML = '<strong>' + myFrequencyArray[i] + 'Hz</strong>: Magnitude ' + magResponseOutput[i] + ', Phase ' + phaseResponseOutput[i] + ' radians.';
        freqResponseOutput.appendChild(listItem);
    }
}

function setCurrentFilter(filter) {
    currentFilter = filter;
    document.querySelector('#currentFilter').innerHTML = currentFilter;
}

var filterParams = document.querySelector("#filterParams");

function getRandomFilter() {
    var biquadFilter = audioCtx.createBiquadFilter();
    var randomFilterType = FILTERTYPES[Math.floor(Math.random() * FILTERTYPES.length)];
    setCurrentFilter(randomFilterType);
    biquadFilter.type = randomFilterType;
    biquadFilter.frequency.value = 1000;
    biquadFilter.gain.value = 1;
    /*try {
        var fType = document.createElement('li');
            fType.innerHTML = biquadFilter.type;
        var fFreq = document.createElement('li');
        fFreq.innerHTML = biquadFilter.frequency.value;
        //var fQ = document.createElement('li').innerHTML = biquadFilter.q.value;
        var fGain = document.createElement('li');
        fGain.innerHTML = biquadFilter.gain.value;
        filterParams.appendChild(fType);
        filterParams.appendChild(fFreq);
        //filterParams.appendChild(fQ);
        filterParams.appendChild(fGain);
    } catch (e) {
        console.debug(e);
        console.debug(filterParams);
    }*/
    updateFrequencyResponse(biquadFilter);
    drawFrequencyResponse(magResponseOutput, phaseResponseOutput);


    return biquadFilter;
}

function newQuestion() {
        drawContext.clearRect(0, 0, canvasFreq.width, canvasFreq.height);

    var source = audioCtx.createBufferSource();
    var filter = getRandomFilter();
    source.buffer = createNoiseBuffer(SAMPLETIME);

    source.connect(filter);
    filter.connect(analyser);
    analyser.connect(audioCtx.destination);
    source.start();

    drawFrequencyData();
}


function drawFrequencyData() {
    analyser.getByteFrequencyData(freqDomain);
    drawContext.clearRect(0, 0, canvasFreq.width, canvasFreq.height);

    var barWidth = WIDTH / analyser.frequencyBinCount;

    console.log(freqDomain);
    for (var i = 0; i < analyser.frequencyBinCount; i++) {
        var value = freqDomain[i];
        var percent = value / 256;
        var height = HEIGHT * percent;
        var offset = HEIGHT - height - 1;

        var hue = i / analyser.frequencyBinCount * 360;
        //drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
        drawContext.fillStyle = 'rgb(50,200,100)';
        drawContext.fillRect(i * barWidth, offset, barWidth, value);
    }
}


