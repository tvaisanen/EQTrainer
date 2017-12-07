/**
 * Created by tvaisanen on 11/28/17.
 */

import React, { Component } from 'react';

class StartScreen extends Component {
    render(){
        return (
            <div style={{margin: "10vh"}}>
                <h2>Ear Trainer for Audio Engineers</h2>
                <p>This is a ear trainer application aimed to help aspiring audio
                    engineers to train their ears to recognize different
                    filter types and filter cut off frequencies.
                    At this moment we are still in the beta phase. </p>
                <h3>How to get started?</h3>
                <p>Open exercise menu by clicking the menu icon in the top bar
                    and select an exercise.</p>
                <h3>Feedback or Questions?</h3>
                <p>You can contact us by email: EQEarTrainer (at) gmail.com</p>
            </div>
        )
    }
}

export default StartScreen;