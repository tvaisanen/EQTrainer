/**
 * Created by tvaisanen on 11/25/17.
 */


var audioCtx = new (window.AudioContext || window.webkitAudioContext)();


var arrayBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * 3, audioCtx.sampleRate);

for (var channel = 0; channel < arrayBuffer.numberOfChannels; channel++){
    var nowBuffering = arrayBuffer.getChannelData(channel);
    for (var i = 0; i < arrayBuffer.length; i++){
        nowBuffering[i] = Math.random() * 2 - 1;
    }
}

var source = audioCtx.createBufferSource();
source.buffer = arrayBuffer;
source.connect(audioCtx.destination);
source.start();