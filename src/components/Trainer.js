/**
 * Created by tvaisanen on 11/27/17.
 */


import React, { Component } from 'react';
import LowPassOrHighPass from './Excercises/LowPassOrHighPass';
import { playFilteredWhiteNoise } from './Excercises/audioUtils';

class Trainer extends Component {
    render(){
        return (
            <div>
                Trainer
                <LowPassOrHighPass/>
            </div>
        )
    }
}

export default Trainer;