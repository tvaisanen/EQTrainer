import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import TopBar from './components/TopBar';
import Trainer from './components/Trainer';

const audioCtx = new AudioContext();

// Create AudioContext and buffer source


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <TopBar/>
                <div>SideMenu</div>
                <Trainer/>
            </div>
        );
    }
}

export default App;
