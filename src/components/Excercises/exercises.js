/**
 * Created by tvaisanen on 11/28/17.
 */
import React, {Component} from 'react';
import Exercise from './Exercise';

const lowOrHigh = {
    title: "Lowpass or Highpass",
    filter: [],
    instructions: "",
    answers: [
        {filter: 'lowpass', label: 'Lowpass', frequency: '1000', id: 'answer-btn-answer-0', gain: 1},
        {filter: 'highpass', label: 'Highpass', frequency: '1000', id: 'answer-btn-answer-1', gain: 1},
    ]
};

const lowPassMidCut = {
    title: "Lowpass Cut Off Mid-High",
    filter: [],
    instructions: "",
    answers: [
        {filter: 'lowpass', label: '800 Hz', frequency: '800', id: 'answer-btn-800', gain: 1},
        {filter: 'lowpass', label: '1.6 kHz', frequency: '1600', id: 'answer-btn-1600', gain: 1},
        {filter: 'lowpass', label: '3.2 kHz', frequency: '3200', id: 'answer-btn-3200', gain: 1},
        {filter: 'lowpass', label: '6.4 kHz', frequency: '6400', id: 'answer-btn-6400', gain: 1},
        {filter: 'lowpass', label: '12.8 kHz', frequency: '12800', id: 'answer-btn-12800', gain: 1}
    ]
};

const lowPassLowCut = {
    title: "Lowpass Cut Off Low-Mid",
    filter: [],
    instructions: "",
    answers: [
        {filter: 'lowpass', label: '50 Hz', frequency: '50', id: 'answer-btn-50', gain: 1},
        {filter: 'lowpass', label: '100 Hz', frequency: '100', id: 'answer-btn-100', gain: 1},
        {filter: 'lowpass', label: '200 Hz', frequency: '200', id: 'answer-btn-200', gain: 1},
        {filter: 'lowpass', label: '300 Hz', frequency: '300', id: 'answer-btn-300', gain: 1},
        {filter: 'lowpass', label: '400 Hz', frequency: '400', id: 'answer-btn-400', gain: 1}
    ]
};

const highPassLowCut = {
    title: "Highpass Cut Off Low-Mid",
    filter: [],
    instructions: "",
    answers: [
        {filter: 'highpass', label: '200 Hz', frequency: '200', id: 'answer-btn-200', gain: 1},
        {filter: 'highpass', label: '300 Hz', frequency: '300', id: 'answer-btn-300', gain: 1},
        {filter: 'highpass', label: '400 Hz', frequency: '400', id: 'answer-btn-400', gain: 1},
        {filter: 'highpass', label: '500 Hz', frequency: '50', id: 'answer-btn-500', gain: 1},
        {filter: 'highpass', label: '600 Hz', frequency: '100', id: 'answer-btn-600', gain: 1},
    ]
};

const highPassHighCut = {
    title: "Highpass Cut Off High",
    filter: [],
    instructions: "",
    answers: [
        {filter: 'highpass', label: '1.2 kHz', frequency: '1200', id: 'answer-btn-1200', gain: 1},
        {filter: 'highpass', label: '3.2 kHz', frequency: '3200', id: 'answer-btn-3200', gain: 1},
        {filter: 'highpass', label: '6.4 kHz', frequency: '6400', id: 'answer-btn-6400', gain: 1},
        {filter: 'highpass', label: '12 kHz', frequency: '12000', id: 'answer-btn-12000', gain: 1},
        {filter: 'highpass', label: '16 kHz', frequency: '16000', id: 'answer-btn-16000', gain: 1},
    ]
};

const midHighBandpass = {
    title: "Bandpass Mid-High",
    filter: [],
    instructions: "",
    answers: [
        {filter: 'bandpass', label: '1.2 kHz', frequency: '1200', id: '1200', gain: 1, q: 1},
        {filter: 'bandpass', label: '3.2 kHz', frequency: '3200', id: 'answer-btn-3200', gain: 1, q: 1},
        {filter: 'bandpass', label: '6.4 kHz', frequency: '6400', id: 'answer-btn-6400', gain: 1, q: 1},
        {filter: 'bandpass', label: '12 kHz', frequency: '12000', id: 'answer-btn-12000', gain: 1, q: 1},
        {filter: 'bandpass', label: '16 kHz', frequency: '16000', id: 'answer-btn-16000', gain: 1, q: 1},
    ]
};

const lowMidBandpass = {
    title: "Bandpass Low-Mid",
    filter: [],
    instructions: "",
    answers: [
        {filter: 'bandpass', label: '50 Hz', frequency: '50', id: 'answer-btn-50', gain: 1, q: 1},
        {filter: 'bandpass', label: '100 Hz', frequency: '100', id: 'answer-btn-100', gain: 1, q: 1},
        {filter: 'bandpass', label: '200 Hz', frequency: '200', id: 'answer-btn-200', gain: 1, q: 1},
        {filter: 'bandpass', label: '400 Hz', frequency: '400', id: 'answer-btn-400', gain: 1, q: 1},
        {filter: 'bandpass', label: '800 Hz', frequency: '800', id: 'answer-btn-800', gain: 1, q: 1},
    ]
};

const lowShelfBoost = {
    title: "Lowshelf Boost",
    filter: [],
    instructions: "",
    answers: [
        {filter: 'bandpass', label: '50 Hz', frequency: '50', id: 'answer-btn-50', gain: 1, q: 1},
        {filter: 'bandpass', label: '100 Hz', frequency: '100', id: 'answer-btn-100', gain: 1, q: 1},
        {filter: 'bandpass', label: '200 Hz', frequency: '200', id: 'answer-btn-200', gain: 1, q: 1},
        {filter: 'bandpass', label: '400 Hz', frequency: '400', id: 'answer-btn-400', gain: 1, q: 1},
        {filter: 'bandpass', label: '800 Hz', frequency: '800', id: 'answer-btn-800', gain: 1, q: 1},
    ]
};

const lowshelfOrHighselfBoost = {
    title: "Lowshelf or Highshelf Boost",
    filter: [],
    instructions: "",
    answers: [
        {filter: 'lowshelf', label: 'Lowshelf 50 Hz', frequency: '50', id: 'answer-btn-50', gain: 12, q: 1},
        {filter: 'lowshelf', label: 'Lowshelf 100 Hz', frequency: '100', id: 'answer-btn-100', gain: 12, q: 1},
        {filter: 'lowshelf', label: 'Lowshelf 200 Hz', frequency: '200', id: 'answer-btn-200', gain: 12, q: 1},
        {filter: 'highshelf', label: 'Highshelf 10 kHz', frequency: '10000', id: 'answer-btn-10000', gain: 12, q: 1},
        {filter: 'highshelf', label: 'Highshelf 12 kHz', frequency: '12000', id: 'answer-btn-12000', gain: 12, q: 1},
        {filter: 'highshelf', label: 'Highshelf 16 kHz', frequency: '16000', id: 'answer-btn-16000', gain: 12, q: 1},
    ]
};

const lowshelfOrHighselfAttenuation = {
    title: "Lowshelf or Highshelf Attenuation",
    filter: [],
    instructions: "",
    answers: [
        {filter: 'lowshelf', label: 'Lowshelf 50 Hz', frequency: '50', id: 'answer-btn-50', gain: -12, q: 1},
        {filter: 'lowshelf', label: 'Lowshelf 100 Hz', frequency: '100', id: 'answer-btn-100', gain: -12, q: 1},
        {filter: 'lowshelf', label: 'Lowshelf 200 Hz', frequency: '200', id: 'answer-btn-200', gain: -12, q: 1},
        {filter: 'highshelf', label: 'Highshelf 10 kHz', frequency: '10000', id: 'answer-btn-10000', gain: -12, q: 1},
        {filter: 'highshelf', label: 'Highshelf 12 kHz', frequency: '12000', id: 'answer-btn-12000', gain: -12, q: 1},
        {filter: 'highshelf', label: 'Highshelf 16 kHz', frequency: '16000', id: 'answer-btn-16000', gain: -12, q: 1},
    ]
};

class LowPassMidCut extends Exercise {
}
class HighPassLowCut extends Exercise {
}
class LowPassLowCut extends Exercise {
}
class HighPassHighCut extends Exercise {
}
class LowOrHighPass extends Exercise {
}
class LowMidBandpass extends Exercise {
}
class MidHighBandpass extends Exercise {
}
class LowShelfBoost extends Exercise {
}
class LowShelfAttenuation extends Exercise {
}
class HighShelfBoost extends Exercise {
}
class HighShelfAttenuation extends Exercise {
}
class LowshelfOrHighselfBoost extends Exercise {
}
class LowshelfOrHighselfAttenuation extends Exercise {
}

export const exercises = [
    {params: lowOrHigh, component: <LowOrHighPass exercise={lowOrHigh}/>},
    {params: lowPassLowCut, component: <LowPassLowCut exercise={lowPassLowCut}/>},
    {params: lowPassMidCut, component: <LowPassMidCut exercise={lowPassMidCut}/>},
    {params: highPassLowCut, component: <HighPassLowCut exercise={highPassLowCut}/>},
    {params: highPassHighCut, component: <HighPassHighCut exercise={highPassHighCut}/>},
    {params: lowMidBandpass, component: <LowMidBandpass exercise={lowMidBandpass}/>},
    {params: midHighBandpass, component: <MidHighBandpass exercise={midHighBandpass}/>},
    {params: lowshelfOrHighselfBoost, component: <LowshelfOrHighselfBoost exercise={lowshelfOrHighselfBoost}/>},
    {
        params: lowshelfOrHighselfAttenuation,
        component: <LowshelfOrHighselfAttenuation exercise={lowshelfOrHighselfAttenuation}/>
    },

];
