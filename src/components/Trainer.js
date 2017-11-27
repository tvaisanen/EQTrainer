/**
 * Created by tvaisanen on 11/27/17.
 */


import React, { Component } from 'react';
import LowPassOrHighPass from './Excercises/LowPassOrHighPass';
import LowPassCutOffLow from './Excercises/LowPassCutOffLow';
import { playFilteredWhiteNoise } from './Excercises/audioUtils';

class Trainer extends Component {
    render(){
        return (
            <div>
                Trainer
                <LowPassCutOffLow/>
            </div>
        )
    }
}

export default Trainer;