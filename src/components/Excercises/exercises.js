/**
 * Created by tvaisanen on 11/28/17.
 */
import React, {Component} from 'react';
import Exercise from './Exercise';

const lowOrHigh = {
    ctx: this,
    title: "Low Pass or High Pass",
    filter: [],
    answers: [
        {filter: 'lowpass', label: 'Low Pass', frequency: '1000', id: 'answer-0', gain: 1},
        {filter: 'highpass', label: 'High Pass', frequency: '1000', id: 'answer-1', gain: 1},
    ]
};

const lowPassMidCut = {
    ctx: this,
    title: "Low Pass Cut Off Mid-High",
    filter: [],
    answers: [
        {filter: 'lowpass', label: '800 Hz', frequency: '800', id: '800', gain: 1},
        {filter: 'lowpass', label: '1.6 kHz', frequency: '1600', id: '1600', gain: 1},
        {filter: 'lowpass', label: '3.2 kHz', frequency: '3200', id: '3200', gain: 1},
        {filter: 'lowpass', label: '6.4 kHz', frequency: '6400', id: '6400', gain: 1},
        {filter: 'lowpass', label: '12.8 kHz', frequency: '12800', id: '12800', gain: 1}
    ]
};

const lowPassLowCut = {
    ctx: this,
    title: "Low Pass Cut Off Low-Mid",
    filter: [],
    answers: [
        {filter: 'lowpass', label: '50 Hz', frequency: '50', id: '50', gain: 1},
        {filter: 'lowpass', label: '100 Hz', frequency: '100', id: '100', gain: 1},
        {filter: 'lowpass', label: '200 Hz', frequency: '200', id: '200', gain: 1},
        {filter: 'lowpass', label: '300 Hz', frequency: '300', id: '300', gain: 1},
        {filter: 'lowpass', label: '400 Hz', frequency: '400', id: '400', gain: 1}
    ]
};

class LowPassMidCut extends  Exercise {
    constructor(props){
        super(props);
    }
}
class LowPasLowCut extends  Exercise {
    constructor(props){
        super(props);
    }
}
class LowOrHighPass extends  Exercise {
    constructor(props){
        super(props);
    }
}

export const exercises = [
    {params: lowOrHigh, component: <LowOrHighPass exercise={lowOrHigh}/>},
    {params: lowPassLowCut, component: <LowPasLowCut exercise={lowPassLowCut}/>},
    {params: lowPassMidCut, component: <LowPassMidCut exercise={lowPassMidCut}/>},
];
