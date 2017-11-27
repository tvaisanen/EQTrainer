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
    console.debug('playFilteredWhiteNoise()');

    const source = audioCtx.createBufferSource();
    source.buffer = createNoiseBuffer(props.time);
    const filter = audioCtx.createBiquadFilter();
    console.debug(typeof props.filterOptions);
    console.debug("is array = " + Array.isArray(props.filterOptions))
    console.debug(typeof props.filterOptions);
    console.debug(props.filterOptions.length);

    const optionsCount = props.filterOptions.length | 0;

    if (optionsCount > 1) {
        console.debug('new');
        filter.type = props.filterOptions[Math.floor(Math.random() * 2)];
        filter.frequency.value = 1000;

    } else {
        // this is for repeating with specified values
        console.debug('repeated');
        console.debug(props.filterOptions);
        filter.filterType = props.filterOptions.type;
        filter.frequency.value = props.filterOptions.frequency;
    }

    filter.gain.value = 1;
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


