/**
 * Created by tvaisanen on 11/27/17.
 */


const audioCtx = new (window.AudioContext || window.webkitAudioContext)();


export const getNoiseBufferSource = (time) => {
    return audioCtx.createBufferSource();
}

export const createNoiseBuffer = (time) => {
    // create arraybuffer for audioSourceNode
    const arrayBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * time, audioCtx.sampleRate);

    for (let channel = 0; channel < arrayBuffer.numberOfChannels; channel++) {
        let nowBuffering = arrayBuffer.getChannelData(channel);
        for (let i = 0; i < arrayBuffer.length; i++) {
            nowBuffering[i] = Math.random() * 2 - 1;
        }
    }

    return arrayBuffer;
};


export const playWhiteNoise = (props) => {
    console.debug('playWhiteNoise()');
    const source = audioCtx.createBufferSource();
    source.buffer = createNoiseBuffer(props.time);
    source.connect(audioCtx.destination);
    source.start();
};

export const playFilteredWhiteNoise = (props) => {
    console.group('playFilteredWhiteNoise(props)');
    console.debug(props);
    console.groupEnd();

    const source = audioCtx.createBufferSource();
    source.buffer = createNoiseBuffer(props.time);

    const filter = audioCtx.createBiquadFilter();


    filter.filterType = props.params.filter;
    filter.frequency.value = props.params.frequency;
    filter.gain.value = props.params.gain;


    console.groupCollapsed('playFilteredWhiteNoise()');
    console.debug(filter);
    console.debug('filter: ' + filter.type);
    console.debug('frequency: ' + filter.frequency.value);
    console.groupEnd();

    source.connect(filter);
    filter.connect(audioCtx.destination);
    source.start();
    return {type: filter.type, frequency: filter.frequency.value}
};



